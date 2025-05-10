"""
GuardianLink Data Models
Defines the Pydantic models for the GuardianLink platform.
"""

from typing import Dict, List, Optional, Union
from pydantic import BaseModel, Field

class User(BaseModel):
    """User model with wallet address."""
    wallet_address: str
    
class DelegationRequest(BaseModel):
    """Model for ERC-7710 delegation requests."""
    wallet_address: str
    delegate_to: str
    permission_type: str
    
class AidStreamRequest(BaseModel):
    """Model for ERC-7715 aid stream creation requests."""
    wallet_address: str
    aid_type: str
    location: str
    amount: float
    duration_days: int
    
class MentalHealthSubscription(BaseModel):
    """Model for mental health service subscription requests."""
    wallet_address: str
    service_type: str
    duration_weeks: int
    
class ChatMessage(BaseModel):
    """Model for chat messages."""
    wallet_address: str
    message: str
    language: Optional[str] = "en"
    
class DisasterRiskQuery(BaseModel):
    """Model for disaster risk assessment queries."""
    location: str
    disaster_type: Optional[str] = None
    
class DisasterResponse(BaseModel):
    """Model for disaster risk assessment responses."""
    location: str
    disaster_type: Optional[str]
    risk_level: str
    iot_data: Dict = Field(default_factory=dict)
    recommendations: List[str] = Field(default_factory=list)
    timestamp: str
    
class ChatResponse(BaseModel):
    """Model for chat responses."""
    response: str
    timestamp: str
    
class StreamStatus(BaseModel):
    """Model for stream status responses."""
    id: str
    sender: str
    recipient: str
    amount: float
    start_time: str
    end_time: str
    status: str
    released: float
    remaining: float
    
class DisasterData(BaseModel):
    """Model for disaster data."""
    id: str
    type: str
    location: str
    coordinates: Dict[str, float]
    severity: str
    start_date: str
    status: str
    affected_population: int
    aid_streams: List[str] = Field(default_factory=list)
