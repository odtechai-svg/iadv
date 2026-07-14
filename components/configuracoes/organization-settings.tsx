'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { mockOrganization } from '@/lib/mock-data'

export function OrganizationSettings() {
    const [name, setName] = useState(mockOrganization.name)
    const [webhookUrl, setWebhookUrl] = useState(
        mockOrganization.settings.whatsapp_webhook_url || ''
    )

    const handleSave = () => {
        alert('Preview mode: Alterações não são salvas!')
    }

    const isPro = mockOrganization.plan === 'PRO'

    return (
        <Card>
            <CardHeader>
                <CardTitle>Configurações da Organização</CardTitle>
                <CardDescription>
                    Gerencie as configurações gerais da sua organização
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="org-name">Nome da Organização</Label>
                    <Input
                        id="org-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {isPro && (
                    <div className="space-y-2">
                        <Label htmlFor="webhook-url">WhatsApp Webhook URL (PRO)</Label>
                        <Input
                            id="webhook-url"
                            type="url"
                            placeholder="https://api.exemplo.com/webhook"
                            value={webhookUrl}
                            onChange={(e) => setWebhookUrl(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                            URL do webhook para enviar mensagens via WhatsApp. Se não configurado, mensagens ficarão como "pendente".
                        </p>
                    </div>
                )}

                <Button onClick={handleSave}>
                    Salvar Alterações
                </Button>
            </CardContent>
        </Card>
    )
}
