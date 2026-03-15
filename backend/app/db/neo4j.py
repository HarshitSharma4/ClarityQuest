from neo4j import AsyncGraphDatabase
from app.core.config import settings
from app.core.logger import db_log

class Neo4jDB:
    driver = None

    async def connect(self):
        db_log(f"Connecting to Neo4j at {settings.NEO4J_URL}")
        self.driver = AsyncGraphDatabase.driver(
            settings.NEO4J_URL,
            auth=(settings.NEO4J_USER, settings.NEO4J_PASSWORD)
        )
        db_log("Connected to Neo4j")

    async def close(self):
        if self.driver:
            await self.driver.close()
            db_log("Closed Neo4j connection")

neo4j_db = Neo4jDB()

async def get_neo4j_session():
    async with neo4j_db.driver.session() as session:
        yield session
