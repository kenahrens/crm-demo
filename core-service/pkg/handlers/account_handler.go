package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/kenahrens/crm-demo/core-service/pkg/db"
	"github.com/kenahrens/crm-demo/core-service/pkg/models"
)

// AccountHandler handles HTTP requests for accounts
type AccountHandler struct {
	repo *db.AccountRepository
}

// NewAccountHandler creates a new account handler
func NewAccountHandler(repo *db.AccountRepository) *AccountHandler {
	return &AccountHandler{repo: repo}
}

// RegisterRoutes registers the account routes to the given router group
func (h *AccountHandler) RegisterRoutes(rg *gin.RouterGroup) {
	accounts := rg.Group("/accounts")
	{
		accounts.GET("", h.GetAllAccounts)
		accounts.POST("", h.CreateAccount)
		accounts.GET("/:id", h.GetAccountByID)
		accounts.PUT("/:id", h.UpdateAccount)
		accounts.DELETE("/:id", h.DeleteAccount)
	}
}

// GetAllAccounts returns all accounts
func (h *AccountHandler) GetAllAccounts(c *gin.Context) {
	accounts, err := h.repo.GetAllAccounts()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Initialize accounts to empty slice if nil to avoid returning null
	if accounts == nil {
		accounts = []models.Account{}
	}

	// Return in paginated format matching OpenAPI spec
	c.JSON(http.StatusOK, gin.H{
		"data":   accounts,
		"total":  len(accounts),
		"limit":  100,
		"offset": 0,
	})
}

// GetAccountByID returns a single account by ID
func (h *AccountHandler) GetAccountByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid account ID format"})
		return
	}

	account, err := h.repo.GetAccountByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if account == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Account not found"})
		return
	}

	c.JSON(http.StatusOK, account)
}

// CreateAccount creates a new account
func (h *AccountHandler) CreateAccount(c *gin.Context) {
	var accountData models.AccountCreate
	if err := c.ShouldBindJSON(&accountData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	account, err := h.repo.CreateAccount(accountData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, account)
}

// UpdateAccount updates an existing account
func (h *AccountHandler) UpdateAccount(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid account ID format"})
		return
	}

	var accountData models.AccountUpdate
	if err := c.ShouldBindJSON(&accountData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	account, err := h.repo.UpdateAccount(id, accountData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if account == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Account not found"})
		return
	}

	c.JSON(http.StatusOK, account)
}

// DeleteAccount deletes an account
func (h *AccountHandler) DeleteAccount(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid account ID format"})
		return
	}

	err = h.repo.DeleteAccount(id)
	if err != nil {
		// Check if the error is "account not found"
		if err.Error() == "no account found with ID "+idStr {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Account deleted successfully"})
}
