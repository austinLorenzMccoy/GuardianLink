"""
GuardianLink FastAPI Application
Main application entry point for the GuardianLink API.
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from guardianlink.api.routes import router, disaster_router, mental_health_router

# Load environment variables
load_dotenv()

def create_app() -> FastAPI:
    """
    Create and configure the FastAPI application.
    
    Returns:
        Configured FastAPI application
    """
    # Initialize FastAPI app
    app = FastAPI(
        title="GuardianLink API",
        description="AI-Driven Crisis Response & Mental Health Protocol",
        version="0.1.0",
    )
    
    # Configure CORS
    cors_origins = os.getenv("CORS_ALLOWED_ORIGINS", "*").split(",")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Include routers
    app.include_router(router)
    app.include_router(disaster_router)
    app.include_router(mental_health_router)
    
    return app

app = create_app()
