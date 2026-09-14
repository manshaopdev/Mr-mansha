import React, { useState } from 'react';
import {
  Sparkles,
  Menu,
  X,
  Phone,
  MessageCircle,
  Palette,
  Code2,
  TrendingUp,
  Calculator,
  Briefcase,
  ChevronDown
} from 'lucide-react';
import { Currency } from '../types/agency';
import { AGENCY_INFO } from '../data/agencyData';

interface NavbarProps {
  currency: Currency;
  onToggleCurrency: () => void;
  onOpenInquiry: (initialService?: string) => void;
  onScrollTo: (elementId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  onToggleCurrency,
  onOpenInquiry,
  onScrollTo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Prime Plus Team! I visited your website and would like to discuss a project regarding Graphic Design / Web Development / Digital Marketing.'
    );
    window.open(`https://wa.me/${AGENCY_INFO.contacts.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#090D16]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Announcement Ribbon */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-500/20 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-slate-200">
              {AGENCY_INFO.contacts.availability}
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-indigo-300 font-mono text-[11px]">
              Graphic Design • Web Development • Digital Marketing
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <button
              onClick={openWhatsApp}
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: {AGENCY_INFO.contacts.whatsappFormatted}</span>
            </button>
            <span className="text-slate-600">|</span>
            {/* Currency Switcher */}
            <button
              onClick={onToggleCurrency}
              className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition-colors cursor-pointer font-bold"
              title="Toggle Currency (PKR / USD)"
            >
              <span>Currency:</span>
              <span className="underline">{currency === 'PKR' ? 'PKR (₨)' : 'USD ($)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-sky-500 to-indigo-400 p-[1.5px] shadow-[0_0_20px_rgba(99,102,241,0.35)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] transition-all">
              <div className="w-full h-full bg-[#090D16] rounded-2xl flex items-center justify-center">
                <span className="font-black text-xl bg-gradient-to-r from-sky-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent">
                  P+
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white font-['Outfit',sans-serif]">
                  PRIME PLUS
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                  TEAM
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide font-medium flex items-center gap-1">
                <span>Design</span>
                <span className="text-indigo-400">•</span>
                <span>Web Dev</span>
                <span className="text-indigo-400">•</span>
                <span>Marketing</span>
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('services-breakdown')}
                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer py-2"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? 'rotate-180 text-sky-400' : ''}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-2.5 shadow-2xl shadow-black/80 space-y-1">
                  <div
                    onClick={() => handleNavClick('service-graphic-design')}
                    className="p-3 rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer flex items-start gap-3 group"
                  >
                    <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400 group-hover:bg-pink-500/30">
                      <Palette className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-pink-300 flex items-center gap-1.5">
                        <span>Graphic Designing</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Logos, Branding, UI/UX, Packaging, 3D & Social Creatives
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => handleNavClick('service-web-development')}
                    className="p-3 rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer flex items-start gap-3 group"
                  >
                    <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400 group-hover:bg-sky-500/30">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-sky-300 flex items-center gap-1.5">
                        <span>Web Development</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        React 19, Next.js, Full-Stack, E-Commerce, Custom SaaS
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => handleNavClick('service-digital-marketing')}
                    className="p-3 rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer flex items-start gap-3 group"
                  >
                    <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 group-hover:bg-amber-500/30">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-amber-300 flex items-center gap-1.5">
                        <span>Digital Marketing</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Meta & Google Ads, SEO, ROAS Growth & SMM
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('case-studies')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Case Studies
            </button>

            <button
              onClick={() => handleNavClick('cost-estimator')}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Calculator className="w-4 h-4 text-sky-400" />
              <span>Cost Estimator</span>
            </button>

            <button
              onClick={() => handleNavClick('pricing-packages')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Packages
            </button>

            <button
              onClick={() => handleNavClick('process-flow')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              How We Work
            </button>

            <button
              onClick={() => handleNavClick('team-about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              The Team
            </button>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={openWhatsApp}
              className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 transition-colors cursor-pointer flex items-center gap-2 text-xs font-semibold"
              title="Chat with Prime Plus Team on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden md:inline">WhatsApp Us</span>
            </button>

            <button
              onClick={() => onOpenInquiry()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get Free Quote</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onToggleCurrency}
              className="px-2 py-1 text-xs rounded-lg bg-slate-800 text-amber-300 border border-amber-500/30 font-bold"
            >
              {currency}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-2 pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2">
              Our 3 Core Disciplines:
            </div>
            <button
              onClick={() => handleNavClick('service-graphic-design')}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 text-left text-pink-300 font-semibold"
            >
              <Palette className="w-5 h-5 text-pink-400" />
              <div>
                <div>Graphic & Brand Designing</div>
                <div className="text-[11px] text-slate-400 font-normal">Logos, UI/UX, Packaging, Social Media</div>
              </div>
            </button>

            <button
              onClick={() => handleNavClick('service-web-development')}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 text-left text-sky-300 font-semibold"
            >
              <Code2 className="w-5 h-5 text-sky-400" />
              <div>
                <div>Web & Full-Stack Development</div>
                <div className="text-[11px] text-slate-400 font-normal">React, Next.js, Node, E-Commerce</div>
              </div>
            </button>

            <button
              onClick={() => handleNavClick('service-digital-marketing')}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 text-left text-amber-300 font-semibold"
            >
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <div>
                <div>Digital Marketing & Growth</div>
                <div className="text-[11px] text-slate-400 font-normal">Meta Ads, Google Ads, SEO, SMM</div>
              </div>
            </button>
          </div>

          <div className="border-t border-slate-800 pt-3 flex flex-col gap-2 font-medium text-slate-200">
            <button
              onClick={() => handleNavClick('case-studies')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-800"
            >
              Case Studies & Portfolio
            </button>
            <button
              onClick={() => handleNavClick('cost-estimator')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-800 text-sky-400 font-bold flex items-center justify-between"
            >
              <span>Interactive Cost Estimator</span>
              <Calculator className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleNavClick('pricing-packages')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-800"
            >
              Pricing & Packages
            </button>
            <button
              onClick={() => handleNavClick('process-flow')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-800"
            >
              Work Process
            </button>
            <button
              onClick={() => handleNavClick('team-about')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-800"
            >
              Team & About
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={openWhatsApp}
              className="w-full py-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Chat</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>Request Project Proposal</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
