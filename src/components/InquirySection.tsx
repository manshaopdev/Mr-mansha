import React, { useState } from 'react';
import {
  Send,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Sparkles,
  Clock,
  ShieldCheck,
  Building2,
  Copy,
  Check
} from 'lucide-react';
import { Currency, InquiryFormData } from '../types/agency';
import { AGENCY_INFO } from '../data/agencyData';

interface InquirySectionProps {
  currency: Currency;
  initialService?: string;
  onScrollToTop?: () => void;
}

export const InquirySection: React.FC<InquirySectionProps> = ({
  currency,
  initialService,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    selectedServices: initialService ? [initialService] : ['Graphic Designing', 'Web Development'],
    budgetTier: currency === 'PKR' ? 'PKR 80,000 - 150,000' : '$500 - $1,000',
    timeline: 'Within 2 - 4 Weeks',
    projectBrief: '',
    currency: currency,
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  const availableServices = [
    'Graphic Designing & Brand Identity',
    'UI/UX Design in Figma',
    'Web & Full-Stack Development',
    'Shopify / E-Commerce Store',
    'Digital Marketing (Meta & Google Ads)',
    'SEO & Organic Search Ranking',
    'Prime Plus All-in-One Transformation'
  ];

  const handleToggleService = (srv: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(srv)
        ? prev.selectedServices.filter((s) => s !== srv)
        : [...prev.selectedServices, srv],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = 'PPT-' + Math.floor(100000 + Math.random() * 900000);
    setSubmittedId(refCode);
  };

  const openDirectWhatsApp = () => {
    const srvText = formData.selectedServices.length > 0 ? formData.selectedServices.join(', ') : 'All Services';
    const text = encodeURIComponent(
      `Hello Prime Plus Team!\n\nName: ${formData.name || 'Client'}\nCompany: ${formData.company || 'N/A'}\nServices Needed: ${srvText}\nBudget: ${formData.budgetTier}\nTimeline: ${formData.timeline}\nBrief: ${formData.projectBrief || 'Looking forward to discussing our project.'}`
    );
    window.open(`https://wa.me/${AGENCY_INFO.contacts.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  const copyRefId = () => {
    if (submittedId) {
      navigator.clipboard.writeText(submittedId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <section id="contact-inquiry" className="py-16 sm:py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Mail className="w-3.5 h-3.5" />
            <span>START THE CONVERSATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Outfit',sans-serif]">
            Let's Build Something Iconic Together
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Tell Prime Plus Team about your upcoming goals in Graphic Design, Web Development, or Digital Marketing. We respond within 4 business hours.
          </p>
        </div>

        {/* Form & Contact Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Agency Contact Card (Left column) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-8 text-left">
            <div className="space-y-2">
              <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
                Direct Contact Channels
              </span>
              <h3 className="text-2xl font-black text-white font-['Outfit',sans-serif]">
                Prime Plus Team Headquarters
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Operating high-speed tech hubs in Pakistan while serving forward-thinking businesses across North America, Europe, the Middle East, and Asia-Pacific.
              </p>
            </div>

            <div className="space-y-4">
              {/* WhatsApp Direct */}
              <div
                onClick={openDirectWhatsApp}
                className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 hover:bg-emerald-950/30 transition-all cursor-pointer flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-emerald-400 font-bold">
                    Direct WhatsApp Hotline
                  </div>
                  <div className="text-sm font-bold text-white">
                    {AGENCY_INFO.contacts.whatsappFormatted}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Instant Chat & Project Audio Consultation
                  </div>
                </div>
              </div>

              {/* Email */}
              <a
                href={`mailto:${AGENCY_INFO.contacts.email}`}
                className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-indigo-400 font-bold">
                    Official Inquiries & RFP
                  </div>
                  <div className="text-sm font-bold text-white">
                    {AGENCY_INFO.contacts.email}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Average response time: &lt; 4 Hours
                  </div>
                </div>
              </a>

              {/* Phone */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-sky-400 font-bold">
                    Direct Phone Support
                  </div>
                  <div className="text-sm font-bold text-white">
                    {AGENCY_INFO.contacts.phone}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Mon - Sat (9:00 AM - 9:00 PM PKT)
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-purple-400 font-bold">
                    Studio Locations
                  </div>
                  <div className="text-sm font-bold text-white">
                    {AGENCY_INFO.contacts.location}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Global Remote Collaboration via Zoom, Slack & GitHub
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Pledge */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Our Commercial Pledge to Clients</span>
              </div>
              <ul className="text-[11px] text-slate-400 space-y-1">
                <li>• Strict Non-Disclosure Agreement (NDA) on request</li>
                <li>• Milestone-based payments tied to verified deliverables</li>
                <li>• Full commercial copyright & source repository transfer</li>
              </ul>
            </div>
          </div>

          {/* Interactive Form Card (Right column) */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-left">
            {submittedId ? (
              <div className="py-12 text-center space-y-6 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-['Outfit',sans-serif]">
                    Inquiry Received by Prime Plus Team!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Our lead consultant is reviewing your requirements and will reach out via WhatsApp/Email shortly.
                  </p>
                </div>

                {/* Tracking Ref Box */}
                <div className="max-w-xs mx-auto p-3.5 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-400">Reference:</span>
                  <strong className="text-sky-300 font-bold">{submittedId}</strong>
                  <button
                    onClick={copyRefId}
                    className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                    title="Copy Reference"
                  >
                    {copiedId ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <button
                    onClick={openDirectWhatsApp}
                    className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Connect Instantly on WhatsApp</span>
                  </button>
                  <button
                    onClick={() => {
                      setSubmittedId(null);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        selectedServices: ['Graphic Designing', 'Web Development'],
                        budgetTier: currency === 'PKR' ? 'PKR 80,000 - 150,000' : '$500 - $1,000',
                        timeline: 'Within 2 - 4 Weeks',
                        projectBrief: '',
                        currency: currency,
                      });
                    }}
                    className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit',sans-serif]">
                    Project Inquiry & Quotation Brief
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill in your details below to receive a comprehensive proposal.
                  </p>
                </div>

                {/* Personal & Company Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Usman Malik"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-indigo-500 text-white placeholder:text-slate-500 text-xs sm:text-sm outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300">
                      Company / Brand Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Innovations Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-indigo-500 text-white placeholder:text-slate-500 text-xs sm:text-sm outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="usman@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-indigo-500 text-white placeholder:text-slate-500 text-xs sm:text-sm outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 332 6032893"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-indigo-500 text-white placeholder:text-slate-500 text-xs sm:text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Service Selection Checklist */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-300 flex items-center justify-between">
                    <span>Select Required Services:</span>
                    <span className="text-[11px] text-slate-400 font-normal">Select multiple if needed</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {availableServices.map((srv, idx) => {
                      const selected = formData.selectedServices.includes(srv);
                      return (
                        <div
                          key={idx}
                          onClick={() => handleToggleService(srv)}
                          className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                            selected
                              ? 'bg-indigo-950/40 border-indigo-500/60 text-white font-bold'
                              : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:border-slate-600'
                          }`}
                        >
                          <span>{srv}</span>
                          <span
                            className={`w-4 h-4 rounded flex items-center justify-center text-[10px] border ${
                              selected ? 'bg-indigo-500 border-indigo-400 text-white' : 'border-slate-600'
                            }`}
                          >
                            {selected && '✓'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Budget & Timeline Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300">
                      Estimated Budget ({currency})
                    </label>
                    <select
                      value={formData.budgetTier}
                      onChange={(e) => setFormData({ ...formData, budgetTier: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm outline-none cursor-pointer"
                    >
                      {currency === 'PKR' ? (
                        <>
                          <option value="PKR 45,000 - 80,000">₨ 45,000 - ₨ 80,000 (Starter)</option>
                          <option value="PKR 80,000 - 150,000">₨ 80,000 - ₨ 150,000 (Standard)</option>
                          <option value="PKR 150,000 - 300,000">₨ 150,000 - ₨ 300,000 (Growth)</option>
                          <option value="PKR 300,000+">₨ 300,000+ (Full Enterprise)</option>
                        </>
                      ) : (
                        <>
                          <option value="$250 - $500">$250 - $500 (Starter)</option>
                          <option value="$500 - $1,000">$500 - $1,000 (Standard)</option>
                          <option value="$1,000 - $2,500">$1,000 - $2,500 (Growth)</option>
                          <option value="$2,500+">$2,500+ (Enterprise)</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300">
                      Expected Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm outline-none cursor-pointer"
                    >
                      <option value="Urgent (1 - 2 Weeks)">Urgent (1 - 2 Weeks)</option>
                      <option value="Within 2 - 4 Weeks">Within 2 - 4 Weeks</option>
                      <option value="1 - 2 Months">1 - 2 Months</option>
                      <option value="Flexible / Ongoing Retainer">Flexible / Ongoing Retainer</option>
                    </select>
                  </div>
                </div>

                {/* Brief Notes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-300">
                    Project Overview / Specific Requirements
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Briefly describe your business, what challenges you are facing, and what specific deliverables you are looking for..."
                    value={formData.projectBrief}
                    onChange={(e) => setFormData({ ...formData, projectBrief: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-indigo-500 text-white placeholder:text-slate-500 text-xs sm:text-sm outline-none transition-colors"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-4 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Project Inquiry</span>
                  </button>

                  <button
                    type="button"
                    onClick={openDirectWhatsApp}
                    className="w-full sm:w-auto px-5 py-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 font-bold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
