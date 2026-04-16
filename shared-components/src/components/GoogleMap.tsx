import React from 'react';
import type { GoogleMapProps } from '../types';

export const GoogleMap: React.FC<GoogleMapProps> = ({
  latitude,
  longitude,
  title,
  height = '400px',
  zoom = 15,
}) => {
  // Usar embed do Google Maps
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.567!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${latitude}%2C${longitude}!5e0!3m2!1spt-BR!2sbr!4v${Date.now()}`;

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg">
      <iframe
        width="100%"
        height={height}
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={embedUrl}
        title={title}
        allowFullScreen={true}
        aria-label={title}
      />
    </div>
  );
};
