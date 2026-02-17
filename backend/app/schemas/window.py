from pydantic import BaseModel
from typing import Optional, Union
from datetime import datetime

from enum import Enum

class Daytime(str, Enum):
    day = "day"
    night = "night"
    unknown = "unknown"

class Location(str, Enum):
    interior = "interior"
    exterior = "exterior"
    unknown = "unknown"

class WindowType(str, Enum):
    fixed = "fixed"
    sliding = "sliding"
    casement = "casement"
    awning = "awning"
    hung = "hung"
    pivot = "pivot"
    unknown = "unknown"

class Material(str, Enum):
    wood = "wood"
    aluminum = "aluminum"
    pvc = "pvc"
    unknown = "unknown"

class Covering(str, Enum):
    curtains = "curtains"
    blinds = "blinds"
    none = "none"
    unknown = "unknown"

class OpenState(str, Enum):
    open = "open"
    closed = "closed"
    ajar = "ajar"
    unknown = "unknown"

class WindowStructuredData(BaseModel):
    daytime: Daytime
    location: Location
    type: WindowType
    material: Material
    panes: Union[int, str]
    covering: Covering
    openState: OpenState

class AIAnalysis(BaseModel):
    description: str
    structured_data: WindowStructuredData

class WindowResponse(BaseModel):
    id: str
    hash: str
    isDuplicate: bool
    createdAt: datetime
    ai: Optional[AIAnalysis] = None
    imageUrl: Optional[str] = None
    