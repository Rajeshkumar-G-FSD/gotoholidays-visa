import React, { useState } from 'react';
import { ActiveTab, Destination, TravelPackage, VisaRequirement, InquiryFormData, CustomPlanFormData, ToastMessage } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroHome } from './components/HeroHome';
import { TravelPackagesView } from './components/TravelPackagesView';
import { VisaRequirementsView } from './components/VisaRequirementsView';
import { AboutUsView } from './components/AboutUsView';
import { ContactView } from './components/ContactView';
import { PlanJourneyView } from './components/PlanJourneyView';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { PackageDetailModal } from './components/PackageDetailModal';
import { VisaDetailModal } from './components/VisaDetailModal';
import { Toast } from './components/Toast';
import { DESTINATIONS, TRAVEL_PACKAGES } from './data/travelData';
import { ArrowUpRight, Sparkles, MapPin, ShieldCheck, Compass, Heart } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const [selectedVisa, setSelectedVisa] = useState<VisaRequirement | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, description: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleNavigate = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlanTrip = (destinationOrCountryName?: string) => {
    setActiveTab('plan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (destinationOrCountryName) {
      addToast('Destination Pre-Selected', `Drafting custom itinerary for ${destinationOrCountryName}.`, 'info');
    }
  };

  const handleBookPackage = (pkg: TravelPackage) => {
    addToast(
      'Reservation Initiated',
      `Our concierge has reserved your spot for "${pkg.title}". We will contact you with booking confirmation.`,
      'success'
    );
  };

  const handleInquirySubmit = (data: InquiryFormData) => {
    addToast(
      'Inquiry Sent',
      `Thank you ${data.firstName}! We received your request regarding ${data.destination}.`,
      'success'
    );
  };

  const handlePlanSubmit = (data: CustomPlanFormData) => {
    addToast(
      'Itinerary Blueprint Queued',
      `Thank you ${data.firstName}! Your tailored itinerary for ${data.destination} (${data.travelers}) is being crafted.`,
      'success'
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] flex flex-col justify-between selection:bg-[#1e40af] selection:text-white">
      {/* Top Fixed Navigation */}
      <Navbar activeTab={activeTab} onNavigate={handleNavigate} />

      {/* Main Content Body */}
      <main className="flex-1 w-full">
        {activeTab === 'home' && (
          <div>
            {/* Hero Section matching Royal Theme */}
            <HeroHome
              onNavigate={handleNavigate}
              onSelectDestination={(dest) => setSelectedDestination(dest)}
            />

            {/* Seamless Home Discovery Preview: Curated Journeys */}
            <section className="py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-[#1e40af] mb-2 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Featured Collections</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] font-playfair">
                    Curated Expeditions
                  </h2>
                </div>
                <button
                  onClick={() => handleNavigate('packages')}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1e40af] hover:text-[#1d4ed8] transition-colors cursor-pointer group"
                >
                  <span>View All Journeys</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {TRAVEL_PACKAGES.slice(0, 3).map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className="group rounded-3xl overflow-hidden bg-white border border-blue-100 hover:border-blue-300 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:translate-y-[-4px] shadow-lg shadow-blue-950/5 hover:shadow-xl hover:shadow-blue-900/10"
                  >
                    <div className="relative h-60 w-full overflow-hidden">
                      <img
                        src={pkg.imageUrl}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-md text-[#0f2b5c] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                          {pkg.duration}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between bg-white">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-[#1e40af] font-semibold mb-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{pkg.location}</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#0f172a] font-playfair group-hover:text-[#1e40af] transition-colors">
                          {pkg.title}
                        </h3>
                        <p className="text-xs text-[#475569] line-clamp-2 mt-1 leading-relaxed">
                          {pkg.subtitle}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Starting</span>
                          <span className="text-lg font-bold text-[#0f2b5c]">${pkg.price.toLocaleString()}</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1e40af] group-hover:bg-[#1e40af] group-hover:text-white transition-colors shadow-sm">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Core Values Quick Banner */}
            <section className="pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
              <div className="bg-white p-8 sm:p-12 rounded-3xl border border-blue-100 shadow-xl shadow-blue-950/5 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1e40af] flex-shrink-0 shadow-sm">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#0f172a] mb-1">Uncharted Sanctuaries</h4>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      Handpicked secluded valleys, private islets, and pristine alpine retreats.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1e40af] flex-shrink-0 shadow-sm">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#0f172a] mb-1">Certified Eco-Stewardship</h4>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      100% carbon-neutral itineraries and native conservation partnerships.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1e40af] flex-shrink-0 shadow-sm">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#0f172a] mb-1">24/7 Private Concierge</h4>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      Dedicated travel architects ensuring seamless logistics at every step.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'destinations' && (
          <VisaRequirementsView
            onSelectVisa={(visa) => setSelectedVisa(visa)}
          />
        )}

        {activeTab === 'packages' && (
          <TravelPackagesView
            onSelectPackage={(pkg) => setSelectedPackage(pkg)}
            onBookPackage={(pkg) => handleBookPackage(pkg)}
          />
        )}

        {activeTab === 'about' && (
          <AboutUsView onNavigate={handleNavigate} />
        )}

        {activeTab === 'contact' && (
          <ContactView onFormSubmit={handleInquirySubmit} />
        )}

        {activeTab === 'plan' && (
          <PlanJourneyView onPlanSubmit={handlePlanSubmit} />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals */}
      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onPlanTrip={(destName) => handlePlanTrip(destName)}
      />

      <PackageDetailModal
        pkg={selectedPackage}
        onClose={() => setSelectedPackage(null)}
        onBookNow={(pkg) => {
          handleBookPackage(pkg);
          setSelectedPackage(null);
        }}
      />

      <VisaDetailModal
        visa={selectedVisa}
        onClose={() => setSelectedVisa(null)}
        onPlanTrip={(countryName) => handlePlanTrip(countryName)}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};

export default App;

