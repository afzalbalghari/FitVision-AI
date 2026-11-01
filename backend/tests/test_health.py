from fastapi.testclient import TestClient

from app.main import app


class StubMongo:
    def __init__(self, ok: bool) -> None:
        self.ok = ok

    async def ping(self) -> bool:
        return self.ok

    async def close(self) -> None:
        return None


def test_health_reports_ok_when_database_is_reachable():
    with TestClient(app) as client:
        app.state.mongo = StubMongo(True)
        response = client.get("/api/health")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert body["database"] == "connected"


def test_health_reports_degraded_when_database_is_down():
    with TestClient(app) as client:
        app.state.mongo = StubMongo(False)
        response = client.get("/api/health")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "degraded"
    assert body["database"] == "unreachable"


def test_unknown_route_uses_standard_error_shape():
    with TestClient(app) as client:
        response = client.get("/api/does-not-exist")
    assert response.status_code == 404
    assert response.json()["error"]["code"] == "http_error"
