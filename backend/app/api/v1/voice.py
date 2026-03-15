from typing import Optional
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.schemas.voice import VoiceResponse
from app.services.voice_service import voice_service
from app.services.ai_service import ai_service
from app.utils.audio import audio_utils
from app.core.logger import api_log

router = APIRouter()

@router.post("/input", response_model=VoiceResponse)
async def voice_input(
    user_id: str = Form(...),
    conversation_id: Optional[str] = Form(None),
    audio: UploadFile = File(...)
):
    api_log(f"Received voice input from user {user_id}")
    
    # 1. Save temp audio
    content = await audio.read()
    temp_path = audio_utils.save_temp_audio(content)
    
    try:
        # 2. Transcribe (STT)
        text_input = await voice_service.transcribe(temp_path)
        
        # 3. Process with AI
        ai_text_response = await ai_service.process_message(
            user_id=user_id,
            message=text_input,
            conversation_id=conversation_id
        )
        
        # 4. Generate Speech (TTS)
        audio_response_path = await voice_service.generate_speech(ai_text_response)
        
        # In a real app, you'd upload this to S3/CDN and return a URL
        # For now, we'll return a mock URL
        return VoiceResponse(
            text_response=ai_text_response,
            audio_url=f"/static/audio/{audio_response_path.split('/')[-1]}",
            conversation_id=conversation_id or "default"
        )
        
    except Exception as e:
        api_log(f"Error processing voice input: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        audio_utils.cleanup_temp_audio(temp_path)
