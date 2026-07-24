import uvicorn
from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from encryptor import encrypt_text
from decryptor import decrypt_text

app = FastAPI(title="Decode Labs Encryption Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    for error in exc.errors():
        if "key" in error.get("loc", []):
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={
                    "status": "error",
                    "message": "Invalid key value. Key must be an integer."
                }
            )
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "status": "error",
            "message": "Invalid input format."
        }
    )

class ProcessRequest(BaseModel):
    text: str
    key: int
    action: str

@app.post("/api/process")
async def process_text(payload: ProcessRequest):
    action = payload.action.strip().lower()
    if action not in ("encrypt", "decrypt"):
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={
                "status": "error",
                "message": "Invalid action. Action must be 'encrypt' or 'decrypt'."
            }
        )
    
    if action == "encrypt":
        result = encrypt_text(payload.text, payload.key)
    else:
        result = decrypt_text(payload.text, payload.key)
        
    return {
        "status": "success",
        "original_text": payload.text,
        "processed_text": result
    }

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def read_index():
    return FileResponse("static/index.html")

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)