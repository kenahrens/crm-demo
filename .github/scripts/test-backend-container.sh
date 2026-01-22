#!/bin/bash
set -e

# Test Backend Container Script
# Tests that the backend container starts and responds to health checks

CONTAINER_TAG="${1:-${BACKEND_IMAGE}:test}"

echo "Testing backend container: $CONTAINER_TAG"

# Start container in background with database connection
CONTAINER_ID=$(docker run -d \
  -e DB_HOST=host.docker.internal \
  -e DB_PORT=5432 \
  -e DB_USER=core \
  -e DB_PASSWORD=core \
  -e DB_NAME=crm \
  --add-host=host.docker.internal:host-gateway \
  -p 8080:8080 \
  "$CONTAINER_TAG")

echo "Started container: $CONTAINER_ID"

# Give container time to initialize (migrations can take a moment)
echo "Waiting for container to initialize (migrations may take time)..."
sleep 5

# Check if container is still running after initial wait
if ! docker ps --format "{{.ID}}" | grep -q "^${CONTAINER_ID:0:12}"; then
  echo "❌ Container stopped during initialization"
  echo "Container logs:"
  docker logs $CONTAINER_ID 2>&1 || true
  docker rm $CONTAINER_ID || true
  exit 1
fi

# Wait for container to start and be ready
echo "Waiting for backend service to start..."
SUCCESS=0
i=1
while [ $i -le 30 ]; do
  # Check if container is still running (using short ID for better matching)
  if docker ps --format "{{.ID}}" | grep -q "^${CONTAINER_ID:0:12}"; then
    # Check if health endpoint responds
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/v1/api/health 2>/dev/null || echo "000")
    if [ "$HTTP_CODE" = "200" ]; then
      echo "✅ Backend container is healthy (HTTP $HTTP_CODE)"
      curl -s http://localhost:8080/v1/api/health | jq . || curl -s http://localhost:8080/v1/api/health
      SUCCESS=1
      break
    else
      echo "Waiting for health endpoint... (attempt $i/30, HTTP $HTTP_CODE)"
      sleep 2
    fi
  else
    # Container stopped - check if it exited with error
    CONTAINER_STATUS=$(docker ps -a --filter "id=$CONTAINER_ID" --format "{{.Status}}" 2>/dev/null || echo "unknown")
    echo "❌ Backend container stopped unexpectedly"
    echo "Container status: $CONTAINER_STATUS"
    echo "Container logs:"
    docker logs $CONTAINER_ID 2>&1 || true
    exit 1
  fi
  i=$((i + 1))
done

# Final check
if [ "$SUCCESS" -ne 1 ]; then
  echo "❌ Health check failed - container did not become healthy within timeout"
  echo "Container logs:"
  docker logs $CONTAINER_ID 2>&1 || true
  docker stop $CONTAINER_ID || true
  docker rm $CONTAINER_ID || true
  exit 1
fi

# Cleanup
docker stop $CONTAINER_ID || true
sleep 1
docker rm $CONTAINER_ID || true

echo "✅ Backend container test passed"
