from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional

from backend.orchestrator.multi_agent import StartupOrchestrator

router = APIRouter()
orchestrator = StartupOrchestrator()

class GenerateRequest(BaseModel):
    idea: str
    context: Optional[str] = ""
    stream: Optional[bool] = False

@router.post("/generate-startup")
async def generate_startup(req: GenerateRequest):
    try:
        return StreamingResponse(
            orchestrator.stream_startup_debate(req.idea, req.context),
            media_type="text/event-stream"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/architecture")
async def architecture(req: GenerateRequest):
    try:
        return StreamingResponse(
            orchestrator.stream_architecture(req.idea, req.context),
            media_type="text/event-stream"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/business-plan")
async def business_plan(req: GenerateRequest):
    try:
        return StreamingResponse(
            orchestrator.stream_business_plan(req.idea, req.context),
            media_type="text/event-stream"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/marketing")
async def marketing(req: GenerateRequest):
    try:
        return StreamingResponse(
            orchestrator.stream_marketing(req.idea, req.context),
            media_type="text/event-stream"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/investor-review")
async def investor_review(req: GenerateRequest):
    try:
        return StreamingResponse(
            orchestrator.stream_investor_review(req.idea, req.context),
            media_type="text/event-stream"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/market-analysis")
async def market_analysis(req: GenerateRequest):
    return {"message": "Market analysis endpoint ready for orchestration"}

@router.post("/competitor-analysis")
async def competitor_analysis(req: GenerateRequest):
    return {"message": "Competitor analysis endpoint ready for orchestration"}

@router.post("/database")
async def database(req: GenerateRequest):
    return {"message": "Database endpoint ready for orchestration"}

@router.post("/wireframes")
async def wireframes(req: GenerateRequest):
    return {"message": "Wireframes endpoint ready for orchestration"}
