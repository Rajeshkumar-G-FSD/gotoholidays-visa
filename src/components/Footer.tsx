import React from 'react';
import { ActiveTab } from '../types';
import { Compass, ArrowUpRight, ShieldCheck, Globe, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="app-footer" className="bg-[#0e0e0e] border-t border-white/10 pt-16 pb-12 text-[#c3c8c2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <Compass className="w-5 h-5 text-[#b8cbbc]" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#e5e2e1] font-manrope">
                Logoipsum
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#c3c8c2] max-w-sm">
              Dedicated to crafting extraordinary journeys into the world's most serene and untouched landscapes. Uncover authentic experiences with mindful travel.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-[#8d928d]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#b8cbbc]" /> 100% Certified Eco-Stewardship
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#b8cbbc]" /> Global Concierge
              </span>
            </div>
          </div>

          {/* Col 3: Explore */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#e5e2e1]">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('destinations')}
                  className="hover:text-[#b8cbbc] transition-colors cursor-pointer text-left"
                >
                  Featured Destinations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('packages')}
                  className="hover:text-[#b8cbbc] transition-colors cursor-pointer text-left"
                >
                  Curated Journeys
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('destinations')}
                  className="hover:text-[#b8cbbc] transition-colors cursor-pointer text-left"
                >
                  Visa Requirements
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('plan')}
                  className="hover:text-[#b8cbbc] transition-colors cursor-pointer text-left flex items-center gap-1"
                >
                  Custom Itineraries <ArrowUpRight className="w-3 h-3 text-[#b8cbbc]" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#e5e2e1]">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#b8cbbc] transition-colors cursor-pointer text-left"
                >
                  Our Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#b8cbbc] transition-colors cursor-pointer text-left"
                >
                  Sustainable Immersion
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#b8cbbc] transition-colors cursor-pointer text-left"
                >
                  Contact & Global Offices
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Global Offices */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#e5e2e1]">
              Offices
            </h4>
            <div className="space-y-3 text-xs leading-relaxed text-[#c3c8c2]">
              <div>
                <p className="font-medium text-[#e5e2e1]">New York (HQ)</p>
                <p>123 Explorer Way, Suite 400</p>
                <p className="text-[#8d928d]">contact@logoipsum.com</p>
              </div>
              <div className="pt-2 border-t border-white/5">
                <p className="font-medium text-[#e5e2e1]">London Office</p>
                <p>45 Wanderlust Lane, W1D 3QU</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8d928d]">
          <p>© {new Date().getFullYear()} Logoipsum Travel. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition-colors cursor-pointer">Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
