'use client'

import { Publicacao } from '@/lib/mock-publicacoes'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, ZoomIn, ZoomOut, FileText, CheckCircle, Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

interface PublicacaoCardProps {
    pub: Publicacao
}

export function PublicacaoCard({ pub }: PublicacaoCardProps) {
    return (
        <Card className="mb-6 overflow-hidden border-2 hover:border-purple-200 transition-colors">
            {/* Header: Link Processo, Data, Botões Ação */}
            <div className="bg-gray-50/50 p-4 border-b flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link href={`/processos/${pub.processo.cnj}`} className="text-purple-700 font-bold hover:underline text-lg">
                        {pub.processo.cnj}
                    </Link>
                    <span className="text-sm font-medium text-gray-700">
                        DATA DA PUBLICAÇÃO: {formatDate(pub.data_publicacao)}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="bg-white text-gray-600 border-gray-300">
                        Log de leitura
                    </Button>
                    {pub.status === 'nao_tratado' && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            Tratar Publicação
                        </Button>
                    )}
                </div>
            </div>

            <CardContent className="p-6 space-y-6">
                {/* Grid de Detalhes do Processo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 text-sm">
                    <div className="space-y-1">
                        <div className="flex">
                            <span className="font-bold w-24">Cliente(s):</span>
                            <span className="text-purple-700 font-medium">{pub.cliente.nome}</span>
                            <Badge variant="outline" className="ml-2 text-xs h-5 border-green-500 text-green-700 bg-green-50">Cliente</Badge>
                        </div>
                        <div className="flex">
                            <span className="font-bold w-24">Tribunal:</span>
                            <span className="text-gray-600 uppercase">{pub.processo.tribunal}</span>
                        </div>
                        <div className="flex">
                            <span className="font-bold w-24">Comarca:</span>
                            <span className="text-gray-600 uppercase">{pub.processo.comarca}</span>
                        </div>
                        <div className="flex">
                            <span className="font-bold w-24">Orgão:</span>
                            <span className="text-gray-600 uppercase">{pub.processo.orgao}</span>
                        </div>
                        <div className="flex">
                            <span className="font-bold w-24">Valor da Causa:</span>
                            <span className="text-gray-600">R$ {pub.processo.valor_causa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex">
                            <span className="font-bold w-24">Tipo da Ação:</span>
                            <span className="text-gray-600 uppercase">{pub.processo.tipo_acao}</span>
                        </div>
                        <div className="flex">
                            <span className="font-bold w-24">Natureza (Classe):</span>
                            <span className="text-gray-600 uppercase">{pub.processo.natureza}</span>
                        </div>
                        <div className="flex mt-2">
                            <span className="font-bold w-24">Autore(s):</span>
                            <span className="text-gray-600">{pub.processo.autores.join(', ')}</span>
                        </div>
                        <div className="flex">
                            <span className="font-bold w-24">Advogados(s) Envolvido(s):</span>
                            <span className="text-gray-600">{pub.processo.advogados_envolvidos.join(', ')}</span>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex">
                            <span className="font-bold w-32">UF:</span>
                            <span className="text-gray-600">{pub.processo.uf}</span>
                        </div>
                        <div className="flex">
                            <span className="font-bold w-32">Data Cadastro:</span>
                            <span className="text-gray-600">{formatDate(pub.processo.data_cadastro)}</span>
                        </div>
                        <div className="flex">
                            <span className="font-bold w-32">Instância:</span>
                            <span className="text-gray-600">{pub.processo.instancia}</span>
                        </div>
                        <div className="flex">
                            <span className="font-bold w-32">Juiz:</span>
                            <span className="text-gray-600 uppercase">{pub.processo.juiz}</span>
                        </div>
                        <div className="flex">
                            <span className="font-bold w-32">Vara:</span>
                            <span className="text-gray-600 uppercase">{pub.processo.vara}</span>
                        </div>
                        <div className="flex">
                            <span className="font-bold w-32">Célula:</span>
                            <span className="text-gray-600 uppercase">{pub.processo.celula}</span>
                        </div>
                        <div className="flex">
                            <span className="font-bold w-32">Data Distribuição:</span>
                            <span className="text-gray-600">{pub.processo.data_distribuicao !== 'SEM INFORMAÇÃO' ? formatDate(pub.processo.data_distribuicao) : 'SEM INFORMAÇÃO'}</span>
                        </div>
                        <div className="flex">
                            <span className="font-bold w-32">Motivo:</span>
                            <span className="text-gray-600 uppercase">{pub.processo.motivo}</span>
                        </div>
                        <div className="flex mt-2">
                            <span className="font-bold w-32">Réu(s):</span>
                            <span className="text-gray-600">{pub.processo.reus.join(', ')}</span>
                        </div>
                    </div>
                </div>

                {/* Conteúdo da Publicação */}
                <div className="space-y-2 pt-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 text-base">Conteúdo da Publicação</h3>
                        <div className="flex gap-2">
                            <ZoomIn className="h-4 w-4 text-purple-700 cursor-pointer" />
                            <ZoomOut className="h-4 w-4 text-purple-700 cursor-pointer" />
                        </div>
                    </div>

                    <div className="text-sm space-y-1">
                        <p><span className="font-bold">Data da Publicação:</span> {formatDate(pub.conteudo.data_disponibilizacao)}</p>
                        <p><span className="font-bold">Diário:</span> {pub.conteudo.diario}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md border text-justify text-xs leading-relaxed text-gray-700 font-serif">
                        {pub.conteudo.texto}
                    </div>
                </div>

                {/* Prazos */}
                <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50/50 p-3 border-b flex justify-between items-center">
                        <h3 className="font-bold text-gray-900">Prazos</h3>
                        <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50 h-8 text-xs">
                            Novo Prazo/Audiência
                        </Button>
                    </div>

                    <div className="divide-y">
                        {pub.prazos.map(prazo => (
                            <div key={prazo.id} className="p-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-gray-900">{formatDate(prazo.data)} 00:00</span>
                                        <Badge
                                            variant={prazo.status === 'atrasado' ? 'destructive' : 'secondary'}
                                            className={prazo.status === 'agendado' ? 'bg-purple-100 text-purple-800 hover:bg-purple-100' : ''}
                                        >
                                            {prazo.status === 'atrasado' ? 'Atrasado' : 'Agendado'}
                                        </Badge>
                                    </div>
                                    <p className="font-bold text-xs uppercase text-gray-700">{prazo.descricao}</p>
                                    <p className="text-xs text-gray-500"><span className="font-bold">RESPONSÁVEIS:</span> {prazo.responsavel}</p>
                                    <p className="text-xs text-gray-500"><span className="font-bold">PROVIDÊNCIA:</span> {prazo.providencia}</p>
                                    <p className="text-xs text-gray-500"><span className="font-bold">OBS. AGENDAMENTO:</span> {prazo.obs_agendamento}</p>
                                </div>

                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="h-7 text-xs rounded-full px-4 text-purple-700 border-purple-200 hover:bg-purple-50">
                                        Editar
                                    </Button>
                                    <Button size="sm" variant="outline" className="h-7 text-xs rounded-full px-4 text-green-600 border-green-200 hover:bg-green-50">
                                        Concluir
                                    </Button>
                                    <Button size="sm" variant="outline" className="h-7 text-xs rounded-full px-4 text-red-600 border-red-200 hover:bg-red-50">
                                        Descartar
                                    </Button>
                                    <Button size="sm" variant="outline" className="h-7 text-xs rounded-full px-4 text-gray-600 border-gray-200">
                                        Logs
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
