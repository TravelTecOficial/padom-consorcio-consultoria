import React, { useEffect, useRef } from 'react';
import { ContactForm } from '@landing-pages/shared-components';
import { MapPin, Phone, Mail } from 'lucide-react';
import { siteConfig } from '../../lib/config';

export default function Formulario({ config }: any) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="formulario" className="py-20 bg-client-bg-white">
      <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Contact info */}
        <div className="reveal">
          <span className="section-label">Fale conosco</span>
          <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] text-client-text-dark mb-4">Receba uma análise personalizada do seu perfil</h2>
          <p className="text-[1.05rem] leading-relaxed mb-8 max-w-[600px]">Preencha o formulário e um consultor Padom entrará em contato para entender sua situação e apresentar as melhores opções.</p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-client-accent" />
              <span className="text-[0.95rem]">{siteConfig.footer.endereco}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-client-accent" />
              <span className="text-[0.95rem]">{siteConfig.footer.telefone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-client-accent" />
              <span className="text-[0.95rem]">{siteConfig.footer.email}</span>
            </div>
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-[20px] p-10 shadow-[0_20px_60px_rgba(15,38,64,.18)] border border-[rgba(15,38,64,.06)] reveal">
          <h3 className="font-display text-xl text-client-primary mb-1">Solicitar análise gratuita</h3>
          <p className="text-sm text-client-text mb-6">Sem compromisso. Seus dados são 100% seguros.</p>
          <ContactForm
            fields={config.campos}
            webhookUrl={config.webhookUrl}
            redirectUrl={config.redirectUrl}
            buttonText={config.botaoTexto}
          />
        </div>
      </div>
    </section>
  );
}
