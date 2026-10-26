# -*- coding: utf-8 -*-
"""Общие фикстуры для тестов бэкенда.

Каждый тест работает с отдельной in-memory SQLite — тесты не трогают
реальную базу cleverland.db и не отправляют сообщения в Telegram.
"""
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.main import app

# --- Тестовая БД: SQLite в памяти (пересоздаётся на каждый тест) ---
engine = create_engine(
    "sqlite:///:memory:",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


@pytest.fixture(autouse=True)
def _clean_db():
    """Чистая схема для каждого теста."""
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def client():
    """HTTP-клиент приложения с тестовой БД вместо настоящей."""
    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


@pytest.fixture(autouse=True)
def _no_telegram(monkeypatch):
    """В тестах API Telegram-уведомления заменяются заглушкой (без сети)."""
    async def fake_send(*args, **kwargs) -> bool:
        return False
    monkeypatch.setattr("app.routers.applications.send_telegram_message", fake_send)
