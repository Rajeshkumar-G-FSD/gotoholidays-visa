import React from 'react';
import { Compass, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
}

const LEGAL = ['Privacy Policy', 'Global Terms', 'Cookies', 'Client Confidentiality'];

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer
      id="app-footer"
      className="relative bg-gradient-to-b from-[#0a192f] to-[#071326] border-t border-blue-900/60 text-slate-300 overflow-hidden"
    >
      {/* subtle sapphire glow, echoing the hero */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#1e40af]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 w-96 h-96 rounded-full bg-[#0f2b5c]/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-5">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <span className="w-9 h-9 rounded-full bg-blue-600/25 border border-blue-400/40 flex items-center justify-center">
                <Compass className="w-5 h-5 text-blue-300 group-hover:rotate-45 transition-transform" />
              </span>
              <span className="text-xl font-bold tracking-tight text-white font-manrope">Goto Holidays</span>
            </button>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Elevating global travel to an art form for the discerning few. Redefining luxury for the modern
              connoisseur.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {[Instagram, Youtube, Linkedin].map((Icon, i) => (
                <span
                  key={i}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-slate-300 hover:text-white hover:border-white/40 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <Icon className="w-4 h-4" />
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-400">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Email Inquiries</p>
                  <p className="text-blue-200">gotoholidaysandvisa@gmail.com</p>
                  <p className="text-blue-200">info@gotoholidays-visa.co.in</p>
                </div>
              </div>
              <div className="flex gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Priority Hotline</p>
                  <p className="text-slate-200 font-semibold">+91 984045 4061</p>
                  <p className="text-emerald-400 font-semibold">WhatsApp: +91 984045 4061</p>
                </div>
              </div>
            </div>
          </div>

          {/* Offices */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-400">Offices</h4>
            <div className="space-y-4 text-xs leading-relaxed text-slate-300">
              <div className="flex gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Chennai HQ</p>
                  <p>
                    No:2/305, Puzgalanthi salai ki,
                    <br />
                    J.J nagar east, Mugappair east,
                    <br />
                    Chennai 600037
                  </p>
                </div>
              </div>
              <div className="flex gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Nagercoil Office</p>
                  <p>
                    NO 23-80A EAST STREET KAKAMOOR,
                    <br />
                    SUCHINDRUM, KANYAKUMARI,
                    <br />
                    TN 629704
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-400">Legal &amp; Privacy</h4>
            <ul className="space-y-2.5 text-sm">
              {LEGAL.map((item) => (
                <li key={item}>
                  <span className="text-slate-300 hover:text-white transition-colors cursor-pointer">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
          <p>
            © {new Date().getFullYear()}{' '}
            <a
              href="https://www.datazync.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-slate-400 transition-colors duration-200 hover:text-white after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-[#60a5fa] after:transition-all after:duration-300 hover:after:w-full"
            >
              DATAZYNC.COM
            </a>{' '}
            — Private &amp; Confidential.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Sitemap</span>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">Press Inquiries</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
