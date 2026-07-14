'use client'

import { useState, useEffect } from 'react'
import { InboxItemWithRelations, InboxItemType, InboxItemStatus } from '@/types'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'

interface InboxFiltersProps {
    items: InboxItemWithRelations[]
    onFilter: (filtered: InboxItemWithRelations[]) => void
}

export function InboxFilters({ items, onFilter }: InboxFiltersProps) {
    const [search, setSearch] = useState('')
    const [typeFilter, setTypeFilter] = useState<InboxItemType | 'all'>('all')
    const [statusFilter, setStatusFilter] = useState<InboxItemStatus | 'all'>('all')

    useEffect(() => {
        let filtered = items

        if (search) {
            const query = search.toLowerCase()
            filtered = filtered.filter(
                (item) =>
                    item.title.toLowerCase().includes(query) ||
                    item.body_text?.toLowerCase().includes(query) ||
                    item.matter?.cnj.includes(query) ||
                    item.client?.name.toLowerCase().includes(query)
            )
        }

        if (typeFilter !== 'all') {
            filtered = filtered.filter((item) => item.type === typeFilter)
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter((item) => item.status === statusFilter)
        }

        onFilter(filtered)
    }, [search, typeFilter, statusFilter, items, onFilter])

    return (
        <div className="flex gap-4 mt-4">
            <div className="flex-1">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por CNJ, cliente, palavras-chave..."
                        className="pl-9"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as InboxItemType | 'all')}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="Intimacao">Intimação</SelectItem>
                    <SelectItem value="Publicacao">Publicação</SelectItem>
                    <SelectItem value="Andamento">Andamento</SelectItem>
                    <SelectItem value="Distribuicao">Distribuição</SelectItem>
                    <SelectItem value="Manual">Manual</SelectItem>
                </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as InboxItemStatus | 'all')}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="Novo">Novo</SelectItem>
                    <SelectItem value="Em triagem">Em triagem</SelectItem>
                    <SelectItem value="Virou prazo">Virou prazo</SelectItem>
                    <SelectItem value="Arquivado">Arquivado</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
