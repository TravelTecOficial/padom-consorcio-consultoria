import React, { useEffect, useRef } from 'react';
import { AlertCircle, AlertTriangle, Activity } from 'lucide-react';

const icons = [AlertCircle, AlertTriangle, Activity];

export default function Problemas({ config }: any) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="problemas" className="py-16 sm:py-24 bg-client-bg relative overflow-hidden">
      <div className="absolute -top-[100px] -right-[100px] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(74,144,196,.08)_0%,transparent_70%)] rounded-full" />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="reveal"><span className="section-label">O cenário atual</span></div>
        <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] text-client-text-dark mb-4 reveal">{config.titulo}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-12">
          {config.itens.map((item: any, i: number) => {
            const Icon = icons[i] || AlertCircle;
            return (
              <div key={item.id} className={`group bg-white rounded-[20px] p-6 sm:p-8 relative overflow-hidden transition-all duration-400 border border-[rgba(15,38,64,.06)] hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(15,38,64,.18)] hover:border-client-accent reveal ${i === 0 ? 'reveal-delay-1' : i === 1 ? 'reveal-delay-2' : 'reveal-delay-3'}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-client-accent to-client-accent-light origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400" />
                <div className="w-12 h-12 bg-client-accent/10 rounded-xl flex items-center justify-center mb-5"><Icon className="w-6 h-6 text-client-accent" /></div>
                <h3 className="font-display text-lg text-client-primary mb-2">{item.titulo || `Problema ${i + 1}`}</h3>
                <p className="text-[0.95rem] leading-relaxed">{item.descricao}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
