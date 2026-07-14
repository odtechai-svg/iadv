'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { X, Calculator, HelpCircle } from 'lucide-react'

interface CalculadoraPrazoDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const ESTADOS_BRASIL = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
]

const ESFERAS = [
    'Selecione...',
    'CIVEL',
    'CRIMINAL',
    'TRABALHISTA',
    'JUIZADO ESPECIAL CIVEL',
    'JUIZADO ESPECIAL CRIMINAL',
]

export function CalculadoraPrazoDialog({ open, onOpenChange }: CalculadoraPrazoDialogProps) {
    const [activeTab, setActiveTab] = useState('calculadora')

    // Calculadora
    const [dataInicial, setDataInicial] = useState('')
    const [uf, setUf] = useState('')
    const [tribunal, setTribunal] = useState('')
    const [comarca, setComarca] = useState('')
    const [porProvidencia, setPorProvidencia] = useState(true)
    const [esfera, setEsfera] = useState('')
    const [providencia, setProvidencia] = useState('')
    const [contagemDias, setContagemDias] = useState('')
    const [processo, setProcesso] = useState('')
    const [quantidadeDias, setQuantidadeDias] = useState('0')
    const [responsavel, setResponsavel] = useState('')

    // Manual
    const [ufManual, setUfManual] = useState('')
    const [processoManual, setProcessoManual] = useState('')

    const handleCalcular = () => {
        console.log('Calculando prazo...', {
            dataInicial,
            uf,
            tribunal,
            comarca,
            porProvidencia,
            esfera,
            providencia,
            contagemDias,
            quantidadeDias,
            responsavel,
            processo,
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="bg-purple-700 text-white -m-6 mb-0 p-6 rounded-t-lg">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-2xl">Calculadora de Prazo</DialogTitle>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onOpenChange(false)}
                            className="text-white hover:bg-purple-600"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="calculadora" className="data-[state=active]:bg-purple-700 data-[state=active]:text-white">
                            <Calculator className="h-4 w-4 mr-2" />
                            Calculadora de Prazo
                        </TabsTrigger>
                        <TabsTrigger value="manual">
                            Prazo/Audiência Manual
                        </TabsTrigger>
                    </TabsList>

                    {/* Aba Calculadora */}
                    <TabsContent value="calculadora" className="space-y-4 mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Data Inicial da Contagem */}
                            <div className="space-y-2">
                                <Label htmlFor="data-inicial" className="text-red-600">
                                    Data Inicial da Contagem*
                                </Label>
                                <Input
                                    id="data-inicial"
                                    type="date"
                                    value={dataInicial}
                                    onChange={(e) => setDataInicial(e.target.value)}
                                    className="border-red-300"
                                />
                            </div>

                            {/* Uf do Processo */}
                            <div className="space-y-2">
                                <Label htmlFor="uf">Uf do Processo *</Label>
                                <Select value={uf} onValueChange={setUf}>
                                    <SelectTrigger id="uf">
                                        <SelectValue placeholder="Selecione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ESTADOS_BRASIL.map(estado => (
                                            <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Tribunal */}
                            <div className="space-y-2">
                                <Label htmlFor="tribunal">Tribunal *</Label>
                                <Select value={tribunal} onValueChange={setTribunal}>
                                    <SelectTrigger id="tribunal">
                                        <SelectValue placeholder="Tribunal *" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="tjsp">TJSP - Tribunal de Justiça de São Paulo</SelectItem>
                                        <SelectItem value="tjrj">TJRJ - Tribunal de Justiça do Rio de Janeiro</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Comarca */}
                            <div className="space-y-2">
                                <Label htmlFor="comarca">Comarca *</Label>
                                <Select value={comarca} onValueChange={setComarca}>
                                    <SelectTrigger id="comarca">
                                        <SelectValue placeholder="Comarca *" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="santos">Foro de Santos</SelectItem>
                                        <SelectItem value="sp-capital">São Paulo - Capital</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Toggle Por Providência / Personalizado */}
                        <div className="flex items-center gap-3 py-2">
                            <div className="flex items-center gap-2">
                                <div className={`w-12 h-6 rounded-full cursor-pointer transition-colors ${porProvidencia ? 'bg-orange-500' : 'bg-gray-300'}`}
                                    onClick={() => setPorProvidencia(!porProvidencia)}
                                >
                                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${porProvidencia ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`} />
                                </div>
                                <span className="font-semibold">
                                    Por Providência <span className="text-gray-500">/ Personalizado</span>
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Esfera */}
                            <div className="space-y-2">
                                <Label htmlFor="esfera">Esfera *</Label>
                                <Select value={esfera} onValueChange={setEsfera}>
                                    <SelectTrigger id="esfera">
                                        <SelectValue placeholder="Selecione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ESFERAS.map(esf => (
                                            <SelectItem key={esf} value={esf}>{esf}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Input
                                    placeholder="Buscar por Esfera... (min. 3 caracteres)"
                                    className="text-sm"
                                />
                            </div>

                            {/* Providência */}
                            <div className="space-y-2">
                                <Label htmlFor="providencia">Providência *</Label>
                                <Select value={providencia} onValueChange={setProvidencia}>
                                    <SelectTrigger id="providencia">
                                        <SelectValue placeholder="Providência *" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="agravo">AGRAVO DE INSTRUMENTO</SelectItem>
                                        <SelectItem value="apelacao">APELACAO</SelectItem>
                                        <SelectItem value="manifestas">MANIFESTAS SOBRE DESPACHO</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Quantidade de Dias (se personalizado) */}
                            {!porProvidencia && (
                                <div className="space-y-2">
                                    <Label htmlFor="quantidade-dias">Quantidade de Dias*</Label>
                                    <Input
                                        id="quantidade-dias"
                                        type="number"
                                        value={quantidadeDias}
                                        onChange={(e) => setQuantidadeDias(e.target.value)}
                                        placeholder="0"
                                    />
                                </div>
                            )}

                            {/* Contagem em dias */}
                            <div className="space-y-2">
                                <Label htmlFor="contagem-dias" className="text-red-600">Contagem em dias*</Label>
                                <Select value={contagemDias} onValueChange={setContagemDias}>
                                    <SelectTrigger id="contagem-dias" className="border-red-300">
                                        <SelectValue placeholder="Selecione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="corridos">Dias Corridos</SelectItem>
                                        <SelectItem value="uteis">Dias Úteis</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Responsáveis */}
                            <div className="space-y-2">
                                <Label htmlFor="responsavel">Responsáveis</Label>
                                <Select value={responsavel} onValueChange={setResponsavel}>
                                    <SelectTrigger id="responsavel">
                                        <SelectValue placeholder="Selecione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="joao">João Silva</SelectItem>
                                        <SelectItem value="maria">Maria Santos</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Processo */}
                            <div className="space-y-2">
                                <Label htmlFor="processo">Processo *</Label>
                                <Select value={processo} onValueChange={setProcesso}>
                                    <SelectTrigger id="processo">
                                        <SelectValue placeholder="Selecione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="processo1">0000123-45.2024.8.26.0100</SelectItem>
                                        <SelectItem value="processo2">0000567-89.2024.8.26.0200</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Como funciona? */}
                        <div className="flex items-center gap-2 text-gray-600">
                            <HelpCircle className="h-4 w-4" />
                            <span className="text-sm">Como funciona?</span>
                        </div>

                        {/* Botão Calcular */}
                        <div className="flex justify-end pt-4">
                            <Button
                                onClick={handleCalcular}
                                className="min-w-[200px] bg-green-600 hover:bg-green-700"
                            >
                                <Calculator className="mr-2 h-4 w-4" />
                                Calcular
                            </Button>
                        </div>
                    </TabsContent>

                    {/* Aba Manual */}
                    <TabsContent value="manual" className="space-y-4 mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Uf do Processo */}
                            <div className="space-y-2">
                                <Label htmlFor="uf-manual">Uf do Processo *</Label>
                                <Select value={ufManual} onValueChange={setUfManual}>
                                    <SelectTrigger id="uf-manual">
                                        <SelectValue placeholder="Selecione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ESTADOS_BRASIL.map(estado => (
                                            <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Processo */}
                            <div className="space-y-2">
                                <Label htmlFor="processo-manual">Processo *</Label>
                                <Select value={processoManual} onValueChange={setProcessoManual}>
                                    <SelectTrigger id="processo-manual">
                                        <SelectValue placeholder="Selecione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="processo1">0000123-45.2024.8.26.0100</SelectItem>
                                        <SelectItem value="processo2">0000567-89.2024.8.26.0200</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="text-center py-12 text-muted-foreground">
                            <p>Configure manualmente o prazo/audiência</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
