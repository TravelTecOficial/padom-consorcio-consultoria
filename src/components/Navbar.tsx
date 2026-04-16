import React, { useEffect, useState } from 'react';

export default function Navbar({ telefone, whatsappMsg }: any) {
  const [scrolled, setScrolled] = useState(false);
  const whatsappLink = `https://wa.me/${telefone.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMsg)}`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-client-primary/95 backdrop-blur-xl py-3 shadow-[0_4px_30px_rgba(0,0,0,.2)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-8 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img src="/assets/logos/padom-logo.png" alt="Padom" className="h-9 brightness-0 invert" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo('problemas')} className="text-white/75 text-sm font-medium hover:text-white transition-colors tracking-wide">Desafios</button>
          <button onClick={() => scrollTo('solucao')} className="text-white/75 text-sm font-medium hover:text-white transition-colors tracking-wide">Solução</button>
          <button onClick={() => scrollTo('beneficios')} className="text-white/75 text-sm font-medium hover:text-white transition-colors tracking-wide">Benefícios</button>
          <button onClick={() => scrollTo('faq')} className="text-white/75 text-sm font-medium hover:text-white transition-colors tracking-wide">FAQ</button>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-client-gold text-client-primary px-6 py-2.5 rounded-full font-bold text-sm tracking-wide hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(74,144,196,.25)] transition-all duration-300"
          >
            Fale conosco
          </a>
        </div>
      </div>
    </nav>
  );
}
