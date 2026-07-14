'use client'

import { PublicacaoCard } from '@/components/publicacoes/publicacao-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { mockPublicacoes } from '@/lib/mock-publicacoes'
import { FileDown, Search, FileText, Settings, File } from 'lucide-react'

export default function PublicacoesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Minhas Publicações</h1>
                    <p className="text-muted-foreground">
                        Consulte suas publicações
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className='gap-2'>
                        <Plus className="h-4 w-4" />
                        Nova Tarefa
                    </Button>
                    <Button variant="outline" size="icon">
                        <Settings className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Filtros */}
            <Card>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="status" className="text-xs text-gray-500">Status</Label>
                            <Select defaultValue="nao_tratado">
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Selecione..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="nao_tratado">Não Tratado</SelectItem>
                                    <SelectItem value="tratado">Tratado</SelectItem>
                                    <SelectItem value="todos">Todos</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="cliente" className="text-xs text-gray-500">Cliente</Label>
                            <Select>
                                <SelectTrigger id="cliente">
                                    <SelectValue placeholder="Selecione..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="c1">Raquel Ricardo Paz</SelectItem>
                                    <SelectItem value="c2">Fernanda Las Casas</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="data" className="text-xs text-gray-500">Data Publicação *</Label>
                            <div className="flex gap-2 items-center">
                                <Input type="date" className="text-xs" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="celula" className="text-xs text-gray-500">Célula</Label>
                            <Select>
                                <SelectTrigger id="celula">
                                    <SelectValue placeholder="Selecione..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="geral">Geral</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="processo" className="text-xs text-gray-500">Número do Processo</Label>
                            <Input id="processo" placeholder="Número do Processo" />
                        </div>

                        <div className="space-y-1 col-span-3 lg:col-span-1">
                            <Label htmlFor="parte" className="text-xs text-gray-500">Parte (Autor ou Réu)</Label>
                            <Input id="parte" placeholder="Parte (Autor ou Réu)" />
                        </div>
                    </div>

                    {/* Toolbar de Ações */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t">
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="bg-white text-green-700 border-green-200 hover:bg-green-50">
                                <FileDown className="mr-2 h-4 w-4" />
                                Exportar Excel
                            </Button>
                            <Button variant="outline" size="sm" className="bg-white text-blue-700 border-blue-200 hover:bg-blue-50">
                                <FileText className="mr-2 h-4 w-4" />
                                Exportar Word
                            </Button>
                            <Button variant="outline" size="sm" className="bg-white text-red-700 border-red-200 hover:bg-red-50">
                                <File className="mr-2 h-4 w-4" />
                                Exportar Pdf
                            </Button>
                        </div>

                        <Button className="bg-purple-800 hover:bg-purple-900 text-white min-w-[120px]">
                            <Search className="mr-2 h-4 w-4" />
                            Consultar
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Lista de Publicações */}
            <div>
                {mockPublicacoes.map(pub => (
                    <PublicacaoCard key={pub.id} pub={pub} />
                ))}
            </div>
        </div>
    )
}

import { Plus } from 'lucide-react'
