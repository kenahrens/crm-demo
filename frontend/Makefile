SHELL := /bin/bash

.PHONY: help install start build test lint docker-test

# VERSION can be passed from parent Makefile, or read from root VERSION file
VERSION ?= $(shell cat ../VERSION 2>/dev/null || cat VERSION 2>/dev/null || echo "latest")
DOCKER_IMAGE = ghcr.io/kenahrens/crm-demo/frontend:$(VERSION)
DOCKER_IMAGE_LATEST = ghcr.io/kenahrens/crm-demo/frontend:latest

help: ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

install: ## Install dependencies
	npm install

start: ## Start development server
	npm start

build: ## Build production bundle
	npm run build

test: ## Run tests
	npm test

lint: ## Run linting
	npm run lint

docker-build: ## Build Docker image
	@echo "Building $(DOCKER_IMAGE) (version: $(VERSION))"
	docker build -t $(DOCKER_IMAGE) .
	@if [ "$(VERSION)" != "latest" ]; then \
		docker tag $(DOCKER_IMAGE) $(DOCKER_IMAGE_LATEST); \
		echo "Also tagged as $(DOCKER_IMAGE_LATEST)"; \
	fi

docker-push: ## Push Docker image to GitHub Container Registry
	docker push $(DOCKER_IMAGE)
	@if [ "$(VERSION)" != "latest" ]; then \
		docker push $(DOCKER_IMAGE_LATEST); \
	fi

docker-test: docker-build ## Test Docker container
	@echo "Testing frontend container..."
	@echo "Cleaning up any existing containers on port 8081..."; \
	docker ps -a --filter "publish=8081" --format "{{.ID}}" 2>/dev/null | xargs -r docker rm -f >/dev/null 2>&1 || true; \
	CONTAINER_ID=$$(docker run -d -p 8081:80 $(DOCKER_IMAGE) 2>&1); \
	if [ $$? -ne 0 ] || [ -z "$$CONTAINER_ID" ] || echo "$$CONTAINER_ID" | grep -q "Error"; then \
		echo "❌ Failed to start container: $$CONTAINER_ID"; \
		exit 1; \
	fi; \
	echo "Started container: $$CONTAINER_ID"; \
	echo "Waiting for container to start..."; \
	sleep 5; \
	if ! docker ps --format "{{.ID}}" | grep -q "$${CONTAINER_ID:0:12}"; then \
		echo "❌ Frontend container failed to start or exited"; \
		docker logs $$CONTAINER_ID 2>&1 || true; \
		docker rm -f $$CONTAINER_ID >/dev/null 2>&1 || true; \
		exit 1; \
	fi; \
	echo "✅ Frontend container started successfully"; \
	HTTP_CODE=$$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8081 2>/dev/null || echo "000"); \
	docker stop $$CONTAINER_ID >/dev/null 2>&1; \
	sleep 1; \
	docker rm $$CONTAINER_ID >/dev/null 2>&1 || docker rm -f $$CONTAINER_ID >/dev/null 2>&1 || true; \
	if [ "$$HTTP_CODE" = "200" ] || [ "$$HTTP_CODE" = "304" ]; then \
		echo "✅ Frontend container is serving content (HTTP $$HTTP_CODE)"; \
		exit 0; \
	else \
		echo "⚠️ Frontend container running but HTTP status is $$HTTP_CODE"; \
		exit 1; \
	fi

clean: ## Clean build artifacts
	rm -rf build node_modules

.DEFAULT_GOAL := help 