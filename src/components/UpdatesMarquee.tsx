import React from 'react';
import TextScrollMarquee from './TextScrollMarquee';

const TOUR_UPDATES =
  'Maldives overwater villas from ₹14,999   ✦   Dubai desert safari + Burj Khalifa   ✦   Thailand 60-day visa-free stay   ✦   Bali private-villa weeks   ✦   Kashmir houseboat escapes   ✦   Singapore family packages   ✦   Andaman island hopping   ✦   Sri Lanka hill-country rail   ✦   ';

const VISA_UPDATES =
  'US B1/B2 interview slots open   ✦   UK visitor visa fast-track   ✦   Schengen 27-country access   ✦   Canada visitor & student visas   ✦   Singapore e-Visa in 2–3 days   ✦   Dubai 30 / 60-day tourist visa   ✦   Sri Lanka ETA online   ✦   Thailand visa on arrival   ✦   ';

const edgeFade =
  '[mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]';

export const UpdatesMarquee: React.FC = () => {
  return (
    <section
      aria-label="Latest travel and visa updates"
      className="relative z-[2] overflow-hidden bg-gradient-to-b from-[#0a192f] to-[#0f2b5c] py-10 sm:py-14 -mt-16 rounded-t-[2.75rem] lg:mt-0 lg:rounded-none"
    >
      {/* soft sapphire glow */}
      <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-[60%] h-32 rounded-full bg-[#1e40af]/25 blur-3xl" />

      {/* eyebrow */}
      <div className="relative flex items-center justify-center gap-2.5 mb-6 sm:mb-8">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#60a5fa] opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#60a5fa]" />
        </span>
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.4em] text-[#93c5fd]">
          Travel &amp; Visa Updates
        </span>
      </div>

      <div className={`relative ${edgeFade} space-y-1 sm:space-y-2`}>
        {/* Tour updates — solid, scrolling left */}
        <TextScrollMarquee
          baseVelocity={0.55}
          direction="left"
          className="font-playfair italic font-normal text-white drop-shadow-[0_2px_18px_rgba(96,165,250,0.25)] text-[7.5vw] sm:text-[5vw] lg:text-[3.4vw] leading-[1.15]"
        >
          {TOUR_UPDATES}
        </TextScrollMarquee>

        {/* Visa updates — outlined, scrolling right */}
        <TextScrollMarquee
          baseVelocity={0.45}
          direction="right"
          className="font-playfair font-normal uppercase tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(147,197,253,0.7)] text-[7.5vw] sm:text-[5vw] lg:text-[3.4vw] leading-[1.15]"
        >
          {VISA_UPDATES}
        </TextScrollMarquee>
      </div>
    </section>
  );
};
