import { ClientList } from '@/components/clientes/client-list'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { mockClients } from '@/lib/mock-data'
import Link from 'next/link'

export default function ClientesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Clientes</h1>
                    <p className="text-muted-foreground">
                        Gerencie sua base de clientes
                    </p>
                </div>
                <Link href="/clientes/novo">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Novo Cliente
                    </Button>
                </Link>
            </div>

            <ClientList clients={mockClients} />
        </div>
    )
}
