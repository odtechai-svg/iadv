-- Seed data para demonstração do sistema

-- Inserir organização PRO de exemplo
INSERT INTO organizations (id, name, plan, settings, created_at)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'Silva & Advogados Associados', 'PRO', '{"whatsapp_webhook_url": ""}', NOW())
ON CONFLICT DO NOTHING;

-- Inserir um usuário de teste (Nota: o auth.users precisa ser criado via Supabase Auth UI)
-- Este é apenas o profile, assumindo que o user foi criado
-- ID fixo para exemplo: '660e8400-e29b-41d4-a716-446655440000'

-- Inserir clientes
INSERT INTO clients (org_id, type, name, email, phone, cpf_cnpj, preferences, created_at)
VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'PF', 'João da Silva Santos', 'joao.silva@email.com', '11987654321', '12345678901', '{"email_notifications": true, "whatsapp_notifications": true}', NOW()),
  ('550e8400-e29b-41d4-a716-446655440000', 'PF', 'Maria Oliveira Costa', 'maria.oliveira@email.com', '11987654322', '98765432109', '{"email_notifications": true, "whatsapp_notifications": false}', NOW()),
  ('550e8400-e29b-41d4-a716-446655440000', 'PJ', 'Tech Solutions LTDA', 'contato@techsolutions.com', '1133334444', '12345678000199', '{"email_notifications": true, "whatsapp_notifications": true}', NOW())
ON CONFLICT DO NOTHING;

-- Inserir processos
INSERT INTO matters (org_id, cnj, tribunal, uf, parties_text, client_id, status, created_at)
VALUES
  ('550e8400-e29b-41d4-a716-446655440000', '00001234520248260100', 'TJSP', 'SP', 'João da Silva Santos x Empresa XYZ', (SELECT id FROM clients WHERE name = 'João da Silva Santos' LIMIT 1), 'Ativo', NOW() - INTERVAL '30 days'),
  ('550e8400-e29b-41d4-a716-446655440000', '00005678920248260200', 'TJSP', 'SP', 'Maria Oliveira Costa x Condomínio ABC', (SELECT id FROM clients WHERE name = 'Maria Oliveira Costa' LIMIT 1), 'Ativo', NOW() - INTERVAL '45 days'),
  ('550e8400-e29b-41d4-a716-446655440000', '00009876520248260300', 'TJSP', 'SP', 'Tech Solutions LTDA x Fornecedor DEF', (SELECT id FROM clients WHERE name = 'Tech Solutions LTDA' LIMIT 1), 'Ativo', NOW() - INTERVAL '15 days')
ON CONFLICT DO NOTHING;

-- Inserir itens do inbox
INSERT INTO inbox_items (org_id, type, status, received_at, title, body_text, matter_id, created_at)
VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'Intimacao', 'Novo', NOW() - INTERVAL '2 hours', 'Intimação para apresentar contestação', 'Fica(m) Vossa(s) Senhoria(s) intimado(a)(s) a apresentar contestação no prazo legal. Processo: 0000123-45.2024.8.26.0100', (SELECT id FROM matters WHERE cnj = '00001234520248260100' LIMIT 1), NOW() - INTERVAL '2 hours'),
  ('550e8400-e29b-41d4-a716-446655440000', 'Publicacao', 'Em triagem', NOW() - INTERVAL '1 day', 'Publicação de sentença', 'Sentença proferida nos autos. Processo: 0000567-89.2024.8.26.0200', (SELECT id FROM matters WHERE cnj = '00005678920248260200' LIMIT 1), NOW() - INTERVAL '1 day'),
  ('550e8400-e29b-41d4-a716-446655440000', 'Andamento', 'Virou prazo', NOW() - INTERVAL '3 days', 'Juntada de documentos', 'Documentos juntados aos autos. Processo: 0000987-65.2024.8.26.0300', (SELECT id FROM matters WHERE cnj = '00009876520248260300' LIMIT 1), NOW() - INTERVAL '3 days'),
  ('550e8400-e29b-41d4-a716-446655440000', 'Intimacao', 'Novo', NOW() - INTERVAL '5 hours', 'Intimação para especificar provas', 'Intimado(a) a especificar provas no prazo de 10 dias. Processo: 0000123-45.2024.8.26.0100', (SELECT id FROM matters WHERE cnj = '00001234520248260100' LIMIT 1), NOW() - INTERVAL '5 hours')
ON CONFLICT DO NOTHING;

-- Inserir prazos
INSERT INTO deadlines (org_id, matter_id, client_id, title, due_at, priority, status, notes, created_at)
VALUES
  ('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM matters WHERE cnj = '00001234520248260100' LIMIT 1), (SELECT id FROM clients WHERE name = 'João da Silva Santos' LIMIT 1), 'Apresentar contestação', NOW() + INTERVAL '10 days', 'Alta', 'Aberto', 'Prazo de 15 dias para contestação', NOW()),
  ('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM matters WHERE cnj = '00005678920248260200' LIMIT 1), (SELECT id FROM clients WHERE name = 'Maria Oliveira Costa' LIMIT 1), 'Recurso de apelação', NOW() + INTERVAL '5 days', 'Urgente', 'Aberto', 'Prazo final: verificar intimação', NOW()),
  ('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM matters WHERE cnj = '00009876520248260300' LIMIT 1), (SELECT id FROM clients WHERE name = 'Tech Solutions LTDA' LIMIT 1), 'Especificar provas', NOW() + INTERVAL '8 days', 'Media', 'Aberto', 'Aguardar decisão sobre provas periciais', NOW()),
  ('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM matters WHERE cnj = '00001234520248260100' LIMIT 1), (SELECT id FROM clients WHERE name = 'João da Silva Santos' LIMIT 1), 'Audiência de conciliação', NOW() - INTERVAL '2 days', 'Alta', 'Atrasado', 'Audiência reagendada - verificar nova data', NOW() - INTERVAL '15 days')
ON CONFLICT DO NOTHING;

-- Inserir mensagens
INSERT INTO message_logs (org_id, client_id, channel, direction, body, status, created_at)
VALUES
  ('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM clients WHERE name = 'João da Silva Santos' LIMIT 1), 'whatsapp', 'outbound', 'Olá João, temos uma nova intimação no seu processo. Prazo para contestação: 10 dias.', 'pendente', NOW() - INTERVAL '2 hours'),
  ('550e8400-e29b-41d4-a716-446655440000', (SELECT id FROM clients WHERE name = 'Maria Oliveira Costa' LIMIT 1), 'email', 'outbound', 'Prezada Maria, sentença proferida nos autos. Em breve entraremos em contato.', 'enviada', NOW() - INTERVAL '1 day')
ON CONFLICT DO NOTHING;

-- Comentário final
COMMENT ON TABLE organizations IS 'Seed data inserted for demonstration purposes';
