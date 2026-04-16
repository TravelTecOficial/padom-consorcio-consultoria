import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { siteConfig } from './lib/config';
import { WhatsAppButton } from './components/WhatsAppButton';
import Navbar from './components/Navbar';

// Componentes de seções
import Hero from './components/sections/Hero';
import Problemas from './components/sections/Problemas';
import Solucao from './components/sections/Solucao';
import Beneficios from './components/sections/Beneficios';
import ComoFunciona from './components/sections/ComoFunciona';
import Depoimentos from './components/sections/Depoimentos';
import Mapa from './components/sections/Mapa';
import Avaliacoes from './components/sections/Avaliacoes';
import FAQ from './components/sections/FAQ';
import CTAFinal from './components/sections/CTAFinal';
import Formulario from './components/sections/Formulario';
import Footer from './components/sections/Footer';

// Páginas
import Obrigado from './pages/Obrigado';

function HomePage() {
  const secoes: { [key: string]: React.ReactNode } = {
    hero: <Hero config={siteConfig.hero} />,
    problemas: <Problemas config={siteConfig.problemas} />,
    solucao: <Solucao config={siteConfig.solucao} />,
    beneficios: <Beneficios config={siteConfig.beneficios} />,
    comoFunciona: siteConfig.componentesOpcionais.comoFunciona ? <ComoFunciona config={siteConfig.comoFunciona} /> : null,
    depoimentos: siteConfig.componentesOpcionais.depoimentos ? <Depoimentos config={siteConfig.depoimentos} /> : null,
    mapa: siteConfig.componentesOpcionais.mapa && siteConfig.mapa.exibir ? <Mapa config={siteConfig.mapa} /> : null,
    avaliacoes: siteConfig.componentesOpcionais.avaliacoes && siteConfig.avaliacoes.exibir ? <Avaliacoes config={siteConfig.avaliacoes} /> : null,
    faq: siteConfig.componentesOpcionais.faq ? <FAQ config={siteConfig.faq} /> : null,
    ctaFinal: <CTAFinal config={siteConfig.ctaFinal} />,
    formulario: siteConfig.formulario.exibir ? <Formulario config={siteConfig.formulario} /> : null,
  };

  return (
    <main className="w-full">
      <Navbar telefone={siteConfig.whatsapp.numero} whatsappMsg={siteConfig.whatsapp.mensagem} />
      {siteConfig.secoes.map((secao) => (
        <div key={secao}>
          {secoes[secao]}
        </div>
      ))}
      <Footer config={siteConfig.footer} />

      {/* WhatsApp Button - SEMPRE EXIBIDO */}
      <WhatsAppButton
        numero={siteConfig.whatsapp.numero}
        mensagem={siteConfig.whatsapp.mensagem}
      />
    </main>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/obrigado" element={<Obrigado />} />
      </Routes>
    </Router>
  );
}

export default App;
