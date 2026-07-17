# Stage 1: Build the React frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app with Python FastAPI
FROM python:3.10-slim
WORKDIR /app

# Install system dependencies (FAISS requires libgomp1)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend application source
COPY backend/ ./backend/

# Copy built frontend assets into the directory FastAPI serves
COPY --from=frontend-builder /app/dist ./dist

# Expose port and run the service
EXPOSE 8000
ENV HOST=0.0.0.0
ENV PORT=8000
ENV MODEL_PATH=google/gemma-2-2b-it

CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]
