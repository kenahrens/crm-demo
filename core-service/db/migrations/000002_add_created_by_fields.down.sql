-- Remove created_by column from accounts table
ALTER TABLE accounts DROP COLUMN IF EXISTS created_by;

-- Remove created_by column from contacts table
ALTER TABLE contacts DROP COLUMN IF EXISTS created_by;

-- Remove created_by column from opportunities table
ALTER TABLE opportunities DROP COLUMN IF EXISTS created_by;

-- Note: We don't remove the admin user that might have been created during the up migration
-- as it might be used by other parts of the system 