# CampusOracle — Standalone On-Device Study Assistant

CampusOracle is a production-ready, standalone, offline-first study assistant powered by a local Retrieval-Augmented Generation (RAG) pipeline and Google's Gemma 4 E2B model. It enables students to upload course materials (syllabi, lectures, textbooks, past papers), index them locally, and ask questions or generate custom mock exams grounded strictly in their own documents.

The application operates **100% on-device**, ensuring complete data privacy with no external LLM API dependencies.

---

## Key Features

1. **Local RAG Pipeline**: Ingests PDFs and TXT files, splits text into overlapping character chunks, computes embeddings, and indexes them in a local vector space.
2. **Local LLM Execution**: Runs Google's **Gemma 4 E2B** model (or lightweight open fallbacks like `Qwen/Qwen2.5-0.5B-Instruct`) locally via Hugging Face `transformers` on CPU/GPU.
3. **SSE Chat Streaming**: Streams text completions token-by-token, retaining complete conversation memory history for follow-up queries.
4. **Structured Sourcing & Citations**: Yields exact retrieved text snippets, document titles, page citations, and similarity scores.
5. **Mock Exam Generator**: Generates syllabus-aligned exam papers with matching answer keys and mark schemes.
6. **Sleek Mission Control**: A simplified, state-driven agent dashboard that displays Leitner spaced-repetition slots, forgetting curve analytics, scout scraper details, and agent logs in a modern tabbed layout.
7. **Robust Server Fallback**: The frontend automatically falls back to an interactive client-side mock index if the Python server is offline.

---

## Tech Stack

*   **Frontend**: React (v18), TypeScript, Tailwind CSS, Lucide icons, Vite.
*   **Backend**: Python (v3.10), FastAPI, Uvicorn, Pydantic.
*   **RAG Engine**: FAISS (vector index), SentenceTransformers (`all-MiniLM-L6-v2`), `pypdf` (text extraction).
*   **Inference**: PyTorch, Hugging Face `transformers` (Local CPU/GPU inference).

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/) (v18+)
*   [Python](https://www.python.org/) (v3.10+)
*   [Docker & Docker Compose](https://www.docker.com/) (Optional, for containerized run)

---

## Local Setup

### 1. Backend Server Setup

Navigate to the `backend` folder, set up a virtual environment, and install dependencies:

```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
```

#### Environment Configuration

Create a `.env` file in the `backend/` directory (you can copy from `.env.example`):

```bash
cp .env.example .env
```

Edit the `.env` parameters:
*   `MODEL_PATH`: Model repository to load. Defaults to `google/gemma-2-2b-it`. (You can set to `google/gemma-4-E2B-it`).
*   `HF_TOKEN`: If using gated models (like Gemma), obtain an access token from Hugging Face and add it here.
*   `HOST`: Server host (default `127.0.0.1`).
*   `PORT`: Server port (default `8000`).

#### Run the Backend

```bash
python -m uvicorn app.main:app --reload
```

The server binds immediately and loads the RAG model and LLM asynchronously in a background thread to prevent startup delays. Visit `http://127.0.0.1:8000/docs` to view the OpenAPI Swagger docs.

---

### 2. Frontend Setup

In the project root directory, install npm packages and start the Vite dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser. The frontend automatically pings `http://localhost:8000` to establish a backend connection.

---

## Running with Docker (Recommended)

You can launch the entire system (Vite client + FastAPI server) in a single command using Docker. It builds the static web assets, copies them into the Python container, and runs the FastAPI server serving both the REST API and the web interface on port `8000`.

```bash
# Set your Hugging Face Token if needed
docker-compose up --build
```

Access the app at `http://localhost:8000`. Vector indexes and document uploads will persist inside the local `./backend/data` directory.

---

## API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/state` | Returns state metadata (chunks count, loaded model, server status). |
| `GET` | `/api/docs` | Lists all uploaded and indexed documents. |
| `POST` | `/api/upload` | Multipart upload endpoint for PDF/TXT files (adds to vector space). |
| `POST` | `/api/ask` | Sends query to RAG pipeline (sync response). |
| `POST` | `/api/ask/stream` | Streams query answer using SSE (Server-Sent Events). |
| `POST` | `/api/quiz` | Generates a topic-grounded mock exam paper with answers and mark schemes. |
| `POST` | `/api/rebuild` | Wipes the vector index and re-seeds default physics materials. |

---

## Troubleshooting & Engineering Notes

*   **HF Gated Access**: Google's Gemma models require agreeing to terms on Hugging Face. If you see a `403 Gated Model` error, make sure you have requested access on the model card page, and configured your `HF_TOKEN` in the `.env` file.
*   **Memory Footprint & Fallback**: Loading 2B+ LLMs requires ~4GB+ of free system RAM. If the load fails or encounters OOM, the backend automatically falls back to `Qwen/Qwen2.5-0.5B-Instruct` (a highly efficient 500M parameter model). If offline or unable to download any model, it falls back to a template-driven heuristic generator.
*   **Linux FAISS Dependency**: If building manually on Linux without docker-compose, ensure `libgomp1` is installed (`apt install libgomp1`) as FAISS CPU relies on OpenMP.
