-- Rollback demo data seed

-- Delete note associations (dependent on notes, accounts, contacts, opportunities)
DELETE FROM note_associations WHERE note_id IN (SELECT id FROM notes WHERE content IN (
    'Initial contact made, customer is interested in our enterprise solution.',
    'Follow-up meeting scheduled for next week.',
    'Customer requested a demo of the product.',
    'Pricing discussion went well, waiting for their budget approval.',
    'Technical requirements gathered, starting proposal preparation.',
    'Contract negotiation in progress.',
    'Customer signed the agreement!',
    'Onboarding process started.',
    'First milestone completed successfully.',
    'Customer feedback: very satisfied with the service.',
    'Renewal discussion initiated.',
    'Issue escalated to technical team for resolution.',
    'Monthly check-in call completed.',
    'Upsell opportunity identified.',
    'Customer interested in additional modules.',
    'Training session scheduled for next month.',
    'Product demo delivered to stakeholders.',
    'Technical integration completed.',
    'Customer reported a minor issue, investigating.',
    'Issue resolved, customer satisfied.',
    'Quarterly business review scheduled.',
    'Customer referral received.',
    'Contract amendment requested.',
    'Implementation phase 2 planning started.',
    'Year-end review shows positive ROI.'
));

-- Delete notes
DELETE FROM notes WHERE content IN (
    'Initial contact made, customer is interested in our enterprise solution.',
    'Follow-up meeting scheduled for next week.',
    'Customer requested a demo of the product.',
    'Pricing discussion went well, waiting for their budget approval.',
    'Technical requirements gathered, starting proposal preparation.',
    'Contract negotiation in progress.',
    'Customer signed the agreement!',
    'Onboarding process started.',
    'First milestone completed successfully.',
    'Customer feedback: very satisfied with the service.',
    'Renewal discussion initiated.',
    'Issue escalated to technical team for resolution.',
    'Monthly check-in call completed.',
    'Upsell opportunity identified.',
    'Customer interested in additional modules.',
    'Training session scheduled for next month.',
    'Product demo delivered to stakeholders.',
    'Technical integration completed.',
    'Customer reported a minor issue, investigating.',
    'Issue resolved, customer satisfied.',
    'Quarterly business review scheduled.',
    'Customer referral received.',
    'Contract amendment requested.',
    'Implementation phase 2 planning started.',
    'Year-end review shows positive ROI.'
);

-- Delete opportunities
DELETE FROM opportunities WHERE opportunity_name IN (
    'Enterprise Software License',
    'Cloud Migration Project',
    'Security Audit Services',
    'Annual Support Renewal',
    'Custom Development'
);

-- Delete contacts (will cascade to opportunities via primary_contact_id)
DELETE FROM contacts WHERE email LIKE '%@acme.example.com'
    OR email LIKE '%@techstart.example.com'
    OR email LIKE '%@globalsolutions.example.com'
    OR email LIKE '%@innovationlabs.example.com'
    OR email LIKE '%@cloudscale.example.com'
    OR email LIKE '%@dataflow.example.com'
    OR email LIKE '%@securenet.example.com'
    OR email LIKE '%@mobilefirst.example.com'
    OR email LIKE '%@esg.example.com'
    OR email LIKE '%@digitalmarketing.example.com'
    OR email LIKE '%@fintech.example.com'
    OR email LIKE '%@healthtech.example.com'
    OR email LIKE '%@edutech.example.com'
    OR email LIKE '%@retailmax.example.com'
    OR email LIKE '%@mfgplus.example.com'
    OR email LIKE '%@energydynamics.example.com'
    OR email LIKE '%@transportlogistics.example.com'
    OR email LIKE '%@realestatepro.example.com'
    OR email LIKE '%@legaltech.example.com'
    OR email LIKE '%@mediaent.example.com';

-- Delete accounts (will cascade to contacts and opportunities)
DELETE FROM accounts WHERE name IN (
    'Acme Corporation',
    'TechStart Inc',
    'Global Solutions Ltd',
    'Innovation Labs',
    'CloudScale Systems',
    'DataFlow Analytics',
    'SecureNet Technologies',
    'MobileFirst Apps',
    'Enterprise Software Group',
    'Digital Marketing Pro',
    'FinTech Solutions',
    'HealthTech Innovations',
    'EduTech Systems',
    'RetailMax Solutions',
    'Manufacturing Plus',
    'Energy Dynamics',
    'Transport Logistics',
    'Real Estate Pro',
    'Legal Tech Partners',
    'Media & Entertainment Co'
);

-- Delete users (except admin which was created in migration 000002)
DELETE FROM users WHERE username IN (
    'john.doe',
    'jane.smith',
    'bob.wilson',
    'sarah.jones'
);
