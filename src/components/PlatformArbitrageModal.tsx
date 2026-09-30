import React from 'react';
import { AdCampaign } from '../types/adRewards';

interface PlatformArbitrageModalProps {
  campaigns: AdCampaign[];
  onOpenCreateAd: () => void;
}

export const PlatformArbitrageModal: React.FC<PlatformArbitrageModalProps> = ({
  campaigns,
  onOpenCreateAd
}) => {
  // Aggregate calculations
  const totalPurchasedViews = campaigns.reduce((acc, c) => acc + c.totalViews, 0);
  const totalDeliveredViews = campaigns.reduce((acc, c) => acc + c.completedViews, 0);

  const grossAdvertiserIntakePKR = campaigns.reduce(
    (acc, c) => acc + c.totalViews * c.advertiserCostPerView,
    0
  );

  const earnerPayoutAllocatedPKR = campaigns.reduce(
    (acc, c) => acc + c.totalViews * c.rewardPKR,
    0
  );

  const platformRetainedProfitPKR = grossAdvertiserIntakePKR - earnerPayoutAllocatedPKR;
  const marginPercentage = ((platformRetainedProfitPKR / grossAdvertiserIntakePKR) * 100).toFixed(1);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold mb-1">
              Economics & Sustainability Model
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Platform Arbitrage & Profit Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Transparent breakdown showing how AR AdRewards retains a strict 50% operating margin while funding instant earner payouts.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-center sm:text-right shrink-0">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium block">Arbitrage Retained Margin</span>
            <span className="font-mono-numbers text-2xl font-bold text-emerald-400 block">
              {marginPercentage}% Fixed
            </span>
            <span className="text-[10px] text-slate-500 font-mono">100% Solvent Liquidity</span>
          </div>
        </div>
      </div>

      {/* 3 Pillars of Platform Arbitrage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Pillar 1 */}
        <div className="p-5 rounded-xl bg-[#1E293B] border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-lg">
            <i className="fa-solid fa-hand-holding-dollar"></i>
          </div>
          <div className="text-xs text-slate-400 uppercase font-semibold">1. Advertiser Intake</div>
          <div className="font-mono-numbers text-2xl font-bold text-white">
            ₨ {grossAdvertiserIntakePKR.toLocaleString()} <span className="text-xs font-normal text-slate-400">PKR</span>
          </div>
          <p className="text-xs text-slate-400">
            Clients pay <strong>₨ 200</strong> per verified 15-second human view.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="p-5 rounded-xl bg-[#1E293B] border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg">
            <i className="fa-solid fa-users"></i>
          </div>
          <div className="text-xs text-slate-400 uppercase font-semibold">2. User Payout Pool (50%)</div>
          <div className="font-mono-numbers text-2xl font-bold text-[#10B981]">
            ₨ {earnerPayoutAllocatedPKR.toLocaleString()} <span className="text-xs font-normal text-emerald-700">PKR</span>
          </div>
          <p className="text-xs text-slate-400">
            Registered earners receive <strong>₨ 100</strong> per ad watched + 10% referral cut.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="p-5 rounded-xl bg-[#1E293B] border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center text-lg">
            <i className="fa-solid fa-vault"></i>
          </div>
          <div className="text-xs text-slate-400 uppercase font-semibold">3. Admin Arbitrage Profit (50%)</div>
          <div className="font-mono-numbers text-2xl font-bold text-amber-400">
            ₨ {platformRetainedProfitPKR.toLocaleString()} <span className="text-xs font-normal text-amber-600">PKR</span>
          </div>
          <p className="text-xs text-slate-400">
            Net profit retained for server infrastructure, liquidity reserve & anti-bot protection.
          </p>
        </div>

      </div>

      {/* Visual Flow Diagram */}
      <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <i className="fa-solid fa-diagram-project text-cyan-400"></i>
          <span>Value Flow Architecture</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs">
          
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <i className="fa-solid fa-briefcase text-cyan-400 text-xl"></i>
            <div className="font-bold text-white">Advertiser Posts</div>
            <div className="text-slate-400 text-[11px]">50 Views = ₨ 10,000</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <i className="fa-solid fa-shield-halved text-emerald-400 text-xl"></i>
            <div className="font-bold text-white">Anti-Bot Validation</div>
            <div className="text-slate-400 text-[11px]">15s Active + Math Captcha</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <i className="fa-solid fa-money-bill-wave text-emerald-400 text-xl"></i>
            <div className="font-bold text-white">Earner Distribution</div>
            <div className="text-slate-400 text-[11px]">₨ 5,000 Total (₨ 100/view)</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <i className="fa-solid fa-piggy-bank text-amber-400 text-xl"></i>
            <div className="font-bold text-white">Platform Spread</div>
            <div className="text-slate-400 text-[11px]">₨ 5,000 Net Arbitrage (50%)</div>
          </div>

        </div>

        {/* Live Campaign Ledger Table */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white">Active Campaigns Arbitrage Margin Ledger</span>
            <span className="text-slate-400 font-mono-numbers">{totalDeliveredViews.toLocaleString()} / {totalPurchasedViews.toLocaleString()} Views Verified</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono-numbers">
              <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3 font-sans">Campaign</th>
                  <th className="py-2.5 px-3 text-right">Target Views</th>
                  <th className="py-2.5 px-3 text-right">Client Paid</th>
                  <th className="py-2.5 px-3 text-right">Earner Pool</th>
                  <th className="py-2.5 px-3 text-right">Platform Margin</th>
                  <th className="py-2.5 px-3 text-center font-sans">Arbitrage %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {campaigns.map((ad) => {
                  const clientTotal = ad.totalViews * ad.advertiserCostPerView;
                  const earnerTotal = ad.totalViews * ad.rewardPKR;
                  const spread = clientTotal - earnerTotal;
                  const pct = ((spread / clientTotal) * 100).toFixed(0);

                  return (
                    <tr key={ad.id} className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 font-sans text-white font-medium truncate max-w-[180px]">
                        {ad.title}
                      </td>
                      <td className="py-2.5 px-3 text-right">{ad.totalViews.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right text-cyan-400">₨ {clientTotal.toFixed(0)}</td>
                      <td className="py-2.5 px-3 text-right text-emerald-400">₨ {earnerTotal.toFixed(0)}</td>
                      <td className="py-2.5 px-3 text-right text-amber-400 font-bold">₨ {spread.toFixed(0)}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                          {pct}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onOpenCreateAd}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#06B6D4] to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold text-xs transition-all flex items-center gap-2"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Post New Campaign as Advertiser</span>
          </button>
        </div>

      </div>

    </div>
  );
};
