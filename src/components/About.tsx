import { motion } from 'motion/react';
import { ShieldCheck, Cpu, Code2, Terminal, Award, Sparkles, Database, Layers } from 'lucide-react';
import { DEV_INFO, SKILL_CATEGORIES } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050510] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#00D9FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#00D9FF] uppercase mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-[#00FFFF] shadow-[0_0_8px_#00FFFF]" />
            <span>// 03. SYSTEM ARCHITECT</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-orbitron font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-wide uppercase"
          >
            About The <span className="text-[#00D9FF] neon-text-blue">Developer</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-300 font-poppins"
          >
            Merging relentless code optimization with cinematic cyberpunk design.
          </motion.p>
        </div>

        {/* 2-Column Layout: Photo & Interactive Cyber Rings on Left, Bio & Stats on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Developer Photo in a Circle with Rotating Blue Neon Rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            {/* Outer Cyber Rings Wrapper */}
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center">
              {/* Pulsing Neon Cyan Ambient Glow behind avatar */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#00D9FF]/30 to-[#00FFFF]/20 blur-2xl animate-pulse" />

              {/* ROTATING NEON RING 1 (Clockwise with glowing dashes and blue neon shadow) */}
              <div
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#00D9FF] animate-spin-slow pointer-events-none"
                style={{
                  boxShadow: '0 0 25px rgba(0, 217, 255, 0.7), inset 0 0 15px rgba(0, 217, 255, 0.3)',
                }}
              />

              {/* ROTATING NEON RING 2 (Counter-Clockwise Cyan with notched ticks) */}
              <div
                className="absolute inset-4 rounded-full border border-dotted border-[#00FFFF] animate-spin-reverse pointer-events-none opacity-80"
                style={{
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
                }}
              />

              {/* Rotating Corner Coordinates / Crosshairs */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#050510] border border-[#00D9FF] text-[9px] font-mono text-[#00FFFF] tracking-widest shadow-[0_0_10px_#00D9FF]">
                SECTOR_07
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#050510] border border-[#00D9FF] text-[9px] font-mono text-[#00D9FF] tracking-widest">
                SYS:ACTIVE
              </div>

              {/* Developer Circular Photo */}
              <div className="relative w-56 h-56 sm:w-68 sm:h-68 rounded-full overflow-hidden border-2 border-[#00FFFF] shadow-[0_0_35px_rgba(0,217,255,0.6)] z-10 bg-[#080C1C]">
                <img
                  src={DEV_INFO.avatarImage}
                  alt={DEV_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />

                {/* Subtle Inner Glow and Scanline overlay */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,217,255,0.4)] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050510]/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Sub-Avatar Status Badge */}
            <div className="mt-8 text-center">
              <h3 className="font-orbitron font-bold text-xl text-white tracking-wider">
                {DEV_INFO.name}
              </h3>
              <p className="font-mono text-xs text-[#00FFFF] tracking-wide mt-1">
                // {DEV_INFO.handle} &bull; {DEV_INFO.location}
              </p>
            </div>
          </motion.div>

          {/* RIGHT: Bio, Skills & Metric Gauges */}
          <div className="lg:col-span-7 space-y-8">
            {/* Bio Narrative */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="cyber-card p-6 sm:p-8 rounded-xl border border-[#00D9FF]/25 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center gap-2 mb-4 font-mono text-xs text-[#00D9FF]">
                <Terminal className="w-4 h-4 text-[#00FFFF]" />
                <span>$ whoami --verbose</span>
              </div>

              <h3 className="font-orbitron font-bold text-2xl text-white mb-3">
                Freelance Web Developer Building High-Impact Cyber Systems
              </h3>

              <p className="text-gray-300 font-poppins text-sm sm:text-base leading-relaxed">
                I help startups, enterprises, and ambitious visionaries transform their online presence
                from standard templates into captivating, high-performance web applications that convert.
              </p>

              <p className="mt-3 text-gray-300 font-poppins text-sm leading-relaxed">
                Specializing in the modern React ecosystem, resilient Node.js backends, and robust
                MongoDB data architecture. Every line of code is optimized for extreme load speed, SEO visibility,
                and seamless client acquisition.
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#00D9FF]/20">
                <div>
                  <div className="font-orbitron font-extrabold text-2xl text-[#00D9FF] neon-text-blue">
                    {DEV_INFO.experienceYears}
                  </div>
                  <div className="font-mono text-[10px] text-gray-400 uppercase mt-0.5">
                    Years Shipping
                  </div>
                </div>
                <div>
                  <div className="font-orbitron font-extrabold text-2xl text-[#00FFFF] neon-text-cyan">
                    {DEV_INFO.projectsCompleted}
                  </div>
                  <div className="font-mono text-[10px] text-gray-400 uppercase mt-0.5">
                    Projects Deployed
                  </div>
                </div>
                <div>
                  <div className="font-orbitron font-extrabold text-2xl text-[#00D9FF] neon-text-blue">
                    {DEV_INFO.clientSatisfaction}
                  </div>
                  <div className="font-mono text-[10px] text-gray-400 uppercase mt-0.5">
                    Satisfaction
                  </div>
                </div>
                <div>
                  <div className="font-orbitron font-extrabold text-2xl text-[#00FFFF] neon-text-cyan">
                    {DEV_INFO.avgLighthouseScore}
                  </div>
                  <div className="font-mono text-[10px] text-gray-400 uppercase mt-0.5">
                    Avg Lighthouse
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Technical Skills HUD */}
            <div className="space-y-6">
              {SKILL_CATEGORIES.map((category, cIdx) => (
                <div key={category.name} className="space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#00FFFF] tracking-wider uppercase font-semibold">
                    <Cpu className="w-3.5 h-3.5 text-[#00D9FF]" />
                    <span>// {category.name}</span>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-gray-200">{skill.name}</span>
                          <span className="text-[#00D9FF] font-semibold">{skill.level}%</span>
                        </div>
                        {/* Neon Progress Bar */}
                        <div className="h-2 w-full rounded-full bg-[#050510] border border-[#00D9FF]/20 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.1 }}
                            className="h-full bg-gradient-to-r from-[#0099FF] via-[#00D9FF] to-[#00FFFF] rounded-full shadow-[0_0_10px_#00D9FF]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
