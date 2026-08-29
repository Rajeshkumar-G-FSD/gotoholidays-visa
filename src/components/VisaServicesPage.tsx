import React from 'react';
import { ArrowUpRight, ShieldCheck, Headphones } from 'lucide-react';
import { ActiveTab } from '../types';
import BlurText from './BlurText';
import SplitText from './SplitText';
import CountUp from './CountUp';
import { VisaServicesSection } from './VisaServicesSection';

interface VisaServicesPageProps {
  onNavigate: (tab: ActiveTab) => void;
  onApply: (visaName: string) => void;
}

const HERO_BG =
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=2000&h=1200&fit=crop&q=80&auto=format';

const TRUST = [
  { to: 100, suffix: '+', label: 'Countries Covered' },
  { to: 99.9, suffix: '%', label: 'Success Rate' },
  { to: 50000, suffix: '+', separator: ',', label: 'Visas Approved' },
];

export const VisaServicesPage: React.FC<VisaServicesPageProps> = ({ onNavigate, onApply }) => {
  const scrollToServices = () => {
    document.getElementById('visa-services-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* Large Hero */}
      <section className="relative min-h-[86vh] w-full flex items-center overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_BG}
            alt="Global travel"
            className="w-full h-full object-cover object-center animate-kenburns"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/94 via-[#0f2b5c]/78 to-[#071326]/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc]/70 via-transparent to-[#0a192f]/50" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 text-left">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-blue-100 mb-6">
            Goto Holidays · Visa Desk
          </p>

          <BlurText
            as="h1"
            text="Global Visa Services, Handled End to End"
            animateBy="words"
            direction="top"
            delay={90}
            className="text-4xl sm:text-6xl lg:text-7xl font-normal font-playfair italic leading-[1.08] text-white text-glow drop-shadow-xl max-w-3xl"
          />

          <SplitText
            tag="p"
            text="From document checklists to interview coaching, our specialists manage every step so your approval is the only thing you think about."
            splitType="words"
            delay={16}
            duration={0.9}
            from={{ opacity: 0, y: 24 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="left"
            className="mt-6 max-w-2xl text-base sm:text-lg text-slate-100 font-manrope leading-relaxed drop-shadow !block"
          />

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToServices}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#0f2b5c] text-base font-bold hover:bg-blue-50 transition-all shadow-2xl cursor-pointer hover:scale-[1.02]"
            >
              <span>Explore Visa Services</span>
              <span className="w-8 h-8 rounded-full bg-[#1e40af] text-white flex items-center justify-center group-hover:bg-[#1d4ed8] transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white text-sm font-semibold transition-all cursor-pointer"
            >
              <Headphones className="w-4 h-4 text-[#60a5fa]" />
              <span>Talk to an Expert</span>
            </button>
          </div>

          {/* Trust stats with count-up */}
          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-6">
            {TRUST.map((t) => (
              <div key={t.label} className="flex flex-col">
                <span className="flex items-baseline text-3xl sm:text-4xl font-bold text-white font-playfair tabular-nums">
                  <CountUp to={t.to} separator={t.separator ?? ''} duration={1.6} />
                  <span className="text-[#60a5fa]">{t.suffix}</span>
                </span>
                <span className="mt-1 text-[11px] uppercase tracking-[0.18em] text-blue-200 font-bold">
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assurance strip */}
      <div className="bg-white border-b border-blue-100/70 py-5 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-xs sm:text-sm text-slate-600 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          Transparent pricing · No approval, full refund · Dedicated case manager
        </div>
      </div>

      {/* Reused services grid */}
      <VisaServicesSection onApply={onApply} showViewAll={false} />
    </div>
  );
};
