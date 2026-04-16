import React from 'react';
import { GoogleMap } from '@landing-pages/shared-components';
import { MapPin } from 'lucide-react';

export default function Mapa({ config }: any) {
  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-client-accent/5 rounded-full blur-3xl -ml-48"></div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16 text-center animate-in">
          <div className="flex justify-center mb-4">
            <div className="bg-client-accent/20 p-4 rounded-full">
              <MapPin className="w-8 h-8 text-client-accent" />
            </div>
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-client-primary font-bold leading-tight">
            {config.titulo}
          </h2>
        </div>

        {/* Map container */}
        <div className="rounded-2xl overflow-hidden shadow-xl card-hover">
          <GoogleMap
            latitude={config.latitude}
            longitude={config.longitude}
            title={config.titulo}
            height="500px"
          />
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center">
          <p className="text-client-text/70">
            Zona Norte de São Paulo • Atendimento presencial e online
          </p>
        </div>
      </div>
    </section>
  );
}
