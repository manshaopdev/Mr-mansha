import React, { useState } from 'react';
import { X, Sparkles, Gift, Crown, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../../audio/SoundEngine';

interface LuckRoyaleModalProps {
  diamonds: number;
  onUpdateDiamonds: (newVal: number) => void;
  onClose: () => void;
}

export const LuckRoyaleModal: React.FC<LuckRoyaleModalProps> = ({
  diamonds,
  onUpdateDiamonds,
  onClose,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rewardWon, setRewardWon] = useState<string | null>(null);

  const PRIZES = [
    '👑 MK KING Legendary Crown Bundle',
    '🔥 MP40 Predatory Cobra EVO Token Box (x50)',
    '💎 500 Bonus Diamond Voucher',
    '🧊 Ice Spike Gloo Wall Skin',
    '⚔️ Blood Moon Katana Skin',
    '🐧 Mr. Waggor Pet Emote',
  ];

  const handleSpin = (cost: number) => {
    if (diamonds < cost || isSpinning) return;
    soundEngine.playClick();
    onUpdateDiamonds(diamonds - cost);
    setIsSpinning(true);
    setRewardWon(null);

    setTimeout(() => {
      const prize = PRIZES[Math.floor(Math.random() * PRIZES.length)];
      setRewardWon(prize);
      setIsSpinning(false);
      soundEngine.playHeadshot();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FF3B30', '#00F0FF'],
      });
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 font-rajdhani select-none animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#14161f] border-2 border-amber-500/70 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/30 bg-gradient-to-r from-amber-950/60 via-neutral-900 to-amber-950/60">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎰</span>
            <h2 className="text-2xl font-russo text-ff-gold tracking-wider">LUCK ROYALE</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1 rounded-full border border-sky-400/40">
              <span className="text-sm">💎</span>
              <span className="text-sm font-russo text-sky-300 font-bold">{diamonds}</span>
            </div>
            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Spin Showcase */}
        <div className="p-8 flex flex-col items-center text-center">
          <div className="relative w-48 h-48 rounded-full border-4 border-amber-400/70 flex items-center justify-center mb-6 bg-gradient-to-br from-amber-950/50 via-black to-yellow-950/40 shadow-[0_0_30px_rgba(251,191,36,0.4)]">
            <div className={`text-6xl ${isSpinning ? 'animate-spin' : ''}`}>
              {isSpinning ? '✨' : rewardWon ? '🎁' : '👑'}
            </div>
          </div>

          {rewardWon ? (
            <div className="bg-amber-950/80 border-2 border-amber-400 rounded-xl p-4 mb-6 animate-bounce">
              <span className="text-xs font-chakra font-extrabold text-amber-300 uppercase tracking-widest">
                CONGRATULATIONS! YOU UNLOCKED:
              </span>
              <h3 className="text-2xl font-russo text-white mt-1">{rewardWon}</h3>
            </div>
          ) : (
            <p className="text-sm font-chakra text-white/70 mb-6">
              Spin to obtain the Legendary MK King Royale items & exclusive EVO gun crates!
            </p>
          )}

          {/* Spin Buttons */}
          <div className="flex items-center gap-4 w-full max-w-md">
            <button
              onClick={() => handleSpin(100)}
              disabled={diamonds < 100 || isSpinning}
              className="flex-1 clip-ff-btn bg-neutral-800 hover:bg-neutral-700 border border-amber-500/50 text-white font-russo text-sm py-3.5 flex flex-col items-center justify-center cursor-pointer transition-all active:scale-95 disabled:opacity-40"
            >
              <span>1 SPIN</span>
              <span className="text-xs font-chakra text-sky-400 flex items-center gap-1 font-bold">💎 100</span>
            </button>

            <button
              onClick={() => handleSpin(1000)}
              disabled={diamonds < 1000 || isSpinning}
              className="flex-1 clip-ff-btn bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-black font-russo text-sm py-3.5 flex flex-col items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.6)] transition-all active:scale-95 disabled:opacity-40"
            >
              <span>10 + 1 SPINS</span>
              <span className="text-xs font-chakra text-black font-black flex items-center gap-1">💎 1,000 (BONUS)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
