import React from 'react';
import {
  Compass,
  Layers,
  Code2,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MessageSquare
} from 'lucide-react';

export const WorkProcess: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Strategic Discovery & Blueprint',
      titleUrdu: 'اسٹریٹجک ریسرچ اور جامع منصوبہ بندی',
      desc: 'We map out your business objectives, target audience demographics, competitive landscape, and define the exact scope matrix and key performance metrics.',
      icon: Compass,
      accent: 'border-sky-500/40 text-sky-400 bg-sky-500/10',
      guarantee: 'Detailed Scope Document & Deliverable Timeline'
    },
    {
      num: '02',
      title: 'Creative Prototyping & System Design',
      titleUrdu: 'پروٹوٹائپنگ اور ویژول ڈیزائن سسٹم',
      desc: 'For design: moodboards and vector concepts. For web: Figma component libraries and database schemas. For marketing: audience personas, tracking pixels, and hook angles.',
      icon: Layers,
      accent: 'border-pink-500/40 text-pink-400 bg-pink-500/10',
      guarantee: 'Interactive Clickable Prototype & Asset Previews'
    },
    {
      num: '03',
      title: 'High-Velocity Agile Execution',
      titleUrdu: 'ایڈوانس ڈویلپمنٹ اور پروڈکشن',
      desc: 'Our senior specialists code the application in TypeScript/React/Next.js, craft print-ready vector files, and build Meta/Google ad campaigns with Conversions API tracking.',
      icon: Code2,
      accent: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10',
      guarantee: 'Weekly Sprint Reviews & Direct WhatsApp Group'
    },
    {
      num: '04',
      title: 'Rigorous QA & High-Conversion Launch',
      titleUrdu: 'کوالٹی ٹیسٹنگ، اسپیڈ اور کامیاب لانچ',
      desc: 'Cross-browser compatibility testing, 100/100 Core Web Vitals audit, security verification, and controlled ad rollouts backed by comprehensive warranty.',
      icon: Rocket,
      accent: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
      guarantee: '30-90 Days Post-Launch Warranty & Support'
    }
  ];

  return (
    <section id="process-flow" className="py-16 sm:py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
            <Clock className="w-3.5 h-3.5" />
            <span>HOW WE OPERATE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            The Prime Plus 4-Step Execution System
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Eliminating guesswork with transparent milestones, daily communication, and engineering rigor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-6 shadow-xl relative"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black font-mono text-slate-600">
                      {s.num}
                    </span>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${s.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
                      {s.title}
                    </h3>
                    <div className="text-xs text-slate-400 font-sans mt-0.5">
                      {s.titleUrdu}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-start gap-2 text-[11px] text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{s.guarantee}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Accountability Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold text-white font-['Outfit',sans-serif] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Direct Senior Access — No Account Manager Middlemen</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              When you hire Prime Plus Team, you communicate directly with the lead designer, lead developer, and marketing strategist building your project.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2 rounded-xl bg-slate-800 text-indigo-300 font-mono text-xs font-bold border border-slate-700">
              Dedicated Slack / WhatsApp Channel
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
