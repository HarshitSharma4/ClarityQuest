from typing import TypedDict, Annotated, List, Dict, Any
from langgraph.graph import StateGraph, END
from app.ai.nodes.router_node import router_node
from app.ai.nodes.memory_node import memory_node
from app.ai.nodes.reason_node import reason_node
from app.ai.nodes.response_node import response_node

class AgentState(TypedDict):
    user_id: str
    message: str
    conversation_id: str
    memories: List[str]
    reasoning: str
    response: str
    next_step: str
    history: List[Dict[str, str]]

def create_graph():
    workflow = StateGraph(AgentState)

    # Add nodes
    workflow.add_node("router", router_node)
    workflow.add_node("memory", memory_node)
    workflow.add_node("reason", reason_node)
    workflow.add_node("response", response_node)

    # Set entry point
    workflow.set_entry_point("router")

    # Add edges
    workflow.add_edge("router", "memory")
    workflow.add_edge("memory", "reason")
    workflow.add_edge("reason", "response")
    workflow.add_edge("response", END)

    return workflow.compile()

agent_graph = create_graph()
