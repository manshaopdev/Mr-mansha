import React, { useState } from 'react';
import { AdCampaign, AdCategory, UserWallet } from '../types/adRewards';
import { EARNING_PLANS } from '../data/initialData';
import { soundFX } from '../utils/audio';

interface UserDashboardProps {
  wallet: UserWallet;
  campaigns: AdCampaign[];
  onSelectTaskToPerform?: (ad: AdCampaign) => void;
  onSelectAdToWatch?: (ad: AdCampaign) => void;
  openCreateAdModal: () => void;
  openWithdrawModal: () => void;
  openPlansPage?: () => void;
  openAuthPage?: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  wallet,
  campaigns,
  onSelectTaskToPerform,
  onSelectAdToWatch,
  openCreateAdModal,
  openWithdrawModal,
  openPlansPage
}) => {
  const handleTaskClick = (ad: AdCampaign) => {
    if (onSelectTaskToPerform) onSelectTaskToPerform(ad);
    else if (onSelectAdToWatch) onSelectAdToWatch(ad);
  };
  const [selectedCategory, setSelectedCategory] = useState<AdCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'reward' | 'popular' | 'newest'>('reward');

  const categories: AdCategory[] = [
    'All',
    'E-Commerce',
    'YouTube & Social',
    'Apps & Tech',
    'Crypto & Finance',
    'Pakistani Brands',
    'Gaming'
  ];

  const currentPlan = EARNING_PLANS.find((p) => p.id === (wallet.activePlanId || 'plan-starter')) || EARNING_PLANS[0];
  const dailyTasksLimit = currentPlan.dailyTasks;
  const tasksDoneToday = wallet.tasksCompletedToday || wallet.adsWatchedToday || 0;
  const hasRemainingTasks = tasksDoneToday < dailyTasksLimit;

  // Filtering & Sorting
  const filteredCampaigns = campaigns
    .filter((ad) => {
      const matchesCategory = selectedCategory === 'All' || ad.category === selectedCategory;
      const matchesSearch = 
        ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.advertiserName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'reward') return b.rewardPKR - a.rewardPKR;
      if (sortBy === 'popular') return (b.totalViews - b.completedViews) - (a.totalViews - a.completedViews);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  // Calculate potential earnings from remaining available ads
  const remainingAds = campaigns.filter(c => !c.isWatchedToday);
  const potentialEarnings = remainingAds.reduce((acc, curr) => acc + curr.rewardPKR, 0);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Hero Showcase & Earning Stats Section */}
      <section className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-gradient-to-br from-slate-900 via-[#1E293B] to-slate-900 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Daily Task Center · ₨ 100 Per Task</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">JazzCash Gateway: 03262636289</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Complete 15-Second Tasks.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-emerald-300 to-[#06B6D4]">
                Earn Instant ₨ 100 per Task.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300">
              Watch the 15-second sponsor task, solve the simple math captcha, aur foran <strong className="text-emerald-400 font-bold">₨ 100 PKR</strong> apne earnings wallet me hasil karein. Cashout direct via JazzCash!
            </p>

            {/* Quick Action CTA Group */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  soundFX.playClick();
                  const firstUnwatched = campaigns.find(c => !c.isWatchedToday);
                  if (firstUnwatched) handleTaskClick(firstUnwatched);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-list-check text-xs"></i>
                <span>Start Task Now (₨ 100)</span>
              </button>

              {openPlansPage && (
                <button
                  onClick={() => {
                    soundFX.playClick();
                    openPlansPage();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-crown text-xs text-amber-400"></i>
                  <span>All Earning Plans ({currentPlan.name})</span>
                </button>
              )}

              <button
                onClick={() => {
                  soundFX.playClick();
                  openWithdrawModal();
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-wallet text-xs text-rose-400"></i>
                <span>Withdraw via JazzCash</span>
              </button>
            </div>
          </div>

          {/* User Active Plan Status Card */}
          <div className="w-full lg:w-80 shrink-0 bg-[#0F172A]/80 border border-slate-700/80 rounded-xl p-5 backdrop-blur-md shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-crown text-amber-400 text-lg"></i>
                <div>
                  <div className="text-xs font-bold text-white">Active Plan</div>
                  <div className="text-[11px] text-amber-300 font-semibold">{currentPlan.name}</div>
                </div>
              </div>
              <span className="font-mono-numbers text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ACTIVE
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between py-1 text-slate-300">
                <span className="text-slate-400 text-[11px]">Daily Task Limit:</span>
                <span className="font-mono text-cyan-400 font-bold">{currentPlan.dailyTasks} Tasks / day</span>
              </div>
              <div className="flex items-center justify-between py-1 text-slate-300">
                <span className="text-slate-400 text-[11px]">Tasks Done Today:</span>
                <span className="font-mono text-white font-bold">{tasksDoneToday} / {dailyTasksLimit}</span>
              </div>
              <div className="flex items-center justify-between py-1 text-slate-300">
                <span className="text-slate-400 text-[11px]">Daily Earnings:</span>
                <span className="font-mono text-emerald-400 font-bold">₨ {currentPlan.dailyEarningsPKR.toLocaleString()} PKR</span>
              </div>
            </div>

            {/* Task Progress Bar */}
            <div className="space-y-1">
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.round((tasksDoneToday / dailyTasksLimit) * 100))}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-400 text-right">
                {dailyTasksLimit - tasksDoneToday > 0 ? `${dailyTasksLimit - tasksDoneToday} tasks remaining today` : 'Daily limit reached'}
              </div>
            </div>

            {openPlansPage && (
              <button
                type="button"
                onClick={openPlansPage}
                className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow"
              >
                <i className="fa-solid fa-arrow-up-right-dots text-[10px]"></i>
                <span>Upgrade Plan for More Daily Tasks</span>
              </button>
            )}
          </div>

        </div>

        {/* Decorative Backdrop Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Prominent Self-Serve Ad Promotion Banner (Market Rate: ₨ 150/ad) */}
      <section className="bg-gradient-to-r from-slate-900 via-[#1E293B] to-slate-900 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-cyan-950/20">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-xl shrink-0">
            <i className="fa-solid fa-bullhorn animate-pulse"></i>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono font-bold text-cyan-400">Advertise On AR AdRewards</span>
              <span className="px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                Market Rate: ₨ 150 / 1 Ad
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
              Post Your Own Ad! Get Real Human Tasks from Pakistan
            </h3>
            <p className="text-xs text-slate-400">
              Start from just 1 single ad trial (₨ 150). Pay via your earned balance or JazzCash (03262636289). Guaranteed 15s human view & math captcha verification.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundFX.playClick();
            openCreateAdModal();
          }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#06B6D4] to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-bold text-xs sm:text-sm whitespace-nowrap shadow-md shadow-cyan-950/40 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <i className="fa-solid fa-plus"></i>
          <span>Post Ad (From ₨ 150)</span>
        </button>
      </section>

      {/* 4 Quantitative Metric Tiles */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="p-4 rounded-xl bg-[#1E293B] border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Available Tasks Pool</div>
          <div className="text-2xl font-bold font-mono-numbers text-white mt-1">
            {remainingAds.length} <span className="text-xs font-normal text-slate-400">Tasks</span>
          </div>
          <div className="text-[11px] text-emerald-400 font-mono-numbers mt-1 flex items-center gap-1">
            <i className="fa-solid fa-coins text-[10px]"></i>
            <span>₨ {potentialEarnings.toFixed(2)} Ready to Earn</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-xl bg-[#1E293B] border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Today's Tasks Done</div>
          <div className="text-2xl font-bold font-mono-numbers text-white mt-1">
            {tasksDoneToday} / {dailyTasksLimit}
          </div>
          <div className="text-[11px] text-cyan-400 font-mono-numbers mt-1 flex items-center gap-1">
            <i className="fa-solid fa-arrow-trend-up text-[10px]"></i>
            <span>₨ {(tasksDoneToday * 100).toFixed(2)} Earned Today</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-xl bg-[#1E293B] border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Current Balance</div>
          <div className="text-2xl font-bold font-mono-numbers text-[#10B981] mt-1">
            ₨ {wallet.earningsBalance.toFixed(2)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
            <span>Min. Cashout: <strong>₨ 500 (JazzCash)</strong></span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 rounded-xl bg-[#1E293B] border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Referral Commissions</div>
          <div className="text-2xl font-bold font-mono-numbers text-white mt-1">
            ₨ {wallet.referralEarnings.toFixed(2)}
          </div>
          <div className="text-[11px] text-amber-400 mt-1 flex items-center gap-1">
            <span>10% on {wallet.referredUsersCount} Friends</span>
          </div>
        </div>

      </section>

      {/* Task Directory Header & Controls */}
      <div className="space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <i className="fa-solid fa-list-check text-emerald-400"></i>
              <span>Available Tasks Center</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click on any task button below to start the 15-second sponsor task, solve the anti-bot math check, and get ₨ 100 PKR credited immediately.
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-[#1E293B] border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-44 sm:w-56"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'reward' | 'popular' | 'newest')}
              className="px-3 py-1.5 bg-[#1E293B] border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="reward">Highest Reward</option>
              <option value="popular">Most Active</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFX.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Grid of Task Cards */}
      {filteredCampaigns.length === 0 ? (
        <div className="p-12 text-center bg-[#1E293B] border border-slate-800 rounded-2xl">
          <i className="fa-solid fa-list-check text-4xl text-slate-600 mb-3"></i>
          <h3 className="text-base font-semibold text-white">No tasks found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or filter selection.
          </p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCampaigns.map((ad) => {
            const viewsRemaining = ad.totalViews - ad.completedViews;
            const viewPercent = Math.min(100, Math.round((ad.completedViews / ad.totalViews) * 100));

            return (
              <div
                key={ad.id}
                className="group relative bg-[#1E293B] border border-slate-800 hover:border-emerald-500/40 rounded-xl overflow-hidden shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
              >
                
                {/* Top Media Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={ad.thumbnail}
                    alt={ad.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient Overlay for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-black/40" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-white bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 rounded border border-white/10">
                      {ad.category}
                    </span>

                    <span className="font-mono-numbers text-xs font-bold text-slate-950 bg-emerald-400 px-2.5 py-0.5 rounded shadow">
                      Task: ₨ {ad.rewardPKR.toFixed(2)} PKR
                    </span>
                  </div>

                  {/* Duration Tag */}
                  <div className="absolute bottom-2 left-2.5 text-[11px] font-mono-numbers text-slate-300 bg-slate-950/70 backdrop-blur-sm px-2 py-0.5 rounded flex items-center gap-1.5">
                    <i className="fa-solid fa-stopwatch text-cyan-400 text-[10px]"></i>
                    <span>15 Seconds Focus</span>
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
                      <span>{ad.advertiserName}</span>
                      <span aria-hidden="true">·</span>
                      <span>Verified Task</span>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                      {ad.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 mt-1.5">
                      {ad.description}
                    </p>
                  </div>

                  {/* Campaign Views Progress */}
                  <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono-numbers">
                      <span>{viewsRemaining} task slots left</span>
                      <span>{viewPercent}% delivered</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${viewPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Action Task Button */}
                  <div className="pt-2">
                    {ad.isWatchedToday ? (
                      <button
                        onClick={() => handleTaskClick(ad)}
                        className="w-full py-2.5 px-3 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <i className="fa-solid fa-check text-emerald-400"></i>
                        <span>Completed Today (Redo Task)</span>
                      </button>
                    ) : !hasRemainingTasks ? (
                      <button
                        onClick={() => {
                          if (openPlansPage) openPlansPage();
                        }}
                        className="w-full py-2.5 px-3 rounded-lg bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        title="You have finished all daily tasks for your current plan. Click to upgrade!"
                      >
                        <i className="fa-solid fa-lock text-amber-400"></i>
                        <span>Limit Reached · Upgrade Plan</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          soundFX.playClick();
                          handleTaskClick(ad);
                        }}
                        className="w-full py-2.5 px-3 rounded-lg bg-[#10B981] hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 group-hover:shadow-emerald-950/50 cursor-pointer"
                      >
                        <i className="fa-solid fa-play text-[10px]"></i>
                        <span>Start Task · Earn ₨ {ad.rewardPKR.toFixed(2)}</span>
                      </button>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
