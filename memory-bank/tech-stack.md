# Technical Stack and Architecture: CRM Application

## 1. Introduction

This document details the technical architecture and chosen technology stack for the CRM application. The design emphasizes a microservices approach for scalability, resilience, and maintainability, orchestrated by Kubernetes.

## 2. Architecture

The application will follow a microservices architecture deployed on Kubernetes.

* **Frontend:** Single Page Application (SPA).
* **Backend:**
    * **Ingress:** Manages external access to the backend services.
    * **Core Service (Go):** Handles the primary CRUD operations and business logic for Contacts, Accounts, Opportunities, and Notes. This will be the main API gateway for the frontend (or accessed via the Ingress).
    * **AI Service (Python):** Dedicated service for potential future AI features (e.g., data enrichment, lead scoring, sentiment analysis on notes). Initial scope may be limited or this service might be a placeholder.
    * **Reporting Service (Java):** Handles the generation and retrieval of reports based on data from the core service/database.
* **Database (PostgreSQL):** Relational database to store all CRM data.
* **Containers:** Each backend service should include a Dockerfile so it can be built as a container.

## 3. Technology Stack

* **Frontend:** React, JavaScript/TypeScript, HTML, CSS.
* **Backend:**
    * Core Service: Go, RESTful API framework (to be selected).
    * AI Service: Python, relevant AI/ML libraries (e.g., TensorFlow, PyTorch, scikit-learn - *as needed for future features*), RESTful API framework (e.g., Flask, FastAPI - to be selected).
    * Reporting Service: Java, Spring Boot or similar framework (to be selected), SQL query capabilities.
* **Database:** PostgreSQL.
* **Orchestration:** Kubernetes.
* **API Communication:** 
    * RESTful APIs between frontend and backend services, and REST between backend services.
    * All APIs must be documented using OpenAPI 3.0 specifications.
    * OpenAPI specs should be placed in a consistent location (`/api/openapi`) within each service directory.
    * API specifications should be completed before implementation and treated as a contract.
    * API client libraries should be generated from OpenAPI specifications when appropriate.
* **Modularity:** Make the code modular with small files, do not use a single giant file. Make each service modular in their own directory. Make the infrastructure modular in it's own directory.
* **Makefile:** Use a Makefile at the root of each project for how to build code, build container, run tests, and run the code locally.
* **Registry:** Use the GitHub container registry.
* **CI/CD:** Use GitHub Actions.

## 4. Testing

There will be 3 layers to the testing:

* **Unit Tests**: These will be run for each service and local to their own code with the language specific
* **Browser Tests**: For the frontend specifically, browser tests will be run using cypress
* **Integration Tests**: Each service should be testable independently using proxymock replay to test the inbound calls, and proxymock mock to mock out the backend dependencies. No unit testing tests or unit testing mocks will be used. Examples can be recorded using proxymock record.
* **Load Tests**: Each service should be load testable independently using the same integration tests.

## 5. Data Model (Conceptual)

```mermaid
erDiagram
    ACCOUNTS {
        VARCHAR id PK
        VARCHAR name
        VARCHAR industry
        VARCHAR website
        VARCHAR phone
        VARCHAR address
        VARCHAR city
        VARCHAR state
        VARCHAR zip
        VARCHAR country
    }

    CONTACTS {
        VARCHAR id PK
        VARCHAR first_name
        VARCHAR last_name
        VARCHAR email
        VARCHAR phone
        VARCHAR title
        VARCHAR account_id FK
        VARCHAR address
        VARCHAR city
        VARCHAR state
        VARCHAR zip
        VARCHAR country
    }

    OPPORTUNITIES {
        VARCHAR id PK
        VARCHAR opportunity_name
        VARCHAR account_id FK
        VARCHAR primary_contact_id FK
        VARCHAR stage
        DECIMAL amount
        DATE close_date
        DECIMAL probability
    }

    NOTES {
        VARCHAR id PK
        TEXT content
        VARCHAR created_by FK
        TIMESTAMP created_at
    }

    NOTE_ASSOCIATIONS {
        VARCHAR note_id FK
        VARCHAR record_id PK "Can be account_id, contact_id, or opportunity_id"
        VARCHAR record_type PK "e.g., 'account', 'contact', 'opportunity'"
    }

    USERS {
        VARCHAR id PK
        VARCHAR username
        VARCHAR password_hash
        VARCHAR role
    }

    ACCOUNTS ||--o{ CONTACTS : "has"
    ACCOUNTS ||--o{ OPPORTUNITIES : "has"
    OPPORTUNITIES }o--|| CONTACTS : "primary contact"
    NOTES }o--|| NOTE_ASSOCIATIONS : "associated with"
    NOTE_ASSOCIATIONS }o--|| ACCOUNTS : "references"
    NOTE_ASSOCIATIONS }o--|| CONTACTS : "references"
    NOTE_ASSOCIATIONS }o--|| OPPORTUNITIES : "references"
    USERS ||--o{ NOTES : "created"