// Starfield Background Component
// Cinematic sci-fi starfield with subtle twinkling

'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { starTwinkle } from '@/utils/animations';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
  color: string;
}

function generateStars(count: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      color: Math.random() > 0.7 ? '#B8FF6A' : '#65E7FF',
    });
  }
  return stars;
}

const STARS_COUNT = 150;
const stars = generateStars(STARS_COUNT);

export function Starfield() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{
          background: 'radial-circle at 20% 30%, rgba(101, 231, 255, 0.03) 0%, transparent 50%, radial-circle at 80% 70%, rgba(184, 255, 106, 0.02) 0%, transparent 50%',
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: -1 }}
    >
      {/* Base gradient atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-circle at 15% 25%, rgba(101, 231, 255, 0.04) 0%, transparent 60%,
            radial-circle at 85% 75%, rgba(184, 255, 106, 0.025) 0%, transparent 60%,
            radial-circle at 50% 50%, rgba(17, 24, 39, 1) 0%, rgba(8, 11, 18, 1) 100%
          `,
        }}
      />

      {/* Orbital glow lines */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" style={{ opacity: 0.15 }}>
        <defs>
          <radialGradient id="orbitalGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#65E7FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#65E7FF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#65E7FF" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Concentric orbital rings */}
        <circle cx="50%" cy="50%" r="45%" fill="none" stroke="url(#orbitalGlow)" strokeWidth="0.5%" />
        <circle cx="50%" cy="50%" r="35%" fill="none" stroke="url(#orbitalGlow)" strokeWidth="0.3%" strokeDasharray="2% 4%" />
        <circle cx="50%" cy="50%" r="25%" fill="none" stroke="url(#orbitalGlow)" strokeWidth="0.4%" strokeDasharray="3% 6%" />
        <circle cx="50%" cy="50%" r="15%" fill="none" stroke="url(#orbitalGlow)" strokeWidth="0.2%" />
      </svg>

      {/* Twinkling stars */}
      <motion.div
        className="absolute inset-0"
        animate={{}}
        style={{ willChange: 'transform' }}
      >
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 2}px ${star.size * 0.5}px currentColor`,
              willChange: 'opacity, transform',
            }}
            animate={reducedMotion ? {} : starTwinkle}
            transition={{
              delay: star.delay,
              duration: star.duration,
              repeat: Infinity,
            }}
          />
        ))}
      </motion.div>

      {/* Subtle scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
          opacity: 0.3,
        }}
      />
    </div>
  );
}