import React, { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { siteConfig } from '../../lib/config';

export default function Hero({ config }: any) {
  const sectionRef = useRef<HTMLElement>(null);

  const whatsappLink = `https://wa.me/${siteConfig.whatsapp.numero.replace(/\D/g, '')}?text=${encodeURIComponent(siteConfig.whatsapp.mensagem)}`;

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

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative overflow-hidden flex items-stretch bg-client-primary"
      style={{ minHeight: '92vh', paddingTop: '72px' }}
    >
      {/* Imagem como bg à direita (desktop) com fade do navy pra transparente */}
      <div
        className="absolute top-0 right-0 h-full hidden md:block"
        style={{
          width: '52%',
          backgroundImage: `url('${config.imagemUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, #0F2640 0%, rgba(15,38,64,0.55) 28%, rgba(15,38,64,0) 65%)',
            zIndex: 1,
          }}
        />
      </div>

      {/* Mobile: imagem como bg leve atrás do conteúdo */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          backgroundImage: `url('${config.imagemUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          opacity: 0.22,
          zIndex: 0,
        }}
      />

      {/* Overlay sutil de pontos pra textura no lado esquerdo */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,.5) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Conteúdo */}
      <div className="relative z-[3] max-w-[1200px] w-full mx-auto px-4 sm:px-8 flex items-center">
        <div className="flex flex-col items-start text-left py-16 md:py-20 lg:py-28 md:max-w-[580px]">
          {/* Badge gold */}
          <div className="inline-flex items-center gap-2 bg-[rgba(201,168,76,.15)] border border-[rgba(201,168,76,.3)] text-client-gold px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-7">
            <span className="text-client-gold">✦</span> Há 29 anos no mercado
          </div>

          {/* Título */}
          <h1
            className="font-display text-white leading-[1.1] mb-6 tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
          >
            {config.titulo}
          </h1>

          {/* Subtítulo */}
          <p
            className="text-white/75 leading-relaxed mb-10 max-w-[520px]"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.125rem)' }}
          >
            {config.subtitulo}
          </p>

          {/* CTAs */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={scrollToForm}
              data-gtm-event="cta_hero_click"
              data-gtm-label="Hero CTA Principal"
              className="inline-flex items-center gap-2 bg-client-gold text-client-primary px-7 sm:px-8 py-4 rounded-full font-bold text-base hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(201,168,76,.35)] transition-all duration-400 tracking-wide"
            >
              {config.cta}
              <ArrowRight className="w-[18px] h-[18px]" />
            </button>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              data-gtm-event="whatsapp_hero_click"
              data-gtm-label="WhatsApp Hero"
              className="inline-flex items-center gap-2 bg-transparent text-white font-semibold px-7 sm:px-8 py-4 rounded-full text-base hover:bg-white/10 transition-all duration-300 border-2 border-white/40 hover:border-white/70"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Falar no WhatsApp
            </a>
          </div>

          {/* Stats com border-top */}
          <div
            className="flex flex-wrap gap-6 sm:gap-10 mt-12 pt-10"
            style={{ borderTop: '1px solid rgba(255,255,255,0.18)' }}
          >
            <div>
              <div className="font-display text-client-gold leading-none counter" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }} data-target="29">0</div>
              <div className="text-xs text-white/55 uppercase tracking-[1.5px] mt-1.5 font-semibold">Anos de mercado</div>
            </div>
            <div>
              <div className="font-display text-client-gold leading-none" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
                95<span className="text-base">%</span>
              </div>
              <div className="text-xs text-white/55 uppercase tracking-[1.5px] mt-1.5 font-semibold">De acerto</div>
            </div>
            <div>
              <div className="font-display text-client-gold leading-none counter" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }} data-target="120">0</div>
              <div className="text-xs text-white/55 uppercase tracking-[1.5px] mt-1.5 font-semibold">Contemplados</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] text-white/40 text-xs uppercase tracking-[2px] flex flex-col items-center gap-2 animate-[pulse-scroll_2s_ease-in-out_infinite] hidden sm:flex">
        Saiba mais
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
}
