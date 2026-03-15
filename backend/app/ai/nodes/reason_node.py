import google.generativeai as genai
from app.core.config import settings
from app.core.logger import llm_log

# Configure Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

async def reason_node(state):
    llm_log("Seeking reasoning from Gemini...")
    
    user_message = state["message"]
    memories = state.get("memories", [])
    history = state.get("history", [])
    
    prompt = f"""
    You are a friendly and helpful AI assistant.
    
    CONTEXT FROM LONG TERM MEMORY:
    {chr(10).join(memories) if memories else "No relevant memories found."}
    
    USER MESSAGE:
    {user_message}
    
    Respond based on the user's message and the provided context from their long-term memory.
    """
    
    response = model.generate_content(prompt)
    state["reasoning"] = response.text
    
    return state
