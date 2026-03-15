# ClarityQuest AI Backend

A production-grade AI conversational platform backend built with FastAPI, LangGraph, Gemini, Mem0, and Neo4j.

## Features

- **Text Conversations**: Full support for real-time and streaming chat.
- **Voice Pipeline**: Integrated STT (Whisper) and TTS (Coqui) processing.
- **Long-term Memory**: Powered by Mem0 with MongoDB (vector) and Neo4j (graph) backends.
- **Background Processing**: Redis Queue (RQ) for handling heavy AI and voice tasks.
- **Observability**: Built-in tracking with Langfuse.
- **Modular Architecture**: Clean separation of layers (Core, API, AI, Memory, Services, Workers).
- **Fully Dockerized**: Easy deployment with Docker Compose.

## Project Structure

```text
backend/
├── app/
│   ├── api/          # API v1 Endpoints (Chat, Voice, Memory)
│   ├── core/         # Config, Logging, Security
│   ├── ai/           # LangGraph workflow and nodes
│   ├── db/           # MongoDB and Neo4j clients
│   ├── memory/       # Mem0 manager and storage
│   ├── services/     # AI and Voice business logic
│   ├── workers/      # Redis Queue and AI Workers
│   └── main.py       # FastAPI entry point
docker/
├── Dockerfile        # Application Dockerfile
└── docker-compose.yml # Orchestration
```

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/HarshitSharma4/ClarityQuest.git
   cd ClarityQuest
   ```

2. **Environment Configuration**:
   - Copy `backend/.env.example` to `backend/.env`.
   - Fill in your API keys (Gemini, Langfuse).

3. **Run with Docker Compose**:
   ```bash
   docker-compose -f docker/docker-compose.yml up --build
   ```

4. **Access the API**:
   - FastAPI Documentation: `http://localhost:8001/docs`
   - Health Check: `http://localhost:8001/health`
   - Langfuse Dashboard: `http://localhost:3000`

## API Endpoints

### Chat
- `POST /api/v1/chat/message`: Send a text message.
- `GET /api/v1/chat/stream/{conversation_id}`: Stream responses via SSE.

### Voice
- `POST /api/v1/voice/input`: Upload audio file for full pipeline (STT -> AI -> TTS).

### Memory
- `GET /api/v1/memory/{user_id}`: Retrieve all user memories.
- `POST /api/v1/memory/add`: Manually add a memory.

## Development

To run locally without Docker:

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```
