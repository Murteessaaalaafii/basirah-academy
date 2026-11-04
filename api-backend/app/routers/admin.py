import time
from typing import Dict, Any, List, Optional
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from .auth import get_current_user, USERS_DB
from .courses import _get_data
from ..ai.evaluation import evaluation_tracker

router = APIRouter(prefix="/admin", tags=["Administration Portal"])

AUDIT_LOGS = [
    {
        "id": "log-001",
        "actor": "admin@basirah.academy",
        "action": "COURSE_PUBLISH",
        "target": "large-language-model-engineering",
        "timestamp": "2026-11-01T14:30:00Z",
        "ipAddress": "192.168.1.50"
    },
    {
        "id": "log-002",
        "actor": "system",
        "action": "RAG_INDEX_REBUILD",
        "target": "all_courses_36",
        "timestamp": "2026-11-04T02:00:00Z",
        "ipAddress": "127.0.0.1"
    },
    {
        "id": "log-003",
        "actor": "admin@basirah.academy",
        "action": "SECURITY_POLICY_UPDATE",
        "target": "prompt_injection_guardrail_v2",
        "timestamp": "2026-11-04T09:15:00Z",
        "ipAddress": "192.168.1.50"
    }
]

SUBMISSIONS_QUEUE = [
    {
        "id": "sub-101",
        "studentName": "Amina Al-Mansoor",
        "studentEmail": "student@basirah.academy",
        "courseTitle": "Deep Learning Fundamentals",
        "assignmentTitle": "Practical Laboratory: Implement Deep Learning Fundamentals Engine",
        "submittedAt": "2026-10-28T16:00:00Z",
        "status": "reviewed",
        "grade": 95,
        "notes": "Verified custom backpropagation algorithm."
    },
    {
        "id": "sub-102",
        "studentName": "Dawit Tesfaye",
        "studentEmail": "dawit.t@example.com",
        "courseTitle": "Retrieval-Augmented Generation",
        "assignmentTitle": "Hybrid Retrieval Pipeline with Cross-Encoder Reranker",
        "submittedAt": "2026-11-03T11:45:00Z",
        "status": "pending_review",
        "grade": None,
        "notes": "Student implemented BM25 + Qdrant dense search with Reciprocal Rank Fusion."
    }
]

class GradeSubmissionRequest(BaseModel):
    grade: int
    feedback: str

@router.get("/overview")
def get_admin_overview():
    course_data = _get_data()
    courses = course_data.get("courses", [])
    paths = course_data.get("learningPaths", [])
    ai_summary = evaluation_tracker.get_summary()

    return {
        "metrics": {
            "totalLearners": len(USERS_DB),
            "totalLearningPaths": len(paths),
            "totalCourses": len(courses),
            "totalLessons": sum(c.get("lessonsCount", 0) for c in courses),
            "pendingSubmissionsCount": len([s for s in SUBMISSIONS_QUEUE if s["status"] == "pending_review"]),
            "aiRequestsTotal": ai_summary["total_requests"],
            "aiEstimatedCostUsd": ai_summary["estimated_cost_usd"],
            "aiAvgLatencyMs": ai_summary["average_latency_ms"]
        },
        "systemHealth": {
            "apiStatus": "HEALTHY",
            "ragEngineStatus": "SYNCHRONIZED",
            "databaseStatus": "OPERATIONAL",
            "uptimeSeconds": 86400 * 14,
            "version": "1.0.0"
        }
    }

@router.get("/users")
def list_users():
    return list(USERS_DB.values())

@router.get("/submissions")
def list_submissions():
    return SUBMISSIONS_QUEUE

@router.post("/submissions/{sub_id}/grade")
def grade_submission(sub_id: str, req: GradeSubmissionRequest):
    for sub in SUBMISSIONS_QUEUE:
        if sub["id"] == sub_id:
            sub["status"] = "reviewed"
            sub["grade"] = req.grade
            sub["notes"] = req.feedback
            return {"status": "graded", "submission": sub}
    raise HTTPException(status_code=404, detail="Submission not found.")

@router.get("/audit-logs")
def get_audit_logs():
    return AUDIT_LOGS

