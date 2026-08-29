import React, { useState, useEffect } from 'react';
import { ActiveTab } from '../types';
import { Menu, X, Compass, ArrowUpRight } from 'lucide-react';

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
    { tab: 'packages', label: 'Travel Packages' },
    { tab: 'about', label: 'About Us' },
    { tab: 'contact', label: 'Contact' },
  ];

  return (
    <header
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-panel border-b border-white/10 py-4 shadow-xl'
          : 'bg-transparent py-6'
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
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:border-[#b8cbbc] transition-colors">
            <Compass className="w-5 h-5 text-[#b8cbbc] group-hover:rotate-45 transition-transform duration-300" />
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#e5e2e1] group-hover:text-white transition-colors font-manrope">
            Logoipsum
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                id={`nav-link-${item.tab}`}
                onClick={() => onNavigate(item.tab)}
                className={`text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer relative py-1 ${
                  isActive
                    ? 'text-[#b8cbbc] font-semibold'
                    : 'text-[#e5e2e1]/80 hover:text-white hover:scale-105'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#b8cbbc] rounded-full shadow-[0_0_8px_rgba(184,203,188,0.6)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <button
            id="nav-plan-trip-btn"
            onClick={() => onNavigate('plan')}
            className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === 'plan'
                ? 'bg-[#b8cbbc] text-[#233429] shadow-lg shadow-[#b8cbbc]/20 font-bold'
                : 'glass-pill text-[#e5e2e1] hover:bg-white/20 hover:border-white/40'
            }`}
          >
            <span>Plan Journey</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            id="nav-mobile-menu-btn"
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-white/10 px-6 py-6 mt-3 space-y-4 animate-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => {
                    onNavigate(item.tab);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left py-2.5 px-3 rounded-lg text-base font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-white/10 text-[#b8cbbc] font-semibold border-l-2 border-[#b8cbbc]'
                      : 'text-[#e5e2e1]/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#b8cbbc]" />}
                </button>
              );
            })}

            <button
              onClick={() => {
                onNavigate('plan');
                setIsMobileMenuOpen(false);
              }}
              className="w-full mt-3 py-3 px-4 rounded-full bg-[#b8cbbc] text-[#233429] text-sm font-semibold flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Plan Custom Journey</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
