import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

export default function Solucao({ config }: any) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="solucao" className="py-24 bg-client-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[rgba(44,95,138,.4)]" />
      <div className="max-w-[1200px] mx-auto px-8 relative z-10">
        <span className="section-label reveal" style={{ color: 'var(--gold)' }}>Nossa abordagem</span>
        <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] text-white mb-4 reveal">{config.titulo}</h2>
        <p className="text-[1.05rem] text-white/70 max-w-[600px] leading-relaxed reveal">{config.descricao}</p>

        <div className="mt-10 flex flex-col gap-5">
          {config.pontosChave.map((ponto: string, i: number) => (
            <div key={i} className={`flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/[0.08] hover:bg-white/10 hover:border-white/15 transition-all duration-300 reveal ${i === 0 ? 'reveal-delay-1' : i === 1 ? 'reveal-delay-2' : 'reveal-delay-3'}`}>
              <div className="w-7 h-7 bg-[rgba(201,168,76,.2)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 text-client-gold" />
              </div>
              <p className="text-white/85 text-[0.95rem]">{ponto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
