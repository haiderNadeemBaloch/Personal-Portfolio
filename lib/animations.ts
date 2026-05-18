import type { Variants, Transition } from 'framer-motion';

// Shared timing + easing tokens so animations stay consistent
export const motionDurations = {
  fast: 0.25,
  medium: 0.5,
  slow: 0.8,
};

export const motionEasings = {
  standard: [0.22, 0.61, 0.36, 1],
  entrance: [0.16, 1, 0.3, 1],
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDurations.medium,
      ease: motionEasings.entrance,
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: motionDurations.medium,
      ease: motionEasings.standard,
    },
  },
};

export const listContainerStagger = (
  staggerChildren = 0.1,
  delayChildren = 0.1
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const scaleTap: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
};

/**
 * NOTE: Reduced motion
 * We already respect prefers-reduced-motion via global CSS in globals.css,
 * which collapses animation/transition durations. These variants are
 * designed to degrade gracefully under that media query.
 */
