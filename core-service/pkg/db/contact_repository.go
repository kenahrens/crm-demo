package db

import (
	"database/sql"
	"fmt"

	"github.com/google/uuid"
	"github.com/kenahrens/crm-demo/core-service/pkg/models"
)

// ContactRepository handles database operations for contacts
type ContactRepository struct {
	db *DB
}

// NewContactRepository creates a new contact repository
func NewContactRepository(db *DB) *ContactRepository {
	return &ContactRepository{db: db}
}

// GetAllContacts retrieves all contacts from the database
func (r *ContactRepository) GetAllContacts() ([]models.Contact, error) {
	query := `SELECT id, first_name, last_name, email, phone, title, account_id, address, city, state, zip, country, created_at, updated_at 
              FROM contacts ORDER BY last_name, first_name`
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("error querying contacts: %w", err)
	}
	defer rows.Close()

	var contacts []models.Contact
	for rows.Next() {
		var contact models.Contact
		var accountID sql.NullString // Handle NULL account_id
		if err := rows.Scan(
			&contact.ID,
			&contact.FirstName,
			&contact.LastName,
			&contact.Email,
			&contact.Phone,
			&contact.Title,
			&accountID,
			&contact.Address,
			&contact.City,
			&contact.State,
			&contact.Zip,
			&contact.Country,
			&contact.CreatedAt,
			&contact.UpdatedAt,
		); err != nil {
			return nil, fmt.Errorf("error scanning contact row: %w", err)
		}

		// Convert NullString to UUID if valid
		if accountID.Valid {
			parsedID, err := uuid.Parse(accountID.String)
			if err != nil {
				return nil, fmt.Errorf("error parsing account ID: %w", err)
			}
			contact.AccountID = parsedID
		}

		contacts = append(contacts, contact)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating contact rows: %w", err)
	}

	return contacts, nil
}

// GetContactByID retrieves a single contact by ID
func (r *ContactRepository) GetContactByID(id uuid.UUID) (*models.Contact, error) {
	query := `SELECT id, first_name, last_name, email, phone, title, account_id, address, city, state, zip, country, created_at, updated_at 
              FROM contacts WHERE id = $1`
	var contact models.Contact
	var accountID sql.NullString // Handle NULL account_id
	err := r.db.QueryRow(query, id).Scan(
		&contact.ID,
		&contact.FirstName,
		&contact.LastName,
		&contact.Email,
		&contact.Phone,
		&contact.Title,
		&accountID,
		&contact.Address,
		&contact.City,
		&contact.State,
		&contact.Zip,
		&contact.Country,
		&contact.CreatedAt,
		&contact.UpdatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // No contact found
		}
		return nil, fmt.Errorf("error querying contact by ID: %w", err)
	}

	// Convert NullString to UUID if valid
	if accountID.Valid {
		parsedID, err := uuid.Parse(accountID.String)
		if err != nil {
			return nil, fmt.Errorf("error parsing account ID: %w", err)
		}
		contact.AccountID = parsedID
	}

	return &contact, nil
}

// GetContactsByAccountID retrieves all contacts for a specific account
func (r *ContactRepository) GetContactsByAccountID(accountID uuid.UUID) ([]models.Contact, error) {
	query := `SELECT id, first_name, last_name, email, phone, title, account_id, address, city, state, zip, country, created_at, updated_at 
              FROM contacts WHERE account_id = $1 ORDER BY last_name, first_name`
	rows, err := r.db.Query(query, accountID)
	if err != nil {
		return nil, fmt.Errorf("error querying contacts by account ID: %w", err)
	}
	defer rows.Close()

	var contacts []models.Contact
	for rows.Next() {
		var contact models.Contact
		if err := rows.Scan(
			&contact.ID,
			&contact.FirstName,
			&contact.LastName,
			&contact.Email,
			&contact.Phone,
			&contact.Title,
			&contact.AccountID,
			&contact.Address,
			&contact.City,
			&contact.State,
			&contact.Zip,
			&contact.Country,
			&contact.CreatedAt,
			&contact.UpdatedAt,
		); err != nil {
			return nil, fmt.Errorf("error scanning contact row: %w", err)
		}
		contacts = append(contacts, contact)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating contact rows: %w", err)
	}

	return contacts, nil
}

// CreateContact creates a new contact in the database
func (r *ContactRepository) CreateContact(contactData models.ContactCreate) (*models.Contact, error) {
	query := `INSERT INTO contacts (first_name, last_name, email, phone, title, account_id, address, city, state, zip, country) 
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
              RETURNING id, first_name, last_name, email, phone, title, account_id, address, city, state, zip, country, created_at, updated_at`

	var contact models.Contact
	var accountID interface{} = nil
	if contactData.AccountID != uuid.Nil {
		accountID = contactData.AccountID
	}

	err := r.db.QueryRow(
		query,
		contactData.FirstName,
		contactData.LastName,
		contactData.Email,
		contactData.Phone,
		contactData.Title,
		accountID,
		contactData.Address,
		contactData.City,
		contactData.State,
		contactData.Zip,
		contactData.Country,
	).Scan(
		&contact.ID,
		&contact.FirstName,
		&contact.LastName,
		&contact.Email,
		&contact.Phone,
		&contact.Title,
		&contact.AccountID,
		&contact.Address,
		&contact.City,
		&contact.State,
		&contact.Zip,
		&contact.Country,
		&contact.CreatedAt,
		&contact.UpdatedAt,
	)

	if err != nil {
		return nil, fmt.Errorf("error creating contact: %w", err)
	}

	return &contact, nil
}

// UpdateContact updates an existing contact in the database
func (r *ContactRepository) UpdateContact(id uuid.UUID, contactData models.ContactUpdate) (*models.Contact, error) {
	query := `UPDATE contacts SET 
              first_name = COALESCE(NULLIF($1, ''), first_name),
              last_name = COALESCE(NULLIF($2, ''), last_name),
              email = COALESCE(NULLIF($3, ''), email),
              phone = COALESCE(NULLIF($4, ''), phone),
              title = COALESCE(NULLIF($5, ''), title),
              account_id = $6,
              address = COALESCE(NULLIF($7, ''), address),
              city = COALESCE(NULLIF($8, ''), city),
              state = COALESCE(NULLIF($9, ''), state),
              zip = COALESCE(NULLIF($10, ''), zip),
              country = COALESCE(NULLIF($11, ''), country),
              updated_at = NOW()
              WHERE id = $12
              RETURNING id, first_name, last_name, email, phone, title, account_id, address, city, state, zip, country, created_at, updated_at`

	var contact models.Contact
	var accountID interface{} = nil
	if contactData.AccountID != uuid.Nil {
		accountID = contactData.AccountID
	}

	err := r.db.QueryRow(
		query,
		contactData.FirstName,
		contactData.LastName,
		contactData.Email,
		contactData.Phone,
		contactData.Title,
		accountID,
		contactData.Address,
		contactData.City,
		contactData.State,
		contactData.Zip,
		contactData.Country,
		id,
	).Scan(
		&contact.ID,
		&contact.FirstName,
		&contact.LastName,
		&contact.Email,
		&contact.Phone,
		&contact.Title,
		&contact.AccountID,
		&contact.Address,
		&contact.City,
		&contact.State,
		&contact.Zip,
		&contact.Country,
		&contact.CreatedAt,
		&contact.UpdatedAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // No contact found with this ID
		}
		return nil, fmt.Errorf("error updating contact: %w", err)
	}

	return &contact, nil
}

// DeleteContact deletes a contact from the database
func (r *ContactRepository) DeleteContact(id uuid.UUID) error {
	query := `DELETE FROM contacts WHERE id = $1`
	result, err := r.db.Exec(query, id)
	if err != nil {
		return fmt.Errorf("error deleting contact: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("error getting rows affected: %w", err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("no contact found with ID %s", id)
	}

	return nil
}
