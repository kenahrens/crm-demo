package db

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/kenahrens/crm-demo/core-service/pkg/models"
)

// OpportunityRepository handles database operations for opportunities
type OpportunityRepository struct {
	db *DB
}

// NewOpportunityRepository creates a new opportunity repository
func NewOpportunityRepository(db *DB) *OpportunityRepository {
	return &OpportunityRepository{db: db}
}

// GetAllOpportunities retrieves all opportunities from the database
func (r *OpportunityRepository) GetAllOpportunities() ([]models.Opportunity, error) {
	query := `SELECT id, opportunity_name, account_id, primary_contact_id, stage, amount, close_date, probability, created_at, updated_at 
              FROM opportunities ORDER BY close_date, opportunity_name`
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("error querying opportunities: %w", err)
	}
	defer rows.Close()

	var opportunities []models.Opportunity
	for rows.Next() {
		var opportunity models.Opportunity
		var accountID, primaryContactID sql.NullString // Handle NULL values
		var closeDate sql.NullTime
		var amount, probability sql.NullFloat64

		if err := rows.Scan(
			&opportunity.ID,
			&opportunity.OpportunityName,
			&accountID,
			&primaryContactID,
			&opportunity.Stage,
			&amount,
			&closeDate,
			&probability,
			&opportunity.CreatedAt,
			&opportunity.UpdatedAt,
		); err != nil {
			return nil, fmt.Errorf("error scanning opportunity row: %w", err)
		}

		// Convert NullString to UUID if valid
		if accountID.Valid {
			parsedID, err := uuid.Parse(accountID.String)
			if err != nil {
				return nil, fmt.Errorf("error parsing account ID: %w", err)
			}
			opportunity.AccountID = parsedID
		}

		if primaryContactID.Valid {
			parsedID, err := uuid.Parse(primaryContactID.String)
			if err != nil {
				return nil, fmt.Errorf("error parsing primary contact ID: %w", err)
			}
			opportunity.PrimaryContactID = parsedID
		}

		// Handle nullable fields
		if amount.Valid {
			opportunity.Amount = amount.Float64
		}

		if closeDate.Valid {
			opportunity.CloseDate = &closeDate.Time
		}

		if probability.Valid {
			opportunity.Probability = probability.Float64
		}

		opportunities = append(opportunities, opportunity)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating opportunity rows: %w", err)
	}

	return opportunities, nil
}

// GetOpportunityByID retrieves a single opportunity by ID
func (r *OpportunityRepository) GetOpportunityByID(id uuid.UUID) (*models.Opportunity, error) {
	query := `SELECT id, opportunity_name, account_id, primary_contact_id, stage, amount, close_date, probability, created_at, updated_at 
              FROM opportunities WHERE id = $1`

	var opportunity models.Opportunity
	var accountID, primaryContactID sql.NullString // Handle NULL values
	var closeDate sql.NullTime
	var amount, probability sql.NullFloat64

	err := r.db.QueryRow(query, id).Scan(
		&opportunity.ID,
		&opportunity.OpportunityName,
		&accountID,
		&primaryContactID,
		&opportunity.Stage,
		&amount,
		&closeDate,
		&probability,
		&opportunity.CreatedAt,
		&opportunity.UpdatedAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // No opportunity found
		}
		return nil, fmt.Errorf("error querying opportunity by ID: %w", err)
	}

	// Convert NullString to UUID if valid
	if accountID.Valid {
		parsedID, err := uuid.Parse(accountID.String)
		if err != nil {
			return nil, fmt.Errorf("error parsing account ID: %w", err)
		}
		opportunity.AccountID = parsedID
	}

	if primaryContactID.Valid {
		parsedID, err := uuid.Parse(primaryContactID.String)
		if err != nil {
			return nil, fmt.Errorf("error parsing primary contact ID: %w", err)
		}
		opportunity.PrimaryContactID = parsedID
	}

	// Handle nullable fields
	if amount.Valid {
		opportunity.Amount = amount.Float64
	}

	if closeDate.Valid {
		opportunity.CloseDate = &closeDate.Time
	}

	if probability.Valid {
		opportunity.Probability = probability.Float64
	}

	return &opportunity, nil
}

// GetOpportunitiesByAccountID retrieves all opportunities for a specific account
func (r *OpportunityRepository) GetOpportunitiesByAccountID(accountID uuid.UUID) ([]models.Opportunity, error) {
	query := `SELECT id, opportunity_name, account_id, primary_contact_id, stage, amount, close_date, probability, created_at, updated_at 
              FROM opportunities WHERE account_id = $1 ORDER BY close_date, opportunity_name`
	rows, err := r.db.Query(query, accountID)
	if err != nil {
		return nil, fmt.Errorf("error querying opportunities by account ID: %w", err)
	}
	defer rows.Close()

	var opportunities []models.Opportunity
	for rows.Next() {
		var opportunity models.Opportunity
		var primaryContactID sql.NullString // Handle NULL values
		var closeDate sql.NullTime
		var amount, probability sql.NullFloat64

		if err := rows.Scan(
			&opportunity.ID,
			&opportunity.OpportunityName,
			&opportunity.AccountID,
			&primaryContactID,
			&opportunity.Stage,
			&amount,
			&closeDate,
			&probability,
			&opportunity.CreatedAt,
			&opportunity.UpdatedAt,
		); err != nil {
			return nil, fmt.Errorf("error scanning opportunity row: %w", err)
		}

		// Convert NullString to UUID if valid
		if primaryContactID.Valid {
			parsedID, err := uuid.Parse(primaryContactID.String)
			if err != nil {
				return nil, fmt.Errorf("error parsing primary contact ID: %w", err)
			}
			opportunity.PrimaryContactID = parsedID
		}

		// Handle nullable fields
		if amount.Valid {
			opportunity.Amount = amount.Float64
		}

		if closeDate.Valid {
			opportunity.CloseDate = &closeDate.Time
		}

		if probability.Valid {
			opportunity.Probability = probability.Float64
		}

		opportunities = append(opportunities, opportunity)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating opportunity rows: %w", err)
	}

	return opportunities, nil
}

// CreateOpportunity creates a new opportunity in the database
func (r *OpportunityRepository) CreateOpportunity(data models.OpportunityCreate) (*models.Opportunity, error) {
	query := `INSERT INTO opportunities (opportunity_name, account_id, primary_contact_id, stage, amount, close_date, probability) 
              VALUES ($1, $2, $3, $4, $5, $6, $7) 
              RETURNING id, opportunity_name, account_id, primary_contact_id, stage, amount, close_date, probability, created_at, updated_at`

	var closeDate *time.Time
	if data.CloseDate != "" {
		t, err := time.Parse("2006-01-02", data.CloseDate)
		if err != nil {
			return nil, fmt.Errorf("invalid close date format (should be YYYY-MM-DD): %w", err)
		}
		closeDate = &t
	}

	var opportunity models.Opportunity
	var primaryContactID interface{} = nil
	if data.PrimaryContactID != uuid.Nil {
		primaryContactID = data.PrimaryContactID
	}

	var closeDateParam interface{} = nil
	if closeDate != nil {
		closeDateParam = closeDate
	}

	var amount, probability interface{} = nil, nil
	if data.Amount != 0 {
		amount = data.Amount
	}
	if data.Probability != 0 {
		probability = data.Probability
	}

	err := r.db.QueryRow(
		query,
		data.OpportunityName,
		data.AccountID,
		primaryContactID,
		data.Stage,
		amount,
		closeDateParam,
		probability,
	).Scan(
		&opportunity.ID,
		&opportunity.OpportunityName,
		&opportunity.AccountID,
		&opportunity.PrimaryContactID,
		&opportunity.Stage,
		&opportunity.Amount,
		&opportunity.CloseDate,
		&opportunity.Probability,
		&opportunity.CreatedAt,
		&opportunity.UpdatedAt,
	)

	if err != nil {
		return nil, fmt.Errorf("error creating opportunity: %w", err)
	}

	return &opportunity, nil
}

// UpdateOpportunity updates an existing opportunity in the database
func (r *OpportunityRepository) UpdateOpportunity(id uuid.UUID, data models.OpportunityUpdate) (*models.Opportunity, error) {
	// Parse close date if provided
	var closeDate *time.Time
	if data.CloseDate != "" {
		t, err := time.Parse("2006-01-02", data.CloseDate)
		if err != nil {
			return nil, fmt.Errorf("invalid close date format (should be YYYY-MM-DD): %w", err)
		}
		closeDate = &t
	}

	query := `UPDATE opportunities SET 
              opportunity_name = COALESCE(NULLIF($1, ''), opportunity_name),
              account_id = $2,
              primary_contact_id = $3,
              stage = COALESCE(NULLIF($4, ''), stage),
              amount = $5,
              close_date = $6,
              probability = $7,
              updated_at = NOW()
              WHERE id = $8
              RETURNING id, opportunity_name, account_id, primary_contact_id, stage, amount, close_date, probability, created_at, updated_at`

	var opportunity models.Opportunity
	var primaryContactID interface{} = nil
	var accountID interface{} = nil

	if data.PrimaryContactID != uuid.Nil {
		primaryContactID = data.PrimaryContactID
	}

	if data.AccountID != uuid.Nil {
		accountID = data.AccountID
	}

	var closeDateParam interface{} = nil
	if closeDate != nil {
		closeDateParam = closeDate
	}

	var amount, probability interface{} = nil, nil
	if data.Amount != 0 {
		amount = data.Amount
	}
	if data.Probability != 0 {
		probability = data.Probability
	}

	err := r.db.QueryRow(
		query,
		data.OpportunityName,
		accountID,
		primaryContactID,
		data.Stage,
		amount,
		closeDateParam,
		probability,
		id,
	).Scan(
		&opportunity.ID,
		&opportunity.OpportunityName,
		&opportunity.AccountID,
		&opportunity.PrimaryContactID,
		&opportunity.Stage,
		&opportunity.Amount,
		&opportunity.CloseDate,
		&opportunity.Probability,
		&opportunity.CreatedAt,
		&opportunity.UpdatedAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // No opportunity found with this ID
		}
		return nil, fmt.Errorf("error updating opportunity: %w", err)
	}

	return &opportunity, nil
}

// DeleteOpportunity deletes an opportunity from the database
func (r *OpportunityRepository) DeleteOpportunity(id uuid.UUID) error {
	query := `DELETE FROM opportunities WHERE id = $1`
	result, err := r.db.Exec(query, id)
	if err != nil {
		return fmt.Errorf("error deleting opportunity: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("error getting rows affected: %w", err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("no opportunity found with ID %s", id)
	}

	return nil
}
