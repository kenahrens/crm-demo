-- First ensure there's at least one admin user in the system
-- Default password is "password" - CHANGE THIS IN PRODUCTION!
INSERT INTO users (username, password_hash, role)
SELECT 'admin', '$2a$10$noHby.4IytctN8kY7q1wqu.xooGud2jXoDMcGSA70vsyU2bNYNW.C', 'admin'
WHERE NOT EXISTS (SELECT 1 FROM users LIMIT 1);

-- Get the admin user id (either the one we just created or an existing one)
DO $$
DECLARE
    admin_user_id UUID;
BEGIN
    SELECT id INTO admin_user_id FROM users ORDER BY created_at LIMIT 1;

    -- Add created_by field to accounts table
    ALTER TABLE accounts ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES users(id) ON DELETE SET NULL;
    
    -- Add created_by field to contacts table
    ALTER TABLE contacts ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES users(id) ON DELETE SET NULL;
    
    -- Add created_by field to opportunities table
    ALTER TABLE opportunities ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES users(id) ON DELETE SET NULL;
    
    -- Update existing records to use the admin user
    UPDATE accounts SET created_by = admin_user_id WHERE created_by IS NULL;
    UPDATE contacts SET created_by = admin_user_id WHERE created_by IS NULL;
    UPDATE opportunities SET created_by = admin_user_id WHERE created_by IS NULL;
    
    -- Make created_by column NOT NULL for new records going forward
    ALTER TABLE accounts ALTER COLUMN created_by SET NOT NULL;
    ALTER TABLE contacts ALTER COLUMN created_by SET NOT NULL;
    ALTER TABLE opportunities ALTER COLUMN created_by SET NOT NULL;
END $$; 