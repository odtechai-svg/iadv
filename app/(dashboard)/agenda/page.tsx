'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Calendar, List, Clock, ExternalLink } from 'lucide-react'
import { mockDeadlines } from '@/lib/mock-data'
import { mockPublicacoes } from '@/lib/mock-publicacoes'
import { formatDate, formatRelativeDate, isOverdue } from '@/lib/utils'
import Link from 'next/link'

type ViewMode = 'month' | 'week' | 'day' | 'list'

export default function AgendaPage() {
    const [viewMode, setViewMode] = useState<ViewMode>('month')
    const [currentDate, setCurrentDate] = useState(new Date())

    // Combina prazos e publicações para agenda
    const agendaItems = [
        ...mockDeadlines.map(d => ({
            id: d.id,
            type: 'prazo' as const,
            title: d.title,
            date: new Date(d.due_at),
            priority: d.priority,
            status: d.status,
            matter: d.matter,
            link: `/prazos`,
        })),
        ...mockPublicacoes.map(p => ({
            id: p.id,
            type: 'publicacao' as const,
            title: `${p.conteudo.tipo_comunicacao} - ${p.processo.cnj}`,
            date: new Date(p.data_publicacao),
            priority: null,
            status: p.status === 'tratado' ? 'Lido' : 'Não Lido',
            matter: null,
            link: `/publicacoes`,
        })),
    ].sort((a, b) => a.date.getTime() - b.date.getTime())

    // Agrupa itens por data para visualização de lista
    const groupedByDate = agendaItems.reduce((acc, item) => {
        const dateKey = item.date.toDateString()
        if (!acc[dateKey]) {
            acc[dateKey] = []
        }
        acc[dateKey].push(item)
        return acc
    }, {} as Record<string, typeof agendaItems>)

    // Função para obter dias da semana atual
    const getWeekDays = () => {
        const start = new Date(currentDate)
        const day = start.getDay()
        const diff = start.getDate() - day // Ajusta para domingo
        const sunday = new Date(start.setDate(diff))

        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(sunday)
            date.setDate(sunday.getDate() + i)
            return date
        })
    }

    const weekDays = getWeekDays()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Agenda</h1>
                    <p className="text-muted-foreground">
                        Visualize todos os seus compromissos em um só lugar
                    </p>
                </div>
            </div>

            {/* Controles de Visualização */}
            <Card>
                <CardContent className="pt-6">
                    <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)} className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="month">
                                <Calendar className="mr-2 h-4 w-4" />
                                Mês
                            </TabsTrigger>
                            <TabsTrigger value="week">
                                <Calendar className="mr-2 h-4 w-4" />
                                Semana
                            </TabsTrigger>
                            <TabsTrigger value="day">
                                <Clock className="mr-2 h-4 w-4" />
                                Dia
                            </TabsTrigger>
                            <TabsTrigger value="list">
                                <List className="mr-2 h-4 w-4" />
                                Lista
                            </TabsTrigger>
                        </TabsList>

                        {/* Visualização Mensal */}
                        <TabsContent value="month" className="mt-6">
                            <div className="border rounded-lg p-4">
                                <div className="text-center mb-4">
                                    <h3 className="text-lg font-semibold">Dezembro 2024</h3>
                                    <p className="text-sm text-muted-foreground">Visualização de calendário mensal</p>
                                </div>

                                {/* Grade do Calendário (simplificada) */}
                                <div className="grid grid-cols-7 gap-2">
                                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                                        <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                                            {day}
                                        </div>
                                    ))}

                                    {/* Dias do mês */}
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                                        const dayItems = agendaItems.filter(item => item.date.getDate() === day)

                                        return (
                                            <div
                                                key={day}
                                                className={`border rounded p-2 min-h-[80px] ${dayItems.length > 0 ? 'bg-blue-50 border-blue-200' : ''}`}
                                            >
                                                <div className="text-sm font-medium mb-1">{day}</div>
                                                {dayItems.length > 0 && (
                                                    <div className="space-y-1">
                                                        {dayItems.slice(0, 2).map(item => (
                                                            <Link
                                                                key={item.id}
                                                                href={item.link}
                                                                className={`text-xs p-1 rounded truncate block hover:opacity-80 ${item.type === 'prazo' ? 'bg-orange-100 text-orange-900' : 'bg-blue-100 text-blue-900'
                                                                    }`}
                                                            >
                                                                {item.title.substring(0, 15)}...
                                                            </Link>
                                                        ))}
                                                        {dayItems.length > 2 && (
                                                            <div className="text-xs text-muted-foreground">
                                                                +{dayItems.length - 2} mais
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </TabsContent>

                        {/* Visualização Semanal */}
                        <TabsContent value="week" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>Semana de {formatDate(weekDays[0])} a {formatDate(weekDays[6])}</span>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                    const newDate = new Date(currentDate)
                                                    newDate.setDate(newDate.getDate() - 7)
                                                    setCurrentDate(newDate)
                                                }}
                                            >
                                                ← Anterior
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => setCurrentDate(new Date())}
                                            >
                                                Hoje
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                    const newDate = new Date(currentDate)
                                                    newDate.setDate(newDate.getDate() + 7)
                                                    setCurrentDate(newDate)
                                                }}
                                            >
                                                Próxima →
                                            </Button>
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-7 gap-2">
                                        {weekDays.map((day, index) => {
                                            const dayItems = agendaItems.filter(item =>
                                                item.date.toDateString() === day.toDateString()
                                            )
                                            const isToday = day.toDateString() === new Date().toDateString()

                                            return (
                                                <div key={index} className={`border rounded-lg p-3 min-h-[200px] ${isToday ? 'bg-blue-50 border-blue-300' : ''}`}>
                                                    <div className="text-center mb-3">
                                                        <div className="text-xs text-muted-foreground">
                                                            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][index]}
                                                        </div>
                                                        <div className={`text-lg font-semibold ${isToday ? 'text-blue-600' : ''}`}>
                                                            {day.getDate()}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        {dayItems.map(item => (
                                                            <Link
                                                                key={item.id}
                                                                href={item.link}
                                                                className={`block text-xs p-2 rounded hover:opacity-80 ${item.type === 'prazo'
                                                                        ? 'bg-orange-100 text-orange-900 border border-orange-200'
                                                                        : 'bg-blue-100 text-blue-900 border border-blue-200'
                                                                    }`}
                                                            >
                                                                <div className="font-medium truncate">{item.title}</div>
                                                                {item.priority && (
                                                                    <Badge variant="outline" className="mt-1 text-xs">
                                                                        {item.priority}
                                                                    </Badge>
                                                                )}
                                                            </Link>
                                                        ))}
                                                    </div>

                                                    {dayItems.length === 0 && (
                                                        <div className="text-center text-xs text-muted-foreground mt-4">
                                                            Sem eventos
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Visualização Diária */}
                        <TabsContent value="day" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Hoje - {formatDate(new Date())}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {agendaItems
                                            .filter(item => {
                                                const today = new Date().toDateString()
                                                return item.date.toDateString() === today
                                            })
                                            .map(item => (
                                                <Link
                                                    key={item.id}
                                                    href={item.link}
                                                    className="border rounded-lg p-3 block hover:bg-muted/50 transition-colors"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <Badge variant={item.type === 'prazo' ? 'default' : 'secondary'}>
                                                                    {item.type === 'prazo' ? 'Prazo' : 'Publicação'}
                                                                </Badge>
                                                                {item.priority && (
                                                                    <Badge variant={item.priority === 'Urgente' ? 'destructive' : 'outline'}>
                                                                        {item.priority}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <p className="font-medium">{item.title}</p>
                                                            {item.matter && (
                                                                <p className="text-sm text-muted-foreground">
                                                                    {item.matter.cnj}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <ExternalLink className="h-4 w-4 text-muted-foreground ml-2" />
                                                    </div>
                                                </Link>
                                            ))}

                                        {agendaItems.filter(item => {
                                            const today = new Date().toDateString()
                                            return item.date.toDateString() === today
                                        }).length === 0 && (
                                                <div className="text-center py-8 text-muted-foreground">
                                                    <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                                                    <p>Nenhum compromisso para hoje</p>
                                                </div>
                                            )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Visualização Lista - Agrupada por Data */}
                        <TabsContent value="list" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Lista Completa - Ordenada por Data</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {Object.entries(groupedByDate).map(([dateKey, items]) => (
                                            <div key={dateKey}>
                                                {/* Cabeçalho da Data */}
                                                <div className="flex items-center gap-3 mb-3 pb-2 border-b">
                                                    <Calendar className="h-5 w-5 text-primary" />
                                                    <div>
                                                        <h3 className="font-semibold text-lg">
                                                            {formatDate(items[0].date)}
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            {formatRelativeDate(items[0].date.toISOString())} • {items.length} {items.length === 1 ? 'evento' : 'eventos'}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Itens da Data */}
                                                <div className="space-y-3 ml-8">
                                                    {items.map(item => (
                                                        <Link
                                                            key={item.id}
                                                            href={item.link}
                                                            className="border rounded-lg p-4 block hover:bg-muted/50 transition-colors"
                                                        >
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div className="flex items-center gap-2">
                                                                    <Badge variant={item.type === 'prazo' ? 'default' : 'secondary'}>
                                                                        {item.type === 'prazo' ? 'Prazo' : 'Publicação'}
                                                                    </Badge>
                                                                    {item.priority && (
                                                                        <Badge variant={
                                                                            item.priority === 'Urgente' ? 'destructive' :
                                                                                item.priority === 'Alta' ? 'destructive' :
                                                                                    'outline'
                                                                        }>
                                                                            {item.priority}
                                                                        </Badge>
                                                                    )}
                                                                    {item.type === 'prazo' && isOverdue(item.date.toISOString()) && (
                                                                        <Badge variant="destructive">Atrasado</Badge>
                                                                    )}
                                                                </div>
                                                                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                                            </div>

                                                            <p className="font-medium mb-1">{item.title}</p>

                                                            {item.matter && (
                                                                <p className="text-sm text-muted-foreground font-mono">
                                                                    {item.matter.cnj} - {item.matter.client?.name}
                                                                </p>
                                                            )}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
