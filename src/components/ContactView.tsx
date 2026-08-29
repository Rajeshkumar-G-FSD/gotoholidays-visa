import React, { useState } from 'react';
import { OFFICE_LOCATIONS } from '../data/travelData';
import { InquiryFormData } from '../types';
import { Mail, Phone, Clock, ArrowRight, MapPin, Send, CheckCircle } from 'lucide-react';

interface ContactViewProps {
  onFormSubmit: (data: InquiryFormData) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    firstName: '',
    lastName: '',
    email: '',
    destination: 'Italian Dolomites',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onFormSubmit(formData);
    }, 600);
  };

  return (
    <div id="contact-view" className="w-full min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-16">
      
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-blue-200/80 min-h-[380px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIG3sx9i_iR-Tu8EGY_6rZifyJtQV7TV1uXQVDlU1Nv_D9uAV8IrQZCj6fiEq8--KxB84_RPfluWt7GcKFF5xfimyZ7_NqP8PJXwaVfbr2SCiuwiGfyrGc8tH5b6mOr1zl4vRNO35DXVGHGX3wh0JyMcXfF5IIDTcL5iOBNyNFJAIteauUkPFgkyuTTvpSs5i7YoVfB2TQwsYdZkqouKIU5DbmasgzxpMnoR2nKP3YVZgR1-sgqqNZ"
            alt="Misty mountain valley contact"
            className="w-full h-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/90 via-[#0f2b5c]/70 to-[#0a192f]/80" />
        </div>

        <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-wider text-white">
            <span className="w-2 h-2 rounded-full bg-blue-300" />
            <span>Get in Touch</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-playfair tracking-tight leading-tight">
            Let's craft your <br />
            <span className="italic font-normal text-blue-200">next adventure.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-manrope">
            Whether you have a question about our bespoke itineraries, entry visa protocols, or custom private charters, our travel concierges are at your service.
          </p>
        </div>
      </div>

      {/* Main Grid: Contact Form + Direct Info & Maps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Column */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-blue-100 shadow-xl shadow-blue-950/5">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#0f172a] font-playfair mb-1">
              Send an Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-[#475569]">
              Fill out the form below and an itinerary specialist will respond within 24 hours.
            </p>
          </div>

          {isSuccess ? (
            <div className="p-8 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-[#1e40af] flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0f172a]">Inquiry Received</h3>
              <p className="text-sm text-[#334155] max-w-md mx-auto">
                Thank you, <span className="font-bold text-[#0f172a]">{formData.firstName}</span>. Our bespoke journey curator has received your inquiry for <span className="text-[#1e40af] font-semibold">{formData.destination}</span> and will get in touch with you shortly.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setFormData({ firstName: '', lastName: '', email: '', destination: 'Italian Dolomites', message: '' });
                }}
                className="px-6 py-2.5 rounded-full bg-[#1e40af] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1d4ed8] shadow-md transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Jane"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-[#1e40af] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-[#1e40af] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane.doe@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-[#1e40af] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Destination of Interest
                </label>
                <select
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0f172a] focus:outline-none focus:border-[#1e40af] focus:bg-white cursor-pointer"
                >
                  <option value="Italian Dolomites">Alpine Serenity (Italian Dolomites)</option>
                  <option value="Cinque Terre, Italy">Coastal Escapade (Cinque Terre, Italy)</option>
                  <option value="Thai Islands & Coves">Island Hopping (Thai Islands & Coves)</option>
                  <option value="Kyoto & Hakone, Japan">Kyoto Zen & Ancient Trails (Japan)</option>
                  <option value="Venetian Canals">Venetian Palazzos & Waterways</option>
                  <option value="Custom Private Itinerary">Custom Private Itinerary</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Message / Travel Preferences *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your target dates, travel party, and any special experiences you envision..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-[#1e40af] focus:bg-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[#1e40af] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1d4ed8] hover:scale-[1.01] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  <span>{isSubmitting ? 'Sending Request...' : 'Send Inquiry'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Info & Global Offices Column */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Direct Contact Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-blue-100 space-y-5 shadow-xl shadow-blue-950/5">
            <h3 className="text-xl font-bold text-[#0f172a] font-playfair">Direct Concierge</h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3.5 text-[#334155]">
                <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1e40af] shadow-sm">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">Email Us</p>
                  <p className="text-[#0f172a] font-semibold">concierge@logoipsum.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-[#334155]">
                <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1e40af] shadow-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">Call Anywhere</p>
                  <p className="text-[#0f172a] font-semibold">+1 (800) 555-0199</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-[#334155]">
                <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1e40af] shadow-sm">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">Concierge Desk</p>
                  <p className="text-[#0f172a] font-semibold">24 Hours / 7 Days a Week</p>
                </div>
              </div>
            </div>
          </div>

          {/* Global Offices Maps */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
              Global Offices
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {OFFICE_LOCATIONS.map((loc, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-2xl border border-blue-100 flex items-center gap-4 group shadow-md hover:border-blue-300 transition-all"
                >
                  <img
                    src={loc.mapImage}
                    alt={loc.city}
                    className="w-20 h-20 rounded-xl object-cover border border-blue-100 flex-shrink-0 group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#0f172a]">{loc.city}</h4>
                      <span className="bg-blue-50 text-[#1e40af] border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {loc.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#475569] whitespace-pre-line leading-relaxed">
                      {loc.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
