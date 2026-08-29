import React from 'react';
import { Destination } from '../types';
import { X, MapPin, Calendar, DollarSign, Check, ArrowUpRight } from 'lucide-react';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  onPlanTrip: (destinationName: string) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  onPlanTrip,
}) => {
  if (!destination) return null;

  return (
    <div
      id="destination-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="destination-detail-modal"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-blue-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl shadow-blue-950/20 animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors z-20 cursor-pointer shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero image in modal */}
        <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden -mx-2 -mt-2">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/90 via-[#0f2b5c]/30 to-black/20" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {destination.tag || 'Destination Guide'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-playfair mt-2">
              {destination.name}
            </h2>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-100 mt-1 font-medium">
              <MapPin className="w-4 h-4 text-[#60a5fa]" />
              <span>{destination.location}, {destination.country} • {destination.region}</span>
            </div>
          </div>
        </div>

        {/* Quick Facts */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-100">
            <span className="text-[11px] text-slate-500 uppercase font-bold block">Best Season</span>
            <span className="text-sm font-bold text-[#0f172a] flex items-center gap-1 mt-1">
              <Calendar className="w-4 h-4 text-[#1e40af]" /> {destination.bestTimeToVisit}
            </span>
          </div>
          <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-100">
            <span className="text-[11px] text-slate-500 uppercase font-bold block">Est. Budget</span>
            <span className="text-sm font-bold text-[#0f172a] flex items-center gap-1 mt-1">
              <DollarSign className="w-4 h-4 text-[#1e40af]" /> {destination.avgCost}
            </span>
          </div>
          <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-100 col-span-2 sm:col-span-1">
            <span className="text-[11px] text-slate-500 uppercase font-bold block">Atmosphere</span>
            <span className="text-sm font-bold text-[#1e40af] mt-1 block">
              Secluded Luxury
            </span>
          </div>
        </div>

        {/* Story */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            The Experience
          </h3>
          <p className="text-sm leading-relaxed text-[#334155]">
            {destination.fullStory}
          </p>
        </div>

        {/* Highlights */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Featured Highlights
          </h3>
          <div className="space-y-2">
            {destination.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-[#1e293b]">
                <div className="w-4 h-4 rounded-full bg-blue-100 text-[#1e40af] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-[#1e40af]" />
                </div>
                <span className="font-medium">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onPlanTrip(destination.name);
            }}
            className="px-6 py-2.5 rounded-full bg-[#1e40af] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1d4ed8] hover:scale-[1.01] transition-all flex items-center gap-1.5 shadow-lg shadow-blue-950/10"
          >
            <span>Plan Journey to {destination.name}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
