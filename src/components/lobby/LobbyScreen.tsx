import React, { useState } from 'react';
import { Character, Weapon, Pet, GameMode } from '../../types/game';
import { CharacterModal } from './CharacterModal';
import { ArmoryModal } from './ArmoryModal';
import { PetModal } from './PetModal';
import { LuckRoyaleModal } from './LuckRoyaleModal';
import { SettingsModal } from './SettingsModal';
import { Lobby3DCharacter } from './Lobby3DCharacter';
import { soundEngine } from '../../audio/SoundEngine';
import { Crown, Sparkles, Volume2, VolumeX, Settings, Shield, Flame, Play, Crosshair } from 'lucide-react';

interface LobbyScreenProps {
  character: Character;
  weapon: Weapon;
  pet: Pet;
  diamonds: number;
  gold: number;
  gameMode: GameMode;
  onUpdateCharacter: (c: Character) => void;
  onUpdateWeapon: (w: Weapon) => void;
  onUpdatePet: (p: Pet) => void;
  onUpdateDiamonds: (d: number) => void;
  onSelectGameMode: (mode: GameMode) => void;
  onStartMatch: () => void;
}

export const LobbyScreen: React.FC<LobbyScreenProps> = ({
  character,
  weapon,
  pet,
  diamonds,
  gold,
  gameMode,
  onUpdateCharacter,
  onUpdateWeapon,
  onUpdatePet,
  onUpdateDiamonds,
  onSelectGameMode,
  onStartMatch,
}) => {
  const [activeModal, setActiveModal] = useState<'character' | 'armory' | 'pet' | 'royale' | 'settings' | null>(null);
  const [isMatchmaking, setIsMatchmaking] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());

  const handleStart = () => {
    soundEngine.playClick();
    setIsMatchmaking(true);
    soundEngine.playHeadshot();

    setTimeout(() => {
      onStartMatch();
    }, 1200);
  };

  const handleToggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundEngine.setMuted(next);
  };

  return (
    <div className="relative w-full h-screen bg-[#0b0d13] overflow-hidden font-rajdhani select-none text-white">
      {/* 1. Dramatic Free Fire Fire Ember Background */}
      <div className="absolute inset-0 bg-radial from-amber-950/40 via-[#0d0f17] to-black opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ff6600_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      {/* Floating fire particles effect */}
      <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-orange-600/15 via-amber-500/5 to-transparent pointer-events-none" />

      {/* 2. TOP NAVIGATION BAR */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-amber-500/20 bg-black/40 backdrop-blur-md">
        {/* User Profile Card */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-[0_0_15px_rgba(245,158,11,0.5)]">
              <div className="w-full h-full bg-neutral-900 rounded-[10px] flex items-center justify-center text-3xl">
                {character.icon}
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-black font-russo text-[9px] px-1.5 py-0.5 rounded-full font-bold">
              LV.74
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-russo tracking-wide text-white flex items-center gap-1.5">
                MK_KING_OP <span className="text-xs text-amber-400">👑</span>
              </h2>
              <span className="px-2 py-0.2 rounded bg-amber-500/20 border border-amber-500/40 text-[10px] font-chakra font-bold text-amber-300">
                GRANDMASTER
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs font-chakra text-white/60">
              <span>UID: 9481729482</span>
              <span>•</span>
              <span className="text-red-400">❤️ 1,842 Likes</span>
            </div>
          </div>
        </div>

        {/* Currency & System Controls */}
        <div className="flex items-center gap-4">
          {/* Gold Coins */}
          <div className="flex items-center gap-1.5 bg-black/60 px-3.5 py-1.5 rounded-lg border border-yellow-500/30 shadow-md">
            <span className="text-base text-yellow-400">🟡</span>
            <span className="font-russo text-sm text-yellow-200">{gold.toLocaleString()}</span>
          </div>

          {/* Diamonds */}
          <div className="flex items-center gap-1.5 bg-black/60 px-3.5 py-1.5 rounded-lg border border-sky-400/40 shadow-md">
            <span className="text-base">💎</span>
            <span className="font-russo text-sm text-sky-300">{diamonds.toLocaleString()}</span>
          </div>

          {/* Audio toggle */}
          <button
            onClick={handleToggleSound}
            className="w-10 h-10 rounded-lg bg-black/60 border border-white/20 hover:border-amber-400 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
          </button>

          {/* Settings Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveModal('settings');
            }}
            className="w-10 h-10 rounded-lg bg-black/60 border border-white/20 hover:border-amber-400 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
            title="Game Settings"
          >
            <Settings className="w-5 h-5 text-amber-400" />
          </button>
        </div>
      </header>

      {/* 3. MAIN LOBBY STAGE */}
      <div className="relative z-10 flex h-[calc(100vh-80px)] p-6">
        {/* Left Side Menu Action Buttons */}
        <div className="flex flex-col gap-3.5 z-20">
          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveModal('character');
            }}
            className="group flex items-center gap-3 px-4 py-2.5 rounded-xl bg-black/60 hover:bg-neutral-900 border border-white/10 hover:border-amber-400/80 transition-all cursor-pointer shadow-lg w-44 backdrop-blur-md active:scale-95"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">👑</span>
            <div className="text-left">
              <span className="text-sm font-russo text-white block group-hover:text-amber-400 transition-colors">HEROES</span>
              <span className="text-[10px] font-chakra text-white/50">{character.name}</span>
            </div>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveModal('armory');
            }}
            className="group flex items-center gap-3 px-4 py-2.5 rounded-xl bg-black/60 hover:bg-neutral-900 border border-white/10 hover:border-amber-400/80 transition-all cursor-pointer shadow-lg w-44 backdrop-blur-md active:scale-95"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">🔫</span>
            <div className="text-left">
              <span className="text-sm font-russo text-white block group-hover:text-amber-400 transition-colors">ARMORY</span>
              <span className="text-[10px] font-chakra text-white/50">{weapon.name}</span>
            </div>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveModal('pet');
            }}
            className="group flex items-center gap-3 px-4 py-2.5 rounded-xl bg-black/60 hover:bg-neutral-900 border border-white/10 hover:border-amber-400/80 transition-all cursor-pointer shadow-lg w-44 backdrop-blur-md active:scale-95"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">{pet.icon}</span>
            <div className="text-left">
              <span className="text-sm font-russo text-white block group-hover:text-amber-400 transition-colors">PET</span>
              <span className="text-[10px] font-chakra text-white/50">{pet.name}</span>
            </div>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveModal('royale');
            }}
            className="group flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-950/70 to-neutral-950/80 border border-amber-500/60 hover:border-amber-400 transition-all cursor-pointer shadow-lg w-44 backdrop-blur-md active:scale-95"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">🎰</span>
            <div className="text-left">
              <span className="text-sm font-russo text-amber-300 block">LUCK ROYALE</span>
              <span className="text-[10px] font-chakra text-sky-400 font-bold">SPIN TO WIN</span>
            </div>
          </button>
        </div>

        {/* Center: 3D Interactive Hero & Weapon & Pet Showcase */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-10">
          {/* Top Hero Name Badge */}
          <div className="absolute top-2 bg-black/75 border border-amber-500/50 px-6 py-2 rounded-2xl text-center shadow-xl backdrop-blur-md flex items-center gap-3">
            <span className="text-xl">👑</span>
            <div>
              <h3 className="text-2xl font-russo text-ff-gold tracking-wider">{character.name}</h3>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-xs font-chakra font-bold text-red-400">🔥 {weapon.name}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-950 text-amber-300 font-bold border border-red-500/40">
                  {weapon.skinName}
                </span>
              </div>
            </div>
          </div>

          {/* 3D Character Viewport */}
          <div className="w-full h-full max-h-[580px] flex items-center justify-center">
            <Lobby3DCharacter character={character} weapon={weapon} pet={pet} />
          </div>
        </div>

        {/* Right Side: Game Mode Selector & Big START Button */}
        <div className="flex flex-col justify-end gap-3.5 z-20 w-84">
          {/* Mode Selector Card */}
          <div className="bg-black/80 border border-amber-500/40 rounded-2xl p-4 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-chakra uppercase font-extrabold text-amber-400 tracking-wider">
                SELECT MATCH MODE
              </span>
              <span className="text-[10px] font-chakra px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                RANKED S34
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {/* Battle Royale Bermuda */}
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onSelectGameMode('battle_royale');
                }}
                className={`p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  gameMode === 'battle_royale'
                    ? 'bg-amber-950/60 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                    : 'bg-neutral-900/60 border-white/10 hover:border-white/30'
                }`}
              >
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-russo text-white">BERMUDA</span>
                    <span className="text-[10px] px-1.5 rounded bg-emerald-500/30 text-emerald-300 font-bold font-chakra">
                      50 PLAYERS
                    </span>
                  </div>
                  <span className="text-[11px] font-chakra text-white/50">Classic Battle Royale Survival</span>
                </div>
                <span className="text-xl">🏝️</span>
              </button>

              {/* Clash Squad */}
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onSelectGameMode('clash_squad');
                }}
                className={`p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  gameMode === 'clash_squad'
                    ? 'bg-amber-950/60 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                    : 'bg-neutral-900/60 border-white/10 hover:border-white/30'
                }`}
              >
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-russo text-white">CLASH SQUAD</span>
                    <span className="text-[10px] px-1.5 rounded bg-purple-500/30 text-purple-300 font-bold font-chakra">
                      4v4 RANKED
                    </span>
                  </div>
                  <span className="text-[11px] font-chakra text-white/50">Clock Tower Buy Phase Fight</span>
                </div>
                <span className="text-xl">⚔️</span>
              </button>

              {/* Lone Wolf 1v1 */}
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onSelectGameMode('lone_wolf');
                }}
                className={`p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  gameMode === 'lone_wolf'
                    ? 'bg-amber-950/60 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                    : 'bg-neutral-900/60 border-white/10 hover:border-white/30'
                }`}
              >
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-russo text-white">LONE WOLF</span>
                    <span className="text-[10px] px-1.5 rounded bg-red-500/30 text-red-300 font-bold font-chakra">
                      1v1 DUEL
                    </span>
                  </div>
                  <span className="text-[11px] font-chakra text-white/50">Iron Cage Best of 3 Rounds</span>
                </div>
                <span className="text-xl">🐺</span>
              </button>

              {/* Training */}
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onSelectGameMode('training');
                }}
                className={`p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  gameMode === 'training'
                    ? 'bg-amber-950/60 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                    : 'bg-neutral-900/60 border-white/10 hover:border-white/30'
                }`}
              >
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-russo text-white">TRAINING GROUND</span>
                  </div>
                  <span className="text-[11px] font-chakra text-white/50">Target Practice & Unlimited Ammo</span>
                </div>
                <span className="text-xl">🎯</span>
              </button>
            </div>
          </div>

          {/* Big START Matchmaking Button */}
          <button
            onClick={handleStart}
            disabled={isMatchmaking}
            className="w-full clip-ff-btn bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-black font-russo text-2xl py-4 shadow-[0_0_30px_rgba(245,158,11,0.8)] cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-75"
          >
            {isMatchmaking ? (
              <>
                <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin" />
                <span>MATCH FOUND! STARTING...</span>
              </>
            ) : (
              <>
                <Play className="w-7 h-7 fill-black" />
                <span>START MATCH</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* MODALS */}
      {activeModal === 'character' && (
        <CharacterModal
          selectedCharacter={character}
          onSelectCharacter={(c) => {
            onUpdateCharacter(c);
            setActiveModal(null);
          }}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'armory' && (
        <ArmoryModal
          selectedWeapon={weapon}
          onSelectWeapon={(w) => {
            onUpdateWeapon(w);
            setActiveModal(null);
          }}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'pet' && (
        <PetModal
          selectedPet={pet}
          onSelectPet={(p) => {
            onUpdatePet(p);
            setActiveModal(null);
          }}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'royale' && (
        <LuckRoyaleModal
          diamonds={diamonds}
          onUpdateDiamonds={onUpdateDiamonds}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'settings' && (
        <SettingsModal onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
};
