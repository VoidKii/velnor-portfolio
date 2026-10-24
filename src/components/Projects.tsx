// Projects Section Component
// Reusable cards with honest statuses, interactive hover states

'use client';

import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle, Clock, Lightbulb, Archive } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { getAllProjects, getFeaturedProjects, type Project } from '@/data/portfolio';
import { fadeInUp, staggerContainer, staggerItem, cardHover } from '@/utils/animations';

const statusConfig = {
  live: { label: 'Live', icon: CheckCircle, color: 'text-lime-400', bg: 'bg-lime-400/10 border-lime-400/20' },
  'in-progress': { label: 'In Progress', icon: Clock, color: 'text-cyan-400', bg: 'bg-cyan-400/10 border-cyan-400/20' },
  concept: { label: 'Concept', icon: Lightbulb, color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20' },
  archived: { label: 'Archived', icon: Archive, color: 'text-slate-500', bg: 'bg-slate-500/10 border-slate-500/20' },
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const config = statusConfig[project.status];

  return (
    <motion.article
      className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 overflow-hidden"
      variants={cardHover}
      initial="initial"
      whileHover="hover"
      style={{ willChange: 'transform, box-shadow' }}
    >
      {/* Project image placeholder */}
      <div className="relative aspect-video overflow-hidden bg-slate-800/50">
        {project.image ? (
          <motion.img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-1/2 h-1/2 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}

        {/* Status badge */}
        <motion.div
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-mono font-medium border"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
          style={{ willChange: 'transform, opacity' }}
        >
          <span className={`flex items-center gap-1 ${config.bg} ${config.color}`}>
            <config.icon size={10} />
            {config.label}
          </span>
        </motion.div>

        {/* Overlay with links */}
        <motion.div
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {project.demoUrl && (
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-cyan-400 text-slate-950 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-[0_0_20px_rgba(101,231,255,0.4)]"
              whileTap={{ scale: 0.9 }}
              aria-label={`View ${project.title} demo`}
            >
              <ExternalLink size={20} />
            </motion.a>
          )}
          {project.repoUrl && (
            <motion.a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-800 text-slate-100 rounded-lg border border-slate-700 transition-all duration-200 hover:border-cyan-400 hover:bg-slate-700"
              whileTap={{ scale: 0.9 }}
              aria-label={`View ${project.title} source code`}
            >
              <GithubIcon size={20} />
            </motion.a>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <motion.div
          className="flex items-start justify-between gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.05 }}
        >
          <div>
            <h3 className="text-xl font-bold text-slate-50 group-hover:text-cyan-400 transition-colors duration-200">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-slate-400">{project.description}</p>
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 + index * 0.05 }}
        >
          {project.tags.slice(0, 4).map((tag, i) => (
            <motion.span
              key={tag}
              className="px-2.5 py-1 text-xs font-mono text-slate-400 bg-slate-800/50 rounded border border-slate-700 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-200"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.03, type: 'spring', stiffness: 300, damping: 20 }}
            >
              {tag}
            </motion.span>
          ))}
          {project.tags.length > 4 && (
            <motion.span
              className="px-2.5 py-1 text-xs font-mono text-slate-500 bg-slate-800/50 rounded border border-slate-700"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + 4 * 0.03, type: 'spring', stiffness: 300, damping: 20 }}
            >
              +{project.tags.length - 4}
            </motion.span>
          )}
        </motion.div>

        {/* Long description on hover */}
        {project.longDescription && (
          <motion.p
            className="text-sm text-slate-400 line-clamp-3 group-hover:line-clamp-none transition-all duration-300"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 0.35 + index * 0.05 }}
          >
            {project.longDescription}
          </motion.p>
        )}
      </div>
    </motion.article>
  );
}

export function Projects() {
  const featuredProjects = getFeaturedProjects();
  const allProjects = getAllProjects();
  const nonFeaturedProjects = allProjects.filter(p => !p.featured);

  return (
    <section
      id="projects"
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="projects-heading"
    >
      {/* Background orbital accent */}
      <div className="absolute top-0 right-0 w-96 h-96 -translate-x-1/2 translate-y-1/2 pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="180" fill="none" stroke="#65E7FF" strokeWidth="0.5" strokeDasharray="20 40" opacity="0.08" />
          <circle cx="200" cy="200" r="120" fill="none" stroke="#B8FF6A" strokeWidth="0.5" strokeDasharray="30 60" opacity="0.05" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <p className="mb-4 text-sm font-mono text-cyan-400 tracking-widest uppercase">Selected Works</p>
          <h2 id="projects-heading" className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-50 tracking-tight">
            Projects <span className="text-cyan-400">Archive</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            A curated collection of experiments, products, and collaborations. Each project represents a problem I could not stop thinking about.
          </p>
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <motion.div
            className="mb-16"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <h3 className="mb-8 text-lg font-mono text-slate-400 tracking-wider uppercase">Featured</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* All Projects */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h3 className="mb-8 text-lg font-mono text-slate-400 tracking-wider uppercase">All Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nonFeaturedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* Empty state / CTA */}
          {nonFeaturedProjects.length === 0 && (
            <motion.div
              className="col-span-full text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800"
              variants={staggerItem}
            >
              <p className="text-slate-400 mb-4">No projects yet. Start building something.</p>
              <a
                href="https://github.com/velnor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-400 text-slate-950 font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(101,231,255,0.3)] transition-all"
              >
                View GitHub
                <ExternalLink size={18} />
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}