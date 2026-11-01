# FitVision AI

AI personal fitness coach. Phase 1 contains the project foundation only: Next.js frontend, FastAPI backend, MongoDB connection, Docker setup.

## Requirements (Windows 11)

- Python 3.12 (3.11 also fine)
- Node.js 22 LTS
- MongoDB (local install, Docker, or a free MongoDB Atlas cluster)
- Git, VS Code. Docker Desktop is optional.

## Option 1: Local development

### 1. Database

Easiest is Docker for MongoDB only:

```powershell
docker run -d --name fitvision-mongo -p 27017:27017 -v fitvision-mongo-data:/data/db mongo:7
```

Or install MongoDB Community locally, or use an Atlas connection string in `backend\.env`.

### 2. Backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements-dev.txt
Copy-Item .env.example .env
uvicorn app.main:app --reload --port 8000
```

If PowerShell blocks activation: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

Check: http://localhost:8000/api/health and http://localhost:8000/docs

### 3. Frontend (new terminal)

```powershell
cd frontend
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open http://localhost:3000. The "System status" card calls the backend for real.

### 4. Tests and checks

```powershell
cd backend ; pytest
cd ..\frontend ; npm run typecheck ; npm run build
```

## Option 2: Docker development

```powershell
Copy-Item .env.example .env
docker compose up --build
```

Frontend: http://localhost:3000, API: http://localhost:8000, MongoDB: localhost:27017.

## Structure

See `backend/app` (routers, services, models, schemas, ai, computer_vision, websocket, utils) and `frontend/src` (app, components, hooks, services, lib, types). Empty backend packages are placeholders for later phases.
