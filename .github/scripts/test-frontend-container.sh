#!/bin/bash
set -e

# Test Frontend Container Script
# Tests that the frontend container starts and serves content

CONTAINER_TAG="${1:-${FRONTEND_IMAGE}:test}"

echo "Testing frontend container: $CONTAINER_TAG"

# Start container in background
CONTAINER_ID=$(docker run -d -p 8081:80 "$CONTAINER_TAG")

if [ -z "$CONTAINER_ID" ] || echo "$CONTAINER_ID" | grep -q "Error"; then
  echo "❌ Failed to start container: $CONTAINER_ID"
  exit 1
fi

echo "Started container: $CONTAINER_ID"

# Wait for container to start
echo "Waiting for container to start..."
sleep 5

# Check if container is running (using short ID for better matching)
if docker ps --format "{{.ID}}" | grep -q "^${CONTAINER_ID:0:12}"; then
  echo "✅ Frontend container started successfully"
  # Test if nginx is serving content
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8081 2>/dev/null || echo "000")
  if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "304" ]; then
    echo "✅ Frontend container is serving content (HTTP $HTTP_CODE)"
  else
    echo "⚠️ Frontend container running but HTTP status is $HTTP_CODE"
    docker logs $CONTAINER_ID 2>&1 || true
    docker stop $CONTAINER_ID || true
    docker rm $CONTAINER_ID || true
    exit 1
  fi
else
  echo "❌ Frontend container failed to start or exited"
  CONTAINER_STATUS=$(docker ps -a --filter "id=$CONTAINER_ID" --format "{{.Status}}" 2>/dev/null || echo "unknown")
  echo "Container status: $CONTAINER_STATUS"
  echo "Container logs:"
  docker logs $CONTAINER_ID 2>&1 || true
  docker rm $CONTAINER_ID || true
  exit 1
fi

# Cleanup
docker stop $CONTAINER_ID || true
sleep 1
docker rm $CONTAINER_ID || true

echo "✅ Frontend container test passed"
