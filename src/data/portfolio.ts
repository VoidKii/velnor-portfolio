// VELNOR Portfolio Data
// Edit this file to customize your portfolio content

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
    items: Array<{
      id: string;
      label: string;
      href: string;
      order: number;
    }>;
  };
}

// Central portfolio data - EDIT THIS FILE TO CUSTOMIZE YOUR PORTFOLIO
export const portfolioData: PortfolioData = {
  identity: {
    name: 'VELNOR',
    tagline: 'Creator of digital experiments',
    description: 'A creator learning by building AI tools, web projects, and interactive experiences—one experiment at a time.',
  },

  biography: {
    name: 'Velnor',
    title: 'Creator & Builder',
    tagline: 'Learning by building, one experiment at a time.',
    bio: `I'm a creator exploring AI tools, web development, and creative technology.
I learn by building real projects, testing ideas, and improving them as I go.

This portfolio is a living record of what I'm working on, what I'm learning, and the experiments I choose to share.`,
  },

  projects: [
    {
      id: 'velnor-portfolio',
      title: 'VELNOR Portfolio',
      description: 'A cinematic sci-fi home for my projects, experiments, and creator journey.',
      longDescription: 'This portfolio brings together a custom orbital centerpiece, a deterministic animated starfield, responsive sections, and a hidden terminal easter egg.',
      status: 'in-progress',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      repoUrl: 'https://github.com/VoidKii/velnor-portfolio',
      featured: true,
      order: 1,
    },
    {
      id: 'nyvex',
      title: 'NYVEX',
      description: 'An AI-focused workspace concept for exploring intelligent tools and workflows.',
      longDescription: 'NYVEX is an ongoing project exploring a modular AI workspace and distinct modes for building, research, creativity, and strategy.',
      status: 'in-progress',
      tags: ['AI', 'Web App', 'Product Design'],
      demoUrl: 'https://nyvex-kati.onrender.com',
      repoUrl: 'https://github.com/VoidKii/NYVEX',
      featured: true,
      order: 2,
    },
    {
      id: 'Velnor-Studio',
      title: 'Velnor Studio',
      description: 'A creator workspace for developing video ideas, scripts, and packaging.',
      longDescription: 'Velnor Studio is a work in progress focused on helping creators organize ideas and improve how they present videos. Connected analytics and external integrations are not claimed unless they actually work.',
      status: 'in-progress',
      tags: ['Next.js', 'Creator Tools', 'YouTube'],
      repoUrl: 'https://github.com/VoidKii/velnor-studio',
      featured: true,
      order: 3,
    },
  ],

  socialLinks: [
    {
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/VoidKii',
      icon: 'github',
      description: 'Public code and projects',
      order: 1,
    },
    {
      id: 'youtube',
      name: 'YouTube',
      url: 'https://youtube.com/channel/UCnRSqu1782SwFSKWZcXT-Vw',
      icon: 'youtube',
      description: 'Videos, edits, and experiments',
      order: 2,
    },
  ],

  navigation: {
    items: [
      { id: 'home', label: 'Home', href: '#home', order: 1 },
      { id: 'projects', label: 'Projects', href: '#projects', order: 2 },
      { id: 'about', label: 'About', href: '#about', order: 3 },
      { id: 'social', label: 'Connect', href: '#social', order: 4 },
    ],
  },
};

// Helper functions
export const getFeaturedProjects = () =>
  portfolioData.projects.filter(p => p.featured).sort((a, b) => a.order - b.order);

export const getAllProjects = () =>
  [...portfolioData.projects].sort((a, b) => a.order - b.order);

export const getSocialLinks = () =>
  [...portfolioData.socialLinks].sort((a, b) => a.order - b.order);

export const getNavigationItems = () =>
  [...portfolioData.navigation.items].sort((a, b) => a.order - b.order);

export const getProjectById = (id: string) =>
  portfolioData.projects.find(p => p.id === id);