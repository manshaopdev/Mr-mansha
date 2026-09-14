import React, { useState } from 'react';
import {
  Tag,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { Currency, PackageOption } from '../types/agency';
import { PRICING_PACKAGES, AGENCY_INFO } from '../data/agencyData';

interface PackagesProps {
  currency: Currency;
  onToggleCurrency: () => void;
  onSelectPackage: (pkg: PackageOption) => void;
}

export const Packages: React.FC<PackagesProps> = ({
  currency,
  onToggleCurrency,
  onSelectPackage,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const formatPrice = (pkr: number, usd: number) => {
    if (currency === 'PKR') {
      return `₨ ${pkr.toLocaleString('en-PK')}`;
    }
    return `$ ${usd.toLocaleString('en-US')}`;
  };

  const filteredPackages = filterCategory === 'all'
    ? PRICING_PACKAGES
    : PRICING_PACKAGES.filter((p) => p.category === filterCategory || p.category === 'all-in-one');

  return (
    <section id="pricing-packages" className="py-16 sm:py-24 border-t border-slate-800/80 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Tag className="w-3.5 h-3.5" />
            <span>TRANSPARENT VALUE-BASED PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            Curated Agency Packages & Retainers
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            No hidden fees or unexpected billings. Choose standalone services or leverage our All-in-One agency transformation bundle.
          </p>

          {/* Currency Toggle Ribbon */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <span className="text-xs text-slate-400 font-mono">Currency:</span>
            <button
              onClick={onToggleCurrency}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Viewing in <span className="underline">{currency === 'PKR' ? 'Pakistani Rupee (₨)' : 'US Dollar ($)'}</span> (Click to Switch)
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: 'all', label: 'All Packages' },
              { id: 'graphic-design', label: 'Graphic Design' },
              { id: 'web-development', label: 'Web Development' },
              { id: 'digital-marketing', label: 'Digital Marketing' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  filterCategory === cat.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => {
            const isAllInOne = pkg.category === 'all-in-one';
            return (
              <div
                key={pkg.id}
                className={`p-6 sm:p-8 rounded-3xl transition-all flex flex-col justify-between space-y-6 relative ${
                  isAllInOne
                    ? 'bg-gradient-to-b from-indigo-950/80 via-slate-900 to-slate-900 border-2 border-indigo-500/60 shadow-[0_0_40px_rgba(99,102,241,0.25)] lg:scale-105'
                    : pkg.popular
                    ? 'bg-slate-900 border-2 border-sky-500/50 shadow-xl'
                    : 'bg-slate-900/80 border border-slate-800'
                }`}
              >
                {/* Popular / Featured Badge */}
                {(pkg.popular || isAllInOne) && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-[11px] uppercase tracking-wider shadow-md">
                    {isAllInOne ? '⭐ Best Value / Full Agency Bundle' : 'Most Popular'}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-indigo-400 font-bold">
                      {pkg.idealFor}
                    </span>
                    <h3 className="text-2xl font-black text-white mt-1 font-['Outfit',sans-serif]">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Price Tag */}
                  <div className="pt-2 pb-3 border-y border-slate-800 space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-white font-['Outfit',sans-serif]">
                        {formatPrice(pkg.pricePKR, pkg.priceUSD)}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        / {pkg.duration}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      Includes 100% intellectual property rights & source files
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-mono font-bold uppercase text-slate-400">
                      What's Included:
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isAllInOne
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-lg hover:brightness-110'
                        : pkg.popular
                        ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-lg'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-100'
                    }`}
                  >
                    <span>Choose {pkg.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Milestone-based payments • Non-Disclosure (NDA) available</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
