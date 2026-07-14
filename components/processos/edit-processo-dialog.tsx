'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { X, Plus, Trash2 } from 'lucide-react'

interface EditProcessoDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    processo?: {
        cnj: string
        tribunal: string
        orgao: string
        natureza: string
        motivo: string
        comarca: string
        estado: string
        valor_causa: string
        juiz: string
        tipo_acao: string
        data_distribuicao: string
        instancia: string
        vara: string
        autores: string[]
        reus: string[]
        advogados: { oab: string; nome: string }[]
    }
}

const ESTADOS_BRASIL = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
]

export function EditProcessoDialog({ open, onOpenChange, processo }: EditProcessoDialogProps) {
    const [tribunal, setTribunal] = useState(processo?.tribunal || '')
    const [orgao, setOrgao] = useState(processo?.orgao || '')
    const [natureza, setNatureza] = useState(processo?.natureza || '')
    const [motivo, setMotivo] = useState(processo?.motivo || '')
    const [comarca, setComarca] = useState(processo?.comarca || '')
    const [estado, setEstado] = useState(processo?.estado || 'SP')
    const [valorCausa, setValorCausa] = useState(processo?.valor_causa || '')
    const [juiz, setJuiz] = useState(processo?.juiz || '')
    const [tipoAcao, setTipoAcao] = useState(processo?.tipo_acao || '')
    const [dataDistribuicao, setDataDistribuicao] = useState(processo?.data_distribuicao || '')
    const [instancia, setInstancia] = useState(processo?.instancia || '1ª Instância')
    const [vara, setVara] = useState(processo?.vara || '')

    const [autores, setAutores] = useState<string[]>(processo?.autores || [''])
    const [reus, setReus] = useState<string[]>(processo?.reus || [''])
    const [advogados, setAdvogados] = useState<{ oab: string; nome: string }[]>(
        processo?.advogados || [{ oab: '', nome: '' }]
    )

    const handleSave = () => {
        console.log('Salvando processo...', {
            tribunal,
            orgao,
            natureza,
            motivo,
            comarca,
            estado,
            valorCausa,
            juiz,
            tipoAcao,
            dataDistribuicao,
            instancia,
            vara,
            autores,
            reus,
            advogados,
        })
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle>Editar Processo - {processo?.cnj}</DialogTitle>
                        <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Coluna Esquerda */}
                    <div className="space-y-4">
                        {/* Tribunal */}
                        <div className="space-y-2">
                            <Label htmlFor="tribunal">Tribunal</Label>
                            <Input
                                id="tribunal"
                                value={tribunal}
                                onChange={(e) => setTribunal(e.target.value)}
                                placeholder="Tribunal de Justiça de São Paulo - TJSP"
                            />
                        </div>

                        {/* Número do Órgão/Órgão */}
                        <div className="space-y-2">
                            <Label htmlFor="orgao">Número do Órgão/Órgão</Label>
                            <Input
                                id="orgao"
                                value={orgao}
                                onChange={(e) => setOrgao(e.target.value)}
                                placeholder="Justiça dos Estados e do Distrito F"
                            />
                        </div>

                        {/* Natureza (Classe) */}
                        <div className="space-y-2">
                            <Label htmlFor="natureza">Natureza (Classe)</Label>
                            <Input
                                id="natureza"
                                value={natureza}
                                onChange={(e) => setNatureza(e.target.value)}
                                placeholder="Cível"
                            />
                        </div>

                        {/* Motivo */}
                        <div className="space-y-2">
                            <Label htmlFor="motivo">Motivo</Label>
                            <Input
                                id="motivo"
                                value={motivo}
                                onChange={(e) => setMotivo(e.target.value)}
                                placeholder="Cédula de Crédito Bancário"
                            />
                        </div>

                        {/* Comarca */}
                        <div className="space-y-2">
                            <Label htmlFor="comarca">Comarca</Label>
                            <Input
                                id="comarca"
                                value={comarca}
                                onChange={(e) => setComarca(e.target.value)}
                                placeholder="Foro de Santos"
                            />
                        </div>

                        {/* Estado */}
                        <div className="space-y-2">
                            <Label htmlFor="estado">Estado</Label>
                            <Select value={estado} onValueChange={setEstado}>
                                <SelectTrigger id="estado">
                                    <SelectValue placeholder="Selecione o estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    {ESTADOS_BRASIL.map(uf => (
                                        <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Valor da Causa */}
                        <div className="space-y-2">
                            <Label htmlFor="valor-causa">Valor da Causa (R$)</Label>
                            <Input
                                id="valor-causa"
                                value={valorCausa}
                                onChange={(e) => setValorCausa(e.target.value)}
                                placeholder="R$ 0,00"
                            />
                        </div>

                        {/* Juiz */}
                        <div className="space-y-2">
                            <Label htmlFor="juiz">Juiz</Label>
                            <Input
                                id="juiz"
                                value={juiz}
                                onChange={(e) => setJuiz(e.target.value)}
                                placeholder="Nome do juiz"
                            />
                        </div>

                        {/* Tipo de Ação */}
                        <div className="space-y-2">
                            <Label htmlFor="tipo-acao">Tipo de Ação</Label>
                            <Input
                                id="tipo-acao"
                                value={tipoAcao}
                                onChange={(e) => setTipoAcao(e.target.value)}
                                placeholder="Tipo da ação"
                            />
                        </div>

                        {/* Data da Distribuição */}
                        <div className="space-y-2">
                            <Label htmlFor="data-distribuicao">Data da Distribuição</Label>
                            <Input
                                id="data-distribuicao"
                                type="date"
                                value={dataDistribuicao}
                                onChange={(e) => setDataDistribuicao(e.target.value)}
                            />
                        </div>

                        {/* Instância */}
                        <div className="space-y-2">
                            <Label htmlFor="instancia">Instância</Label>
                            <Select value={instancia} onValueChange={setInstancia}>
                                <SelectTrigger id="instancia">
                                    <SelectValue placeholder="Selecione a instância" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1ª Instância">1ª Instância</SelectItem>
                                    <SelectItem value="2ª Instância">2ª Instância</SelectItem>
                                    <SelectItem value="STJ">STJ</SelectItem>
                                    <SelectItem value="STF">STF</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Vara */}
                        <div className="space-y-2">
                            <Label htmlFor="vara">Vara</Label>
                            <Input
                                id="vara"
                                value={vara}
                                onChange={(e) => setVara(e.target.value)}
                                placeholder="10ª Vara Cível"
                            />
                        </div>
                    </div>

                    {/* Coluna Direita - Partes */}
                    <div className="space-y-6">
                        {/* Autores */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <Label>Autor(es)</Label>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setAutores([...autores, ''])}
                                >
                                    <Plus className="h-4 w-4 mr-1" />
                                    Autor
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {autores.map((autor, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={autor}
                                            onChange={(e) => {
                                                const newAutores = [...autores]
                                                newAutores[index] = e.target.value
                                                setAutores(newAutores)
                                            }}
                                            placeholder="Nome do autor"
                                        />
                                        {autores.length > 1 && (
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => setAutores(autores.filter((_, i) => i !== index))}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Réus */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <Label>Réu(s)</Label>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setReus([...reus, ''])}
                                >
                                    <Plus className="h-4 w-4 mr-1" />
                                    Réu
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {reus.map((reu, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={reu}
                                            onChange={(e) => {
                                                const newReus = [...reus]
                                                newReus[index] = e.target.value
                                                setReus(newReus)
                                            }}
                                            placeholder="Nome do réu"
                                        />
                                        {reus.length > 1 && (
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => setReus(reus.filter((_, i) => i !== index))}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Advogados */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <Label>Advogado(s)</Label>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setAdvogados([...advogados, { oab: '', nome: '' }])}
                                >
                                    <Plus className="h-4 w-4 mr-1" />
                                    Advogado
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {advogados.map((adv, index) => (
                                    <div key={index} className="space-y-2 p-3 border rounded">
                                        <div className="flex gap-2">
                                            <Input
                                                value={adv.oab}
                                                onChange={(e) => {
                                                    const newAdvogados = [...advogados]
                                                    newAdvogados[index].oab = e.target.value
                                                    setAdvogados(newAdvogados)
                                                }}
                                                placeholder="OAB"
                                                className="w-32"
                                            />
                                            <Input
                                                value={adv.nome}
                                                onChange={(e) => {
                                                    const newAdvogados = [...advogados]
                                                    newAdvogados[index].nome = e.target.value
                                                    setAdvogados(newAdvogados)
                                                }}
                                                placeholder="Nome do advogado"
                                            />
                                            {advogados.length > 1 && (
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => setAdvogados(advogados.filter((_, i) => i !== index))}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Botão Salvar */}
                <div className="flex justify-end pt-4 border-t">
                    <Button onClick={handleSave} className="min-w-[120px]">
                        Salvar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
