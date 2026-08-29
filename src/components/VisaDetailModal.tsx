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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="visa-detail-modal"
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

        {/* Top Title & Header */}
        <div className="flex items-start gap-4">
          <img
            src={visa.imageUrl}
            alt={visa.country}
            className="w-20 h-20 rounded-2xl object-cover border border-blue-100 flex-shrink-0 shadow-sm"
            referrerPolicy="no-referrer"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-3xl font-bold text-[#0f172a] font-playfair">{visa.country}</h2>
              <span className="bg-blue-50 text-[#1e40af] border border-blue-200 text-xs font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                {visa.badgeType}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Region: <span className="text-[#0f172a] font-semibold">{visa.region}</span> • Max Stay: <span className="text-[#1e40af] font-bold">{visa.maxStay}</span>
            </p>
          </div>
        </div>

        {/* Official Guideline Summary */}
        <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100 space-y-1.5">
          <h3 className="text-xs uppercase tracking-wider text-[#1e40af] font-bold">
            Official Entry Policy Summary
          </h3>
          <p className="text-sm leading-relaxed text-[#334155]">
            {visa.requirementSummary}
          </p>
        </div>

        {/* Processing Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-100">
            <span className="text-[11px] text-slate-500 uppercase font-bold block">Processing Time</span>
            <span className="text-sm font-bold text-[#0f172a] flex items-center gap-1.5 mt-1">
              <Clock className="w-4 h-4 text-[#1e40af]" /> {visa.processingTime}
            </span>
          </div>
          <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-100">
            <span className="text-[11px] text-slate-500 uppercase font-bold block">Government Fee</span>
            <span className="text-sm font-bold text-[#0f172a] flex items-center gap-1.5 mt-1">
              <DollarSign className="w-4 h-4 text-[#1e40af]" /> {visa.fee}
            </span>
          </div>
          <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-100">
            <span className="text-[11px] text-slate-500 uppercase font-bold block">Passport Type</span>
            <span className="text-xs font-bold text-[#0f172a] flex items-center gap-1.5 mt-1">
              <Globe className="w-4 h-4 text-[#1e40af]" /> {visa.passportType}
            </span>
          </div>
        </div>

        {/* Step-by-Step Requirements */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Mandatory Documents & Entry Requirements
          </h3>
          <div className="space-y-2">
            {visa.fullRequirements.map((req, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-[#1e293b] bg-blue-50/40 p-3 rounded-xl border border-blue-100">
                <CheckCircle2 className="w-4 h-4 text-[#1e40af] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Required Checklist at Border
          </h3>
          <div className="flex flex-wrap gap-2">
            {visa.documentsNeeded.map((doc, i) => (
              <span key={i} className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-xs font-bold text-[#1e40af] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> {doc}
              </span>
            ))}
          </div>
        </div>

        {/* Action */}
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
              onPlanTrip(visa.country);
            }}
            className="px-6 py-2.5 rounded-full bg-[#1e40af] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1d4ed8] hover:scale-[1.01] transition-all flex items-center gap-1.5 shadow-lg shadow-blue-950/10"
          >
            <span>Plan Journey to {visa.country}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
