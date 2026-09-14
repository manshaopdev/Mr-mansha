import React, { useState } from 'react';
import {
  Calculator,
  Check,
  Calendar,
  Sparkles,
  MessageCircle,
  ArrowRight,
  RefreshCw,
  Palette,
  Code2,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { Currency, EstimatorItem } from '../types/agency';
import { ESTIMATOR_OPTIONS, AGENCY_INFO } from '../data/agencyData';

interface InteractiveEstimatorProps {
  currency: Currency;
  onToggleCurrency: () => void;
  onSendEstimateToInquiry: (selectedItems: string[], totalCost: number, currency: Currency) => void;
}

export const InteractiveEstimator: React.FC<InteractiveEstimatorProps> = ({
  currency,
  onToggleCurrency,
  onSendEstimateToInquiry,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'est-logo',
    'est-corpweb',
    'est-metaads'
  ]);

  const toggleItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedItems = ESTIMATOR_OPTIONS.filter((item) => selectedIds.includes(item.id));

  const totalCost = selectedItems.reduce((acc, curr) => {
    return acc + (currency === 'PKR' ? curr.basePKR : curr.baseUSD);
  }, 0);

  // Approximate overlapping timeline: max single project duration + 30% of rest
  const estimatedDays = selectedItems.length === 0
    ? 0
    : Math.max(...selectedItems.map((i) => i.days)) + Math.round(selectedItems.length * 1.5);

  const formatPrice = (val: number) => {
    if (currency === 'PKR') {
      return `₨ ${val.toLocaleString('en-PK')}`;
    }
    return `$ ${val.toLocaleString('en-US')}`;
  };

  const openWhatsAppWithEstimate = () => {
    const list = selectedItems.map((i) => `• ${i.title}`).join('\n');
    const msg = encodeURIComponent(
      `Hello Prime Plus Team! I calculated an estimated project on your website:\n\nServices Selected:\n${list}\n\nEstimated Investment: ${formatPrice(totalCost)}\nEstimated Timeline: ~${estimatedDays} Days\n\nI would like to discuss and get a formal proposal.`
    );
    window.open(`https://wa.me/${AGENCY_INFO.contacts.whatsapp.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
  };

  return (
    <section id="cost-estimator" className="py-16 sm:py-20 bg-slate-950/60 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono">
            <Calculator className="w-3.5 h-3.5" />
            <span>TRANSPARENT PROJECT BUDGETING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            Interactive Project Cost & Timeline Estimator
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Select the exact Graphic Design, Web Development, and Digital Marketing modules your business needs to view instant budget estimates.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <span className="text-xs text-slate-400">Display Currency:</span>
            <button
              onClick={onToggleCurrency}
              className="px-3 py-1 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Switch to {currency === 'PKR' ? 'USD ($)' : 'PKR (₨)'}
            </button>
          </div>
        </div>

        {/* Estimator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Options Checklist */}
          <div className="lg:col-span-2 space-y-6">
            {/* Graphic Design Category */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-pink-400 font-bold font-['Outfit',sans-serif] text-base sm:text-lg">
                <Palette className="w-5 h-5" />
                <span>Graphic & Brand Design Modules</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ESTIMATOR_OPTIONS.filter((i) => i.category === 'graphic-design').map((item) => {
                  const active = selectedIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 text-left ${
                        active
                          ? 'bg-pink-950/30 border-pink-500/50 shadow-md shadow-pink-500/10'
                          : 'bg-slate-850 bg-slate-900/50 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-slate-100 leading-snug">
                          {item.title}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          Est: ~{item.days} days
                        </div>
                        <div className="text-xs font-black text-pink-400 font-mono">
                          {formatPrice(currency === 'PKR' ? item.basePKR : item.baseUSD)}
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border ${
                          active
                            ? 'bg-pink-500 border-pink-400 text-white'
                            : 'border-slate-700 bg-slate-900'
                        }`}
                      >
                        {active && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Web Development Category */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-sky-400 font-bold font-['Outfit',sans-serif] text-base sm:text-lg">
                <Code2 className="w-5 h-5" />
                <span>Web & Full-Stack Development Modules</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ESTIMATOR_OPTIONS.filter((i) => i.category === 'web-development').map((item) => {
                  const active = selectedIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 text-left ${
                        active
                          ? 'bg-sky-950/30 border-sky-500/50 shadow-md shadow-sky-500/10'
                          : 'bg-slate-850 bg-slate-900/50 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-slate-100 leading-snug">
                          {item.title}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          Est: ~{item.days} days
                        </div>
                        <div className="text-xs font-black text-sky-400 font-mono">
                          {formatPrice(currency === 'PKR' ? item.basePKR : item.baseUSD)}
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border ${
                          active
                            ? 'bg-sky-500 border-sky-400 text-white'
                            : 'border-slate-700 bg-slate-900'
                        }`}
                      >
                        {active && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Digital Marketing Category */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold font-['Outfit',sans-serif] text-base sm:text-lg">
                <TrendingUp className="w-5 h-5" />
                <span>Digital Marketing & Growth Campaigns</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ESTIMATOR_OPTIONS.filter((i) => i.category === 'digital-marketing').map((item) => {
                  const active = selectedIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 text-left ${
                        active
                          ? 'bg-amber-950/30 border-amber-500/50 shadow-md shadow-amber-500/10'
                          : 'bg-slate-850 bg-slate-900/50 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-slate-100 leading-snug">
                          {item.title}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          Cycle: ~{item.days} days
                        </div>
                        <div className="text-xs font-black text-amber-400 font-mono">
                          {formatPrice(currency === 'PKR' ? item.basePKR : item.baseUSD)}
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border ${
                          active
                            ? 'bg-amber-500 border-amber-400 text-white'
                            : 'border-slate-700 bg-slate-900'
                        }`}
                      >
                        {active && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sticky Summary Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl space-y-6 text-left">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-xl font-black text-white font-['Outfit',sans-serif]">
                  Your Project Estimate
                </h3>
                <button
                  onClick={() => setSelectedIds([])}
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer font-mono"
                  title="Reset selections"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Selected Items Counter */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-400 uppercase font-bold">
                  Modules Selected ({selectedItems.length}):
                </div>
                {selectedItems.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">
                    No modules selected yet. Check items on the left to calculate.
                  </p>
                ) : (
                  <ul className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-xs text-slate-300">
                    {selectedItems.map((i) => (
                      <li key={i.id} className="flex items-center justify-between gap-2">
                        <span className="truncate">• {i.title}</span>
                        <span className="font-mono text-slate-400 shrink-0">
                          {formatPrice(currency === 'PKR' ? i.basePKR : i.baseUSD)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Timeline Gauge */}
              <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/60 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Calendar className="w-4 h-4 text-sky-400" />
                  <span>Estimated Delivery:</span>
                </div>
                <div className="font-mono font-bold text-white text-sm">
                  {estimatedDays > 0 ? `~ ${estimatedDays} Days` : '—'}
                </div>
              </div>

              {/* Total Estimated Cost */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/90 to-slate-900 border border-indigo-500/40 space-y-1">
                <div className="text-xs font-mono text-indigo-300 uppercase">
                  Total Estimated Investment:
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white font-['Outfit',sans-serif] tracking-tight">
                  {formatPrice(totalCost)}
                </div>
                <div className="text-[11px] text-slate-400">
                  *Indicative scope. Formal milestone contract finalized upon discovery.
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2.5 pt-2">
                <button
                  disabled={selectedItems.length === 0}
                  onClick={() =>
                    onSendEstimateToInquiry(
                      selectedItems.map((i) => i.title),
                      totalCost,
                      currency
                    )
                  }
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Lock in this Estimate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  disabled={selectedItems.length === 0}
                  onClick={openWhatsAppWithEstimate}
                  className="w-full py-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 font-bold text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Estimate to WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
