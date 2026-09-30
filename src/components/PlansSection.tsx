import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { EarningPlan, UserWallet, UserProfile } from '../types/adRewards';
import { EARNING_PLANS } from '../data/initialData';
import { soundFX } from '../utils/audio';

interface PlansSectionProps {
  wallet: UserWallet;
  currentUser: UserProfile;
  onPlanPurchased: (plan: EarningPlan, paymentMethod: 'JazzCash' | 'Deposit Wallet', txId?: string, senderNumber?: string) => void;
  onNavigateToTasks: () => void;
}

export const PlansSection: React.FC<PlansSectionProps> = ({
  wallet,
  currentUser,
  onPlanPurchased,
  onNavigateToTasks
}) => {
  const [selectedPlanForBuy, setSelectedPlanForBuy] = useState<EarningPlan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'JazzCash' | 'Deposit Wallet'>('JazzCash');
  const [senderNumber, setSenderNumber] = useState(currentUser.phone || '03262636289');
  const [txId, setTxId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState('');

  const currentPlan = EARNING_PLANS.find((p) => p.id === (wallet.activePlanId || 'plan-starter')) || EARNING_PLANS[0];

  const handleOpenBuyModal = (plan: EarningPlan) => {
    soundFX.playClick();
    setSelectedPlanForBuy(plan);
    setTxId('');
    setSuccessNotice('');
  };

  const handleConfirmBuy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlanForBuy) return;

    if (paymentMethod === 'Deposit Wallet' && wallet.depositBalance < selectedPlanForBuy.pricePKR) {
      alert(`Insufficient Deposit Balance. You have ₨ ${wallet.depositBalance.toFixed(2)}, but this plan costs ₨ ${selectedPlanForBuy.pricePKR}. Please pay via JazzCash to 03262636289.`);
      soundFX.playError();
      return;
    }

    if (paymentMethod === 'JazzCash' && !txId.trim()) {
      alert('Please enter the 11-digit or 12-digit JazzCash Transaction ID (TID) from your receipt.');
      soundFX.playError();
      return;
    }

    setIsSubmitting(true);
    soundFX.playRewardSuccess();

    setTimeout(() => {
      onPlanPurchased(selectedPlanForBuy, paymentMethod, txId.trim(), senderNumber.trim());

      try {
        confetti({
          particleCount: 150,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#10B981', '#06B6D4', '#F59E0B', '#EF4444'],
        });
      } catch {}

      setIsSubmitting(false);
      setSuccessNotice(`🎉 Plan "${selectedPlanForBuy.name}" activated successfully! You now have ${selectedPlanForBuy.dailyTasks} Daily Tasks (₨ ${selectedPlanForBuy.dailyEarningsPKR}/day).`);
      setSelectedPlanForBuy(null);
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      
      {/* Top Welcome / Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#1E293B] to-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>VIP Earning Plans · ₨ 100 Per Task</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Select Your Plan & Unlock Daily Tasks
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Har task 15 second ka hai aur har task ka <strong className="text-emerald-400 font-bold">₨ 100 PKR</strong> reward hai. Apna package choose karein aur official <strong className="text-amber-400 font-mono">JazzCash (03262636289)</strong> ke zariye buy karein.
            </p>
          </div>

          {/* User Current Plan Box */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-5 shrink-0 sm:w-72 shadow-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Your Active Plan</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                ACTIVE
              </span>
            </div>
            <div className="text-lg font-extrabold text-white flex items-center gap-1.5">
              <i className="fa-solid fa-crown text-amber-400"></i>
              <span>{currentPlan.name}</span>
            </div>
            <div className="text-xs text-slate-300 flex items-center justify-between pt-1 border-t border-slate-800">
              <span className="text-slate-400">Daily Tasks:</span>
              <span className="font-mono text-cyan-400 font-bold">{currentPlan.dailyTasks} Tasks / day</span>
            </div>
            <div className="text-xs text-slate-300 flex items-center justify-between">
              <span className="text-slate-400">Daily Income:</span>
              <span className="font-mono text-emerald-400 font-bold">₨ {currentPlan.dailyEarningsPKR.toLocaleString()} PKR</span>
            </div>

            <button
              onClick={onNavigateToTasks}
              className="w-full mt-2 py-2 px-3 rounded-xl bg-gradient-to-r from-[#10B981] to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/50 cursor-pointer"
            >
              <i className="fa-solid fa-list-check"></i>
              <span>Go To Tasks ({wallet.tasksCompletedToday || 0}/{currentPlan.dailyTasks})</span>
            </button>
          </div>
        </div>

        {/* Notice for JazzCash Only */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-rose-400 flex items-center gap-1.5">
              <i className="fa-solid fa-bolt text-xs"></i>
              <span>Official Payment Gateway: JazzCash (03262636289)</span>
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 text-[11px]">
              <i className="fa-solid fa-clock text-[10px] mr-1"></i>
              Easypaisa is not available (baad me add hoga)
            </span>
          </div>

          <div className="text-slate-400 text-[11px]">
            Withdrawal: Minimum ₨ 500 direct to your JazzCash
          </div>
        </div>
      </div>

      {successNotice && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-circle-check text-emerald-400 text-lg"></i>
            <span>{successNotice}</span>
          </div>
          <button
            onClick={() => setSuccessNotice('')}
            className="text-slate-400 hover:text-white"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {EARNING_PLANS.map((plan) => {
          const isCurrent = (wallet.activePlanId || 'plan-starter') === plan.id;

          return (
            <div
              key={plan.id}
              className={`rounded-2xl border transition-all flex flex-col justify-between p-5 relative overflow-hidden ${
                plan.popular
                  ? 'bg-slate-900 border-amber-400 shadow-xl shadow-amber-950/20 ring-1 ring-amber-400'
                  : isCurrent
                  ? 'bg-slate-900 border-emerald-500 shadow-lg'
                  : 'bg-[#1E293B] border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-slate-950 text-[9px] font-extrabold px-3 py-0.5 rounded-bl-lg uppercase tracking-wider shadow">
                  ★ MOST POPULAR
                </div>
              )}

              {isCurrent && (
                <div className="absolute top-0 left-0 bg-emerald-500 text-slate-950 text-[9px] font-extrabold px-3 py-0.5 rounded-br-lg uppercase tracking-wider shadow">
                  CURRENT PLAN
                </div>
              )}

              <div className="space-y-3 pt-2">
                <div>
                  <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                    {plan.badge || 'VIP Tier'}
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {plan.name}
                  </h3>
                </div>

                <div className="py-2 border-y border-slate-800">
                  <div className="font-mono-numbers text-2xl font-extrabold text-white">
                    {plan.pricePKR === 0 ? (
                      <span className="text-emerald-400">FREE</span>
                    ) : (
                      <>
                        <span className="text-xs text-slate-400 font-normal">₨ </span>
                        {plan.pricePKR.toLocaleString()}
                        <span className="text-xs text-slate-400 font-normal"> PKR</span>
                      </>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Validity: {plan.validityDays} Days
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Daily Tasks:</span>
                    <strong className="text-cyan-400 font-mono">{plan.dailyTasks} Tasks</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Reward / Task:</span>
                    <strong className="text-emerald-400 font-mono">₨ 100 PKR</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Daily Income:</span>
                    <strong className="text-emerald-400 font-mono">₨ {plan.dailyEarningsPKR.toLocaleString()} PKR</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Monthly Income:</span>
                    <strong className="text-white font-mono font-bold">₨ {plan.monthlyEarningsPKR.toLocaleString()} PKR</strong>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Min. Cashout:</span>
                    <span className="text-slate-300 font-mono">₨ 500 (JazzCash)</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 pt-1 line-clamp-2">
                  {plan.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-3 border-t border-slate-800">
                {isCurrent ? (
                  <button
                    onClick={onNavigateToTasks}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/40 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <i className="fa-solid fa-list-check"></i>
                    <span>Start Tasks</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenBuyModal(plan)}
                    className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer ${
                      plan.popular
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-amber-950/40'
                        : 'bg-gradient-to-r from-cyan-600 to-[#10B981] hover:from-cyan-500 hover:to-emerald-500 text-white shadow-cyan-950/40'
                    }`}
                  >
                    <i className="fa-solid fa-cart-shopping text-xs"></i>
                    <span>Buy Plan (₨ {plan.pricePKR.toLocaleString()})</span>
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Plan Purchase Modal */}
      {selectedPlanForBuy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div
            className="relative w-full max-w-lg bg-[#0F172A] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#1E293B] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-lg">
                  <i className="fa-solid fa-crown"></i>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Buy {selectedPlanForBuy.name}</h3>
                  <div className="text-[11px] text-slate-400">
                    Price: ₨ {selectedPlanForBuy.pricePKR.toLocaleString()} PKR · {selectedPlanForBuy.dailyTasks} Tasks/Day
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedPlanForBuy(null)}
                className="w-8 h-8 rounded-lg border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>

            <form onSubmit={handleConfirmBuy} className="p-6 space-y-4 overflow-y-auto">
              
              {/* Payment Method Selector */}
              <div>
                <label className="text-xs text-slate-400 block mb-1.5 font-medium">Select Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('JazzCash')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      paymentMethod === 'JazzCash'
                        ? 'bg-slate-800 border-rose-500 text-rose-400 shadow-md ring-1 ring-rose-500'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                      <i className="fa-solid fa-bolt"></i>
                      <span>JazzCash (Official)</span>
                    </div>
                    <div className="text-[11px] font-mono text-white mt-1">
                      0326-2636289
                    </div>
                    <span className="text-[9px] text-emerald-400">Available</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Deposit Wallet')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      paymentMethod === 'Deposit Wallet'
                        ? 'bg-slate-800 border-cyan-400 text-cyan-300 shadow-md ring-1 ring-cyan-400'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                      <i className="fa-solid fa-wallet"></i>
                      <span>Deposit Wallet</span>
                    </div>
                    <div className="text-[11px] font-mono text-white mt-1">
                      ₨ {wallet.depositBalance.toFixed(2)}
                    </div>
                    <span className="text-[9px] text-slate-400">Instant Activate</span>
                  </button>
                </div>
              </div>

              {/* Easypaisa Not Available Alert */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                <i className="fa-solid fa-circle-info text-amber-400 text-sm shrink-0"></i>
                <span>
                  <strong>Easypaisa is currently not available</strong> (baad me add hoga). Please send payment to official JazzCash number <strong className="font-mono text-white">03262636289</strong>.
                </span>
              </div>

              {/* JazzCash Official Account Card */}
              {paymentMethod === 'JazzCash' && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="text-xs text-slate-300 font-semibold flex items-center justify-between">
                    <span>Send ₨ {selectedPlanForBuy.pricePKR.toLocaleString()} via JazzCash App / *786#</span>
                    <span className="text-[10px] text-emerald-400 font-mono">0% Fee</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div>
                      <span className="text-slate-500 text-[10px] block">JazzCash Mobile Number:</span>
                      <div className="font-mono text-emerald-400 font-bold text-sm flex items-center gap-2">
                        <span>0326-2636289</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText('03262636289');
                            alert('JazzCash number copied: 03262636289');
                          }}
                          className="text-slate-400 hover:text-white"
                          title="Copy"
                        >
                          <i className="fa-regular fa-copy text-xs"></i>
                        </button>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Account Title:</span>
                      <strong className="text-white text-xs">AR AdRewards Official</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Exact Amount:</span>
                      <strong className="text-cyan-400 font-mono font-bold text-xs">₨ {selectedPlanForBuy.pricePKR.toLocaleString()} PKR</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Plan Selected:</span>
                      <strong className="text-amber-400 text-xs">{selectedPlanForBuy.name}</strong>
                    </div>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="text-xs text-slate-300 block mb-1">
                        Your Sender JazzCash Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={senderNumber}
                        onChange={(e) => setSenderNumber(e.target.value)}
                        placeholder="03262636289"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 block mb-1">
                        JazzCash Transaction ID (TID / TXZ ID) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. JC-98234871 or 12-digit receipt number"
                        value={txId}
                        onChange={(e) => setTxId(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'Deposit Wallet' && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Your Deposit Balance:</span>
                    <span className="font-mono text-cyan-400 font-bold text-sm">₨ {wallet.depositBalance.toFixed(2)} PKR</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Plan Cost:</span>
                    <span className="font-mono text-white font-bold text-sm">₨ {selectedPlanForBuy.pricePKR.toFixed(2)} PKR</span>
                  </div>
                  {wallet.depositBalance < selectedPlanForBuy.pricePKR && (
                    <div className="text-rose-400 text-[11px] pt-1">
                      Insufficient balance. Please select JazzCash to send payment directly to 03262636289.
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPlanForBuy(null)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white text-xs cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || (paymentMethod === 'Deposit Wallet' && wallet.depositBalance < selectedPlanForBuy.pricePKR)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-500 to-cyan-500 hover:from-amber-600 hover:to-emerald-600 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-950/40 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i>
                      <span>Activating Plan...</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-bolt"></i>
                      <span>Confirm & Activate Plan (₨ {selectedPlanForBuy.pricePKR.toLocaleString()})</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
