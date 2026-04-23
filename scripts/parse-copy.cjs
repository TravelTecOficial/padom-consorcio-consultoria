#!/usr/bin/env node

/**
 * Script para converter copy.md em src/lib/config.ts
 * Uso: node scripts/parse-copy.js
 */

const fs = require('fs');
const path = require('path');

const copyPath = path.join(__dirname, '../copy.md');
const configPath = path.join(__dirname, '../src/lib/config.ts');
const indexPath = path.join(__dirname, '../index.html');
const tailwindPath = path.join(__dirname, '../tailwind.config.js');

// Helper: escape caracteres especiais para TypeScript
const escapeForTs = (str) => {
  if (!str) return '';
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
};

if (!fs.existsSync(copyPath)) {
  console.error('❌ Arquivo copy.md não encontrado!');
  process.exit(1);
}

// Função: injetar GTM + SEO em index.html (idempotente)
function injectIntoHtml(gtmId, title, description, url) {
  if (!fs.existsSync(indexPath)) {
    console.log('⚠️  index.html não encontrado, ignorando injeção de GTM/SEO');
    return;
  }

  let html = fs.readFileSync(indexPath, 'utf-8');

  // --- 1. TITLE ---
  html = html.replace(/<title>.*?<\/title>/s, `<title>${title}</title>`);

  // --- 2. META DESCRIPTION (idempotente) ---
  if (html.includes('name="description"')) {
    html = html.replace(
      /<meta name="description"[^>]*>/,
      `<meta name="description" content="${description}" />`
    );
  } else {
    html = html.replace(
      '</head>',
      `  <meta name="description" content="${description}" />\n  </head>`
    );
  }

  // --- 3. OG TAGS (idempotente) ---
  const ogUrl = url.startsWith('http') ? url : `https://${url}`;
  const ogBlock = `  <!-- SEO-OG-START -->
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${ogUrl}" />
  <meta property="og:type" content="website" />
  <!-- SEO-OG-END -->`;

  if (html.includes('<!-- SEO-OG-START -->')) {
    html = html.replace(
      /[ \t]*<!-- SEO-OG-START -->[\s\S]*?<!-- SEO-OG-END -->/,
      ogBlock
    );
  } else {
    html = html.replace(
      '</head>',
      `\n${ogBlock}\n  </head>`
    );
  }

  // --- 4. GTM (idempotente) ---
  const hasValidGTM = gtmId &&
    !gtmId.includes('GTM-XXXXXXX') &&
    gtmId.trim() !== '' &&
    /^GTM-[A-Z0-9]+$/.test(gtmId);

  if (!hasValidGTM) {
    html = html.replace(
      /[ \t]*<!-- GTM-HEAD-START -->[\s\S]*?<!-- GTM-HEAD-END -->\n?/,
      ''
    );
    html = html.replace(
      /[ \t]*<!-- GTM-BODY-START -->[\s\S]*?<!-- GTM-BODY-END -->\n?/,
      ''
    );
    fs.writeFileSync(indexPath, html);
    return;
  }

  const gtmHeadSnippet = `  <!-- GTM-HEAD-START -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${gtmId}');</script>
  <!-- GTM-HEAD-END -->`;

  if (html.includes('<!-- GTM-HEAD-START -->')) {
    html = html.replace(
      /[ \t]*<!-- GTM-HEAD-START -->[\s\S]*?<!-- GTM-HEAD-END -->/,
      gtmHeadSnippet
    );
  } else {
    html = html.replace(
      '</head>',
      `\n${gtmHeadSnippet}\n  </head>`
    );
  }

  const gtmBodySnippet = `  <!-- GTM-BODY-START -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- GTM-BODY-END -->`;

  if (html.includes('<!-- GTM-BODY-START -->')) {
    html = html.replace(
      /[ \t]*<!-- GTM-BODY-START -->[\s\S]*?<!-- GTM-BODY-END -->/,
      gtmBodySnippet
    );
  } else {
    html = html.replace(
      '<body>',
      `<body>\n${gtmBodySnippet}`
    );
  }

  fs.writeFileSync(indexPath, html);
  console.log(`✅ GTM ${gtmId} injetado em index.html`);
}

// Função: escrever tailwind.config.js com cores dinâmicas + fontFamily
function writeTailwindConfig(cores) {
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'client-primary': '${cores.primaria}',
        'client-primary-mid': '#1B3A5C',
        'client-secondary': '${cores.secundaria}',
        'client-accent': '${cores.destaque}',
        'client-accent-light': '#6BB3E8',
        'client-gold': '#C9A84C',
        'client-text': '${cores.texto}',
        'client-text-dark': '#0A1929',
        'client-bg': '${cores.fundo}',
        'client-bg-white': '#FAFBFD',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
`;
  fs.writeFileSync(tailwindPath, tailwindConfig);
  console.log('✅ tailwind.config.js atualizado com cores e fontes');
}

try {
  const content = fs.readFileSync(copyPath, 'utf-8');

  // Função auxiliar para extrair valor após "-" (case-insensitive para a key)
  const extractValue = (section, key) => {
    const regex = new RegExp(`-\\s*\\*\\*${key}\\*\\*:\\s*(.+?)(?=\\n|$)`, 'si');
    const match = section.match(regex);
    return match ? match[1].trim() : '';
  };

  // Função auxiliar para extrair seções
  const extractSection = (content, sectionTitle) => {
    const regex = new RegExp(`##\\s+${sectionTitle}\\s+(.*?)(?=##|$)`, 's');
    const match = content.match(regex);
    return match ? match[1] : '';
  };

  console.log('📖 Lendo copy.md...');

  // Extrair informações básicas
  const metaSectionStart = extractSection(content, 'Meta');
  const nomeFromMeta = extractValue(metaSectionStart, 'Nome da Página');
  const nomeMatch = content.match(/# Copy — (.+?)(?=\n|$)/);
  const nome = nomeFromMeta || (nomeMatch ? nomeMatch[1].trim() : 'Landing Page');

  // Extrair seções principais
  const metaSection = extractSection(content, 'Meta');
  const heroSection = extractSection(content, '1\\. HERO');
  const problemasSection = extractSection(content, '2\\. PROBLEMAS');
  const solucaoSection = extractSection(content, '3\\. SOLU[ÇC][ÃA]O');
  const beneficiosSection = extractSection(content, '4\\. BENEF[ÍI]CIOS');
  const comoFuncionaSection = extractSection(content, '5\\. COMO FUNCIONA');
  const depoimentosSection = extractSection(content, '6\\. DEPOIMENTOS');
  const mapaSection = extractSection(content, '7\\. MAPA');
  const avaliacoeSection = extractSection(content, '8\\. AVALIA[ÇC][ÕO]ES');
  const faqSection = extractSection(content, '9\\. FAQ');
  const ctaSection = extractSection(content, '10\\. CTA FINAL');
  const formularioSection = extractSection(content, '11\\. FORMUL[ÁA]RIO');
  const footerSection = extractSection(content, 'FOOTER');
  const coresSection = extractSection(content, 'Paleta de Cores');
  const whatsappSection = extractSection(content, 'WHATSAPP');
  const obrigadoSection = extractSection(content, 'P[ÁA]GINA DE OBRIGADO');

  // Extrair cores (com fallbacks flexíveis para diferentes nomes de keys)
  const extractColor = (section, keys, fallback) => {
    for (const key of keys) {
      const match = section.match(new RegExp(`-\\s*\\*\\*${key}\\*\\*:\\s*(#[0-9A-Fa-f]{6})`, 'i'));
      if (match) return match[1];
    }
    return fallback;
  };

  const coresExtracted = {
    primaria: extractColor(coresSection, ['Primária', 'Primary'], '#1B3A5C'),
    secundaria: extractColor(coresSection, ['Secundária', 'Secondary'], '#2C5F8A'),
    destaque: extractColor(coresSection, ['Destaque \\/ CTA', 'Destaque', 'CTA', 'Accent'], '#4A90C4'),
    texto: extractColor(coresSection, ['Neutra', 'Textos \\/ ícones', 'Texto', 'Text'], '#6B7B8D'),
    fundo: extractColor(coresSection, ['Fundo \\/ contraste', 'Fundo', 'Background'], '#F5F7FA'),
  };

  // Extrair latitude e longitude do mapa
  const latMatch = mapaSection.match(/\*\*Latitude\*\*:\s*([-\d.]+)/);
  const lngMatch = mapaSection.match(/\*\*Longitude\*\*:\s*([-\d.]+)/);
  const latitude = latMatch ? latMatch[1] : '-23.5505';
  const longitude = lngMatch ? lngMatch[1] : '-46.6333';

  // Extrair benefícios com regex robusto
  const parseBeneficios = (section) => {
    const beneficios = [];
    const benefRegex = /- \*\*Benefício (\d)\*\*:[\s\S]*?- Ícone:\s*(\S+)[\s\S]*?- Título:\s*([^\n]+)[\s\S]*?- Descrição:\s*([^\n]+?)(?=\n- \*\*Benefício|\n\s*\n---|\n---|\n##|$)/g;
    let match;
    while ((match = benefRegex.exec(section)) !== null) {
      beneficios.push({
        id: match[1],
        icone: match[2].trim(),
        titulo: escapeForTs(match[3].trim()),
        descricao: escapeForTs(match[4].trim()),
      });
    }
    return beneficios;
  };

  // Extrair depoimentos com regex robusto
  const parseDepoimentos = (section) => {
    const depoimentos = [];
    const depoRegex = /- \*\*Depoimento (\d)\*\*:[\s\S]*?- Texto:\s*"?([^"]*)"?[\s\S]*?- Autor:\s*([^\n]+)[\s\S]*?- Cargo:\s*([^\n]+?)(?=\n- \*\*Depoimento|\n\s*\n---|\n---|\n##|$)/g;
    let match;
    while ((match = depoRegex.exec(section)) !== null) {
      depoimentos.push({
        id: match[1],
        texto: escapeForTs(match[2].trim()),
        autor: escapeForTs(match[3].trim()),
        cargo: escapeForTs(match[4].trim()),
      });
    }
    return depoimentos;
  };

  // Extrair FAQs com regex robusto
  const parseFaqs = (section) => {
    const faqs = [];
    const faqRegex = /- \*\*Pergunta (\d)\*\*:\s*([^\n]+)[\s\S]*?- Resposta:\s*([^\n]+?)(?=\n- \*\*Pergunta|\n\s*\n---|\n---|\n##|$)/g;
    let match;
    while ((match = faqRegex.exec(section)) !== null) {
      faqs.push({
        id: match[1],
        pergunta: escapeForTs(match[2].trim()),
        resposta: escapeForTs(match[3].trim()),
      });
    }
    return faqs;
  };

  const beneficios = parseBeneficios(beneficiosSection);
  const depoimentos = parseDepoimentos(depoimentosSection);
  const faqs = parseFaqs(faqSection);

  console.log(`  📊 Benefícios encontrados: ${beneficios.length}`);
  console.log(`  📊 Depoimentos encontrados: ${depoimentos.length}`);
  console.log(`  📊 FAQs encontradas: ${faqs.length}`);

  const beneficiosStr = beneficios.length > 0
    ? beneficios.map(b => `{ id: ${b.id}, icone: "${b.icone}", titulo: "${b.titulo}", descricao: "${b.descricao}" }`).join(',\n      ')
    : '{ id: 1, icone: "rocket", titulo: "Rápido", descricao: "Descrição" },\n      { id: 2, icone: "shield", titulo: "Seguro", descricao: "Descrição" },\n      { id: 3, icone: "zap", titulo: "Eficiente", descricao: "Descrição" }';

  const depoimentosStr = depoimentos.length > 0
    ? depoimentos.map(d => `{ id: ${d.id}, texto: "${d.texto}", autor: "${d.autor}", cargo: "${d.cargo}" }`).join(',\n      ')
    : '{ id: 1, texto: "Depoimento 1", autor: "Cliente 1", cargo: "Cargo/Empresa" },\n      { id: 2, texto: "Depoimento 2", autor: "Cliente 2", cargo: "Cargo/Empresa" },\n      { id: 3, texto: "Depoimento 3", autor: "Cliente 3", cargo: "Cargo/Empresa" }';

  const faqsStr = faqs.length > 0
    ? faqs.map(f => `{ id: ${f.id}, pergunta: "${f.pergunta}", resposta: "${f.resposta}" }`).join(',\n      ')
    : '{ id: 1, pergunta: "Pergunta 1?", resposta: "Resposta 1" },\n      { id: 2, pergunta: "Pergunta 2?", resposta: "Resposta 2" },\n      { id: 3, pergunta: "Pergunta 3?", resposta: "Resposta 3" }';

  // Componentes opcionais - verificar "sim" com flexibilidade de key names
  const checkSim = (section, keys) => {
    for (const key of keys) {
      const val = extractValue(section, key);
      if (val && val.toLowerCase().includes('sim')) return true;
    }
    return false;
  };

  const showMapa = checkSim(mapaSection, ['Mostrar Mapa\\?', 'Exibir Mapa\\?']);
  const showAvaliacoes = checkSim(avaliacoeSection, ['Mostrar Avaliações Google\\?', 'Mostrar Avaliações\\?', 'Mostrar Reviews\\?']);
  const showComoFunciona = checkSim(comoFuncionaSection, ['Mostrar Como Funciona\\?']);
  const showDepoimentos = checkSim(depoimentosSection, ['Mostrar Depoimentos\\?']);
  const showFaq = checkSim(faqSection, ['Mostrar FAQ\\?']);

  // WhatsApp
  const whatsappNumero = extractValue(whatsappSection, 'Número WhatsApp') || extractValue(content, 'Número WhatsApp') || '5511999999999';
  const whatsappMsg = extractValue(whatsappSection, 'Mensagem padrão') || extractValue(whatsappSection, 'Mensagem Padrão') || extractValue(content, 'Mensagem padrão') || 'Olá! Gostaria de saber mais';

  // Página de Obrigado
  const obrigadoTitulo = extractValue(obrigadoSection, 'Título') || 'Obrigado por entrar em contato!';
  const obrigadoDesc = extractValue(obrigadoSection, 'Descrição') || 'Em breve entraremos em contato com você.';
  const obrigadoLogo = extractValue(obrigadoSection, 'Logo') || '';
  const obrigadoTempo = extractValue(obrigadoSection, 'Tempo de redirecionamento') || '0';

  // CTA Final
  const ctaBotao = extractValue(ctaSection, 'Botão') || extractValue(ctaSection, 'Button Text') || 'Solicitar Contato';

  // Formulário
  const formTitulo = extractValue(formularioSection, 'Título') || 'Entre em contato';

  // Gerar arquivo config.ts
  const configTemplate = `/**
 * Configuração da Landing Page: ${nome}
 * Gerado automaticamente a partir de copy.md
 *
 * Para atualizar: edite copy.md e execute "node scripts/parse-copy.js"
 */

export const siteConfig = {
  // Informações básicas
  nome: "${escapeForTs(nome)}",
  descricaoMeta: "${escapeForTs(extractValue(metaSection, 'Descrição Meta') || `Landing page de ${nome}`)}",
  urlPagina: "${escapeForTs(extractValue(metaSection, 'URL da Página') || 'https://exemplo.com.br')}",

  // Cores
  cores: {
    primaria: "${coresExtracted.primaria}",
    secundaria: "${coresExtracted.secundaria}",
    destaque: "${coresExtracted.destaque}",
    texto: "${coresExtracted.texto}",
    fundo: "${coresExtracted.fundo}",
  },

  // Tipografia
  fonts: {
    principal: "Crimson Text",
    secundaria: "DM Sans",
  },

  // Hero
  hero: {
    titulo: "${escapeForTs(extractValue(heroSection, 'Título') || 'Bem-vindo')}",
    subtitulo: "${escapeForTs(extractValue(heroSection, 'Subtítulo') || 'Descrição')}",
    cta: "${escapeForTs(extractValue(heroSection, 'CTA') || 'Solicitar Demo')}",
    imagemUrl: "${escapeForTs(extractValue(heroSection, 'Imagem Hero') || '/assets/imagens/hero.jpg')}",
  },

  // Problemas
  problemas: {
    titulo: "${escapeForTs(extractValue(problemasSection, 'Título da Seção') || 'Os desafios que você enfrenta')}",
    itens: [
      { id: 1, descricao: "${escapeForTs(extractValue(problemasSection, 'Problema 1') || 'Problema 1')}" },
      { id: 2, descricao: "${escapeForTs(extractValue(problemasSection, 'Problema 2') || 'Problema 2')}" },
      { id: 3, descricao: "${escapeForTs(extractValue(problemasSection, 'Problema 3') || 'Problema 3')}" },
    ],
  },

  // Solução
  solucao: {
    titulo: "${escapeForTs(extractValue(solucaoSection, 'Título da Seção') || 'Nossa Solução')}",
    descricao: "${escapeForTs(extractValue(solucaoSection, 'Descrição') || 'Descrição da solução')}",
    pontosChave: [
      "${escapeForTs(extractValue(solucaoSection, 'Ponto-chave 1') || 'Ponto 1')}",
      "${escapeForTs(extractValue(solucaoSection, 'Ponto-chave 2') || 'Ponto 2')}",
      "${escapeForTs(extractValue(solucaoSection, 'Ponto-chave 3') || 'Ponto 3')}",
    ],
  },

  // Benefícios
  beneficios: {
    titulo: "${escapeForTs(extractValue(beneficiosSection, 'Título da Seção') || 'Vantagens')}",
    itens: [
      ${beneficiosStr}
    ],
  },

  // Como Funciona
  comoFunciona: {
    titulo: "${escapeForTs(extractValue(comoFuncionaSection, 'Título da Seção') || 'Como Funciona')}",
    passos: [
      { numero: 1, titulo: "Passo 1", descricao: "${escapeForTs(extractValue(comoFuncionaSection, 'Passo 1') || 'Descrição')}" },
      { numero: 2, titulo: "Passo 2", descricao: "${escapeForTs(extractValue(comoFuncionaSection, 'Passo 2') || 'Descrição')}" },
      { numero: 3, titulo: "Passo 3", descricao: "${escapeForTs(extractValue(comoFuncionaSection, 'Passo 3') || 'Descrição')}" },
    ],
  },

  // Depoimentos
  depoimentos: {
    titulo: "${escapeForTs(extractValue(depoimentosSection, 'Título da Seção') || 'O que nossos clientes dizem')}",
    itens: [
      ${depoimentosStr}
    ],
  },

  // Mapa
  mapa: {
    exibir: true,
    latitude: ${latitude},
    longitude: ${longitude},
    titulo: "${escapeForTs(extractValue(mapaSection, 'Título do Mapa') || 'Nossa localização')}",
  },

  // Avaliações Google
  avaliacoes: {
    exibir: true,
    maxAvaliacoes: 3,
  },

  // FAQ
  faq: {
    titulo: "${escapeForTs(extractValue(faqSection, 'Título da Seção') || 'Perguntas Frequentes')}",
    itens: [
      ${faqsStr}
    ],
  },

  // CTA Final
  ctaFinal: {
    titulo: "${escapeForTs(extractValue(ctaSection, 'Título') || 'Pronto para começar?')}",
    descricao: "${escapeForTs(extractValue(ctaSection, 'Descrição') || 'Entre em contato')}",
    botao: "${escapeForTs(ctaBotao)}",
  },

  // Formulário (OBRIGATÓRIO)
  formulario: {
    exibir: true,
    titulo: "${escapeForTs(formTitulo)}",
    descricao: "${escapeForTs(extractValue(formularioSection, 'Descrição') || 'Preencha o formulário')}",
    campos: [
      { name: "nome", type: "text", label: "Nome", placeholder: "Seu nome", required: true },
      { name: "email", type: "email", label: "E-mail", placeholder: "seu@email.com", required: true },
      { name: "telefone", type: "phone", label: "Telefone", placeholder: "(11) 99999-9999", required: false },
      { name: "tipoBem", type: "select", label: "Tipo de bem", placeholder: "Selecione", required: true, options: [
        { value: "veiculos", label: "Veículos" },
        { value: "imoveis", label: "Imóveis" },
        { value: "servicos", label: "Serviços" },
        { value: "outros", label: "Outros" },
      ]},
      { name: "valor", type: "text", label: "Valor desejado", placeholder: "Valor aproximado do bem", required: true },
      { name: "mensagem", type: "textarea", label: "Mensagem", placeholder: "Sua mensagem", required: false },
    ],
    webhookUrl: "${escapeForTs(extractValue(formularioSection, 'Webhook URL') || 'https://webhook.site/seu-id')}",
    redirectUrl: "/obrigado",
    botaoTexto: "${escapeForTs(extractValue(formularioSection, 'Button Text') || 'Enviar')}",
  },

  // Componentes opcionais (mostrar ou não)
  componentesOpcionais: {
    mapa: ${showMapa},
    avaliacoes: ${showAvaliacoes},
    comoFunciona: ${showComoFunciona},
    depoimentos: ${showDepoimentos},
    faq: ${showFaq},
  },

  // WhatsApp (OBRIGATÓRIO)
  whatsapp: {
    numero: "${escapeForTs(whatsappNumero)}",
    mensagem: "${escapeForTs(whatsappMsg)}",
  },

  // Página de Obrigado (OBRIGATÓRIO)
  paginaObrigado: {
    titulo: "${escapeForTs(obrigadoTitulo)}",
    descricao: "${escapeForTs(obrigadoDesc)}",
    logoUrl: "${escapeForTs(obrigadoLogo)}",
    tempoRedirecionamento: ${parseInt(obrigadoTempo) || 0},
    urlAposobrigado: "",
  },

  // Footer
  footer: {
    linksRapidos: ["Home", "Sobre", "Contato"],
    nomeEmpresa: "${escapeForTs(extractValue(footerSection, 'Nome da empresa') || extractValue(footerSection, 'Empresa') || 'Sua Empresa')}",
    endereco: "${escapeForTs(extractValue(footerSection, 'Endereço') || '')}",
    email: "${escapeForTs(extractValue(footerSection, 'Email de contato') || extractValue(footerSection, 'Email') || 'contato@empresa.com')}",
    telefone: "${escapeForTs(extractValue(footerSection, 'Telefone / WhatsApp') || extractValue(footerSection, 'Telefone') || '(11) 99999-9999')}",
    redesSociais: {
      linkedin: "${escapeForTs(extractValue(footerSection, 'LinkedIn') || '#')}",
      instagram: "${escapeForTs(extractValue(footerSection, 'Instagram') || '#')}",
      facebook: "${escapeForTs(extractValue(footerSection, 'Facebook') || '#')}",
    },
    copyright: "${escapeForTs(extractValue(footerSection, 'Copyright') || '© 2026 Sua Empresa')}",
  },

  // Analytics
  analytics: {
    googleAnalyticsId: "${extractValue(metaSection, 'Google Analytics ID') || ''}",
    googleTagManagerId: "${extractValue(metaSection, 'GTM ID') || ''}",
    pixelFacebook: "${extractValue(metaSection, 'Pixel Facebook') || ''}",
  },

  // Seções a exibir
  secoes: [
    "hero",
    "problemas",
    "solucao",
    "beneficios",
    "comoFunciona",
    "depoimentos",
    "mapa",
    "avaliacoes",
    "faq",
    "ctaFinal",
    "formulario",
  ],
};
`;

  fs.writeFileSync(configPath, configTemplate);
  console.log('✅ config.ts gerado com sucesso!');
  console.log(`📍 Arquivo salvo em: ${configPath}`);

  // Injetar GTM + SEO em index.html
  const gtmId = extractValue(metaSection, 'GTM ID');
  const pageTitle = extractValue(metaSection, 'Nome da Página') || nome;
  const metaDesc = extractValue(metaSection, 'Descrição Meta') || `Landing page de ${nome}`;
  const pageUrl = extractValue(metaSection, 'URL da Página') || '';

  injectIntoHtml(gtmId, pageTitle, metaDesc, pageUrl);

  // Escrever tailwind.config.js com cores
  writeTailwindConfig(coresExtracted);

  console.log('✅ SEO tags (title, description, og) atualizados em index.html');
  console.log('\n⏭️  Próximo passo: npm run dev');

} catch (error) {
  console.error('❌ Erro ao processar copy.md:', error.message);
  process.exit(1);
}
