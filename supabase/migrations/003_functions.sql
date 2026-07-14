-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.create_profile_on_signup()
RETURNS TRIGGER AS $$
DECLARE
    new_org_id UUID;
BEGIN
    -- Create a new organization for the user
    INSERT INTO organizations (name, plan)
    VALUES (COALESCE(NEW.raw_user_meta_data->>'organization_name', 'Minha Organização'), 'STARTER')
    RETURNING id INTO new_org_id;

    -- Create profile for the user
    INSERT INTO profiles (id, org_id, name, role)
    VALUES (
        NEW.id,
        new_org_id,
        COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        'Admin'
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.create_profile_on_signup();

-- Function to check if organization has PRO plan
CREATE OR REPLACE FUNCTION check_plan_feature(feature TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    org_plan plan_type;
BEGIN
    SELECT o.plan INTO org_plan
    FROM organizations o
    INNER JOIN profiles p ON p.org_id = o.id
    WHERE p.id = auth.uid();

    -- PRO features
    IF feature IN ('multiuser', 'delegation', 'audit', 'whatsapp') THEN
        RETURN org_plan = 'PRO';
    END IF;

    -- STARTER features (always available)
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to auto-update deadline status based on due date
CREATE OR REPLACE FUNCTION update_deadline_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'Aberto' AND NEW.due_at < NOW() THEN
        NEW.status = 'Atrasado';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update deadline status
CREATE TRIGGER auto_update_deadline_status
    BEFORE INSERT OR UPDATE ON deadlines
    FOR EACH ROW
    WHEN (NEW.status IN ('Aberto', 'Atrasado'))
    EXECUTE FUNCTION update_deadline_status();

-- Function to create audit log
CREATE OR REPLACE FUNCTION create_audit_log(
    p_action TEXT,
    p_entity_type TEXT,
    p_entity_id UUID,
    p_metadata JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
    log_id UUID;
    user_org_id UUID;
BEGIN
    SELECT org_id INTO user_org_id FROM profiles WHERE id = auth.uid();

    INSERT INTO audit_logs (org_id, actor_user_id, action, entity_type, entity_id, metadata)
    VALUES (user_org_id, auth.uid(), p_action, p_entity_type, p_entity_id, p_metadata)
    RETURNING id INTO log_id;

    RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get deadline statistics for organization
CREATE OR REPLACE FUNCTION get_deadline_stats()
RETURNS TABLE (
    total BIGINT,
    aberto BIGINT,
    atrasado BIGINT,
    hoje BIGINT,
    proximos_3_dias BIGINT,
    proximos_7_dias BIGINT
) AS $$
DECLARE
    user_org_id UUID;
BEGIN
    SELECT org_id INTO user_org_id FROM profiles WHERE id = auth.uid();

    RETURN QUERY
    SELECT
        COUNT(*) FILTER (WHERE status IN ('Aberto', 'Atrasado')) as total,
        COUNT(*) FILTER (WHERE status = 'Aberto') as aberto,
        COUNT(*) FILTER (WHERE status = 'Atrasado') as atrasado,
        COUNT(*) FILTER (WHERE DATE(due_at) = CURRENT_DATE AND status IN ('Aberto', 'Atrasado')) as hoje,
        COUNT(*) FILTER (WHERE due_at BETWEEN NOW() AND NOW() + INTERVAL '3 days' AND status IN ('Aberto', 'Atrasado')) as proximos_3_dias,
        COUNT(*) FILTER (WHERE due_at BETWEEN NOW() AND NOW() + INTERVAL '7 days' AND status IN ('Aberto', 'Atrasado')) as proximos_7_dias
    FROM deadlines
    WHERE org_id = user_org_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get inbox statistics for organization
CREATE OR REPLACE FUNCTION get_inbox_stats()
RETURNS TABLE (
    total BIGINT,
    novo BIGINT,
    em_triagem BIGINT,
    virou_prazo BIGINT
) AS $$
DECLARE
    user_org_id UUID;
BEGIN
    SELECT org_id INTO user_org_id FROM profiles WHERE id = auth.uid();

    RETURN QUERY
    SELECT
        COUNT(*) FILTER (WHERE status != 'Arquivado') as total,
        COUNT(*) FILTER (WHERE status = 'Novo') as novo,
        COUNT(*) FILTER (WHERE status = 'Em triagem') as em_triagem,
        COUNT(*) FILTER (WHERE status = 'Virou prazo') as virou_prazo
    FROM inbox_items
    WHERE org_id = user_org_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
