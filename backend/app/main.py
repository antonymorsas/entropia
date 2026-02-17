import uvicorn
from fastapi import FastAPI
from app.api.api import api_router
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.api.api import api_router
from app.db.init_db import init_db
from app.schemas.response import Response

app = FastAPI(title="Entropia API")

from fastapi.staticfiles import StaticFiles
import os

uploads_dir = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(uploads_dir, exist_ok=True)
app.mount("/static", StaticFiles(directory=uploads_dir), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:11434",
        "http://127.0.0.1:11434",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(api_router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
