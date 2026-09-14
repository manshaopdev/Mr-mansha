import { GiftItem, CoinPackage, JazzCashDetails, SoundFX, VoiceRoom } from '../types';

export const OFFICIAL_JAZZCASH_DETAILS: JazzCashDetails = {
  merchantNumber: '03262636289',
  merchantTitle: 'SH Zone Official / JazzCash Direct',
  tillId: '78603262',
  ibanNumber: 'PK64MOBK0000003262636289',
  bankName: 'Mobilink Microfinance Bank / JazzCash',
  ussdCode: '*786#',
  qrValue: 'jazzcash://pay?account=03262636289&title=SHZone&till=78603262',
  supportHelp: 'JazzCash Helpline: 4444 (from Jazz) or 021-111-124-444'
};

export const AVAILABLE_GIFTS: GiftItem[] = [
  {
    id: 'gift_rose',
    name: 'Red Rose',
    icon: '🌹',
    coins: 10,
    diamondValue: 7,
    description: 'A classic romantic rose for your favorite voice',
    animationType: 'rose_rain',
    tier: 'Common',
    color: '#ef4444'
  },
  {
    id: 'gift_chai',
    name: 'Karak Chai',
    icon: '☕',
    coins: 50,
    diamondValue: 35,
    description: 'Hot cup of Punjabi dhabba karak tea',
    animationType: 'chai_toast',
    tier: 'Common',
    color: '#f59e0b'
  },
  {
    id: 'gift_balloon',
    name: 'Heart Balloons',
    icon: '🎈',
    coins: 100,
    diamondValue: 70,
    description: 'Floating heart celebration balloons',
    animationType: 'balloon_burst',
    tier: 'Popular',
    color: '#ec4899'
  },
  {
    id: 'gift_mic',
    name: 'Golden Mic',
    icon: '🎙️',
    coins: 500,
    diamondValue: 360,
    description: 'Honor the best speaker and singer on stage',
    animationType: 'golden_mic',
    tier: 'Popular',
    color: '#eab308'
  },
  {
    id: 'gift_crown',
    name: 'Imperial Crown',
    icon: '👑',
    coins: 1000,
    diamondValue: 750,
    description: 'Crown the king or queen of the room',
    animationType: 'royal_crown',
    tier: 'Luxury',
    color: '#a855f7'
  },
  {
    id: 'gift_supercar',
    name: 'Neon Supercar',
    icon: '🏎️',
    coins: 5000,
    diamondValue: 3800,
    description: 'Super sports car speed run across the screen',
    animationType: 'supercar',
    tier: 'Luxury',
    color: '#06b6d4'
  },
  {
    id: 'gift_jet',
    name: 'Private Jet',
    icon: '✈️',
    coins: 10000,
    diamondValue: 8000,
    description: 'Luxury private jet flying with smoke trail',
    animationType: 'private_jet',
    tier: 'Supreme',
    color: '#3b82f6'
  },
  {
    id: 'gift_palace',
    name: 'Royal Palace',
    icon: '🏰',
    coins: 25000,
    diamondValue: 20000,
    description: 'Legendary palace fortress with fireworks',
    animationType: 'royal_castle',
    tier: 'Supreme',
    color: '#f43f5e'
  }
];

export const COIN_PACKAGES: CoinPackage[] = [
  {
    id: 'pack_1',
    coins: 500,
    bonusCoins: 50,
    pkrPrice: 150,
    popular: false,
    badge: 'Starter'
  },
  {
    id: 'pack_2',
    coins: 1300,
    bonusCoins: 150,
    pkrPrice: 350,
    popular: true,
    badge: 'Most Popular'
  },
  {
    id: 'pack_3',
    coins: 3200,
    bonusCoins: 400,
    pkrPrice: 800,
    popular: false,
    badge: 'Best Value'
  },
  {
    id: 'pack_4',
    coins: 7500,
    bonusCoins: 1200,
    pkrPrice: 1750,
    popular: false,
    badge: 'VIP Tier'
  },
  {
    id: 'pack_5',
    coins: 16000,
    bonusCoins: 3000,
    pkrPrice: 3500,
    popular: false,
    badge: 'Luxury'
  },
  {
    id: 'pack_6',
    coins: 50000,
    bonusCoins: 12000,
    pkrPrice: 10500,
    popular: false,
    badge: 'Supreme Whale'
  }
];

export const SOUND_EFFECTS: SoundFX[] = [
  { id: 's1', name: 'Applause', icon: '👏', type: 'applause' },
  { id: 's2', name: 'Air Horn', icon: '🎺', type: 'airhorn' },
  { id: 's3', name: 'Cheer', icon: '🎉', type: 'cheer' },
  { id: 's4', name: 'Drumroll', icon: '🥁', type: 'drumroll' },
  { id: 's5', name: 'Laugh', icon: '😂', type: 'laugh' },
  { id: 's6', name: 'Coin Ping', icon: '🪙', type: 'coin' }
];

export const INITIAL_ROOMS: VoiceRoom[] = [
  {
    id: 'room_1',
    title: 'Lahore Chai & Late Night GupShup ☕',
    tagline: 'Warm conversations, poetry, and chill music with friends',
    category: 'Late Night Chai',
    bannerGradient: 'from-amber-600 via-rose-600 to-indigo-900',
    tags: ['Urdu', 'Lahore', 'Chai', 'Friendly'],
    listenersCount: 142,
    totalRoomDiamonds: 18450,
    announcement: 'Welcome to Lahore Chai Cafe! Be respectful, keep mics muted when others sing.',
    isLive: true,
    createdAt: new Date().toISOString(),
    host: {
      id: 'host_ali',
      username: 'ali_raza',
      displayName: 'Malik Ali Raza 👑',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      coins: 45000,
      diamonds: 32000,
      level: 48,
      vipTier: 'Diamond VIP',
      bio: 'Late night host from Gulberg Lahore. Singer & poet.',
      isHost: true
    },
    seats: [
      {
        seatNumber: 0,
        label: 'Host',
        user: {
          id: 'host_ali',
          username: 'ali_raza',
          displayName: 'Malik Ali Raza 👑',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          coins: 45000,
          diamonds: 32000,
          level: 48,
          vipTier: 'Diamond VIP',
          bio: 'Host',
          isHost: true
        },
        isMuted: false,
        isSpeaking: true,
        audioLevel: 75
      },
      {
        seatNumber: 1,
        label: 'Mic 1',
        user: {
          id: 'user_zainab',
          username: 'zainab_khan',
          displayName: 'Zainab 🌸',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
          coins: 12000,
          diamonds: 9400,
          level: 28,
          vipTier: 'Gold',
          bio: 'Love classical Urdu ghazals'
        },
        isMuted: false,
        isSpeaking: false,
        audioLevel: 0
      },
      {
        seatNumber: 2,
        label: 'Mic 2',
        user: {
          id: 'user_hamza',
          username: 'hamza_karachi',
          displayName: 'Hamza Bhai 🔥',
          avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
          coins: 8500,
          diamonds: 4200,
          level: 22,
          vipTier: 'Silver',
          bio: 'Karachi se direct!'
        },
        isMuted: true,
        isSpeaking: false,
        audioLevel: 0
      },
      {
        seatNumber: 3,
        label: 'Mic 3',
        user: {
          id: 'user_sara',
          username: 'sara_vocal',
          displayName: 'Sara Voice 🎶',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          coins: 19000,
          diamonds: 14500,
          level: 35,
          vipTier: 'Gold',
          bio: 'Live acoustic singer'
        },
        isMuted: false,
        isSpeaking: true,
        audioLevel: 62
      },
      { seatNumber: 4, label: 'Mic 4', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 },
      { seatNumber: 5, label: 'Mic 5', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 },
      { seatNumber: 6, label: 'Mic 6', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 },
      { seatNumber: 7, label: 'Mic 7', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 },
      { seatNumber: 8, label: 'Mic 8', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 }
    ]
  },
  {
    id: 'room_2',
    title: 'Coke Studio Jam & Acoustic Anthems 🎸',
    tagline: 'Live guitar singing, requests open for Coke Studio classics',
    category: 'Music & Shayari',
    bannerGradient: 'from-purple-800 via-pink-700 to-rose-900',
    tags: ['Music', 'Singing', 'Guitar', 'Acoustic'],
    listenersCount: 218,
    totalRoomDiamonds: 43200,
    announcement: 'Singers queue on Mic 3. Send Golden Mic 🎙️ to request custom songs!',
    isLive: true,
    createdAt: new Date().toISOString(),
    host: {
      id: 'host_bilal',
      username: 'bilal_music',
      displayName: 'Ustad Bilal Khan 🎸',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      coins: 82000,
      diamonds: 65000,
      level: 60,
      vipTier: 'Diamond VIP',
      bio: 'Professional vocalist & guitarist',
      isHost: true
    },
    seats: [
      {
        seatNumber: 0,
        label: 'Host',
        user: {
          id: 'host_bilal',
          username: 'bilal_music',
          displayName: 'Ustad Bilal Khan 🎸',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          coins: 82000,
          diamonds: 65000,
          level: 60,
          vipTier: 'Diamond VIP',
          bio: 'Host',
          isHost: true
        },
        isMuted: false,
        isSpeaking: true,
        audioLevel: 88
      },
      {
        seatNumber: 1,
        label: 'Mic 1',
        user: {
          id: 'user_daniyal',
          username: 'dani_guitar',
          displayName: 'Daniyal Solo 🎵',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          coins: 14000,
          diamonds: 8900,
          level: 25,
          vipTier: 'Silver',
          bio: 'Bass player'
        },
        isMuted: false,
        isSpeaking: false,
        audioLevel: 0
      },
      { seatNumber: 2, label: 'Mic 2', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 },
      { seatNumber: 3, label: 'Mic 3', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 },
      { seatNumber: 4, label: 'Mic 4', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 },
      { seatNumber: 5, label: 'Mic 5', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 },
      { seatNumber: 6, label: 'Mic 6', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 },
      { seatNumber: 7, label: 'Mic 7', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 },
      { seatNumber: 8, label: 'Mic 8', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 }
    ]
  },
  {
    id: 'room_3',
    title: 'PUBG & FreeFire Pakistan Voice Squad 🎮',
    tagline: 'Custom room matchmaking, team talk, banter, and tournaments',
    category: 'Gaming & Fun',
    bannerGradient: 'from-emerald-800 via-teal-900 to-slate-900',
    tags: ['Gaming', 'PUBG', 'Fun', 'Squad'],
    listenersCount: 95,
    totalRoomDiamonds: 11200,
    announcement: 'Tournament room registration starts at 11 PM PKT!',
    isLive: true,
    createdAt: new Date().toISOString(),
    host: {
      id: 'host_shahid',
      username: 'shahid_gamer',
      displayName: 'Sniper Shahid ⚡',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      coins: 31000,
      diamonds: 18000,
      level: 38,
      vipTier: 'Gold',
      bio: 'Conqueror player Pakistan',
      isHost: true
    },
    seats: [
      {
        seatNumber: 0,
        label: 'Host',
        user: {
          id: 'host_shahid',
          username: 'shahid_gamer',
          displayName: 'Sniper Shahid ⚡',
          avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
          coins: 31000,
          diamonds: 18000,
          level: 38,
          vipTier: 'Gold',
          bio: 'Host',
          isHost: true
        },
        isMuted: false,
        isSpeaking: true,
        audioLevel: 45
      },
      { seatNumber: 1, label: 'Mic 1', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 },
      { seatNumber: 2, label: 'Mic 2', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 },
      { seatNumber: 3, label: 'Mic 3', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 },
      { seatNumber: 4, label: 'Mic 4', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 },
      { seatNumber: 5, label: 'Mic 5', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 },
      { seatNumber: 6, label: 'Mic 6', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 },
      { seatNumber: 7, label: 'Mic 7', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 },
      { seatNumber: 8, label: 'Mic 8', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 }
    ]
  },
  {
    id: 'room_4',
    title: 'Urdu Shayari & Jaun Elia Mehfil 📖',
    tagline: 'Deep poetry, nazms, and ghazals for the soul',
    category: 'Urdu GupShup',
    bannerGradient: 'from-blue-900 via-indigo-950 to-slate-950',
    tags: ['Poetry', 'Shayari', 'Literature', 'Urdu'],
    listenersCount: 165,
    totalRoomDiamonds: 27500,
    announcement: 'Dard-e-dil poetry session. Please do not interrupt recital on mic.',
    isLive: true,
    createdAt: new Date().toISOString(),
    host: {
      id: 'host_farhan',
      username: 'farhan_shayar',
      displayName: 'Farhan Jaun 📜',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      coins: 52000,
      diamonds: 38000,
      level: 42,
      vipTier: 'Diamond VIP',
      bio: 'Urdu adab & poetry lover',
      isHost: true
    },
    seats: [
      {
        seatNumber: 0,
        label: 'Host',
        user: {
          id: 'host_farhan',
          username: 'farhan_shayar',
          displayName: 'Farhan Jaun 📜',
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          coins: 52000,
          diamonds: 38000,
          level: 42,
          vipTier: 'Diamond VIP',
          bio: 'Host',
          isHost: true
        },
        isMuted: false,
        isSpeaking: false,
        audioLevel: 0
      },
      { seatNumber: 1, label: 'Mic 1', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 },
      { seatNumber: 2, label: 'Mic 2', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 },
      { seatNumber: 3, label: 'Mic 3', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 },
      { seatNumber: 4, label: 'Mic 4', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 },
      { seatNumber: 5, label: 'Mic 5', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 },
      { seatNumber: 6, label: 'Mic 6', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 },
      { seatNumber: 7, label: 'Mic 7', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 },
      { seatNumber: 8, label: 'Mic 8', user: null, isMuted: false, isSpeaking: false, audioLevel: 0 }
    ]
  }
];

export const SAMPLE_AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
];
