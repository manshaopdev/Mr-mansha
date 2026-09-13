import { useState, useEffect, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Code2, Sparkles, Cpu, Layers, ExternalLink } from 'lucide-react';
import { DEV_INFO } from '../data/portfolioData';

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-[95vh] flex flex-col justify-center items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#050510]"
    >
      {/* 1. Animated Gradient Cyber Grid Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Animated Moving Grid */}
        <div className="absolute inset-0 cyber-grid-bg animate-grid-flow opacity-60" />

        {/* Cyberpunk Perspective Floor Grid */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[45vh] opacity-35"
          style={{
            background:
              'linear-gradient(to top, rgba(0, 217, 255, 0.15) 1px, transparent 1px), linear-gradient(to right, rgba(0, 217, 255, 0.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'bottom center',
          }}
        />

        {/* Ambient Dark Vignette & Color Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-[#050510]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050510] via-transparent to-[#050510]" />
      </div>

      {/* 2. Dynamic Mouse-Follow Neon Glow Effect */}
      <div
        className="absolute pointer-events-none transition-transform duration-200 ease-out z-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-30"
        style={{
          background: 'radial-gradient(circle, #00D9FF 0%, #00FFFF 25%, rgba(0,217,255,0.05) 70%, transparent 100%)',
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Decorative Cyber Floating Elements */}
      <div className="absolute top-28 left-8 hidden lg:block opacity-30 pointer-events-none font-mono text-[11px] text-[#00D9FF] space-y-1">
        <p>&gt; CORE_VERSION: v4.19.0-CYBER</p>
        <p>&gt; RUNTIME: NODE.JS_EXPRESS</p>
        <p>&gt; MEMORY_ALLOC: 64.2 MB</p>
      </div>

      <div className="absolute top-28 right-8 hidden lg:block opacity-30 pointer-events-none font-mono text-[11px] text-[#00FFFF] text-right space-y-1">
        <p>&lt;STATUS: NOMINAL&gt;</p>
        <p>&lt;SECURITY: ENCRYPTED_TLS&gt;</p>
        <p>&lt;DB_INTEGRATION: MONGODB&gt;</p>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Futuristic Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#00D9FF]/40 bg-[#00D9FF]/10 backdrop-blur-md shadow-[0_0_15px_rgba(0,217,255,0.25)] mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFFF] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D9FF]" />
          </span>
          <span className="font-mono text-xs tracking-wider text-[#00FFFF] uppercase font-semibold">
            {DEV_INFO.availability}
          </span>
        </motion.div>

        {/* MAIN HEADING: "I Code The Future" in Big Neon Blue Text */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-orbitron font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase"
        >
          I Code{' '}
          <span className="relative inline-block text-[#00D9FF] neon-text-blue">
            The Future
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent shadow-[0_0_12px_#00FFFF]"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </span>
        </motion.h1>

        {/* SUBTEXT: "Websites that convert visitors into clients" */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-lg sm:text-xl md:text-2xl font-poppins text-gray-200 max-w-3xl leading-relaxed tracking-wide font-normal"
        >
          Websites that <span className="text-[#00FFFF] font-semibold">convert visitors into clients</span>.
          Engineered with hyper-fast performance, cinematic cyber visuals, and clean full-stack architecture.
        </motion.p>

        {/* Core Metrics Pill Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center items-center gap-3 sm:gap-6 font-mono text-xs sm:text-sm text-gray-300"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#080C1C]/70 border border-[#00D9FF]/20 backdrop-blur-sm">
            <span className="text-[#00D9FF] font-bold">99+</span>
            <span className="text-gray-400">Lighthouse Score</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#080C1C]/70 border border-[#00D9FF]/20 backdrop-blur-sm">
            <span className="text-[#00FFFF] font-bold">&lt; 0.5s</span>
            <span className="text-gray-400">Load Latency</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#080C1C]/70 border border-[#00D9FF]/20 backdrop-blur-sm">
            <span className="text-[#00D9FF] font-bold">100%</span>
            <span className="text-gray-400">Conversion Focused</span>
          </div>
        </motion.div>

        {/* 2 Buttons: "Hire Me" and "My Work" with neon border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          {/* Button 1: "Hire Me" */}
          <button
            id="hero-hire-btn"
            onClick={() => scrollToSection('#contact')}
            className="w-full sm:w-auto relative group overflow-hidden px-8 py-4 rounded-md font-orbitron font-bold text-sm tracking-wider text-[#050510] bg-[#00D9FF] hover:bg-[#00FFFF] transition-all duration-300 shadow-[0_0_25px_rgba(0,217,255,0.7)] hover:shadow-[0_0_40px_rgba(0,255,255,1)] transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-center gap-2.5">
              <span>HIRE ME</span>
              <Sparkles className="w-4 h-4 text-[#050510]" />
            </div>
          </button>

          {/* Button 2: "My Work" with neon border */}
          <button
            id="hero-work-btn"
            onClick={() => scrollToSection('#portfolio')}
            className="w-full sm:w-auto group relative px-8 py-4 rounded-md font-orbitron font-bold text-sm tracking-wider text-white bg-[#050510]/80 border-2 border-[#00D9FF] shadow-[0_0_15px_rgba(0,217,255,0.35)] hover:border-[#00FFFF] hover:shadow-[0_0_30px_rgba(0,217,255,0.8),inset_0_0_15px_rgba(0,217,255,0.3)] transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-center gap-2.5 group-hover:text-[#00FFFF]">
              <span>MY WORK</span>
              <ExternalLink className="w-4 h-4 text-[#00D9FF] group-hover:text-[#00FFFF] transition-transform group-hover:translate-x-0.5" />
            </div>
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="mt-14 cursor-pointer text-gray-400 hover:text-[#00D9FF] transition-colors flex flex-col items-center gap-2"
          onClick={() => scrollToSection('#services')}
        >
          <span className="font-mono text-[11px] tracking-widest uppercase text-gray-500">INITIALIZE SCROLL</span>
          <ArrowDown className="w-4 h-4 text-[#00D9FF] shadow-[0_0_8px_#00D9FF]" />
        </motion.div>
      </div>
    </section>
  );
}
