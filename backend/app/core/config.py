from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    # API Settings
    PROJECT_NAME: str = "ClarityQuest AI Backend"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "your-super-secret-key-for-jwt"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    # Mongo Settings
    MONGO_URL: str = "mongodb://mongo:27017"
    MONGO_DB: str = "clarity_quest"
    
    # Neo4j Settings
    NEO4J_URL: str = "neo4j://neo4j:7687"
    NEO4J_USER: str = "neo4j"
    NEO4J_PASSWORD: str = "password"
    
    # Redis Settings
    REDIS_URL: str = "redis://redis:6379/0"
    
    # Gemini Settings
    GEMINI_API_KEY: str
    
    # Langfuse Settings
    LANGFUSE_PUBLIC_KEY: str
    LANGFUSE_SECRET_KEY: str
    LANGFUSE_HOST: str = "https://cloud.langfuse.com"
    
    # Voice Settings
    WHISPER_MODEL: str = "base"
    TTS_MODEL_PATH: Optional[str] = None
    
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

settings = Settings()
