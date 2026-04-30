import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

export default function Solucao({ config }: any) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToForm = () => {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Imagem da seção "Nossa abordagem" — imagem2.png subida pelo cliente
  const imgUrl = '/assets/imagens/imagem2.png';

  return (
    <section
      ref={ref}
      id="solucao"
      className="py-20 sm:py-24 bg-client-bg-white"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Imagem com bloco decorativo */}
          <div className="reveal relative hidden lg:block">
            <img
              src={imgUrl}
              alt="Consultoria Padom"
              className="w-full object-cover relative z-10"
              style={{
                height: '420px',
                borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(15,38,64,0.18)',
              }}
            />
            {/* Bloco decorativo navy → gold atrás */}
            <div
              className="absolute"
              style={{
                top: '-22px',
                right: '-22px',
                width: '140px',
                height: '140px',
                background: 'linear-gradient(135deg, #0F2640, #C9A84C)',
                borderRadius: '20px',
                zIndex: 1,
                opacity: 0.32,
              }}
            />
          </div>

          {/* Conteúdo */}
          <div className="reveal" style={{ transitionDelay: '120ms' }}>
            <span
              className="inline-block font-bold uppercase rounded-full mb-5"
              style={{
                fontSize: '11px',
                letterSpacing: '0.16em',
                color: '#C9A84C',
                background: 'rgba(201,168,76,0.12)',
                padding: '7px 16px',
              }}
            >
              Nossa abordagem
            </span>

            <h2
              className="font-display text-client-text-dark leading-tight mb-5"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)', lineHeight: 1.18 }}
            >
              {config.titulo}
            </h2>

            <p
              className="text-client-text leading-relaxed mb-8"
              style={{ fontSize: '1.05rem', maxWidth: '560px', lineHeight: 1.7 }}
            >
              {config.descricao}
            </p>

            <ul className="list-none flex flex-col gap-4 mb-9">
              {config.pontosChave.map((ponto: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-3.5 text-[0.98rem] leading-snug text-client-text-dark"
                >
                  <span
                    className="flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{
                      width: '24px',
                      height: '24px',
                      background: '#C9A84C',
                      borderRadius: '50%',
                      boxShadow: '0 2px 8px rgba(201,168,76,0.35)',
                    }}
                  >
                    <Check size={13} color="white" strokeWidth={3} />
                  </span>
                  <span>{ponto}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={scrollToForm}
              data-gtm-event="cta_solucao_click"
              data-gtm-label="CTA Solução"
              className="inline-flex items-center gap-2.5 bg-client-gold text-client-primary font-bold rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_0_40px_rgba(201,168,76,.35)] tracking-wide"
              style={{ padding: '16px 30px', fontSize: '15px' }}
            >
              Solicitar análise gratuita
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
