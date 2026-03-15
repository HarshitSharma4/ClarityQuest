from app.core.logger import llm_log

async def router_node(state):
    llm_log("Routing request...")
    # For now, simple routing to memory. 
    # In a more complex system, this would determine if we need search, tools, etc.
    state["next_step"] = "memory"
    return state
