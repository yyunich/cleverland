# -*- coding: utf-8 -*-
"""Уведомления о заявках в Telegram.

Если TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID не заданы в .env,
уведомления молча отключаются (заявка всё равно сохраняется в БД).
"""
import logging

import httpx

from .config import settings

logger = logging.getLogger(__name__)

TELEGRAM_API = "https://api.telegram.org/bot{token}/sendMessage"


async def send_telegram_message(text: str) -> bool:
    """Отправить сообщение в Telegram. Возвращает True при успехе."""
    token = settings.telegram_bot_token.strip()
    chat_id = settings.telegram_chat_id.strip()

    if not token or not chat_id:
        logger.info("Telegram не настроен — уведомление пропущено.")
        return False

    try:
        async with httpx.AsyncClient(timeout=10) as client:
            resp = await client.post(
                TELEGRAM_API.format(token=token),
                json={"chat_id": chat_id, "text": text, "disable_web_page_preview": True},
            )
            resp.raise_for_status()
        return True
    except httpx.HTTPError as exc:
        logger.error("Не удалось отправить сообщение в Telegram: %s", exc)
        return False


def format_application_message(
    parent_name: str, phone: str, child_age: str | None, course: str, note: str | None
) -> str:
    """Текст уведомления о новой заявке."""
    lines = [
        "🆕 Новая заявка на пробный урок!",
        "",
        f"👤 Родитель: {parent_name}",
        f"📞 Телефон: {phone}",
    ]
    if child_age:
        lines.append(f"🎂 Возраст ребёнка / класс: {child_age}")
    lines.append(f"🎯 Направление: {course}")
    if note:
        lines.append(f"📝 Комментарий: {note}")
    lines.append("")
    lines.append("Обработайте заявку и свяжитесь с родителем 😊")
    return "\n".join(lines)
