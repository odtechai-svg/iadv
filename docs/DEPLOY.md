# Deploy do iADV

Guias de deploy para diferentes plataformas.

## Opção 1: Vercel (Recomendado)

### Vantagens
- Deploy automático do GitHub
- Edge Functions globais
- SSL gratuito
- Domínio customizado fácil

### Passo a Passo

1. **Push para GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/seu-usuario/iadv.git
   git push -u origin main
   ```

2. **Importar no Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - New Project > Import Git Repository
   - Selecione seu repo
   - Framework Preset: Next.js (detectado automaticamente)

3. **Configurar Environment Variables**
   
   Adicione todas as vars do `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
   SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
   NEXT_PUBLIC_APP_URL=https://seu-app.vercel.app
   ```

4. **Deploy!**
   - Clique em "Deploy"
   - Aguarde build (~2-3 minutos)
   - Acesse URL: `https://seu-app.vercel.app`

### Deploy Contínuo

Toda vez que você fizer push para `main`:
- Vercel faz build automaticamente
- Deploy em produção
- Preview deploys para PRs

### Domínio Customizado

1. Em **Settings > Domains**
2. Adicione seu domínio: `app.seuescritorio.com`
3. Configure DNS (A record ou CNAME)
4. SSL automático

---

## Opção 2: Railway

### Vantagens
- Deploy de GitHub
- Suporte a databases (caso queira Postgres próprio)
- Logs em tempo real

### Passo a Passo

1. **Push para GitHub** (mesmo processo acima)

2. **Criar Projeto no Railway**
   - Acesse [railway.app](https://railway.app)
   - New Project > Deploy from GitHub repo
   - Selecione seu repo

3. **Configurar Variáveis**
   
   Em **Variables**, adicione:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   NEXT_PUBLIC_APP_URL
   ```

4. **Deploy**
   - Railway detecta Next.js automaticamente
   - Build e deploy (~3-5 minutos)
   - URL: `https://xxx.up.railway.app`

---

## Opção 3: Servidor Próprio (VPS)

### Requisitos
- VPS com Ubuntu 22.04+ (DigitalOcean, AWS, Linode, etc)
- Node.js 18+
- Nginx
- PM2 (process manager)

### Passo a Passo

#### 1. Preparar Servidor

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar PM2
sudo npm install -g pm2

# Instalar Nginx
sudo apt install nginx -y
```

#### 2. Clonar Projeto

```bash
cd /var/www
sudo git clone https://github.com/seu-usuario/iadv.git
cd iadv
```

#### 3. Configurar Environment

```bash
sudo nano .env.local
```

Cole as variáveis:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
NEXT_PUBLIC_APP_URL=https://seu-dominio.com
```

#### 4. Build

```bash
npm install
npm run build
```

#### 5. Rodar com PM2

```bash
pm2 start npm --name "iadv" -- start
pm2 save
pm2 startup
```

#### 6. Configurar Nginx

```bash
sudo nano /etc/nginx/sites-available/iadv
```

Cole:
```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Ativar:
```bash
sudo ln -s /etc/nginx/sites-available/iadv /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 7. SSL com Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d seu-dominio.com
```

### Manutenção

```bash
# Ver logs
pm2 logs iadv

# Restart
pm2 restart iadv

# Atualizar app
cd /var/www/iadv
git pull
npm install
npm run build
pm2 restart iadv
```

---

## Opção 4: Docker

### Dockerfile

Crie `Dockerfile`:

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
      - NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
    restart: unless-stopped
```

### Build e Run

```bash
docker-compose up -d
```

---

## Checklist Pós-Deploy

- [ ] Todas as env vars configuradas
- [ ] Signup funciona
- [ ] Login funciona
- [ ] Migrations executadas no Supabase
- [ ] RLS policies ativas
- [ ] SSL configurado
- [ ] Domínio apontando
- [ ] Backup configurado (Supabase faz automaticamente)
- [ ] Monitoramento configurado (opcional)

## Troubleshooting

### Build falha
- Verifique Node.js version (18+)
- Rode `npm run type-check` localmente
- Veja logs de build

### Erro 500 em produção
- Verifique env vars
- Veja logs do servidor
- Confirme Supabase acessível

### Auth não funciona
- Confirme NEXT_PUBLIC_APP_URL correto
- Adicione URL em Supabase > Authentication > URL Configuration
- Verifique redirect URLs

---

**Escolha a plataforma que melhor se adequa ao seu caso!**

- **Vercel**: Mais fácil, ideal para começar
- **Railway**: Bom custo-benefício
- **VPS**: Controle total, mais barato long-term
- **Docker**: Portabilidade e replicação
