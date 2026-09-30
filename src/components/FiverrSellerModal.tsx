import React, { useState } from 'react';
import { X, CheckCircle2, UserCheck, Sparkles, Briefcase, Award } from 'lucide-react';

interface FiverrSellerModalProps {
  onClose: () => void;
}

export const FiverrSellerModal: React.FC<FiverrSellerModalProps> = ({ onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialty, setSpecialty] = useState('Web Development');
  const [experience, setExperience] = useState('3-5 Years');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex justify-center p-3 sm:p-6 text-left">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col text-slate-800">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <h3 className="font-extrabold text-base sm:text-lg font-['Outfit',sans-serif]">
              Become a Verified Seller
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Join the Top 1% Network:</span> Figer Free screens all sellers for verified portfolio quality, fast response, and reliable delivery.
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Daniyal Khan"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="daniyal@gmail.com"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Contact / Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 0000000"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Primary Specialty *
                  </label>
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 bg-white"
                  >
                    <option value="Web Development">Web Development (React / Next.js)</option>
                    <option value="Graphic Design">Graphic Design & Logo</option>
                    <option value="Digital Marketing">Digital Marketing & Meta Ads</option>
                    <option value="AI Services">AI & Machine Learning</option>
                    <option value="Video Editing">Video Editing & Reels</option>
                    <option value="UI/UX Design">UI/UX in Figma</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Professional Experience *
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 bg-white"
                  >
                    <option value="1-2 Years">1 - 2 Years</option>
                    <option value="3-5 Years">3 - 5 Years (Senior)</option>
                    <option value="5+ Years">5+ Years (Lead / Architect)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Portfolio / GitHub / Behance Link *
                </label>
                <input
                  type="url"
                  required
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
                  placeholder="https://github.com/yourprofile or https://behance.net/..."
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-red-600 font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-red-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer pt-2"
              >
                <UserCheck className="w-4 h-4 text-yellow-400" />
                <span>Submit Seller Application</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Application Received!</h4>
              <p className="text-xs text-gray-600 max-w-sm mx-auto">
                Thank you, <strong>{fullName}</strong>. Our onboarding team evaluates portfolios weekly. You will receive an invitation email and notification in your in-app chat inbox.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Done
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
