package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"github.com/google/uuid"
	"github.com/kenahrens/crm-demo/core-service/pkg/db"
	"github.com/kenahrens/crm-demo/core-service/pkg/models"
)

// JWT secret key - in production, this should be loaded from environment variables
const jwtSecret = "your-secret-key-here" // TODO: Move to environment variable

// JWTClaims represents the claims in the JWT token
type JWTClaims struct {
	UserID   string `json:"user_id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Role     string `json:"role"`
	jwt.RegisteredClaims
}

// UserHandler handles HTTP requests for users
type UserHandler struct {
	repo *db.UserRepository
}

// NewUserHandler creates a new user handler
func NewUserHandler(repo *db.UserRepository) *UserHandler {
	return &UserHandler{repo: repo}
}

// RegisterRoutes registers all user routes to the given router group
// This is kept for backward compatibility but should be deprecated in favor of
// RegisterAuthRoutes and RegisterSecureRoutes
func (h *UserHandler) RegisterRoutes(rg *gin.RouterGroup) {
	h.RegisterAuthRoutes(rg)
	h.RegisterSecureRoutes(rg)
}

// RegisterAuthRoutes registers the authentication routes (no auth required)
func (h *UserHandler) RegisterAuthRoutes(rg *gin.RouterGroup) {
	// Authentication routes
	auth := rg.Group("/auth")
	{
		auth.POST("/login", h.Login)
		// Could add registration, password reset, etc.
	}
}

// RegisterSecureRoutes registers routes that require authentication
func (h *UserHandler) RegisterSecureRoutes(rg *gin.RouterGroup) {
	users := rg.Group("/users")
	{
		users.GET("", h.GetAllUsers)
		users.POST("", h.CreateUser)
		users.GET("/:id", h.GetUserByID)
		// Additional endpoints could be added here (update, delete, etc.)
	}
}

// Login authenticates a user and returns a JWT token
func (h *UserHandler) Login(c *gin.Context) {
	var loginData models.UserLogin
	if err := c.ShouldBindJSON(&loginData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if credentials are valid
	user, err := h.repo.CheckUserPassword(loginData.Email, loginData.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if user == nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Create JWT token
	expirationTime := time.Now().Add(24 * time.Hour) // Token valid for 24 hours
	claims := &JWTClaims{
		UserID:   user.ID.String(),
		Username: user.Username,
		Email:    user.Email,
		Role:     user.Role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
		return
	}

	// Return the token and user info
	c.JSON(http.StatusOK, gin.H{
		"token": tokenString,
		"user":  user,
	})
}

// GetAllUsers returns all users
func (h *UserHandler) GetAllUsers(c *gin.Context) {
	users, err := h.repo.GetAllUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Initialize users to empty slice if nil to avoid returning null
	if users == nil {
		users = []models.User{}
	}

	// Return in paginated format matching OpenAPI spec
	c.JSON(http.StatusOK, gin.H{
		"data":   users,
		"total":  len(users),
		"limit":  100,
		"offset": 0,
	})
}

// GetUserByID returns a single user by ID
func (h *UserHandler) GetUserByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID format"})
		return
	}

	user, err := h.repo.GetUserByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if user == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, user)
}

// CreateUser creates a new user
func (h *UserHandler) CreateUser(c *gin.Context) {
	var userData models.UserCreate
	if err := c.ShouldBindJSON(&userData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := h.repo.CreateUser(userData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, user)
}
