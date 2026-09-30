import React from 'react';
import { Weapon } from '../../types/game';
import { ALL_WEAPONS } from '../../data/weapons';
import { X, Shield, Plus } from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';

interface ClashSquadShopProps {
  coins: number;
  roundNumber: number;
  onBuyWeapon: (weapon: Weapon, cost: number) => void;
  onBuyGlooWall: (cost: number) => void;
  onBuyVest: (cost: number) => void;
  onBuyHelmet: (cost: number) => void;
  onClose: () => void;
}

export const ClashSquadShop: React.FC<ClashSquadShopProps> = ({
  coins,
  roundNumber,
  onBuyWeapon,
  onBuyGlooWall,
  onBuyVest,
  onBuyHelmet,
  onClose,
}) => {
  const shopItems = [
    { type: 'weapon', weapon: ALL_WEAPONS[5], name: 'Desert Eagle', cost: 800, icon: '🔫' },
    { type: 'weapon', weapon: ALL_WEAPONS[0], name: 'MP40 Cobra', cost: 1700, icon: '⚡' },
    { type: 'weapon', weapon: ALL_WEAPONS[3], name: 'M1887 Shotgun', cost: 1900, icon: '💥' },
    { type: 'weapon', weapon: ALL_WEAPONS[1], name: 'AK-47 Draco', cost: 1800, icon: '🔥' },
    { type: 'weapon', weapon: ALL_WEAPONS[2], name: 'AWM Sniper', cost: 2400, icon: '🎯' },
  ];

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 font-rajdhani select-none animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#12141c] border-2 border-amber-500/70 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/30 bg-gradient-to-r from-amber-950/50 via-neutral-900 to-amber-950/50">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛒</span>
            <h3 className="text-xl font-russo text-ff-gold">CLASH SQUAD STORE • ROUND {roundNumber}</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-black/60 px-3 py-1 rounded-full border border-yellow-500/40 flex items-center gap-1.5">
              <span className="text-sm">🪙</span>
              <span className="text-sm font-russo text-yellow-300 font-bold">${coins}</span>
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

        {/* Store Grid */}
        <div className="p-6 flex flex-col gap-5">
          {/* Weapons */}
          <div>
            <h4 className="text-xs font-chakra font-extrabold text-amber-400 uppercase tracking-widest mb-3">
              PRIMARY WEAPONS
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {shopItems.map((item, idx) => {
                const canAfford = coins >= item.cost;
                return (
                  <button
                    key={idx}
                    disabled={!canAfford}
                    onClick={() => {
                      if (canAfford && item.weapon) {
                        soundEngine.playClick();
                        onBuyWeapon(item.weapon, item.cost);
                      }
                    }}
                    className={`p-3 rounded-xl border flex flex-col justify-between text-left transition-all cursor-pointer ${
                      canAfford
                        ? 'bg-neutral-900/80 border-white/20 hover:border-amber-400 hover:bg-neutral-800 active:scale-95'
                        : 'bg-neutral-950/50 border-white/5 opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <div>
                      <span className="text-xl mb-1 block">{item.icon}</span>
                      <h5 className="font-russo text-sm text-white">{item.name}</h5>
                      <span className="text-[10px] font-chakra text-white/50 uppercase">{item.weapon?.category}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-russo text-yellow-400 font-bold">${item.cost}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">BUY</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Armor & Utilities */}
          <div>
            <h4 className="text-xs font-chakra font-extrabold text-amber-400 uppercase tracking-widest mb-3">
              TACTICAL & ARMOR
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {/* Gloo Wall */}
              <button
                disabled={coins < 300}
                onClick={() => {
                  if (coins >= 300) {
                    soundEngine.playClick();
                    onBuyGlooWall(300);
                  }
                }}
                className="p-3 rounded-xl bg-neutral-900/80 border border-sky-400/40 hover:border-sky-400 flex flex-col justify-between text-left active:scale-95 transition-all disabled:opacity-40 cursor-pointer"
              >
                <div>
                  <span className="text-xl">🧊</span>
                  <h5 className="font-russo text-sm text-white">Gloo Wall (x1)</h5>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs font-russo text-yellow-400">$300</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">BUY</span>
                </div>
              </button>

              {/* Level 3 Vest */}
              <button
                disabled={coins < 600}
                onClick={() => {
                  if (coins >= 600) {
                    soundEngine.playClick();
                    onBuyVest(600);
                  }
                }}
                className="p-3 rounded-xl bg-neutral-900/80 border border-amber-400/40 hover:border-amber-400 flex flex-col justify-between text-left active:scale-95 transition-all disabled:opacity-40 cursor-pointer"
              >
                <div>
                  <Shield className="w-5 h-5 text-amber-400 mb-1" />
                  <h5 className="font-russo text-sm text-white">Level 3 Vest</h5>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs font-russo text-yellow-400">$600</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">BUY</span>
                </div>
              </button>

              {/* Level 3 Helmet */}
              <button
                disabled={coins < 500}
                onClick={() => {
                  if (coins >= 500) {
                    soundEngine.playClick();
                    onBuyHelmet(500);
                  }
                }}
                className="p-3 rounded-xl bg-neutral-900/80 border border-white/20 hover:border-white/40 flex flex-col justify-between text-left active:scale-95 transition-all disabled:opacity-40 cursor-pointer"
              >
                <div>
                  <span className="text-xl">🪖</span>
                  <h5 className="font-russo text-sm text-white">Level 3 Helmet</h5>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs font-russo text-yellow-400">$500</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/80 font-bold">BUY</span>
                </div>
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="w-full clip-ff-btn bg-gradient-to-r from-amber-500 to-orange-500 text-black font-russo text-sm py-3 cursor-pointer shadow-lg active:scale-98"
          >
            READY TO FIGHT!
          </button>
        </div>
      </div>
    </div>
  );
};
