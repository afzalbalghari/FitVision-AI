"""Application settings loaded from environment variables (and an optional .env file)."""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # General
    app_name: str = "FitVision AI"
    environment: str = "development"
    log_level: str = "INFO"
    api_prefix: str = "/api"

    # Database
    mongodb_url: str = "mongodb://localhost:27017"
    mongodb_db_name: str = "fitvision"
    mongodb_timeout_ms: int = 3000

    # Frontend / CORS (comma-separated list of allowed origins)
    frontend_url: str = "http://localhost:3000"

    # Auth (used from Phase 3)
    jwt_secret: str = "change-this-secret-in-your-env-file"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    # AI provider (used from Phase 8/9). "none" means not configured.
    ai_provider: str = "none"
    ai_api_key: str = ""

    @property
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.frontend_url.split(",") if o.strip()]

    @property
    def is_production(self) -> bool:
        return self.environment.lower() == "production"


@lru_cache
def get_settings() -> Settings:
    return Settings()
