# Repository Guidelines

## Project Structure & Preparation
`core-service/` contains the Go API (entrypoints `cmd/`, shared `pkg/`, OpenAPI `api/`, migrations `db/migrations`, replay harness `tests/`). `frontend/` houses the React app (`src/components`, `src/pages`, `src/services`, tests in `src/__tests__`). Read `memory-bank/@architecture.md` and `memory-bank/@product-design.md` before coding; refresh them after significant changes.

## Build & Test Commands
- `cd core-service && make build|run|docker-build` compiles, runs, or ships the API (`:8080`).
- `cd core-service && make test` runs `go test ./...`; scope to a package with `go test -v ./pkg/foo -run TestName`.
- `cd frontend && make start|build|docker-build` drives the CRA dev cycle.
- `cd frontend && npm test` opens Jest watch mode (`a` reruns all).
- `cd core-service && make integration-test` replays proxymock traffic once certificates are installed.

## Database & Migrations
`make setup-db` provisions the `crm` database and baseline schema. Use `make migrate-up` / `make migrate-down` for incremental changes and capture schema updates in `memory-bank/@architecture.md`. Defaults pull from `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME`.

## Coding Style & Naming
Format Go with `go fmt` or goimports; exports stay PascalCase, helpers camelCase, and errors descriptive (`errCreateAccount`). Keep current import groupings and check errors explicitly. React code uses two-space indentation, PascalCase components, camelCase hooks/utilities, Material UI `sx`, and the shared notification system. Prefer TypeScript typing where it exists.

## Testing Practices
Backend tests live next to their packages as `*_test.go` files; table-driven cases help coverage. Extend HTTP scenarios with recordings in `proxymock/recorded-*` plus `make integration-test`. Frontend tests sit in `src/__tests__`, use React Testing Library (`screen.getByRole`), and mock the Redux store when needed. Call out any manual checks in PRs.

## Commit & Pull Request Workflow
Commits use short, imperative summaries (`add artifacts`, `fix typo`) under ~60 characters and keep related work together. PRs outline scope, list the commands you ran (`make test`, `npm test`, `make integration-test`), link issues, and attach screenshots or payload samples for UI/API updates. Update `docs/` and `memory-bank/` whenever flows, schemas, or architecture shift.

## Architecture Snapshot
Backend: Go + Gin REST service backed by PostgreSQL, repository pattern, JWT middleware. Frontend: React + Redux Toolkit + Material UI with Axios interceptors. Mirror entity names between layers to avoid drift.

## Environment Tips
Frontend API calls proxy through the URL defined in `package.json`; use `.env.local` only when pointing elsewhere. Prefer the proxymock make targets so SOCKS proxy variables are exported automatically. Strip any transient credentials before committing and refresh `memory-bank/` when configuration expectations change.
