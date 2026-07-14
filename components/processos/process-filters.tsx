'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

interface ProcessFiltersProps {
    onFilter?: (filters: any) => void
}

const ESTADOS_BRASIL = [
    { value: 'todos', label: 'Todos' },
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' },
]

export function ProcessFilters({ onFilter }: ProcessFiltersProps) {
    const [status, setStatus] = useState('todos')
    const [tipoProcesso, setTipoProcesso] = useState('todos')
    const [estado, setEstado] = useState('todos')
    const [numeroProcesso, setNumeroProcesso] = useState('')
    const [parte, setParte] = useState('')
    const [tribunal, setTribunal] = useState('')
    const [comarca, setComarca] = useState('')
    const [cliente, setCliente] = useState('')

    const handleConsultar = () => {
        if (onFilter) {
            onFilter({
                status,
                tipoProcesso,
                estado,
                numeroProcesso,
                parte,
                tribunal,
                comarca,
                cliente,
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
                                <SelectItem value="ativo">Ativo</SelectItem>
                                <SelectItem value="inativo">Inativo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Tipo de Processo */}
                    <div className="space-y-2">
                        <Label htmlFor="tipo-processo">Tipo Processo</Label>
                        <Select value={tipoProcesso} onValueChange={setTipoProcesso}>
                            <SelectTrigger id="tipo-processo">
                                <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todos">Todos</SelectItem>
                                <SelectItem value="com_vinculo">Com Vínculo</SelectItem>
                                <SelectItem value="sem_vinculo">Sem Vínculo</SelectItem>
                                <SelectItem value="arquivados">Arquivados</SelectItem>
                                <SelectItem value="recursos">Recursos</SelectItem>
                                <SelectItem value="segredo_justica">Segredo de Justiça</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Estado */}
                    <div className="space-y-2">
                        <Label htmlFor="estado">Estado</Label>
                        <Select value={estado} onValueChange={setEstado}>
                            <SelectTrigger id="estado">
                                <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent>
                                {ESTADOS_BRASIL.map(e => (
                                    <SelectItem key={e.value} value={e.value}>
                                        {e.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
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

                    {/* Tribunal */}
                    <div className="space-y-2">
                        <Label htmlFor="tribunal">Tribunal</Label>
                        <Input
                            id="tribunal"
                            placeholder="Ex: TJSP, TJRJ..."
                            value={tribunal}
                            onChange={(e) => setTribunal(e.target.value)}
                        />
                    </div>

                    {/* Comarca */}
                    <div className="space-y-2">
                        <Label htmlFor="comarca">Comarca</Label>
                        <Input
                            id="comarca"
                            placeholder="Nome da comarca..."
                            value={comarca}
                            onChange={(e) => setComarca(e.target.value)}
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
