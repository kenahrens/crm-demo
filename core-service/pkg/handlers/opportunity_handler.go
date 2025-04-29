package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/kenahrens/crm-demo/core-service/pkg/db"
	"github.com/kenahrens/crm-demo/core-service/pkg/models"
)

// OpportunityHandler handles HTTP requests for opportunities
type OpportunityHandler struct {
	repo *db.OpportunityRepository
}

// NewOpportunityHandler creates a new opportunity handler
func NewOpportunityHandler(repo *db.OpportunityRepository) *OpportunityHandler {
	return &OpportunityHandler{repo: repo}
}

// RegisterRoutes registers the opportunity routes to the given router group
func (h *OpportunityHandler) RegisterRoutes(rg *gin.RouterGroup) {
	opportunities := rg.Group("/opportunities")
	{
		opportunities.GET("", h.GetAllOpportunities)
		opportunities.POST("", h.CreateOpportunity)
		opportunities.GET("/:id", h.GetOpportunityByID)
		opportunities.PUT("/:id", h.UpdateOpportunity)
		opportunities.DELETE("/:id", h.DeleteOpportunity)
		opportunities.GET("/account/:id", h.GetOpportunitiesByAccountID)
	}
}

// GetAllOpportunities returns all opportunities
func (h *OpportunityHandler) GetAllOpportunities(c *gin.Context) {
	opportunities, err := h.repo.GetAllOpportunities()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Initialize opportunities to empty slice if nil to avoid returning null
	if opportunities == nil {
		opportunities = []models.Opportunity{}
	}

	// Return in paginated format matching OpenAPI spec
	c.JSON(http.StatusOK, gin.H{
		"data":   opportunities,
		"total":  len(opportunities),
		"limit":  100,
		"offset": 0,
	})
}

// GetOpportunityByID returns a single opportunity by ID
func (h *OpportunityHandler) GetOpportunityByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid opportunity ID format"})
		return
	}

	opportunity, err := h.repo.GetOpportunityByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if opportunity == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Opportunity not found"})
		return
	}

	c.JSON(http.StatusOK, opportunity)
}

// GetOpportunitiesByAccountID returns all opportunities for a specific account
func (h *OpportunityHandler) GetOpportunitiesByAccountID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid account ID format"})
		return
	}

	opportunities, err := h.repo.GetOpportunitiesByAccountID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Initialize opportunities to empty slice if nil to avoid returning null
	if opportunities == nil {
		opportunities = []models.Opportunity{}
	}

	c.JSON(http.StatusOK, opportunities)
}

// CreateOpportunity creates a new opportunity
func (h *OpportunityHandler) CreateOpportunity(c *gin.Context) {
	var opportunityData models.OpportunityCreate
	if err := c.ShouldBindJSON(&opportunityData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	opportunity, err := h.repo.CreateOpportunity(opportunityData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, opportunity)
}

// UpdateOpportunity updates an existing opportunity
func (h *OpportunityHandler) UpdateOpportunity(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid opportunity ID format"})
		return
	}

	var opportunityData models.OpportunityUpdate
	if err := c.ShouldBindJSON(&opportunityData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	opportunity, err := h.repo.UpdateOpportunity(id, opportunityData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if opportunity == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Opportunity not found"})
		return
	}

	c.JSON(http.StatusOK, opportunity)
}

// DeleteOpportunity deletes an opportunity
func (h *OpportunityHandler) DeleteOpportunity(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid opportunity ID format"})
		return
	}

	err = h.repo.DeleteOpportunity(id)
	if err != nil {
		// Check if the error is "opportunity not found"
		if err.Error() == "no opportunity found with ID "+idStr {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Opportunity deleted successfully"})
}
