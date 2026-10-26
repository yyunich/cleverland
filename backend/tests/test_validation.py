# -*- coding: utf-8 -*-
"""Тесты валидации входящих данных формы.

Что проверяем: «грязные» данные с формы (пустые поля, мусор) отсекаются
на входе и не попадают в базу. Если тест падает — либо ослабла валидация,
либо Pydantic-схема сломана.
"""


def make_application(client, **overrides):
    payload = {
        "parent_name": "Иван Петров",
        "phone": "+375291234567",
        "child_age": "10 лет",
        "course": "Python · 10–14 лет",
    }
    payload.update(overrides)
    return client.post("/api/applications", json=payload)


class TestParentNameValidation:
    def test_empty_name_rejected(self, client):
        resp = make_application(client, parent_name="")
        assert resp.status_code == 422

    def test_whitespace_name_rejected(self, client):
        resp = make_application(client, parent_name="   ")
        assert resp.status_code == 422

    def test_short_name_rejected(self, client):
        resp = make_application(client, parent_name="А")
        assert resp.status_code == 422

    def test_missing_name_rejected(self, client):
        payload = {
            "phone": "+375291234567",
            "child_age": "10 лет",
            "course": "Python · 10–14 лет",
        }
        resp = client.post("/api/applications", json=payload)
        assert resp.status_code == 422


class TestPhoneValidation:
    def test_empty_phone_rejected(self, client):
        resp = make_application(client, phone="")
        assert resp.status_code == 422

    def test_too_short_phone_rejected(self, client):
        resp = make_application(client, phone="123")
        assert resp.status_code == 422

    def test_missing_phone_rejected(self, client):
        resp = make_application(client, phone=None)
        assert resp.status_code == 422


class TestCourseValidation:
    def test_empty_course_rejected(self, client):
        resp = make_application(client, course="")
        assert resp.status_code == 422

    def test_whitespace_course_rejected(self, client):
        resp = make_application(client, course="   ")
        assert resp.status_code == 422

    def test_missing_course_rejected(self, client):
        payload = {
            "parent_name": "Иван Петров",
            "phone": "+375291234567",
            "child_age": "10 лет",
        }
        resp = client.post("/api/applications", json=payload)
        assert resp.status_code == 422


class TestHappyPath:
    def test_valid_payload_passes(self, client):
        resp = make_application(client)
        assert resp.status_code == 201

    def test_whitespace_around_name_is_stripped(self, client):
        resp = make_application(client, parent_name="  Иван Петров  ")
        assert resp.status_code == 201
        assert resp.json()["parent_name"] == "Иван Петров"
