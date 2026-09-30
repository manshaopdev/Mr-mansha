import React from 'react';
import { ZoneState } from '../../types/game';

interface MiniMapProps {
  playerX: number;
  playerZ: number;
  playerYaw: number;
  zone: ZoneState;
}

export const MiniMap: React.FC<MiniMapProps> = ({ playerX, playerZ, playerYaw, zone }) => {
  // Map size: 600x600 world units mapped to 130x130 px
  const mapSize = 130;
  const worldSize = 600;

  const toMapX = (worldX: number) => ((worldX + worldSize / 2) / worldSize) * mapSize;
  const toMapY = (worldZ: number) => ((worldZ + worldSize / 2) / worldSize) * mapSize;

  const playerMapX = toMapX(playerX);
  const playerMapY = toMapY(playerZ);

  const zoneMapX = toMapX(zone.centerX);
  const zoneMapY = toMapY(zone.centerZ);
  const zoneRadiusPx = (zone.currentRadius / worldSize) * mapSize;
  const targetRadiusPx = (zone.targetRadius / worldSize) * mapSize;

  // Determine current region name
  let regionName = 'BERMUDA';
  if (Math.hypot(playerX - (-80), playerZ - (-60)) < 40) regionName = 'FACTORY';
  else if (Math.hypot(playerX - 70, playerZ - 70) < 40) regionName = 'CLOCK TOWER';
  else if (Math.hypot(playerX, playerZ) < 35) regionName = 'PEAK';
  else if (Math.hypot(playerX - (-70), playerZ - 80) < 40) regionName = 'POCHINOK';
  else if (Math.hypot(playerX - 80, playerZ - (-80)) < 40) regionName = 'MILL';

  return (
    <div className="relative flex flex-col items-center">
      {/* Zone location header */}
      <div className="bg-black/75 px-3 py-0.5 rounded-t border-t border-x border-amber-500/40 text-[11px] font-chakra font-bold tracking-wider text-amber-300 flex items-center gap-1.5 shadow-md">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        {regionName}
      </div>

      {/* Radar Container */}
      <div className="relative w-[130px] h-[130px] rounded-lg border-2 border-amber-500/60 bg-[#1e3a1e] overflow-hidden shadow-2xl shadow-black/80 backdrop-blur-sm">
        {/* Radar scan grid */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Famous Bermuda landmark pins */}
        <div className="absolute text-[8px] font-bold text-white/70" style={{ left: toMapX(-80) - 10, top: toMapY(-60) - 6 }}>FAC</div>
        <div className="absolute text-[8px] font-bold text-white/70" style={{ left: toMapX(70) - 12, top: toMapY(70) - 6 }}>CLOCK</div>
        <div className="absolute text-[8px] font-bold text-amber-300/90" style={{ left: toMapX(0) - 10, top: toMapY(0) - 6 }}>PEAK</div>
        <div className="absolute text-[8px] font-bold text-white/70" style={{ left: toMapX(-70) - 12, top: toMapY(80) - 6 }}>POCH</div>
        <div className="absolute text-[8px] font-bold text-white/70" style={{ left: toMapX(80) - 8, top: toMapY(-80) - 6 }}>MILL</div>

        {/* Target Next Safe Zone (White dashed circle) */}
        <div
          className="absolute rounded-full border border-dashed border-white/80 pointer-events-none"
          style={{
            left: toMapX(zone.nextCenterX) - targetRadiusPx,
            top: toMapY(zone.nextCenterZ) - targetRadiusPx,
            width: targetRadiusPx * 2,
            height: targetRadiusPx * 2,
          }}
        />

        {/* Current Shrinking Blue Storm Zone */}
        <div
          className="absolute rounded-full border-2 border-cyan-400 bg-cyan-400/10 pointer-events-none"
          style={{
            left: zoneMapX - zoneRadiusPx,
            top: zoneMapY - zoneRadiusPx,
            width: zoneRadiusPx * 2,
            height: zoneRadiusPx * 2,
          }}
        />

        {/* Airdrop yellow beacon icon */}
        <div
          className="absolute w-2.5 h-2.5 rounded-full bg-amber-400 border border-yellow-200 animate-pulse shadow-[0_0_8px_#facc15]"
          style={{ left: toMapX(25) - 5, top: toMapY(-30) - 5 }}
          title="Airdrop Crate"
        />

        {/* Player indicator (Yellow Arrow pointing in viewing yaw direction) */}
        <div
          className="absolute w-3.5 h-3.5 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            left: playerMapX,
            top: playerMapY,
            transform: `translate(-50%, -50%) rotate(${playerYaw}rad)`,
          }}
        >
          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-yellow-300 drop-shadow-[0_0_4px_#fde047]" />
        </div>
      </div>
    </div>
  );
};
