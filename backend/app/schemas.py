from typing import List

from pydantic import BaseModel, EmailStr


class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class RecruiterReview(BaseModel):
    strengths: List[str]
    weaknesses: List[str]
    recommendation: str


class AIAnalysisResponse(BaseModel):
    summary: str
    review: RecruiterReview
    suggestions: List[str]
    interview_questions: List[str]