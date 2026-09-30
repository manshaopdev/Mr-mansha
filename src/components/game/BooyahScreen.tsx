import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MatchStats } from '../../types/game';
import { Trophy, Skull, Target, Clock, Zap, Crown } from 'lucide-react';

interface BooyahScreenProps {
  stats: MatchStats;
  onPlayAgain: () => void;
  onBackToLobby: () => void;
}

export const BooyahScreen: React.FC<BooyahScreenProps> = ({ stats, onPlayAgain, onBackToLobby }) => {
  useEffect(() => {
    // Launch celebratory golden fireworks confetti!
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#FF8C00', '#FF4500', '#00F0FF'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#FF8C00', '#FF4500', '#00F0FF'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const minutes = Math.floor(stats.survivalTimeSeconds / 60);
  const seconds = stats.survivalTimeSeconds % 60;
  const headshotRate = stats.kills > 0 ? Math.round((stats.headshots / stats.kills) * 100) : 0;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md font-rajdhani select-none animate-fade-in">
      {/* Background golden rays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,184,0,0.25)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative flex flex-col items-center max-w-xl w-full mx-4 p-8 text-center">
        {/* Crown Icon */}
        <div className="relative mb-2 animate-bounce">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-1 shadow-[0_0_35px_#f59e0b] flex items-center justify-center">
            <Crown className="w-12 h-12 text-black fill-black" />
          </div>
        </div>

        {/* Iconic BOOYAH! Title */}
        <div className="animate-booyah mb-4">
          <h1 className="text-7xl md:text-8xl font-russo tracking-wider text-ff-fire drop-shadow-[0_10px_30px_rgba(255,100,0,0.9)]">
            BOOYAH!
          </h1>
          <p className="text-base font-chakra uppercase tracking-widest text-amber-300 font-bold -mt-1">
            MK KING #1 SURVIVOR • CHAMPION OF BERMUDA
          </p>
        </div>

        {/* Rank Score & Tier Upgrade Banner */}
        <div className="w-full bg-gradient-to-r from-neutral-900/90 via-amber-950/60 to-neutral-900/90 border border-amber-500/50 rounded-xl p-4 mb-6 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎖️</span>
              <div className="text-left">
                <span className="text-xs font-chakra uppercase font-extrabold text-amber-400">TIER PROMOTION</span>
                <h4 className="text-lg font-russo text-white font-bold">GRANDMASTER III</h4>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-russo font-extrabold text-amber-400">+{stats.rankPointsGained} RP</span>
              <p className="text-[10px] font-chakra text-emerald-400 font-semibold">Tier Protection Active</p>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-black/80 rounded-full overflow-hidden border border-amber-500/30">
            <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 w-[84%] shadow-[0_0_10px_#f59e0b]" />
          </div>
        </div>

        {/* Match Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mb-8">
          {/* Kills */}
          <div className="bg-black/60 border border-white/10 rounded-lg p-3 flex flex-col items-center">
            <Skull className="w-5 h-5 text-red-400 mb-1" />
            <span className="text-[11px] font-chakra font-bold text-white/60 uppercase">KILLS</span>
            <span className="text-2xl font-russo text-white">{stats.kills}</span>
          </div>

          {/* Headshots */}
          <div className="bg-black/60 border border-white/10 rounded-lg p-3 flex flex-col items-center">
            <Target className="w-5 h-5 text-amber-400 mb-1" />
            <span className="text-[11px] font-chakra font-bold text-white/60 uppercase">HEADSHOTS</span>
            <span className="text-2xl font-russo text-amber-400">{headshotRate}%</span>
          </div>

          {/* Damage */}
          <div className="bg-black/60 border border-white/10 rounded-lg p-3 flex flex-col items-center">
            <Zap className="w-5 h-5 text-yellow-400 mb-1" />
            <span className="text-[11px] font-chakra font-bold text-white/60 uppercase">DAMAGE</span>
            <span className="text-2xl font-russo text-white">{stats.damage}</span>
          </div>

          {/* Survival Time */}
          <div className="bg-black/60 border border-white/10 rounded-lg p-3 flex flex-col items-center">
            <Clock className="w-5 h-5 text-sky-400 mb-1" />
            <span className="text-[11px] font-chakra font-bold text-white/60 uppercase">SURVIVAL</span>
            <span className="text-2xl font-russo text-white">
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 w-full">
          <button
            onClick={onBackToLobby}
            className="flex-1 clip-ff-btn bg-neutral-800 hover:bg-neutral-700 border border-white/20 text-white font-russo text-base py-3 cursor-pointer transition-all active:scale-95"
          >
            LOBBY
          </button>
          <button
            onClick={onPlayAgain}
            className="flex-1 clip-ff-btn bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-black font-russo text-base py-3 shadow-[0_0_20px_rgba(245,158,11,0.6)] cursor-pointer transition-all active:scale-95"
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    </div>
  );
};
