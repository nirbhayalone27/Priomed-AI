from fastapi import FastAPI, Depends, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
import random, asyncio, json

from database import engine, Base, get_db
import models
from agents import RiskAgent
from notifications import send_whatsapp_alert

# Ensure database tables exist
Base.metadata.create_all(bind=engine)

app = FastAPI(title="PRIOMED AI Core")

app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_credentials=True, 
    allow_methods=["*"], allow_headers=["*"]
)

class SampleInput(BaseModel):
    patient_name: str
    sample_type: str
    transit_time_mins: int
    is_emergency: bool

@app.post("/api/add-sample")
def add_sample(sample: SampleInput, db: Session = Depends(get_db)):
    # Calculate Math
    risk_score = RiskAgent.calculate_risk(sample.transit_time_mins)
    if sample.is_emergency: 
        risk_score += 50.0
    
    sample_id_str = f"SMP-{random.randint(1000, 9999)}"
    
    # Save to PostgreSQL
    new_sample = models.LabSample(
        sample_id=sample_id_str, 
        patient_name=sample.patient_name,
        sample_type=sample.sample_type, 
        transit_time=sample.transit_time_mins,
        is_emergency=sample.is_emergency, 
        ai_risk_score=risk_score,
        status="CRITICAL" if risk_score >= 70 else "PENDING"
    )
    db.add(new_sample)
    db.commit()
    
    # Trigger Twilio
    if risk_score >= 70 or sample.is_emergency:
        send_whatsapp_alert(sample_id_str, sample.sample_type, risk_score)
        
    return {"status": "success", "id": sample_id_str}

@app.websocket("/ws/live-queue")
async def websocket_endpoint(websocket: WebSocket, db: Session = Depends(get_db)):
    await websocket.accept()
    try:
        while True:
            # Query the actual database
            samples = db.query(models.LabSample).order_by(models.LabSample.ai_risk_score.desc()).limit(20).all()
            payload = [{"id": s.sample_id, "patient": s.patient_name, "type": s.sample_type, "risk": s.ai_risk_score, "emergency": s.is_emergency} for s in samples]
            
            await websocket.send_text(json.dumps(payload))
            await asyncio.sleep(2)
    except Exception as e:
        print(f"WebSocket Client Disconnected: {e}")
