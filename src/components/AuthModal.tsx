import React, { useState } from 'react';
import { soundFX } from '../utils/audio';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: { name: string; phone: string; email: string };
  onUpdateUser: (name: string, phone: string, email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateUser
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [password, setPassword] = useState('••••••••');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playRewardSuccess();
    onUpdateUser(name, phone, `${phone.replace(/\D/g, '')}@aradrewards.pk`);
    setSuccess('Credentials verified! Active session updated.');
    setTimeout(() => {
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-md bg-[#0F172A] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-[#10B981] flex items-center justify-center">
              <i className="fa-solid fa-user-shield text-base"></i>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {mode === 'login' ? 'Earner / Advertiser Login' : 'Create AR AdRewards Account'}
              </h3>
              <p className="text-[11px] text-slate-400">Pakistani mobile credentials</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {success && (
          <div className="my-3 p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
            <i className="fa-solid fa-check text-emerald-400"></i>
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {mode === 'register' && (
            <div>
              <label className="text-xs text-slate-400 block mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ali Raza"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          )}

          <div>
            <label className="text-xs text-slate-400 block mb-1">Pakistani Mobile Number *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500">
                +92
              </span>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0326-2636289"
                className="w-full pl-12 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Security PIN / Password *</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                soundFX.playClick();
              }}
              className="text-cyan-400 hover:underline"
            >
              {mode === 'login' ? 'Need an account? Register free' : 'Already registered? Login'}
            </button>
            <span className="text-emerald-400 flex items-center gap-1">
              <i className="fa-solid fa-lock text-[10px]"></i>
              <span>Anti-Bot Shield</span>
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#10B981] to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-right-to-bracket"></i>
            <span>{mode === 'login' ? 'Access Account & Wallets' : 'Complete Registration'}</span>
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 text-center">
          Demo Preset: Ali Raza (Active Earner) · Pakistani Rupee Wallet
        </div>
      </div>
    </div>
  );
};
