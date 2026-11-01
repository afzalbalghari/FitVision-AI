"""MongoDB connection management using PyMongo's native async client."""

import logging

from pymongo import AsyncMongoClient
from pymongo.asynchronous.database import AsyncDatabase
from pymongo.errors import PyMongoError

logger = logging.getLogger(__name__)


class MongoManager:
    """Owns the async MongoDB client. The client connects lazily on first use."""

    def __init__(self, url: str, db_name: str, timeout_ms: int = 3000) -> None:
        self._client: AsyncMongoClient = AsyncMongoClient(
            url, serverSelectionTimeoutMS=timeout_ms
        )
        self._db_name = db_name

    @property
    def db(self) -> AsyncDatabase:
        return self._client[self._db_name]

    async def ping(self) -> bool:
        """Return True if MongoDB answers a ping, False otherwise."""
        try:
            await self._client.admin.command("ping")
            return True
        except PyMongoError as exc:
            logger.warning("MongoDB ping failed: %s", exc.__class__.__name__)
            return False

    async def close(self) -> None:
        await self._client.close()
