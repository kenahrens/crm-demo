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

	// Open database connection with retries
	log.Println("Opening database connection...")
	var db *sql.DB
	var err error
	maxRetries := 10
	var lastErr error

	for attempt := 1; attempt <= maxRetries; attempt++ {
		db, err = sql.Open("postgres", connStr)
		if err != nil {
			log.Printf("ERROR: Failed to open database connection (attempt %d/%d): %v", attempt, maxRetries, err)
			lastErr = err
			time.Sleep(time.Duration(attempt) * time.Second) // Exponential backoff
			continue
		}

		// Set connection pool parameters
		db.SetMaxOpenConns(25)
		db.SetMaxIdleConns(5)
		db.SetConnMaxLifetime(5 * time.Minute)
		log.Println("Database connection pool configured")

		// Check database connection
		log.Printf("Testing database connection (attempt %d/%d)...", attempt, maxRetries)
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)

		if err := db.PingContext(ctx); err != nil {
			log.Printf("ERROR: Failed to ping database (attempt %d/%d): %v", attempt, maxRetries, err)
			cancel()
			lastErr = err
			// Close the DB connection before retrying
			db.Close()

			if attempt < maxRetries {
				retryDelay := time.Duration(attempt) * time.Second
				log.Printf("Retrying in %v...", retryDelay)
				time.Sleep(retryDelay)
				continue
			}
		} else {
			cancel()
			log.Println("Successfully connected to the database")
			return &DB{db}, nil
		}
	}

	return nil, fmt.Errorf("failed to connect to database after %d attempts: %w", maxRetries, lastErr)
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
