package models

import (
	"time"

	"github.com/google/uuid"
)

// Account represents a company or organization in the CRM
type Account struct {
	ID        uuid.UUID `json:"id"`
	Name      string    `json:"name"`
	Industry  string    `json:"industry,omitempty"`
	Website   string    `json:"website,omitempty"`
	Phone     string    `json:"phone,omitempty"`
	Address   string    `json:"address,omitempty"`
	City      string    `json:"city,omitempty"`
	State     string    `json:"state,omitempty"`
	Zip       string    `json:"zip,omitempty"`
	Country   string    `json:"country,omitempty"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	CreatedBy uuid.UUID `json:"created_by"`
	Contacts  []Contact `json:"contacts,omitempty"`
}

// AccountCreate is used for creating a new account
type AccountCreate struct {
	Name      string    `json:"name" binding:"required"`
	Industry  string    `json:"industry"`
	Website   string    `json:"website"`
	Phone     string    `json:"phone"`
	Address   string    `json:"address"`
	City      string    `json:"city"`
	State     string    `json:"state"`
	Zip       string    `json:"zip"`
	Country   string    `json:"country"`
	CreatedBy uuid.UUID `json:"created_by" binding:"required"`
}

// AccountUpdate is used for updating an existing account
type AccountUpdate struct {
	Name      string    `json:"name"`
	Industry  string    `json:"industry"`
	Website   string    `json:"website"`
	Phone     string    `json:"phone"`
	Address   string    `json:"address"`
	City      string    `json:"city"`
	State     string    `json:"state"`
	Zip       string    `json:"zip"`
	Country   string    `json:"country"`
	UpdatedBy uuid.UUID `json:"updated_by" binding:"required"`
}
