import React from 'react';
import { Globe } from 'lucide-react';
import { ActiveTab } from '../types';
import BlurText from './BlurText';
import SplitText from './SplitText';
import { DestinationSearch } from './DestinationSearch';
import { ThailandPackagesSection } from './ThailandPackagesSection';
import { GlobalPackagesSection } from './GlobalPackagesSection';
import { TestimonialsSection } from './TestimonialsSection';

interface DiscoverPackagesPageProps {
  onNavigate: (tab: ActiveTab) => void;
  onOpenDestination: (id: string) => void;
  onEnquire: (name: string) => void;
}

export const DiscoverPackagesPage: React.FC<DiscoverPackagesPageProps> = ({
  onOpenDestination,
  onEnquire,
}) => {
  return (
    <div className="w-full">
      {/* Search Hero */}
      <section className="relative min-h-[92vh] w-full flex items-center overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=2000&h=1100&fit=crop&q=80&auto=format"
            alt="Mountain lake"
            className="w-full h-full object-cover object-center animate-kenburns"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#0a192f]/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc]/85 via-transparent to-[#0a192f]/35" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center text-center">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[11px] font-bold uppercase tracking-[0.25em] text-white mb-7">
            <Globe className="w-3.5 h-3.5" />
            Curated Holiday Packages
          </p>

          <BlurText
            as="h1"
            text="Discover Your"
            animateBy="words"
            direction="top"
            delay={110}
            className="justify-center text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white font-playfair drop-shadow-xl"
          />
          <BlurText
            as="h1"
            text="Dream Escape"
            animateBy="words"
            direction="top"
            delay={150}
            className="justify-center text-5xl sm:text-6xl lg:text-7xl font-playfair italic text-red-500 drop-shadow-xl -mt-1"
          />

          <SplitText
            tag="p"
            text="Handpicked holiday packages to the world's most breathtaking destinations."
            splitType="words"
            delay={16}
            duration={0.8}
            from={{ opacity: 0, y: 18 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="center"
            className="mt-5 mb-9 max-w-xl text-sm sm:text-base text-slate-100 !block"
          />

          <DestinationSearch onSelect={onOpenDestination} />
        </div>
      </section>

      <ThailandPackagesSection onEnquire={onEnquire} />
      <GlobalPackagesSection onSelect={onEnquire} />
      <TestimonialsSection />
    </div>
  );
};
