#!/bin/bash

# Kubernetes Test Runner
# This script runs end-to-end tests against deployed services in Kubernetes
# to generate continuous traffic

set -e

echo "=========================================="
echo "Running End-to-End Tests in Kubernetes"
echo "=========================================="
echo ""

# Configuration from environment variables (set by K8s ConfigMap)
API_HOST="${VITE_API_HOST:-crm-core}"
API_PORT="${VITE_API_PORT:-80}"
FRONTEND_HOST="${FRONTEND_HOST:-crm-frontend}"
FRONTEND_PORT="${FRONTEND_PORT:-80}"

echo "Testing against:"
echo "  API: http://${API_HOST}:${API_PORT}"
echo "  Frontend: http://${FRONTEND_HOST}:${FRONTEND_PORT}"
echo ""

# Change to frontend directory where tests are located
cd frontend

# Export environment variables for tests
export VITE_API_HOST="${API_HOST}"
export VITE_API_PORT="${API_PORT}"
export BASE_URL="http://${FRONTEND_HOST}:${FRONTEND_PORT}"

# Check if Playwright is installed
if [ -f "node_modules/.bin/playwright" ]; then
    echo "Running Playwright tests..."
    npx playwright test --reporter=line
    TEST_EXIT_CODE=$?
# Fallback to Cypress if available
elif [ -f "node_modules/.bin/cypress" ]; then
    echo "Running Cypress tests..."
    npx cypress run --config baseUrl="http://${FRONTEND_HOST}:${FRONTEND_PORT}"
    TEST_EXIT_CODE=$?
else
    echo "ERROR: No test framework found (Playwright or Cypress)"
    exit 1
fi

echo ""
echo "=========================================="
if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo "✓ All tests passed!"
else
    echo "✗ Tests failed with exit code: $TEST_EXIT_CODE"
fi
echo "=========================================="

exit $TEST_EXIT_CODE
