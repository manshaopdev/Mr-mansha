import React, { useState } from 'react';
import { UserWallet, UserProfile } from '../types/adRewards';
import { soundFX } from '../utils/audio';

interface NavbarProps {
  wallet: UserWallet;
  currentUser: UserProfile;
  currentTab: 'watch' | 'plans' | 'create' | 'wallet' | 'referrals' | 'arbitrage' | 'admin' | 'auth';
  setCurrentTab: (tab: 'watch' | 'plans' | 'create' | 'wallet' | 'referrals' | 'arbitrage' | 'admin' | 'auth') => void;
  openDepositModal: () => void;
  openWithdrawModal: () => void;
  openAuthModal: () => void;
  openMyAccountModal: () => void;
  pendingDepositsCount: number;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  userRole: 'earner' | 'advertiser' | 'admin';
  setUserRole: (role: 'earner' | 'advertiser' | 'admin') => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  wallet,
  currentUser,
  currentTab,
  setCurrentTab,
  openDepositModal,
  openWithdrawModal,
  openMyAccountModal,
  pendingDepositsCount,
  soundEnabled,
  setSoundEnabled,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'watch' | 'plans' | 'create' | 'wallet' | 'referrals' | 'arbitrage' | 'admin' | 'auth') => {
    soundFX.playClick();
    setCurrentTab(tab);
    setMobileMenuOpen(false);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFX.enabled = next;
    if (next) soundFX.playRewardSuccess();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Zone 1: Stylized Brand Logo */}
          <div 
            onClick={() => handleNavClick('watch')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#10B981] via-[#06B6D4] to-emerald-400 p-[2px] transition-transform duration-200 group-hover:scale-105">
              <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center">
                <i className="fa-solid fa-list-check text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-lg pl-0.5"></i>
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block">
                AR <span className="text-[#10B981]">AdRewards</span>
              </span>
              <span className="text-[11px] text-slate-400 block -mt-1 tracking-wider uppercase">
                Tasks & Earning · JazzCash 03262636289
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* 1. Tasks Tab (Replacing Watch Ads) */}
            <button
              onClick={() => handleNavClick('watch')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                currentTab === 'watch' 
                  ? 'bg-slate-800 text-[#10B981] ring-1 ring-emerald-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <i className="fa-solid fa-list-check text-xs text-emerald-400"></i>
              <span>Tasks (₨ 100)</span>
            </button>

            {/* 2. Plans Tab (VIP Earning Plans) */}
            <button
              onClick={() => handleNavClick('plans')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'plans' 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 ring-1 ring-amber-500/30' 
                  : 'text-amber-400 hover:text-amber-300 hover:bg-slate-800/50'
              }`}
            >
              <i className="fa-solid fa-crown text-xs text-amber-400"></i>
              <span>Plans</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                VIP
              </span>
            </button>

            {/* 3. Post Ad (Advertiser Panel) */}
            <button
              onClick={() => handleNavClick('create')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                currentTab === 'create' 
                  ? 'bg-slate-800 text-[#06B6D4]' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <i className="fa-solid fa-bullhorn text-xs opacity-75"></i>
              <span>Post Ad</span>
            </button>

            {/* 4. Wallet Tab */}
            <button
              onClick={() => handleNavClick('wallet')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                currentTab === 'wallet' 
                  ? 'bg-slate-800 text-[#10B981]' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <i className="fa-solid fa-wallet text-xs opacity-75"></i>
              <span>Wallet</span>
            </button>

            {/* 5. Referral Tab */}
            <button
              onClick={() => handleNavClick('referrals')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                currentTab === 'referrals' 
                  ? 'bg-slate-800 text-[#10B981]' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <i className="fa-solid fa-users text-xs opacity-75"></i>
              <span>Referral (10%)</span>
            </button>

            {/* 6. Admin Panel Tab */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'admin' 
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                  : 'text-amber-400/90 hover:text-amber-300 hover:bg-amber-500/10'
              }`}
            >
              <i className="fa-solid fa-shield-halved text-xs"></i>
              <span>Admin</span>
              {pendingDepositsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center ml-0.5">
                  {pendingDepositsCount}
                </span>
              )}
            </button>

            {/* 7. Dedicated Login / Register Nav Link */}
            <button
              onClick={() => handleNavClick('auth')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'auth'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50'
              }`}
            >
              <i className="fa-solid fa-user-plus text-xs text-amber-400"></i>
              <span>Register</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30 ml-0.5">
                ₨ 50
              </span>
            </button>
          </nav>

          {/* Zone 3: Live Wallet Balances & Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* View Plans Button */}
            <button
              onClick={() => handleNavClick('plans')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                currentTab === 'plans'
                  ? 'bg-amber-500/25 border-amber-400 text-amber-300'
                  : 'bg-slate-800/90 hover:bg-slate-800 border-amber-500/40 text-amber-400'
              }`}
              title="Click to view all VIP Earning Plans"
            >
              <i className="fa-solid fa-crown text-amber-400"></i>
              <span>Plans</span>
            </button>

            {/* Dual Wallet Display */}
            <div className="flex items-center gap-2 bg-[#1E293B] border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs">
              {/* Earnings Wallet */}
              <div 
                onClick={openWithdrawModal}
                className="cursor-pointer group pr-2.5 border-r border-slate-700 hover:opacity-90 transition-opacity"
                title="Click to withdraw earnings to JazzCash"
              >
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">Earnings</span>
                <span className="font-mono-numbers font-bold text-[#10B981] text-sm flex items-center gap-1">
                  ₨ {wallet.earningsBalance.toFixed(2)}
                  <i className="fa-solid fa-arrow-up-right-from-square text-[9px] opacity-60 group-hover:opacity-100"></i>
                </span>
              </div>

              {/* Deposit Balance */}
              <div 
                onClick={openDepositModal}
                className="cursor-pointer group pl-1 hover:opacity-90 transition-opacity"
                title="Click to top up deposit balance via JazzCash 03262636289"
              >
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">Deposit</span>
                <span className="font-mono-numbers font-bold text-slate-200 text-sm flex items-center gap-1">
                  ₨ {wallet.depositBalance.toFixed(2)}
                  <i className="fa-solid fa-plus text-[9px] text-[#06B6D4] opacity-80 group-hover:opacity-100"></i>
                </span>
              </div>
            </div>

            {/* My Account Button */}
            <button
              onClick={() => {
                soundFX.playClick();
                openMyAccountModal();
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white transition-all shadow-sm cursor-pointer"
              title="Open My Account details"
            >
              <div className="w-5 h-5 rounded-full bg-[#10B981] text-slate-950 font-extrabold text-[10px] flex items-center justify-center">
                {currentUser.name[0]}
              </div>
              <span className="truncate max-w-[90px]">{currentUser.name.split(' ')[0]}</span>
            </button>

            {/* Logout / Switch Button */}
            {onLogout && (
              <button
                onClick={() => {
                  soundFX.playClick();
                  onLogout();
                }}
                className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 hover:border-rose-800/40 transition-colors cursor-pointer"
                title="Logout to Login/Register page"
              >
                <i className="fa-solid fa-arrow-right-from-bracket text-xs"></i>
              </button>
            )}

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-colors cursor-pointer ${
                soundEnabled 
                  ? 'border-slate-700 text-emerald-400 hover:bg-slate-800' 
                  : 'border-slate-800 text-slate-500 hover:bg-slate-800'
              }`}
              title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              aria-label="Sound Toggle"
            >
              <i className={`fa-solid ${soundEnabled ? 'fa-volume-high' : 'fa-volume-xmark'} text-xs`}></i>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={() => handleNavClick('plans')}
              className="px-2 py-1 text-xs font-bold text-amber-400 bg-slate-800 border border-amber-500/40 rounded-lg flex items-center gap-1 cursor-pointer"
            >
              <i className="fa-solid fa-crown text-amber-400 text-[10px]"></i>
              <span>Plans</span>
            </button>
            <button
              onClick={openMyAccountModal}
              className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center text-xs font-bold border border-slate-700 cursor-pointer"
            >
              {currentUser.name[0]}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#0F172A] px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            <div 
              onClick={() => { openWithdrawModal(); setMobileMenuOpen(false); }}
              className="bg-[#1E293B] p-2.5 rounded-lg border border-slate-700 cursor-pointer"
            >
              <div className="text-[10px] text-slate-400 uppercase">Earnings</div>
              <div className="font-mono-numbers font-bold text-[#10B981] text-sm">
                ₨ {wallet.earningsBalance.toFixed(2)}
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5">Withdraw via JazzCash →</div>
            </div>

            <div 
              onClick={() => { openDepositModal(); setMobileMenuOpen(false); }}
              className="bg-[#1E293B] p-2.5 rounded-lg border border-slate-700 cursor-pointer"
            >
              <div className="text-[10px] text-slate-400 uppercase">Deposit</div>
              <div className="font-mono-numbers font-bold text-slate-200 text-sm">
                ₨ {wallet.depositBalance.toFixed(2)}
              </div>
              <div className="text-[10px] text-cyan-400 mt-0.5">JazzCash 03262636289 →</div>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-sm font-medium">
            <button
              onClick={() => handleNavClick('watch')}
              className={`p-2.5 rounded-lg text-left flex items-center justify-between ${
                currentTab === 'watch' ? 'bg-slate-800 text-[#10B981]' : 'text-slate-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-list-check text-xs text-emerald-400"></i>
                <span>Daily Tasks (₨ 100 / Task)</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">15s Timer</span>
            </button>

            <button
              onClick={() => handleNavClick('plans')}
              className={`p-2.5 rounded-lg text-left flex items-center justify-between ${
                currentTab === 'plans' ? 'bg-amber-500/20 text-amber-300' : 'text-amber-400'
              }`}
            >
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-crown text-xs text-amber-400"></i>
                <span>Earning Plans (VIP Packages)</span>
              </span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold border border-amber-500/30">
                Up to ₨ 60,000/mo
              </span>
            </button>

            <button
              onClick={() => handleNavClick('create')}
              className={`p-2.5 rounded-lg text-left flex items-center justify-between ${
                currentTab === 'create' ? 'bg-slate-800 text-[#06B6D4]' : 'text-slate-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-bullhorn text-xs"></i>
                <span>Post Your Ad (₨ 150)</span>
              </span>
              <span className="text-[10px] text-cyan-400">Market Rate</span>
            </button>

            <button
              onClick={() => handleNavClick('auth')}
              className={`p-2.5 rounded-lg text-left flex items-center justify-between ${
                currentTab === 'auth' ? 'bg-slate-800 text-emerald-400' : 'text-slate-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-user-plus text-xs text-amber-400"></i>
                <span>Login & Register Page</span>
              </span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold border border-amber-500/30">
                ₨ 50 Reward
              </span>
            </button>

            <button
              onClick={() => handleNavClick('wallet')}
              className={`p-2.5 rounded-lg text-left flex items-center justify-between ${
                currentTab === 'wallet' ? 'bg-slate-800 text-[#10B981]' : 'text-slate-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-wallet text-xs"></i>
                <span>Wallet & Transactions</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">JazzCash</span>
            </button>

            <button
              onClick={() => handleNavClick('referrals')}
              className={`p-2.5 rounded-lg text-left flex items-center justify-between ${
                currentTab === 'referrals' ? 'bg-slate-800 text-[#10B981]' : 'text-slate-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-users text-xs"></i>
                <span>Referral Program</span>
              </span>
              <span className="text-[10px] text-slate-400">10% Commission</span>
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className={`p-2.5 rounded-lg text-left flex items-center justify-between ${
                currentTab === 'admin' ? 'bg-amber-500/20 text-amber-400' : 'text-amber-400'
              }`}
            >
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-shield-halved text-xs"></i>
                <span>Admin Panel</span>
              </span>
              {pendingDepositsCount > 0 && (
                <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                  {pendingDepositsCount} Pending
                </span>
              )}
            </button>

            <button
              onClick={() => { openMyAccountModal(); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg text-left flex items-center justify-between text-slate-300"
            >
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-circle-user text-xs text-emerald-400"></i>
                <span>My Account ({currentUser.name})</span>
              </span>
              <span className="text-[10px] text-emerald-400">Verified</span>
            </button>

            {onLogout && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="p-2.5 rounded-lg text-left flex items-center justify-between text-rose-400 hover:bg-rose-950/20"
              >
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-arrow-right-from-bracket text-xs"></i>
                  <span>Log Out (Switch Account)</span>
                </span>
              </button>
            )}
          </div>
        </div>
      )}

    </header>
  );
};
