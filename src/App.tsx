import React, { useEffect, useRef, useState } from 'react';
import { ActiveTab, Destination, TravelPackage, VisaRequirement, InquiryFormData, CustomPlanFormData, ToastMessage } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroHome } from './components/HeroHome';
import { UpdatesMarquee } from './components/UpdatesMarquee';
import { StatsBand } from './components/StatsBand';
import { VisaServicesSection } from './components/VisaServicesSection';
import { VisaServicesPage } from './components/VisaServicesPage';
import { ThailandPackagesSection } from './components/ThailandPackagesSection';
import { GlobalPackagesSection } from './components/GlobalPackagesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { DiscoverPackagesPage } from './components/DiscoverPackagesPage';
import { DestinationDetailPage } from './components/DestinationDetailPage';
import { EnquiryPage, EnquiryTab } from './components/EnquiryPage';
import { AdminPage } from './components/AdminPage';
import { ScrollTopRail } from './components/ScrollTopRail';
import { buildRecord, saveEnquiry } from './lib/enquiryStore';
import { parsePath, pathFor, pushTab } from './lib/router';
import { VisaRequirementsView } from './components/VisaRequirementsView';
import { AboutUsView } from './components/AboutUsView';
import { ContactView } from './components/ContactView';
import { PlanJourneyView } from './components/PlanJourneyView';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { PackageDetailModal } from './components/PackageDetailModal';
import { VisaDetailModal } from './components/VisaDetailModal';
import { Toast } from './components/Toast';
import { ChatBot } from './components/ChatBot';
import { ShieldCheck, Compass, Heart } from 'lucide-react';

const initialLocation = () =>
  typeof window === 'undefined' ? { tab: 'home' as ActiveTab } : parsePath(window.location.pathname);

export const App: React.FC = () => {
  const initial = initialLocation();
  const [activeTab, setActiveTab] = useState<ActiveTab>(initial.tab);
  const [enquiryTab, setEnquiryTab] = useState<EnquiryTab>('travel');
  const [enquiryPrefill, setEnquiryPrefill] = useState('');
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(
    initial.destinationId ?? null
  );
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const [selectedVisa, setSelectedVisa] = useState<VisaRequirement | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const activeTabRef = useRef(activeTab);
  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  // First visit of the session: after 5s, jump to the "Get in Touch" page.
  useEffect(() => {
    if (sessionStorage.getItem('gh_enquiry_autoopen')) return;
    const id = window.setTimeout(() => {
      sessionStorage.setItem('gh_enquiry_autoopen', '1');
      if (window.location.hash.replace('#', '') === 'admin') return;
      if (activeTabRef.current !== 'home') return;
      setActiveTab('enquiry');
      pushTab('enquiry');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 5000);
    return () => window.clearTimeout(id);
  }, []);

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
    pushTab(tab);
    if (tab !== 'admin' && window.location.hash) window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keep the browser URL in sync with the active tab — back/forward, a hard
  // refresh, or a shared link (/home, /packages, /destinations/maldives, …)
  // all land on the right page. #admin is kept working for old bookmarks.
  useEffect(() => {
    if (window.location.hash.replace('#', '') === 'admin') {
      setActiveTab('admin');
      window.history.replaceState({}, '', '/admin');
    } else if (!window.location.pathname || window.location.pathname === '/') {
      window.history.replaceState({}, '', pathFor(initial.tab, initial.destinationId));
    }

    const onPopState = () => {
      const loc = parsePath(window.location.pathname);
      setActiveTab(loc.tab);
      if (loc.tab === 'destination-detail' && loc.destinationId) {
        setSelectedDestinationId(loc.destinationId);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const onHashChange = () => {
      if (window.location.hash.replace('#', '') === 'admin') {
        setActiveTab('admin');
        window.history.replaceState({}, '', '/admin');
      }
    };
    window.addEventListener('popstate', onPopState);
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('hashchange', onHashChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlanTrip = (destinationOrCountryName?: string) => {
    setActiveTab('plan');
    pushTab('plan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (destinationOrCountryName) {
      addToast('Destination Pre-Selected', `Drafting custom itinerary for ${destinationOrCountryName}.`, 'info');
    }
  };

  const openEnquiry = (tab: EnquiryTab, prefill = '') => {
    setEnquiryTab(tab);
    setEnquiryPrefill(prefill);
    setActiveTab('enquiry');
    pushTab('enquiry');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnquirySubmit = (tab: EnquiryTab, data: Record<string, string | string[]>) => {
    void saveEnquiry(buildRecord(tab, data));
    const who = typeof data.fullName === 'string' && data.fullName ? data.fullName.split(' ')[0] : 'there';
    const subject =
      tab === 'visa'
        ? `${(data.visaCountry as string) || 'your'} visa`
        : `${(data.destination as string) || 'your'} trip`;
    addToast(
      'Enquiry Received',
      `Thank you ${who}! Our ${tab === 'visa' ? 'visa' : 'travel'} specialist will contact you about ${subject} within 24 hours.`,
      'success'
    );
    setActiveTab('home');
    pushTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // Admin console renders standalone — no marketing chrome.
  if (activeTab === 'admin') {
    return (
      <>
        <AdminPage onNavigate={handleNavigate} />
        <Toast toasts={toasts} onDismiss={removeToast} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] flex flex-col justify-between overflow-x-hidden selection:bg-[#1e40af] selection:text-white">
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

            {/* Live travel & visa updates ticker */}
            <UpdatesMarquee />

            {/* Animated Stats Band */}
            <StatsBand />

            {/* Popular Visa Services */}
            <VisaServicesSection
              onApply={(name) => openEnquiry('visa', name)}
              onViewAll={() => handleNavigate('visa-services')}
            />

            {/* Tour Packages (also on the dedicated Packages page) */}
            <ThailandPackagesSection onEnquire={(name) => openEnquiry('travel', name)} />
            <GlobalPackagesSection onSelect={(name) => openEnquiry('travel', name)} />
            <TestimonialsSection />

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

        {activeTab === 'visa-services' && (
          <VisaServicesPage
            onNavigate={handleNavigate}
            onApply={(name) => openEnquiry('visa', name)}
          />
        )}

        {activeTab === 'packages' && (
          <DiscoverPackagesPage
            onNavigate={handleNavigate}
            onEnquire={(name) => openEnquiry('travel', name)}
            onOpenDestination={(id) => {
              setSelectedDestinationId(id);
              setActiveTab('destination-detail');
              pushTab('destination-detail', id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'destination-detail' && (
          <DestinationDetailPage
            destinationId={selectedDestinationId}
            onNavigate={handleNavigate}
            onEnquire={(name) => openEnquiry('travel', name)}
          />
        )}

        {activeTab === 'enquiry' && (
          <EnquiryPage
            initialTab={enquiryTab}
            prefill={enquiryPrefill}
            onNavigate={handleNavigate}
            onSubmit={handleEnquirySubmit}
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

      {/* Scroll-to-top rail */}
      <ScrollTopRail />

      {/* WhatsApp-style guided assistant */}
      <ChatBot />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};

export default App;

