// Terminal Easter Egg Component
// Hidden terminal-style reveal with keyboard trigger

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Copy } from 'lucide-react';
import { terminalVariants } from '@/utils/animations';

const TERMINAL_LINES = [
  { text: 'VELNOR_DIGITAL_UNIVERSE v1.0.0', type: 'header', delay: 0 },
  { text: 'Initializing quantum entanglement...', type: 'info', delay: 300 },
  { text: '[OK] Neural pathways established', type: 'success', delay: 600 },
  { text: '[OK] Reality distortion field active', type: 'success', delay: 900 },
  { text: '[OK] Orbital mechanics calibrated', type: 'success', delay: 1200 },
  { text: '[OK] Starfield generator online', type: 'success', delay: 1500 },
  { text: '', type: 'empty', delay: 1800 },
  { text: '> ACCESSING CLASSIFIED ARCHIVES...', type: 'command', delay: 2100 },
  { text: '> DECRYPTING PROJECT FILES...', type: 'command', delay: 2500 },
  { text: '', type: 'empty', delay: 2800 },
  { text: '╔═══════════════════════════════════════════╗', type: 'box', delay: 3100 },
  { text: '║  WELCOME TO THE INNER SANCTUM, TRAVELER  ║', type: 'box', delay: 3300 },
  { text: '╚═══════════════════════════════════════════╝', type: 'box', delay: 3500 },
  { text: '', type: 'empty', delay: 3700 },
  { text: 'You have found the hidden terminal.', type: 'secret', delay: 4000 },
  { text: 'This means you possess the curiosity', type: 'secret', delay: 4300 },
  { text: 'required to see beyond the surface.', type: 'secret', delay: 4600 },
  { text: '', type: 'empty', delay: 4900 },
  { text: 'REMEMBER:', type: 'secret', delay: 5200 },
  { text: '  Code is not a tool. Code is a medium.', type: 'secret', delay: 5500 },
  { text: '  The best universes are built by those', type: 'secret', delay: 5800 },
  { text: '  who refuse to accept defaults.', type: 'secret', delay: 6100 },
  { text: '', type: 'empty', delay: 6400 },
  { text: '~/.velnor/secrets/', type: 'prompt', delay: 6700 },
  { text: '  nexus_protocol/     - Distributed canvas', type: 'file', delay: 6900 },
  { text: '  orbit_engine/       - 12KB 3D engine', type: 'file', delay: 7100 },
  { text: '  void_editor/        - Browser IDE', type: 'file', delay: 7300 },
  { text: '  signal_visualizer/  - Audio reactive', type: 'file', delay: 7500 },
  { text: '  echo_framework/     - Spatial UI (archived)', type: 'file', delay: 7700 },
  { text: '  prism_shader_lab/   - GLSL playground', type: 'file', delay: 7900 },
  { text: '', type: 'empty', delay: 8100 },
  { text: 'Type "velnor --help" for available commands.', type: 'hint', delay: 8400 },
  { text: 'Type "velnor --launch" to begin your journey.', type: 'hint', delay: 8700 },
  { text: '', type: 'empty', delay: 9000 },
  { text: 'velnor@digital-universe:~$ ', type: 'prompt', delay: 9300, cursor: true },
];

interface TerminalLine {
  text: string;
  type: 'header' | 'info' | 'success' | 'command' | 'box' | 'secret' | 'prompt' | 'file' | 'hint' | 'empty';
  delay: number;
  cursor?: boolean;
}

export function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Konami code detection
  useEffect(() => {
    const sequence = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ];
    let index = 0;

    const handler = (event: KeyboardEvent) => {
      // Don't trigger if terminal is already open or user is typing in input
      if (isOpen || (event.target as HTMLElement)?.tagName === 'INPUT') return;

      if (event.code === sequence[index]) {
        index++;
        if (index === sequence.length) {
          setIsOpen(true);
          index = 0;
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  // Also listen for custom events (from footer version click, etc.)
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('velnor:easter-egg:version', handler);
    window.addEventListener('velnor:easter-egg:konami', handler);
    return () => {
      window.removeEventListener('velnor:easter-egg:version', handler);
      window.removeEventListener('velnor:easter-egg:konami', handler);
    };
  }, []);

  // Terminal typing animation
  useEffect(() => {
    if (!isOpen) {
      // Defer state reset to avoid synchronous setState in effect
      setTimeout(() => {
        setVisibleLines([]);
        setIsTyping(false);
        setShowCursor(false);
      }, 0);
      return;
    }

    let cancelled = false;

    const typeLines = async () => {
      setIsTyping(true);
      setVisibleLines([]);
      setShowCursor(false);

      for (let i = 0; i < TERMINAL_LINES.length; i++) {
        if (cancelled || !isOpen) break;

        const line = TERMINAL_LINES[i];

        // Wait for the line's delay
        const waitTime = line.delay - (i > 0 ? TERMINAL_LINES[i - 1].delay : 0);
        await new Promise(resolve => setTimeout(resolve, waitTime));

        if (cancelled || !isOpen) break;

        setVisibleLines(prev => [...prev, line]);

        // Scroll to bottom
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }

      if (!cancelled) {
        setIsTyping(false);
        setShowCursor(true);
      }
    };

    typeLines();

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setShowCursor(false);
  };

  const copyOutput = async () => {
    const text = visibleLines.map(l => l.text).join('\n');
    await navigator.clipboard.writeText(text);
    // Could show toast notification
  };

  const getLineClass = (type: TerminalLine['type']) => {
    switch (type) {
      case 'header': return 'text-cyan-400 font-bold text-lg';
      case 'info': return 'text-slate-300';
      case 'success': return 'text-lime-400';
      case 'command': return 'text-amber-400 font-mono';
      case 'box': return 'text-cyan-400 font-mono';
      case 'secret': return 'text-lime-300 font-medium';
      case 'prompt': return 'text-cyan-400 font-mono';
      case 'file': return 'text-slate-400 font-mono ml-4';
      case 'hint': return 'text-slate-500 italic';
      default: return 'text-slate-400';
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="terminal-title"
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Terminal Window */}
        <motion.div
          ref={terminalRef}
          className="relative w-full max-w-4xl h-[80vh] max-h-[700px] bg-slate-950 rounded-xl border border-slate-700 overflow-hidden flex flex-col"
          variants={terminalVariants}
          initial="closed"
          animate="open"
          exit="closed"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <TerminalIcon size={16} className="text-slate-400" />
              <span id="terminal-title" className="font-mono text-sm text-slate-300">velnor@digital-universe:~$ terminal</span>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <button
                onClick={copyOutput}
                className="p-1.5 text-slate-500 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
                aria-label="Copy output"
              >
                <Copy size={14} />
              </button>
              <button
                onClick={handleClose}
                className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                aria-label="Close terminal"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Output area */}
          <div className="flex-1 overflow-y-auto p-6 font-mono text-sm leading-relaxed" style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace' }}>
            <div className="space-y-1">
              {visibleLines.map((line, index) => (
                <motion.div
                  key={index}
                  className={getLineClass(line.type)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1, delay: index * 0.01 }}
                >
                  <span>{line.text}</span>
                  {line.cursor && showCursor && !isTyping && (
                    <motion.span
                      className="ml-1 bg-cyan-400 text-slate-950 animate-pulse"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      █
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Input area (non-functional, just for show) */}
          <div className="px-4 py-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <span className="text-cyan-400 font-mono">velnor@digital-universe:~$</span>
            <input
              type="text"
              className="flex-1 bg-transparent border-none outline-none text-slate-100 font-mono text-sm"
              placeholder="Type 'velnor --help' or 'velnor --launch'..."
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const value = (e.target as HTMLInputElement).value.trim().toLowerCase();
                  if (value === 'velnor --help') {
                    // Could show help
                  } else if (value === 'velnor --launch') {
                    window.open('#projects', '_self');
                    handleClose();
                  }
                  (e.target as HTMLInputElement).value = '';
                }
                if (e.key === 'Escape') handleClose();
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}