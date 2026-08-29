import React from 'react';
import { ChevronRight } from 'lucide-react';
import { THAILAND_PACKAGES } from '../data/travelData';
import BlurText from './BlurText';
import SplitText from './SplitText';
import Reveal from './Reveal';

interface ThailandPackagesSectionProps {
  onEnquire: (name: string) => void;
}

const inr = (n: number) => '₹' + n.toLocaleString('en-IN');

export const ThailandPackagesSection: React.FC<ThailandPackagesSectionProps> = ({ onEnquire }) => {
  return (
    <section id="thailand-packages" className="py-20 px-4 sm:px-6 lg:px-12 bg-[#faf5f3]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-red-600 mb-3">Seasonal Special</p>
          <BlurText
            as="h2"
            text="Best Thailand Tour Packages"
            animateBy="words"
            direction="top"
            delay={110}
            className="justify-center text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] font-playfair italic"
          />
          <SplitText
            tag="p"
            text="Explore Bangkok, Pattaya & Phuket with affordable luxury packages from GOTO Holidays."
            splitType="words"
            delay={16}
            duration={0.8}
            from={{ opacity: 0, y: 18 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="center"
            className="mt-3 text-sm sm:text-base text-slate-500 !block"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {THAILAND_PACKAGES.map((pkg, idx) => (
            <Reveal key={pkg.id} from={idx === 0 ? 'left' : idx === 2 ? 'right' : 'up'} delay={idx * 0.08} className="h-full">
              <article className="group h-full flex flex-col bg-white rounded-[26px] overflow-hidden shadow-[0_20px_45px_-20px_rgba(15,23,42,0.22)] hover:shadow-[0_28px_65px_-22px_rgba(15,23,42,0.3)] hover:-translate-y-1.5 transition-all duration-300">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 right-4 bg-white/95 text-[#0f172a] text-[11px] font-bold px-3 py-1 rounded-full shadow">
                    {pkg.duration}
                  </span>
                </div>

                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-[#0f172a] font-playfair">{pkg.title}</h3>

                  <ul className="mt-4 space-y-2">
                    {pkg.inclusions.map((inc) => (
                      <li key={inc} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                        {inc}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-red-600">Starting From</p>
                      <p className="text-xl font-bold text-[#0f172a]">{inr(pkg.priceFrom)}</p>
                    </div>
                    <button
                      onClick={() => onEnquire(pkg.title)}
                      className="inline-flex items-center gap-1 rounded-full bg-[#0f172a] hover:bg-[#1e40af] text-white text-[11px] font-bold uppercase tracking-[0.12em] px-5 py-3 transition-colors cursor-pointer"
                    >
                      Enquire Now
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
