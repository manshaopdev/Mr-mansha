import React, { useState } from 'react';
import { X, Send, Sparkles, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';
import { Currency, GigCategory } from '../types/fiverr';

interface FiverrPostRequestModalProps {
  onClose: () => void;
  currency: Currency;
  onOpenChat?: () => void;
}

export const FiverrPostRequestModal: React.FC<FiverrPostRequestModalProps> = ({
  onClose,
  currency,
  onOpenChat,
}) => {
  const [category, setCategory] = useState<GigCategory>('Programming & Tech');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('35000');
  const [deliveryDays, setDeliveryDays] = useState('5');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Save lead/request to backend
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: clientName,
          phone: clientPhone,
          email: clientEmail,
          category,
          service: title,
          budget: `${currency} ${budget}`,
          details: description,
          source: 'Marketplace Custom Request'
        })
      });
    } catch (err) {
      console.error('Failed to submit custom request:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex justify-center p-3 sm:p-6 text-left">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col text-slate-800">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="space-y-0.5">
            <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
              Figer Free Marketplace
            </span>
            <h3 className="font-extrabold text-base sm:text-lg font-['Outfit',sans-serif]">
              {isSubmitted ? 'Request Submitted!' : 'Post a Custom Request'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-gray-500">
                Describe the specific service you need. Our team will review your brief and match you with verified experts.
              </p>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Service Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as GigCategory)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
                >
                  <option value="Programming & Tech">Programming & Tech (Web / Apps / E-Commerce)</option>
                  <option value="Graphics & Design">Graphics & Design (Logo / UI/UX / Branding)</option>
                  <option value="Digital Marketing">Digital Marketing (Meta Ads / SEO / PPC)</option>
                  <option value="AI Services">AI Services (Chatbots / Automation)</option>
                  <option value="Video & Animation">Video & Animation (Reels / Editing)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Project Title / Summary *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Build modern Next.js real estate portal with real-time features"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Describe what you need in detail *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Include required pages, reference links, specific features, or technology stack..."
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Your Budget ({currency}) *
                  </label>
                  <input
                    type="number"
                    required
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Target Delivery (Days) *
                  </label>
                  <input
                    type="number"
                    required
                    value={deliveryDays}
                    onChange={(e) => setDeliveryDays(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Bilal Ahmed"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 font-mono"
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
                  placeholder="bilal@company.com"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer pt-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Request & Connect with Manager</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Request Dispatched!</h4>
              <p className="text-xs text-gray-600 max-w-sm mx-auto">
                Thank you, <strong>{clientName}</strong>. Our senior project lead is reviewing your requirements and will reach out with candidate profiles within 2 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                <button
                  onClick={() => {
                    if (onOpenChat) onOpenChat();
                    onClose();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat with Project Lead on Website</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
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
