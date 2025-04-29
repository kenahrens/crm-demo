SHELL := /bin/bash

.PHONY: help install start build test lint

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
	docker build -t ghcr.io/kenahrens/crm-demo/frontend:latest .

docker-push: ## Push Docker image to GitHub Container Registry
	docker push ghcr.io/kenahrens/crm-demo/frontend:latest

clean: ## Clean build artifacts
	rm -rf build node_modules

.DEFAULT_GOAL := help 