-- Insert test users
INSERT INTO users (id, username, password_hash, role) 
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'testuser1', '$2a$10$1234567890123456789012.1234567890123456789012345678901234', 'user'),
  ('22222222-2222-2222-2222-222222222222', 'testuser2', '$2a$10$1234567890123456789012.1234567890123456789012345678901234', 'admin');

-- Insert test accounts
INSERT INTO accounts (id, name, industry, website, phone, address, city, state, zip, country) 
VALUES 
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Test Account 1', 'Technology', 'https://example1.com', '555-111-1111', '123 First St', 'San Francisco', 'CA', '94105', 'USA'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Test Account 2', 'Healthcare', 'https://example2.com', '555-222-2222', '456 Second St', 'New York', 'NY', '10001', 'USA');

-- Insert test contacts
INSERT INTO contacts (id, first_name, last_name, email, phone, title, account_id, address, city, state, zip, country) 
VALUES 
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'John', 'Doe', 'john@example.com', '555-333-3333', 'CEO', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '123 First St', 'San Francisco', 'CA', '94105', 'USA'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Jane', 'Smith', 'jane@example.com', '555-444-4444', 'CTO', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '456 Second St', 'New York', 'NY', '10001', 'USA');

-- Insert test opportunities
INSERT INTO opportunities (id, opportunity_name, account_id, primary_contact_id, stage, amount, close_date, probability) 
VALUES 
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Test Opportunity 1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Qualification', 10000.00, '2023-12-31', 50),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Test Opportunity 2', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'Negotiation', 25000.00, '2023-10-15', 75);

-- Insert test notes
INSERT INTO notes (id, content, created_by, created_at)
VALUES
  ('gggggggg-gggg-gggg-gggg-gggggggggggg', 'First meeting went well', '11111111-1111-1111-1111-111111111111', '2023-01-01 10:00:00'),
  ('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'Follow-up scheduled for next week', '22222222-2222-2222-2222-222222222222', '2023-01-02 14:30:00');

-- Insert test note associations
INSERT INTO note_associations (note_id, record_id, record_type)
VALUES
  ('gggggggg-gggg-gggg-gggg-gggggggggggg', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'account'),
  ('gggggggg-gggg-gggg-gggg-gggggggggggg', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'contact'),
  ('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'opportunity'); 