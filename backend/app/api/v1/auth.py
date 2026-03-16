from fastapi import APIRouter, HTTPException
from app.schemas.auth import SignupRequest, LoginRequest, TokenResponse, UserResponse
from app.core.security import create_access_token, get_password_hash, verify_password
from app.db.mongo import mongo_db
from app.core.logger import api_log
from datetime import datetime

router = APIRouter()

@router.post("/signup", response_model=TokenResponse)
async def signup(data: SignupRequest):
    api_log(f"Signup attempt for {data.email}")
    db = mongo_db.get_db()
    
    existing = await db.users.find_one({"email": data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_doc = {
        "name": data.name,
        "email": data.email,
        "password": get_password_hash(data.password),
        "role": data.role,
        "goals": [],
        "streak": 0,
        "joinedAt": datetime.utcnow().isoformat(),
        "accentPreference": "Indian neutral",
    }
    result = await db.users.insert_one(user_doc)
    token = create_access_token({"sub": str(result.inserted_id), "email": data.email})
    return TokenResponse(access_token=token)

@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest):
    api_log(f"Login attempt for {data.email}")
    db = mongo_db.get_db()
    
    user = await db.users.find_one({"email": data.email})
    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token = create_access_token({"sub": str(user["_id"]), "email": data.email})
    return TokenResponse(access_token=token)

@router.get("/me", response_model=UserResponse)
async def get_me():
    """For now returns a default user. In production, extract from JWT."""
    db = mongo_db.get_db()
    user = await db.users.find_one()
    if not user:
        return UserResponse(
            id="u1", name="Harshit", email="harshit@example.com",
            role="professional", goals=["Technical interview", "Presentation"],
            streak=7, joinedAt="2025-12-01", accentPreference="Indian neutral"
        )
    return UserResponse(
        id=str(user["_id"]),
        name=user.get("name", "User"),
        email=user.get("email", ""),
        role=user.get("role", "professional"),
        goals=user.get("goals", []),
        streak=user.get("streak", 0),
        joinedAt=user.get("joinedAt", ""),
        accentPreference=user.get("accentPreference", "Indian neutral"),
    )
