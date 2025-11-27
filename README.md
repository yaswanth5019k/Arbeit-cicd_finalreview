# Arbeit

## Docker workflow

The repo now contains a complete Docker setup (see `docker-compose.yml`) that builds
and runs the three core services:

| Service   | Container | Host Port | Notes |
|-----------|-----------|-----------|-------|
| MySQL     | `arbeit-mysql`    | `3307` → `3306` | Data persisted in the `mysql-data` volume |
| Backend   | `arbeit-backend`  | `9090` | Spring Boot app running with envs from `backend/docker.env` |
| Frontend  | `arbeit-frontend` | `8080` → `80` | Static Next.js build served by Nginx |

### One-time setup

```bash
cd Arbeit-cicd_finalreview
docker compose build   # builds the frontend + backend images
```

### Start the stack

```bash
docker compose up -d
```

Then open:
- `http://localhost:8080` – Next.js UI (points to the backend automatically)
- `http://localhost:9090/api` – Spring Boot API
- `localhost:3307` – MySQL (user: `root`, password: `2300032238`)

### Tear down / logs

```bash
docker compose logs -f backend     # Tail backend logs
docker compose down --remove-orphans
```

## GitHub Actions

Two workflows now live under `.github/workflows/`:

1. `ci.yml` – Runs on pushes/PRs. It:
   - builds & tests the backend with Maven (Java 17),
   - installs & builds the frontend with Node 18,
   - ensures `docker compose build` succeeds (validates the container stack).

2. `deploy.yml` – Existing SSH-based deployment that pulls the repo on your EC2 box
   and runs `docker compose up -d --build`.

Keep `backend/docker.env` and `frontend/docker.env` in sync with any credential
changes so Compose and the deployment workflow keep functioning.