import React from 'react';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/agencyData';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>CLIENT EXPERIENCES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            Endorsed by Fast-Growing Brands
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            See what founders, directors, and operators say about partnering with Prime Plus Team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-6 text-left shadow-xl"
            >
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{t.review}"
                </p>

                {/* Project Impact Pill */}
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-indigo-300 font-mono font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Impact: {t.projectImpact}</span>
                </div>
              </div>

              {/* Client Profile */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <img
                  src={t.avatar}
                  alt={t.clientName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/40"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">
                    {t.clientName}
                  </h4>
                  <div className="text-xs text-slate-400">
                    {t.role}, {t.company}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {t.country} • {t.serviceCategory}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
