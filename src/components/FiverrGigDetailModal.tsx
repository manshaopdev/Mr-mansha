import React, { useState } from 'react';
import {
  X,
  Star,
  Check,
  Clock,
  RotateCcw,
  ShieldCheck,
  MessageCircle,
  Heart,
  Share2,
  ChevronRight,
  Sparkles,
  HelpCircle,
  ThumbsUp,
  FileText,
  MessageSquare
} from 'lucide-react';
import { Currency, Gig, GigPackageTier } from '../types/fiverr';

interface FiverrGigDetailModalProps {
  gig: Gig | null;
  onClose: () => void;
  currency: Currency;
  isFavorite: boolean;
  onToggleFavorite: (gigId: string) => void;
  onStartOrder: (gig: Gig, tier: 'Basic' | 'Standard' | 'Premium') => void;
  onContactSeller?: (seller: any, gig: any) => void;
}

export const FiverrGigDetailModal: React.FC<FiverrGigDetailModalProps> = ({
  gig,
  onClose,
  currency,
  isFavorite,
  onToggleFavorite,
  onStartOrder,
  onContactSeller,
}) => {
  if (!gig) return null;

  const [activeTier, setActiveTier] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const currentPackage: GigPackageTier = gig.packages[activeTier];

  const formatPrice = (pricePkr: number, priceUsd: number) => {
    if (currency === 'PKR') {
      return `PKR ${pricePkr.toLocaleString()}`;
    }
    return `$${priceUsd.toLocaleString()}`;
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleContactSeller = () => {
    if (onContactSeller) {
      onContactSeller(
        {
          id: `seller_${gig.seller.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
          name: gig.seller.name,
          avatar: gig.seller.avatar,
          level: gig.seller.level,
          rating: gig.seller.rating,
          title: gig.seller.country ? `Verified Talent (${gig.seller.country})` : 'Verified Prime Seller',
          responseTime: gig.seller.responseTime || '1 Hour Avg Response'
        },
        {
          id: gig.id,
          title: gig.title,
          pricePkr: currentPackage.pricePkr,
          priceUsd: currentPackage.priceUsd,
          tier: currentPackage.name
        }
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex justify-center p-2 sm:p-4 md:p-6 text-left">
      <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
            <span>Home</span>
            <span>&gt;</span>
            <span className="text-gray-700 font-bold">{gig.category}</span>
            <span>&gt;</span>
            <span className="text-red-600 font-bold">{gig.subCategory}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-slate-900 transition-colors cursor-pointer text-xs font-medium flex items-center gap-1"
              title="Share Gig"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copiedLink ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={() => onToggleFavorite(gig.id)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer"
              title="Save to favorites"
            >
              <Heart
                className={`w-4 h-4 ${isFavorite ? 'fill-red-600 text-red-600' : 'hover:text-red-600'}`}
              />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          
          {/* Gig Headline & Seller Strip */}
          <div className="space-y-4">
            <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit',sans-serif] leading-tight">
              {gig.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <img
                  src={gig.seller.avatar}
                  alt={gig.seller.name}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <span>{gig.seller.name}</span>
                    <span className="text-gray-400 font-normal">@{gig.seller.username}</span>
                    {gig.seller.isPro && (
                      <span className="px-1.5 py-0.5 rounded bg-slate-900 text-yellow-400 text-[10px] font-bold font-mono">
                        PRO
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-red-600 font-semibold">{gig.seller.level}</span>
                </div>
              </div>

              <div className="h-6 w-px bg-gray-200 hidden sm:block" />

              <div className="flex items-center gap-1 font-bold text-slate-900">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{gig.rating.toFixed(1)}</span>
                <span className="text-gray-400 font-normal">({gig.reviewsCount} reviews)</span>
              </div>

              <div className="h-6 w-px bg-gray-200 hidden sm:block" />

              <div className="text-gray-500 font-medium">
                <span className="font-bold text-slate-800">{gig.ordersInQueue}</span> orders in queue
              </div>
            </div>
          </div>

          {/* Main 2-Column Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Images, Description, Seller, Reviews */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Image Gallery */}
              <div className="space-y-3">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 border border-gray-200">
                  <img
                    src={gig.images[activeImageIndex]}
                    alt={gig.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Thumbnails */}
                {gig.images.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-1">
                    {gig.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                          activeImageIndex === idx ? 'border-red-600 shadow-md' : 'border-gray-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* About This Gig Section */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                  About this gig
                </h3>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line space-y-2">
                  {gig.description}
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <span className="text-xs font-bold text-gray-400 uppercase font-mono">Related tags</span>
                <div className="flex flex-wrap gap-2">
                  {gig.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-gray-100 text-slate-700 text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* About the Seller Card */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                  About the seller
                </h3>

                <div className="flex items-center gap-4">
                  <img
                    src={gig.seller.avatar}
                    alt={gig.seller.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{gig.seller.name}</h4>
                    <p className="text-xs text-red-600 font-semibold">{gig.seller.level}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-800 font-bold mt-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span>{gig.seller.rating.toFixed(1)}</span>
                      <span className="text-gray-400 font-normal">({gig.seller.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {gig.seller.bio}
                </p>

                {/* Seller Metrics Table */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-white rounded-xl border border-gray-200 text-xs">
                  <div>
                    <span className="text-gray-400 block">From</span>
                    <span className="font-bold text-slate-900">{gig.seller.country}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Member since</span>
                    <span className="font-bold text-slate-900">{gig.seller.memberSince}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Avg. response</span>
                    <span className="font-bold text-slate-900">{gig.seller.avgResponseTime}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Last delivery</span>
                    <span className="font-bold text-slate-900">{gig.seller.lastDelivery}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {gig.seller.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 rounded-md bg-white border border-gray-200 text-[11px] text-gray-700 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* FAQs Accordion */}
              {gig.faqs.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                    Frequently asked questions
                  </h3>
                  <div className="space-y-2">
                    {gig.faqs.map((faq, idx) => {
                      const isOpen = openFaqIndex === idx;
                      return (
                        <div
                          key={idx}
                          className="border border-gray-200 rounded-xl overflow-hidden bg-white"
                        >
                          <button
                            onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                            className="w-full px-4 py-3 flex items-center justify-between text-left font-bold text-sm text-slate-900 hover:text-red-600 cursor-pointer"
                          >
                            <span>{faq.question}</span>
                            <ChevronRight
                              className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90 text-red-600' : 'text-gray-400'}`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-3.5 text-xs sm:text-sm text-gray-600 border-t border-gray-100 pt-2 leading-relaxed">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Reviews Section */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                    Reviews ({gig.reviews.length})
                  </h3>
                  <div className="flex items-center gap-1 font-bold text-sm text-slate-900">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>5.0</span>
                    <span className="text-gray-400 font-normal">Rating</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {gig.reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={rev.avatar}
                            alt={rev.author}
                            className="w-8 h-8 rounded-full object-cover border border-gray-200"
                          />
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">{rev.author}</span>
                            <span className="text-[10px] text-gray-400">{rev.country}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{rev.rating}</span>
                          <span className="text-[10px] text-gray-400 font-normal">• {rev.date}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Authentic Fiverr 3-Tier Pricing Card */}
            <div className="lg:col-span-5 sticky top-20">
              <div className="bg-white border-2 border-slate-900 rounded-2xl shadow-xl overflow-hidden">
                
                {/* 3 Package Tabs (Basic / Standard / Premium) */}
                <div className="grid grid-cols-3 border-b border-gray-200 text-center font-bold text-xs sm:text-sm">
                  <button
                    onClick={() => setActiveTier('basic')}
                    className={`py-3.5 transition-colors cursor-pointer border-b-2 ${
                      activeTier === 'basic'
                        ? 'border-red-600 text-red-600 bg-red-50/30'
                        : 'border-transparent text-gray-500 hover:text-slate-900'
                    }`}
                  >
                    Basic
                  </button>
                  <button
                    onClick={() => setActiveTier('standard')}
                    className={`py-3.5 transition-colors cursor-pointer border-b-2 relative ${
                      activeTier === 'standard'
                        ? 'border-red-600 text-red-600 bg-red-50/30'
                        : 'border-transparent text-gray-500 hover:text-slate-900'
                    }`}
                  >
                    Standard
                    <span className="absolute top-1 right-2 text-[9px] font-extrabold uppercase px-1 rounded bg-yellow-400 text-slate-950">
                      Popular
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTier('premium')}
                    className={`py-3.5 transition-colors cursor-pointer border-b-2 ${
                      activeTier === 'premium'
                        ? 'border-red-600 text-red-600 bg-red-50/30'
                        : 'border-transparent text-gray-500 hover:text-slate-900'
                    }`}
                  >
                    Premium
                  </button>
                </div>

                {/* Package Card Content */}
                <div className="p-5 sm:p-6 space-y-5">
                  
                  {/* Title & Price in PKR */}
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-base font-bold text-slate-900">
                      {currentPackage.title}
                    </h4>
                    <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono shrink-0">
                      {formatPrice(currentPackage.pricePkr, currentPackage.priceUsd)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {currentPackage.description}
                  </p>

                  {/* Delivery & Revision Specs */}
                  <div className="flex items-center gap-6 text-xs font-bold text-slate-800 font-mono py-2 border-y border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-red-600" />
                      <span>{currentPackage.deliveryDays} Days Delivery</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <RotateCcw className="w-4 h-4 text-yellow-500" />
                      <span>{currentPackage.revisions}</span>
                    </div>
                  </div>

                  {/* Features Checklist */}
                  <div className="space-y-2 text-xs">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 font-mono block">
                      What's Included
                    </span>
                    <ul className="space-y-2">
                      {currentPackage.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check
                            className={`w-4 h-4 shrink-0 ${
                              feat.included ? 'text-emerald-600 font-bold' : 'text-gray-300'
                            }`}
                          />
                          <span
                            className={
                              feat.included ? 'text-slate-800 font-medium' : 'text-gray-400 line-through'
                            }
                          >
                            {feat.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Primary CTA (Order / Continue) */}
                  <div className="space-y-2.5 pt-2">
                    <button
                      onClick={() =>
                        onStartOrder(
                          gig,
                          activeTier === 'basic'
                            ? 'Basic'
                            : activeTier === 'standard'
                            ? 'Standard'
                            : 'Premium'
                        )
                      }
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <span>
                        Continue ({formatPrice(currentPackage.pricePkr, currentPackage.priceUsd)})
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={handleContactSeller}
                      className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4 text-red-500" />
                      <span>Contact Seller (Direct In-App Chat)</span>
                    </button>
                  </div>

                  {/* Money-Back Guarantee Note */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-gray-500 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Figer Free Escrow Protected & Money-Back Guarantee</span>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
