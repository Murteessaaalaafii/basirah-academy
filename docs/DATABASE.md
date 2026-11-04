# Basirah Academy — Database & Persistence Architecture
**Document:** Database Schema, Data Models, and Offline Synchronization Specification  
**Version:** 1.0.0  

---

## 1. Dual-Mode Persistence Strategy

Basirah Academy is engineered with **Dual-Mode Persistence & Offline Synchronization**:
1. **Cloud Store (Firestore / PostgreSQL)**: Canonical source of truth for global course catalogs, student enrollment records, faculty grades, and cryptographic certificates.
2. **Local Client Store (Room SQLite on Android, IndexedDB / localStorage on Web)**: High-speed local cache and offline transaction queue.

```
┌─────────────────────────────────┐
│     Client Interaction (UI)     │
└────────────────┬────────────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
┌───────────────┐ ┌───────────────┐
│ Room DB       │ │ Local Store   │
│ (Android SQL) │ │ (Web Browser) │
└───────┬───────┘ └───────┬───────┘
        │                 │
        └────────┬────────┘
                 │ (Background WorkManager / Fetch Sync)
                 ▼
┌─────────────────────────────────┐
│   Basirah Backend / Firestore   │
└─────────────────────────────────┘
```

---

## 2. Core Entities Schema

### 2.1 Courses Table / Collection (`courses`)
* `id` (String, PK): e.g. `beg-01`, `int-04`, `adv-02`
* `slug` (String, Unique Index): URL-friendly identifier
* `level` (Enum): `beginner` | `intermediate` | `advanced`
* `title` (String): Course title
* `tagline` (String): Concise statement
* `overview` (Text): Comprehensive theoretical and practical overview
* `objectives` (Array of Strings): 4–6 measurable competency statements
* `prerequisites` (Array of Strings): Required courses or foundational skills
* `estimatedHours` (Integer): Total estimated study and laboratory time
* `modulesCount` (Integer): Number of structured modules
* `lessonsCount` (Integer): Total lessons and practical labs
* `published` (Boolean): Publication status flag
* `completionCriteria` (Text): Pass criteria and capstone requirements

### 2.2 Modules Collection (`modules`)
* `id` (String, PK)
* `courseId` (String, FK -> `courses.id`)
* `sequenceOrder` (Integer)
* `title` (String)
* `description` (Text)
* `durationMinutes` (Integer)

### 2.3 Lessons Collection (`lessons`)
* `id` (String, PK)
* `moduleId` (String, FK -> `modules.id`)
* `courseId` (String, FK -> `courses.id`)
* `sequenceOrder` (Integer)
* `title` (String)
* `type` (Enum): `concept` | `code` | `video` | `interactive`
* `durationMinutes` (Integer)
* `contentMarkdown` (Text): Full educational treatise
* `codeSnippet` (Text): Reference Python/PyTorch code
* `codeLanguage` (String): `python` | `sql` | `bash`

### 2.4 Offline Progress Queue (`offline_progress`)
* `id` (Integer, PK, AutoIncrement)
* `courseSlug` (String, Index)
* `lessonId` (String)
* `isCompleted` (Boolean)
* `quizScore` (Integer)
* `timestamp` (BigInt / Long): Unix epoch milliseconds
* `isSyncedWithServer` (Boolean, Index): `false` until acknowledged by cloud API

---

## 3. Conflict Resolution Protocol

When internet connectivity is restored:
1. The local client identifies all records in `offline_progress` where `isSyncedWithServer == false`.
2. Telemetry records are batched into an idempotent POST request to `/api/v1/student/progress`.
3. The server reconciles records using a **Highest Mastery & Latest Timestamp Rule**:
   - If server quiz score is 85% and offline quiz score is 100%, the 100% score is preserved.
   - Completed lesson flags are additive (a lesson once marked complete is never rolled back).
4. Server returns `200 OK` with updated enrollment state; client marks local records as `isSyncedWithServer = true`.

