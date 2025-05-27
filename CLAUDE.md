# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Always read memory-bank/@architecture.md before writing any code. Include entire database schema.
Always read memory-bank/@product-design.md before writing any code.
After adding a major feature or completing a milestone, update memory-bank/@architecture.md.

## Build Commands
- **Core-Service (Go)**: `make build`, `make run`, `make docker-build`
- **Frontend (React)**: `make build`, `make start`, `make docker-build`

## Test Commands
- **Core-Service**: `make test` or `go test -v ./pkg/path/to/package -run TestName`
- **Frontend**: `npm test` or `npm test -- -t "test name pattern"`

## Database
- Setup: `make setup-db` (creates DB and runs migrations)
- Migrations: `make migrate-up`, `make migrate-down`

## Code Style
- **Go**: Standard Go formatting (implicitly uses gofmt)
- **Frontend**: ESLint with react-app preset
- Use existing import order patterns
- Error handling: Go errors returned/checked; React uses global notification system
- TypeScript types preferred in frontend when available

## Architecture
- **Core-Service**: Go/Gin REST API with PostgreSQL
- **Frontend**: React/Redux/Material UI
- Models follow consistent naming conventions across both codebases