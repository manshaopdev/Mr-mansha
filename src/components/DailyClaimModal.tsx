import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { UserWallet, DailyClaimDay } from '../types/adRewards';
import { DAILY_CLAIM_SCHEDULE } from '../data/initialData';
import { soundFX } from '../utils/audio';

interface DailyClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: UserWallet;
  onClaimDayReward: (rewardPKR: number, dayNumber: number) => void;
  onSimulateAdvanceDay: () => void;
}

export const DailyClaimModal: React.FC<DailyClaimModalProps> = ({
  isOpen,
  onClose,
  wallet,
  onClaimDayReward,
  onSimulateAdvanceDay,
}) => {
  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const isClaimedToday = wallet.lastClaimDate === todayStr;

  // Current progressive day index (1 to 7 cycle)
  const currentCycleDay = ((wallet.streakDays - 1) % 7) + 1;
  const currentReward = DAILY_CLAIM_SCHEDULE.find((d) => d.day === currentCycleDay) || DAILY_CLAIM_SCHEDULE[0];

  // Countdown timer to midnight Pakistan time
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 7,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setHours(24, 0, 0, 0);
      const diff = tomorrow.getTime() - now.getTime();

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClaim = () => {
    if (isClaimedToday) return;

    soundFX.playRewardSuccess();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#F59E0B', '#06B6D4', '#FFFFFF'],
      });
    } catch {}

    onClaimDayReward(currentReward.rewardPKR, currentCycleDay);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-2xl bg-[#0F172A] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#1E293B] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-lg">
              <i className="fa-solid fa-calendar-check"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Day-by-Day Consecutive Login Reward</h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/30">
                  Day {currentCycleDay} of 7
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Log in daily to unlock escalating Pakistani Rupee bonuses. Reaching Day 7 grants the ₨ 300 Mega Jackpot!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Status Alert */}
          {isClaimedToday ? (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm">
                  <i className="fa-solid fa-check"></i>
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Today's Daily Reward Claimed!</span>
                  <span className="text-[11px] text-slate-400">
                    Come back tomorrow for your next consecutive bonus reward.
                  </span>
                </div>
              </div>

              <div className="text-right bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="text-[10px] uppercase text-slate-500 block">Next Claim in</span>
                <span className="font-mono-numbers text-xs font-bold text-cyan-400">
                  {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m :{' '}
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/40 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-300 block">Today's Reward is Ready to Claim!</span>
                <span className="text-[11px] text-slate-300">
                  Claim <strong className="text-emerald-400 font-mono">₨ {currentReward.rewardPKR.toFixed(2)} PKR</strong> to your wallet right now.
                </span>
              </div>
              <span className="font-mono-numbers text-xl font-extrabold text-[#10B981]">
                +₨ {currentReward.rewardPKR.toFixed(2)}
              </span>
            </div>
          )}

          {/* 7-Day Visual Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {DAILY_CLAIM_SCHEDULE.map((item) => {
              const isPast = item.day < currentCycleDay || (item.day === currentCycleDay && isClaimedToday);
              const isTodayActive = item.day === currentCycleDay && !isClaimedToday;
              const isFuture = item.day > currentCycleDay;

              return (
                <div
                  key={item.day}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col justify-between ${
                    isTodayActive
                      ? 'bg-gradient-to-b from-[#1E293B] to-slate-900 border-[#10B981] shadow-lg shadow-emerald-950/40 ring-2 ring-[#10B981]/50'
                      : isPast
                      ? 'bg-slate-900/60 border-slate-800 opacity-75'
                      : 'bg-[#1E293B]/40 border-slate-800/80'
                  }`}
                >
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">
                      Day {item.day}
                    </div>
                    <div className="my-2 text-xl">
                      {isPast ? (
                        <i className="fa-solid fa-circle-check text-emerald-400"></i>
                      ) : item.isSpecial ? (
                        <i className="fa-solid fa-crown text-amber-400 animate-bounce"></i>
                      ) : (
                        <i className="fa-solid fa-coins text-cyan-400"></i>
                      )}
                    </div>
                  </div>

                  <div>
                    <div
                      className={`font-mono-numbers text-xs font-bold ${
                        item.isSpecial ? 'text-amber-400' : isTodayActive ? 'text-emerald-400' : 'text-slate-300'
                      }`}
                    >
                      ₨ {item.rewardPKR.toFixed(0)}
                    </div>
                    <div className="text-[9px] text-slate-500 mt-0.5 truncate">
                      {item.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleClaim}
              disabled={isClaimedToday}
              className={`w-full flex-1 py-3 px-4 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isClaimedToday
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-gradient-to-r from-[#10B981] to-emerald-600 hover:from-emerald-600 text-white shadow-emerald-950/50'
              }`}
            >
              <i className={`fa-solid ${isClaimedToday ? 'fa-lock' : 'fa-gift'}`}></i>
              <span>
                {isClaimedToday
                  ? "Claimed Today · Come back tomorrow"
                  : `Claim Day ${currentCycleDay} Bonus (₨ ${currentReward.rewardPKR.toFixed(2)})`}
              </span>
            </button>

            {/* Developer / Tester Helper: Advance Next Day */}
            <button
              onClick={() => {
                onSimulateAdvanceDay();
                soundFX.playClick();
              }}
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              title="Test day-by-day streak progression immediately"
            >
              <i className="fa-solid fa-forward-step text-amber-400"></i>
              <span>Simulate Next Day →</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-fire text-amber-400"></i>
            <span>Current Active Streak: {wallet.streakDays} Consecutive Days</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
