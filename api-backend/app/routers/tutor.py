from typing import Optional, List, Dict, Any
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..ai.gateway import ai_gateway
from ..ai.evaluation import evaluation_tracker

router = APIRouter(prefix="/tutor", tags=["AI Tutor & Intelligence"])

class ChatRequest(BaseModel):
    query: str
    chatHistory: Optional[List[Dict[str, str]]] = None
    courseSlug: Optional[str] = None
    lessonSlug: Optional[str] = None
    levelFilter: Optional[str] = None

class FeedbackRequest(BaseModel):
    userId: Optional[str] = "student-anon"
    messageId: str
    rating: str
    category: Optional[str] = "accuracy"
    notes: Optional[str] = ""

class CodeExplainRequest(BaseModel):
    code: str
    language: Optional[str] = "python"
    courseSlug: Optional[str] = None

@router.post("/chat")
def chat_with_tutor(req: ChatRequest):
    result = ai_gateway.generate_tutor_response(
        query=req.query,
        chat_history=req.chatHistory,
        course_slug=req.courseSlug,
        lesson_slug=req.lessonSlug,
        level_filter=req.levelFilter
    )
    
    # Record telemetry in evaluation tracker
    evaluation_tracker.record_request(
        tokens=result.get("tokensUsed", 0),
        latency_ms=result.get("latencyMs", 0.0),
        model=result.get("model", "unknown")
    )
    return result

@router.post("/explain-code")
def explain_code(req: CodeExplainRequest):
    query = f"Please explain this {req.language} code in depth, including complexity and edge cases:\n```{req.language}\n{req.code}\n```"
    result = ai_gateway.generate_tutor_response(query=query, course_slug=req.courseSlug)
    evaluation_tracker.record_request(result.get("tokensUsed", 0), result.get("latencyMs", 0.0), result.get("model", ""))
    return result

@router.post("/feedback")
def submit_feedback(req: FeedbackRequest):
    evaluation_tracker.record_feedback(
        user_id=req.userId,
        message_id=req.messageId,
        rating=req.rating,
        category=req.category or "",
        notes=req.notes or ""
    )
    return {"status": "recorded", "message": "Thank you for helping calibrate Basirah's educational intelligence."}

@router.get("/stats")
def get_ai_stats():
    return evaluation_tracker.get_summary()

