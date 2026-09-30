import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Globe,
  Heart,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Menu,
  X,
  User,
  Check,
  MessageSquare,
  PlusCircle,
  Package,
  Repeat,
  LogOut,
  Briefcase,
  ShoppingBag
} from 'lucide-react';
import { AuthUser, Currency, GigCategory } from '../types/fiverr';
import { CATEGORIES_NAV } from '../data/fiverrGigsData';

interface FiverrNavbarProps {
  currentCategory: GigCategory;
  onSelectCategory: (category: GigCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currency: Currency;
  onToggleCurrency: (currency: Currency) => void;
  onOpenSellerModal: () => void;
  onOpenPostRequest: () => void;
  favoritesCount: number;
  unreadMessagesCount?: number;
  onOpenChat: () => void;
  currentUser: AuthUser | null;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onOpenCreateGig: () => void;
  onOpenOrders: () => void;
  onSwitchRole: () => void;
  onLogout: () => void;
}

export const FiverrNavbar: React.FC<FiverrNavbarProps> = ({
  currentCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  currency,
  onToggleCurrency,
  onOpenSellerModal,
  onOpenPostRequest,
  favoritesCount,
  unreadMessagesCount = 0,
  onOpenChat,
  currentUser,
  onOpenAuth,
  onOpenCreateGig,
  onOpenOrders,
  onSwitchRole,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const marketplaceSection = document.getElementById('marketplace-gigs');
    if (marketplaceSection) {
      marketplaceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-2xs transition-all text-slate-800">
      {/* Top Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          
          {/* Brand Logo in Iconic Fiverr / Figer Free Style */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                onSelectCategory('All Categories');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 cursor-pointer group text-left"
              title="Figer Free Home"
            >
              <span className="font-extrabold text-2xl sm:text-3xl tracking-tighter text-slate-900 font-['Outfit',sans-serif]">
                figer<span className="text-emerald-600 group-hover:text-emerald-500 transition-colors">free</span>
                <span className="text-emerald-600 text-3xl leading-none">.</span>
              </span>
            </button>

            {/* Pro Badge */}
            <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-900 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Pro</span>
            </span>
          </div>

          {/* Search Bar (Fiverr Style with Search Icon & Button) */}
          <div className="flex-1 max-w-xl hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="What service are you looking for today? (e.g. Next.js, Logo, SEO)..."
                  className="w-full bg-white border border-gray-300 rounded-l-md pl-4 pr-10 py-2 text-sm text-slate-900 placeholder-gray-400 focus:outline-none focus:border-slate-800 transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="bg-slate-900 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-r-md transition-colors flex items-center justify-center cursor-pointer shrink-0"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Navigation Controls */}
          <div className="flex items-center gap-2.5 sm:gap-4 text-sm font-semibold text-slate-600">
            {/* Pro link */}
            <button
              onClick={() => {
                const proSection = document.getElementById('prime-pro-section');
                if (proSection) {
                  proSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hidden lg:flex items-center gap-1 text-slate-700 hover:text-emerald-600 transition-colors cursor-pointer"
            >
              <span>Figer Pro</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </button>

            {/* Switch to Selling / Switch to Buying (Fiverr iconic feature) */}
            {currentUser && (
              <button
                onClick={onSwitchRole}
                className="hidden xl:flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer border border-emerald-200"
                title="Toggle between Buyer and Seller mode"
              >
                <Repeat className="w-3.5 h-3.5" />
                <span>
                  {currentUser.role === 'seller' ? 'Switch to Buying' : 'Switch to Selling'}
                </span>
              </button>
            )}

            {/* Post / Create a Gig (if seller) */}
            {currentUser?.role === 'seller' ? (
              <button
                onClick={onOpenCreateGig}
                className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors cursor-pointer px-2.5 py-1.5 rounded-lg hover:bg-gray-100"
              >
                <PlusCircle className="w-4 h-4 text-emerald-600" />
                <span>Post a Gig</span>
              </button>
            ) : (
              <button
                onClick={onOpenSellerModal}
                className="hidden sm:inline-block text-xs font-semibold text-slate-700 hover:text-emerald-600 transition-colors cursor-pointer"
              >
                Become a Seller
              </button>
            )}

            {/* Orders Dashboard Button */}
            <button
              onClick={onOpenOrders}
              className="relative p-2 rounded-lg hover:bg-gray-100 text-slate-700 hover:text-emerald-600 transition-colors cursor-pointer flex items-center gap-1"
              title="Orders Dashboard"
            >
              <Package className="w-4 h-4" />
              <span className="hidden lg:inline text-xs font-semibold">Orders</span>
            </button>

            {/* In-App Direct Chat / Messages */}
            <button
              onClick={onOpenChat}
              className="relative p-2 rounded-lg hover:bg-gray-100 text-slate-700 hover:text-emerald-600 transition-colors cursor-pointer flex items-center gap-1"
              title="In-App Realtime Messages"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden lg:inline text-xs font-semibold">Messages</span>
              {unreadMessagesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            {/* Currency Selector (PKR / USD) */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 text-xs font-bold text-slate-700 transition-colors cursor-pointer border border-gray-200"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>{currency === 'PKR' ? 'PKR ₨' : 'USD $'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-50 text-xs">
                  <button
                    onClick={() => {
                      onToggleCurrency('PKR');
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-gray-50 ${
                      currency === 'PKR' ? 'text-emerald-600 font-bold bg-emerald-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>Pakistani Rupee (₨)</span>
                    {currency === 'PKR' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                  <button
                    onClick={() => {
                      onToggleCurrency('USD');
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-gray-50 ${
                      currency === 'USD' ? 'text-emerald-600 font-bold bg-emerald-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>US Dollar ($)</span>
                    {currency === 'USD' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* User Profile or Sign In / Join Buttons */}
            {currentUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-2 rounded-full border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                      alt={currentUser.name}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-emerald-500/20"
                    />
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
                  </div>
                  <div className="hidden sm:block text-left pr-1">
                    <p className="text-xs font-bold text-gray-900 leading-tight truncate max-w-[100px]">
                      {currentUser.name}
                    </p>
                    <span className="text-[10px] uppercase font-bold text-emerald-600">
                      {currentUser.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 mr-1" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 z-50 text-xs">
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <p className="font-bold text-gray-900 truncate">{currentUser.name}</p>
                      <p className="text-gray-500 text-[11px] truncate">@{currentUser.username}</p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {currentUser.role === 'seller' ? 'Seller Account' : 'Buyer Account'}
                        </span>
                        {currentUser.level && (
                          <span className="text-[10px] text-gray-500">{currentUser.level}</span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onSwitchRole();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left flex items-center gap-2 hover:bg-gray-50 text-gray-700 font-semibold cursor-pointer"
                    >
                      <Repeat className="w-4 h-4 text-emerald-600" />
                      <span>{currentUser.role === 'seller' ? 'Switch to Buyer Mode' : 'Switch to Seller Mode'}</span>
                    </button>

                    <button
                      onClick={() => {
                        onOpenOrders();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left flex items-center gap-2 hover:bg-gray-50 text-gray-700 font-semibold cursor-pointer"
                    >
                      <Package className="w-4 h-4 text-emerald-600" />
                      <span>My Orders & Delivery</span>
                    </button>

                    {currentUser.role === 'seller' && (
                      <button
                        onClick={() => {
                          onOpenCreateGig();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-left flex items-center gap-2 hover:bg-gray-50 text-gray-700 font-semibold cursor-pointer"
                      >
                        <PlusCircle className="w-4 h-4 text-emerald-600" />
                        <span>Create / Post a Gig</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        onOpenChat();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-left flex items-center gap-2 hover:bg-gray-50 text-gray-700 font-semibold cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      <span>Live In-App Chat</span>
                    </button>

                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          onLogout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-left flex items-center gap-2 hover:bg-rose-50 text-rose-600 font-semibold cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3.5 py-1.5 text-xs sm:text-sm font-bold text-gray-700 hover:text-emerald-600 transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
                >
                  Join
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search services on Figer Free..."
              className="w-full bg-gray-50 border border-gray-300 rounded-l-md pl-3 pr-8 py-2 text-xs text-slate-900 placeholder-gray-400 focus:outline-none focus:border-slate-800"
            />
            <button
              type="submit"
              className="bg-slate-900 text-white px-4 py-2 rounded-r-md text-xs cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Category Sub-Navigation Bar */}
      <nav className="border-t border-gray-200 bg-white shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-2.5 text-xs sm:text-sm font-medium text-gray-600 whitespace-nowrap">
            <button
              onClick={() => onSelectCategory('All Categories')}
              className={`pb-1 border-b-2 transition-all cursor-pointer font-semibold ${
                currentCategory === 'All Categories'
                  ? 'border-emerald-600 text-emerald-600 font-bold'
                  : 'border-transparent hover:text-slate-900 hover:border-gray-300'
              }`}
            >
              All Services
            </button>

            {CATEGORIES_NAV.map((cat) => {
              const isSelected = currentCategory === cat.name;
              return (
                <div key={cat.name} className="relative group">
                  <button
                    onClick={() => {
                      onSelectCategory(cat.name);
                      const marketplaceSection = document.getElementById('marketplace-gigs');
                      if (marketplaceSection) {
                        marketplaceSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className={`pb-1 border-b-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 text-emerald-600 font-bold'
                        : 'border-transparent hover:text-slate-900 hover:border-gray-300'
                    }`}
                  >
                    {cat.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white p-4 space-y-3 text-sm">
          {currentUser ? (
            <div className="p-3 bg-gray-50 rounded-xl mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-gray-900 text-xs">{currentUser.name}</p>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase">{currentUser.role}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-bold text-rose-600 hover:underline"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={() => {
                  onOpenAuth('login');
                  setMobileMenuOpen(false);
                }}
                className="py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-center"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  onOpenAuth('register');
                  setMobileMenuOpen(false);
                }}
                className="py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold text-center"
              >
                Join Figer Free
              </button>
            </div>
          )}

          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <span className="font-bold text-slate-800">Currency</span>
            <div className="flex gap-2">
              <button
                onClick={() => onToggleCurrency('PKR')}
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  currency === 'PKR' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-slate-700'
                }`}
              >
                PKR (₨)
              </button>
              <button
                onClick={() => onToggleCurrency('USD')}
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  currency === 'USD' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-slate-700'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              onOpenOrders();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 font-semibold text-slate-700 hover:text-emerald-600 flex items-center gap-2"
          >
            <Package className="w-4 h-4 text-emerald-600" />
            <span>Orders & Deliveries</span>
          </button>

          {currentUser?.role === 'seller' ? (
            <button
              onClick={() => {
                onOpenCreateGig();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 font-semibold text-slate-700 hover:text-emerald-600 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-emerald-600" />
              <span>Post / Create a Gig</span>
            </button>
          ) : (
            <button
              onClick={() => {
                onOpenSellerModal();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 font-semibold text-slate-700 hover:text-emerald-600"
            >
              Become a Verified Freelancer
            </button>
          )}

          <button
            onClick={() => {
              onOpenPostRequest();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 font-semibold text-slate-700 hover:text-emerald-600"
          >
            Post a Custom Project Request
          </button>

          <button
            onClick={() => {
              onOpenChat();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 font-semibold text-slate-700 hover:text-emerald-600 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>In-App Messages & Chat</span>
            </div>
            {unreadMessagesCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                {unreadMessagesCount} New
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};
