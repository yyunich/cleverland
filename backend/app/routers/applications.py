# -*- coding: utf-8 -*-
"""Роутер заявок: создание (публичное) и просмотр (по токену)."""
import logging

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..config import settings
from ..database import get_db
from ..models import Application
from ..schemas import (
    ApplicationCreate,
    ApplicationRead,
    ApplicationStatusUpdate,
)
from ..telegram import format_application_message, send_telegram_message

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/applications", tags=["applications"])


@router.post("", response_model=ApplicationRead, status_code=201)
async def create_application(
    payload: ApplicationCreate,
    db: Session = Depends(get_db),
) -> Application:
    """Сохранить заявку с формы сайта и отправить уведомление в Telegram."""
    application = Application(
        parent_name=payload.parent_name,
        phone=payload.phone,
        child_age=payload.child_age,
        course=payload.course,
        note=payload.note,
    )
    db.add(application)
    db.commit()
    db.refresh(application)

    # Уведомление отправляем после сохранения; сбой не роняет запрос
    await send_telegram_message(
        format_application_message(
            parent_name=application.parent_name,
            phone=application.phone,
            child_age=application.child_age,
            course=application.course,
            note=application.note,
        )
    )
    return application


@router.get("", response_model=list[ApplicationRead])
async def list_applications(
    token: str = Query(..., description="Токен администратора"),
    status: str | None = Query(default=None),
    limit: int = Query(default=100, ge=1, le=500),
    db: Session = Depends(get_db),
) -> list[Application]:
    """Список заявок (доступен только владельцу сайта)."""
    if token != settings.admin_token:
        raise HTTPException(status_code=403, detail="Неверный токен")

    stmt = select(Application).order_by(Application.created_at.desc()).limit(limit)
    if status:
        stmt = stmt.where(Application.status == status)
    return list(db.scalars(stmt))


@router.patch("/{application_id}", response_model=ApplicationRead)
async def update_application_status(
    application_id: int,
    payload: ApplicationStatusUpdate,
    token: str = Query(..., description="Токен администратора"),
    db: Session = Depends(get_db),
) -> Application:
    """Изменить статус заявки (new → contacted → closed)."""
    if token != settings.admin_token:
        raise HTTPException(status_code=403, detail="Неверный токен")

    application = db.get(Application, application_id)
    if application is None:
        raise HTTPException(status_code=404, detail="Заявка не найдена")
    application.status = payload.status
    db.commit()
    db.refresh(application)
    return application


@router.delete("/{application_id}", status_code=204)
async def delete_application(
    application_id: int,
    token: str = Query(..., description="Токен администратора"),
    db: Session = Depends(get_db),
) -> None:
    """Удалить заявку (например, тестовую или устаревшую)."""
    if token != settings.admin_token:
        raise HTTPException(status_code=403, detail="Неверный токен")

    application = db.get(Application, application_id)
    if application is None:
        raise HTTPException(status_code=404, detail="Заявка не найдена")
    db.delete(application)
    db.commit()
