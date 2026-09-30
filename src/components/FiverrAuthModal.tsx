import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Lock,
  Phone,
  Briefcase,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { AuthUser } from '../types/fiverr';

interface FiverrAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onLogin: (identifier: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  onRegister: (data: {
    name: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    role: 'buyer' | 'seller';
    bio: string;
    skills: string[];
    country: string;
  }) => Promise<{ success: boolean; error?: string }>;
  onQuickDemoLogin: (role: 'buyer' | 'seller') => void;
}

export const FiverrAuthModal: React.FC<FiverrAuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLogin,
  onRegister,
  onQuickDemoLogin,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  
  // Login fields
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register fields
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState<'buyer' | 'seller'>('seller');
  const [regBio, setRegBio] = useState('');
  const [regSkills, setRegSkills] = useState('React, Web Development, UI Design');
  const [regCountry, setRegCountry] = useState('Pakistan');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier || !loginPassword) {
      setErrorMsg('Please enter your username/email and password.');
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    const res = await onLogin(loginIdentifier, loginPassword);
    setLoading(false);
    if (res.success) {
      setSuccessMsg('Logged in successfully!');
      setTimeout(() => {
        onClose();
      }, 500);
    } else {
      setErrorMsg(res.error || 'Invalid credentials.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regPassword || (!regEmail && !regUsername)) {
      setErrorMsg('Full Name, Username/Email, and Password are required.');
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    const skillsList = regSkills.split(',').map((s) => s.trim()).filter(Boolean);
    const res = await onRegister({
      name: regName,
      username: regUsername || regName.toLowerCase().replace(/\s+/g, '_'),
      email: regEmail,
      phone: regPhone,
      password: regPassword,
      role: regRole,
      bio: regBio || (regRole === 'seller' ? 'Skilled freelancer providing top-quality solutions on Figer Free.' : 'Client looking for expert services on Figer Free.'),
      skills: skillsList.length > 0 ? skillsList : ['Web Development', 'Design'],
      country: regCountry,
    });
    setLoading(false);
    if (res.success) {
      setSuccessMsg('Account created successfully! Welcome to Figer Free.');
      setTimeout(() => {
        onClose();
      }, 600);
    } else {
      setErrorMsg(res.error || 'Failed to register account.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner with Figer Free branding */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-5 text-white flex items-center justify-between border-b border-slate-700/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1 font-['Outfit',sans-serif] font-black text-xl tracking-tight">
                <span>figer</span>
                <span className="text-emerald-400">free</span>
                <span className="text-emerald-400 text-2xl leading-none">.</span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">Freelance Services Marketplace</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch between Sign In & Join */}
        <div className="flex border-b border-gray-200 bg-gray-50/80 px-5 pt-3">
          <button
            onClick={() => {
              setMode('login');
              setErrorMsg(null);
            }}
            className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              mode === 'login'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setMode('register');
              setErrorMsg(null);
            }}
            className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              mode === 'register'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Join Figer Free
          </button>
        </div>

        {/* Modal Body / Scrollable Form */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* SIGN IN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Email, Username, or Phone
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. shahzaib_pro or client@email.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your account password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In to Figer Free'}
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Quick Demo Access */}
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center mb-2.5 font-medium">
                  Instant Test & Demo Credentials
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onQuickDemoLogin('seller')}
                    className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold transition-all text-left flex items-center gap-2 cursor-pointer"
                  >
                    <Briefcase className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="leading-tight">Seller Account</p>
                      <span className="text-[10px] text-emerald-700 font-normal">Hamza (Freelancer)</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onQuickDemoLogin('buyer')}
                    className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100 text-blue-900 text-xs font-bold transition-all text-left flex items-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="leading-tight">Buyer Account</p>
                      <span className="text-[10px] text-blue-700 font-normal">Ayesha (Client)</span>
                    </div>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* JOIN FIGER FREE (REGISTER) FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              {/* Role Selection: Buyer vs Seller */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  How do you want to use Figer Free?
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setRegRole('seller')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-2.5 ${
                      regRole === 'seller'
                        ? 'border-emerald-600 bg-emerald-50/80 ring-1 ring-emerald-600'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <Briefcase className={`w-4 h-4 mt-0.5 ${regRole === 'seller' ? 'text-emerald-600' : 'text-gray-400'}`} />
                    <div>
                      <p className={`text-xs font-bold ${regRole === 'seller' ? 'text-emerald-900' : 'text-gray-800'}`}>
                        Work as a Seller
                      </p>
                      <p className="text-[11px] text-gray-500">I want to offer gigs & earn money</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegRole('buyer')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-2.5 ${
                      regRole === 'buyer'
                        ? 'border-blue-600 bg-blue-50/80 ring-1 ring-blue-600'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <ShoppingBag className={`w-4 h-4 mt-0.5 ${regRole === 'buyer' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <div>
                      <p className={`text-xs font-bold ${regRole === 'buyer' ? 'text-blue-900' : 'text-gray-800'}`}>
                        Order as a Buyer
                      </p>
                      <p className="text-[11px] text-gray-500">I want to hire talent for projects</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Full Name & Username */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Bilal Ahmed"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Username *
                  </label>
                  <input
                    type="text"
                    required
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    placeholder="e.g. bilal_design"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Phone / Contact
                  </label>
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="0300 1234567"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Choose Password *
                </label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              {/* Freelancer specific: Skills & Bio */}
              {regRole === 'seller' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Professional Skills (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={regSkills}
                      onChange={(e) => setRegSkills(e.target.value)}
                      placeholder="e.g. React, Next.js, Logo Design, Video Editing"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Profile Bio / Tagline
                    </label>
                    <textarea
                      rows={2}
                      value={regBio}
                      onChange={(e) => setRegBio(e.target.value)}
                      placeholder="Tell buyers what you specialize in..."
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                {loading ? 'Creating Account...' : 'Join Figer Free Now'}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 justify-center text-[11px] text-gray-500 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Free Account • In-App Real-Time Messaging & Direct Orders</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
