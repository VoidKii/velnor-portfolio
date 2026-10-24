// Animation utilities and variants for VELNOR

import { Variants, Transition } from 'framer-motion';

// Respects prefers-reduced-motion
export const getReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Base animation variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Staggered children animation
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Orbital animation variants
export const orbitalRotate: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: { duration: 60, repeat: Infinity, ease: 'linear' },
  },
};

export const orbitalPulse: Variants = {
  initial: { scale: 1, opacity: 0.6 },
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.6, 0.8, 0.6],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const orbitalRing: Variants = {
  initial: { rotate: 0, opacity: 0.3 },
  animate: {
    rotate: 360,
    opacity: [0.3, 0.5, 0.3],
    transition: { duration: 20, repeat: Infinity, ease: 'linear' },
  },
};

// Starfield twinkle
export const starTwinkle: Variants = {
  initial: { opacity: 0.3, scale: 0.8 },
  animate: {
    opacity: [0.3, 1, 0.3],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Glow pulse for buttons/accents
export const glowPulse: Variants = {
  initial: { boxShadow: '0 0 0 0 rgba(101, 231, 255, 0.4)' },
  animate: {
    boxShadow: [
      '0 0 0 0 rgba(101, 231, 255, 0.4)',
      '0 0 30px 10px rgba(101, 231, 255, 0.1)',
      '0 0 0 0 rgba(101, 231, 255, 0.4)',
    ],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

// Terminal typing animation
export const terminalType: Variants = {
  hidden: { width: '0ch' },
  visible: {
    width: '100%',
    transition: { duration: 2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 },
  },
};

// Scroll reveal variants
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const scrollRevealLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const scrollRevealRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Hover/tap variants for interactive elements
export const hoverScale: Transition = {
  scale: 1.02,
  transition: { duration: 0.2, ease: 'easeOut' },
};

export const hoverScaleSmall: Transition = {
  scale: 1.01,
  transition: { duration: 0.15, ease: 'easeOut' },
};

export const tapScale: Transition = {
  scale: 0.98,
  transition: { duration: 0.1, ease: 'easeOut' },
};

export const focusRing: Transition = {
  boxShadow: '0 0 0 3px rgba(101, 231, 255, 0.5)',
  transition: { duration: 0.2 },
};

// Card hover variants
export const cardHover: Variants = {
  initial: { y: 0, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' },
  hover: {
    y: -8,
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(101, 231, 255, 0.15)',
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Status badge variants
export const statusVariants: Record<string, Variants> = {
  live: {
    initial: { scale: 0 },
    animate: { scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
  },
  'in-progress': {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
  },
  concept: {
    initial: { rotate: -90 },
    animate: { rotate: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } },
  },
  archived: {
    initial: { opacity: 0.5 },
    animate: { opacity: 0.5 },
  },
};

// Navigation link variants
export const navLinkVariants: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: 'easeOut' },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

// Mobile menu variants
export const mobileMenuVariants: Variants = {
  closed: { opacity: 0, height: 0, overflow: 'hidden' },
  open: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Easter egg terminal variants
export const terminalVariants: Variants = {
  closed: { opacity: 0, y: 100, height: 0 },
  open: {
    opacity: 1,
    y: 0,
    height: 'auto',
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Page transition
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
};