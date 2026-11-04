import json
import math
import re
from typing import List, Dict, Any, Optional
from pathlib import Path
from ..config import settings

class DocumentChunk:
    def __init__(self, chunk_id: str, course_id: str, course_title: str, level: str, 
                 module_title: str, lesson_title: str, slug: str, content: str):
        self.chunk_id = chunk_id
        self.course_id = course_id
        self.course_title = course_title
        self.level = level
        self.module_title = module_title
        self.lesson_title = lesson_title
        self.slug = slug
        self.content = content
        self.tokens = self._tokenize(content)

    @staticmethod
    def _tokenize(text: str) -> List[str]:
        return re.findall(r"\b[a-zA-Z0-9_]{2,}\b", text.lower())

class RAGEngine:
    def __init__(self, courses_path: Optional[Path] = None):
        self.courses_path = courses_path or settings.COURSES_PATH
        self.chunks: List[DocumentChunk] = []
        self.idf: Dict[str, float] = {}
        self._load_and_index()

    def _load_and_index(self):
        """Loads shared/courses.json and indexes modules, lessons, and practical labs."""
        if not self.courses_path.exists():
            return

        with open(self.courses_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        courses = data.get("courses", [])
        self.chunks.clear()

        doc_count = 0
        df: Dict[str, int] = {}

        for course in courses:
            c_id = course.get("id", "")
            c_title = course.get("title", "")
            c_level = course.get("level", "")
            c_slug = course.get("slug", "")

            # Index Course Overview
            overview_chunk = DocumentChunk(
                chunk_id=f"{c_id}-overview",
                course_id=c_id,
                course_title=c_title,
                level=c_level,
                module_title="Course Overview",
                lesson_title="Syllabus & Objectives",
                slug=c_slug,
                content=f"{c_title}: {course.get('tagline', '')}\n{course.get('overview', '')}\nObjectives: {', '.join(course.get('objectives', []))}"
            )
            self.chunks.append(overview_chunk)

            # Index Modules & Lessons
            for mod in course.get("modules", []):
                m_title = mod.get("title", "")
                for les in mod.get("lessons", []):
                    les_title = les.get("title", "")
                    les_content = les.get("contentMarkdown", "")
                    code_snippet = les.get("codeSnippet", "")
                    full_text = f"{les_title}\n{les_content}\nCode:\n{code_snippet}"

                    chunk = DocumentChunk(
                        chunk_id=les.get("id", f"{c_id}-{mod.get('id')}-{len(self.chunks)}"),
                        course_id=c_id,
                        course_title=c_title,
                        level=c_level,
                        module_title=m_title,
                        lesson_title=les_title,
                        slug=f"{c_slug}#{les.get('slug', '')}",
                        content=full_text
                    )
                    self.chunks.append(chunk)

        # Compute IDF for BM25/TF-IDF Lexical Retrieval
        total_docs = len(self.chunks)
        if total_docs == 0:
            return

        for chunk in self.chunks:
            unique_terms = set(chunk.tokens)
            for term in unique_terms:
                df[term] = df.get(term, 0) + 1

        for term, freq in df.items():
            self.idf[term] = math.log((total_docs - freq + 0.5) / (freq + 0.5) + 1.0)

    def search(self, query: str, top_k: int = 3, level_filter: Optional[str] = None) -> List[Dict[str, Any]]:
        """
        Retrieves the top-k most relevant course lessons with source citations.
        """
        query_tokens = DocumentChunk._tokenize(query)
        if not query_tokens:
            return []

        scored_results = []
        for chunk in self.chunks:
            if level_filter and chunk.level.lower() != level_filter.lower():
                continue

            # Compute score using BM25-style term matching
            score = 0.0
            chunk_token_count = len(chunk.tokens) or 1
            term_freqs: Dict[str, int] = {}
            for t in chunk.tokens:
                term_freqs[t] = term_freqs.get(t, 0) + 1

            for qt in query_tokens:
                if qt in term_freqs:
                    tf = term_freqs[qt]
                    # BM25 tf weight with k1=1.5, b=0.75
                    norm_tf = (tf * 2.5) / (tf + 1.5 * (0.25 + 0.75 * (chunk_token_count / 150.0)))
                    score += self.idf.get(qt, 1.0) * norm_tf

            # Title exact phrase boost
            if query.lower() in chunk.course_title.lower() or query.lower() in chunk.lesson_title.lower():
                score += 5.0

            if score > 0.1:
                scored_results.append((score, chunk))

        scored_results.sort(key=lambda x: x[0], reverse=True)
        top_chunks = scored_results[:top_k]

        citations = []
        for score, chunk in top_chunks:
            excerpt = chunk.content[:280] + ("..." if len(chunk.content) > 280 else "")
            citations.append({
                "chunkId": chunk.chunk_id,
                "courseId": chunk.course_id,
                "courseTitle": chunk.course_title,
                "level": chunk.level,
                "moduleTitle": chunk.module_title,
                "lessonTitle": chunk.lesson_title,
                "slug": chunk.slug,
                "excerpt": excerpt,
                "relevanceScore": round(score, 3)
            })

        return citations

rag_engine = RAGEngine()

