import React from 'react';
import { Star } from 'lucide-react';

export default function Avaliacoes({ config }: any) {
  return (
    <section className="py-24 px-6 bg-client-primary relative overflow-hidden text-client-bg">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-client-accent rounded-full blur-3xl -mr-48"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16 text-center animate-in">
          <h2 className="font-display text-5xl md:text-6xl font-bold leading-tight mb-6 text-client-gold">
            Avaliado com 5 estrelas
          </h2>
          <p className="text-xl text-client-bg/90">
            Mais de 120 clientes satisfeitos no Google
          </p>
        </div>

        {/* Rating display */}
        <div className="flex justify-center mb-16 animate-in" style={{ animationDelay: '0.2s' }}>
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-10 h-10 fill-client-accent text-client-accent" />
              ))}
            </div>
            <p className="font-display text-5xl font-bold text-client-accent mb-2">5.0</p>
            <p className="text-client-bg/80">em 120+ avaliações</p>
          </div>
        </div>

        {/* Reviews showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { name: "Contabmax Serviços", text: "Profissionais de excelência" },
            { name: "Daniele Rodrigues", text: "Pós-venda excelente" },
            { name: "Diego Campos", text: "Equipe muito profissional" }
          ].map((review, idx) => (
            <div
              key={idx}
              className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-client-accent/30 animate-in card-hover"
              style={{ animationDelay: `${(idx + 3) * 0.1}s` }}
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-client-accent text-client-accent" />
                ))}
              </div>
              <p className="text-client-bg/90 text-sm mb-3">{review.text}</p>
              <p className="font-bold text-client-accent">{review.name}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-client-bg/80">
            Confira nossas avaliações no <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="text-client-accent font-bold hover:underline">Google</a>
          </p>
        </div>
      </div>
    </section>
  );
}
