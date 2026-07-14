'use client'

import { DeadlineWithRelations } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate, isOverdue, formatCNJ } from '@/lib/utils'
import { CheckCircle2, Calendar, UserPlus, Bell } from 'lucide-react'

interface DeadlineListProps {
    deadlines: DeadlineWithRelations[]
}

const priorityColors = {
    Baixa: 'bg-gray-100 text-gray-800',
    Media: 'bg-blue-100 text-blue-800',
    Alta: 'bg-orange-100 text-orange-800',
    Urgente: 'bg-red-100 text-red-800',
}

const statusColors = {
    Aberto: 'bg-green-100 text-green-800',
    Concluido: 'bg-gray-100 text-gray-800',
    Descartado: 'bg-gray-100 text-gray-800',
    Atrasado: 'bg-red-100 text-red-800',
}

export function DeadlineList({ deadlines }: DeadlineListProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Lista de Prazos</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Prazo</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Processo</TableHead>
                            <TableHead>Cliente</TableHead>
                            <TableHead>Responsável</TableHead>
                            <TableHead>Prioridade</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {deadlines.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center text-muted-foreground">
                                    Nenhum prazo encontrado
                                </TableCell>
                            </TableRow>
                        ) : (
                            deadlines.map((deadline) => (
                                <TableRow key={deadline.id} className={isOverdue(deadline.due_at) ? 'bg-red-50' : ''}>
                                    <TableCell className="font-medium">{deadline.title}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span>{formatDate(deadline.due_at)}</span>
                                            {isOverdue(deadline.due_at) && (
                                                <span className="text-xs text-red-600 font-semibold">ATRASADO</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {deadline.matter ? (
                                            <span className="text-sm">{formatCNJ(deadline.matter.cnj)}</span>
                                        ) : (
                                            <span className="text-muted-foreground">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {deadline.client ? (
                                            <span className="text-sm">{deadline.client.name}</span>
                                        ) : (
                                            <span className="text-muted-foreground">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {deadline.responsible_user ? (
                                            <span className="text-sm">{deadline.responsible_user.name}</span>
                                        ) : (
                                            <span className="text-muted-foreground">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={priorityColors[deadline.priority]}>
                                            {deadline.priority}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={statusColors[deadline.status]}>
                                            {deadline.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            <Button size="sm" variant="ghost" title="Concluir">
                                                <CheckCircle2 className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="ghost" title="Reagendar">
                                                <Calendar className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="ghost" title="Delegar">
                                                <UserPlus className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="ghost" title="Lembrete">
                                                <Bell className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
