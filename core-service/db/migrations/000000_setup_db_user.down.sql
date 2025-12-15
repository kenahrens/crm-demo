-- Revoke privileges from core user
-- Note: We cannot drop the core user while connected as that user
-- This migration only revokes privileges. To fully remove the user,
-- you must connect as a different superuser (e.g., postgres) and run:
-- DROP USER IF EXISTS core;

REVOKE ALL PRIVILEGES ON DATABASE crm FROM core;
REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM core;
REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public FROM core;
REVOKE ALL PRIVILEGES ON SCHEMA public FROM core; 