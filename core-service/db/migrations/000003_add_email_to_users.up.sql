-- Add email field to users table and make it unique
ALTER TABLE users ADD COLUMN email VARCHAR(255);

-- Update existing users with placeholder emails
UPDATE users SET email = CONCAT(username, '@example.com') WHERE email IS NULL;

-- Update constraint to make email required and unique
ALTER TABLE users ADD CONSTRAINT users_email_unique UNIQUE (email);

-- Make email non-null for new records
ALTER TABLE users ALTER COLUMN email SET NOT NULL; 