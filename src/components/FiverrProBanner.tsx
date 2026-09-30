import React from 'react';
import { Sparkles, ShieldCheck, Users, Briefcase, ArrowRight } from 'lucide-react';

interface FiverrProBannerProps {
  onOpenCustomBrief: () => void;
}

export const FiverrProBanner: React.FC<FiverrProBannerProps> = ({ onOpenCustomBrief }) => {
  return (
    <section id="prime-pro-section" className="py-14 sm:py-20 bg-slate-950 text-white text-left relative overflow-hidden border-b border-slate-800">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pro Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/40 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-extrabold uppercase tracking-widest">
                FIGER FREE PRO
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit',sans-serif] tracking-tight leading-tight">
              The top 1% talent.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-yellow-400">
                Delivered.
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              An enterprise-grade curated marketplace for high-growth businesses. Hand-vetted talent, enterprise NDA security, and dedicated project management.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <ShieldCheck className="w-5 h-5 text-yellow-400" />
                <h4 className="text-xs font-bold text-white uppercase font-mono">Top 1% Vetted</h4>
                <p className="text-[11px] text-slate-400">Only proven senior freelancers with verifiable portfolios.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <Users className="w-5 h-5 text-red-500" />
                <h4 className="text-xs font-bold text-white uppercase font-mono">Dedicated PM</h4>
                <p className="text-[11px] text-slate-400">Personal project manager managing your deliverables.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <Briefcase className="w-5 h-5 text-amber-400" />
                <h4 className="text-xs font-bold text-white uppercase font-mono">Custom Invoicing</h4>
                <p className="text-[11px] text-slate-400">Tax compliant PKR invoices with corporate bank deposit.</p>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenCustomBrief}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Hire a Pro Team</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-xs text-slate-400 font-mono">
                No subscription fee • Transparent milestone escrow
              </span>
            </div>

          </div>

          <div className="lg:col-span-5">
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400">ENTERPRISE CLIENT BRIEF</span>
                <span className="text-xs font-bold text-yellow-400">Fast Response &lt; 2h</span>
              </div>

              <p className="text-xs text-slate-300">
                Have a large website, custom web application, or full-scale brand relaunch? Let our Pro team match you directly with senior engineers and designers.
              </p>

              <button
                onClick={onOpenCustomBrief}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-yellow-400 font-bold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Submit Enterprise Brief</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
