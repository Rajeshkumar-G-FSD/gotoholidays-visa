import React, { useState } from 'react';
import { DESTINATIONS, HERO_BACKGROUND } from '../data/travelData';
import { Destination, ActiveTab } from '../types';
import { ArrowUpRight, MapPin, Sparkles, Compass, Eye } from 'lucide-react';

interface HeroHomeProps {
  onNavigate: (tab: ActiveTab) => void;
  onSelectDestination: (dest: Destination) => void;
}

export const HeroHome: React.FC<HeroHomeProps> = ({ onNavigate, onSelectDestination }) => {
  const [selectedDestId, setSelectedDestId] = useState<string>('lago-di-braies');

  const activeDest = DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[2];

  return (
    <section
      id="hero-section"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 pb-16 lg:py-0"
    >
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeDest.heroBgUrl || HERO_BACKGROUND}
          alt={activeDest.name}
          className="w-full h-full object-cover object-center transition-all duration-700 scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Subtle cinematic overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-black/40" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & CTA */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            
            {/* Announcement Pill */}
            <div
              id="hero-announcement-pill"
              className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full glass-pill text-white/90 text-xs sm:text-sm font-medium tracking-wide shadow-lg border border-white/20 animate-fade-in"
            >
              <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-xs font-bold text-white tracking-wider uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#b8cbbc]" />
                New
              </span>
              <span>Travel Beyond Expectations</span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-headline"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-tight text-white font-playfair italic leading-[1.1] text-glow"
            >
              Travel Beyond <br />
              <span className="not-italic font-playfair font-normal">the Ordinary</span>
            </h1>

            {/* Subtitle description */}
            <p
              id="hero-description"
              className="text-base sm:text-lg text-white/85 max-w-xl font-light leading-relaxed font-manrope drop-shadow-md"
            >
              Explore extraordinary places, compare travel options, and uncover experiences that match your travel style. Travel smarter, discover more, and make every moment count.
            </p>

            {/* Actions Button */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                id="hero-cta-button"
                onClick={() => onNavigate('destinations')}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full glass text-white text-base font-semibold tracking-wide hover:bg-white/20 hover:border-white/50 transition-all duration-300 shadow-2xl cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Destinations</span>
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-[#b8cbbc] group-hover:text-[#233429] transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>

              <button
                id="hero-plan-button"
                onClick={() => onNavigate('plan')}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-white/90 text-sm font-medium hover:text-white transition-colors cursor-pointer"
              >
                <span>Curate Custom Itinerary</span>
                <Compass className="w-4 h-4 text-[#b8cbbc]" />
              </button>
            </div>

            {/* Active Destination Quick Info Bar (Desktop & Mobile) */}
            <div className="pt-4 flex items-center gap-4 text-xs sm:text-sm text-white/80">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-[#b8cbbc]" />
                <span className="font-semibold text-white">{activeDest.name}</span>
                <span className="text-white/60">({activeDest.country})</span>
              </div>
              <button
                onClick={() => onSelectDestination(activeDest)}
                className="text-[#b8cbbc] hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <Eye className="w-3.5 h-3.5" /> View Destination Guide
              </button>
            </div>
          </div>

          {/* Right Column: Circular Destination Gallery (Interactive Arc Layout) */}
          <div className="lg:col-span-5 w-full">
            
            {/* Desktop Curved Vertical Carousel Layout */}
            <div className="hidden lg:flex flex-col items-end space-y-4 relative py-6">
              <div className="text-right mb-2">
                <p className="text-xs uppercase tracking-widest text-[#b8cbbc] font-semibold">Featured Highlights</p>
                <p className="text-sm text-white/70">Click to preview destination</p>
              </div>

              {DESTINATIONS.map((dest, idx) => {
                const isSelected = dest.id === selectedDestId;
                // Horizontal offset to create the elegant curved arc effect from the design
                const offsets = ['mr-0', 'mr-8', 'mr-16', 'mr-8', 'mr-0'];
                const offsetClass = offsets[idx % offsets.length];

                return (
                  <div
                    key={dest.id}
                    className={`flex items-center gap-4 transition-all duration-300 ${offsetClass}`}
                  >
                    {/* Destination Label when selected/hovered */}
                    {isSelected && (
                      <div className="glass-panel px-4 py-2 rounded-2xl text-right animate-in fade-in slide-in-from-right-4 duration-300 shadow-xl border border-white/20">
                        <p className="text-xs text-[#b8cbbc] font-semibold uppercase tracking-wider">{dest.tag || 'Explore'}</p>
                        <h4 className="text-sm font-bold text-white leading-snug">{dest.name}</h4>
                        <p className="text-xs text-white/70">{dest.location}, {dest.country}</p>
                      </div>
                    )}

                    {/* Circular Image Thumbnail Button */}
                    <button
                      id={`hero-dest-circle-${dest.id}`}
                      onClick={() => {
                        setSelectedDestId(dest.id);
                        onSelectDestination(dest);
                      }}
                      className={`relative group rounded-full p-1 transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'ring-4 ring-[#b8cbbc] scale-110 shadow-[0_0_25px_rgba(184,203,188,0.5)]'
                          : 'ring-1 ring-white/30 hover:ring-2 hover:ring-white/80 hover:scale-105 opacity-85 hover:opacity-100'
                      }`}
                    >
                      <div className="w-16 h-16 xl:w-20 xl:h-20 rounded-full overflow-hidden relative">
                        <img
                          src={dest.imageUrl}
                          alt={dest.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors" />
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Mobile / Tablet Responsive Horizontal Carousel */}
            <div className="lg:hidden w-full pt-6">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs uppercase tracking-wider text-[#b8cbbc] font-semibold">Featured Destinations</span>
                <span className="text-xs text-white/60">Swipe to discover</span>
              </div>
              <div className="flex items-center gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth">
                {DESTINATIONS.map((dest) => {
                  const isSelected = dest.id === selectedDestId;
                  return (
                    <button
                      key={dest.id}
                      onClick={() => {
                        setSelectedDestId(dest.id);
                        onSelectDestination(dest);
                      }}
                      className={`flex-shrink-0 flex items-center gap-3 p-2 rounded-2xl glass-panel text-left transition-all duration-200 cursor-pointer ${
                        isSelected ? 'border-[#b8cbbc] bg-white/15 ring-2 ring-[#b8cbbc]/50' : 'border-white/10'
                      }`}
                    >
                      <img
                        src={dest.imageUrl}
                        alt={dest.name}
                        className="w-14 h-14 rounded-full object-cover border border-white/20"
                        referrerPolicy="no-referrer"
                      />
                      <div className="pr-3">
                        <h4 className="text-sm font-bold text-white leading-tight">{dest.name}</h4>
                        <p className="text-xs text-white/70">{dest.country}</p>
                      </div>
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
