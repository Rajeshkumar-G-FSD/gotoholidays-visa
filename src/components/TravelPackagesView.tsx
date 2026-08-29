import React, { useState } from 'react';
import { TRAVEL_PACKAGES } from '../data/travelData';
import { TravelPackage } from '../types';
import { ArrowUpRight, Clock, MapPin, Sparkles, Filter, Check, ChevronDown } from 'lucide-react';

interface TravelPackagesViewProps {
  onSelectPackage: (pkg: TravelPackage) => void;
  onBookPackage: (pkg: TravelPackage) => void;
}

export const TravelPackagesView: React.FC<TravelPackagesViewProps> = ({
  onSelectPackage,
  onBookPackage,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDuration, setSelectedDuration] = useState<string>('All');
  const [selectedPriceTier, setSelectedPriceTier] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Mountains & Lakes', 'Coastal Escapes', 'Cultural Immersions'];
  const durations = ['All', 'Under 7 Days', '7-10 Days'];
  const priceTiers = ['All', 'Premium ($$$)', 'Luxury ($$$$)'];

  const filteredPackages = TRAVEL_PACKAGES.filter((pkg) => {
    const matchesCategory = selectedCategory === 'All' || pkg.category === selectedCategory;
    const matchesPrice = selectedPriceTier === 'All' || pkg.priceTier === selectedPriceTier;
    const matchesDuration =
      selectedDuration === 'All' ||
      (selectedDuration === 'Under 7 Days' && parseInt(pkg.duration) < 7) ||
      (selectedDuration === '7-10 Days' && parseInt(pkg.duration) >= 7);
    const matchesSearch =
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.overview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPrice && matchesDuration && matchesSearch;
  });

  const featuredPackage = TRAVEL_PACKAGES.find((p) => p.featured) || TRAVEL_PACKAGES[0];
  const gridPackages = filteredPackages.filter((p) => p.id !== featuredPackage.id || selectedCategory !== 'All');

  return (
    <div id="travel-packages-view" className="w-full min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-[#1e40af] shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Handcrafted Itineraries</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0f172a] font-playfair tracking-tight">
          Curated Journeys
        </h1>
        <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
          Discover hand-picked itineraries designed for the sophisticated traveler seeking authenticity, serenity, and unparalleled natural beauty.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl mb-12 shadow-xl shadow-blue-950/5 border border-blue-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Search Journeys
            </label>
            <input
              type="text"
              placeholder="e.g. Dolomites, Italy, Sailing..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-[#1e40af] focus:bg-white transition-colors"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Category
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-[#0f172a] focus:outline-none focus:border-[#1e40af] focus:bg-white transition-colors pr-8 cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-white text-[#0f172a]">
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Duration Dropdown */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Duration
            </label>
            <div className="relative">
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-[#0f172a] focus:outline-none focus:border-[#1e40af] focus:bg-white transition-colors pr-8 cursor-pointer"
              >
                {durations.map((d) => (
                  <option key={d} value={d} className="bg-white text-[#0f172a]">
                    {d}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Price Tier Dropdown */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Price Tier
            </label>
            <div className="relative">
              <select
                value={selectedPriceTier}
                onChange={(e) => setSelectedPriceTier(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-[#0f172a] focus:outline-none focus:border-[#1e40af] focus:bg-white transition-colors pr-8 cursor-pointer"
              >
                {priceTiers.map((p) => (
                  <option key={p} value={p} className="bg-white text-[#0f172a]">
                    {p}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Big Package Hero Card */}
      {selectedCategory === 'All' && !searchQuery && (
        <div
          id="featured-package-card"
          className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl border border-blue-200/80 group cursor-pointer"
          onClick={() => onSelectPackage(featuredPackage)}
        >
          {/* Background image */}
          <div className="relative h-[480px] sm:h-[540px] w-full overflow-hidden">
            <img
              src={featuredPackage.imageUrl}
              alt={featuredPackage.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0f2b5c]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/90 via-transparent to-transparent" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
            {/* Top Row Badges */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="bg-[#1e40af] text-white px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                  Featured Experience
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-3 py-1 rounded-full text-xs font-semibold">
                  {featuredPackage.duration}
                </span>
              </div>
            </div>

            {/* Bottom Row Details */}
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-200 font-semibold">
                <MapPin className="w-4 h-4 text-[#60a5fa]" />
                <span>{featuredPackage.location}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-playfair leading-tight">
                {featuredPackage.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-100 line-clamp-2 leading-relaxed">
                {featuredPackage.subtitle}
              </p>

              {/* Price and CTA Buttons */}
              <div className="pt-3 flex flex-wrap items-center justify-between gap-4">
                <div className="bg-[#0a192f]/80 backdrop-blur-md px-5 py-2.5 rounded-2xl flex items-baseline gap-2 border border-blue-300/30">
                  <span className="text-xs text-blue-200 uppercase font-medium">From</span>
                  <span className="text-2xl sm:text-3xl font-bold text-white">${featuredPackage.price.toLocaleString()}</span>
                  <span className="text-xs text-blue-200">/ person</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPackage(featuredPackage);
                    }}
                    className="px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider transition-colors border border-white/30"
                  >
                    View Details
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookPackage(featuredPackage);
                    }}
                    className="w-12 h-12 rounded-full bg-[#1e40af] text-white flex items-center justify-center hover:bg-[#1d4ed8] hover:scale-105 transition-all shadow-xl"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Other Curated Journeys */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            id={`package-card-${pkg.id}`}
            onClick={() => onSelectPackage(pkg)}
            className="group rounded-3xl overflow-hidden bg-white border border-blue-100 hover:border-blue-300 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:translate-y-[-4px] shadow-lg shadow-blue-950/5 hover:shadow-xl hover:shadow-blue-900/10"
          >
            {/* Card Image */}
            <div className="relative h-64 w-full overflow-hidden">
              <img
                src={pkg.imageUrl}
                alt={pkg.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                {pkg.isNew && (
                  <span className="bg-[#1e40af] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md">
                    New
                  </span>
                )}
                <span className="bg-white/90 backdrop-blur-md text-[#0f2b5c] text-xs font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                  {pkg.duration}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between bg-white">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-[#1e40af] font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{pkg.location}</span>
                </div>
                <h3 className="text-2xl font-bold text-[#0f172a] font-playfair leading-snug group-hover:text-[#1e40af] transition-colors">
                  {pkg.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] line-clamp-2 leading-relaxed">
                  {pkg.subtitle}
                </p>
              </div>

              {/* Inclusions summary */}
              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Highlights</div>
                <div className="flex flex-wrap gap-1.5">
                  {pkg.inclusions.slice(0, 2).map((inc, i) => (
                    <span key={i} className="text-xs bg-blue-50 px-2.5 py-1 rounded-md text-[#1e40af] border border-blue-100 flex items-center gap-1 font-medium">
                      <Check className="w-3 h-3 text-[#1e40af]" /> {inc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block">Price from</span>
                  <span className="text-xl font-bold text-[#0f2b5c]">${pkg.price.toLocaleString()}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1e40af] group-hover:bg-[#1e40af] group-hover:text-white transition-colors shadow-sm">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPackages.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl p-8 border border-blue-100 shadow-lg">
          <p className="text-lg text-[#0f172a] font-bold mb-2">No journeys found</p>
          <p className="text-sm text-[#475569] mb-4">Try clearing filters or adjusting your search term.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedDuration('All');
              setSelectedPriceTier('All');
              setSearchQuery('');
            }}
            className="px-6 py-2.5 rounded-full bg-[#1e40af] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#1d4ed8]"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
