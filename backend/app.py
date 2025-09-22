# app.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from excel_automation import load_and_clean, search_data
from typing import List, Optional  # Added Optional
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set your React URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}

class SearchRequest(BaseModel):
    session_id: str = "default"
    weld_point: Optional[str] = None  # Fixed: Use Optional[str] to allow None
    description: Optional[str] = None  # Fixed: Use Optional[str] to allow None

@app.post("/upload")
async def upload_files(files: List[UploadFile] = File(...), session_id: str = "default"):
    file_paths = []
    for f in files:
        path = f"temp_{f.filename}"
        with open(path, "wb") as buffer:
            buffer.write(await f.read())
        file_paths.append(path)
    df = load_and_clean(file_paths, session_id)
    return {"session_id": session_id, "row_count": len(df)}

@app.post("/search")
async def search(request: SearchRequest):
    results = search_data(
        session_id=request.session_id,
        weld_point=request.weld_point,
        description=request.description
    )
    return {"count": len(results), "rows": results}