// Social Section Component
// YouTube and social links with interactive cards

'use client';

import { motion } from 'framer-motion';
import type { ComponentType, SVGProps } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { GithubIcon, XIcon, LinkedInIcon, YouTubeIcon, MailIcon } from './SocialIcons';
import { getSocialLinks } from '@/data/portfolio';
import { fadeInUp, staggerContainer, cardHover, hoverScale, tapScale } from '@/utils/animations';

type SocialIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

const socialIcons: Record<string, SocialIcon> = {
  github: GithubIcon,
  youtube: YouTubeIcon,
  twitter: XIcon,
  linkedin: LinkedInIcon,
  mail: MailIcon,
};

const socialColors: Record<string, string> = {
  github: '#FFFFFF',
  youtube: '#FF0000',
  twitter: '#FFFFFF',
  linkedin: '#0A66C2',
  mail: '#65E7FF',
};

const socialBgColors: Record<string, string> = {
  github: 'bg-slate-800 hover:bg-slate-700',
  youtube: 'bg-red-600 hover:bg-red-500',
  twitter: 'bg-slate-800 hover:bg-slate-700',
  linkedin: 'bg-blue-600 hover:bg-blue-500',
  mail: 'bg-cyan-500 hover:bg-cyan-400',
};

interface SocialCardProps {
  link: {
    id: string;
    name: string;
    url: string;
    icon: string;
    description: string;
    order: number;
  };
  index: number;
}

function SocialCard({ link, index }: SocialCardProps) {
  const Icon = socialIcons[link.icon] || ExternalLink;
  const bgClass = socialBgColors[link.icon] || 'bg-slate-800 hover:bg-slate-700';
  const color = socialColors[link.icon] || '#65E7FF';

  const isExternal = link.icon !== 'mail';
  const href = link.url;

  return (
    <motion.a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`group relative flex items-center gap-5 p-6 ${bgClass} rounded-2xl border border-slate-700 transition-all duration-300`}
      whileHover={hoverScale}
      whileTap={tapScale}
      variants={cardHover}
      initial="initial"
      animate={index === 0 ? 'hover' : undefined} // subtle entrance
      style={{ willChange: 'transform, box-shadow' }}
      aria-label={`${link.name}: ${link.description}`}
    >
      {/* Icon wrapper with glow */}
      <motion.div
        className="relative flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${color}20, ${color}10)` }}
      >
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `radial-gradient(circle at center, ${color}40, transparent 70%)` }}
        />
        <Icon
          size={28}
          className="relative z-10 text-slate-100 transition-transform duration-300 group-hover:scale-110"
          style={{ color }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Content */}
      <motion.div className="flex-1 min-w-0" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + index * 0.05 }}>
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-slate-100 truncate">{link.name}</h3>
          {isExternal && (
            <motion.div
              className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
              whileHover={{ scale: 1.1, rotate: 45 }}
            >
              <ExternalLink size={16} className="text-slate-400" />
            </motion.div>
          )}
        </div>
        <p className="mt-1 text-sm text-slate-400">{link.description}</p>
      </motion.div>

      {/* Accent bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-[0.25,0.46,0.45,0.94]"
        style={{ background: `linear-gradient(to top, ${color}, ${color}80)` }}
      />
    </motion.a>
  );
}

export function Social() {
  const socialLinks = getSocialLinks();

  return (
    <section
      id="social"
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="social-heading"
    >
      {/* Background orbital accent */}
      <div className="absolute bottom-0 left-0 w-96 h-96 translate-x-1/2 translate-y-1/2 pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="180" fill="none" stroke="#B8FF6A" strokeWidth="0.5" strokeDasharray="25 50" opacity="0.06" />
          <circle cx="200" cy="200" r="120" fill="none" stroke="#65E7FF" strokeWidth="0.5" strokeDasharray="15 30" opacity="0.08" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <p className="mb-4 text-sm font-mono text-cyan-400 tracking-widest uppercase">Connect</p>
          <h2 id="social-heading" className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-50 tracking-tight">
            Let&apos;s <span className="text-lime-400">Build</span> Something
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Always open to interesting conversations, collaborations, and new challenges.
            Pick your preferred channel or just say hello.
          </p>
        </motion.div>

        {/* Social Cards */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {socialLinks.map((link, index) => (
            <SocialCard key={link.id} link={link} index={index} />
          ))}
        </motion.div>

        {/* YouTube Featured */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          variants={fadeInUp}
          style={{ transitionDelay: '0.3s' }}
        >
          <div className="relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-transparent to-cyan-400/10" />

            <div className="relative p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-8">
              {/* YouTube Icon */}
              <motion.div
                className="flex-shrink-0 w-24 h-24 lg:w-28 lg:h-28 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #FF0000, #CC0000)' }}
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ duration: 0.3 }}
              >
                <YouTubeIcon size={48} className="text-white" aria-hidden="true" />
              </motion.div>

              {/* Content */}
              <div className="text-center lg:text-left flex-1">
                <p className="text-sm font-mono text-red-400 tracking-widest uppercase mb-2">YouTube Channel</p>
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-50 mb-3">
                  Gaming, Edits & Experiments
                </h3>
                <p className="text-slate-400 mb-6 max-w-xl">
                  Gaming moments, creative edits, and projects from the Velnor creator journey.
                </p>

                {/* CTA */}
                <motion.a
                  href="https://youtube.com/channel/UCnRSqu1782SwFSKWZcXT-Vw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,0,0,0.3)]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play size={18} />
                  Visit Channel
                  <ExternalLink size={18} />
                </motion.a>
              </div>

              {/* Decorative orbital element */}
              <motion.div
                className="hidden lg:block w-32 h-32"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                style={{ pointerEvents: 'none' }}
              >
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="#FF0000" strokeWidth="0.5" strokeDasharray="10 20" opacity="0.2" />
                  <circle cx="100" cy="100" r="60" fill="none" stroke="#65E7FF" strokeWidth="0.5" strokeDasharray="15 30" opacity="0.15" />
                </svg>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* A real destination instead of a non-functional newsletter form */}
        <motion.div
          className="mt-16 text-center"
          variants={fadeInUp}
          style={{ transitionDelay: '0.4s' }}
        >
          <div className="relative p-8 lg:p-12 bg-gradient-to-br from-slate-900/50 to-slate-950/50 rounded-2xl border border-slate-800">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-lime-400/5" />
            <p className="relative text-sm font-mono text-cyan-400 tracking-widest uppercase mb-3">Building in Public</p>
            <h3 className="relative text-2xl lg:text-3xl font-bold text-slate-50 mb-4">
              Follow the next experiment.
            </h3>
            <p className="relative text-slate-400 mb-6 max-w-md mx-auto">
              Explore the source and current work in progress on GitHub.
            </p>
            <motion.a
              href="https://github.com/VoidKii"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 px-6 py-3 bg-cyan-400 text-slate-950 font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(101,231,255,0.3)] transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink size={18} />
              Explore GitHub
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}