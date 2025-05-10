"""
GuardianLink AI Engine
Provides AI-powered services for disaster response and mental health support
using Gaia API for LLM interactions and vector storage for information retrieval.
"""

import os
import httpx
import json
from typing import Dict, List, Any, Optional, Tuple
from datetime import datetime
import logging
from dotenv import load_dotenv

# Simple Document class for storing text with metadata
class Document:
    def __init__(self, page_content, metadata=None):
        self.page_content = page_content
        self.metadata = metadata or {}

# Mock OpenAIEmbeddings class for the MVP
class OpenAIEmbeddings:
    def __init__(self):
        pass
        
    def embed_documents(self, texts):
        # Return mock embeddings (just random values for demo)
        return [[0.1, 0.2, 0.3] for _ in texts]
        
    def embed_query(self, text):
        # Return mock embedding for query
        return [0.1, 0.2, 0.3]

# Mock FAISS vector store
class FAISS:
    @classmethod
    def from_documents(cls, documents, embeddings):
        return cls(documents, embeddings)
        
    def __init__(self, documents, embeddings):
        self.documents = documents
        self.embeddings = embeddings
        
    def as_retriever(self, search_kwargs=None):
        return FAISSRetriever(self.documents, search_kwargs)
        
class FAISSRetriever:
    def __init__(self, documents, search_kwargs=None):
        self.documents = documents
        self.search_kwargs = search_kwargs or {"k": 1}
        
    def get_relevant_documents(self, query):
        # For mock, just return k random documents
        k = self.search_kwargs.get("k", 1)
        return self.documents[:min(k, len(self.documents))]

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Gaia API Configuration
GAIA_API_KEY = os.getenv('GAIA_AGENT_API_KEY')
GAIA_API_ENDPOINT = os.getenv('GAIA_AGENT_ENDPOINT')
GAIA_MODEL = os.getenv('GAIA_MODEL', 'llama')  # Default to llama model

class GaiaClient:
    """Client for interacting with Gaia API."""
    
    def __init__(self, api_key=None, api_endpoint=None, model=None):
        self.api_key = api_key or GAIA_API_KEY
        self.api_endpoint = api_endpoint or GAIA_API_ENDPOINT
        self.model = model or GAIA_MODEL
        
        if not self.api_key or not self.api_endpoint:
            raise ValueError("GAIA_AGENT_API_KEY and GAIA_AGENT_ENDPOINT must be set")
            
        self.headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }
        
    async def chat_completion(self, messages, temperature=0.7, max_tokens=1000, tools=None):
        """
        Send a chat completion request to the Gaia API.
        
        Args:
            messages: List of message dictionaries
            temperature: Temperature for response generation
            max_tokens: Maximum tokens to generate
            tools: Optional list of tools for function calling
            
        Returns:
            API response
        """
        payload = {
            "model": self.model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens
        }
        
        if tools:
            payload["tools"] = tools
            
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.api_endpoint}/chat/completions",
                    headers=self.headers,
                    json=payload,
                    timeout=60.0
                )
                response.raise_for_status()
                return response.json()
        except Exception as e:
            logger.error(f"Error calling Gaia API: {str(e)}")
            raise
            
    async def embeddings(self, texts):
        """
        Get embeddings for texts using the Gaia API.
        
        Args:
            texts: List of strings to embed
            
        Returns:
            List of embeddings
        """
        payload = {
            "model": "nomic-embed",  # Using nomic-embed model for embeddings
            "input": texts
        }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.api_endpoint}/embeddings",
                    headers=self.headers,
                    json=payload,
                    timeout=30.0
                )
                response.raise_for_status()
                return response.json()["data"]
        except Exception as e:
            logger.error(f"Error getting embeddings from Gaia API: {str(e)}")
            raise

# Initialize Gaia client
gaia_client = GaiaClient()

# Mock data for demo purposes
# In production, we would use proper vectorstores
MOCK_DISASTER_DATA = {
    "lagos": {
        "flood": {
            "risk": "high",
            "recommendations": [
                "Establish evacuation routes", 
                "Stockpile water purification supplies", 
                "Deploy flood barriers"
            ]
        },
        "earthquake": {"risk": "low", "recommendations": []}
    },
    "mumbai": {
        "flood": {
            "risk": "medium",
            "recommendations": [
                "Prepare drainage systems", 
                "Stockpile emergency supplies", 
                "Create emergency response teams"
            ]
        },
        "cyclone": {
            "risk": "high",
            "recommendations": [
                "Secure structures", 
                "Establish evacuation centers", 
                "Deploy early warning systems"
            ]
        }
    }
}

# Mock mental health resources
MENTAL_HEALTH_RESOURCES = [
    Document(
        page_content="Anxiety can be managed through deep breathing exercises, regular physical activity, and maintaining a healthy sleep schedule.",
        metadata={"type": "anxiety", "language": "en"}
    ),
    Document(
        page_content="Depression symptoms can be alleviated through therapy, medication, and establishing a routine.",
        metadata={"type": "depression", "language": "en"}
    ),
    Document(
        page_content="Wasiwasi inaweza kudhibitiwa kupitia mazoezi ya kupumua kwa kina, shughuli za kimwili za kawaida, na kudumisha ratiba nzuri ya usingizi.",
        metadata={"type": "anxiety", "language": "sw"}  # Swahili
    ),
    Document(
        page_content="चिंता को गहरी सांस लेने के व्यायाम, नियमित शारीरिक गतिविधि और स्वस्थ नींद का कार्यक्रम बनाए रखने के माध्यम से प्रबंधित किया जा सकता है।",
        metadata={"type": "anxiety", "language": "hi"}  # Hindi
    )
]

# Create a simple mock vector store for mental health resources
embeddings = OpenAIEmbeddings()
mental_health_vectorstore = FAISS.from_documents(MENTAL_HEALTH_RESOURCES, embeddings)
mental_health_retriever = mental_health_vectorstore.as_retriever(
    search_kwargs={"k": 3}
)

# Define the disaster response agent using Gaia API
class DisasterResponseAgent:
    """Agent for disaster response using Gaia API."""
    
    def __init__(self, client=None):
        self.client = client or gaia_client
    
    async def assess_risk(self, location: str, disaster_type: Optional[str] = None) -> Dict[str, Any]:
        """
        Assess disaster risk for a location using Gaia API.
        
        Args:
            location: The location to assess
            disaster_type: Optional type of disaster to assess
            
        Returns:
            Risk assessment
        """
        if not location:
            return {"risk_level": "unknown", "error": "Location not provided"}
        
        # Check if we have data for this location
        location_lower = location.lower()
        if location_lower in MOCK_DISASTER_DATA:
            if disaster_type and disaster_type in MOCK_DISASTER_DATA[location_lower]:
                risk_data = MOCK_DISASTER_DATA[location_lower][disaster_type]
                return {"risk_level": risk_data["risk"]}
            else:
                # If no specific disaster type, return the highest risk
                highest_risk = "low"
                for disaster in MOCK_DISASTER_DATA[location_lower].values():
                    if disaster["risk"] == "high":
                        highest_risk = "high"
                        break
                    elif disaster["risk"] == "medium" and highest_risk != "high":
                        highest_risk = "medium"
                return {"risk_level": highest_risk}
        
        # If location not found, use Gaia API to make a prediction
        messages = [
            {"role": "system", "content": "You are an AI disaster risk assessor. Assess the risk level (low, medium, high) for the following location and disaster type. Return ONLY a JSON object with a 'risk_level' field."},
            {"role": "user", "content": f"Location: {location}, Disaster type: {disaster_type or 'any'}"}
        ]
        
        try:
            response = await self.client.chat_completion(messages, temperature=0.2)
            content = response['choices'][0]['message']['content']
            
            # Try to parse the JSON response
            try:
                result = json.loads(content)
                return {"risk_level": result.get("risk_level", "medium")}
            except json.JSONDecodeError:
                # If not valid JSON, extract the risk level from the text
                if "high" in content.lower():
                    return {"risk_level": "high"}
                elif "medium" in content.lower():
                    return {"risk_level": "medium"}
                else:
                    return {"risk_level": "low"}
        except Exception as e:
            logger.error(f"Error assessing risk with Gaia API: {str(e)}")
            return {"risk_level": "medium", "error": str(e)}
    
    def collect_iot_data(self, location: str, disaster_type: Optional[str] = None) -> Dict[str, Any]:
        """
        Collect IoT data for a location.
        
        Args:
            location: The location to collect data for
            disaster_type: Optional type of disaster
            
        Returns:
            IoT data
        """
        # In a real implementation, this would fetch data from IoT devices
        # For MVP, we'll simulate some data
        location_lower = location.lower()
        
        mock_iot_data = {
            "lagos": {
                "flood": {
                    "water_level": "3.2m",
                    "rainfall": "120mm/day",
                    "drainage_capacity": "65%"
                }
            },
            "mumbai": {
                "cyclone": {
                    "wind_speed": "80km/h",
                    "pressure": "950hPa",
                    "rainfall": "90mm/day"
                },
                "flood": {
                    "water_level": "1.8m",
                    "rainfall": "85mm/day",
                    "drainage_capacity": "78%"
                }
            }
        }
        
        if location_lower in mock_iot_data and disaster_type in mock_iot_data[location_lower]:
            return mock_iot_data[location_lower][disaster_type]
        else:
            return {}
    
    async def generate_recommendations(self, location: str, disaster_type: Optional[str], risk_level: str, iot_data: Dict) -> List[str]:
        """
        Generate recommendations based on risk assessment and IoT data using Gaia API.
        
        Args:
            location: The location
            disaster_type: Type of disaster
            risk_level: Risk level (low, medium, high)
            iot_data: IoT data
            
        Returns:
            List of recommendations
        """
        location_lower = location.lower()
        
        # Check if we have predefined recommendations
        if location_lower in MOCK_DISASTER_DATA and disaster_type in MOCK_DISASTER_DATA[location_lower]:
            return MOCK_DISASTER_DATA[location_lower][disaster_type]["recommendations"]
        
        # If not, use Gaia API to generate recommendations
        messages = [
            {"role": "system", "content": "You are an AI disaster management expert. Generate 3-5 specific, actionable recommendations for the following disaster scenario. Return ONLY a JSON object with a 'recommendations' field containing an array of strings."},
            {"role": "user", "content": f"""
            Location: {location}
            Disaster type: {disaster_type or 'unknown'}
            Risk level: {risk_level}
            IoT data: {json.dumps(iot_data)}
            
            Please provide specific, actionable recommendations for disaster preparedness and response.
            """}
        ]
        
        try:
            response = await self.client.chat_completion(messages, temperature=0.3)
            content = response['choices'][0]['message']['content']
            
            # Try to parse the JSON response
            try:
                result = json.loads(content)
                return result.get("recommendations", [])
            except json.JSONDecodeError:
                # If not valid JSON, extract recommendations from the text
                lines = content.split('\n')
                recommendations = [line.strip() for line in lines if line.strip() and not line.strip().startswith('{') and not line.strip().endswith('}')] 
                return recommendations[:5]  # Return up to 5 recommendations
        except Exception as e:
            logger.error(f"Error generating recommendations with Gaia API: {str(e)}")
            return ["Establish evacuation routes", "Stockpile emergency supplies", "Create communication plan"]  # Fallback recommendations
    
    async def process(self, location: str, disaster_type: Optional[str] = None) -> Dict[str, Any]:
        """
        Process a disaster response request.
        
        Args:
            location: The location to assess
            disaster_type: Optional type of disaster to assess
            
        Returns:
            Assessment results including risk level and recommendations
        """
        # Step 1: Assess risk
        risk_assessment = await self.assess_risk(location, disaster_type)
        risk_level = risk_assessment.get("risk_level", "unknown")
        
        # Step 2: Collect IoT data
        iot_data = self.collect_iot_data(location, disaster_type)
        
        # Step 3: Generate recommendations
        recommendations = await self.generate_recommendations(location, disaster_type, risk_level, iot_data)
        
        return {
            "location": location,
            "disaster_type": disaster_type or "any",
            "risk_level": risk_level,
            "iot_data": iot_data,
            "recommendations": recommendations
        }

# Define the mental health support agent using Gaia API
class MentalHealthAgent:
    """Agent for mental health support using Gaia API."""
    
    def __init__(self, client=None):
        self.client = client or gaia_client
        
    async def retrieve_relevant_content(self, message: str, language: str = "en") -> str:
        """
        Retrieve relevant mental health content based on the user's message.
        
        Args:
            message: The user's message
            language: The language code
            
        Returns:
            Relevant content as a string
        """
        # For MVP, we'll use a simple lookup based on keywords and language
        relevant_docs = []
        
        # Filter by language if specified
        language_docs = [doc for doc in MENTAL_HEALTH_RESOURCES if doc.metadata.get("language") == language]
        if not language_docs:
            language_docs = [doc for doc in MENTAL_HEALTH_RESOURCES if doc.metadata.get("language") == "en"]
        
        # Simple keyword matching
        keywords = {
            "anxiety": ["anxiety", "anxious", "worry", "nervous", "stress", "panic"],
            "depression": ["depression", "depressed", "sad", "unhappy", "hopeless", "down"],
            "general": ["help", "support", "advice", "guidance", "tips"]
        }
        
        message_lower = message.lower()
        
        # Check for keyword matches
        matched_types = set()
        for doc_type, words in keywords.items():
            if any(word in message_lower for word in words):
                matched_types.add(doc_type)
        
        # If no specific matches, use general
        if not matched_types:
            matched_types.add("general")
            
        # Get relevant documents
        for doc in language_docs:
            doc_type = doc.metadata.get("type")
            if doc_type in matched_types or "general" in matched_types:
                relevant_docs.append(doc.page_content)
        
        # If we have relevant docs, return them
        if relevant_docs:
            return "\n\n".join(relevant_docs)
        
        # Otherwise, return a generic message
        return "Mental health is important. It's okay to seek help and support when needed."
    
    async def process(self, message: str, chat_history: List[Dict], language: str = "en") -> str:
        """
        Process a mental health support request using Gaia API.
        
        Args:
            message: The user's message
            chat_history: The chat history
            language: The language of the user
            
        Returns:
            AI response
        """
        # Get relevant content
        context = await self.retrieve_relevant_content(message, language)
        
        # Format chat history for the prompt
        formatted_history = ""
        for msg in chat_history[-5:]:  # Only use the last 5 messages to keep context manageable
            role = "User" if msg["role"] == "user" else "Assistant"
            formatted_history += f"{role}: {msg['content']}\n"
        
        # Create the messages for Gaia API
        messages = [
            {"role": "system", "content": f"""You are a compassionate mental health support AI. 
            Use the following retrieved information to provide supportive, empathetic responses.
            If the information doesn't address the user's concern, provide general supportive guidance.
            Always be respectful, supportive, and non-judgmental.
            
            Retrieved information:
            {context}
            
            Chat history:
            {formatted_history}
            
            Respond in the same language as the user's message.
            """},
            {"role": "user", "content": message}
        ]
        
        try:
            # Call Gaia API
            response = await self.client.chat_completion(
                messages=messages,
                temperature=0.7,  # Higher temperature for more empathetic responses
                max_tokens=500
            )
            
            return response['choices'][0]['message']['content']
        except Exception as e:
            logger.error(f"Error getting mental health response from Gaia API: {str(e)}")
            # Fallback response
            return "I'm here to support you. While I'm having some technical difficulties, please know that your feelings are valid and important. If you're in crisis, please reach out to a mental health professional or crisis hotline."

# Helper functions
async def predict_disaster_risk(location: str, disaster_type: Optional[str] = None) -> Dict[str, Any]:
    """
    Predict disaster risk for a location using Gaia API.
    
    Args:
        location: The location to assess
        disaster_type: Optional type of disaster to assess
        
    Returns:
        Risk assessment
    """
    agent = DisasterResponseAgent(client=gaia_client)
    return await agent.process(location, disaster_type)

async def get_disaster_recommendations(risk_assessment: Dict[str, Any]) -> List[str]:
    """
    Get disaster response recommendations from the risk assessment.
    
    Args:
        risk_assessment: The risk assessment data
        
    Returns:
        List of recommendations
    """
    return risk_assessment.get("recommendations", [])

async def get_mental_health_response(message: str, chat_history: List[Dict], language: str = "en") -> str:
    """
    Get a response from the mental health agent using Gaia API.
    
    Args:
        message: The user's message
        chat_history: The chat history
        language: The language of the user
        
    Returns:
        AI response
    """
    agent = MentalHealthAgent(client=gaia_client)
    return await agent.process(message, chat_history, language)
