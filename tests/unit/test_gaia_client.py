"""
Unit tests for the Gaia API client.
"""

import pytest
import json
from unittest.mock import patch, AsyncMock

from guardianlink.services.ai_engine import GaiaClient

@pytest.fixture
def gaia_client():
    """Create a Gaia client for testing."""
    return GaiaClient(
        api_key="test-api-key",
        api_endpoint="https://test.gaia.domains/v1",
        model="llama"
    )

class TestGaiaClient:
    """Tests for the GaiaClient class."""
    
    def test_init(self, gaia_client):
        """Test initialization of the client."""
        assert gaia_client.api_key == "test-api-key"
        assert gaia_client.api_endpoint == "https://test.gaia.domains/v1"
        assert gaia_client.model == "llama"
        assert gaia_client.headers == {
            "Content-Type": "application/json",
            "Authorization": "Bearer test-api-key"
        }
    
    def test_init_missing_values(self):
        """Test initialization with missing values."""
        with pytest.raises(ValueError):
            GaiaClient(api_key=None, api_endpoint=None)
    
    @pytest.mark.asyncio
    async def test_chat_completion(self, gaia_client):
        """Test chat completion."""
        mock_response = {
            "id": "test-id",
            "object": "chat.completion",
            "created": 1625097587,
            "model": "llama",
            "choices": [
                {
                    "index": 0,
                    "message": {
                        "role": "assistant",
                        "content": "This is a test response"
                    },
                    "finish_reason": "stop"
                }
            ]
        }
        
        with patch("httpx.AsyncClient.post") as mock_post:
            mock_post.return_value = AsyncMock()
            mock_post.return_value.json.return_value = mock_response
            mock_post.return_value.raise_for_status = AsyncMock()
            
            messages = [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Hello!"}
            ]
            
            response = await gaia_client.chat_completion(messages)
            
            assert response == mock_response
            mock_post.assert_called_once()
            
            # Check that the payload was correctly formatted
            args, kwargs = mock_post.call_args
            assert kwargs["json"]["model"] == "llama"
            assert kwargs["json"]["messages"] == messages
            assert kwargs["headers"] == gaia_client.headers
    
    @pytest.mark.asyncio
    async def test_embeddings(self, gaia_client):
        """Test embeddings."""
        mock_response = {
            "data": [
                {
                    "embedding": [0.1, 0.2, 0.3],
                    "index": 0
                }
            ]
        }
        
        with patch("httpx.AsyncClient.post") as mock_post:
            mock_post.return_value = AsyncMock()
            mock_post.return_value.json.return_value = mock_response
            mock_post.return_value.raise_for_status = AsyncMock()
            
            texts = ["This is a test"]
            
            response = await gaia_client.embeddings(texts)
            
            assert response == mock_response["data"]
            mock_post.assert_called_once()
            
            # Check that the payload was correctly formatted
            args, kwargs = mock_post.call_args
            assert kwargs["json"]["model"] == "nomic-embed"
            assert kwargs["json"]["input"] == texts
            assert kwargs["headers"] == gaia_client.headers
