from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class HealthBase(BaseModel):
    school_year: Optional[int]
    age: Optional[int]
    gender: str
    bmi: Optional[float]
    who_bmi: Optional[str]
    phq_score: Optional[float]
    depression_severity: Optional[str]
    depressiveness: Optional[str]
    suicidal: Optional[bool]
    depression_diagnosis: Optional[bool]
    depression_treatment: Optional[bool]
    gad_score: Optional[float]
    anxiety_severity: Optional[str]
    anxiousness: Optional[str]
    anxiety_diagnosis: Optional[bool]
    anxiety_treatment: Optional[bool]
    epworth_score: Optional[float]
    sleepiness: Optional[str]
    timestamp: datetime  # Nuevo campo

class HealthCreate(HealthBase):
    id: str

class HealthInDB(HealthCreate):
    pass
