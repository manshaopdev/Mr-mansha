import React from 'react';
import { Users, Award, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { TEAM_MEMBERS, AGENCY_INFO } from '../data/agencyData';

interface TeamSectionProps {
  onOpenInquiry: () => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onOpenInquiry }) => {
  return (
    <section id="team-about" className="py-16 sm:py-24 border-t border-slate-800/80 bg-slate-950/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono">
            <Users className="w-3.5 h-3.5" />
            <span>THE MINDS BEHIND PRIME PLUS TEAM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            Senior Specialists in Design, Code & Growth
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            We don't outsource to anonymous freelancers. Your project is architected and executed directly by experienced department leads.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 text-left shadow-lg group"
            >
              <div className="space-y-4">
                {/* Avatar with gradient ring */}
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-indigo-500/40 group-hover:border-indigo-400 transition-colors shadow-md">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
                    {member.name}
                  </h3>
                  <div className="text-xs font-semibold text-indigo-400 font-mono">
                    {member.role}
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                    {member.roleUrdu}
                  </div>
                  <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {member.experience}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {member.bio}
                </p>

                {/* Specialties */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <div className="text-[10px] font-mono uppercase font-bold text-slate-400">
                    Core Specialties:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {member.specialties.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-850 bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Agency Culture & Principles */}
        <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="space-y-2">
            <h4 className="text-base font-bold text-white font-['Outfit',sans-serif] flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Pixel-Level Pride</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We treat every logo curve, CSS animation frame, and ad headline as a testament to our craftsmanship. Good enough is never good enough.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-base font-bold text-white font-['Outfit',sans-serif] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Full Code & Asset Ownership</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              You receive master GitHub repositories, Figma source files, vector SVGs, and admin credentials upon delivery. You are never locked in.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-base font-bold text-white font-['Outfit',sans-serif] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Revenue-First Mindset</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pretty designs and clean code mean nothing if they do not convert. Every line of code and marketing dollar is deployed to maximize your business bottom line.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
