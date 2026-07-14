'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Calendar as CalendarIcon } from 'lucide-react'

interface PublicacoesFiltersProps {
    onFilter?: (filters: any) => void
}

export function PublicacoesFilters({ onFilter }: PublicacoesFiltersProps) {
    const [status, setStatus] = useState('todos')
    const [dataInicio, setDataInicio] = useState('')
    const [dataFim, setDataFim] = useState('')
    const [numeroProcesso, setNumeroProcesso] = useState('')
    const [parte, setParte] = useState('')
    const [cliente, setCliente] = useState('')
    const [cartorio, setCartorio] = useState('')

    const handleConsultar = () => {
        if (onFilter) {
            onFilter({
                status,
                dataInicio,
                dataFim,
                numeroProcesso,
                parte,
                cliente,
                cartorio,
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
                                <SelectItem value="tratado">Tratado</SelectItem>
                                <SelectItem value="nao_tratado">Não Tratado</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Data Publicação - Início */}
                    <div className="space-y-2">
                        <Label htmlFor="data-inicio">Data Publicação (Início)</Label>
                        <div className="relative">
                            <Input
                                id="data-inicio"
                                type="date"
                                value={dataInicio}
                                onChange={(e) => setDataInicio(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Data Publicação - Fim */}
                    <div className="space-y-2">
                        <Label htmlFor="data-fim">Data Publicação (Fim)</Label>
                        <div className="relative">
                            <Input
                                id="data-fim"
                                type="date"
                                value={dataFim}
                                onChange={(e) => setDataFim(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Número do Processo */}
                    <div className="space-y-2">
                        <Label htmlFor="numero-processo">Número do Processo</Label>
                        <Input
                            id="numero-processo"
                            placeholder="0000000-00.0000.0.00.0000"
                            value={numeroProcesso}
                            onChange={(e) => setNumeroProcesso(e.target.value)}
                        />
                    </div>

                    {/* Parte (Autor ou Réu) */}
                    <div className="space-y-2">
                        <Label htmlFor="parte">Parte (Autor ou Réu)</Label>
                        <Input
                            id="parte"
                            placeholder="Nome da parte..."
                            value={parte}
                            onChange={(e) => setParte(e.target.value)}
                        />
                    </div>

                    {/* Cliente */}
                    <div className="space-y-2">
                        <Label htmlFor="cliente">Cliente</Label>
                        <Input
                            id="cliente"
                            placeholder="Nome do cliente..."
                            value={cliente}
                            onChange={(e) => setCliente(e.target.value)}
                        />
                    </div>

                    {/* Cartório */}
                    <div className="space-y-2">
                        <Label htmlFor="cartorio">Cartório</Label>
                        <Input
                            id="cartorio"
                            placeholder="Nome do cartório..."
                            value={cartorio}
                            onChange={(e) => setCartorio(e.target.value)}
                        />
                    </div>
                </div>

                {/* Botão Consultar */}
                <div className="mt-4 flex justify-end">
                    <Button onClick={handleConsultar} className="min-w-[150px]">
                        <Search className="mr-2 h-4 w-4" />
                        Consultar
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
