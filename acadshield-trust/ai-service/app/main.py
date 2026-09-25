from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import time

app = FastAPI(
    title="AcadShield Trust AI Service",
    description="Risk and anomaly detection engine for educational credentials and issuer patterns",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {
        "status": "UP",
        "service": "acadshield-trust-ai",
        "version": "1.0.0",
        "timestamp": int(time.time()),
    }

@app.get("/ready")
def readiness_probe():
    return {"status": "READY"}
