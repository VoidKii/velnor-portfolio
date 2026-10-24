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
    { name: 'TypeScript / JavaScript', icon: Code, level: 95 },
    { name: 'React / Next.js', icon: Code, level: 90 },
    { name: 'WebGL / Three.js', icon: Globe, level: 85 },
    { name: 'Generative Art', icon: PenTool, level: 88 },
    { name: 'Creative Coding', icon: Zap, level: 92 },
    { name: 'UI/UX Design', icon: PenTool, level: 80 },
  ];

  const highlights = [
    { label: 'Years Coding', value: '8+' },
    { label: 'Projects Shipped', value: '23' },
    { label: 'Open Source Contributions', value: '47' },
    { label: 'Lines of Code Written', value: '500K+' },
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
          <motion.div className="space-y-10" variants={staggerItem} style={{ transitionDelay: '0.1' }}>
            {/* Skills */}
            <motion.div variants={scrollRevealRight}>
              <h3 className="mb-6 text-lg font-mono text-slate-400 tracking-wider uppercase">Technologies</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <skill.icon size={18} className="text-cyan-400" />
                        <span className="font-medium text-slate-200">{skill.name}</span>
                      </div>
                      <span className="text-sm font-mono text-cyan-400">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-400 to-lime-400 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div variants={scrollRevealRight}>
              <h3 className="mb-6 text-lg font-mono text-slate-400 tracking-wider uppercase">Highlights</h3>
              <div className="grid grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={highlight.label}
                    className="p-5 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 hover:border-cyan-400/30 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    whileHover={{ y: -4, borderColor: 'rgba(101, 231, 255, 0.5)' }}
                  >
                    <p className="text-3xl font-black text-slate-50 tabular-nums">{highlight.value}</p>
                    <p className="mt-1 text-sm text-slate-400">{highlight.label}</p>
                  </motion.div>
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
                &ldquo;Code is a creative medium. The best digital experiences emerge when we stop treating technology as a utility and start treating it as art. Every pixel, every animation, every interaction should serve the story.&rdquo;
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}