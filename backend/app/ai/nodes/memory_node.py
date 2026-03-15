from app.memory.mem0_manager import memory_manager
from app.core.logger import memory_log

async def memory_node(state):
    user_id = state["user_id"]
    message = state["message"]
    memory_log(f"Retrieving memory for user {user_id}")
    
    memories = await memory_manager.search_memories(user_id, message)
    state["memories"] = [m["text"] for m in memories] if memories else []
    
    return state
