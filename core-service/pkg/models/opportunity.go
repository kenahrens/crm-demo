package models

import (
	"time"

	"github.com/google/uuid"
)

// Opportunity represents a sales opportunity in the CRM
type Opportunity struct {
	ID               uuid.UUID  `json:"id"`
	OpportunityName  string     `json:"opportunity_name"`
	AccountID        uuid.UUID  `json:"account_id,omitempty"`
	PrimaryContactID uuid.UUID  `json:"primary_contact_id,omitempty"`
	Stage            string     `json:"stage"`
	Amount           float64    `json:"amount,omitempty"`
	CloseDate        *time.Time `json:"close_date,omitempty"`
	Probability      float64    `json:"probability,omitempty"`
	CreatedAt        time.Time  `json:"created_at"`
	UpdatedAt        time.Time  `json:"updated_at"`
	CreatedBy        uuid.UUID  `json:"created_by"`
}

// OpportunityCreate is used for creating a new opportunity
type OpportunityCreate struct {
	OpportunityName  string    `json:"opportunity_name" binding:"required"`
	AccountID        uuid.UUID `json:"account_id" binding:"required"`
	PrimaryContactID uuid.UUID `json:"primary_contact_id"`
	Stage            string    `json:"stage" binding:"required"`
	Amount           float64   `json:"amount"`
	CloseDate        string    `json:"close_date"`
	Probability      float64   `json:"probability"`
	CreatedBy        uuid.UUID `json:"created_by" binding:"required"`
}

// OpportunityUpdate is used for updating an existing opportunity
type OpportunityUpdate struct {
	OpportunityName  string    `json:"opportunity_name"`
	AccountID        uuid.UUID `json:"account_id"`
	PrimaryContactID uuid.UUID `json:"primary_contact_id"`
	Stage            string    `json:"stage"`
	Amount           float64   `json:"amount"`
	CloseDate        string    `json:"close_date"`
	Probability      float64   `json:"probability"`
	UpdatedBy        uuid.UUID `json:"updated_by" binding:"required"`
}
