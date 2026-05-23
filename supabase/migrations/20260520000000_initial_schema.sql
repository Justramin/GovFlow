-- 1. Organizational Hierarchy Schema
CREATE TABLE IF NOT EXISTS states (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    code VARCHAR(50) UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS districts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    state_id UUID REFERENCES states(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(state_id, name)
);

CREATE TABLE IF NOT EXISTS divisions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    district_id UUID REFERENCES districts(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(district_id, name)
);

CREATE TABLE IF NOT EXISTS units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    division_id UUID REFERENCES divisions(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(division_id, name)
);

-- 2. RBAC System
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS role_permissions (
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, -- References auth.users(id)
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, role_id)
);

CREATE TABLE IF NOT EXISTS user_access_scope (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    state_id UUID REFERENCES states(id) ON DELETE CASCADE,
    district_id UUID REFERENCES districts(id) ON DELETE CASCADE,
    division_id UUID REFERENCES divisions(id) ON DELETE CASCADE,
    unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Core Entities: Members
CREATE TABLE IF NOT EXISTS members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(50),
    state_id UUID REFERENCES states(id),
    district_id UUID REFERENCES districts(id),
    division_id UUID REFERENCES divisions(id),
    unit_id UUID REFERENCES units(id),
    member_status VARCHAR(50) DEFAULT 'ACTIVE',
    organizational_position VARCHAR(100),
    membership_type VARCHAR(50) DEFAULT 'REGULAR',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Workflow Foundations
CREATE TABLE IF NOT EXISTS approval_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requester_id UUID NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id UUID NOT NULL,
    action_type VARCHAR(50) NOT NULL,
    payload JSONB,
    status VARCHAR(50) DEFAULT 'PENDING',
    target_hierarchy_level VARCHAR(50),
    target_state_id UUID REFERENCES states(id),
    target_district_id UUID REFERENCES districts(id),
    target_division_id UUID REFERENCES divisions(id),
    target_unit_id UUID REFERENCES units(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS approval_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    approval_request_id UUID REFERENCES approval_requests(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL,
    action VARCHAR(50) NOT NULL,
    comments TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Helper Function for Hierarchy Access
CREATE OR REPLACE FUNCTION has_hierarchy_access(
    req_state_id UUID,
    req_district_id UUID,
    req_division_id UUID,
    req_unit_id UUID
) RETURNS BOOLEAN AS $$
DECLARE
    user_scope RECORD;
BEGIN
    FOR user_scope IN 
        SELECT r.name as role_name, s.state_id, s.district_id, s.division_id, s.unit_id
        FROM user_access_scope s
        JOIN roles r ON r.id = s.role_id
        WHERE s.user_id = auth.uid()
    LOOP
        IF user_scope.role_name = 'STATE_ADMIN' THEN
            IF user_scope.state_id IS NULL OR user_scope.state_id = req_state_id THEN RETURN TRUE; END IF;
        ELSIF user_scope.role_name = 'DISTRICT_ADMIN' THEN
            IF user_scope.district_id = req_district_id THEN RETURN TRUE; END IF;
        ELSIF user_scope.role_name = 'DIVISION_ADMIN' THEN
            IF user_scope.division_id = req_division_id THEN RETURN TRUE; END IF;
        ELSIF user_scope.role_name = 'UNIT_ADMIN' THEN
            IF user_scope.unit_id = req_unit_id THEN RETURN TRUE; END IF;
        END IF;
    END LOOP;
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Analytics Module
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    type VARCHAR(100) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    target_url VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'PAID',
    amount DECIMAL(10, 2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    program_date DATE,
    created_by_hierarchy VARCHAR(50) NOT NULL,
    creator_scope_id UUID,
    status VARCHAR(50) DEFAULT 'UPCOMING',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS program_participations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
    unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    participation_status VARCHAR(50) DEFAULT 'ASSIGNED',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(program_id, member_id)
);

CREATE OR REPLACE VIEW workflow_analytics AS
SELECT 
    target_hierarchy_level, target_state_id, target_district_id, target_division_id, target_unit_id,
    action_type, status,
    COUNT(id) as total_requests,
    AVG(EXTRACT(EPOCH FROM (updated_at - created_at))) as avg_turnaround_seconds
FROM approval_requests
GROUP BY target_hierarchy_level, target_state_id, target_district_id, target_division_id, target_unit_id, action_type, status;

-- 7. Document Management System
CREATE TABLE IF NOT EXISTS member_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    document_type VARCHAR(100) NOT NULL,
    uploaded_by UUID NOT NULL,
    approval_request_id UUID REFERENCES approval_requests(id) ON DELETE SET NULL,
    state_id UUID REFERENCES states(id),
    district_id UUID REFERENCES districts(id),
    division_id UUID REFERENCES divisions(id),
    unit_id UUID REFERENCES units(id),
    storage_path VARCHAR(512) NOT NULL,
    verification_status VARCHAR(50) DEFAULT 'PENDING_VERIFICATION',
    verification_comments TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Enable Row Level Security (RLS)
ALTER TABLE states ENABLE ROW LEVEL SECURITY;
ALTER TABLE districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE divisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_access_scope ENABLE ROW LEVEL SECURITY;
ALTER TABLE approval_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE approval_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_participations ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_documents ENABLE ROW LEVEL SECURITY;

-- 9. RLS Policies

-- Public / Authenticated view access to hierarchy structures
CREATE POLICY "Hierarchy is viewable by all authenticated users" ON states FOR SELECT USING (true);
CREATE POLICY "Hierarchy is viewable by all authenticated users" ON districts FOR SELECT USING (true);
CREATE POLICY "Hierarchy is viewable by all authenticated users" ON divisions FOR SELECT USING (true);
CREATE POLICY "Hierarchy is viewable by all authenticated users" ON units FOR SELECT USING (true);
CREATE POLICY "Roles are viewable by all users" ON roles FOR SELECT USING (true);
CREATE POLICY "Permissions are viewable by all users" ON permissions FOR SELECT USING (true);

-- Members
CREATE POLICY "Members viewable based on hierarchy scope" ON members FOR SELECT 
USING (has_hierarchy_access(state_id, district_id, division_id, unit_id) OR auth.uid() IS NULL);

CREATE POLICY "Members insertable based on hierarchy scope" ON members FOR INSERT 
WITH CHECK (has_hierarchy_access(state_id, district_id, division_id, unit_id));

CREATE POLICY "Members updatable based on hierarchy scope" ON members FOR UPDATE 
USING (has_hierarchy_access(state_id, district_id, division_id, unit_id));

CREATE POLICY "Members deletable based on hierarchy scope" ON members FOR DELETE 
USING (has_hierarchy_access(state_id, district_id, division_id, unit_id));

-- Approvals
CREATE POLICY "Users can view approval requests in their scope or their own" ON approval_requests FOR SELECT
USING (requester_id = auth.uid() OR has_hierarchy_access(target_state_id, target_district_id, target_division_id, target_unit_id));

CREATE POLICY "Users can create approval requests" ON approval_requests FOR INSERT
WITH CHECK (requester_id = auth.uid());

-- Notifications
CREATE POLICY "Users can only see their own notifications" ON notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "System can insert notifications" ON notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own notifications" ON notifications FOR UPDATE USING (user_id = auth.uid());

-- Subscriptions
CREATE POLICY "Subscriptions viewable based on hierarchy scope" ON subscriptions FOR SELECT
USING (EXISTS (SELECT 1 FROM members m WHERE m.id = subscriptions.member_id AND (has_hierarchy_access(m.state_id, m.district_id, m.division_id, m.unit_id) OR auth.uid() IS NULL)));

-- Programs
CREATE POLICY "Programs viewable by all authenticated users" ON programs FOR SELECT USING (true);
CREATE POLICY "Program participations viewable based on unit/hierarchy access" ON program_participations FOR SELECT
USING (EXISTS (SELECT 1 FROM units u WHERE u.id = program_participations.unit_id AND (has_hierarchy_access(NULL, NULL, u.division_id, u.id) OR auth.uid() IS NULL)));

-- Documents
CREATE POLICY "Documents viewable based on hierarchy scope" ON member_documents FOR SELECT
USING (has_hierarchy_access(state_id, district_id, division_id, unit_id) OR auth.uid() IS NULL);

CREATE POLICY "Users can upload documents in their scope" ON member_documents FOR INSERT
WITH CHECK (has_hierarchy_access(state_id, district_id, division_id, unit_id));

CREATE POLICY "Users can update verification status in their scope" ON member_documents FOR UPDATE
USING (has_hierarchy_access(state_id, district_id, division_id, unit_id));
