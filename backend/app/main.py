import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.root import router
from app.auth import router as auth_router
from app.api.resume import router as resume_router

from app.database import engine
from app.models import Base
from app.services.embedding_engine import EmbeddingEngine

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("startup")

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


@app.on_event("startup")
async def preload_models():
    """
    Loads the SentenceTransformer model once at boot instead of on the
    first user request. This removes the model download/init cost
    (which can be tens of seconds on a cold Render instance) from the
    request path entirely -- it's the leading cause of the intermittent
    CORS/Network Error you were seeing on /resume/analyze.
    """

    logger.info("Preloading embedding model...")
    EmbeddingEngine.preload()
    logger.info("Embedding model preloaded successfully.")


@app.get("/health")
async def health_check():
    """
    Lightweight endpoint for uptime pings (e.g. UptimeRobot / cron-job.org)
    to keep the Render instance warm and avoid spin-down-induced cold
    starts on free/starter tiers.
    """
    return {"status": "ok"}