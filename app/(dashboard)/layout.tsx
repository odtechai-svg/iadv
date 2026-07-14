import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { AIAssistant } from '@/components/ai-assistant'
import { mockUser } from '@/lib/mock-data'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = {
        name: mockUser.name,
        email: mockUser.email,
        avatar_url: mockUser.avatar_url,
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header user={user} />
                <main className="flex-1 overflow-y-auto bg-muted/10 p-6">
                    {children}
                </main>
            </div>
            <AIAssistant />
        </div>
    )
}
