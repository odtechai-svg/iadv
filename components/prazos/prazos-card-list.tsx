'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate, formatRelativeDate, isOverdue } from '@/lib/utils'
import { Calendar, User, FileText, AlertCircle, Check, X } from 'lucide-react'
import Link from 'next/link'

interface Deadline {
    id: string
    title: string
    due_at: string
    priority: string
    status: string
    tipo_prazo: string
    providencia: string
    responsavel?: string
    autor?: string
    reu?: string
    matter: {
        id: string
        cnj: string
        client: {
            name: string
        }
    }
}

interface PrazosCardListProps {
    deadlines: Deadline[]
}

const STATUS_CONFIG = {
    'Agendado': { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: Calendar },
    'Atrasado': { color: 'bg-red-100 text-red-800 border-red-200', icon: AlertCircle },
    'Cumprido': { color: 'bg-green-100 text-green-800 border-green-200', icon: Check },
    'Cancelado': { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: X },
}

const PRIORITY_CONFIG = {
    'Urgente': 'bg-red-500 text-white',
    'Alta': 'bg-orange-500 text-white',
    'Média': 'bg-yellow-500 text-white',
    'Baixa': 'bg-blue-500 text-white',
}

export function PrazosCardList({ deadlines }: PrazosCardListProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {deadlines.map((deadline) => {
                const overdue = isOverdue(deadline.due_at)
                const statusConfig = STATUS_CONFIG[deadline.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG['Agendado']
                const StatusIcon = statusConfig.icon

                return (
                    <Link key={deadline.id} href={`/prazos/${deadline.id}`}>
                        <Card
                            className={`hover:shadow-lg transition-all cursor-pointer ${overdue && deadline.status === 'Agendado' ? 'border-red-300 bg-red-50/30' : ''
                                }`}
                        >
                            <CardContent className="pt-6">
                                {/* Cabeçalho com Status e Prioridade */}
                                <div className="flex items-start justify-between mb-4">
                                    <Badge className={statusConfig.color}>
                                        <StatusIcon className="h-3 w-3 mr-1" />
                                        {deadline.status}
                                    </Badge>
                                    {deadline.priority && (
                                        <Badge className={PRIORITY_CONFIG[deadline.priority as keyof typeof PRIORITY_CONFIG]}>
                                            {deadline.priority}
                                        </Badge>
                                    )}
                                </div>

                                {/* Tipo de Prazo e Providência - DESTAQUE */}
                                <div className="mb-4 space-y-2">
                                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                                        <p className="text-xs text-muted-foreground mb-1">TIPO DE PRAZO</p>
                                        <p className="font-bold text-base text-primary">
                                            {deadline.tipo_prazo || 'SEM INFORMAÇÃO'}
                                        </p>
                                    </div>

                                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                                        <p className="text-xs text-muted-foreground mb-1">PROVIDÊNCI A</p>
                                        <p className="font-bold text-base text-purple-900">
                                            {deadline.providencia || deadline.title}
                                        </p>
                                    </div>
                                </div>

                                {/* Data */}
                                <div className="flex items-center gap-2 mb-3 text-sm">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="font-semibold">{formatDate(deadline.due_at)}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatRelativeDate(deadline.due_at)}
                                        </p>
                                    </div>
                                </div>

                                {/* Processo */}
                                <div className="flex items-center gap-2 mb-2 text-sm">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-mono font-medium">{deadline.matter.cnj}</span>
                                </div>

                                {/* Autor e Réu */}
                                {(deadline.autor || deadline.reu) && (
                                    <div className="text-xs text-muted-foreground mb-3 space-y-1">
                                        {deadline.autor && (
                                            <p><strong>Autor(es):</strong> {deadline.autor}</p>
                                        )}
                                        {deadline.reu && (
                                            <p><strong>Réu(s):</strong> {deadline.reu}</p>
                                        )}
                                    </div>
                                )}

                                {/* Cliente */}
                                <div className="flex items-center gap-2 mb-3 text-sm">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                                        {deadline.matter.client.name}
                                    </span>
                                </div>

                                {/* Responsável */}
                                {deadline.responsavel && (
                                    <div className="text-xs text-muted-foreground mb-3">
                                        <strong>Responsável:</strong> {deadline.responsavel}
                                    </div>
                                )}

                                {/* Ações */}
                                <div className="flex gap-2 pt-3 border-t">
                                    <Button size="sm" variant="outline" className="flex-1">
                                        Editar
                                    </Button>
                                    <Button size="sm" variant="outline" className="flex-1">
                                        Concluir
                                    </Button>
                                    <Button size="sm" variant="ghost">
                                        Logs
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                )
            })}

            {deadlines.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                    <p className="text-lg font-medium mb-2">Nenhum prazo encontrado</p>
                    <p className="text-sm">Clique em "Novo Prazo/Audiência" para adicionar</p>
                </div>
            )}
        </div>
    )
}
