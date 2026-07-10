# BuildPilot X - FastAPI Inference Service

This directory contains the completely isolated, GPU-accelerated Python backend that powers the 9-Agent Executive Board for BuildPilot X.

## Architecture

This backend is designed to run completely independently from the Next.js frontend. It exposes Server-Sent Events (SSE) REST endpoints.

It features a dual-provider architecture:
1. **Primary**: Local Hugging Face execution utilizing PyTorch and Accelerate (`device_map="auto"`). This is specifically designed for deployment on an **AMD ROCm Notebook/Cluster**.
2. **Fallback**: If the local GPU cluster is offline, it gracefully routes requests to the Fireworks AI API.

## Deployment on AMD Notebook

1. Clone this repository into your AMD Notebook environment.
2. Navigate to the backend folder: `cd BuildPilot-X/backend`
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the server:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```

## Docker Deployment
If your AMD environment supports Docker (with the ROCm plugin installed):
```bash
docker build -t buildpilot-ai-backend .
docker run --device=/dev/kfd --device=/dev/dri --group-add video -p 8000:8000 buildpilot-ai-backend
```

## API Endpoints
All endpoints are located at `/api/v1/`. They accept `POST` requests and support `text/event-stream` returning JSON chunks formatted as `{"agent": "cto", "chunk": "..."}`.

- `/generate-startup` (9 Agents)
- `/architecture` (3 Agents)
- `/business-plan` (3 Agents)
- `/marketing` (2 Agents)
- `/investor-review` (2 Agents)
