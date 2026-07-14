'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EditProcessoDialog } from '@/components/processos/edit-processo-dialog'
import {
    ArrowLeft,
    Edit,
    FileText,
    Bell,
    Calendar as CalendarIcon,
    CheckSquare,
    Archive,
    Flag,
    Eye
} from 'lucide-react'
import { formatDate, formatCNJ } from '@/lib/utils'

// Mock data para detalhes do processo
const processoDetalhes = {
    id: 'matter-1',
    cnj: '00013598-13.2025.8.26.0562',
    status: 'Ativo',
    data_distribuicao: '15/05/2025',
    data_atualizacao: '10/12/2025',
    data_cadastro: '15/05/2025',
    instancia: '1ª (PRIMEIRA)',
    juiz: 'SEM INFORMAÇÃO',
    tipo_acao: 'SEM INFORMAÇÃO',
    comarca: 'FORO DE SANTOS',
    tribunal: 'TRIBUNAL DE JUSTIÇA DE SÃO PAULO - TJSP',
    uf: 'SP',
    vara: '19ª VARA CÍVEL',
    celula: 'SEM INFORMAÇÃO',
    valor_causa: 'R$ 0,00',
    motivo: 'CÉDULA DE CRÉDITO BANCÁRIO',
    reu: 'ATLÂNTICO FUNDO DE INVESTIMENTO EM DIREITOS CREDITÓRIOS NÃO PADRONIZADOS',
    autor: 'MARIA FERNANDA CESAR LAS CASAS DE OLIVEIRA',
    advogado_envolvido: 'MARIA FERNANDA CESAR LAS CASAS DE OLIVEIRA',
    natureza_classe: 'CÍVEL',
}

const movimentacoes = [
    {
        id: '1',
        data: new Date(2025, 11, 16).toISOString(),
        tipo: 'Movimentação',
        titulo: 'Publicação',
        conteudo: 'Consulta da página 1383763 do Diário: D.O. SÃO PAULO - TRIBUNAL DE JUSTIÇA (DJSP). Foto do Sistema: 10 Varas Cíveis Distribuídas Nº Processo: 0013598-13.2025.8.26.0562...',
    },
    {
        id: '2',
        data: new Date(2025, 11, 16).toISOString(),
        tipo: 'Andamento',
        titulo: 'Pedido de Expedição de Mandado de Levantamento Juntado',
        conteudo: 'Nº Protocolo: W9T3.25.70539977-5 Tipo da Petição: Pedido de Expedição de Mandado de Levantamento Data: 16/12/2025 14:33',
    },
    {
        id: '3',
        data: new Date(2025, 11, 12).toISOString(),
        tipo: 'Movimentação',
        titulo: 'Andamento',
        conteudo: 'Certifico que...',
    },
]

export default function ProcessoDetalhesPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('movimentacoes')
    const [editDialogOpen, setEditDialogOpen] = useState(false)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Detalhes do Processo</h1>
                        <p className="text-sm text-muted-foreground font-mono">
                            {formatCNJ(processoDetalhes.cnj)}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Badge className="bg-green-600">
                        {processoDetalhes.status}
                    </Badge>
                    <Button variant="outline" onClick={() => setEditDialogOpen(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                    </Button>
                    <Button variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        Vincular cálculo
                    </Button>
                    <Button variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        Enviar por email
                    </Button>
                </div>
            </div>

            {/* Informações Principais - Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InfoCard label="Data Distribuição" value={processoDetalhes.data_distribuicao} />
                <InfoCard label="Data Atualização" value={processoDetalhes.data_atualizacao} />
                <InfoCard label="Data Cadastro" value={processoDetalhes.data_cadastro} />
                <InfoCard label="Instância" value={processoDetalhes.instancia} />
                <InfoCard label="Juiz" value={processoDetalhes.juiz} />
                <InfoCard label="Tipo de Ação" value={processoDetalhes.tipo_acao} />
                <InfoCard label="Autor(es)" value={processoDetalhes.autor} />
                <InfoCard label="Réu(s)" value={processoDetalhes.reu} />
                <InfoCard label="Advogado(s) Envolvido(s)" value={processoDetalhes.advogado_envolvido} />
            </div>

            {/* Informações Secundárias */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Informações do Tribunal</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Tribunal</p>
                        <p className="font-medium">{processoDetalhes.tribunal}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Vara</p>
                        <p className="font-medium">{processoDetalhes.vara}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Comarca</p>
                        <p className="font-medium">{processoDetalhes.comarca}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Valor da Causa</p>
                        <p className="font-medium">{processoDetalhes.valor_causa}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Motivo</p>
                        <p className="font-medium">{processoDetalhes.motivo}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Natureza (Classe)</p>
                        <p className="font-medium">{processoDetalhes.natureza_classe}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Sidebar de Ações Rápidas */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Menu Lateral */}
                <Card className="lg:col-span-1">
                    <CardContent className="pt-6">
                        <div className="space-y-2">
                            <Button variant="secondary" className="w-full justify-start" size="sm">
                                <FileText className="mr-2 h-4 w-4" />
                                Movimentações
                            </Button>
                            <Button variant="ghost" className="w-full justify-start" size="sm">
                                <Archive className="mr-2 h-4 w-4" />
                                Arquivos
                            </Button>
                            <Button variant="ghost" className="w-full justify-start" size="sm">
                                <Bell className="mr-2 h-4 w-4" />
                                Cliente
                            </Button>
                            <Button variant="ghost" className="w-full justify-start" size="sm">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                Calendário
                            </Button>
                            <Button variant="ghost" className="w-full justify-start" size="sm">
                                <CheckSquare className="mr-2 h-4 w-4" />
                                Tarefas
                            </Button>
                            <Button variant="ghost" className="w-full justify-start" size="sm">
                                <FileText className="mr-2 h-4 w-4" />
                                Anotações
                            </Button>
                            <Button variant="ghost" className="w-full justify-start" size="sm">
                                <Flag className="mr-2 h-4 w-4" />
                                Recursos
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Conteúdo Principal - Abas */}
                <div className="lg:col-span-3">
                    <Tabs defaultValue="movimentacoes" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="movimentacoes">Movimentações</TabsTrigger>
                            <TabsTrigger value="publicacoes">Publicações</TabsTrigger>
                            <TabsTrigger value="intimacoes">Intimações</TabsTrigger>
                            <TabsTrigger value="prazos">Prazos</TabsTrigger>
                            <TabsTrigger value="andamentos">Andamentos</TabsTrigger>
                            <TabsTrigger value="todas">Todas</TabsTrigger>
                        </TabsList>

                        <TabsContent value="movimentacoes" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>Movimentações</CardTitle>
                                        <div className="flex gap-2">
                                            <Button size="sm">
                                                Visualizar mais movimentações
                                            </Button>
                                            <Button size="sm" variant="outline">
                                                Exibir tudo
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {movimentacoes.map((mov) => (
                                            <div key={mov.id} className="border-l-2 border-primary pl-4 pb-4">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <p className="text-sm font-medium">{formatDate(mov.data)}</p>
                                                        <Badge variant="outline" className="mt-1">
                                                            {mov.tipo}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <h4 className="font-semibold mb-2">{mov.titulo}</h4>
                                                <p className="text-sm text-muted-foreground">{mov.conteudo}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="publicacoes">
                            <Card>
                                <CardContent className="pt-6">
                                    <p className="text-muted-foreground text-center py-8">
                                        Nenhuma publicação encontrada
                                    </p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="intimacoes">
                            <Card>
                                <CardContent className="pt-6">
                                    <p className="text-muted-foreground text-center py-8">
                                        Nenhuma intimação encontrada
                                    </p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="prazos">
                            <Card>
                                <CardContent className="pt-6">
                                    <p className="text-muted-foreground text-center py-8">
                                        Nenhum prazo cadastrado
                                    </p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="andamentos">
                            <Card>
                                <CardContent className="pt-6">
                                    <p className="text-muted-foreground text-center py-8">
                                        Nenhum andamento encontrado
                                    </p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="todas">
                            <Card>
                                <CardContent className="pt-6">
                                    <p className="text-muted-foreground text-center py-8">
                                        Visualização combinada de todos os eventos
                                    </p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            <EditProcessoDialog
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
                processo={{
                    cnj: processoDetalhes.cnj,
                    tribunal: processoDetalhes.tribunal,
                    orgao: processoDetalhes.orgao,
                    natureza: processoDetalhes.natureza_classe,
                    motivo: processoDetalhes.motivo,
                    comarca: processoDetalhes.comarca,
                    estado: processoDetalhes.uf,
                    valor_causa: processoDetalhes.valor_causa,
                    juiz: processoDetalhes.juiz,
                    tipo_acao: processoDetalhes.tipo_acao,
                    data_distribuicao: processoDetalhes.data_distribuicao,
                    instancia: processoDetalhes.instancia,
                    vara: processoDetalhes.vara,
                    autores: [processoDetalhes.autor],
                    reus: [processoDetalhes.reu],
                    advogados: [{ oab: '', nome: processoDetalhes.advogado_envolvido }],
                }}
            />
        </div>
    )
}

function InfoCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="border rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <p className="text-sm font-medium">{value}</p>
        </div>
    )
}
