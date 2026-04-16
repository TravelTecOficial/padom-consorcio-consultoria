# 📋 Padom Consultoria - Setup para Landing Page

**Status:** ⏳ Aguardando arquivos do cliente

---

## 📁 O Que Você PRECISA ENVIAR

### 1️⃣ **Arquivo de Conteúdo**
- **Arquivo:** `copy.md` (preenchido usando `copy.PRODUTOR.md` como guia)
- **Deve conter:** TODOS os textos, títulos, descrições, etc
- **Onde encontrar o template:** Veja arquivo `copy.PRODUTOR.md` na raiz deste projeto

### 2️⃣ **Logo da Empresa**
- **Arquivo:** `logo-principal.png`
- **Formato:** PNG com fundo transparente
- **Tamanho:** Mínimo 200x100px
- **Pasta destino:** `public/assets/logos/logo-principal.png`

### 3️⃣ **Imagem do Banner (Hero)**
- **Arquivo:** `hero.jpg`
- **Tamanho:** 1200 × 600 pixels
- **Peso máximo:** 200 KB
- **Como comprimir:** https://squoosh.app
- **Pasta destino:** `public/assets/imagens/hero.jpg`

### 4️⃣ **Outras Imagens (Opcional)**
Se o seu `copy.md` referencia outras imagens:
- Nomeie com minúsculas: `imagem-beneficio-1.jpg`
- Coloque em: `public/assets/imagens/`
- Referencie no copy.md como: `/assets/imagens/imagem-beneficio-1.jpg`

### 5️⃣ **Referências Visuais (Opcional)**
Para melhor resultado, forneça:
- **Paleta de cores** (`paleta-cores.png`) em `public/assets/referencias/`
- **Tipografia** (`tipografia.png`) em `public/assets/referencias/`

---

## 📝 Checklist de Envio

- [ ] `copy.md` preenchido 100% (sem placeholders `[ESCREVA AQUI]`)
- [ ] `public/assets/logos/logo-principal.png` (PNG, fundo transparente)
- [ ] `public/assets/imagens/hero.jpg` (1200×600px, < 200KB)
- [ ] Webhook URL testado e funcionando
- [ ] Número WhatsApp confirmado (formato: 55...)
- [ ] Se usar GTM: ID do Google Tag Manager fornecido
- [ ] Sem erros ou campos vazios em copy.md

---

## 🚀 Próximas Etapas (Desenvolvedor)

Quando receber os arquivos do cliente:

```bash
# 1. Entrar na pasta do projeto
cd landingpages/clientes/padom-consorcio-consultoria

# 2. Colocar copy.md na raiz (mesma pasta deste arquivo)

# 3. Colocar imagens em public/assets/
# - logo-principal.png → public/assets/logos/
# - hero.jpg → public/assets/imagens/
# - [outras] → public/assets/imagens/

# 4. Instalar dependências
npm install

# 5. Gerar config (GTM + SEO injetados aqui)
npm run parse

# 6. Testar localmente
npm run dev
# → Use /frontend-design para validar

# 7. Build + Deploy
npm run deploy
# → Cria repo em github.com/TravelTecOficial/landing-padom-consorcio-consultoria

# 8. Conectar em Hostinger (manual)
# → Git Management → Conectar repositório
```

---

## 📞 Contato Cliente

**Cliente:** Padom Consultoria  
**Tipo de Negócio:** Consultoria de Consórcio de Veículo  
**Webhook:** [Será fornecido]  
**WhatsApp:** [Será fornecido]  
**GTM ID:** [Será fornecido - Opcional]  

---

## 🎯 Estrutura Esperada

Após o cliente enviar, a pasta ficará assim:

```
padom-consorcio-consultoria/
├── copy.md                          ← Cliente envia
├── public/
│   └── assets/
│       ├── logos/
│       │   └── logo-principal.png   ← Cliente envia
│       ├── imagens/
│       │   ├── hero.jpg             ← Cliente envia
│       │   └── [outras...]          ← Cliente envia (se tiver)
│       └── referencias/
│           ├── paleta-cores.png     ← Cliente envia (opcional)
│           └── tipografia.png       ← Cliente envia (opcional)
├── src/
├── package.json
├── copy.PRODUTOR.md                 ← Template para cliente
└── ... (arquivos do template)
```

---

**Aguardando arquivos do cliente! 🚀**
