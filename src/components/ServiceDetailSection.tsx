import React, { useState } from 'react';
import {
  Palette,
  Code2,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
  Layers,
  Wrench,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { ServiceDetail, SubService } from '../types/agency';
import { SERVICES_DATA } from '../data/agencyData';

interface ServiceDetailSectionProps {
  activeServiceId: string;
  onChangeActiveService: (id: string) => void;
  onOpenSubServiceModal: (subService: SubService, parentService: ServiceDetail) => void;
  onOpenInquiry: (serviceName: string) => void;
}

export const ServiceDetailSection: React.FC<ServiceDetailSectionProps> = ({
  activeServiceId,
  onChangeActiveService,
  onOpenSubServiceModal,
  onOpenInquiry,
}) => {
  const activeService = SERVICES_DATA.find((s) => s.id === activeServiceId) || SERVICES_DATA[0];

  return (
    <section id="services-breakdown" className="py-16 sm:py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
            <Layers className="w-3.5 h-3.5" />
            <span>FULL AGENCY SCOPE & DEEP DIVES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            Every Detail of Our 3 Core Disciplines
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            No vague promises. Explore our exhaustive sub-services, exact deliverable formats, industry-standard toolchains, and delivery methodologies.
          </p>
        </div>

        {/* 3 Main Service Discipline Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {SERVICES_DATA.map((service) => {
            const isSelected = service.id === activeService.id;
            return (
              <button
                key={service.id}
                id={`tab-${service.id}`}
                onClick={() => onChangeActiveService(service.id)}
                className={`px-5 py-3.5 rounded-2xl transition-all cursor-pointer flex items-center gap-3 text-sm font-bold border ${
                  isSelected
                    ? `${service.themeColor.bg} ${service.themeColor.border} text-white shadow-xl ${service.themeColor.glow} scale-[1.03]`
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {service.id === 'graphic-design' && <Palette className={`w-5 h-5 ${isSelected ? 'text-pink-400' : 'text-slate-500'}`} />}
                {service.id === 'web-development' && <Code2 className={`w-5 h-5 ${isSelected ? 'text-sky-400' : 'text-slate-500'}`} />}
                {service.id === 'digital-marketing' && <TrendingUp className={`w-5 h-5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />}

                <div className="text-left">
                  <div className="leading-tight">{service.title}</div>
                  <div className="text-[11px] font-normal text-slate-400 font-sans">{service.titleUrdu}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Discipline Master Card */}
        <div className={`p-6 sm:p-10 rounded-3xl bg-slate-900/90 border ${activeService.themeColor.border} backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-10`}>
          {/* Service Headline Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800/90">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${activeService.themeColor.bg} ${activeService.themeColor.text} border ${activeService.themeColor.border}`}>
                  {activeService.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {activeService.subServices.length} Specialized Sub-Domains
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-['Outfit',sans-serif]">
                {activeService.title}
              </h3>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                {activeService.tagline}
              </p>
              <p className="text-sm text-slate-400 leading-relaxed pt-1">
                {activeService.heroPitch}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
              <button
                onClick={() => onOpenInquiry(activeService.title)}
                className={`px-5 py-3.5 rounded-2xl bg-gradient-to-r ${activeService.themeColor.primary} text-white font-bold text-sm shadow-lg transition-transform hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2`}
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Quality Assurance</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Full copyright transfer & comprehensive warranty included.
                </p>
              </div>
            </div>
          </div>

          {/* Key Deliverable Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {activeService.keyHighlights.map((hl, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/40 flex items-start gap-2.5 text-xs sm:text-sm text-slate-200"
              >
                <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${activeService.themeColor.text}`} />
                <span>{hl}</span>
              </div>
            ))}
          </div>

          {/* Sub-Services Grid (Har Detail) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 font-['Outfit',sans-serif]">
                <Layers className={`w-5 h-5 ${activeService.themeColor.text}`} />
                <span>Specialized Modules & Deliverable Checklists</span>
              </h4>
              <span className="text-xs text-slate-400">
                Click any module for complete details
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {activeService.subServices.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => onOpenSubServiceModal(sub, activeService)}
                  className="p-5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>Est: {sub.estimatedTimeline}</span>
                      </span>
                      <span className={`text-xs font-bold ${activeService.themeColor.text} group-hover:translate-x-1 transition-transform flex items-center`}>
                        Details <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>

                    <div>
                      <h5 className="font-bold text-white text-base group-hover:text-slate-100">
                        {sub.title}
                      </h5>
                      <div className="text-xs text-slate-400 font-sans mt-0.5">
                        {sub.titleUrdu}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {sub.shortDesc}
                    </p>

                    {/* Preview Deliverables */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-700/60">
                      <div className="text-[11px] uppercase font-bold text-slate-400 font-mono">
                        Key Deliverables:
                      </div>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {sub.deliverables.slice(0, 3).map((del, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-1.5 line-clamp-1">
                            <span className={activeService.themeColor.text}>•</span>
                            <span className="truncate">{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tools Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {sub.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900/90 text-slate-400 border border-slate-700/80"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Software & Toolstack */}
          <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold font-['Outfit',sans-serif]">
              <Wrench className="w-5 h-5 text-indigo-400" />
              <span>Standard Production Toolchains & Technologies</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {activeService.industryTools.map((tool, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between"
                >
                  <div className="font-bold text-white text-xs">
                    {tool.name}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {tool.category}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5-Step Process Timeline */}
          <div className="space-y-4">
            <h4 className="text-lg sm:text-xl font-bold text-white font-['Outfit',sans-serif] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Step-by-Step Delivery Process for {activeService.title}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {activeService.processSteps.map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xl font-black font-mono ${activeService.themeColor.text}`}>
                      {step.step}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                      {step.duration}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      {step.title}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="space-y-4 pt-4 border-t border-slate-800/80">
            <h4 className="text-base sm:text-lg font-bold text-white font-['Outfit',sans-serif] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-sky-400" />
              <span>Frequently Asked Questions regarding {activeService.title}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeService.faqs.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-2 text-xs"
                >
                  <div className="font-bold text-slate-100">
                    Q: {faq.q}
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
