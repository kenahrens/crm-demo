package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/kenahrens/crm-demo/core-service/pkg/db"
	"github.com/kenahrens/crm-demo/core-service/pkg/models"
)

// ContactHandler handles HTTP requests for contacts
type ContactHandler struct {
	repo *db.ContactRepository
}

// NewContactHandler creates a new contact handler
func NewContactHandler(repo *db.ContactRepository) *ContactHandler {
	return &ContactHandler{repo: repo}
}

// RegisterRoutes registers the contact routes to the given router group
func (h *ContactHandler) RegisterRoutes(rg *gin.RouterGroup) {
	contacts := rg.Group("/contacts")
	{
		contacts.GET("", h.GetAllContacts)
		contacts.POST("", h.CreateContact)
		contacts.GET("/:id", h.GetContactByID)
		contacts.PUT("/:id", h.UpdateContact)
		contacts.DELETE("/:id", h.DeleteContact)
		contacts.GET("/account/:id", h.GetContactsByAccountID)
	}
}

// GetAllContacts returns all contacts
func (h *ContactHandler) GetAllContacts(c *gin.Context) {
	contacts, err := h.repo.GetAllContacts()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Initialize contacts to empty slice if nil to avoid returning null
	if contacts == nil {
		contacts = []models.Contact{}
	}

	// Return in paginated format matching OpenAPI spec
	c.JSON(http.StatusOK, gin.H{
		"data":   contacts,
		"total":  len(contacts),
		"limit":  100,
		"offset": 0,
	})
}

// GetContactByID returns a single contact by ID
func (h *ContactHandler) GetContactByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid contact ID format"})
		return
	}

	contact, err := h.repo.GetContactByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if contact == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Contact not found"})
		return
	}

	c.JSON(http.StatusOK, contact)
}

// GetContactsByAccountID returns all contacts for a specific account
func (h *ContactHandler) GetContactsByAccountID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid account ID format"})
		return
	}

	contacts, err := h.repo.GetContactsByAccountID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Initialize contacts to empty slice if nil to avoid returning null
	if contacts == nil {
		contacts = []models.Contact{}
	}

	c.JSON(http.StatusOK, contacts)
}

// CreateContact creates a new contact
func (h *ContactHandler) CreateContact(c *gin.Context) {
	var contactData models.ContactCreate
	if err := c.ShouldBindJSON(&contactData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validate account ID if provided
	if contactData.AccountID != uuid.Nil {
		// Optional: Check if account exists
	}

	contact, err := h.repo.CreateContact(contactData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, contact)
}

// UpdateContact updates an existing contact
func (h *ContactHandler) UpdateContact(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid contact ID format"})
		return
	}

	var contactData models.ContactUpdate
	if err := c.ShouldBindJSON(&contactData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validate account ID if provided
	if contactData.AccountID != uuid.Nil {
		// Optional: Check if account exists
	}

	contact, err := h.repo.UpdateContact(id, contactData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if contact == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Contact not found"})
		return
	}

	c.JSON(http.StatusOK, contact)
}

// DeleteContact deletes a contact
func (h *ContactHandler) DeleteContact(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid contact ID format"})
		return
	}

	err = h.repo.DeleteContact(id)
	if err != nil {
		// Check if the error is "contact not found"
		if err.Error() == "no contact found with ID "+idStr {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Contact deleted successfully"})
}
