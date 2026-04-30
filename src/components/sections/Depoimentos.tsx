import React, { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

export default function Depoimentos({ config }: any) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const getInitials = (name: string) => name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <section ref={ref} id="depoimentos" className="py-16 sm:py-24 bg-client-bg-white relative overflow-hidden">
      {/* Decorative quote — hidden on mobile to avoid overflow */}
      <div className="hidden sm:block absolute -top-10 right-[5%] text-[400px] font-display text-client-accent/[0.04] leading-none z-0 select-none pointer-events-none">"</div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 relative z-10">
        <span className="section-label reveal">Clientes satisfeitos</span>
        <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] text-client-text-dark mb-4 reveal">{config.titulo}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-12">
          {config.itens.map((item: any, i: number) => (
            <div key={item.id} className={`bg-white rounded-[20px] p-6 sm:p-8 border border-[rgba(15,38,64,.06)] transition-all duration-400 hover:shadow-[0_20px_60px_rgba(15,38,64,.18)] hover:-translate-y-1 relative reveal ${i === 0 ? 'reveal-delay-1' : i === 1 ? 'reveal-delay-2' : 'reveal-delay-3'}`}>
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-client-gold fill-client-gold" />
                ))}
              </div>
              <p className="text-[0.95rem] leading-relaxed italic mb-6">"{item.texto}"</p>
              <div className="flex items-center gap-3 border-t border-[rgba(15,38,64,.06)] pt-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 bg-gradient-to-br from-client-accent to-client-secondary rounded-full flex items-center justify-center text-sm font-bold text-white">
                  {getInitials(item.autor)}
                </div>
                <div>
                  <div className="font-bold text-sm text-client-primary">{item.autor}</div>
                  <div className="text-xs text-client-text">{item.cargo}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
