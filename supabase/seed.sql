-- supabase/seed.sql

-- Seed initial governance structure (Kerala State)
INSERT INTO states (name, code) 
VALUES ('Kerala', 'KL') 
ON CONFLICT (name) DO NOTHING;

-- Seed Districts
INSERT INTO districts (state_id, name, code)
SELECT id, 'Thiruvananthapuram', 'TVM' FROM states WHERE code = 'KL'
ON CONFLICT (state_id, name) DO NOTHING;

INSERT INTO districts (state_id, name, code)
SELECT id, 'Ernakulam', 'EKM' FROM states WHERE code = 'KL'
ON CONFLICT (state_id, name) DO NOTHING;

-- Seed Divisions
INSERT INTO divisions (district_id, name, code)
SELECT id, 'City Division', 'CD' FROM districts WHERE code = 'TVM'
ON CONFLICT (district_id, name) DO NOTHING;

-- Seed Units
INSERT INTO units (division_id, name, code)
SELECT id, 'Central Unit', 'CU' FROM divisions WHERE code = 'CD'
ON CONFLICT (division_id, name) DO NOTHING;

-- Seed Roles
INSERT INTO roles (name, description) VALUES
('SUPER_ADMIN', 'Highest system administrator with overall access to all modules'),
('STATE_ADMIN', 'Global governance control across all districts and divisions'),
('DISTRICT_ADMIN', 'Administrative control bounded to a single target district'),
('DIVISION_ADMIN', 'Operational control bounded to a single division'),
('UNIT_ADMIN', 'On-ground operational management of members in a specific unit')
ON CONFLICT (name) DO NOTHING;

-- Seed Permissions
INSERT INTO permissions (name, description) VALUES
('members.create', 'Ability to initiate member creation requests'),
('members.edit', 'Ability to request member profile edits'),
('members.transfer', 'Ability to request member transfers'),
('members.promote', 'Ability to request promotions'),
('approvals.approve', 'Ability to review, approve, or reject pending requests'),
('config.manage', 'Ability to customize system-wide parameters and routing rules')
ON CONFLICT (name) DO NOTHING;

-- Map Permissions to STATE_ADMIN
-- We use DO NOTHING so it can be re-run safely
WITH state_admin AS (SELECT id FROM roles WHERE name = 'STATE_ADMIN'),
     perms AS (SELECT id FROM permissions)
INSERT INTO role_permissions (role_id, permission_id)
SELECT state_admin.id, perms.id FROM state_admin CROSS JOIN perms
ON CONFLICT (role_id, permission_id) DO NOTHING;
