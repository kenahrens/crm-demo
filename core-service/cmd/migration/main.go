package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strconv"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/kenahrens/crm-demo/core-service/pkg/db"
	_ "github.com/lib/pq"
)

func main() {
	if len(os.Args) < 2 {
		log.Fatalf("Usage: %s [up|down|force <version>]", os.Args[0])
	}

	// Initialize database connection
	database, err := db.New()
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	// Get current directory to build path to migrations
	curDir, err := os.Getwd()
	if err != nil {
		log.Fatalf("Failed to get current directory: %v", err)
	}

	// Create migration instance
	driver, err := postgres.WithInstance(database.DB, &postgres.Config{})
	if err != nil {
		log.Fatalf("Failed to create migration driver: %v", err)
	}

	migrationsPath := filepath.Join(curDir, "db", "migrations")
	m, err := migrate.NewWithDatabaseInstance(
		fmt.Sprintf("file://%s", migrationsPath),
		"postgres",
		driver,
	)
	if err != nil {
		log.Fatalf("Failed to create migration instance: %v", err)
	}

	// Run the migration
	command := os.Args[1]
	switch command {
	case "up":
		if err := m.Up(); err != nil && err != migrate.ErrNoChange {
			log.Fatalf("Failed to run migration up: %v", err)
		}
		log.Println("Successfully ran migration up")
	case "down":
		if err := m.Down(); err != nil && err != migrate.ErrNoChange {
			log.Fatalf("Failed to run migration down: %v", err)
		}
		log.Println("Successfully ran migration down")
	case "force":
		if len(os.Args) < 3 {
			log.Fatalf("Usage: %s force <version>", os.Args[0])
		}
		version, err := strconv.Atoi(os.Args[2])
		if err != nil {
			log.Fatalf("Invalid version number: %v", err)
		}
		if err := m.Force(version); err != nil {
			log.Fatalf("Failed to force migration version: %v", err)
		}
		log.Printf("Successfully forced migration version to %d", version)
	default:
		log.Fatalf("Unknown command: %s (use 'up', 'down', or 'force <version>')", command)
	}
}
