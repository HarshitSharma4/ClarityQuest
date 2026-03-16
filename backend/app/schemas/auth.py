from pydantic import BaseModel, EmailStr
from typing import Optional, List

class SignupRequest(BaseModel):
    name: str
    email: str
    password: str
    role: str = "professional"

class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    goals: List[str] = []
    streak: int = 0
    joinedAt: str
    accentPreference: str = "Indian neutral"
