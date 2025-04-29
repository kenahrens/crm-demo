package models

import (
	"time"

	"github.com/google/uuid"
)

// Note represents a note entry in the CRM
type Note struct {
	ID        uuid.UUID           `json:"id"`
	Content   string              `json:"content"`
	CreatedBy uuid.UUID           `json:"created_by"`
	CreatedAt time.Time           `json:"created_at"`
	UpdatedAt time.Time           `json:"updated_at"`
	Records   []RecordAssociation `json:"records,omitempty"`
}

// RecordAssociation represents a link between a note and a CRM record (Account, Contact, or Opportunity)
type RecordAssociation struct {
	RecordID   uuid.UUID `json:"record_id"`
	RecordType string    `json:"record_type"` // "account", "contact", "opportunity"
}

// NoteCreate is used for creating a new note
type NoteCreate struct {
	Content   string              `json:"content" binding:"required"`
	CreatedBy uuid.UUID           `json:"created_by" binding:"required"`
	Records   []RecordAssociation `json:"records" binding:"required"`
}

// NoteUpdate is used for updating an existing note
type NoteUpdate struct {
	Content   string    `json:"content"`
	UpdatedBy uuid.UUID `json:"updated_by" binding:"required"`
}

// AddNoteAssociation is used to associate a note with a record
type AddNoteAssociation struct {
	NoteID     uuid.UUID `json:"note_id" binding:"required"`
	RecordID   uuid.UUID `json:"record_id" binding:"required"`
	RecordType string    `json:"record_type" binding:"required"`
	CreatedBy  uuid.UUID `json:"created_by" binding:"required"`
}
