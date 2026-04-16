import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ({ config }: any) {
  const [openId, setOpenId] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="faq" className="py-24 bg-client-bg">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="text-center"><span className="section-label reveal">Tire suas dúvidas</span></div>
        <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] text-client-text-dark text-center mb-4 reveal">{config.titulo}</h2>

        <div className="max-w-[800px] mx-auto mt-12 flex flex-col gap-4">
          {config.itens.map((item: any, i: number) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className={`bg-white rounded-xl overflow-hidden border transition-all duration-300 ${isOpen ? 'border-client-accent' : 'border-[rgba(15,38,64,.06)] hover:border-client-accent'} reveal ${i === 0 ? 'reveal-delay-1' : i === 1 ? 'reveal-delay-2' : 'reveal-delay-3'}`}>
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-client-primary text-base hover:text-client-accent transition-colors"
                >
                  {item.pergunta}
                  <ChevronDown className={`w-5 h-5 text-client-accent flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-400 ${isOpen ? 'max-h-[300px] pb-6 px-6' : 'max-h-0'}`}>
                  <p className="text-[0.95rem] leading-relaxed">{item.resposta}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
