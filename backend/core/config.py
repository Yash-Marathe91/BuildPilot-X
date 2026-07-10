import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "BuildPilot X AI Service"
    API_V1_STR: str = "/api/v1"
    
    # AMD Notebook / Local HF Execution Flag
    # Set to True when deploying inside the AMD Notebook
    USE_LOCAL_HF: bool = os.getenv("USE_LOCAL_HF", "True").lower() == "true"
    
    # Primary Model (Hugging Face / AMD)
    HF_MODEL_NAME: str = os.getenv("HF_MODEL_NAME", "google/gemma-1.1-7b-it") # Use Gemma by default for AMD
    
    # Fallback Provider: Fireworks AI
    FIREWORKS_API_KEY: str = os.getenv("FIREWORKS_API_KEY", "")
    FIREWORKS_URL: str = "https://api.fireworks.ai/inference/v1"
    FALLBACK_MODEL: str = os.getenv("FALLBACK_MODEL", "accounts/fireworks/models/llama-v3-70b-instruct")
    
    class Config:
        case_sensitive = True

settings = Settings()
