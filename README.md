# 🚀 Тестовый Проект: Dockerized Django & Vite Frontend Application

![Docker](https://img.shields.io/badge/Docker-Backend&Frontend-blue)
![License](https://img.shields.io/badge/License-MIT-green)

![Project Animation](https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif)

**Примечание разработчика: Backend и Frontend можно запустить по отдельности, ниже приведён способ запуска через Docker**
**Примечание разработчика: Суперпользователь (admin) создаётся через django shell, не через обычную регистрацию**

## О проекте

Это тестовый проект, демонстрирующий развертывание **Django** бэкенда и **Vite** фронтенда с использованием **Docker** и **Docker Compose**. Проект включает в себя:

- **Backend:** Django с использованием Gunicorn и PostgreSQL.
- **Frontend:** Современный фронтенд, построенный с использованием Vite и сервируемый через Nginx.

## 🛠️ Требования

Для запуска этого проекта вам понадобится:

- [Docker](https://www.docker.com/get-started) (версия 20.10 или выше)
- [Docker Compose](https://docs.docker.com/compose/install/) (версия 1.29 или выше)
- Git

## 📦 Установка и запуск

### 1. Клонируйте репозиторий

```bash
git clone https://github.com/ваш-юзернейм/ваш-репозиторий.git
cd ваш-репозиторий
```

### 2. Настройте переменные окружения
Создайте файл .env в директории backend и добавьте необходимые переменные окружения. Вот что туда нужно добавить

```bash
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
SECRET_KEY=
DEBUG=
DJANGO_ALLOWED_HOSTS=
```

### 3. Соберите и запустите контейнеры
Используйте Docker Compose для сборки и запуска контейнеров:
```bash
docker compose up --build
```

📁 Структура проекта
root/
├── backend/
│   ├── .pytest_cache/
│   ├── backend/
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   ├── media/
│   │   ├── default_images/
│   │       └── ...
│   ├── shop/
│   │   ├── migrations/
│   │   ├── tests/
│   │   │   └── test_integration.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── views.py
│   ├── users/
│   │   ├── tests/
│   │   │   └── ...
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── views.py
│   ├── .env
│   ├── Dockerfile
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── public/
│   │   ├── index.html
│   │   └── ...
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── ...
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── .env
│   └── .gitignore
├── docker-compose.yml
└── README.md

## 🧰 Используемые технологии

### Backend:
- **Python 3.12**
- **Django**
- **Gunicorn**
- **SQLite**
- **Docker**

---

### Frontend:
- **Vite**
- **Nginx**
- **Docker**

## [![Typing SVG](https://readme-typing-svg.demolab.com/?lines=Надеюсь+проект+вам+понравится;Спасибо+что+уделили+время!)](https://git.io/typing-svg)