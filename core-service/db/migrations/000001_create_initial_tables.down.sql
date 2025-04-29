-- Drop indexes
DROP INDEX IF EXISTS idx_note_associations_record;
DROP INDEX IF EXISTS idx_note_associations_note_id;
DROP INDEX IF EXISTS idx_notes_created_by;
DROP INDEX IF EXISTS idx_opportunities_primary_contact_id;
DROP INDEX IF EXISTS idx_opportunities_account_id;
DROP INDEX IF EXISTS idx_contacts_account_id;

-- Drop tables in reverse order of creation to handle dependencies
DROP TABLE IF EXISTS note_associations;
DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS opportunities;
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS accounts; 