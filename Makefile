.PHONY: help version bump-version docker-build docker-build-all

# Read version from VERSION file
VERSION := $(shell cat VERSION 2>/dev/null || echo "0.0.0")
VERSION_FILE := VERSION

# Docker image names
CORE_SERVICE_IMAGE := ghcr.io/kenahrens/crm-demo/core-service
FRONTEND_IMAGE := ghcr.io/kenahrens/crm-demo/frontend

help: ## Display this help message
	@echo "CRM Demo - Version Management"
	@echo "Current version: $(VERSION)"
	@echo ""
	@echo "Usage:"
	@echo "  make <target>"
	@echo ""
	@echo "Targets:"
	@awk 'BEGIN {FS = ":.*##"; printf "\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

version: ## Display current version
	@echo "$(VERSION)"

bump-version: ## Bump version (usage: make bump-version TYPE=major|minor|patch)
	@if [ -z "$(TYPE)" ]; then \
		echo "Error: TYPE is required. Usage: make bump-version TYPE=major|minor|patch"; \
		exit 1; \
	fi
	@if [ "$(TYPE)" != "major" ] && [ "$(TYPE)" != "minor" ] && [ "$(TYPE)" != "patch" ]; then \
		echo "Error: TYPE must be one of: major, minor, patch"; \
		exit 1; \
	fi
	@current=$$(cat $(VERSION_FILE)); \
	major=$$(echo $$current | cut -d. -f1); \
	minor=$$(echo $$current | cut -d. -f2); \
	patch=$$(echo $$current | cut -d. -f3); \
	if [ "$(TYPE)" = "major" ]; then \
		new_version="$$((major + 1)).0.0"; \
	elif [ "$(TYPE)" = "minor" ]; then \
		new_version="$$major.$$((minor + 1)).0"; \
	else \
		new_version="$$major.$$minor.$$((patch + 1))"; \
	fi; \
	echo "$$new_version" > $(VERSION_FILE); \
	echo "Version bumped from $$current to $$new_version"; \
	echo "Updating k8s manifests..."; \
	sed -i.bak "s|$(CORE_SERVICE_IMAGE):[^ ]*|$(CORE_SERVICE_IMAGE):$$new_version|g" k8s/base/core-service.yaml && rm k8s/base/core-service.yaml.bak; \
	sed -i.bak "s|$(FRONTEND_IMAGE):[^ ]*|$(FRONTEND_IMAGE):$$new_version|g" k8s/base/frontend.yaml && rm k8s/base/frontend.yaml.bak; \
	git add $(VERSION_FILE) k8s/base/core-service.yaml k8s/base/frontend.yaml; \
	git commit -m "Bump version to $$new_version"; \
	echo "✅ Version bump complete!"; \
	echo "   - VERSION file updated to $$new_version"; \
	echo "   - k8s manifests updated"; \
	echo "   - Git commit created"; \
	echo ""; \
	echo "Next step:"; \
	echo "   git push origin main"; \
	echo ""; \
	echo "CI will automatically build and tag Docker images with version $$new_version"

docker-build: ## Build all Docker images with version tags
	@echo "Building Docker images with version $(VERSION)..."
	@$(MAKE) -C core-service docker-build VERSION=$(VERSION)
	@$(MAKE) -C frontend docker-build VERSION=$(VERSION)
	@echo "Tagging images with 'latest' tag..."
	@docker tag $(CORE_SERVICE_IMAGE):$(VERSION) $(CORE_SERVICE_IMAGE):latest
	@docker tag $(FRONTEND_IMAGE):$(VERSION) $(FRONTEND_IMAGE):latest
	@echo "Build complete. Images tagged as:"
	@echo "  $(CORE_SERVICE_IMAGE):$(VERSION)"
	@echo "  $(CORE_SERVICE_IMAGE):latest"
	@echo "  $(FRONTEND_IMAGE):$(VERSION)"
	@echo "  $(FRONTEND_IMAGE):latest"

docker-build-core: ## Build core-service Docker image
	@$(MAKE) -C core-service docker-build VERSION=$(VERSION)

docker-build-frontend: ## Build frontend Docker image
	@$(MAKE) -C frontend docker-build VERSION=$(VERSION)

.DEFAULT_GOAL := help

