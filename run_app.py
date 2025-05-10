"""
GuardianLink App Runner
Script to run the GuardianLink application.
"""

import os
import sys
import uvicorn
import logging
from dotenv import load_dotenv

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

def check_environment():
    """Check that all required environment variables are set."""
    required_vars = [
        "API_KEY",
        "GAIA_AGENT_API_KEY",
        "GAIA_AGENT_ENDPOINT",
        "WEB3_PROVIDER_URI",
        "ERC7715_ADDRESS",
        "ERC7710_ADDRESS"
    ]
    
    missing_vars = [var for var in required_vars if not os.getenv(var)]
    
    if missing_vars:
        logger.warning(f"Missing environment variables: {', '.join(missing_vars)}")
        logger.info("Using default mock values for missing variables")

def main():
    """Run the FastAPI application."""
    try:
        # Check environment
        check_environment()
        
        # Print startup message
        logger.info("Starting GuardianLink API")
        logger.info("=" * 50)
        
        # Run the application
        uvicorn.run(
            "guardianlink.api.app:app",
            host="0.0.0.0",
            port=int(os.getenv("PORT", "8000")),
            reload=os.getenv("DEBUG", "False").lower() == "true"
        )
    except Exception as e:
        logger.error(f"Error starting application: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()