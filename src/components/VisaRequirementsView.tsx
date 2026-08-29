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
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold';
      case 'ETA Required':
        return 'bg-blue-50 text-[#1e40af] border-blue-200 font-bold';
      case 'eVisa Starting 2025':
      case 'Visa Required':
        return 'bg-amber-50 text-amber-800 border-amber-200 font-bold';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div id="visa-requirements-view" className="w-full min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-[#1e40af] shadow-sm">
          <Globe className="w-3.5 h-3.5 text-[#1e40af]" />
          <span>Global Travel Guidelines</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0f172a] font-playfair tracking-tight">
          Visa Information & Entry Requirements
        </h1>
        <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
          Stay prepared with real-time entry guidelines, passport validity rules, and visa protocols for all our featured destinations.
        </p>

        {/* Global Search Bar */}
        <div className="pt-2 max-w-xl mx-auto relative">
          <input
            type="text"
            placeholder="Search country, territory, or requirement..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-blue-200 rounded-full px-5 py-3.5 pl-12 text-sm text-[#0f172a] focus:outline-none focus:border-[#1e40af] focus:ring-2 focus:ring-blue-100 transition-all shadow-md placeholder:text-slate-400"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Visa Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filter Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-xl shadow-blue-950/5 space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Your Passport Nationality
              </h3>
              <select
                value={selectedPassport}
                onChange={(e) => setSelectedPassport(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-[#0f172a] focus:outline-none focus:border-[#1e40af] focus:bg-white cursor-pointer"
              >
                <option value="United States">United States (U.S.)</option>
                <option value="United Kingdom">United Kingdom (UK)</option>
                <option value="European Union">European Union (EU)</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Filter by Region
              </h3>
              <div className="space-y-2.5">
                {regions.map((region) => {
                  const isChecked = selectedRegions.includes(region);
                  return (
                    <label
                      key={region}
                      onClick={() => toggleRegion(region)}
                      className="flex items-center gap-3 text-sm text-[#334155] hover:text-[#1e40af] cursor-pointer select-none font-medium"
                    >
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'bg-[#1e40af] border-[#1e40af] text-white'
                            : 'border-slate-300 bg-slate-50'
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
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-2">
              <div className="flex items-center gap-2 text-amber-700 font-semibold">
                <AlertTriangle className="w-4 h-4" />
                <span>Important Notice</span>
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
              className="bg-white p-6 sm:p-7 rounded-3xl border border-blue-100 hover:border-blue-300 transition-all duration-300 shadow-lg shadow-blue-950/5 hover:shadow-xl hover:shadow-blue-900/10 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <img
                    src={visa.imageUrl}
                    alt={visa.country}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-blue-100 flex-shrink-0 shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-2xl font-bold text-[#0f172a] font-playfair">{visa.country}</h3>
                      <span className={`px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${getBadgeStyle(visa.badgeType)}`}>
                        {visa.badgeType}
                      </span>
                    </div>
                    <p className="text-xs text-[#1e40af] font-medium">
                      Region: <span className="text-slate-600">{visa.region}</span>
                    </p>
                    <p className="text-xs text-slate-500">
                      Eligible: <span className="text-[#334155] font-medium">{visa.passportType}</span>
                    </p>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block">Stay Allowance</span>
                  <span className="text-sm font-bold text-[#0f2b5c]">{visa.maxStay}</span>
                </div>
              </div>

              {/* Requirement Summary */}
              <p className="text-sm text-[#334155] leading-relaxed mb-4">
                {visa.requirementSummary}
              </p>

              {visa.statusNotes && (
                <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2 font-medium">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0 text-amber-600" />
                  <span>{visa.statusNotes}</span>
                </div>
              )}

              {/* Card Footer: Metadata + Details Button */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#1e40af]" /> Processing: {visa.processingTime}
                  </span>
                  <span>•</span>
                  <span>Gov Fee: {visa.fee}</span>
                </div>

                <button
                  id={`visa-details-btn-${visa.id}`}
                  onClick={() => onSelectVisa(visa)}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 hover:bg-[#1e40af] text-[#1e40af] hover:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border border-blue-200 shadow-sm"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}

          {filteredVisas.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl p-8 border border-blue-100 shadow-lg">
              <p className="text-lg text-[#0f172a] font-bold mb-2">No visa requirements found</p>
              <p className="text-sm text-[#475569] mb-4">Try searching another country or clearing your region filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedRegions([]);
                }}
                className="px-6 py-2.5 rounded-full bg-[#1e40af] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#1d4ed8]"
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
