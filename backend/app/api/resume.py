print("========== RESUME.PY START ==========")

print("1")
import os

print("2")
import uuid

print("3")
from fastapi import APIRouter, File, Form, HTTPException, UploadFile

print("4")
from app.services.parser import ResumeParser

print("5")
from app.services.resume_engine import ResumeEngine

print("6")
from app.services.ats_engine import ATSEngine

print("7")
from app.services.general_ats_engine import GeneralATSEngine

print("8")
from app.services.recommendation_engine import RecommendationEngine

print("9")
from app.services.llm_engine import LLMEngine

print("10")
print("========== ALL IMPORTS COMPLETED ==========")

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

UPLOAD_DIR = "app/uploads/resumes"

ALLOWED_EXTENSIONS = [".pdf", ".docx"]

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB


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

    extracted_text = ResumeParser.extract_text(file_path)

    if not extracted_text.strip():
        raise HTTPException(
            status_code=400,
            detail="No readable text was found in the uploaded resume."
        )

    analysis = ResumeEngine.process(
        extracted_text,
        is_resume=True
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
    contents = await file.read()

    validate_resume(file, contents)

    unique_filename, file_path = save_uploaded_resume(
        file,
        contents
    )

    resume_text = ResumeParser.extract_text(file_path)

    if not resume_text.strip():
        raise HTTPException(
            status_code=400,
            detail="No readable text was found in the uploaded resume."
        )

    resume_analysis = ResumeEngine.process(
        resume_text,
        is_resume=True
    )

    candidate = {
        "name": resume_analysis.get("name"),
        "email": resume_analysis.get("email"),
        "phone": resume_analysis.get("phone"),
    }

    if job_description.strip():

        jd_analysis = ResumeEngine.process(
            job_description,
            is_resume=False
        )

        ats_result = ATSEngine.compare(
            resume_analysis["skills"],
            jd_analysis["skills"]
        )

        recommendations = RecommendationEngine.generate(
            ats_score=ats_result["score"],
            matched_skills=ats_result["matched_skills"],
            missing_skills=ats_result["missing_skills"],
            candidate=resume_analysis,
        )

        ai_analysis = LLMEngine.generate_complete_analysis(
            candidate=candidate,
            ats_score=ats_result["score"],
            matched_skills=ats_result["matched_skills"],
            missing_skills=ats_result["missing_skills"],
            mode="semantic",
        )

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

    ats_result = GeneralATSEngine.evaluate(
        resume_analysis,
        resume_text
    )

    recommendations = ats_result["weaknesses"] + [
        f"Add missing section: {section}"
        for section in ats_result["missing_sections"]
    ]

    ai_analysis = LLMEngine.generate_complete_analysis(
        candidate=candidate,
        ats_score=ats_result["score"],
        matched_skills=resume_analysis["skills"],
        missing_skills=[],
        mode="general",
    )

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