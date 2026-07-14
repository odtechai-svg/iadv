'use client'

import { Card, CardContent } from '@/components/ui/card'
import { DeadlineStats as StatsType } from '@/types'
import { AlertCircle, Clock, Calendar, CheckCircle2 } from 'lucide-react'

interface DeadlineWidgetsProps {
    stats: StatsType
}

export function DeadlineWidgets({ stats }: DeadlineWidgetsProps) {
    const widgets = [
        {
            title: '5 Minutos por Dia',
            description: 'Próximos 7 dias + Atrasados',
            value: stats.proximos_7_dias + stats.atrasado,
            icon: Clock,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            title: 'Hoje',
            description: 'Prazos para hoje',
            value: stats.hoje,
            icon: Calendar,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
        },
        {
            title: 'Próximos 3 Dias',
            description: 'Prazos urgentes',
            value: stats.proximos_3_dias,
            icon: AlertCircle,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
        },
        {
            title: 'Atrasados',
            description: 'Requerem atenção',
            value: stats.atrasado,
            icon: AlertCircle,
            color: 'text-red-600',
            bgColor: 'bg-red-50',
        },
    ]

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {widgets.map((widget) => (
                <Card key={widget.title} className={widget.bgColor}>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg bg-white`}>
                                <widget.icon className={`h-6 w-6 ${widget.color}`} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    {widget.title}
                                </p>
                                <p className="text-2xl font-bold">{widget.value}</p>
                                <p className="text-xs text-muted-foreground">
                                    {widget.description}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
