import React, { useEffect, useState } from 'react';

export const ScrollTopRail: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    const hero = document.getElementById('hero-section');
    if (hero) hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Scroll to top"
      className={`group fixed z-40 right-2 sm:right-5 bottom-24 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 flex flex-col items-center gap-3 transition-all duration-300 cursor-pointer ${
        show ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
      }`}
    >
      <span
        className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.32em] text-slate-400 group-hover:text-[#1e40af] transition-colors [writing-mode:vertical-rl] rotate-180 drop-shadow-sm"
      >
        Scroll to Top
      </span>
      <span className="w-px h-14 sm:h-16 bg-slate-300 group-hover:bg-[#1e40af] transition-colors" />
    </button>
  );
};
