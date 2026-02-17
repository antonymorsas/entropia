from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
import hashlib
from typing import List, Optional
from datetime import datetime
from sqlalchemy.orm import Session
from app.schemas.window import WindowResponse, AIAnalysis, Window as WindowSchema
from app.models.window import Window
from app.db.session import SessionLocal
import uuid

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[WindowResponse])
async def list_windows(
    limit: Optional[int] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Window)
    if limit:
        query = query.limit(limit)
    windows = query.all()
    
    return [
        WindowResponse(
            id=w.id,
            hash=w.hash,
            isDuplicate=w.is_duplicate,
            createdAt=w.created_at,
            imageUrl=w.image_url,
            ai=None      
        ) for w in windows
    ]

@router.post("/", response_model=WindowResponse)
async def create_window(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    file_content = await file.read()
    sha256_hash = hashlib.sha256(file_content).hexdigest()

    existing_window = db.query(Window).filter(Window.hash == sha256_hash).first()
    is_duplicate = existing_window is not None
    
    
    # Save file
    import os
    from app.main import uploads_dir
    
    file_extension = file.filename.split(".")[-1] if file.filename else "png"
    filename = f"{sha256_hash}.{file_extension}"
    file_path = os.path.join(uploads_dir, filename)
    
    # Reset cursor
    await file.seek(0)
    
    with open(file_path, "wb") as f:
        f.write(await file.read())
        
    image_url = f"static/{filename}"

    new_window = Window(
        id=str(uuid.uuid4()),
        hash=sha256_hash,
        is_duplicate=is_duplicate,
        image_url=image_url,
        created_at=datetime.utcnow()
    )
    
    db.add(new_window)
    db.commit()
    db.refresh(new_window)
    
    return WindowResponse(
        id=new_window.id,
        hash=new_window.hash,
        isDuplicate=new_window.is_duplicate,
        createdAt=new_window.created_at,
        imageUrl=new_window.image_url,
        ai=None
    )

@router.get("/{window_id}", response_model=WindowResponse)
async def get_window(window_id: str, db: Session = Depends(get_db)):
    window = db.query(Window).filter(Window.id == window_id).first()
    if not window:
         raise HTTPException(status_code=404, detail="Window not found")
         
    return WindowResponse(
        id=window.id,
        hash=window.hash,
        isDuplicate=window.is_duplicate,
        createdAt=window.created_at,
        imageUrl=window.image_url,
        ai=None
    )

@router.get("/{window_id}/duplicates", response_model=List[WindowResponse])
async def get_window_duplicates(window_id: str, db: Session = Depends(get_db)):
    return []
