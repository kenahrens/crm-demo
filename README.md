# CRM Demo Application

A modern, full-stack Customer Relationship Management (CRM) system built with Go, React, and PostgreSQL. This application provides a robust platform for managing customer relationships, tracking sales opportunities, and organizing business interactions through a clean, user-friendly interface.

## 🚀 Overview

This CRM demo showcases enterprise-grade architecture patterns and modern development practices. It features a RESTful API backend built with Go and Gin framework, a responsive React frontend with Material-UI, and PostgreSQL for reliable data persistence.

### Key Features

- **Full-Stack CRM**: Complete account, contact, and opportunity management with JWT authentication
- **Modern Tech Stack**: Go/Gin backend, React/Material-UI frontend, PostgreSQL database
- **API-First Design**: RESTful API with OpenAPI 3.0 specification
- **proxymock Integration**: Demonstrates traffic recording, mocking, and replay for advanced testing workflows

## 🚦 Prerequisites

- Go 1.21 or higher
- Node.js 18+ and npm
- PostgreSQL 15+
- Make (for build commands)

See [Architecture](#%EF%B8%8F-architecture) below for different ways to run this application.

## 📚 API Documentation

The API follows RESTful principles and is documented using OpenAPI 3.0. Key endpoints include:

- `POST /v1/api/auth/login` - User authentication
- `GET/POST /v1/api/accounts` - Account management
- `GET/POST /v1/api/contacts` - Contact management
- `GET/POST /v1/api/opportunities` - Opportunity tracking
- `GET/POST /v1/api/notes` - Note operations

Full API specification available at: `core-service/api/openapi/v1.yaml`

## 🧪 Testing

### Backend Tests
```bash
cd core-service
make test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Cypress End-to-End Tests
The project includes Cypress for end-to-end testing of the full application stack.

**Setup:**
```bash
cd frontend
npm install cypress --save-dev
```

**Run Cypress:**
```bash
# Open Cypress Test Runner (interactive mode)
cd frontend
npx cypress open

# Run Cypress tests headlessly
npx cypress run
```

**Writing Tests:**
Cypress tests are located in `frontend/cypress/e2e/`. Tests can interact with the full stack including frontend, backend, and database.

### API Testing with proxymock
The project includes proxymock integration for recording and replaying API traffic, enabling realistic testing scenarios and regression detection.

## 🔧 Development

### Code Style
- **Go**: Standard Go formatting with `gofmt`
- **React**: ESLint with react-app preset
- **Git**: Conventional commits recommended

### Project Structure
```
crm-demo/
├── core-service/          # Go backend service
│   ├── cmd/              # Application entrypoints
│   ├── pkg/              # Application packages
│   ├── db/migrations/    # Database migrations
│   └── api/openapi/      # API specifications
└── frontend/             # React frontend
    ├── src/             # Source code
    ├── public/          # Static assets
    └── build/           # Production build
```

## 🏗️ Architecture

This CRM can be run in several configurations, from baseline development to advanced testing scenarios with proxymock.

### System Architecture Overview

The complete system architecture showing all components:

```mermaid
graph LR
    Cypress[Cypress Tests] -->|:3000| Frontend[React Frontend]
    Frontend -->|:8080| CoreService[Go Core Service]
    CoreService -->|:5432| Postgres[(PostgreSQL)]
    
    style Cypress fill:#17b978,stroke:#333,stroke-width:2px
    style Frontend fill:#61dafb,stroke:#333,stroke-width:2px
    style CoreService fill:#00add8,stroke:#333,stroke-width:2px
    style Postgres fill:#336791,stroke:#333,stroke-width:2px
```

### 1. Baseline Development

The standard development setup with all services running locally:

```mermaid
graph LR
    Browser[Browser] -->|:3000| Frontend[React Frontend]
    Frontend -->|:8080| Backend[Go Backend]
    Backend -->|:5432| DB[(PostgreSQL)]

    style Browser fill:#f9f,stroke:#333,stroke-width:2px
    style Frontend fill:#61dafb,stroke:#333,stroke-width:2px
    style Backend fill:#00add8,stroke:#333,stroke-width:2px
    style DB fill:#336791,stroke:#333,stroke-width:2px
```

**How to run:**

```bash
# Step 1: Clone the repository
git clone https://github.com/kenahrens/crm-demo.git
cd crm-demo

# Step 2: Set up PostgreSQL database
make setup-db

# Step 3: Start backend (Terminal 1)
cd core-service
make run

# Step 4: Start frontend (Terminal 2)
cd frontend
npm install
make start
```

**Access the application:**
- Frontend: http://localhost:3000
- API: http://localhost:8080/v1/api

**Create your first user:**

There is no default user. Create the first admin user:

1. Temporarily disable auth as directed in `core-service/tests/test.http` (header comments), then restart the service
2. Create the admin user via API:
   ```bash
   curl -X POST http://localhost:8080/v1/api/users \
     -H 'Content-Type: application/json' \
     -d '{
       "username": "admin",
       "email": "admin@example.com",
       "password": "adminpassword",
       "role": "admin"
     }'
   ```
3. Re-enable auth, restart the service, and log in with:
   - Email: `admin@example.com`
   - Password: `adminpassword`

### 2. Recording Traffic with proxymock

#### 2a. Recording Frontend → Core Service Traffic

Record traffic between the frontend and core service:

```mermaid
graph LR
    Browser[Browser] -->|:3000| Frontend[React Frontend]
    Frontend -->|:4143| PMRec[proxymock<br/>Recording]
    PMRec -->|:8080| CoreService[Go Core Service]
    CoreService -->|:5432| Postgres[(PostgreSQL)]

    PMRec -.->|Save| RRPairs[RRPair Files<br/>Frontend→Backend]

    style Browser fill:#f9f,stroke:#333,stroke-width:2px
    style Frontend fill:#61dafb,stroke:#333,stroke-width:2px
    style CoreService fill:#00add8,stroke:#333,stroke-width:2px
    style Postgres fill:#336791,stroke:#333,stroke-width:2px
    style PMRec fill:#ff6b6b,stroke:#333,stroke-width:2px
    style RRPairs fill:#ffd93d,stroke:#333,stroke-width:1px
```

**How to run:**
```bash
# Terminal 1: Start PostgreSQL
make setup-db

# Terminal 2: Start backend
cd core-service
make run

# Terminal 3: Start proxymock recording for frontend→backend traffic
# In Claude Code, run:
mcp_proxymock_record_traffic_start({
  "app-port": "8080",
  "proxy-in-port": "4143",
  "out-directory": ["proxymock/recorded-frontend-backend-<timestamp>"]
})

# Or via CLI:
proxymock record \
  --app-port 8080 \
  --proxy-in-port 4143 \
  --out proxymock/recorded-frontend-backend-$(date +%Y-%m-%d_%H-%M-%S)

# Terminal 4: Start frontend pointing to proxymock port
cd frontend
# Update API_BASE_URL to http://localhost:4143/v1/api
npm install
make start

# Now use the application - frontend→backend traffic will be recorded
# When done, stop recording with:
mcp_proxymock_record_traffic_stop()
```

#### 2b. Recording Core Service → PostgreSQL Traffic

Record database traffic from the core service to PostgreSQL:

```mermaid
graph LR
    Frontend[React Frontend] -->|:8080| CoreService[Go Core Service]
    CoreService --> PMRec[proxymock<br/>Recording<br/>via SOCKS Proxy]
    PMRec -->|:5432| Postgres[(PostgreSQL)]

    PMRec -.->|Save| RRPairs[RRPair Files<br/>Backend→Database]

    style Frontend fill:#61dafb,stroke:#333,stroke-width:2px
    style CoreService fill:#00add8,stroke:#333,stroke-width:2px
    style Postgres fill:#336791,stroke:#333,stroke-width:2px
    style PMRec fill:#ff6b6b,stroke:#333,stroke-width:2px
    style RRPairs fill:#ffd93d,stroke:#333,stroke-width:1px
```

**How to run:**
```bash
# Terminal 1: Start PostgreSQL
make setup-db

# Terminal 2: Start proxymock recording for backend→database traffic
# In Claude Code, run:
mcp_proxymock_record_traffic_start({
  "app-port": "5432",
  "proxy-in-port": "4140",
  "out-directory": ["proxymock/recorded-backend-db-<timestamp>"]
})

# Or via CLI:
proxymock record \
  --app-port 5432 \
  --proxy-in-port 4140 \
  --out proxymock/recorded-backend-db-$(date +%Y-%m-%d_%H-%M-%S)

# Terminal 3: Start backend with proxymock environment variables
cd core-service
export http_proxy=socks5h://localhost:4140
export https_proxy=socks5h://localhost:4140
export SSL_CERT_FILE=~/.speedscale/certs/tls.crt
make run

# Terminal 4: Start frontend (optional, for generating traffic)
cd frontend
npm install
make start

# Now use the application - backend→database traffic will be recorded
# When done, stop recording with:
mcp_proxymock_record_traffic_stop()
```

### 3. Replaying with Mock Servers

#### 3a. Cypress Tests → Frontend → Mock Backend

Run Cypress end-to-end tests against the frontend with a mocked backend:

```mermaid
graph LR
    Cypress[Cypress Tests] -->|:3000| Frontend[React Frontend]
    Frontend -->|:8080| PMMock[proxymock<br/>Mock Server]

    RRPairs[RRPair Files] -.->|Load| PMMock

    style Cypress fill:#17b978,stroke:#333,stroke-width:2px
    style Frontend fill:#61dafb,stroke:#333,stroke-width:2px
    style PMMock fill:#ff6b6b,stroke:#333,stroke-width:2px
    style RRPairs fill:#ffd93d,stroke:#333,stroke-width:1px
```

**How to run:**
```bash
# Terminal 1: Start proxymock mock server
# In Claude Code, run:
mcp_proxymock_mock_server_start({
  "in-directory": ["proxymock/recorded-frontend-backend-<timestamp>"]
})

# Or via CLI:
proxymock mock \
  --in proxymock/recorded-frontend-backend-<timestamp> \
  --port 8080

# Terminal 2: Start frontend
cd frontend
# Ensure API_BASE_URL points to http://localhost:8080/v1/api
npm install
make start

# Terminal 3: Run Cypress tests
cd frontend
npx cypress run
# Or open interactive mode: npx cypress open

# The mock server will respond with recorded responses
# Requests that don't match will be logged to out-directory
# When done, stop mocking with:
mcp_proxymock_mock_server_stop()
```

Access at: http://localhost:3000 (backend is mocked)

#### 3b. Backend Tests → Core Service → Mock Database

Run backend integration tests against the core service with a mocked database:

```mermaid
graph LR
    Tests[Backend Tests<br/>proxymock Replay] -->|:8080| CoreService[Go Core Service]
    CoreService --> PMMock[proxymock<br/>Mock Server<br/>Database]

    TestRRPairs[Test RRPairs] -.->|Load| Tests
    MockRRPairs[Mock RRPairs<br/>Database] -.->|Load| PMMock
    Tests -.->|Save Results| ResultRRPairs[Result RRPairs]

    style Tests fill:#17b978,stroke:#333,stroke-width:2px
    style CoreService fill:#00add8,stroke:#333,stroke-width:2px
    style PMMock fill:#ff6b6b,stroke:#333,stroke-width:2px
    style TestRRPairs fill:#ffd93d,stroke:#333,stroke-width:1px
    style MockRRPairs fill:#ffd93d,stroke:#333,stroke-width:1px
    style ResultRRPairs fill:#6bcf7f,stroke:#333,stroke-width:1px
```

**How to run:**
```bash
# Terminal 1: Start proxymock mock server for database
# In Claude Code, run:
mcp_proxymock_mock_server_start({
  "in-directory": ["proxymock/recorded-backend-db-<timestamp>"]
})

# Or via CLI:
proxymock mock \
  --in proxymock/recorded-backend-db-<timestamp> \
  --port 4140

# Terminal 2: Start backend with proxied database connection
cd core-service
export http_proxy=socks5h://localhost:4140
export https_proxy=socks5h://localhost:4140
export SSL_CERT_FILE=~/.speedscale/certs/tls.crt
make run

# Terminal 3: Replay test traffic against backend
# In Claude Code, run:
mcp_proxymock_replay_traffic({
  "in-directory": ["proxymock/tests"],
  "test-against": "http://localhost:8080",
  "out-directory": ["proxymock/replayed-<timestamp>"]
})

# Or via CLI:
proxymock replay \
  --in proxymock/tests \
  --test-against http://localhost:8080 \
  --out proxymock/replayed-$(date +%Y-%m-%d_%H-%M-%S)

# Compare results to detect regressions
# In Claude Code, run:
mcp_proxymock_compare_rrpair_files({
  "in": ["proxymock/tests", "proxymock/replayed-<timestamp>"],
  "verbosity-level": 2
})

# Or via CLI:
proxymock compare \
  --in proxymock/tests \
  --in proxymock/replayed-<timestamp> \
  --verbosity 2
```


### Technology Stack

**Backend**: Go 1.21+, Gin Framework, PostgreSQL 15+, JWT Authentication

**Frontend**: React 18, Material-UI v5, Axios

**Testing**: Cypress for E2E tests, proxymock for traffic recording/replay/mocking

## 📊 Data Model

The CRM system manages four core entities:

- **Accounts**: Companies or organizations
- **Contacts**: Individual people associated with accounts
- **Opportunities**: Sales deals in various stages
- **Notes**: Flexible annotations linked to any entity

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

- [ ] Advanced reporting and analytics dashboard
- [ ] Email integration for automated communications
- [ ] Mobile application support
- [ ] AI-powered lead scoring
- [ ] Multi-tenant architecture
- [ ] Advanced user roles and permissions
- [ ] Workflow automation engine

## 📞 Support

For questions, issues, or contributions:
- Create an issue in the GitHub repository
- Review the API specification for integration questions

---

Built with ❤️ for the modern sales team