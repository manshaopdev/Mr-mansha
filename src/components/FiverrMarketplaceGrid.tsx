import React, { useState, useMemo } from 'react';
import {
  Star,
  Heart,
  SlidersHorizontal,
  ChevronDown,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  X,
  Search
} from 'lucide-react';
import { Currency, Gig, GigCategory, SellerLevel } from '../types/fiverr';

interface FiverrMarketplaceGridProps {
  gigs: Gig[];
  currentCategory: GigCategory;
  onSelectCategory: (category: GigCategory) => void;
  searchQuery: string;
  onClearSearch: () => void;
  currency: Currency;
  onSelectGig: (gig: Gig) => void;
  favoriteGigIds: string[];
  onToggleFavorite: (gigId: string) => void;
}

export const FiverrMarketplaceGrid: React.FC<FiverrMarketplaceGridProps> = ({
  gigs,
  currentCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
  currency,
  onSelectGig,
  favoriteGigIds,
  onToggleFavorite,
}) => {
  const [budgetFilter, setBudgetFilter] = useState<'all' | 'under20k' | '20kTo50k' | 'over50k'>('all');
  const [deliveryFilter, setDeliveryFilter] = useState<'all' | '3days' | '7days'>('all');
  const [sellerLevelFilter, setSellerLevelFilter] = useState<'all' | 'Top Rated' | 'Pro Verified'>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'priceLow' | 'priceHigh'>('recommended');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Filter & Sort Logic
  const filteredGigs = useMemo(() => {
    return gigs.filter((gig) => {
      // Category filter
      if (currentCategory !== 'All Categories' && gig.category !== currentCategory) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = gig.title.toLowerCase().includes(query);
        const matchesCategory = gig.category.toLowerCase().includes(query);
        const matchesSubCategory = gig.subCategory.toLowerCase().includes(query);
        const matchesSeller = gig.seller.name.toLowerCase().includes(query) || gig.seller.username.toLowerCase().includes(query);
        const matchesTag = gig.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesCategory && !matchesSubCategory && !matchesSeller && !matchesTag) {
          return false;
        }
      }

      // Budget filter
      if (budgetFilter === 'under20k' && gig.startingPricePkr > 20000) return false;
      if (budgetFilter === '20kTo50k' && (gig.startingPricePkr < 20000 || gig.startingPricePkr > 50000)) return false;
      if (budgetFilter === 'over50k' && gig.startingPricePkr <= 50000) return false;

      // Delivery time filter (based on basic tier deliveryDays)
      if (deliveryFilter === '3days' && gig.packages.basic.deliveryDays > 3) return false;
      if (deliveryFilter === '7days' && gig.packages.basic.deliveryDays > 7) return false;

      // Seller level filter
      if (sellerLevelFilter === 'Top Rated' && gig.seller.level !== 'Top Rated Seller') return false;
      if (sellerLevelFilter === 'Pro Verified' && !gig.seller.isPro) return false;

      // Favorites only
      if (showOnlyFavorites && !favoriteGigIds.includes(gig.id)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'priceLow') {
        return a.startingPricePkr - b.startingPricePkr;
      }
      if (sortBy === 'priceHigh') {
        return b.startingPricePkr - a.startingPricePkr;
      }
      // Recommended: by reviews count
      return b.reviewsCount - a.reviewsCount;
    });
  }, [
    gigs,
    currentCategory,
    searchQuery,
    budgetFilter,
    deliveryFilter,
    sellerLevelFilter,
    sortBy,
    showOnlyFavorites,
    favoriteGigIds,
  ]);

  const formatPrice = (pricePkr: number, priceUsd: number) => {
    if (currency === 'PKR') {
      return `PKR ${pricePkr.toLocaleString()}`;
    }
    return `$${priceUsd.toLocaleString()}`;
  };

  return (
    <section id="marketplace-gigs" className="py-12 sm:py-16 bg-[#F7F7F7] border-b border-gray-200 text-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Marketplace Section Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
            <span>Home</span>
            <span>&gt;</span>
            <span className="text-red-600 font-bold">{currentCategory}</span>
            {searchQuery && (
              <>
                <span>&gt;</span>
                <span className="text-slate-700 italic">"{searchQuery}"</span>
              </>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              {currentCategory === 'All Categories' ? 'Explore Verified Prime Gigs' : `${currentCategory} Services`}
            </h2>
            <div className="text-xs sm:text-sm text-gray-500 font-medium">
              <span className="font-bold text-slate-800">{filteredGigs.length}</span> services available
            </div>
          </div>
        </div>

        {/* Active Search Notification Banner */}
        {searchQuery && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between text-xs text-red-800">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-red-600" />
              <span>Showing search results for: <strong>"{searchQuery}"</strong></span>
            </div>
            <button
              onClick={onClearSearch}
              className="text-red-600 hover:text-red-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Clear Filter</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Fiverr Filter Toolbar */}
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-gray-200 shadow-2xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            {/* Left Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              
              {/* Category selector */}
              <select
                value={currentCategory}
                onChange={(e) => onSelectCategory(e.target.value as GigCategory)}
                className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 font-medium text-slate-800 focus:outline-none focus:border-red-600 cursor-pointer"
              >
                <option value="All Categories">All Categories</option>
                <option value="Programming & Tech">Programming & Tech</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="AI Services">AI Services</option>
                <option value="Video & Animation">Video & Animation</option>
              </select>

              {/* Budget Filter */}
              <select
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value as any)}
                className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 font-medium text-slate-800 focus:outline-none focus:border-red-600 cursor-pointer"
              >
                <option value="all">Budget: Any Price</option>
                <option value="under20k">Under PKR 20,000</option>
                <option value="20kTo50k">PKR 20,000 - 50,000</option>
                <option value="over50k">PKR 50,000+</option>
              </select>

              {/* Delivery Time Filter */}
              <select
                value={deliveryFilter}
                onChange={(e) => setDeliveryFilter(e.target.value as any)}
                className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 font-medium text-slate-800 focus:outline-none focus:border-red-600 cursor-pointer"
              >
                <option value="all">Delivery: Any Time</option>
                <option value="3days">Express (Up to 3 days)</option>
                <option value="7days">Standard (Up to 7 days)</option>
              </select>

              {/* Seller Level Filter */}
              <select
                value={sellerLevelFilter}
                onChange={(e) => setSellerLevelFilter(e.target.value as any)}
                className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 font-medium text-slate-800 focus:outline-none focus:border-red-600 cursor-pointer"
              >
                <option value="all">Seller Details: All</option>
                <option value="Top Rated">Top Rated Sellers</option>
                <option value="Pro Verified">Prime Pro Verified</option>
              </select>

              {/* Favorites toggle */}
              <button
                onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                className={`px-3 py-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  showOnlyFavorites
                    ? 'bg-red-50 border-red-500 text-red-600 font-bold'
                    : 'bg-gray-50 border-gray-300 text-slate-700 hover:bg-gray-100'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${showOnlyFavorites ? 'fill-red-600 text-red-600' : ''}`} />
                <span>Saved ({favoriteGigIds.length})</span>
              </button>

            </div>

            {/* Right Sort By Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 font-bold text-slate-900 focus:outline-none focus:border-red-600 cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="rating">Top Rated</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
            </div>

          </div>
        </div>

        {/* Gigs Cards Grid (Classic Fiverr Card Layout) */}
        {filteredGigs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGigs.map((gig) => {
              const isFav = favoriteGigIds.includes(gig.id);

              return (
                <div
                  key={gig.id}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  onClick={() => onSelectGig(gig)}
                >
                  {/* Gig Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={gig.images[0]}
                      alt={gig.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      {gig.badge && (
                        <span
                          className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${
                            gig.badge === 'Prime Choice'
                              ? 'bg-slate-900 text-yellow-400 border border-yellow-500/40'
                              : gig.badge === 'Pro Verified'
                              ? 'bg-red-600 text-white'
                              : 'bg-yellow-500 text-slate-950 font-black'
                          }`}
                        >
                          {gig.badge}
                        </span>
                      )}
                    </div>

                    {/* Favorite Heart Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(gig.id);
                      }}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-sm flex items-center justify-center transition-transform active:scale-90"
                      title={isFav ? 'Remove from saved' : 'Save to favorites'}
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isFav ? 'fill-red-600 text-red-600' : 'text-slate-600 hover:text-red-600'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Gig Content Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    
                    {/* Seller Information */}
                    <div className="flex items-center gap-2.5">
                      <img
                        src={gig.seller.avatar}
                        alt={gig.seller.name}
                        className="w-7 h-7 rounded-full object-cover border border-gray-200"
                      />
                      <div className="leading-tight">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                            {gig.seller.name}
                          </span>
                          {gig.seller.isPro && (
                            <ShieldCheck className="w-3.5 h-3.5 text-yellow-500" />
                          )}
                        </div>
                        <span className="text-[10px] font-medium text-gray-500">
                          {gig.seller.level}
                        </span>
                      </div>
                    </div>

                    {/* Gig Title */}
                    <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
                      {gig.title}
                    </h3>

                    {/* Star Rating & Order In Queue */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 font-bold text-slate-900">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span>{gig.rating.toFixed(1)}</span>
                        <span className="text-gray-400 font-normal">({gig.reviewsCount})</span>
                      </div>
                      <span className="text-[11px] text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>{gig.packages.basic.deliveryDays}d delivery</span>
                      </span>
                    </div>

                  </div>

                  {/* Card Bottom Strip (Fiverr Signature Price Footer) */}
                  <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <span className="text-[10px] font-bold text-gray-400 uppercase font-mono tracking-wider">
                      Starting at
                    </span>
                    <div className="text-right">
                      <span className="text-sm sm:text-base font-extrabold text-slate-900 font-mono">
                        {formatPrice(gig.startingPricePkr, gig.startingPriceUsd)}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="py-16 text-center bg-white rounded-2xl border border-gray-200 p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No matching services found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              We couldn't find any gigs matching your current filters or search term. Try resetting your filters to explore all services.
            </p>
            <button
              onClick={() => {
                onSelectCategory('All Categories');
                onClearSearch();
                setBudgetFilter('all');
                setDeliveryFilter('all');
                setSellerLevelFilter('all');
                setShowOnlyFavorites(false);
              }}
              className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-red-600 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
