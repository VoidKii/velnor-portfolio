// Main Page Component
// Composes all sections into the complete VELNOR portfolio

'use client';

import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Projects } from '@/components/Projects';
import { About } from '@/components/About';
import { Social } from '@/components/Social';
import { Footer } from '@/components/Footer';
import { Terminal } from '@/components/Terminal';
import { Starfield } from '@/components/Starfield';

export default function Home() {
  return (
    <>
      {/* Global starfield background */}
      <Starfield />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main id="main-content" className="flex-1">
        <Hero />
        <Projects />
        <About />
        <Social />
      </main>

      {/* Footer */}
      <Footer />

      {/* Terminal Easter Egg */}
      <Terminal />
    </>
  );
}