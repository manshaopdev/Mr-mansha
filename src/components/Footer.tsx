import React from 'react';

interface FooterProps {
  onNavigate: (tab: 'watch' | 'plans' | 'create' | 'wallet' | 'referrals' | 'arbitrage' | 'auth') => void;
  openDepositModal: () => void;
  openWithdrawModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  openDepositModal,
  openWithdrawModal
}) => {
  return (
    <footer className="bg-[#0b1120] border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#10B981] to-[#06B6D4] p-[1.5px]">
                <div className="w-full h-full bg-[#0F172A] rounded-[6px] flex items-center justify-center">
                  <i className="fa-solid fa-list-check text-[#10B981] text-xs pl-0.5"></i>
                </div>
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                AR <span className="text-[#10B981]">AdRewards</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pakistan's trusted daily tasks & video earning platform. Instant ₨ 100 per 15s task. Cashouts and deposits via official JazzCash (0326-2636289).
            </p>
          </div>

          {/* Earner Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              For Earners
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigate('watch')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Daily Tasks (₨ 100/Task)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('plans')} className="hover:text-amber-400 text-amber-300 font-semibold transition-colors cursor-pointer">
                  VIP Earning Plans
                </button>
              </li>
              <li>
                <button onClick={openWithdrawModal} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Withdraw to JazzCash (Min ₨ 500)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('referrals')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  10% Lifetime Referral Program
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('auth')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Register Account (+₨ 50 Bonus)
                </button>
              </li>
            </ul>
          </div>

          {/* Advertiser Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              For Advertisers
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigate('create')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Post New Ad (Start from 1 Ad @ ₨ 150)
                </button>
              </li>
              <li>
                <button onClick={openDepositModal} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Top-up via JazzCash 03262636289
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('arbitrage')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Platform Margin & Economics
                </button>
              </li>
              <li>
                <span className="text-slate-500">YouTube, TikTok & App Promotion</span>
              </li>
            </ul>
          </div>

          {/* Compliance & Payment Partners */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Payment Gateways
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded bg-rose-950/80 border border-rose-500 text-rose-300 font-bold flex items-center gap-1.5">
                <i className="fa-solid fa-bolt text-rose-400"></i>
                <span>JazzCash: 0326-2636289 (Active)</span>
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-500 font-medium">
                Easypaisa (Coming Soon)
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-medium">
                Bank Transfer
              </span>
            </div>
            <p className="text-[11px] text-slate-400 pt-1">
              Easypaisa is not available yet (baad me add hoga). Send all deposits & plan payments to JazzCash <strong>03262636289</strong>.
            </p>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} AR AdRewards Pakistan. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <i className="fa-solid fa-shield-check"></i>
              <span>Anti-Bot Math Verification Active</span>
            </span>
            <span>·</span>
            <span className="text-amber-400">JazzCash Gateway: 0326-2636289</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
