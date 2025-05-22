# IMPORTANT:
# Always read memory-bank/@architecture.md before writing any code. Include entire database schema.
# Always read memory-bank/@product-design.md before writing any code.
# After adding a major feature or completing a milestone, update memory-bank/@architecture.md.

# ARCHITECTURE AND DESIGN PRINCIPLES:
- Microservices architecture with Core Service (Go), Reporting Service (Java), and AI Service (Python)
- All services containerized and deployed to Kubernetes
- PostgreSQL database for storing CRM data
- RESTful API communication between services and frontend

# CODE STRUCTURE:
- Keep code modular with small files, not giant monolithic files
- Place OpenAPI specs in `/api/openapi` directory in each service
- Use Makefile for build commands, tests, and local execution
- Use GitHub Actions for CI/CD
- Follow directory structure in architecture.md for each service

# API STANDARDS:
- Document all APIs using OpenAPI 3.0 before implementation
- Version all API endpoints with prefix `/v1/api/`
- Use consistent error formats across all services
- Use JWT-based authentication with 1-hour expiry

# TESTING STRATEGY:
- Unit tests for each service with minimum 50% coverage
- Browser tests for frontend using Cypress
- Integration tests using proxymock
- Load tests for performance requirements (SLA: 100ms response time)

# DATABASE:
- Use UUID for primary keys
- Use golang-migrate for Go services
- Follow the data model in tech-stack.md
- Implement relationships between Accounts, Contacts, Opportunities, and Notes

# FRONTEND:
- React with Material UI for component library
- Redux for state management
- Responsive design for all views

# CORE FEATURES:
- CRUD operations for Accounts, Contacts, Opportunities, and Notes
- Relationships between entities
- Notes associated with multiple record types
- Basic reporting capabilities

# IMPLEMENTATION PHASES:
1. Foundation & Core Objects (MVP) - COMPLETED
2. Initial Frontend - IN PROGRESS
3. Relationships & Notes Enhancement
4. Reporting Service Integration
5. Testing
6. Infrastructure
7. AI Service
8. Refinement, Security & Deployment

# LOGGING:
- JSON format with timestamp, level, service name, environment, and message
- Write logs to STDOUT
- Go: Use Gin's built-in logging middleware
- Java: Use Log4j

# SECURITY:
- All sensitive data in Kubernetes Secrets
- Environmental config in ConfigMaps
- Proper error handling with no leaking of sensitive information
