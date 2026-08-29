import React from 'react';
import { Landmark, Globe2, Plane, ChevronRight, ArrowRight, Users, CircleCheck } from 'lucide-react';
import { VISA_SERVICES } from '../data/travelData';
import { VisaService } from '../types';
import BlurText from './BlurText';
import SplitText from './SplitText';
import Reveal from './Reveal';

interface VisaServicesSectionProps {
  onApply: (visaName: string) => void;
  onViewAll?: () => void;
  showViewAll?: boolean;
  id?: string;
}

const ACCENT: Record<VisaService['accent'], string> = {
  blue: 'bg-blue-50 text-blue-600',
  rose: 'bg-rose-50 text-rose-500',
  green: 'bg-emerald-50 text-emerald-600',
  red: 'bg-red-50 text-red-600',
  amber: 'bg-amber-50 text-amber-600',
  yellow: 'bg-yellow-50 text-yellow-600',
};

const ICONS = { landmark: Landmark, globe: Globe2, plane: Plane };

export const VisaServicesSection: React.FC<VisaServicesSectionProps> = ({
  onApply,
  onViewAll,
  showViewAll = true,
  id = 'visa-services-section',
}) => {
  return (
    <section id={id} className="py-20 px-4 sm:px-6 lg:px-12 bg-[#faf5f3]">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <BlurText
              as="h2"
              text="Popular Visa Services"
              animateBy="words"
              direction="top"
              delay={120}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] font-playfair"
            />
            <SplitText
              tag="p"
              text="Expert assistance for 100+ countries with 99.9% success rate. Hassle-free documentation & interview prep."
              splitType="words"
              delay={18}
              duration={0.8}
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              textAlign="left"
              className="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed !block"
            />
          </div>

          {showViewAll && (
            <button
              onClick={onViewAll}
              className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-red-700 hover:text-red-800 transition-colors cursor-pointer shrink-0"
            >
              <span>View All Visas</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>

        {/* Cards — alternating left / right reveal on scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {VISA_SERVICES.map((visa, idx) => {
            const col = idx % 3;
            const dir = col === 0 ? 'left' : col === 2 ? 'right' : 'up';
            const Icon = ICONS[visa.icon];
            return (
              <Reveal key={visa.id} from={dir} delay={(idx % 3) * 0.08} className="h-full">
                <article className="group h-full flex flex-col bg-white rounded-[26px] p-7 sm:p-8 shadow-[0_18px_40px_-18px_rgba(15,23,42,0.18)] hover:shadow-[0_26px_60px_-20px_rgba(15,23,42,0.28)] hover:-translate-y-1.5 transition-all duration-300">
                  <span
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${ACCENT[visa.accent]}`}
                  >
                    <Icon className="w-6 h-6" strokeWidth={1.9} />
                  </span>

                  <h3 className="text-xl font-bold text-[#0f172a] font-playfair">{visa.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{visa.subtitle}</p>

                  <div className="flex items-center justify-between mt-6 mb-5">
                    <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-600">
                      <CircleCheck className="w-4 h-4 text-emerald-500" />
                      {visa.feature}
                    </span>
                    <Users className="w-4 h-4 text-slate-300" />
                  </div>

                  <div className="border-t border-slate-100 pt-5 mt-auto">
                    <button
                      onClick={() => onApply(visa.title)}
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-slate-50 hover:bg-[#1e40af] hover:text-white text-[#0f172a] text-xs font-bold uppercase tracking-[0.15em] py-3.5 transition-colors cursor-pointer"
                    >
                      Apply Now
                      <ChevronRight className="w-4 h-4" />
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
