# Preview Local - iADV

Versão simplificada para preview local **SEM** dependências do Supabase.

## 🚀 Como Rodar

```bash
cd /Volumes/Dados/APP-vendas-projetos
npm install
npm run dev
```

Acesse: **http://localhost:3000**

## 📊 Dados Mock Incluídos

O sistema está usando dados fictícios locais em `lib/mock-data.ts`:

- ✅ 3 Clientes (2 PF, 1 PJ)
- ✅ 3 Processos com CNJ
- ✅ 4 Itens no Inbox (Intimações, Publicações, Andamentos)
- ✅ 5 Prazos (incluindo 1 atrasado e 1 para hoje)
- ✅ Estatísticas calculadas automaticamente

## 🎨 O Que Funciona

### Navegação Completa
- ✅ Sidebar com todas as páginas
- ✅ Header com busca
- ✅ Usuário mock (João Silvajoao@email.com)

### Páginas Funcionais
- ✅ **Inbox** - Lista de itens com filtros e quick actions
- ✅ **Prazos** - Widgets "5 minutos por dia" + tabela completa
- ✅ **Processos** - Lista com CNJ formatado
- ✅ **Clientes** - Lista PF/PJ com documentos formatados
- ✅ **Documentos** - Página base
- ✅ **Configurações** - Abas com formulários
- ✅ **Ajuda** - Documentação

### Componentes UI
- ✅ Badges coloridos (tipos, status, prioridades)
- ✅ Tabelas profissionais
- ✅ Cards de stats
- ✅ Filtros em tempo real
- ✅ Design responsivo

## 🔄 O Que Foi Removido

Para este preview local:

- ❌ Supabase Auth (login/signup desativados)
- ❌ Supabase Database (usando dados locais)
- ❌ Supabase Storage
- ❌ API Routes do WhatsApp
- ❌ Row Level Security
- ❌ Persistência de dados

## 📝 Estrutura dos Dados Mock

```typescript
// lib/mock-data.ts
export const mockUser = { name, email, avatar }
export const mockOrganization = { plan: 'PRO', ... }
export const mockClients = [...]
export const mockMatters = [...]
export const mockInboxItems = [...]
export const mockDeadlines = [...]
export const mockStats = { inbox: {...}, deadlines: {...} }
```

## 🎯 Objetivo do Preview

Este preview permite:

1. ✅ **Ver o sistema funcionando** sem configurar Supabase
2. ✅ **Testar a navegação** entre páginas
3. ✅ **Avaliar o design** e UX
4. ✅ **Decidir o que manter** ou retirar
5. ✅ **Identificar melhorias** necessárias

## 💡 Próximos Passos

Depois de avaliar o preview, você pode:

1. 🔧 **Simplificar ainda mais** - remover features desnecessárias
2. 🎨 **Ajustar design** - cores, layouts, componentes
3. 📦 **Adicionar features** - novas funcionalidades
4. 🗄️ **Conectar Supabase** - quando quiser persistência real
5. 🚀 **Deploy** - subir para produção

## 📱 Páginas Disponíveis

- http://localhost:3000/ (redireciona para /inbox)
- http://localhost:3000/inbox
- http://localhost:3000/prazos
- http://localhost:3000/processos
- http://localhost:3000/clientes
- http://localhost:3000/documentos
- http://localhost:3000/configuracoes
- http://localhost:3000/ajuda

## ⚠️ Limitações do Preview

- Mudanças não são salvas (refresh perde dados)
- Botões de ação não fazem nada (só visual)
- Busca não funciona (só mock)
- Sem autenticação multi-usuário
- Sem backend real

---

**Aproveite o preview e decida as próximas direções do projeto!** 🎉
