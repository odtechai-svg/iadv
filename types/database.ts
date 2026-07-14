export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            organizations: {
                Row: {
                    id: string
                    name: string
                    plan: 'STARTER' | 'PRO'
                    settings: Json
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    plan?: 'STARTER' | 'PRO'
                    settings?: Json
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    plan?: 'STARTER' | 'PRO'
                    settings?: Json
                    created_at?: string
                    updated_at?: string
                }
            }
            profiles: {
                Row: {
                    id: string
                    org_id: string
                    name: string
                    role: 'Admin' | 'Advogado' | 'Assistente'
                    phone: string | null
                    avatar_url: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    org_id: string
                    name: string
                    role?: 'Admin' | 'Advogado' | 'Assistente'
                    phone?: string | null
                    avatar_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    org_id?: string
                    name?: string
                    role?: 'Admin' | 'Advogado' | 'Assistente'
                    phone?: string | null
                    avatar_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            clients: {
                Row: {
                    id: string
                    org_id: string
                    type: 'PF' | 'PJ'
                    name: string
                    email: string | null
                    phone: string | null
                    cpf_cnpj: string | null
                    preferences: Json
                    notes: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    org_id: string
                    type: 'PF' | 'PJ'
                    name: string
                    email?: string | null
                    phone?: string | null
                    cpf_cnpj?: string | null
                    preferences?: Json
                    notes?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    org_id?: string
                    type?: 'PF' | 'PJ'
                    name?: string
                    email?: string | null
                    phone?: string | null
                    cpf_cnpj?: string | null
                    preferences?: Json
                    notes?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            matters: {
                Row: {
                    id: string
                    org_id: string
                    cnj: string
                    tribunal: string
                    uf: string
                    parties_text: string | null
                    client_id: string | null
                    responsible_user_id: string | null
                    status: 'Ativo' | 'Pausado' | 'Arquivado'
                    advanced_fields: Json
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    org_id: string
                    cnj: string
                    tribunal: string
                    uf: string
                    parties_text?: string | null
                    client_id?: string | null
                    responsible_user_id?: string | null
                    status?: 'Ativo' | 'Pausado' | 'Arquivado'
                    advanced_fields?: Json
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    org_id?: string
                    cnj?: string
                    tribunal?: string
                    uf?: string
                    parties_text?: string | null
                    client_id?: string | null
                    responsible_user_id?: string | null
                    status?: 'Ativo' | 'Pausado' | 'Arquivado'
                    advanced_fields?: Json
                    created_at?: string
                    updated_at?: string
                }
            }
            inbox_items: {
                Row: {
                    id: string
                    org_id: string
                    type: 'Intimacao' | 'Publicacao' | 'Andamento' | 'Distribuicao' | 'Manual'
                    status: 'Novo' | 'Em triagem' | 'Virou prazo' | 'Arquivado'
                    received_at: string
                    title: string
                    body_text: string | null
                    matter_id: string | null
                    client_id: string | null
                    responsible_user_id: string | null
                    metadata: Json
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    org_id: string
                    type: 'Intimacao' | 'Publicacao' | 'Andamento' | 'Distribuicao' | 'Manual'
                    status?: 'Novo' | 'Em triagem' | 'Virou prazo' | 'Arquivado'
                    received_at?: string
                    title: string
                    body_text?: string | null
                    matter_id?: string | null
                    client_id?: string | null
                    responsible_user_id?: string | null
                    metadata?: Json
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    org_id?: string
                    type?: 'Intimacao' | 'Publicacao' | 'Andamento' | 'Distribuicao' | 'Manual'
                    status?: 'Novo' | 'Em triagem' | 'Virou prazo' | 'Arquivado'
                    received_at?: string
                    title?: string
                    body_text?: string | null
                    matter_id?: string | null
                    client_id?: string | null
                    responsible_user_id?: string | null
                    metadata?: Json
                    created_at?: string
                    updated_at?: string
                }
            }
            deadlines: {
                Row: {
                    id: string
                    org_id: string
                    matter_id: string | null
                    client_id: string | null
                    inbox_item_id: string | null
                    title: string
                    due_at: string
                    priority: 'Baixa' | 'Media' | 'Alta' | 'Urgente'
                    status: 'Aberto' | 'Concluido' | 'Descartado' | 'Atrasado'
                    responsible_user_id: string | null
                    notes: string | null
                    checklist: Json
                    completed_at: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    org_id: string
                    matter_id?: string | null
                    client_id?: string | null
                    inbox_item_id?: string | null
                    title: string
                    due_at: string
                    priority?: 'Baixa' | 'Media' | 'Alta' | 'Urgente'
                    status?: 'Aberto' | 'Concluido' | 'Descartado' | 'Atrasado'
                    responsible_user_id?: string | null
                    notes?: string | null
                    checklist?: Json
                    completed_at?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    org_id?: string
                    matter_id?: string | null
                    client_id?: string | null
                    inbox_item_id?: string | null
                    title?: string
                    due_at?: string
                    priority?: 'Baixa' | 'Media' | 'Alta' | 'Urgente'
                    status?: 'Aberto' | 'Concluido' | 'Descartado' | 'Atrasado'
                    responsible_user_id?: string | null
                    notes?: string | null
                    checklist?: Json
                    completed_at?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            documents: {
                Row: {
                    id: string
                    org_id: string
                    filename: string
                    storage_path: string
                    mime_type: string | null
                    file_size: number | null
                    tags: string[]
                    linked_entity_type: string | null
                    linked_entity_id: string | null
                    uploaded_by: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    org_id: string
                    filename: string
                    storage_path: string
                    mime_type?: string | null
                    file_size?: number | null
                    tags?: string[]
                    linked_entity_type?: string | null
                    linked_entity_id?: string | null
                    uploaded_by?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    org_id?: string
                    filename?: string
                    storage_path?: string
                    mime_type?: string | null
                    file_size?: number | null
                    tags?: string[]
                    linked_entity_type?: string | null
                    linked_entity_id?: string | null
                    uploaded_by?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            message_logs: {
                Row: {
                    id: string
                    org_id: string
                    client_id: string | null
                    channel: 'email' | 'whatsapp'
                    direction: 'inbound' | 'outbound'
                    body: string
                    status: 'enviada' | 'pendente' | 'erro'
                    metadata: Json
                    sent_by: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    org_id: string
                    client_id?: string | null
                    channel: 'email' | 'whatsapp'
                    direction: 'inbound' | 'outbound'
                    body: string
                    status?: 'enviada' | 'pendente' | 'erro'
                    metadata?: Json
                    sent_by?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    org_id?: string
                    client_id?: string | null
                    channel?: 'email' | 'whatsapp'
                    direction?: 'inbound' | 'outbound'
                    body?: string
                    status?: 'enviada' | 'pendente' | 'erro'
                    metadata?: Json
                    sent_by?: string | null
                    created_at?: string
                }
            }
            audit_logs: {
                Row: {
                    id: string
                    org_id: string
                    actor_user_id: string | null
                    action: string
                    entity_type: string
                    entity_id: string | null
                    metadata: Json
                    created_at: string
                }
                Insert: {
                    id?: string
                    org_id: string
                    actor_user_id?: string | null
                    action: string
                    entity_type: string
                    entity_id?: string | null
                    metadata?: Json
                    created_at?: string
                }
                Update: {
                    id?: string
                    org_id?: string
                    actor_user_id?: string | null
                    action?: string
                    entity_type?: string
                    entity_id?: string | null
                    metadata?: Json
                    created_at?: string
                }
            }
        }
    }
}
