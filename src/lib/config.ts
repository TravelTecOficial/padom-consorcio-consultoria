/**
 * Configuração da Landing Page: Padom Consórcio | Consultoria Especializada em São Paulo
 * Gerado automaticamente a partir de copy.md
 *
 * Para atualizar: edite copy.md e execute "node scripts/parse-copy.js"
 */

export const siteConfig = {
  // Informações básicas
  nome: "Padom Consórcio | Consultoria Especializada em São Paulo",
  descricaoMeta: "Consultoria personalizada em consórcio de veículos e imóveis. Análise de perfil, estratégia de lances e acompanhamento até a contemplação. Zona Norte de SP.",
  urlPagina: "https://www.padomseguros.com.br/",

  // Cores
  cores: {
    primaria: "#0F2640",
    secundaria: "#2C5F8A",
    destaque: "#4A90C4",
    texto: "#8A9AAF",
    fundo: "#F0F4F8",
  },

  // Tipografia
  fonts: {
    principal: "Crimson Text",
    secundaria: "DM Sans",
  },

  // Hero
  hero: {
    titulo: "Consórcio certo, no momento certo, para você",
    subtitulo: "Há 29 anos analisamos seu perfil e entregamos o melhor plano — com estratégia real para sua contemplação",
    cta: "Solicitar minha análise gratuita",
    imagemUrl: "/assets/imagens/hero.jpg",
  },

  // Problemas
  problemas: {
    titulo: "Os desafios de quem quer entrar num consórcio sem orientação",
    itens: [
      { id: 1, descricao: "Não sabe quando será contemplado nem como aumentar essa chance" },
      { id: 2, descricao: "Não tem clareza se está fazendo um bom investimento para seu momento de vida" },
      { id: 3, descricao: "Não conhece as estratégias de lance que podem antecipar a conquista do bem" },
    ],
  },

  // Solução
  solucao: {
    titulo: "Consultoria estratégica que analisa seu caso e encontra o caminho mais inteligente",
    descricao: "A Padom não simula cotas e manda um boleto. Analisamos seu perfil financeiro, sua urgência e seus objetivos para indicar o grupo certo, no momento certo — com lances reais e planejamento detalhado.",
    pontosChave: [
      "Análise individualizada de perfil financeiro e necessidade",
      "Monitoramento contínuo de grupos e administradoras para identificar a melhor oportunidade",
      "Planejamento de lances com valores reais para antecipar a contemplação",
    ],
  },

  // Benefícios
  beneficios: {
    titulo: "O que você ganha ao trabalhar com a Padom",
    itens: [
      { id: 1, icone: "target", titulo: "Previsibilidade real", descricao: "Mais de 95% de acerto no prazo de contemplação. Você sabe quando vai chegar lá — não fica no escuro esperando a sorte." },
      { id: 2, icone: "shield", titulo: "Segurança na decisão", descricao: "Mais de 120 clientes contemplados e R$15 milhões em cotas gerenciadas. 29 anos de mercado e média 5 estrelas no Google." },
      { id: 3, icone: "heart", titulo: "Parceiro de longo prazo", descricao: "Pós-venda acompanhado de perto — do trâmite administrativo até a entrega do crédito. Um parceiro para planejar suas próximas aquisições." }
    ],
  },

  // Como Funciona
  comoFunciona: {
    titulo: "Como funciona a consultoria Padom",
    passos: [
      { numero: 1, titulo: "Passo 1", descricao: "Análise de perfil — Entendemos sua situação financeira, urgência e objetivos de aquisição" },
      { numero: 2, titulo: "Passo 2", descricao: "Indicação estratégica — Selecionamos o grupo ideal, simulamos cenários de lance e apresentamos o planejamento detalhado" },
      { numero: 3, titulo: "Passo 3", descricao: "Acompanhamento até a contemplação — Monitoramos sua cota, orientamos os lances e cuidamos de todo o processo administrativo até a entrega do crédito" },
    ],
  },

  // Depoimentos
  depoimentos: {
    titulo: "O que nossos clientes dizem",
    itens: [
      { id: 1, texto: "Desde o primeiro contato foram extremamente educados e solícitos. Acompanharam todo o processo, tiraram dúvidas e prestaram todo o auxílio. Recomendo de olhos fechados — são profissionais de excelência.", autor: "Contabmax Serviços", cargo: "Cliente Padom Seguros" },
      { id: 2, texto: "Atendimento ágil e esclarecedor, sempre visando a melhor solução para o cliente. Pós-venda excelente, dando todo suporte e apoio necessário. Nota 10!", autor: "Daniele Rodrigues", cargo: "Cliente Padom Seguros" },
      { id: 3, texto: "Experiência excelente do início ao fim. Nos ajudaram em todo o processo, desde encontrar a melhor opção até a assinatura do contrato. Super recomendo!", autor: "Camila Barbosa", cargo: "Cliente Padom Seguros" }
    ],
  },

  // Mapa
  mapa: {
    exibir: true,
    latitude: -23.4668454,
    longitude: -46.6357171,
    titulo: "Padom Seguros - Zona Norte",
  },

  // Avaliações Google
  avaliacoes: {
    exibir: true,
    maxAvaliacoes: 3,
  },

  // FAQ
  faq: {
    titulo: "Perguntas que nossos clientes fazem antes de começar",
    itens: [
      { id: 1, pergunta: "Consórcio realmente faz sentido pra mim ou existem opções melhores no meu caso?", resposta: "Depende do seu perfil, objetivo e momento financeiro. Por isso fazemos uma análise individualizada antes de qualquer indicação — às vezes o consórcio é perfeito, outras vezes há uma estratégia ainda mais adequada para você." },
      { id: 2, pergunta: "Quanto tempo eu levaria, de verdade, para ser contemplado dentro do meu perfil?", resposta: "Analisamos grupos pelo percentual de lances e indicamos valores reais para sua contemplação. Temos mais de 95% de acerto no prazo estimado — porque nossa análise é baseada em dados, não em suposição." },
      { id: 3, pergunta: "Existe alguma estratégia para antecipar a contemplação ou isso depende só de sorte?", resposta: "Existe sim — e é exatamente o que fazemos. Monitoramos as assembleias, analisamos o comportamento do grupo e orientamos lances estratégicos para aumentar suas chances de contemplação antecipada." }
    ],
  },

  // CTA Final
  ctaFinal: {
    titulo: "Pronto para planejar sua aquisição com quem entende do assunto?",
    descricao: "Fale com um consultor Padom, apresente sua situação e receba um planejamento detalhado e gratuito. Sem compromisso, com transparência total.",
    botao: "Quero minha análise gratuita",
  },

  // Formulário (OBRIGATÓRIO)
  formulario: {
    exibir: true,
    titulo: "Fale com um consultor Padom",
    descricao: "Preencha o formulário",
    campos: [
      { name: "nome", type: "text", label: "Nome", placeholder: "Seu nome", required: true },
      { name: "email", type: "email", label: "E-mail", placeholder: "seu@email.com", required: true },
      { name: "telefone", type: "phone", label: "Telefone", placeholder: "(11) 99999-9999", required: false },
      { name: "mensagem", type: "textarea", label: "Mensagem", placeholder: "Sua mensagem", required: false },
    ],
    webhookUrl: "https://jobs.traveltec.com.br/webhook/recebe-forms",
    redirectUrl: "/obrigado",
    botaoTexto: "Enviar",
  },

  // Componentes opcionais (mostrar ou não)
  componentesOpcionais: {
    mapa: true,
    avaliacoes: true,
    comoFunciona: true,
    depoimentos: true,
    faq: true,
  },

  // WhatsApp (OBRIGATÓRIO)
  whatsapp: {
    numero: "5511968350088",
    mensagem: "Olá! Vim pelo site da Padom e gostaria de entender qual é o melhor consórcio para o meu perfil.",
  },

  // Página de Obrigado (OBRIGATÓRIO)
  paginaObrigado: {
    titulo: "Obrigado pelo contato!",
    descricao: "Recebemos sua mensagem e um consultor da Padom entrará em contato em breve. Se preferir falar agora, estamos no WhatsApp.",
    logoUrl: "/assets/logos/padom-logo.png",
    tempoRedirecionamento: 0,
    urlAposobrigado: "",
  },

  // Footer
  footer: {
    linksRapidos: ["Home", "Sobre", "Contato"],
    nomeEmpresa: "Padom Seguros",
    endereco: "Rua Carioba, 352 - Jardim Carlu - São Paulo/SP - CEP 02423-100",
    email: "contato@padomseguros.com.br",
    telefone: "(11) 96835-0088",
    redesSociais: {
      linkedin: "https://www.linkedin.com/company/padom-seguros/",
      instagram: "https://www.instagram.com/padomseguros/",
      facebook: "https://www.facebook.com/padomseguros/",
    },
    copyright: "© 2026 Padom Seguros. Todos os direitos reservados.",
  },

  // Analytics
  analytics: {
    googleAnalyticsId: "",
    googleTagManagerId: "GTM-PXWG9MP",
    pixelFacebook: "",
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
