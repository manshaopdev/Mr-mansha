export type WeaponCategory = 'AR' | 'SMG' | 'SNIPER' | 'SHOTGUN' | 'PISTOL' | 'MELEE';

export interface Weapon {
  id: string;
  name: string;
  category: WeaponCategory;
  damage: number;
  headshotMultiplier: number;
  fireRate: number; // shots per sec
  magazineSize: number;
  currentAmmo: number;
  reserveAmmo: number;
  reloadTime: number; // seconds
  recoil: number;
  range: number;
  skinName: string;
  skinTier: 'Standard' | 'Epic' | 'Legendary' | 'Mythic';
  color: string;
  bulletSpeed: number;
  spread: number;
}

export interface Character {
  id: string;
  name: string;
  tagline: string;
  skillName: string;
  skillType: 'ACTIVE' | 'PASSIVE';
  skillCooldown: number; // in seconds
  skillDuration: number; // in seconds
  skillDescription: string;
  icon: string;
  avatarColor: string;
  buffs: {
    moveSpeed?: number;
    healRate?: number;
    recoilReduction?: number;
    shieldProtection?: number;
  };
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  skillName: string;
  skillDescription: string;
  icon: string;
  cooldown: number;
}

export interface LootItem {
  id: string;
  type: 'weapon' | 'ammo' | 'armor' | 'helmet' | 'medkit' | 'inhaler' | 'gloo_wall';
  name: string;
  amount: number;
  level?: number;
  weaponData?: Weapon;
  x: number;
  y: number;
  z: number;
}

export interface GlooWallObject {
  id: string;
  x: number;
  y: number;
  z: number;
  rotationY: number;
  hp: number;
  maxHp: number;
  isPlayerWall: boolean;
}

export interface BotEnemy {
  id: string;
  name: string;
  x: number;
  y: number;
  z: number;
  hp: number;
  maxHp: number;
  weapon: Weapon;
  state: 'wandering' | 'stalking' | 'attacking' | 'healing' | 'dead';
  targetX: number;
  targetZ: number;
  lastShotTime: number;
  glooWallCount: number;
  directionAngle: number;
  isKnocked?: boolean;
}

export interface ZoneState {
  centerX: number;
  centerZ: number;
  currentRadius: number;
  targetRadius: number;
  nextCenterX: number;
  nextCenterZ: number;
  phase: number;
  maxPhases: number;
  timeRemaining: number;
  isShrinking: boolean;
  dps: number;
}

export interface KillFeedEvent {
  id: string;
  killer: string;
  victim: string;
  weaponName: string;
  isHeadshot: boolean;
  isPlayerKiller: boolean;
  isPlayerVictim: boolean;
  timestamp: number;
}

export interface DamageNumber {
  id: string;
  amount: number;
  isHeadshot: boolean;
  x: number;
  y: number;
  opacity: number;
}

export type GameMode = 'battle_royale' | 'clash_squad' | 'lone_wolf' | 'training';

export interface MatchStats {
  rank: number;
  totalPlayers: number;
  kills: number;
  headshots: number;
  damage: number;
  survivalTimeSeconds: number;
  rankPointsGained: number;
  isBooyah: boolean;
}
