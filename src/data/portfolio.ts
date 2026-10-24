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
    tagline: 'Architect of Digital Universes',
    description: 'I build immersive web experiences that blur the line between code and art. From interactive narratives to experimental interfaces, I craft digital worlds that leave a mark.',
  },

  biography: {
    name: 'Velnor',
    title: 'Creative Developer & Digital Architect',
    tagline: 'Building worlds, one pixel at a time.',
    bio: `I&apos;m a creative developer obsessed with the intersection of code, design, and storytelling. My journey started with a fascination for how interactive media can evoke emotion and create memorable experiences.

Over the years, I&apos;ve worked on everything from experimental web installations to production applications serving millions. I believe the best digital experiences come from treating code as a creative medium—not just a utility.

When I&apos;m not pushing pixels, you&apos;ll find me exploring generative art, studying the aesthetics of early web sci-fi, or contributing to open-source projects that make the web more expressive.

This portfolio is itself an experiment—a living document of my craft, built with the same care and attention to detail I bring to every project.`,
    location: 'Earth, Solar System',
    email: 'hello@velnor.dev',
    avatar: '/avatar.webp',
  },

  projects: [
    {
      id: 'nexus',
      title: 'NEXUS Protocol',
      description: 'A real-time collaborative canvas for distributed teams. WebRTC-powered, end-to-end encrypted.',
      longDescription: 'NEXUS Protocol reimagines how distributed teams collaborate visually. Built on WebRTC with end-to-end encryption, it enables real-time co-creation without central servers seeing your data. Features infinite canvas, vector-native rendering, and a plugin architecture for extensibility.',
      status: 'live',
      tags: ['WebRTC', 'TypeScript', 'Canvas', 'E2E Encryption', 'WASM'],
      image: '/projects/nexus.webp',
      demoUrl: 'https://nexus.example.com',
      repoUrl: 'https://github.com/velnor/nexus',
      featured: true,
      order: 1,
    },
    {
      id: 'orbit',
      title: 'ORBIT Engine',
      description: 'A lightweight 3D engine for the web. 12KB gzipped, zero dependencies, runs everywhere.',
      longDescription: 'ORBIT is a minimal 3D rendering engine built for the modern web. Written in TypeScript with zero dependencies, it provides a declarative API for WebGL that feels like writing React components. Includes physics, post-processing, and a scene graph optimized for 60fps on mobile.',
      status: 'in-progress',
      tags: ['WebGL', 'TypeScript', 'Graphics', 'Physics', 'Zero-Dependencies'],
      image: '/projects/orbit.webp',
      demoUrl: 'https://orbit.example.com',
      repoUrl: 'https://github.com/velnor/orbit',
      featured: true,
      order: 2,
    },
    {
      id: 'void',
      title: 'VOID Editor',
      description: 'A code editor that lives in your browser. VS Code compatible, fully local-first.',
      longDescription: "VOID is a browser-based code editor that doesn't compromise. Built on Monaco with a custom extension host, it runs entirely client-side with IndexedDB persistence. Supports VS Code extensions, Language Server Protocol, and Git integration via WebAssembly.",
      status: 'concept',
      tags: ['Monaco', 'WASM', 'LSP', 'IndexedDB', 'Extensions'],
      image: '/projects/void.webp',
      demoUrl: undefined,
      repoUrl: 'https://github.com/velnor/void',
      featured: true,
      order: 3,
    },
    {
      id: 'signal',
      title: 'SIGNAL Visualizer',
      description: 'Real-time audio visualization for live performances. MIDI + Web Audio API.',
      longDescription: 'SIGNAL transforms live audio into generative visuals for performances and installations. Built with Web Audio API and WebGL shaders, it responds to frequency, amplitude, and MIDI input in real-time. Used in productions across 3 continents.',
      status: 'live',
      tags: ['Web Audio API', 'GLSL', 'MIDI', 'Generative Art', 'Performance'],
      image: '/projects/signal.webp',
      demoUrl: 'https://signal.example.com',
      repoUrl: 'https://github.com/velnor/signal',
      featured: false,
      order: 4,
    },
    {
      id: 'echo',
      title: 'ECHO Framework',
      description: 'A reactive UI framework for spatial computing. Declarative 3D interfaces.',
      longDescription: 'ECHO brings reactive programming to spatial interfaces. Write 3D UIs with the same mental model as React, but for AR/VR. Includes gesture recognition, spatial layout primitives, and a portal system for seamless reality transitions.',
      status: 'archived',
      tags: ['WebXR', 'React', 'Spatial Computing', 'Gestures', 'Archived'],
      image: '/projects/echo.webp',
      demoUrl: undefined,
      repoUrl: 'https://github.com/velnor/echo',
      featured: false,
      order: 5,
    },
    {
      id: 'prism',
      title: 'PRISM Shader Lab',
      description: 'Interactive GLSL playground with live compilation. Export to Three.js, p5.js, raw WebGL.',
      longDescription: 'PRISM is a shader development environment that makes GLSL accessible. Features live error reporting, uniform inspection, texture preview, and one-click export to popular frameworks. Built for shader artists and creative coders.',
      status: 'live',
      tags: ['GLSL', 'WebGL', 'Code Editor', 'Creative Coding', 'Education'],
      image: '/projects/prism.webp',
      demoUrl: 'https://prism.example.com',
      repoUrl: 'https://github.com/velnor/prism',
      featured: false,
      order: 6,
    },
  ],

  socialLinks: [
    {
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/velnor',
      icon: 'github',
      description: 'Source code & contributions',
      order: 1,
    },
    {
      id: 'youtube',
      name: 'YouTube',
      url: 'https://youtube.com/@velnor',
      icon: 'youtube',
      description: 'Deep dives & tutorials',
      order: 2,
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      url: 'https://x.com/velnor',
      icon: 'twitter',
      description: 'Thoughts & works in progress',
      order: 3,
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/velnor',
      icon: 'linkedin',
      description: 'Professional background',
      order: 4,
    },
    {
      id: 'email',
      name: 'Email',
      url: 'mailto:hello@velnor.dev',
      icon: 'mail',
      description: 'Say hello',
      order: 5,
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