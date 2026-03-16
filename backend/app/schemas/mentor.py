from pydantic import BaseModel
from typing import List

class MentorResponse(BaseModel):
    id: str
    name: str
    role: str
    description: str
    avatar: str
    personality: str
    expertise: List[str]

class VoiceResponse(BaseModel):
    id: str
    name: str
    type: str

class TopicResponse(BaseModel):
    id: str
    name: str
    description: str
