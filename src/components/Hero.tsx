import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Palette,
  Code2,
  TrendingUp,
  ShieldCheck,
  Zap,
  CheckCircle2,
  MessageCircle,
  Calculator,
  Laptop,
  Flame
} from 'lucide-react';
import { AGENCY_INFO, SERVICES_DATA } from '../data/agencyData';

interface HeroProps {
  onExploreServices: () => void;
  onOpenInquiry: (initialService?: string) => void;
  onOpenEstimator: () => void;
  onSelectServiceTab: (serviceId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreServices,
  onOpenInquiry,
  onOpenEstimator,
  onSelectServiceTab,
}) => {
  const [activeHeroPill, setActiveHeroPill] = useState<'all' | 'graphic-design' | 'web-development' | 'digital-marketing'>('all');

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Prime Plus Team! I would like to consult about our upcoming project for Graphic Design / Web Development / Digital Marketing.'
    );
    window.open(`https://wa.me/${AGENCY_INFO.contacts.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <section id="hero" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full max-w-5xl h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Top Badges & Urdu Subtitle */}
        <div className="flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-mono shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold tracking-wide">PRIME PLUS TEAM • FULL-SERVICE DIGITAL POWERHOUSE</span>
          </div>

          <div className="text-slate-400 text-sm font-medium tracking-wide">
            <span className="text-slate-300 font-semibold">پرائم پلس ٹیم:</span> برانڈ گرافک ڈیزائننگ، جدید ویب ڈویلپمنٹ اور ہائی آر او آئی ڈیجیٹل مارکیٹنگ
          </div>
        </div>

        {/* Hero Main Headline */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] font-['Outfit',sans-serif]">
            We Design Brands, Code <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent">Fast Web Apps</span> & Scale <span className="bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">Revenue</span>.
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            {AGENCY_INFO.shortBio}
          </p>
        </div>

        {/* 3 Pillars Interactive Tab Switcher in Hero */}
        <div className="max-w-3xl mx-auto bg-slate-900/90 border border-slate-800 p-2 rounded-2xl sm:rounded-3xl backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold">
            <button
              onClick={() => {
                setActiveHeroPill('graphic-design');
                onSelectServiceTab('graphic-design');
              }}
              className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-2 ${
                activeHeroPill === 'graphic-design'
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-600/30 font-bold scale-[1.02]'
                  : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-pink-300" />
              <span>Graphic Design</span>
            </button>

            <button
              onClick={() => {
                setActiveHeroPill('web-development');
                onSelectServiceTab('web-development');
              }}
              className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-2 ${
                activeHeroPill === 'web-development'
                  ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg shadow-sky-600/30 font-bold scale-[1.02]'
                  : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-sky-300" />
              <span>Web Development</span>
            </button>

            <button
              onClick={() => {
                setActiveHeroPill('digital-marketing');
                onSelectServiceTab('digital-marketing');
              }}
              className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-2 ${
                activeHeroPill === 'digital-marketing'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30 font-bold scale-[1.02]'
                  : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
              <span>Digital Marketing</span>
            </button>
          </div>

          {/* Quick Preview snippet based on selected pill */}
          <div className="mt-3 pt-3 border-t border-slate-800 text-left px-2 sm:px-3 text-xs sm:text-sm">
            {activeHeroPill === 'graphic-design' && (
              <div className="flex flex-wrap items-center justify-between gap-2 text-slate-300">
                <div className="flex items-center gap-2 font-mono text-pink-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Logos, Vector Brand Guides, UI/UX in Figma, Packaging & 3D Renders</span>
                </div>
                <button
                  onClick={() => onSelectServiceTab('graphic-design')}
                  className="text-xs text-pink-400 hover:underline font-bold flex items-center gap-1"
                >
                  View All Design Deliverables <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}

            {activeHeroPill === 'web-development' && (
              <div className="flex flex-wrap items-center justify-between gap-2 text-slate-300">
                <div className="flex items-center gap-2 font-mono text-sky-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>React 19, Next.js, Node.js, Custom SaaS, Shopify & 100/100 Lighthouse</span>
                </div>
                <button
                  onClick={() => onSelectServiceTab('web-development')}
                  className="text-xs text-sky-400 hover:underline font-bold flex items-center gap-1"
                >
                  View Engineering Specs <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}

            {activeHeroPill === 'digital-marketing' && (
              <div className="flex flex-wrap items-center justify-between gap-2 text-slate-300">
                <div className="flex items-center gap-2 font-mono text-amber-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Meta Ads CAPI, Google Ads PMax, Technical SEO & Klaviyo Funnels</span>
                </div>
                <button
                  onClick={() => onSelectServiceTab('digital-marketing')}
                  className="text-xs text-amber-400 hover:underline font-bold flex items-center gap-1"
                >
                  View Marketing Strategy <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}

            {activeHeroPill === 'all' && (
              <div className="flex flex-wrap items-center justify-between gap-2 text-slate-400 text-xs">
                <span>Select any discipline above to preview specific tool stacks and core deliverables.</span>
                <span className="text-indigo-400 font-mono">100% In-House Senior Execution</span>
              </div>
            )}
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
          <button
            onClick={() => onOpenInquiry()}
            className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white font-extrabold text-base shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all cursor-pointer flex items-center gap-2.5 scale-100 hover:scale-[1.02]"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenEstimator}
            className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-bold text-base transition-all cursor-pointer flex items-center gap-2.5"
          >
            <Calculator className="w-5 h-5 text-sky-400" />
            <span>Interactive Cost Calculator</span>
          </button>

          <button
            onClick={openWhatsApp}
            className="px-5 py-3.5 sm:py-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-base transition-all cursor-pointer flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>

        {/* Trust Badges & Verified Stats Row */}
        <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {AGENCY_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-left transition-all hover:border-slate-700"
            >
              <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit',sans-serif] tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
