# Basirah Academy — System Architecture & Technical Specification
**Project Codename:** PRISMATIC INTELLIGENCE  
**Document:** System Architecture, Data Schema, and Interoperability Specification  
**Version:** 1.0.0  
**Target Release:** Production Ready  

---

## 1. System Overview & Component Topography

Basirah Academy is architected as an interconnected ecosystem comprising:
1. **Basirah Web Portal & LMS (`/web`)**: Next.js 14/15 App Router, TypeScript, Tailwind CSS, Lucide icons, accessible headless primitives, client-side offline storage, and responsive layout.
2. **Basirah Intelligence Engine (`/api-backend`)**: Python 3.12+ FastAPI backend implementing an AI Gateway, semantic vector search, RAG pipeline, safety & moderation filtering, prompt templating, and real-time streaming tutor endpoints.
3. **Basirah Native Android Client (`/android`)**: Native Java Android application adhering to Clean Architecture (Repository pattern, LiveData/StateFlow concepts, Room offline database, Retrofit2 network client, Material 3 design system).
4. **Shared Tokens & Schema Core (`/shared`)**: Canonical design tokens (`tokens.json`), course curriculum taxonomy, quiz/assignment rubrics, and TypeScript/Java data models.

```
                                 ┌───────────────────────────────┐
                                 │     Client Layer (Learners)   │
                                 └───────────────┬───────────────┘
                                                 │
                   ┌─────────────────────────────┴─────────────────────────────┐
                   ▼                                                           ▼
       ┌───────────────────────┐                                   ┌───────────────────────┐
       │   Basirah Web Portal  │                                   │ Native Android Client │
       │   (Next.js + TS)      │                                   │ (Java + Material 3)   │
       └───────────┬───────────┘                                   └───────────┬───────────┘
                   │                                                           │
                   ├─────────────────────────────┬─────────────────────────────┤
                   ▼                             ▼                             ▼
       ┌───────────────────────┐   ┌───────────────────────────┐   ┌───────────────────────┐
       │   Firebase Services   │   │  Basirah AI Intelligence  │   │  Local Offline Store  │
       │  - Auth (JWT/OAuth)   │   │  (FastAPI Python Gateway) │   │  - IndexedDB (Web)    │
       │  - Firestore (DB)     │   │  - RAG & Vector Embeddings│   │  - Room SQLite (Droid)│
       │  - Storage (Assets)   │   │  - Prompt Orchestrator    │   │  - Background Worker  │
       └───────────────────────┘   └─────────────┬─────────────┘   └───────────────────────┘
                                                 │
                                                 ▼
                                   ┌───────────────────────────┐
                                   │  Foundational LLM Models  │
                                   │  - Gemini API / Cloud LLM │
                                   │  - Local Fallback Embeds  │
                                   └───────────────────────────┘
```

---

## 2. PIDS Design System Specifications

### 2.1 Color Tokens
```json
{
  "colors": {
    "primary": {
      "midnight": "#07162F",
      "deepSpace": "#0B2044",
      "royalCobalt": "#145BD7",
      "electricBlue": "#287BFF",
      "crystalCyan": "#16D9F5",
      "luxuryGold": "#D9A83F",
      "champagneGold": "#F2D18B",
      "pearlWhite": "#F4F7FC",
      "iceWhite": "#E7F1FF",
      "softSlate": "#91A4C1"
    },
    "supporting": {
      "success": "#19B887",
      "warning": "#F3B544",
      "error": "#EF5D69",
      "info": "#4BA9F5",
      "violet": "#8568F5"
    },
    "gradients": {
      "midnightCobalt": "linear-gradient(135deg, #07162F 0%, #145BD7 100%)",
      "electricCyan": "linear-gradient(135deg, #287BFF 0%, #16D9F5 100%)",
      "champagneGold": "linear-gradient(135deg, #F2D18B 0%, #D9A83F 100%)",
      "prismaticGlass": "linear-gradient(180deg, rgba(22, 217, 245, 0.08) 0%, rgba(11, 32, 68, 0.4) 100%)"
    }
  }
}
```

### 2.2 Typography Scale
* **Display / Hero**: Space Grotesk, 56px–72px, Weight 700, -0.03em tracking.
* **Heading 1**: Space Grotesk, 40px–48px, Weight 700, -0.02em tracking.
* **Heading 2**: Space Grotesk, 28px–32px, Weight 600, -0.01em tracking.
* **Heading 3 / Subhead**: Inter / Manrope, 20px–24px, Weight 600.
* **Body (Regular & Longform)**: Inter, 16px, Weight 400/500, 1.65 line-height.
* **Technical Labels & Badges**: IBM Plex Mono, 12px–14px, Weight 500, uppercase.
* **Code Blocks**: IBM Plex Mono / Fira Code, 14px, 1.5 line-height.

---

## 3. Database Architecture (Entity Relationship & Firestore Collections)

The system manages 22 core entities across persistent data storage:

1. **`users`**: `{ id, email, displayName, role, avatarUrl, createdAt, lastLoginAt, bio, preferences: { theme, emailNotifications, offlineMode } }`
2. **`roles`**: Permissions enum: `student`, `instructor`, `content_reviewer`, `moderator`, `support_agent`, `admin`, `super_admin`.
3. **`learning_paths`**: `{ id, slug, title, level: "beginner"|"intermediate"|"advanced", description, courseIds: [], estimatedHours, competencies: [] }`
4. **`courses`**: `{ id, slug, pathId, level, title, tagline, overview, objectives: [], prerequisites: [], modulesCount, lessonsCount, durationMinutes, instructor: { name, title, avatar }, completionCriteria, published: boolean }`
5. **`modules`**: `{ id, courseId, sequenceOrder, title, description, estimatedMinutes }`
6. **`lessons`**: `{ id, moduleId, courseId, sequenceOrder, title, type: "concept"|"code"|"video"|"interactive", readingTimeMinutes, contentMarkdown, videoUrl, codeSnippets: [], resources: [] }`
7. **`resources`**: `{ id, lessonId, title, fileType, downloadUrl, sizeBytes, checksum }`
8. **`enrollments`**: `{ id, userId, courseId, enrolledAt, status: "active"|"completed"|"archived", progressPercent, completedLessonsCount, lastAccessedAt }`
9. **`progress`**: `{ id, userId, courseId, lessonId, completed: boolean, completedAt, lastPositionSeconds, quizScore }`
10. **`assessments`**: `{ id, courseId, moduleId, title, passingScorePercent, timeLimitMinutes, questionsCount }`
11. **`questions`**: `{ id, assessmentId, prompt, type: "multiple_choice"|"code_fill"|"true_false", options: [], correctOptionIndex, explanation }`
12. **`attempts`**: `{ id, userId, assessmentId, startedAt, submittedAt, scorePercent, passed: boolean, answers: [] }`
13. **`assignments`**: `{ id, courseId, title, promptMarkdown, starterCode, rubric: [{ criteria, points }], maxScore }`
14. **`submissions`**: `{ id, assignmentId, userId, codeRepoUrl, zipStoragePath, studentNotes, submittedAt, status: "pending"|"reviewed", grade, feedbackMarkdown, reviewedBy }`
15. **`projects`**: `{ id, courseId, level, title, description, architectureSpec, rubric, deliverableType }`
16. **`certificates`**: `{ id, userId, courseId, certificateNumber, issuedAt, recipientName, courseTitle, verificationHash, pdfUrl }`
17. **`ai_sessions`**: `{ id, userId, contextType: "lesson"|"project"|"general", contextId, createdAt, updatedAt }`
18. **`ai_messages`**: `{ id, sessionId, role: "user"|"assistant"|"system", content, citations: [{ docId, section, excerpt }], tokensUsed, timestamp }`
19. **`ai_feedback`**: `{ id, messageId, userId, rating: "positive"|"negative", category, notes, timestamp }`
20. **`notifications`**: `{ id, userId, title, message, link, read: boolean, createdAt, type: "system"|"course"|"submission" }`
21. **`announcements`**: `{ id, title, contentMarkdown, authorId, targetLevel: "all"|"beginner"|"intermediate"|"advanced", publishedAt }`
22. **`audit_logs`**: `{ id, actorId, action, targetType, targetId, ipAddress, userAgent, timestamp, metadata: {} }`

---

## 4. AI Gateway & RAG Orchestration Architecture

### 4.1 Server-Side Pipeline (`api-backend/`)
```
[User Query + Lesson Context]
            │
            ▼
┌───────────────────────────────┐
│ 1. Safety & Prompt Injection  │  --> Block malicious jailbreaks / out-of-scope queries
└───────────┬───────────────────┘
            │
            ▼
┌───────────────────────────────┐
│ 2. Rate Limiting & Quota      │  --> Check user tokens & request allowance
└───────────┬───────────────────┘
            │
            ▼
┌───────────────────────────────┐
│ 3. Semantic Vector Search     │  --> Query curriculum vector index for exact lesson citations
└───────────┬───────────────────┘
            │
            ▼
┌───────────────────────────────┐
│ 4. Prompt Assembly & Context  │  --> Inject lesson curriculum facts, code snippets, rubric
└───────────┬───────────────────┘
            │
            ▼
┌───────────────────────────────┐
│ 5. Model Inference Gateway    │  --> Gemini 2.5 / 1.5 Pro / Flash or Local HuggingFace/ONNX
└───────────┬───────────────────┘
            │
            ▼
┌───────────────────────────────┐
│ 6. Response Verification      │  --> Guard against fabricated citations; attach validated references
└───────────┬───────────────────┘
            │
            ▼
[Streamed Response with Verified Citations]
```

---

## 5. Native Android Architecture (Java + Material 3)

* **Architecture Pattern**: MVVM with Repository Pattern.
* **UI Technology**: Pure Native Android XML layout hierarchy adhering strictly to Material 3 tokens and PIDS theme colors.
* **Network & Serialization**: Retrofit 2 + OkHttp 4 with Interceptors for JWT auth token injection and offline retry queues.
* **Local Persistence**: Room SQLite database with offline sync queues for lesson progress, quiz attempts, and bookmarks.
* **Background Sync**: Android `WorkManager` for idempotent, battery-conscious synchronization when internet connectivity resumes.
* **Security**: Android Keystore + `EncryptedSharedPreferences` for secure session storage.

---

## 6. Verification and Compliance Matrix

| Standard / Mandate | Implementation Strategy | Status |
| :--- | :--- | :--- |
| **WCAG 2.2 AA** | Contrast ratios > 4.5:1 (PIDS reaches 13:1), keyboard focus rings, semantic landmark tags (`<main>`, `<nav>`, `<aside>`), ARIA live regions | Target Met |
| **Anti-Gamification** | Meaningful mastery meters and skill radar maps instead of competitive user leaderboards, streaks, or pressure badges | Architectural Guarantee |
| **Authenticity Principle**| Zero fabricated student counts, fake user reviews, or mock partners | Strictly Enforced |
| **Cross-Platform Parity** | Shared PIDS tokens and synchronized REST/Firestore endpoints ensure 100% curriculum and progress symmetry | Implemented |

