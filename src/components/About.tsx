// About Section Component
// Editable biography with placeholder content

'use client';

import { motion } from 'framer-motion';
import { MapPin, Mail, Code, PenTool, Zap, Globe } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { fadeInUp, staggerContainer, staggerItem, scrollRevealLeft, scrollRevealRight } from '@/utils/animations';

interface AboutProps {
  onEdit?: () => void;
}

export function About({ onEdit }: AboutProps) {
  const { biography } = portfolioData;

  const skills = [
    { name: 'AI tools & workflows', icon: Zap },
    { name: 'Web development', icon: Code },
    { name: 'UI/UX experimentation', icon: PenTool },
    { name: 'Creative technology', icon: Globe },
  ];

  return (
    <section
      id="about"
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 -translate-x-1/4 pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="160" fill="none" stroke="#B8FF6A" strokeWidth="0.5" strokeDasharray="15 30" opacity="0.06" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="#65E7FF" strokeWidth="0.5" strokeDasharray="25 50" opacity="0.04" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <p className="mb-4 text-sm font-mono text-cyan-400 tracking-widest uppercase">About Me</p>
          <h2 id="about-heading" className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-50 tracking-tight">
            <span className="text-cyan-400">Hello,</span> I&apos;m {biography.name}
          </h2>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Left column - Bio */}
          <motion.div className="space-y-8" variants={staggerItem}>
            {/* Title & Tagline */}
            <motion.div className="space-y-4" variants={scrollRevealLeft}>
              <p className="text-lg text-lime-400 font-medium">{biography.title}</p>
              <p className="text-slate-300 text-base italic">&ldquo;{biography.tagline}&rdquo;</p>
            </motion.div>

            {/* Biography text */}
            <motion.div className="prose prose-invert prose-slate max-w-none space-y-6" variants={scrollRevealLeft}>
              {biography.bio.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-slate-300 leading-relaxed text-base">
                  {paragraph}
                </p>
              ))}
            </motion.div>

            {/* Location & Contact */}
            <motion.div className="flex flex-wrap items-center gap-6 text-slate-400" variants={scrollRevealLeft}>
              {biography.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-cyan-400" />
                  <span>{biography.location}</span>
                </div>
              )}
              {biography.email && (
                <a
                  href={`mailto:${biography.email}`}
                  className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
                >
                  <Mail size={18} />
                  <span>{biography.email}</span>
                </a>
              )}
            </motion.div>

            {/* Edit hint */}
            {onEdit && (
              <motion.button
                onClick={onEdit}
                className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-mono text-slate-500 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-cyan-400/50 hover:text-cyan-400 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <PenTool size={16} />
                Edit Biography
              </motion.button>
            )}
          </motion.div>

          {/* Right column - Skills & Highlights */}
          <motion.div className="space-y-10" variants={staggerItem} style={{ transitionDelay: '0.1s' }}>
            {/* Current interests */}
            <motion.div variants={scrollRevealRight}>
              <h3 className="mb-6 text-lg font-mono text-slate-400 tracking-wider uppercase">Currently Exploring</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill.name}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3 text-sm text-slate-200 transition-colors hover:border-cyan-400/40"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <skill.icon size={17} className="text-cyan-400" />
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Philosophy */}
            <motion.div className="p-6 bg-gradient-to-br from-cyan-400/10 to-lime-400/10 rounded-2xl border border-cyan-400/20" variants={scrollRevealRight}>
              <h3 className="mb-3 flex items-center gap-2 text-cyan-400 font-medium">
                <Zap size={20} />
                Philosophy
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                &ldquo;Build small. Learn fast. Keep going.&rdquo;
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}