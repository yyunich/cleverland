# -*- coding: utf-8 -*-
"""Сценарий работы с заявками: создание, список, статус, удаление.

Если какой-то тест падает — сразу видно, какая часть цепочки сломана:
формирование заявки, сохранение в БД, защита токеном или изменение статуса.
"""

TESTS_TOKEN = "cleverland-admin"
WRONG_TOKEN = "not-the-token"


def make_application(client, **overrides):
    payload = {
        "parent_name": "Иван Петров",
        "phone": "+375291234567",
        "child_age": "10 лет",
        "course": "Python · 10–14 лет",
        "note": "Интересует пробный урок",
    }
    payload.update(overrides)
    return client.post("/api/applications", json=payload)


class TestCreateApplication:
    def test_create_returns_201_and_saves(self, client):
        resp = make_application(client)
        assert resp.status_code == 201
        data = resp.json()
        assert data["id"] > 0
        assert data["parent_name"] == "Иван Петров"
        assert data["phone"] == "+375291234567"
        assert data["child_age"] == "10 лет"
        assert data["course"] == "Python · 10–14 лет"
        assert data["note"] == "Интересует пробный урок"
        assert data["status"] == "new"
        assert data["created_at"] is not None

    def test_child_age_and_note_optional(self, client):
        resp = make_application(client, child_age=None, note=None)
        assert resp.status_code == 201
        data = resp.json()
        assert data["child_age"] is None
        assert data["note"] is None

    def test_created_application_available_in_list(self, client):
        make_application(client)
        resp = client.get(f"/api/applications?token={TESTS_TOKEN}")
        assert resp.status_code == 200
        items = resp.json()
        assert len(items) == 1
        assert items[0]["parent_name"] == "Иван Петров"


class TestListApplications:
    def test_list_requires_valid_token(self, client):
        resp = client.get(f"/api/applications?token={WRONG_TOKEN}")
        assert resp.status_code == 403

    def test_list_without_token_rejected(self, client):
        resp = client.get("/api/applications")
        assert resp.status_code == 422  # обязательный query-параметр

    def test_list_empty(self, client):
        resp = client.get(f"/api/applications?token={TESTS_TOKEN}")
        assert resp.status_code == 200
        assert resp.json() == []

    def test_status_filter(self, client):
        make_application(client)
        second = make_application(client, parent_name="Анна Смирнова")
        second_id = second.json()["id"]
        client.patch(
            f"/api/applications/{second_id}",
            json={"status": "contacted"},
            params={"token": TESTS_TOKEN},
        )

        new_only = client.get(
            f"/api/applications?token={TESTS_TOKEN}&status=new"
        ).json()
        contacted_only = client.get(
            f"/api/applications?token={TESTS_TOKEN}&status=contacted"
        ).json()
        assert len(new_only) == 1
        assert new_only[0]["parent_name"] == "Иван Петров"
        assert len(contacted_only) == 1
        assert contacted_only[0]["parent_name"] == "Анна Смирнова"


class TestPatchStatus:
    def test_patch_status(self, client):
        app_id = make_application(client).json()["id"]
        resp = client.patch(
            f"/api/applications/{app_id}",
            json={"status": "contacted"},
            params={"token": TESTS_TOKEN},
        )
        assert resp.status_code == 200
        assert resp.json()["status"] == "contacted"

    def test_patch_rejects_unknown_status(self, client):
        app_id = make_application(client).json()["id"]
        resp = client.patch(
            f"/api/applications/{app_id}",
            json={"status": "deleted-forever"},
            params={"token": TESTS_TOKEN},
        )
        assert resp.status_code == 422

    def test_patch_missing_application_404(self, client):
        resp = client.patch(
            "/api/applications/9999",
            json={"status": "contacted"},
            params={"token": TESTS_TOKEN},
        )
        assert resp.status_code == 404

    def test_patch_requires_valid_token(self, client):
        app_id = make_application(client).json()["id"]
        resp = client.patch(
            f"/api/applications/{app_id}",
            json={"status": "contacted"},
            params={"token": WRONG_TOKEN},
        )
        assert resp.status_code == 403


class TestDeleteApplication:
    def test_delete_returns_204(self, client):
        app_id = make_application(client).json()["id"]
        resp = client.delete(
            f"/api/applications/{app_id}", params={"token": TESTS_TOKEN}
        )
        assert resp.status_code == 204
        # после удаления список пуст
        items = client.get(f"/api/applications?token={TESTS_TOKEN}").json()
        assert items == []

    def test_delete_missing_application_404(self, client):
        resp = client.delete(
            "/api/applications/9999", params={"token": TESTS_TOKEN}
        )
        assert resp.status_code == 404

    def test_delete_requires_valid_token(self, client):
        app_id = make_application(client).json()["id"]
        resp = client.delete(
            f"/api/applications/{app_id}", params={"token": WRONG_TOKEN}
        )
        assert resp.status_code == 403
