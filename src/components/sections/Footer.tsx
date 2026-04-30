import React from 'react';

export default function Footer({ config }: any) {
  const scrollToForm = () => {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-client-text-dark text-white/60 pt-12 sm:pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
          {/* Brand */}
          <div>
            <div className="font-display text-xl sm:text-2xl text-white mb-3">{config.nomeEmpresa}</div>
            {config.endereco && <p className="text-[0.85rem] leading-relaxed mt-2">{config.endereco}</p>}
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-body text-xs font-bold uppercase tracking-[1.5px] mb-4">Navegação</h4>
            <ul className="space-y-2">
              {['Desafios', 'Solução', 'Benefícios', 'Como funciona', 'FAQ'].map((link, i) => (
                <li key={i}><a href={`#${['problemas','solucao','beneficios','como-funciona','faq'][i]}`} className="text-sm hover:text-client-gold transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-body text-xs font-bold uppercase tracking-[1.5px] mb-4">Contato</h4>
            <ul className="space-y-2">
              {config.telefone && <li><a href={`tel:${config.telefone}`} className="text-sm hover:text-client-gold transition-colors">{config.telefone}</a></li>}
              {config.email && <li><a href={`mailto:${config.email}`} className="text-sm hover:text-client-gold transition-colors break-all">{config.email}</a></li>}
            </ul>
          </div>

          {/* CTA box */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 sm:p-6">
            <h4 className="text-white font-body text-xs font-bold uppercase tracking-[1.5px] mb-2">Pronto para começar?</h4>
            <p className="text-[0.85rem] mb-4">Solicite sua análise gratuita agora mesmo.</p>
            <button
              onClick={scrollToForm}
              className="bg-client-gold text-client-primary px-5 py-2.5 rounded-full font-bold text-sm tracking-wide hover:bg-white transition-all duration-300 min-h-[44px]"
            >
              Solicitar contato
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <span className="text-center sm:text-left">{config.copyright}</span>
          <div className="flex gap-3">
            {config.redesSociais && Object.entries(config.redesSociais).map(([rede, url]: any) => (
              url && url !== '#' && (
                <a key={rede} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/[0.06] rounded-full flex items-center justify-center hover:bg-client-gold hover:text-client-primary transition-all duration-300">
                  {rede === 'instagram' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  )}
                  {rede === 'facebook' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  )}
                  {rede === 'linkedin' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  )}
                </a>
              )
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
