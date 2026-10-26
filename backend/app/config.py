# -*- coding: utf-8 -*-
"""Настройки приложения из переменных окружения / файла .env.

Используется python-dotenv (чистый Python, без C-расширений) — это позволяет
устанавливать зависимости без компилятора MSVC.
"""
import os
from functools import lru_cache
from pathlib import Path

from dotenv import load_dotenv

# Загружаем .env из директории запуска (или рядом с проектом)
load_dotenv(Path(__file__).resolve().parent.parent / ".env")
load_dotenv()  # fallback: текущая рабочая директория


class Settings:
    app_name: str = "Cleverland API"
    # SQLite по умолчанию — для продкшн-развёртывания замените на PostgreSQL
    database_url: str = os.getenv("DATABASE_URL", "sqlite:///./cleverland.db")

    # Telegram-уведомления о новых заявках (оставьте пустым, чтобы отключить)
    telegram_bot_token: str = os.getenv("TELEGRAM_BOT_TOKEN", "")
    telegram_chat_id: str = os.getenv("TELEGRAM_CHAT_ID", "")

    # Токен для просмотра заявок: GET /api/applications?token=...
    admin_token: str = os.getenv("ADMIN_TOKEN", "cleverland-admin")

    # Разрешённые источники (origin) для фронтенда
    cors_origins: str = os.getenv("CORS_ORIGINS", "http://localhost:3000")


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
