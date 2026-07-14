'use client'

import { useState } from 'react'
import { InboxItemWithRelations } from '@/types'
import { InboxItemCard } from './inbox-item-card'
import { InboxFilters } from './inbox-filters'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface InboxListProps {
    items: InboxItemWithRelations[]
}

export function InboxList({ items }: InboxListProps) {
    const [filteredItems, setFilteredItems] = useState(items)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Itens do Inbox</CardTitle>
                <InboxFilters items={items} onFilter={setFilteredItems} />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {filteredItems.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">
                            Nenhum item encontrado
                        </p>
                    ) : (
                        filteredItems.map((item) => (
                            <InboxItemCard key={item.id} item={item} />
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
