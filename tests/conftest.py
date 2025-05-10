"""
Pytest configuration file with shared fixtures.
"""

import pytest
import os
from unittest.mock import patch
from fastapi.testclient import TestClient

from guardianlink.api.app import app
from guardianlink.services.ai_engine import DisasterResponseAgent, MentalHealthAgent

@pytest.fixture
def test_client():
    """Create a test client for the FastAPI app."""
    return TestClient(app)

@pytest.fixture
def mock_env_vars():
    """Mock environment variables for testing."""
    with patch.dict(os.environ, {
        "API_KEY": "test-api-key",
        "GAIA_AGENT_API_KEY": "test-gaia-api-key",
        "GAIA_AGENT_ENDPOINT": "http://localhost:3000/api/sign",
        "WEB3_PROVIDER_URI": "https://polygon-mumbai.infura.io/v3/test-infura-id",
        "ERC7715_ADDRESS": "0x0000000000000000000000000000000000000000",
        "ERC7710_ADDRESS": "0x0000000000000000000000000000000000000000",
    }):
        yield

@pytest.fixture
def disaster_agent():
    """Create a disaster response agent for testing."""
    return DisasterResponseAgent()

@pytest.fixture
def mental_health_agent():
    """Create a mental health agent for testing."""
    return MentalHealthAgent()

@pytest.fixture
def sample_wallet_address():
    """Return a sample wallet address for testing."""
    return "0x" + "a" * 40

@pytest.fixture
def sample_disaster_data():
    """Return sample disaster data for testing."""
    return {
        "id": "disaster_1",
        "type": "flood",
        "location": "Lagos, Nigeria",
        "coordinates": {"lat": 6.5244, "lng": 3.3792},
        "severity": "high",
        "start_date": "2025-05-01T00:00:00Z",
        "status": "active",
        "affected_population": 250000,
        "aid_streams": ["stream_123", "stream_456"]
    }

@pytest.fixture
def sample_chat_history():
    """Return sample chat history for testing."""
    return [
        {
            "id": "msg1",
            "role": "user",
            "content": "I'm feeling anxious about the upcoming exam.",
            "timestamp": "2025-05-10T12:00:00Z"
        },
        {
            "id": "msg2",
            "role": "ai",
            "content": "It's normal to feel anxious about exams. Let's talk about some strategies that might help you manage this anxiety.",
            "timestamp": "2025-05-10T12:00:01Z"
        }
    ]
