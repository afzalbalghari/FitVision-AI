"""FastAPI application entry point."""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.database import MongoManager
from app.routers import health
from app.utils.exceptions import register_exception_handlers
from app.utils.logging import setup_logging

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    setup_logging(settings.log_level)
    app.state.mongo = MongoManager(
        settings.mongodb_url, settings.mongodb_db_name, settings.mongodb_timeout_ms
    )
    logger.info("%s started (%s)", settings.app_name, settings.environment)
    yield
    await app.state.mongo.close()
    logger.info("%s stopped", settings.app_name)


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(
        title=f"{settings.app_name} API",
        version="0.1.0",
        docs_url=None if settings.is_production else "/docs",
        redoc_url=None,
        lifespan=lifespan,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    register_exception_handlers(app)
    app.include_router(health.router, prefix=settings.api_prefix)
    return app


app = create_app()
