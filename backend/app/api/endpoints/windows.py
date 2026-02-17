from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
from datetime import datetime
from app.schemas.window import WindowResponse, AIAnalysis

router = APIRouter()

@router.get("/", response_model=List[WindowResponse])
async def list_windows():
    return []

@router.post("/", response_model=WindowResponse)
async def create_window(file: UploadFile = File(...)):
    return WindowResponse(
        id="mock-id",
        hash="mock-hash",
        isDuplicate=False,
        createdAt=datetime.now(),
        ai=AIAnalysis(description="Mock AI Description", structured_data={}),
        imageUrl="http://example.com/mock.jpg"
    )

@router.get("/{window_id}", response_model=WindowResponse)
async def get_window(window_id: str):
    return WindowResponse(
        id=window_id,
        hash="mock-hash",
        isDuplicate=False,
        createdAt=datetime.now(),
        ai=AIAnalysis(description="Mock AI Description", structured_data={}),
        imageUrl="http://example.com/mock.jpg"
    )

@router.get("/{window_id}/duplicates", response_model=List[WindowResponse])
async def get_window_duplicates(window_id: str):
    return []
