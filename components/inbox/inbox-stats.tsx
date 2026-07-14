'use client'

import { Card, CardContent } from '@/components/ui/card'
import { InboxStats as StatsType } from '@/types'
import { Inbox, Clock, CheckCircle, Archive } from 'lucide-react'

interface InboxStatsProps {
    stats: StatsType
}

export function InboxStats({ stats }: InboxStatsProps) {
    const cards = [
        {
            label: 'Total Ativos',
            value: stats.total,
            icon: Inbox,
            color: 'text-blue-600',
        },
        {
            label: 'Novos',
            value: stats.novo,
            icon: Clock,
            color: 'text-orange-600',
        },
        {
            label: 'Em Triagem',
            value: stats.em_triagem,
            icon: CheckCircle,
            color: 'text-yellow-600',
        },
        {
            label: 'Viraram Prazo',
            value: stats.virou_prazo,
            icon: Archive,
            color: 'text-green-600',
        },
    ]

    return (
        <div className="grid gap-4 md:grid-cols-4">
            {cards.map((card) => (
                <Card key={card.label}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    {card.label}
                                </p>
                                <p className="text-2xl font-bold">{card.value}</p>
                            </div>
                            <card.icon className={`h-8 w-8 ${card.color}`} />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
