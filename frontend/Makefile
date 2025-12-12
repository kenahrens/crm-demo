SHELL := /bin/bash

.PHONY: help install start build test lint

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

clean: ## Clean build artifacts
	rm -rf build node_modules

.DEFAULT_GOAL := help 