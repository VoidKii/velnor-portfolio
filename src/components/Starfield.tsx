// Starfield Background Component
// Cinematic sci-fi starfield with subtle twinkling

'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { starTwinkle } from '@/utils/animations';
import { generateStars } from '@/utils/stars';

const STARS_COUNT = 150;
const stars = generateStars(STARS_COUNT, 0x5eed, {
  minSize: 0.5,
  maxSize: 2.5,
  minOpacity: 0.2,
  maxOpacity: 0.7,
  maxDelay: 5,
  minDuration: 2,
  maxDuration: 5,
  accentChance: 0.3,
});

export function Starfield() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(101, 231, 255, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(184, 255, 106, 0.02) 0%, transparent 50%)',
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
            radial-gradient(circle at 15% 25%, rgba(101, 231, 255, 0.04) 0%, transparent 60%),
            radial-gradient(circle at 85% 75%, rgba(184, 255, 106, 0.025) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(17, 24, 39, 1) 0%, rgba(8, 11, 18, 1) 100%)
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
      <div className="absolute inset-0">
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
            variants={starTwinkle}
            initial="initial"
            animate={reducedMotion ? 'initial' : 'animate'}
            transition={{
              delay: star.delay,
              duration: star.duration,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

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