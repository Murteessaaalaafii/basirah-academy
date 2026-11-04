import time
from typing import Optional, List, Dict, Any
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from .auth import get_current_user

router = APIRouter(prefix="/student", tags=["Student Learning Portal"])

# In-memory student progress store with realistic initial data
STUDENT_DATA: Dict[str, Dict[str, Any]] = {
    "usr-student-001": {
        "enrolledCourses": [
            {
                "courseId": "int-04",
                "slug": "deep-learning-fundamentals",
                "title": "Deep Learning Fundamentals",
                "level": "intermediate",
                "progressPercent": 65,
                "completedLessons": ["int-04-les-101", "int-04-les-102", "int-04-les-201"],
                "lastAccessed": "2026-11-03T18:20:00Z"
            },
            {
                "courseId": "int-10",
                "slug": "retrieval-augmented-generation",
                "title": "Retrieval-Augmented Generation",
                "level": "intermediate",
                "progressPercent": 35,
                "completedLessons": ["int-10-les-101"],
                "lastAccessed": "2026-11-02T14:15:00Z"
            }
        ],
        "completedAssignments": [
            {
                "assignmentId": "int-04-assign-1",
                "courseSlug": "deep-learning-fundamentals",
                "title": "Practical Laboratory: Implement Deep Learning Fundamentals Engine",
                "score": 95,
                "status": "reviewed",
                "feedback": "Exceptional implementation of gradient clipping and custom autograd backward pass.",
                "submittedAt": "2026-10-28T16:00:00Z"
            }
        ],
        "certificates": [
            {
                "id": "CERT-BAS-2026-8812",
                "courseTitle": "Python Programming Fundamentals",
                "courseSlug": "python-programming-fundamentals",
                "issuedAt": "2026-09-30T12:00:00Z",
                "recipientName": "Amina Al-Mansoor",
                "verificationHash": "0x7f9a2b8e3c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f"
            }
        ],
        "activeProjects": [
            {
                "title": "End-to-End Hybrid RAG with Cross-Encoder Reranking",
                "courseSlug": "retrieval-augmented-generation",
                "status": "in_progress",
                "dueDate": "2026-11-20T23:59:59Z"
            }
        ]
    }
}

class ProgressUpdateRequest(BaseModel):
    courseSlug: str
    lessonId: str
    completed: bool = True
    quizScore: Optional[int] = None

class EnrollmentRequest(BaseModel):
    courseSlug: str
    courseId: str
    courseTitle: str
    level: str

class SubmissionRequest(BaseModel):
    assignmentId: str
    courseSlug: str
    title: str
    codeSubmission: str
    notes: Optional[str] = ""

@router.get("/dashboard")
def get_dashboard(user: Dict[str, Any] = Depends(get_current_user)):
    uid = user.get("id", "usr-student-001")
    user_state = STUDENT_DATA.get(uid, {
        "enrolledCourses": [],
        "completedAssignments": [],
        "certificates": [],
        "activeProjects": []
    })

    # Calculate real overall stats
    enrolled = user_state.get("enrolledCourses", [])
    total_enrolled = len(enrolled)
    avg_progress = 0
    if total_enrolled > 0:
        avg_progress = round(sum(c.get("progressPercent", 0) for c in enrolled) / total_enrolled)

    return {
        "user": user,
        "metrics": {
            "enrolledCoursesCount": total_enrolled,
            "averageProgressPercent": avg_progress,
            "completedAssignmentsCount": len(user_state.get("completedAssignments", [])),
            "certificatesCount": len(user_state.get("certificates", []))
        },
        "enrolledCourses": enrolled,
        "activeProjects": user_state.get("activeProjects", []),
        "recentAchievements": [
            "Completed Gradient Descent Optimization Lab",
            "Achieved 95% on PyTorch Autograd Assessment",
            "Published Vector Index Benchmarking Note"
        ],
        "certificates": user_state.get("certificates", [])
    }

@router.post("/enroll")
def enroll_course(req: EnrollmentRequest, user: Dict[str, Any] = Depends(get_current_user)):
    uid = user.get("id", "usr-student-001")
    if uid not in STUDENT_DATA:
        STUDENT_DATA[uid] = {"enrolledCourses": [], "completedAssignments": [], "certificates": [], "activeProjects": []}

    for c in STUDENT_DATA[uid]["enrolledCourses"]:
        if c["slug"] == req.courseSlug:
            return {"status": "already_enrolled", "course": c}

    new_enrollment = {
        "courseId": req.courseId,
        "slug": req.courseSlug,
        "title": req.courseTitle,
        "level": req.level,
        "progressPercent": 0,
        "completedLessons": [],
        "lastAccessed": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    }
    STUDENT_DATA[uid]["enrolledCourses"].append(new_enrollment)
    return {"status": "enrolled", "course": new_enrollment}

@router.post("/progress")
def update_progress(req: ProgressUpdateRequest, user: Dict[str, Any] = Depends(get_current_user)):
    uid = user.get("id", "usr-student-001")
    if uid not in STUDENT_DATA:
        STUDENT_DATA[uid] = {"enrolledCourses": [], "completedAssignments": [], "certificates": [], "activeProjects": []}

    for c in STUDENT_DATA[uid]["enrolledCourses"]:
        if c["slug"] == req.courseSlug:
            if req.completed and req.lessonId not in c["completedLessons"]:
                c["completedLessons"].append(req.lessonId)
            # Estimate updated progress
            c["progressPercent"] = min(100, int((len(c["completedLessons"]) / 6) * 100))
            c["lastAccessed"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            return {"status": "updated", "progress": c}

    return {"status": "not_enrolled"}

@router.post("/submissions")
def submit_assignment(req: SubmissionRequest, user: Dict[str, Any] = Depends(get_current_user)):
    uid = user.get("id", "usr-student-001")
    if uid not in STUDENT_DATA:
        STUDENT_DATA[uid] = {"enrolledCourses": [], "completedAssignments": [], "certificates": [], "activeProjects": []}

    submission_record = {
        "assignmentId": req.assignmentId,
        "courseSlug": req.courseSlug,
        "title": req.title,
        "submittedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "status": "pending_review",
        "score": None,
        "feedback": "Submission queued for review by Basirah Engineering Faculty."
    }
    STUDENT_DATA[uid]["completedAssignments"].append(submission_record)
    return {"status": "submitted", "submission": submission_record}

