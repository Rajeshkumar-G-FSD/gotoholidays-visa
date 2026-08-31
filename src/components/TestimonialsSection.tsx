import React, { useEffect, useMemo, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/travelData';
import { Testimonial } from '../types';
import BlurText from './BlurText';
import SplitText from './SplitText';
import DecryptedText from './DecryptedText';
import ThreeDImagePageflip, { PageFlipLeaf } from './ThreeDImagePageflip';

const AVATAR_TINTS = [
  'bg-blue-100 text-blue-700',
  'bg-indigo-100 text-indigo-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-sky-100 text-sky-700',
  'bg-violet-100 text-violet-700',
];
const tintFor = (name: string) => AVATAR_TINTS[name.charCodeAt(0) % AVATAR_TINTS.length];

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

const Stars: React.FC<{ n?: number; className?: string }> = ({ n = 5, className = '' }) => (
  <div className={`flex items-center gap-0.5 ${className}`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`w-3.5 h-3.5 ${i < n ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
    ))}
  </div>
);

const GoogleG: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span className={`font-bold text-[#4285F4] ${className}`}>G</span>
);

/** Card content for one review — fills its container. */
const ReviewCard: React.FC<{ t: Testimonial; clamp?: number }> = ({ t, clamp }) => (
  <div className="flex h-full flex-col p-5 sm:p-6">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <span className={`w-11 h-11 rounded-full grid place-items-center text-sm font-bold shrink-0 ${tintFor(t.name)}`}>
          {initials(t.name)}
        </span>
        <div className="min-w-0">
          <p className="font-bold text-[#0f172a] truncate">{t.name}</p>
          <p className="text-[11px] text-slate-400 truncate">{t.meta}</p>
        </div>
      </div>
      <GoogleG className="text-lg shrink-0" />
    </div>

    <div className="mt-3 flex items-center gap-2">
      <Stars n={t.rating} />
      <span className="text-[11px] text-slate-400">{t.timeAgo}</span>
    </div>

    <div className="relative mt-3 grow overflow-hidden">
      <Quote className="absolute -left-1 -top-1 w-4 h-4 text-blue-100" />
      <p
        className="pl-4 text-sm leading-relaxed text-slate-600"
        style={clamp ? { display: '-webkit-box', WebkitLineClamp: clamp, WebkitBoxOrient: 'vertical', overflow: 'hidden' } : undefined}
      >
        {t.quote}
      </p>
    </div>
  </div>
);

export const TestimonialsSection: React.FC = () => {
  const [vw, setVw] = useState(1280);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const on = () => setVw(window.innerWidth);
    on();
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);

  const isDesktop = vw >= 768;
  const pageWidth = Math.min(360, Math.max(280, Math.floor((vw - 100) / 2 - 24)));
  const pageHeight = Math.round(pageWidth * 1.32);

  const avg = (TESTIMONIALS.reduce((s, t) => s + t.rating, 0) / TESTIMONIALS.length).toFixed(1);

  // Pair the reviews into book leaves (front + back per leaf).
  const leaves: PageFlipLeaf[] = useMemo(() => {
    const out: PageFlipLeaf[] = [];
    for (let i = 0; i < TESTIMONIALS.length; i += 2) {
      out.push({
        id: TESTIMONIALS[i].id,
        frontNode: <ReviewCard t={TESTIMONIALS[i]} clamp={11} />,
        backNode: TESTIMONIALS[i + 1] ? <ReviewCard t={TESTIMONIALS[i + 1]} clamp={11} /> : (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
            <GoogleG className="text-3xl" />
            <p className="text-2xl font-bold text-[#0f172a] font-playfair">{avg} / 5.0</p>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
              {TESTIMONIALS.length}+ Google Reviews
            </p>
          </div>
        ),
      });
    }
    return out;
  }, [avg]);

  const mobileList = showAll ? TESTIMONIALS : TESTIMONIALS.slice(0, 6);

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-12 bg-[#faf5f3] overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
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
            text="Real Google reviews from travellers and visa applicants we have helped."
            splitType="words"
            delay={18}
            duration={0.8}
            from={{ opacity: 0, y: 16 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="center"
            className="mt-3 text-sm sm:text-base text-slate-500 !block"
          />
        </div>

        {/* Google rating summary */}
        <div className="mx-auto mb-8 flex max-w-md items-center justify-center gap-5 rounded-2xl bg-white px-7 py-5 shadow-[0_18px_44px_-22px_rgba(15,23,42,0.3)]">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white shadow ring-1 ring-slate-100 text-2xl">
            <GoogleG />
          </span>
          <div className="text-left">
            <p className="text-2xl font-bold text-[#0f172a] font-playfair tabular-nums leading-none">
              <DecryptedText
                text={`${avg} / 5.0`}
                animateOn="view"
                sequential
                revealDirection="start"
                speed={55}
                characters="0123456789./ "
                useOriginalCharsOnly
              />
            </p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
              <DecryptedText
                text={`${TESTIMONIALS.length}+ Verified Google Reviews`}
                animateOn="view"
                sequential
                revealDirection="start"
                speed={24}
              />
            </p>
          </div>
          <Stars className="ml-1" />
        </div>

        {isDesktop ? (
          /* 3D pageflip book of reviews */
          <>
            <ThreeDImagePageflip
              pages={leaves}
              pageWidth={pageWidth}
              pageHeight={pageHeight}
              radius={18}
              accentColor="#1e40af"
              autoplay
              autoplayInterval={4200}
              pauseOnHover
              interactive
              showPageNumbers={false}
              duration={0.7}
            />
            <p className="mt-1 text-center text-[11px] text-slate-400">
              Hover to peek · click a page or use the arrows to flip through all {TESTIMONIALS.length} reviews
            </p>
          </>
        ) : (
          /* Mobile: stacked list */
          <>
            <div className="space-y-4">
              {mobileList.map((t) => (
                <div
                  key={t.id}
                  className="rounded-2xl bg-white border border-slate-100 shadow-[0_14px_40px_-24px_rgba(15,23,42,0.28)]"
                >
                  <ReviewCard t={t} />
                </div>
              ))}
            </div>
            {TESTIMONIALS.length > 6 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowAll((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-[#1e40af] hover:border-[#1e40af] hover:bg-blue-50 transition-colors"
                >
                  {showAll ? 'Show fewer reviews' : `Read all ${TESTIMONIALS.length} reviews`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
