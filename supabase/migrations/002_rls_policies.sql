-- Enable Row Level Security on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE matters ENABLE ROW LEVEL SECURITY;
ALTER TABLE inbox_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE deadlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to get user's organization
CREATE OR REPLACE FUNCTION get_user_org_id()
RETURNS UUID AS $$
BEGIN
    RETURN (SELECT org_id FROM profiles WHERE id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Organizations policies
CREATE POLICY "Users can view their own organization"
    ON organizations FOR SELECT
    USING (id = get_user_org_id());

CREATE POLICY "Admins can update their organization"
    ON organizations FOR UPDATE
    USING (
        id = get_user_org_id() AND
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'Admin'
        )
    );

-- Profiles policies
CREATE POLICY "Users can view profiles in their organization"
    ON profiles FOR SELECT
    USING (org_id = get_user_org_id());

CREATE POLICY "Users can view their own profile"
    ON profiles FOR SELECT
    USING (id = auth.uid());

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (id = auth.uid());

CREATE POLICY "Admins can insert profiles in their organization"
    ON profiles FOR INSERT
    WITH CHECK (
        org_id = get_user_org_id() AND
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'Admin'
        )
    );

CREATE POLICY "Admins can update profiles in their organization"
    ON profiles FOR UPDATE
    USING (
        org_id = get_user_org_id() AND
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'Admin'
        )
    );

CREATE POLICY "Admins can delete profiles in their organization"
    ON profiles FOR DELETE
    USING (
        org_id = get_user_org_id() AND
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'Admin'
        )
    );

-- Clients policies
CREATE POLICY "Users can view clients in their organization"
    ON clients FOR SELECT
    USING (org_id = get_user_org_id());

CREATE POLICY "Users can insert clients in their organization"
    ON clients FOR INSERT
    WITH CHECK (org_id = get_user_org_id());

CREATE POLICY "Users can update clients in their organization"
    ON clients FOR UPDATE
    USING (org_id = get_user_org_id());

CREATE POLICY "Users can delete clients in their organization"
    ON clients FOR DELETE
    USING (org_id = get_user_org_id());

-- Matters policies
CREATE POLICY "Users can view matters in their organization"
    ON matters FOR SELECT
    USING (org_id = get_user_org_id());

CREATE POLICY "Users can insert matters in their organization"
    ON matters FOR INSERT
    WITH CHECK (org_id = get_user_org_id());

CREATE POLICY "Users can update matters in their organization"
    ON matters FOR UPDATE
    USING (org_id = get_user_org_id());

CREATE POLICY "Users can delete matters in their organization"
    ON matters FOR DELETE
    USING (org_id = get_user_org_id());

-- Inbox items policies
CREATE POLICY "Users can view inbox items in their organization"
    ON inbox_items FOR SELECT
    USING (org_id = get_user_org_id());

CREATE POLICY "Users can insert inbox items in their organization"
    ON inbox_items FOR INSERT
    WITH CHECK (org_id = get_user_org_id());

CREATE POLICY "Users can update inbox items in their organization"
    ON inbox_items FOR UPDATE
    USING (org_id = get_user_org_id());

CREATE POLICY "Users can delete inbox items in their organization"
    ON inbox_items FOR DELETE
    USING (org_id = get_user_org_id());

-- Deadlines policies
CREATE POLICY "Users can view deadlines in their organization"
    ON deadlines FOR SELECT
    USING (org_id = get_user_org_id());

CREATE POLICY "Users can insert deadlines in their organization"
    ON deadlines FOR INSERT
    WITH CHECK (org_id = get_user_org_id());

CREATE POLICY "Users can update deadlines in their organization"
    ON deadlines FOR UPDATE
    USING (org_id = get_user_org_id());

CREATE POLICY "Users can delete deadlines in their organization"
    ON deadlines FOR DELETE
    USING (org_id = get_user_org_id());

-- Documents policies
CREATE POLICY "Users can view documents in their organization"
    ON documents FOR SELECT
    USING (org_id = get_user_org_id());

CREATE POLICY "Users can insert documents in their organization"
    ON documents FOR INSERT
    WITH CHECK (org_id = get_user_org_id());

CREATE POLICY "Users can update documents in their organization"
    ON documents FOR UPDATE
    USING (org_id = get_user_org_id());

CREATE POLICY "Users can delete documents in their organization"
    ON documents FOR DELETE
    USING (org_id = get_user_org_id());

-- Message logs policies
CREATE POLICY "Users can view message logs in their organization"
    ON message_logs FOR SELECT
    USING (org_id = get_user_org_id());

CREATE POLICY "Users can insert message logs in their organization"
    ON message_logs FOR INSERT
    WITH CHECK (org_id = get_user_org_id());

-- Audit logs policies (PRO only - read-only for most users)
CREATE POLICY "Users can view audit logs in their organization"
    ON audit_logs FOR SELECT
    USING (
        org_id = get_user_org_id() AND
        EXISTS (
            SELECT 1 FROM organizations
            WHERE id = get_user_org_id() AND plan = 'PRO'
        )
    );

CREATE POLICY "System can insert audit logs"
    ON audit_logs FOR INSERT
    WITH CHECK (org_id = get_user_org_id());
