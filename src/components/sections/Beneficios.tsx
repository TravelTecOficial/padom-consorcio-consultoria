import React, { useEffect, useRef } from 'react';
import {
  Target, Shield, Heart, Rocket, Zap, Award, Check, Star,
  Users, Clock, MapPin, Phone, Mail, DollarSign, TrendingUp,
  ThumbsUp, BarChart, Lock, Globe, Home, Building, Car,
  Plane, Compass, Briefcase, Handshake, Trophy, Lightbulb,
} from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  target: Target, shield: Shield, heart: Heart, rocket: Rocket,
  zap: Zap, award: Award, check: Check, star: Star,
  users: Users, clock: Clock, 'map-pin': MapPin, phone: Phone,
  mail: Mail, 'dollar-sign': DollarSign, 'trending-up': TrendingUp,
  'thumbs-up': ThumbsUp, 'bar-chart': BarChart, lock: Lock,
  globe: Globe, home: Home, building: Building, car: Car,
  plane: Plane, compass: Compass, briefcase: Briefcase, handshake: Handshake,
  trophy: Trophy, lightbulb: Lightbulb,
};

export default function Beneficios({ config }: any) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="beneficios" className="py-16 sm:py-24 bg-client-bg-white relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <span className="section-label reveal">Por que escolher</span>
        <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] text-client-text-dark mb-4 reveal">{config.titulo}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-12">
          {config.itens.map((item: any, i: number) => {
            const Icon = iconMap[item.icone] || Target;
            return (
              <div key={item.id} className={`group bg-white rounded-[20px] p-6 sm:p-10 text-center transition-all duration-400 border border-[rgba(15,38,64,.06)] hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(15,38,64,.18)] relative overflow-hidden reveal ${i === 0 ? 'reveal-delay-1' : i === 1 ? 'reveal-delay-2' : 'reveal-delay-3'}`}>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-client-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400" />
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-client-primary to-client-secondary rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6 shadow-[0_8px_20px_rgba(15,38,64,.2)]">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="font-display text-lg sm:text-xl text-client-primary mb-3">{item.titulo}</h3>
                <p className="text-[0.9rem] leading-relaxed">{item.descricao}</p>
              </div>
            );
          })}
        </div>

        {/* Stats bar */}
        {config.stats && config.stats.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mt-12 sm:mt-16 p-6 sm:p-12 bg-client-primary rounded-[20px] text-center reveal">
            {config.stats.map((stat: any) => (
              <div key={stat.id}>
                <div className="font-display text-[clamp(1.6rem,4vw,2.5rem)] text-client-gold">{stat.valor}</div>
                <div className="text-[0.65rem] sm:text-xs text-white/50 uppercase tracking-[1.5px] mt-1 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
