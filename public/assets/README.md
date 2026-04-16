# 📁 Assets - Landing Page

Pasta para organizar todos os arquivos visuais e referências da landing page.

---

## 📂 Estrutura

```
assets/
├── logos/                    # Logotipos do cliente
│   ├── logo-principal.png   # Logo para header
│   ├── logo-rodape.png      # Logo para footer (opcional)
│   └── favicon.ico          # Ícone abas navegador (opcional)
│
├── imagens/                 # Imagens de conteúdo
│   ├── hero.jpg            # Imagem do hero (recomendado 1200x600px)
│   ├── secao-1.jpg         # Outras imagens
│   ├── secao-2.jpg
│   └── ...
│
└── referencias/            # Referências visuais (PNG/JPG)
    ├── paleta-cores.png    # Screenshot/imagem das cores
    ├── tipografia.png      # Screenshot das fontes
    └── guia-visual.png     # Guia visual completo (opcional)
```

---

## 🎯 Instruções por Pasta

### logos/
- **Logo Principal**: Formato PNG com fundo transparente, mínimo 200x100px
- **Logo Rodapé**: Menor, para footer (opcional)
- **Favicon**: 32x32px ou 64x64px em .ico

### imagens/
- **Otimize antes de adicionar**: use TinyPNG, Squoosh, ou ImageOptim
- **Tamanhos recomendados**:
  - Hero: 1200x600px (16:9)
  - Seções: 600x400px ou 800x600px
  - Máximo: 500KB por imagem
- **Nomes descritivos**: `hero.jpg`, `beneficio-1.jpg`, etc

### referencias/
- **Paleta de Cores**: Screenshot ou imagem mostrando cores principais
- **Tipografia**: Imagem com exemplos de fontes (títulos, body, etc)
- **Guia Visual**: Documento completo com brand guidelines (opcional)

---

## 🔗 Como Referenciar em copy.md

No arquivo `copy.md`, reference os arquivos assim:

```markdown
## Hero
- **Imagem/Vídeo**: /assets/imagens/hero.jpg

## Página de Obrigado
- **Logo do Cliente**: /assets/logos/logo-principal.png

## Footer
- **Links Rápidos**: [Home, Sobre, Contato]
```

**URL padrão**: `/assets/` + pasta + nome-arquivo

---

## 📐 Dimensões Recomendadas

| Elemento | Dimensão | Peso |
|----------|----------|------|
| Logo Header | 200x100px | <50KB |
| Hero | 1200x600px | <200KB |
| Seção | 600x400px | <100KB |
| Ícone | 64x64px | <20KB |

---

## 🚀 Deploy Automático

Ao fazer `npm run build`, todos os arquivos em `public/` são **automaticamente inclusos** na pasta `dist/`.

Quando você faz deploy via GitHub:
```bash
npm run deploy:github -- "cliente" --token "token"
```

Todos os assets em `assets/` são enviados junto.

---

## 💡 Exemplo Completo

**Estrutura:**
```
assets/
├── logos/
│   └── infinnity-logo.png
├── imagens/
│   ├── hero.jpg
│   ├── consultoria.jpg
│   └── equipe.jpg
└── referencias/
    ├── paleta-cores.png
    └── tipografia.png
```

**copy.md:**
```markdown
## Hero
- **Imagem/Vídeo**: /assets/imagens/hero.jpg

## Página de Obrigado
- **Logo do Cliente**: /assets/logos/infinnity-logo.png
```

**Config gerado (automático):**
```typescript
hero: {
  imagemUrl: "/assets/imagens/hero.jpg",
},
paginaObrigado: {
  logoUrl: "/assets/logos/infinnity-logo.png",
}
```

---

## ✅ Checklist

- [ ] Logo principal em `/logos/logo-principal.png`
- [ ] Imagens otimizadas em `/imagens/`
- [ ] Referências visuais em `/referencias/`
- [ ] Nomes de arquivo sem espaços (use `-` ou `_`)
- [ ] Todos os arquivos em minúsculas
- [ ] URLs em copy.md começam com `/assets/`
