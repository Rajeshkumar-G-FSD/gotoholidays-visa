import React from 'react';
import { VisaRequirement } from '../types';
import { X, Globe, Clock, DollarSign, FileText, CheckCircle2, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface VisaDetailModalProps {
  visa: VisaRequirement | null;
  onClose: () => void;
  onPlanTrip: (countryName: string) => void;
}

export const VisaDetailModal: React.FC<VisaDetailModalProps> = ({
  visa,
  onClose,
  onPlanTrip,
}) => {
  if (!visa) return null;

  return (
    <div
      id="visa-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="visa-detail-modal"
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

        {/* Top Title & Header */}
        <div className="flex items-start gap-4">
          <img
            src={visa.imageUrl}
            alt={visa.country}
            className="w-20 h-20 rounded-2xl object-cover border border-white/20 flex-shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-3xl font-bold text-white font-playfair">{visa.country}</h2>
              <span className="glass-pill text-[#b8cbbc] text-xs font-semibold px-3 py-0.5 rounded-full uppercase tracking-wider">
                {visa.badgeType}
              </span>
            </div>
            <p className="text-xs text-[#8d928d]">
              Region: <span className="text-[#e5e2e1]">{visa.region}</span> • Max Stay: <span className="text-[#b8cbbc] font-semibold">{visa.maxStay}</span>
            </p>
          </div>
        </div>

        {/* Official Guideline Summary */}
        <div className="glass-panel-card p-4 rounded-2xl border border-white/10 space-y-2">
          <h3 className="text-xs uppercase tracking-wider text-[#b8cbbc] font-semibold">
            Official Entry Policy Summary
          </h3>
          <p className="text-sm leading-relaxed text-[#c3c8c2]">
            {visa.requirementSummary}
          </p>
        </div>

        {/* Processing Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
            <span className="text-[11px] text-[#8d928d] uppercase font-semibold block">Processing Time</span>
            <span className="text-sm font-medium text-white flex items-center gap-1.5 mt-1">
              <Clock className="w-4 h-4 text-[#b8cbbc]" /> {visa.processingTime}
            </span>
          </div>
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
            <span className="text-[11px] text-[#8d928d] uppercase font-semibold block">Government Fee</span>
            <span className="text-sm font-medium text-white flex items-center gap-1.5 mt-1">
              <DollarSign className="w-4 h-4 text-[#b8cbbc]" /> {visa.fee}
            </span>
          </div>
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
            <span className="text-[11px] text-[#8d928d] uppercase font-semibold block">Passport Type</span>
            <span className="text-xs font-medium text-white flex items-center gap-1.5 mt-1">
              <Globe className="w-4 h-4 text-[#b8cbbc]" /> {visa.passportType}
            </span>
          </div>
        </div>

        {/* Step-by-Step Requirements */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Mandatory Documents & Entry Requirements
          </h3>
          <div className="space-y-2">
            {visa.fullRequirements.map((req, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-[#e5e2e1] bg-white/5 p-3 rounded-xl border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#b8cbbc] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Required Checklist at Border
          </h3>
          <div className="flex flex-wrap gap-2">
            {visa.documentsNeeded.map((doc, i) => (
              <span key={i} className="px-3 py-1 rounded-lg bg-white/10 text-xs font-medium text-[#b8cbbc] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> {doc}
              </span>
            ))}
          </div>
        </div>

        {/* Action */}
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
              onPlanTrip(visa.country);
            }}
            className="px-6 py-2.5 rounded-full bg-[#b8cbbc] text-[#233429] text-xs font-bold uppercase tracking-wider hover:bg-[#d4e7d8] transition-colors flex items-center gap-1.5 shadow-lg"
          >
            <span>Plan Journey to {visa.country}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
