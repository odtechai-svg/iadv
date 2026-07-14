'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    Inbox,
    Calendar,
    FileText,
    Users,
    Settings,
    HelpCircle,
    Gavel,
    Newspaper,
    Bell,
    CalendarDays,
    CheckSquare
} from 'lucide-react'

const navigation = [
    { name: 'Expediente do Dia', href: '/inbox', icon: Inbox },
    { name: 'Agenda', href: '/agenda', icon: CalendarDays },
    { name: 'Meus Prazos', href: '/prazos', icon: Calendar },
    { name: 'Meus Processos', href: '/processos', icon: FileText },
    { name: 'Minhas Publicações', href: '/publicacoes', icon: Newspaper },
    { name: 'Minhas Intimações', href: '/intimacoes', icon: Bell },
    { name: 'Minhas Tarefas', href: '/tarefas', icon: CheckSquare },
    { name: 'Clientes', href: '/clientes', icon: Users },
    { name: 'Configurações', href: '/configuracoes', icon: Settings },
    { name: 'Ajuda', href: '/ajuda', icon: HelpCircle },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-card">
            <div className="flex h-16 items-center px-6 border-b gap-2">
                <Gavel className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-primary">iADV</h1>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="border-t p-4">
                <p className="text-xs text-muted-foreground text-center">
                    v0.1.0 - iADV
                </p>
            </div>
        </div>
    )
}
