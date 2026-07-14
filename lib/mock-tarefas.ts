// Mock data para tarefas
export const mockTarefas = [
    {
        id: 'task-1',
        titulo: 'Revisar petição inicial',
        descricao: 'Revisar e ajustar petição inicial do processo 0000123-45',
        status: 'a_fazer' as const,
        prioridade: 'Alta' as const,
        data_final: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        responsavel_id: '1',
        responsavel_nome: 'João Silva',
        processo_cnj: '00001234520248260100',
        cliente_nome: 'João da Silva Santos',
        lista_tarefas: 'Petições',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'task-2',
        titulo: 'Protocolar recurso',
        descricao: 'Protocolar recurso de apelação no TJSP',
        status: 'em_progresso' as const,
        prioridade: 'Urgente' as const,
        data_final: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        responsavel_id: '1',
        responsavel_nome: 'João Silva',
        processo_cnj: '00005678920248260200',
        cliente_nome: 'Maria Oliveira Costa',
        lista_tarefas: 'Recursos',
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'task-3',
        titulo: 'Atualizar cliente sobre andamento',
        descricao: 'Enviar relatório de andamento processual ao cliente',
        status: 'atrasado' as const,
        prioridade: 'Média' as const,
        data_final: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        responsavel_id: '1',
        responsavel_nome: 'João Silva',
        processo_cnj: '00009876520248260300',
        cliente_nome: 'Tech Solutions LTDA',
        lista_tarefas: 'Comunicação',
        created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'task-4',
        titulo: 'Preparar para audiência',
        descricao: 'Preparar documentos e argumentos para audiência de instrução',
        status: 'concluido' as const,
        prioridade: 'Alta' as const,
        data_final: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        responsavel_id: '1',
        responsavel_nome: 'João Silva',
        processo_cnj: '00001234520248260100',
        cliente_nome: 'João da Silva Santos',
        lista_tarefas: 'Audiências',
        created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'task-5',
        titulo: 'Análise de contrato',
        descricao: 'Analisar minuta de contrato enviada pelo cliente',
        status: 'a_fazer' as const,
        prioridade: 'Baixa' as const,
        data_final: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        responsavel_id: '1',
        responsavel_nome: 'João Silva',
        processo_cnj: null,
        cliente_nome: 'Tech Solutions LTDA',
        lista_tarefas: 'Consultoria',
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'task-6',
        titulo: 'Pesquisa jurisprudencial',
        descricao: 'Pesquisar jurisprudência sobre tema X',
        status: 'em_progresso' as const,
        prioridade: 'Média' as const,
        data_final: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        responsavel_id: '1',
        responsavel_nome: 'João Silva',
        processo_cnj: '00005678920248260200',
        cliente_nome: 'Maria Oliveira Costa',
        lista_tarefas: 'Pesquisa',
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
]

export const tarefasStats = {
    total: mockTarefas.length,
    a_fazer: mockTarefas.filter(t => t.status === 'a_fazer').length,
    em_progresso: mockTarefas.filter(t => t.status === 'em_progresso').length,
    atrasados: mockTarefas.filter(t => t.status === 'atrasado').length,
    concluidos: mockTarefas.filter(t => t.status === 'concluido').length,
    descartados: mockTarefas.filter(t => t.status === 'descartado').length,
}

export type TarefaStatus = 'a_fazer' | 'em_progresso' | 'atrasado' | 'concluido' | 'descartado'
export type TarefaPrioridade = 'Baixa' | 'Média' | 'Alta' | 'Urgente'

export interface Tarefa {
    id: string
    titulo: string
    descricao: string
    status: TarefaStatus
    prioridade: TarefaPrioridade
    data_final: string
    responsavel_id: string
    responsavel_nome: string
    processo_cnj: string | null
    cliente_nome: string
    lista_tarefas: string
    created_at: string
}
