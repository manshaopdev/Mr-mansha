import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { UserWallet, ReferralUser } from '../types/adRewards';
import { soundFX } from '../utils/audio';

interface ReferralSectionProps {
  wallet: UserWallet;
  referrals: ReferralUser[];
  onInviteSimulatedFriend: () => void;
}

export const ReferralSection: React.FC<ReferralSectionProps> = ({
  wallet,
  referrals,
  onInviteSimulatedFriend
}) => {
  const [copied, setCopied] = useState(false);

  const referralLink = `https://aradrewards.pk/join?ref=${wallet.referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    soundFX.playRewardSuccess();
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#10B981', '#06B6D4']
      });
    } catch {
      //
    }
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Earn Pakistani Rupees (₨ PKR) daily watching 15-second ads on AR AdRewards! Instant payouts to Easypaisa & JazzCash. Join using my referral link: ${referralLink}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Hero Header */}
      <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <i className="fa-solid fa-users text-sm"></i>
            <span>Viral Growth Affiliate Program</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">Lifetime Passive Income</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Earn <span className="text-[#10B981]">10% Commission</span> on Every Ad Your Friends Watch
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Invite Pakistani creators, students, and earners. Whenever anyone in your network watches an ad or completes anti-bot verification, 10% of their reward is credited instantly to your earnings wallet forever.
          </p>
        </div>

        <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-4 rounded-xl bg-[#1E293B] border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Total Friends Invited</div>
          <div className="text-2xl font-bold font-mono-numbers text-white mt-1">
            {wallet.referredUsersCount} <span className="text-xs font-normal text-slate-400">Earners</span>
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <i className="fa-solid fa-circle-check text-[10px]"></i>
            <span>{referrals.filter(r => r.status === 'active').length} actively watching today</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#1E293B] border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">10% Lifetime Earnings</div>
          <div className="text-2xl font-bold font-mono-numbers text-[#10B981] mt-1">
            ₨ {wallet.referralEarnings.toFixed(2)} PKR
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Automatically added to wallet
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#1E293B] border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Your Commission Tier</div>
          <div className="text-2xl font-bold font-mono-numbers text-cyan-400 mt-1">
            10.0% <span className="text-xs font-normal text-slate-400">Fixed</span>
          </div>
          <div className="text-[11px] text-cyan-300 mt-1">
            Direct Easypaisa cashable
          </div>
        </div>

      </div>

      {/* Unique Referral Link Generator Card */}
      <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 space-y-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <i className="fa-solid fa-link text-emerald-400"></i>
            <span>Your Personal Referral Link & Code</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Share this link via WhatsApp, Telegram, or social media. New members automatically become your lifetime affiliates.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="w-full flex-1 relative">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm font-mono text-emerald-400 font-medium select-all focus:outline-none focus:border-emerald-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-500 font-mono">
              CODE: {wallet.referralCode}
            </span>
          </div>

          <button
            onClick={handleCopyLink}
            className={`w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow-md ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-[#10B981] hover:bg-emerald-600 text-white'
            }`}
          >
            <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i>
            <span>{copied ? 'Link Copied!' : 'Copy Referral Link'}</span>
          </button>
        </div>

        {/* 1-Click Social Sharing Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 text-xs mr-2">Share directly:</span>

          <button
            onClick={handleShareWhatsApp}
            className="px-3.5 py-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] font-semibold flex items-center gap-1.5 transition-colors"
          >
            <i className="fa-brands fa-whatsapp text-sm"></i>
            <span>WhatsApp</span>
          </button>

          <button
            onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Earn PKR watching ads on AR AdRewards')}`, '_blank')}
            className="px-3.5 py-1.5 rounded-lg bg-[#0088cc]/20 hover:bg-[#0088cc]/30 border border-[#0088cc]/40 text-[#0088cc] font-semibold flex items-center gap-1.5 transition-colors"
          >
            <i className="fa-brands fa-telegram text-sm"></i>
            <span>Telegram</span>
          </button>

          <button
            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, '_blank')}
            className="px-3.5 py-1.5 rounded-lg bg-[#1877F2]/20 hover:bg-[#1877F2]/30 border border-[#1877F2]/40 text-[#1877F2] font-semibold flex items-center gap-1.5 transition-colors"
          >
            <i className="fa-brands fa-facebook text-sm"></i>
            <span>Facebook</span>
          </button>

          {/* Quick Demo Simulator to test viral growth */}
          <button
            onClick={() => {
              onInviteSimulatedFriend();
              soundFX.playRewardSuccess();
            }}
            className="ml-auto px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center gap-1.5"
            title="Simulate a friend joining to test commission calculations"
          >
            <i className="fa-solid fa-user-plus text-emerald-400 text-xs"></i>
            <span>Simulate New Referral</span>
          </button>
        </div>
      </div>

      {/* Referrals Network Table */}
      <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Your Referral Network</h3>
            <p className="text-xs text-slate-400">Track activity and 10% earned commissions per user.</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/80">
            10% Lifetime Cut Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Friend / Affiliate</th>
                <th className="py-2.5 px-3">Joined Date</th>
                <th className="py-2.5 px-3 text-right">Ads Watched</th>
                <th className="py-2.5 px-3 text-right">Your 10% Cut</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono-numbers">
              {referrals.map((ref) => (
                <tr key={ref.id} className="hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-sans font-medium text-white flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center text-[10px]">
                      {ref.name[0]}
                    </div>
                    <span>{ref.name}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-400">{ref.joinedDate}</td>
                  <td className="py-3 px-3 text-right font-bold text-white">{ref.adsWatched}</td>
                  <td className="py-3 px-3 text-right text-emerald-400 font-bold">
                    +₨ {ref.commissionEarnedPKR.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-center font-sans">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      ref.status === 'active' 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      {ref.status === 'active' ? 'Active' : 'Idle'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
