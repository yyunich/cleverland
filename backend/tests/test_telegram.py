# -*- coding: utf-8 -*-
"""Тесты Telegram-уведомлений (без реальной сети).

Что проверяем: правильный текст уведомления, отключение при пустых
настройках и корректный запрос к Telegram API при настроенном боте.
"""
import asyncio

import app.telegram as tg
from app.config import settings
from app.telegram import format_application_message, send_telegram_message


class TestFormatMessage:
    def test_message_contains_all_fields(self):
        msg = format_application_message(
            parent_name="Иван Петров",
            phone="+375291234567",
            child_age="10 лет",
            course="Python · 10–14 лет",
            note="После 18:00",
        )
        assert "Новая заявка" in msg
        assert "Иван Петров" in msg
        assert "+375291234567" in msg
        assert "10 лет" in msg
        assert "Python · 10–14 лет" in msg
        assert "После 18:00" in msg

    def test_message_omits_optional_fields(self):
        msg = format_application_message(
            parent_name="Иван",
            phone="+37529",
            child_age=None,
            course="Scratch",
            note=None,
        )
        assert "Возраст" not in msg
        assert "Комментарий" not in msg


class TestSendMessage:
    def test_disabled_when_token_empty(self, monkeypatch):
        monkeypatch.setattr(settings, "telegram_bot_token", "")
        monkeypatch.setattr(settings, "telegram_chat_id", "")
        assert asyncio.run(send_telegram_message("test")) is False

    def test_disabled_when_chat_id_empty(self, monkeypatch):
        monkeypatch.setattr(settings, "telegram_bot_token", "TOKEN")
        monkeypatch.setattr(settings, "telegram_chat_id", "")
        assert asyncio.run(send_telegram_message("test")) is False

    def test_sends_request_when_configured(self, monkeypatch):
        captured = {}

        class FakeResponse:
            def raise_for_status(self):
                pass

        class FakeAsyncClient:
            def __init__(self, *args, **kwargs):
                pass

            async def __aenter__(self):
                return self

            async def __aexit__(self, *args):
                pass

            async def post(self, url, **kwargs):
                captured["url"] = url
                captured["json"] = kwargs["json"]
                return FakeResponse()

        monkeypatch.setattr(tg.httpx, "AsyncClient", FakeAsyncClient)
        monkeypatch.setattr(settings, "telegram_bot_token", "TOKEN")
        monkeypatch.setattr(settings, "telegram_chat_id", "123456789")

        result = asyncio.run(send_telegram_message("Привет, заявка!"))

        assert result is True
        assert captured["url"].startswith("https://api.telegram.org")
        assert captured["json"]["chat_id"] == "123456789"
        assert captured["json"]["text"] == "Привет, заявка!"

    def test_returns_false_on_network_error(self, monkeypatch):
        class BrokenClient:
            def __init__(self, *args, **kwargs):
                pass

            async def __aenter__(self):
                return self

            async def __aexit__(self, *args):
                pass

            async def post(self, url, **kwargs):
                raise tg.httpx.ConnectError("no network")

        monkeypatch.setattr(tg.httpx, "AsyncClient", BrokenClient)
        monkeypatch.setattr(settings, "telegram_bot_token", "TOKEN")
        monkeypatch.setattr(settings, "telegram_chat_id", "123")

        assert asyncio.run(send_telegram_message("test")) is False
