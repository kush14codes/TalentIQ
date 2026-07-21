from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.root import router
from app.auth import router as auth_router
from app.api.resume import router as resume_router

from app.database import engine
from app.models import Base

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="TalentIQ API",
    version="1.0.0"
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://talent-iq-sage-two.vercel.app",
    "https://talent-iq-git-main-kushagra-chaubeys-projects.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(auth_router)
app.include_router(resume_router)