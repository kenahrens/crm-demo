# CRM Demo Application

A modern, full-stack Customer Relationship Management (CRM) system built with Go, React, and PostgreSQL. This application provides a robust platform for managing customer relationships, tracking sales opportunities, and organizing business interactions through a clean, user-friendly interface.

## 🚀 Overview

This CRM demo showcases enterprise-grade architecture patterns and modern development practices. It features a RESTful API backend built with Go and Gin framework, a responsive React frontend with Material-UI, and PostgreSQL for reliable data persistence.

### Key Features

- **Account Management**: Track companies and organizations with detailed information
- **Contact Management**: Maintain comprehensive contact records linked to accounts
- **Opportunity Tracking**: Monitor sales pipeline with stage-based opportunity management
- **Notes System**: Flexible note-taking with multi-entity associations
- **Authentication**: JWT-based secure authentication system
- **Real-time Updates**: Responsive UI with real-time state updates
- **API-First Design**: OpenAPI 3.0 specification for clear API contracts

## 🚦 Getting Started

### Prerequisites
- Go 1.21 or higher
- Node.js 18+ and npm
- PostgreSQL 15+
- Docker and Docker Compose (optional)
- Make (for build commands)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/kenahrens/crm-demo.git
   cd crm-demo
   ```

2. **Set up the database**
   ```bash
   make setup-db
   ```

3. **Start the backend**
   ```bash
   cd core-service
   make run
   ```

4. **Start the frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   make start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - API: http://localhost:8080/v1/api

### Default credentials

There is no default user. Create the first admin user, then sign in:

1. Temporarily disable auth as directed in `core-service/tests/test.http` (header comments), then run the service.
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
3. Re-enable auth and log in with:
   - Email: `admin@example.com`
   - Password: `adminpassword`

Optional sample user (non-admin):
```bash
curl -X POST http://localhost:8080/v1/api/users \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "testpassword",
    "role": "user"
  }'
```

### Docker Deployment

Build and run with Docker Compose:
```bash
docker-compose up --build
```

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

### API Testing with ProxyMock
The project includes ProxyMock integration for recording and replaying API traffic, enabling realistic testing scenarios and regression detection.

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
├── frontend/             # React frontend
│   ├── src/             # Source code
│   ├── public/          # Static assets
│   └── build/           # Production build
└── docs/                # Additional documentation
```

## 🏗️ Architecture

```mermaid
graph LR
    Frontend[Frontend<br/>React App]
    Backend[Backend<br/>Core Service]
    DB[(PostgreSQL)]
    PM[ProxyMock<br/>Record & Replay]

    Frontend -->|HTTP/REST :3000| Backend
    Backend -->|:8080| DB

    PM -.->|Intercept Inbound| Frontend
    PM -.->|Intercept Outbound| Backend

    style Frontend fill:#61dafb,stroke:#333,stroke-width:2px
    style Backend fill:#00add8,stroke:#333,stroke-width:2px
    style DB fill:#336791,stroke:#333,stroke-width:2px
    style PM fill:#ff6b6b,stroke:#333,stroke-width:2px
```

### Components

- **Frontend**: React single-page application with Material-UI
- **Backend**: Go REST API service with Gin framework
- **PostgreSQL**: Database for persistent storage
- **ProxyMock**: Tool for recording and replaying API traffic for testing

### Technology Stack

**Backend**: Go 1.21+, Gin Framework, PostgreSQL 15+, JWT Authentication

**Frontend**: React 18, Material-UI v5, Axios

**Testing**: ProxyMock for traffic recording/replay

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
- Check existing documentation in `/docs`
- Review the API specification for integration questions

---

Built with ❤️ for the modern sales team