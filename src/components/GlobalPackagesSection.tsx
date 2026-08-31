import React from 'react';
import { ArrowRight } from 'lucide-react';
import { GLOBAL_PACKAGES } from '../data/travelData';
import BlurText from './BlurText';
import SplitText from './SplitText';
import Reveal from './Reveal';

interface GlobalPackagesSectionProps {
  onSelect: (name: string) => void;
}

const inr = (n: number) => '₹' + n.toLocaleString('en-IN');

export const GlobalPackagesSection: React.FC<GlobalPackagesSectionProps> = ({ onSelect }) => {
  return (
    <section id="global-packages" className="py-20 px-4 sm:px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <BlurText
            as="h2"
            text="Global Tour Packages"
            animateBy="words"
            direction="top"
            delay={110}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] font-playfair"
          />
          <SplitText
            tag="p"
            text="Curated international experiences designed for your luxury and comfort."
            splitType="words"
            delay={18}
            duration={0.8}
            from={{ opacity: 0, y: 18 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="left"
            className="mt-3 text-sm sm:text-base text-slate-500 !block"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {GLOBAL_PACKAGES.map((pkg, idx) => {
            const col = idx % 3;
            const dir = col === 0 ? 'left' : col === 2 ? 'right' : 'up';
            return (
              <Reveal key={pkg.id} from={dir} delay={(idx % 3) * 0.08} className="h-full">
                <article className="group h-full flex flex-col bg-white rounded-[26px] overflow-hidden shadow-[0_20px_45px_-20px_rgba(15,23,42,0.22)] hover:shadow-[0_28px_65px_-22px_rgba(15,23,42,0.32)] hover:-translate-y-1.5 transition-all duration-300">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={pkg.imageUrl}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/85 via-[#0a192f]/10 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5">
                      <h3 className="text-2xl font-bold text-white font-playfair drop-shadow">{pkg.title}</h3>
                      <p className="text-xs text-blue-100 font-semibold tracking-wide">{pkg.meta}</p>
                    </div>
                  </div>

                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1e40af]">Starting Price</p>
                      <p className="text-lg font-bold text-[#0f172a]">{inr(pkg.priceFrom)}</p>
                    </div>
                    <button
                      onClick={() => onSelect(pkg.title)}
                      aria-label={`Enquire about ${pkg.title}`}
                      className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#1e40af] hover:text-white hover:border-[#1e40af] transition-colors cursor-pointer"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
