from fastapi import FastAPI
from app.api.root import router

app = FastAPI(
    title="TalentIQ API",
    version="1.0.0"
)

app.include_router(router)