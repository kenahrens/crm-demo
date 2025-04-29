# Architecture

## Core Service

The Core Service is the main backend service for the CRM application, responsible for handling all CRUD operations for the main entities (Accounts, Contacts, Opportunities, Notes).

### Directory Structure

```
core-service/
├── cmd/
│   ├── main.go                 # Application entry point
│   └── migration/              # Migration utility
│       └── main.go             # Migration command-line tool
├── db/
│   └── migrations/             # Database migration files
│       ├── 000001_create_initial_tables.up.sql
│       └── 000001_create_initial_tables.down.sql
├── api/
│   └── openapi/                # OpenAPI specifications
│       ├── v1.yaml             # API specification for v1 endpoints
│       └── generated/          # Generated client code (if applicable)
├── pkg/
│   ├── db/                     # Database layer
│   │   ├── db.go               # Database connection
│   │   ├── account_repository.go
│   │   ├── contact_repository.go
│   │   ├── opportunity_repository.go
│   │   └── note_repository.go
│   ├── handlers/               # API handlers
│   │   ├── account_handler.go
│   │   ├── contact_handler.go
│   │   ├── opportunity_handler.go
│   │   └── note_handler.go
│   └── models/                 # Data models
│       ├── account.go
│       ├── contact.go
│       ├── opportunity.go
│       └── note.go
├── proxymock/                  # API testing
│   ├── config.json             # Proxymock configuration
│   ├── data/                   # Test data
│   │   └── users.sql
│   └── tests/                  # API tests
│       ├── account_test.json
│       └── health_test.json
├── Dockerfile                  # Container definition
├── Makefile                    # Build and dev commands
└── go.mod                      # Go module definition
```

### Components

1. **Database Layer (`pkg/db/`)**: 
   - Database connection management
   - Repository pattern implementations for all entities
   - SQL query execution and result mapping

2. **Models (`pkg/models/`)**: 
   - Data structure definitions
   - Request/Response objects
   - Validation rules

3. **Handlers (`pkg/handlers/`)**: 
   - REST API endpoints 
   - Request validation
   - Response formatting
   - Error handling

4. **Main Application (`cmd/main.go`)**: 
   - Application configuration
   - Dependency injection
   - Router setup
   - Middleware configuration

5. **Migrations (`db/migrations/`)**: 
   - Database schema definitions
   - Schema versioning

6. **OpenAPI Specifications (`api/openapi/`)**: 
   - API documentation using OpenAPI 3.0 standard
   - Contract-first API design approach
   - Version-controlled API specifications
   - Source for generated API client libraries

### API Endpoints

The API is versioned with all endpoints prefixed with `/v1/api/`.

#### Accounts
- `GET /v1/api/accounts` - List all accounts
- `POST /v1/api/accounts` - Create a new account
- `GET /v1/api/accounts/:id` - Get account by ID
- `PUT /v1/api/accounts/:id` - Update an account
- `DELETE /v1/api/accounts/:id` - Delete an account

#### Contacts
- `GET /v1/api/contacts` - List all contacts
- `POST /v1/api/contacts` - Create a new contact
- `GET /v1/api/contacts/:id` - Get contact by ID
- `PUT /v1/api/contacts/:id` - Update a contact
- `DELETE /v1/api/contacts/:id` - Delete a contact
- `GET /v1/api/contacts/account/:id` - Get contacts by account ID

#### Opportunities
- `GET /v1/api/opportunities` - List all opportunities
- `POST /v1/api/opportunities` - Create a new opportunity
- `GET /v1/api/opportunities/:id` - Get opportunity by ID
- `PUT /v1/api/opportunities/:id` - Update an opportunity
- `DELETE /v1/api/opportunities/:id` - Delete an opportunity
- `GET /v1/api/opportunities/account/:id` - Get opportunities by account ID

#### Notes
- `GET /v1/api/notes` - List all notes
- `POST /v1/api/notes` - Create a new note
- `GET /v1/api/notes/:id` - Get note by ID
- `PUT /v1/api/notes/:id` - Update a note
- `DELETE /v1/api/notes/:id` - Delete a note
- `GET /v1/api/notes/record/:type/:id` - Get notes by record ID and type
- `POST /v1/api/notes/associations` - Create note association
- `DELETE /v1/api/notes/associations` - Delete note association

### Deployment

The Core Service is containerized using Docker and deployed to Kubernetes using the following components:

1. **ConfigMap**: Configuration for database connection, port, and environment
2. **Secret**: Sensitive information like database password
3. **Deployment**: Pod specification with health checks and resource limits
4. **Service**: Internal service endpoint 
5. **Ingress**: External access point with path-based routing