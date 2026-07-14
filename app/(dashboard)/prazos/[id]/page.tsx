'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EditPrazoDialog } from '@/components/prazos/edit-prazo-dialog'
import {
    X,
    Edit,
    Check,
    Trash2,
    FileText,
    AlertCircle
} from 'lucide-react'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

// Mock data para detalhes do prazo
const prazoDetalhes = {
    id: 'deadline-1',
    automatico: true,
    data: new Date(2025, 11, 15).toISOString(),
    status: 'Atrasado',
    responsavel: 'SEM INFORMAÇÃO',
    tipo_prazo: 'DECISÃO - JUSTIÇA COMUM',
    providencia: 'AGRAVO DE INSTRUMENTO',
    processo: {
        cnj: '1004424-19.2024.8.26.0587',
        id: 'matter-1',
    },
    estado: 'SÃO PAULO',
    orgao: 'JUSTIÇA DOS ESTADOS E DO DISTRITO FEDERAL E TERRITÓRIOS',
    tribunal: 'TJ SP - TRIBUNAL DE JUSTIÇA DE SÃO PAULO',
    celula: 'SEM INFORMAÇÃO',
    reus: 'SEM INFORMAÇÃO',
    autores: 'SEM INFORMAÇÃO',
    cliente: 'RAFAEL DE SOUZA COSTA',
    observacao: 'SEM INFORMAÇÃO',
    publicacao: {
        numero_pagina: '109348',
        data: '19/11/2025',
        diario: 'D.O. SÃO PAULO - TRIBUNAL DE JUSTIÇA (DJEN)',
        conteudo: `Publicacao Processo: 1004424-19.2024.8.26.0587 Orgao: Foro de Sao Sebastiao - 1 Vara Civel Data de disponibilizacao: 19/11/2025 D.J.e 20/11/2025 Acao de comunicacao Processo Eletronico Diario da Justica Eletronico Diario teo: https://www.dje.tjsp.jus.br Parte: R.S.C. Parte: D.G.C. Advogado: MARIA FERNANDA CESAR LAS CASAS DE OLIVEIRA - OAB SP-209768 Advogado: LUCIANA FERREIRA DIAS - OAB SP-257446 Conteudo: Processo 1004424-19.2024.8.26.0587 - Alimentos - Lei Especial nº 5.478/68 - Oferta - R.S.C. - D.G.C. - Vistos. 1. R.S.C. move a presente acao de alimentos em face de D.G.C e J.G.C., ambos incapazes, representados por sua genitora, pretendendo, em sintese, a fixacao de sua obrigacao alimentar em favor dos referidos filhos menores, os quais compartilha com a ex-companheira, da qual foi separado em razao de demanda continente, acao de divorcio, processo n 1004500-43.2024.8.26.0587, em tramite pela 2 Vara Civel local, na qual ja foi discutida a questao dos alimentos aos filhos incapazes, dentre outros pedidos como divorcio, guarda e visitas aos filhos (fls. 8/72). Eis a sintese. Acordao n. 2013734-40.2024.8.26.0000, de 19/11/2025 ... em fase de D.G.C e J.G.C., ambos incapazes, representados por sua genitora, pretendendo, em sintese, a fixacao de sua obrigacao alimentar em favor dos referidos filhos menores, os quais compartilha com a ex-companheira, da qual foi separado em razao de demanda continente, acao de divorcio, processo n 1004500-43.2024.8.26.0587, em tramite pela 2 Vara Civel local, na qual ja foi discutida a questao dos alimentos aos filhos incapazes...`,
    },
}

export default function PrazoDetalhesPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [editDialogOpen, setEditDialogOpen] = useState(false)

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold">Detalhes do Prazo</h1>
                    {prazoDetalhes.automatico && (
                        <Badge variant="secondary">PRAZO AUTOMÁTICO</Badge>
                    )}
                </div>
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <X className="h-5 w-5" />
                </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-center">
                <Button variant="outline" className="gap-2" onClick={() => setEditDialogOpen(true)}>
                    <Edit className="h-4 w-4" />
                    Editar
                </Button>
                <Button variant="outline" className="gap-2 text-green-600 hover:text-green-700">
                    <Check className="h-4 w-4" />
                    Concluir
                </Button>
                <Button variant="outline" className="gap-2 text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                    Descartar
                </Button>
                <Button variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Logs
                </Button>
            </div>

            {/* Data e Responsável - Box Laranja */}
            <Card className="border-orange-200 bg-orange-50">
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-orange-700 font-bold">
                                Data: {formatDate(prazoDetalhes.data)} 00:00
                            </span>
                            <Badge variant="destructive">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                {prazoDetalhes.status}
                            </Badge>
                        </div>
                        <div className="text-right">
                            <span className="text-orange-600 font-medium">Responsável: </span>
                            <span className="text-orange-700">{prazoDetalhes.responsavel}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tipo de Prazo e Providência - Grande */}
            <div className="text-center py-4">
                <h2 className="text-2xl font-bold text-gray-700">
                    {prazoDetalhes.tipo_prazo} | {prazoDetalhes.providencia}
                </h2>
            </div>

            {/* Grid de Informações */}
            <Card>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Número do Processo */}
                        <div>
                            <p className="text-sm font-bold text-gray-700 mb-1">NÚMERO DO PROCESSO</p>
                            <Link
                                href={`/processos/${prazoDetalhes.processo.id}`}
                                className="text-primary hover:underline font-mono"
                            >
                                {prazoDetalhes.processo.cnj}
                            </Link>
                        </div>

                        {/* Estado */}
                        <div>
                            <p className="text-sm font-bold text-gray-700 mb-1">ESTADO</p>
                            <p className="text-gray-600">{prazoDetalhes.estado}</p>
                        </div>

                        {/* Órgão */}
                        <div>
                            <p className="text-sm font-bold text-gray-700 mb-1">ÓRGÃO</p>
                            <p className="text-gray-600">{prazoDetalhes.orgao}</p>
                        </div>

                        {/* Tribunal */}
                        <div>
                            <p className="text-sm font-bold text-gray-700 mb-1">TRIBUNAL</p>
                            <p className="text-gray-600">{prazoDetalhes.tribunal}</p>
                        </div>

                        {/* Célula */}
                        <div>
                            <p className="text-sm font-bold text-gray-700 mb-1">CÉLULA</p>
                            <p className="text-gray-600">{prazoDetalhes.celula}</p>
                        </div>

                        {/* Réus */}
                        <div>
                            <p className="text-sm font-bold text-gray-700 mb-1">RÉUS</p>
                            <p className="text-gray-600">{prazoDetalhes.reus}</p>
                        </div>

                        {/* Autores */}
                        <div>
                            <p className="text-sm font-bold text-gray-700 mb-1">AUTORES</p>
                            <p className="text-gray-600">{prazoDetalhes.autores}</p>
                        </div>

                        {/* Cliente */}
                        <div>
                            <p className="text-sm font-bold text-gray-700 mb-1">CLIENTE</p>
                            <p className="text-gray-600">{prazoDetalhes.cliente}</p>
                        </div>

                        {/* Observação de Agendamento */}
                        <div className="md:col-span-2">
                            <p className="text-sm font-bold text-gray-700 mb-1">Observação de Agendamento</p>
                            <p className="text-gray-600">{prazoDetalhes.observacao}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Publicação - Roxo */}
            <Card className="border-purple-200 bg-purple-50">
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-purple-900">
                            Publicação - Pag.: {prazoDetalhes.publicacao.numero_pagina}
                        </h3>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                                🔍
                            </Button>
                            <Button size="sm" variant="outline">
                                🔎
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2 text-sm">
                        <p className="text-purple-800">
                            <strong>Data da Publicação:</strong> {prazoDetalhes.publicacao.data}
                        </p>
                        <p className="text-purple-800">
                            <strong>Diário:</strong> {prazoDetalhes.publicacao.diario}
                        </p>
                    </div>

                    <div className="mt-4 bg-white rounded p-4 text-xs text-gray-700 max-h-64 overflow-y-auto">
                        {prazoDetalhes.publicacao.conteudo}
                    </div>
                </CardContent>
            </Card>

            <EditPrazoDialog
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
                prazo={{
                    id: prazoDetalhes.id,
                    tipo_prazo: prazoDetalhes.tipo_prazo,
                    providencia: prazoDetalhes.providencia,
                    data: prazoDetalhes.data,
                    responsavel: prazoDetalhes.responsavel,
                    observacao: prazoDetalhes.observacao,
                }}
            />
        </div>
    )
}
