import React from 'react';
import {
  ShieldCheck,
  MessageCircle,
  Clock,
  Code2,
  FileCode,
  Lock,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Users
} from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

interface ClientHandlingGuaranteesProps {
  onOpenPortal: () => void;
  onOpenInquiry: () => void;
}

export const ClientHandlingGuarantees: React.FC<ClientHandlingGuaranteesProps> = ({
  onOpenPortal,
  onOpenInquiry
}) => {
  const pillars = [
    {
      icon: MessageCircle,
      title: 'Direct WhatsApp Line with Senior Leads',
      color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
      tagline: 'No Account Managers Playing Telephone',
      description: 'You get direct daily communication with your Lead Full-Stack Architect, Creative Director, and Ad Strategist on WhatsApp (+92 332 6032893). Instant feedback and real-time sprint updates.',
    },
    {
      icon: FileCode,
      title: '100% IP & Source Code Ownership',
      color: 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10',
      tagline: 'Full Commercial Copyright Transfer',
      description: 'You own every single vector file (AI, EPS, SVG), Figma file, and clean TypeScript codebase. No lock-in, no hidden proprietary licenses. All assets are transferred to your repository upon completion.',
    },
    {
      icon: Zap,
      title: 'Live Staging Builds & Interactive Previews',
      color: 'border-red-500/30 text-red-400 bg-red-500/10',
      tagline: 'Test Before You Approve',
      description: 'We deploy web projects on secure staging servers for cross-device mobile testing. Design mockups are provided as clickable Figma prototypes, and marketing campaigns include full creative mockups.',
    },
    {
      icon: Lock,
      title: 'Confidentiality & Mutual NDA Protection',
      color: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
      tagline: 'Your Proprietary Data Stays Safe',
      description: 'We execute strict Non-Disclosure Agreements prior to onboarding. Your business model, target customer lists, ad conversion data, and brand strategy remain 100% confidential.',
    },
    {
      icon: Clock,
      title: 'Escrow & Milestone-Based Clearances',
      color: 'border-yellow-400/30 text-yellow-300 bg-yellow-400/10',
      tagline: 'Transparent 50/50 Staged Billing',
      description: 'Work is divided into clear milestones. Project payments are staged based on verified deliverables, so you only release final funds when you are 100% satisfied with the work.',
    },
    {
      icon: Headphones,
      title: '30 to 90 Days Post-Launch Warranty',
      color: 'border-red-600/30 text-red-400 bg-red-600/10',
      tagline: 'Ongoing Reliability & Bug Fixes',
      description: 'We stand firmly behind our code and designs. All web builds include free bug fixing, speed monitoring, and technical support post-launch, plus ad campaign optimization assistance.',
    },
  ];

  return (
    <section id="client-handling" className="py-16 sm:py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-yellow-400 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CLIENT ASSURANCE & PROTOCOLS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            How Prime Plus Team Handles Every Client
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            We reject the chaotic agency standard of ghosting, delays, and poor communication. Here is our exact client management framework designed for reliability and confidence.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-yellow-500/40 transition-all duration-300 flex flex-col justify-between space-y-4 text-left group hover:shadow-[0_0_20px_rgba(234,179,8,0.12)]"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                      {item.tagline}
                    </span>
                    <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif] mt-0.5 group-hover:text-yellow-400 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Guaranteed Protocol</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Banner: Client Portal & New Ticket */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-red-950/50 to-slate-900 border border-yellow-500/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
                Active Project Tracking Available 24/7
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-['Outfit',sans-serif]">
              Already Working With Us? Track Your Project Live
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Use your Project Ticket ID to check sprint milestones, preview staging URLs, download approved vector packages, or submit direct revision notes to your lead architect.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={onOpenPortal}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs font-mono shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Launch Client Portal</span>
            </button>

            <button
              onClick={onOpenInquiry}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs font-mono transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Start New Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
