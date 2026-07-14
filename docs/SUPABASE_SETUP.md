# Setup do Supabase

Guia detalhado para configurar o Supabase para este projeto.

## 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma conta (gratuita)
3. Clique em "New Project"
4. Preencha:
   - **Name**: iADV
   - **Database Password**: (copie e guarde)
   - **Region**: South America (São Paulo)
   - **Pricing Plan**: Free (ou Pro se preferir)

## 2. Copiar Credenciais

Após criar, vá em **Settings > API**:

- **Project URL**: `https://xxx.supabase.co`
- **Project API keys**:
  - `anon public`: para uso client-side
  - `service_role`: para uso server-side (NUNCA exponha!)

Copie essas credenciais para seu `.env.local`

## 3. Executar Migrations

Vá em **SQL Editor** no Supabase Dashboard e execute em ordem:

### 3.1 Initial Schema

Cole e execute `supabase/migrations/001_initial_schema.sql`

Isso cria:
- 9 tabelas principais
- Enums de tipos
- Índices otimizados
- Triggers de updated_at

### 3.2 RLS Policies

Cole e execute `supabase/migrations/002_rls_policies.sql`

Isso configura:
- Row Level Security em todas as tabelas
- Policies baseadas em org_id
- Isolamento multi-tenant

### 3.3 Functions e Triggers

Cole e execute `supabase/migrations/003_functions.sql`

Isso cria:
- Trigger de criação automática de profile
- Functions para stats (inbox, deadlines)
- Helper functions (check_plan_feature, etc)

### 3.4 Seed Data (Opcional)

Se quiser dados de demonstração, execute `supabase/seed.sql`

Isso insere:
- 1 organização PRO
- 3 clientes
- 3 processos
- Alguns inbox items
- Prazos de exemplo
- Mensagens

**Nota**: Você precisará criar um usuário manualmente via signup antes.

## 4. Configurar Storage (Para Documentos)

1. Vá em **Storage** no Supabase
2. Clique em "Create Bucket"
3. Nome: `documents`
4. Public: **Não** (privado)
5. Allowed MIME types: `application/pdf`, `image/*`, `application/msword`, etc

### 4.1 Configurar Policies do Storage

No SQL Editor:

```sql
-- Policy para SELECT (download)
CREATE POLICY "Users can view documents from their org"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'documents' AND
  (storage.foldername(name))[1] = (
    SELECT org_id::text FROM profiles WHERE id = auth.uid()
  )
);

-- Policy para INSERT (upload)
CREATE POLICY "Users can upload documents to their org"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'documents' AND
  (storage.foldername(name))[1] = (
    SELECT org_id::text FROM profiles WHERE id = auth.uid()
  )
);

-- Policy para DELETE
CREATE POLICY "Users can delete documents from their org"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'documents' AND
  (storage.foldername(name))[1] = (
    SELECT org_id::text FROM profiles WHERE id = auth.uid()
  )
);
```

## 5. Configurar Auth

Por padrão, o Supabase Auth já está configurado. Mas você pode customizar:

### 5.1 Email Templates (Opcional)

Em **Authentication > Email Templates**, customize:
- Confirm signup
- Magic Link
- Change Email Address
- Reset Password

### 5.2 Auth Providers (Opcional)

Em **Authentication > Providers**, habilite:
- Google
- GitHub
- etc.

## 6. Verificar Setup

Execute no SQL Editor para testar:

```sql
-- Ver tabelas criadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Ver RLS habilitado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Ver functions criadas
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public';
```

## 7. Criar Primeiro Usuário

1. Rode o projeto: `npm run dev`
2. Acesse `http://localhost:3000/signup`
3. Crie sua conta (isso criará automaticamente a org e profile)

## 8. Troubleshooting

### "relation does not exist"
- Execute as migrations na ordem correta
- Verifique no SQL Editor se as tabelas existem

### "new row violates row-level security policy"
- Verifique se o profile foi criado via trigger
- Confirme que o profile tem org_id
- Teste policies manualmente

### "permission denied for table"
- RLS pode estar bloqueando
- Teste com service_role key (temporário)
- Verifique policies

## 9. Monitoramento

Em **Database > Roles**: verifique que:
- `anon` tem permissões de SELECT/INSERT/UPDATE via RLS
- `authenticated` tem acesso às tabelas

Em **Database > Logs**: monitore queries e erros

## Pronto!

Seu Supabase está configurado. Volte para o README principal para rodar o projeto.
