// Hero Section Component
// Animated orbital centerpiece, bold headline, creator introduction, working CTAs

'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { ArrowRight, MousePointer, Keyboard } from 'lucide-react';
import { OrbitalCenterpiece } from './OrbitalCenterpiece';
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/animations';
import { portfolioData } from '@/data/portfolio';
import { generateStars } from '@/utils/stars';

const STAR_COUNT = 100;

function Starfield() {
  const stars = useMemo(() => generateStars(STAR_COUNT, 0x0e1a0, {
    minSize: 0.5,
    maxSize: 2,
    minOpacity: 0.15,
    maxOpacity: 0.65,
    maxDelay: 4,
    minDuration: 2,
    maxDuration: 5,
    accentChance: 0.2,
  }), []);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      {/* Atmosphere gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 10% 20%, rgba(101, 231, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(184, 255, 106, 0.03) 0%, transparent 50%),
            #080B12
          `,
        }}
      />

      {/* Subtle orbital rings in background */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" style={{ opacity: 0.08 }}>
        <defs>
          <radialGradient id="bgOrbital" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#65E7FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#65E7FF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#65E7FF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50%" cy="50%" r="48%" fill="none" stroke="url(#bgOrbital)" strokeWidth="0.3%" />
        <circle cx="50%" cy="50%" r="38%" fill="none" stroke="url(#bgOrbital)" strokeWidth="0.2%" strokeDasharray="2% 5%" />
        <circle cx="50%" cy="50%" r="28%" fill="none" stroke="url(#bgOrbital)" strokeWidth="0.25%" strokeDasharray="3% 6%" />
      </svg>

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
            boxShadow: `0 0 ${star.size * 3}px ${star.size}px ${star.color}`,
            willChange: 'opacity, transform',
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 2, star.opacity],
            scale: [1, 1.5, 1],
          }}
          transition={{
            delay: star.delay,
            duration: star.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Very subtle scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.02) 3px, rgba(0,0,0,0.02) 6px)',
          opacity: 0.2,
        }}
      />
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Starfield background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Starfield />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Left side - Copy */}
          <motion.div className="text-center lg:text-left" variants={staggerItem}>
            {/* Eyebrow */}
            <motion.p
              className="mb-6 text-sm font-mono text-cyan-400 tracking-widest uppercase"
              variants={fadeInUp}
              style={{ transitionDelay: '0.1' }}
            >
              Creative Developer & Digital Architect
            </motion.p>

            {/* Main headline */}
            <motion.h1
              id="hero-heading"
              className="mb-6 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-slate-50 leading-[1.05]"
              variants={fadeInUp}
              style={{ transitionDelay: '0.2' }}
            >
              <span className="block">VELNOR</span>
              <span className="block text-cyan-400">DIGITAL</span>
              <span className="block text-lime-400">UNIVERSES</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="mb-10 text-lg sm:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              variants={fadeInUp}
              style={{ transitionDelay: '0.3' }}
            >
              {portfolioData.identity.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              variants={staggerContainer}
              style={{ transitionDelay: '0.4' }}
            >
              <motion.a
                href="#projects"
                className="group relative px-8 py-4 bg-cyan-400 text-slate-950 font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(101,231,255,0.3)] hover:shadow-cyan-400/20"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variants={staggerItem}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Projects
                  <ArrowRight size={18} />
                </span>
                <motion.span
                  className="absolute inset-0 bg-lime-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[0.25,0.46,0.45,0.94]"
                />
              </motion.a>

              <motion.a
                href="#about"
                className="group relative px-8 py-4 bg-slate-800/50 text-slate-100 font-semibold rounded-lg border border-slate-700 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/50 hover:bg-slate-800"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variants={staggerItem}
              >
                <span className="relative z-10">About Me</span>
                <motion.span
                  className="absolute inset-0 bg-cyan-400/10 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[0.25,0.46,0.45,0.94]"
                />
              </motion.a>
            </motion.div>

            {/* Interaction hints */}
            <motion.div
              className="mt-16 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 text-sm text-slate-500"
              variants={fadeInUp}
              style={{ transitionDelay: '0.6' }}
            >
              <div className="flex items-center gap-2">
                <MousePointer size={16} className="text-slate-600" />
                <span>Drag to explore orbit</span>
              </div>
              <div className="flex items-center gap-2">
                <Keyboard size={16} className="text-slate-600" />
                <span className="hidden sm:inline">Konami code for secrets</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Orbital Centerpiece */}
          <motion.div className="relative" variants={staggerItem} style={{ transitionDelay: '0.2' }}>
            <div className="relative aspect-square max-w-[500px] mx-auto">
              <OrbitalCenterpiece
                aria-label="Interactive orbital system representing Velnor&apos;s digital universe. Drag or use arrow keys to explore the orbital mechanics."
              />
            </div>

            {/* Floating stats/orbits */}
            <motion.div
              className="absolute -bottom-6 -left-6 lg:-left-12 w-48 h-48"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              style={{ pointerEvents: 'none' }}
            >
              <svg className="w-full h-full" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="none" stroke="#65E7FF" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.2" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#B8FF6A" strokeWidth="0.5" strokeDasharray="6 12" opacity="0.15" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute -top-6 -right-6 lg:-right-12 w-48 h-48"
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
              style={{ pointerEvents: 'none' }}
            >
              <svg className="w-full h-full" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#B8FF6A" strokeWidth="0.5" strokeDasharray="8 16" opacity="0.15" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <motion.svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
}