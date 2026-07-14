import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AjudaPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Ajuda</h1>
                <p className="text-muted-foreground">
                    Recursos e documentação do sistema
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>🚀 Começando</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-sm">
                            <strong>Inbox First:</strong> O sistema é centrado no inbox. Comece por lá para triar intimações e criar prazos.
                        </p>
                        <p className="text-sm">
                            <strong>5 minutos por dia:</strong> O widget de prazos mostra o que você precisa fazer nos próximos 7 dias.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>📋 Prazos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-sm">
                            Crie prazos diretamente do inbox ou manualmente. Vincule a processos e clientes para melhor organização.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>⚖️ Processos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-sm">
                            Cadastro minimalista: apenas CNJ, tribunal e UF são obrigatórios. Campos avançados ficam em aba separada.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>💼 Clientes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-sm">
                            Cadastre clientes PF ou PJ. Configure preferências de comunicação (e-mail e WhatsApp no plano PRO).
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>📱 WhatsApp (PRO)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-sm">
              Configure webhook em Configurações > Integrações. Se não configurado, mensagens ficam como "pendente".
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>👥 Planos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-sm">
                            <strong>STARTER:</strong> 1 usuário, recursos básicos
                        </p>
                        <p className="text-sm">
                            <strong>PRO:</strong> Multiusuário, delegação, auditoria, WhatsApp
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
