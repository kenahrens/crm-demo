.PHONY: build run test clean docker-build docker-run setup-db

# Variables
APP_NAME = core-service
DOCKER_IMAGE = ghcr.io/kenahrens/crm-demo/core-service:latest

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

integration-test: build proxymock-mock
	mkdir -p logs
	@echo "Starting core-service in background with proxymock..."
	$(PROXYMOCK_ENV) ./core-service > logs/core-service.log 2>&1 &
	@echo "Waiting for core-service to start..."
	sleep 2
	@echo "Running integration tests with proxymock..."
	- proxymock replay --in $(PROXYMOCK_RECORDING) --fail-if requests.response-pct!=100 > logs/proxymock-replay.log 2>&1; echo $$? > $(STATUS_FILE)
	cat logs/proxymock-mock.log
	cat logs/core-service.log
	cat logs/proxymock-replay.log
	@echo "Cleaning up..."
	-pkill -f "core-service" || true
	-pkill -f "proxymock" || true
	@echo "-------------------------------------"
	@{ \
	    status=$$(cat $(STATUS_FILE)); \
	    echo "Command exited with status: $$status"; \
	    if [ "$$status" -ne 0 ]; then \
	        echo "Error: The command failed. See log above."; \
	        exit $$status; \
	    fi \
	}

proxymock-mock:
	mkdir -p logs
	nohup proxymock mock --in $(PROXYMOCK_RECORDING) > logs/proxymock-mock.log 2>&1 & \
	sleep 2
	@echo "Proxymock started successfully."

# Build Docker image
docker-build:
	docker build -t $(DOCKER_IMAGE) .

# Run Docker container
docker-run:
	docker run -p 8080:8080 \
		-e DB_HOST=host.docker.internal \
		-e DB_PORT=5432 \
		-e DB_USER=core \
		-e DB_PASSWORD=core \
		-e DB_NAME=crm \
		$(DOCKER_IMAGE)

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