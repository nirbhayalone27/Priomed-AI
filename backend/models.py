from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from database import Base
import datetime

class LabSample(Base):
    __tablename__ = "lab_samples"

    id = Column(Integer, primary_key=True, index=True)
    sample_id = Column(String, unique=True, index=True)
    patient_name = Column(String)
    sample_type = Column(String)
    transit_time = Column(Integer)
    is_emergency = Column(Boolean, default=False)
    ai_risk_score = Column(Float, default=0.0)
    status = Column(String, default="PENDING")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
