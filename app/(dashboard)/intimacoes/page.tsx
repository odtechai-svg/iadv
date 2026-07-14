import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Bell, AlertCircle, Settings } from 'lucide-react'

export default function IntimacoesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Minhas Intimações</h1>
                    <p className="text-muted-foreground">
                        Receba intimações automaticamente do Tribunal de Justiça
                    </p>
                </div>
            </div>

            {/* Status Card */}
            <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <AlertCircle className="h-8 w-8 text-orange-600" />
                        <div>
                            <CardTitle className="text-orange-900">Aguardando Conexão com API</CardTitle>
                            <CardDescription className="text-orange-700">
                                Configure a integração com o Tribunal de Justiça do seu estado
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-orange-800 mb-4">
                        A conexão automática com o TJ permite receber intimações em tempo real,
                        economizando tempo e reduzindo o risco de perder prazos importantes.
                    </p>
                </CardContent>
            </Card>

            {/* Configuração */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        <CardTitle>Configurar Integração</CardTitle>
                    </div>
                    <CardDescription>
                        Selecione o Tribunal de Justiça e configure suas credenciais
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="tribunal">Tribunal de Justiça</Label>
                        <Select>
                            <SelectTrigger id="tribunal">
                                <SelectValue placeholder="Selecione o TJ" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="tjsp">TJ-SP - São Paulo</SelectItem>
                                <SelectItem value="tjrj">TJ-RJ - Rio de Janeiro</SelectItem>
                                <SelectItem value="tjmg">TJ-MG - Minas Gerais</SelectItem>
                                <SelectItem value="tjrs">TJ-RS - Rio Grande do Sul</SelectItem>
                                <SelectItem value="tjpr">TJ-PR - Paraná</SelectItem>
                                <SelectItem value="tjsc">TJ-SC - Santa Catarina</SelectItem>
                                <SelectItem value="tjba">TJ-BA - Bahia</SelectItem>
                                <SelectItem value="tjpe">TJ-PE - Pernambuco</SelectItem>
                                <SelectItem value="tjce">TJ-CE - Ceará</SelectItem>
                                <SelectItem value="tjgo">TJ-GO - Goiás</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="api-key">Chave de API</Label>
                        <Input
                            id="api-key"
                            type="password"
                            placeholder="Cole sua chave de API aqui"
                        />
                        <p className="text-xs text-muted-foreground">
                            Obtenha sua chave de API no portal do tribunal do seu estado
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cpf-oab">CPF/OAB</Label>
                        <Input
                            id="cpf-oab"
                            placeholder="000.000.000-00 ou OAB/UF 123456"
                        />
                    </div>

                    <div className="flex gap-3">
                        <Button className="flex-1">
                            <Bell className="mr-2 h-4 w-4" />
                            Conectar
                        </Button>
                        <Button variant="outline">
                            Testar Conexão
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Informações */}
            <Card>
                <CardHeader>
                    <CardTitle>Como Funciona?</CardTitle>
                </CardHeader>
                <CardContent>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                        <li>Selecione o Tribunal de Justiça do seu estado</li>
                        <li>Configure suas credenciais de acesso (API Key + CPF/OAB)</li>
                        <li>Teste a conexão para validar os dados</li>
                        <li>Após conectar, as intimações serão baixadas automaticamente</li>
                        <li>Você receberá notificações de novas intimações em tempo real</li>
                    </ol>
                </CardContent>
            </Card>

            {/* Preview Lista Vazia */}
            <Card>
                <CardHeader>
                    <CardTitle>Intimações Recentes</CardTitle>
                    <CardDescription>
                        Após conectar, suas intimações aparecerão aqui
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                        <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                        <p className="text-lg font-medium mb-2">Nenhuma intimação ainda</p>
                        <p className="text-sm">
                            Configure a integração acima para começar a receber intimações
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
