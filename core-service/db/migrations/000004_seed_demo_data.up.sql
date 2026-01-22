-- Seed demo data for CRM application
-- This migration creates 20 accounts, 60 contacts, 5 opportunities, 25 notes, and 5 user logins

-- First, ensure we have 5 users (admin already exists from migration 000002)
-- Add 4 more users (password for all is 'password')
INSERT INTO users (username, email, password_hash, role)
VALUES
    ('john.doe', 'john.doe@example.com', '$2a$10$noHby.4IytctN8kY7q1wqu.xooGud2jXoDMcGSA70vsyU2bNYNW.C', 'user'),
    ('jane.smith', 'jane.smith@example.com', '$2a$10$noHby.4IytctN8kY7q1wqu.xooGud2jXoDMcGSA70vsyU2bNYNW.C', 'user'),
    ('bob.wilson', 'bob.wilson@example.com', '$2a$10$noHby.4IytctN8kY7q1wqu.xooGud2jXoDMcGSA70vsyU2bNYNW.C', 'manager'),
    ('sarah.jones', 'sarah.jones@example.com', '$2a$10$noHby.4IytctN8kY7q1wqu.xooGud2jXoDMcGSA70vsyU2bNYNW.C', 'user')
ON CONFLICT (username) DO NOTHING;

-- Seed 20 accounts using subqueries for user IDs
INSERT INTO accounts (name, industry, website, phone, city, state, country, created_by) VALUES
    ('Acme Corporation', 'Technology', 'https://acme.example.com', '+1-555-0101', 'San Francisco', 'CA', 'USA', (SELECT id FROM users WHERE username = 'admin' LIMIT 1)),
    ('TechStart Inc', 'Software', 'https://techstart.example.com', '+1-555-0102', 'Austin', 'TX', 'USA', (SELECT id FROM users WHERE username = 'john.doe' LIMIT 1)),
    ('Global Solutions Ltd', 'Consulting', 'https://globalsolutions.example.com', '+1-555-0103', 'New York', 'NY', 'USA', (SELECT id FROM users WHERE username = 'jane.smith' LIMIT 1)),
    ('Innovation Labs', 'Research', 'https://innovationlabs.example.com', '+1-555-0104', 'Boston', 'MA', 'USA', (SELECT id FROM users WHERE username = 'bob.wilson' LIMIT 1)),
    ('CloudScale Systems', 'Cloud Services', 'https://cloudscale.example.com', '+1-555-0105', 'Seattle', 'WA', 'USA', (SELECT id FROM users WHERE username = 'sarah.jones' LIMIT 1)),
    ('DataFlow Analytics', 'Data Analytics', 'https://dataflow.example.com', '+1-555-0106', 'Chicago', 'IL', 'USA', (SELECT id FROM users WHERE username = 'admin' LIMIT 1)),
    ('SecureNet Technologies', 'Cybersecurity', 'https://securenet.example.com', '+1-555-0107', 'Denver', 'CO', 'USA', (SELECT id FROM users WHERE username = 'john.doe' LIMIT 1)),
    ('MobileFirst Apps', 'Mobile Development', 'https://mobilefirst.example.com', '+1-555-0108', 'Los Angeles', 'CA', 'USA', (SELECT id FROM users WHERE username = 'jane.smith' LIMIT 1)),
    ('Enterprise Software Group', 'Enterprise Software', 'https://esg.example.com', '+1-555-0109', 'Atlanta', 'GA', 'USA', (SELECT id FROM users WHERE username = 'bob.wilson' LIMIT 1)),
    ('Digital Marketing Pro', 'Marketing', 'https://digitalmarketing.example.com', '+1-555-0110', 'Miami', 'FL', 'USA', (SELECT id FROM users WHERE username = 'sarah.jones' LIMIT 1)),
    ('FinTech Solutions', 'Financial Services', 'https://fintech.example.com', '+1-555-0111', 'Charlotte', 'NC', 'USA', (SELECT id FROM users WHERE username = 'admin' LIMIT 1)),
    ('HealthTech Innovations', 'Healthcare', 'https://healthtech.example.com', '+1-555-0112', 'Philadelphia', 'PA', 'USA', (SELECT id FROM users WHERE username = 'john.doe' LIMIT 1)),
    ('EduTech Systems', 'Education', 'https://edutech.example.com', '+1-555-0113', 'Portland', 'OR', 'USA', (SELECT id FROM users WHERE username = 'jane.smith' LIMIT 1)),
    ('RetailMax Solutions', 'Retail', 'https://retailmax.example.com', '+1-555-0114', 'Dallas', 'TX', 'USA', (SELECT id FROM users WHERE username = 'bob.wilson' LIMIT 1)),
    ('Manufacturing Plus', 'Manufacturing', 'https://mfgplus.example.com', '+1-555-0115', 'Detroit', 'MI', 'USA', (SELECT id FROM users WHERE username = 'sarah.jones' LIMIT 1)),
    ('Energy Dynamics', 'Energy', 'https://energydynamics.example.com', '+1-555-0116', 'Houston', 'TX', 'USA', (SELECT id FROM users WHERE username = 'admin' LIMIT 1)),
    ('Transport Logistics', 'Transportation', 'https://transportlogistics.example.com', '+1-555-0117', 'Phoenix', 'AZ', 'USA', (SELECT id FROM users WHERE username = 'john.doe' LIMIT 1)),
    ('Real Estate Pro', 'Real Estate', 'https://realestatepro.example.com', '+1-555-0118', 'San Diego', 'CA', 'USA', (SELECT id FROM users WHERE username = 'jane.smith' LIMIT 1)),
    ('Legal Tech Partners', 'Legal Services', 'https://legaltech.example.com', '+1-555-0119', 'Washington', 'DC', 'USA', (SELECT id FROM users WHERE username = 'bob.wilson' LIMIT 1)),
    ('Media & Entertainment Co', 'Media', 'https://mediaent.example.com', '+1-555-0120', 'Nashville', 'TN', 'USA', (SELECT id FROM users WHERE username = 'sarah.jones' LIMIT 1))
ON CONFLICT DO NOTHING;

-- Seed 60 contacts (3 per account) using subqueries
INSERT INTO contacts (first_name, last_name, email, phone, title, account_id, created_by) VALUES
    -- Acme Corporation (3 contacts)
    ('John', 'Smith', 'john.smith@acme.example.com', '+1-555-1001', 'CEO', (SELECT id FROM accounts WHERE name = 'Acme Corporation'), (SELECT id FROM users WHERE username = 'admin' LIMIT 1)),
    ('Sarah', 'Johnson', 'sarah.johnson@acme.example.com', '+1-555-1002', 'CTO', (SELECT id FROM accounts WHERE name = 'Acme Corporation'), (SELECT id FROM users WHERE username = 'john.doe' LIMIT 1)),
    ('Michael', 'Williams', 'michael.williams@acme.example.com', '+1-555-1003', 'VP Sales', (SELECT id FROM accounts WHERE name = 'Acme Corporation'), (SELECT id FROM users WHERE username = 'jane.smith' LIMIT 1)),
    -- TechStart Inc (3 contacts)
    ('Emily', 'Brown', 'emily.brown@techstart.example.com', '+1-555-1004', 'CEO', (SELECT id FROM accounts WHERE name = 'TechStart Inc'), (SELECT id FROM users WHERE username = 'bob.wilson' LIMIT 1)),
    ('David', 'Jones', 'david.jones@techstart.example.com', '+1-555-1005', 'CFO', (SELECT id FROM accounts WHERE name = 'TechStart Inc'), (SELECT id FROM users WHERE username = 'sarah.jones' LIMIT 1)),
    ('Lisa', 'Garcia', 'lisa.garcia@techstart.example.com', '+1-555-1006', 'VP Marketing', (SELECT id FROM accounts WHERE name = 'TechStart Inc'), (SELECT id FROM users WHERE username = 'admin' LIMIT 1)),
    -- Global Solutions Ltd (3 contacts)
    ('Robert', 'Martinez', 'robert.martinez@globalsolutions.example.com', '+1-555-1007', 'Managing Director', (SELECT id FROM accounts WHERE name = 'Global Solutions Ltd'), (SELECT id FROM users WHERE username = 'john.doe' LIMIT 1)),
    ('Jennifer', 'Rodriguez', 'jennifer.rodriguez@globalsolutions.example.com', '+1-555-1008', 'Partner', (SELECT id FROM accounts WHERE name = 'Global Solutions Ltd'), (SELECT id FROM users WHERE username = 'jane.smith' LIMIT 1)),
    ('James', 'Wilson', 'james.wilson@globalsolutions.example.com', '+1-555-1009', 'Sales Director', (SELECT id FROM accounts WHERE name = 'Global Solutions Ltd'), (SELECT id FROM users WHERE username = 'bob.wilson' LIMIT 1)),
    -- Innovation Labs (3 contacts)
    ('Mary', 'Anderson', 'mary.anderson@innovationlabs.example.com', '+1-555-1010', 'Chief Scientist', (SELECT id FROM accounts WHERE name = 'Innovation Labs'), (SELECT id FROM users WHERE username = 'sarah.jones' LIMIT 1)),
    ('William', 'Taylor', 'william.taylor@innovationlabs.example.com', '+1-555-1011', 'Research Director', (SELECT id FROM accounts WHERE name = 'Innovation Labs'), (SELECT id FROM users WHERE username = 'admin' LIMIT 1)),
    ('Patricia', 'Thomas', 'patricia.thomas@innovationlabs.example.com', '+1-555-1012', 'Lab Manager', (SELECT id FROM accounts WHERE name = 'Innovation Labs'), (SELECT id FROM users WHERE username = 'john.doe' LIMIT 1)),
    -- CloudScale Systems (3 contacts)
    ('Richard', 'Moore', 'richard.moore@cloudscale.example.com', '+1-555-1013', 'CEO', (SELECT id FROM accounts WHERE name = 'CloudScale Systems'), (SELECT id FROM users WHERE username = 'jane.smith' LIMIT 1)),
    ('Linda', 'Jackson', 'linda.jackson@cloudscale.example.com', '+1-555-1014', 'VP Engineering', (SELECT id FROM accounts WHERE name = 'CloudScale Systems'), (SELECT id FROM users WHERE username = 'bob.wilson' LIMIT 1)),
    ('Charles', 'White', 'charles.white@cloudscale.example.com', '+1-555-1015', 'Solutions Architect', (SELECT id FROM accounts WHERE name = 'CloudScale Systems'), (SELECT id FROM users WHERE username = 'sarah.jones' LIMIT 1)),
    -- DataFlow Analytics (3 contacts)
    ('Barbara', 'Harris', 'barbara.harris@dataflow.example.com', '+1-555-1016', 'CEO', (SELECT id FROM accounts WHERE name = 'DataFlow Analytics'), (SELECT id FROM users WHERE username = 'admin' LIMIT 1)),
    ('Thomas', 'Martin', 'thomas.martin@dataflow.example.com', '+1-555-1017', 'Chief Data Officer', (SELECT id FROM accounts WHERE name = 'DataFlow Analytics'), (SELECT id FROM users WHERE username = 'john.doe' LIMIT 1)),
    ('Susan', 'Thompson', 'susan.thompson@dataflow.example.com', '+1-555-1018', 'Analytics Director', (SELECT id FROM accounts WHERE name = 'DataFlow Analytics'), (SELECT id FROM users WHERE username = 'jane.smith' LIMIT 1)),
    -- SecureNet Technologies (3 contacts)
    ('Daniel', 'Lee', 'daniel.lee@securenet.example.com', '+1-555-1019', 'CISO', (SELECT id FROM accounts WHERE name = 'SecureNet Technologies'), (SELECT id FROM users WHERE username = 'bob.wilson' LIMIT 1)),
    ('Jessica', 'Clark', 'jessica.clark@securenet.example.com', '+1-555-1020', 'Security Analyst', (SELECT id FROM accounts WHERE name = 'SecureNet Technologies'), (SELECT id FROM users WHERE username = 'sarah.jones' LIMIT 1)),
    ('Matthew', 'Lewis', 'matthew.lewis@securenet.example.com', '+1-555-1021', 'VP Sales', (SELECT id FROM accounts WHERE name = 'SecureNet Technologies'), (SELECT id FROM users WHERE username = 'admin' LIMIT 1)),
    -- MobileFirst Apps (3 contacts)
    ('Elizabeth', 'Walker', 'elizabeth.walker@mobilefirst.example.com', '+1-555-1022', 'CEO', (SELECT id FROM accounts WHERE name = 'MobileFirst Apps'), (SELECT id FROM users WHERE username = 'john.doe' LIMIT 1)),
    ('Anthony', 'Hall', 'anthony.hall@mobilefirst.example.com', '+1-555-1023', 'Lead Developer', (SELECT id FROM accounts WHERE name = 'MobileFirst Apps'), (SELECT id FROM users WHERE username = 'jane.smith' LIMIT 1)),
    ('Karen', 'Allen', 'karen.allen@mobilefirst.example.com', '+1-555-1024', 'Product Manager', (SELECT id FROM accounts WHERE name = 'MobileFirst Apps'), (SELECT id FROM users WHERE username = 'bob.wilson' LIMIT 1)),
    -- Enterprise Software Group (3 contacts)
    ('Mark', 'Young', 'mark.young@esg.example.com', '+1-555-1025', 'President', (SELECT id FROM accounts WHERE name = 'Enterprise Software Group'), (SELECT id FROM users WHERE username = 'sarah.jones' LIMIT 1)),
    ('Nancy', 'King', 'nancy.king@esg.example.com', '+1-555-1026', 'VP Customer Success', (SELECT id FROM accounts WHERE name = 'Enterprise Software Group'), (SELECT id FROM users WHERE username = 'admin' LIMIT 1)),
    ('Donald', 'Wright', 'donald.wright@esg.example.com', '+1-555-1027', 'Account Executive', (SELECT id FROM accounts WHERE name = 'Enterprise Software Group'), (SELECT id FROM users WHERE username = 'john.doe' LIMIT 1)),
    -- Digital Marketing Pro (3 contacts)
    ('Betty', 'Lopez', 'betty.lopez@digitalmarketing.example.com', '+1-555-1028', 'CMO', (SELECT id FROM accounts WHERE name = 'Digital Marketing Pro'), (SELECT id FROM users WHERE username = 'jane.smith' LIMIT 1)),
    ('Steven', 'Hill', 'steven.hill@digitalmarketing.example.com', '+1-555-1029', 'Creative Director', (SELECT id FROM accounts WHERE name = 'Digital Marketing Pro'), (SELECT id FROM users WHERE username = 'bob.wilson' LIMIT 1)),
    ('Margaret', 'Scott', 'margaret.scott@digitalmarketing.example.com', '+1-555-1030', 'Account Manager', (SELECT id FROM accounts WHERE name = 'Digital Marketing Pro'), (SELECT id FROM users WHERE username = 'sarah.jones' LIMIT 1)),
    -- FinTech Solutions (3 contacts)
    ('Paul', 'Green', 'paul.green@fintech.example.com', '+1-555-1031', 'CEO', (SELECT id FROM accounts WHERE name = 'FinTech Solutions'), (SELECT id FROM users WHERE username = 'admin' LIMIT 1)),
    ('Dorothy', 'Adams', 'dorothy.adams@fintech.example.com', '+1-555-1032', 'CFO', (SELECT id FROM accounts WHERE name = 'FinTech Solutions'), (SELECT id FROM users WHERE username = 'john.doe' LIMIT 1)),
    ('Joshua', 'Baker', 'joshua.baker@fintech.example.com', '+1-555-1033', 'VP Product', (SELECT id FROM accounts WHERE name = 'FinTech Solutions'), (SELECT id FROM users WHERE username = 'jane.smith' LIMIT 1)),
    -- HealthTech Innovations (3 contacts)
    ('Sandra', 'Gonzalez', 'sandra.gonzalez@healthtech.example.com', '+1-555-1034', 'CEO', (SELECT id FROM accounts WHERE name = 'HealthTech Innovations'), (SELECT id FROM users WHERE username = 'bob.wilson' LIMIT 1)),
    ('Kenneth', 'Nelson', 'kenneth.nelson@healthtech.example.com', '+1-555-1035', 'Medical Director', (SELECT id FROM accounts WHERE name = 'HealthTech Innovations'), (SELECT id FROM users WHERE username = 'sarah.jones' LIMIT 1)),
    ('Ashley', 'Carter', 'ashley.carter@healthtech.example.com', '+1-555-1036', 'VP Sales', (SELECT id FROM accounts WHERE name = 'HealthTech Innovations'), (SELECT id FROM users WHERE username = 'admin' LIMIT 1)),
    -- EduTech Systems (3 contacts)
    ('Kevin', 'Mitchell', 'kevin.mitchell@edutech.example.com', '+1-555-1037', 'Founder', (SELECT id FROM accounts WHERE name = 'EduTech Systems'), (SELECT id FROM users WHERE username = 'john.doe' LIMIT 1)),
    ('Donna', 'Perez', 'donna.perez@edutech.example.com', '+1-555-1038', 'Head of Product', (SELECT id FROM accounts WHERE name = 'EduTech Systems'), (SELECT id FROM users WHERE username = 'jane.smith' LIMIT 1)),
    ('Brian', 'Roberts', 'brian.roberts@edutech.example.com', '+1-555-1039', 'Sales Manager', (SELECT id FROM accounts WHERE name = 'EduTech Systems'), (SELECT id FROM users WHERE username = 'bob.wilson' LIMIT 1)),
    -- RetailMax Solutions (3 contacts)
    ('Carol', 'Turner', 'carol.turner@retailmax.example.com', '+1-555-1040', 'CEO', (SELECT id FROM accounts WHERE name = 'RetailMax Solutions'), (SELECT id FROM users WHERE username = 'sarah.jones' LIMIT 1)),
    ('Ronald', 'Phillips', 'ronald.phillips@retailmax.example.com', '+1-555-1041', 'COO', (SELECT id FROM accounts WHERE name = 'RetailMax Solutions'), (SELECT id FROM users WHERE username = 'admin' LIMIT 1)),
    ('Michelle', 'Campbell', 'michelle.campbell@retailmax.example.com', '+1-555-1042', 'VP Retail Operations', (SELECT id FROM accounts WHERE name = 'RetailMax Solutions'), (SELECT id FROM users WHERE username = 'john.doe' LIMIT 1)),
    -- Manufacturing Plus (3 contacts)
    ('George', 'Parker', 'george.parker@mfgplus.example.com', '+1-555-1043', 'Plant Manager', (SELECT id FROM accounts WHERE name = 'Manufacturing Plus'), (SELECT id FROM users WHERE username = 'jane.smith' LIMIT 1)),
    ('Laura', 'Evans', 'laura.evans@mfgplus.example.com', '+1-555-1044', 'Quality Director', (SELECT id FROM accounts WHERE name = 'Manufacturing Plus'), (SELECT id FROM users WHERE username = 'bob.wilson' LIMIT 1)),
    ('Edward', 'Edwards', 'edward.edwards@mfgplus.example.com', '+1-555-1045', 'Operations Manager', (SELECT id FROM accounts WHERE name = 'Manufacturing Plus'), (SELECT id FROM users WHERE username = 'sarah.jones' LIMIT 1)),
    -- Energy Dynamics (3 contacts)
    ('Deborah', 'Collins', 'deborah.collins@energydynamics.example.com', '+1-555-1046', 'CEO', (SELECT id FROM accounts WHERE name = 'Energy Dynamics'), (SELECT id FROM users WHERE username = 'admin' LIMIT 1)),
    ('Jason', 'Stewart', 'jason.stewart@energydynamics.example.com', '+1-555-1047', 'Engineering Director', (SELECT id FROM accounts WHERE name = 'Energy Dynamics'), (SELECT id FROM users WHERE username = 'john.doe' LIMIT 1)),
    ('Cynthia', 'Sanchez', 'cynthia.sanchez@energydynamics.example.com', '+1-555-1048', 'VP Business Development', (SELECT id FROM accounts WHERE name = 'Energy Dynamics'), (SELECT id FROM users WHERE username = 'jane.smith' LIMIT 1)),
    -- Transport Logistics (3 contacts)
    ('Gary', 'Morris', 'gary.morris@transportlogistics.example.com', '+1-555-1049', 'CEO', (SELECT id FROM accounts WHERE name = 'Transport Logistics'), (SELECT id FROM users WHERE username = 'bob.wilson' LIMIT 1)),
    ('Stephanie', 'Rogers', 'stephanie.rogers@transportlogistics.example.com', '+1-555-1050', 'Logistics Manager', (SELECT id FROM accounts WHERE name = 'Transport Logistics'), (SELECT id FROM users WHERE username = 'sarah.jones' LIMIT 1)),
    ('Frank', 'Reed', 'frank.reed@transportlogistics.example.com', '+1-555-1051', 'Operations Director', (SELECT id FROM accounts WHERE name = 'Transport Logistics'), (SELECT id FROM users WHERE username = 'admin' LIMIT 1)),
    -- Real Estate Pro (3 contacts)
    ('Amy', 'Cook', 'amy.cook@realestatepro.example.com', '+1-555-1052', 'Broker', (SELECT id FROM accounts WHERE name = 'Real Estate Pro'), (SELECT id FROM users WHERE username = 'john.doe' LIMIT 1)),
    ('Raymond', 'Morgan', 'raymond.morgan@realestatepro.example.com', '+1-555-1053', 'Sales Manager', (SELECT id FROM accounts WHERE name = 'Real Estate Pro'), (SELECT id FROM users WHERE username = 'jane.smith' LIMIT 1)),
    ('Kathleen', 'Bell', 'kathleen.bell@realestatepro.example.com', '+1-555-1054', 'Agent', (SELECT id FROM accounts WHERE name = 'Real Estate Pro'), (SELECT id FROM users WHERE username = 'bob.wilson' LIMIT 1)),
    -- Legal Tech Partners (3 contacts)
    ('Larry', 'Murphy', 'larry.murphy@legaltech.example.com', '+1-555-1055', 'Managing Partner', (SELECT id FROM accounts WHERE name = 'Legal Tech Partners'), (SELECT id FROM users WHERE username = 'sarah.jones' LIMIT 1)),
    ('Christine', 'Bailey', 'christine.bailey@legaltech.example.com', '+1-555-1056', 'Partner', (SELECT id FROM accounts WHERE name = 'Legal Tech Partners'), (SELECT id FROM users WHERE username = 'admin' LIMIT 1)),
    ('Adam', 'Rivera', 'adam.rivera@legaltech.example.com', '+1-555-1057', 'Associate', (SELECT id FROM accounts WHERE name = 'Legal Tech Partners'), (SELECT id FROM users WHERE username = 'john.doe' LIMIT 1)),
    -- Media & Entertainment Co (3 contacts)
    ('Sharon', 'Cooper', 'sharon.cooper@mediaent.example.com', '+1-555-1058', 'CEO', (SELECT id FROM accounts WHERE name = 'Media & Entertainment Co'), (SELECT id FROM users WHERE username = 'jane.smith' LIMIT 1)),
    ('Terry', 'Richardson', 'terry.richardson@mediaent.example.com', '+1-555-1059', 'Creative Director', (SELECT id FROM accounts WHERE name = 'Media & Entertainment Co'), (SELECT id FROM users WHERE username = 'bob.wilson' LIMIT 1)),
    ('Diane', 'Cox', 'diane.cox@mediaent.example.com', '+1-555-1060', 'Producer', (SELECT id FROM accounts WHERE name = 'Media & Entertainment Co'), (SELECT id FROM users WHERE username = 'sarah.jones' LIMIT 1))
ON CONFLICT DO NOTHING;

-- Seed 5 opportunities using subqueries
INSERT INTO opportunities (opportunity_name, account_id, primary_contact_id, stage, amount, probability, close_date, created_by) VALUES
    ('Enterprise Software License', (SELECT id FROM accounts WHERE name = 'Acme Corporation'), (SELECT id FROM contacts WHERE email = 'john.smith@acme.example.com'), 'Proposal', 150000.00, 60.00, CURRENT_DATE + INTERVAL '60 days', (SELECT id FROM users WHERE username = 'admin' LIMIT 1)),
    ('Cloud Migration Project', (SELECT id FROM accounts WHERE name = 'TechStart Inc'), (SELECT id FROM contacts WHERE email = 'emily.brown@techstart.example.com'), 'Negotiation', 250000.00, 75.00, CURRENT_DATE + INTERVAL '90 days', (SELECT id FROM users WHERE username = 'john.doe' LIMIT 1)),
    ('Security Audit Services', (SELECT id FROM accounts WHERE name = 'Global Solutions Ltd'), (SELECT id FROM contacts WHERE email = 'robert.martinez@globalsolutions.example.com'), 'Qualification', 80000.00, 40.00, CURRENT_DATE + INTERVAL '45 days', (SELECT id FROM users WHERE username = 'jane.smith' LIMIT 1)),
    ('Annual Support Renewal', (SELECT id FROM accounts WHERE name = 'CloudScale Systems'), (SELECT id FROM contacts WHERE email = 'richard.moore@cloudscale.example.com'), 'Closed Won', 50000.00, 100.00, CURRENT_DATE + INTERVAL '30 days', (SELECT id FROM users WHERE username = 'bob.wilson' LIMIT 1)),
    ('Custom Development', (SELECT id FROM accounts WHERE name = 'FinTech Solutions'), (SELECT id FROM contacts WHERE email = 'paul.green@fintech.example.com'), 'Discovery', 200000.00, 25.00, CURRENT_DATE + INTERVAL '120 days', (SELECT id FROM users WHERE username = 'sarah.jones' LIMIT 1))
ON CONFLICT DO NOTHING;

-- Seed 25 notes using subqueries
INSERT INTO notes (content, created_by) VALUES
    ('Initial contact made, customer is interested in our enterprise solution.', (SELECT id FROM users WHERE username = 'admin' LIMIT 1)),
    ('Follow-up meeting scheduled for next week.', (SELECT id FROM users WHERE username = 'john.doe' LIMIT 1)),
    ('Customer requested a demo of the product.', (SELECT id FROM users WHERE username = 'jane.smith' LIMIT 1)),
    ('Pricing discussion went well, waiting for their budget approval.', (SELECT id FROM users WHERE username = 'bob.wilson' LIMIT 1)),
    ('Technical requirements gathered, starting proposal preparation.', (SELECT id FROM users WHERE username = 'sarah.jones' LIMIT 1)),
    ('Contract negotiation in progress.', (SELECT id FROM users WHERE username = 'admin' LIMIT 1)),
    ('Customer signed the agreement!', (SELECT id FROM users WHERE username = 'john.doe' LIMIT 1)),
    ('Onboarding process started.', (SELECT id FROM users WHERE username = 'jane.smith' LIMIT 1)),
    ('First milestone completed successfully.', (SELECT id FROM users WHERE username = 'bob.wilson' LIMIT 1)),
    ('Customer feedback: very satisfied with the service.', (SELECT id FROM users WHERE username = 'sarah.jones' LIMIT 1)),
    ('Renewal discussion initiated.', (SELECT id FROM users WHERE username = 'admin' LIMIT 1)),
    ('Issue escalated to technical team for resolution.', (SELECT id FROM users WHERE username = 'john.doe' LIMIT 1)),
    ('Monthly check-in call completed.', (SELECT id FROM users WHERE username = 'jane.smith' LIMIT 1)),
    ('Upsell opportunity identified.', (SELECT id FROM users WHERE username = 'bob.wilson' LIMIT 1)),
    ('Customer interested in additional modules.', (SELECT id FROM users WHERE username = 'sarah.jones' LIMIT 1)),
    ('Training session scheduled for next month.', (SELECT id FROM users WHERE username = 'admin' LIMIT 1)),
    ('Product demo delivered to stakeholders.', (SELECT id FROM users WHERE username = 'john.doe' LIMIT 1)),
    ('Technical integration completed.', (SELECT id FROM users WHERE username = 'jane.smith' LIMIT 1)),
    ('Customer reported a minor issue, investigating.', (SELECT id FROM users WHERE username = 'bob.wilson' LIMIT 1)),
    ('Issue resolved, customer satisfied.', (SELECT id FROM users WHERE username = 'sarah.jones' LIMIT 1)),
    ('Quarterly business review scheduled.', (SELECT id FROM users WHERE username = 'admin' LIMIT 1)),
    ('Customer referral received.', (SELECT id FROM users WHERE username = 'john.doe' LIMIT 1)),
    ('Contract amendment requested.', (SELECT id FROM users WHERE username = 'jane.smith' LIMIT 1)),
    ('Implementation phase 2 planning started.', (SELECT id FROM users WHERE username = 'bob.wilson' LIMIT 1)),
    ('Year-end review shows positive ROI.', (SELECT id FROM users WHERE username = 'sarah.jones' LIMIT 1))
ON CONFLICT DO NOTHING;

-- Seed note associations
INSERT INTO note_associations (note_id, record_id, record_type) VALUES
    -- Note 1: Account association
    ((SELECT id FROM notes WHERE content = 'Initial contact made, customer is interested in our enterprise solution.'), (SELECT id FROM accounts WHERE name = 'Acme Corporation'), 'account'),
    -- Note 2: Contact association
    ((SELECT id FROM notes WHERE content = 'Follow-up meeting scheduled for next week.'), (SELECT id FROM contacts WHERE email = 'john.smith@acme.example.com'), 'contact'),
    -- Note 3: Opportunity association
    ((SELECT id FROM notes WHERE content = 'Customer requested a demo of the product.'), (SELECT id FROM opportunities WHERE opportunity_name = 'Enterprise Software License'), 'opportunity'),
    -- Note 4: Multiple associations (account + opportunity)
    ((SELECT id FROM notes WHERE content = 'Pricing discussion went well, waiting for their budget approval.'), (SELECT id FROM accounts WHERE name = 'TechStart Inc'), 'account'),
    ((SELECT id FROM notes WHERE content = 'Pricing discussion went well, waiting for their budget approval.'), (SELECT id FROM opportunities WHERE opportunity_name = 'Cloud Migration Project'), 'opportunity'),
    -- Note 5: Account association
    ((SELECT id FROM notes WHERE content = 'Technical requirements gathered, starting proposal preparation.'), (SELECT id FROM accounts WHERE name = 'Global Solutions Ltd'), 'account'),
    -- Note 6: Opportunity association
    ((SELECT id FROM notes WHERE content = 'Contract negotiation in progress.'), (SELECT id FROM opportunities WHERE opportunity_name = 'Security Audit Services'), 'opportunity'),
    -- Note 7: Account + Contact associations
    ((SELECT id FROM notes WHERE content = 'Customer signed the agreement!'), (SELECT id FROM accounts WHERE name = 'CloudScale Systems'), 'account'),
    ((SELECT id FROM notes WHERE content = 'Customer signed the agreement!'), (SELECT id FROM contacts WHERE email = 'richard.moore@cloudscale.example.com'), 'contact'),
    -- Note 8: Account association
    ((SELECT id FROM notes WHERE content = 'Onboarding process started.'), (SELECT id FROM accounts WHERE name = 'FinTech Solutions'), 'account'),
    -- Note 9: Opportunity association
    ((SELECT id FROM notes WHERE content = 'First milestone completed successfully.'), (SELECT id FROM opportunities WHERE opportunity_name = 'Annual Support Renewal'), 'opportunity'),
    -- Note 10: Contact association
    ((SELECT id FROM notes WHERE content = 'Customer feedback: very satisfied with the service.'), (SELECT id FROM contacts WHERE email = 'paul.green@fintech.example.com'), 'contact'),
    -- Note 11: Account association
    ((SELECT id FROM notes WHERE content = 'Renewal discussion initiated.'), (SELECT id FROM accounts WHERE name = 'DataFlow Analytics'), 'account'),
    -- Note 12: Contact association
    ((SELECT id FROM notes WHERE content = 'Issue escalated to technical team for resolution.'), (SELECT id FROM contacts WHERE email = 'barbara.harris@dataflow.example.com'), 'contact'),
    -- Note 13: Account association
    ((SELECT id FROM notes WHERE content = 'Monthly check-in call completed.'), (SELECT id FROM accounts WHERE name = 'SecureNet Technologies'), 'account'),
    -- Note 14: Account + Contact associations
    ((SELECT id FROM notes WHERE content = 'Upsell opportunity identified.'), (SELECT id FROM accounts WHERE name = 'MobileFirst Apps'), 'account'),
    ((SELECT id FROM notes WHERE content = 'Upsell opportunity identified.'), (SELECT id FROM contacts WHERE email = 'elizabeth.walker@mobilefirst.example.com'), 'contact'),
    -- Note 15: Account association
    ((SELECT id FROM notes WHERE content = 'Customer interested in additional modules.'), (SELECT id FROM accounts WHERE name = 'Enterprise Software Group'), 'account'),
    -- Note 16: Contact association
    ((SELECT id FROM notes WHERE content = 'Training session scheduled for next month.'), (SELECT id FROM contacts WHERE email = 'mark.young@esg.example.com'), 'contact'),
    -- Note 17: Account association
    ((SELECT id FROM notes WHERE content = 'Product demo delivered to stakeholders.'), (SELECT id FROM accounts WHERE name = 'Digital Marketing Pro'), 'account'),
    -- Note 18: Contact association
    ((SELECT id FROM notes WHERE content = 'Technical integration completed.'), (SELECT id FROM contacts WHERE email = 'betty.lopez@digitalmarketing.example.com'), 'contact'),
    -- Note 19: Account association
    ((SELECT id FROM notes WHERE content = 'Customer reported a minor issue, investigating.'), (SELECT id FROM accounts WHERE name = 'HealthTech Innovations'), 'account'),
    -- Note 20: Contact association
    ((SELECT id FROM notes WHERE content = 'Issue resolved, customer satisfied.'), (SELECT id FROM contacts WHERE email = 'sandra.gonzalez@healthtech.example.com'), 'contact'),
    -- Note 21: Account association
    ((SELECT id FROM notes WHERE content = 'Quarterly business review scheduled.'), (SELECT id FROM accounts WHERE name = 'EduTech Systems'), 'account'),
    -- Note 22: Contact association
    ((SELECT id FROM notes WHERE content = 'Customer referral received.'), (SELECT id FROM contacts WHERE email = 'kevin.mitchell@edutech.example.com'), 'contact'),
    -- Note 23: Account association
    ((SELECT id FROM notes WHERE content = 'Contract amendment requested.'), (SELECT id FROM accounts WHERE name = 'RetailMax Solutions'), 'account'),
    -- Note 24: Opportunity association
    ((SELECT id FROM notes WHERE content = 'Implementation phase 2 planning started.'), (SELECT id FROM opportunities WHERE opportunity_name = 'Custom Development'), 'opportunity'),
    -- Note 25: Account + Contact associations
    ((SELECT id FROM notes WHERE content = 'Year-end review shows positive ROI.'), (SELECT id FROM accounts WHERE name = 'Manufacturing Plus'), 'account'),
    ((SELECT id FROM notes WHERE content = 'Year-end review shows positive ROI.'), (SELECT id FROM contacts WHERE email = 'george.parker@mfgplus.example.com'), 'contact')
ON CONFLICT DO NOTHING;
