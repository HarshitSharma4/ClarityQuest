from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings
from app.core.logger import db_log

class MongoDB:
    client: AsyncIOMotorClient = None
    db = None

    async def connect(self):
        db_log(f"Connecting to MongoDB at {settings.MONGO_URL}")
        self.client = AsyncIOMotorClient(settings.MONGO_URL)
        self.db = self.client[settings.MONGO_DB]
        db_log("Connected to MongoDB")

    async def close(self):
        if self.client:
            self.client.close()
            db_log("Closed MongoDB connection")

mongo_db = MongoDB()

async def get_db():
    return mongo_db.db
