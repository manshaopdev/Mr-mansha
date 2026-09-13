import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Menu, X, ShieldCheck, Database, Send } from 'lucide-react';

interface NavbarProps {
  onOpenInbox: () => void;
  inboxCount?: number;
}

export default function Navbar({ onOpenInbox, inboxCount = 0 }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '// 01. SERVICES', href: '#services' },
    { label: '// 02. WORK', href: '#portfolio' },
    { label: '// 03. ARCHITECT', href: '#about' },
    { label: '// 04. CONTACT', href: '#contact' },
  ];

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050510]/90 backdrop-blur-md border-b border-[#00D9FF]/20 shadow-[0_4px_30px_rgba(0,217,255,0.15)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          id="nav-logo"
          className="group flex items-center gap-2.5 font-orbitron text-lg sm:text-xl font-bold tracking-wider text-white"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-md bg-[#050510] border border-[#00D9FF] shadow-[0_0_12px_rgba(0,217,255,0.4)] group-hover:shadow-[0_0_20px_rgba(0,217,255,0.8)] transition-all">
            <Terminal className="w-5 h-5 text-[#00D9FF] group-hover:text-[#00FFFF]" />
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00FFFF] animate-ping" />
          </div>
          <span className="group-hover:text-[#00D9FF] transition-colors">
            CYBER<span className="text-[#00D9FF] neon-text-blue">.DEV</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-mono tracking-wide text-gray-300">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleScrollTo(link.href)}
              className="relative text-xs tracking-widest text-gray-300 hover:text-[#00D9FF] transition-colors py-1 group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00FFFF] shadow-[0_0_8px_#00FFFF] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Live DB / Transmission Terminal Button */}
          <button
            id="nav-inbox-btn"
            onClick={onOpenInbox}
            title="Inspect received transmissions & database state"
            className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono text-[#00D9FF] bg-[#00D9FF]/10 border border-[#00D9FF]/30 hover:border-[#00FFFF] hover:bg-[#00D9FF]/20 hover:shadow-[0_0_15px_rgba(0,217,255,0.4)] transition-all"
          >
            <Database className="w-3.5 h-3.5 text-[#00FFFF]" />
            <span>VAULT</span>
            {inboxCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#00D9FF] text-[#050510] font-bold">
                {inboxCount}
              </span>
            )}
          </button>

          {/* Quick Contact CTA */}
          <button
            id="nav-hire-btn"
            onClick={() => handleScrollTo('#contact')}
            className="flex items-center gap-2 px-5 py-2 rounded text-xs font-orbitron font-semibold tracking-wider text-[#050510] bg-[#00D9FF] hover:bg-[#00FFFF] shadow-[0_0_15px_rgba(0,217,255,0.6)] hover:shadow-[0_0_25px_rgba(0,255,255,0.9)] transition-all transform hover:-translate-y-0.5"
          >
            <Send className="w-3.5 h-3.5 text-[#050510]" />
            <span>HIRE ME</span>
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden p-2 text-gray-300 hover:text-[#00D9FF] focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#00D9FF]" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-[#050510]/95 border-b border-[#00D9FF]/30 px-6 py-6 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,217,255,0.2)]"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleScrollTo(link.href)}
                  className="text-left font-mono text-sm tracking-wider text-gray-200 hover:text-[#00FFFF] py-2 border-b border-[#00D9FF]/10"
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenInbox();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded font-mono text-xs text-[#00D9FF] border border-[#00D9FF]/40 bg-[#00D9FF]/10"
                >
                  <Database className="w-4 h-4" />
                  <span>VIEW VAULT ({inboxCount})</span>
                </button>
                <button
                  onClick={() => handleScrollTo('#contact')}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded font-orbitron text-xs font-bold text-[#050510] bg-[#00D9FF]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>HIRE ME</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
