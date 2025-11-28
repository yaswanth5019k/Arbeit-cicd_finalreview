# Arbeit

## 🚀 Deployment Options

This project supports **multiple deployment strategies**:

| Method | Description | Guide |
|--------|-------------|-------|
| **Ansible** | Automated deployment to Tomcat servers | [📖 ANSIBLE_GUIDE.md](ANSIBLE_GUIDE.md) |
| **Kubernetes** | Container orchestration with K8s | See `k8s/` folder |
| **Docker Compose** | Local development | See below |
| **Jenkins** | CI/CD pipeline | See `Jenkinsfile` |

---

## 🤖 Ansible Deployment (NEW)

Quick deploy using Ansible automation:

```bash
# One-time server setup
./deploy.sh setup

# Deploy complete application
./deploy.sh full

# Deploy backend only
./deploy.sh backend

# Deploy frontend only
./deploy.sh frontend
```

**📚 Full Ansible documentation:** [ANSIBLE_GUIDE.md](ANSIBLE_GUIDE.md)

---

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

1. **`ci.yml`** – Runs on pushes/PRs to validate code quality:
   - Builds & tests the backend with Maven (Java 21)
   - Installs & builds the frontend with Node 18
   - Ensures `docker compose build` succeeds (validates the container stack)

2. **`deploy.yml`** – Runs on pushes to `main` branch:
   - Builds Docker images for backend and frontend
   - Publishes images to GitHub Container Registry (GHCR)
   - Images are available at:
     - `ghcr.io/yaswanth5019k/arbeit-cicd_finalreview/backend:latest`
     - `ghcr.io/yaswanth5019k/arbeit-cicd_finalreview/frontend:latest`

### Using Published Images

Pull and run the published images:

```bash
# Pull images
docker pull ghcr.io/yaswanth5019k/arbeit-cicd_finalreview/backend:latest
docker pull ghcr.io/yaswanth5019k/arbeit-cicd_finalreview/frontend:latest

# Or use them in your docker-compose.yml
```

Keep `backend/docker.env` and `frontend/docker.env` in sync with any credential
changes so Compose and the deployment workflow keep functioning.