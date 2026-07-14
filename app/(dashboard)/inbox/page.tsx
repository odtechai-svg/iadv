import { InboxList } from '@/components/inbox/inbox-list'
import { InboxStats } from '@/components/inbox/inbox-stats'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { mockInboxItems, mockStats } from '@/lib/mock-data'

export default function InboxPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Expediente do Dia</h1>
                    <p className="text-muted-foreground">
                        Central de triagem de intimações e amandamentos
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Item Manual
                </Button>
            </div>

            <InboxStats stats={mockStats.inbox} />

            <InboxList items={mockInboxItems} />
        </div>
    )
}
