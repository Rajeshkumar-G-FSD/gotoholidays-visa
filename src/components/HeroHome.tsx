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
      {/* Background Image with Royal Sapphire & Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeDest.heroBgUrl || HERO_BACKGROUND}
          alt={activeDest.name}
          className="w-full h-full object-cover object-center transition-all duration-700 scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Majestic Royal Sapphire Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/92 via-[#0f2b5c]/70 to-[#071326]/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-transparent to-[#0a192f]/40" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & CTA */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            
            {/* Announcement Pill */}
            <div
              id="hero-announcement-pill"
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#0a192f]/80 backdrop-blur-md text-white text-xs sm:text-sm font-medium tracking-wide shadow-xl border border-blue-300/30 animate-fade-in"
            >
              <span className="bg-[#1e40af] text-white px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3 text-[#d4af37]" />
                New
              </span>
              <span className="text-blue-100">Travel Beyond Expectations</span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-headline"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-tight text-white font-playfair italic leading-[1.1] text-glow drop-shadow-lg"
            >
              Travel Beyond <br />
              <span className="not-italic font-playfair font-normal">the Ordinary</span>
            </h1>

            {/* Subtitle description */}
            <p
              id="hero-description"
              className="text-base sm:text-lg text-slate-100 max-w-xl font-normal leading-relaxed font-manrope drop-shadow-md"
            >
              Explore extraordinary places, compare travel options, and uncover experiences that match your travel style. Travel smarter, discover more, and make every moment count.
            </p>

            {/* Actions Button */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
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
                onClick={() => onNavigate('plan')}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white text-sm font-semibold transition-all cursor-pointer shadow-lg hover:scale-[1.02]"
              >
                <span>Curate Custom Itinerary</span>
                <Compass className="w-4 h-4 text-[#60a5fa]" />
              </button>
            </div>

            {/* Active Destination Quick Info Bar (Desktop & Mobile) */}
            <div className="pt-4 flex items-center gap-4 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0a192f]/80 backdrop-blur-md border border-blue-300/30 shadow-md">
                <MapPin className="w-3.5 h-3.5 text-[#60a5fa]" />
                <span className="font-semibold text-white">{activeDest.name}</span>
                <span className="text-blue-200 font-normal">({activeDest.country})</span>
              </div>
              <button
                onClick={() => onSelectDestination(activeDest)}
                className="text-[#93c5fd] hover:text-white hover:underline flex items-center gap-1.5 cursor-pointer font-semibold transition-colors"
              >
                <Eye className="w-3.5 h-3.5" /> View Destination Guide
              </button>
            </div>
          </div>

          {/* Right Column: Circular Destination Gallery (Interactive Arc Layout) */}
          <div className="lg:col-span-5 w-full">
            
            {/* Desktop Curved Vertical Carousel Layout */}
            <div className="hidden lg:flex flex-col items-end space-y-4 relative py-6">
              <div className="text-right mb-2 bg-[#0a192f]/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-blue-400/20 shadow-md">
                <p className="text-[11px] uppercase tracking-widest text-[#93c5fd] font-bold">Featured Highlights</p>
                <p className="text-xs text-white/80">Click thumbnail to preview</p>
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
                      <div className="bg-[#0a192f]/90 backdrop-blur-lg px-4 py-2.5 rounded-2xl text-right animate-in fade-in slide-in-from-right-4 duration-300 shadow-2xl border border-blue-400/40">
                        <p className="text-xs text-[#93c5fd] font-bold uppercase tracking-wider">{dest.tag || 'Explore'}</p>
                        <h4 className="text-sm font-bold text-white leading-snug">{dest.name}</h4>
                        <p className="text-xs text-slate-300">{dest.location}, {dest.country}</p>
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
                          ? 'ring-4 ring-[#60a5fa] scale-110 shadow-[0_0_25px_rgba(96,165,250,0.7)]'
                          : 'ring-2 ring-white/50 hover:ring-2 hover:ring-white hover:scale-105 opacity-90 hover:opacity-100'
                      }`}
                    >
                      <div className="w-16 h-16 xl:w-20 xl:h-20 rounded-full overflow-hidden relative shadow-lg">
                        <img
                          src={dest.imageUrl}
                          alt={dest.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-[#0a192f]/20 group-hover:bg-transparent transition-colors" />
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Mobile / Tablet Responsive Horizontal Carousel */}
            <div className="lg:hidden w-full pt-6">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs uppercase tracking-wider text-white font-bold bg-[#0a192f]/80 px-3 py-1 rounded-full border border-blue-300/30">
                  Featured Destinations
                </span>
                <span className="text-xs text-blue-200">Swipe to discover</span>
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
                      className={`flex-shrink-0 flex items-center gap-3 p-2.5 rounded-2xl bg-[#0a192f]/85 backdrop-blur-md text-left transition-all duration-200 cursor-pointer shadow-xl ${
                        isSelected ? 'border-[#60a5fa] ring-2 ring-[#60a5fa]' : 'border border-white/20'
                      }`}
                    >
                      <img
                        src={dest.imageUrl}
                        alt={dest.name}
                        className="w-14 h-14 rounded-full object-cover border border-white/30"
                        referrerPolicy="no-referrer"
                      />
                      <div className="pr-3">
                        <h4 className="text-sm font-bold text-white leading-tight">{dest.name}</h4>
                        <p className="text-xs text-slate-300">{dest.country}</p>
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
