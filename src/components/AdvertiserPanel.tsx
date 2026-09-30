import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { AdCampaign, AdCategory, UserWallet, UserProfile } from '../types/adRewards';
import { soundFX } from '../utils/audio';

import shoppingThumb from '../assets/images/ad_thumb_shopping_1790572422404.jpg';
import gamingThumb from '../assets/images/ad_thumb_gaming_1790572433180.jpg';
import fintechThumb from '../assets/images/ad_thumb_fintech_1790572445447.jpg';

interface AdvertiserPanelProps {
  wallet: UserWallet;
  currentUser?: UserProfile;
  onCampaignCreated: (
    campaign: AdCampaign,
    paymentSource: 'deposit' | 'earnings' | 'direct',
    costPKR: number,
    txId?: string,
    paymentMethod?: string
  ) => void;
  openDepositModal: () => void;
}

export const AdvertiserPanel: React.FC<AdvertiserPanelProps> = ({
  wallet,
  currentUser,
  onCampaignCreated,
  openDepositModal
}) => {
  const [title, setTitle] = useState('');
  const [advertiserName, setAdvertiserName] = useState(currentUser?.name || '');
  const [category, setCategory] = useState<Exclude<AdCategory, 'All'>>('YouTube & Social');
  const [targetUrl, setTargetUrl] = useState('');
  const [description, setDescription] = useState('');
  const [targetViews, setTargetViews] = useState<number>(1); // Default to 1 Single Ad
  const [customViewsInput, setCustomViewsInput] = useState<string>('1');
  const [selectedThumb, setSelectedThumb] = useState<string>(gamingThumb);
  const [paymentMethod, setPaymentMethod] = useState<'earnings' | 'deposit' | 'easypaisa' | 'jazzcash' | 'bank'>('earnings');
  const [txId, setTxId] = useState('');
  const [senderNumber, setSenderNumber] = useState(currentUser?.phone || '03');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Market Pricing Packages for Pakistan PTC & Video Promotion
  // 1 Ad Market Rate: ₨ 150 (₨ 100 earner payout + ₨ 50 platform fee)
  const packages = [
    { views: 1, price: 150, label: 'Single Ad Trial', badge: '1 Ad Test', popular: false },
    { views: 5, price: 700, label: 'Micro Starter', badge: '₨ 140/ad', popular: false },
    { views: 10, price: 1300, label: 'Creator Growth', badge: '₨ 130/ad', popular: false },
    { views: 25, price: 3000, label: 'Popular Pack', badge: '₨ 120/ad', popular: true },
    { views: 50, price: 5500, label: 'Business Tier', badge: '₨ 110/ad', popular: false },
    { views: 100, price: 10000, label: 'Viral Scale', badge: '₨ 100/ad', popular: false },
  ];

  // Calculate pricing based on tiered market rates
  const calculateMarketPrice = (views: number): number => {
    if (views <= 0) return 0;
    if (views === 1) return 150;
    if (views < 5) return views * 150;
    if (views < 10) return views * 140;
    if (views < 25) return views * 130;
    if (views < 50) return views * 120;
    if (views < 100) return views * 110;
    return views * 100;
  };

  const totalCostPKR = calculateMarketPrice(targetViews);
  const earnerPayoutPool = targetViews * 100; // ₨ 100 paid to each viewer
  const platformMarginPKR = Math.max(0, totalCostPKR - earnerPayoutPool);

  const handleSelectPackage = (views: number) => {
    soundFX.playClick();
    setTargetViews(views);
    setCustomViewsInput(views.toString());
  };

  const handleCustomViewsChange = (valStr: string) => {
    setCustomViewsInput(valStr);
    const parsed = parseInt(valStr, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setTargetViews(parsed);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !targetUrl.trim() || !advertiserName.trim()) {
      alert('Please fill in Campaign Title, Business/Creator Name, and Website/Video URL');
      soundFX.playError();
      return;
    }

    if (paymentMethod === 'deposit' && wallet.depositBalance < totalCostPKR) {
      alert(`Insufficient Deposit Balance. You have ₨ ${wallet.depositBalance.toFixed(2)}, but this ad costs ₨ ${totalCostPKR.toFixed(2)}. Please top up your deposit.`);
      soundFX.playError();
      openDepositModal();
      return;
    }

    if (paymentMethod === 'earnings' && wallet.earningsBalance < totalCostPKR) {
      alert(`Insufficient Earnings Balance. You have ₨ ${wallet.earningsBalance.toFixed(2)}, but this ad costs ₨ ${totalCostPKR.toFixed(2)}. You can watch more ads or pay via Easypaisa/JazzCash.`);
      soundFX.playError();
      return;
    }

    if ((paymentMethod === 'easypaisa' || paymentMethod === 'jazzcash' || paymentMethod === 'bank') && !txId.trim()) {
      alert('Please enter your Transaction ID (TID / TXZ ID) from Easypaisa/JazzCash/Bank.');
      soundFX.playError();
      return;
    }

    setIsSubmitting(true);
    soundFX.playRewardSuccess();

    setTimeout(() => {
      const newCampaign: AdCampaign = {
        id: `ad-${Date.now().toString().slice(-5)}`,
        title: title.trim(),
        advertiserName: advertiserName.trim(),
        category,
        description: description.trim() || `Visit ${title.trim()} to learn more and support local Pakistani creators.`,
        targetUrl: targetUrl.trim().startsWith('http') ? targetUrl.trim() : `https://${targetUrl.trim()}`,
        thumbnail: selectedThumb,
        durationSeconds: 15,
        rewardPKR: 100.00, // ₨ 100 paid to user who watches
        advertiserCostPerView: Number((totalCostPKR / targetViews).toFixed(2)),
        totalViews: targetViews,
        completedViews: 0,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        featured: targetViews >= 25,
        isWatchedToday: false
      };

      const source = paymentMethod === 'earnings' ? 'earnings' : paymentMethod === 'deposit' ? 'deposit' : 'direct';
      onCampaignCreated(newCampaign, source, totalCostPKR, txId.trim(), paymentMethod);

      try {
        confetti({
          particleCount: 120,
          spread: 85,
          origin: { y: 0.5 },
          colors: ['#06B6D4', '#10B981', '#F8FAFC']
        });
      } catch {}

      setIsSubmitting(false);
      setSuccessMessage(`Mubarak! Your Ad "${title}" is now LIVE! ${targetViews} human view(s) queued at ₨ 100/view for Pakistani earners.`);

      // Reset form
      setTitle('');
      setTargetUrl('');
      setDescription('');
      setTxId('');
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>Self-Serve Ad Portal · Post Your Ad & Grow</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Post Your Ad in Pakistan (Start from ₨ 150)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Koi bhi apna ad de sakta hai! YouTube video, TikTok, website ya Daraz store promote karein. Har viewer ko 15 seconds dekhna aur math captcha solve karna lazmi hai.
            </p>
          </div>

          <div className="flex sm:flex-col gap-2 shrink-0">
            {/* Quick Balances */}
            <div className="bg-slate-900 border border-slate-700/80 rounded-xl p-3 sm:text-right">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">Reinvest Earnings</span>
              <span className="font-mono-numbers text-base font-bold text-emerald-400 block">
                ₨ {wallet.earningsBalance.toFixed(2)}
              </span>
            </div>
            <div className="bg-slate-900 border border-slate-700/80 rounded-xl p-3 sm:text-right">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">Deposit Balance</span>
              <span className="font-mono-numbers text-base font-bold text-cyan-400 block">
                ₨ {wallet.depositBalance.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Rate Highlight Pill */}
        <div className="mt-4 pt-4 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              Market Rate: ₨ 150 / 1 Ad
            </span>
            <span className="text-slate-400">
              (₨ 100 Paid to Real Earner · ₨ 50 Anti-Bot Verification Fee)
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleSelectPackage(1)}
            className="text-cyan-400 hover:text-cyan-300 underline font-semibold flex items-center gap-1"
          >
            <span>Select 1 Ad Quick Test</span>
            <i className="fa-solid fa-arrow-right text-[10px]"></i>
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-circle-check text-emerald-400 text-lg"></i>
            <span>{successMessage}</span>
          </div>
          <button
            onClick={() => setSuccessMessage('')}
            className="text-slate-400 hover:text-white"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}

      {/* Main Campaign Builder Form */}
      <form onSubmit={handleSubmit} className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        
        {/* Step 1: Market Rate Packages & 1-Ad Option */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
              1. Select Ad Quantity & Market Price (Start from 1 Ad)
            </label>
            <span className="text-[11px] text-cyan-400 font-mono">
              ₨ 100/view guaranteed to user
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {packages.map((pkg) => (
              <button
                key={pkg.views}
                type="button"
                onClick={() => handleSelectPackage(pkg.views)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  targetViews === pkg.views
                    ? 'bg-slate-800 border-cyan-400 shadow-md shadow-cyan-950/40 ring-1 ring-cyan-400'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 truncate">
                  <span>{pkg.label}</span>
                </div>
                <div className="font-mono-numbers text-base font-bold text-white mt-0.5">
                  {pkg.views} {pkg.views === 1 ? 'Ad View' : 'Views'}
                </div>
                <div className="text-xs font-mono-numbers text-cyan-400 font-bold mt-1">
                  ₨ {pkg.price.toLocaleString()}
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {pkg.badge}
                  </span>
                  {pkg.popular && (
                    <span className="text-[9px] font-bold text-amber-400">★ HOT</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Custom Views Slider / Input */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xs">
                <i className="fa-solid fa-sliders"></i>
              </div>
              <div>
                <div className="text-xs font-bold text-white">Custom Ad Quantity</div>
                <div className="text-[11px] text-slate-400">Post any custom number of ad views (1 - 5,000)</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="5000"
                value={customViewsInput}
                onChange={(e) => handleCustomViewsChange(e.target.value)}
                className="w-24 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono-numbers text-white text-center focus:outline-none focus:border-cyan-400"
              />
              <span className="text-xs text-slate-400">Views =</span>
              <span className="font-mono-numbers text-sm font-bold text-emerald-400">
                ₨ {totalCostPKR.toLocaleString()} PKR
              </span>
            </div>
          </div>
        </div>

        {/* Real-Time Platform Arbitrage & Margin Transparency Card */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-calculator text-cyan-400"></i>
              <span>Market Price Transparency Breakdown ({targetViews} View{targetViews > 1 ? 's' : ''})</span>
            </span>
            <span className="font-mono-numbers text-emerald-400 font-bold text-sm">
              Total: ₨ {totalCostPKR.toLocaleString()} PKR
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <div className="text-slate-400 text-[10px] uppercase">Market Cost Per Ad</div>
              <div className="font-mono-numbers text-white font-bold text-sm mt-0.5">
                ₨ {(totalCostPKR / targetViews).toFixed(2)} <span className="text-[10px] font-normal text-slate-500">PKR</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">15s verified attention</div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <div className="text-slate-400 text-[10px] uppercase">Earner Payout Pool</div>
              <div className="font-mono-numbers text-emerald-400 font-bold text-sm mt-0.5">
                ₨ {earnerPayoutPool.toLocaleString()} <span className="text-[10px] font-normal text-emerald-600">PKR</span>
              </div>
              <div className="text-[10px] text-emerald-500 mt-0.5">₨ 100 per ad viewed</div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <div className="text-slate-400 text-[10px] uppercase">Platform Verification Fee</div>
              <div className="font-mono-numbers text-cyan-400 font-bold text-sm mt-0.5">
                ₨ {platformMarginPKR.toLocaleString()} <span className="text-[10px] font-normal text-cyan-600">PKR</span>
              </div>
              <div className="text-[10px] text-cyan-500 mt-0.5">Anti-bot math security & hosting</div>
            </div>
          </div>
        </div>

        {/* Step 2: Campaign Details */}
        <div className="space-y-4">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
            2. Ad Campaign Details & Target Link
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Campaign Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Subscribe to Techify YouTube Channel or Buy on Daraz"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Advertiser / Brand Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Techify Studio Karachi or Ali Raza"
                value={advertiserName}
                onChange={(e) => setAdvertiserName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Target Website / Video / Social URL *</label>
              <input
                type="url"
                required
                placeholder="https://youtube.com/watch?v=... or https://myshop.pk"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Exclude<AdCategory, 'All'>)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="YouTube & Social">YouTube & Social</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="Apps & Tech">Apps & Tech</option>
                <option value="Crypto & Finance">Crypto & Finance</option>
                <option value="Pakistani Brands">Pakistani Brands</option>
                <option value="Gaming">Gaming</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Description (Optional)</label>
            <textarea
              rows={2}
              placeholder="Tell users why they should explore your brand, subscribe, or buy..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Thumbnail Choice */}
          <div>
            <label className="text-xs text-slate-400 block mb-2">Select Campaign Thumbnail</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { img: gamingThumb, label: 'Tech & Gaming' },
                { img: shoppingThumb, label: 'E-commerce & Retail' },
                { img: fintechThumb, label: 'Fintech & Apps' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedThumb(item.img)}
                  className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                    selectedThumb === item.img ? 'border-cyan-400 shadow-md ring-1 ring-cyan-400' : 'border-slate-700 opacity-60 hover:opacity-90'
                  }`}
                >
                  <img src={item.img} alt={item.label} className="w-full aspect-video object-cover" />
                  <div className="p-1.5 bg-slate-900 text-[10px] text-center text-slate-300 font-medium truncate">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Step 3: Payment Method (Reinvest Earnings, Deposit Wallet, or Direct Mobile) */}
        <div className="space-y-4 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
              3. Select Payment Source (₨ {totalCostPKR.toLocaleString()} PKR Required)
            </label>
            <span className="text-[11px] text-slate-400">
              Users can pay with earned balance directly
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Pay with Earnings Reinvestment */}
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                setPaymentMethod('earnings');
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                paymentMethod === 'earnings'
                  ? 'bg-slate-800 border-emerald-400 text-emerald-300 shadow-md ring-1 ring-emerald-400'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <i className="fa-solid fa-rotate text-xs"></i>
                <span>Reinvest Earnings</span>
              </div>
              <div className="text-[11px] font-mono-numbers mt-1 text-white font-semibold">
                ₨ {wallet.earningsBalance.toFixed(2)}
              </div>
              <div className="text-[9px] text-emerald-400/90 mt-0.5">
                No deposit needed
              </div>
            </button>

            {/* Pay with Deposit Wallet */}
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                setPaymentMethod('deposit');
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                paymentMethod === 'deposit'
                  ? 'bg-slate-800 border-cyan-400 text-cyan-300 shadow-md ring-1 ring-cyan-400'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                <i className="fa-solid fa-wallet text-xs"></i>
                <span>Deposit Wallet</span>
              </div>
              <div className="text-[11px] font-mono-numbers mt-1 text-white font-semibold">
                ₨ {wallet.depositBalance.toFixed(2)}
              </div>
              <div className="text-[9px] text-slate-400 mt-0.5">
                Pre-funded balance
              </div>
            </button>

            {/* Pay with Easypaisa (Disabled / Unavailable) */}
            <button
              type="button"
              disabled
              onClick={() => {
                alert('Easypaisa is currently not available (baad me add hoga). Please pay using official JazzCash number 03262636289.');
              }}
              className="p-3 rounded-xl border border-slate-800/80 bg-slate-950/80 text-left opacity-60 cursor-not-allowed"
              title="Easypaisa is not available (baad me add hoga)"
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <i className="fa-solid fa-mobile-screen text-xs"></i>
                <span>Easypaisa</span>
              </div>
              <div className="text-[10px] text-amber-400 mt-1 font-semibold">
                Not Available
              </div>
              <div className="text-[9px] text-slate-500 mt-0.5">
                Baad me add hoga
              </div>
            </button>

            {/* Pay with JazzCash */}
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                setPaymentMethod('jazzcash');
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                paymentMethod === 'jazzcash'
                  ? 'bg-slate-800 border-rose-500 text-rose-400 shadow-md ring-1 ring-rose-500'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                <i className="fa-solid fa-bolt text-xs"></i>
                <span>JazzCash</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-1 font-mono">
                0326-2636289
              </div>
              <div className="text-[9px] text-slate-400 mt-0.5">
                Direct Mobile Pay
              </div>
            </button>

            {/* Bank / Raast */}
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                setPaymentMethod('bank');
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                paymentMethod === 'bank'
                  ? 'bg-slate-800 border-cyan-400 text-cyan-400 shadow-md ring-1 ring-cyan-400'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                <i className="fa-solid fa-building-columns text-xs"></i>
                <span>Bank / Raast</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-1">
                Meezan Bank
              </div>
              <div className="text-[9px] text-slate-400 mt-0.5">
                Inter-Bank Pay
              </div>
            </button>
          </div>

          {/* Helper message for Earnings Balance */}
          {paymentMethod === 'earnings' && (
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-700/60 text-xs text-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-emerald-400"></i>
                <span>
                  Using your earnings balance (₨ {wallet.earningsBalance.toFixed(2)}).{' '}
                  {wallet.earningsBalance >= totalCostPKR
                    ? `You have enough balance! ₨ ${totalCostPKR} will be deducted directly.`
                    : `You need ₨ ${(totalCostPKR - wallet.earningsBalance).toFixed(2)} more. Watch a few more ads or select Easypaisa/JazzCash.`}
                </span>
              </div>
            </div>
          )}

          {/* Payment Details Drawer if direct mobile/bank chosen */}
          {(paymentMethod === 'easypaisa' || paymentMethod === 'jazzcash' || paymentMethod === 'bank') && (
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-3">
              <div className="text-xs text-slate-300 font-semibold flex items-center justify-between">
                <span>Send ₨ {totalCostPKR.toLocaleString()} to AR AdRewards Official Account:</span>
                <span className="text-[11px] text-amber-400 font-mono">Approve in Admin Panel</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div>
                  <span className="text-slate-500 text-[10px] block">Payment Gateway:</span>
                  <strong className="text-white capitalize">{paymentMethod}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Official Account Number:</span>
                  <div className="font-mono text-emerald-400 font-bold flex items-center gap-2">
                    <span>{paymentMethod === 'bank' ? 'PK36MEZN0001020304050607' : '0326-2636289'}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const copyNum = paymentMethod === 'bank' ? 'PK36MEZN0001020304050607' : '03262636289';
                        navigator.clipboard.writeText(copyNum);
                        alert(`Account number copied to clipboard: ${copyNum}`);
                      }}
                      className="text-slate-400 hover:text-white"
                      title="Copy account number"
                    >
                      <i className="fa-regular fa-copy text-xs"></i>
                    </button>
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Account Title:</span>
                  <strong className="text-slate-200">AR AdRewards Official</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Total Amount to Send:</span>
                  <strong className="text-cyan-400 font-mono-numbers">₨ {totalCostPKR.toFixed(2)} PKR</strong>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">
                    Your Sender Mobile Number
                  </label>
                  <input
                    type="text"
                    value={senderNumber}
                    onChange={(e) => setSenderNumber(e.target.value)}
                    placeholder="0326-2636289"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">
                    Easypaisa / JazzCash Transaction ID (TID / TXZ ID) *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. TXZ-98234871 or 12-digit receipt number"
                    value={txId}
                    onChange={(e) => setTxId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            <i className="fa-solid fa-shield text-emerald-400 mr-1.5"></i>
            <span>100% human Pakistani views · 15-sec focus timer · Math anti-bot captcha</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#06B6D4] via-cyan-600 to-[#10B981] hover:from-cyan-600 hover:to-emerald-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i>
                <span>Publishing Ad Campaign...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-rocket"></i>
                <span>
                  Launch Ad Now ({targetViews} View{targetViews > 1 ? 's' : ''} · ₨ {totalCostPKR.toLocaleString()})
                </span>
              </>
            )}
          </button>
        </div>

      </form>

      {/* Market Rate Card Reference Section */}
      <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-chart-line text-cyan-400"></i>
          <h2 className="text-base font-bold text-white">Official Pakistan Ad Market Rate Card</h2>
        </div>
        <p className="text-xs text-slate-300">
          Compare our direct human attention rates with traditional digital marketing in Pakistan:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Ad Package</th>
                <th className="py-2.5 px-3">Human Views</th>
                <th className="py-2.5 px-3">Total Cost</th>
                <th className="py-2.5 px-3">Cost / View</th>
                <th className="py-2.5 px-3">Earner Payout</th>
                <th className="py-2.5 px-3">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-semibold text-white">Single Ad Trial</td>
                <td className="py-2.5 px-3 font-mono">1 View</td>
                <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">₨ 150</td>
                <td className="py-2.5 px-3 font-mono">₨ 150</td>
                <td className="py-2.5 px-3 font-mono text-cyan-400">₨ 100</td>
                <td className="py-2.5 px-3 text-[11px] text-slate-400">15s Timer + Captcha</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-semibold text-white">Micro Starter</td>
                <td className="py-2.5 px-3 font-mono">5 Views</td>
                <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">₨ 700</td>
                <td className="py-2.5 px-3 font-mono">₨ 140</td>
                <td className="py-2.5 px-3 font-mono text-cyan-400">₨ 500</td>
                <td className="py-2.5 px-3 text-[11px] text-slate-400">15s Timer + Captcha</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-semibold text-white">Creator Growth</td>
                <td className="py-2.5 px-3 font-mono">10 Views</td>
                <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">₨ 1,300</td>
                <td className="py-2.5 px-3 font-mono">₨ 130</td>
                <td className="py-2.5 px-3 font-mono text-cyan-400">₨ 1,000</td>
                <td className="py-2.5 px-3 text-[11px] text-slate-400">15s Timer + Captcha</td>
              </tr>
              <tr className="hover:bg-slate-800/40 bg-cyan-950/20">
                <td className="py-2.5 px-3 font-semibold text-cyan-300">Popular Pack ★</td>
                <td className="py-2.5 px-3 font-mono">25 Views</td>
                <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">₨ 3,000</td>
                <td className="py-2.5 px-3 font-mono">₨ 120</td>
                <td className="py-2.5 px-3 font-mono text-cyan-400">₨ 2,500</td>
                <td className="py-2.5 px-3 text-[11px] text-slate-400">Featured Placement</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-semibold text-white">Business Tier</td>
                <td className="py-2.5 px-3 font-mono">50 Views</td>
                <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">₨ 5,500</td>
                <td className="py-2.5 px-3 font-mono">₨ 110</td>
                <td className="py-2.5 px-3 font-mono text-cyan-400">₨ 5,000</td>
                <td className="py-2.5 px-3 text-[11px] text-slate-400">Priority Feed</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-semibold text-white">Viral Scale</td>
                <td className="py-2.5 px-3 font-mono">100 Views</td>
                <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">₨ 10,000</td>
                <td className="py-2.5 px-3 font-mono">₨ 100</td>
                <td className="py-2.5 px-3 font-mono text-cyan-400">₨ 10,000</td>
                <td className="py-2.5 px-3 text-[11px] text-slate-400">VIP Top Priority</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
