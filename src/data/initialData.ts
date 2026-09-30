import { 
  AdCampaign, 
  UserWallet, 
  Transaction, 
  ReferralUser, 
  DepositRequest, 
  WithdrawalRequest, 
  DailyClaimDay, 
  UserProfile,
  EarningPlan 
} from '../types/adRewards';

import heroImg from '../assets/images/hero_ad_rewards_banner_1790572410413.jpg';
import shoppingThumb from '../assets/images/ad_thumb_shopping_1790572422404.jpg';
import gamingThumb from '../assets/images/ad_thumb_gaming_1790572433180.jpg';
import fintechThumb from '../assets/images/ad_thumb_fintech_1790572445447.jpg';

export { heroImg };

export const EARNING_PLANS: EarningPlan[] = [
  {
    id: 'plan-starter',
    name: 'Starter Trial',
    badge: 'Free (₨ 50 Bonus)',
    pricePKR: 0,
    dailyTasks: 1,
    rewardPerTaskPKR: 100.00,
    dailyEarningsPKR: 100.00,
    monthlyEarningsPKR: 3000.00,
    validityDays: 30,
    color: 'emerald',
    description: 'Free Starter Trial included with your ₨ 50 registration bonus. Watch 1 task daily and earn ₨ 100/day.'
  },
  {
    id: 'plan-basic',
    name: 'Basic VIP 1',
    badge: 'Starter Earner',
    pricePKR: 1000,
    dailyTasks: 2,
    rewardPerTaskPKR: 100.00,
    dailyEarningsPKR: 200.00,
    monthlyEarningsPKR: 6000.00,
    validityDays: 30,
    color: 'cyan',
    description: 'Unlock 2 tasks every day. Earn ₨ 200 daily with 15-second sponsor tasks. Total ₨ 6,000 monthly.'
  },
  {
    id: 'plan-silver',
    name: 'Silver VIP 2',
    badge: '★ Most Popular',
    popular: true,
    pricePKR: 2500,
    dailyTasks: 5,
    rewardPerTaskPKR: 100.00,
    dailyEarningsPKR: 500.00,
    monthlyEarningsPKR: 15000.00,
    validityDays: 30,
    color: 'amber',
    description: 'Unlock 5 tasks every day. Earn ₨ 500 daily. Direct cashout via JazzCash. Total ₨ 15,000 monthly.'
  },
  {
    id: 'plan-gold',
    name: 'Gold VIP 3',
    badge: 'Pro Earner',
    pricePKR: 5000,
    dailyTasks: 10,
    rewardPerTaskPKR: 100.00,
    dailyEarningsPKR: 1000.00,
    monthlyEarningsPKR: 30000.00,
    validityDays: 30,
    color: 'yellow',
    description: 'Unlock 10 tasks every day. Earn ₨ 1,000 daily with VIP high priority. Total ₨ 30,000 monthly.'
  },
  {
    id: 'plan-diamond',
    name: 'Diamond VIP 4',
    badge: 'Elite Earner',
    pricePKR: 10000,
    dailyTasks: 20,
    rewardPerTaskPKR: 100.00,
    dailyEarningsPKR: 2000.00,
    monthlyEarningsPKR: 60000.00,
    validityDays: 30,
    color: 'purple',
    description: 'Unlock 20 tasks every day. Earn ₨ 2,000 daily with instant VIP cashout. Total ₨ 60,000 monthly.'
  }
];

export const INITIAL_WALLET: UserWallet = {
  earningsBalance: 50.00, // ₨ 50 New User Registration Reward
  depositBalance: 0.00,
  totalLifetimeEarned: 50.00,
  adsWatchedToday: 0,
  adsWatchedTotal: 0,
  referralCode: 'AR78699',
  referralEarnings: 0.00,
  referredUsersCount: 0,
  streakDays: 1,
  lastClaimDate: '',
  activePlanId: 'plan-starter',
  dailyTasksLimit: 1,
  tasksCompletedToday: 0
};

export const INITIAL_CAMPAIGNS: AdCampaign[] = [
  {
    id: 'ad-daraz-super',
    title: 'Daraz Grand Mega Sale - Up to 75% Off Electronics',
    advertiserName: 'Daraz Pakistan Official',
    category: 'E-Commerce',
    description: 'Explore verified deals on smartphones, smartwatches, earbuds and home appliances with 3-day express courier delivery across Karachi, Lahore & Islamabad.',
    targetUrl: 'https://daraz.pk',
    thumbnail: shoppingThumb,
    durationSeconds: 15,
    rewardPKR: 100.00,
    advertiserCostPerView: 200.00,
    totalViews: 500,
    completedViews: 341,
    status: 'active',
    createdAt: '2026-03-24',
    featured: true,
    isWatchedToday: false
  },
  {
    id: 'ad-techify-yt',
    title: 'Techify Pakistan - Subscribe for Top 5 Budget 5G Phones in PKR',
    advertiserName: 'Techify Studio PK',
    category: 'YouTube & Social',
    description: 'Watch in-depth unboxings, benchmark speed tests, and PTA tax exemption guides for budget Android smartphones in Pakistan.',
    targetUrl: 'https://youtube.com',
    thumbnail: gamingThumb,
    durationSeconds: 15,
    rewardPKR: 100.00,
    advertiserCostPerView: 200.00,
    totalViews: 250,
    completedViews: 189,
    status: 'active',
    createdAt: '2026-03-25',
    isWatchedToday: false
  },
  {
    id: 'ad-sada-crypto',
    title: 'Fintech Pakistan: Send & Receive PKR Instantly at 0% Fee',
    advertiserName: 'Digital Pay Hub',
    category: 'Crypto & Finance',
    description: 'Learn how modern digital wallets and IBAN transfers save money over traditional banking fees with instant Raast interoperability.',
    targetUrl: 'https://statebank.gov.pk',
    thumbnail: fintechThumb,
    durationSeconds: 15,
    rewardPKR: 100.00,
    advertiserCostPerView: 200.00,
    totalViews: 400,
    completedViews: 295,
    status: 'active',
    createdAt: '2026-03-26',
    isWatchedToday: false
  },
  {
    id: 'ad-jazz-4g',
    title: 'Jazz Super 4G: 100GB Monthly Data & Unlimited On-Net Minutes',
    advertiserName: 'Telecom Deals PK',
    category: 'Pakistani Brands',
    description: 'Activate lightning fast internet packages with seamless nationwide coverage. Dial *117*30# or download the app for 25% discount.',
    targetUrl: 'https://jazz.com.pk',
    thumbnail: fintechThumb,
    durationSeconds: 15,
    rewardPKR: 100.00,
    advertiserCostPerView: 200.00,
    totalViews: 300,
    completedViews: 211,
    status: 'active',
    createdAt: '2026-03-26',
    isWatchedToday: false
  },
  {
    id: 'ad-esports-pak',
    title: 'PUBG & Free Fire National Championship 2026 Registration',
    advertiserName: 'Esports League Pakistan',
    category: 'Gaming',
    description: '₨ 2,500,000 Total Prize Pool! Register your squad for the qualifiers streaming live on YouTube and TikTok.',
    targetUrl: 'https://esports.pk',
    thumbnail: gamingThumb,
    durationSeconds: 15,
    rewardPKR: 100.00,
    advertiserCostPerView: 200.00,
    totalViews: 200,
    completedViews: 142,
    status: 'active',
    createdAt: '2026-03-27',
    featured: true,
    isWatchedToday: false
  },
  {
    id: 'ad-foodpanda-pk',
    title: 'Foodpanda Crave Week: 50% Flat Off Biryani & Burgers in Lahore',
    advertiserName: 'Foodpanda Partner Hub',
    category: 'E-Commerce',
    description: 'Hungry? Enjoy your favorite local restaurants delivered in under 25 minutes with code CRAVE50 on checkout.',
    targetUrl: 'https://foodpanda.pk',
    thumbnail: shoppingThumb,
    durationSeconds: 15,
    rewardPKR: 100.00,
    advertiserCostPerView: 200.00,
    totalViews: 150,
    completedViews: 98,
    status: 'active',
    createdAt: '2026-03-27',
    isWatchedToday: false
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-welcome-50',
    type: 'ad_reward',
    title: 'New User Registration Reward (₨ 50.00 Welcome Bonus)',
    amountPKR: 50.00,
    status: 'completed',
    date: 'Welcome Gift'
  },
  {
    id: 'tx-1001',
    type: 'ad_reward',
    title: 'Ad Watch Reward: Daraz Grand Sale',
    amountPKR: 100.00,
    status: 'completed',
    date: 'Today, 2:15 PM'
  },
  {
    id: 'tx-1002',
    type: 'ad_reward',
    title: 'Ad Watch Reward: Techify YouTube',
    amountPKR: 100.00,
    status: 'completed',
    date: 'Today, 1:40 PM'
  },
  {
    id: 'tx-1003',
    type: 'referral_commission',
    title: 'Referral 10% Commission (Hamza R.)',
    amountPKR: 10.00,
    status: 'completed',
    date: 'Yesterday'
  },
  {
    id: 'tx-1004',
    type: 'withdrawal',
    title: 'Easypaisa Cashout (0326-2636289)',
    amountPKR: 500.00,
    status: 'completed',
    date: '24 Mar 2026',
    method: 'Easypaisa',
    accountTitle: 'Ali Raza',
    accountNumber: '0326-2636289',
    txId: 'EP-98234710'
  }
];

export const DAILY_CLAIM_SCHEDULE: DailyClaimDay[] = [
  { day: 1, rewardPKR: 50.00, label: 'Day 1 Starter' },
  { day: 2, rewardPKR: 75.00, label: 'Day 2 Boost' },
  { day: 3, rewardPKR: 100.00, label: 'Day 3 Centurion' },
  { day: 4, rewardPKR: 125.00, label: 'Day 4 Hot Streak' },
  { day: 5, rewardPKR: 150.00, label: 'Day 5 Pro Earner' },
  { day: 6, rewardPKR: 200.00, label: 'Day 6 Ultra Spin' },
  { day: 7, rewardPKR: 300.00, label: 'Day 7 Mega Jackpot', isSpecial: true },
];

export const INITIAL_DEPOSIT_REQUESTS: DepositRequest[] = [
  {
    id: 'dep-101',
    userId: 'usr-2',
    userName: 'Hamza Rashid',
    userPhone: '0302-5544332',
    amountPKR: 2000.00,
    method: 'Easypaisa',
    txId: 'EP-8839201940',
    senderNumber: '0302-5544332',
    date: 'Today, 10:15 PM',
    status: 'pending',
  },
  {
    id: 'dep-102',
    userId: 'usr-3',
    userName: 'Zeeshan Ali',
    userPhone: '0300-9876543',
    amountPKR: 5000.00,
    method: 'JazzCash',
    txId: 'JC-9923847102',
    senderNumber: '0300-9876543',
    date: 'Today, 9:40 PM',
    status: 'pending',
  },
  {
    id: 'dep-103',
    userId: 'usr-4',
    userName: 'Ayesha Siddiqa',
    userPhone: '0305-9988776',
    amountPKR: 1000.00,
    method: 'Easypaisa',
    txId: 'EP-7744119932',
    senderNumber: '0305-9988776',
    date: 'Yesterday, 3:20 PM',
    status: 'approved',
    reviewedAt: 'Yesterday, 3:35 PM'
  }
];

export const INITIAL_WITHDRAWAL_REQUESTS: WithdrawalRequest[] = [
  {
    id: 'wth-201',
    userId: 'usr-5',
    userName: 'Usman Farooq',
    userPhone: '0333-7766554',
    amountPKR: 500.00,
    method: 'Easypaisa',
    accountTitle: 'Usman Farooq',
    accountNumber: '0333-7766554',
    date: 'Today, 8:15 PM',
    status: 'pending',
  },
  {
    id: 'wth-202',
    userId: 'usr-2',
    userName: 'Hamza Rashid',
    userPhone: '0302-5544332',
    amountPKR: 1200.00,
    method: 'JazzCash',
    accountTitle: 'Hamza Rashid',
    accountNumber: '0302-5544332',
    date: 'Today, 6:00 PM',
    status: 'pending',
  }
];

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'usr-1',
    name: 'Ali Raza',
    phone: '0326-2636289',
    email: 'aliraza@aradrewards.pk',
    role: 'earner',
    joinedDate: '15 Jan 2026',
    isVerified: true,
    city: 'Karachi',
    defaultMethod: 'Easypaisa',
    defaultAccountNumber: '0326-2636289',
    defaultAccountTitle: 'Ali Raza'
  },
  {
    id: 'usr-2',
    name: 'Hamza Rashid',
    phone: '0302-5544332',
    email: 'hamza.r@gmail.com',
    role: 'earner',
    joinedDate: '21 Mar 2026',
    isVerified: true,
    city: 'Lahore',
    defaultMethod: 'Easypaisa',
    defaultAccountNumber: '0302-5544332',
    defaultAccountTitle: 'Hamza Rashid'
  },
  {
    id: 'usr-3',
    name: 'Zeeshan Ali',
    phone: '0300-9876543',
    email: 'zeeshan.agency@gmail.com',
    role: 'advertiser',
    joinedDate: '23 Mar 2026',
    isVerified: true,
    city: 'Islamabad',
    defaultMethod: 'JazzCash',
    defaultAccountNumber: '0300-9876543',
    defaultAccountTitle: 'Zeeshan Ali'
  },
  {
    id: 'usr-4',
    name: 'Ayesha Siddiqa',
    phone: '0305-9988776',
    email: 'ayesha.creator@gmail.com',
    role: 'earner',
    joinedDate: '24 Mar 2026',
    isVerified: true,
    city: 'Faisalabad',
    defaultMethod: 'Easypaisa',
    defaultAccountNumber: '0305-9988776',
    defaultAccountTitle: 'Ayesha Siddiqa'
  },
  {
    id: 'usr-5',
    name: 'Usman Farooq',
    phone: '0333-7766554',
    email: 'usman.tech@gmail.com',
    role: 'earner',
    joinedDate: '25 Mar 2026',
    isVerified: true,
    city: 'Rawalpindi',
    defaultMethod: 'Easypaisa',
    defaultAccountNumber: '0333-7766554',
    defaultAccountTitle: 'Usman Farooq'
  }
];

export const INITIAL_REFERRALS: ReferralUser[] = [
  {
    id: 'ref-1',
    name: 'Hamza Rashid (Karachi)',
    joinedDate: '21 Mar 2026',
    adsWatched: 24,
    commissionEarnedPKR: 240.00,
    status: 'active'
  },
  {
    id: 'ref-2',
    name: 'Zeeshan Ali (Lahore)',
    joinedDate: '23 Mar 2026',
    adsWatched: 18,
    commissionEarnedPKR: 180.00,
    status: 'active'
  },
  {
    id: 'ref-3',
    name: 'Usman Farooq (Rawalpindi)',
    joinedDate: '25 Mar 2026',
    adsWatched: 12,
    commissionEarnedPKR: 120.00,
    status: 'active'
  },
  {
    id: 'ref-4',
    name: 'Bilal Khan (Peshawar)',
    joinedDate: '26 Mar 2026',
    adsWatched: 4,
    commissionEarnedPKR: 40.00,
    status: 'idle'
  }
];

