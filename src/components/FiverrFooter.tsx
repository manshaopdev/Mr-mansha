import React from 'react';
import { Globe, Heart, ArrowUp, Sparkles, MessageSquare } from 'lucide-react';
import { Currency, GigCategory } from '../types/fiverr';

interface FiverrFooterProps {
  onSelectCategory: (category: GigCategory) => void;
  currency: Currency;
  onToggleCurrency: (currency: Currency) => void;
  onOpenPostRequest: () => void;
  onOpenSellerModal: () => void;
  onOpenChat?: () => void;
}

export const FiverrFooter: React.FC<FiverrFooterProps> = ({
  onSelectCategory,
  currency,
  onToggleCurrency,
  onOpenPostRequest,
  onOpenSellerModal,
  onOpenChat,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-gray-200 text-slate-600 text-left pt-14 pb-10 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 5 Column Grid in Authentic Fiverr Structure */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Categories */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Categories</h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onSelectCategory('Graphics & Design')}
                  className="hover:text-red-600 transition-colors"
                >
                  Graphics & Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Programming & Tech')}
                  className="hover:text-red-600 transition-colors"
                >
                  Programming & Tech
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Digital Marketing')}
                  className="hover:text-red-600 transition-colors"
                >
                  Digital Marketing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Video & Animation')}
                  className="hover:text-red-600 transition-colors"
                >
                  Video & Animation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('AI Services')}
                  className="hover:text-red-600 transition-colors"
                >
                  AI Services
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: About */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">About</h4>
            <ul className="space-y-2.5">
              <li>
                <span className="hover:text-slate-900 cursor-pointer">Careers at Figer Free</span>
              </li>
              <li>
                <span className="hover:text-slate-900 cursor-pointer">Press & News</span>
              </li>
              <li>
                <span className="hover:text-slate-900 cursor-pointer">Partnerships</span>
              </li>
              <li>
                <span className="hover:text-slate-900 cursor-pointer">Privacy Policy</span>
              </li>
              <li>
                <span className="hover:text-slate-900 cursor-pointer">Terms of Service</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Education */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Support</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={onOpenPostRequest} className="hover:text-red-600 text-left">
                  Help & Support
                </button>
              </li>
              <li>
                <span className="hover:text-slate-900 cursor-pointer">Trust & Safety</span>
              </li>
              <li>
                <button onClick={onOpenSellerModal} className="hover:text-emerald-600 text-left">
                  Selling on Figer Free
                </button>
              </li>
              <li>
                <button onClick={onOpenPostRequest} className="hover:text-emerald-600 text-left">
                  Buying on Figer Free
                </button>
              </li>
              <li>
                <span className="hover:text-slate-900 cursor-pointer">Figer Free Freelancer Guides</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Community */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Community</h4>
            <ul className="space-y-2.5">
              <li>
                <span className="hover:text-slate-900 cursor-pointer">Customer Stories</span>
              </li>
              <li>
                <span className="hover:text-slate-900 cursor-pointer">Community Hub</span>
              </li>
              <li>
                <span className="hover:text-slate-900 cursor-pointer">Forum & Discussions</span>
              </li>
              <li>
                <span className="hover:text-slate-900 cursor-pointer">Events & Meetups</span>
              </li>
              <li>
                <span className="hover:text-slate-900 cursor-pointer">Creators Podcast</span>
              </li>
            </ul>
          </div>

          {/* Col 5: More from Figer Free */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Business Solutions</h4>
            <ul className="space-y-2.5">
              <li>
                <span className="hover:text-emerald-600 font-bold flex items-center gap-1 cursor-pointer">
                  <span>Figer Free Pro</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </span>
              </li>
              <li>
                <span className="hover:text-slate-900 cursor-pointer">Enterprise Escrow</span>
              </li>
              <li>
                <span className="hover:text-slate-900 cursor-pointer">Agency Retainers</span>
              </li>
              <li>
                <span className="hover:text-slate-900 cursor-pointer">ClearVoice Editorial</span>
              </li>
              <li>
                <button
                  onClick={onOpenPostRequest}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 font-bold hover:bg-emerald-100 transition-colors"
                >
                  Custom Quote
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip in Authentic Fiverr Style */}
        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Copyright */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <span className="font-extrabold text-xl tracking-tighter text-slate-900 font-['Outfit',sans-serif]">
              figer<span className="text-emerald-600">free</span><span className="text-emerald-600 text-2xl leading-none">.</span>
            </span>
            <span className="text-gray-400">
              © {new Date().getFullYear()} Figer Free Marketplace Ltd. All Rights Reserved.
            </span>
          </div>

          {/* Controls: Currency, Language & Scroll to Top */}
          <div className="flex items-center gap-4 text-xs font-semibold">
            
            {/* Currency Button */}
            <button
              onClick={() => onToggleCurrency(currency === 'PKR' ? 'USD' : 'PKR')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-gray-200 hover:bg-gray-50 text-slate-800 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-gray-500" />
              <span>{currency === 'PKR' ? 'PKR (₨)' : 'USD ($)'}</span>
            </button>

            {/* In-App Direct Chat Button */}
            {onOpenChat && (
              <button
                onClick={onOpenChat}
                className="flex items-center gap-1.5 text-red-600 hover:text-red-700 font-bold transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Live In-App Chat</span>
              </button>
            )}

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-slate-700 transition-colors cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>

          </div>

        </div>

      </div>
    </footer>
  );
};
