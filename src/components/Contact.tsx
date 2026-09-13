import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Send, MessageSquare, CheckCircle2, AlertCircle, Copy, Check, MessageCircle, Database, Shield } from 'lucide-react';
import { DEV_INFO } from '../data/portfolioData';

interface ContactProps {
  initialService?: string;
  onOpenVault: () => void;
  onSubmissionSuccess: () => void;
}

export default function Contact({ initialService = '', onOpenVault, onSubmissionSuccess }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: initialService || 'Web Dev',
    budget: '$3k - $5k',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [lastSubmissionId, setLastSubmissionId] = useState('');

  const servicesList = ['Web Dev', 'UI/UX Design', 'E-commerce', 'Full-Stack Custom App'];
  const budgetsList = ['$1k - $3k', '$3k - $5k', '$5k - $10k', '$10k+'];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please complete all required fields before initiating transmission.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to archive transmission');
      }

      setLastSubmissionId(data.id || 'TX-9024');
      setStatus('success');
      onSubmissionSuccess();

      // Reset form
      setFormData({
        name: '',
        email: '',
        service: 'Web Dev',
        budget: '$3k - $5k',
        message: '',
      });
    } catch (err: any) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'System uplink timeout. Please retry or contact directly via WhatsApp.');
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(DEV_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const whatsappUrl = `https://wa.me/${DEV_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    DEV_INFO.whatsappMessage
  )}`;

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050510]">
      {/* Background Cyber Glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00D9FF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#00D9FF] uppercase mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-[#00FFFF] shadow-[0_0_8px_#00FFFF]" />
            <span>// 04. DIRECT UPLINK & HIRES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-orbitron font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-wide uppercase"
          >
            Initialize <span className="text-[#00D9FF] neon-text-blue">A Project</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-300 font-poppins"
          >
            Have a product to build or a website that needs to convert? Transmit your specs below.
            All transmissions are encrypted and archived to our database.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: Quick Contact Cards & WhatsApp Button with Neon Effect */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Neon Button Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl cyber-card border border-[#00D9FF]/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#050510] border border-[#00D9FF] flex items-center justify-center text-[#00FFFF] shadow-[0_0_15px_rgba(0,217,255,0.4)]">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-orbitron font-bold text-white text-base">Instant Dispatch</h4>
                  <p className="font-mono text-xs text-[#00FFFF]">
                    Direct: <span className="text-white font-semibold">{DEV_INFO.whatsappDisplay}</span> &bull; &lt; 15 mins reply
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-300 font-poppins mb-6">
                Prefer immediate communication? Connect directly on WhatsApp ({DEV_INFO.whatsappDisplay}) or join our official cyber community channel.
              </p>

              <div className="space-y-3">
                {/* WHATSAPP DIRECT CHAT BUTTON WITH NEON EFFECT */}
                <a
                  id="whatsapp-neon-btn"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-md font-orbitron font-bold text-sm tracking-wider text-[#050510] bg-[#00FFFF] hover:bg-[#00D9FF] transition-all duration-300 shadow-[0_0_25px_rgba(0,255,255,0.8)] hover:shadow-[0_0_40px_rgba(0,217,255,1)] transform hover:-translate-y-1"
                >
                  <MessageCircle className="w-5 h-5 text-[#050510]" />
                  <span>CHAT ON WHATSAPP</span>
                </a>

                {/* WHATSAPP CHANNEL LINK WITH NEON BORDER EFFECT */}
                <a
                  id="whatsapp-channel-btn"
                  href={DEV_INFO.whatsappChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-3 rounded-md font-orbitron font-semibold text-xs tracking-wider text-[#00FFFF] bg-[#050510] border-2 border-[#00D9FF] hover:border-[#00FFFF] hover:bg-[#00D9FF]/15 transition-all duration-300 shadow-[0_0_15px_rgba(0,217,255,0.3)] hover:shadow-[0_0_25px_rgba(0,217,255,0.7)] transform hover:-translate-y-0.5"
                >
                  <MessageSquare className="w-4 h-4 text-[#00D9FF]" />
                  <span>JOIN WHATSAPP CHANNEL &rarr;</span>
                </a>
              </div>
            </motion.div>

            {/* Direct Email Card */}
            <div className="p-6 rounded-xl cyber-card border border-[#00D9FF]/20 space-y-3">
              <div className="font-mono text-xs text-[#00D9FF] uppercase tracking-wider">
                Direct Transmission Address:
              </div>
              <div className="flex items-center justify-between gap-3 p-3 rounded bg-[#050510] border border-[#00D9FF]/30">
                <span className="font-mono text-sm text-gray-200 truncate">{DEV_INFO.email}</span>
                <button
                  onClick={copyEmailToClipboard}
                  id="copy-email-btn"
                  className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono bg-[#00D9FF]/20 text-[#00FFFF] hover:bg-[#00D9FF] hover:text-[#050510] transition-colors"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
            </div>

            {/* Database & Security Assurance */}
            <div className="p-6 rounded-xl bg-[#080C1C]/60 border border-[#00D9FF]/15 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-[#00FFFF]">
                  <Shield className="w-4 h-4 text-[#00D9FF]" />
                  <span>DATA PERSISTENCE GUARANTEE</span>
                </div>
                <button
                  onClick={onOpenVault}
                  className="text-[11px] font-mono text-[#00D9FF] hover:text-[#00FFFF] underline underline-offset-2 flex items-center gap-1"
                >
                  <Database className="w-3 h-3" />
                  <span>VIEW VAULT</span>
                </button>
              </div>
              <p className="text-xs text-gray-400 font-poppins leading-relaxed">
                Contact transmissions are parsed by our Express API and safely written to MongoDB.
                You can view previous records via the Vault inspector at any time.
              </p>
            </div>
          </div>

          {/* RIGHT: Contact Form with Neon Blue Input Fields */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 sm:p-10 rounded-xl cyber-card border border-[#00D9FF]/30 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
            >
              {status === 'success' ? (
                <div className="text-center py-10 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-[#00D9FF]/20 border-2 border-[#00FFFF] mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(0,217,255,0.7)]">
                    <CheckCircle2 className="w-8 h-8 text-[#00FFFF]" />
                  </div>
                  <h3 className="font-orbitron font-bold text-2xl text-white">Transmission Confirmed</h3>
                  <p className="text-gray-300 font-poppins text-sm max-w-md mx-auto">
                    Your project inquiry has been written to the database with ID:{' '}
                    <span className="font-mono text-[#00FFFF] font-semibold">{lastSubmissionId}</span>.
                    I will review your specifications and reply within 24 hours.
                  </p>

                  <div className="pt-4 flex flex-wrap justify-center gap-4">
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-6 py-2.5 rounded font-orbitron text-xs font-bold text-white border border-[#00D9FF] hover:bg-[#00D9FF]/20"
                    >
                      TRANSMIT ANOTHER
                    </button>
                    <button
                      onClick={onOpenVault}
                      className="px-6 py-2.5 rounded font-orbitron text-xs font-bold text-[#050510] bg-[#00D9FF] hover:bg-[#00FFFF] shadow-[0_0_15px_#00D9FF]"
                    >
                      INSPECT IN VAULT
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === 'error' && (
                    <div className="p-4 rounded-lg bg-red-950/40 border border-red-500/50 flex items-center gap-3 text-red-200 text-xs font-mono">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name and Email Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name Field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="contact-name"
                        className="block font-orbitron text-xs font-medium text-gray-300 tracking-wider"
                      >
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. John Cyber"
                        className="w-full px-4 py-3.5 rounded-md bg-[#050510] text-white font-poppins text-sm border border-[#00D9FF]/40 placeholder:text-gray-600 transition-all duration-300 focus:outline-none focus:border-[#00FFFF] focus:ring-2 focus:ring-[#00D9FF]/50 focus:shadow-[0_0_20px_rgba(0,217,255,0.5)]"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="contact-email"
                        className="block font-orbitron text-xs font-medium text-gray-300 tracking-wider"
                      >
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. client@company.com"
                        className="w-full px-4 py-3.5 rounded-md bg-[#050510] text-white font-poppins text-sm border border-[#00D9FF]/40 placeholder:text-gray-600 transition-all duration-300 focus:outline-none focus:border-[#00FFFF] focus:ring-2 focus:ring-[#00D9FF]/50 focus:shadow-[0_0_20px_rgba(0,217,255,0.5)]"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-service"
                      className="block font-orbitron text-xs font-medium text-gray-300 tracking-wider"
                    >
                      PRIMARY SERVICE REQUIRED
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-md bg-[#050510] text-white font-poppins text-sm border border-[#00D9FF]/40 transition-all duration-300 focus:outline-none focus:border-[#00FFFF] focus:ring-2 focus:ring-[#00D9FF]/50 focus:shadow-[0_0_20px_rgba(0,217,255,0.5)]"
                    >
                      {servicesList.map((svc) => (
                        <option key={svc} value={svc} className="bg-[#050510] text-white">
                          {svc}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Estimated Budget Pills */}
                  <div className="space-y-2">
                    <label className="block font-orbitron text-xs font-medium text-gray-300 tracking-wider">
                      ESTIMATED BUDGET
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {budgetsList.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setFormData((p) => ({ ...p, budget: b }))}
                          className={`py-2 px-3 rounded text-xs font-mono tracking-wider transition-all duration-200 border ${
                            formData.budget === b
                              ? 'bg-[#00D9FF] text-[#050510] font-bold border-[#00FFFF] shadow-[0_0_15px_rgba(0,217,255,0.6)]'
                              : 'bg-[#050510] text-gray-300 border-[#00D9FF]/30 hover:border-[#00FFFF]'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Details / Message Textarea */}
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-message"
                      className="block font-orbitron text-xs font-medium text-gray-300 tracking-wider"
                    >
                      PROJECT SPECIFICATIONS *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your goals, target audience, conversion requirements, or reference websites..."
                      className="w-full px-4 py-3.5 rounded-md bg-[#050510] text-white font-poppins text-sm border border-[#00D9FF]/40 placeholder:text-gray-600 transition-all duration-300 focus:outline-none focus:border-[#00FFFF] focus:ring-2 focus:ring-[#00D9FF]/50 focus:shadow-[0_0_20px_rgba(0,217,255,0.5)] resize-none"
                    />
                  </div>

                  {/* Submit Button with Neon Blue Glow and Shadow */}
                  <button
                    type="submit"
                    id="submit-contact-btn"
                    disabled={status === 'submitting'}
                    className="w-full relative group overflow-hidden py-4 px-6 rounded-md font-orbitron font-bold text-sm tracking-wider text-[#050510] bg-[#00D9FF] hover:bg-[#00FFFF] transition-all duration-300 shadow-[0_0_25px_rgba(0,217,255,0.7)] hover:shadow-[0_0_40px_rgba(0,255,255,1)] disabled:opacity-50 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-center gap-3">
                      {status === 'submitting' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#050510] border-t-transparent rounded-full animate-spin" />
                          <span>SAVING TO DATABASE...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#050510]" />
                          <span>TRANSMIT PROPOSAL &bull; SAVE TO VAULT</span>
                        </>
                      )}
                    </div>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
