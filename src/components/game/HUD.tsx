import React, { useState, useEffect } from 'react';
import { Weapon, ZoneState, KillFeedEvent, DamageNumber } from '../../types/game';
import { MiniMap } from './MiniMap';
import { Shield, Crosshair, Zap, Heart, Disc3, Cross, ArrowUp, RefreshCw, Eye } from 'lucide-react';

interface HUDProps {
  hp: number;
  maxHp: number;
  ep: number;
  maxEp: number;
  vestLevel: number;
  helmetLevel: number;
  glooWalls: number;
  medkits: number;
  aliveCount: number;
  kills: number;
  weapons: Weapon[];
  currentWeaponIndex: number;
  currentAmmo: number;
  reserveAmmo: number;
  zone: ZoneState;
  killFeed: KillFeedEvent[];
  damageNumbers: DamageNumber[];
  isAimingAtEnemy: boolean;
  isAimingAtHead: boolean;
  isSkydiving: boolean;
  altitude: number;
  playerPos: { x: number; z: number; yaw: number };
  gameMode?: string;
  cameraViewMode?: 'tpp_wide' | 'tpp_normal' | 'tpp_close';
  onFire: (isDragUpward?: boolean) => void;
  onDeployGlooWall: () => void;
  onUseMedkit: () => void;
  onActivateSkill: () => void;
  onSelectWeapon: (idx: number) => void;
  onReload: () => void;
  onToggleScope: () => void;
  onJump: () => void;
  onToggleCrouch: () => void;
  onToggleSprint: (sprint: boolean) => void;
  onOpenParachute: () => void;
  onToggleCameraView?: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  hp,
  maxHp,
  ep,
  maxEp,
  vestLevel,
  helmetLevel,
  glooWalls,
  medkits,
  aliveCount,
  kills,
  weapons,
  currentWeaponIndex,
  currentAmmo,
  reserveAmmo,
  zone,
  killFeed,
  damageNumbers,
  isAimingAtEnemy,
  isAimingAtHead,
  isSkydiving,
  altitude,
  playerPos,
  gameMode = 'battle_royale',
  cameraViewMode = 'tpp_wide',
  onFire,
  onDeployGlooWall,
  onUseMedkit,
  onActivateSkill,
  onSelectWeapon,
  onReload,
  onToggleScope,
  onJump,
  onToggleCrouch,
  onToggleSprint,
  onOpenParachute,
  onToggleCameraView,
}) => {
  const [isScoped, setIsScoped] = useState(false);
  const [isSprintingState, setIsSprintingState] = useState(false);
  const [dragStartY, setDragStartY] = useState<number | null>(null);

  const curWeapon = weapons[currentWeaponIndex] || weapons[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyV' && onToggleCameraView) {
        onToggleCameraView();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggleCameraView]);

  const handleScopeClick = () => {
    setIsScoped(!isScoped);
    onToggleScope();
  };

  const handleSprintToggle = () => {
    const next = !isSprintingState;
    setIsSprintingState(next);
    onToggleSprint(next);
  };

  // Drag Headshot Fire button logic (Free Fire Drag-Up feature)
  const handleFirePointerDown = (e: React.PointerEvent) => {
    setDragStartY(e.clientY);
    onFire(false);
  };

  const handleFirePointerMove = (e: React.PointerEvent) => {
    if (dragStartY !== null && dragStartY - e.clientY > 25) {
      // Dragged upwards! Critical headshot trigger!
      onFire(true);
      setDragStartY(null);
    }
  };

  const handleFirePointerUp = () => {
    setDragStartY(null);
  };

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden font-rajdhani">
      {/* 1. TOP HEADER: Minimap, Alive/Kills, Kill Feed */}
      <div className="absolute top-3 left-4 right-4 flex items-start justify-between z-20">
        {/* Top-Left: MiniMap */}
        <div className="pointer-events-auto">
          <MiniMap
            playerX={playerPos.x}
            playerZ={playerPos.z}
            playerYaw={playerPos.yaw}
            zone={zone}
          />
        </div>

        {/* Top-Center: Alive & Kills Free Fire Style Badges */}
        <div className="flex flex-col items-center gap-1.5">
          {/* Game Mode Title Tag */}
          <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/70 border border-amber-500/50 text-[10px] font-chakra font-extrabold text-amber-300 uppercase tracking-widest shadow">
            {gameMode === 'clash_squad'
              ? '⚔️ CLASH SQUAD 4v4'
              : gameMode === 'lone_wolf'
              ? '🐺 LONE WOLF 1v1 DUEL'
              : gameMode === 'training'
              ? '🎯 TARGET PRACTICE RANGE'
              : '🏝️ BERMUDA BATTLE ROYALE'}
          </div>

          <div className="flex items-center gap-2">
            {/* Alive Badge */}
            <div className="clip-ff-badge bg-black/80 border border-amber-500/80 px-3.5 py-1 flex items-center gap-2 shadow-lg backdrop-blur-md">
              <span className="text-xs uppercase font-chakra tracking-widest text-amber-400 font-extrabold">ALIVE</span>
              <span className="text-xl font-russo font-bold text-white tracking-wide">{aliveCount}</span>
            </div>

            {/* Kill Badge with Skull */}
            <div className="clip-ff-badge bg-gradient-to-r from-red-950/90 to-black/90 border border-red-500/80 px-3.5 py-1 flex items-center gap-2 shadow-lg backdrop-blur-md">
              <span className="text-base text-red-500">💀</span>
              <span className="text-xs uppercase font-chakra tracking-widest text-red-400 font-extrabold">KILL</span>
              <span className="text-xl font-russo font-bold text-red-100">{kills}</span>
            </div>
          </div>

          {/* Zone Countdown Box */}
          <div className="bg-black/70 border border-amber-500/50 px-3 py-0.5 rounded text-[11px] font-chakra font-semibold text-amber-300/90 tracking-wide flex items-center gap-1.5 shadow">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            {zone.isShrinking
              ? `Safe Zone Shrinking (${Math.max(0, Math.ceil(zone.timeRemaining))}s)`
              : `Next Safe Zone in ${Math.max(0, Math.ceil(zone.timeRemaining))}s`}
          </div>
        </div>

        {/* Top-Right: Kill Feed Stream */}
        <div className="flex flex-col items-end gap-1.5 max-w-[280px]">
          {killFeed.slice(-3).map((item) => (
            <div
              key={item.id}
              className={`text-xs px-2.5 py-1 rounded backdrop-blur-md border flex items-center gap-1.5 shadow-md animate-fade-in ${
                item.isPlayerKiller
                  ? 'bg-amber-950/90 border-amber-400 text-amber-200'
                  : item.isPlayerVictim
                  ? 'bg-red-950/90 border-red-500 text-red-200'
                  : 'bg-black/60 border-white/10 text-white/80'
              }`}
            >
              <span className="font-bold text-white truncate max-w-[80px]">{item.killer}</span>
              <span className="text-[10px] px-1 py-0.5 rounded bg-black/60 font-chakra text-amber-400 font-semibold">{item.weaponName}</span>
              {item.isHeadshot && <span className="text-xs text-red-500 font-bold">💀</span>}
              <span className="text-white/50 text-[10px]">killed</span>
              <span className="font-bold truncate max-w-[80px] text-white/90">{item.victim}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. CENTER: Free Fire Crosshair & Hit Indicators & Floating Damage */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Free Fire Signature Crosshair (turns glowing RED on enemy target!) */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          {/* Central Aim Dot */}
          <div
            className={`w-1.5 h-1.5 rounded-full transition-all duration-75 ${
              isAimingAtHead
                ? 'bg-red-500 scale-150 shadow-[0_0_12px_#ff0000]'
                : isAimingAtEnemy
                ? 'bg-red-400 scale-125 shadow-[0_0_8px_#ff2222]'
                : 'bg-white/85'
            }`}
          />

          {/* Crosshair 4 Brackets */}
          <div
            className={`absolute top-0 w-0.5 h-2.5 transition-colors ${
              isAimingAtEnemy ? 'bg-red-500 shadow-[0_0_6px_#ff0000]' : 'bg-white/70'
            }`}
          />
          <div
            className={`absolute bottom-0 w-0.5 h-2.5 transition-colors ${
              isAimingAtEnemy ? 'bg-red-500 shadow-[0_0_6px_#ff0000]' : 'bg-white/70'
            }`}
          />
          <div
            className={`absolute left-0 w-2.5 h-0.5 transition-colors ${
              isAimingAtEnemy ? 'bg-red-500 shadow-[0_0_6px_#ff0000]' : 'bg-white/70'
            }`}
          />
          <div
            className={`absolute right-0 w-2.5 h-0.5 transition-colors ${
              isAimingAtEnemy ? 'bg-red-500 shadow-[0_0_6px_#ff0000]' : 'bg-white/70'
            }`}
          />

          {/* Red Aim Lock Triangle Bracket when on target */}
          {isAimingAtEnemy && (
            <div className="absolute inset-0 border border-red-500 rounded-sm animate-ping opacity-75" />
          )}
        </div>

        {/* Floating Red Headshot / Yellow Body Damage Numbers */}
        {damageNumbers.map((dmg) => (
          <div
            key={dmg.id}
            className={`absolute font-russo font-extrabold text-xl pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,1)] ${
              dmg.isHeadshot
                ? 'text-red-500 text-3xl animate-bounce shadow-red-500/80 scale-125'
                : 'text-amber-300 text-2xl'
            }`}
            style={{
              left: `${dmg.x}px`,
              top: `${dmg.y}px`,
              opacity: dmg.opacity,
            }}
          >
            {dmg.isHeadshot ? `💀 ${dmg.amount}` : dmg.amount}
          </div>
        ))}

        {/* ADS Scope Overlay (When Scoped) */}
        {isScoped && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {/* Outer Dark Vignette */}
            <div className="absolute inset-0 bg-black/60" />
            {/* Scope Circle */}
            <div className="relative w-[360px] h-[360px] rounded-full border-4 border-black/90 shadow-[0_0_0_1000px_rgba(0,0,0,0.85)] flex items-center justify-center overflow-hidden">
              {/* Reticle Lines */}
              <div className="absolute w-full h-[1px] bg-red-500/80" />
              <div className="absolute h-full w-[1px] bg-red-500/80" />
              <div className="w-16 h-16 rounded-full border border-red-500/50" />
              <div className="w-32 h-32 rounded-full border border-red-500/20" />
              <span className="absolute bottom-6 text-[10px] font-mono text-red-400/80 font-bold">4x COMBAT OPTIC</span>
            </div>
          </div>
        )}
      </div>

      {/* 3. SKYDIVING OVERLAY (When falling from plane) */}
      {isSkydiving && (
        <div className="absolute inset-x-0 bottom-24 flex flex-col items-center gap-3 z-30 pointer-events-auto">
          {/* Altitude Gauge */}
          <div className="bg-black/80 border border-amber-500/80 px-6 py-2 rounded-xl flex items-center gap-4 backdrop-blur-md shadow-2xl">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-chakra text-amber-400 font-bold">ALTITUDE</span>
              <span className="text-2xl font-russo text-white">{altitude} M</span>
            </div>
            <div className="w-36 h-3 bg-neutral-800 rounded-full overflow-hidden border border-white/20">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-100"
                style={{ width: `${Math.min(100, (altitude / 350) * 100)}%` }}
              />
            </div>
          </div>

          {/* Big Parachute Button */}
          <button
            onClick={onOpenParachute}
            className="clip-ff-btn bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-black font-russo text-lg tracking-wider px-8 py-3 shadow-[0_0_20px_rgba(245,158,11,0.6)] cursor-pointer active:scale-95 transition-all"
          >
            OPEN PARACHUTE [SPACE]
          </button>
        </div>
      )}

      {/* 4. BOTTOM-CENTER: Free Fire EP & HP Bars, Armor Status */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20 w-[340px]">
        {/* Armor & Helmet badges */}
        <div className="flex items-center gap-4 text-xs font-chakra font-bold text-white/80">
          <div className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded border border-white/10">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>VEST LV.{vestLevel}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded border border-white/10">
            <span className="text-xs">🪖</span>
            <span>HELMET LV.{helmetLevel}</span>
          </div>
        </div>

        {/* EP Bar (Yellow) */}
        <div className="w-full flex items-center gap-2">
          <span className="text-[11px] font-chakra font-extrabold text-amber-400 w-5 text-right">EP</span>
          <div className="flex-1 h-2 bg-black/80 rounded-sm overflow-hidden border border-amber-500/40 p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-150"
              style={{ width: `${(ep / maxEp) * 100}%` }}
            />
          </div>
          <span className="text-[11px] font-chakra font-bold text-amber-300 w-14 text-left">{ep}/{maxEp}</span>
        </div>

        {/* HP Bar (Green / White Free Fire Health) */}
        <div className="w-full flex items-center gap-2">
          <span className="text-[11px] font-chakra font-extrabold text-emerald-400 w-5 text-right">HP</span>
          <div className="flex-1 h-3.5 bg-black/90 rounded-sm overflow-hidden border border-white/30 p-[1px] shadow-inner">
            <div
              className={`h-full transition-all duration-150 ${
                hp < 50
                  ? 'bg-gradient-to-r from-red-600 to-red-400 animate-pulse'
                  : 'bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-300'
              }`}
              style={{ width: `${(hp / maxHp) * 100}%` }}
            />
          </div>
          <span className="text-sm font-russo text-white w-14 text-left font-bold">{Math.round(hp)}/{maxHp}</span>
        </div>
      </div>

      {/* 5. BOTTOM-LEFT: Tactical Buttons (Gloo Wall, Medkit, Active Skill) */}
      <div className="absolute bottom-5 left-6 flex items-end gap-3 pointer-events-auto z-20">
        {/* Free Fire Gloo Wall quick deploy button */}
        <button
          onClick={onDeployGlooWall}
          className="group relative flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-b from-sky-900/90 to-blue-950/90 border-2 border-sky-400/80 shadow-[0_0_15px_rgba(56,189,248,0.4)] active:scale-95 transition-all cursor-pointer"
          title="Deploy Gloo Wall (Ice barrier)"
        >
          <span className="text-2xl">🧊</span>
          <span className="text-[10px] font-chakra font-extrabold text-sky-300 tracking-wider">GLOO [G]</span>
          {/* Badge count */}
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-sky-500 border border-white font-russo text-xs font-bold text-white flex items-center justify-center shadow">
            {glooWalls}
          </div>
        </button>

        {/* Medkit button */}
        <button
          onClick={onUseMedkit}
          className="group relative flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-b from-emerald-950/90 to-green-950/90 border-2 border-emerald-400/80 shadow-[0_0_15px_rgba(52,211,153,0.3)] active:scale-95 transition-all cursor-pointer"
          title="Use Medkit (+75 HP)"
        >
          <Cross className="w-6 h-6 text-emerald-400" />
          <span className="text-[10px] font-chakra font-extrabold text-emerald-300">MED [F]</span>
          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-emerald-500 border border-white font-russo text-xs font-bold text-white flex items-center justify-center shadow">
            {medkits}
          </div>
        </button>

        {/* Active Skill Button (MK King's Wrath / Alok) */}
        <button
          onClick={onActivateSkill}
          className="group relative flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-b from-amber-950/90 to-yellow-950/90 border-2 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)] active:scale-95 transition-all cursor-pointer"
          title="Activate Hero Skill"
        >
          <span className="text-2xl">👑</span>
          <span className="text-[10px] font-chakra font-extrabold text-amber-300">SKILL [E]</span>
        </button>
      </div>

      {/* 6. BOTTOM-RIGHT: Weapons Bar, Ammo Counter, Fire Button & Movement Controls */}
      <div className="absolute bottom-5 right-6 flex items-end gap-4 pointer-events-auto z-20">
        {/* Weapon Slots (Slot 1, Slot 2, Melee) */}
        <div className="flex flex-col gap-2">
          {weapons.map((w, idx) => {
            const isSelected = currentWeaponIndex === idx;
            return (
              <button
                key={w.id}
                onClick={() => onSelectWeapon(idx)}
                className={`flex items-center justify-between px-3 py-1.5 rounded-lg border transition-all cursor-pointer w-44 backdrop-blur-md ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-950/90 to-black/90 border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.5)] scale-105'
                    : 'bg-black/60 border-white/20 hover:border-white/50 opacity-70'
                }`}
              >
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-chakra font-bold text-amber-400">{idx + 1}</span>
                    <span className="text-sm font-russo font-bold text-white tracking-wide">{w.name}</span>
                  </div>
                  <span className="text-[9px] text-amber-300/80 font-chakra uppercase">{w.skinTier}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-russo text-white font-bold">{w.currentAmmo}</span>
                  <span className="text-[10px] text-white/50">/{w.reserveAmmo}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Reload button */}
        <button
          onClick={onReload}
          className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-black/70 border border-white/30 text-white/90 hover:border-amber-400 active:scale-95 transition-all cursor-pointer shadow"
          title="Reload Weapon [R]"
        >
          <RefreshCw className="w-5 h-5 text-amber-400" />
          <span className="text-[9px] font-chakra font-bold">[R]</span>
        </button>

        {/* Scope button */}
        <button
          onClick={handleScopeClick}
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg border active:scale-95 transition-all cursor-pointer shadow ${
            isScoped
              ? 'bg-red-950/90 border-red-500 text-red-400 shadow-[0_0_10px_#ef4444]'
              : 'bg-black/70 border-white/30 text-white/90 hover:border-amber-400'
          }`}
          title="Aim Down Sights (ADS Scope)"
        >
          <Crosshair className="w-5 h-5" />
          <span className="text-[9px] font-chakra font-bold">SCOPE</span>
        </button>

        {/* Camera View Toggle button (Full Person / Normal / Close) */}
        <button
          onClick={onToggleCameraView}
          className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-black/70 border border-amber-400/60 text-white/90 hover:border-amber-400 active:scale-95 transition-all cursor-pointer shadow"
          title="Toggle TPP Camera View [V]"
        >
          <Eye className="w-5 h-5 text-amber-400" />
          <span className="text-[8px] font-chakra font-bold text-amber-300">
            {cameraViewMode === 'tpp_wide' ? 'WIDE' : cameraViewMode === 'tpp_normal' ? 'NORM' : 'CLOSE'}
          </span>
        </button>

        {/* Sprint button */}
        <button
          onClick={handleSprintToggle}
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg border active:scale-95 transition-all cursor-pointer shadow ${
            isSprintingState
              ? 'bg-amber-950/90 border-amber-400 text-amber-300 shadow-[0_0_10px_#f59e0b]'
              : 'bg-black/70 border-white/30 text-white/90'
          }`}
          title="Sprint [SHIFT]"
        >
          <Zap className="w-5 h-5" />
          <span className="text-[9px] font-chakra font-bold">SPRINT</span>
        </button>

        {/* Jump button */}
        <button
          onClick={onJump}
          className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-black/70 border border-white/30 text-white/90 hover:border-amber-400 active:scale-95 transition-all cursor-pointer shadow"
          title="Jump [SPACE]"
        >
          <ArrowUp className="w-5 h-5 text-amber-400" />
          <span className="text-[9px] font-chakra font-bold">JUMP</span>
        </button>

        {/* Free Fire Big Drag-Headshot Fire Button! */}
        <div
          onPointerDown={handleFirePointerDown}
          onPointerMove={handleFirePointerMove}
          onPointerUp={handleFirePointerUp}
          className="relative w-20 h-20 rounded-full bg-gradient-to-b from-red-600 via-orange-600 to-amber-600 border-4 border-amber-400 shadow-[0_0_25px_rgba(239,68,68,0.7)] flex flex-col items-center justify-center cursor-pointer active:scale-90 transition-all select-none touch-none"
          title="Fire Weapon! Drag UP for Headshot!"
        >
          <span className="text-xl">🔥</span>
          <span className="text-[10px] font-russo font-bold text-white tracking-widest">FIRE</span>
          <div className="absolute top-1 text-[8px] font-chakra text-amber-200 animate-bounce">▲ DRAG UP</div>
        </div>
      </div>

      {/* 7. Controls Hint banner on bottom desktop */}
      <div className="hidden md:flex absolute bottom-1 left-1/2 -translate-x-1/2 text-[11px] font-chakra text-white/40 tracking-wider items-center gap-3">
        <span>WASD: Move</span>
        <span>•</span>
        <span>Mouse: Aim</span>
        <span>•</span>
        <span>Click / Fire Button: Shoot</span>
        <span>•</span>
        <span>G: Gloo Wall</span>
        <span>•</span>
        <span>F: Medkit</span>
        <span>•</span>
        <span>R: Reload</span>
        <span>•</span>
        <span>E: Hero Skill</span>
      </div>
    </div>
  );
};
