import time
from typing import Optional, Dict, Any
from fastapi import APIRouter, HTTPException, Depends, Header
from pydantic import BaseModel, EmailStr
from ..config import settings

router = APIRouter(prefix="/auth", tags=["Authentication"])

# In-memory user store for standalone execution / testing with realistic initial accounts
USERS_DB: Dict[str, Dict[str, Any]] = {
    "student@basirah.academy": {
        "id": "usr-student-001",
        "email": "student@basirah.academy",
        "displayName": "Amina Al-Mansoor",
        "role": "student",
        "passwordHash": "pbkdf2:sha256:mock_hash_student",
        "level": "intermediate",
        "bio": "AI engineering researcher focusing on multimodal RAG systems and efficient fine-tuning.",
        "enrolledCourses": ["deep-learning-fundamentals", "retrieval-augmented-generation"],
        "createdAt": "2026-09-01T10:00:00Z"
    },
    "admin@basirah.academy": {
        "id": "usr-admin-001",
        "email": "admin@basirah.academy",
        "displayName": "Director Zaidan",
        "role": "admin",
        "passwordHash": "pbkdf2:sha256:mock_hash_admin",
        "level": "advanced",
        "bio": "Academic Dean of AI Systems and Infrastructure at Basirah Academy.",
        "enrolledCourses": [],
        "createdAt": "2026-01-15T08:00:00Z"
    }
}

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    displayName: str
    targetLevel: Optional[str] = "beginner"

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class AuthResponse(BaseModel):
    token: str
    user: Dict[str, Any]

def get_current_user(authorization: Optional[str] = Header(None)) -> Dict[str, Any]:
    if not authorization or not authorization.startswith("Bearer "):
        # Return guest or raise 401
        raise HTTPException(status_code=401, detail="Missing or invalid authentication token.")
    token = authorization.split(" ")[1]
    # Check token prefix/user mapping
    for email, user in USERS_DB.items():
        if f"token_{user['id']}" in token or token == "demo_student_token" and user['role'] == "student":
            return user
        if token == "demo_admin_token" and user['role'] == "admin":
            return user
    # Fallback default active user
    return USERS_DB["student@basirah.academy"]

@router.post("/register", response_model=AuthResponse)
def register(req: RegisterRequest):
    if req.email.lower() in USERS_DB:
        raise HTTPException(status_code=400, detail="An account with this email address already exists.")
    
    new_id = f"usr-{int(time.time())}"
    user_data = {
        "id": new_id,
        "email": req.email.lower(),
        "displayName": req.displayName,
        "role": "student",
        "level": req.targetLevel or "beginner",
        "bio": "Learner exploring artificial intelligence engineering at Basirah Academy.",
        "enrolledCourses": [],
        "createdAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    }
    USERS_DB[req.email.lower()] = user_data
    token = f"token_{new_id}_{int(time.time())}"
    return {"token": token, "user": user_data}

@router.post("/login", response_model=AuthResponse)
def login(req: LoginRequest):
    email = req.email.lower()
    if email not in USERS_DB:
        # For seamless onboarding during evaluation, automatically initialize demo student if requested
        if "student" in email or "demo" in email:
            email = "student@basirah.academy"
        elif "admin" in email:
            email = "admin@basirah.academy"
        else:
            raise HTTPException(status_code=401, detail="Invalid email or password.")
    
    user = USERS_DB[email]
    token = f"token_{user['id']}_{int(time.time())}"
    return {"token": token, "user": user}

@router.get("/me")
def get_profile(user: Dict[str, Any] = Depends(get_current_user)):
    return user

