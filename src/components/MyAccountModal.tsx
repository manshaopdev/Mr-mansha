import React, { useState } from 'react';
import { UserProfile, UserWallet } from '../types/adRewards';
import { soundFX } from '../utils/audio';

interface MyAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  wallet: UserWallet;
  users: UserProfile[];
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onSwitchUser: (user: UserProfile) => void;
  openWithdrawModal: () => void;
  openDepositModal: () => void;
  onLogout?: () => void;
  openPlansPage?: () => void;
}

export const MyAccountModal: React.FC<MyAccountModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  wallet,
  users,
  onUpdateProfile,
  onSwitchUser,
  openWithdrawModal,
  openDepositModal,
  onLogout,
  openPlansPage,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'profile' | 'switch' | 'payout' | 'security'>('profile');
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [city, setCity] = useState(currentUser.city || 'Karachi');
  const [defaultMethod, setDefaultMethod] = useState(currentUser.defaultMethod || 'Easypaisa');
  const [defaultAccountNumber, setDefaultAccountNumber] = useState(currentUser.defaultAccountNumber || currentUser.phone);
  const [defaultAccountTitle, setDefaultAccountTitle] = useState(currentUser.defaultAccountTitle || currentUser.name);
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: name.trim(),
      phone: phone.trim(),
      city,
      defaultMethod,
      defaultAccountNumber: defaultAccountNumber.trim(),
      defaultAccountTitle: defaultAccountTitle.trim(),
    });
    soundFX.playRewardSuccess();
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
      <div
        className="relative w-full max-w-2xl bg-[#0F172A] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#1E293B] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#10B981] to-[#06B6D4] p-[1.5px]">
              <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center font-extrabold text-[#10B981] text-base">
                {currentUser.name[0]}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">{currentUser.name}</h2>
                {currentUser.isVerified && (
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.2 rounded-full border border-emerald-800 flex items-center gap-1">
                    <i className="fa-solid fa-check text-[9px]"></i>
                    <span>Verified</span>
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {currentUser.phone} · {currentUser.city || 'Pakistan'} · Member since {currentUser.joinedDate}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* Live Wallet Balances Strip */}
        <div className="grid grid-cols-2 bg-slate-900/90 border-b border-slate-800 px-6 py-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">Earnings Balance</span>
            <div className="font-mono-numbers text-lg font-bold text-[#10B981] flex items-center gap-2">
              ₨ {wallet.earningsBalance.toFixed(2)} PKR
              <button
                onClick={() => {
                  onClose();
                  openWithdrawModal();
                }}
                className="text-[11px] text-emerald-400 hover:underline font-sans font-medium"
              >
                Cashout →
              </button>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">Deposit Balance</span>
            <div className="font-mono-numbers text-lg font-bold text-cyan-400 flex items-center justify-end gap-2">
              ₨ {wallet.depositBalance.toFixed(2)} PKR
              <button
                onClick={() => {
                  onClose();
                  openDepositModal();
                }}
                className="text-[11px] text-cyan-400 hover:underline font-sans font-medium"
              >
                Top-up →
              </button>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-[#1E293B]/50 px-6 pt-2 overflow-x-auto">
          <button
            onClick={() => {
              soundFX.playClick();
              setActiveTab('profile');
            }}
            className={`pb-2.5 px-3.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-[#10B981] text-[#10B981]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <i className="fa-solid fa-user"></i>
            <span>My Profile</span>
          </button>

          <button
            onClick={() => {
              soundFX.playClick();
              setActiveTab('switch');
            }}
            className={`pb-2.5 px-3.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'switch'
                ? 'border-[#06B6D4] text-[#06B6D4]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <i className="fa-solid fa-users"></i>
            <span>Switch Real User ({users.length})</span>
          </button>

          <button
            onClick={() => {
              soundFX.playClick();
              setActiveTab('payout');
            }}
            className={`pb-2.5 px-3.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'payout'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <i className="fa-solid fa-mobile-screen"></i>
            <span>Saved Easypaisa / JazzCash</span>
          </button>

          <button
            onClick={() => {
              soundFX.playClick();
              setActiveTab('security');
            }}
            className={`pb-2.5 px-3.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'security'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <i className="fa-solid fa-shield"></i>
            <span>Security</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {isSavedNotice && (
            <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
              <i className="fa-solid fa-circle-check text-emerald-400 text-base"></i>
              <span>Your profile information has been saved successfully!</span>
            </div>
          )}

          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1 font-medium">Pakistani Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1 font-medium">City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Multan">Multan</option>
                    <option value="Quetta">Quetta</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1 font-medium">Account Role</label>
                  <input
                    type="text"
                    disabled
                    value={currentUser.role.toUpperCase()}
                    className="w-full px-3.5 py-2.5 bg-slate-900/60 border border-slate-800 rounded-xl text-xs font-mono text-slate-400 capitalize"
                  />
                </div>
              </div>

              {/* Personal Earning Stats Snapshot */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                  Lifetime Activity Overview
                </span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-slate-950">
                    <span className="text-[10px] text-slate-500 block">Total Earned</span>
                    <span className="font-mono-numbers font-bold text-emerald-400">
                      ₨ {wallet.totalLifetimeEarned.toFixed(2)}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950">
                    <span className="text-[10px] text-slate-500 block">Ads Watched</span>
                    <span className="font-mono-numbers font-bold text-white">
                      {wallet.adsWatchedTotal} ads
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950">
                    <span className="text-[10px] text-slate-500 block">Daily Streak</span>
                    <span className="font-mono-numbers font-bold text-amber-400">
                      Day {wallet.streakDays}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-floppy-disk"></i>
                  <span>Save Profile Changes</span>
                </button>

                {onLogout && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onLogout();
                    }}
                    className="py-2.5 px-4 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <span>Log Out</span>
                  </button>
                )}
              </div>
            </form>
          )}

          {/* TAB 2: SWITCH REAL USERS */}
          {activeTab === 'switch' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white">Select a Real Registered User</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click any account below to instantly switch the app's active session and experience their balance and ads.
                </p>
              </div>

              <div className="space-y-2.5">
                {users.map((u) => {
                  const isCurrent = u.id === currentUser.id;
                  return (
                    <div
                      key={u.id}
                      onClick={() => {
                        if (!isCurrent) {
                          onSwitchUser(u);
                          soundFX.playRewardSuccess();
                        }
                      }}
                      className={`p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-slate-800/90 border-[#10B981] shadow-md shadow-emerald-950/20'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 font-extrabold flex items-center justify-center text-sm">
                          {u.name[0]}
                        </div>
                        <div>
                          <div className="font-bold text-white text-xs flex items-center gap-1.5">
                            <span>{u.name}</span>
                            <span className="text-[10px] text-slate-400 font-normal">({u.city || 'Pakistan'})</span>
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">{u.phone}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {u.role}
                        </span>
                        {isCurrent ? (
                          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                            <i className="fa-solid fa-check"></i>
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="text-xs text-cyan-400 hover:underline">
                            Switch →
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: SAVED PAYOUT DETAILS */}
          {activeTab === 'payout' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white">Default Payout Gateway</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Save your mobile wallet number to pre-fill withdrawal cashout requests automatically.
                </p>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1.5 font-medium">Default Payment Provider</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'JazzCash', label: 'JazzCash (Active)', icon: 'fa-bolt text-rose-400', available: true },
                    { id: 'Easypaisa', label: 'Easypaisa (Unavailable)', icon: 'fa-mobile-screen text-slate-500', available: false },
                    { id: 'Bank Transfer', label: 'Bank Transfer', icon: 'fa-building-columns text-cyan-400', available: true }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        if (!item.available) {
                          alert('Easypaisa is currently not available (baad me add hoga). Please use JazzCash.');
                          return;
                        }
                        setDefaultMethod(item.id as 'Easypaisa' | 'JazzCash' | 'Bank Transfer');
                      }}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        defaultMethod === item.id
                          ? 'bg-slate-800 border-rose-500 text-white font-bold ring-1 ring-rose-500'
                          : item.available
                          ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          : 'bg-slate-950 border-slate-800/60 text-slate-600 opacity-60'
                      }`}
                    >
                      <i className={`fa-solid ${item.icon} text-lg mb-1 block`}></i>
                      <span className="text-xs block">{item.label}</span>
                    </button>
                  ))}
                </div>
                <div className="text-[10px] text-amber-400/90 mt-1">
                  * Easypaisa is not available (baad me add hoga). Withdrawals and deposits route through JazzCash (03262636289).
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1 font-medium">
                  Beneficiary Account Title (Name on CNIC / Account) *
                </label>
                <input
                  type="text"
                  required
                  value={defaultAccountTitle}
                  onChange={(e) => setDefaultAccountTitle(e.target.value)}
                  placeholder="e.g. Ali Raza"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1 font-medium">
                  {defaultMethod === 'Bank Transfer' ? 'IBAN / Account Number *' : 'Mobile Account Number *'}
                </label>
                <input
                  type="text"
                  required
                  value={defaultAccountNumber}
                  onChange={(e) => setDefaultAccountNumber(e.target.value)}
                  placeholder="0326-2636289"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#10B981] to-emerald-600 hover:from-emerald-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-check"></i>
                <span>Save Default Cashout Details</span>
              </button>
            </form>
          )}

          {/* TAB 4: SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <i className="fa-solid fa-lock text-emerald-400"></i>
                  <span>Anti-Bot Device Verification</span>
                </span>
                <p className="text-xs text-slate-400">
                  Your device and IP are protected with biometric math verification and active tab detection to prevent unauthorized automated bot scripts.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <i className="fa-solid fa-building-columns text-cyan-400"></i>
                  <span>Official Deposit Account Verification</span>
                </span>
                <p className="text-xs text-slate-400">
                  All official platform deposits are only accepted on registered Easypaisa and JazzCash number <strong className="font-mono text-emerald-400">0326-2636289</strong>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-between">
          <span>Active User ID: #{currentUser.id}</span>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
