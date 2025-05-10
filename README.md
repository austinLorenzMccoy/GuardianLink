# GuardianLink 🌍⚡

*AI-Driven Crisis Response & Mental Health Protocol*

![GuardianLink Banner](https://via.placeholder.com/1200x300/4CAF50/FFFFFF?text=GuardianLink)

## Overview

**GuardianLink** is a decentralized platform that combines disaster aid coordination and privacy-first mental health coaching, powered by ERC-7715/7710, MetaMask Delegation Toolkit, and Gaia AI.

Our tagline: *"Delegating Hope, Streamlining Survival."*

## 🚀 Features

### Disaster Response Module (DeProdAI)

- **ERC-7715 Aid Streams**: NGOs can create tokenized aid bundles (e.g., "100 Meals/day for 7 days") with funds streaming automatically when IoT/satellite data confirms delivery.
- **MetaMask Delegation**: NGOs can delegate ERC-7710 permissions to Gaia AI to auto-release funds.
- **AI Crisis Dashboard**: Real-time map showing active disasters and streamed aid status.

### Mental Health Module (DeEduAI)

- **Tokenized Coaching Sessions**: Users can subscribe via ERC-7715 streams for AI counseling.
- **Gaia AI Chatbot**: Mental health support with cultural adaptability (responds in multiple languages).
- **Privacy-First Design**: Encrypted chat logs for user privacy.

## 🔧 Tech Stack

| Component | Tech Used |
|-----------|-----------|
| **Backend** | FastAPI, Python, AsyncIO |
| **AI** | Gaia API (Llama 3.1 for disaster prediction and mental health) |
| **Blockchain** | Web3.py, ERC-7715/7710 (Solidity contracts) |
| **Storage** | In-memory storage (mock for MVP) |

## 📋 Project Structure

```
guardianlink/
├── guardianlink/             # Main package
│   ├── api/                  # API endpoints
│   │   ├── app.py            # FastAPI application
│   │   └── routes.py         # API routes
│   ├── core/                 # Core functionality
│   ├── models/               # Data models
│   │   └── schemas.py        # Pydantic schemas
│   ├── services/             # Service modules
│   │   ├── ai_engine.py      # AI services
│   │   ├── blockchain.py     # Blockchain integration
│   │   └── database.py       # Data storage
│   └── utils/                # Utilities
│       └── auth.py           # Authentication utilities
├── tests/                    # Test suite
│   ├── integration/          # Integration tests
│   │   └── test_api.py       # API tests
│   └── unit/                 # Unit tests
│       ├── test_ai_engine.py # AI engine tests
│       └── test_blockchain.py# Blockchain tests
├── .env                      # Environment variables
├── .env.example              # Example environment variables
├── pyproject.toml            # Project configuration
├── requirements.txt          # Dependencies
├── run_app.py                # Application runner
└── setup.py                  # Package setup
```

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/theBulls/GuardianLink.git
   cd GuardianLink
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -e .
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

## 🚀 Running the Application

1. Start the API server:
   ```bash
   python run_app.py
   ```

2. The API will be available at `http://localhost:8000`
   - API documentation: `http://localhost:8000/docs`
   - ReDoc documentation: `http://localhost:8000/redoc`

## 🧪 Running Tests

Run the test suite with pytest:

```bash
pytest
```

For test coverage:

```bash
pytest --cov=guardianlink
```

## 📚 API Documentation

### Disaster Response Endpoints

- `POST /disaster/delegate` - Delegate ERC-7710 permissions to Gaia AI
- `POST /disaster/create-stream` - Create an ERC-7715 aid stream
- `GET /disaster/stream/{stream_id}` - Get aid stream status
- `POST /disaster/predict` - Predict disaster risk for a location
- `GET /disaster/active` - Get active disasters

### Mental Health Endpoints

- `POST /mental-health/subscribe` - Subscribe to mental health services
- `POST /mental-health/chat` - Chat with the mental health AI
- `GET /mental-health/history/{wallet_address}` - Get chat history

## 🔗 Blockchain Integration

GuardianLink uses ERC-7715 (token streams) and ERC-7710 (delegation) standards via the MetaMask SDK:

- **ERC-7715**: Enables continuous token streaming for both aid distribution and mental health service subscriptions.
- **ERC-7710**: Allows delegation of permissions to the Gaia AI for automated decision-making.

## 🤖 Gaia API Integration

The platform exclusively uses Gaia API for all AI capabilities:

- **DisasterResponseAgent**: Predicts disaster risks and generates recommendations using the Llama 3.1 model via Gaia API.
- **MentalHealthAgent**: Provides culturally-adaptive mental health support in multiple languages using Gaia's language models.
- **OpenAI-Compatible Interface**: Gaia API follows the OpenAI API format, making it easy to integrate and use.

Gaia API endpoints used:
- `https://llama8b.gaia.domains/v1` - Primary endpoint using Llama 3.1 8B model
- `nomic-embed` - For embedding and retrieval capabilities

## 🌐 Deployment

For production deployment:

1. Update the `.env` file with production settings
2. Deploy the API to your preferred hosting service
3. Connect to a production blockchain network (e.g., Polygon Mainnet)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- The Bulls Team

## 🙏 Acknowledgements

- MetaMask for the Delegation Toolkit
- Gaia for the AI infrastructure
- The open-source community for the tools and libraries used in this project
