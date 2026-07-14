'use client'

import { Client } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCPF, formatCNPJ, formatPhone } from '@/lib/utils'
import { Eye } from 'lucide-react'
import Link from 'next/link'

interface ClientListProps {
    clients: Client[]
}

export function ClientList({ clients }: ClientListProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Lista de Clientes</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>CPF/CNPJ</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clients.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-muted-foreground">
                                    Nenhum cliente encontrado
                                </TableCell>
                            </TableRow>
                        ) : (
                            clients.map((client) => (
                                <TableRow key={client.id}>
                                    <TableCell className="font-medium">{client.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={client.type === 'PF' ? 'default' : 'secondary'}>
                                            {client.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-mono text-sm">
                                        {client.cpf_cnpj ? (
                                            client.type === 'PF' ? formatCPF(client.cpf_cnpj) : formatCNPJ(client.cpf_cnpj)
                                        ) : (
                                            <span className="text-muted-foreground">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell>{client.email || <span className="text-muted-foreground">-</span>}</TableCell>
                                    <TableCell>
                                        {client.phone ? formatPhone(client.phone) : <span className="text-muted-foreground">-</span>}
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/clientes/${client.id}`}>
                                            <Button size="sm" variant="ghost">
                                                <Eye className="h-4 w-4 mr-1" />
                                                Ver
                                            </Button>
                                        </Link>
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
