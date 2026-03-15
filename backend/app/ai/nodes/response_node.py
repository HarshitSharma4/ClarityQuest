from app.core.logger import llm_log
from app.memory.mem0_manager import memory_manager

async def response_node(state):
    llm_log("Finalizing response...")
    
    state["response"] = state["reasoning"]
    
    # Asynchronously update memory with the new interaction
    # In a production app, this might be handled by a background worker
    user_id = state["user_id"]
    message = state["message"]
    response = state["response"]
    
    # We could trigger a background task here to update Mem0
    # For now, we'll just return the state
    return state
