# -*- coding: utf-8 -*-
"""Подключение к базе данных (SQLAlchemy 2)."""
from sqlalchemy import create_engine, event
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from .config import settings

# check_same_thread=False — необходимо для SQLite при работе из FastAPI.
# timeout=30 — busy_timeout: при конкурентной записи ждём до 30 секунд
# вместо мгновенной ошибки "database is locked".
connect_args = (
    {"check_same_thread": False, "timeout": 30}
    if settings.database_url.startswith("sqlite")
    else {}
)

engine = create_engine(settings.database_url, connect_args=connect_args)


@event.listens_for(engine, "connect")
def _set_sqlite_pragmas(dbapi_connection, connection_record):
    """SQLite-настройки для каждого коннекта:
    - WAL-режим: читатели не блокируют писателя и наоборот
    - busy_timeout: ждать освобождения файла (дублирует timeout выше)
    """
    if settings.database_url.startswith("sqlite"):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA journal_mode=WAL")
        cursor.execute("PRAGMA busy_timeout=30000")
        cursor.execute("PRAGMA synchronous=NORMAL")
        cursor.close()


SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


class Base(DeclarativeBase):
    pass


def get_db():
    """FastAPI-зависимость: сессия БД на время запроса."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
