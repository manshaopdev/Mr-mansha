import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Star, ShieldCheck, CheckCircle2, ArrowRight, MessageSquare } from 'lucide-react';
import { TRUSTED_COMPANIES } from '../data/fiverrGigsData';

interface FiverrHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectTag: (tag: string) => void;
  onOpenBriefModal: () => void;
  onDirectChat?: () => void;
}

export const FiverrHero: React.FC<FiverrHeroProps> = ({
  searchQuery,
  onSearchChange,
  onSelectTag,
  onOpenBriefModal,
  onDirectChat,
}) => {
  const [dynamicKeywordIndex, setDynamicKeywordIndex] = useState(0);
  const keywords = ['freelance', 'development', 'creative', 'marketing', 'AI'];

  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicKeywordIndex((prev) => (prev + 1) % keywords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [keywords.length]);

  const popularTags = [
    'Website Design',
    'Logo Design',
    'Meta Ads',
    'Shopify Store',
    'AI Chatbot',
    'Video Reels',
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const marketplace = document.getElementById('marketplace-gigs');
    if (marketplace) {
      marketplace.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-[#0A0D14] text-white pt-10 sm:pt-16 pb-14 sm:pb-20 overflow-hidden border-b border-slate-800">
      
      {/* Background Ambient Glows (Red & Yellow branding) */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text & Search Area */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Pro Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-400 font-bold">FIGER FREE</span>
              <span className="text-slate-400">• The Elite Freelance Network in PKR</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Outfit',sans-serif] leading-[1.15]">
              Find the right{' '}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-yellow-400 font-black italic">
                {keywords[dynamicKeywordIndex]}
              </span>{' '}
              service, right away.
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              Work with vetted top-tier designers, developers, and growth marketers. Transparent PKR pricing, milestone escrow safety, and instant delivery guarantees.
            </p>

            {/* Fiverr Signature Big Search Bar */}
            <form onSubmit={handleSearchSubmit} className="pt-2">
              <div className="flex flex-col sm:flex-row items-stretch bg-white rounded-xl shadow-2xl p-1.5 border border-slate-700 max-w-2xl">
                <div className="relative flex-1 flex items-center pl-3">
                  <Search className="w-5 h-5 text-gray-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search for any service (e.g. React website, Logo, Meta ads)..."
                    className="w-full py-3 pr-4 text-sm text-slate-900 placeholder-gray-500 bg-transparent focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => onSearchChange('')}
                      className="text-xs text-gray-400 hover:text-gray-700 mr-2"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  className="mt-2 sm:mt-0 px-6 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </form>

            {/* Popular Search Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="font-bold text-slate-400">Popular:</span>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onSelectTag(tag)}
                  className="px-3 py-1 rounded-full border border-slate-700 bg-slate-900/60 hover:border-yellow-400 hover:text-yellow-400 text-slate-300 transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Quick trust metrics */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Client Platform Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-yellow-400" />
                <span>100% Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-400" />
                <span>Vetted Top 1% Talent</span>
              </div>
            </div>

          </div>

          {/* Right Spotlight Card (Fiverr Signature Talent Spotlight) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 rounded-3xl p-5 shadow-2xl backdrop-blur-md">
              
              {/* Top Banner Tag */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  TOP RATED SELLER
                </span>
                <span className="text-yellow-400 text-xs font-mono font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-yellow-400" />
                  5.0 (384 reviews)
                </span>
              </div>

              {/* Freelancer Profile Image & Details */}
              <div className="pt-4 flex items-center gap-4">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                    alt="Farhan Malik"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-yellow-400/80 shadow-lg"
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900" title="Online now" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                    Farhan Malik
                    <ShieldCheck className="w-4 h-4 text-yellow-400" />
                  </h3>
                  <p className="text-xs text-yellow-300 font-mono">Lead Full-Stack Web Engineer</p>
                  <p className="text-[11px] text-slate-400">Figer Free • Lahore, Pakistan</p>
                </div>
              </div>

              {/* Gig Preview Card inside */}
              <div className="mt-4 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                <div className="text-xs text-slate-300 font-medium line-clamp-2">
                  "I will design and develop a responsive modern website in React, Next.js or Tailwind"
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-900">
                  <span className="text-slate-400 font-mono">Starting at:</span>
                  <span className="text-base font-extrabold text-white font-mono">
                    PKR 25,000 <span className="text-xs text-slate-400 font-normal">/ tier</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  onClick={() => {
                    const gig = document.getElementById('marketplace-gigs');
                    if (gig) gig.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors text-center cursor-pointer"
                >
                  View Gigs
                </button>
                <button
                  onClick={onDirectChat || onOpenBriefModal}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white transition-colors text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat Live In-App</span>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Trusted By Strip (Fiverr Signature Brand Bar) */}
        <div className="mt-14 pt-8 border-t border-slate-800/80">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Trusted by leading businesses & brands:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400 font-extrabold text-base tracking-widest">
              {TRUSTED_COMPANIES.map((company) => (
                <span
                  key={company.name}
                  className="hover:text-slate-200 transition-colors opacity-70 hover:opacity-100 cursor-default font-['Outfit',sans-serif]"
                >
                  {company.label}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
