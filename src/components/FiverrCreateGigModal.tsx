import React, { useState } from 'react';
import {
  X,
  Plus,
  Sparkles,
  Upload,
  CheckCircle2,
  DollarSign,
  Clock,
  Layers,
  Tag,
  AlertCircle
} from 'lucide-react';
import { AuthUser, Gig, GigCategory } from '../types/fiverr';

interface FiverrCreateGigModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser | null;
  onGigCreated: (newGig: Gig) => void;
  onRequireAuth: () => void;
}

const CATEGORY_OPTIONS: GigCategory[] = [
  'Programming & Tech',
  'Graphics & Design',
  'Digital Marketing',
  'Video & Animation',
  'AI Services',
  'Writing & Translation',
  'Business',
];

const SAMPLE_COVERS = [
  'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
];

export const FiverrCreateGigModal: React.FC<FiverrCreateGigModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onGigCreated,
  onRequireAuth,
}) => {
  const [title, setTitle] = useState('I will ');
  const [category, setCategory] = useState<GigCategory>('Programming & Tech');
  const [subCategory, setSubCategory] = useState('Web Applications');
  const [pricePkr, setPricePkr] = useState(18000);
  const [deliveryDays, setDeliveryDays] = useState(3);
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('React, Tailwind, Frontend');
  const [selectedImage, setSelectedImage] = useState(SAMPLE_COVERS[0]);
  const [customImageUrl, setCustomImageUrl] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <div className="w-full max-w-md bg-white rounded-2xl p-6 text-center shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Sign in to Create a Gig</h3>
          <p className="text-xs text-gray-500 mb-5">
            Real sellers on Figer Free can publish services, receive orders, and chat directly with buyers.
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onClose();
                onRequireAuth();
              }}
              className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
            >
              Sign In / Register
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || title.trim() === 'I will') {
      setErrorMsg('Please specify a complete gig title starting with "I will..."');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Please write a brief description of what you offer.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    const priceUsd = Math.round(pricePkr / 280);
    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
    const coverImage = customImageUrl.trim() || selectedImage;

    const payload = {
      title: title.trim(),
      category,
      subCategory,
      description: description.trim(),
      tags,
      images: [coverImage],
      startingPricePkr: pricePkr,
      startingPriceUsd: priceUsd,
      seller: {
        id: currentUser.id,
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar,
        level: currentUser.level || 'Level 1 Seller',
        country: currentUser.country || 'Pakistan',
        memberSince: '2025',
        avgResponseTime: '1 hour',
        lastDelivery: 'Today',
        rating: 5.0,
        reviewsCount: currentUser.ordersCompleted || 0,
        bio: currentUser.bio || 'Verified talent on Figer Free.',
        languages: ['English', 'Urdu'],
        skills: currentUser.skills || ['Web Development', 'Design'],
      },
      packages: {
        basic: {
          name: 'Basic',
          title: 'Basic Solution Tier',
          description: 'Essential delivery with responsive layout and verified source code.',
          deliveryDays,
          revisions: '2 Revisions',
          pricePkr,
          priceUsd,
          features: [
            { name: 'Core Deliverable Assets', included: true },
            { name: 'Source Files Included', included: true },
            { name: 'Commercial Rights', included: true },
            { name: 'Live Video Consultation', included: false }
          ]
        },
        standard: {
          name: 'Standard',
          title: 'Standard Growth Tier',
          description: 'Full-featured package with performance enhancements and extra support.',
          deliveryDays: Math.min(10, deliveryDays + 2),
          revisions: '5 Revisions',
          pricePkr: Math.round(pricePkr * 1.8),
          priceUsd: Math.round(priceUsd * 1.8),
          features: [
            { name: 'Core Deliverable Assets', included: true },
            { name: 'Source Files Included', included: true },
            { name: 'Commercial Rights', included: true },
            { name: 'Live Video Consultation', included: true }
          ]
        },
        premium: {
          name: 'Premium',
          title: 'VIP Enterprise Tier',
          description: 'Top-tier enterprise turnkey deliverable with VIP 24/7 dedicated support.',
          deliveryDays: Math.min(14, deliveryDays + 4),
          revisions: 'Unlimited Revisions',
          pricePkr: Math.round(pricePkr * 3),
          priceUsd: Math.round(priceUsd * 3),
          features: [
            { name: 'Core Deliverable Assets', included: true },
            { name: 'Source Files Included', included: true },
            { name: 'Commercial Rights', included: true },
            { name: 'Live Video Consultation', included: true }
          ]
        }
      }
    };

    try {
      const res = await fetch('/api/gigs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to create gig');
      }
      onGigCreated(data.gig);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Error publishing gig');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg">Publish a New Gig on Figer Free</h2>
              <p className="text-xs text-slate-300">Start offering your services to clients worldwide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Gig Title */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Gig Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="I will design a high-converting website in React..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              As your Gig storefront, your title should be catchy and clearly state what you will deliver.
            </p>
          </div>

          {/* Category & SubCategory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as GigCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Sub-Specialty
              </label>
              <input
                type="text"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                placeholder="e.g. Full-Stack Web Development"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Pricing & Delivery Days */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Starting Price (PKR ₨) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs font-bold text-gray-400">PKR</span>
                <input
                  type="number"
                  min={1000}
                  step={500}
                  required
                  value={pricePkr}
                  onChange={(e) => setPricePkr(Number(e.target.value))}
                  className="w-full pl-14 pr-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1">Approx. ${Math.round(pricePkr / 280)} USD</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Delivery Turnaround (Days) *
              </label>
              <div className="relative">
                <Clock className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  min={1}
                  max={30}
                  required
                  value={deliveryDays}
                  onChange={(e) => setDeliveryDays(Number(e.target.value))}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1">Average delivery timeframe in days</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Description *
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your service in detail: what you deliver, tools used, requirements from client..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
            />
          </div>

          {/* Cover Image Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Select or Provide Cover Image
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
              {SAMPLE_COVERS.map((imgUrl, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => {
                    setSelectedImage(imgUrl);
                    setCustomImageUrl('');
                  }}
                  className={`relative rounded-lg overflow-hidden h-14 border-2 transition-all cursor-pointer ${
                    selectedImage === imgUrl && !customImageUrl
                      ? 'border-emerald-600 ring-2 ring-emerald-500/40'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Cover template" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <input
              type="url"
              value={customImageUrl}
              onChange={(e) => setCustomImageUrl(e.target.value)}
              placeholder="Or paste custom image URL (Unsplash or direct image link)"
              className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Search Tags */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Search Tags (Comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. Website, React, Fullstack, Node, Tailwind"
              className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish Gig on Figer Free'}
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
