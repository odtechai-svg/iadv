import { Database } from './database'

// Table types
export type Organization = Database['public']['Tables']['organizations']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Client = Database['public']['Tables']['clients']['Row']
export type Matter = Database['public']['Tables']['matters']['Row']
export type InboxItem = Database['public']['Tables']['inbox_items']['Row']
export type Deadline = Database['public']['Tables']['deadlines']['Row']
export type Document = Database['public']['Tables']['documents']['Row']
export type MessageLog = Database['public']['Tables']['message_logs']['Row']
export type AuditLog = Database['public']['Tables']['audit_logs']['Row']

// Enums
export type PlanType = 'STARTER' | 'PRO'
export type UserRole = 'Admin' | 'Advogado' | 'Assistente'
export type ClientType = 'PF' | 'PJ'
export type MatterStatus = 'Ativo' | 'Pausado' | 'Arquivado'
export type InboxItemType = 'Intimacao' | 'Publicacao' | 'Andamento' | 'Distribuicao' | 'Manual'
export type InboxItemStatus = 'Novo' | 'Em triagem' | 'Virou prazo' | 'Arquivado'
export type DeadlineStatus = 'Aberto' | 'Concluido' | 'Descartado' | 'Atrasado'
export type DeadlinePriority = 'Baixa' | 'Media' | 'Alta' | 'Urgente'
export type MessageChannel = 'email' | 'whatsapp'
export type MessageDirection = 'inbound' | 'outbound'
export type MessageStatus = 'enviada' | 'pendente' | 'erro'

// Extended types with relations
export interface InboxItemWithRelations extends InboxItem {
    matter?: Matter | null
    client?: Client | null
    responsible_user?: Profile | null
}

export interface DeadlineWithRelations extends Deadline {
    matter?: Matter | null
    client?: Client | null
    responsible_user?: Profile | null
}

export interface MatterWithRelations extends Matter {
    client?: Client | null
    responsible_user?: Profile | null
}

export interface MessageLogWithRelations extends MessageLog {
    client?: Client | null
    sent_by_user?: Profile | null
}

// Preferences types
export interface ClientPreferences {
    email_notifications: boolean
    whatsapp_notifications: boolean
}

export interface OrganizationSettings {
    whatsapp_webhook_url?: string
    [key: string]: any
}

// Checklist item
export interface ChecklistItem {
    id: string
    text: string
    completed: boolean
}

// Stats types
export interface DeadlineStats {
    total: number
    aberto: number
    atrasado: number
    hoje: number
    proximos_3_dias: number
    proximos_7_dias: number
}

export interface InboxStats {
    total: number
    novo: number
    em_triagem: number
    virou_prazo: number
}
