from app.ai.graph import agent_graph
from app.core.logger import api_log
from app.observability.langfuse_client import langfuse_client

class AIService:
    async def process_message(self, user_id: str, message: str, conversation_id: str = None, history: list = None):
        api_log(f"Processing AI request for user {user_id}")
        
        initial_state = {
            "user_id": user_id,
            "message": message,
            "conversation_id": conversation_id or "default",
            "history": history or [],
            "memories": [],
            "reasoning": "",
            "response": "",
            "next_step": ""
        }
        
        result = await agent_graph.ainvoke(initial_state)
        
        # Trace generation in Langfuse
        langfuse_client.trace_generation(
            name="chat_interaction",
            prompt=message,
            completion=result["response"]
        )
        
        return result["response"]

ai_service = AIService()
