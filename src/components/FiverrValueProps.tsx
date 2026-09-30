import React from 'react';
import { CheckCircle2, ShieldCheck, Zap, Headphones, Sparkles, Award } from 'lucide-react';

export const FiverrValueProps: React.FC = () => {
  const valueProps = [
    {
      title: 'Over 700 categories',
      desc: 'Get any digital task done from responsive web code and logos to Meta ad campaigns and AI systems.',
      icon: Award,
    },
    {
      title: 'Clear, upfront pricing',
      desc: 'No hourly surprises or hidden platform markups. Transparent PKR pricing with defined milestones.',
      icon: Zap,
    },
    {
      title: 'Quality work done quickly',
      desc: 'Filter by 24h express turnaround and connect with verified experts ready to start immediately.',
      icon: CheckCircle2,
    },
    {
      title: 'Protected payments, every time',
      desc: 'Funds are held securely in escrow until you approve and verify the final source deliverables.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-gray-200 text-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: 4 Core Pillars */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-emerald-600">
                Why Figer Free
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit',sans-serif] leading-tight">
                A whole world of freelance talent at your fingertips
              </h2>
            </div>

            <div className="space-y-6">
              {valueProps.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5 border border-red-100">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Video / Showcase Mockup */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                alt="Figer Free Talent"
                className="w-full h-[400px] object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Floating Customer Quote Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/20 shadow-xl space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-yellow-500 font-bold">
                  <span>★★★★★</span>
                  <span className="text-slate-800 font-mono text-[11px] font-normal">• Verified Project Review</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 font-medium italic">
                  "Figer Free transformed our e-commerce platform in less than 2 weeks. Top-rated talent with crystal-clear PKR pricing."
                </p>
                <div className="text-[11px] text-gray-500 font-bold">
                  — Tariq Jamil, Founder @ Apex Retail
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
