package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/kenahrens/crm-demo/core-service/pkg/db"
	"github.com/kenahrens/crm-demo/core-service/pkg/handlers"
)

func main() {
	// Set Gin mode
	ginMode := os.Getenv("GIN_MODE")
	if ginMode == "release" {
		gin.SetMode(gin.ReleaseMode)
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

	// Run migrations
	migrationsPath := filepath.Join(curDir, "db", "migrations")
	if err := database.RunMigrations(migrationsPath); err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}

	// Initialize repositories
	accountRepo := db.NewAccountRepository(database)
	contactRepo := db.NewContactRepository(database)
	opportunityRepo := db.NewOpportunityRepository(database)
	noteRepo := db.NewNoteRepository(database)
	userRepo := db.NewUserRepository(database)

	// Initialize handlers
	accountHandler := handlers.NewAccountHandler(accountRepo)
	contactHandler := handlers.NewContactHandler(contactRepo)
	opportunityHandler := handlers.NewOpportunityHandler(opportunityRepo)
	noteHandler := handlers.NewNoteHandler(noteRepo)
	userHandler := handlers.NewUserHandler(userRepo)

	// Set up Gin router
	router := gin.Default()

	// Set up CORS middleware
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Set up API endpoints
	apiV1 := router.Group("/v1/api")
	{
		// Health check endpoint
		apiV1.GET("/health", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"status": "ok",
			})
		})
		userHandler.RegisterRoutes(apiV1)
		accountHandler.RegisterRoutes(apiV1)
		contactHandler.RegisterRoutes(apiV1)
		opportunityHandler.RegisterRoutes(apiV1)
		noteHandler.RegisterRoutes(apiV1)
	}

	// Start the server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Starting server on port %s", port)
	if err := router.Run(fmt.Sprintf(":%s", port)); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
