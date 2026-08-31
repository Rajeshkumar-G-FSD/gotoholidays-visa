import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, ArrowLeft, MapPin } from 'lucide-react';
import { DESTINATION_PACKAGES } from '../data/travelData';
import { ActiveTab } from '../types';
import BlurText from './BlurText';
import SplitText from './SplitText';
import Reveal from './Reveal';

interface DestinationDetailPageProps {
  destinationId: string | null;
  onNavigate: (tab: ActiveTab) => void;
  onEnquire: (name: string) => void;
}

const inr = (n: number) => '₹' + n.toLocaleString('en-IN');

export const DestinationDetailPage: React.FC<DestinationDetailPageProps> = ({
  destinationId,
  onNavigate,
  onEnquire,
}) => {
  const dest =
    DESTINATION_PACKAGES.find((d) => d.id === destinationId) || DESTINATION_PACKAGES[0];

  const stats = [
    { label: 'Package Price', value: inr(dest.price), sub: inr(dest.originalPrice), note: 'per person', accent: true },
    { label: 'Duration', value: `${dest.nights}N / ${dest.days}D` },
    { label: 'Best Time', value: dest.bestTime },
    { label: 'Currency', value: dest.currency },
    { label: 'Visa', value: dest.visa },
  ];

  const scrollToRoadmap = () =>
    document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' });

  // Scroll-driven progress fill for the roadmap timeline line.
  const timelineRef = useRef<HTMLDivElement>(null);
  const [fillPct, setFillPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = timelineRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.5;
      const pct = ((anchor - rect.top) / rect.height) * 100;
      setFillPct(Math.max(0, Math.min(100, pct)));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [destinationId]);

  return (
    <div className="w-full">
      {/* Large Hero */}
      <section className="relative min-h-[90vh] w-full flex items-center overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src={dest.heroImage}
            alt={dest.name}
            className="w-full h-full object-cover object-center animate-kenburns"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/90 via-[#0a192f]/55 to-[#0a192f]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc]/80 via-transparent to-[#0a192f]/55" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <button
            onClick={() => onNavigate('packages')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-blue-100 hover:text-white transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Packages
          </button>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl" aria-hidden="true">{dest.flag}</span>
            <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[11px] font-bold uppercase tracking-[0.15em] text-white">
              {dest.nights} Nights &amp; {dest.days} Days
            </span>
          </div>

          <BlurText
            as="h1"
            text={dest.name}
            animateBy="letters"
            direction="top"
            delay={45}
            className="text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white font-playfair drop-shadow-xl"
          />
          <SplitText
            tag="p"
            text={dest.tagline}
            splitType="words"
            delay={20}
            duration={0.8}
            from={{ opacity: 0, y: 18 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="left"
            className="mt-2 text-xl sm:text-2xl font-playfair italic text-[#60a5fa] !block"
          />

          <p className="mt-5 max-w-2xl text-sm sm:text-base text-slate-100 leading-relaxed font-manrope drop-shadow">
            {dest.description}
          </p>

          <button
            onClick={scrollToRoadmap}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1e40af] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-bold uppercase tracking-[0.14em] px-7 py-3.5 transition-colors cursor-pointer"
          >
            Explore Packages <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Stats strip */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 divide-x divide-slate-100">
          {stats.map((s) => (
            <div key={s.label} className="px-5 sm:px-7 py-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">{s.label}</p>
              {s.sub && <p className="text-xs text-slate-400 line-through mt-1.5">{s.sub}</p>}
              <p className={`text-lg sm:text-xl font-bold mt-0.5 ${s.accent ? 'text-[#1e40af]' : 'text-[#0f172a]'}`}>
                {s.value}
              </p>
              {s.note && <p className="text-[10px] uppercase tracking-wider text-slate-400">{s.note}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap */}
      <section id="roadmap" className="py-20 px-4 sm:px-6 lg:px-12 bg-[#faf5f3]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#1e40af] mb-3">The Journey</p>
            <BlurText
              as="h2"
              text={`Your ${dest.name} Roadmap`}
              animateBy="words"
              direction="top"
              delay={110}
              className="justify-center text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] font-playfair"
            />
            <SplitText
              tag="p"
              text={`A complete day-by-day plan across ${dest.days} unforgettable days — every transfer, stay and experience handled for you.`}
              splitType="words"
              delay={14}
              duration={0.8}
              from={{ opacity: 0, y: 16 }}
              to={{ opacity: 1, y: 0 }}
              textAlign="center"
              className="mt-3 text-sm sm:text-base text-slate-500 !block"
            />
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="relative">
            {/* centre line — track + scroll-driven blue fill (desktop) */}
            <span className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 rounded-full bg-blue-100" />
            <span
              className="hidden md:block absolute left-1/2 top-0 w-[3px] -translate-x-1/2 rounded-full bg-[#1e40af] transition-[height] duration-150 ease-out"
              style={{ height: `${fillPct}%` }}
            />

            <div className="space-y-10 md:space-y-16">
              {dest.roadmap.map((stop, idx) => {
                const left = idx % 2 === 0;
                const nodePct = ((idx + 0.5) / dest.roadmap.length) * 100;
                const reached = fillPct >= nodePct;
                return (
                  <div
                    key={stop.day}
                    className="relative md:grid md:grid-cols-2 md:gap-12 md:items-center"
                  >
                    {/* node — turns solid blue once the scroll fill passes it */}
                    <span
                      className={`hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full ring-4 ring-[#faf5f3] z-10 transition-colors duration-300 ${
                        reached ? 'bg-[#1e40af]' : 'bg-blue-200'
                      }`}
                    />

                    {/* image */}
                    <Reveal
                      from={left ? 'left' : 'right'}
                      className={`${left ? 'md:order-1' : 'md:order-2'}`}
                    >
                      <div className="relative rounded-[24px] overflow-hidden shadow-[0_22px_48px_-20px_rgba(15,23,42,0.32)] aspect-[16/10]">
                        <img
                          src={stop.image}
                          alt={stop.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-4 left-4 bg-white/95 text-[#0f172a] text-[11px] font-bold uppercase tracking-[0.12em] px-3 py-1 rounded-full shadow">
                          {stop.day}
                        </span>
                      </div>
                    </Reveal>

                    {/* text */}
                    <Reveal
                      from={left ? 'right' : 'left'}
                      delay={0.08}
                      className={`mt-4 md:mt-0 ${left ? 'md:order-2' : 'md:order-1'}`}
                    >
                      <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#1e40af]">
                        <MapPin className="w-3.5 h-3.5" /> {stop.day}
                      </p>
                      <h3 className="mt-1 text-xl sm:text-2xl font-bold text-[#0f172a] font-playfair">
                        {stop.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{stop.desc}</p>
                    </Reveal>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => onEnquire(dest.name)}
              className="inline-flex items-center gap-2 rounded-full bg-[#0f172a] hover:bg-[#1e40af] text-white text-xs sm:text-sm font-bold uppercase tracking-[0.14em] px-8 py-4 transition-colors cursor-pointer"
            >
              Enquire About {dest.name} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
