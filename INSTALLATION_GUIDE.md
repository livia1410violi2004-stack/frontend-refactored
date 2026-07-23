# Guia de Instalação e Integração - Frontend Refatorado

## 📦 Arquivos Entregues

```
frontend-refactored/
├── src/                    # Código-fonte do projeto
│   ├── components/         # Componentes React
│   ├── constants/          # Constantes da aplicação
│   ├── context/            # React Context
│   ├── hooks/              # Custom Hooks
│   ├── lib/                # Bibliotecas úteis
│   ├── mocks/              # Dados de teste
│   ├── pages/              # Páginas principais
│   ├── services/           # Serviços (APIs, etc)
│   ├── utils/              # Utilidades
│   ├── App.js              # Componente principal
│   ├── App.css             # Estilos globais
│   ├── index.js            # Entrada da aplicação
│   └── index.css           # Estilos da entrada
│
├── public/
│   ├── index.html          # HTML principal
│   ├── favicon.ico
│   └── manifest.json
│
├── package.json            # ✨ NOVO - Dependências limpas
├── craco.config.js         # ✨ NOVO - Config simplificada
├── tailwind.config.js      # Tailwind CSS
├── postcss.config.js       # PostCSS
├── jsconfig.json           # Alias de imports
├── .gitignore              # ✨ NOVO - Git ignore limpo
├── .env.example            # ✨ NOVO - Variáveis de exemplo
├── render.yaml             # ✨ NOVO - Deploy Render
└── README_DEPLOY.md        # ✨ NOVO - Instruções deploy
```

---

## 🚀 Passo 1: Preparação Local

### 1.1 Backup do Projeto Antigo (Opcional)
```bash
# Se deseja manter a versão anterior
cp -r frontend frontend.backup
```

### 1.2 Remover Projeto Antigo
```bash
# Remover a pasta frontend antiga
rm -rf frontend
```

### 1.3 Extrair Novo Projeto
```bash
# Descompactar a pasta frontend-refactored
unzip frontend-refactored.zip -d .

# Ou, se recebeu como pasta
cp -r frontend-refactored frontend
cd frontend
```

---

## 📥 Passo 2: Instalação de Dependências

### 2.1 Instalar Node Modules
```bash
cd frontend

# Opção 1: Com npm
npm install

# Opção 2: Com yarn (se preferir)
yarn install
```

**⏱️ Tempo esperado:** 2-5 minutos  
**📊 Tamanho resultante:** ~500 MB node_modules

### 2.2 Verificar Instalação
```bash
# Listar pacotes instalados (npm)
npm list

# Ou com yarn
yarn list --depth=0
```

---

## ✅ Passo 3: Testar Localmente

### 3.1 Iniciar Servidor de Desenvolvimento
```bash
npm start
```

**Esperado:**
- Terminal mostra: `Local: http://localhost:3000`
- Navegador abre automaticamente em `http://localhost:3000`
- Nenhum erro de compilação

### 3.2 Verificar Build
```bash
# Parar o servidor (Ctrl+C)

# Fazer build
npm run build
```

**Esperado:**
- Cria pasta `/build`
- Sem erros de compilação
- Tamanho final ~150-200 KB (gzipped)

### 3.3 Listar Arquivo de Build (Opcional)
```bash
ls -lh build/
du -sh build/
```

---

## 🌍 Passo 4: Configurar Variáveis de Ambiente

### 4.1 Criar Arquivo .env Local
```bash
# Copiar do exemplo
cp .env.example .env
```

### 4.2 Editar `.env`
```env
# API Configuration (ajuste conforme sua backend)
REACT_APP_API_URL=http://localhost:3001

# Feature Flags
REACT_APP_ENABLE_ANALYTICS=false

# Environment
REACT_APP_ENVIRONMENT=development
```

### 4.3 Variáveis para Produção (Render)
```env
# Production variables (configure no dashboard Render)
REACT_APP_API_URL=https://api.seu-dominio.com
REACT_APP_ENVIRONMENT=production
```

---

## 🔧 Passo 5: Otimizações (Opcional)

### 5.1 Aumentar Heap Memory (Se necessário)
```bash
export NODE_OPTIONS="--max-old-space-size=2048"
npm run build
```

### 5.2 Analisar Bundle Size
```bash
# Instalar ferramenta
npm install -g webpack-bundle-analyzer

# Gerar relatório
npm run build -- --analyze
```

---

## 📱 Passo 6: Deploy no Render

### 6.1 Preparar Repositório Git
```bash
# Adicionar arquivos
git add .

# Commit
git commit -m "feat: refactor project to remove Emergent dependency"

# Push para repositório
git push origin main
```

### 6.2 Configurar no Render.com

1. **Ir para:** https://dashboard.render.com
2. **Clicar em:** "New" → "Web Service"
3. **Conectar repositório:**
   - Selecionar seu repositório GitHub
   - Autorizar se necessário
4. **Configurações:**
   - **Name:** `frontend` (ou outro nome)
   - **Environment:** `Node`
   - **Region:** `Oregon` (ou mais próxima)
   - **Branch:** `main`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start` (ou deixar em branco para usar render.yaml)

5. **Environment Variables:**
   - Clique em "Add Environment Variable"
   - Adicione conforme seu `.env.example`:
     ```
     REACT_APP_API_URL=https://api.seu-dominio.com
     REACT_APP_ENVIRONMENT=production
     ```

6. **Clique em:** "Deploy"

**⏱️ Tempo de deploy:** 3-10 minutos

### 6.3 Usar render.yaml (Automático)
Se usar `render.yaml`, o Render vai ler as configurações automaticamente:

```bash
# Certifique-se que render.yaml está no root do repositório
git add render.yaml
git commit -m "add: render deployment configuration"
git push origin main
```

---

## 🧪 Passo 7: Validação Pós-Deploy

### 7.1 Verificar Build
```bash
# No Render.com, ir para "Logs"
# Procurar por:
# ✅ "Cloning repository..."
# ✅ "Building..."
# ✅ "Build successful"
# ✅ "Live on https://your-app.onrender.com"
```

### 7.2 Testar Aplicação
1. Ir para `https://your-app.onrender.com` (URL do Render)
2. Verificar:
   - ✅ Página carrega sem erros
   - ✅ CSS está sendo aplicado
   - ✅ Componentes render corretamente
   - ✅ Navegação funciona
   - ✅ APIs conectam corretamente

### 7.3 Verificar Console (F12)
- ✅ Sem erros JavaScript
- ✅ Sem avisos críticos
- ✅ Requisições de API funcionando

---

## 🐛 Solução de Problemas

### Erro: "Cannot find module '@emergentbase/visual-edits'"
```
✅ ESPERADO - Significa que removeu o Emergent com sucesso
✅ Não há mais referências a @emergentbase
```

### Erro: "react is not defined"
```bash
# Adicione import React no arquivo:
import React from 'react';
# Ou atualize para React 18+ que permite JSX sem import
```

### Build falhando com "ENOMEM"
```bash
# Aumentar memória:
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### Porta 3000 já em uso
```bash
# Usar porta diferente:
PORT=3001 npm start

# Ou matar processo:
lsof -i :3000    # listar
kill -9 <PID>    # matar
```

### Variáveis de ambiente não funcionando
```bash
# Certificar que:
# 1. Variáveis começam com REACT_APP_
# 2. Reiniciar servidor após alterar .env
# 3. No Render, ir para Settings > Environment
```

---

## 📋 Checklist de Verificação Final

- [ ] `npm install` executado sem erros
- [ ] `npm start` funciona localmente
- [ ] `npm run build` gera `/build` sem erros
- [ ] Nenhuma referência a `emergent` no código
- [ ] `.env` configurado com variáveis corretas
- [ ] Repositório Git atualizado
- [ ] Deploy no Render concluído
- [ ] Aplicação acessível em `https://seu-dominio.onrender.com`
- [ ] Sem erros no console (F12)
- [ ] Todas as páginas carregando
- [ ] APIs conectando corretamente

---

## 📞 Suporte

Se encontrar problemas:

1. **Verificar Logs:**
   - Local: Terminal onde rodou `npm start`
   - Render: Dashboard → Logs

2. **Verificar Console do Navegador:**
   - F12 → Console
   - Procurar por red flags em vermelho

3. **Comparar com Backup:**
   - Se tinham `.env` especial, adicionar novamente

4. **Resetar node_modules:**
   ```bash
   rm -rf node_modules
   npm install
   npm start
   ```

---

## 🎉 Sucesso!

Se você chegou até aqui e tudo está funcionando:

✅ Projeto refatorado com sucesso  
✅ Emergent completamente removido  
✅ Dependências atualizadas  
✅ Deploy funcional  
✅ Pronto para produção  

**Próximas ações:**
- Monitorar logs de erros (Sentry, etc)
- Configurar CI/CD se necessário
- Adicionar testes automatizados
- Documentar processos do time

---

**Versão:** 1.0  
**Data:** Julho 2026  
**Status:** ✅ Pronto para Produção
