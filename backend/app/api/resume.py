import os
import uuid

from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from app.services.parser import ResumeParser
from app.services.resume_engine import ResumeEngine
from app.services.ats_engine import ATSEngine
from app.services.recommendation_engine import RecommendationEngine

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
    job_description: str = Form(...)
):
    if not job_description.strip():
        raise HTTPException(
            status_code=400,
            detail="Job description cannot be empty."
        )

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

    return {
        "success": True,
        "message": "Resume analyzed successfully.",
        "candidate": {
            "name": resume_analysis.get("name"),
            "email": resume_analysis.get("email"),
            "phone": resume_analysis.get("phone"),
        },
        "resume_skills": resume_analysis["skills"],
        "job_skills": jd_analysis["skills"],
        "ats": ats_result,
        "recommendations": recommendations,
        "stored_filename": unique_filename
    }