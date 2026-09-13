import { Github, Linkedin, Twitter, MessageCircle, MessageSquare, Mail, ArrowUp, Terminal, Shield } from 'lucide-react';
import { DEV_INFO } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: DEV_INFO.github },
    { name: 'LinkedIn', icon: Linkedin, url: DEV_INFO.linkedin },
    { name: 'Twitter / X', icon: Twitter, url: DEV_INFO.twitter },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/${DEV_INFO.whatsappNumber.replace(/[^0-9]/g, '')}`,
    },
    {
      name: 'WhatsApp Channel',
      icon: MessageSquare,
      url: DEV_INFO.whatsappChannelUrl,
    },
    { name: 'Email', icon: Mail, url: `mailto:${DEV_INFO.email}` },
  ];

  return (
    <footer className="relative bg-[#050510] border-t border-[#00D9FF]/20 pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background glow strip */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent shadow-[0_0_15px_#00D9FF]" />

      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand Info */}
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2.5 font-orbitron text-xl font-bold tracking-wider text-white">
              <Terminal className="w-5 h-5 text-[#00D9FF]" />
              <span>
                CYBER<span className="text-[#00D9FF] neon-text-blue">.DEV</span>
              </span>
            </div>
            <p className="font-poppins text-xs text-gray-400 max-w-sm">
              Crafting futuristic full-stack web architectures engineered to convert traffic into long-term clients.
            </p>
          </div>

          {/* SOCIAL ICONS WITH NEON HOVER */}
          <div className="flex items-center gap-3.5">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  id={`social-${social.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-11 h-11 rounded-lg bg-[#080C1C] border border-[#00D9FF]/30 flex items-center justify-center text-gray-300 hover:text-[#00FFFF] hover:border-[#00FFFF] shadow-[0_0_10px_rgba(0,217,255,0.15)] hover:shadow-[0_0_25px_rgba(0,255,255,0.8),inset_0_0_10px_rgba(0,217,255,0.3)] transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* Back to Top Neon Button */}
          <div>
            <button
              id="back-to-top-btn"
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2.5 rounded-md font-orbitron text-xs font-bold tracking-wider text-[#00D9FF] bg-[#050510] border border-[#00D9FF] shadow-[0_0_15px_rgba(0,217,255,0.3)] hover:border-[#00FFFF] hover:text-[#00FFFF] hover:shadow-[0_0_25px_rgba(0,255,255,0.7)] transition-all"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* System Telemetry & Copyright Bar */}
        <div className="pt-8 border-t border-[#00D9FF]/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_6px_#00D9FF]" />
            <span>LATENCY: 14ms // ALL SYSTEMS NOMINAL // MONGODB PROTOCOL ACTIVE</span>
          </div>

          <div>
            &copy; {new Date().getFullYear()} {DEV_INFO.name}. ALL RIGHTS RESERVED. CODE THE FUTURE.
          </div>
        </div>
      </div>
    </footer>
  );
}
