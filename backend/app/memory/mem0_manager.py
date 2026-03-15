from mem0 import Memory
from app.core.config import settings
from app.core.logger import memory_log

class MemoryManager:
    def __init__(self):
        self._memory = None
        # Configuration for Mem0 with Redis and Neo4j
        self._config = {
            "vector_store": {
                "provider": "redis",
                "config": {
                    "redis_url": settings.REDIS_URL,
                    "collection_name": "memories",
                }
            },
            "graph_store": {
                "provider": "neo4j",
                "config": {
                    "url": settings.NEO4J_URL,
                    "username": settings.NEO4J_USER,
                    "password": settings.NEO4J_PASSWORD,
                }
            },
            "llm": {
                "provider": "gemini",
                "config": {
                    "api_key": settings.GEMINI_API_KEY,
                    "model": "gemini-1.5-flash",
                }
            },
            "embedder": {
                "provider": "gemini",
                "config": {
                    "api_key": settings.GEMINI_API_KEY,
                    "model": "models/embedding-001",
                }
            }
        }

    @property
    def memory(self):
        if self._memory is None:
            memory_log("Initializing Mem0 (Lazy Loading)...")
            try:
                self._memory = Memory.from_config(self._config)
                memory_log("Mem0 successfully initialized with Redis and Neo4j")
            except Exception as e:
                memory_log(f"Failed to initialize Mem0: {e}")
                raise e
        return self._memory

    async def add_memory(self, user_id: str, data: str, metadata: dict = None):
        memory_log(f"Adding memory for user {user_id}")
        return self.memory.add(data, user_id=user_id, metadata=metadata)

    async def search_memories(self, user_id: str, query: str, limit: int = 5):
        memory_log(f"Searching memories for user {user_id} with query: {query}")
        return self.memory.search(query, user_id=user_id, limit=limit)

    async def get_all_memories(self, user_id: str):
        return self.memory.get_all(user_id=user_id)

    async def delete_memory(self, memory_id: str):
        return self.memory.delete(memory_id)

    async def reset_memory(self, user_id: str):
        return self.memory.delete_all(user_id=user_id)

memory_manager = MemoryManager()