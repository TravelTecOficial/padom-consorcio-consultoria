import React, { useEffect, useRef } from 'react';
import { ArrowRight, Clock, Shield, Heart, ChevronDown } from 'lucide-react';

export default function Hero({ config }: any) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const counters = sectionRef.current?.querySelectorAll('.counter');
    counters?.forEach((el: any) => {
      const target = +el.dataset.target;
      const duration = 1500;
      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(animate);
        else el.textContent = target + '+';
      };
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { requestAnimationFrame(animate); observer.disconnect(); }
      }, { threshold: 0.5 });
      observer.observe(el);
    });
  }, []);

  const scrollToForm = () => {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToNextSection = () => {
    const heroHeight = sectionRef.current?.offsetHeight ?? window.innerHeight;
    window.scrollTo({ top: heroHeight, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center bg-client-primary overflow-hidden">
      <div className="absolute inset-0 opacity-30 blur-[1px]" style={{ background: `url('${config.imagemUrl}') center/cover no-repeat` }} />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F2640]/97 via-[#1B3A5C]/85 to-[#2C5F8A]/70 z-[1]" />
      <div className="absolute inset-0 z-[2] opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,.5) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative z-[3] max-w-[1200px] mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-32">
        <div className="pt-8">
          <div className="inline-flex items-center gap-2 bg-[rgba(201,168,76,.15)] border border-[rgba(201,168,76,.3)] text-client-gold px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6">
            ✦ Há 29 anos no mercado
          </div>

          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-white leading-[1.1] mb-6">
            Consórcio certo, no momento certo, <span className="text-client-gold">para você</span>
          </h1>

          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-[480px]">{config.subtitulo}</p>

          <div className="flex gap-4 flex-wrap mb-12">
            <button onClick={scrollToForm} className="inline-flex items-center gap-2 bg-client-gold text-client-primary px-8 py-4 rounded-full font-bold text-base hover:bg-white hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(74,144,196,.25)] transition-all duration-400 tracking-wide">
              {config.cta}
              <ArrowRight className="w-[18px] h-[18px]" />
            </button>
            <a href="https://wa.me/5511968350088?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Padom" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-transparent text-white px-8 py-4 rounded-full font-semibold text-base border-[1.5px] border-white/25 hover:border-white hover:bg-white/[0.08] transition-all duration-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-[18px] h-[18px]"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              WhatsApp
            </a>
          </div>

          <div className="flex gap-10">
            <div><div className="font-display text-[2.2rem] text-client-gold leading-none counter" data-target="29">0</div><div className="text-xs text-white/50 uppercase tracking-[1.5px] mt-1 font-semibold">Anos de mercado</div></div>
            <div><div className="font-display text-[2.2rem] text-client-gold leading-none">95<span className="text-lg">%</span></div><div className="text-xs text-white/50 uppercase tracking-[1.5px] mt-1 font-semibold">De acerto</div></div>
            <div><div className="font-display text-[2.2rem] text-client-gold leading-none counter" data-target="120">0</div><div className="text-xs text-white/50 uppercase tracking-[1.5px] mt-1 font-semibold">Contemplados</div></div>
          </div>
        </div>

        <div className="relative hidden lg:flex justify-center items-end">
          <img src={config.imagemUrl} alt="Consultor Padom" className="w-full max-w-[480px] rounded-t-[20px] object-cover h-[550px] shadow-[0_-20px_60px_rgba(0,0,0,.3)]" />
          <div className="absolute top-[15%] -left-8 bg-white/10 backdrop-blur-xl border border-white/15 rounded-xl px-4 py-3 flex items-center gap-3 animate-[float_4s_ease-in-out_infinite]">
            <Clock className="w-8 h-8 text-client-gold" /><div><div className="text-xs text-white font-semibold">95% de acerto</div><div className="text-[11px] text-white/60">Prazo de contemplação</div></div>
          </div>
          <div className="absolute top-[45%] -right-5 bg-white/10 backdrop-blur-xl border border-white/15 rounded-xl px-4 py-3 flex items-center gap-3 animate-[float_4s_ease-in-out_infinite_1.5s]">
            <Shield className="w-8 h-8 text-client-gold" /><div><div className="text-xs text-white font-semibold">29 anos</div><div className="text-[11px] text-white/60">De experiência</div></div>
          </div>
          <div className="absolute bottom-[20%] -left-5 bg-white/10 backdrop-blur-xl border border-white/15 rounded-xl px-4 py-3 flex items-center gap-3 animate-[float_4s_ease-in-out_infinite_3s]">
            <Heart className="w-8 h-8 text-client-gold" /><div><div className="text-xs text-white font-semibold">R$ 15M+</div><div className="text-[11px] text-white/60">Em cotas gerenciadas</div></div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToNextSection}
        aria-label="Rolar para a próxima seção"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] text-white/40 hover:text-client-gold text-xs uppercase tracking-[2px] flex flex-col items-center gap-2 animate-[pulse-scroll_2s_ease-in-out_infinite] cursor-pointer bg-transparent border-0 transition-colors duration-300"
      >
        Saiba mais
        <ChevronDown className="w-5 h-5" />
      </button>
    </section>
  );
}
