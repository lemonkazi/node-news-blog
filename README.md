# 📰 News Aggregator API

A RESTful API for a news aggregator service. Built using Node.js, Express, MySQL, and Docker.

---

## 🚀 Features

- 🔐 User authentication with JWT
- 📰 Article management with search & pagination
- ❤️ User preferences (sources, authors, categories)
- 🧠 Personalized news feed
- 🔁 Scheduled news fetch from NewsAPI.org
- 📦 Dockerized setup
- 📚 Swagger-based API documentation

---

## 📂 Tech Stack

- Node.js + Express.js
- MySQL + Sequelize
- JWT for authentication
- Swagger for API docs
- Docker & Docker Compose
- NewsAPI.org for news aggregation

---

## ⚙️ Getting Started

### Prerequisites

- Docker & Docker Compose installed

### Clone and Run

```bash
git clone
cp .env.example .env
# update NEWS_API_KEY and JWT_ACCESS_SECRET in .env
docker-compose up --build

```
## How to run the API
1. Run `docker-compose up -d --build` to install all dependencies.

2.
You're ready to go! register with api: http://localhost:5000/api/auth/register

{
  "name": "lemon",
  "email": "lemon@example.com",
  "password": "password123"
}

## Commit Message Template

To help keep our commit messages consistent, please run this after cloning:

    git config commit.template .gitmessage.txt

Now, every time you commit, Git will prompt you with our standard template.