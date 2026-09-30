import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { AdCampaign } from '../types/adRewards';
import { soundFX } from '../utils/audio';

interface InteractiveAdModalProps {
  ad: AdCampaign | null;
  isOpen: boolean;
  onClose: () => void;
  onRewardClaimed: (rewardAmountPKR: number, adId: string, adTitle: string) => void;
}

interface MathProblem {
  num1: number;
  num2: number;
  operator: '+' | '-';
  solution: number;
}

export const InteractiveAdModal: React.FC<InteractiveAdModalProps> = ({
  ad,
  isOpen,
  onClose,
  onRewardClaimed
}) => {
  if (!isOpen || !ad) return null;

  const [timeLeft, setTimeLeft] = useState<number>(ad.durationSeconds || 15);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [captcha, setCaptcha] = useState<MathProblem>({ num1: 5, num2: 3, operator: '+', solution: 8 });
  const [captchaInput, setCaptchaInput] = useState<string>('');
  const [captchaError, setCaptchaError] = useState<string>('');
  const [isTabFocused, setIsTabFocused] = useState<boolean>(true);
  const [claimedSuccess, setClaimedSuccess] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate random math captcha
  const generateCaptcha = () => {
    const isAddition = Math.random() > 0.3;
    let n1 = Math.floor(Math.random() * 12) + 2;
    let n2 = Math.floor(Math.random() * 9) + 1;
    
    if (!isAddition && n1 < n2) {
      const temp = n1;
      n1 = n2;
      n2 = temp;
    }

    const sol = isAddition ? n1 + n2 : n1 - n2;
    setCaptcha({
      num1: n1,
      num2: n2,
      operator: isAddition ? '+' : '-',
      solution: sol
    });
    setCaptchaInput('');
    setCaptchaError('');
  };

  // Reset state whenever modal opens or new ad is loaded
  useEffect(() => {
    if (isOpen) {
      setTimeLeft(ad.durationSeconds || 15);
      setIsCompleted(false);
      setClaimedSuccess(false);
      setCaptchaError('');
      setCaptchaInput('');
      generateCaptcha();
    }
  }, [isOpen, ad]);

  // Window visibility / Anti-cheat focus detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsTabFocused(false);
      } else {
        setIsTabFocused(true);
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    return () => window.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // 15-second countdown timer
  useEffect(() => {
    if (!isOpen || isCompleted || claimedSuccess) return;

    if (!isTabFocused) {
      // Pause timer when tab is not focused to prevent passive background farming
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout);
          setIsCompleted(true);
          soundFX.playClick();
          return 0;
        }
        soundFX.playTick();
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isCompleted, isTabFocused, claimedSuccess]);

  // Handle Captcha Verification
  const handleVerifyCaptcha = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const userAnswer = parseInt(captchaInput.trim(), 10);

    if (isNaN(userAnswer)) {
      setCaptchaError('Please enter a valid numeric answer');
      soundFX.playError();
      return;
    }

    if (userAnswer === captcha.solution) {
      // Success!
      soundFX.playRewardSuccess();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10B981', '#06B6D4', '#F8FAFC', '#FBBF24']
        });
      } catch {
        // Confetti fallback
      }

      setClaimedSuccess(true);
      onRewardClaimed(ad.rewardPKR, ad.id, ad.title);

      setTimeout(() => {
        onClose();
      }, 2200);
    } else {
      setCaptchaError('Incorrect math answer. Please try again!');
      soundFX.playError();
      generateCaptcha();
    }
  };

  const progressPercent = Math.min(
    100,
    Math.round(((ad.durationSeconds - timeLeft) / ad.durationSeconds) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-4xl bg-[#0F172A] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Control Bar with Countdown and Reward Badge */}
        <div className="px-4 py-3 sm:px-6 bg-[#1E293B]/90 border-b border-slate-800 flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[#10B981] flex items-center justify-center">
              <i className="fa-solid fa-bolt text-sm"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white tracking-wide truncate max-w-[200px] sm:max-w-md">
                  {ad.title}
                </span>
                <span className="hidden sm:inline text-slate-500">·</span>
                <span className="hidden sm:inline text-[11px] text-slate-400">
                  {ad.advertiserName}
                </span>
              </div>
              <div className="text-[11px] text-emerald-400 font-mono-numbers flex items-center gap-1.5 font-medium">
                <span>Earn ₨ {ad.rewardPKR.toFixed(2)} PKR</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400">15s Task Session</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Countdown Badge */}
            {!isCompleted ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 font-mono-numbers">
                <i className="fa-solid fa-clock text-cyan-400 text-xs animate-pulse"></i>
                <span className="text-sm font-bold text-white tracking-wider">
                  00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                </span>
              </div>
            ) : (
              <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                <i className="fa-solid fa-circle-check"></i>
                <span>Ready for Reward</span>
              </div>
            )}

            {/* Close Button (disabled while timer is running to maintain ad viewing integrity) */}
            <button
              onClick={onClose}
              className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${
                isCompleted || claimedSuccess
                  ? 'border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'border-slate-800 text-slate-600 hover:text-slate-400 hover:bg-slate-900 cursor-pointer'
              }`}
              title={isCompleted ? 'Close viewer' : 'Cancel ad (no earnings)'}
            >
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>
          </div>

        </div>

        {/* Real-Time Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5 relative overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#06B6D4] to-[#10B981] transition-all duration-300 ease-linear shadow-[0_0_10px_#10B981]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Tab Inactive Warning Alert */}
        {!isTabFocused && !isCompleted && (
          <div className="bg-amber-500/20 border-b border-amber-500/30 px-4 py-2 flex items-center justify-between text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-triangle-exclamation text-amber-400"></i>
              <span>Timer paused! Please keep this browser tab active to earn your ₨ {ad.rewardPKR.toFixed(2)} reward.</span>
            </div>
            <span className="text-[10px] text-amber-400 uppercase font-mono tracking-wider font-semibold">Anti-Bot Guard</span>
          </div>
        )}

        {/* Modal Center Body: Simulated Browser / Video Viewport */}
        <div className="flex-1 relative overflow-hidden bg-slate-950 flex flex-col">
          
          {/* Simulated Browser Address Bar */}
          <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 mr-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
              </div>
              <i className="fa-solid fa-lock text-[10px] text-emerald-400"></i>
              <span className="font-mono text-[11px] text-slate-300 truncate max-w-xs sm:max-w-md">
                {ad.targetUrl}
              </span>
            </div>
            <a
              href={ad.targetUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>Visit Site</span>
              <i className="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
            </a>
          </div>

          {/* Ad Content Display Area */}
          <div className="flex-1 relative overflow-y-auto min-h-[300px] sm:min-h-[380px] flex items-center justify-center p-4">
            
            {/* Visual Thumbnail & Rich Campaign Showcase */}
            <div className="w-full max-w-2xl bg-[#1E293B] border border-slate-700/80 rounded-xl overflow-hidden shadow-xl">
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                <img 
                  src={ad.thumbnail} 
                  alt={ad.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Simulated Play Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-between p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-[11px] text-white font-medium border border-white/10">
                      Sponsored Showcase
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/90 text-slate-950 font-bold text-xs">
                      ₨ {ad.rewardPKR.toFixed(2)} Payout
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow-md">
                      {ad.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 mt-1 drop-shadow">
                      {ad.description}
                    </p>
                  </div>
                </div>

                {/* Animated Pulsing Live Ad Indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-[10px] text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Verifying View</span>
                </div>
              </div>

              {/* Campaign Highlights Bar */}
              <div className="p-4 bg-slate-800/80 border-t border-slate-700/60 flex items-center justify-between flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-3 text-slate-400">
                  <span>Category: <strong className="text-slate-200">{ad.category}</strong></span>
                  <span>·</span>
                  <span>Target: <strong className="text-slate-200">Pakistan</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={ad.targetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600/30 border border-cyan-500/30 font-medium transition-colors flex items-center gap-1.5"
                  >
                    <span>Open in new tab</span>
                    <i className="fa-solid fa-external-link text-[10px]"></i>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Anti-Bot Math Captcha Overlay (Appears when 15s timer completes) */}
          {isCompleted && !claimedSuccess && (
            <div className="absolute inset-0 bg-[#0F172A]/95 backdrop-blur-lg flex items-center justify-center p-4 z-20 animate-fadeIn">
              <div className="w-full max-w-md bg-[#1E293B] border border-slate-700 rounded-2xl p-6 shadow-2xl text-center">
                
                <div className="w-12 h-12 mx-auto rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] flex items-center justify-center text-xl mb-3">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>

                <h3 className="text-lg font-bold text-white">
                  15-Second Ad Completed!
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Solve this quick math challenge to verify human presence and credit <strong className="text-emerald-400">₨ {ad.rewardPKR.toFixed(2)}</strong> to your wallet.
                </p>

                {/* Math Captcha Equation Box */}
                <div className="my-5 p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center gap-4">
                  <div className="font-mono-numbers text-3xl font-extrabold text-white tracking-widest bg-slate-950 px-6 py-2.5 rounded-lg border border-slate-800 shadow-inner">
                    {captcha.num1} {captcha.operator} {captcha.num2} = ?
                  </div>
                  <button
                    type="button"
                    onClick={generateCaptcha}
                    className="w-9 h-9 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors"
                    title="Change math question"
                  >
                    <i className="fa-solid fa-arrows-rotate text-xs"></i>
                  </button>
                </div>

                {/* Captcha Input Form */}
                <form onSubmit={handleVerifyCaptcha} className="space-y-4">
                  <div>
                    <input
                      type="number"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      placeholder="Enter the answer here..."
                      autoFocus
                      className="w-full text-center px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-lg font-mono-numbers text-white focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]"
                    />
                    {captchaError && (
                      <p className="text-xs text-rose-400 mt-1.5 flex items-center justify-center gap-1">
                        <i className="fa-solid fa-circle-exclamation text-[10px]"></i>
                        <span>{captchaError}</span>
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-[#10B981] to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-check"></i>
                    <span>Verify & Claim ₨ {ad.rewardPKR.toFixed(2)} Task Reward</span>
                  </button>
                </form>

              </div>
            </div>
          )}

          {/* Reward Success Splash */}
          {claimedSuccess && (
            <div className="absolute inset-0 bg-[#0F172A]/95 backdrop-blur-lg flex items-center justify-center p-4 z-30">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-[#10B981] border border-emerald-500/40 flex items-center justify-center text-3xl animate-bounce">
                  <i className="fa-solid fa-coins"></i>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  ₨ {ad.rewardPKR.toFixed(2)} Credited!
                </h3>
                <p className="text-sm text-slate-300">
                  Reward successfully added to your real-time earnings balance.
                </p>
                <div className="pt-2">
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
                    Session Verified · Anti-Bot Passed
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Info */}
        <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-shield-check text-[#10B981]"></i>
            <span>AR AdRewards Platform Security · 50% Profit Arbitrage Reserve</span>
          </div>
          <div className="font-mono-numbers">
            AD ID: #{ad.id}
          </div>
        </div>

      </div>
    </div>
  );
};
