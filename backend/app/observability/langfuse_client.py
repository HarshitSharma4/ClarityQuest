from langfuse import Langfuse
from app.core.config import settings
from app.core.logger import api_log

class LangfuseClient:
    def __init__(self):
        self.langfuse = Langfuse(
            public_key=settings.LANGFUSE_PUBLIC_KEY,
            secret_key=settings.LANGFUSE_SECRET_KEY,
            host=settings.LANGFUSE_HOST
        )
        api_log("Langfuse client initialized")

    def trace_generation(self, name: str, prompt: str, completion: str, model: str = "gemini-1.5-flash"):
        api_log(f"Tracing generation for {name} in Langfuse")
        self.langfuse.generation(
            name=name,
            model=model,
            prompt=prompt,
            completion=completion
        )

langfuse_client = LangfuseClient()
