"""
GuardianLink Authentication Utilities
Handles wallet authentication and verification.
"""

import logging
from fastapi import HTTPException

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

async def verify_wallet(wallet_address: str) -> str:
    """
    Verify a wallet address.
    
    In a real implementation, this would verify a wallet signature.
    For MVP, we just validate the address format.
    
    Args:
        wallet_address: The wallet address to verify
        
    Returns:
        The verified wallet address
        
    Raises:
        HTTPException: If the wallet address is invalid
    """
    if not wallet_address or len(wallet_address) != 42 or not wallet_address.startswith("0x"):
        raise HTTPException(status_code=403, detail="Invalid wallet address")
    return wallet_address
