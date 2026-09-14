import React, { useState } from 'react';
import {
  Briefcase,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  X,
  Palette,
  Code2,
  TrendingUp,
  MessageCircle
} from 'lucide-react';
import { CaseStudy } from '../types/agency';
import { CASE_STUDIES, AGENCY_INFO } from '../data/agencyData';

interface CaseStudiesProps {
  onOpenInquiry: (initialService?: string) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenInquiry }) => {
  const [filter, setFilter] = useState<'all' | 'graphic-design' | 'web-development' | 'digital-marketing'>('all');
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudy | null>(null);

  const filteredStudies = filter === 'all'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((c) => c.category === filter);

  const openWhatsApp = (studyTitle: string) => {
    const text = encodeURIComponent(
      `Hello Prime Plus Team! I reviewed your case study on "${studyTitle}" and would love to achieve similar results for my brand.`
    );
    window.open(`https://wa.me/${AGENCY_INFO.contacts.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <section id="case-studies" className="py-16 sm:py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono">
            <Briefcase className="w-3.5 h-3.5" />
            <span>PROVEN TRACK RECORD & RESULTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            Featured Client Case Studies
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Explore how Prime Plus Team combines graphic mastery, modern web code, and ruthless marketing execution to produce measurable commercial growth.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-slate-950 shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All Projects ({CASE_STUDIES.length})
            </button>
            <button
              onClick={() => setFilter('graphic-design')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                filter === 'graphic-design'
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Graphic Design</span>
            </button>
            <button
              onClick={() => setFilter('web-development')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                filter === 'web-development'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Web Development</span>
            </button>
            <button
              onClick={() => setFilter('digital-marketing')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                filter === 'digital-marketing'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Digital Marketing</span>
            </button>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group"
            >
              {/* Category Ribbon */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
                    {study.categoryLabel}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {study.year} • {study.client}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors font-['Outfit',sans-serif]">
                  {study.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {study.summary}
                </p>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {study.results.map((res, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center"
                    >
                      <div className="text-lg sm:text-xl font-black text-white font-mono">
                        {res.metric}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 leading-tight mt-0.5">
                        {res.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Deliverables Preview */}
                <div className="space-y-1 pt-2">
                  <div className="text-[11px] font-mono uppercase font-bold text-slate-400">
                    Delivered Assets:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {study.deliverables.map((del, dIdx) => (
                      <span
                        key={dIdx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        ✓ {del}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div className="flex flex-wrap gap-1.5">
                  {study.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setActiveModalStudy(study)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                >
                  <span>Full Story</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {activeModalStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-left">
            <div className="p-6 bg-slate-800 border-b border-slate-700 flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-indigo-400 font-bold uppercase">
                  {activeModalStudy.categoryLabel} • Case Breakdown
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1 font-['Outfit',sans-serif]">
                  {activeModalStudy.title}
                </h3>
                <p className="text-xs text-slate-400">
                  Client: {activeModalStudy.client} ({activeModalStudy.year})
                </p>
              </div>
              <button
                onClick={() => setActiveModalStudy(null)}
                className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto text-xs sm:text-sm text-slate-200">
              {/* Challenge */}
              <div className="space-y-1.5 p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30">
                <div className="text-xs font-bold font-mono text-rose-400 uppercase">
                  The Client's Core Challenge:
                </div>
                <p className="leading-relaxed">
                  {activeModalStudy.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="space-y-1.5 p-4 rounded-2xl bg-sky-950/20 border border-sky-500/30">
                <div className="text-xs font-bold font-mono text-sky-400 uppercase">
                  Prime Plus Team Strategic Solution:
                </div>
                <p className="leading-relaxed">
                  {activeModalStudy.solution}
                </p>
              </div>

              {/* Verified Metrics */}
              <div className="space-y-2">
                <div className="text-xs font-bold font-mono text-slate-400 uppercase">
                  Verified Commercial Impact:
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {activeModalStudy.results.map((res, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-center"
                    >
                      <div className="text-xl font-black text-white font-mono">
                        {res.metric}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {res.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div className="space-y-2">
                <div className="text-xs font-bold font-mono text-slate-400 uppercase">
                  Delivered Intellectual Property:
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeModalStudy.deliverables.map((d, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-xs"
                    >
                      ✓ {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 bg-slate-850 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => openWhatsApp(activeModalStudy.title)}
                className="px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ask about this case on WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  const title = activeModalStudy.title;
                  setActiveModalStudy(null);
                  onOpenInquiry(title);
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer"
              >
                Replicate Similar Results For My Brand
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
