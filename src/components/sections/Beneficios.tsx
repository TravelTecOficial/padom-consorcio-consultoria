import React, { useEffect, useRef } from 'react';
import { Target, Shield, Heart } from 'lucide-react';

const iconMap: { [key: string]: any } = { target: Target, shield: Shield, heart: Heart };

export default function Beneficios({ config }: any) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="beneficios" className="py-24 bg-client-bg-white relative">
      <div className="max-w-[1200px] mx-auto px-8">
        <span className="section-label reveal">Por que a Padom</span>
        <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] text-client-text-dark mb-4 reveal">{config.titulo}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {config.itens.map((item: any, i: number) => {
            const Icon = iconMap[item.icone] || Target;
            return (
              <div key={item.id} className={`group bg-white rounded-[20px] p-10 text-center transition-all duration-400 border border-[rgba(15,38,64,.06)] hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(15,38,64,.18)] relative overflow-hidden reveal ${i === 0 ? 'reveal-delay-1' : i === 1 ? 'reveal-delay-2' : 'reveal-delay-3'}`}>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-client-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400" />
                <div className="w-16 h-16 bg-gradient-to-br from-client-primary to-client-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_8px_20px_rgba(15,38,64,.2)]">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-xl text-client-primary mb-3">{item.titulo}</h3>
                <p className="text-[0.9rem] leading-relaxed">{item.descricao}</p>
              </div>
            );
          })}
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 p-12 bg-client-primary rounded-[20px] text-center reveal">
          <div><div className="font-display text-[2.5rem] text-client-gold">R$ 15M</div><div className="text-xs text-white/50 uppercase tracking-[1.5px] mt-1 font-semibold">Em cotas gerenciadas</div></div>
          <div><div className="font-display text-[2.5rem] text-client-gold">120+</div><div className="text-xs text-white/50 uppercase tracking-[1.5px] mt-1 font-semibold">Clientes contemplados</div></div>
          <div><div className="font-display text-[2.5rem] text-client-gold">95%</div><div className="text-xs text-white/50 uppercase tracking-[1.5px] mt-1 font-semibold">De acerto</div></div>
          <div><div className="font-display text-[2.5rem] text-client-gold">5★</div><div className="text-xs text-white/50 uppercase tracking-[1.5px] mt-1 font-semibold">No Google</div></div>
        </div>
      </div>
    </section>
  );
}
