package models

import (
	"time"

	"github.com/google/uuid"
)

// Contact represents an individual person in the CRM
type Contact struct {
	ID        uuid.UUID `json:"id"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Email     string    `json:"email,omitempty"`
	Phone     string    `json:"phone,omitempty"`
	Title     string    `json:"title,omitempty"`
	AccountID uuid.UUID `json:"account_id,omitempty"`
	Address   string    `json:"address,omitempty"`
	City      string    `json:"city,omitempty"`
	State     string    `json:"state,omitempty"`
	Zip       string    `json:"zip,omitempty"`
	Country   string    `json:"country,omitempty"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	CreatedBy uuid.UUID `json:"created_by"`
}

// ContactCreate is used for creating a new contact
type ContactCreate struct {
	FirstName string    `json:"first_name" binding:"required"`
	LastName  string    `json:"last_name" binding:"required"`
	Email     string    `json:"email"`
	Phone     string    `json:"phone"`
	Title     string    `json:"title"`
	AccountID uuid.UUID `json:"account_id,omitempty"`
	Address   string    `json:"address"`
	City      string    `json:"city"`
	State     string    `json:"state"`
	Zip       string    `json:"zip"`
	Country   string    `json:"country"`
	CreatedBy uuid.UUID `json:"created_by" binding:"required"`
}

// ContactUpdate is used for updating an existing contact
type ContactUpdate struct {
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Email     string    `json:"email"`
	Phone     string    `json:"phone"`
	Title     string    `json:"title"`
	AccountID uuid.UUID `json:"account_id,omitempty"`
	Address   string    `json:"address"`
	City      string    `json:"city"`
	State     string    `json:"state"`
	Zip       string    `json:"zip"`
	Country   string    `json:"country"`
	UpdatedBy uuid.UUID `json:"updated_by" binding:"required"`
}
