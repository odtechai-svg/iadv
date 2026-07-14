'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { X, Clock, Upload, PenLine } from 'lucide-react'

interface CreateTaskDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CreateTaskDialog({ open, onOpenChange }: CreateTaskDialogProps) {
    const [titulo, setTitulo] = useState('')
    const [data, setData] = useState('')
    const [diaTodo, setDiaTodo] = useState(false)
    const [hora, setHora] = useState('00')
    const [minuto, setMinuto] = useState('00')
    const [recorrencia, setRecorrencia] = useState('nenhuma')
    const [lancamentos, setLancamentos] = useState('0')
    const [usuario, setUsuario] = useState('')
    const [prioridade, setPrioridade] = useState('')
    const [andamento, setAndamento] = useState('a_fazer')
    const [lista, setLista] = useState('')
    const [vinculo, setVinculo] = useState('')
    const [comentario, setComentario] = useState('')

    const handleSave = () => {
        console.log('Salvando tarefa...', {
            titulo,
            data,
            diaTodo,
            hora,
            minuto,
            recorrencia,
            lancamentos,
            usuario,
            prioridade,
            andamento,
            lista,
            vinculo,
            comentario,
        })
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0">
                {/* Header Roxo */}
                <div className="bg-purple-700 text-white p-4 flex items-center justify-between rounded-t-lg">
                    <DialogTitle className="text-xl font-medium">Crie uma nova tarefa</DialogTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onOpenChange(false)}
                        className="text-white hover:bg-purple-600 h-8 w-8"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <div className="p-6 space-y-4">
                    {/* Título */}
                    <div className="space-y-1 relative">
                        <Label htmlFor="titulo" className="text-xs text-gray-500">Título*</Label>
                        <div className="relative">
                            <Input
                                id="titulo"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                className="pr-8"
                            />
                            <PenLine className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Linha: Data, Dia todo, Hora, Min */}
                    <div className="flex gap-4 items-end">
                        <div className="flex-1 space-y-1">
                            <Label htmlFor="data" className="text-xs text-gray-500">Data*</Label>
                            <Input
                                id="data"
                                type="date"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center space-x-2 pb-2.5">
                            <Checkbox
                                id="dia-todo"
                                checked={diaTodo}
                                onCheckedChange={(c) => setDiaTodo(c as boolean)}
                            />
                            <Label htmlFor="dia-todo" className="text-sm font-normal cursor-pointer">
                                Dia todo?
                            </Label>
                        </div>

                        <div className="w-20 space-y-1">
                            <Label htmlFor="hora" className="text-xs text-gray-500">Hora*</Label>
                            <Input
                                id="hora"
                                value={hora}
                                onChange={(e) => setHora(e.target.value)}
                                disabled={diaTodo}
                            />
                        </div>

                        <div className="w-20 space-y-1 relative">
                            <Label htmlFor="minuto" className="text-xs text-gray-500">Min*</Label>
                            <div className="relative">
                                <Input
                                    id="minuto"
                                    value={minuto}
                                    onChange={(e) => setMinuto(e.target.value)}
                                    disabled={diaTodo}
                                    className="pr-6"
                                />
                                <Clock className="absolute right-1.5 top-2.5 h-3 w-3 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Linha: Recorrência e Lançamentos */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="recorrencia" className="text-xs text-gray-500">Recorrência</Label>
                            <Select value={recorrencia} onValueChange={setRecorrencia}>
                                <SelectTrigger id="recorrencia">
                                    <SelectValue placeholder="Nenhuma" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="nenhuma">Nenhuma</SelectItem>
                                    <SelectItem value="diaria">Diária</SelectItem>
                                    <SelectItem value="semanal">Semanal</SelectItem>
                                    <SelectItem value="mensal">Mensal</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="lancamentos" className="text-xs text-gray-500">Lançamentos</Label>
                            <Input
                                id="lancamentos"
                                value={lancamentos}
                                disabled
                                className="bg-gray-50"
                            />
                        </div>
                    </div>

                    {/* Linha: Usuários, Prioridade, Andamento */}
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-6 space-y-1">
                            <Label htmlFor="usuarios" className="text-xs text-gray-500">Usuários *</Label>
                            <Select value={usuario} onValueChange={setUsuario}>
                                <SelectTrigger id="usuarios">
                                    <SelectValue placeholder="Selecione..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="joao">João Silva</SelectItem>
                                    <SelectItem value="maria">Maria Santos</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="col-span-3 space-y-1">
                            <Label htmlFor="prioridade" className="text-xs text-gray-500">Prioridade*</Label>
                            <Select value={prioridade} onValueChange={setPrioridade}>
                                <SelectTrigger id="prioridade">
                                    <SelectValue placeholder="Selecione..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="baixa">Baixa</SelectItem>
                                    <SelectItem value="media">Média</SelectItem>
                                    <SelectItem value="alta">Alta</SelectItem>
                                    <SelectItem value="urgente">Urgente</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="col-span-3 space-y-1">
                            <Label htmlFor="andamento" className="text-xs text-gray-500">Andamento</Label>
                            <Select value={andamento} onValueChange={setAndamento}>
                                <SelectTrigger id="andamento">
                                    <SelectValue placeholder="A fazer" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="a_fazer">A fazer</SelectItem>
                                    <SelectItem value="fazendo">Fazendo</SelectItem>
                                    <SelectItem value="feito">Feito</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Linha: Lista de tarefas e Vincular */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="lista" className="text-xs text-gray-500">Lista de tarefas</Label>
                            <Select value={lista} onValueChange={setLista}>
                                <SelectTrigger id="lista">
                                    <SelectValue placeholder="Selecione..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="geral">Geral</SelectItem>
                                    <SelectItem value="pessoal">Pessoal</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="vinculo" className="text-xs text-gray-500">Vincular tarefa</Label>
                            <Select value={vinculo} onValueChange={setVinculo}>
                                <SelectTrigger id="vinculo">
                                    <SelectValue placeholder="Selecione..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="processo1">Processo 000123...</SelectItem>
                                    <SelectItem value="cliente1">Cliente João...</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Comentário */}
                    <div className="space-y-1">
                        <Textarea
                            placeholder="Escrever um comentário"
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                            rows={4}
                            className="resize-none"
                        />
                    </div>

                    {/* Upload Box */}
                    <div className="border border-orange-200 rounded-lg p-4 flex items-center justify-between bg-orange-50/20">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-700">Anexar arquivos à tarefa</p>
                            <p className="text-xs text-orange-600">
                                Extensões permitidas: xlsx, csv, png, jpeg, jpg, doc, docx, pdf, txt e ppt.
                            </p>
                        </div>
                        <Button variant="outline" className="text-purple-700 border-purple-200 hover:bg-purple-50 gap-2">
                            <Upload className="h-4 w-4" />
                            Upload
                        </Button>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">Salvar</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
