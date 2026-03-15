from pydantic import BaseModel
from typing import Optional

class VoiceResponse(BaseModel):
    text_response: str
    audio_url: str
    conversation_id: str
