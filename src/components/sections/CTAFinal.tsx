import React, { useEffect, useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function CTAFinal({ config }: any) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToForm = () => {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="py-20 bg-client-primary relative overflow-hidden text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(74,144,196,.2)_0%,transparent_60%)]" />
      <div className="max-w-[1200px] mx-auto px-8 relative z-10">
        <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] text-white max-w-[600px] mx-auto mb-4 reveal">{config.titulo}</h2>
        <p className="text-[1.05rem] text-white/70 max-w-[500px] mx-auto mb-10 leading-relaxed reveal">{config.descricao}</p>

        <div className="reveal">
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 bg-client-gold text-client-primary px-8 py-4 rounded-full font-bold text-base hover:bg-white hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(74,144,196,.25)] transition-all duration-400 tracking-wide"
          >
            {config.botao}
            <ArrowRight className="w-[18px] h-[18px]" />
          </button>
        </div>

        <div className="flex justify-center gap-8 mt-8 reveal">
          {['Sem compromisso', 'Análise gratuita', 'Consultores especializados'].map((text, i) => (
            <div key={i} className="flex items-center gap-1.5 text-white/50 text-sm font-medium">
              <Check className="w-4 h-4 text-client-gold" /> {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
