import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { POPULAR_CATEGORIES } from '../data/fiverrGigsData';
import { GigCategory } from '../types/fiverr';

interface FiverrPopularCategoriesProps {
  onSelectCategory: (category: GigCategory) => void;
}

export const FiverrPopularCategories: React.FC<FiverrPopularCategoriesProps> = ({
  onSelectCategory,
}) => {
  return (
    <section className="py-12 sm:py-16 bg-white text-slate-900 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 text-left">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold font-mono uppercase tracking-wider text-red-600 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Prime Marketplace</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
              Popular professional services
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md">
            Choose from high-demand verified service categories with guaranteed turnaround times and verified Pakistan & global pricing.
          </p>
        </div>

        {/* Categories Grid (Fiverr Card Style with Background Photo & Overlay) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {POPULAR_CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              onClick={() => {
                onSelectCategory(cat.category);
                const marketplace = document.getElementById('marketplace-gigs');
                if (marketplace) {
                  marketplace.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 text-left flex flex-col justify-between p-4"
            >
              {/* Background Photo */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Gradient Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent group-hover:via-slate-950/70 transition-all" />

              {/* Top Category Badge */}
              <div className="relative z-10">
                <span className="text-[11px] font-mono font-semibold text-yellow-300/90 tracking-wide">
                  {cat.subTitle}
                </span>
              </div>

              {/* Bottom Title & Action */}
              <div className="relative z-10 space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit',sans-serif] leading-tight">
                  {cat.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-red-400 font-semibold group-hover:text-yellow-400 transition-colors pt-1">
                  <span>Browse Gigs</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
