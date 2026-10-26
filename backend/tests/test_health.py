# -*- coding: utf-8 -*-
"""Тесты служебных эндпоинтов: корень и health-проверка.

Что проверяем: API вообще отвечает и говорит, что живо.
Если «сломано» — значит, сервер не поднялся или упал конфиг.
"""


def test_root_returns_api_info(client):
    resp = client.get("/")
    assert resp.status_code == 200
    data = resp.json()
    assert data["app"] == "Cleverland API"
    assert data["docs"] == "/docs"
    assert data["health"] == "/api/health"


def test_health_ok(client):
    resp = client.get("/api/health")
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok", "app": "Cleverland API"}


def test_unknown_route_returns_404(client):
    resp = client.get("/api/no-such-route")
    assert resp.status_code == 404
    assert resp.json() == {"detail": "Not Found"}
