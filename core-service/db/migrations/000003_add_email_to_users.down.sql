-- Drop unique constraint
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_email_unique;

-- Drop email column
ALTER TABLE users DROP COLUMN IF EXISTS email; 