import React from 'react';
import { Users, Star, Globe2, Headphones, LucideIcon } from 'lucide-react';
import CountUp from './CountUp';

interface Stat {
  icon: LucideIcon;
  to: number;
  from?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  label: string;
  featured?: boolean;
}

const STATS: Stat[] = [
  { icon: Users, to: 5000, suffix: '+', separator: ',', label: 'Happy Travelers' },
  { icon: Star, to: 10, suffix: '+', label: 'Years Experience' },
  { icon: Globe2, to: 40, suffix: '+', label: 'Countries Served', featured: true },
  { icon: Headphones, to: 24, suffix: '/7', label: 'Support' },
];

export const StatsBand: React.FC = () => {
  return (
    <section className="relative -mt-2 px-4 sm:px-6 lg:px-12 py-14 sm:py-16 bg-white border-y border-blue-100/70">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`group flex flex-col items-center text-center gap-3 rounded-3xl px-4 py-8 transition-all duration-300 ${
                stat.featured
                  ? 'bg-gradient-to-b from-blue-50 to-white border border-blue-200 shadow-lg shadow-blue-950/5'
                  : 'border border-transparent hover:border-blue-100 hover:bg-blue-50/40'
              }`}
            >
              <span className="w-14 h-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1e40af] shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
                <Icon className="w-6 h-6" strokeWidth={1.75} />
              </span>

              <div className="flex items-baseline justify-center font-playfair font-bold tracking-tight text-3xl sm:text-4xl lg:text-[2.75rem] leading-none text-[#0f172a]">
                {stat.prefix && <span>{stat.prefix}</span>}
                <CountUp
                  to={stat.to}
                  from={stat.from ?? 0}
                  separator={stat.separator ?? ''}
                  duration={1.5}
                  className="tabular-nums"
                />
                {stat.suffix && <span className="text-[#1e40af]">{stat.suffix}</span>}
              </div>

              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
