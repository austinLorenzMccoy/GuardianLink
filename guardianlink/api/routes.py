"""
GuardianLink API Routes
Defines the FastAPI routes for the GuardianLink platform.
"""

from datetime import datetime
from typing import Dict, List, Optional, Union

from fastapi import APIRouter, HTTPException, Depends, Request, BackgroundTasks
from pydantic import BaseModel

from guardianlink.services.ai_engine import (
    predict_disaster_risk,
    get_disaster_recommendations,
    get_mental_health_response
)
from guardianlink.services.blockchain import (
    verify_delegation,
    create_aid_stream,
    subscribe_to_mental_health_service,
    get_stream_status
)
from guardianlink.services.database import (
    get_user_chat_history, 
    save_chat_message, 
    get_disaster_data
)
from guardianlink.models.schemas import (
    User,
    DelegationRequest,
    AidStreamRequest,
    MentalHealthSubscription,
    ChatMessage,
    DisasterRiskQuery
)
from guardianlink.utils.auth import verify_wallet

# Create routers
router = APIRouter()
disaster_router = APIRouter(prefix="/disaster", tags=["disaster"])
mental_health_router = APIRouter(prefix="/mental-health", tags=["mental-health"])

# Root route
@router.get("/")
def read_root():
    return {"message": "Welcome to GuardianLink API"}

# Disaster Response Module
@disaster_router.post("/delegate")
async def delegate_disaster_permissions(request: DelegationRequest):
    """Delegate ERC-7710 permissions to Gaia AI for disaster response."""
    try:
        transaction_hash = await verify_delegation(
            request.wallet_address, 
            request.delegate_to,
            request.permission_type
        )
        return {"success": True, "transaction_hash": transaction_hash}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@disaster_router.post("/create-stream")
async def create_new_aid_stream(request: AidStreamRequest):
    """Create an ERC-7715 aid stream for disaster relief."""
    try:
        stream_id = await create_aid_stream(
            request.wallet_address,
            request.aid_type,
            request.location,
            request.amount,
            request.duration_days
        )
        return {
            "success": True, 
            "stream_id": stream_id,
            "status": "created",
            "message": f"Aid stream created for {request.aid_type} in {request.location}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@disaster_router.get("/stream/{stream_id}")
async def get_aid_stream_status(stream_id: str):
    """Get the status of an ERC-7715 aid stream."""
    try:
        status = await get_stream_status(stream_id)
        return status
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@disaster_router.post("/predict")
async def predict_disaster(query: DisasterRiskQuery):
    """Predict disaster risk for a location."""
    try:
        risk_assessment = await predict_disaster_risk(query.location, query.disaster_type)
        recommendations = await get_disaster_recommendations(risk_assessment)
        
        return {
            "location": query.location,
            "disaster_type": query.disaster_type,
            "risk_assessment": risk_assessment,
            "recommendations": recommendations,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@disaster_router.get("/active")
async def get_active_disasters():
    """Get a list of active disasters from our database."""
    try:
        disasters = await get_disaster_data()
        return disasters
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Mental Health Module
@mental_health_router.post("/subscribe")
async def subscribe_to_mental_health(request: MentalHealthSubscription):
    """Subscribe to mental health services using ERC-7715 streams."""
    try:
        subscription_id = await subscribe_to_mental_health_service(
            request.wallet_address,
            request.service_type,
            request.duration_weeks
        )
        return {
            "success": True,
            "subscription_id": subscription_id,
            "service_type": request.service_type,
            "duration_weeks": request.duration_weeks,
            "message": f"Successfully subscribed to {request.service_type} for {request.duration_weeks} weeks"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@mental_health_router.post("/chat")
async def chat_with_ai(message: ChatMessage, background_tasks: BackgroundTasks):
    """Chat with the mental health AI agent."""
    try:
        # Get user's chat history for context
        chat_history = await get_user_chat_history(message.wallet_address)
        
        # Get AI response
        response = await get_mental_health_response(
            message.message, 
            chat_history,
            message.language
        )
        
        # Save the conversation to database
        background_tasks.add_task(
            save_chat_message,
            message.wallet_address,
            "user",
            message.message
        )
        
        background_tasks.add_task(
            save_chat_message,
            message.wallet_address,
            "ai",
            response
        )
        
        return {
            "response": response,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@mental_health_router.get("/history/{wallet_address}")
async def get_chat_history(wallet_address: str):
    """Get chat history for a user."""
    try:
        history = await get_user_chat_history(wallet_address)
        return history
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
