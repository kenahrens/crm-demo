package db

import (
	"database/sql"
	"fmt"

	"golang.org/x/crypto/bcrypt"

	"github.com/google/uuid"
	"github.com/kenahrens/crm-demo/core-service/pkg/models"
)

// UserRepository handles database operations for users
type UserRepository struct {
	db *DB
}

// NewUserRepository creates a new user repository
func NewUserRepository(db *DB) *UserRepository {
	return &UserRepository{db: db}
}

// GetAllUsers retrieves all users from the database
func (r *UserRepository) GetAllUsers() ([]models.User, error) {
	query := `SELECT id, username, email, role, created_at, updated_at FROM users ORDER BY username`
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("error querying users: %w", err)
	}
	defer rows.Close()

	var users []models.User
	for rows.Next() {
		var user models.User
		if err := rows.Scan(
			&user.ID,
			&user.Username,
			&user.Email,
			&user.Role,
			&user.CreatedAt,
			&user.UpdatedAt,
		); err != nil {
			return nil, fmt.Errorf("error scanning user row: %w", err)
		}
		users = append(users, user)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating user rows: %w", err)
	}

	return users, nil
}

// GetUserByID retrieves a single user by ID
func (r *UserRepository) GetUserByID(id uuid.UUID) (*models.User, error) {
	query := `SELECT id, username, email, role, created_at, updated_at FROM users WHERE id = $1`
	var user models.User
	err := r.db.QueryRow(query, id).Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.Role,
		&user.CreatedAt,
		&user.UpdatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // No user found
		}
		return nil, fmt.Errorf("error querying user by ID: %w", err)
	}

	return &user, nil
}

// GetUserByEmail retrieves a single user by email address
func (r *UserRepository) GetUserByEmail(email string) (*models.User, error) {
	query := `SELECT id, username, email, role, created_at, updated_at FROM users WHERE email = $1`
	var user models.User
	err := r.db.QueryRow(query, email).Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.Role,
		&user.CreatedAt,
		&user.UpdatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // No user found
		}
		return nil, fmt.Errorf("error querying user by email: %w", err)
	}

	return &user, nil
}

// CheckUserPassword verifies if the provided credentials are valid
func (r *UserRepository) CheckUserPassword(email, password string) (*models.User, error) {
	query := `SELECT id, username, email, role, password_hash, created_at, updated_at FROM users WHERE email = $1`

	var user models.User
	var passwordHash string

	err := r.db.QueryRow(query, email).Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.Role,
		&passwordHash,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // No user found
		}
		return nil, fmt.Errorf("error querying user credentials: %w", err)
	}

	// Compare password with stored hash
	err = bcrypt.CompareHashAndPassword([]byte(passwordHash), []byte(password))
	if err != nil {
		return nil, nil // Password doesn't match
	}

	return &user, nil
}

// CreateUser creates a new user in the database
func (r *UserRepository) CreateUser(userData models.UserCreate) (*models.User, error) {
	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(userData.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, fmt.Errorf("error hashing password: %w", err)
	}

	query := `INSERT INTO users (username, email, password_hash, role) 
              VALUES ($1, $2, $3, $4) 
              RETURNING id, username, email, role, created_at, updated_at`

	var user models.User
	err = r.db.QueryRow(
		query,
		userData.Username,
		userData.Email,
		string(hashedPassword),
		userData.Role,
	).Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.Role,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return nil, fmt.Errorf("error creating user: %w", err)
	}

	return &user, nil
}
