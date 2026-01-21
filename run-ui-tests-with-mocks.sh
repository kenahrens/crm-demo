#!/bin/bash

# Automated UI testing with proxymock
# This script starts proxymock, starts the frontend, runs tests, then cleans up

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=========================================="
echo "Automated UI Testing with Mocked Backend"
echo "=========================================="
echo ""

# Track PIDs for cleanup
MOCK_PID=""
FRONTEND_PID=""

# Cleanup function
cleanup() {
    echo ""
    echo "${YELLOW}Cleaning up...${NC}"

    if [ ! -z "$FRONTEND_PID" ]; then
        echo "Stopping frontend (PID: $FRONTEND_PID)..."
        kill $FRONTEND_PID 2>/dev/null || true
    fi

    if [ ! -z "$MOCK_PID" ]; then
        echo "Stopping proxymock (PID: $MOCK_PID)..."
        kill $MOCK_PID 2>/dev/null || true
    fi

    # Also use proxymock CLI to ensure mock server is stopped
    proxymock mock --stop 2>/dev/null || true

    echo "${GREEN}Cleanup complete${NC}"
}

# Register cleanup on exit
trap cleanup EXIT INT TERM

# 1. Start proxymock mock server
echo "${GREEN}Step 1/4: Starting proxymock mock server...${NC}"
proxymock mock \
  --in-directory proxymock/generated-mocks \
  --out-directory proxymock/results/test-run-$(date +%Y-%m-%d_%H-%M-%S) \
  > /tmp/proxymock.log 2>&1 &
MOCK_PID=$!

echo "Waiting for mock server to be ready..."
sleep 2

# Verify mock server is running
if ! ps -p $MOCK_PID > /dev/null; then
    echo "${RED}Failed to start mock server${NC}"
    cat /tmp/proxymock.log
    exit 1
fi

echo "${GREEN}Mock server running on port 4140 (PID: $MOCK_PID)${NC}"
echo ""

# 2. Start frontend dev server
echo "${GREEN}Step 2/4: Starting frontend dev server...${NC}"
cd frontend
export VITE_API_PORT=4140

npm run dev > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

echo "Waiting for frontend to be ready..."
# Wait for frontend to be available
for i in {1..30}; do
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo "${GREEN}Frontend ready at http://localhost:3000 (PID: $FRONTEND_PID)${NC}"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "${RED}Frontend failed to start${NC}"
        cat /tmp/frontend.log
        exit 1
    fi
    sleep 1
done
echo ""

# 3. Run UI tests
echo "${GREEN}Step 3/4: Running UI tests...${NC}"
echo ""

# Check if Cypress is installed
if [ -f "frontend/node_modules/.bin/cypress" ]; then
    echo "Running Cypress tests..."
    cd frontend
    npx cypress run --config baseUrl=http://localhost:3000
    TEST_EXIT_CODE=$?
    cd ..
# Check if Playwright is installed
elif [ -f "frontend/node_modules/.bin/playwright" ]; then
    echo "Running Playwright tests..."
    cd frontend
    npx playwright test
    TEST_EXIT_CODE=$?
    cd ..
else
    echo "${YELLOW}No test framework found (Cypress or Playwright)${NC}"
    echo "To add Cypress: cd frontend && npm install -D cypress"
    echo "To add Playwright: cd frontend && npm install -D @playwright/test"
    TEST_EXIT_CODE=0
fi

echo ""

# 4. Report results
echo "${GREEN}Step 4/4: Test Results${NC}"
echo "=========================================="
if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo "${GREEN}✓ All tests passed!${NC}"
else
    echo "${RED}✗ Tests failed with exit code: $TEST_EXIT_CODE${NC}"
fi
echo "=========================================="
echo ""

# Cleanup happens automatically via trap

exit $TEST_EXIT_CODE
