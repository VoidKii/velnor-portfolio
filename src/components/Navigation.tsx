// Navigation Component
// Responsive navigation with smooth anchor scrolling and working links

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, FolderKanban, User, Link2 } from 'lucide-react';
import { getNavigationItems } from '@/data/portfolio';
import { navLinkVariants, mobileMenuVariants } from '@/utils/animations';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const navItems = getNavigationItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0);

      // Update active section based on scroll position
      const sections = ['home', 'projects', 'about', 'social'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const initialFrame = window.requestAnimationFrame(handleScroll);
    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 h-0.5 z-50 bg-gradient-to-r from-cyan-400 to-lime-400"
        style={{ width: `${scrollProgress}%` }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1, ease: 'linear' }}
        aria-hidden="true"
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
              className="flex items-center gap-2 text-xl font-bold text-slate-50 hover:text-cyan-400 transition-colors duration-200"
              aria-label="Velnor - Home"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-mono text-cyan-400">VELNOR</span>
              <span className="hidden sm:inline text-slate-400 text-xs tracking-widest uppercase">portfolio</span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  className={`relative px-2 py-1 text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'text-cyan-400'
                      : 'text-slate-400 hover:text-slate-100'
                  }`}
                  variants={navLinkVariants}
                  custom={index}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 origin-center"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeSection === item.id ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-slate-400 hover:text-slate-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            <motion.div
              id="mobile-menu"
              className="md:hidden overflow-hidden border-t border-slate-800/50 bg-slate-950/95 backdrop-blur-md"
              variants={mobileMenuVariants}
              initial="closed"
              animate={isMobileMenuOpen ? 'open' : 'closed'}
              exit="closed"
            >
              <div className="py-4 px-2 space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20'
                        : 'text-slate-300 hover:bg-slate-800/50 hover:text-slate-100'
                    }`}
                    custom={index}
                    variants={navLinkVariants}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.id === 'home' && <Home size={20} />}
                    {item.id === 'projects' && <FolderKanban size={20} />}
                    {item.id === 'about' && <User size={20} />}
                    {item.id === 'social' && <Link2 size={20} />}
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}