# Basirah Academy — API Reference Documentation
**System:** Basirah Intelligence Engine & Platform Services  
**Version:** 1.0.0  
**Base URL:** `http://localhost:8000/api/v1`  

---

## 1. Authentication Endpoints

### `POST /auth/register`
Creates a new learner account.
* **Request Body:**
  ```json
  {
    "email": "learner@domain.com",
    "password": "SecurePassword123!",
    "displayName": "Dawit Tesfaye",
    "targetLevel": "beginner"
  }
  ```
* **Response (200 OK):**
  ```json
  {
    "token": "token_usr-1730730000_1730730000",
    "user": {
      "id": "usr-1730730000",
      "email": "learner@domain.com",
      "displayName": "Dawit Tesfaye",
      "role": "student",
      "level": "beginner"
    }
  }
  ```

### `POST /auth/login`
Authenticates an existing student or administrator.
* **Request Body:**
  ```json
  {
    "email": "student@basirah.academy",
    "password": "password"
  }
  ```

### `GET /auth/me`
Fetches active user profile.
* **Headers:** `Authorization: Bearer <token>`

---

## 2. Curriculum & Course Endpoints

### `GET /courses/paths`
Returns the 3 structured learning pathways (Discover AI, Build with AI, Engineer Intelligence).

### `GET /courses`
Lists all courses with optional query parameters.
* **Query Params:**
  * `level`: `beginner` | `intermediate` | `advanced`
  * `search`: `string` (searches title, tagline, overview)
* **Response:** Array of course summaries (id, slug, title, level, estimatedHours, modulesCount, lessonsCount).

### `GET /courses/{slug}`
Returns complete course specification:
* Overview, learning objectives, prerequisites, modules, lessons, practical exercises, capstone project rubric, and academic literature references.

### `GET /courses/{slug}/lessons/{lesson_slug}`
Returns individual lesson details with code snippets, practical exercises, and knowledge checks.

---

## 3. AI Tutor & Socratic Intelligence Endpoints

### `POST /tutor/chat`
Submits a query to the Socratic AI Tutor.
* **Request Body:**
  ```json
  {
    "query": "How does backpropagation compute gradients through matrix multiplication?",
    "chatHistory": [
      { "role": "user", "content": "Hello" },
      { "role": "assistant", "content": "Welcome. What concept are we exploring?" }
    ],
    "courseSlug": "deep-learning-fundamentals",
    "lessonSlug": "algorithmic-mechanics"
  }
  ```
* **Response:**
  ```json
  {
    "role": "assistant",
    "content": "### Understanding Gradient Descent...",
    "citations": [
      {
        "courseTitle": "Deep Learning Fundamentals",
        "lessonTitle": "Core Principles",
        "slug": "deep-learning-fundamentals#conceptual-underpinnings",
        "excerpt": "In neural computing, gradient descent minimizes empirical risk..."
      }
    ],
    "tokensUsed": 184,
    "latencyMs": 14.2,
    "model": "gemini-2.5-flash",
    "status": "success"
  }
  ```

### `POST /tutor/explain-code`
Submits a code block for complexity analysis, edge cases, and optimization.

### `POST /tutor/feedback`
Records learner feedback (positive/negative, notes) to calibrate educational accuracy.

### `GET /tutor/stats`
Returns aggregate telemetry: total requests, total tokens, estimated cost in USD, and average latency.

---

## 4. Student Portal Endpoints

### `GET /student/dashboard`
Returns enrolled courses, progress percentages, active capstones, and certificates.

### `POST /student/enroll`
Enrolls the student in a specified course.

### `POST /student/progress`
Records lesson completion or quiz score.

### `POST /student/submissions`
Submits a capstone project repository URL or code snippet for faculty review.

---

## 5. Administration Endpoints

### `GET /admin/overview`
Returns platform analytics, system health, and RAG index status.

### `GET /admin/users`
Lists registered learners and administrators.

### `GET /admin/submissions`
Returns queued student capstone submissions.

### `POST /admin/submissions/{id}/grade`
Assigns grade and faculty feedback notes.

### `GET /admin/audit-logs`
Returns cryptographic audit trails of administrative actions.

