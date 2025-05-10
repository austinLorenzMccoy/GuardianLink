"""
Integration tests for the API endpoints.
"""

import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock

from guardianlink.api.app import app

client = TestClient(app)

def test_read_root():
    """Test the root endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()
    assert response.json()["message"] == "Welcome to GuardianLink API"

@patch("guardianlink.services.blockchain.verify_delegation")
def test_delegate_disaster_permissions(mock_verify_delegation):
    """Test the delegate disaster permissions endpoint."""
    mock_verify_delegation.return_value = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
    
    response = client.post(
        "/disaster/delegate",
        json={
            "wallet_address": "0x" + "a" * 40,
            "delegate_to": "0x" + "b" * 40,
            "permission_type": "disaster_response"
        }
    )
    
    assert response.status_code == 200
    assert response.json()["success"] is True
    assert "transaction_hash" in response.json()

@patch("guardianlink.services.blockchain.create_aid_stream")
def test_create_new_aid_stream(mock_create_aid_stream):
    """Test the create aid stream endpoint."""
    mock_create_aid_stream.return_value = "stream_1234567890abcdef"
    
    response = client.post(
        "/disaster/create-stream",
        json={
            "wallet_address": "0x" + "a" * 40,
            "aid_type": "food",
            "location": "lagos",
            "amount": 1.5,
            "duration_days": 7
        }
    )
    
    assert response.status_code == 200
    assert response.json()["success"] is True
    assert response.json()["stream_id"] == "stream_1234567890abcdef"
    assert response.json()["status"] == "created"

@patch("guardianlink.services.blockchain.get_stream_status")
def test_get_aid_stream_status(mock_get_stream_status):
    """Test the get aid stream status endpoint."""
    mock_get_stream_status.return_value = {
        "sender": "0x" + "a" * 40,
        "recipient": "0x" + "b" * 40,
        "aid_type": "food",
        "location": "lagos",
        "amount": 1.5,
        "duration_days": 7,
        "status": "active",
        "released": 0.5,
        "remaining": 1.0
    }
    
    response = client.get("/disaster/stream/stream_1234567890abcdef")
    
    assert response.status_code == 200
    assert response.json()["sender"] == "0x" + "a" * 40
    assert response.json()["aid_type"] == "food"
    assert response.json()["status"] == "active"

@patch("guardianlink.services.ai_engine.predict_disaster_risk")
@patch("guardianlink.services.ai_engine.get_disaster_recommendations")
def test_predict_disaster(mock_get_disaster_recommendations, mock_predict_disaster_risk):
    """Test the predict disaster endpoint."""
    mock_predict_disaster_risk.return_value = {
        "location": "lagos",
        "disaster_type": "flood",
        "risk_level": "high",
        "iot_data": {"water_level": "3.2m"}
    }
    mock_get_disaster_recommendations.return_value = [
        "Establish evacuation routes",
        "Stockpile water purification supplies"
    ]
    
    response = client.post(
        "/disaster/predict",
        json={
            "location": "lagos",
            "disaster_type": "flood"
        }
    )
    
    assert response.status_code == 200
    assert response.json()["location"] == "lagos"
    assert response.json()["disaster_type"] == "flood"
    assert "recommendations" in response.json()
    assert len(response.json()["recommendations"]) == 2

@patch("guardianlink.services.database.get_disaster_data")
def test_get_active_disasters(mock_get_disaster_data):
    """Test the get active disasters endpoint."""
    mock_get_disaster_data.return_value = [
        {
            "id": "disaster_1",
            "type": "flood",
            "location": "Lagos, Nigeria",
            "severity": "high",
            "status": "active"
        }
    ]
    
    response = client.get("/disaster/active")
    
    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["id"] == "disaster_1"
    assert response.json()[0]["type"] == "flood"

@patch("guardianlink.services.blockchain.subscribe_to_mental_health_service")
def test_subscribe_to_mental_health(mock_subscribe_to_mental_health_service):
    """Test the subscribe to mental health endpoint."""
    mock_subscribe_to_mental_health_service.return_value = "subscription_1234567890abcdef"
    
    response = client.post(
        "/mental-health/subscribe",
        json={
            "wallet_address": "0x" + "a" * 40,
            "service_type": "anxiety_support",
            "duration_weeks": 4
        }
    )
    
    assert response.status_code == 200
    assert response.json()["success"] is True
    assert response.json()["subscription_id"] == "subscription_1234567890abcdef"
    assert response.json()["service_type"] == "anxiety_support"
    assert response.json()["duration_weeks"] == 4

@patch("guardianlink.services.database.get_user_chat_history")
@patch("guardianlink.services.ai_engine.get_mental_health_response")
def test_chat_with_ai(mock_get_mental_health_response, mock_get_user_chat_history):
    """Test the chat with AI endpoint."""
    mock_get_user_chat_history.return_value = []
    mock_get_mental_health_response.return_value = "This is a test response"
    
    response = client.post(
        "/mental-health/chat",
        json={
            "wallet_address": "0x" + "a" * 40,
            "message": "I'm feeling anxious",
            "language": "en"
        }
    )
    
    assert response.status_code == 200
    assert response.json()["response"] == "This is a test response"
    assert "timestamp" in response.json()

@patch("guardianlink.services.database.get_user_chat_history")
def test_get_chat_history(mock_get_user_chat_history):
    """Test the get chat history endpoint."""
    mock_get_user_chat_history.return_value = [
        {
            "id": "msg1",
            "role": "user",
            "content": "Hello",
            "timestamp": "2025-05-10T12:00:00Z"
        },
        {
            "id": "msg2",
            "role": "ai",
            "content": "Hi there! How can I help you?",
            "timestamp": "2025-05-10T12:00:01Z"
        }
    ]
    
    response = client.get("/mental-health/history/0x" + "a" * 40)
    
    assert response.status_code == 200
    assert len(response.json()) == 2
    assert response.json()[0]["role"] == "user"
    assert response.json()[1]["role"] == "ai"
