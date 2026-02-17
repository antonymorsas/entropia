from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class AIAnalysis(BaseModel):
    description: str
    structured_data: Dict[str, Any]

class WindowResponse(BaseModel):
    id: str
    hash: str
    isDuplicate: bool
    createdAt: datetime
    ai: Optional[AIAnalysis] = None
    imageUrl: str

class WindowCreate(BaseModel):
    pass
