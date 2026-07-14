-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE plan_type AS ENUM ('STARTER', 'PRO');
CREATE TYPE user_role AS ENUM ('Admin', 'Advogado', 'Assistente');
CREATE TYPE client_type AS ENUM ('PF', 'PJ');
CREATE TYPE matter_status AS ENUM ('Ativo', 'Pausado', 'Arquivado');
CREATE TYPE inbox_item_type AS ENUM ('Intimacao', 'Publicacao', 'Andamento', 'Distribuicao', 'Manual');
CREATE TYPE inbox_item_status AS ENUM ('Novo', 'Em triagem', 'Virou prazo', 'Arquivado');
CREATE TYPE deadline_status AS ENUM ('Aberto', 'Concluido', 'Descartado', 'Atrasado');
CREATE TYPE deadline_priority AS ENUM ('Baixa', 'Media', 'Alta', 'Urgente');
CREATE TYPE message_channel AS ENUM ('email', 'whatsapp');
CREATE TYPE message_direction AS ENUM ('inbound', 'outbound');
CREATE TYPE message_status AS ENUM ('enviada', 'pendente', 'erro');

-- Organizations table (multi-tenant)
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    plan plan_type NOT NULL DEFAULT 'STARTER',
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_organizations_plan ON organizations(plan);

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'Advogado',
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_profiles_org_id ON profiles(org_id);
CREATE INDEX idx_profiles_role ON profiles(role);

-- Clients table
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    type client_type NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    cpf_cnpj TEXT,
    preferences JSONB DEFAULT '{"email_notifications": true, "whatsapp_notifications": false}',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_clients_org_id ON clients(org_id);
CREATE INDEX idx_clients_name ON clients(name);
CREATE INDEX idx_clients_cpf_cnpj ON clients(cpf_cnpj) WHERE cpf_cnpj IS NOT NULL;

-- Matters (Processes) table
CREATE TABLE matters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    cnj TEXT NOT NULL,
    tribunal TEXT NOT NULL,
    uf TEXT NOT NULL,
    parties_text TEXT,
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    responsible_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    status matter_status NOT NULL DEFAULT 'Ativo',
    advanced_fields JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_matters_org_id ON matters(org_id);
CREATE INDEX idx_matters_cnj ON matters(cnj);
CREATE INDEX idx_matters_client_id ON matters(client_id);
CREATE INDEX idx_matters_status ON matters(status);
CREATE INDEX idx_matters_responsible_user_id ON matters(responsible_user_id);

-- Inbox items table
CREATE TABLE inbox_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    type inbox_item_type NOT NULL,
    status inbox_item_status NOT NULL DEFAULT 'Novo',
    received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    title TEXT NOT NULL,
    body_text TEXT,
    matter_id UUID REFERENCES matters(id) ON DELETE SET NULL,
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    responsible_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_inbox_items_org_id ON inbox_items(org_id);
CREATE INDEX idx_inbox_items_type ON inbox_items(type);
CREATE INDEX idx_inbox_items_status ON inbox_items(status);
CREATE INDEX idx_inbox_items_received_at ON inbox_items(received_at DESC);
CREATE INDEX idx_inbox_items_matter_id ON inbox_items(matter_id);

-- Deadlines table
CREATE TABLE deadlines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    matter_id UUID REFERENCES matters(id) ON DELETE SET NULL,
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    inbox_item_id UUID REFERENCES inbox_items(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    due_at TIMESTAMPTZ NOT NULL,
    priority deadline_priority NOT NULL DEFAULT 'Media',
    status deadline_status NOT NULL DEFAULT 'Aberto',
    responsible_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    notes TEXT,
    checklist JSONB DEFAULT '[]',
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_deadlines_org_id ON deadlines(org_id);
CREATE INDEX idx_deadlines_due_at ON deadlines(due_at);
CREATE INDEX idx_deadlines_status ON deadlines(status);
CREATE INDEX idx_deadlines_matter_id ON deadlines(matter_id);
CREATE INDEX idx_deadlines_responsible_user_id ON deadlines(responsible_user_id);
CREATE INDEX idx_deadlines_client_id ON deadlines(client_id);

-- Documents table
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    filename TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    mime_type TEXT,
    file_size BIGINT,
    tags TEXT[] DEFAULT '{}',
    linked_entity_type TEXT,
    linked_entity_id UUID,
    uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_documents_org_id ON documents(org_id);
CREATE INDEX idx_documents_tags ON documents USING GIN(tags);
CREATE INDEX idx_documents_linked_entity ON documents(linked_entity_type, linked_entity_id);

-- Message logs table
CREATE TABLE message_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    channel message_channel NOT NULL,
    direction message_direction NOT NULL,
    body TEXT NOT NULL,
    status message_status NOT NULL DEFAULT 'pendente',
    metadata JSONB DEFAULT '{}',
    sent_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_message_logs_org_id ON message_logs(org_id);
CREATE INDEX idx_message_logs_client_id ON message_logs(client_id);
CREATE INDEX idx_message_logs_created_at ON message_logs(created_at DESC);

-- Audit logs table (PRO feature)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    actor_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_org_id ON audit_logs(org_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_matters_updated_at BEFORE UPDATE ON matters
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inbox_items_updated_at BEFORE UPDATE ON inbox_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deadlines_updated_at BEFORE UPDATE ON deadlines
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
