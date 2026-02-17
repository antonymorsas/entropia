from sqlalchemy import Column, String, Boolean, DateTime
from datetime import datetime
from app.db.base import Base

class Window(Base):
    __tablename__ = "window"

    id = Column(String, primary_key=True, index=True)
    hash = Column(String, index=True)
    is_duplicate = Column(Boolean, default=False)
    image_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
