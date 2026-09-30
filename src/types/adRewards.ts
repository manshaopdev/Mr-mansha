export type AdCategory = 
  | 'All'
  | 'E-Commerce'
  | 'YouTube & Social'
  | 'Apps & Tech'
  | 'Crypto & Finance'
  | 'Pakistani Brands'
  | 'Gaming';

export interface AdCampaign {
  id: string;
  title: string;
  advertiserName: string;
  category: Exclude<AdCategory, 'All'>;
  description: string;
  targetUrl: string;
  videoEmbedUrl?: string;
  thumbnail: string;
  durationSeconds: number; // 15
  rewardPKR: number; // e.g. 0.30
  advertiserCostPerView: number; // e.g. 0.60
  totalViews: number;
  completedViews: number;
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
  isWatchedToday?: boolean;
  featured?: boolean;
}

export interface UserWallet {
  earningsBalance: number; // e.g. 150.50
  depositBalance: number;  // e.g. 0.00
  totalLifetimeEarned: number;
  adsWatchedToday: number;
  adsWatchedTotal: number;
  referralCode: string;
  referralEarnings: number;
  referredUsersCount: number;
  streakDays: number;
  lastClaimDate?: string;
  activePlanId?: string;
  dailyTasksLimit?: number;
  tasksCompletedToday?: number;
}

export interface EarningPlan {
  id: string;
  name: string;
  pricePKR: number;
  dailyTasks: number;
  rewardPerTaskPKR: number; // 100
  dailyEarningsPKR: number;
  monthlyEarningsPKR: number;
  validityDays: number;
  badge?: string;
  popular?: boolean;
  color: string;
  description: string;
}

export interface PlanPurchaseRequest {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  planId: string;
  planName: string;
  amountPKR: number;
  method: 'JazzCash' | 'Deposit Wallet';
  txId?: string;
  senderNumber?: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedAt?: string;
}

export interface Transaction {
  id: string;
  type: 'ad_reward' | 'deposit' | 'withdrawal' | 'referral_commission' | 'ad_creation' | 'daily_streak' | 'plan_purchase';
  title: string;
  amountPKR: number;
  status: 'completed' | 'pending' | 'rejected';
  date: string;
  method?: string;
  txId?: string;
  accountTitle?: string;
  accountNumber?: string;
}

export interface DepositRequest {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  amountPKR: number;
  method: 'Easypaisa' | 'JazzCash' | 'Bank Transfer';
  txId: string;
  senderNumber: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedAt?: string;
  rejectReason?: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  amountPKR: number;
  method: string;
  accountTitle: string;
  accountNumber: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  payoutTxId?: string;
  reviewedAt?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: 'earner' | 'advertiser' | 'admin';
  joinedDate: string;
  isVerified: boolean;
  city?: string;
  defaultMethod?: 'Easypaisa' | 'JazzCash' | 'Bank Transfer';
  defaultAccountNumber?: string;
  defaultAccountTitle?: string;
}

export interface DailyClaimDay {
  day: number;
  rewardPKR: number;
  label: string;
  isSpecial?: boolean;
}

export interface ReferralUser {
  id: string;
  name: string;
  joinedDate: string;
  adsWatched: number;
  commissionEarnedPKR: number;
  status: 'active' | 'idle';
}


