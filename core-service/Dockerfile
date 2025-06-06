# Build stage
FROM golang:1.24.1-alpine AS builder

WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -o /core-service ./cmd/main.go

# Final stage
FROM alpine:3.16

WORKDIR /app

# Copy the built binary from the builder stage
COPY --from=builder /core-service .

# Copy migrations directory for database migrations
COPY --from=builder /app/db/migrations ./db/migrations

# Expose port 8080
EXPOSE 8080

# Set environment variables
ENV GIN_MODE=release
ENV PORT=8080

# Run the application
CMD ["./core-service"] 