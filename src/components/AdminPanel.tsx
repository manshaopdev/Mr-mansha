import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { DepositRequest, WithdrawalRequest, UserProfile, UserWallet } from '../types/adRewards';
import { soundFX } from '../utils/audio';

interface AdminPanelProps {
  depositRequests: DepositRequest[];
  withdrawalRequests: WithdrawalRequest[];
  users: UserProfile[];
  currentUser: UserProfile;
  wallet: UserWallet;
  onApproveDeposit: (depositId: string) => void;
  onRejectDeposit: (depositId: string, reason?: string) => void;
  onApproveWithdrawal: (withdrawalId: string, payoutTxId?: string) => void;
  onRejectWithdrawal: (withdrawalId: string, reason?: string) => void;
  onSwitchUser: (user: UserProfile) => void;
  onCreateNewUser: (newUser: UserProfile) => void;
  onAddManualDepositRequest: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  depositRequests,
  withdrawalRequests,
  users,
  currentUser,
  wallet,
  onApproveDeposit,
  onRejectDeposit,
  onApproveWithdrawal,
  onRejectWithdrawal,
  onSwitchUser,
  onCreateNewUser,
  onAddManualDepositRequest,
}) => {
  const [activeTab, setActiveTab] = useState<'deposits' | 'withdrawals' | 'users' | 'stats'>('deposits');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  // New user form state
  const [newUserName, setNewUserName] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('03');
  const [newUserCity, setNewUserCity] = useState('Lahore');
  const [newUserRole, setNewUserRole] = useState<'earner' | 'advertiser'>('earner');

  const pendingDepositsCount = depositRequests.filter((d) => d.status === 'pending').length;
  const pendingWithdrawalsCount = withdrawalRequests.filter((w) => w.status === 'pending').length;

  const totalDepositsApprovedPKR = depositRequests
    .filter((d) => d.status === 'approved')
    .reduce((sum, d) => sum + d.amountPKR, 0);

  const totalWithdrawalsApprovedPKR = withdrawalRequests
    .filter((w) => w.status === 'approved')
    .reduce((sum, w) => sum + w.amountPKR, 0);

  const handleCreateUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserPhone.trim()) return;

    const created: UserProfile = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: newUserName.trim(),
      phone: newUserPhone.trim(),
      email: `${newUserName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      role: newUserRole,
      joinedDate: 'Today',
      isVerified: true,
      city: newUserCity,
      defaultMethod: 'Easypaisa',
      defaultAccountNumber: newUserPhone.trim(),
      defaultAccountTitle: newUserName.trim(),
    };

    onCreateNewUser(created);
    setShowAddUserModal(false);
    setNewUserName('');
    setNewUserPhone('03');
    soundFX.playRewardSuccess();
  };

  const filteredDeposits = depositRequests.filter((d) => {
    const matchesStatus = filterStatus === 'all' || d.status === filterStatus;
    const matchesSearch =
      d.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.userPhone.includes(searchQuery) ||
      d.txId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredWithdrawals = withdrawalRequests.filter((w) => {
    const matchesStatus = filterStatus === 'all' || w.status === filterStatus;
    const matchesSearch =
      w.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.userPhone.includes(searchQuery) ||
      w.accountNumber.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      {/* Header Banner */}
      <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span>AR AdRewards Admin Portal · Official Gateway Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <i className="fa-solid fa-shield-halved text-amber-400"></i>
            <span>Payment Approvals & User Control</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Review incoming Easypaisa & JazzCash payments sent to <strong className="text-emerald-400 font-mono">0326-2636289</strong>, approve funds to add money, process payouts, and manage real registered users.
          </p>
        </div>

        {/* Quick Admin Summary Metrics */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
            <span className="text-[10px] uppercase text-slate-400 block font-semibold">Pending Deposits</span>
            <span className="font-mono-numbers text-xl font-bold text-amber-400">
              {pendingDepositsCount}
            </span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
            <span className="text-[10px] uppercase text-slate-400 block font-semibold">Pending Cashouts</span>
            <span className="font-mono-numbers text-xl font-bold text-cyan-400">
              {pendingWithdrawalsCount}
            </span>
          </div>
          <button
            onClick={() => {
              onAddManualDepositRequest();
              soundFX.playClick();
            }}
            className="px-3.5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
            title="Create a test incoming deposit to test approval workflow"
          >
            <i className="fa-solid fa-plus text-[10px]"></i>
            <span>Simulate Deposit</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => {
            soundFX.playClick();
            setActiveTab('deposits');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'deposits'
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
          }`}
        >
          <i className="fa-solid fa-money-bill-wave"></i>
          <span>Approve Deposits</span>
          {pendingDepositsCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px]">
              {pendingDepositsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            soundFX.playClick();
            setActiveTab('withdrawals');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'withdrawals'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
          }`}
        >
          <i className="fa-solid fa-wallet"></i>
          <span>Approve Withdrawals</span>
          {pendingWithdrawalsCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-slate-950 font-extrabold text-[10px]">
              {pendingWithdrawalsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            soundFX.playClick();
            setActiveTab('users');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'users'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
          }`}
        >
          <i className="fa-solid fa-users-gear"></i>
          <span>Real Users Directory ({users.length})</span>
        </button>

        <button
          onClick={() => {
            soundFX.playClick();
            setActiveTab('stats');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'stats'
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
          }`}
        >
          <i className="fa-solid fa-chart-line"></i>
          <span>Financial Auditing</span>
        </button>
      </div>

      {/* TAB 1: DEPOSIT APPROVALS */}
      {activeTab === 'deposits' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Incoming Payments Received on</span>
                <span className="font-mono text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-emerald-500/30">
                  0326-2636289
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Verify user's Transaction ID against your Easypaisa / JazzCash SMS notifications, then click Approve to credit their balance.
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex items-center gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'pending' | 'approved' | 'rejected')}
                className="px-3 py-1.5 bg-[#1E293B] border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending Only</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              <input
                type="text"
                placeholder="Search user, phone or TX ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1.5 bg-[#1E293B] border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 w-48"
              />
            </div>
          </div>

          {filteredDeposits.length === 0 ? (
            <div className="p-12 text-center bg-[#1E293B] border border-slate-800 rounded-2xl">
              <i className="fa-solid fa-receipt text-4xl text-slate-600 mb-3"></i>
              <h3 className="text-sm font-semibold text-white">No deposit requests found</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                No requests match your current filters. Click "Simulate Deposit" above to test the approval system.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDeposits.map((dep) => (
                <div
                  key={dep.id}
                  className={`p-4 rounded-xl border transition-all ${
                    dep.status === 'pending'
                      ? 'bg-[#1E293B] border-amber-500/40 shadow-lg shadow-amber-950/20'
                      : 'bg-[#1E293B]/60 border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-base shrink-0 mt-0.5 ${
                          dep.method === 'Easypaisa'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : dep.method === 'JazzCash'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        }`}
                      >
                        <i
                          className={`fa-solid ${
                            dep.method === 'Easypaisa'
                              ? 'fa-mobile-screen'
                              : dep.method === 'JazzCash'
                              ? 'fa-bolt'
                              : 'fa-building-columns'
                          }`}
                        ></i>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{dep.userName}</span>
                          <span className="text-slate-500">·</span>
                          <span className="font-mono text-xs text-slate-300">{dep.userPhone}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                              dep.status === 'pending'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : dep.status === 'approved'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {dep.status}
                          </span>
                        </div>

                        <div className="text-xs text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span>
                            Method: <strong className="text-slate-200">{dep.method}</strong>
                          </span>
                          <span>·</span>
                          <span>
                            TXZ ID: <strong className="font-mono text-cyan-300">{dep.txId}</strong>
                          </span>
                          <span>·</span>
                          <span>
                            Sender: <strong className="font-mono text-slate-200">{dep.senderNumber}</strong>
                          </span>
                          <span>·</span>
                          <span>{dep.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                      <div className="text-right">
                        <span className="text-[10px] uppercase text-slate-400 block font-semibold">Deposit Amount</span>
                        <span className="font-mono-numbers text-xl font-extrabold text-[#10B981]">
                          ₨ {dep.amountPKR.toFixed(2)}
                        </span>
                      </div>

                      {dep.status === 'pending' ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              onApproveDeposit(dep.id);
                              soundFX.playRewardSuccess();
                              try {
                                confetti({
                                  particleCount: 50,
                                  spread: 60,
                                  origin: { y: 0.6 },
                                  colors: ['#10B981', '#F59E0B'],
                                });
                              } catch {}
                            }}
                            className="px-3.5 py-2 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <i className="fa-solid fa-check"></i>
                            <span>Approve & Credit</span>
                          </button>

                          <button
                            onClick={() => {
                              const reason = prompt('Reason for rejection (e.g. Invalid TXZ ID / Payment not received):');
                              onRejectDeposit(dep.id, reason || 'Transaction could not be verified on 0326-2636289');
                              soundFX.playError();
                            }}
                            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <i className="fa-solid fa-xmark"></i>
                            <span>Reject</span>
                          </button>
                        </div>
                      ) : (
                        <div className="text-xs text-slate-500 flex items-center gap-1.5 font-mono">
                          <i className={`fa-solid ${dep.status === 'approved' ? 'fa-circle-check text-emerald-400' : 'fa-circle-xmark text-rose-400'}`}></i>
                          <span>{dep.status === 'approved' ? 'Credited to Wallet' : 'Declined'}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: WITHDRAWAL APPROVALS */}
      {activeTab === 'withdrawals' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Earner Cashout Queue (Min. ₨ 500.00 Limit)</span>
              </h2>
              <p className="text-xs text-slate-400">
                Send Pakistani Rupees to beneficiary account numbers from your official account 0326-2636289, then mark paid.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'pending' | 'approved' | 'rejected')}
                className="px-3 py-1.5 bg-[#1E293B] border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-400 cursor-pointer"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Paid</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {filteredWithdrawals.length === 0 ? (
            <div className="p-12 text-center bg-[#1E293B] border border-slate-800 rounded-2xl">
              <i className="fa-solid fa-hand-holding-dollar text-4xl text-slate-600 mb-3"></i>
              <h3 className="text-sm font-semibold text-white">No withdrawal requests found</h3>
              <p className="text-xs text-slate-400 mt-1">
                All earner withdrawal requests have been processed.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredWithdrawals.map((wth) => (
                <div
                  key={wth.id}
                  className={`p-4 rounded-xl border transition-all ${
                    wth.status === 'pending'
                      ? 'bg-[#1E293B] border-emerald-500/40 shadow-lg shadow-emerald-950/20'
                      : 'bg-[#1E293B]/60 border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-base shrink-0 mt-0.5">
                        <i className="fa-solid fa-arrow-up-from-bracket"></i>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{wth.userName}</span>
                          <span className="text-slate-500">·</span>
                          <span className="font-mono text-xs text-slate-300">{wth.userPhone}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                              wth.status === 'pending'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : wth.status === 'approved'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {wth.status === 'approved' ? 'Paid' : wth.status}
                          </span>
                        </div>

                        <div className="text-xs text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span>
                            Payout via: <strong className="text-emerald-400">{wth.method}</strong>
                          </span>
                          <span>·</span>
                          <span>
                            Account Title: <strong className="text-white">{wth.accountTitle}</strong>
                          </span>
                          <span>·</span>
                          <span>
                            Account No: <strong className="font-mono text-cyan-300">{wth.accountNumber}</strong>
                          </span>
                          <span>·</span>
                          <span>{wth.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                      <div className="text-right">
                        <span className="text-[10px] uppercase text-slate-400 block font-semibold">Cashout Amount</span>
                        <span className="font-mono-numbers text-xl font-extrabold text-rose-400">
                          ₨ {wth.amountPKR.toFixed(2)}
                        </span>
                      </div>

                      {wth.status === 'pending' ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const tid = prompt('Enter Bank / Easypaisa Payout Receipt ID (optional):', `EP-OUT-${Date.now().toString().slice(-6)}`);
                              onApproveWithdrawal(wth.id, tid || undefined);
                              soundFX.playRewardSuccess();
                            }}
                            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <i className="fa-solid fa-check"></i>
                            <span>Mark Paid</span>
                          </button>

                          <button
                            onClick={() => {
                              onRejectWithdrawal(wth.id, 'Account details mismatch');
                              soundFX.playError();
                            }}
                            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <i className="fa-solid fa-xmark"></i>
                            <span>Reject & Refund</span>
                          </button>
                        </div>
                      ) : (
                        <div className="text-xs text-slate-500 flex items-center gap-1.5 font-mono">
                          <i className="fa-solid fa-circle-check text-emerald-400"></i>
                          <span>Disbursed</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: REAL USERS DIRECTORY */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-users text-cyan-400"></i>
                <span>Registered Real Users Directory</span>
              </h2>
              <p className="text-xs text-slate-400">
                You can switch your active session to any real user profile below to experience the platform from their account!
              </p>
            </div>

            <button
              onClick={() => setShowAddUserModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#06B6D4] to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
            >
              <i className="fa-solid fa-user-plus"></i>
              <span>Register Real User</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((u) => {
              const isCurrent = u.id === currentUser.id;
              return (
                <div
                  key={u.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-slate-800/90 border-[#10B981] shadow-lg shadow-emerald-950/30'
                      : 'bg-[#1E293B] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 font-extrabold flex items-center justify-center text-sm">
                        {u.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm flex items-center gap-1.5">
                          <span>{u.name}</span>
                          {u.isVerified && (
                            <i className="fa-solid fa-circle-check text-emerald-400 text-xs" title="Verified Pakistani User"></i>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">{u.phone}</div>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded capitalize ${
                        u.role === 'admin'
                          ? 'bg-amber-500/20 text-amber-400'
                          : u.role === 'advertiser'
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}
                    >
                      {u.role}
                    </span>
                  </div>

                  <div className="py-3 space-y-1.5 text-xs text-slate-300 font-mono-numbers">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans">City / Region:</span>
                      <span className="text-white font-sans">{u.city || 'Karachi, PK'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans">Default Gateway:</span>
                      <span className="text-emerald-400 font-sans">{u.defaultMethod || 'Easypaisa'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans">Joined Date:</span>
                      <span className="text-slate-400">{u.joinedDate}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    {isCurrent ? (
                      <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                        <i className="fa-solid fa-circle-dot text-[10px]"></i>
                        <span>Active Session</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          onSwitchUser(u);
                          soundFX.playClick();
                        }}
                        className="w-full py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <i className="fa-solid fa-right-to-bracket text-[10px]"></i>
                        <span>Switch to this Account</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT STATS */}
      {activeTab === 'stats' && (
        <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <i className="fa-solid fa-scale-balanced text-amber-400"></i>
            <span>Platform Financial Integrity & Arbitrage Reserves</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-xs uppercase font-medium">Total Approved Deposits</span>
              <div className="font-mono-numbers text-2xl font-bold text-emerald-400">
                ₨ {totalDepositsApprovedPKR.toLocaleString()} PKR
              </div>
              <span className="text-[11px] text-slate-500">Collected on 0326-2636289</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-xs uppercase font-medium">Total Approved Cashouts</span>
              <div className="font-mono-numbers text-2xl font-bold text-rose-400">
                ₨ {totalWithdrawalsApprovedPKR.toLocaleString()} PKR
              </div>
              <span className="text-[11px] text-slate-500">Paid to real earner mobile numbers</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-xs uppercase font-medium">50% Arbitrage Retained Margin</span>
              <div className="font-mono-numbers text-2xl font-bold text-cyan-400">
                50.0% Fixed
              </div>
              <span className="text-[11px] text-cyan-500">Protected operating margin</span>
            </div>
          </div>
        </div>
      )}

      {/* Register New User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0F172A] border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-user-plus text-cyan-400"></i>
                <span>Register Real User</span>
              </h3>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleCreateUserSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shahid Afridi"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Pakistani Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="0300-1234567"
                  value={newUserPhone}
                  onChange={(e) => setNewUserPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">City</label>
                  <select
                    value={newUserCity}
                    onChange={(e) => setNewUserCity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
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
                  <label className="text-xs text-slate-400 block mb-1">Role</label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as 'earner' | 'advertiser')}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="earner">Earner</option>
                    <option value="advertiser">Advertiser</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#06B6D4] to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                <i className="fa-solid fa-check"></i>
                <span>Add User to System</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
