import React from 'react';
import { ActiveTab } from '../types';
import { Compass, ArrowUpRight, ShieldCheck, Globe, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="app-footer" className="bg-[#0a192f] border-t border-blue-900/60 pt-16 pb-12 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center border border-blue-400/40 shadow-sm">
                <Compass className="w-5 h-5 text-blue-300" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-manrope">
                Goto Holidays
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-300 max-w-sm">
              Dedicated to crafting extraordinary journeys into the world's most serene and untouched landscapes. Uncover authentic experiences with mindful royal hospitality.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-blue-200">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-blue-400" /> 100% Certified Eco-Stewardship
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <Globe className="w-4 h-4 text-blue-400" /> Global Concierge
              </span>
            </div>
          </div>

          {/* Col 3: Explore */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('destinations')}
                  className="hover:text-blue-300 transition-colors cursor-pointer text-left font-medium"
                >
                  Featured Destinations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('packages')}
                  className="hover:text-blue-300 transition-colors cursor-pointer text-left font-medium"
                >
                  Curated Journeys
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('destinations')}
                  className="hover:text-blue-300 transition-colors cursor-pointer text-left font-medium"
                >
                  Visa Requirements
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('plan')}
                  className="hover:text-blue-300 transition-colors cursor-pointer text-left flex items-center gap-1 font-medium"
                >
                  Custom Itineraries <ArrowUpRight className="w-3 h-3 text-blue-400" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-blue-300 transition-colors cursor-pointer text-left font-medium"
                >
                  Our Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-blue-300 transition-colors cursor-pointer text-left font-medium"
                >
                  Sustainable Immersion
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-blue-300 transition-colors cursor-pointer text-left font-medium"
                >
                  Contact & Global Offices
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Global Offices */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Offices
            </h4>
            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <div>
                <p className="font-bold text-white">New York (HQ)</p>
                <p>123 Explorer Way, Suite 400</p>
                <p className="text-blue-300 font-medium">contact@logoipsum.com</p>
              </div>
              <div className="pt-2 border-t border-blue-900/40">
                <p className="font-bold text-white">London Office</p>
                <p>45 Wanderlust Lane, W1D 3QU</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-900/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Goto Holidays. All rights reserved.</p>
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
