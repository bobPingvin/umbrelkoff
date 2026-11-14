import React from 'react';
import { motion } from 'motion/react';

export const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

export const REVEAL_VIEWPORT = {
  once: true,
  amount: 0.08,
} as const;

interface ScrollRevealOptions {
  delay?: number;
  duration?: number;
  y?: number;
}

export function scrollRevealProps({
  delay = 0,
  duration = 0.6,
  y = 18,
}: ScrollRevealOptions = {}) {
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: REVEAL_VIEWPORT,
    transition: {
      duration,
      delay,
      ease: REVEAL_EASE,
    },
  };
}

interface RevealProps extends ScrollRevealOptions {
  children: React.ReactNode;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  duration = 0.6,
  y = 18,
}) => {
  return (
    <motion.div
      {...scrollRevealProps({ delay, duration, y })}
      className={className}
    >
      {children}
    </motion.div>
  );
};
