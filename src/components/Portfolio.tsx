import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Zap, X, Check, Eye } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Web Dev', 'E-Commerce', 'AI & WebGL', 'UI/UX'];

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050510]">
      {/* Background Cyber Grid Lines */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#00D9FF] uppercase mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-[#00FFFF] shadow-[0_0_8px_#00FFFF]" />
            <span>// 02. PROVEN ARCHITECTURE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-orbitron font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-wide uppercase"
          >
            Featured <span className="text-[#00D9FF] neon-text-blue">Work & Case Studies</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-300 font-poppins"
          >
            Each deployment is built with rigorous attention to speed, visual hierarchy, and client conversion.
          </motion.p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-md font-orbitron text-xs tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#00D9FF] text-[#050510] font-bold shadow-[0_0_20px_rgba(0,217,255,0.7)]'
                  : 'bg-[#080C1C] text-gray-300 border border-[#00D9FF]/25 hover:border-[#00FFFF] hover:text-[#00FFFF]'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="group rounded-xl cyber-card overflow-hidden border border-[#00D9FF]/20 hover:border-[#00FFFF] transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_15px_45px_rgba(0,217,255,0.35)]"
            >
              {/* Project Image Container with Blue Neon Border on Hover */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#050510]">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Cyber Scanline Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent opacity-80" />

                {/* Live Hover Neon Border Ring */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#00D9FF] transition-colors duration-300 pointer-events-none group-hover:shadow-[inset_0_0_25px_rgba(0,217,255,0.5)]" />

                {/* Category Pill Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full bg-[#050510]/80 border border-[#00D9FF]/50 text-[#00FFFF] backdrop-blur-md font-semibold">
                    {project.category}
                  </span>
                </div>

                {/* Quick Inspect Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-[#050510]/50 backdrop-blur-[2px] transition-opacity duration-300">
                  <button
                    id={`preview-${project.id}`}
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded font-orbitron text-xs font-bold text-[#050510] bg-[#00FFFF] shadow-[0_0_20px_#00FFFF] transform scale-90 group-hover:scale-100 transition-all"
                  >
                    <Eye className="w-4 h-4 text-[#050510]" />
                    <span>INSPECT SYSTEM</span>
                  </button>
                </div>
              </div>

              {/* Project Body */}
              <div className="p-6 sm:p-7">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-orbitron font-bold text-xl sm:text-2xl text-white group-hover:text-[#00D9FF] transition-colors">
                    {project.title}
                  </h3>
                </div>
                <p className="font-mono text-xs text-[#00FFFF] mt-1">{project.subtitle}</p>

                <p className="mt-3 text-sm text-gray-300 font-poppins line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Metrics Highlight Pills */}
                <div className="mt-5 grid grid-cols-3 gap-2 py-3 px-3.5 rounded-lg bg-[#050510]/70 border border-[#00D9FF]/15">
                  {project.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="text-center">
                      <div className="font-orbitron font-bold text-xs sm:text-sm text-[#00D9FF]">
                        {m.value}
                      </div>
                      <div className="font-mono text-[9px] text-gray-400 uppercase truncate">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#00D9FF]/10 text-gray-300 border border-[#00D9FF]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Footer */}
                <div className="mt-6 pt-4 border-t border-[#00D9FF]/15 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="font-orbitron text-xs font-semibold text-[#00D9FF] hover:text-[#00FFFF] transition-colors"
                  >
                    FULL CASE STUDY &rarr;
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      title="Inspect Specs"
                      className="p-2 rounded hover:bg-[#00D9FF]/15 text-gray-400 hover:text-[#00FFFF] transition-colors"
                    >
                      <Zap className="w-4 h-4" />
                    </button>
                    <a
                      href="#contact"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded font-orbitron text-xs font-bold bg-[#00D9FF]/20 text-[#00FFFF] border border-[#00D9FF]/50 hover:bg-[#00D9FF] hover:text-[#050510] transition-all shadow-[0_0_10px_rgba(0,217,255,0.2)]"
                    >
                      <span>ORDER SIMILAR</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl rounded-xl cyber-card border-2 border-[#00D9FF] shadow-[0_0_50px_rgba(0,217,255,0.5)] bg-[#080C1C] overflow-hidden my-8"
            >
              {/* Close Button */}
              <button
                id="close-project-modal"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-md bg-[#050510]/80 text-gray-300 hover:text-[#00FFFF] border border-[#00D9FF]/40 hover:border-[#00FFFF] transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="relative aspect-video w-full">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080C1C] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <span className="font-mono text-xs text-[#00FFFF] px-2.5 py-1 rounded bg-[#050510]/90 border border-[#00D9FF]">
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="font-orbitron font-bold text-2xl sm:text-3xl text-white">
                    {selectedProject.title}
                  </h3>
                  <p className="font-mono text-sm text-[#00FFFF] mt-1">{selectedProject.subtitle}</p>
                </div>

                <p className="text-gray-200 font-poppins text-sm sm:text-base leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-lg bg-[#050510] border border-[#00D9FF]/30">
                  {selectedProject.metrics.map((metric, i) => (
                    <div key={i} className="text-center">
                      <div className="font-orbitron font-bold text-lg sm:text-xl text-[#00D9FF] neon-text-blue">
                        {metric.value}
                      </div>
                      <div className="font-mono text-[10px] text-gray-400 mt-0.5 uppercase">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="font-orbitron text-xs text-gray-400 uppercase tracking-wider mb-2">
                    DEPLOYED STACK & ARCHITECTURE:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded text-xs font-mono bg-[#00D9FF]/15 text-[#00FFFF] border border-[#00D9FF]/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="pt-4 border-t border-[#00D9FF]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="font-mono text-xs text-gray-400 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#00D9FF]" />
                    <span>Verified Production Metrics</span>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="flex-1 sm:flex-initial px-5 py-2.5 rounded font-mono text-xs text-gray-300 border border-[#00D9FF]/30 hover:bg-[#00D9FF]/10"
                    >
                      CLOSE
                    </button>
                    <a
                      href="#contact"
                      onClick={() => setSelectedProject(null)}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded font-orbitron text-xs font-bold text-[#050510] bg-[#00D9FF] hover:bg-[#00FFFF] shadow-[0_0_20px_rgba(0,217,255,0.7)] transition-all"
                    >
                      <span>REQUEST THIS ARCHITECTURE</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
