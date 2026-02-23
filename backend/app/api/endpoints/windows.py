from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
import hashlib
from typing import List, Optional
from datetime import datetime
from sqlalchemy.orm import Session
from app.schemas.window import WindowResponse, AIAnalysis, WindowStructuredData
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
    order: Optional[str] = "desc",
    db: Session = Depends(get_db)
):
    query = db.query(Window)
    
    if order == "asc":
        query = query.order_by(Window.created_at.asc())
    else: 
        query = query.order_by(Window.created_at.desc())
    
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
            ai=AIAnalysis(
                description=w.description,
                structured_data=WindowStructuredData(
                    daytime=w.daytime,
                    location=w.location,
                    type=w.type,
                    material=w.material,
                    panes=w.panes,
                    covering=w.covering,
                    openState=w.open_state
                )
            ) if w.description else None
        ) for w in windows
    ]

@router.post("/", response_model=WindowResponse)
async def create_window(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB
    
    file_content = await file.read()
    
    if len(file_content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File too large. Maximum size is 5MB.")
    sha256_hash = hashlib.sha256(file_content).hexdigest()

    existing_window = db.query(Window).filter(Window.hash == sha256_hash).first()
    is_duplicate = existing_window is not None
    
    
    import os
    from app.main import uploads_dir
    
    file_extension = file.filename.split(".")[-1] if file.filename else "png"
    filename = f"{sha256_hash}.{file_extension}"
    file_path = os.path.join(uploads_dir, filename)
    
    await file.seek(0)
    
    with open(file_path, "wb") as f:
        f.write(await file.read())
        
    image_url = f"static/{filename}"

    
    # Initialize variables for Window creation
    description = None
    structured_data = None

    if is_duplicate and existing_window:
        # If duplicate, reuse the existing analysis
        description = existing_window.description
        structured_data = WindowStructuredData(
            daytime=existing_window.daytime,
            location=existing_window.location,
            type=existing_window.type,
            material=existing_window.material,
            panes=existing_window.panes,
            covering=existing_window.covering,
            openState=existing_window.open_state
        ) if existing_window.description else None
    else:
        # Analyze image with Ollama
        from app.services.ollama import OllamaService
        ai_analysis = OllamaService.analyze_image(file_path)
        description = ai_analysis.description
        structured_data = ai_analysis.structured_data

    new_window = Window(
        id=str(uuid.uuid4()),
        hash=sha256_hash,
        is_duplicate=is_duplicate,
        image_url=image_url,
        created_at=datetime.utcnow(),
        description=description,
        daytime=structured_data.daytime if structured_data else None,
        location=structured_data.location if structured_data else None,
        type=structured_data.type if structured_data else None,
        material=structured_data.material if structured_data else None,
        panes=str(structured_data.panes) if structured_data else None,
        covering=structured_data.covering if structured_data else None,
        open_state=structured_data.openState if structured_data else None
    )
    
    db.add(new_window)
    db.commit()
    db.refresh(new_window)
    
    ai_response = AIAnalysis(
        description=new_window.description,
        structured_data=WindowStructuredData(
            daytime=new_window.daytime,
            location=new_window.location,
            type=new_window.type,
            material=new_window.material,
            panes=new_window.panes,
            covering=new_window.covering,
            openState=new_window.open_state
        )
    ) if new_window.description else None

    return WindowResponse(
        id=new_window.id,
        hash=new_window.hash,
        isDuplicate=new_window.is_duplicate,
        createdAt=new_window.created_at,
        imageUrl=new_window.image_url,
        ai=ai_response
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
        ai=AIAnalysis(
            description=window.description,
            structured_data=WindowStructuredData(
                daytime=window.daytime,
                location=window.location,
                type=window.type,
                material=window.material,
                panes=window.panes,
                covering=window.covering,
                openState=window.open_state
            )
        ) if window.description else None
    )

@router.get("/{window_id}/duplicates", response_model=List[WindowResponse])
async def get_window_duplicates(window_id: str, db: Session = Depends(get_db)):
    window = db.query(Window).filter(Window.id == window_id).first()
    if not window:
         raise HTTPException(status_code=404, detail="Window not found")
    
    duplicates = db.query(Window).filter(
        Window.hash == window.hash,
        Window.id != window.id
    ).all()
    
    return [
        WindowResponse(
            id=w.id,
            hash=w.hash,
            isDuplicate=w.is_duplicate,
            createdAt=w.created_at,
            imageUrl=w.image_url,
            ai=AIAnalysis(
                description=w.description,
                structured_data=WindowStructuredData(
                    daytime=w.daytime,
                    location=w.location,
                    type=w.type,
                    material=w.material,
                    panes=w.panes,
                    covering=w.covering,
                    openState=w.open_state
                )
            ) if w.description else None
        ) for w in duplicates
    ]

@router.delete("/{window_id}", status_code=204)
async def delete_window(window_id: str, db: Session = Depends(get_db)):
    window = db.query(Window).filter(Window.id == window_id).first()
    if not window:
        raise HTTPException(status_code=404, detail="Window not found")
    
    if window.image_url:
        import os
        from app.main import uploads_dir

        filename = os.path.basename(window.image_url)
        file_path = os.path.join(uploads_dir, filename)
        
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
            except OSError as e:
                print(f"Error deleting file {file_path}: {e}")

    db.delete(window)
    db.commit()
    return None
