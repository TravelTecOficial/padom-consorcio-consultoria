import React, { useEffect, useState } from 'react';

export default function Navbar({ telefone, whatsappMsg }: any) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const whatsappLink = `https://wa.me/${telefone.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMsg)}`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const navLinks = [
    { label: 'Desafios',   id: 'problemas'    },
    { label: 'Solução',    id: 'solucao'       },
    { label: 'Benefícios', id: 'beneficios'    },
    { label: 'FAQ',        id: 'faq'           },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled || menuOpen
          ? 'bg-client-primary/97 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,.2)]'
          : 'bg-transparent'
      } ${scrolled ? 'py-3' : 'py-5'}`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 flex-shrink-0">
          <img src="/assets/logos/logo-principal.png" alt="Logo" className="h-8 sm:h-9 brightness-0 invert" />
        </a>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-white/75 text-sm font-medium hover:text-white transition-colors tracking-wide"
            >
              {link.label}
            </button>
          ))}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-client-gold text-client-primary px-6 py-2.5 rounded-full font-bold text-sm tracking-wide hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(74,144,196,.25)] transition-all duration-300"
          >
            Fale conosco
          </a>
        </div>

        {/* Hamburger button — mobile only */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          className="md:hidden flex flex-col justify-center gap-[5px] w-10 h-10 p-2 -mr-2"
        >
          <span className={`block h-[2px] w-6 bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block h-[2px] bg-white rounded-full transition-all duration-300 ${menuOpen ? 'w-0 opacity-0' : 'w-6 opacity-100'}`} />
          <span className={`block h-[2px] w-6 bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu panel */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="border-t border-white/10 px-4 py-4 flex flex-col gap-1">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-left text-white/80 text-base font-medium hover:text-white hover:bg-white/5 transition-all px-3 py-3 rounded-xl"
            >
              {link.label}
            </button>
          ))}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-2 bg-client-gold text-client-primary px-6 py-3.5 rounded-full font-bold text-sm text-center tracking-wide hover:bg-white transition-all duration-300"
          >
            Fale conosco
          </a>
        </div>
      </div>
    </nav>
  );
}
