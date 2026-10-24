// Orbital Centerpiece Component
// Interactive orbital system with accessible hover/focus states

'use client';

import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { orbitalRotate, orbitalPulse, orbitalRing, glowPulse } from '@/utils/animations';

interface OrbitalCenterpieceProps {
  className?: string;
  'aria-label'?: string;
}

export function OrbitalCenterpiece({ className = '', 'aria-label': ariaLabel = 'Interactive orbital system' }: OrbitalCenterpieceProps) {
  const reducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring-based smoothing for mouse follow
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // Transform mouse position to orbital offset
  const orbitOffsetX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const orbitOffsetY = useTransform(smoothY, [-1, 1], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x * 2 - 1);
    mouseY.set(y * 2 - 1);
  };

  const handleMouseLeave = () => {
    if (reducedMotion) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Focus management for accessibility
      const target = e.currentTarget;
      if (target instanceof HTMLElement) {
        target.focus();
      }
    }
  };

  if (reducedMotion) {
    return (
      <div
        className={`relative w-full aspect-square max-w-[500px] mx-auto ${className}`}
        role="img"
        aria-label={ariaLabel}
        style={{ willChange: 'auto' }}
      >
        {/* Static orbital system for reduced motion */}
        <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#65E7FF" stopOpacity="1" />
              <stop offset="60%" stopColor="#65E7FF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#080B12" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="planetGlow1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#B8FF6A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#B8FF6A" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="planetGlow2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#65E7FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#65E7FF" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Central core */}
          <circle cx="200" cy="200" r="60" fill="url(#coreGlow)" filter="blur(2px)" />

          {/* Orbital rings */}
          <circle cx="200" cy="200" r="120" fill="none" stroke="#65E7FF" strokeWidth="1" strokeDasharray="8 12" opacity="0.3" />
          <circle cx="200" cy="200" r="170" fill="none" stroke="#65E7FF" strokeWidth="0.5" strokeDasharray="12 20" opacity="0.2" />
          <circle cx="200" cy="200" r="220" fill="none" stroke="#B8FF6A" strokeWidth="0.5" strokeDasharray="16 24" opacity="0.15" />

          {/* Orbiting bodies */}
          <g transform="rotate(45 200 200)">
            <circle cx="200" cy="80" r="12" fill="url(#planetGlow1)" />
            <circle cx="200" cy="80" r="8" fill="#B8FF6A" />
          </g>
          <g transform="rotate(135 200 200)">
            <circle cx="200" cy="130" r="8" fill="url(#planetGlow2)" />
            <circle cx="200" cy="130" r="5" fill="#65E7FF" />
          </g>
          <g transform="rotate(225 200 200)">
            <circle cx="200" cy="30" r="10" fill="url(#planetGlow1)" />
            <circle cx="200" cy="30" r="6" fill="#B8FF6A" />
          </g>
          <g transform="rotate(315 200 200)">
            <circle cx="200" cy="180" r="6" fill="url(#planetGlow2)" />
            <circle cx="200" cy="180" r="4" fill="#65E7FF" />
          </g>

          {/* Accent particles */}
          <circle cx="120" cy="120" r="2" fill="#65E7FF" opacity="0.6" />
          <circle cx="280" cy="280" r="1.5" fill="#B8FF6A" opacity="0.5" />
          <circle cx="100" cy="300" r="2" fill="#65E7FF" opacity="0.4" />
          <circle cx="300" cy="100" r="1.5" fill="#B8FF6A" opacity="0.5" />
        </svg>
      </div>
    );
  }

  return (
    <motion.div
      className={`relative w-full aspect-square max-w-[500px] mx-auto ${className}`}
      role="img"
      aria-label={ariaLabel}
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      style={{ willChange: 'transform', outline: 'none' }}
      variants={glowPulse}
      whileHover="animate"
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: '1px solid rgba(101, 231, 255, 0.15)',
          boxShadow: `
            0 0 60px 20px rgba(101, 231, 255, 0.05),
            inset 0 0 60px 20px rgba(101, 231, 255, 0.03)
          `,
        }}
        variants={orbitalRing}
        initial="initial"
        animate="animate"
      />

      <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#65E7FF" stopOpacity="1" />
            <stop offset="60%" stopColor="#65E7FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#080B12" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="planetGlow1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#B8FF6A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#B8FF6A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="planetGlow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#65E7FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#65E7FF" stopOpacity="0" />
          </radialGradient>
          <filter id="coreBlur">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glowBlur">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Central core - pulses and follows mouse subtly */}
        <motion.circle
          cx="200"
          cy="200"
          r="55"
          fill="url(#coreGlow)"
          filter="url(#coreBlur)"
          style={{
            transformOrigin: '200px 200px',
            willChange: 'transform, filter',
          }}
          variants={orbitalPulse}
          initial="initial"
          animate="animate"
          x={orbitOffsetX}
          y={orbitOffsetY}
        />

        {/* Core inner pulse */}
        <motion.circle
          cx="200"
          cy="200"
          r="30"
          fill="#65E7FF"
          opacity={0.4}
          filter="url(#coreBlur)"
          style={{ transformOrigin: '200px 200px', willChange: 'transform' }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          x={orbitOffsetX}
          y={orbitOffsetY}
        />

        {/* Orbital rings - counter-rotating */}
        <motion.circle
          cx="200"
          cy="200"
          r="115"
          fill="none"
          stroke="#65E7FF"
          strokeWidth="1"
          strokeDasharray="8 16"
          opacity={0.25}
          style={{ transformOrigin: '200px 200px', willChange: 'transform' }}
          variants={orbitalRotate}
          initial="initial"
          animate="animate"
        />
        <motion.circle
          cx="200"
          cy="200"
          r="165"
          fill="none"
          stroke="#65E7FF"
          strokeWidth="0.5"
          strokeDasharray="12 24"
          opacity={0.18}
          style={{ transformOrigin: '200px 200px', willChange: 'transform' }}
          animate={{
            rotate: -360,
            transition: { duration: 40, repeat: Infinity, ease: 'linear' },
          }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="215"
          fill="none"
          stroke="#B8FF6A"
          strokeWidth="0.5"
          strokeDasharray="16 32"
          opacity={0.12}
          style={{ transformOrigin: '200px 200px', willChange: 'transform' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        />

        {/* Orbiting bodies with independent orbits */}
        <OrbitingBody
          radius={115}
          angle={45}
          speed={30}
          planetSize={12}
          coreSize={8}
          coreColor="#B8FF6A"
          glowId="planetGlow1"
          orbitOffsetX={orbitOffsetX}
          orbitOffsetY={orbitOffsetY}
        />
        <OrbitingBody
          radius={165}
          angle={135}
          speed={45}
          reverse
          planetSize={8}
          coreSize={5}
          coreColor="#65E7FF"
          glowId="planetGlow2"
          orbitOffsetX={orbitOffsetX}
          orbitOffsetY={orbitOffsetY}
        />
        <OrbitingBody
          radius={215}
          angle={225}
          speed={60}
          planetSize={10}
          coreSize={6}
          coreColor="#B8FF6A"
          glowId="planetGlow1"
          orbitOffsetX={orbitOffsetX}
          orbitOffsetY={orbitOffsetY}
        />
        <OrbitingBody
          radius={140}
          angle={315}
          speed={25}
          reverse
          planetSize={6}
          coreSize={4}
          coreColor="#65E7FF"
          glowId="planetGlow2"
          orbitOffsetX={orbitOffsetX}
          orbitOffsetY={orbitOffsetY}
        />

        {/* Accent particles - floating */}
        <FloatingParticle cx={110} cy={110} r={2} color="#65E7FF" opacity={0.6} delay={0} duration={6} />
        <FloatingParticle cx={290} cy={290} r={1.5} color="#B8FF6A" opacity={0.5} delay={1} duration={7} />
        <FloatingParticle cx={90} cy={310} r={2} color="#65E7FF" opacity={0.4} delay={2} duration={5} />
        <FloatingParticle cx={310} cy={90} r={1.5} color="#B8FF6A" opacity={0.5} delay={3} duration={8} />
        <FloatingParticle cx={150} cy={280} r={1} color="#65E7FF" opacity={0.3} delay={1.5} duration={9} />
        <FloatingParticle cx={250} cy={120} r={1} color="#B8FF6A" opacity={0.3} delay={2.5} duration={6} />
      </svg>

      {/* Interaction hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-slate-500"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <kbd className="px-1.5 py-0.5 bg-slate-800/50 rounded border border-slate-700 font-mono">↑</kbd>
        <kbd className="px-1.5 py-0.5 bg-slate-800/50 rounded border border-slate-700 font-mono">↓</kbd>
        <kbd className="px-1.5 py-0.5 bg-slate-800/50 rounded border border-slate-700 font-mono">←</kbd>
        <kbd className="px-1.5 py-0.5 bg-slate-800/50 rounded border border-slate-700 font-mono">→</kbd>
        <span className="hidden sm:inline">to explore</span>
      </motion.div>
    </motion.div>
  );
}

// Orbiting body component
interface OrbitingBodyProps {
  radius: number;
  angle: number;
  speed: number;
  reverse?: boolean;
  planetSize: number;
  coreSize: number;
  coreColor: string;
  glowId: string;
  orbitOffsetX: MotionValue<number>;
  orbitOffsetY: MotionValue<number>;
}

function OrbitingBody({
  radius,
  angle,
  speed,
  reverse = false,
  planetSize,
  coreSize,
  coreColor,
  glowId,
  orbitOffsetX,
  orbitOffsetY,
}: OrbitingBodyProps) {
  const angleRad = (angle * Math.PI) / 180;
  const centerX = 200 + Math.cos(angleRad) * radius;
  const centerY = 200 + Math.sin(angleRad) * radius;

  return (
    <motion.g
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      x={orbitOffsetX}
      y={orbitOffsetY}
      style={{ transformOrigin: '200px 200px', willChange: 'transform' }}
    >
      <circle
        cx={centerX}
        cy={centerY}
        r={planetSize}
        fill={`url(#${glowId})`}
        filter="url(#glowBlur)"
      />
      <motion.circle
        cx={centerX}
        cy={centerY}
        r={coreSize}
        fill={coreColor}
        style={{ transformOrigin: `${centerX}px ${centerY}px`, willChange: 'transform' }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: speed / 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.g>
  );
}

// Floating particle component
interface FloatingParticleProps {
  cx: number;
  cy: number;
  r: number;
  color: string;
  opacity: number;
  delay: number;
  duration: number;
}

function FloatingParticle({ cx, cy, r, color, opacity, delay, duration }: FloatingParticleProps) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill={color}
      opacity={opacity}
      animate={{
        x: [0, 15, -10, 0],
        y: [0, -20, 15, 0],
        opacity: [opacity, opacity * 1.5, opacity * 0.5, opacity],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}