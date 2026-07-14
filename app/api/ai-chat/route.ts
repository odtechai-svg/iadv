import { NextRequest, NextResponse } from 'next/server'

// Mock data inline para processamento no servidor
// Em produção, isso viria do Supabase
const mockDeadlines = [
    {
        id: 'deadline-1',
        title: 'Agravo de Instrumento',
        due_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'Urgente',
        status: 'Agendado',
        tipo_prazo: 'DECISÃO - JUSTIÇA COMUM',
        providencia: 'AGRAVO DE INSTRUMENTO',
        responsavel: 'João Silva',
        processo: '0000123-45.2024.8.26.0100',
        cliente: 'João da Silva Santos',
    },
    {
        id: 'deadline-2',
        title: 'Manifestas sobre Despacho',
        due_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'Alta',
        status: 'Atrasado',
        tipo_prazo: 'DESPACHO - JUSTIÇA COMUM',
        providencia: 'MANIFESTAS SOBRE DESPACHO',
        responsavel: 'João Silva',
        processo: '0000567-89.2024.8.26.0200',
        cliente: 'Maria Oliveira Costa',
    },
    {
        id: 'deadline-3',
        title: 'Apelação',
        due_at: new Date(Date.now()).toISOString(),
        priority: 'Média',
        status: 'Agendado',
        tipo_prazo: 'DECISÃO - JUSTIÇA COMUM',
        providencia: 'APELACAO',
        responsavel: 'João Silva',
        processo: '0000123-45.2024.8.26.0100',
        cliente: 'João da Silva Santos',
    },
    {
        id: 'deadline-4',
        title: 'Recurso em Sentido Estrito',
        due_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'Baixa',
        status: 'Agendado',
        tipo_prazo: 'DESPACHO - JUSTIÇA COMUM',
        providencia: 'RECURSO EM SENTIDO ESTRITO',
        responsavel: 'João Silva',
        processo: '0000567-89.2024.8.26.0200',
        cliente: 'Maria Oliveira Costa',
    },
    {
        id: 'deadline-5',
        title: 'Manifestas em Provas',
        due_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'Média',
        status: 'Cumprido',
        tipo_prazo: 'DECISÃO - JUSTIÇA COMUM',
        providencia: 'MANIFESTAS EM PROVAS',
        responsavel: 'João Silva',
        processo: '0000987-65.2024.8.26.0300',
        cliente: 'Tech Solutions LTDA',
    },
]

const mockProcessos = [
    {
        id: 'matter-1',
        cnj: '0000123-45.2024.8.26.0100',
        tribunal: 'TJSP',
        uf: 'SP',
        parties_text: 'João da Silva Santos x Empresa XYZ',
        cliente: 'João da Silva Santos',
        status: 'Ativo',
    },
    {
        id: 'matter-2',
        cnj: '0000567-89.2024.8.26.0200',
        tribunal: 'TJSP',
        uf: 'SP',
        parties_text: 'Maria Oliveira Costa x Condomínio ABC',
        cliente: 'Maria Oliveira Costa',
        status: 'Ativo',
    },
    {
        id: 'matter-3',
        cnj: '0000987-65.2024.8.26.0300',
        tribunal: 'TJSP',
        uf: 'SP',
        parties_text: 'Tech Solutions LTDA x Fornecedor DEF',
        cliente: 'Tech Solutions LTDA',
        status: 'Ativo',
    },
]

interface ChatMessage {
    role: 'user' | 'assistant'
    content: string
}

function formatDate(dateStr: string): string {
    const date = new Date(dateStr)
    return date.toLocaleDateString('pt-BR', {
        weekday: 'short',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
}

function getDaysDiff(dateStr: string): number {
    const date = new Date(dateStr)
    const now = new Date()
    return Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

function processQuery(message: string): string {
    const lower = message.toLowerCase().trim()

    // Saudações
    if (/^(oi|olá|ola|hey|bom dia|boa tarde|boa noite|eai|e ai|hello|hi)/.test(lower)) {
        return `Olá! 👋 Sou o assistente jurídico do iADV. Posso te ajudar com informações sobre seus **prazos**, **processos** e **clientes**.\n\nAlgumas coisas que posso fazer:\n• Mostrar prazos da semana\n• Listar processos atrasados\n• Resumir seus processos ativos\n• Buscar informações de clientes\n\nComo posso ajudar?`
    }

    // Prazos desta semana
    if (/(prazos?|deadlines?).*(semana|week|próximos dias|proximos dias|7 dias|sete dias)/i.test(lower) ||
        /(semana|week).*(prazos?|deadlines?)/i.test(lower)) {
        const weekDeadlines = mockDeadlines.filter(d => {
            const diff = getDaysDiff(d.due_at)
            return diff >= -1 && diff <= 7 && d.status !== 'Cumprido'
        })

        if (weekDeadlines.length === 0) {
            return '✅ Você não tem prazos pendentes para esta semana. Aproveite para adiantar outras tarefas!'
        }

        let response = `📅 **Prazos desta semana** (${weekDeadlines.length} pendente${weekDeadlines.length > 1 ? 's' : ''}):\n\n`
        weekDeadlines.forEach((d, i) => {
            const diff = getDaysDiff(d.due_at)
            const urgency = diff < 0 ? '🔴 ATRASADO' : diff === 0 ? '🟡 HOJE' : diff <= 2 ? '🟠 URGENTE' : '🟢'
            response += `${i + 1}. **${d.title}** ${urgency}\n`
            response += `   📋 ${d.processo} · ${d.cliente}\n`
            response += `   📆 ${formatDate(d.due_at)} · Prioridade: ${d.priority}\n\n`
        })

        return response
    }

    // Prazos de hoje
    if (/(prazos?|deadlines?).*(hoje|today|dia)/i.test(lower) ||
        /(hoje|today).*(prazos?|deadlines?)/i.test(lower) ||
        lower === 'hoje') {
        const todayDeadlines = mockDeadlines.filter(d => {
            const diff = getDaysDiff(d.due_at)
            return diff >= 0 && diff < 1 && d.status !== 'Cumprido'
        })

        if (todayDeadlines.length === 0) {
            return '✅ Você não tem prazos para hoje! Tudo em dia.'
        }

        let response = `📅 **Prazos de hoje** (${todayDeadlines.length}):\n\n`
        todayDeadlines.forEach((d, i) => {
            response += `${i + 1}. **${d.title}**\n`
            response += `   📋 ${d.processo} · ${d.cliente}\n`
            response += `   Prioridade: ${d.priority} · ${d.providencia}\n\n`
        })

        return response
    }

    // Prazos atrasados
    if (/(atrasad|vencid|expirad|overdue|atraso)/i.test(lower)) {
        const overdue = mockDeadlines.filter(d => d.status === 'Atrasado' || getDaysDiff(d.due_at) < 0)

        if (overdue.length === 0) {
            return '✅ Nenhum prazo atrasado! Continue assim.'
        }

        let response = `⚠️ **Prazos atrasados** (${overdue.length}):\n\n`
        overdue.forEach((d, i) => {
            const diff = Math.abs(getDaysDiff(d.due_at))
            response += `${i + 1}. 🔴 **${d.title}** — ${diff} dia${diff > 1 ? 's' : ''} de atraso\n`
            response += `   📋 ${d.processo} · ${d.cliente}\n`
            response += `   Prioridade: ${d.priority}\n\n`
        })

        response += `\n💡 *Recomendo priorizar esses prazos imediatamente.*`

        return response
    }

    // Prazos gerais
    if (/(prazos?|deadlines?|venciment)/i.test(lower) && !/(processo|client)/i.test(lower)) {
        const pendentes = mockDeadlines.filter(d => d.status !== 'Cumprido')
        const atrasados = pendentes.filter(d => d.status === 'Atrasado' || getDaysDiff(d.due_at) < 0)
        const hoje = pendentes.filter(d => { const diff = getDaysDiff(d.due_at); return diff >= 0 && diff < 1 })
        const proximos = pendentes.filter(d => { const diff = getDaysDiff(d.due_at); return diff >= 1 && diff <= 7 })

        let response = `📊 **Resumo dos seus prazos:**\n\n`
        response += `• 🔴 Atrasados: **${atrasados.length}**\n`
        response += `• 🟡 Hoje: **${hoje.length}**\n`
        response += `• 🟢 Próximos 7 dias: **${proximos.length}**\n`
        response += `• 📋 Total pendentes: **${pendentes.length}**\n\n`

        if (atrasados.length > 0) {
            response += `⚠️ Atenção! Você tem **${atrasados.length}** prazo${atrasados.length > 1 ? 's' : ''} atrasado${atrasados.length > 1 ? 's' : ''}. Pergunte "quais prazos atrasados" para ver detalhes.`
        }

        return response
    }

    // Processos
    if (/(processos?|cases?|ações|acoes|causa)/i.test(lower)) {
        const ativos = mockProcessos.filter(p => p.status === 'Ativo')

        let response = `⚖️ **Seus processos ativos** (${ativos.length}):\n\n`
        ativos.forEach((p, i) => {
            response += `${i + 1}. **${p.cnj}**\n`
            response += `   🏛️ ${p.tribunal} · ${p.uf}\n`
            response += `   👤 ${p.parties_text}\n`
            response += `   Cliente: ${p.cliente}\n\n`
        })

        // Incluir info de prazos associados
        const prazosAtivos = mockDeadlines.filter(d => d.status !== 'Cumprido')
        if (prazosAtivos.length > 0) {
            response += `\n📌 Você tem **${prazosAtivos.length}** prazo${prazosAtivos.length > 1 ? 's' : ''} pendente${prazosAtivos.length > 1 ? 's' : ''}  nesses processos.`
        }

        return response
    }

    // Clientes
    if (/(clientes?|clients?)/i.test(lower)) {
        const clientes = [...new Set(mockProcessos.map(p => p.cliente))]

        let response = `👥 **Seus clientes com processos ativos** (${clientes.length}):\n\n`
        clientes.forEach((c, i) => {
            const numProcessos = mockProcessos.filter(p => p.cliente === c).length
            const numPrazos = mockDeadlines.filter(d => d.cliente === c && d.status !== 'Cumprido').length
            response += `${i + 1}. **${c}**\n`
            response += `   📁 ${numProcessos} processo${numProcessos > 1 ? 's' : ''} · 📅 ${numPrazos} prazo${numPrazos > 1 ? 's' : ''} pendente${numPrazos > 1 ? 's' : ''}\n\n`
        })

        return response
    }

    // Urgente / Prioridade
    if (/(urgent|priorit|importante|crítico|critico)/i.test(lower)) {
        const urgentes = mockDeadlines.filter(d =>
            (d.priority === 'Urgente' || d.priority === 'Alta') && d.status !== 'Cumprido'
        )

        if (urgentes.length === 0) {
            return '✅ Nenhum prazo urgente no momento!'
        }

        let response = `🚨 **Prazos urgentes/alta prioridade** (${urgentes.length}):\n\n`
        urgentes.forEach((d, i) => {
            const diff = getDaysDiff(d.due_at)
            const status = diff < 0 ? '🔴 ATRASADO' : diff === 0 ? '🟡 HOJE' : `🟢 em ${diff} dia${diff > 1 ? 's' : ''}`
            response += `${i + 1}. **${d.title}** — ${status}\n`
            response += `   📋 ${d.processo} · ${d.cliente}\n`
            response += `   Prioridade: ${d.priority}\n\n`
        })

        return response
    }

    // Resumo / Dashboard
    if (/(resum|summary|dashboard|visão geral|visao geral|status geral|como estou|como tá|como ta)/i.test(lower)) {
        const pendentes = mockDeadlines.filter(d => d.status !== 'Cumprido')
        const atrasados = pendentes.filter(d => d.status === 'Atrasado' || getDaysDiff(d.due_at) < 0)
        const processosAtivos = mockProcessos.filter(p => p.status === 'Ativo')

        let response = `📊 **Resumo do seu escritório:**\n\n`
        response += `⚖️ Processos ativos: **${processosAtivos.length}**\n`
        response += `📅 Prazos pendentes: **${pendentes.length}**\n`
        response += `🔴 Prazos atrasados: **${atrasados.length}**\n`
        response += `👥 Clientes ativos: **${[...new Set(mockProcessos.map(p => p.cliente))].length}**\n\n`

        if (atrasados.length > 0) {
            response += `⚠️ **Atenção:** Você tem prazos atrasados que precisam de ação imediata!\n`
        } else {
            response += `✅ Tudo em dia! Continue assim.`
        }

        return response
    }

    // Ajuda
    if (/(ajuda|help|o que|como|funciona|comandos|posso perguntar)/i.test(lower)) {
        return `🤖 **Como posso te ajudar:**\n\n` +
            `Basta me perguntar em linguagem natural! Exemplos:\n\n` +
            `📅 **Prazos:**\n` +
            `• "Quais meus prazos desta semana?"\n` +
            `• "Tenho prazos atrasados?"\n` +
            `• "Quais prazos urgentes?"\n` +
            `• "Prazos de hoje"\n\n` +
            `⚖️ **Processos:**\n` +
            `• "Mostre meus processos ativos"\n` +
            `• "Quantos processos tenho?"\n\n` +
            `👥 **Clientes:**\n` +
            `• "Listar meus clientes"\n\n` +
            `📊 **Geral:**\n` +
            `• "Me dê um resumo geral"\n` +
            `• "Como estou?"`
    }

    // Fallback
    return `Desculpe, não entendi completamente sua pergunta. 🤔\n\nPosso te ajudar com:\n• **Prazos** — "quais meus prazos da semana?"\n• **Processos** — "mostre meus processos"\n• **Clientes** — "listar clientes"\n• **Resumo** — "como estou?"\n\nTente reformular sua pergunta ou pergunte "ajuda" para ver mais opções.`
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { message, history } = body as { message: string; history: ChatMessage[] }

        if (!message || typeof message !== 'string') {
            return NextResponse.json(
                { error: 'Mensagem é obrigatória' },
                { status: 400 }
            )
        }

        // Simula um pequeno delay para parecer processamento real
        await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))

        const response = processQuery(message)

        return NextResponse.json({
            response,
            timestamp: new Date().toISOString(),
        })
    } catch (error) {
        console.error('AI Chat error:', error)
        return NextResponse.json(
            { error: 'Erro ao processar mensagem' },
            { status: 500 }
        )
    }
}
