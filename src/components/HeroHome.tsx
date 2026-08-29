import React, { useEffect, useState } from 'react';
import { HERO_DESTINATIONS, HERO_BACKGROUND } from '../data/travelData';
import { Destination, ActiveTab } from '../types';
import { ArrowUpRight, MapPin, Eye } from 'lucide-react';

interface HeroHomeProps {
  onNavigate: (tab: ActiveTab) => void;
  onSelectDestination: (dest: Destination) => void;
}

const ROTATE_INTERVAL = 3000;

// Short place labels shown beneath each circle on mobile.
const CIRCLE_LABELS: Record<string, string> = {
  maldives: 'Maldives',
  dubai: 'Dubai',
  thailand: 'Thailand',
  malaysia: 'Malaysia',
  andaman: 'Andaman',
  singapore: 'Singapore',
  lakshadweep: 'Lakshadweep',
  srilanka: 'Sri Lanka',
};

const pad = (n: number) => String(n).padStart(2, '0');

export const HeroHome: React.FC<HeroHomeProps> = ({ onNavigate, onSelectDestination }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = HERO_DESTINATIONS.length;
  const activeDest = HERO_DESTINATIONS[activeIndex];
  const mid = (total - 1) / 2;

  // Auto-advance the featured destination every 3 seconds.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % total);
    }, ROTATE_INTERVAL);
    return () => clearInterval(id);
  }, [paused, total]);

  const selectIndex = (idx: number) => {
    setActiveIndex(idx);
    // Briefly pause so a manual pick isn't instantly overridden by the timer.
    setPaused(true);
    window.setTimeout(() => setPaused(false), ROTATE_INTERVAL * 2);
  };

  // Progress-ring geometry for the active thumbnail.
  const R = 66;
  const CIRC = 2 * Math.PI * R;

  return (
    <section
      id="hero-section"
      className="relative min-h-screen w-full flex items-center overflow-hidden pt-28 pb-16 lg:pt-20 lg:pb-10"
    >
      {/* Rotating Background — cross-fade + slow Ken Burns zoom */}
      <div className="absolute inset-0 z-0">
        {HERO_DESTINATIONS.map((dest, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={dest.id}
              className={`absolute inset-0 transition-opacity duration-[900ms] ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={dest.heroBgUrl || HERO_BACKGROUND}
                alt={dest.name}
                className={`w-full h-full object-cover object-center ${
                  isActive ? 'animate-kenburns' : 'scale-105'
                }`}
                referrerPolicy="no-referrer"
              />
            </div>
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/92 via-[#0f2b5c]/68 to-[#071326]/82" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc]/70 via-transparent to-[#0a192f]/45" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          {/* Left Column: minimal — just the live caption for the image behind + actions */}
          <div className="lg:col-span-6 text-left">
            <div key={activeDest.id} className="animate-hero-rise space-y-3">
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#93c5fd] font-bold flex items-center gap-3">
                Now Exploring
                <span className="text-white/70 tracking-widest">
                  {pad(activeIndex + 1)} <span className="text-white/30">/</span> {pad(total)}
                </span>
              </p>

              <h1
                id="hero-headline"
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-tight text-white font-playfair italic leading-[1.05] text-glow drop-shadow-xl"
              >
                {activeDest.name}
              </h1>

              <p className="flex items-center gap-2 text-sm sm:text-base text-slate-100 font-manrope drop-shadow">
                <MapPin className="w-4 h-4 text-[#60a5fa]" />
                <span className="font-semibold">{activeDest.location}</span>
                <span className="text-blue-200">· {activeDest.country}</span>
                <span className="ml-1 text-[11px] uppercase tracking-widest text-[#93c5fd] font-bold">
                  {activeDest.tag}
                </span>
              </p>
            </div>

            {/* Actions */}
            <div className="pt-8 flex flex-wrap items-center gap-4">
              <button
                id="hero-cta-button"
                onClick={() => onNavigate('destinations')}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#0f2b5c] text-base font-bold tracking-wide hover:bg-blue-50 transition-all duration-300 shadow-2xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] border border-white"
              >
                <span>Explore Destinations</span>
                <span className="w-8 h-8 rounded-full bg-[#1e40af] text-white flex items-center justify-center group-hover:bg-[#1d4ed8] transition-all duration-300 shadow-md">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>

              <button
                id="hero-plan-button"
                onClick={() => onSelectDestination(activeDest)}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white text-sm font-semibold transition-all cursor-pointer shadow-lg hover:scale-[1.02]"
              >
                <Eye className="w-4 h-4 text-[#60a5fa]" />
                <span>View Destination Guide</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Curved Arc Gallery */}
          <div className="lg:col-span-6 w-full">
            {/* Desktop: vertical staggered arc, labels to the left of each circle */}
            <div
              className="hidden lg:flex flex-col items-end gap-2.5 xl:gap-3 relative pr-2"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {HERO_DESTINATIONS.map((dest, idx) => {
                const isActive = idx === activeIndex;
                // Curved arc: centre circles sit farther right, the ends pull left.
                const offset = Math.round(Math.abs(idx - mid) * 26);
                return (
                  <div
                    key={dest.id}
                    className="flex items-center justify-end gap-4 xl:gap-5 w-full transition-all duration-500 ease-out"
                    style={{ marginRight: offset }}
                  >
                    {/* Label */}
                    <button
                      onClick={() => selectIndex(idx)}
                      className={`text-right cursor-pointer transition-all duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-75 hover:opacity-100'
                      }`}
                    >
                      <h4
                        className={`font-playfair italic text-white leading-tight transition-all duration-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)] ${
                          isActive ? 'text-2xl xl:text-[26px]' : 'text-base xl:text-lg'
                        }`}
                      >
                        {dest.name}
                      </h4>
                      <p
                        className={`font-manrope text-slate-100 transition-all duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)] ${
                          isActive ? 'text-sm' : 'text-[11px] xl:text-xs'
                        }`}
                      >
                        {dest.location}, {dest.country}
                      </p>
                    </button>

                    {/* Circular thumbnail */}
                    <button
                      id={`hero-dest-circle-${dest.id}`}
                      onClick={() => selectIndex(idx)}
                      aria-label={`Show ${dest.name}, ${dest.country}`}
                      className="relative flex-shrink-0 cursor-pointer"
                    >
                      <span
                        className={`block rounded-full p-[3px] transition-all duration-500 ease-out ${
                          isActive
                            ? 'ring-2 ring-white/60 animate-soft-pulse'
                            : 'ring-2 ring-white/40 hover:ring-white/80 opacity-90 hover:opacity-100'
                        }`}
                      >
                        <span
                          className={`block rounded-full overflow-hidden bg-[#0a192f] transition-all duration-500 ease-out ${
                            isActive
                              ? 'w-[104px] h-[104px] xl:w-[124px] xl:h-[124px]'
                              : 'w-16 h-16 xl:w-[76px] xl:h-[76px]'
                          }`}
                        >
                          <img
                            src={dest.imageUrl}
                            alt={dest.name}
                            className={`w-full h-full object-cover transition-transform duration-[3000ms] ease-out ${
                              isActive ? 'scale-110' : 'scale-100'
                            }`}
                            referrerPolicy="no-referrer"
                          />
                        </span>
                      </span>

                      {/* 3-second progress ring around the active thumbnail */}
                      {isActive && (
                        <svg
                          key={activeIndex}
                          className="absolute inset-0 m-auto -rotate-90 pointer-events-none"
                          width="100%"
                          height="100%"
                          viewBox="0 0 140 140"
                        >
                          <circle
                            className="ring-progress"
                            cx="70"
                            cy="70"
                            r={R}
                            fill="none"
                            stroke="#60a5fa"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray={CIRC}
                            style={
                              {
                                '--circ': CIRC,
                                animationPlayState: paused ? 'paused' : 'running',
                              } as React.CSSProperties
                            }
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Mobile / Tablet: frosted horizontal carousel */}
            <div
              className="lg:hidden w-full pt-2"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <p className="text-[11px] uppercase tracking-widest text-[#93c5fd] font-bold mb-3">
                Signature Destinations
              </p>
              <div className="inline-flex max-w-full items-center gap-4 overflow-x-auto no-scrollbar rounded-3xl bg-[#0a192f]/55 backdrop-blur-md border border-white/15 shadow-xl px-4 py-4">
                {HERO_DESTINATIONS.map((dest, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={dest.id}
                      onClick={() => selectIndex(idx)}
                      aria-label={`Show ${dest.name}, ${dest.country}`}
                      className="group flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer"
                    >
                      <span
                        className={`relative rounded-full p-[3px] transition-all duration-300 ${
                          isActive
                            ? 'ring-4 ring-[#60a5fa] scale-110 shadow-[0_0_22px_rgba(96,165,250,0.65)]'
                            : 'ring-2 ring-white/40 opacity-80'
                        }`}
                      >
                        <span className="block w-14 h-14 rounded-full overflow-hidden">
                          <img
                            src={dest.imageUrl}
                            alt={dest.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </span>
                      </span>
                      <span
                        className={`text-[11px] font-semibold tracking-wide whitespace-nowrap ${
                          isActive ? 'text-white' : 'text-slate-200/80'
                        }`}
                      >
                        {CIRCLE_LABELS[dest.id] || dest.country}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
