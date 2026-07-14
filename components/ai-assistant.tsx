'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { X, Send, Sparkles, MessageSquare, Bot, User, Loader2, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
}

const SUGGESTIONS = [
    'Quais meus prazos da semana?',
    'Tenho prazos atrasados?',
    'Mostre meus processos',
    'Me dê um resumo geral',
]

export function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showPulse, setShowPulse] = useState(true)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const chatContainerRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [])

    useEffect(() => {
        scrollToBottom()
    }, [messages, scrollToBottom])

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    // Remove pulse after first open
    useEffect(() => {
        if (isOpen) setShowPulse(false)
    }, [isOpen])

    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            role: 'user',
            content: text.trim(),
            timestamp: new Date(),
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/ai-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text.trim(),
                    history: messages.map(m => ({ role: m.role, content: m.content })),
                }),
            })

            const data = await response.json()

            const assistantMessage: Message = {
                id: `assistant-${Date.now()}`,
                role: 'assistant',
                content: data.response || 'Desculpe, ocorreu um erro.',
                timestamp: new Date(),
            }

            setMessages(prev => [...prev, assistantMessage])
        } catch {
            const errorMessage: Message = {
                id: `error-${Date.now()}`,
                role: 'assistant',
                content: '⚠️ Erro de conexão. Tente novamente em alguns instantes.',
                timestamp: new Date(),
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        sendMessage(input)
    }

    const handleSuggestion = (suggestion: string) => {
        sendMessage(suggestion)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage(input)
        }
    }

    // Render markdown-like bold text
    const renderContent = (content: string) => {
        const parts = content.split(/(\*\*.*?\*\*)/g)
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
            }
            // Handle line breaks
            const lines = part.split('\n')
            return lines.map((line, j) => (
                <span key={`${i}-${j}`}>
                    {j > 0 && <br />}
                    {line}
                </span>
            ))
        })
    }

    return (
        <>
            {/* Chat Panel */}
            <div
                className={cn(
                    'fixed bottom-24 right-6 z-50 flex flex-col',
                    'w-[400px] max-h-[600px] rounded-2xl',
                    'bg-white border border-gray-200/80',
                    'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)]',
                    'transition-all duration-300 ease-out',
                    isOpen
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                        : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50 rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-200/50">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                iADV AI
                                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">
                                    Beta
                                </span>
                            </h3>
                            <p className="text-xs text-gray-500">Assistente Jurídico Inteligente</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white/80 transition-all"
                        aria-label="Fechar assistente"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Messages */}
                <div
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-[300px] max-h-[420px] scroll-smooth"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#e5e7eb transparent',
                    }}
                >
                    {messages.length === 0 ? (
                        /* Welcome State */
                        <div className="flex flex-col items-center justify-center h-full py-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4 shadow-lg shadow-amber-200/40">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="text-base font-bold text-gray-900 mb-1">
                                Olá! Sou seu assistente jurídico.
                            </h4>
                            <p className="text-xs text-gray-500 text-center mb-6 max-w-[280px]">
                                Pergunte sobre seus prazos, processos e clientes em linguagem natural.
                            </p>

                            {/* Suggestion Chips */}
                            <div className="w-full space-y-2">
                                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide px-1">
                                    Sugestões
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {SUGGESTIONS.map((suggestion, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSuggestion(suggestion)}
                                            className={cn(
                                                'text-xs px-3 py-2 rounded-xl border transition-all duration-200',
                                                'border-gray-200 text-gray-600',
                                                'hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700',
                                                'hover:shadow-sm active:scale-[0.97]'
                                            )}
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Messages List */
                        <>
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cn(
                                        'flex gap-2.5 animate-in fade-in-0 slide-in-from-bottom-2 duration-300',
                                        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                                    )}
                                >
                                    {/* Avatar */}
                                    <div
                                        className={cn(
                                            'w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5',
                                            message.role === 'user'
                                                ? 'bg-gray-900'
                                                : 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-sm shadow-amber-200/30'
                                        )}
                                    >
                                        {message.role === 'user' ? (
                                            <User className="w-3.5 h-3.5 text-white" />
                                        ) : (
                                            <Bot className="w-3.5 h-3.5 text-white" />
                                        )}
                                    </div>

                                    {/* Bubble */}
                                    <div
                                        className={cn(
                                            'max-w-[80%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed',
                                            message.role === 'user'
                                                ? 'bg-gray-900 text-white rounded-tr-md'
                                                : 'bg-gray-50 text-gray-800 border border-gray-100 rounded-tl-md'
                                        )}
                                    >
                                        {renderContent(message.content)}
                                        <div
                                            className={cn(
                                                'text-[10px] mt-2 opacity-50',
                                                message.role === 'user' ? 'text-right' : 'text-left'
                                            )}
                                        >
                                            {message.timestamp.toLocaleTimeString('pt-BR', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Typing indicator */}
                            {isLoading && (
                                <div className="flex gap-2.5 animate-in fade-in-0 duration-300">
                                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-sm shadow-amber-200/30">
                                        <Bot className="w-3.5 h-3.5 text-white" />
                                    </div>
                                    <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1.5">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                        <span className="text-xs text-gray-400 ml-2">Analisando...</span>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />

                            {/* Quick suggestions after messages */}
                            {!isLoading && messages.length > 0 && messages.length < 6 && (
                                <div className="pt-2">
                                    <div className="flex flex-wrap gap-1.5">
                                        {SUGGESTIONS.slice(0, 3).map((suggestion, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleSuggestion(suggestion)}
                                                className="text-[11px] px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 transition-all"
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Input Area */}
                <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                    <form onSubmit={handleSubmit} className="relative flex items-center">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Pergunte sobre seus dados..."
                            disabled={isLoading}
                            className={cn(
                                'w-full pr-12 pl-4 py-3 rounded-xl text-sm',
                                'bg-gray-50 border border-gray-200',
                                'placeholder:text-gray-400',
                                'focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400',
                                'transition-all duration-200',
                                'disabled:opacity-50'
                            )}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className={cn(
                                'absolute right-2 w-8 h-8 rounded-lg flex items-center justify-center',
                                'transition-all duration-200',
                                input.trim() && !isLoading
                                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-200/50 hover:shadow-amber-300/50 hover:scale-105 active:scale-95'
                                    : 'bg-gray-200 text-gray-400'
                            )}
                            aria-label="Enviar mensagem"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Send className="w-4 h-4" />
                            )}
                        </button>
                    </form>
                    <p className="text-[10px] text-gray-400 text-center mt-2">
                        Assistente em beta · Dados podem não refletir informações em tempo real
                    </p>
                </div>
            </div>

            {/* FAB Button */}
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className={cn(
                    'fixed bottom-6 right-6 z-50',
                    'w-14 h-14 rounded-2xl',
                    'flex items-center justify-center',
                    'transition-all duration-300 ease-out',
                    'focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300',
                    isOpen
                        ? 'bg-gray-900 text-white shadow-xl hover:bg-gray-800 rotate-0'
                        : 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xl shadow-amber-300/40 hover:shadow-amber-400/60 hover:scale-105'
                )}
                aria-label={isOpen ? 'Fechar assistente' : 'Abrir assistente'}
            >
                {isOpen ? (
                    <ChevronDown className="w-6 h-6 transition-transform duration-300" />
                ) : (
                    <>
                        <MessageSquare className="w-6 h-6 transition-transform duration-300" />
                        {/* Pulse ring */}
                        {showPulse && (
                            <span className="absolute inset-0 rounded-2xl animate-ping bg-amber-400/30" />
                        )}
                        {/* Notification dot */}
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white text-[8px] text-white font-bold flex items-center justify-center">
                            1
                        </span>
                    </>
                )}
            </button>
        </>
    )
}
