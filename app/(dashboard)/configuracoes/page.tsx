import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { OrganizationSettings } from '@/components/configuracoes/organization-settings'
import { mockOrganization } from '@/lib/mock-data'

export default function ConfiguracoesPage() {
    const isPro = mockOrganization.plan === 'PRO'

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Configurações</h1>
                <p className="text-muted-foreground">
                    Gerencie as configurações do sistema
                </p>
            </div>

            <Tabs defaultValue="organization" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="organization">Organização</TabsTrigger>
                    {isPro && <TabsTrigger value="team">Equipe</TabsTrigger>}
                    {isPro && <TabsTrigger value="integrations">Integrações</TabsTrigger>}
                    <TabsTrigger value="plan">Plano</TabsTrigger>
                </TabsList>

                <TabsContent value="organization" className="space-y-4">
                    <OrganizationSettings />
                </TabsContent>

                {isPro && (
                    <TabsContent value="team" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Equipe</CardTitle>
                                <CardDescription>
                                    Gerencie os membros da sua organização
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Funcionalidade de gerenciamento de equipe (PRO)
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                )}

                {isPro && (
                    <TabsContent value="integrations" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Integrações</CardTitle>
                                <CardDescription>
                                    Configure integrações com serviços externos
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-medium mb-2">WhatsApp (Webhook)</h3>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            Configure a URL do webhook para enviar mensagens via WhatsApp
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Feature PRO - Configure em Organization Settings
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                )}

                <TabsContent value="plan" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Plano Atual</CardTitle>
                            <CardDescription>
                                Informações sobre seu plano
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-2xl font-bold">{mockOrganization.plan}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {mockOrganization.plan === 'PRO'
                                            ? 'Acesso completo a todas as funcionalidades'
                                            : 'Plano básico - Upgrade para PRO para mais recursos'}
                                    </p>
                                </div>
                                {String(mockOrganization.plan) === 'STARTER' && (
                                    <div className="border-t pt-4">
                                        <h4 className="font-medium mb-2">Recursos PRO:</h4>
                                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                            <li>Multiusuário (equipes)</li>
                                            <li>Delegação de prazos</li>
                                            <li>Logs de auditoria</li>
                                            <li>Integração WhatsApp</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
