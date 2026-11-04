import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .routers import auth, courses, tutor, student, admin
from .ai.rag_engine import rag_engine

app = FastAPI(
    title=settings.APP_NAME,
    description="The foundational AI gateway, RAG orchestrator, and educational intelligence engine of Basirah Academy.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS for Next.js frontend and mobile clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permits local development, Next.js dev server, and Android client
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers
app.include_router(auth.router, prefix=settings.API_PREFIX)
app.include_router(courses.router, prefix=settings.API_PREFIX)
app.include_router(tutor.router, prefix=settings.API_PREFIX)
app.include_router(student.router, prefix=settings.API_PREFIX)
app.include_router(admin.router, prefix=settings.API_PREFIX)

@app.get("/")
def root():
    return {
        "system": settings.APP_NAME,
        "tagline": "Learn • Build • Innovate",
        "status": "OPERATIONAL",
        "indexedChunksCount": len(rag_engine.chunks),
        "docsUrl": "/docs",
        "apiPrefix": settings.API_PREFIX
    }

@app.get("/health")
def health_check():
    return {
        "status": "HEALTHY",
        "timestamp": time.time(),
        "ragIndexSize": len(rag_engine.chunks),
        "environment": settings.ENVIRONMENT
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

