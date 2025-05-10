#!/usr/bin/env python
"""
Development setup script for GuardianLink.
This script helps set up the development environment for GuardianLink.
"""

import os
import sys
import subprocess
import argparse
from pathlib import Path

def check_python_version():
    """Check if Python version is compatible."""
    if sys.version_info < (3, 9):
        print("Error: Python 3.9 or higher is required")
        sys.exit(1)
    print(f"✅ Python version: {sys.version.split()[0]}")

def setup_venv():
    """Set up a virtual environment if not already active."""
    if not os.environ.get("VIRTUAL_ENV"):
        print("Creating virtual environment...")
        subprocess.run([sys.executable, "-m", "venv", "venv"], check=True)
        
        # Determine the activation script based on platform
        if sys.platform == "win32":
            activate_script = os.path.join("venv", "Scripts", "activate")
        else:
            activate_script = os.path.join("venv", "bin", "activate")
            
        print(f"✅ Virtual environment created. Activate it with:")
        print(f"    source {activate_script}")
        return False
    else:
        print(f"✅ Using active virtual environment: {os.environ['VIRTUAL_ENV']}")
        return True

def install_dependencies(dev=False):
    """Install dependencies."""
    print("Installing dependencies...")
    if dev:
        subprocess.run([sys.executable, "-m", "pip", "install", "-e", "."], check=True)
    else:
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], check=True)
    print("✅ Dependencies installed")

def setup_env_file():
    """Set up .env file if it doesn't exist."""
    env_file = Path(".env")
    env_example = Path(".env.example")
    
    if not env_file.exists() and env_example.exists():
        print("Creating .env file from .env.example...")
        with open(env_example, "r") as src:
            with open(env_file, "w") as dst:
                dst.write(src.read())
        print("✅ .env file created. Please update it with your configuration.")
    elif env_file.exists():
        print("✅ .env file already exists")
    else:
        print("⚠️ .env.example not found, cannot create .env file")

def main():
    """Main function."""
    parser = argparse.ArgumentParser(description="Set up the development environment for GuardianLink")
    parser.add_argument("--dev", action="store_true", help="Install in development mode")
    args = parser.parse_args()
    
    print("Setting up GuardianLink development environment...")
    check_python_version()
    venv_active = setup_venv()
    
    if venv_active:
        install_dependencies(args.dev)
        setup_env_file()
        print("\n🚀 GuardianLink development environment is ready!")
        print("\nTo run the application:")
        print("    python run_app.py")
        print("\nTo run tests:")
        print("    pytest")
    else:
        print("\n⚠️ Please activate the virtual environment and run this script again.")

if __name__ == "__main__":
    main()
