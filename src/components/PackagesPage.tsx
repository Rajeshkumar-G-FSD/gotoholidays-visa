import React from 'react';
import { ArrowUpRight, Compass } from 'lucide-react';
import { ActiveTab } from '../types';
import BlurText from './BlurText';
import SplitText from './SplitText';
import CountUp from './CountUp';
import { ThailandPackagesSection } from './ThailandPackagesSection';
import { GlobalPackagesSection } from './GlobalPackagesSection';
import { TestimonialsSection } from './TestimonialsSection';

interface PackagesPageProps {
  onNavigate: (tab: ActiveTab) => void;
  onEnquire: (name: string) => void;
}

const HERO_BG =
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=2000&h=1200&fit=crop&q=80&auto=format';

const TRUST = [
  { to: 120, suffix: '+', label: 'Curated Itineraries' },
  { to: 15000, suffix: '+', separator: ',', label: 'Travellers Hosted' },
  { to: 4.9, suffix: '/5', label: 'Average Rating' },
];

export const PackagesPage: React.FC<PackagesPageProps> = ({ onNavigate, onEnquire }) => {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="w-full">
      {/* Large Hero — same sapphire theme */}
      <section className="relative min-h-[86vh] w-full flex items-center overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_BG}
            alt="Luxury resort"
            className="w-full h-full object-cover object-center animate-kenburns"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/94 via-[#0f2b5c]/78 to-[#071326]/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc]/70 via-transparent to-[#0a192f]/50" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 text-left">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-blue-100 mb-6">
            Goto Holidays · Tour Desk
          </p>

          <BlurText
            as="h1"
            text="Tour Packages Built Around You"
            animateBy="words"
            direction="top"
            delay={90}
            className="text-4xl sm:text-6xl lg:text-7xl font-normal font-playfair italic leading-[1.08] text-white text-glow drop-shadow-xl max-w-3xl"
          />

          <SplitText
            tag="p"
            text="Seasonal Thailand escapes and curated global journeys — flights, stays, transfers and experiences handled by one dedicated planner."
            splitType="words"
            delay={15}
            duration={0.9}
            from={{ opacity: 0, y: 24 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="left"
            className="mt-6 max-w-2xl text-base sm:text-lg text-slate-100 font-manrope leading-relaxed drop-shadow !block"
          />

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollTo('thailand-packages')}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#0f2b5c] text-base font-bold hover:bg-blue-50 transition-all shadow-2xl cursor-pointer hover:scale-[1.02]"
            >
              <span>View Packages</span>
              <span className="w-8 h-8 rounded-full bg-[#1e40af] text-white flex items-center justify-center group-hover:bg-[#1d4ed8] transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>
            <button
              onClick={() => onNavigate('plan')}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white text-sm font-semibold transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#60a5fa]" />
              <span>Build a Custom Trip</span>
            </button>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-6">
            {TRUST.map((t) => (
              <div key={t.label} className="flex flex-col">
                <span className="flex items-baseline text-3xl sm:text-4xl font-bold text-white font-playfair tabular-nums">
                  <CountUp to={t.to} separator={t.separator ?? ''} duration={1.6} />
                  <span className="text-[#60a5fa]">{t.suffix}</span>
                </span>
                <span className="mt-1 text-[11px] uppercase tracking-[0.18em] text-blue-200 font-bold">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ThailandPackagesSection onEnquire={onEnquire} />
      <GlobalPackagesSection onSelect={onEnquire} />
      <TestimonialsSection />
    </div>
  );
};
