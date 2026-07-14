'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { X } from 'lucide-react'

interface EditPrazoDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    prazo?: {
        id: string
        tipo_prazo: string
        providencia: string
        data: string
        responsavel: string
        observacao: string
    }
}

export function EditPrazoDialog({ open, onOpenChange, prazo }: EditPrazoDialogProps) {
    const [tipoPrazo, setTipoPrazo] = useState(prazo?.tipo_prazo || 'DECISÃO - JUSTIÇA COMUM')
    const [porProvidencia, setPorProvidencia] = useState(true)
    const [providencia, setProvidencia] = useState(prazo?.providencia || '')
    const [data, setData] = useState(prazo?.data ? prazo.data.split('T')[0] : '')
    const [diaTodo, setDiaTodo] = useState(false)
    const [hora, setHora] = useState('0')
    const [minuto, setMinuto] = useState('0')
    const [responsavel, setResponsavel] = useState(prazo?.responsavel || '')
    const [observacao, setObservacao] = useState(prazo?.observacao || '')

    const handleSave = () => {
        console.log('Salvando prazo...', {
            tipoPrazo,
            porProvidencia,
            providencia,
            data,
            diaTodo,
            hora,
            minuto,
            responsavel,
            observacao,
        })
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="bg-purple-700 text-white -m-6 mb-0 p-6 rounded-t-lg">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-2xl">Editar Prazo/Audiência</DialogTitle>
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

                <div className="space-y-4 mt-6">
                    {/* Tipo do prazo */}
                    <div className="space-y-2">
                        <Label htmlFor="tipo-prazo">Tipo do prazo*</Label>
                        <Input
                            id="tipo-prazo"
                            value={tipoPrazo}
                            onChange={(e) => setTipoPrazo(e.target.value)}
                            placeholder="DECISÃO - JUSTIÇA COMUM"
                            disabled
                            className="bg-gray-100"
                        />
                    </div>

                    {/* Toggle Por Providência / Personalizado */}
                    <div className="flex items-center gap-3 py-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-gray-300 hover:bg-gray-400"
                            onClick={() => setPorProvidencia(!porProvidencia)}
                        >
                            <span className="text-xs">−</span>
                        </Button>
                        <span className="font-medium">
                            Por Providência <span className="text-gray-500">/ Personalizado</span>
                        </span>
                    </div>

                    {/* Providência */}
                    <div className="space-y-2">
                        <Label htmlFor="providencia">Providência*</Label>
                        <Input
                            id="providencia"
                            value={providencia}
                            onChange={(e) => setProvidencia(e.target.value)}
                            placeholder="AGRAVO DE INSTRUMENTO"
                        />
                    </div>

                    {/* Data, Dia todo, Hora e Minuto */}
                    <div className="grid grid-cols-12 gap-4">
                        {/* Data */}
                        <div className="col-span-5 space-y-2">
                            <Label htmlFor="data">Data*</Label>
                            <Input
                                id="data"
                                type="date"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                            />
                        </div>

                        {/* Dia todo? */}
                        <div className="col-span-3 flex items-end pb-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="dia-todo"
                                    checked={diaTodo}
                                    onCheckedChange={(checked) => setDiaTodo(checked as boolean)}
                                />
                                <Label htmlFor="dia-todo" className="cursor-pointer">
                                    Dia todo?
                                </Label>
                            </div>
                        </div>

                        {/* Hora */}
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="hora">Hora*</Label>
                            <Input
                                id="hora"
                                type="number"
                                min="0"
                                max="23"
                                value={hora}
                                onChange={(e) => setHora(e.target.value)}
                                disabled={diaTodo}
                            />
                        </div>

                        {/* Minuto */}
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="minuto">Minuto*</Label>
                            <Input
                                id="minuto"
                                type="number"
                                min="0"
                                max="59"
                                value={minuto}
                                onChange={(e) => setMinuto(e.target.value)}
                                disabled={diaTodo}
                            />
                        </div>
                    </div>

                    {/* Responsáveis */}
                    <div className="space-y-2">
                        <Label htmlFor="responsaveis">Responsáveis</Label>
                        <Select value={responsavel} onValueChange={setResponsavel}>
                            <SelectTrigger id="responsaveis">
                                <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="joao">João Silva</SelectItem>
                                <SelectItem value="maria">Maria Santos</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Observação */}
                    <div className="space-y-2">
                        <Label htmlFor="observacao">Observação</Label>
                        <Textarea
                            id="observacao"
                            value={observacao}
                            onChange={(e) => setObservacao(e.target.value)}
                            placeholder="Observação"
                            rows={4}
                        />
                    </div>
                </div>

                {/* Botão Salvar */}
                <div className="flex justify-end pt-4 border-t">
                    <Button
                        onClick={handleSave}
                        className="min-w-[120px] bg-green-600 hover:bg-green-700"
                    >
                        Salvar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
