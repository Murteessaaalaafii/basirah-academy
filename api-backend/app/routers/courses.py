import json
from typing import Optional, List, Dict, Any
from fastapi import APIRouter, HTTPException, Query
from ..config import settings

router = APIRouter(prefix="/courses", tags=["Courses & Curriculum"])

_COURSES_CACHE: Optional[Dict[str, Any]] = None

def _get_data() -> Dict[str, Any]:
    global _COURSES_CACHE
    if _COURSES_CACHE is None:
        if settings.COURSES_PATH.exists():
            with open(settings.COURSES_PATH, "r", encoding="utf-8") as f:
                _COURSES_CACHE = json.load(f)
        else:
            _COURSES_CACHE = {"learningPaths": [], "courses": []}
    return _COURSES_CACHE

@router.get("/paths")
def get_learning_paths():
    data = _get_data()
    return data.get("learningPaths", [])

@router.get("")
def list_courses(
    level: Optional[str] = Query(None, description="Filter by level: beginner, intermediate, advanced"),
    search: Optional[str] = Query(None, description="Search query string")
):
    data = _get_data()
    courses = data.get("courses", [])

    if level:
        courses = [c for c in courses if c.get("level", "").lower() == level.lower()]

    if search:
        s = search.lower()
        courses = [
            c for c in courses 
            if s in c.get("title", "").lower() or s in c.get("tagline", "").lower() or s in c.get("overview", "").lower()
        ]

    # Return summary representations for list view
    summaries = []
    for c in courses:
        summaries.append({
            "id": c.get("id"),
            "slug": c.get("slug"),
            "level": c.get("level"),
            "title": c.get("title"),
            "tagline": c.get("tagline"),
            "overview": c.get("overview"),
            "estimatedHours": c.get("estimatedHours"),
            "modulesCount": c.get("modulesCount"),
            "lessonsCount": c.get("lessonsCount"),
            "rating": c.get("rating"),
            "published": c.get("published")
        })
    return summaries

@router.get("/{slug}")
def get_course_detail(slug: str):
    data = _get_data()
    courses = data.get("courses", [])
    for c in courses:
        if c.get("slug") == slug or c.get("id") == slug:
            return c
    raise HTTPException(status_code=404, detail=f"Course with slug '{slug}' not found.")

@router.get("/{slug}/lessons/{lesson_slug}")
def get_lesson_detail(slug: str, lesson_slug: str):
    data = _get_data()
    courses = data.get("courses", [])
    for c in courses:
        if c.get("slug") == slug or c.get("id") == slug:
            for mod in c.get("modules", []):
                for les in mod.get("lessons", []):
                    if les.get("slug") == lesson_slug or les.get("id") == lesson_slug:
                        return {
                            "courseTitle": c.get("title"),
                            "courseSlug": c.get("slug"),
                            "level": c.get("level"),
                            "moduleTitle": mod.get("title"),
                            "moduleId": mod.get("id"),
                            "lesson": les
                        }
    raise HTTPException(status_code=404, detail=f"Lesson '{lesson_slug}' in course '{slug}' not found.")

