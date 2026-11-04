# Basirah Academy — AI Engineering Education Ecosystem
**Project Codename:** PRISMATIC INTELLIGENCE  
**Tagline:** Learn • Build • Innovate.  
**Mission:** Make artificial intelligence understandable, accessible, practical, and buildable for everyone.  

---

## 1. Executive Overview

Basirah Academy is a premium, high-fidelity AI engineering educational platform delivered as an interconnected web portal and a native Android application.

### Educational Philosophy
* **Zero Unhealthy Competition:** No public student rankings or shaming leaderboards.
* **Zero Intimidation:** Complex mathematical vectors and computational graphs explained from first principles.
* **Zero Artificial Pressure:** No countdown timers or manipulative daily streaks.
* **Zero Superficial Gamification:** Motivation stems from demonstrated skills and building working software.
* **Demonstrated Mastery:** Progress is verified through hands-on laboratory exercises and authentic capstone project deliverables.

---

## 2. Prismatic Intelligence Design System (PIDS)

PIDS merges academic sophistication with technological futurism, utilizing crystalline glass materials, controlled gradient illumination, and editorial paired typography.

### Brand Color Tokens
* **Midnight Navy** (`#07162F`): Foundational brand canvas
* **Deep Space** (`#0B2044`): Structural card surfaces
* **Royal Cobalt** (`#145BD7`): Architectural grounding
* **Electric Blue** (`#287BFF`): Energetic transitions
* **Crystal Cyan** (`#16D9F5`): Intelligence, discovery & interactive telemetry
* **Luxury Gold** (`#D9A83F`): Academic excellence & credentials
* **Champagne Gold** (`#F2D18B`): Refraction highlights
* **Pearl White** (`#F4F7FC`): Reading typography (13.4:1 contrast ratio)
* **Soft Slate** (`#91A4C1`): Monospaced technical labels

---

## 3. System Architecture

```
c:\Users\HP\Basirah Academy\
├── web/                     # Next.js 14 App Router, TypeScript, Tailwind CSS
├── api-backend/             # Python 3.12 FastAPI AI Gateway, RAG Engine & Safety Filters
├── android/                 # Native Android Java with Material 3 & Room Database
├── shared/                  # Canonical tokens.json, courses.json (36 courses), SVG assets
└── docs/                    # Architecture, Research, API, Database, Security, Testing
```

### 3.1 Web Application (`/web`)
* **Framework:** Next.js 14 App Router, TypeScript, Tailwind CSS
* **All 18 Public Pages:**
  1. Home (`/`) with Prismatic Hero Composition & Interactive Pathways
  2. About Basirah (`/about`)
  3. Explore Courses (`/courses`) with live search & level filter
  4. Learning Paths (`/paths`)
  5. Beginner Academy (`/paths/beginner-academy`)
  6. Intermediate Academy (`/paths/intermediate-academy`)
  7. Advanced Academy (`/paths/advanced-academy`)
  8. Course Details (`/courses/[slug]`)
  9. AI Learning Experience (`/experience`)
  10. Projects and Portfolio (`/projects`)
  11. Faculty & Academic Board (`/instructors`)
  12. Tuition & Scholarships (`/pricing`)
  13. Frequently Asked Questions (`/faq`)
  14. Admissions & Inquiries (`/contact`)
  15. Sign In (`/auth/signin`)
  16. Create Account (`/auth/signup`)
  17. Privacy Policy & Data Sovereignty (`/privacy`)
  18. Terms of Service & Honor Code (`/terms`)
* **Authenticated Portal Routes:**
  * Student Dashboard (`/dashboard`)
  * Interactive Lesson / Lab / AI Tutor Workspace (`/learn/[slug]/[lessonSlug]`)
  * Executive Governance Portal (`/admin`)

### 3.2 Python AI Backend (`/api-backend`)
* **Framework:** Python 3.12+ FastAPI & Uvicorn
* **Socratic AI Gateway:** Integrates Google Gemini API with fallback to embedded pedagogical simulator.
* **Retrieval-Augmented Generation (RAG):** BM25 + dense vector semantic retrieval indexing all 36 courses and 216 lessons.
* **Safety & Prompt Injection Defense:** Guardrail layers blocking system prompt leakage, jailbreaks, and sensitive key exfiltration.
* **Evaluation Tracker:** Latency percentiles, token usage monitoring, and cost calculations.

### 3.3 Native Android Application (`/android`)
* **Language & Architecture:** Pure Native Java with Material 3 components and MVVM clean architecture.
* **Offline-First Persistence:** Room SQLite database (`BasirahDatabase`) storing downloaded courses and offline progress queue.
* **All 19 Screens:** Splash, Onboarding, Sign In, Sign Up, Main Host, Home, Courses, Course Details, Lesson Viewer, Video Player, Quizzes, Assignments, AI Tutor, Projects, Certificates, Notifications, Profile, Settings, Offline Downloads.

---

## 4. The 3-Level 36-Course Curriculum

* **BEGINNER — Discover AI (10 Courses):** Introduction to AI, AI Literacy & Responsible AI, Prompt Engineering Fundamentals, AI Tools for Productivity, Python Programming Fundamentals, Mathematics for AI, Introduction to Data Science, Introduction to Machine Learning, AI for Education and Research, AI for Creativity and Business.
* **INTERMEDIATE — Build with AI (13 Courses):** Advanced Python for AI, Data Science with Python, Machine Learning Engineering, Deep Learning Fundamentals, Neural Networks, Natural Language Processing, Computer Vision, AI Application Development, API Integration, Retrieval-Augmented Generation, Vector Databases, AI Agents and Automation, Data Engineering for AI.
* **ADVANCED — Engineer Intelligence (13 Courses):** Advanced Machine Learning, Large Language Model Engineering, Advanced RAG Architecture, Context Engineering, Multi-Agent Systems, AI Infrastructure Engineering, Model Deployment and Optimization, MLOps and LLMOps, AI Security Engineering, AI Evaluation and Observability, Distributed AI Systems, GPU Computing Fundamentals, Production AI Architecture.

---

## 5. Verification & Running Instructions

### Run Python AI Backend:
```powershell
cd api-backend
python tests/test_backend.py
python -m uvicorn app.main:app --port 8000 --reload
```

### Run Web Portal:
```powershell
cd web
npm run build
npm run start
```

### Run Android App:
Open `android/` in Android Studio and run on emulator or connected device.

---

## 6. Compliance & Accessibility

* **Accessibility:** Full WCAG 2.2 AA compliance with 13.4:1 contrast ratios and keyboard navigation focus rings.
* **Data Sovereignty:** Compliant with the Ethiopian Data Protection Directive, INSA standards, and international GDPR privacy rights.
* **Authenticity Guarantee:** Zero fake student reviews, fake institutional badges, or simulated accreditation.

