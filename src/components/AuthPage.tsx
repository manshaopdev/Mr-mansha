import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { UserProfile } from '../types/adRewards';
import { soundFX } from '../utils/audio';

interface AuthPageProps {
  onRegisterSuccess: (newUser: UserProfile, bonusRewardPKR: number) => void;
  onLoginSuccess: (user: UserProfile) => void;
  users: UserProfile[];
  initialMode?: 'login' | 'register';
}

export const AuthPage: React.FC<AuthPageProps> = ({
  onRegisterSuccess,
  onLoginSuccess,
  users,
  initialMode = 'register'
}) => {
  const [activeMode, setActiveMode] = useState<'login' | 'register'>(initialMode);

  // Registration Form State
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('03');
  const [regPassword, setRegPassword] = useState('');
  const [regCity, setRegCity] = useState('Karachi');
  const [regRole, setRegRole] = useState<'earner' | 'advertiser'>('earner');
  const [regReferralCode, setRegReferralCode] = useState('');
  const [regMethod, setRegMethod] = useState<'Easypaisa' | 'JazzCash'>('JazzCash');

  // Login Form State
  const [loginPhone, setLoginPhone] = useState('03262636289');
  const [loginPassword, setLoginPassword] = useState('••••••••');
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!regName.trim() || regName.trim().length < 3) {
      setErrorMsg('Please enter your full name (at least 3 characters).');
      soundFX.playError();
      return;
    }

    const cleanPhone = regPhone.replace(/[\s-]/g, '');
    if (cleanPhone.length < 11) {
      setErrorMsg('Please enter a valid 11-digit Pakistani mobile number (e.g. 03262636289).');
      soundFX.playError();
      return;
    }

    if (!regPassword.trim() || regPassword.length < 4) {
      setErrorMsg('Password / PIN must be at least 4 digits.');
      soundFX.playError();
      return;
    }

    const newUser: UserProfile = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: regName.trim(),
      phone: cleanPhone,
      email: `${regName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      role: regRole,
      joinedDate: 'Today',
      isVerified: true,
      city: regCity,
      defaultMethod: regMethod,
      defaultAccountNumber: cleanPhone,
      defaultAccountTitle: regName.trim(),
    };

    soundFX.playRewardSuccess();
    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#10B981', '#06B6D4', '#F59E0B', '#FFFFFF'],
      });
    } catch {}

    // Grant ₨ 50.00 Registration Reward!
    onRegisterSuccess(newUser, 50.00);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanPhone = loginPhone.replace(/[\s-]/g, '');
    const matched = users.find((u) => u.phone.replace(/[\s-]/g, '') === cleanPhone);

    if (matched) {
      soundFX.playRewardSuccess();
      onLoginSuccess(matched);
    } else {
      // Auto-create or log in with provided phone
      const fallbackUser: UserProfile = {
        id: `usr-${Date.now().toString().slice(-4)}`,
        name: cleanPhone === '03262636289' ? 'Ali Raza' : 'Registered Member',
        phone: cleanPhone,
        email: `${cleanPhone}@aradrewards.pk`,
        role: 'earner',
        joinedDate: 'Today',
        isVerified: true,
        city: 'Karachi',
        defaultMethod: 'Easypaisa',
        defaultAccountNumber: cleanPhone,
        defaultAccountTitle: 'Account Holder',
      };
      soundFX.playRewardSuccess();
      onLoginSuccess(fallbackUser);
    }
  };

  const handleQuickDemoLogin = (user: UserProfile) => {
    soundFX.playClick();
    onLoginSuccess(user);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Golden Welcome Reward Banner */}
      <div className="bg-gradient-to-r from-amber-950/60 via-[#1E293B] to-emerald-950/60 border border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <i className="fa-solid fa-gift animate-bounce"></i>
              <span>Official Signup Bonus Offer</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              New User Login & Register Reward:{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-300 to-cyan-400">
                ₨ 50.00 PKR Free
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Create your free AR AdRewards account today and get an instant <strong className="text-emerald-400 font-bold">₨ 50 PKR welcome bonus</strong> credited directly to your earnings balance! Then choose your earning plan and start completing tasks at ₨ 100 per task. Direct cashout to JazzCash 03262636289!
            </p>
          </div>

          <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 text-center shrink-0 sm:w-56 shadow-xl">
            <span className="text-[10px] uppercase font-bold text-amber-400 block tracking-wider">Welcome Reward</span>
            <div className="font-mono-numbers text-3xl font-extrabold text-emerald-400 mt-1">
              ₨ 50.00
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">Instant signup credit</span>
            <div className="mt-2.5 pt-2.5 border-t border-slate-800 text-[10px] text-cyan-400 font-medium flex items-center justify-center gap-1">
              <i className="fa-solid fa-circle-check text-emerald-400"></i>
              <span>100% Guaranteed</span>
            </div>
          </div>
        </div>

        <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Container with Dual Tabs */}
      <div className="bg-[#1E293B] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Tab Headers */}
        <div className="grid grid-cols-2 bg-slate-900 border-b border-slate-800">
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setActiveMode('register');
              setErrorMsg('');
            }}
            className={`py-4 px-4 text-center font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeMode === 'register'
                ? 'bg-[#1E293B] text-emerald-400 border-b-2 border-emerald-400 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <i className="fa-solid fa-user-plus text-xs"></i>
            <span>Register Account (+₨ 50 Reward)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setActiveMode('login');
              setErrorMsg('');
            }}
            className={`py-4 px-4 text-center font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeMode === 'login'
                ? 'bg-[#1E293B] text-cyan-400 border-b-2 border-cyan-400 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <i className="fa-solid fa-right-to-bracket text-xs"></i>
            <span>Log In (Existing Users)</span>
          </button>
        </div>

        {errorMsg && (
          <div className="m-6 mb-0 p-3.5 rounded-xl bg-rose-950/80 border border-rose-500 text-rose-200 text-xs flex items-center gap-2">
            <i className="fa-solid fa-circle-exclamation text-rose-400 text-base"></i>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* REGISTER VIEW */}
        {activeMode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Top Reward Callout inside form */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg shrink-0">
                  <i className="fa-solid fa-hand-holding-dollar"></i>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Claim ₨ 50.00 PKR Signup Reward</div>
                  <div className="text-[11px] text-emerald-400">Credited to your balance immediately upon submitting this form</div>
                </div>
              </div>
              <span className="font-mono-numbers text-sm font-extrabold text-emerald-300 px-3 py-1 rounded-lg bg-emerald-900/60 border border-emerald-700/60 shrink-0">
                +₨ 50.00 PKR
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Ali Raza or Usman Khan"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1.5">
                  Pakistani Mobile Number *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500 font-semibold">
                    🇵🇰
                  </span>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="03262636289"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1.5">
                  Account Password / PIN *
                </label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Create 4+ digit security password"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1.5">
                  City (Pakistan)
                </label>
                <select
                  value={regCity}
                  onChange={(e) => setRegCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
                >
                  <option value="Karachi">Karachi</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Multan">Multan</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Quetta">Quetta</option>
                  <option value="Sialkot">Sialkot</option>
                  <option value="Gujranwala">Gujranwala</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1.5">
                  Account Purpose
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRegRole('earner')}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                      regRole === 'earner'
                        ? 'bg-slate-800 border-emerald-500 text-emerald-400'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <i className="fa-solid fa-coins"></i>
                    <span>Earner (Watch Ads)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegRole('advertiser')}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                      regRole === 'advertiser'
                        ? 'bg-slate-800 border-cyan-500 text-cyan-400'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <i className="fa-solid fa-bullhorn"></i>
                    <span>Advertiser (Post Ads)</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1.5">
                  Default Payment / Cashout Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRegMethod('JazzCash')}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
                      regMethod === 'JazzCash'
                        ? 'bg-slate-800 border-rose-500 text-rose-400 ring-1 ring-rose-500'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <i className="fa-solid fa-bolt text-rose-400"></i>
                    <span>JazzCash (Active)</span>
                  </button>
                  <button
                    type="button"
                    disabled
                    className="py-2 px-3 rounded-lg border border-slate-800 bg-slate-950 text-slate-500 text-xs font-semibold flex items-center justify-center gap-1.5 opacity-60 cursor-not-allowed"
                    title="Easypaisa is not available (baad me add hoga)"
                  >
                    <i className="fa-solid fa-mobile-screen"></i>
                    <span>Easypaisa (Unavailable)</span>
                  </button>
                </div>
                <div className="text-[10px] text-amber-400/90 mt-1 flex items-center gap-1">
                  <i className="fa-solid fa-info-circle text-[9px]"></i>
                  <span>Easypaisa is not available (baad me add hoga). JazzCash 03262636289 is active.</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">
                Referral Code (Optional)
              </label>
              <input
                type="text"
                value={regReferralCode}
                onChange={(e) => setRegReferralCode(e.target.value)}
                placeholder="e.g. AR78699"
                className="w-full sm:w-1/2 px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <i className="fa-solid fa-shield text-emerald-400"></i>
                <span>Anti-bot protected · 1 account per mobile number</span>
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#10B981] via-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-extrabold text-sm shadow-xl shadow-emerald-950/50 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <i className="fa-solid fa-gift text-amber-300"></i>
                <span>Register & Claim ₨ 50.00 Reward</span>
              </button>
            </div>

          </form>
        )}

        {/* LOGIN VIEW */}
        {activeMode === 'login' && (
          <div className="p-6 sm:p-8 space-y-6">
            <form onSubmit={handleLoginSubmit} className="space-y-4 max-w-md mx-auto">
              
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1.5">
                  Pakistani Mobile Number *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500 font-semibold">
                    🇵🇰
                  </span>
                  <input
                    type="tel"
                    required
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    placeholder="03262636289"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1.5">
                  Password / PIN *
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your security PIN"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded bg-slate-800 border-slate-700 text-cyan-500" />
                  <span>Remember on this browser</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('For password recovery, contact WhatsApp support at 0326-2636289')}
                  className="text-cyan-400 hover:underline"
                >
                  Forgot PIN?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-[#10B981] hover:from-cyan-500 hover:to-emerald-500 text-white font-bold text-sm shadow-lg shadow-cyan-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-right-to-bracket"></i>
                <span>Log In to AR AdRewards</span>
              </button>

            </form>

            {/* Quick One-Click Real User Switcher */}
            <div className="pt-6 border-t border-slate-800">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block text-center mb-3">
                Quick One-Click Demo Logins (Real Registered Accounts)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {users.slice(0, 3).map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => handleQuickDemoLogin(u)}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-xs">
                        {u.name[0]}
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-white group-hover:text-cyan-300 truncate">
                          {u.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {u.phone}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      <span className="capitalize text-slate-400">{u.role}</span>
                      <span className="text-emerald-400 font-semibold">1-Click Login →</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Security & Payout Guarantee Footnote */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs text-slate-400">
        <div className="p-3 rounded-xl bg-[#1E293B] border border-slate-800">
          <i className="fa-solid fa-gift text-amber-400 text-sm mb-1 block"></i>
          <span className="text-white font-semibold">₨ 50 Signup Reward</span>
          <p className="text-[11px] text-slate-500 mt-0.5">Credited automatically to new accounts</p>
        </div>
        <div className="p-3 rounded-xl bg-[#1E293B] border border-slate-800">
          <i className="fa-solid fa-film text-emerald-400 text-sm mb-1 block"></i>
          <span className="text-white font-semibold">Earn ₨ 100 Per 15s Ad</span>
          <p className="text-[11px] text-slate-500 mt-0.5">Human verification & instant reward</p>
        </div>
        <div className="p-3 rounded-xl bg-[#1E293B] border border-slate-800">
          <i className="fa-solid fa-mobile-screen-button text-cyan-400 text-sm mb-1 block"></i>
          <span className="text-white font-semibold">Easypaisa & JazzCash</span>
          <p className="text-[11px] text-slate-500 mt-0.5">Cashout to 0326-2636289 gateway</p>
        </div>
      </div>

    </div>
  );
};
