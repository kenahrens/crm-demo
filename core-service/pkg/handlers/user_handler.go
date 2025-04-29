package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/kenahrens/crm-demo/core-service/pkg/db"
	"github.com/kenahrens/crm-demo/core-service/pkg/models"
)

// UserHandler handles HTTP requests for users
type UserHandler struct {
	repo *db.UserRepository
}

// NewUserHandler creates a new user handler
func NewUserHandler(repo *db.UserRepository) *UserHandler {
	return &UserHandler{repo: repo}
}

// RegisterRoutes registers the user routes to the given router group
func (h *UserHandler) RegisterRoutes(rg *gin.RouterGroup) {
	users := rg.Group("/users")
	{
		users.GET("", h.GetAllUsers)
		users.POST("", h.CreateUser)
		users.GET("/:id", h.GetUserByID)
		// Additional endpoints could be added here (update, delete, etc.)
	}
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
