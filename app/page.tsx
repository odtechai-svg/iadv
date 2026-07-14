'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
    Inbox, Calendar, FileText, Users, CheckSquare, Newspaper,
    Bell, Sparkles, ChevronDown, ChevronRight, Gavel, ArrowRight,
    Shield, Zap, Clock, Calculator, Search, Bot, Menu, X,
    Star, BarChart3, Target, Layers
} from 'lucide-react'

/* ─── Intersection Observer hook ─── */
function useInView(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
        obs.observe(el)
        return () => obs.disconnect()
    }, [threshold])
    return { ref, visible }
}

function Section({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) {
    const { ref, visible } = useInView()
    return (
        <section id={id} ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
            {children}
        </section>
    )
}

/* ─── Data ─── */
const FEATURES = [
    { icon: Inbox, title: 'Expediente do Dia', desc: 'Central de triagem inteligente. Intimações, publicações e andamentos chegam organizados, prontos para ação.', color: 'from-blue-500 to-cyan-400' },
    { icon: Calendar, title: 'Prazos & Audiências', desc: 'Calculadora automática de prazos por providência, com contagem em dias úteis ou corridos por tribunal.', color: 'from-violet-500 to-purple-400' },
    { icon: CheckSquare, title: 'Kanban de Tarefas', desc: 'Board visual com colunas A Fazer, Em Progresso, Atrasados e Concluídos. Cada tarefa vinculada a processo e cliente.', color: 'from-emerald-500 to-green-400' },
    { icon: FileText, title: 'Processos Centralizados', desc: 'Cadastro completo com CNJ, tribunal, partes, advogados, juiz, valor da causa e instância. Tudo editável.', color: 'from-orange-500 to-amber-400' },
    { icon: Newspaper, title: 'Publicações do DJE', desc: 'Leitura completa de publicações com dados do processo enriquecidos e prazos vinculados automaticamente.', color: 'from-pink-500 to-rose-400' },
    { icon: Users, title: 'Gestão de Clientes', desc: 'CRM jurídico com clientes PF e PJ, CPF/CNPJ, contatos, histórico de processos e preferências.', color: 'from-sky-500 to-blue-400' },
]

const STATS = [
    { value: '10x', label: 'Mais rápido na triagem' },
    { value: '99%', label: 'Prazos cumpridos' },
    { value: '5h', label: 'Economizadas por dia' },
    { value: '∞', label: 'Processos ilimitados' },
]

const FAQ_ITEMS = [
    { q: 'O iADV substitui meu software de peticionamento?', a: 'Não. O iADV é focado em gestão operacional — prazos, inbox, tarefas e processos. Ele complementa ferramentas de peticionamento e protocolo eletrônico.' },
    { q: 'Meus dados estão seguros?', a: 'Sim. Utilizamos criptografia em trânsito (TLS) e em repouso, com infraestrutura de classe empresarial. Seus dados nunca são compartilhados com terceiros.' },
    { q: 'Posso testar antes de contratar?', a: 'Sim! Acesse a demo gratuita agora mesmo, sem necessidade de cadastro ou cartão de crédito. Explore todas as funcionalidades.' },
    { q: 'Funciona para qual área do direito?', a: 'Para todas: cível, criminal, trabalhista, família, empresarial, tributário e mais. O iADV se adapta ao fluxo do seu escritório.' },
    { q: 'O assistente IA acessa dados externos?', a: 'Não. Ele consulta apenas os dados do seu escritório dentro da plataforma, garantindo total privacidade e confidencialidade.' },
]

const NAV_LINKS = [
    { label: 'Funcionalidades', href: '#features' },
    { label: 'Como funciona', href: '#how-it-works' },
    { label: 'IA', href: '#ai' },
    { label: 'FAQ', href: '#faq' },
]

/* ─── Components ─── */

function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', h)
        return () => window.removeEventListener('scroll', h)
    }, [])
    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                            <Gavel className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">iADV</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map(l => (
                            <a key={l.href} href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors">{l.label}</a>
                        ))}
                    </div>
                    <div className="hidden md:flex items-center gap-3">
                        <Link href="/inbox" className="text-sm text-slate-300 hover:text-white transition-colors px-4 py-2">Entrar</Link>
                        <Link href="/inbox" className="text-sm font-semibold bg-gradient-to-r from-blue-500 to-violet-600 text-white px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-105">
                            Acessar Demo
                        </Link>
                    </div>
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white">
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>
            {mobileOpen && (
                <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/5 px-4 py-6 space-y-4">
                    {NAV_LINKS.map(l => (
                        <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block text-slate-300 hover:text-white">{l.label}</a>
                    ))}
                    <Link href="/inbox" className="block w-full text-center text-sm font-semibold bg-gradient-to-r from-blue-500 to-violet-600 text-white px-5 py-3 rounded-full">Acessar Demo</Link>
                </div>
            )}
        </nav>
    )
}

function Hero() {
    return (
        <div className="relative min-h-screen flex items-center overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-slate-950">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-slate-950" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMC41IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9zdmc+')] opacity-50" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Copy */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-blue-300 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4" />
                            <span>Assistente IA integrado</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] tracking-tight">
                            Nunca mais
                            <br />
                            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                                perca um prazo.
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-400 max-w-lg leading-relaxed">
                            O iADV centraliza intimações, prazos, processos e publicações do seu escritório.
                            Tudo num só lugar, com inteligência artificial.
                        </p>

                        <div className="space-y-3">
                            {['Triagem automática de intimações do DJE', 'Calculadora de prazos por providência', 'Assistente IA para consultas em linguagem natural'].map((t, i) => (
                                <div key={i} className="flex items-center gap-3 text-slate-300">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <span className="text-sm sm:text-base">{t}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <Link href="/inbox" className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold px-8 py-4 rounded-full text-base hover:shadow-2xl hover:shadow-blue-500/25 transition-all hover:scale-105">
                                Acessar Demo Gratuita
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a href="#features" className="inline-flex items-center justify-center gap-2 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 font-medium px-8 py-4 rounded-full text-base transition-all hover:bg-white/5">
                                Saiba Mais
                            </a>
                        </div>

                        <p className="text-xs text-slate-500">Sem cadastro · Sem cartão de crédito · Acesso imediato</p>
                    </div>

                    {/* Right: Product Mock */}
                    <div className="relative hidden lg:block">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-3xl blur-2xl" />
                        <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                            {/* Browser Chrome */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <div className="bg-slate-700/50 rounded-md px-4 py-1 text-xs text-slate-400">app.iadv.com.br</div>
                                </div>
                            </div>
                            {/* App Content */}
                            <div className="p-4 space-y-3">
                                {/* Header mock */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                                            <Gavel className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-sm font-bold text-white">iADV</span>
                                    </div>
                                    <div className="text-xs text-slate-500">João Silva</div>
                                </div>
                                {/* Stats row */}
                                <div className="grid grid-cols-4 gap-2">
                                    {[{ n: '4', l: 'Ativos', c: 'text-blue-400' }, { n: '2', l: 'Novos', c: 'text-amber-400' }, { n: '1', l: 'Triagem', c: 'text-emerald-400' }, { n: '1', l: 'Prazo', c: 'text-red-400' }].map((s, i) => (
                                        <div key={i} className="bg-slate-800/50 rounded-lg p-2.5 text-center border border-white/5">
                                            <div className={`text-lg font-bold ${s.c}`}>{s.n}</div>
                                            <div className="text-[10px] text-slate-500">{s.l}</div>
                                        </div>
                                    ))}
                                </div>
                                {/* Inbox items */}
                                {[
                                    { type: 'Intimação', status: 'Novo', title: 'Intimação para contestação', cnj: '0000123-45.2024' },
                                    { type: 'Publicação', status: 'Triagem', title: 'Publicação de sentença', cnj: '0000567-89.2024' },
                                ].map((item, i) => (
                                    <div key={i} className="bg-slate-800/30 rounded-lg p-3 border border-white/5 space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-medium bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">{item.type}</span>
                                            <span className="text-[10px] font-medium bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">{item.status}</span>
                                        </div>
                                        <p className="text-xs text-white font-medium">{item.title}</p>
                                        <p className="text-[10px] text-slate-500">Processo: {item.cnj}</p>
                                    </div>
                                ))}
                                {/* AI Chat bubble */}
                                <div className="flex justify-end">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20 animate-bounce" style={{ animationDuration: '3s' }}>
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <ChevronDown className="w-6 h-6 text-slate-600" />
                </div>
            </div>
        </div>
    )
}

function Stats() {
    return (
        <Section>
            <div className="bg-slate-950 border-y border-white/5 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {STATS.map((s, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">{s.value}</div>
                                <div className="text-sm text-slate-500 mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    )
}

function ProblemSolution() {
    return (
        <Section id="how-it-works">
            <div className="bg-slate-950 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                            O problema que você <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">já conhece</span>
                        </h2>
                        <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">80% dos advogados usam planilhas ou cadernos para controlar prazos. O iADV muda isso.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {[
                            { bad: 'Intimações perdidas em diários oficiais', good: 'Captura automática de publicações do DJE' },
                            { bad: 'Prazos anotados em planilhas e cadernos', good: 'Calculadora inteligente com dias úteis/corridos' },
                            { bad: 'Processos espalhados entre sistemas', good: 'Painel unificado com todos os dados do CNJ' },
                            { bad: 'Tarefas sem acompanhamento', good: 'Kanban jurídico com prioridades e responsáveis' },
                            { bad: 'Sem visibilidade do que é urgente', good: 'Dashboard "Expediente do Dia" com triagem' },
                            { bad: 'Informações espalhadas em WhatsApp e e-mails', good: 'Assistente IA para consultas instantâneas' },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 bg-slate-900/50 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors">
                                <div className="flex flex-col items-center gap-2 flex-shrink-0 pt-1">
                                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center"><X className="w-3 h-3 text-red-400" /></div>
                                    <div className="w-px h-4 bg-white/10" />
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                        <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-slate-500 line-through">{item.bad}</p>
                                    <p className="text-sm text-white font-medium">{item.good}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    )
}

function Features() {
    const [active, setActive] = useState(0)
    return (
        <Section id="features">
            <div className="bg-gradient-to-b from-slate-950 to-slate-900 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                            Tudo que seu escritório <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">precisa</span>
                        </h2>
                        <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">Do recebimento da intimação até o cumprimento do prazo. Uma plataforma completa.</p>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-6">
                        {FEATURES.map((f, i) => {
                            const Icon = f.icon
                            const isActive = active === i
                            return (
                                <button key={i} onClick={() => setActive(i)}
                                    className={`text-left p-6 rounded-2xl border transition-all duration-300 group ${isActive ? 'bg-white/5 border-white/10 shadow-xl scale-[1.02]' : 'bg-transparent border-white/5 hover:bg-white/[0.02] hover:border-white/10'}`}
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 ${isActive ? 'shadow-lg' : ''} transition-shadow`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Section>
    )
}

function AISection() {
    const suggestions = ['Quais meus prazos da semana?', 'Tenho prazos atrasados?', 'Me dê um resumo geral']
    return (
        <Section id="ai">
            <div className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-slate-950 to-blue-950" />
                <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 text-sm text-violet-300">
                                <Sparkles className="w-4 h-4" />
                                <span>Inteligência Artificial</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                                Seu assistente
                                <br />
                                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">jurídico com IA</span>
                            </h2>
                            <p className="text-lg text-slate-400 max-w-lg">Pergunte qualquer coisa sobre seus processos, prazos e clientes em linguagem natural. O iADV entende e responde com dados reais do seu escritório.</p>
                            <div className="space-y-3">
                                {['Consulte prazos e processos por voz ou texto', 'Receba resumos instantâneos do dia', 'Dados 100% privados — apenas do seu escritório'].map((t, i) => (
                                    <div key={i} className="flex items-center gap-3 text-slate-300">
                                        <Sparkles className="w-4 h-4 text-violet-400 flex-shrink-0" />
                                        <span className="text-sm">{t}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chat Mock */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/10 to-blue-500/10 rounded-3xl blur-xl" />
                            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 space-y-4">
                                <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">Assistente iADV</p>
                                        <p className="text-[10px] text-emerald-400">● Online</p>
                                    </div>
                                </div>
                                {/* Messages */}
                                <div className="space-y-3">
                                    <div className="flex justify-end"><div className="bg-blue-600 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%]"><p className="text-sm text-white">Quais meus prazos da semana?</p></div></div>
                                    <div className="flex justify-start">
                                        <div className="bg-slate-800/80 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] space-y-2">
                                            <p className="text-sm text-slate-200">Você tem <strong className="text-white">3 prazos</strong> nos próximos 7 dias:</p>
                                            <div className="space-y-1.5">
                                                {[{ t: 'Agravo de Instrumento', d: '3 dias', c: 'text-red-400' }, { t: 'Apelação', d: 'Hoje', c: 'text-amber-400' }, { t: 'Recurso em Sentido Estrito', d: '7 dias', c: 'text-blue-400' }].map((p, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-xs">
                                                        <span className={`font-bold ${p.c}`}>•</span>
                                                        <span className="text-slate-300">{p.t}</span>
                                                        <span className="text-slate-500">— {p.d}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="text-xs text-slate-400 pt-1">⚠️ <strong className="text-amber-300">1 prazo atrasado</strong> requer atenção imediata.</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Suggestions */}
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {suggestions.map((s, i) => (
                                        <span key={i} className="text-[11px] border border-white/10 text-slate-400 rounded-full px-3 py-1.5 hover:bg-white/5 cursor-pointer transition-colors">{s}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
}

function FAQSection() {
    const [open, setOpen] = useState<number | null>(null)
    return (
        <Section id="faq">
            <div className="bg-slate-950 py-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-black text-white">Perguntas Frequentes</h2>
                        <p className="mt-4 text-slate-400">Tire suas dúvidas sobre o iADV</p>
                    </div>
                    <div className="space-y-3">
                        {FAQ_ITEMS.map((item, i) => (
                            <div key={i} className="border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors">
                                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                                    <span className="font-medium text-white pr-4">{item.q}</span>
                                    <ChevronDown className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-40 pb-5' : 'max-h-0'}`}>
                                    <p className="px-5 text-sm text-slate-400 leading-relaxed">{item.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    )
}

function CTAFinal() {
    return (
        <Section>
            <div className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMC41IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-50" />
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
                        Comece agora.
                        <br />
                        Sem cartão de crédito.
                    </h2>
                    <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">Veja o iADV funcionando com dados reais de demonstração. Explore todas as funcionalidades sem compromisso.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/inbox" className="group inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold px-10 py-4 rounded-full text-lg hover:shadow-2xl transition-all hover:scale-105">
                            Acessar Demo Gratuita
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <p className="text-sm text-blue-200/60 mt-6">Acesso imediato · Sem cadastro · Sem compromisso</p>
                </div>
            </div>
        </Section>
    )
}

function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-white/5 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                            <Gavel className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold text-white">iADV</span>
                        <span className="text-xs text-slate-600 ml-2">v0.1.0</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-slate-500">
                        <a href="#" className="hover:text-slate-300 transition-colors">Termos de Uso</a>
                        <a href="#" className="hover:text-slate-300 transition-colors">Privacidade</a>
                        <a href="#" className="hover:text-slate-300 transition-colors">Contato</a>
                    </div>
                    <p className="text-xs text-slate-600">© 2026 iADV. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    )
}

/* ─── Main Page ─── */
export default function LandingPage() {
    return (
        <div className="bg-slate-950 min-h-screen">
            <Navbar />
            <Hero />
            <Stats />
            <ProblemSolution />
            <Features />
            <AISection />
            <FAQSection />
            <CTAFinal />
            <Footer />
        </div>
    )
}
