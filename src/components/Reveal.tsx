import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export type RevealFrom = 'left' | 'right' | 'up' | 'down';

interface RevealProps {
  children: React.ReactNode;
  from?: RevealFrom;
  delay?: number;
  distance?: number;
  className?: string;
  /** Re-run the animation every time it scrolls in/out (up & down). */
  repeat?: boolean;
  amount?: number;
}

const offset = (from: RevealFrom, d: number) => {
  switch (from) {
    case 'left':
      return { x: -d, y: 0 };
    case 'right':
      return { x: d, y: 0 };
    case 'down':
      return { x: 0, y: d };
    default:
      return { x: 0, y: -d };
  }
};

export const Reveal: React.FC<RevealProps> = ({
  children,
  from = 'up',
  delay = 0,
  distance = 64,
  className = '',
  repeat = true,
  amount = 0.25,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: !repeat, amount });
  const { x, y } = offset(from as RevealFrom, distance);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y, filter: 'blur(6px)', scale: 0.96 }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', scale: 1 }
          : { opacity: 0, x, y, filter: 'blur(6px)', scale: 0.96 }
      }
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
