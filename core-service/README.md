# CRM Core Service

A RESTful API service for managing customer relationships, built with Go, Gin framework, and PostgreSQL.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Default Credentials](#default-credentials)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Database](#database)
- [Authentication](#authentication)
- [Testing](#testing)
- [Configuration](#configuration)

## Features

- User authentication with JWT tokens
- Account management
- Contact management
- Opportunity tracking
- Notes and associations
- Role-based access control (Admin/User)
- PostgreSQL database with migrations
- Docker support

## Prerequisites

- Go 1.23 or higher
- PostgreSQL 13 or higher
- Docker and Docker Compose (optional)
- Make (optional, but recommended)

## Quick Start

### Using Docker Compose (Recommended)

1. Start the services:
```bash
make docker-up
```

2. The API will be available at `http://localhost:8080`

3. Login with default credentials (see below)

### Local Development

1. Start PostgreSQL:
```bash
docker-compose up -d postgres
```

2. Run database migrations:
```bash
make migrate-up
```

3. Start the service:
```bash
make run
```

The API will be available at `http://localhost:8080`

## Default Credentials

The service automatically creates a default admin user during database migration:

- **Email**: `admin@example.com`
- **Password**: `password`
- **Role**: `admin`

**IMPORTANT**: Change these credentials in production!

### Getting Started

1. Login to get a JWT token:
```bash
curl -X POST http://localhost:8080/v1/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password"
  }'
```

2. Use the returned token in the Authorization header for subsequent requests:
```bash
curl http://localhost:8080/v1/api/accounts \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## API Documentation

### Base URL

- Local: `http://localhost:8080/v1/api`
- Health Check: `http://localhost:8080/v1/api/health`

### Authentication

All endpoints except `/auth/login` and `/health` require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

JWT tokens expire after 24 hours.

### Endpoints

#### Authentication
- `POST /v1/api/auth/login` - Login and receive JWT token

#### Users
- `GET /v1/api/users` - List all users (requires auth)
- `POST /v1/api/users` - Create a new user (requires auth)
- `GET /v1/api/users/:id` - Get user by ID (requires auth)

#### Accounts
- `GET /v1/api/accounts` - List all accounts
- `POST /v1/api/accounts` - Create new account
- `GET /v1/api/accounts/:id` - Get account by ID
- `PUT /v1/api/accounts/:id` - Update account
- `DELETE /v1/api/accounts/:id` - Delete account

#### Contacts
- `GET /v1/api/contacts` - List all contacts
- `POST /v1/api/contacts` - Create new contact
- `GET /v1/api/contacts/:id` - Get contact by ID
- `PUT /v1/api/contacts/:id` - Update contact
- `DELETE /v1/api/contacts/:id` - Delete contact
- `GET /v1/api/contacts/account/:accountId` - Get contacts by account

#### Opportunities
- `GET /v1/api/opportunities` - List all opportunities
- `POST /v1/api/opportunities` - Create new opportunity
- `GET /v1/api/opportunities/:id` - Get opportunity by ID
- `PUT /v1/api/opportunities/:id` - Update opportunity
- `DELETE /v1/api/opportunities/:id` - Delete opportunity
- `GET /v1/api/opportunities/account/:accountId` - Get opportunities by account

#### Notes
- `GET /v1/api/notes` - List all notes
- `POST /v1/api/notes` - Create new note
- `GET /v1/api/notes/:id` - Get note by ID
- `PUT /v1/api/notes/:id` - Update note
- `DELETE /v1/api/notes/:id` - Delete note
- `GET /v1/api/notes/record/:recordType/:recordId` - Get notes by record
- `POST /v1/api/notes/associations` - Create note association
- `DELETE /v1/api/notes/associations` - Delete note association

For detailed API documentation, see [api/openapi/v1.yaml](api/openapi/v1.yaml)

## Development

### Available Make Commands

- `make build` - Build the application
- `make run` - Run the application locally
- `make test` - Run tests
- `make clean` - Clean build artifacts
- `make docker-build` - Build Docker image
- `make docker-up` - Start all services with Docker Compose
- `make docker-down` - Stop all Docker services
- `make migrate-up` - Run database migrations
- `make migrate-down` - Rollback database migrations
- `make migrate-create NAME=<name>` - Create a new migration

### Project Structure

```
core-service/
├── api/
│   └── openapi/         # OpenAPI specifications
├── cmd/
│   └── main.go          # Application entry point
├── db/
│   └── migrations/      # Database migrations
├── pkg/
│   ├── db/             # Database repositories
│   ├── handlers/       # HTTP handlers
│   └── models/         # Data models
├── tests/
│   └── test.http       # HTTP test requests
├── docker-compose.yml
├── Dockerfile
└── Makefile
```

## Database

### Connection

The service connects to PostgreSQL using the following environment variables:

- `DB_HOST` (default: localhost)
- `DB_PORT` (default: 5432)
- `DB_NAME` (default: crm)
- `DB_USER` (default: crmuser)
- `DB_PASSWORD` (default: crmpassword)

### Migrations

Database migrations are managed using [golang-migrate](https://github.com/golang-migrate/migrate).

#### Run Migrations

```bash
make migrate-up
```

#### Rollback Migrations

```bash
make migrate-down
```

#### Create New Migration

```bash
make migrate-create NAME=add_new_feature
```

### Default Admin User

The default admin user is created automatically during migration 000002. The email is assigned in migration 000003.

## Authentication

The service uses JWT (JSON Web Tokens) for authentication.

### Token Generation

Tokens are generated during login and are valid for 24 hours.

### Security Notes

- Passwords are hashed using bcrypt
- JWT tokens use HMAC-SHA256 signing
- **In production**: Update the JWT secret key (currently hardcoded in code)
- **In production**: Change the default admin password immediately

## Testing

### Manual Testing with HTTP Client

Use the provided `tests/test.http` file with VS Code REST Client extension or similar tools.

### Running Tests

```bash
make test
```

### Integration Tests

```bash
make integration-test
```

## Configuration

### Environment Variables

Create a `.env` file or set the following environment variables:

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=crm
DB_USER=crmuser
DB_PASSWORD=crmpassword

# Server Configuration
PORT=8080

# JWT Configuration (TODO: implement environment variable support)
# JWT_SECRET=your-secret-key-here
```

### Port Configuration

By default, the service runs on port 8080. You can change this by setting the `PORT` environment variable.

## Security Considerations

1. **Change Default Credentials**: The default admin password should be changed immediately after first deployment
2. **JWT Secret**: Move the hardcoded JWT secret to environment variables
3. **HTTPS**: Use HTTPS in production
4. **Database Credentials**: Use strong, unique database credentials
5. **CORS**: Configure CORS settings appropriately for your frontend
6. **Rate Limiting**: Consider implementing rate limiting for API endpoints

## Troubleshooting

### Database Connection Issues

If you encounter database connection errors:

1. Verify PostgreSQL is running: `docker-compose ps`
2. Check database credentials in environment variables
3. Ensure database migrations have run: `make migrate-up`

### Authentication Issues

If login fails:

1. Verify the database has been migrated (default admin user is created during migration)
2. Check that you're using the correct email: `admin@example.com`
3. Check that you're using the correct password: `password`
4. Ensure the JWT secret key is set correctly

### Migration Issues

If migrations fail:

1. Check PostgreSQL is accessible
2. Verify database user has sufficient privileges
3. Check migration version: The service tracks which migrations have been applied

#### Dirty Database State

If you see an error like "Dirty database version X":

1. Check the current migration state:
```bash
psql -h localhost -U core -d crm -c "SELECT * FROM schema_migrations;"
```

2. Force the migration to a clean version:
```bash
# If database is at the latest version (all migrations applied)
go run cmd/migration/main.go force 3

# If database has no migrations applied (empty database)
go run cmd/migration/main.go force 0
```

3. Then run migrations up:
```bash
make migrate-up
```

#### Rollback All Migrations

To completely rollback all migrations:

```bash
make migrate-down
```

**Note**: This will:
- Drop all tables (accounts, contacts, opportunities, notes, users)
- Revoke privileges from the `core` database user
- The `core` user itself will not be dropped (as it cannot drop itself while connected)

#### Reset Database to Clean State

To reset the database completely:

```bash
# Rollback all migrations
make migrate-down

# Run migrations up again
make migrate-up
```

This will recreate all tables and the default admin user.

## License

[Add your license information here]

## Support

For issues and questions, please open an issue in the project repository.
