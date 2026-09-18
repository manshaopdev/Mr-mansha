import React, { useState } from 'react';
import {
  X,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  MessageCircle,
  Download,
  FileText,
  DollarSign,
  ShieldCheck,
  Send,
  Sparkles,
  Layers,
  Code2,
  Palette,
  TrendingUp,
  UserCheck,
  Calendar
} from 'lucide-react';
import { ClientProject, Currency } from '../types/agency';
import { AGENCY_INFO } from '../data/agencyData';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ClientProject[];
  initialProjectId?: string;
  currency: Currency;
  onOpenInquiry?: () => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  isOpen,
  onClose,
  projects,
  initialProjectId,
  currency,
  onOpenInquiry
}) => {
  const [searchQuery, setSearchQuery] = useState(initialProjectId || (projects[0]?.id || 'PPT-2024-8841'));
  const [activeTab, setActiveTab] = useState<'milestones' | 'deliverables' | 'financials' | 'support'>('milestones');
  
  // Support Request form inside the portal
  const [revisionNote, setRevisionNote] = useState('');
  const [revisionPriority, setRevisionPriority] = useState<'Normal' | 'Urgent' | 'Critical'>('Normal');
  const [revisionSubmitted, setRevisionSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentProject = projects.find(
    (p) => p.id.toLowerCase() === searchQuery.trim().toLowerCase()
  ) || projects[0];

  const handleSendRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionNote.trim() || !currentProject) return;

    const text = encodeURIComponent(
      `*Client Portal Revision Request*\n` +
      `Project ID: ${currentProject.id}\n` +
      `Company: ${currentProject.clientCompany}\n` +
      `Priority: ${revisionPriority}\n` +
      `Note: ${revisionNote}`
    );

    window.open(`https://wa.me/${AGENCY_INFO.contacts.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
    setRevisionSubmitted(true);
    setTimeout(() => {
      setRevisionSubmitted(false);
      setRevisionNote('');
    }, 4000);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Graphic Design':
        return <Palette className="w-4 h-4 text-pink-400" />;
      case 'Web Development':
        return <Code2 className="w-4 h-4 text-sky-400" />;
      case 'Digital Marketing':
        return <TrendingUp className="w-4 h-4 text-amber-400" />;
      default:
        return <Layers className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div
      id="client-portal-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col text-left">
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-red-950/40 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-yellow-300 text-xs font-mono font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                <span>Prime Plus Client Portal</span>
              </span>
              <span className="text-emerald-400 text-xs font-mono flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Live Project Engine</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit',sans-serif]">
              Client Handling & Project Tracker
            </h2>
            <p className="text-xs text-slate-400 hidden sm:block">
              Real-time milestone transparency, deliverables access, and direct WhatsApp project coordination.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close client portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Lookup Bar & Quick Switcher */}
        <div className="p-4 sm:p-6 bg-slate-950/70 border-b border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Project Tracking ID (e.g. PPT-2024-8841)..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400 font-mono"
              />
            </div>
            <div className="text-xs text-slate-400 font-mono whitespace-nowrap">
              Active Client Tickets:
            </div>
          </div>

          {/* Quick Ticket Selector Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
            {projects.map((proj) => {
              const isSelected = currentProject?.id === proj.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => setSearchQuery(proj.id)}
                  className={`px-3 py-1.5 rounded-lg border whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 border-red-500 text-white font-bold shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                      : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span>{proj.id}</span>
                  <span className="text-[10px] opacity-75 font-sans truncate max-w-[120px]">
                    {proj.clientCompany}
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] text-emerald-400">
                    {proj.progressPercent}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {currentProject ? (
            <>
              {/* Project Snapshot Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-red-950/30 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-yellow-400 font-mono text-xs font-bold">
                        {currentProject.id}
                      </span>
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs">
                        {getCategoryIcon(currentProject.category)}
                        <span>{currentProject.category}</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-xs font-semibold">
                        Phase: {currentProject.currentPhase}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit',sans-serif]">
                      {currentProject.projectTitle}
                    </h3>
                    <div className="text-xs text-slate-400 font-mono">
                      Client: <span className="text-slate-200 font-semibold">{currentProject.clientName}</span> ({currentProject.clientCompany})
                    </div>
                  </div>

                  {/* Direct Contact Button with Project Lead */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                    <a
                      href={`https://wa.me/${AGENCY_INFO.contacts.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hello! Inquiring about Project ${currentProject.id} (${currentProject.clientCompany}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>Chat with Project Lead</span>
                    </a>
                    <span className="text-[11px] text-slate-400 font-mono hidden sm:block">
                      Lead: {currentProject.leadArchitect.name}
                    </span>
                  </div>
                </div>

                {/* Progress Bar & Status */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Total Project Completion:</span>
                    <span className="text-emerald-400 font-bold text-sm">
                      {currentProject.progressPercent}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 rounded-full transition-all duration-700"
                      style={{ width: `${currentProject.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Metadata Strip: Start, Target Launch, Staging Link */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="text-slate-400 text-[10px] uppercase">Kickoff Date</div>
                    <div className="text-slate-200 font-semibold mt-0.5">{currentProject.startDate}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="text-slate-400 text-[10px] uppercase">Target Launch</div>
                    <div className="text-slate-200 font-semibold mt-0.5 text-amber-300">{currentProject.targetLaunch}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="text-slate-400 text-[10px] uppercase">Staging / Preview</div>
                    {currentProject.stagingUrl ? (
                      <a
                        href={currentProject.stagingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-400 hover:text-sky-300 font-semibold mt-0.5 flex items-center gap-1 truncate"
                      >
                        <span>Open Staging Build</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ) : (
                      <div className="text-slate-500 mt-0.5">Staging link generating...</div>
                    )}
                  </div>
                </div>

                {/* Latest Sprint Bulletin */}
                <div className="p-3 rounded-xl bg-yellow-950/30 border border-yellow-500/20 text-xs text-yellow-200 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-yellow-300">Latest Sprint Update: </span>
                    {currentProject.recentUpdate}
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-800 gap-2 sm:gap-4 overflow-x-auto text-xs font-mono">
                <button
                  onClick={() => setActiveTab('milestones')}
                  className={`pb-3 px-2 font-bold transition-colors cursor-pointer flex items-center gap-2 border-b-2 -mb-px whitespace-nowrap ${
                    activeTab === 'milestones'
                      ? 'border-yellow-400 text-yellow-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Execution Milestones ({currentProject.milestones.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('deliverables')}
                  className={`pb-3 px-2 font-bold transition-colors cursor-pointer flex items-center gap-2 border-b-2 -mb-px whitespace-nowrap ${
                    activeTab === 'deliverables'
                      ? 'border-yellow-400 text-yellow-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Deliverables & Assets ({currentProject.deliverables.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('financials')}
                  className={`pb-3 px-2 font-bold transition-colors cursor-pointer flex items-center gap-2 border-b-2 -mb-px whitespace-nowrap ${
                    activeTab === 'financials'
                      ? 'border-yellow-400 text-yellow-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Billing & Escrow</span>
                </button>

                <button
                  onClick={() => setActiveTab('support')}
                  className={`pb-3 px-2 font-bold transition-colors cursor-pointer flex items-center gap-2 border-b-2 -mb-px whitespace-nowrap ${
                    activeTab === 'support'
                      ? 'border-yellow-400 text-yellow-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Request Revisions / Support</span>
                </button>
              </div>

              {/* Tab 1: Milestones */}
              {activeTab === 'milestones' && (
                <div className="space-y-4">
                  <div className="text-xs text-slate-400 font-mono">
                    Structured 5-Stage Client Delivery Pipeline:
                  </div>
                  <div className="space-y-3">
                    {currentProject.milestones.map((m, idx) => {
                      const isDone = m.status === 'completed';
                      const isInProgress = m.status === 'in-progress';
                      return (
                        <div
                          key={idx}
                          className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            isDone
                              ? 'bg-slate-900/60 border-slate-800'
                              : isInProgress
                              ? 'bg-red-950/20 border-yellow-500/40 shadow-[0_0_15px_rgba(234,179,8,0.1)]'
                              : 'bg-slate-950/40 border-slate-800/60 opacity-60'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              {isDone ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                              ) : isInProgress ? (
                                <Clock className="w-5 h-5 text-yellow-400 animate-spin" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-slate-600" />
                              )}
                            </div>
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs text-slate-500 font-bold">
                                  STAGE {m.step}
                                </span>
                                <h4 className="text-sm font-bold text-white">
                                  {m.title}
                                </h4>
                              </div>
                              <p className="text-xs text-slate-300">
                                {m.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 sm:self-center shrink-0 text-xs font-mono">
                            <span className="text-slate-400">{m.date}</span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                                isDone
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : isInProgress
                                  ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                                  : 'bg-slate-800 text-slate-500'
                              }`}
                            >
                              {m.status.replace('-', ' ')}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 2: Deliverables */}
              {activeTab === 'deliverables' && (
                <div className="space-y-4">
                  <div className="text-xs text-slate-400 font-mono">
                    Authorized Client Asset Repository (100% Intellectual Property Ownership):
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentProject.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-yellow-400" />
                            <span className="text-xs font-mono text-slate-400">{item.category}</span>
                          </div>
                          <div className="text-sm font-bold text-white">
                            {item.name}
                          </div>
                          <div className="text-[11px] font-mono text-slate-400">
                            Format: {item.format}
                          </div>
                        </div>

                        <div>
                          {item.status === 'ready' ? (
                            item.url ? (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/40 text-indigo-300 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                              >
                                <span>Open Link</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <button
                                onClick={() => {
                                  alert(`Prime Plus Team Client Portal: Generating authorized download package for "${item.name}". Please check your email or WhatsApp for the secure link.`);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                              >
                                <Download className="w-3 h-3" />
                                <span>Download</span>
                              </button>
                            )
                          ) : (
                            <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-500 text-xs font-mono">
                              In Production
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Financials */}
              {activeTab === 'financials' && (
                <div className="space-y-4">
                  <div className="text-xs text-slate-400 font-mono">
                    Transparent Escrow & Staged Payment Breakdown:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-xs font-mono text-slate-400">Total Contract Value</div>
                      <div className="text-xl font-black text-white mt-1 font-['Outfit',sans-serif]">
                        {currency === 'PKR'
                          ? `PKR ${currentProject.financials.totalPkr.toLocaleString()}`
                          : `$${currentProject.financials.totalUsd.toLocaleString()} USD`}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-1">
                        Invoice #{currentProject.financials.invoiceNumber}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-xs font-mono text-slate-400">Escrow / Clearance Status</div>
                      <div className="text-base font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{currentProject.financials.status}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-1">
                        Secured with verified receipt
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-xs font-mono text-slate-400">Payment Channels</div>
                      <div className="text-xs text-slate-300 mt-1 font-mono">
                        Bank Transfer, Stripe, Wise, JazzCash, EasyPaisa
                      </div>
                      <div className="text-[11px] text-yellow-400 font-mono mt-1">
                        Zero platform fees
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 font-mono space-y-2">
                    <div className="text-slate-200 font-bold flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-yellow-400" />
                      <span>Prime Plus Team Financial Guarantee</span>
                    </div>
                    <p>
                      Payments are strictly mapped to agreed milestones. Work is reviewed and approved by the client on staging before final milestone release. All vector copyright and source code is transferred upon completion.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 4: Revision & Support Desk */}
              {activeTab === 'support' && (
                <div className="space-y-4">
                  <div className="text-xs text-slate-400 font-mono">
                    Submit Revision Notes directly to Lead Engineer & Designer:
                  </div>

                  <form onSubmit={handleSendRevision} className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-slate-400 block mb-1">
                          Select Priority
                        </label>
                        <select
                          value={revisionPriority}
                          onChange={(e) => setRevisionPriority(e.target.value as any)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
                        >
                          <option value="Normal">Normal (Addressed in daily sprint)</option>
                          <option value="Urgent">Urgent (Reviewed within 4 hours)</option>
                          <option value="Critical">Critical (Immediate blocker)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-400 block mb-1">
                          Direct WhatsApp Hotline
                        </label>
                        <div className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono text-emerald-400 font-bold">
                          {AGENCY_INFO.contacts.whatsappFormatted}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-400 block mb-1">
                        Revision Request Details / Design or Code Changes
                      </label>
                      <textarea
                        rows={3}
                        value={revisionNote}
                        onChange={(e) => setRevisionNote(e.target.value)}
                        placeholder="Detail the exact change you would like (e.g., 'Change button color to hex #4f46e5', 'Revise header copy on slide 3', 'Adjust mobile padding on checkout')..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        required
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                      <p className="text-[11px] text-slate-400">
                        Transmits immediately to Prime Plus Team's dedicated WhatsApp project coordination thread.
                      </p>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send via WhatsApp (+92 332 6032893)</span>
                      </button>
                    </div>

                    {revisionSubmitted && (
                      <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Revision request dispatched to Project Lead! We are reviewing now.</span>
                      </div>
                    )}
                  </form>
                </div>
              )}
            </>
          ) : (
            <div className="p-12 text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Project Found</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                No active ticket matches "{searchQuery}". Please verify your ticket reference number or click on one of the demo tickets above.
              </p>
              {onOpenInquiry && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenInquiry();
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                >
                  Start a New Project Ticket
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <div className="text-slate-400 text-center sm:text-left">
            Prime Plus Team Client Guarantee: <span className="text-yellow-400 font-semibold">100% Confidentiality & Source Handover</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${AGENCY_INFO.contacts.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: {AGENCY_INFO.contacts.whatsappFormatted}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
