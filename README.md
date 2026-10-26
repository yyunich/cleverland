# Cleverland — сайт IT-школы (г. Орша)

Сайт детского центра развития и IT-школы **«Клеверленд»** (ООО «КЛЕВЕРЛЕНД», УНП 391988173).
Контент собран из официальных сведений компании и Instagram-аккаунта
[@cleverland_orsha](https://www.instagram.com/cleverland_orsha/).

## Стек

| Часть     | Технологии                                        |
| --------- | ------------------------------------------------- |
| Frontend  | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS |
| Backend   | Python 3.11+, FastAPI, SQLAlchemy 2, SQLite        |
| Интеграции| Telegram Bot API (уведомления о заявках)           |

## Требования к окружению

- **Node.js 20.9+** (вместе с npm) — для фронтенда
- **Python 3.11–3.13** — для бэкенда (рекомендуем 3.12 или 3.13: для самых свежих
  версий Python, например 3.15, часть пакетов ещё не имеет готовых колес и
  требует компилятор MSVC при установке)

## Структура

```
cleverland/
├── backend/                 # FastAPI
│   ├── app/
│   │   ├── main.py          # точка входа, CORS, роутеры
│   │   ├── config.py        # настройки из .env
│   │   ├── database.py      # SQLAlchemy engine/session
│   │   ├── models.py        # модель Application (заявка)
│   │   ├── schemas.py       # Pydantic-схемы
│   │   ├── telegram.py      # уведомления в Telegram
│   │   └── routers/applications.py
│   ├── requirements.txt
│   └── .env.example
└── frontend/                # Next.js
    ├── app/                 # страницы: /, /courses, /courses/[slug], /contacts
    ├── components/          # UI-компоненты
    └── lib/
        ├── courses.ts       # данные о курсах и контакты
        └── api.ts           # клиент для бэкенда
```

## Запуск

> ⚠️ Все зависимости подобраны так, чтобы установка не требовала компилятора
> (нет PyYAML/uvloop/httptools и других C-расширений). Если у вас Python 3.15,
> настоятельно рекомендуется поставить 3.12/3.13 — для них есть готовые колеса
> всех пакетов, и `pip install` пройдёт без ошибок.

### 1. Backend (FastAPI)

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env       # при необходимости заполните
uvicorn app.main:app --reload --port 8000
```

Документация API: http://localhost:8000/docs

### 2. Frontend (Next.js)

```bash
cd frontend
npm install
cp .env.local.example .env.local   # при необходимости укажите адрес API
npm run dev
```

Сайт: http://localhost:3000

## Форма заявки

Форма «Записаться на бесплатный пробный урок» отправляет данные на
`POST /api/applications`:

```json
{
  "parent_name": "Иван",
  "phone": "+375291234567",
  "child_age": "10 лет",
  "course": "Python · 10–14 лет"
}
```

- Заявка сохраняется в SQLite (`backend/cleverland.db`).
- Если в `.env` заданы `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`, владельцу
  приходит уведомление в Telegram. Токен создаётся через [@BotFather](https://t.me/BotFather),
  `chat_id` — через [@userinfobot](https://t.me/userinfobot).
- Просмотр заявок (админ): `GET /api/applications?token=<ADMIN_TOKEN>` —
  токен задаётся в `.env` (по умолчанию `cleverland-admin`).

## Полезное

- **Цены** на сайте не публикуются: акцент на бесплатном пробном уроке.
- **Контакты школы**: г. Орша, ул. Мира, 8 (бизнес-инкубатор, 2-й этаж);
  +375 (29) 569-45-50; ежедневно 10:00–21:00.
- Перед деплоем смените `ADMIN_TOKEN`, укажите прод-`CORS_ORIGINS` и
  `NEXT_PUBLIC_API_URL`.
