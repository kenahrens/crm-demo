.PHONY: build run test clean docker-build docker-run setup-db

# Variables
APP_NAME = core-service
DOCKER_IMAGE = ghcr.io/kenahrens/crm-demo/core-service:latest

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