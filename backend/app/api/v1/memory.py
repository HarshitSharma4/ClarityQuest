from fastapi import APIRouter, HTTPException
from app.memory.mem0_manager import memory_manager
from app.core.logger import api_log
from typing import List, Dict, Any

router = APIRouter()

@router.get("/{user_id}")
async def get_memories(user_id: str):
    api_log(f"Retrieving all memories for user {user_id}")
    try:
        memories = await memory_manager.get_all_memories(user_id)
        return {"user_id": user_id, "memories": memories}
    except Exception as e:
        api_log(f"Error retrieving memories: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/add")
async def add_memory(user_id: str, text: str, metadata: Dict[str, Any] = None):
    api_log(f"Manually adding memory for user {user_id}")
    try:
        result = await memory_manager.add_memory(user_id, text, metadata)
        return {"status": "success", "result": result}
    except Exception as e:
        api_log(f"Error adding memory: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/reset/{user_id}")
async def reset_memories(user_id: str):
    api_log(f"Resetting all memories for user {user_id}")
    try:
        await memory_manager.reset_memory(user_id)
        return {"status": "success", "message": f"Memories for user {user_id} have been reset"}
    except Exception as e:
        api_log(f"Error resetting memories: {e}")
        raise HTTPException(status_code=500, detail=str(e))
