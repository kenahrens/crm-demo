-- Create core user if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'core') THEN
        CREATE USER core WITH PASSWORD 'core' SUPERUSER;
    END IF;
END
$$;

-- Grant privileges to core user
GRANT ALL PRIVILEGES ON DATABASE crm TO core;
GRANT ALL PRIVILEGES ON SCHEMA public TO core;
GRANT USAGE, CREATE ON SCHEMA public TO core;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO core;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO core;

-- Make sure core is a superuser
ALTER USER core WITH SUPERUSER; 