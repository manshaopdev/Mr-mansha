import React from 'react';
import { Character } from '../../types/game';
import { CHARACTERS } from '../../data/characters';
import { X, Check, Zap, Shield, Sparkles } from 'lucide-react';
import { soundEngine } from '../../audio/SoundEngine';

interface CharacterModalProps {
  selectedCharacter: Character;
  onSelectCharacter: (char: Character) => void;
  onClose: () => void;
}

export const CharacterModal: React.FC<CharacterModalProps> = ({
  selectedCharacter,
  onSelectCharacter,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 font-rajdhani select-none animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#12141a] border-2 border-amber-500/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-neutral-900 to-amber-950/40">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👑</span>
            <h2 className="text-2xl font-russo text-ff-gold tracking-wider">HERO LOADOUT & SKILLS</h2>
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

        {/* Modal Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 overflow-y-auto">
          {/* Character Selection Cards */}
          <div className="md:col-span-5 grid grid-cols-2 gap-3">
            {CHARACTERS.map((char) => {
              const isSelected = selectedCharacter.id === char.id;
              return (
                <button
                  key={char.id}
                  onClick={() => {
                    soundEngine.playClick();
                    onSelectCharacter(char);
                  }}
                  className={`group relative p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-950/60 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)] scale-102'
                      : 'bg-neutral-900/80 border-white/10 hover:border-amber-400/50 hover:bg-neutral-800/60'
                  }`}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg border-2"
                    style={{ borderColor: char.avatarColor, backgroundColor: `${char.avatarColor}20` }}
                  >
                    {char.icon}
                  </div>
                  <div>
                    <h3 className="font-russo text-sm text-white">{char.name}</h3>
                    <span className="text-[10px] font-chakra font-bold text-amber-400 uppercase tracking-wider">
                      {char.skillType}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center text-black shadow">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Character Skill & Lore Preview Panel */}
          <div className="md:col-span-7 bg-neutral-900/90 border border-amber-500/30 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-chakra font-bold text-amber-400 uppercase tracking-widest">
                  LEGENDARY HERO
                </span>
                <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-chakra text-xs font-bold border border-amber-500/30">
                  LEVEL 6 MAX
                </span>
              </div>

              <h3 className="text-3xl font-russo text-white mb-1">{selectedCharacter.name}</h3>
              <p className="text-sm font-rajdhani text-white/70 italic mb-6">{selectedCharacter.tagline}</p>

              {/* Skill Details Box */}
              <div className="bg-black/60 border border-white/10 rounded-xl p-5 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/60 flex items-center justify-center text-2xl">
                    {selectedCharacter.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-russo text-lg text-amber-300">{selectedCharacter.skillName}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded font-chakra font-bold bg-amber-500 text-black">
                        {selectedCharacter.skillType}
                      </span>
                    </div>
                    {selectedCharacter.skillCooldown > 0 && (
                      <span className="text-xs font-chakra text-white/50">
                        Cooldown: {selectedCharacter.skillCooldown}s • Duration: {selectedCharacter.skillDuration}s
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm font-rajdhani text-white/80 leading-relaxed">
                  {selectedCharacter.skillDescription}
                </p>
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
              EQUIP HERO SKILL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
