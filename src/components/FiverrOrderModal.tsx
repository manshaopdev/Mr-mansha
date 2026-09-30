import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageSquare,
  Copy,
  Check,
  CreditCard,
  Building,
  Smartphone
} from 'lucide-react';
import { AuthUser, Currency, Gig, GigPackageTier } from '../types/fiverr';

interface FiverrOrderModalProps {
  gig: Gig | null;
  tier: 'Basic' | 'Standard' | 'Premium';
  currency: Currency;
  onClose: () => void;
  currentUser?: AuthUser | null;
  onOpenDirectChat?: (seller: any, gig: any, orderRef?: string) => void;
}

export const FiverrOrderModal: React.FC<FiverrOrderModalProps> = ({
  gig,
  tier,
  currency,
  onClose,
  currentUser,
  onOpenDirectChat,
}) => {
  if (!gig) return null;

  const selectedPackage: GigPackageTier =
    tier === 'Basic'
      ? gig.packages.basic
      : tier === 'Standard'
      ? gig.packages.standard
      : gig.packages.premium;

  const [clientName, setClientName] = useState(currentUser?.name || '');
  const [clientEmail, setClientEmail] = useState(currentUser?.email || '');
  const [clientPhone, setClientPhone] = useState(currentUser?.phone || '');
  const [projectBrief, setProjectBrief] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'inapp_chat' | 'bank' | 'card'>('inapp_chat');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [copiedRef, setCopiedRef] = useState(false);

  const formatPrice = (pricePkr: number, priceUsd: number) => {
    if (currency === 'PKR') {
      return `PKR ${pricePkr.toLocaleString()}`;
    }
    return `$${priceUsd.toLocaleString()}`;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `FGR-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(generatedId);
    setIsSubmitted(true);

    // Save order to backend
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gigId: gig.id,
          gigTitle: gig.title,
          gigImage: gig.images[0],
          packageTier: selectedPackage.name,
          buyerId: currentUser?.id || 'client_me',
          buyerName: clientName || currentUser?.name || 'Valued Client',
          sellerId: gig.seller.id || 'seller-1',
          sellerName: gig.seller.name,
          sellerAvatar: gig.seller.avatar,
          pricePkr: selectedPackage.pricePkr,
          priceUsd: selectedPackage.priceUsd,
          deliveryDays: selectedPackage.deliveryDays,
          requirements: projectBrief,
        }),
      });
    } catch (err) {
      console.error('Failed to persist order to backend:', err);
    }
  };

  const copyOrderRef = () => {
    navigator.clipboard.writeText(orderRef);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex justify-center p-3 sm:p-6 text-left">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* Top Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <h3 className="font-extrabold text-base sm:text-lg font-['Outfit',sans-serif]">
              {isSubmitted ? 'Order Confirmed!' : 'Order Summary & Checkout'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          
          {!isSubmitted ? (
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              
              {/* Gig Summary Card */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex gap-4 items-center">
                <img
                  src={gig.images[0]}
                  alt=""
                  className="w-20 h-16 rounded-lg object-cover border border-gray-300 shrink-0"
                />
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold uppercase text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                    {selectedPackage.name} Tier
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{gig.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {selectedPackage.deliveryDays} Days Delivery
                    </span>
                    <span>•</span>
                    <span>Seller: {gig.seller.name}</span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-gray-600">
                  <span>{selectedPackage.name} Package Price</span>
                  <span className="font-bold text-slate-800">
                    {formatPrice(selectedPackage.pricePkr, selectedPackage.priceUsd)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-emerald-600">
                  <span>Figer Free Service Fee</span>
                  <span className="font-bold">PKR 0 (Free)</span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-sm sm:text-base font-extrabold text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-red-600 font-mono">
                    {formatPrice(selectedPackage.pricePkr, selectedPackage.priceUsd)}
                  </span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-600 font-mono block">
                  Select Order Confirmation Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('inapp_chat')}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'inapp_chat'
                        ? 'border-red-600 bg-red-50/50 shadow-xs ring-1 ring-red-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <MessageSquare className="w-4 h-4 text-red-600" />
                      <span className="text-[10px] font-bold text-red-700 font-mono">LIVE CHAT</span>
                    </div>
                    <span className="font-bold text-slate-900">In-App Chat & Escrow</span>
                    <span className="text-[10px] text-gray-500">Direct on website with talent</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'bank'
                        ? 'border-red-600 bg-red-50/50 shadow-xs'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Building className="w-4 h-4 text-red-600" />
                    <span className="font-bold text-slate-900">Bank / Raast (PKR)</span>
                    <span className="text-[10px] text-gray-500">Meezan, HBL, JazzCash, EasyPaisa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-yellow-500 bg-yellow-50/50 shadow-xs'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-yellow-600" />
                    <span className="font-bold text-slate-900">Card / Escrow</span>
                    <span className="text-[10px] text-gray-500">Visa, Mastercard, Stripe</span>
                  </button>
                </div>
              </div>

              {/* Client Brief Fields */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Asad Ahmed"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Project Requirements / Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                    placeholder="Mention any custom design requirements, URLs, or deadlines..."
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-yellow-400" />
                  <span>
                    Place Order ({formatPrice(selectedPackage.pricePkr, selectedPackage.priceUsd)})
                  </span>
                </button>
                <div className="text-center text-[11px] text-gray-500 font-medium">
                  Protected by Figer Free 100% Milestone Escrow Guarantee
                </div>
              </div>

            </form>
          ) : (
            /* Order Placed Success View */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                  Your Order has been Initiated!
                </h3>
                <p className="text-xs text-gray-600 max-w-md mx-auto">
                  Our project team and seller <strong>{gig.seller.name}</strong> have been notified.
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 max-w-sm mx-auto flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px]">ORDER TRACKING ID</span>
                  <span className="font-extrabold text-slate-900 text-sm text-emerald-600">{orderRef}</span>
                </div>
                <button
                  onClick={copyOrderRef}
                  className="px-2.5 py-1 rounded-md bg-white border border-gray-200 text-gray-600 hover:text-slate-900 text-xs flex items-center gap-1"
                >
                  {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedRef ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Payment Details for Bank / Raast if selected */}
              {paymentMethod === 'bank' && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-left text-xs space-y-2 max-w-md mx-auto font-mono">
                  <span className="font-bold text-emerald-900 block">Bank Account for PKR Deposit:</span>
                  <div className="space-y-0.5 text-slate-800 text-[11px]">
                    <div>Bank: <strong>Meezan Bank Ltd</strong></div>
                    <div>Account Title: <strong>Figer Free Digital</strong></div>
                    <div>IBAN: <strong>PK82MEZN0001090104928172</strong></div>
                    <div>Raast ID: <strong>03001234567</strong></div>
                  </div>
                  <p className="text-[10px] text-gray-500 pt-1">
                    Send screenshot of receipt directly in In-App Chat with Order ID: <strong>{orderRef}</strong>
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={() => {
                    if (onOpenDirectChat) {
                      onOpenDirectChat(
                        {
                          id: `seller_${gig.seller.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
                          name: gig.seller.name,
                          avatar: gig.seller.avatar,
                          level: gig.seller.level,
                          rating: gig.seller.rating
                        },
                        {
                          id: gig.id,
                          title: gig.title,
                          pricePkr: selectedPackage.pricePkr,
                          priceUsd: selectedPackage.priceUsd,
                          tier: selectedPackage.name
                        },
                        orderRef
                      );
                    }
                    onClose();
                  }}
                  className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open In-App Chat with Seller</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
                >
                  Back to Marketplace
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
