import React from 'react';
import { X, CheckCircle2, Clock, Wrench, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { SubService, ServiceDetail } from '../types/agency';
import { AGENCY_INFO } from '../data/agencyData';

interface ServiceModalProps {
  subService: SubService | null;
  parentService: ServiceDetail | null;
  onClose: () => void;
  onInquire: (serviceName: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  subService,
  parentService,
  onClose,
  onInquire,
}) => {
  if (!subService || !parentService) return null;

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Prime Plus Team! I am interested in your service: "${subService.title}" (${parentService.title}). Could you please share more details and availability?`
    );
    window.open(`https://wa.me/${AGENCY_INFO.contacts.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-left">
        {/* Header */}
        <div className={`p-6 bg-gradient-to-r ${parentService.themeColor.primary} text-white flex items-start justify-between`}>
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider opacity-90">
              {parentService.title} • Sub-Service Breakdown
            </div>
            <h3 className="text-xl sm:text-2xl font-black mt-1 font-['Outfit',sans-serif]">
              {subService.title}
            </h3>
            <p className="text-sm opacity-95 font-sans mt-0.5">
              {subService.titleUrdu}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Timeline & Category Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Standard Turnaround: {subService.estimatedTimeline}</span>
            </span>
            <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              100% Guaranteed Satisfaction
            </span>
          </div>

          {/* Exhaustive Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              In-Depth Architectural Scope:
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed">
              {subService.fullDesc}
            </p>
          </div>

          {/* Full Deliverables Checklist */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Verified Deliverables You Will Receive:</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
              {subService.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Production Toolchain */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-sky-400" />
              <span>Standard Industry Software & Tech Used:</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {subService.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-xs font-mono font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={openWhatsApp}
            className="px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 text-xs font-bold transition-colors cursor-pointer flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Discuss on WhatsApp</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onInquire(`${parentService.title} - ${subService.title}`);
              }}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Get Scope Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
