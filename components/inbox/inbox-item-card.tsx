'use client'

import { InboxItemWithRelations } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDateTime, truncate } from '@/lib/utils'
import {
    Calendar,
    Link as LinkIcon,
    UserPlus,
    Send,
    Archive,
    MoreVertical
} from 'lucide-react'

interface InboxItemCardProps {
    item: InboxItemWithRelations
}

const typeColors = {
    Intimacao: 'bg-red-100 text-red-800',
    Publicacao: 'bg-blue-100 text-blue-800',
    Andamento: 'bg-green-100 text-green-800',
    Distribuicao: 'bg-purple-100 text-purple-800',
    Manual: 'bg-gray-100 text-gray-800',
}

const statusColors = {
    Novo: 'bg-orange-100 text-orange-800',
    'Em triagem': 'bg-yellow-100 text-yellow-800',
    'Virou prazo': 'bg-green-100 text-green-800',
    Arquivado: 'bg-gray-100 text-gray-800',
}

export function InboxItemCard({ item }: InboxItemCardProps) {
    return (
        <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Badge className={typeColors[item.type]}>{item.type}</Badge>
                        <Badge className={statusColors[item.status]}>{item.status}</Badge>
                        <span className="text-sm text-muted-foreground">
                            {formatDateTime(item.received_at)}
                        </span>
                    </div>

                    <h3 className="font-semibold mb-1">{item.title}</h3>

                    {item.body_text && (
                        <p className="text-sm text-muted-foreground mb-2">
                            {truncate(item.body_text, 200)}
                        </p>
                    )}

                    <div className="flex items-center gap-4 text-sm">
                        {item.matter && (
                            <span className="text-muted-foreground">
                                Processo: <span className="font-medium">{item.matter.cnj}</span>
                            </span>
                        )}
                        {item.client && (
                            <span className="text-muted-foreground">
                                Cliente: <span className="font-medium">{item.client.name}</span>
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline" title="Criar prazo">
                        <Calendar className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" title="Vincular a processo">
                        <LinkIcon className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" title="Delegar">
                        <UserPlus className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" title="Enviar resumo">
                        <Send className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" title="Arquivar">
                        <Archive className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
