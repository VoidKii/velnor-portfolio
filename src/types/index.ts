// VELNOR Type Definitions

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  status: 'live' | 'in-progress' | 'concept' | 'archived';
  tags: string[];
  image?: string;
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  order: number;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  description: string;
  order: number;
}

export interface Biography {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location?: string;
  email?: string;
  avatar?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  order: number;
}

export interface PortfolioData {
  identity: {
    name: string;
    tagline: string;
    description: string;
  };
  biography: Biography;
  projects: Project[];
  socialLinks: SocialLink[];
  navigation: {
    items: NavigationItem[];
  };
}

// Animation variants for Framer Motion
export interface AnimationVariants {
  hidden: Record<string, unknown>;
  visible: Record<string, unknown>;
  exit?: Record<string, unknown>;
}

// Easter egg types
export interface EasterEggState {
  konamiCode: boolean;
  terminalOpen: boolean;
  clickCount: number;
  lastClickTime: number;
}

// Reduced motion preference
export interface MotionPreferences {
  reducedMotion: boolean;
  prefersReducedMotion: boolean;
}

// Theme colors
export const themeColors = {
  background: '#080B12',
  panel: '#111827',
  panelHover: '#1a2332',
  cyan: '#65E7FF',
  cyanDim: '#4dd0e8',
  lime: '#B8FF6A',
  limeDim: '#9de055',
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  border: '#1E293B',
  borderHover: '#334155',
} as const;

export type ThemeColorKey = keyof typeof themeColors;