# Implementation Plan: CRM Application

## 1. Introduction

This document outlines a potential plan for the implementation of the CRM application. It covers suggested phases, initial steps, and key considerations for building and deploying the application based on the defined product design and technical stack.

## 2. Phases (Suggested)

The implementation can be broken down into several phases, allowing for incremental development and delivery.

* **Phase 1: Foundation & Core Objects (MVP)**
    * **Objective:** Establish the basic infrastructure and implement the core CRM object management (CRUD).
    * Provision and configure the PostgreSQL database.
    * Develop the Core Service (Go/Gin) with basic API endpoints for creating, reading, updating, and deleting Contacts, Accounts, Opportunities, and Notes.
    * Implement the basic data model in the database using golang-migrate.
    * Establish basic CI/CD pipelines for the Core Service. Make sure it references the Makefile.
* **Phase 2: Initial frontend**
    * **Objective:** Connect the frontend to the core service.
    * Develop the initial Frontend (React) components and pages to interact with the Core Service APIs for managing these core objects.
    * Implement basic relationships (e.g., associating a Contact with an Account) within the Core Service and Frontend.
    * Establish basic CI/CD pipelines for the Frontend. Make sure it references the Makefile.
* **Phase 3: Relationships & Notes Enhancement**
    * **Objective:** Refine data relationships and fully implement the Notes functionality.
    * Refine and optimize data relationships within the Core Service and database schema.
    * Implement the many-to-many association logic for Notes, allowing notes to be linked to multiple record types.
    * Enhance the Frontend to provide a seamless user experience for adding, viewing, and managing notes on Contact, Account, and Opportunity detail pages.
    * Implement basic user association for notes ("Created By").
* **Phase 4: Reporting Service Integration**
    * **Objective:** Develop and integrate the initial reporting capabilities.
    * Develop the Reporting Service (Java/Spring Boot) to query the PostgreSQL database.
    * Implement the initial set of required reports (e.g., count of records, opportunities by stage, opportunities by close date).
    * Define and implement APIs for the Reporting Service.
    * Integrate the Reporting Service APIs into the Frontend to display reports.
    * Set up Ingress for the Reporting Service if it's a separate endpoint, or route through the Core Service.
* **Phase 5: Testing**
    * **Objective:** Ensure each service has tests in accordance with the tech-stack.
    * Create unit tests for each backend service
    * Create test coverage report for each backend service
    * Create browser tests for the frontend
    * Create test converage report for the frontend
    * Create integration tests using proxymock for each service (we will build this together)
    * Create load tests uding proxymock for each service (we will build this together)
    * Write clear SLA results for each service: Latency, Throughput, Error Rate
* **Phase 6: Infrastructure**
    * Set up base Kubernetes cluster infrastructure (development environment).
    * Set up Ingress for external access to the Core Service in the development environment.
* **Phase 7: AI Service (Placeholder/Initial)**
    * **Objective:** Establish the AI service infrastructure and potentially implement a very basic function or leave as a placeholder.
    * Set up the basic infrastructure for the AI Service (Python/Flask).
    * Define a minimal, achievable AI use case for this phase (e.g., simple data validation or a basic scoring mechanism) or configure it as a service ready for future development.
    * Implement basic communication between the Core Service and the AI Service if an initial use case is defined.
* **Phase 8: Refinement, Security & Deployment**
    * **Objective:** Implement cross-cutting concerns, enhance the application, and prepare for production deployment.
    * Implement JWT-based authentication and basic authorization mechanisms.
    * Enhance error handling and validation across all services and the frontend.
    * Implement comprehensive logging and monitoring solutions.
    * Conduct thorough testing (unit, integration, end-to-end).
    * Address key security considerations identified.
    * Finalize CI/CD pipelines for all services and the frontend, including deployment to a staging/production-like environment.
    * Prepare deployment manifests for Kubernetes (production).

## 3. Initial Steps

Before starting Phase 1, the following steps should be completed:

* Finalize detailed API specifications for the Core Service, outlining endpoints, request/response formats, and data structures.
  * All APIs must be documented using OpenAPI 3.0 specifications
  * OpenAPI specs should be placed in a consistent location (`/api/openapi`) within each service directory
  * The specifications must be completed before implementation begins and should be treated as a contract
  * Generate API client libraries from the OpenAPI specifications when appropriate
* Set up standardized development environments and tools for Go, Python, and Java development.
* Establish the initial structure for CI/CD pipelines using GitHub Actions.
* Create the initial database schema design and prepare migration scripts:
    * Go Core Service: golang-migrate
    * Java Reporting Service: Flyway
* Provision and configure a development Kubernetes cluster and associated tools (kubectl, Helm, etc.).
* Set up local development environment with nginx for routing.

## 4. Key Considerations During Implementation

* **Service Communication Strategy:** All services will communicate via REST APIs. The frontend will make REST calls to the ingress, which will route to the appropriate backend service based on the route.
* **Configuration Management:** 
    * Use environment variables for standard configuration
    * Configuration will be fed through Kubernetes ConfigMaps at runtime
    * Use .envrc files for local development
* **Logging and Monitoring:** 
    * Go Core Service: Use Gin's built-in logging middleware
    * Java Reporting Service: Use Log4j
    * All services should write logs to STDOUT in JSON format with:
        * timestamp
        * level (INFO, WARN, DEBUG, ERROR)
        * service name
        * environment (local, dev, stage, prod)
        * message
* **Testing Strategy:** 
    * Go: Standard Go testing package
    * Python: pytest
    * Java: JUnit 5 with Mockito
    * Minimum test coverage: 50%
    * Database tests and test data will be performed with proxymock
* **API Versioning:** Use version numbers at the front of the API path (e.g., `/v1/api/...`)
* **Database Migrations:** 
    * Store migrations in a dedicated migrations directory
    * Use golang-migrate for Go services
    * Use Flyway for Java services
    * Use UUID for primary keys
* **Error Handling:** Use nginx-style error response format across all services
* **Security:** 
    * Implement JWT-based authentication across all services
    * JWT tokens expire in 1 hour
* **Release Strategy:** Use Kubernetes for zero-downtime deployments
* **Performance Requirements:**
    * Service SLA: 100ms response time
    * Expected concurrent users: 10
* **Frontend Architecture:**
    * Use Redux for state management
    * Use OpenAPI 3 for API documentation
* **Local Development:**
    * Use local PostgreSQL installation
    * Each service runs on a different port
    * No service discovery in local development
    * Kubernetes service discovery uses east/west networking with local service names
* **CI/CD Pipeline:**
    * GitHub Actions workflows for:
        * Checkout code
        * Build code
        * Run unit tests
        * Run integration tests (if any)
        * Build container
        * Push container

## 5. Open Questions / To Be Determined

* Specific cloud provider for Kubernetes and managed database services.
* Detailed scope and timeline for the AI Service features beyond the initial placeholder.
* Strategy for database high availability, backup, and disaster recovery.
* Detailed plan for scaling individual services based on load.