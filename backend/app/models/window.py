from sqlalchemy import Column, String, Boolean, DateTime
from datetime import datetime
from app.db.base import Base

class Window(Base):
    __tablename__ = "window"

    id = Column(String, primary_key=True, index=True)
    hash = Column(String, index=True)
    is_duplicate = Column(Boolean, default=False)
    image_url = Column(String, nullable=True)
    description = Column(String, nullable=True)
    daytime = Column(String, nullable=True)
    location = Column(String, nullable=True)
    type = Column(String, nullable=True)
    material = Column(String, nullable=True)
    panes = Column(String, nullable=True)  # Store as string for flexibility or int? defined as Union[int, str] in schema, so String is safer or cast.
    covering = Column(String, nullable=True)
    open_state = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
