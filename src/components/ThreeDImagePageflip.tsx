import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  CSSProperties,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

const cn = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(' ');

export interface PageFlipLeaf {
  id?: string | number;
  frontImage?: string;
  backImage?: string;
  frontTitle?: string;
  backTitle?: string;
  frontSubtitle?: string;
  backSubtitle?: string;
  frontBadge?: string;
  backBadge?: string;
  /** Optional custom content rendered on the front face instead of an image. */
  frontNode?: React.ReactNode;
  /** Optional custom content rendered on the back face instead of an image. */
  backNode?: React.ReactNode;
}

export interface ThreeDImagePageflipProps {
  pages?: PageFlipLeaf[];
  defaultTurnedIndex?: number;
  turnedIndex?: number;
  onPageChange?: (turnedCount: number, totalLeaves: number) => void;
  pageWidth?: number;
  pageHeight?: number;
  perspective?: number;
  peekAngle?: number;
  turnAngle?: number;
  duration?: number;
  easing?: string;
  shadowIntensity?: number;
  spineShift?: boolean;
  radius?: string | number;
  showPageNumbers?: boolean;
  showSpineBinding?: boolean;
  accentColor?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
  pauseOnHover?: boolean;
  interactive?: boolean;
  showControls?: boolean;
  className?: string;
  style?: CSSProperties;
}

export interface ThreeDImagePageflipHandle {
  next: () => void;
  prev: () => void;
  reset: () => void;
  goTo: (index: number) => void;
  getTurnedCount: () => number;
  getTotalLeaves: () => number;
}

export const ThreeDImagePageflip = forwardRef<ThreeDImagePageflipHandle, ThreeDImagePageflipProps>(
  (
    {
      pages = [],
      defaultTurnedIndex = 0,
      turnedIndex: controlledTurnedIndex,
      onPageChange,
      pageWidth = 230,
      pageHeight = 330,
      perspective = 1300,
      peekAngle = 14,
      turnAngle = 180,
      duration = 0.65,
      easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
      shadowIntensity = 0.45,
      spineShift = true,
      radius = '10px',
      showPageNumbers = true,
      showSpineBinding = true,
      accentColor = '#00F5FF',
      autoplay = false,
      autoplayInterval = 3500,
      pauseOnHover = true,
      interactive = true,
      showControls = true,
      className,
      style,
    },
    ref
  ) => {
    const [internalTurned, setInternalTurned] = useState<number>(defaultTurnedIndex);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [peekingIndex, setPeekingIndex] = useState<number | null>(null);
    const rootRef = useRef<HTMLDivElement>(null);

    const totalLeaves = pages.length;
    const currentTurned = controlledTurnedIndex !== undefined ? controlledTurnedIndex : internalTurned;
    const isOpen = currentTurned > 0 && currentTurned < totalLeaves;

    const parsedRadius = typeof radius === 'number' ? `${radius}px` : radius;

    const setTurned = useCallback(
      (newCount: number) => {
        const clamped = Math.max(0, Math.min(newCount, totalLeaves));
        if (controlledTurnedIndex === undefined) setInternalTurned(clamped);
        onPageChange?.(clamped, totalLeaves);
      },
      [controlledTurnedIndex, totalLeaves, onPageChange]
    );

    const flipNext = useCallback(() => {
      if (currentTurned < totalLeaves) setTurned(currentTurned + 1);
    }, [currentTurned, totalLeaves, setTurned]);

    const flipPrev = useCallback(() => {
      if (currentTurned > 0) setTurned(currentTurned - 1);
    }, [currentTurned, setTurned]);

    const resetBook = useCallback(() => setTurned(0), [setTurned]);

    useImperativeHandle(ref, () => ({
      next: flipNext,
      prev: flipPrev,
      reset: resetBook,
      goTo: (idx) => setTurned(idx),
      getTurnedCount: () => currentTurned,
      getTotalLeaves: () => totalLeaves,
    }));

    // Autoplay
    useEffect(() => {
      if (!autoplay || (pauseOnHover && isHovered) || totalLeaves <= 1) return;
      const timer = setInterval(() => {
        setInternalTurned((prev) => (prev >= totalLeaves ? 0 : prev + 1));
      }, autoplayInterval);
      return () => clearInterval(timer);
    }, [autoplay, autoplayInterval, pauseOnHover, isHovered, totalLeaves]);

    // Keyboard navigation — only when the book is on screen / focused within.
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!rootRef.current?.contains(document.activeElement) && document.activeElement !== document.body) return;
        if (e.key === 'ArrowRight') flipNext();
        if (e.key === 'ArrowLeft') flipPrev();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [flipNext, flipPrev]);

    const handleLeafClick = (index: number) => {
      if (!interactive) return;
      if (index === currentTurned) flipNext();
      else if (index === currentTurned - 1) flipPrev();
    };

    return (
      <div
        ref={rootRef}
        className={cn('w-full flex flex-col items-center justify-center select-none py-6', className)}
        style={style}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setPeekingIndex(null);
        }}
      >
        <div
          className="relative flex items-center justify-center transition-all duration-500"
          style={{
            perspective: `${perspective}px`,
            width: `${pageWidth * 2 + 40}px`,
            height: `${pageHeight + 40}px`,
          }}
        >
          <div
            className="relative transition-transform"
            style={{
              width: `${pageWidth}px`,
              height: `${pageHeight}px`,
              transformStyle: 'preserve-3d',
              transition: `transform ${duration}s ${easing}`,
              transform: spineShift && isOpen ? `translateX(${pageWidth / 2}px)` : 'translateX(0)',
            }}
          >
            {showSpineBinding && (
              <div
                className="absolute top-0 bottom-0 left-[-4px] w-[8px] rounded-l-sm bg-gradient-to-r from-black/80 via-zinc-800 to-black/40 shadow-2xl z-30 pointer-events-none"
                style={{ opacity: isOpen ? 0.95 : 0.6, transition: `opacity ${duration}s ease` }}
              />
            )}

            <div
              className="absolute -bottom-6 left-[-15%] w-[130%] h-8 bg-black/40 rounded-full blur-xl pointer-events-none transition-all duration-500"
              style={{ opacity: isOpen ? 0.7 : 0.4, transform: isOpen ? 'scale(1.15)' : 'scale(0.85)' }}
            />

            {pages.map((leaf, index) => {
              const isTurned = index < currentTurned;
              const isCanPeek = index === currentTurned;
              const isPeeking = peekingIndex === index;
              const zIndex = isTurned ? index + 1 : totalLeaves - index;

              let leafRotation = isTurned ? -turnAngle : 0;
              if (!isTurned && isPeeking) leafRotation = -peekAngle;

              const faceBg = leaf.frontNode || leaf.backNode ? 'bg-white' : 'bg-zinc-950';

              return (
                <div
                  key={leaf.id ?? index}
                  onClick={() => handleLeafClick(index)}
                  onMouseEnter={() => {
                    if (isCanPeek) setPeekingIndex(index);
                  }}
                  onMouseLeave={() => {
                    if (peekingIndex === index) setPeekingIndex(null);
                  }}
                  className={cn(
                    'absolute inset-0 origin-left',
                    interactive ? 'cursor-pointer' : 'pointer-events-none'
                  )}
                  style={{
                    transformStyle: 'preserve-3d',
                    transition: `transform ${duration}s ${easing}`,
                    transform: `rotateY(${leafRotation}deg)`,
                    zIndex,
                    borderRadius: parsedRadius,
                  }}
                >
                  {/* FRONT FACE */}
                  <div
                    className={cn('absolute inset-0 w-full h-full overflow-hidden', faceBg)}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      borderRadius: parsedRadius,
                      boxShadow: `0 12px 28px rgba(0, 0, 0, ${shadowIntensity})`,
                    }}
                  >
                    {leaf.frontNode ? (
                      <div className="w-full h-full">{leaf.frontNode}</div>
                    ) : (
                      <>
                        <img
                          src={leaf.frontImage}
                          alt={leaf.frontTitle ?? `Page ${index * 2 + 1}`}
                          className="w-full h-full object-cover pointer-events-none select-none"
                          loading="lazy"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-black/85 via-black/35 to-transparent text-white pointer-events-none">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            {leaf.frontBadge && (
                              <span
                                className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/20"
                                style={{ color: accentColor, backgroundColor: `${accentColor}20` }}
                              >
                                {leaf.frontBadge}
                              </span>
                            )}
                            {showPageNumbers && (
                              <span className="text-[10px] font-mono text-zinc-300/80">{index * 2 + 1}</span>
                            )}
                          </div>
                          {leaf.frontTitle && (
                            <h4 className="text-xs sm:text-sm font-bold tracking-tight text-white drop-shadow-sm line-clamp-1">
                              {leaf.frontTitle}
                            </h4>
                          )}
                          {leaf.frontSubtitle && (
                            <p className="text-[10px] text-zinc-300/70 font-medium line-clamp-1">
                              {leaf.frontSubtitle}
                            </p>
                          )}
                        </div>
                      </>
                    )}

                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                      style={{
                        background:
                          'linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.08) 14%, transparent 35%)',
                        opacity: isTurned ? 0 : 1,
                      }}
                    />
                  </div>

                  {/* BACK FACE */}
                  <div
                    className={cn('absolute inset-0 w-full h-full overflow-hidden', faceBg)}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      borderRadius: parsedRadius,
                      boxShadow: `0 12px 28px rgba(0, 0, 0, ${shadowIntensity})`,
                    }}
                  >
                    {leaf.backNode ? (
                      <div className="w-full h-full">{leaf.backNode}</div>
                    ) : (
                      <>
                        <img
                          src={leaf.backImage}
                          alt={leaf.backTitle ?? `Page ${index * 2 + 2}`}
                          className="w-full h-full object-cover pointer-events-none select-none"
                          loading="lazy"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-black/85 via-black/35 to-transparent text-white pointer-events-none">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            {leaf.backBadge && (
                              <span
                                className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/20"
                                style={{ color: accentColor, backgroundColor: `${accentColor}20` }}
                              >
                                {leaf.backBadge}
                              </span>
                            )}
                            {showPageNumbers && (
                              <span className="text-[10px] font-mono text-zinc-300/80">{index * 2 + 2}</span>
                            )}
                          </div>
                          {leaf.backTitle && (
                            <h4 className="text-xs sm:text-sm font-bold tracking-tight text-white drop-shadow-sm line-clamp-1">
                              {leaf.backTitle}
                            </h4>
                          )}
                          {leaf.backSubtitle && (
                            <p className="text-[10px] text-zinc-300/70 font-medium line-clamp-1">
                              {leaf.backSubtitle}
                            </p>
                          )}
                        </div>
                      </>
                    )}

                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                      style={{
                        background:
                          'linear-gradient(to left, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.08) 14%, transparent 35%)',
                        opacity: isTurned ? 1 : 0,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {showControls && (
          <div className="flex items-center justify-center gap-3 mt-4 select-none">
            <button
              onClick={flipPrev}
              disabled={currentTurned === 0}
              aria-label="Previous review"
              className="px-3.5 py-1.5 rounded-xl flex items-center gap-1 text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>

            <button
              onClick={resetBook}
              disabled={currentTurned === 0}
              aria-label="Reset"
              className="px-3 py-1.5 rounded-xl flex items-center gap-1 text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>

            <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-400 shadow-sm">
              <span className="font-bold text-slate-700">{currentTurned}</span>
              <span className="opacity-50"> / </span>
              <span>{totalLeaves}</span>
            </div>

            <button
              onClick={flipNext}
              disabled={currentTurned === totalLeaves}
              aria-label="Next review"
              className="px-3.5 py-1.5 rounded-xl flex items-center gap-1 text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    );
  }
);

ThreeDImagePageflip.displayName = 'ThreeDImagePageflip';

export default ThreeDImagePageflip;
