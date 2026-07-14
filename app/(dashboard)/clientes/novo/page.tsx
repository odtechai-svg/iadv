'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Plus, HelpCircle, Mail, MapPin, Building2, User, Wallet } from 'lucide-react'
import Link from 'next/link'

export default function NovoClientePage() {
    // Estado para "Envio de Novos Andamentos" e "Aniversário"
    const [envioAndamentos, setEnvioAndamentos] = useState(false)
    const [envioAniversario, setEnvioAniversario] = useState(false)
    const [visualizarProcessos, setVisualizarProcessos] = useState(false)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Link href="/clientes">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold">Novo Cliente</h1>
                    </div>
                    <p className="text-muted-foreground ml-10">
                        Cadastre seus clientes
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Coluna Principal - Formulário */}
                <div className="lg:col-span-2 space-y-8">

                    {/* 1. Dados Pessoais */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-purple-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                            <h2 className="text-lg font-semibold">Dados Pessoais</h2>
                        </div>
                        <div className="border rounded-lg p-6 space-y-4 bg-white">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                <div className="md:col-span-3 space-y-1">
                                    <Label className="text-xs text-gray-500">Tipo de Pessoa*</Label>
                                    <Select defaultValue="fisica">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="fisica">Pessoa Física</SelectItem>
                                            <SelectItem value="juridica">Pessoa Jurídica</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="md:col-span-3 space-y-1">
                                    <Label className="text-xs text-gray-500">CPF</Label>
                                    <Input placeholder="CPF" />
                                </div>
                                <div className="md:col-span-6 space-y-1">
                                    <Label className="text-xs text-gray-500">Nome*</Label>
                                    <Input placeholder="Nome completo" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                <div className="md:col-span-6 space-y-1 relative">
                                    <Label className="text-xs text-gray-500">Email</Label>
                                    <div className="relative">
                                        <Input placeholder="Email" className="pr-8" />
                                        <Mail className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                                    </div>
                                </div>
                                <div className="md:col-span-3 space-y-1">
                                    <Label className="text-xs text-gray-500">RG/Identidade</Label>
                                    <Input placeholder="RG/Identidade" />
                                </div>
                                <div className="md:col-span-3 space-y-1">
                                    <Label className="text-xs text-gray-500">Data de Nascimento</Label>
                                    <Input type="date" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                <div className="md:col-span-8 space-y-1 relative">
                                    <Label className="text-xs text-gray-500">Profissão</Label>
                                    <div className="relative">
                                        <Input placeholder="Profissão" className="pr-8" />
                                        <Building2 className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                                    </div>
                                </div>
                                <div className="md:col-span-4 space-y-1">
                                    <Label className="text-xs text-gray-500">Estado Civil</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                                            <SelectItem value="casado">Casado(a)</SelectItem>
                                            <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                                            <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                <div className="md:col-span-3 space-y-1 relative">
                                    <Label className="text-xs text-gray-500">Cep</Label>
                                    <div className="relative">
                                        <Input placeholder="Cep" className="pr-8" />
                                        <MapPin className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                                    </div>
                                </div>
                                <div className="md:col-span-6 space-y-1 relative">
                                    <Label className="text-xs text-gray-500">Rua</Label>
                                    <div className="relative">
                                        <Input placeholder="Rua" className="pr-8" />
                                        <MapPin className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                                    </div>
                                </div>
                                <div className="md:col-span-3 space-y-1 relative">
                                    <Label className="text-xs text-gray-500">Número</Label>
                                    <div className="relative">
                                        <Input placeholder="Número" className="pr-8" />
                                        <MapPin className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                <div className="md:col-span-4 space-y-1 relative">
                                    <Label className="text-xs text-gray-500">Complemento</Label>
                                    <div className="relative">
                                        <Input placeholder="Complemento" className="pr-8" />
                                        <HelpCircle className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                                    </div>
                                </div>
                                <div className="md:col-span-3 space-y-1 relative">
                                    <Label className="text-xs text-gray-500">Bairro</Label>
                                    <div className="relative">
                                        <Input placeholder="Bairro" className="pr-8" />
                                        <MapPin className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                                    </div>
                                </div>
                                <div className="md:col-span-3 space-y-1 relative">
                                    <Label className="text-xs text-gray-500">Cidade</Label>
                                    <div className="relative">
                                        <Input placeholder="Cidade" className="pr-8" />
                                        <Building2 className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-1">
                                    <Label className="text-xs text-gray-500">Estado</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="UF" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sp">SP</SelectItem>
                                            <SelectItem value="rj">RJ</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Financeiro */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-purple-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                            <h2 className="text-lg font-semibold">Financeiro</h2>
                        </div>
                        <div className="border rounded-lg p-6 bg-white">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label className="text-xs text-gray-500">Conta</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="principal">Conta Principal</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs text-gray-500">Subconta</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="padrao">Padrão</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Dados Bancários */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-purple-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                            <h2 className="text-lg font-semibold">Dados Bancários</h2>
                        </div>
                        <div className="border rounded-lg p-6 bg-white space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                <div className="md:col-span-4 space-y-1">
                                    <Label className="text-xs text-gray-500">Banco/Código</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="bb">Banco do Brasil</SelectItem>
                                            <SelectItem value="itau">Itaú</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="md:col-span-4 space-y-1 relative">
                                    <Label className="text-xs text-gray-500">Agência</Label>
                                    <div className="relative">
                                        <Input placeholder="Agência" className="pr-8" />
                                        <Building2 className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                                    </div>
                                </div>
                                <div className="md:col-span-4 space-y-1 relative">
                                    <Label className="text-xs text-gray-500">Conta</Label>
                                    <div className="relative">
                                        <Input placeholder="Conta" className="pr-8" />
                                        <Wallet className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch id="representante" />
                                <Label htmlFor="representante" className="font-normal text-gray-600">Cadastrar Representante Legal</Label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-start pt-4">
                        <Button className="bg-green-600 hover:bg-green-700 text-white min-w-[150px]">
                            <Plus className="mr-2 h-4 w-4" />
                            Cadastrar
                        </Button>
                    </div>

                </div>

                {/* Coluna Lateral - Configurações */}
                <div className="space-y-6">

                    {/* Envio de Novos Andamentos */}
                    <Card>
                        <CardContent className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-sm uppercase text-gray-700">ENVIO DE NOVOS ANDAMENTOS</h3>
                                <HelpCircle className="h-4 w-4 text-gray-400" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        checked={envioAndamentos}
                                        onCheckedChange={setEnvioAndamentos}
                                    />
                                    <Label className="font-normal">Habilitar</Label>
                                </div>
                                <Button variant="outline" size="sm" className="text-xs h-8">
                                    Modelo de WhatsApp
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Envio de Feliz Aniversário */}
                    <Card>
                        <CardContent className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-sm uppercase text-gray-700">ENVIO DE FELIZ ANIVERSÁRIO</h3>
                                <HelpCircle className="h-4 w-4 text-gray-400" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        checked={envioAniversario}
                                        onCheckedChange={setEnvioAniversario}
                                    />
                                    <Label className="font-normal">Habilitar</Label>
                                </div>
                                <Button variant="outline" size="sm" className="text-xs h-8">
                                    Modelo de WhatsApp
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Visualizar Processos */}
                    <Card>
                        <CardContent className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-sm uppercase text-gray-700">CLIENTE PODE VISUALIZAR PROCESSOS</h3>
                                <HelpCircle className="h-4 w-4 text-gray-400" />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    checked={visualizarProcessos}
                                    onCheckedChange={setVisualizarProcessos}
                                />
                                <Label className="font-normal">Habilitar</Label>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contatos */}
                    <Card>
                        <CardContent className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-sm text-gray-700">Contatos</h3>
                                <Button variant="outline" size="sm" className="text-purple-700 border-purple-200 hover:bg-purple-50">
                                    <Plus className="h-3 w-3 mr-1" />
                                    Novo
                                </Button>
                            </div>
                            <div className="bg-gray-50 border rounded p-4 text-center text-sm text-gray-500">
                                Nenhum contato adicionado
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    )
}
