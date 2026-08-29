import React, { useState } from 'react';
import { TravelPackage } from '../types';
import { X, Clock, MapPin, Check, Users, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface PackageDetailModalProps {
  pkg: TravelPackage | null;
  onClose: () => void;
  onBookNow: (pkg: TravelPackage) => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({
  pkg,
  onClose,
  onBookNow,
}) => {
  const [activeDay, setActiveDay] = useState<number>(1);
  const [isBooked, setIsBooked] = useState<boolean>(false);

  if (!pkg) return null;

  return (
    <div
      id="package-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="package-detail-modal"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel border border-white/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Header */}
        <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden -mx-2 -mt-2">
          <img
            src={pkg.imageUrl}
            alt={pkg.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-black/30 to-black/30" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="glass-pill text-[#b8cbbc] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                {pkg.category}
              </span>
              <span className="bg-[#b8cbbc]/20 text-[#b8cbbc] border border-[#b8cbbc]/30 text-xs px-2.5 py-0.5 rounded-full">
                {pkg.duration}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white font-playfair">
              {pkg.title}
            </h2>
            <div className="flex items-center gap-4 text-xs sm:text-sm text-white/80 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-[#b8cbbc]" /> {pkg.location}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4 text-[#b8cbbc]" /> {pkg.groupSize}
              </span>
            </div>
          </div>
        </div>

        {/* Overview & Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Expedition Overview
            </h3>
            <p className="text-sm leading-relaxed text-[#c3c8c2]">
              {pkg.overview}
            </p>
          </div>

          <div className="glass-panel-card p-5 rounded-2xl border border-white/10 space-y-3">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8d928d] block font-semibold">Tier & Price</span>
              <p className="text-2xl font-bold text-white">${pkg.price.toLocaleString()} <span className="text-xs font-normal text-white/70">/ guest</span></p>
            </div>
            <div className="pt-2 border-t border-white/10 text-xs text-[#c3c8c2] space-y-1">
              <p><span className="text-[#8d928d]">Pace:</span> {pkg.difficulty}</p>
              <p><span className="text-[#8d928d]">Group:</span> {pkg.groupSize}</p>
            </div>
          </div>
        </div>

        {/* Day-by-Day Itinerary Tab Navigation */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Day-by-Day Itinerary
          </h3>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {pkg.itinerary.map((item) => (
              <button
                key={item.day}
                onClick={() => setActiveDay(item.day)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeDay === item.day
                    ? 'bg-[#b8cbbc] text-[#233429] shadow-md'
                    : 'glass-panel text-white/70 hover:text-white'
                }`}
              >
                Day {item.day}
              </button>
            ))}
          </div>

          {/* Active Day Content */}
          {(() => {
            const current = pkg.itinerary.find((d) => d.day === activeDay) || pkg.itinerary[0];
            return (
              <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-1.5 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#b8cbbc]">
                  <Clock className="w-3.5 h-3.5" /> Day {current.day} Schedule
                </div>
                <h4 className="text-lg font-bold text-white">{current.title}</h4>
                <p className="text-sm text-[#c3c8c2] leading-relaxed">{current.desc}</p>
              </div>
            );
          })()}
        </div>

        {/* Inclusions */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Curated Inclusions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {pkg.inclusions.map((inc, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-[#e5e2e1] bg-white/5 p-2.5 rounded-xl border border-white/5">
                <ShieldCheck className="w-4 h-4 text-[#b8cbbc] flex-shrink-0" />
                <span>{inc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Bottom */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs text-[#8d928d] block">Total Experience Rate</span>
            <span className="text-2xl font-bold text-white">${pkg.price.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white"
            >
              Close
            </button>
            <button
              onClick={() => {
                setIsBooked(true);
                onBookNow(pkg);
              }}
              className="px-8 py-3 rounded-full bg-[#b8cbbc] text-[#233429] text-xs font-bold uppercase tracking-wider hover:bg-[#d4e7d8] transition-colors flex items-center gap-2 shadow-xl"
            >
              <span>{isBooked ? 'Reserved! Checking Out...' : 'Reserve This Journey'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
