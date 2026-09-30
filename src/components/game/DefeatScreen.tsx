import React from 'react';
import { MatchStats } from '../../types/game';
import { Skull, Target, Zap, Clock } from 'lucide-react';

interface DefeatScreenProps {
  stats: MatchStats;
  onPlayAgain: () => void;
  onBackToLobby: () => void;
}

export const DefeatScreen: React.FC<DefeatScreenProps> = ({ stats, onPlayAgain, onBackToLobby }) => {
  const minutes = Math.floor(stats.survivalTimeSeconds / 60);
  const seconds = stats.survivalTimeSeconds % 60;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md font-rajdhani select-none animate-fade-in">
      <div className="relative flex flex-col items-center max-w-md w-full mx-4 p-8 text-center">
        {/* Skull badge */}
        <div className="w-16 h-16 rounded-full bg-red-950/80 border-2 border-red-500/80 flex items-center justify-center text-3xl mb-3 shadow-[0_0_25px_rgba(239,68,68,0.5)]">
          💀
        </div>

        {/* Defeat Header */}
        <h2 className="text-4xl font-russo text-red-500 tracking-wider mb-1">
          ELIMINATED
        </h2>
        <p className="text-lg font-chakra font-bold text-amber-400 mb-6">
          RANK #{stats.rank} / {stats.totalPlayers}
        </p>

        {/* Rank Points Change */}
        <div className="w-full bg-neutral-900/90 border border-neutral-700/80 rounded-xl p-3.5 mb-6 flex items-center justify-between">
          <span className="text-xs font-chakra font-bold text-white/70 uppercase">BATTLE SCORE</span>
          <span className={`text-xl font-russo font-bold ${stats.rankPointsGained >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {stats.rankPointsGained >= 0 ? `+${stats.rankPointsGained}` : stats.rankPointsGained} RP
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 w-full mb-8">
          <div className="bg-black/60 border border-white/10 rounded-lg p-2.5 flex flex-col items-center">
            <Skull className="w-4 h-4 text-red-400 mb-1" />
            <span className="text-[10px] font-chakra font-bold text-white/50">KILLS</span>
            <span className="text-xl font-russo text-white">{stats.kills}</span>
          </div>

          <div className="bg-black/60 border border-white/10 rounded-lg p-2.5 flex flex-col items-center">
            <Zap className="w-4 h-4 text-yellow-400 mb-1" />
            <span className="text-[10px] font-chakra font-bold text-white/50">DAMAGE</span>
            <span className="text-xl font-russo text-white">{stats.damage}</span>
          </div>

          <div className="bg-black/60 border border-white/10 rounded-lg p-2.5 flex flex-col items-center">
            <Clock className="w-4 h-4 text-sky-400 mb-1" />
            <span className="text-[10px] font-chakra font-bold text-white/50">TIME</span>
            <span className="text-xl font-russo text-white">
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 w-full">
          <button
            onClick={onBackToLobby}
            className="flex-1 clip-ff-btn bg-neutral-800 hover:bg-neutral-700 border border-white/20 text-white font-russo text-sm py-3 cursor-pointer transition-all active:scale-95"
          >
            LOBBY
          </button>
          <button
            onClick={onPlayAgain}
            className="flex-1 clip-ff-btn bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-russo text-sm py-3 cursor-pointer transition-all active:scale-95 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    </div>
  );
};
