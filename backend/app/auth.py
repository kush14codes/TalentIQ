from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app.database import SessionLocal
from app.models import User

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/register")
def register(name: str, email: str, password: str):

    db: Session = SessionLocal()

    # Check if user already exists
    existing_user = db.query(User).filter(User.email == email).first()

    if existing_user:
        db.close()
        raise HTTPException(status_code=400, detail="Email already exists")

    # Hash the password
    hashed_password = pwd_context.hash(password)

    # Create new user
    new_user = User(
        name=name,
        email=email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    db.close()

    return {
        "message": "User Registered Successfully"
    }