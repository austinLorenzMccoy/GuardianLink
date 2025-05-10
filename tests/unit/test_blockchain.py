"""
Unit tests for the blockchain module.
"""

import pytest
from unittest.mock import patch, MagicMock
import uuid

from guardianlink.services.blockchain import (
    verify_delegation,
    create_aid_stream,
    get_stream_status,
    subscribe_to_mental_health_service
)

@pytest.mark.asyncio
async def test_verify_delegation():
    """Test the verify_delegation function."""
    wallet_address = "0x" + "a" * 40
    delegate_to = "0x" + "b" * 40
    permission_type = "disaster_response"
    
    with patch('guardianlink.services.blockchain.uuid.uuid4') as mock_uuid:
        mock_uuid.return_value = MagicMock(hex='1234567890abcdef1234567890abcdef')
        
        result = await verify_delegation(wallet_address, delegate_to, permission_type)
        
        assert result.startswith("0x")
        assert len(result) == 66  # 0x + 64 hex chars

@pytest.mark.asyncio
async def test_create_aid_stream():
    """Test the create_aid_stream function."""
    wallet_address = "0x" + "a" * 40
    aid_type = "food"
    location = "lagos"
    amount = 1.5
    duration_days = 7
    
    with patch('guardianlink.services.blockchain.uuid.uuid4') as mock_uuid:
        mock_uuid.return_value = MagicMock(hex='1234567890abcdef1234567890abcdef')
        
        stream_id = await create_aid_stream(
            wallet_address,
            aid_type,
            location,
            amount,
            duration_days
        )
        
        assert stream_id.startswith("stream_")
        assert len(stream_id) > 10

@pytest.mark.asyncio
async def test_get_stream_status():
    """Test the get_stream_status function."""
    # Create a mock stream first
    wallet_address = "0x" + "a" * 40
    aid_type = "food"
    location = "lagos"
    amount = 1.5
    duration_days = 7
    
    with patch('guardianlink.services.blockchain.uuid.uuid4') as mock_uuid:
        mock_uuid.return_value = MagicMock(hex='1234567890abcdef1234567890abcdef')
        
        stream_id = await create_aid_stream(
            wallet_address,
            aid_type,
            location,
            amount,
            duration_days
        )
        
        # Now get its status
        status = await get_stream_status(stream_id)
        
        assert status["sender"] == wallet_address
        assert status["aid_type"] == aid_type
        assert status["location"] == location
        assert status["amount"] == amount
        assert status["duration_days"] == duration_days
        assert status["status"] == "active"

@pytest.mark.asyncio
async def test_get_stream_status_not_found():
    """Test the get_stream_status function with a non-existent stream."""
    with pytest.raises(ValueError):
        await get_stream_status("non_existent_stream")

@pytest.mark.asyncio
async def test_subscribe_to_mental_health_service():
    """Test the subscribe_to_mental_health_service function."""
    wallet_address = "0x" + "a" * 40
    service_type = "anxiety_support"
    duration_weeks = 4
    
    with patch('guardianlink.services.blockchain.uuid.uuid4') as mock_uuid:
        mock_uuid.return_value = MagicMock(hex='1234567890abcdef1234567890abcdef')
        
        subscription_id = await subscribe_to_mental_health_service(
            wallet_address,
            service_type,
            duration_weeks
        )
        
        assert subscription_id.startswith("subscription_")
        assert len(subscription_id) > 15
