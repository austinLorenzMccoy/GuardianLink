"""
GuardianLink Blockchain Integration
Handles interactions with ERC-7715 (token streams) and ERC-7710 (delegation)
via MetaMask SDK for the GuardianLink platform.
"""

import os
import json
import uuid
from typing import Dict, List, Any, Optional
import logging
import asyncio
from datetime import datetime, timedelta

from web3 import Web3
from dotenv import load_dotenv

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize Web3
WEB3_PROVIDER_URI = os.getenv("WEB3_PROVIDER_URI")
if not WEB3_PROVIDER_URI:
    logger.warning("WEB3_PROVIDER_URI not set in .env, using default value")
    WEB3_PROVIDER_URI = "https://polygon-mumbai.infura.io/v3/your-infura-id"
web3 = Web3(Web3.HTTPProvider(WEB3_PROVIDER_URI))

# Get contract addresses from environment variables
ERC7715_ADDRESS = os.getenv("ERC7715_ADDRESS")
if not ERC7715_ADDRESS:
    logger.warning("ERC7715_ADDRESS not set in .env, using default value")
    ERC7715_ADDRESS = "0x0000000000000000000000000000000000000000"

ERC7710_ADDRESS = os.getenv("ERC7710_ADDRESS")
if not ERC7710_ADDRESS:
    logger.warning("ERC7710_ADDRESS not set in .env, using default value")
    ERC7710_ADDRESS = "0x0000000000000000000000000000000000000000"

# Mock contract ABIs
# In production, these would be loaded from actual JSON files
ERC7715_ABI = json.loads(os.getenv("ERC7715_ABI", """[
    {
        "inputs": [
            {"name": "recipient", "type": "address"},
            {"name": "amount", "type": "uint256"},
            {"name": "duration", "type": "uint256"},
            {"name": "metadata", "type": "string"}
        ],
        "name": "createStream",
        "outputs": [{"name": "streamId", "type": "bytes32"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"name": "streamId", "type": "bytes32"}],
        "name": "getStream",
        "outputs": [
            {"name": "sender", "type": "address"},
            {"name": "recipient", "type": "address"},
            {"name": "amount", "type": "uint256"},
            {"name": "startTime", "type": "uint256"},
            {"name": "endTime", "type": "uint256"},
            {"name": "ratePerSecond", "type": "uint256"},
            {"name": "remaining", "type": "uint256"},
            {"name": "status", "type": "uint8"}
        ],
        "stateMutability": "view",
        "type": "function"
    }
]"""))

ERC7710_ABI = json.loads(os.getenv("ERC7710_ABI", """[
    {
        "inputs": [
            {"name": "delegatee", "type": "address"},
            {"name": "permissions", "type": "bytes32[]"},
            {"name": "validity", "type": "uint256"}
        ],
        "name": "delegate",
        "outputs": [{"name": "delegationId", "type": "bytes32"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"name": "delegationId", "type": "bytes32"}],
        "name": "revokeDelegation",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]"""))

# Initialize contracts
erc7715_contract = web3.eth.contract(address=ERC7715_ADDRESS, abi=ERC7715_ABI)
erc7710_contract = web3.eth.contract(address=ERC7710_ADDRESS, abi=ERC7710_ABI)

# Mock database for streams and delegations
# In production, these would be stored in a proper database
STREAMS = {}
DELEGATIONS = {}

async def verify_delegation(wallet_address: str, delegate_to: str, permission_type: str) -> str:
    """
    Verify that a wallet has delegated permissions to an address.
    
    Args:
        wallet_address: The delegator's wallet address
        delegate_to: The delegatee's address
        permission_type: The type of permission being delegated
        
    Returns:
        Transaction hash of the delegation
    """
    try:
        logger.info(f"Verifying delegation from {wallet_address} to {delegate_to} for {permission_type}")
        
        # For MVP, we'll create a mock delegation
        delegation_id = f"delegation_{uuid.uuid4().hex}"
        
        DELEGATIONS[delegation_id] = {
            "delegator": wallet_address,
            "delegatee": delegate_to,
            "permission_type": permission_type,
            "created_at": datetime.now().isoformat(),
            "expires_at": (datetime.now() + timedelta(days=30)).isoformat(),
            "status": "active",
            "tx_hash": f"0x{uuid.uuid4().hex}"
        }
        
        return DELEGATIONS[delegation_id]["tx_hash"]
    except Exception as e:
        logger.error(f"Error verifying delegation: {str(e)}")
        raise

async def create_aid_stream(
    wallet_address: str,
    aid_type: str,
    location: str,
    amount: float,
    duration_days: int
) -> str:
    """
    Create an ERC-7715 aid stream for disaster relief.
    
    Args:
        wallet_address: The NGO wallet address
        aid_type: Type of aid (e.g., "food", "water", "shelter")
        location: Location of the disaster
        amount: Amount of tokens to stream
        duration_days: Duration of the stream in days
        
    Returns:
        Stream ID
    """
    try:
        logger.info(f"Creating aid stream for {aid_type} in {location}")
        
        # For MVP, we'll create a mock stream
        stream_id = f"stream_{uuid.uuid4().hex}"
        
        # Convert amount to Wei (assuming ETH)
        amount_wei = web3.to_wei(amount, "ether")
        
        # Calculate rate per second
        seconds = duration_days * 24 * 60 * 60
        rate_per_second = amount_wei / seconds
        
        STREAMS[stream_id] = {
            "sender": wallet_address,
            "recipient": "0x" + uuid.uuid4().hex[:40],  # Mock recipient address
            "aid_type": aid_type,
            "location": location,
            "amount": amount,
            "amount_wei": amount_wei,
            "duration_days": duration_days,
            "rate_per_second": rate_per_second,
            "start_time": datetime.now().isoformat(),
            "end_time": (datetime.now() + timedelta(days=duration_days)).isoformat(),
            "status": "active",
            "released": 0,
            "remaining": amount
        }
        
        return stream_id
    except Exception as e:
        logger.error(f"Error creating aid stream: {str(e)}")
        raise

async def get_stream_status(stream_id: str) -> Dict[str, Any]:
    """
    Get the status of an ERC-7715 aid stream.
    
    Args:
        stream_id: The ID of the stream
        
    Returns:
        Stream status
    """
    try:
        logger.info(f"Getting status for stream {stream_id}")
        
        if stream_id not in STREAMS:
            raise ValueError(f"Stream {stream_id} not found")
        
        stream = STREAMS[stream_id]
        
        # Calculate elapsed time and released amount
        start_time = datetime.fromisoformat(stream["start_time"])
        end_time = datetime.fromisoformat(stream["end_time"])
        current_time = datetime.now()
        
        # If stream has ended, all funds are released
        if current_time >= end_time:
            stream["released"] = stream["amount"]
            stream["remaining"] = 0
            stream["status"] = "completed"
        else:
            # Calculate the proportion of time elapsed
            total_duration = (end_time - start_time).total_seconds()
            elapsed_duration = (current_time - start_time).total_seconds()
            proportion = elapsed_duration / total_duration
            
            # Calculate released and remaining amounts
            released = stream["amount"] * proportion
            stream["released"] = released
            stream["remaining"] = stream["amount"] - released
        
        return stream
    except Exception as e:
        logger.error(f"Error getting stream status: {str(e)}")
        raise

async def subscribe_to_mental_health_service(
    wallet_address: str,
    service_type: str,
    duration_weeks: int
) -> str:
    """
    Subscribe to a mental health service using ERC-7715 streams.
    
    Args:
        wallet_address: The user's wallet address
        service_type: Type of mental health service
        duration_weeks: Duration of the subscription in weeks
        
    Returns:
        Subscription ID (stream ID)
    """
    try:
        logger.info(f"Creating mental health subscription for {service_type}")
        
        # For MVP, we'll create a mock subscription
        subscription_id = f"subscription_{uuid.uuid4().hex}"
        
        # Fixed price for services (in ETH)
        service_prices = {
            "anxiety_support": 0.1,
            "depression_support": 0.15,
            "stress_management": 0.12,
            "general_counseling": 0.08
        }
        
        amount = service_prices.get(service_type, 0.1) * duration_weeks
        
        # Convert amount to Wei (assuming ETH)
        amount_wei = web3.to_wei(amount, "ether")
        
        # Calculate rate per second
        seconds = duration_weeks * 7 * 24 * 60 * 60
        rate_per_second = amount_wei / seconds
        
        STREAMS[subscription_id] = {
            "sender": wallet_address,
            "recipient": "0x" + uuid.uuid4().hex[:40],  # Mock service provider address
            "service_type": service_type,
            "amount": amount,
            "amount_wei": amount_wei,
            "duration_weeks": duration_weeks,
            "rate_per_second": rate_per_second,
            "start_time": datetime.now().isoformat(),
            "end_time": (datetime.now() + timedelta(weeks=duration_weeks)).isoformat(),
            "status": "active",
            "released": 0,
            "remaining": amount
        }
        
        return subscription_id
    except Exception as e:
        logger.error(f"Error creating mental health subscription: {str(e)}")
        raise
