# Repository Guidelines for AI Agents

This file provides guidance to AI agents (Claude Code, GitHub Copilot, etc.) when working with code in this repository.

## Project Structure & Preparation

`core-service/` contains the Go API (entrypoints `cmd/`, shared `pkg/`, OpenAPI `api/`, migrations `db/migrations`, replay harness `tests/`). `frontend/` houses the React app (`src/components`, `src/pages`, `src/services`, tests in `src/__tests__`).

**Important:** Always read `memory-bank/@architecture.md` (including entire database schema) and `memory-bank/@product-design.md` before writing any code. After adding a major feature or completing a milestone, update `memory-bank/@architecture.md`.

## Build & Test Commands

### Core-Service (Go)
- `cd core-service && make build` - Compile the application
- `cd core-service && make run` - Run the API server on `:8080`
- `cd core-service && make docker-build` - Build Docker image
- `cd core-service && make test` - Run all tests (`go test ./...`)
- Scope to a package: `go test -v ./pkg/path/to/package -run TestName`
- `cd core-service && make integration-test` - Replay proxymock traffic (requires certificates)

### Frontend (React)
- `cd frontend && make start` - Start development server
- `cd frontend && make build` - Build production bundle
- `cd frontend && make docker-build` - Build Docker image
- `cd frontend && npm test` - Open Jest watch mode (press `a` to rerun all)
- `npm test -- -t "test name pattern"` - Run specific test pattern

## Database & Migrations

- `make setup-db` - Provisions the `crm` database and runs baseline schema migrations (creates DB and runs migrations)
- `make migrate-up` - Run forward migrations
- `make migrate-down` - Rollback migrations

Defaults pull from environment variables: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`. Capture schema updates in `memory-bank/@architecture.md` after migration changes.

## Code Style & Naming

### Go
- Standard Go formatting with `go fmt` or goimports
- Exports stay PascalCase, helpers camelCase
- Descriptive error names (e.g., `errCreateAccount`)
- Keep current import groupings
- Check errors explicitly - Go errors returned/checked consistently

### Frontend
- ESLint with react-app preset
- Two-space indentation
- PascalCase for components
- camelCase for hooks/utilities
- Material UI `sx` prop for styling
- Error handling: React uses global notification system
- **TypeScript types preferred when available**
- Use existing import order patterns

### General
- Models follow consistent naming conventions across both codebases (frontend/backend)
- Mirror entity names between layers to avoid drift

## Testing Practices

### Backend
- Tests live next to their packages as `*_test.go` files
- Table-driven test cases help coverage
- Extend HTTP scenarios with recordings in `proxymock/recorded-*`
- Run integration tests with `make integration-test`

### Frontend
- Tests sit in `src/__tests__/`
- Use React Testing Library (e.g., `screen.getByRole`)
- Mock the Redux store when needed
- Call out any manual checks in PRs

## Commit & Pull Request Workflow

### Commits
- Use short, imperative summaries (e.g., `add artifacts`, `fix typo`)
- Keep under ~60 characters
- Keep related work together

### Pull Requests
- Outline scope clearly
- List the commands you ran (`make test`, `npm test`, `make integration-test`)
- Link related issues
- Attach screenshots or payload samples for UI/API updates
- Update `docs/` and `memory-bank/` whenever flows, schemas, or architecture shift

## Architecture Snapshot

### Core-Service
- Go/Gin REST API with PostgreSQL
- Repository pattern for data access
- JWT authentication middleware
- OpenAPI 3.0 specification in `api/openapi/v1.yaml`

### Frontend
- React + Redux Toolkit + Material UI
- Axios with interceptors for API calls
- JWT token management

### Database
- PostgreSQL 15+
- Migration-based schema management
- User `core` with password `core` for local development

## Environment Tips

- Frontend API calls proxy through the URL defined in `package.json`
- Use `.env.local` only when pointing to non-default endpoints
- Prefer the proxymock make targets so SOCKS proxy variables are exported automatically
- Strip any transient credentials before committing
- Refresh `memory-bank/` when configuration expectations change
