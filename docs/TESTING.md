# Basirah Academy — Testing & Quality Assurance Manual
**Document:** Test Strategy, Automation Commands, and Verification Checklist  
**Version:** 1.0.0  

---

## 1. Test Automation Suite

### 1.1 Python AI Backend Unit Tests
Execute the built-in test suite to verify RAG indexing, prompt injection guardrails, and Socratic tutoring:
```powershell
cd api-backend
python -m unittest tests/test_backend.py
```
* **Expected Output:**
  ```text
  ....
  ----------------------------------------------------------------------
  Ran 4 tests in 0.005s

  OK
  ```

### 1.2 Web Frontend TypeScript & Production Verification
Validate type safety, component prop bindings, and Next.js static asset optimization:
```powershell
cd web
npx tsc --noEmit
npm run build
```
* **Expected Output:**
  ```text
  ✓ Compiled successfully
  ✓ Generating static pages (22/22)
  ✓ Finalizing page optimization
  ```

### 1.3 Android Unit & Instrumentation Tests
Run Android local unit tests via Gradle:
```powershell
cd android
./gradlew test
```

---

## 2. Quality Assurance Checklist

- [x] **Zero Dead Links:** All 18 public pages and portal routes exist and navigate properly.
- [x] **Zero Hardcoded Fake Stats:** No invented student counts, false testimonials, or simulated accreditation logos.
- [x] **Authentic Curriculum:** 36 verified courses across Discover AI, Build with AI, and Engineer Intelligence.
- [x] **Real Socratic Guidance:** AI Tutor grounds responses in curriculum and rejects prompt injections.
- [x] **WCAG 2.2 AA Contrast Compliance:** All brand colors exceed the 4.5:1 ratio threshold.
- [x] **Offline Resilience:** Room local database caches courses and queues progress updates deterministically.

