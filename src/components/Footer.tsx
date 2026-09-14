import React from 'react';
import {
  Sparkles,
  MessageCircle,
  Mail,
  Phone,
  ArrowUp,
  Palette,
  Code2,
  TrendingUp,
  Heart
} from 'lucide-react';
import { AGENCY_INFO, SERVICES_DATA } from '../data/agencyData';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onSelectService: (serviceId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo, onSelectService }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent('Hello Prime Plus Team! I would like to inquire about your digital agency services.');
    window.open(`https://wa.me/${AGENCY_INFO.contacts.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-left pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-sky-500 to-amber-300 p-[1.5px]">
                <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center font-black text-white text-lg font-['Outfit',sans-serif]">
                  P+
                </div>
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white font-['Outfit',sans-serif]">
                  PRIME PLUS TEAM
                </span>
                <p className="text-[11px] text-indigo-400 font-mono">
                  Graphic Design • Web Development • Digital Marketing
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Prime Plus Team is an elite multidisciplinary digital agency. We construct bold brand identities, engineer resilient web applications, and scale customer acquisition through data-backed performance marketing.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={openWhatsApp}
                className="px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Hotline</span>
              </button>

              <button
                onClick={() => onScrollTo('contact-inquiry')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Send Request
              </button>
            </div>
          </div>

          {/* Graphic Design Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-pink-400 font-bold text-xs uppercase font-mono tracking-wider">
              <Palette className="w-3.5 h-3.5" />
              <span>Graphic Design</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onSelectService('graphic-design')}
                  className="hover:text-slate-200 transition-colors text-left"
                >
                  Brand Identity & Logos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('graphic-design')}
                  className="hover:text-slate-200 transition-colors text-left"
                >
                  UI/UX Systems in Figma
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('graphic-design')}
                  className="hover:text-slate-200 transition-colors text-left"
                >
                  Social Media Creatives
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('graphic-design')}
                  className="hover:text-slate-200 transition-colors text-left"
                >
                  Product Packaging & 3D
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('graphic-design')}
                  className="hover:text-slate-200 transition-colors text-left"
                >
                  Motion Graphics & Lottie
                </button>
              </li>
            </ul>
          </div>

          {/* Web Development Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-sky-400 font-bold text-xs uppercase font-mono tracking-wider">
              <Code2 className="w-3.5 h-3.5" />
              <span>Web Development</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onSelectService('web-development')}
                  className="hover:text-slate-200 transition-colors text-left"
                >
                  React 19 & Next.js Portals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('web-development')}
                  className="hover:text-slate-200 transition-colors text-left"
                >
                  Shopify & E-Commerce Stores
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('web-development')}
                  className="hover:text-slate-200 transition-colors text-left"
                >
                  Corporate CMS Websites
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('web-development')}
                  className="hover:text-slate-200 transition-colors text-left"
                >
                  REST APIs & Node Backends
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('web-development')}
                  className="hover:text-slate-200 transition-colors text-left"
                >
                  Core Web Vitals & Speed Tuning
                </button>
              </li>
            </ul>
          </div>

          {/* Digital Marketing Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase font-mono tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Digital Marketing</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onSelectService('digital-marketing')}
                  className="hover:text-slate-200 transition-colors text-left"
                >
                  Meta Ads (FB & IG) CAPI
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('digital-marketing')}
                  className="hover:text-slate-200 transition-colors text-left"
                >
                  Google Ads (PMax & Search)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('digital-marketing')}
                  className="hover:text-slate-200 transition-colors text-left"
                >
                  Technical & Local SEO
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('digital-marketing')}
                  className="hover:text-slate-200 transition-colors text-left"
                >
                  Social Media Management (SMM)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectService('digital-marketing')}
                  className="hover:text-slate-200 transition-colors text-left"
                >
                  Klaviyo Email Automation
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span>© {new Date().getFullYear()} Prime Plus Team. All Rights Reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline font-mono text-slate-500">
              Crafted with Precision for Global Growth
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onScrollTo('cost-estimator')}
              className="hover:text-slate-200 text-sky-400 font-mono"
            >
              Calculator
            </button>
            <button
              onClick={() => onScrollTo('case-studies')}
              className="hover:text-slate-200"
            >
              Portfolio
            </button>
            <button
              onClick={() => onScrollTo('pricing-packages')}
              className="hover:text-slate-200"
            >
              Pricing
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer flex items-center gap-1 font-mono text-[11px]"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
