package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/kenahrens/crm-demo/core-service/pkg/db"
	"github.com/kenahrens/crm-demo/core-service/pkg/models"
)

// NoteHandler handles HTTP requests for notes
type NoteHandler struct {
	repo *db.NoteRepository
}

// NewNoteHandler creates a new note handler
func NewNoteHandler(repo *db.NoteRepository) *NoteHandler {
	return &NoteHandler{repo: repo}
}

// RegisterRoutes registers the note routes to the given router group
func (h *NoteHandler) RegisterRoutes(rg *gin.RouterGroup) {
	notes := rg.Group("/notes")
	{
		notes.GET("", h.GetAllNotes)
		notes.POST("", h.CreateNote)
		notes.GET("/:id", h.GetNoteByID)
		notes.PUT("/:id", h.UpdateNote)
		notes.DELETE("/:id", h.DeleteNote)
		notes.GET("/record/:type/:id", h.GetNotesByRecordID)
		notes.POST("/associations", h.AddNoteAssociation)
		notes.DELETE("/associations", h.RemoveNoteAssociation)
	}
}

// GetAllNotes returns all notes
func (h *NoteHandler) GetAllNotes(c *gin.Context) {
	notes, err := h.repo.GetAllNotes()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Initialize notes to empty slice if nil to avoid returning null
	if notes == nil {
		notes = []models.Note{}
	}

	// Return in paginated format matching OpenAPI spec
	c.JSON(http.StatusOK, gin.H{
		"data":   notes,
		"total":  len(notes),
		"limit":  100,
		"offset": 0,
	})
}

// GetNoteByID returns a single note by ID
func (h *NoteHandler) GetNoteByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid note ID format"})
		return
	}

	note, err := h.repo.GetNoteByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if note == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Note not found"})
		return
	}

	c.JSON(http.StatusOK, note)
}

// GetNotesByRecordID returns all notes for a specific record (account, contact, opportunity)
func (h *NoteHandler) GetNotesByRecordID(c *gin.Context) {
	recordType := c.Param("type")
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid record ID format"})
		return
	}

	// Validate record type
	if recordType != "account" && recordType != "contact" && recordType != "opportunity" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid record type. Must be 'account', 'contact', or 'opportunity'"})
		return
	}

	notes, err := h.repo.GetNotesByRecordID(id, recordType)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Initialize notes to empty slice if nil to avoid returning null
	if notes == nil {
		notes = []models.Note{}
	}

	c.JSON(http.StatusOK, notes)
}

// CreateNote creates a new note
func (h *NoteHandler) CreateNote(c *gin.Context) {
	var noteData models.NoteCreate
	if err := c.ShouldBindJSON(&noteData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validate that at least one record association is provided
	if len(noteData.Records) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "At least one record association is required"})
		return
	}

	// Validate record types
	for _, record := range noteData.Records {
		if record.RecordType != "account" && record.RecordType != "contact" && record.RecordType != "opportunity" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid record type. Must be 'account', 'contact', or 'opportunity'"})
			return
		}
	}

	note, err := h.repo.CreateNote(noteData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, note)
}

// UpdateNote updates an existing note
func (h *NoteHandler) UpdateNote(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid note ID format"})
		return
	}

	var noteData models.NoteUpdate
	if err := c.ShouldBindJSON(&noteData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	note, err := h.repo.UpdateNote(id, noteData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if note == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Note not found"})
		return
	}

	c.JSON(http.StatusOK, note)
}

// DeleteNote deletes a note
func (h *NoteHandler) DeleteNote(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid note ID format"})
		return
	}

	err = h.repo.DeleteNote(id)
	if err != nil {
		// Check if the error is "note not found"
		if err.Error() == "no note found with ID "+idStr {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Note deleted successfully"})
}

// AddNoteAssociation adds an association between a note and a record
func (h *NoteHandler) AddNoteAssociation(c *gin.Context) {
	var association models.AddNoteAssociation
	if err := c.ShouldBindJSON(&association); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validate record type
	if association.RecordType != "account" && association.RecordType != "contact" && association.RecordType != "opportunity" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid record type. Must be 'account', 'contact', or 'opportunity'"})
		return
	}

	err := h.repo.AddNoteAssociation(association)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Note association added successfully"})
}

// RemoveNoteAssociation removes an association between a note and a record
func (h *NoteHandler) RemoveNoteAssociation(c *gin.Context) {
	var association models.AddNoteAssociation
	if err := c.ShouldBindJSON(&association); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validate record type
	if association.RecordType != "account" && association.RecordType != "contact" && association.RecordType != "opportunity" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid record type. Must be 'account', 'contact', or 'opportunity'"})
		return
	}

	err := h.repo.RemoveNoteAssociation(association)
	if err != nil {
		// Check if the error is "association not found"
		if err.Error() == "no association found for note ID "+association.NoteID.String()+" and record ID "+association.RecordID.String() {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Note association removed successfully"})
}
