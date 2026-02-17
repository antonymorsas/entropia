from app.db.base import Base
from app.db.session import engine
from app.models import window  # noqa: F401

import logging
import time

logger = logging.getLogger(__name__)

def init_db():
    max_retries = 30
    retry_interval = 1
    
    for i in range(max_retries):
        try:
            Base.metadata.create_all(bind=engine)
            logger.info("Database initialized successfully.")
            return
        except Exception as e:
            if i < max_retries - 1:
                logger.warning(f"Database connection failed, retrying in {retry_interval}s... ({i+1}/{max_retries})")
                logger.warning(f"Error: {e}")
                time.sleep(retry_interval)
            else:
                logger.error("Max retries reached. Could not initialize database.")
                raise e
