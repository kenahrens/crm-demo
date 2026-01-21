#!/bin/bash

# Start the frontend with mock server configuration
# The proxymock mock server is running on port 4140

echo "=========================================="
echo "Starting CRM Frontend with Mock Backend"
echo "=========================================="
echo ""
echo "Mock server is running on port 4140"
echo "Frontend will be available at http://localhost:3000"
echo ""
echo "The frontend will use mocked API responses from the OpenAPI spec"
echo "No real backend service is required!"
echo ""
echo "=========================================="

cd frontend

# Set the API port for vite config to point to mock server
export VITE_API_PORT=4140

npm start
