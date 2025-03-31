from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, Any, List, Dict
import uvicorn
import ast
from ast_service import analyze_code 

app = FastAPI(title="Code Parser Service")

class ParseRequest(BaseModel):
    code: str
    test_case: Optional[Any] = None
    language: str = "python"

class ParseResponse(BaseModel):
    is_valid: bool
    errors: List[Dict[str, Any]]
    functions: List[Dict[str, Any]]
    variables: List[Dict[str, Any]]
    data_structures: List[Dict[str, Any]]
    entry_point: Optional[str]
    complexity: Dict[str, str]

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "python-parser"}

@app.post("/parse", response_model=ParseResponse)
async def parse_code(request: ParseRequest):
    try:
        # Ensure we're handling Python code for now
        if request.language.lower() != "python":
            raise HTTPException(status_code=400, message="Only Python language is supported currently")
        
        # Analyze the code using our AST service
        result = analyze_code(request.code, request.test_case)
        return result
        
    except SyntaxError as e:
        raise HTTPException(
            status_code=400,
            detail={
                "is_valid": False,
                "errors": [{
                    "line": e.lineno,
                    "message": str(e),
                    "type": "SyntaxError"
                }]
            }
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail={"message": f"Analysis failed: {str(e)}"}
        )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)