import React, { useState, useEffect } from 'react';
import {
  X,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Send,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  ShoppingBag,
  Briefcase
} from 'lucide-react';
import { AuthUser, Currency, MarketplaceOrder } from '../types/fiverr';

interface FiverrOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser | null;
  currency: Currency;
  onOpenChatWithUser: (targetUserId: string, targetUserName: string, gigTitle?: string) => void;
  onRequireAuth: () => void;
}

export const FiverrOrdersModal: React.FC<FiverrOrdersModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  currency,
  onOpenChatWithUser,
  onRequireAuth,
}) => {
  const [orders, setOrders] = useState<MarketplaceOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'buyer' | 'seller'>('buyer');
  
  // Delivery modal state
  const [deliveringOrder, setDeliveringOrder] = useState<MarketplaceOrder | null>(null);
  const [deliveryNote, setDeliveryNote] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Sync activeTab with user's initial role
  useEffect(() => {
    if (currentUser?.role) {
      setActiveTab(currentUser.role);
    }
  }, [currentUser]);

  // Load orders from API
  const fetchOrders = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/orders?userId=${currentUser.id}&role=${activeTab}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && currentUser) {
      fetchOrders();
    }
  }, [isOpen, currentUser, activeTab]);

  if (!isOpen) return null;

  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <div className="w-full max-w-md bg-white rounded-2xl p-6 text-center shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Sign In to View Orders</h3>
          <p className="text-xs text-gray-500 mb-5">
            Track your purchases, review deliverables, or manage orders from clients on Figer Free.
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

  const handleUpdateStatus = async (orderId: string, newStatus: string, note?: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, deliveryNotes: note }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus as any, deliveryNotes: note || o.deliveryNotes } : o))
        );
        setDeliveringOrder(null);
        setDeliveryNote('');
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-500" />
            In Progress
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Package className="w-3 h-3 text-blue-500" />
            Delivered
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-700 border border-gray-200">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-white">Figer Free Orders Dashboard</h2>
              <p className="text-xs text-slate-300">Track milestones, deliverables, and live project chats</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: As Buyer vs As Seller */}
        <div className="flex border-b border-gray-200 bg-gray-50/80 px-6 pt-3 gap-6">
          <button
            onClick={() => setActiveTab('buyer')}
            className={`pb-3 text-sm font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'buyer'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>My Purchases (Client)</span>
          </button>

          <button
            onClick={() => setActiveTab('seller')}
            className={`pb-3 text-sm font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'seller'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Client Orders (Freelancer)</span>
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto flex-1">
          {loading ? (
            <div className="py-16 text-center text-gray-400 text-sm">
              <Clock className="w-6 h-6 mx-auto mb-2 animate-spin text-emerald-600" />
              Loading orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3 text-gray-400">
                <Package className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-gray-800 mb-1">
                {activeTab === 'buyer' ? 'No purchases yet' : 'No incoming client orders yet'}
              </h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto mb-4">
                {activeTab === 'buyer'
                  ? 'Browse the marketplace and hire top verified freelancers with transparent PKR pricing.'
                  : 'Publish your gigs to start receiving direct orders from clients on Figer Free.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const isSeller = activeTab === 'seller';
                const formattedPrice =
                  currency === 'PKR'
                    ? `₨ ${order.pricePkr?.toLocaleString()}`
                    : `$${order.priceUsd}`;

                return (
                  <div
                    key={order.id}
                    className="p-4 sm:p-5 rounded-2xl border border-gray-200 bg-white hover:border-gray-300 transition-all shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      {order.gigImage && (
                        <img
                          src={order.gigImage}
                          alt={order.gigTitle}
                          className="w-16 h-16 rounded-xl object-cover border border-gray-100 shrink-0"
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-bold text-gray-400">{order.id}</span>
                          {getStatusBadge(order.status)}
                          <span className="text-xs font-bold text-emerald-600 px-2 py-0.5 rounded-md bg-emerald-50">
                            {order.packageTier} Tier
                          </span>
                        </div>
                        <h4 className="font-bold text-sm sm:text-base text-gray-900 leading-snug">
                          {order.gigTitle}
                        </h4>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-1.5">
                          <span>
                            {isSeller ? `Buyer: ${order.buyerName}` : `Seller: ${order.sellerName}`}
                          </span>
                          <span>•</span>
                          <span>Delivery: {order.deliveryDays} Days</span>
                          <span>•</span>
                          <span className="font-bold text-gray-900">{formattedPrice}</span>
                        </div>
                        {order.requirements && (
                          <p className="text-xs text-gray-500 mt-2 bg-gray-50 p-2 rounded-lg line-clamp-2">
                            <span className="font-semibold text-gray-700">Requirements:</span> {order.requirements}
                          </p>
                        )}
                        {order.deliveryNotes && (
                          <div className="text-xs text-blue-800 bg-blue-50 border border-blue-200 p-2.5 rounded-lg mt-2 flex items-start gap-2">
                            <Package className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold">Delivery Work Attached:</p>
                              <p className="mt-0.5">{order.deliveryNotes}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                      {/* Direct In-App Chat button */}
                      <button
                        onClick={() => {
                          const targetId = isSeller ? order.buyerId : order.sellerId;
                          const targetName = isSeller ? order.buyerName : order.sellerName;
                          onClose();
                          onOpenChatWithUser(targetId, targetName, order.gigTitle);
                        }}
                        className="p-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                        title="Chat in Real-Time"
                      >
                        <MessageSquare className="w-4 h-4 text-emerald-600" />
                        <span className="hidden md:inline">Live Chat</span>
                      </button>

                      {/* Seller Action: Deliver Work */}
                      {isSeller && order.status === 'in_progress' && (
                        <button
                          onClick={() => setDeliveringOrder(order)}
                          className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Deliver Work</span>
                        </button>
                      )}

                      {/* Buyer Action: Complete Order */}
                      {!isSeller && order.status === 'delivered' && (
                        <button
                          disabled={updatingId === order.id}
                          onClick={() => handleUpdateStatus(order.id, 'completed')}
                          className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Accept & Complete</span>
                        </button>
                      )}

                      {order.status === 'completed' && (
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 px-3 py-2 bg-emerald-50 rounded-xl">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Finalized</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal footer summary */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Figer Free Escrow & Secure In-App Communications</span>
          </div>
          <button
            onClick={fetchOrders}
            className="text-emerald-700 font-bold hover:underline cursor-pointer"
          >
            Refresh Orders
          </button>
        </div>

        {/* DELIVERY DIALOG MODAL */}
        {deliveringOrder && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
            <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base text-gray-900">
                  Deliver Work for Order #{deliveringOrder.id}
                </h3>
                <button
                  onClick={() => setDeliveringOrder(null)}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-gray-500 mb-3">
                Include links to GitHub repositories, Figma designs, Google Drive delivery assets, or summary notes for the buyer.
              </p>

              <textarea
                rows={4}
                value={deliveryNote}
                onChange={(e) => setDeliveryNote(e.target.value)}
                placeholder="Hi! Here is your completed project: [URL to assets/Figma/GitHub]. Everything has been tested and verified..."
                className="w-full p-3 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none mb-4"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveringOrder(null)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={updatingId === deliveringOrder.id || !deliveryNote.trim()}
                  onClick={() => handleUpdateStatus(deliveringOrder.id, 'delivered', deliveryNote)}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs disabled:opacity-50"
                >
                  {updatingId === deliveringOrder.id ? 'Submitting...' : 'Send Delivery to Client'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
