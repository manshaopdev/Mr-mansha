export type DimensionId = 'lahoot' | 'noor' | 'jabaroot' | 'misal' | 'nasoot';

export interface Dimension {
  id: DimensionId;
  nameUrdu: string;
  nameEn: string;
  subUrdu: string;
  subEn: string;
  baseColor: string;
  accentColor: string;
  frequency: number; // Hz (e.g. 432, 528, 639, 741, 852)
  solfeggioName: string;
  loreUrdu: string;
  loreEn: string;
  palette: string[];
}

export type ToolMode = 
  | 'touch'
  | 'gravity'
  | 'repel'
  | 'vortex'
  | 'blackhole'
  | 'whitefountain'
  | 'creature'
  | 'cymatics';

export interface CosmicSingularity {
  id: string;
  x: number;
  y: number;
  type: 'blackhole' | 'whitefountain' | 'wormhole';
  mass: number;
  radius: number;
  pulsePhase: number;
}

export type CreatureSpecies = 'manta' | 'serpent' | 'jellyfish' | 'phoenix';

export interface CreatureState {
  id: string;
  name: string;
  nameUrdu: string;
  species: CreatureSpecies;
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  segments: { x: number; y: number; angle: number }[];
  hue: number;
  size: number;
  pulse: number;
  energy: number;
  frequency: number;
  consciousness: string;
  consciousnessUrdu: string;
}

export interface OracleInsight {
  id: string;
  category: 'ishq' | 'sukoon' | 'junoon' | 'fana' | 'hikmat' | 'nuqta';
  titleUrdu: string;
  titleEn: string;
  urduVerse: string;
  urduPoet: string;
  englishInterpretation: string;
  philosophicalCore: string;
  targetFrequency: number;
  dimension: DimensionId;
}

export interface CosmicSettings {
  particleCount: number;
  creatureCount: number;
  gravityStrength: number;
  timeScale: number; // 0 is freeze, -1 is reverse, 1 is normal, 2 is warp
  soundVolume: number;
  cymaticHarmonic: number;
  isMicActive: boolean;
  glowIntensity: number;
  showTrails: boolean;
  language: 'ur' | 'en';
}

export interface CosmicSnapshot {
  id: string;
  timestamp: string;
  title: string;
  dimension: string;
  dataUrl: string;
}

// BolLive Compatibility Types
export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  phone?: string;
  coins: number;
  diamonds: number;
  level: number;
  vipTier: string;
  bio?: string;
  isHost?: boolean;
  totalGiftsSent?: number;
  totalGiftsReceived?: number;
  seatNumber?: number;
  label?: string;
}

export interface RoomSeat {
  seatNumber: number;
  label?: string;
  user: User | null;
  isMuted?: boolean;
  isSpeaking?: boolean;
  audioLevel?: number;
}

export interface VoiceRoom {
  id: string;
  title: string;
  tagline?: string;
  bannerGradient?: string;
  totalRoomDiamonds?: number;
  announcement?: string;
  isLive?: boolean;
  createdAt?: string;
  host: User;
  category: string;
  coverImage?: string;
  listenersCount: number;
  seats: (RoomSeat | User | null)[];
  tags: string[];
  isLocked?: boolean;
}

export interface RoomMessage {
  id: string;
  sender: User;
  text: string;
  timestamp: string;
  isSystem?: boolean;
  gift?: {
    name: string;
    icon: string;
    coins: number;
  };
}

export interface GiftItem {
  id: string;
  name: string;
  icon: string;
  coins: number;
  diamondsReward?: number;
  diamondValue?: number;
  animationType: string;
  category?: string;
  tier?: string;
  description?: string;
  color?: string;
}

export interface CoinPackage {
  id: string;
  coins: number;
  bonusCoins: number;
  pricePKR?: number;
  pkrPrice?: number;
  isPopular?: boolean;
  popular?: boolean;
  badge?: string;
}

export interface JazzCashTransaction {
  id: string;
  type: 'deposit' | 'withdraw';
  amountPKR: number;
  coinsAmount: number;
  jazzCashNumber: string;
  status: 'pending' | 'success' | 'failed';
  timestamp: string;
  referenceId: string;
}

export interface JazzCashDetails {
  merchantNumber: string;
  merchantTitle?: string;
  accountTitle?: string;
  tillId: string;
  ibanNumber?: string;
  supportHelp?: string;
  bankName?: string;
  ussdCode?: string;
  qrValue?: string;
  instructionsUrdu?: string[];
  instructionsEn?: string[];
}

export interface SoundFX {
  id: string;
  name: string;
  icon: string;
  type?: string;
  url?: string;
}

