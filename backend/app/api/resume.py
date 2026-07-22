import asyncio
import logging
import os
import time
import uuid

from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from app.services.parser import ResumeParser
from app.services.resume_engine import ResumeEngine
from app.services.ats_engine import ATSEngine
from app.services.general_ats_engine import GeneralATSEngine
from app.services.recommendation_engine import RecommendationEngine
from app.services.llm_engine import LLMEngine


logger = logging.getLogger("resume_analyze")
logging.basicConfig(level=logging.INFO)

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

UPLOAD_DIR = "app/uploads/resumes"

ALLOWED_EXTENSIONS = [".pdf", ".docx"]

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB

# Hard ceiling on how long we'll wait for the LLM call before
# failing cleanly (with proper CORS headers) instead of letting
# Render's proxy kill the connection first.
LLM_TIMEOUT_SECONDS = 20


def save_uploaded_resume(file: UploadFile, contents: bytes):
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    extension = os.path.splitext(file.filename)[1].lower()

    unique_filename = f"{uuid.uuid4().hex}{extension}"

    file_path = os.path.join(
        UPLOAD_DIR,
        unique_filename
    )

    with open(file_path, "wb") as buffer:
        buffer.write(contents)

    return unique_filename, file_path


def validate_resume(file: UploadFile, contents: bytes):
    extension = os.path.splitext(file.filename)[1].lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are allowed."
        )

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="Maximum file size is 5 MB."
        )


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...)
):
    contents = await file.read()

    validate_resume(file, contents)

    unique_filename, file_path = save_uploaded_resume(
        file,
        contents
    )

    extracted_text = await asyncio.to_thread(
        ResumeParser.extract_text, file_path
    )

    if not extracted_text.strip():
        raise HTTPException(
            status_code=400,
            detail="No readable text was found in the uploaded resume."
        )

    analysis = await asyncio.to_thread(
        ResumeEngine.process, extracted_text, True
    )

    return {
        "success": True,
        "message": "Resume processed successfully.",
        "original_filename": file.filename,
        "stored_filename": unique_filename,
        "analysis": analysis
    }


@router.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(...),
    job_description: str = Form("")
):
    t0 = time.monotonic()
    req_id = uuid.uuid4().hex[:8]

    def elapsed():
        return f"{time.monotonic() - t0:.2f}s"

    contents = await file.read()

    validate_resume(file, contents)

    unique_filename, file_path = save_uploaded_resume(
        file,
        contents
    )
    logger.info(f"[{req_id}] file saved: {elapsed()}")

    # CPU-bound / blocking calls are pushed to a worker thread so they
    # don't block the event loop for other concurrent requests.
    resume_text = await asyncio.to_thread(
        ResumeParser.extract_text, file_path
    )
    logger.info(f"[{req_id}] parse done: {elapsed()}")

    if not resume_text.strip():
        raise HTTPException(
            status_code=400,
            detail="No readable text was found in the uploaded resume."
        )

    resume_analysis = await asyncio.to_thread(
        ResumeEngine.process, resume_text, True
    )
    logger.info(f"[{req_id}] resume analysis done: {elapsed()}")

    candidate = {
        "name": resume_analysis.get("name"),
        "email": resume_analysis.get("email"),
        "phone": resume_analysis.get("phone"),
    }

    # =====================================================
    # MODE 1 : SEMANTIC ATS (Resume + Job Description)
    # =====================================================

    if job_description.strip():

        jd_analysis = await asyncio.to_thread(
            ResumeEngine.process, job_description, False
        )
        logger.info(f"[{req_id}] jd analysis done: {elapsed()}")

        ats_result = await asyncio.to_thread(
            ATSEngine.compare,
            resume_analysis["skills"],
            jd_analysis["skills"],
        )
        logger.info(f"[{req_id}] ats done: {elapsed()}")

        recommendations = await asyncio.to_thread(
            RecommendationEngine.generate,
            ats_result["score"],
            ats_result["matched_skills"],
            ats_result["missing_skills"],
            resume_analysis,
        )
        logger.info(f"[{req_id}] recommendations done: {elapsed()}")

        ai_analysis = await _run_llm_with_timeout(
            req_id=req_id,
            candidate=candidate,
            ats_score=ats_result["score"],
            matched_skills=ats_result["matched_skills"],
            missing_skills=ats_result["missing_skills"],
            mode="semantic",
        )
        logger.info(f"[{req_id}] llm done: {elapsed()}")

        return {
            "success": True,
            "mode": "semantic",
            "message": "Semantic ATS analysis completed successfully.",
            "candidate": candidate,
            "resume_skills": resume_analysis["skills"],
            "job_skills": jd_analysis["skills"],
            "ats": ats_result,
            "recommendations": recommendations,
            "ai": ai_analysis.model_dump(),
            "stored_filename": unique_filename
        }

    # =====================================================
    # MODE 2 : GENERAL ATS (Resume Only)
    # =====================================================

    ats_result = await asyncio.to_thread(
        GeneralATSEngine.evaluate,
        resume_analysis,
        resume_text,
    )
    logger.info(f"[{req_id}] general ats done: {elapsed()}")

    recommendations = ats_result["weaknesses"] + [
        f"Add missing section: {section}"
        for section in ats_result["missing_sections"]
    ]

    ai_analysis = await _run_llm_with_timeout(
        req_id=req_id,
        candidate=candidate,
        ats_score=ats_result["score"],
        matched_skills=resume_analysis["skills"],
        missing_skills=[],
        mode="general",
    )
    logger.info(f"[{req_id}] llm done: {elapsed()}")

    return {
        "success": True,
        "mode": "general",
        "message": "General ATS analysis completed successfully.",
        "candidate": candidate,
        "resume_skills": resume_analysis["skills"],
        "ats": ats_result,
        "recommendations": recommendations,
        "ai": ai_analysis.model_dump(),
        "stored_filename": unique_filename
    }


async def _run_llm_with_timeout(
    req_id,
    candidate,
    ats_score,
    matched_skills,
    missing_skills,
    mode,
):
    """
    Runs the (synchronous, blocking) Groq call in a worker thread and
    enforces a hard timeout so a slow LLM response can never hang the
    request past Render's own proxy timeout. If it times out, we return
    our own clean error through the normal FastAPI/CORS pipeline instead
    of letting the connection get killed upstream with no CORS headers.
    """

    try:
        return await asyncio.wait_for(
            asyncio.to_thread(
                LLMEngine.generate_complete_analysis,
                candidate,
                ats_score,
                matched_skills,
                missing_skills,
                mode,
            ),
            timeout=LLM_TIMEOUT_SECONDS,
        )

    except asyncio.TimeoutError:
        logger.error(f"[{req_id}] LLM call timed out after {LLM_TIMEOUT_SECONDS}s")
        raise HTTPException(
            status_code=504,
            detail="AI analysis took too long to generate. Please try again.",
        )