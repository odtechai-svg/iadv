
export interface Publicacao {
    id: string
    org_id: string
    data_publicacao: string
    status: 'nao_tratado' | 'tratado'
    cliente: {
        id: string
        nome: string
    }
    processo: {
        cnj: string
        tribunal: string
        comarca: string
        orgao: string
        valor_causa: number
        tipo_acao: string
        natureza: string
        autores: string[]
        reus: string[]
        advogados_envolvidos: string[]
        uf: string
        data_cadastro: string
        instancia: string
        juiz: string
        vara: string
        celula: string
        data_distribuicao: string
        motivo: string
    }
    conteudo: {
        texto: string
        diario: string
        data_disponibilizacao: string
        tipo_comunicacao: string
        meio: string
        link_inteiro_teor: string
    }
    prazos: Array<{
        id: string
        data: string
        descricao: string
        responsavel: string
        status: 'agendado' | 'atrasado' | 'concluido'
        obs_agendamento: string
        providencia: string
    }>
    data_atualizacao: string
}

export const mockPublicacoes: Publicacao[] = [
    {
        id: '1002496-14.2020.8.26.0477',
        org_id: 'org-1',
        data_publicacao: '2025-12-01T00:00:00Z',
        status: 'nao_tratado',
        cliente: {
            id: 'c1',
            nome: 'RAQUEL RICARDO PAZ'
        },
        processo: {
            cnj: '1002496-14.2020.8.26.0477',
            tribunal: 'TRIBUNAL DE JUSTIÇA DE SÃO PAULO - TJSP',
            comarca: 'FORO DE PRAIA GRANDE',
            orgao: 'JUSTICA DOS ESTADOS E DO DISTRITO FEDERAL E TERRITORIOS',
            valor_causa: 1000.00,
            tipo_acao: 'INVENTÁRIO',
            natureza: 'CÍVEL',
            autores: ['Kamila Correa da Silva', 'Breno da Paz Pereira da Silva'],
            reus: ['José Rubens Pereira da Silva'],
            advogados_envolvidos: ['TALITA JOYCE ALAMBERT'],
            uf: 'SP',
            data_cadastro: '2023-02-01T00:00:00Z',
            instancia: '1ª (PRIMEIRA)',
            juiz: 'THOMAZ CORREA FARQUI',
            vara: 'SEM INFORMAÇÃO',
            celula: 'SEM INFORMAÇÃO',
            data_distribuicao: '2020-02-28T00:00:00Z',
            motivo: 'INVENTÁRIO E PARTILHA'
        },
        conteudo: {
            texto: 'Foro de Praia Grande - 2 Vara de Familia e Sucessoes I - Publicacao Processo: 1002496-14.2020.8.26.0477 Orgao: Foro de Praia Grande - 2 Vara de Familia e Sucessoes Data de disponibilizacao: 28/11/2025 Tipo de comunicacao: Intimacao Meio: Diario de Justica Eletronico Nacional inteiro teor: https://www.dje.tjsp.jus.br Parte: BRENO DA PAZ PEREIRA DA SILVA Parte: KAMILA CORREA DA SILVA Advogado: TALITA JOYCE ALAMBERT - OAB SP-490274 Advogado: MARIA FERNANDA CESAR LAS CASAS DE OLIVEIRA - OAB SP-209768 Conteudo: Processo 1002496-14.2020.8.26.0477 - Inventario - Inventario e Partilha - Kamila Correa da Silva - Breno da Paz Pereira da Silva - VISTOS. Primeiramente, de-se vista dos autos ao Ministerio Publico para manifestacao. Oportunamente, tornem conclusos. Intime-se. - ADV: TALITA JOYCE ALAMBERT (OAB 490274/SP), MARIA FERNANDA CESAR LAS CASAS DE OLIVEIRA (OAB 209768/SP) [comunicacao_id: 473626116]',
            diario: 'D.O. SÃO PAULO - TRIBUNAL DE JUSTIÇA (DJEN)',
            data_disponibilizacao: '2025-11-28',
            tipo_comunicacao: 'Intimação',
            meio: 'Diário de Justiça Eletrônico',
            link_inteiro_teor: 'https://www.dje.tjsp.jus.br'
        },
        prazos: [
            {
                id: 'pz-1',
                data: '2025-12-09T00:00:00Z',
                descricao: 'DESPACHO - JUSTICA COMUM',
                responsavel: 'SEM INFORMAÇÃO',
                status: 'atrasado',
                obs_agendamento: 'SEM INFORMAÇÃO',
                providencia: 'MANIFESTAR SOBRE DESPACHO'
            }
        ],
        data_atualizacao: '2025-12-16T00:00:00Z'
    },
    {
        id: '0002285-24.2025.8.26.0152',
        org_id: 'org-1',
        data_publicacao: '2025-12-01T00:00:00Z',
        status: 'nao_tratado',
        cliente: {
            id: 'c2',
            nome: 'FERNANDA LAS CASAS'
        },
        processo: {
            cnj: '0002285-24.2025.8.26.0152',
            tribunal: 'TJ SP - TRIBUNAL DE JUSTIÇA DE SÃO PAULO',
            comarca: 'SEM INFORMAÇÃO',
            orgao: 'JUSTICA DOS ESTADOS E DO DISTRITO FEDERAL E TERRITORIOS',
            valor_causa: 0.00,
            tipo_acao: 'SEM INFORMAÇÃO',
            natureza: 'SEM INFORMAÇÃO',
            autores: ['SEM INFORMAÇÃO'],
            reus: ['SEM INFORMAÇÃO'],
            advogados_envolvidos: ['SEM INFORMAÇÃO'],
            uf: 'SP',
            data_cadastro: '2025-05-09T00:00:00Z',
            instancia: '1ª (PRIMEIRA)',
            juiz: 'SEM INFORMAÇÃO',
            vara: 'SEM INFORMAÇÃO',
            celula: 'SEM INFORMAÇÃO',
            data_distribuicao: 'SEM INFORMAÇÃO',
            motivo: 'SEM INFORMAÇÃO'
        },
        conteudo: {
            texto: 'Foro de Cotia - Vara da Familia e das Sucessoes I - Publicacao Processo: 0002285-24.2025.8.26.0152 Orgao: Foro de Cotia - Vara da Familia e das Sucessoes Data de disponibilizacao: 28/11/2025 Tipo de comunicacao: Intimacao Meio: Diario de Justica Eletronico Nacional inteiro teor: https://www.dje.tjsp.jus.br Parte: M.F.C.L.C.O. Parte: T.J.M. Parte: R.C.S.P.A. Advogado: MARIA FERNANDA CESAR LAS CASAS DE OLIVEIRA - OAB SP-209768 Advogado: FILIPE DO NASCIMENTO - OAB SP-358017 Conteudo: Processo 0002285-24.2025.8.26.0152 (apensado ao processo 1011730-54.2022.8.26.0152) (processo principal 1011730-54.2022.8.26.0152) - Cumprimento de sentenca - Dissolucao - T.J.M. - - M.F.C.L.C.O. - R.C.S.P.A. - Vistos. Diante do bloqueio integral junto a Caixa Economica Federal, converto o bloqueio em penhora, providencie a serventia transferencia do valor para conta vinculada a estes autos. Tomada-se definitiva a presente decisao, expeca-se mandado de levantamento eletronico da quantia disponivel nos autos, em favor do autor, devendo o exequente juntar aos autos formulario de MLE preenchido, nos termos dos Comunicados Conjuntos n 474/2017 e 2047/2018, no prazo de quinze dias. Providencie a serventia, com urgencia, desbloqueio dos demais valores em favor da executada. Sem prejuizo, manifeste-se a exequente se da por satisfeita a obrigacao, no mesmo prazo. O silencio importara em concordancia com a extincao do feito pelo pagamento do debito, com fundamento no art. 924, II do Codigo de Processo Civil. Intime-se. - ADV: FILIPE DO NASCIMENTO (OAB 358017/SP), MARIA FERNANDA CESAR LAS CASAS DE OLIVEIRA (OAB 209768/SP), MARIA FERNANDA CESAR LAS CASAS DE OLIVEIRA (OAB 209768/SP) [comunicacao_id: 473237643]',
            diario: 'D.O. SÃO PAULO - TRIBUNAL DE JUSTIÇA (DJEN)',
            data_disponibilizacao: '2025-11-28',
            tipo_comunicacao: 'Intimação',
            meio: 'Diário de Justiça Eletrônico',
            link_inteiro_teor: 'https://www.dje.tjsp.jus.br'
        },
        prazos: [
            {
                id: 'pz-2',
                data: '2026-01-22T00:00:00Z',
                descricao: 'DESPACHO - JUSTICA COMUM',
                responsavel: 'SEM INFORMAÇÃO',
                status: 'agendado',
                obs_agendamento: 'SEM INFORMAÇÃO',
                providencia: 'DESPACHO AO CARTORIO'
            },
            {
                id: 'pz-3',
                data: '2026-01-22T00:00:00Z',
                descricao: 'DESPACHO - JUSTICA COMUM',
                responsavel: 'SEM INFORMAÇÃO',
                status: 'agendado',
                obs_agendamento: 'SEM INFORMAÇÃO',
                providencia: 'CIENCIA PENHORA'
            }
        ],
        data_atualizacao: '2025-12-04T00:00:00Z'
    }

]

export const mockPublicacoesStats = {
    total: 2,
    nao_lidas: 2,
    hoje: 0,
    esta_semana: 0,
}
