import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { fadeUp } from './variants';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MotionWrapperProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  once?: boolean;
}

/**
 * Wraps any element in a scroll-triggered entrance animation.
 * Respects prefers-reduced-motion automatically.
 */
export function MotionWrapper({
  children,
  variants = fadeUp,
  className,
  delay = 0,
  once = true,
}: MotionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-60px 0px' });
  const reduced = useReducedMotion();

  const resolvedVariants: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.01 } },
      }
    : variants;

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={resolvedVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </motion.div>
  );
}
