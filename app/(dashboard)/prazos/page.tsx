'use client'

import { useState } from 'react'
import { DeadlineWidgets } from '@/components/prazos/deadline-widgets'
import { PrazosFilters } from '@/components/prazos/prazos-filters'
import { PrazosCardList } from '@/components/prazos/prazos-card-list'
import { CalculadoraPrazoDialog } from '@/components/prazos/calculadora-prazo-dialog'
import { Button } from '@/components/ui/button'
import { Plus, FileDown } from 'lucide-react'
import { mockDeadlines, mockStats } from '@/lib/mock-data'

export default function PrazosPage() {
    const [calculadoraOpen, setCalculadoraOpen] = useState(false)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Meus Prazos/Audiências</h1>
                    <p className="text-muted-foreground">
                        Consulte seus prazos/audiências
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <FileDown className="mr-2 h-4 w-4" />
                        Exportar Excel
                    </Button>
                    <Button variant="outline">
                        Imprimir
                    </Button>
                    <Button onClick={() => setCalculadoraOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Novo Prazo/Audiência
                    </Button>
                </div>
            </div>

            <DeadlineWidgets stats={mockStats.deadlines} />

            <PrazosFilters onFilter={(filters) => console.log('Filtros:', filters)} />

            <PrazosCardList deadlines={mockDeadlines} />

            <CalculadoraPrazoDialog
                open={calculadoraOpen}
                onOpenChange={setCalculadoraOpen}
            />
        </div>
    )
}
