package db

import (
	"database/sql"
	"fmt"

	"github.com/google/uuid"
	"github.com/kenahrens/crm-demo/core-service/pkg/models"
)

// NoteRepository handles database operations for notes
type NoteRepository struct {
	db *DB
}

// NewNoteRepository creates a new note repository
func NewNoteRepository(db *DB) *NoteRepository {
	return &NoteRepository{db: db}
}

// GetAllNotes retrieves all notes from the database
func (r *NoteRepository) GetAllNotes() ([]models.Note, error) {
	query := `SELECT id, content, created_by, created_at, updated_at FROM notes ORDER BY created_at DESC`
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("error querying notes: %w", err)
	}
	defer rows.Close()

	var notes []models.Note
	for rows.Next() {
		var note models.Note
		var createdBy sql.NullString // Handle NULL values

		if err := rows.Scan(
			&note.ID,
			&note.Content,
			&createdBy,
			&note.CreatedAt,
			&note.UpdatedAt,
		); err != nil {
			return nil, fmt.Errorf("error scanning note row: %w", err)
		}

		// Convert NullString to UUID if valid
		if createdBy.Valid {
			parsedID, err := uuid.Parse(createdBy.String)
			if err != nil {
				return nil, fmt.Errorf("error parsing user ID: %w", err)
			}
			note.CreatedBy = parsedID
		}

		// Get note associations
		associationsQuery := `SELECT record_id, record_type FROM note_associations WHERE note_id = $1`
		associationRows, err := r.db.Query(associationsQuery, note.ID)
		if err != nil {
			return nil, fmt.Errorf("error querying note associations: %w", err)
		}

		var associations []models.RecordAssociation
		for associationRows.Next() {
			var association models.RecordAssociation
			if err := associationRows.Scan(&association.RecordID, &association.RecordType); err != nil {
				associationRows.Close()
				return nil, fmt.Errorf("error scanning note association row: %w", err)
			}
			associations = append(associations, association)
		}
		associationRows.Close()

		if err := associationRows.Err(); err != nil {
			return nil, fmt.Errorf("error iterating note association rows: %w", err)
		}

		note.Records = associations
		notes = append(notes, note)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating note rows: %w", err)
	}

	return notes, nil
}

// GetNoteByID retrieves a single note by ID
func (r *NoteRepository) GetNoteByID(id uuid.UUID) (*models.Note, error) {
	query := `SELECT id, content, created_by, created_at, updated_at FROM notes WHERE id = $1`

	var note models.Note
	var createdBy sql.NullString // Handle NULL values

	err := r.db.QueryRow(query, id).Scan(
		&note.ID,
		&note.Content,
		&createdBy,
		&note.CreatedAt,
		&note.UpdatedAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // No note found
		}
		return nil, fmt.Errorf("error querying note by ID: %w", err)
	}

	// Convert NullString to UUID if valid
	if createdBy.Valid {
		parsedID, err := uuid.Parse(createdBy.String)
		if err != nil {
			return nil, fmt.Errorf("error parsing user ID: %w", err)
		}
		note.CreatedBy = parsedID
	}

	// Get note associations
	associationsQuery := `SELECT record_id, record_type FROM note_associations WHERE note_id = $1`
	associationRows, err := r.db.Query(associationsQuery, note.ID)
	if err != nil {
		return nil, fmt.Errorf("error querying note associations: %w", err)
	}
	defer associationRows.Close()

	var associations []models.RecordAssociation
	for associationRows.Next() {
		var association models.RecordAssociation
		if err := associationRows.Scan(&association.RecordID, &association.RecordType); err != nil {
			return nil, fmt.Errorf("error scanning note association row: %w", err)
		}
		associations = append(associations, association)
	}

	if err := associationRows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating note association rows: %w", err)
	}

	note.Records = associations
	return &note, nil
}

// GetNotesByRecordID retrieves all notes for a specific record (account, contact, opportunity)
func (r *NoteRepository) GetNotesByRecordID(recordID uuid.UUID, recordType string) ([]models.Note, error) {
	query := `
		SELECT n.id, n.content, n.created_by, n.created_at, n.updated_at 
		FROM notes n
		JOIN note_associations na ON n.id = na.note_id
		WHERE na.record_id = $1 AND na.record_type = $2
		ORDER BY n.created_at DESC
	`

	rows, err := r.db.Query(query, recordID, recordType)
	if err != nil {
		return nil, fmt.Errorf("error querying notes by record: %w", err)
	}
	defer rows.Close()

	var notes []models.Note
	for rows.Next() {
		var note models.Note
		var createdBy sql.NullString // Handle NULL values

		if err := rows.Scan(
			&note.ID,
			&note.Content,
			&createdBy,
			&note.CreatedAt,
			&note.UpdatedAt,
		); err != nil {
			return nil, fmt.Errorf("error scanning note row: %w", err)
		}

		// Convert NullString to UUID if valid
		if createdBy.Valid {
			parsedID, err := uuid.Parse(createdBy.String)
			if err != nil {
				return nil, fmt.Errorf("error parsing user ID: %w", err)
			}
			note.CreatedBy = parsedID
		}

		// Get note associations
		associationsQuery := `SELECT record_id, record_type FROM note_associations WHERE note_id = $1`
		associationRows, err := r.db.Query(associationsQuery, note.ID)
		if err != nil {
			return nil, fmt.Errorf("error querying note associations: %w", err)
		}

		var associations []models.RecordAssociation
		for associationRows.Next() {
			var association models.RecordAssociation
			if err := associationRows.Scan(&association.RecordID, &association.RecordType); err != nil {
				associationRows.Close()
				return nil, fmt.Errorf("error scanning note association row: %w", err)
			}
			associations = append(associations, association)
		}
		associationRows.Close()

		if err := associationRows.Err(); err != nil {
			return nil, fmt.Errorf("error iterating note association rows: %w", err)
		}

		note.Records = associations
		notes = append(notes, note)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating note rows: %w", err)
	}

	return notes, nil
}

// CreateNote creates a new note in the database with associations
func (r *NoteRepository) CreateNote(data models.NoteCreate) (*models.Note, error) {
	// Start a transaction
	tx, err := r.db.Begin()
	if err != nil {
		return nil, fmt.Errorf("error starting transaction: %w", err)
	}

	// Defer a rollback in case anything fails
	defer tx.Rollback()

	// Insert the note
	noteQuery := `INSERT INTO notes (content, created_by) 
               VALUES ($1, $2) 
               RETURNING id, content, created_by, created_at, updated_at`

	var note models.Note
	var createdByParam interface{} = nil
	if data.CreatedBy != uuid.Nil {
		createdByParam = data.CreatedBy
	}

	err = tx.QueryRow(
		noteQuery,
		data.Content,
		createdByParam,
	).Scan(
		&note.ID,
		&note.Content,
		&note.CreatedBy,
		&note.CreatedAt,
		&note.UpdatedAt,
	)

	if err != nil {
		return nil, fmt.Errorf("error creating note: %w", err)
	}

	// Insert the note associations
	for _, record := range data.Records {
		associationQuery := `INSERT INTO note_associations (note_id, record_id, record_type) VALUES ($1, $2, $3)`
		_, err = tx.Exec(associationQuery, note.ID, record.RecordID, record.RecordType)
		if err != nil {
			return nil, fmt.Errorf("error creating note association: %w", err)
		}
	}

	// Commit the transaction
	if err := tx.Commit(); err != nil {
		return nil, fmt.Errorf("error committing transaction: %w", err)
	}

	note.Records = data.Records
	return &note, nil
}

// UpdateNote updates an existing note in the database
func (r *NoteRepository) UpdateNote(id uuid.UUID, data models.NoteUpdate) (*models.Note, error) {
	query := `UPDATE notes SET 
              content = COALESCE(NULLIF($1, ''), content),
              updated_at = NOW()
              WHERE id = $2
              RETURNING id, content, created_by, created_at, updated_at`

	var note models.Note
	err := r.db.QueryRow(
		query,
		data.Content,
		id,
	).Scan(
		&note.ID,
		&note.Content,
		&note.CreatedBy,
		&note.CreatedAt,
		&note.UpdatedAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // No note found with this ID
		}
		return nil, fmt.Errorf("error updating note: %w", err)
	}

	// Get note associations
	associationsQuery := `SELECT record_id, record_type FROM note_associations WHERE note_id = $1`
	associationRows, err := r.db.Query(associationsQuery, note.ID)
	if err != nil {
		return nil, fmt.Errorf("error querying note associations: %w", err)
	}
	defer associationRows.Close()

	var associations []models.RecordAssociation
	for associationRows.Next() {
		var association models.RecordAssociation
		if err := associationRows.Scan(&association.RecordID, &association.RecordType); err != nil {
			return nil, fmt.Errorf("error scanning note association row: %w", err)
		}
		associations = append(associations, association)
	}

	if err := associationRows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating note association rows: %w", err)
	}

	note.Records = associations
	return &note, nil
}

// DeleteNote deletes a note and its associations from the database
func (r *NoteRepository) DeleteNote(id uuid.UUID) error {
	// Start a transaction
	tx, err := r.db.Begin()
	if err != nil {
		return fmt.Errorf("error starting transaction: %w", err)
	}

	// Defer a rollback in case anything fails
	defer tx.Rollback()

	// Delete note associations first (foreign key constraints)
	_, err = tx.Exec(`DELETE FROM note_associations WHERE note_id = $1`, id)
	if err != nil {
		return fmt.Errorf("error deleting note associations: %w", err)
	}

	// Delete the note
	result, err := tx.Exec(`DELETE FROM notes WHERE id = $1`, id)
	if err != nil {
		return fmt.Errorf("error deleting note: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("error getting rows affected: %w", err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("no note found with ID %s", id)
	}

	// Commit the transaction
	if err := tx.Commit(); err != nil {
		return fmt.Errorf("error committing transaction: %w", err)
	}

	return nil
}

// AddNoteAssociation adds an association between a note and a record
func (r *NoteRepository) AddNoteAssociation(association models.AddNoteAssociation) error {
	query := `INSERT INTO note_associations (note_id, record_id, record_type) VALUES ($1, $2, $3)`
	_, err := r.db.Exec(query, association.NoteID, association.RecordID, association.RecordType)
	if err != nil {
		return fmt.Errorf("error adding note association: %w", err)
	}
	return nil
}

// RemoveNoteAssociation removes an association between a note and a record
func (r *NoteRepository) RemoveNoteAssociation(association models.AddNoteAssociation) error {
	query := `DELETE FROM note_associations WHERE note_id = $1 AND record_id = $2 AND record_type = $3`
	result, err := r.db.Exec(query, association.NoteID, association.RecordID, association.RecordType)
	if err != nil {
		return fmt.Errorf("error removing note association: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("error getting rows affected: %w", err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("no association found for note ID %s and record ID %s", association.NoteID, association.RecordID)
	}

	return nil
}
