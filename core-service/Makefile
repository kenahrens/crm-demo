.PHONY: build run test clean docker-build docker-run docker-test setup-db

# Variables
APP_NAME = core-service
# VERSION can be passed from parent Makefile, or read from root VERSION file
VERSION ?= $(shell cat ../VERSION 2>/dev/null || cat VERSION 2>/dev/null || echo "latest")
DOCKER_IMAGE = ghcr.io/kenahrens/crm-demo/core-service:$(VERSION)
DOCKER_IMAGE_LATEST = ghcr.io/kenahrens/crm-demo/core-service:latest

# Define proxymock environment variables
PROXYMOCK_ENV = http_proxy=socks5h://localhost:4140 \
                https_proxy=socks5h://localhost:4140 \
                SSL_CERT_FILE=~/.speedscale/certs/tls.crt

# Find first recording directory
PROXYMOCK_RECORDING := $(shell find ./proxymock -name "recorded-*" -type d | head -n 1)

STATUS_FILE = proxymock.status

# Build the application
build:
	go build -o $(APP_NAME) ./cmd/main.go

# Run the application
run:
	go run ./cmd/main.go

# Run tests
test:
	go test -v ./...

# Clean build artifacts
clean:
	rm -f $(APP_NAME)

integration-test: build
	@if [ -z "$(PROXYMOCK_RECORDING)" ]; then \
		echo "WARNING: No proxymock recordings found in ./proxymock/recorded-*"; \
		echo "Skipping integration tests - no recordings available"; \
	else \
		$(MAKE) _run-integration-test; \
	fi

_run-integration-test: proxymock-mock
	mkdir -p logs
	@echo "Starting core-service in background with proxymock..."
	$(PROXYMOCK_ENV) ./core-service > logs/core-service.log 2>&1 &
	@echo "Waiting for core-service to start..."
	sleep 10
	@echo "Running integration tests with proxymock..."
	proxymock replay --in $(PROXYMOCK_RECORDING) --fail-if requests.response-pct!=100
	@echo "Cleaning up..."
	-pkill -f "core-service" || true
	-pkill -f "proxymock" || true

proxymock-mock:
	mkdir -p logs
	proxymock mock --in $(PROXYMOCK_RECORDING) > logs/proxymock-mock.log 2>&1 &
	sleep 2
	@echo "Proxymock started successfully."

# Build Docker image
docker-build:
	@echo "Building $(DOCKER_IMAGE) (version: $(VERSION))"
	docker build -t $(DOCKER_IMAGE) .
	@if [ "$(VERSION)" != "latest" ]; then \
		docker tag $(DOCKER_IMAGE) $(DOCKER_IMAGE_LATEST); \
		echo "Also tagged as $(DOCKER_IMAGE_LATEST)"; \
	fi

# Run Docker container
docker-run:
	docker run -p 8080:8080 \
		-e DB_HOST=host.docker.internal \
		-e DB_PORT=5432 \
		-e DB_USER=core \
		-e DB_PASSWORD=core \
		-e DB_NAME=crm \
		$(DOCKER_IMAGE)

# Test Docker container
docker-test: docker-build
	@echo "Testing backend container..."
	@echo "Note: This test requires PostgreSQL to be running and accessible at host.docker.internal:5432"; \
	echo "Cleaning up any existing containers on port 8080..."; \
	docker ps -a --filter "publish=8080" --format "{{.ID}}" 2>/dev/null | xargs -r docker rm -f >/dev/null 2>&1 || true; \
	CONTAINER_ID=$$(docker run -d \
		-e DB_HOST=host.docker.internal \
		-e DB_PORT=5432 \
		-e DB_USER=core \
		-e DB_PASSWORD=core \
		-e DB_NAME=crm \
		-p 8080:8080 \
		$(DOCKER_IMAGE) 2>&1); \
	if [ $$? -ne 0 ] || [ -z "$$CONTAINER_ID" ] || echo "$$CONTAINER_ID" | grep -q "Error"; then \
		echo "❌ Failed to start container: $$CONTAINER_ID"; \
		exit 1; \
	fi; \
	echo "Started container: $$CONTAINER_ID"; \
	echo "Waiting for backend service to start..."; \
	SUCCESS=0; \
	i=1; \
		while [ $$i -le 30 ]; do \
		if ! docker ps --format "{{.ID}}" | grep -q "$${CONTAINER_ID:0:12}"; then \
			echo "❌ Backend container stopped unexpectedly"; \
			docker logs $$CONTAINER_ID 2>&1 || true; \
			docker rm -f $$CONTAINER_ID >/dev/null 2>&1 || true; \
			exit 1; \
		fi; \
		HTTP_CODE=$$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/v1/api/health 2>/dev/null || echo "000"); \
		if [ "$$HTTP_CODE" = "200" ]; then \
			echo "✅ Backend container is healthy (HTTP $$HTTP_CODE)"; \
			curl -s http://localhost:8080/v1/api/health 2>/dev/null | (jq . 2>/dev/null || cat) || true; \
			SUCCESS=1; \
			break; \
		else \
			echo "Waiting for health endpoint... (attempt $$i/30, HTTP $$HTTP_CODE)"; \
			sleep 2; \
		fi; \
		i=$$((i + 1)); \
	done; \
	docker stop $$CONTAINER_ID >/dev/null 2>&1; \
	sleep 1; \
	docker rm $$CONTAINER_ID >/dev/null 2>&1 || docker rm -f $$CONTAINER_ID >/dev/null 2>&1 || true; \
	if [ "$$SUCCESS" -ne 1 ]; then \
		echo "❌ Health check failed - container did not become healthy within timeout"; \
		exit 1; \
	fi

# Create PostgreSQL database for local development
create-db:
	createdb -U postgres crm || true
	psql -U postgres -d crm -c "CREATE USER core WITH PASSWORD 'core' SUPERUSER;" || true
	psql -U postgres -d crm -c "GRANT ALL PRIVILEGES ON DATABASE crm TO core;" || true
	psql -U postgres -d crm -c "GRANT USAGE, CREATE ON SCHEMA public TO core;" || true
	psql -U postgres -d crm -c "ALTER USER core WITH SUPERUSER;" || true

# Setup database and run migrations in one command
setup-db: create-db migrate-up

# Run database migrations
migrate-up:
	go run cmd/migration/main.go up

# Rollback database migrations
migrate-down:
	go run cmd/migration/main.go down

# Default target
all: build 