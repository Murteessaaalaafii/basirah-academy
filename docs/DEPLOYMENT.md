# Basirah Academy — Deployment & Operations Guide
**Platform:** Next.js Web Portal, Python FastAPI Intelligence Engine & Native Android Client  
**Version:** 1.0.0  

---

## 1. Local Development Quickstart

### Prerequisites
* **Node.js**: v18.0.0+ (Tested on Node v24.19.0)
* **Python**: v3.10+ (Tested on Python 3.12.10)
* **Java/JDK**: OpenJDK 17 or 21 (Tested on OpenJDK 25)
* **Android Studio**: Android SDK 34 (UpsideDownCake)

### Starting the Ecosystem

#### Step 1: Start the Python Intelligence Gateway
```powershell
cd api-backend
python -m unittest tests/test_backend.py # Run pre-flight unit tests
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
* API Documentation: `http://localhost:8000/docs`
* Health Endpoint: `http://localhost:8000/health`

#### Step 2: Start the Next.js Web Experience
```powershell
cd web
npm install
npm run dev
```
* Web Portal: `http://localhost:3000`
* Production Build: `npm run build && npm run start`

#### Step 3: Run the Native Android Application
1. Open Android Studio.
2. Select **Open an Existing Project** and navigate to `c:\Users\HP\Basirah Academy\android`.
3. Allow Gradle to sync dependencies (`com.google.android.material:material`, `androidx.room`, `retrofit2`).
4. Run on an Android Emulator (API 34) or connected physical device via USB/adb.

---

## 2. Production Deployment Strategies

### Web Frontend (Vercel / Cloud Run / Node Container)
* Set environment variables as documented in `.env.example`.
* Build command: `npm run build`
* Start command: `npm run start`

### Python AI Backend (Cloud Run / AWS ECS / GKE)
* Containerize using standard Python 3.12 slim base image:
  ```dockerfile
  FROM python:3.12-slim
  WORKDIR /app
  COPY requirements.txt .
  RUN pip install --no-cache-dir -r requirements.txt
  COPY . .
  CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
  ```

### Android Release APK / AAB
* Generate signed bundle:
  ```powershell
  cd android
  ./gradlew bundleRelease
  ```

