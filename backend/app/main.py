from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.root import router

app = FastAPI(
    title="TalentIQ API",
    version="1.0.0"
)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root Router Only
app.include_router(router)