# 🚀 Render Deploy - Quick Start

**Tempo estimado:** 10-15 minutos  
**Nível de dificuldade:** Fácil

---

## 1️⃣ Pré-Requisitos

- [x] Conta GitHub (repositório com o código)
- [x] Conta Render (https://render.com - free tier ok)
- [x] Código atualizado em main branch

---

## 2️⃣ Preparar Repositório

### Adicionar Código Novo
```bash
cd seu-repositorio/

# Substituir pasta frontend
rm -rf frontend
cp -r frontend-refactored frontend

# Adicionar ao git
git add .
git commit -m "refactor: remove Emergent, modernize build"
git push origin main
```

### Verificar Arquivo render.yaml
```bash
# Deve estar no root do repositório
ls render.yaml  # ✅ Deve existir
cat render.yaml # ✅ Verifique o conteúdo
```

---

## 3️⃣ Conectar ao Render

### Opção A: Usando render.yaml (Recomendado)
1. Ir para: https://dashboard.render.com
2. Clicar: **"New" → "Web Service"**
3. Selecionar repositório GitHub
4. Render vai detectar `render.yaml` automaticamente
5. Clicar: **"Deploy"**

✅ Render usa configurações de `render.yaml` automaticamente

### Opção B: Configuração Manual
1. Dashboard Render → **"New" → "Web Service"**
2. Conectar repositório
3. Preencher:
   - **Name:** `frontend`
   - **Environment:** `Node`
   - **Region:** `Oregon` (padrão)
   - **Branch:** `main`
   - **Build Command:** 
     ```
     npm install && npm run build
     ```
   - **Start Command:** 
     ```
     npm install -g serve && serve -s build -l 3000
     ```

---

## 4️⃣ Configurar Environment Variables

### No Dashboard Render

1. Ir para: Web Service → **Settings**
2. Scroll para: **Environment**
3. Adicionar variáveis:

```
REACT_APP_API_URL = https://api.seu-dominio.com
REACT_APP_ENVIRONMENT = production
```

### Ou Usar .env no Código

Se preferir usar `.env` local, certifique-se que:
```bash
# .gitignore contém:
.env
.env.local
.env.production.local

# Assim variáveis sensíveis não são commitadas
```

---

## 5️⃣ Deploy

### Iniciar Deploy Manual
1. Dashboard Render → seu Web Service
2. Clicar: **"Deploy"** ou **"Redeploy"**
3. Aguardar até aparecer: "Live on https://your-app.onrender.com"

### Tempo de Deploy
- Primeira vez: 5-10 minutos
- Atualizações: 2-5 minutos

### Monitorar Progress
```
✅ Cloning repository...
✅ Installing dependencies...
✅ Building application...
✅ Deployed! 🎉
```

---

## 6️⃣ Verificar Deploy

### Checklist Pós-Deploy
- [ ] App acessível em `https://seu-app.onrender.com`
- [ ] Nenhum erro 500
- [ ] CSS/Tailwind carregando
- [ ] Componentes renderizando
- [ ] Sem erros no Console (F12)
- [ ] APIs conectando (se houver)

### Verificar Logs
1. Dashboard → seu Web Service
2. **Logs** tab
3. Procurar por erros vermelhos

### Se Tiver Erro

**Erro de Build:**
```
Render Logs → Build Failed
→ Verificar npm install ou npm run build
→ Comparar com INSTALLATION_GUIDE.md
```

**Erro em Runtime:**
```
Render Logs → Runtime Error
→ F12 no navegador (console)
→ Verificar variáveis de ambiente
```

---

## 7️⃣ Configurar Auto-Deploy (GitHub)

### Automatic Deploy on Push
1. Dashboard Render → Web Service
2. **Settings** → **Auto-Deploy**
3. Selecionar: **Yes**
4. Branch: **main**

Pronto! Agora, cada `git push` fará deploy automático.

---

## 8️⃣ Domínio Customizado (Opcional)

### Configurar Domínio Personalizado
1. Dashboard → Web Service → **Settings**
2. **Custom Domains**
3. Adicionar seu domínio
4. Seguir instruções de DNS

**Exemplo:**
```
Render URL: https://your-app-xyz.onrender.com
Seu Domínio: https://seu-app.com.br
```

---

## 🔄 Atualizar Código

### Após Fazer Mudanças

```bash
# No terminal local
git add .
git commit -m "update: feature xyz"
git push origin main

# No Render
# Se Auto-Deploy está ativo: automático em 1-2 min
# Senão: Dashboard → "Redeploy"
```

---

## 🐛 Troubleshooting

### Problema: Build Falha
```bash
# Verificar localmente
npm install
npm run build

# Se funcionar local, issue pode ser:
# - Variáveis de ambiente (faltam no Render)
# - Node version incompatível
# - Memory limite

# Aumentar Memory no Render:
# Settings → Max Time Limit: aumentar
```

### Problema: App Lento
```bash
# Pode ser:
# - Free tier tem limitações
# - Grande node_modules
# - API lenta

# Soluções:
# - Upgrade para Starter ($7/mês)
# - Otimizar bundle (webpack analyzer)
# - Cache de API
```

### Problema: Port 3000 Não Acessível
```bash
# Render serve na porta 10000 internamente
# Mas mapeia para 3000

# Se erro, verificar:
# Start Command deve estar correto
# Logs do Render → procurar "listening on port"
```

### Problema: Variáveis Não Carregam
```bash
# 1. Variáveis devem começar com REACT_APP_
# 2. Reiniciar server após adicionar
# 3. Rebuild app (Redeploy)
# 4. Verificar: window.__ENV || process.env
```

---

## 📊 Monitoramento

### Health Check
Render automaticamente monitora:
- ✅ HTTP status (200 = ok)
- ✅ Uptime
- ✅ Restart automático se cair

### Logs Recomendados
```
Dashboard → Logs
Manter aberto durante primeiros testes
Procurar por erros em vermelho
```

### Alertas
1. Dashboard → Web Service
2. **Notifications**
3. Configurar alertas por email

---

## 💡 Pro Tips

### Dica 1: Use GitHub Actions
```yaml
# .github/workflows/deploy.yml
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: curl -X POST ${{ secrets.RENDER_DEPLOY_WEBHOOK }}
```

### Dica 2: Monitorar Performance
```bash
# Instalat Vercel Analytics
npm install web-vitals

# Ou Google Analytics
# Adicionar ao index.html
```

### Dica 3: Certificado SSL
- Render automaticamente fornece HTTPS
- Certificado Let's Encrypt gratuito
- Sem configuração necessária

---

## ✅ Checklist Final

- [ ] Repositório GitHub atualizado
- [ ] `render.yaml` no root
- [ ] `package.json` com dependências corretas
- [ ] `.env.example` criado
- [ ] Render Web Service criado
- [ ] Environment variables configuradas
- [ ] Deploy realizado com sucesso
- [ ] App acessível online
- [ ] Sem erros no console
- [ ] Auto-Deploy ativado

---

## 📞 Render Support

- **Docs:** https://render.com/docs
- **Dashboard:** https://dashboard.render.com
- **Status:** https://status.render.com
- **Help:** https://render.com/support

---

## 🎉 Parabéns!

Seu app agora está:
✅ **Live** em https://seu-app.onrender.com  
✅ **Auto-deploy** a cada push  
✅ **SSL/HTTPS** automático  
✅ **Monitorado** e com logs  

Aproveite! 🚀

---

**Última atualização:** Julho 22, 2026  
**Render Plan:** Free tier funciona perfeitamente  
**Custo:** R$0 (ou $7+/mês se quiser mais performance)
