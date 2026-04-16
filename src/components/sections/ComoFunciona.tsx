import React, { useEffect, useRef } from 'react';

export default function ComoFunciona({ config }: any) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const stepTitles = ['Análise de perfil', 'Indicação estratégica', 'Acompanhamento'];

  return (
    <section ref={ref} id="como-funciona" className="py-24 bg-client-bg">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="text-center"><span className="section-label reveal">Processo</span></div>
        <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] text-client-text-dark text-center mb-4 reveal">{config.titulo}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-client-accent to-client-gold opacity-30" />

          {config.passos.map((passo: any, i: number) => (
            <div key={passo.numero} className={`text-center relative z-10 group reveal ${i === 0 ? 'reveal-delay-1' : i === 1 ? 'reveal-delay-2' : 'reveal-delay-3'}`}>
              <div className="w-20 h-20 bg-white border-[3px] border-client-accent rounded-full flex items-center justify-center mx-auto mb-6 font-display text-3xl text-client-primary shadow-[0_8px_30px_rgba(15,38,64,.12)] transition-all duration-400 group-hover:bg-client-primary group-hover:text-white group-hover:border-client-primary group-hover:scale-110">
                {passo.numero}
              </div>
              <h3 className="font-display text-lg text-client-primary mb-2">{stepTitles[i] || passo.titulo}</h3>
              <p className="text-[0.9rem] max-w-[280px] mx-auto">{passo.descricao.replace(/^[^—]*— /, '')}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
