'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCNJ } from '@/lib/utils'
import { Eye, MoreVertical } from 'lucide-react'
import Link from 'next/link'

interface Matter {
    id: string
    cnj: string
    tribunal: string
    parties_text: string
    status: string
    client?: {
        name: string
    }
}

interface MatterListProps {
    matters: Matter[]
}

export function MatterList({ matters }: MatterListProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Lista de Processos</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Número do Processo</TableHead>
                            <TableHead>Autor(es)</TableHead>
                            <TableHead>Réu(s)</TableHead>
                            <TableHead>Tribunal</TableHead>
                            <TableHead>Cliente</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {matters.map((matter) => (
                            <TableRow key={matter.id} className="hover:bg-muted/50">
                                <TableCell className="font-mono font-medium">
                                    <Link
                                        href={`/processos/${matter.id}`}
                                        className="text-primary hover:underline"
                                    >
                                        {formatCNJ(matter.cnj)}
                                    </Link>
                                </TableCell>
                                <TableCell className="max-w-[200px] truncate">
                                    {matter.parties_text.split(' x ')[0] || 'SEM INFORMAÇÃO'}
                                </TableCell>
                                <TableCell className="max-w-[200px] truncate">
                                    {matter.parties_text.split(' x ')[1] || 'SEM INFORMAÇÃO'}
                                </TableCell>
                                <TableCell>{matter.tribunal}</TableCell>
                                <TableCell>{matter.client?.name}</TableCell>
                                <TableCell>
                                    <Badge variant={matter.status === 'Ativo' ? 'default' : 'secondary'}>
                                        {matter.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/processos/${matter.id}`}>
                                            <Button variant="ghost" size="sm">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button variant="ghost" size="sm">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {matters.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        <p className="text-lg font-medium mb-2">Nenhum processo encontrado</p>
                        <p className="text-sm">Clique em "Novo Processo" para adicionar</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
