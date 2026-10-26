# -*- coding: utf-8 -*-
"""Точка входа FastAPI-приложения сайта IT-школы Cleverland (Орша)."""
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import Base, engine
from .routers import applications

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)


@asynccontextmanager
async def lifespan(_: FastAPI):
    # Создание таблиц при старте (для продакшна используйте Alembic-миграции)
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title=settings.app_name,
    description="Backend сайта IT-школы Cleverland: заявки на пробный урок, "
    "уведомления в Telegram.",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS: даём фронтенду (Next.js) обращаться к API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in settings.cors_origins.split(",") if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(applications.router)


@app.get("/", tags=["health"])
async def root() -> dict:
    """Корень API: короткая справка по доступным эндпоинтам."""
    return {
        "app": settings.app_name,
        "message": "Cleverland API работает!",
        "docs": "/docs",
        "health": "/api/health",
        "create_application": "POST /api/applications",
        "list_applications": "GET /api/applications?token=<ADMIN_TOKEN>",
    }


@app.get("/api/health", tags=["health"])
async def health() -> dict:
    """Проверка работоспособности API."""
    return {"status": "ok", "app": settings.app_name}
