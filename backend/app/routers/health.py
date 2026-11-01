"""Health check endpoint."""

from fastapi import APIRouter, Request
from pydantic import BaseModel

from app.config import get_settings

router = APIRouter(tags=["health"])


class HealthResponse(BaseModel):
    status: str
    app: str
    environment: str
    database: str


@router.get("/health", response_model=HealthResponse)
async def health(request: Request) -> HealthResponse:
    settings = get_settings()
    db_ok = await request.app.state.mongo.ping()
    return HealthResponse(
        status="ok" if db_ok else "degraded",
        app=settings.app_name,
        environment=settings.environment,
        database="connected" if db_ok else "unreachable",
    )
