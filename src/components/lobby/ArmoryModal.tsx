import React from 'react';
import { Weapon } from '../../types/game';
import { ALL_WEAPONS } from '../../data/weapons';
import { X, Check, Flame, Zap, Shield, Target } from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';

interface ArmoryModalProps {
  selectedWeapon: Weapon;
  onSelectWeapon: (weapon: Weapon) => void;
  onClose: () => void;
}

export const ArmoryModal: React.FC<ArmoryModalProps> = ({
  selectedWeapon,
  onSelectWeapon,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 font-rajdhani select-none animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#12141a] border-2 border-amber-500/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-neutral-900 to-amber-950/40">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔫</span>
            <h2 className="text-2xl font-russo text-ff-gold tracking-wider">WEAPON ARMORY & EVO SKINS</h2>
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

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 overflow-y-auto">
          {/* Weapons List */}
          <div className="md:col-span-5 flex flex-col gap-2.5">
            {ALL_WEAPONS.map((wpn) => {
              const isSelected = selectedWeapon.id === wpn.id;
              return (
                <button
                  key={wpn.id}
                  onClick={() => {
                    soundEngine.playClick();
                    onSelectWeapon(wpn);
                  }}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-950/60 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)] scale-102'
                      : 'bg-neutral-900/80 border-white/10 hover:border-amber-400/50 hover:bg-neutral-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg border"
                      style={{ borderColor: wpn.color, backgroundColor: `${wpn.color}25` }}
                    >
                      🔥
                    </div>
                    <div className="text-left">
                      <h4 className="font-russo text-sm text-white">{wpn.name}</h4>
                      <p className="text-[11px] font-chakra text-amber-400 font-semibold">{wpn.skinName}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-chakra font-bold bg-neutral-800 text-white/70 uppercase">
                    {wpn.category}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Weapon Details & Stats */}
          <div className="md:col-span-7 bg-neutral-900/90 border border-amber-500/30 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-chakra font-extrabold text-amber-400 uppercase tracking-widest">
                  {selectedWeapon.skinTier} EVO WEAPON
                </span>
                <span className="px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 font-chakra text-xs font-bold border border-red-500/40 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> MAX ATTRIBUTE
                </span>
              </div>

              <h3 className="text-4xl font-russo text-white mb-1">{selectedWeapon.name}</h3>
              <p className="text-lg font-chakra font-bold text-amber-400 mb-6">{selectedWeapon.skinName}</p>

              {/* Stat Bars */}
              <div className="flex flex-col gap-3.5 bg-black/60 border border-white/10 rounded-xl p-5 mb-6">
                {/* Damage */}
                <div>
                  <div className="flex justify-between text-xs font-chakra font-bold mb-1">
                    <span className="text-white/70">DAMAGE</span>
                    <span className="text-emerald-400">++ {selectedWeapon.damage}</span>
                  </div>
                  <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-green-400"
                      style={{ width: `${Math.min(100, (selectedWeapon.damage / 150) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Rate of Fire */}
                <div>
                  <div className="flex justify-between text-xs font-chakra font-bold mb-1">
                    <span className="text-white/70">RATE OF FIRE</span>
                    <span className="text-amber-400">++ {selectedWeapon.fireRate} rps</span>
                  </div>
                  <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-yellow-400"
                      style={{ width: `${Math.min(100, (selectedWeapon.fireRate / 16) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Range */}
                <div>
                  <div className="flex justify-between text-xs font-chakra font-bold mb-1">
                    <span className="text-white/70">EFFECTIVE RANGE</span>
                    <span className="text-sky-400">{selectedWeapon.range} m</span>
                  </div>
                  <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 to-blue-400"
                      style={{ width: `${Math.min(100, (selectedWeapon.range / 160) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Magazine Size */}
                <div>
                  <div className="flex justify-between text-xs font-chakra font-bold mb-1">
                    <span className="text-white/70">MAGAZINE</span>
                    <span className="text-white">{selectedWeapon.magazineSize} rounds</span>
                  </div>
                  <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-neutral-400 to-white"
                      style={{ width: `${Math.min(100, (selectedWeapon.magazineSize / 40) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Equip Button */}
            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="w-full clip-ff-btn bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-russo text-base py-3 cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all active:scale-98"
            >
              EQUIP PRIMARY WEAPON
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
