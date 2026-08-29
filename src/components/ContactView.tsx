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
      
      {/* Hero Header matching Image 12 */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 min-h-[380px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIG3sx9i_iR-Tu8EGY_6rZifyJtQV7TV1uXQVDlU1Nv_D9uAV8IrQZCj6fiEq8--KxB84_RPfluWt7GcKFF5xfimyZ7_NqP8PJXwaVfbr2SCiuwiGfyrGc8tH5b6mOr1zl4vRNO35DXVGHGX3wh0JyMcXfF5IIDTcL5iOBNyNFJAIteauUkPFgkyuTTvpSs5i7YoVfB2TQwsYdZkqouKIU5DbmasgzxpMnoR2nKP3YVZgR1-sgqqNZ"
            alt="Misty mountain valley contact"
            className="w-full h-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/75" />
        </div>

        <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-semibold uppercase tracking-wider text-white">
            <span className="w-2 h-2 rounded-full bg-[#b8cbbc]" />
            <span>Get in Touch</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal text-white font-playfair tracking-tight leading-tight">
            Let's craft your <br />
            <span className="italic">next adventure.</span>
          </h1>

          <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed font-manrope">
            Whether you have a question about our bespoke itineraries, entry visa protocols, or custom private charters, our travel concierges are at your service.
          </p>
        </div>
      </div>

      {/* Main Grid: Contact Form + Direct Info & Maps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Column */}
        <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white font-playfair mb-1">
              Send an Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-[#c3c8c2]">
              Fill out the form below and an itinerary specialist will respond within 24 hours.
            </p>
          </div>

          {isSuccess ? (
            <div className="p-8 rounded-2xl bg-[#2d3e33]/50 border border-[#b8cbbc]/30 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-[#b8cbbc]/20 text-[#b8cbbc] flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Inquiry Received</h3>
              <p className="text-sm text-white/80 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-white">{formData.firstName}</span>. Our bespoke journey curator has received your inquiry for <span className="text-[#b8cbbc]">{formData.destination}</span> and will get in touch with you shortly.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setFormData({ firstName: '', lastName: '', email: '', destination: 'Italian Dolomites', message: '' });
                }}
                className="px-6 py-2.5 rounded-full bg-[#b8cbbc] text-[#233429] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#8d928d] mb-1.5">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Jane"
                    className="w-full bg-[#1c1b1b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#b8cbbc]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#8d928d] mb-1.5">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe"
                    className="w-full bg-[#1c1b1b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#b8cbbc]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8d928d] mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane.doe@example.com"
                  className="w-full bg-[#1c1b1b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#b8cbbc]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8d928d] mb-1.5">
                  Destination of Interest
                </label>
                <select
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full bg-[#1c1b1b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#b8cbbc] cursor-pointer"
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
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8d928d] mb-1.5">
                  Message / Travel Preferences *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your target dates, travel party, and any special experiences you envision..."
                  className="w-full bg-[#1c1b1b] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#b8cbbc]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[#b8cbbc] text-[#233429] text-xs font-bold uppercase tracking-wider hover:bg-[#d4e7d8] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
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
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-5 shadow-xl">
            <h3 className="text-xl font-bold text-white font-playfair">Direct Concierge</h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3.5 text-[#c3c8c2]">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#b8cbbc]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-[#8d928d] uppercase font-semibold">Email Us</p>
                  <p className="text-white font-medium">concierge@logoipsum.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-[#c3c8c2]">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#b8cbbc]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-[#8d928d] uppercase font-semibold">Call Anywhere</p>
                  <p className="text-white font-medium">+1 (800) 555-0199</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-[#c3c8c2]">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#b8cbbc]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-[#8d928d] uppercase font-semibold">Concierge Desk</p>
                  <p className="text-white font-medium">24 Hours / 7 Days a Week</p>
                </div>
              </div>
            </div>
          </div>

          {/* Global Offices Maps matching Image 12 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white px-1">
              Global Offices
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {OFFICE_LOCATIONS.map((loc, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center gap-4 group"
                >
                  <img
                    src={loc.mapImage}
                    alt={loc.city}
                    className="w-20 h-20 rounded-xl object-cover border border-white/10 flex-shrink-0 group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{loc.city}</h4>
                      <span className="bg-white/10 text-[#b8cbbc] text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {loc.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#c3c8c2] whitespace-pre-line leading-relaxed">
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
