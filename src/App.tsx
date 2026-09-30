import React, { useState, useEffect } from 'react';
import { 
  AdCampaign, 
  UserWallet, 
  Transaction, 
  ReferralUser,
  DepositRequest,
  WithdrawalRequest,
  UserProfile,
  EarningPlan
} from './types/adRewards';
import { 
  INITIAL_WALLET, 
  INITIAL_CAMPAIGNS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_REFERRALS,
  INITIAL_DEPOSIT_REQUESTS,
  INITIAL_WITHDRAWAL_REQUESTS,
  INITIAL_USERS,
  EARNING_PLANS
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { UserDashboard } from './components/UserDashboard';
import { PlansSection } from './components/PlansSection';
import { AdvertiserPanel } from './components/AdvertiserPanel';
import { AdminPanel } from './components/AdminPanel';
import { MyAccountModal } from './components/MyAccountModal';
import { AuthPage } from './components/AuthPage';
import { FinanceWalletModal } from './components/FinanceWalletModal';
import { InteractiveAdModal } from './components/InteractiveAdModal';
import { ReferralSection } from './components/ReferralSection';
import { PlatformArbitrageModal } from './components/PlatformArbitrageModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { soundFX } from './utils/audio';

export function App() {
  // Authentication status: On first open of the website, user must see Login/Register page first!
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const savedAuth = localStorage.getItem('ar_adrewards_auth_status_v4');
      return savedAuth === 'true';
    } catch {
      return false;
    }
  });

  // Wallet state with localStorage backup
  const [wallet, setWallet] = useState<UserWallet>(() => {
    try {
      const saved = localStorage.getItem('ar_adrewards_wallet_v4');
      if (saved) return JSON.parse(saved);
      return INITIAL_WALLET;
    } catch {
      return INITIAL_WALLET;
    }
  });

  // Real Pakistani Users state
  const [users, setUsers] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem('ar_adrewards_users');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  // Current Logged-in User
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('ar_adrewards_active_user');
      if (saved) return JSON.parse(saved);
      return users[0] || INITIAL_USERS[0];
    } catch {
      return INITIAL_USERS[0];
    }
  });

  // Deposit Requests state (For Admin Panel approval to add money)
  const [depositRequests, setDepositRequests] = useState<DepositRequest[]>(() => {
    try {
      const saved = localStorage.getItem('ar_adrewards_deposits');
      if (saved) return JSON.parse(saved);
      return INITIAL_DEPOSIT_REQUESTS;
    } catch {
      return INITIAL_DEPOSIT_REQUESTS;
    }
  });

  // Withdrawal Requests state
  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>(() => {
    try {
      const saved = localStorage.getItem('ar_adrewards_withdrawals');
      if (saved) return JSON.parse(saved);
      return INITIAL_WITHDRAWAL_REQUESTS;
    } catch {
      return INITIAL_WITHDRAWAL_REQUESTS;
    }
  });

  // Campaigns / Tasks state (₨ 100/task to user)
  const [campaigns, setCampaigns] = useState<AdCampaign[]>(() => {
    try {
      const saved = localStorage.getItem('ar_adrewards_campaigns_v4');
      if (saved) {
        const parsed: AdCampaign[] = JSON.parse(saved);
        return parsed.map((c) => ({
          ...c,
          rewardPKR: 100.00,
          advertiserCostPerView: c.advertiserCostPerView || 150.00
        }));
      }
      return INITIAL_CAMPAIGNS;
    } catch {
      return INITIAL_CAMPAIGNS;
    }
  });

  // Transactions state
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem('ar_adrewards_txs_v4');
      if (saved) return JSON.parse(saved);
      return INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  // Referrals state
  const [referrals, setReferrals] = useState<ReferralUser[]>(() => {
    try {
      const saved = localStorage.getItem('ar_adrewards_referrals');
      return saved ? JSON.parse(saved) : INITIAL_REFERRALS;
    } catch {
      return INITIAL_REFERRALS;
    }
  });

  // Navigation tab: if not authenticated, start on 'auth' (Login / Register page)
  const [currentTab, setCurrentTab] = useState<'watch' | 'plans' | 'create' | 'wallet' | 'referrals' | 'arbitrage' | 'admin' | 'auth'>(() => {
    return isAuthenticated ? 'plans' : 'auth';
  });

  // Modals & UI States
  const [activeAdForModal, setActiveAdForModal] = useState<AdCampaign | null>(null);
  const [isInteractiveModalOpen, setIsInteractiveModalOpen] = useState(false);
  const [isFinanceModalOpen, setIsFinanceModalOpen] = useState(false);
  const [financeModalInitialTab, setFinanceModalInitialTab] = useState<'withdraw' | 'deposit'>('withdraw');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMyAccountModalOpen, setIsMyAccountModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [userRole, setUserRole] = useState<'earner' | 'advertiser' | 'admin'>(currentUser.role);

  // Toast Notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Persist state changes
  useEffect(() => {
    try {
      localStorage.setItem('ar_adrewards_auth_status_v4', isAuthenticated ? 'true' : 'false');
    } catch {}
  }, [isAuthenticated]);

  useEffect(() => {
    try {
      localStorage.setItem('ar_adrewards_wallet_v4', JSON.stringify(wallet));
    } catch {}
  }, [wallet]);

  useEffect(() => {
    try {
      localStorage.setItem('ar_adrewards_users', JSON.stringify(users));
    } catch {}
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem('ar_adrewards_active_user', JSON.stringify(currentUser));
    } catch {}
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('ar_adrewards_deposits', JSON.stringify(depositRequests));
    } catch {}
  }, [depositRequests]);

  useEffect(() => {
    try {
      localStorage.setItem('ar_adrewards_withdrawals', JSON.stringify(withdrawalRequests));
    } catch {}
  }, [withdrawalRequests]);

  useEffect(() => {
    try {
      localStorage.setItem('ar_adrewards_campaigns_v4', JSON.stringify(campaigns));
    } catch {}
  }, [campaigns]);

  useEffect(() => {
    try {
      localStorage.setItem('ar_adrewards_txs_v4', JSON.stringify(transactions));
    } catch {}
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem('ar_adrewards_referrals', JSON.stringify(referrals));
    } catch {}
  }, [referrals]);

  // Handler: When user watches a task and passes the math captcha (₨ 100 reward)
  const handleRewardClaimed = (rewardAmountPKR: number, adId: string, adTitle: string) => {
    setWallet((prev) => {
      const newTasksToday = (prev.tasksCompletedToday || prev.adsWatchedToday || 0) + 1;
      return {
        ...prev,
        earningsBalance: Number((prev.earningsBalance + rewardAmountPKR).toFixed(2)),
        totalLifetimeEarned: Number((prev.totalLifetimeEarned + rewardAmountPKR).toFixed(2)),
        adsWatchedToday: newTasksToday,
        tasksCompletedToday: newTasksToday,
        adsWatchedTotal: prev.adsWatchedTotal + 1,
      };
    });

    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === adId
          ? {
              ...c,
              completedViews: Math.min(c.totalViews, c.completedViews + 1),
              isWatchedToday: true,
            }
          : c
      )
    );

    const newTx: Transaction = {
      id: `tx-${Date.now().toString().slice(-6)}`,
      type: 'ad_reward',
      title: `Task Reward: ${adTitle.slice(0, 35)}...`,
      amountPKR: rewardAmountPKR,
      status: 'completed',
      date: 'Just now',
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast(`+₨ ${rewardAmountPKR.toFixed(2)} PKR Task Reward credited to your Earnings!`, 'success');
  };

  // Handler: New user registers on Login/Register page -> Grant exactly ₨ 50.00 Registration Reward
  // Immediately navigate to Plans page as requested ("usky bad sary plans ay ka user na konsa plan by karna ha")
  const handleRegisterSuccess = (newUser: UserProfile, bonusRewardPKR: number) => {
    setUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    setUserRole(newUser.role);
    setIsAuthenticated(true);

    setWallet((prev) => ({
      ...prev,
      earningsBalance: Number((prev.earningsBalance + bonusRewardPKR).toFixed(2)),
      totalLifetimeEarned: Number((prev.totalLifetimeEarned + bonusRewardPKR).toFixed(2)),
      activePlanId: 'plan-starter',
      dailyTasksLimit: 1,
      tasksCompletedToday: 0
    }));

    const newTx: Transaction = {
      id: `tx-welcome-${Date.now().toString().slice(-5)}`,
      type: 'ad_reward',
      title: 'New User Registration Reward (₨ 50.00 Welcome Bonus)',
      amountPKR: bonusRewardPKR,
      status: 'completed',
      date: 'Just now',
    };
    setTransactions((prev) => [newTx, ...prev]);

    soundFX.playRewardSuccess();
    showToast(`🎉 Mubarak ${newUser.name}! ₨ ${bonusRewardPKR.toFixed(2)} Registration Bonus added! Please select your earning plan.`, 'success');
    
    // As requested: "usky bad sary plans ay ka user na konsa plan by karna ha"
    setCurrentTab('plans');
  };

  // Handler: User logs in on Login/Register page -> Immediately show all plans
  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setUserRole(user.role);
    setIsAuthenticated(true);
    soundFX.playRewardSuccess();
    showToast(`Welcome back, ${user.name}! Please choose or review your earning plan.`, 'success');
    
    // As requested: "usky bad sary plans ay ka user na konsa plan by karna ha"
    setCurrentTab('plans');
  };

  // Handler: Logout user back to Login/Register page
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('ar_adrewards_auth_status_v4');
    setCurrentTab('auth');
    showToast('Logged out successfully. Welcome to AR AdRewards Account Portal.', 'info');
  };

  // Handler: Plan purchased (via JazzCash 03262636289 or Deposit Wallet)
  const handlePlanPurchased = (
    plan: EarningPlan,
    paymentMethod: 'JazzCash' | 'Deposit Wallet',
    txId?: string,
    senderNumber?: string
  ) => {
    setWallet((prev) => ({
      ...prev,
      activePlanId: plan.id,
      dailyTasksLimit: plan.dailyTasks,
      ...(paymentMethod === 'Deposit Wallet'
        ? { depositBalance: Math.max(0, Number((prev.depositBalance - plan.pricePKR).toFixed(2))) }
        : {})
    }));

    // If JazzCash, create a pending deposit request for admin approval in Admin Panel
    if (paymentMethod === 'JazzCash' && plan.pricePKR > 0) {
      const newDepReq: DepositRequest = {
        id: `dep-${Date.now().toString().slice(-4)}`,
        userId: currentUser.id,
        userName: currentUser.name,
        userPhone: senderNumber || currentUser.phone,
        amountPKR: plan.pricePKR,
        method: 'JazzCash',
        txId: txId || `JC-${Date.now().toString().slice(-6)}`,
        senderNumber: senderNumber || currentUser.phone,
        date: 'Just now',
        status: 'pending',
      };
      setDepositRequests((prev) => [newDepReq, ...prev]);
    }

    const newTx: Transaction = {
      id: `tx-plan-${Date.now().toString().slice(-5)}`,
      type: 'plan_purchase',
      title: `Plan Purchase: ${plan.name} (${plan.dailyTasks} Tasks/Day @ ₨ 100/Task)`,
      amountPKR: plan.pricePKR,
      status: 'completed',
      date: 'Just now',
      method: paymentMethod === 'JazzCash' ? `JazzCash (TID: ${txId})` : 'Deposit Wallet',
      txId,
    };
    setTransactions((prev) => [newTx, ...prev]);

    soundFX.playRewardSuccess();
    showToast(`🎉 Plan "${plan.name}" active! You now have ${plan.dailyTasks} daily tasks (₨ ${plan.dailyEarningsPKR}/day).`, 'success');
  };

  // Handler: Posting a new ad campaign (supports 1 ad at ₨ 150 market rate, paying via earnings, deposit, or direct mobile)
  const handleCampaignCreated = (
    newCampaign: AdCampaign,
    paymentSource: 'deposit' | 'earnings' | 'direct',
    costPKR: number,
    txId?: string,
    paymentMethod?: string
  ) => {
    setCampaigns((prev) => [newCampaign, ...prev]);

    if (paymentSource === 'earnings') {
      setWallet((prev) => ({
        ...prev,
        earningsBalance: Math.max(0, Number((prev.earningsBalance - costPKR).toFixed(2))),
      }));

      const newTx: Transaction = {
        id: `tx-${Date.now().toString().slice(-6)}`,
        type: 'ad_creation',
        title: `Ad Post: ${newCampaign.title.slice(0, 30)}... (Reinvested Earnings)`,
        amountPKR: costPKR,
        status: 'completed',
        date: 'Just now',
        method: 'Earnings Reinvestment',
      };
      setTransactions((prev) => [newTx, ...prev]);
      showToast(`Ad campaign published! ₨ ${costPKR} deducted from your earnings balance.`, 'success');

    } else if (paymentSource === 'deposit') {
      setWallet((prev) => ({
        ...prev,
        depositBalance: Math.max(0, Number((prev.depositBalance - costPKR).toFixed(2))),
      }));

      const newTx: Transaction = {
        id: `tx-${Date.now().toString().slice(-6)}`,
        type: 'ad_creation',
        title: `Ad Post: ${newCampaign.title.slice(0, 30)}... (Deposit Wallet)`,
        amountPKR: costPKR,
        status: 'completed',
        date: 'Just now',
        method: 'Deposit Wallet',
      };
      setTransactions((prev) => [newTx, ...prev]);
      showToast(`Ad campaign published! ₨ ${costPKR} paid from your deposit wallet.`, 'success');

    } else {
      // Direct mobile pay (JazzCash sent to 03262636289)
      const newDepReq: DepositRequest = {
        id: `dep-${Date.now().toString().slice(-4)}`,
        userId: currentUser.id,
        userName: currentUser.name,
        userPhone: currentUser.phone,
        amountPKR: costPKR,
        method: 'JazzCash',
        txId: txId || `JC-${Date.now().toString().slice(-6)}`,
        senderNumber: currentUser.phone,
        date: 'Just now',
        status: 'pending',
      };
      setDepositRequests((prev) => [newDepReq, ...prev]);

      const newTx: Transaction = {
        id: `tx-${Date.now().toString().slice(-6)}`,
        type: 'ad_creation',
        title: `Ad Post: ${newCampaign.title.slice(0, 30)}... (TID: ${txId})`,
        amountPKR: costPKR,
        status: 'completed',
        date: 'Just now',
        method: 'JazzCash Direct (0326-2636289)',
        txId,
      };
      setTransactions((prev) => [newTx, ...prev]);
      showToast(`Ad published! Payment request (₨ ${costPKR}) sent to Admin Panel for JazzCash verification.`, 'info');
    }
  };

  // Handler: Admin approves deposit payment -> adds money to user's deposit balance!
  const handleApproveDeposit = (depositId: string) => {
    const req = depositRequests.find((d) => d.id === depositId);
    if (!req) return;

    setDepositRequests((prev) =>
      prev.map((d) =>
        d.id === depositId
          ? { ...d, status: 'approved', reviewedAt: 'Just now' }
          : d
      )
    );

    setWallet((prev) => ({
      ...prev,
      depositBalance: Number((prev.depositBalance + req.amountPKR).toFixed(2)),
    }));

    const newTx: Transaction = {
      id: `tx-${Date.now().toString().slice(-6)}`,
      type: 'deposit',
      title: `Admin Approved Deposit (${req.userName})`,
      amountPKR: req.amountPKR,
      status: 'completed',
      date: 'Just now',
      method: req.method,
      txId: req.txId,
    };
    setTransactions((prev) => [newTx, ...prev]);

    soundFX.playRewardSuccess();
    showToast(`Approved! ₨ ${req.amountPKR.toFixed(2)} added to Deposit Balance (${req.userName}).`, 'success');
  };

  // Handler: Admin rejects deposit
  const handleRejectDeposit = (depositId: string, reason?: string) => {
    setDepositRequests((prev) =>
      prev.map((d) =>
        d.id === depositId
          ? { ...d, status: 'rejected', reviewedAt: 'Just now', rejectReason: reason || 'Invalid TID / Unconfirmed JazzCash payment' }
          : d
      )
    );
    soundFX.playError();
    showToast(`Deposit request #${depositId} rejected: ${reason || 'Invalid TID'}`, 'error');
  };

  // Handler: Admin approves withdrawal
  const handleApproveWithdrawal = (withdrawalId: string, payoutTxId?: string) => {
    const req = withdrawalRequests.find((w) => w.id === withdrawalId);
    if (!req) return;

    setWithdrawalRequests((prev) =>
      prev.map((w) =>
        w.id === withdrawalId
          ? { ...w, status: 'approved', reviewedAt: 'Just now', payoutTxId: payoutTxId || `JC-${Date.now().toString().slice(-6)}` }
          : w
      )
    );

    setTransactions((prev) =>
      prev.map((t) =>
        t.type === 'withdrawal' && t.status === 'pending'
          ? { ...t, status: 'completed' }
          : t
      )
    );

    soundFX.playRewardSuccess();
    showToast(`Withdrawal of ₨ ${req.amountPKR.toFixed(2)} marked paid to ${req.accountNumber} via JazzCash!`, 'success');
  };

  // Handler: Admin rejects withdrawal -> refund earnings
  const handleRejectWithdrawal = (withdrawalId: string) => {
    const req = withdrawalRequests.find((w) => w.id === withdrawalId);
    if (!req) return;

    setWithdrawalRequests((prev) =>
      prev.map((w) =>
        w.id === withdrawalId
          ? { ...w, status: 'rejected', reviewedAt: 'Just now' }
          : w
      )
    );

    setWallet((prev) => ({
      ...prev,
      earningsBalance: Number((prev.earningsBalance + req.amountPKR).toFixed(2)),
    }));

    showToast(`Withdrawal rejected. ₨ ${req.amountPKR.toFixed(2)} refunded to user balance.`, 'info');
  };

  // Handler: Switch active user account
  const handleSwitchUser = (user: UserProfile) => {
    setCurrentUser(user);
    setUserRole(user.role);
    soundFX.playClick();
    showToast(`Switched active user to ${user.name} (${user.role.toUpperCase()})`, 'info');
  };

  // Handler: Create new real Pakistani user from Admin Panel
  const handleCreateNewUser = (newUser: UserProfile) => {
    setUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    setUserRole(newUser.role);
    soundFX.playRewardSuccess();
    showToast(`New Pakistani user registered: ${newUser.name} (${newUser.city || 'Pakistan'})`, 'success');
  };

  // Handler: Update current user profile
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    const modified = { ...currentUser, ...updated };
    setCurrentUser(modified);
    setUsers((prev) => prev.map((u) => (u.id === modified.id ? modified : u)));
    showToast('Your profile information has been saved!', 'success');
  };

  // Handler: User submits deposit in Finance Modal -> Creates pending request for Admin approval
  const handleDepositConfirmed = (amountPKR: number, method: string, txId: string) => {
    const newDepReq: DepositRequest = {
      id: `dep-${Date.now().toString().slice(-4)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: currentUser.phone,
      amountPKR,
      method: (method === 'Bank Transfer' ? 'Bank Transfer' : 'JazzCash'),
      txId,
      senderNumber: currentUser.phone,
      date: 'Just now',
      status: 'pending',
    };
    setDepositRequests((prev) => [newDepReq, ...prev]);

    const newTx: Transaction = {
      id: `tx-${Date.now().toString().slice(-6)}`,
      type: 'deposit',
      title: `Deposit via JazzCash 03262636289 (Pending Admin Approval)`,
      amountPKR,
      status: 'pending',
      date: 'Just now',
      method,
      txId,
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast(`Deposit of ₨ ${amountPKR.toFixed(2)} submitted with JazzCash TID: ${txId}! Pending Admin approval.`, 'info');
  };

  // Handler: Add manual deposit request helper for testing Admin Panel
  const handleAddManualDepositRequest = () => {
    const sampleAmounts = [1000, 2500, 5000, 10000];
    const randAmt = sampleAmounts[Math.floor(Math.random() * sampleAmounts.length)];
    const randUser = users[Math.floor(Math.random() * users.length)];
    const randTid = `JC-${Math.floor(1000000000 + Math.random() * 9000000000)}`;

    const newDep: DepositRequest = {
      id: `dep-${Date.now().toString().slice(-4)}`,
      userId: randUser.id,
      userName: randUser.name,
      userPhone: randUser.phone,
      amountPKR: randAmt,
      method: 'JazzCash',
      txId: randTid,
      senderNumber: randUser.phone,
      date: 'Just now',
      status: 'pending',
    };

    setDepositRequests((prev) => [newDep, ...prev]);
    soundFX.playClick();
    showToast(`New pending JazzCash payment of ₨ ${randAmt} from ${randUser.name} added to Admin Panel!`, 'info');
  };

  // Handler: User requests cashout
  const handleWithdrawalRequested = (
    amountPKR: number,
    method: string,
    title: string,
    number: string
  ) => {
    setWallet((prev) => ({
      ...prev,
      earningsBalance: Math.max(0, Number((prev.earningsBalance - amountPKR).toFixed(2))),
    }));

    const newWthReq: WithdrawalRequest = {
      id: `wth-${Date.now().toString().slice(-4)}`,
      userId: currentUser.id,
      userName: title,
      userPhone: number,
      amountPKR,
      method,
      accountTitle: title,
      accountNumber: number,
      date: 'Just now',
      status: 'pending',
    };
    setWithdrawalRequests((prev) => [newWthReq, ...prev]);

    const newTx: Transaction = {
      id: `tx-${Date.now().toString().slice(-6)}`,
      type: 'withdrawal',
      title: `Cashout to JazzCash (${number})`,
      amountPKR: amountPKR,
      status: 'pending',
      date: 'Just now',
      method,
      accountTitle: title,
      accountNumber: number,
    };
    setTransactions((prev) => [newTx, ...prev]);
    showToast(`Withdrawal of ₨ ${amountPKR.toFixed(2)} PKR submitted to JazzCash! Pending admin processing.`, 'info');
  };

  // Helper: Simulate inviting a friend
  const handleInviteSimulatedFriend = () => {
    const pakistaniNames = [
      'Shahid Afridi (Peshawar)',
      'Ayesha Siddiqa (Lahore)',
      'Tariq Mehmood (Faisalabad)',
      'Fahad Mustafa (Karachi)',
      'Zubair Ahmed (Multan)',
    ];
    const randomName = pakistaniNames[Math.floor(Math.random() * pakistaniNames.length)];

    const newRef: ReferralUser = {
      id: `ref-${Date.now().toString().slice(-5)}`,
      name: randomName,
      joinedDate: 'Today',
      adsWatched: 5,
      commissionEarnedPKR: 50.00,
      status: 'active',
    };

    setReferrals((prev) => [newRef, ...prev]);
    setWallet((prev) => ({
      ...prev,
      referredUsersCount: prev.referredUsersCount + 1,
      referralEarnings: Number((prev.referralEarnings + 50.00).toFixed(2)),
      earningsBalance: Number((prev.earningsBalance + 50.00).toFixed(2)),
    }));

    const newTx: Transaction = {
      id: `tx-${Date.now().toString().slice(-6)}`,
      type: 'referral_commission',
      title: `10% Referral Cut: ${randomName.split(' ')[0]} joined & completed tasks`,
      amountPKR: 50.00,
      status: 'completed',
      date: 'Just now',
    };
    setTransactions((prev) => [newTx, ...prev]);
    showToast(`New referral joined! +₨ 50.00 PKR 10% commission credited.`, 'success');
  };

  const handleOpenAdToWatch = (ad: AdCampaign) => {
    setActiveAdForModal(ad);
    setIsInteractiveModalOpen(true);
  };

  const openDepositModal = () => {
    setFinanceModalInitialTab('deposit');
    setIsFinanceModalOpen(true);
  };

  const openWithdrawModal = () => {
    setFinanceModalInitialTab('withdraw');
    setIsFinanceModalOpen(true);
  };

  const pendingDepositsCount = depositRequests.filter((d) => d.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 animate-bounce">
          <div className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold shadow-2xl flex items-center gap-2.5 backdrop-blur-md ${
            toast.type === 'success' ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 shadow-emerald-950/50' :
            toast.type === 'error' ? 'bg-rose-950/90 border-rose-500 text-rose-200 shadow-rose-950/50' :
            'bg-cyan-950/90 border-cyan-500 text-cyan-200 shadow-cyan-950/50'
          }`}>
            <i className={`fa-solid ${
              toast.type === 'success' ? 'fa-circle-check text-emerald-400' :
              toast.type === 'error' ? 'fa-circle-exclamation text-rose-400' :
              'fa-circle-info text-cyan-400'
            }`}></i>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Header / Navbar */}
      <Navbar
        wallet={wallet}
        currentUser={currentUser}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        openDepositModal={openDepositModal}
        openWithdrawModal={openWithdrawModal}
        openAuthModal={() => setCurrentTab('auth')}
        openMyAccountModal={() => setIsMyAccountModalOpen(true)}
        pendingDepositsCount={pendingDepositsCount}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        userRole={userRole}
        setUserRole={setUserRole}
        onLogout={handleLogout}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        
        {/* 1. Login & Register Page:
            "jab website ko open kry to prhly login register ka page ay" */}
        {currentTab === 'auth' && (
          <AuthPage
            onRegisterSuccess={handleRegisterSuccess}
            onLoginSuccess={handleLoginSuccess}
            users={users}
            initialMode="register"
          />
        )}

        {/* 2. Earning Plans Section:
            "usky bad sary plans ay ka user na konsa plan by karna ha" */}
        {currentTab === 'plans' && (
          <PlansSection
            wallet={wallet}
            currentUser={currentUser}
            onPlanPurchased={handlePlanPurchased}
            onNavigateToTasks={() => setCurrentTab('watch')}
          />
        )}

        {/* 3. Daily Tasks Center:
            "phir add watchin ki jaga task button do" */}
        {currentTab === 'watch' && (
          <UserDashboard
            wallet={wallet}
            campaigns={campaigns}
            onSelectTaskToPerform={handleOpenAdToWatch}
            onSelectAdToWatch={handleOpenAdToWatch}
            openCreateAdModal={() => setCurrentTab('create')}
            openWithdrawModal={openWithdrawModal}
            openPlansPage={() => setCurrentTab('plans')}
            openAuthPage={() => setCurrentTab('auth')}
          />
        )}

        {/* 4. Advertiser Panel (Post Your Ad - Starts from 1 Ad @ ₨ 150 Market Rate) */}
        {currentTab === 'create' && (
          <AdvertiserPanel
            wallet={wallet}
            currentUser={currentUser}
            onCampaignCreated={handleCampaignCreated}
            openDepositModal={openDepositModal}
          />
        )}

        {/* 5. Admin Panel (Approve JazzCash Payments to Add Money & Manage Users) */}
        {currentTab === 'admin' && (
          <AdminPanel
            depositRequests={depositRequests}
            withdrawalRequests={withdrawalRequests}
            users={users}
            currentUser={currentUser}
            wallet={wallet}
            onApproveDeposit={handleApproveDeposit}
            onRejectDeposit={handleRejectDeposit}
            onApproveWithdrawal={handleApproveWithdrawal}
            onRejectWithdrawal={handleRejectWithdrawal}
            onSwitchUser={handleSwitchUser}
            onCreateNewUser={handleCreateNewUser}
            onAddManualDepositRequest={handleAddManualDepositRequest}
          />
        )}

        {/* 6. Finance & Wallet Section */}
        {currentTab === 'wallet' && (
          <div className="max-w-4xl mx-auto space-y-6 pb-16">
            <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white">PKR Financial Hub</h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Manage deposits, request verified JazzCash withdrawals to <strong className="text-rose-400 font-mono">03262636289</strong>, or review your transaction audit history.
                </p>
                <div className="mt-2 text-xs text-amber-400 flex items-center gap-1.5">
                  <i className="fa-solid fa-clock"></i>
                  <span>Easypaisa is not available (baad me add hoga). JazzCash active hai.</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={openDepositModal}
                  className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <i className="fa-solid fa-plus"></i>
                  <span>Deposit JazzCash</span>
                </button>
                <button
                  onClick={openWithdrawModal}
                  className="px-4 py-2.5 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <i className="fa-solid fa-arrow-up-from-bracket"></i>
                  <span>Withdraw (₨ 500)</span>
                </button>
              </div>
            </div>

            {/* In-page Wallet Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-[#1E293B] border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-semibold text-slate-400">Earnings Balance</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Ready to cash out</span>
                </div>
                <div className="font-mono-numbers text-3xl font-extrabold text-[#10B981]">
                  ₨ {wallet.earningsBalance.toFixed(2)} PKR
                </div>
                <div className="text-xs text-slate-400">
                  Minimum withdrawal threshold: <strong>₨ 500.00 PKR</strong> (JazzCash)
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={openWithdrawModal}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <i className="fa-solid fa-arrow-up-from-bracket"></i>
                    <span>Cashout via JazzCash</span>
                  </button>
                  <button
                    onClick={() => setCurrentTab('watch')}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 font-semibold text-xs cursor-pointer"
                  >
                    Tasks (₨ 100/task)
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#1E293B] border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-semibold text-slate-400">Deposit Balance</span>
                  <span className="text-[10px] text-cyan-400 font-mono">For Plans & Posting Ads</span>
                </div>
                <div className="font-mono-numbers text-3xl font-extrabold text-cyan-400">
                  ₨ {wallet.depositBalance.toFixed(2)} PKR
                </div>
                <div className="text-xs text-slate-400">
                  Official JazzCash: <strong className="text-white font-mono">0326-2636289</strong>
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={openDepositModal}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <i className="fa-solid fa-plus"></i>
                    <span>Top-up with JazzCash</span>
                  </button>
                  <button
                    onClick={() => setCurrentTab('plans')}
                    className="py-2.5 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold text-xs cursor-pointer"
                  >
                    VIP Plans
                  </button>
                </div>
              </div>
            </div>

            {/* In-page Recent Transactions */}
            <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Full Transaction Audit Ledger</h3>
                <span className="text-xs text-slate-400 font-mono">{transactions.length} records</span>
              </div>
              <div className="divide-y divide-slate-800 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 max-h-96 overflow-y-auto">
                {transactions.map((tx) => (
                  <div key={tx.id} className="p-3.5 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-white">{tx.title}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {tx.date} · ID: {tx.id} {tx.txId ? `· TID: ${tx.txId}` : ''}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-mono-numbers font-bold ${
                        tx.type === 'withdrawal' || tx.type === 'ad_creation' ? 'text-rose-400' : 'text-emerald-400'
                      }`}>
                        {tx.type === 'withdrawal' || tx.type === 'ad_creation' ? '-' : '+'}₨ {tx.amountPKR.toFixed(2)}
                      </div>
                      <span className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded ${
                        tx.status === 'completed' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40' :
                        tx.status === 'pending' ? 'bg-amber-950/80 text-amber-400 border border-amber-800/40' :
                        'bg-rose-950/80 text-rose-400 border border-rose-800/40'
                      }`}>
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 7. Viral Growth & Referral Program */}
        {currentTab === 'referrals' && (
          <ReferralSection
            wallet={wallet}
            referrals={referrals}
            onInviteSimulatedFriend={handleInviteSimulatedFriend}
          />
        )}

        {/* 8. Platform Arbitrage (50% Margin) */}
        {currentTab === 'arbitrage' && (
          <PlatformArbitrageModal
            campaigns={campaigns}
            onOpenCreateAd={() => setCurrentTab('create')}
          />
        )}

      </main>

      {/* Interactive Task Viewer Modal with 15s Timer & Anti-Bot Captcha */}
      <InteractiveAdModal
        ad={activeAdForModal}
        isOpen={isInteractiveModalOpen}
        onClose={() => {
          setIsInteractiveModalOpen(false);
          setActiveAdForModal(null);
        }}
        onRewardClaimed={handleRewardClaimed}
      />

      {/* Finance & Wallet Modal (Deposit / Withdraw / History) */}
      <FinanceWalletModal
        isOpen={isFinanceModalOpen}
        initialTab={financeModalInitialTab}
        onClose={() => setIsFinanceModalOpen(false)}
        wallet={wallet}
        transactions={transactions}
        onDepositConfirmed={handleDepositConfirmed}
        onWithdrawalRequested={handleWithdrawalRequested}
      />

      {/* My Account Modal with Real Pakistani Users & Payout Settings */}
      <MyAccountModal
        isOpen={isMyAccountModalOpen}
        onClose={() => setIsMyAccountModalOpen(false)}
        currentUser={currentUser}
        wallet={wallet}
        users={users}
        onUpdateProfile={handleUpdateProfile}
        onSwitchUser={handleSwitchUser}
        openWithdrawModal={openWithdrawModal}
        openDepositModal={openDepositModal}
        onLogout={handleLogout}
        openPlansPage={() => {
          setIsMyAccountModalOpen(false);
          setCurrentTab('plans');
        }}
      />

      {/* Account / Quick Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onUpdateUser={(name, phone, email) => {
          handleUpdateProfile({ name, phone, email });
          showToast(`Logged in as ${name} (${phone})`, 'success');
        }}
      />

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          soundFX.playClick();
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        openDepositModal={openDepositModal}
        openWithdrawModal={openWithdrawModal}
      />

    </div>
  );
}
export default App;
