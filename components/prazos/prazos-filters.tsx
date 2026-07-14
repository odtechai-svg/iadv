'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

interface PrazosFiltersProps {
    onFilter?: (filters: any) => void
}

export function PrazosFilters({ onFilter }: PrazosFiltersProps) {
    const [status, setStatus] = useState('todos')
    const [tipoPrazo, setTipoPrazo] = useState('todos')
    const [processo, setProcesso] = useState('')
    const [dataInicio, setDataInicio] = useState('')
    const [dataFim, setDataFim] = useState('')
    const [orgao, setOrgao] = useState('')
    const [responsavel, setResponsavel] = useState('')
    const [providencia, setProvidencia] = useState('todos')

    const handleConsultar = () => {
        if (onFilter) {
            onFilter({
                status,
                tipoPrazo,
                processo,
                dataInicio,
                dataFim,
                orgao,
                responsavel,
                providencia,
            })
        }
    }

    return (
        <Card className="mb-6">
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Status */}
                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger id="status">
                                <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todos">Todos</SelectItem>
                                <SelectItem value="agendado">Agendado</SelectItem>
                                <SelectItem value="atrasado">Atrasado</SelectItem>
                                <SelectItem value="cumprido">Cumprido</SelectItem>
                                <SelectItem value="cancelado">Cancelado</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Tipo de Prazo */}
                    <div className="space-y-2">
                        <Label htmlFor="tipo-prazo">Tipo de prazo</Label>
                        <Select value={tipoPrazo} onValueChange={setTipoPrazo}>
                            <SelectTrigger id="tipo-prazo">
                                <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todos">Todos</SelectItem>
                                <SelectItem value="decisao">Decisão - Justiça Comum</SelectItem>
                                <SelectItem value="despacho">Despacho - Justiça Comum</SelectItem>
                                <SelectItem value="sentenca">Sentença - Justiça Comum</SelectItem>
                                <SelectItem value="criminal">Criminal</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Processo */}
                    <div className="space-y-2">
                        <Label htmlFor="processo">Processo</Label>
                        <Input
                            id="processo"
                            placeholder="Número do processo..."
                            value={processo}
                            onChange={(e) => setProcesso(e.target.value)}
                        />
                    </div>

                    {/* Tipo do prazo (data range) */}
                    <div className="space-y-2">
                        <Label htmlFor="data-inicio">De:</Label>
                        <Input
                            id="data-inicio"
                            type="date"
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="data-fim">Até:</Label>
                        <Input
                            id="data-fim"
                            type="date"
                            value={dataFim}
                            onChange={(e) => setDataFim(e.target.value)}
                        />
                    </div>

                    {/* Órgão */}
                    <div className="space-y-2">
                        <Label htmlFor="orgao">Órgão</Label>
                        <Input
                            id="orgao"
                            placeholder="Nome do órgão..."
                            value={orgao}
                            onChange={(e) => setOrgao(e.target.value)}
                        />
                    </div>

                    {/* Providência */}
                    <div className="space-y-2">
                        <Label htmlFor="providencia">Providência</Label>
                        <Select value={providencia} onValueChange={setProvidencia}>
                            <SelectTrigger id="providencia">
                                <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todos">Todos</SelectItem>
                                <SelectItem value="agravo">Agravo de Instrumento</SelectItem>
                                <SelectItem value="manifestas">Manifestas sobre Despacho</SelectItem>
                                <SelectItem value="apelacao">Apelação</SelectItem>
                                <SelectItem value="recurso">Recurso em Sentido Estrito</SelectItem>
                                <SelectItem value="manifestas_provas">Manifestas em Provas</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Responsável */}
                    <div className="space-y-2">
                        <Label htmlFor="responsavel">Responsável</Label>
                        <Input
                            id="responsavel"
                            placeholder="Nome do responsável..."
                            value={responsavel}
                            onChange={(e) => setResponsavel(e.target.value)}
                        />
                    </div>
                </div>

                {/* Botões */}
                <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                        Exportar Excel
                    </Button>
                    <Button onClick={handleConsultar} className="min-w-[150px]">
                        <Search className="mr-2 h-4 w-4" />
                        Consultar
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
