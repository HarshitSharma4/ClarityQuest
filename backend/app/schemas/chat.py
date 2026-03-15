from pydantic import BaseModel
from typing import Optional, List

class ChatMessageCreate(BaseModel):
    user_id: str
    message: str
    conversation_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    conversation_id: str
