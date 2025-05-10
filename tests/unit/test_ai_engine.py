"""
Unit tests for the AI engine module.
"""

import pytest
from unittest.mock import patch, MagicMock

from guardianlink.services.ai_engine import (
    DisasterResponseAgent,
    MentalHealthAgent,
    predict_disaster_risk,
    get_disaster_recommendations,
    get_mental_health_response
)

@pytest.fixture
def disaster_agent():
    """Fixture for disaster response agent."""
    return DisasterResponseAgent()

@pytest.fixture
def mental_health_agent():
    """Fixture for mental health agent."""
    return MentalHealthAgent()

class TestDisasterResponseAgent:
    """Tests for the DisasterResponseAgent class."""
    
    @pytest.mark.asyncio
    async def test_process_known_location(self, disaster_agent):
        """Test processing a known location."""
        result = await disaster_agent.process("lagos", "flood")
        
        assert result["location"] == "lagos"
        assert result["disaster_type"] == "flood"
        assert result["risk_level"] == "high"
        assert len(result["recommendations"]) > 0
        
    @pytest.mark.asyncio
    async def test_process_unknown_location(self, disaster_agent):
        """Test processing an unknown location."""
        with patch('guardianlink.services.ai_engine.llm') as mock_llm:
            mock_response = MagicMock()
            mock_response.get.return_value = "medium"
            mock_llm.invoke.return_value = mock_response
            
            result = await disaster_agent.process("unknown_location", "flood")
            
            assert result["location"] == "unknown_location"
            assert result["disaster_type"] == "flood"
            assert "risk_level" in result

class TestMentalHealthAgent:
    """Tests for the MentalHealthAgent class."""
    
    @pytest.mark.asyncio
    async def test_process(self, mental_health_agent):
        """Test processing a mental health request."""
        with patch('guardianlink.services.ai_engine.llm') as mock_llm:
            mock_response = MagicMock()
            mock_response.content = "This is a test response"
            mock_llm.ainvoke.return_value = mock_response
            
            message = "I'm feeling anxious"
            chat_history = []
            
            response = await mental_health_agent.process(message, chat_history)
            
            assert response == "This is a test response"

@pytest.mark.asyncio
async def test_predict_disaster_risk():
    """Test the predict_disaster_risk function."""
    with patch('guardianlink.services.ai_engine.DisasterResponseAgent.process') as mock_process:
        mock_process.return_value = {
            "location": "test_location",
            "disaster_type": "test_disaster",
            "risk_level": "high",
            "recommendations": ["test recommendation"]
        }
        
        result = await predict_disaster_risk("test_location", "test_disaster")
        
        assert result["location"] == "test_location"
        assert result["disaster_type"] == "test_disaster"
        assert result["risk_level"] == "high"

@pytest.mark.asyncio
async def test_get_disaster_recommendations():
    """Test the get_disaster_recommendations function."""
    risk_assessment = {
        "recommendations": ["recommendation1", "recommendation2"]
    }
    
    result = await get_disaster_recommendations(risk_assessment)
    
    assert result == ["recommendation1", "recommendation2"]

@pytest.mark.asyncio
async def test_get_mental_health_response():
    """Test the get_mental_health_response function."""
    with patch('guardianlink.services.ai_engine.MentalHealthAgent.process') as mock_process:
        mock_process.return_value = "Test response"
        
        result = await get_mental_health_response("test message", [], "en")
        
        assert result == "Test response"
