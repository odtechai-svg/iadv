'use client'

import { MatterList } from '@/components/processos/matter-list'
import { ProcessFilters } from '@/components/processos/process-filters'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, FileText, TrendingUp, Clock, AlertCircle } from 'lucide-react'
import { mockMatters } from '@/lib/mock-data'

export default function ProcessosPage() {
    // Calculando estatísticas
    const stats = {
        novosAndamentos: 61,
        processosNovos: 4,
        maisDe60DiasSemMov: 46,
        semMovimentacao: 166,
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Meus Processos</h1>
                    <p className="text-muted-foreground">
                        Consulte seus processos
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Tarefa
                </Button>
            </div>

            {/* Dashboard - Cards de Estatísticas */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            NOVOS ANDAMENTOS
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.novosAndamentos}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Processos com novos andamentos
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            PROCESSOS NOVOS
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-orange-600">{stats.processosNovos}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Editados nos últimos dias
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            MAIS DE 60 DIAS SEM MOVIMENTAÇÃO
                        </CardTitle>
                        <Clock className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-blue-600">{stats.maisDe60DiasSemMov}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Mais de 10 dias desde o seu cadastro
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            PROCESSOS SEM MOVIMENTAÇÕES
                        </CardTitle>
                        <AlertCircle className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-red-600">{stats.semMovimentacao}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Processos sem movimentações
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Filtros */}
            <ProcessFilters onFilter={(filters) => console.log('Filtros:', filters)} />

            {/* Lista de Processos */}
            <MatterList matters={mockMatters} />
        </div>
    )
}
