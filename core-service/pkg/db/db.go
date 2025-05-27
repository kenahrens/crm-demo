package db

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"
)

// DB is a wrapper around sql.DB
type DB struct {
	*sql.DB
}

// New creates a new database connection
func New() (*DB, error) {
	// Database connection parameters
	host := getEnv("DB_HOST", "localhost")
	port := getEnv("DB_PORT", "5432")
	user := getEnv("DB_USER", "core")
	password := getEnv("DB_PASSWORD", "core")
	dbname := getEnv("DB_NAME", "crm")
	sslmode := getEnv("DB_SSLMODE", "disable")

	log.Printf("Attempting database connection to %s:%s/%s as user %s", host, port, dbname, user)

	// Build connection string
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		host, port, user, password, dbname, sslmode)

	// Open database connection
	log.Println("Opening database connection...")
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Printf("ERROR: Failed to open database connection: %v", err)
		return nil, fmt.Errorf("failed to open database connection: %w", err)
	}

	// Set connection pool parameters
	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(5)
	db.SetConnMaxLifetime(5 * time.Minute)
	log.Println("Database connection pool configured")

	// Check database connection
	log.Println("Testing database connection...")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := db.PingContext(ctx); err != nil {
		log.Printf("ERROR: Failed to ping database: %v", err)
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	log.Println("Successfully connected to the database")
	return &DB{db}, nil
}

// RunMigrations runs database migrations
func (db *DB) RunMigrations(migrationsPath string) error {
	log.Printf("Running database migrations from %s", migrationsPath)

	driver, err := postgres.WithInstance(db.DB, &postgres.Config{})
	if err != nil {
		log.Printf("ERROR: Failed to create migration driver: %v", err)
		return fmt.Errorf("failed to create migration driver: %w", err)
	}

	m, err := migrate.NewWithDatabaseInstance(
		fmt.Sprintf("file://%s", migrationsPath),
		"postgres",
		driver,
	)
	if err != nil {
		log.Printf("ERROR: Failed to create migration instance: %v", err)
		return fmt.Errorf("failed to create migration instance: %w", err)
	}

	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		log.Printf("ERROR: Failed to run migrations: %v", err)
		return fmt.Errorf("failed to run migrations: %w", err)
	}

	log.Println("Successfully ran database migrations")
	return nil
}

// HealthCheck performs a comprehensive database connection test
func (db *DB) HealthCheck() error {
	log.Println("Performing database health check...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Basic connectivity test
	if err := db.PingContext(ctx); err != nil {
		log.Printf("ERROR: Database health check failed - ping error: %v", err)
		return fmt.Errorf("database ping failed: %w", err)
	}

	// Simple query test
	var result int
	err := db.QueryRowContext(ctx, "SELECT 1").Scan(&result)
	if err != nil {
		log.Printf("ERROR: Database health check failed - query error: %v", err)
		return fmt.Errorf("database query test failed: %w", err)
	}

	// Get connection stats
	stats := db.Stats()
	log.Printf("Database connection pool stats - Open: %d, In use: %d, Idle: %d",
		stats.OpenConnections, stats.InUse, stats.Idle)

	log.Println("Database health check completed successfully")
	return nil
}

// getEnv gets an environment variable or returns a default value
func getEnv(key, defaultValue string) string {
	value, exists := os.LookupEnv(key)
	if !exists {
		return defaultValue
	}
	return value
}
