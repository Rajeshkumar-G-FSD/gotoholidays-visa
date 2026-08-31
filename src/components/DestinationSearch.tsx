import React, { useEffect, useRef, useState } from 'react';
import { Globe, Search, Binoculars, ArrowRight } from 'lucide-react';
import { DESTINATION_PACKAGES } from '../data/travelData';

interface DestinationSearchProps {
  onSelect: (id: string) => void;
}

const inr = (n: number) => '₹' + n.toLocaleString('en-IN');

export const DestinationSearch: React.FC<DestinationSearchProps> = ({ onSelect }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapRef = useRef<HTMLDivElement>(null);

  const results = DESTINATION_PACKAGES.filter((d) =>
    d.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const explore = () => {
    const pick = results[0] || DESTINATION_PACKAGES[0];
    onSelect(pick.id);
  };

  return (
    <div ref={wrapRef} className="relative w-full max-w-2xl">
      {/* Field */}
      <div className="flex items-center gap-2 sm:gap-3 rounded-full bg-white/95 backdrop-blur-md p-2 pl-2 shadow-2xl">
        <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
          <Globe className="w-5 h-5" />
        </span>
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => e.key === 'Enter' && explore()}
          placeholder="Choose a destination..."
          className="flex-1 min-w-0 bg-transparent outline-none text-sm sm:text-base text-slate-800 placeholder:text-slate-400 py-2"
        />
        <button
          onClick={explore}
          className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#1e40af] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-bold uppercase tracking-[0.12em] px-5 sm:px-7 py-3 sm:py-3.5 transition-colors cursor-pointer"
        >
          <Binoculars className="w-4 h-4" />
          <span>Explore</span>
        </button>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 mt-3 rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden z-30 max-h-[22rem] overflow-y-auto animate-fade-in">
          {results.length === 0 && (
            <p className="px-6 py-5 text-sm text-slate-400">No destinations match “{query}”.</p>
          )}
          {results.map((d) => (
            <button
              key={d.id}
              onClick={() => {
                setOpen(false);
                onSelect(d.id);
              }}
              className="w-full flex items-center gap-4 px-5 sm:px-6 py-3.5 hover:bg-slate-50 transition-colors cursor-pointer text-left border-b border-slate-100 last:border-0"
            >
              <span className="text-xl w-7 text-center shrink-0" aria-hidden="true">
                {d.flag}
              </span>
              <span className="flex-1 font-semibold text-slate-800">{d.name}</span>
              <span className="flex items-center gap-2 text-sm shrink-0">
                <span className="text-slate-400 line-through text-xs">{inr(d.originalPrice)}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                <span className="font-bold text-slate-900">{inr(d.price)}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
