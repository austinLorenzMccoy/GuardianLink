.PHONY: install test lint format clean run

# Default target
all: install lint test

# Install dependencies
install:
	pip install -e .

# Run tests
test:
	pytest

# Run tests with coverage
test-cov:
	pytest --cov=guardianlink --cov-report=html

# Lint code
lint:
	flake8 guardianlink tests
	mypy guardianlink tests
	black --check guardianlink tests

# Format code
format:
	black guardianlink tests
	isort guardianlink tests

# Clean up build artifacts
clean:
	rm -rf build/
	rm -rf dist/
	rm -rf *.egg-info
	rm -rf .pytest_cache
	rm -rf .coverage
	rm -rf htmlcov
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete

# Run the application
run:
	python run_app.py
