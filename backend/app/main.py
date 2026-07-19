from fastapi import FastAPI

from app.api.root import router
from app.auth import router as auth_router

from app.database import engine
from app.models import Base

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="TalentIQ API",
    version="1.0.0"
)

app.include_router(router)
app.include_router(auth_router)