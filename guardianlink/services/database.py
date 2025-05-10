"""
GuardianLink Database Service
Handles data storage and retrieval for the GuardianLink platform.
For MVP, this uses in-memory storage, but would be replaced with
a proper database in production.
"""

import os
import json
import uuid
from typing import Dict, List, Any, Optional
import logging
from datetime import datetime

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Mock databases
CHAT_HISTORY = {}  # wallet_address -> list of messages
DISASTER_DATA = [
    {
        "id": "disaster_1",
        "type": "flood",
        "location": "Lagos, Nigeria",
        "coordinates": {"lat": 6.5244, "lng": 3.3792},
        "severity": "high",
        "start_date": "2025-05-01T00:00:00Z",
        "status": "active",
        "affected_population": 250000,
        "aid_streams": ["stream_123", "stream_456"]
    },
    {
        "id": "disaster_2",
        "type": "cyclone",
        "location": "Mumbai, India",
        "coordinates": {"lat": 19.0760, "lng": 72.8777},
        "severity": "medium",
        "start_date": "2025-05-03T00:00:00Z",
        "status": "active",
        "affected_population": 180000,
        "aid_streams": ["stream_789"]
    },
    {
        "id": "disaster_3",
        "type": "earthquake",
        "location": "Kathmandu, Nepal",
        "coordinates": {"lat": 27.7172, "lng": 85.3240},
        "severity": "high",
        "start_date": "2025-04-28T00:00:00Z",
        "status": "recovery",
        "affected_population": 320000,
        "aid_streams": ["stream_abc", "stream_def"]
    }
]

async def get_user_chat_history(wallet_address: str) -> List[Dict[str, str]]:
    """
    Get chat history for a user.
    
    Args:
        wallet_address: The user's wallet address
        
    Returns:
        List of chat messages
    """
    try:
        logger.info(f"Getting chat history for {wallet_address}")
        
        if wallet_address not in CHAT_HISTORY:
            CHAT_HISTORY[wallet_address] = []
            
        return CHAT_HISTORY[wallet_address]
    except Exception as e:
        logger.error(f"Error getting chat history: {str(e)}")
        raise

async def save_chat_message(wallet_address: str, role: str, content: str) -> None:
    """
    Save a chat message to the database.
    
    Args:
        wallet_address: The user's wallet address
        role: The role of the message sender ("user" or "ai")
        content: The message content
    """
    try:
        logger.info(f"Saving chat message for {wallet_address}")
        
        if wallet_address not in CHAT_HISTORY:
            CHAT_HISTORY[wallet_address] = []
            
        CHAT_HISTORY[wallet_address].append({
            "id": str(uuid.uuid4()),
            "role": role,
            "content": content,
            "timestamp": datetime.now().isoformat()
        })
    except Exception as e:
        logger.error(f"Error saving chat message: {str(e)}")
        raise

async def get_disaster_data() -> List[Dict[str, Any]]:
    """
    Get data on active disasters.
    
    Returns:
        List of disaster data
    """
    try:
        logger.info("Getting disaster data")
        return DISASTER_DATA
    except Exception as e:
        logger.error(f"Error getting disaster data: {str(e)}")
        raise

async def get_disaster_by_id(disaster_id: str) -> Optional[Dict[str, Any]]:
    """
    Get disaster data by ID.
    
    Args:
        disaster_id: The ID of the disaster
        
    Returns:
        Disaster data or None if not found
    """
    try:
        logger.info(f"Getting disaster with ID {disaster_id}")
        
        for disaster in DISASTER_DATA:
            if disaster["id"] == disaster_id:
                return disaster
                
        return None
    except Exception as e:
        logger.error(f"Error getting disaster by ID: {str(e)}")
        raise

async def add_aid_stream_to_disaster(disaster_id: str, stream_id: str) -> bool:
    """
    Add an aid stream to a disaster.
    
    Args:
        disaster_id: The ID of the disaster
        stream_id: The ID of the aid stream
        
    Returns:
        True if successful, False otherwise
    """
    try:
        logger.info(f"Adding aid stream {stream_id} to disaster {disaster_id}")
        
        for disaster in DISASTER_DATA:
            if disaster["id"] == disaster_id:
                if "aid_streams" not in disaster:
                    disaster["aid_streams"] = []
                    
                disaster["aid_streams"].append(stream_id)
                return True
                
        return False
    except Exception as e:
        logger.error(f"Error adding aid stream to disaster: {str(e)}")
        raise
