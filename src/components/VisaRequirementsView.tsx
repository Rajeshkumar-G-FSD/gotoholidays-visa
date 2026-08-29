import React, { useState } from 'react';
import { VISA_DATA } from '../data/travelData';
import { VisaRequirement } from '../types';
import { Search, ShieldAlert, ArrowRight, CheckCircle2, Globe, FileText, Clock, AlertTriangle } from 'lucide-react';

interface VisaRequirementsViewProps {
  onSelectVisa: (visa: VisaRequirement) => void;
}

export const VisaRequirementsView: React.FC<VisaRequirementsViewProps> = ({ onSelectVisa }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedPassport, setSelectedPassport] = useState<string>('United States');

  const regions = ['Asia Pacific', 'Europe (Schengen)', 'South America', 'North America'];

  const toggleRegion = (region: string) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions(selectedRegions.filter((r) => r !== region));
    } else {
      setSelectedRegions([...selectedRegions, region]);
    }
  };

  const filteredVisas = VISA_DATA.filter((item) => {
    const matchesSearch =
      item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.requirementSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.region.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion =
      selectedRegions.length === 0 || selectedRegions.includes(item.region);

    return matchesSearch && matchesRegion;
  });

  const getBadgeStyle = (badgeType: string) => {
    switch (badgeType) {
      case 'Visa Free':
        return 'bg-[#2d3e33] text-[#b8cbbc] border-[#b8cbbc]/30';
      case 'ETA Required':
        return 'bg-[#4a3b1a] text-[#f4bb92] border-[#f4bb92]/30';
      case 'eVisa Starting 2025':
      case 'Visa Required':
        return 'bg-[#5c2424] text-[#ffb4ab] border-[#ffb4ab]/30';
      default:
        return 'bg-white/10 text-white border-white/20';
    }
  };

  return (
    <div id="visa-requirements-view" className="w-full min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Header matching Image 8 */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-semibold uppercase tracking-wider text-[#b8cbbc]">
          <Globe className="w-3.5 h-3.5" />
          <span>Global Travel Guidelines</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-white font-playfair tracking-tight">
          Visa Information & Entry Requirements
        </h1>
        <p className="text-base sm:text-lg text-[#c3c8c2] font-light leading-relaxed">
          Stay prepared with real-time entry guidelines, passport validity rules, and visa protocols for all our featured destinations.
        </p>

        {/* Global Search Bar */}
        <div className="pt-2 max-w-xl mx-auto relative">
          <input
            type="text"
            placeholder="Search country, territory, or requirement..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#20201f] border border-white/15 rounded-full px-5 py-3.5 pl-12 text-sm text-white focus:outline-none focus:border-[#b8cbbc] transition-all shadow-xl placeholder:text-[#8d928d]"
          />
          <Search className="w-5 h-5 text-[#8d928d] absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Visa Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filter Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-3">
                Your Passport Nationality
              </h3>
              <select
                value={selectedPassport}
                onChange={(e) => setSelectedPassport(e.target.value)}
                className="w-full bg-[#1c1b1b] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#b8cbbc]"
              >
                <option value="United States">United States (U.S.)</option>
                <option value="United Kingdom">United Kingdom (UK)</option>
                <option value="European Union">European Union (EU)</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
            </div>

            <div className="pt-4 border-t border-white/10">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-3">
                Filter by Region
              </h3>
              <div className="space-y-2.5">
                {regions.map((region) => {
                  const isChecked = selectedRegions.includes(region);
                  return (
                    <label
                      key={region}
                      onClick={() => toggleRegion(region)}
                      className="flex items-center gap-3 text-sm text-[#c3c8c2] hover:text-white cursor-pointer select-none"
                    >
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'bg-[#b8cbbc] border-[#b8cbbc] text-[#233429]'
                            : 'border-white/20 bg-white/5'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <span>{region}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Quick Travel Notice */}
            <div className="pt-4 border-t border-white/10 text-xs text-[#8d928d] space-y-2">
              <div className="flex items-center gap-2 text-[#f4bb92]">
                <AlertTriangle className="w-4 h-4" />
                <span className="font-semibold">Important Notice</span>
              </div>
              <p className="leading-relaxed">
                Visa policies and entry protocols may change rapidly. Our advisory team verifies updates continuously for booked guests.
              </p>
            </div>
          </div>
        </div>

        {/* Right Visa Cards List */}
        <div className="lg:col-span-8 space-y-6">
          {filteredVisas.map((visa) => (
            <div
              key={visa.id}
              id={`visa-card-${visa.id}`}
              className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-white/25 transition-all duration-300 shadow-xl group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <img
                    src={visa.imageUrl}
                    alt={visa.country}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-white/15 flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-2xl font-bold text-white font-playfair">{visa.country}</h3>
                      <span className={`px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${getBadgeStyle(visa.badgeType)}`}>
                        {visa.badgeType}
                      </span>
                    </div>
                    <p className="text-xs text-[#b8cbbc]">
                      Region: <span className="text-white/80">{visa.region}</span>
                    </p>
                    <p className="text-xs text-[#8d928d]">
                      Eligible: <span className="text-[#c3c8c2]">{visa.passportType}</span>
                    </p>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-[11px] text-[#8d928d] uppercase block">Stay Allowance</span>
                  <span className="text-sm font-semibold text-white">{visa.maxStay}</span>
                </div>
              </div>

              {/* Requirement Summary */}
              <p className="text-sm text-[#c3c8c2] leading-relaxed mb-4">
                {visa.requirementSummary}
              </p>

              {visa.statusNotes && (
                <div className="mb-4 p-3 rounded-xl bg-[#5c2424]/30 border border-[#ffb4ab]/20 text-xs text-[#ffb4ab] flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>{visa.statusNotes}</span>
                </div>
              )}

              {/* Card Footer: Metadata + Details Button */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs text-[#8d928d]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#b8cbbc]" /> Processing: {visa.processingTime}
                  </span>
                  <span>•</span>
                  <span>Gov Fee: {visa.fee}</span>
                </div>

                <button
                  id={`visa-details-btn-${visa.id}`}
                  onClick={() => onSelectVisa(visa)}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer group-hover:border-[#b8cbbc]"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#b8cbbc] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}

          {filteredVisas.length === 0 && (
            <div className="text-center py-16 glass-panel rounded-3xl p-8 border border-white/10">
              <p className="text-lg text-white font-medium mb-2">No visa requirements found</p>
              <p className="text-sm text-[#8d928d] mb-4">Try searching another country or clearing your region filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedRegions([]);
                }}
                className="px-6 py-2.5 rounded-full bg-[#b8cbbc] text-[#233429] text-xs font-semibold uppercase tracking-wider"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
