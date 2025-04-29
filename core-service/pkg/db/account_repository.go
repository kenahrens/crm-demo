package db

import (
	"database/sql"
	"fmt"

	"github.com/google/uuid"
	"github.com/kenahrens/crm-demo/core-service/pkg/models"
)

// AccountRepository handles database operations for accounts
type AccountRepository struct {
	db *DB
}

// NewAccountRepository creates a new account repository
func NewAccountRepository(db *DB) *AccountRepository {
	return &AccountRepository{db: db}
}

// GetAllAccounts retrieves all accounts from the database
func (r *AccountRepository) GetAllAccounts() ([]models.Account, error) {
	query := `SELECT id, name, industry, website, phone, address, city, state, zip, country, created_at, updated_at, created_by FROM accounts ORDER BY name`
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("error querying accounts: %w", err)
	}
	defer rows.Close()

	var accounts []models.Account
	for rows.Next() {
		var account models.Account
		if err := rows.Scan(
			&account.ID,
			&account.Name,
			&account.Industry,
			&account.Website,
			&account.Phone,
			&account.Address,
			&account.City,
			&account.State,
			&account.Zip,
			&account.Country,
			&account.CreatedAt,
			&account.UpdatedAt,
			&account.CreatedBy,
		); err != nil {
			return nil, fmt.Errorf("error scanning account row: %w", err)
		}
		accounts = append(accounts, account)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating account rows: %w", err)
	}

	return accounts, nil
}

// GetAccountByID retrieves a single account by ID
func (r *AccountRepository) GetAccountByID(id uuid.UUID) (*models.Account, error) {
	query := `SELECT id, name, industry, website, phone, address, city, state, zip, country, created_at, updated_at, created_by FROM accounts WHERE id = $1`
	var account models.Account
	err := r.db.QueryRow(query, id).Scan(
		&account.ID,
		&account.Name,
		&account.Industry,
		&account.Website,
		&account.Phone,
		&account.Address,
		&account.City,
		&account.State,
		&account.Zip,
		&account.Country,
		&account.CreatedAt,
		&account.UpdatedAt,
		&account.CreatedBy,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // No account found
		}
		return nil, fmt.Errorf("error querying account by ID: %w", err)
	}

	// Get associated contacts
	contactsQuery := `SELECT id, first_name, last_name, email, phone, title, account_id, address, city, state, zip, country, created_at, updated_at 
                      FROM contacts WHERE account_id = $1 ORDER BY last_name, first_name`
	contactRows, err := r.db.Query(contactsQuery, id)
	if err != nil {
		return nil, fmt.Errorf("error querying contacts for account: %w", err)
	}
	defer contactRows.Close()

	var contacts []models.Contact
	for contactRows.Next() {
		var contact models.Contact
		if err := contactRows.Scan(
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

	account.Contacts = contacts
	return &account, nil
}

// CreateAccount creates a new account in the database
func (r *AccountRepository) CreateAccount(accountData models.AccountCreate) (*models.Account, error) {
	query := `INSERT INTO accounts (name, industry, website, phone, address, city, state, zip, country, created_by) 
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
              RETURNING id, name, industry, website, phone, address, city, state, zip, country, created_at, updated_at, created_by`

	var account models.Account
	err := r.db.QueryRow(
		query,
		accountData.Name,
		accountData.Industry,
		accountData.Website,
		accountData.Phone,
		accountData.Address,
		accountData.City,
		accountData.State,
		accountData.Zip,
		accountData.Country,
		accountData.CreatedBy,
	).Scan(
		&account.ID,
		&account.Name,
		&account.Industry,
		&account.Website,
		&account.Phone,
		&account.Address,
		&account.City,
		&account.State,
		&account.Zip,
		&account.Country,
		&account.CreatedAt,
		&account.UpdatedAt,
		&account.CreatedBy,
	)

	if err != nil {
		return nil, fmt.Errorf("error creating account: %w", err)
	}

	return &account, nil
}

// UpdateAccount updates an existing account in the database
func (r *AccountRepository) UpdateAccount(id uuid.UUID, accountData models.AccountUpdate) (*models.Account, error) {
	query := `UPDATE accounts SET 
              name = COALESCE(NULLIF($1, ''), name),
              industry = COALESCE(NULLIF($2, ''), industry),
              website = COALESCE(NULLIF($3, ''), website),
              phone = COALESCE(NULLIF($4, ''), phone),
              address = COALESCE(NULLIF($5, ''), address),
              city = COALESCE(NULLIF($6, ''), city),
              state = COALESCE(NULLIF($7, ''), state),
              zip = COALESCE(NULLIF($8, ''), zip),
              country = COALESCE(NULLIF($9, ''), country),
              updated_at = NOW()
              WHERE id = $10
              RETURNING id, name, industry, website, phone, address, city, state, zip, country, created_at, updated_at, created_by`

	var account models.Account
	err := r.db.QueryRow(
		query,
		accountData.Name,
		accountData.Industry,
		accountData.Website,
		accountData.Phone,
		accountData.Address,
		accountData.City,
		accountData.State,
		accountData.Zip,
		accountData.Country,
		id,
	).Scan(
		&account.ID,
		&account.Name,
		&account.Industry,
		&account.Website,
		&account.Phone,
		&account.Address,
		&account.City,
		&account.State,
		&account.Zip,
		&account.Country,
		&account.CreatedAt,
		&account.UpdatedAt,
		&account.CreatedBy,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // No account found with this ID
		}
		return nil, fmt.Errorf("error updating account: %w", err)
	}

	return &account, nil
}

// DeleteAccount deletes an account from the database
func (r *AccountRepository) DeleteAccount(id uuid.UUID) error {
	query := `DELETE FROM accounts WHERE id = $1`
	result, err := r.db.Exec(query, id)
	if err != nil {
		return fmt.Errorf("error deleting account: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("error getting rows affected: %w", err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("no account found with ID %s", id)
	}

	return nil
}
