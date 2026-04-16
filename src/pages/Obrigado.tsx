import React from 'react';
import { siteConfig } from '../lib/config';

export default function Obrigado() {
  const whatsappLink = `https://wa.me/${siteConfig.whatsapp.numero}?text=${encodeURIComponent(siteConfig.whatsapp.mensagem)}`;

  return (
    <div className="min-h-screen bg-client-bg flex items-center justify-center px-6">
      <div className="bg-white rounded-[20px] p-12 max-w-lg w-full text-center shadow-[0_20px_60px_rgba(15,38,64,.12)] border border-[rgba(15,38,64,.06)]">
        {siteConfig.paginaObrigado.logoUrl && (
          <img src={siteConfig.paginaObrigado.logoUrl} alt={siteConfig.footer.nomeEmpresa} className="h-12 mx-auto mb-8" />
        )}

        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-display text-3xl text-client-primary mb-4">{siteConfig.paginaObrigado.titulo}</h1>
        <p className="text-[1rem] leading-relaxed mb-8">{siteConfig.paginaObrigado.descricao}</p>

        <div className="flex flex-col gap-3">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#20bd5a] transition-all duration-300"
          >
            Falar no WhatsApp
          </a>
          <a href="/" className="text-sm text-client-accent hover:text-client-primary transition-colors font-medium">
            Voltar ao site
          </a>
        </div>
      </div>
    </div>
  );
}
