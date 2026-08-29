import React from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/travelData';
import BlurText from './BlurText';
import SplitText from './SplitText';
import Reveal from './Reveal';
import DecryptedText from './DecryptedText';

const Stars: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center gap-0.5 ${className}`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
    ))}
  </div>
);

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-12 bg-[#faf5f3]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <BlurText
            as="h2"
            text="What Our Travelers Say"
            animateBy="words"
            direction="top"
            delay={120}
            className="justify-center text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] font-playfair"
          />
          <SplitText
            tag="p"
            text="“Got my USA visa approved smoothly through GOTO Holidays”"
            splitType="words"
            delay={22}
            duration={0.8}
            from={{ opacity: 0, y: 16 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="center"
            className="mt-3 text-sm sm:text-base italic text-slate-500 !block"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <Reveal key={t.id} from={idx === 0 ? 'left' : idx === 2 ? 'right' : 'up'} delay={idx * 0.08} className="h-full">
              <figure className="h-full flex flex-col bg-white rounded-[26px] p-7 sm:p-8 shadow-[0_20px_45px_-20px_rgba(15,23,42,0.2)]">
                <Stars className="mx-auto" />
                <blockquote className="mt-5 text-center text-sm leading-relaxed text-slate-600">
                  &quot;{t.quote}&quot;
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-left">
                    <p className="text-sm font-bold text-[#0f172a]">{t.name}</p>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-red-600">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Google review badge with decrypt-on-view animation */}
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-5 bg-white rounded-2xl px-7 py-5 shadow-[0_18px_40px_-18px_rgba(15,23,42,0.22)]">
            <span className="w-11 h-11 rounded-full bg-white shadow ring-1 ring-slate-100 flex items-center justify-center text-lg font-bold">
              <span className="bg-gradient-to-br from-[#4285F4] via-[#EA4335] to-[#FBBC05] bg-clip-text text-transparent">G</span>
            </span>
            <div>
              <p className="text-lg font-bold text-[#0f172a] tabular-nums">
                <DecryptedText
                  text="4.9 / 5.0"
                  animateOn="view"
                  sequential
                  revealDirection="start"
                  speed={55}
                  characters="0123456789./ "
                  useOriginalCharsOnly
                  parentClassName="tabular-nums"
                />
              </p>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                <DecryptedText
                  text="300+ Google Reviews"
                  animateOn="view"
                  sequential
                  revealDirection="start"
                  speed={28}
                />
              </p>
            </div>
            <Stars className="ml-2" />
          </div>
        </div>
      </div>
    </section>
  );
};
