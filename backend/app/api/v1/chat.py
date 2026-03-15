from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from app.schemas.chat import ChatMessageCreate, ChatResponse
from app.services.ai_service import ai_service
from app.core.logger import api_log
import asyncio
import json

router = APIRouter()

@router.post("/message", response_model=ChatResponse)
async def send_message(chat_data: ChatMessageCreate):
    api_log(f"Received message from user {chat_data.user_id}")
    
    try:
        response = await ai_service.process_message(
            user_id=chat_data.user_id,
            message=chat_data.message,
            conversation_id=chat_data.conversation_id
        )
        
        return ChatResponse(
            response=response,
            conversation_id=chat_data.conversation_id or "default"
        )
    except Exception as e:
        api_log(f"Error processing message: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/stream/{conversation_id}")
async def stream_chat(conversation_id: str, user_id: str):
    api_log(f"Starting SSE stream for user {user_id}, conversation {conversation_id}")
    
    async def event_generator():
        # Mocking a streaming response for now
        # In a real scenario, this would yield chunks from the LLM
        tokens = ["Hello!", " How", " can", " I", " help", " you", " today?"]
        for token in tokens:
            await asyncio.sleep(0.5)
            yield f"data: {json.dumps({'content': token})}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")
