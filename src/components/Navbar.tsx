import React, { useState, useEffect } from 'react';
import { ActiveTab } from '../types';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { tab: ActiveTab; label: string }[] = [
    { tab: 'home', label: 'Home' },
    { tab: 'destinations', label: 'Destinations' },
    { tab: 'visa-services', label: 'Visa Services' },
    { tab: 'packages', label: 'Packages' },
    { tab: 'enquiry', label: 'Get in Touch' },
    { tab: 'about', label: 'About Us' },
    { tab: 'contact', label: 'Contact' },
  ];

  return (
    <header
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-blue-100/90 py-3.5 shadow-md shadow-blue-950/5'
          : 'bg-white/80 backdrop-blur-sm border-b border-blue-50/60 py-5 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="nav-logo"
          onClick={() => {
            onNavigate('home');
            setIsMobileMenuOpen(false);
          }}
          aria-label="Goto Holidays — home"
          className="group cursor-pointer shrink-0"
        >
          <img
            src="/images/goto_holidays.png"
            alt="Goto Holidays"
            className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
              isScrolled ? 'h-12 sm:h-14' : 'h-14 sm:h-16 lg:h-20'
            }`}
          />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                id={`nav-link-${item.tab}`}
                onClick={() => onNavigate(item.tab)}
                className={`text-sm tracking-wide transition-all duration-200 cursor-pointer relative py-1.5 ${
                  isActive
                    ? 'text-[#1e40af] font-bold'
                    : 'text-slate-700 hover:text-[#1e40af] font-medium'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#1e40af] rounded-full shadow-[0_0_8px_rgba(30,64,175,0.4)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <button
            id="nav-plan-trip-btn"
            onClick={() => onNavigate('enquiry')}
            className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md ${
              activeTab === 'enquiry'
                ? 'bg-[#0f2b5c] text-white shadow-blue-900/30'
                : 'bg-[#1e40af] hover:bg-[#1d4ed8] text-white hover:shadow-lg hover:shadow-blue-600/25 hover:scale-[1.02]'
            }`}
          >
            <span>Enquire Now</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            id="nav-mobile-menu-btn"
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0f2b5c] hover:bg-blue-100 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-blue-100 px-6 py-6 mt-3 space-y-4 shadow-xl animate-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => {
                    onNavigate(item.tab);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left py-3 px-4 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-blue-50 text-[#1e40af] border-l-4 border-[#1e40af]'
                      : 'text-slate-700 hover:text-[#1e40af] hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#1e40af]" />}
                </button>
              );
            })}

            <button
              onClick={() => {
                onNavigate('enquiry');
                setIsMobileMenuOpen(false);
              }}
              className="w-full mt-3 py-3 px-4 rounded-full bg-[#1e40af] hover:bg-[#1d4ed8] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
            >
              <span>Enquire Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
