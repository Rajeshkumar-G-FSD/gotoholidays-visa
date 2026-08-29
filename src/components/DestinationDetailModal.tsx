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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="destination-detail-modal"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel border border-white/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20 cursor-pointer"
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-black/30" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="glass-pill text-[#b8cbbc] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {destination.tag || 'Destination Guide'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-playfair mt-1">
              {destination.name}
            </h2>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-white/80 mt-1">
              <MapPin className="w-4 h-4 text-[#b8cbbc]" />
              <span>{destination.location}, {destination.country} • {destination.region}</span>
            </div>
          </div>
        </div>

        {/* Quick Facts */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="text-[11px] text-[#8d928d] uppercase font-semibold block">Best Season</span>
            <span className="text-sm font-medium text-white flex items-center gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-[#b8cbbc]" /> {destination.bestTimeToVisit}
            </span>
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="text-[11px] text-[#8d928d] uppercase font-semibold block">Est. Budget</span>
            <span className="text-sm font-medium text-white flex items-center gap-1 mt-0.5">
              <DollarSign className="w-3.5 h-3.5 text-[#b8cbbc]" /> {destination.avgCost}
            </span>
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/10 col-span-2 sm:col-span-1">
            <span className="text-[11px] text-[#8d928d] uppercase font-semibold block">Atmosphere</span>
            <span className="text-sm font-medium text-[#b8cbbc] mt-0.5 block">
              Secluded Luxury
            </span>
          </div>
        </div>

        {/* Story */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            The Experience
          </h3>
          <p className="text-sm leading-relaxed text-[#c3c8c2]">
            {destination.fullStory}
          </p>
        </div>

        {/* Highlights */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Featured Highlights
          </h3>
          <div className="space-y-1.5">
            {destination.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-[#e5e2e1]">
                <div className="w-4 h-4 rounded-full bg-[#b8cbbc]/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-[#b8cbbc]" />
                </div>
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onPlanTrip(destination.name);
            }}
            className="px-6 py-2.5 rounded-full bg-[#b8cbbc] text-[#233429] text-xs font-bold uppercase tracking-wider hover:bg-[#d4e7d8] transition-colors flex items-center gap-1.5 shadow-lg"
          >
            <span>Plan Journey to {destination.name}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
