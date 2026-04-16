# 🚀 Padom Consultoria - Status do Projeto

**Data criação:** 2026-04-16  
**Cliente:** Padom Consultoria (Consórcio)  
**Status:** ⏳ **AGUARDANDO ENTREGA DO CLIENTE**

---

## ✅ O Que Já Foi Feito (Desenvolvedor)

```
✅ Pasta do projeto criada
✅ Template React + Vite configurado
✅ Componentes compartilhados linkados
✅ Estrutura de pastas /public/assets/ pronta
   ├── logos/        (vazio - cliente envia)
   ├── imagens/      (vazio - cliente envia)
   └── referencias/  (vazio - cliente envia)
✅ copy.PRODUTOR.md copiado (template para cliente)
✅ Package.json pronto com scripts
✅ Instruções para cliente criadas
```

---

## ⏳ AGUARDANDO DO CLIENTE

Você precisa receber do cliente Padom:

### 📁 Arquivos Obrigatórios
```
❌ copy.md
   - Usar copy.PRODUTOR.md como guia
   - 100% preenchido
   - Nenhum [ESCREVA AQUI] vazio

❌ public/assets/logos/logo-principal.png
   - PNG com fundo transparente
   - Mínimo 200×100px

❌ public/assets/imagens/hero.jpg
   - 1200×600px
   - Máximo 200KB
   - Use https://squoosh.app para comprimir
```

### 📋 Informações Obrigatórias (no copy.md)
```
❌ Webhook URL (testado)
❌ Número WhatsApp (formato: 5511999999999)
❌ Nome da Página
❌ Descrição Meta (máx 160 caracteres)
❌ URL do domínio
```

### 🎨 Informações Opcionais
```
⭕ Google Tag Manager ID (GTM-XXXXXXX)
⭕ Cores da marca
⭕ Tipografia
⭕ Outras imagens (benefícios, depoimentos, etc)
```

---

## 📋 Checklist de Recebimento

Quando cliente enviar os arquivos:

- [ ] Recebeu copy.md
- [ ] Recebeu logo-principal.png
- [ ] Recebeu hero.jpg
- [ ] Verificar que copy.md está 100% preenchido
- [ ] Verificar imagens estão em pasta correta
- [ ] Webhook URL testado
- [ ] Número WhatsApp validado

---

## 🚀 Próximos Passos (Depois que receber os arquivos)

```bash
# 1. Colocar copy.md na raiz do projeto
# 2. Colocar imagens em public/assets/
# 3. Rodar:

cd landingpages/clientes/padom-consorcio-consultoria

npm install
npm run parse    # ← GTM + SEO injetados aqui
npm run dev      # ← Usar /frontend-design para validar
npm run deploy   # ← Cria repo na TravelTecOficial
```

---

## 📞 Comunicação com Cliente

**Template para enviar ao cliente:**

> "Olá! Preparamos sua landing page. Para continuar, precisamos que você envie:
> 
> 1. **copy.md** — Preencha usando o arquivo `copy.PRODUTOR.md` como guia
> 2. **Logo** — `logo-principal.png` (PNG, fundo transparente)
> 3. **Imagem banner** — `hero.jpg` (1200×600px, < 200KB)
> 
> Coloque em:
> - copy.md → raiz da pasta
> - logo-principal.png → `public/assets/logos/`
> - hero.jpg → `public/assets/imagens/`
> 
> Você tem um template pronto (`copy.PRODUTOR.md`) com instruções de cada campo.
> Qualquer dúvida, é só chamar! 🚀"

---

## 📊 Estrutura Atual

```
padom-consorcio-consultoria/
├── INSTRUCOES-CLIENTE.md          ← Instruções para cliente
├── STATUS.md                       ← Este arquivo
├── copy.PRODUTOR.md                ← Template para cliente preencher
├── package.json                    ← Scripts npm
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── public/
│   └── assets/
│       ├── README.md
│       ├── logos/                  ← Vazio (cliente envia)
│       ├── imagens/                ← Vazio (cliente envia)
│       └── referencias/            ← Vazio (cliente envia)
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.tsx
│   ├── main.tsx
│   └── lib/
│       └── config.ts               ← Será gerado por npm run parse
├── scripts/
│   ├── parse-copy.js
│   └── create-github-repo.js
└── index.html                      ← Será atualizado com GTM + SEO
```

---

## 🎯 Timeline Estimada

```
Hoje:           ✅ Setup concluído
Quando receber: ⏳ npm install + npm run parse (1 min)
                ⏳ npm run dev + /frontend-design (10 min)
                ⏳ npm run deploy (5 min)
                ⏳ Conectar Hostinger (2 min)
                
Total:          ~18 minutos após receber arquivos
```

---

**Aguardando entrega do cliente! 📩**
