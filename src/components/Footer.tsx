// Footer Component
// Distinctive footer with hidden easter egg

'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Heart, Code, Zap, Sparkles } from 'lucide-react';
import { GithubIcon, YouTubeIcon, XIcon, LinkedInIcon, MailIcon } from './SocialIcons';
import { getSocialLinks } from '@/data/portfolio';
import { fadeInUp } from '@/utils/animations';

export function Footer() {
  const socialLinks = getSocialLinks();
  const currentYear = new Date().getFullYear();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glowX = useTransform(mouseX, [0, 1], ['20%', '80%']);
  const glowY = useTransform(mouseY, [0, 1], ['20%', '80%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <footer
      className="relative py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      role="contentinfo"
      onMouseMove={handleMouseMove}
    >
      {/* Background glow following mouse */}
      <motion.div
        className="absolute top-0 left-0 w-1/3 h-1/3 rounded-full blur-[200px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(101, 231, 255, 0.15), transparent 70%)',
          x: glowX,
          y: glowY,
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-1/3 h-1/3 rounded-full blur-[200px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(184, 255, 106, 0.1), transparent 70%)',
          x: useTransform(mouseX, [0, 1], ['80%', '20%']),
          y: useTransform(mouseY, [0, 1], ['80%', '20%']),
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />

      {/* Orbital decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 600 600">
          <defs>
            <radialGradient id="footerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#65E7FF" stopOpacity="0" />
              <stop offset="50%" stopColor="#65E7FF" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#65E7FF" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="300" cy="300" r="280" fill="none" stroke="url(#footerGlow)" strokeWidth="1" strokeDasharray="30 60" />
          <circle cx="300" cy="300" r="200" fill="none" stroke="#B8FF6A" strokeWidth="0.5" strokeDasharray="40 80" opacity="0.3" />
          <circle cx="300" cy="300" r="120" fill="none" stroke="#65E7FF" strokeWidth="0.5" strokeDasharray="20 40" opacity="0.2" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Main content */}
        <motion.div
          className="grid lg:grid-cols-3 gap-12 lg:gap-16 mb-16"
          variants={fadeInUp}
        >
          {/* Brand */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div className="flex items-center gap-2">
              <span className="font-mono text-2xl font-bold text-slate-50">VELNOR</span>
              <span className="text-slate-500 text-xs tracking-widest uppercase">portfolio</span>
            </motion.div>
            <p className="text-slate-400 leading-relaxed max-w-xs">
              Building digital universes where code meets art.
              Every project is an experiment in pushing the boundaries of what&apos;s possible on the web.
            </p>
            <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
              <motion.span
                className="flex items-center gap-1 text-slate-500 hover:text-cyan-400 transition-colors cursor-default"
                whileHover={{ scale: 1.1 }}
              >
                <Heart size={16} className="text-lime-400" />
                <Code size={16} />
                <Zap size={16} className="text-cyan-400" />
                <Sparkles size={16} className="text-lime-400" />
                <span className="font-mono text-xs">Made with curiosity</span>
              </motion.span>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="lg:col-span-1" aria-label="Footer navigation">
            <h3 className="mb-6 text-sm font-mono text-cyan-400 tracking-widest uppercase">Navigate</h3>
            <ul className="space-y-3">
              {[
                { href: '#home', label: 'Home' },
                { href: '#projects', label: 'Projects' },
                { href: '#about', label: 'About' },
                { href: '#social', label: 'Connect' },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-base"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div className="lg:col-span-1">
            <h3 className="mb-6 text-sm font-mono text-cyan-400 tracking-widest uppercase">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.slice(0, 4).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target={link.icon !== 'mail' ? '_blank' : undefined}
                  rel={link.icon !== 'mail' ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-400 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-200"
                  aria-label={`${link.name}: ${link.description}`}
                >
                  {link.icon === 'github' && <GithubIcon size={16} />}
                  {link.icon === 'youtube' && <YouTubeIcon size={16} />}
                  {link.icon === 'twitter' && <XIcon size={16} />}
                  {link.icon === 'linkedin' && <LinkedInIcon size={16} />}
                  {link.icon === 'mail' && <MailIcon size={16} />}
                  <span className="hidden sm:inline">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="relative mb-8"
          variants={fadeInUp}
          style={{ transitionDelay: '0.2s' }}
        >
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
            <div className="w-24 h-px bg-gradient-to-r from-cyan-400 to-lime-400" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
          variants={fadeInUp}
          style={{ transitionDelay: '0.3s' }}
        >
          <p className="text-sm text-slate-500 text-center sm:text-left">
            © {currentYear} VELNOR. All rights reserved.
            <span className="hidden sm:inline mx-2">·</span>
            <span className="font-mono text-cyan-400">Built with Next.js</span>

          </p>

          {/* Easter egg trigger - click the version */}
          <motion.div
            className="flex items-center gap-3 text-xs text-slate-500 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.dispatchEvent(new CustomEvent('velnor:easter-egg:version'))}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.dispatchEvent(new CustomEvent('velnor:easter-egg:version')); } }}
            aria-label="Version info (click for surprise)"
          >
            <span className="font-mono">v1.0.0</span>
            <span className="hidden sm:inline">·</span>
            <span className="font-mono">Next.js 16</span>
            <span className="hidden sm:inline">·</span>
            <span className="font-mono">React 19</span>
            <span className="hidden sm:inline">·</span>
            <span className="font-mono">TypeScript 5</span>
          </motion.div>
        </motion.div>

        {/* Hidden easter egg hint */}
        <motion.p
          className="absolute bottom-4 right-4 text-xs text-slate-800 font-mono select-none pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ delay: 5, duration: 1 }}
          aria-hidden="true"
        >
          ↑ ↑ ↓ ↓ ← → ← → B A
        </motion.p>
      </div>
    </footer>
  );
}