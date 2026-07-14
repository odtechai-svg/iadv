'use client'

import { useState } from 'react'
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners } from '@dnd-kit/core'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, FileDown, Settings, Search } from 'lucide-react'
import { mockTarefas, tarefasStats, Tarefa, TarefaStatus } from '@/lib/mock-tarefas'
import { formatDate } from '@/lib/utils'
import { CreateTaskDialog } from '@/components/tarefas/create-task-dialog'
import * as XLSX from 'xlsx'

const STATUS_CONFIG = {
    a_fazer: { label: 'A FAZER', color: 'bg-yellow-500', count: tarefasStats.a_fazer },
    em_progresso: { label: 'EM PROGRESSO', color: 'bg-blue-600', count: tarefasStats.em_progresso },
    atrasado: { label: 'ATRASADOS', color: 'bg-red-500', count: tarefasStats.atrasados },
    concluido: { label: 'CONCLUÍDOS', color: 'bg-green-500', count: tarefasStats.concluidos },
    descartado: { label: 'DESCARTADOS', color: 'bg-gray-500', count: tarefasStats.descartados },
}

const PRIORIDADE_CONFIG = {
    'Baixa': 'bg-gray-100 text-gray-800',
    'Média': 'bg-yellow-100 text-yellow-800',
    'Alta': 'bg-orange-100 text-orange-800',
    'Urgente': 'bg-red-100 text-red-800',
}

export default function TarefasPage() {
    const [tarefas, setTarefas] = useState<Tarefa[]>(mockTarefas)
    const [createTaskOpen, setCreateTaskOpen] = useState(false)
    const [activeId, setActiveId] = useState<string | null>(null)

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (!over) {
            setActiveId(null)
            return
        }

        const taskId = active.id as string
        const newStatus = over.id as TarefaStatus

        setTarefas(tasks =>
            tasks.map(task =>
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        )

        setActiveId(null)
    }

    const exportToExcel = () => {
        const data = tarefas.map(t => ({
            'Título': t.titulo,
            'Descrição': t.descricao,
            'Status': STATUS_CONFIG[t.status].label,
            'Prioridade': t.prioridade,
            'Data Final': formatDate(t.data_final),
            'Responsável': t.responsavel_nome,
            'Cliente': t.cliente_nome,
            'Processo CNJ': t.processo_cnj || '-',
            'Lista': t.lista_tarefas,
        }))

        const ws = XLSX.utils.json_to_sheet(data)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Tarefas')
        XLSX.writeFile(wb, `tarefas_${new Date().toISOString().split('T')[0]}.xlsx`)
    }

    const activeTarefa = activeId ? tarefas.find(t => t.id === activeId) : null

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Gerenciamento de Tarefas</h1>
                    <p className="text-muted-foreground">
                        Consulte e gerencie suas tarefas
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={exportToExcel}>
                        <FileDown className="mr-2 h-4 w-4" />
                        Exportar Excel
                    </Button>
                    <Button variant="outline">
                        <Settings className="mr-2 h-4 w-4" />
                        Gerenciar Lista
                    </Button>
                    <Button onClick={() => setCreateTaskOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Nova Tarefa
                    </Button>
                </div>
            </div>

            {/* Filtros (simplificados por enquanto) */}
            <Card>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="col-span-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Nome da tarefa..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                                />
                            </div>
                        </div>
                        <Button variant="default">
                            <Search className="mr-2 h-4 w-4" />
                            Consultar
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Kanban Board */}
            <DndContext
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                collisionDetection={closestCorners}
            >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {(Object.keys(STATUS_CONFIG) as TarefaStatus[]).map(status => {
                        const config = STATUS_CONFIG[status]
                        const statusTarefas = tarefas.filter(t => t.status === status)

                        return (
                            <KanbanColumn
                                key={status}
                                id={status}
                                title={config.label}
                                count={config.count}
                                color={config.color}
                                tarefas={statusTarefas}
                            />
                        )
                    })}
                </div>

                <DragOverlay>
                    {activeTarefa ? <TarefaCard tarefa={activeTarefa} isDragging /> : null}
                </DragOverlay>
            </DndContext>

            <CreateTaskDialog open={createTaskOpen} onOpenChange={setCreateTaskOpen} />
        </div >
    )
}

function KanbanColumn({
    id,
    title,
    count,
    color,
    tarefas
}: {
    id: TarefaStatus
    title: string
    count: number
    color: string
    tarefas: Tarefa[]
}) {
    const { useDroppable } = require('@dnd-kit/core')
    const { setNodeRef } = useDroppable({ id })

    return (
        <div ref={setNodeRef} className="flex flex-col">
            <div className={`${color} text-white text-center py-3 rounded-t-lg font-semibold`}>
                {title} {count}
            </div>
            <div className="bg-gray-50 border border-t-0 rounded-b-lg p-3 min-h-[500px] space-y-3">
                {tarefas.length === 0 && (
                    <div className="text-center text-muted-foreground text-sm py-8">
                        Sem Tarefas
                    </div>
                )}
                {tarefas.map(tarefa => (
                    <DraggableTarefaCard key={tarefa.id} tarefa={tarefa} />
                ))}
            </div>
        </div>
    )
}

function DraggableTarefaCard({ tarefa }: { tarefa: Tarefa }) {
    const { useDraggable } = require('@dnd-kit/core')
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: tarefa.id,
    })

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
    } : undefined

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="cursor-grab active:cursor-grabbing"
        >
            <TarefaCard tarefa={tarefa} />
        </div>
    )
}

function TarefaCard({ tarefa, isDragging = false }: { tarefa: Tarefa; isDragging?: boolean }) {
    return (
        <Card className={`${isDragging ? 'opacity-50' : ''}`}>
            <CardContent className="pt-4">
                <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-sm">{tarefa.titulo}</h4>
                    </div>

                    <div className="flex flex-wrap gap-1">
                        <Badge className={PRIORIDADE_CONFIG[tarefa.prioridade]}>
                            {tarefa.prioridade}
                        </Badge>
                        {tarefa.status === 'atrasado' && (
                            <Badge variant="destructive" className="text-xs">
                                Atrasado
                            </Badge>
                        )}
                    </div>

                    <div className="text-xs text-muted-foreground space-y-1">
                        <div><strong>Data Final:</strong> {formatDate(tarefa.data_final)}</div>
                        <div><strong>Lista:</strong> {tarefa.lista_tarefas}</div>
                        {tarefa.processo_cnj && (
                            <div className="font-mono">{tarefa.processo_cnj}</div>
                        )}
                        <div><strong>Cliente:</strong> {tarefa.cliente_nome}</div>
                        <div><strong>Responsável:</strong> {tarefa.responsavel_nome}</div>
                    </div>

                    <div className="flex gap-1 pt-2">
                        <Button size="sm" variant="outline" className="text-xs h-7">
                            Editar
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs h-7">
                            Concluir
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs h-7">
                            Logs
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
