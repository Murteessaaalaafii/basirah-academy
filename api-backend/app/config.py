import os
from pathlib import Path

class Settings:
    def __init__(self):
        self.APP_NAME: str = "Basirah Academy Intelligence Engine"
        self.API_PREFIX: str = "/api/v1"
        self.DEBUG: bool = True
        self.ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
        
        # Gemini API configuration
        self.GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
        self.DEFAULT_MODEL: str = os.getenv("DEFAULT_MODEL", "gemini-2.5-flash")
        
        # Security & JWT
        self.JWT_SECRET: str = os.getenv("JWT_SECRET", "basirah_prismatic_intelligence_secret_key_2026")
        self.ALGORITHM: str = "HS256"
        self.ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
        
        # Paths
        self.BASE_DIR: Path = Path(__file__).resolve().parent.parent
        self.ROOT_DIR: Path = self.BASE_DIR.parent
        self.SHARED_DIR: Path = self.ROOT_DIR / "shared"
        self.COURSES_PATH: Path = self.SHARED_DIR / "courses.json"
        
        # Rate Limiting
        self.MAX_REQUESTS_PER_MINUTE: int = 60
        self.MAX_TOKENS_PER_DAY_STUDENT: int = 150000

settings = Settings()
