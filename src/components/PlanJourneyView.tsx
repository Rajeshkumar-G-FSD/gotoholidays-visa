import React, { useState } from 'react';
import { CustomPlanFormData } from '../types';
import { Sparkles, Calendar, Users, MapPin, ArrowUpRight, CheckCircle, ShieldCheck } from 'lucide-react';

interface PlanJourneyViewProps {
  onPlanSubmit: (data: CustomPlanFormData) => void;
}

export const PlanJourneyView: React.FC<PlanJourneyViewProps> = ({ onPlanSubmit }) => {
  const [formData, setFormData] = useState<CustomPlanFormData>({
    firstName: '',
    lastName: '',
    email: '',
    destination: 'Italian Dolomites & Alpine Lakes',
    travelers: '2 Travelers',
    date: '2025-07-15',
    message: '',
    travelStyle: 'Relaxed Slow Luxury'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onPlanSubmit(formData);
    }, 600);
  };

  const travelStyles = [
    'Relaxed Slow Luxury',
    'Alpine & Wilderness Trekking',
    'Coastal Sailing & Marine',
    'Cultural & Culinary Heritage'
  ];

  return (
    <div id="plan-journey-view" className="w-full min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-5xl mx-auto space-y-12">
      
      {/* Header with Twilight Lake background */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 min-h-[380px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6I_vVxka5S-31dV16MWtEcFZvjR172DffNcnwIwoyzecghhkpaZWO5fypK49ymAPAUaTN0iea4KsP9oeGN9caXVA6PuyLpaKVgKe8O-y276_Tgr37QURKuo32k-DL2MxffMZMiH-wrGp8cBJMlZiasvpGf7eALOBnWxmTJpP8y6VOfgB7wNY4UFKfE7252XdwcXhJXubr5Tj2QugKDSHXcV2Ccd3yGQQxs6j6lMZ-fb1dm8w5DRHD"
            alt="Twilight alpine lake"
            className="w-full h-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/80" />
        </div>

        <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold uppercase tracking-wider text-white">
            <Sparkles className="w-3.5 h-3.5 text-[#b8cbbc]" />
            <span>Custom Itineraries</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-white font-playfair tracking-tight leading-tight">
            Craft Your Perfect <br />
            <span className="italic">Journey.</span>
          </h1>

          <p className="text-sm sm:text-base text-white/85 font-light leading-relaxed font-manrope">
            Tell us about your dream getaway, and our private concierge will craft a day-by-day itinerary tailored to your passions and timeline.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-white/80">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#b8cbbc]" /> 24/7 Concierge
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#b8cbbc]" /> 100% Tailored
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#b8cbbc]" /> Zero Compromise
            </span>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl">
        {isSuccess ? (
          <div className="text-center py-12 space-y-5 animate-in fade-in duration-300 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#b8cbbc]/20 text-[#b8cbbc] flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold text-white font-playfair">Itinerary Request Received</h3>
            <p className="text-sm sm:text-base text-[#c3c8c2] leading-relaxed">
              Thank you, <span className="text-white font-semibold">{formData.firstName}</span>! We’ve assigned our senior travel architect to design your bespoke experience for <span className="text-[#b8cbbc] font-medium">{formData.destination}</span> starting around <span className="text-white font-medium">{formData.date}</span>.
            </p>
            <p className="text-xs text-[#8d928d]">
              A complete itinerary blueprint and personal consultation link have been queued for your inbox.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  destination: 'Italian Dolomites & Alpine Lakes',
                  travelers: '2 Travelers',
                  date: '2025-07-15',
                  message: '',
                  travelStyle: 'Relaxed Slow Luxury'
                });
              }}
              className="px-8 py-3 rounded-full bg-[#b8cbbc] text-[#233429] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
            >
              Plan Another Journey
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8d928d] mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Eleanor"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full bg-[#1c1b1b] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#b8cbbc]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8d928d] mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Vance"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full bg-[#1c1b1b] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#b8cbbc]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8d928d] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="eleanor.vance@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#1c1b1b] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#b8cbbc]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8d928d] mb-2">
                  Desired Destination or Region *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dolomites, Kyoto, Thai Islands, Amalfi Coast..."
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full bg-[#1c1b1b] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#b8cbbc]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8d928d] mb-2">
                  Number of Travelers
                </label>
                <select
                  value={formData.travelers}
                  onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                  className="w-full bg-[#1c1b1b] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#b8cbbc] cursor-pointer"
                >
                  <option value="1 Solo Traveler">Solo Traveler (1 Person)</option>
                  <option value="2 Travelers (Couple/Duo)">2 Travelers (Couple / Duo)</option>
                  <option value="Small Group (3-5)">Small Group (3–5 Travelers)</option>
                  <option value="Private Charter Group (6+)">Private Charter Group (6+ Travelers)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8d928d] mb-2">
                  Estimated Travel Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-[#1c1b1b] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#b8cbbc] cursor-pointer"
                />
              </div>
            </div>

            {/* Travel Style Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8d928d] mb-2">
                Preferred Travel Style
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {travelStyles.map((style) => {
                  const isSelected = formData.travelStyle === style;
                  return (
                    <button
                      type="button"
                      key={style}
                      onClick={() => setFormData({ ...formData, travelStyle: style })}
                      className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#b8cbbc] bg-[#b8cbbc]/15 text-white font-semibold'
                          : 'border-white/10 bg-white/5 text-[#c3c8c2] hover:border-white/25 hover:text-white'
                      }`}
                    >
                      {style}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8d928d] mb-2">
                Special Requests or Must-See Highlights
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Include private helicopter charter requests, dietary specifications, anniversary celebrations, or particular trail passes..."
                className="w-full bg-[#1c1b1b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#b8cbbc]"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-[#b8cbbc] text-[#233429] text-xs font-bold uppercase tracking-wider hover:bg-[#d4e7d8] transition-all flex items-center justify-center gap-2 shadow-2xl disabled:opacity-50 cursor-pointer"
              >
                <span>{isSubmitting ? 'Submitting Blueprint...' : 'Submit Custom Itinerary Request'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
};
