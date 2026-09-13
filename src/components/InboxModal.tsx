import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Database, RefreshCw, Trash2, ShieldCheck, Mail, Calendar, DollarSign, Layers } from 'lucide-react';
import { ContactSubmission } from '../types';

interface InboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataUpdated: () => void;
}

export default function InboxModal({ isOpen, onClose, onDataUpdated }: InboxModalProps) {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [dbInfo, setDbInfo] = useState<{ provider: string; totalTransmissions: number; isMongo: boolean } | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [subRes, statusRes] = await Promise.all([
        fetch('/api/contact'),
        fetch('/api/db-status'),
      ]);

      if (subRes.ok) {
        const subData = await subRes.json();
        setSubmissions(subData.data || []);
      }

      if (statusRes.ok) {
        const sData = await statusRes.json();
        setDbInfo(sData);
      }
    } catch (err) {
      console.error('Failed to load vault transmissions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const handleDelete = async (id: string) => {
    if (!confirm('Purge this record from the database vault?')) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSubmissions((prev) => prev.filter((item) => item._id !== id));
        onDataUpdated();
      }
    } catch (err) {
      console.error('Failed to delete transmission:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl max-h-[85vh] flex flex-col rounded-xl cyber-card border-2 border-[#00D9FF] shadow-[0_0_50px_rgba(0,217,255,0.4)] bg-[#080C1C] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#00D9FF]/20 bg-[#050510]/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#00D9FF]/10 border border-[#00D9FF] flex items-center justify-center text-[#00FFFF]">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-lg text-white">DATABASE TRANSMISSION VAULT</h3>
              <p className="font-mono text-xs text-[#00FFFF]">
                Target: {dbInfo ? dbInfo.provider : 'Connecting to Database...'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              title="Refresh Records"
              className="p-2 rounded bg-[#050510] text-[#00D9FF] border border-[#00D9FF]/30 hover:border-[#00FFFF] hover:text-[#00FFFF] transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              id="close-inbox-modal"
              onClick={onClose}
              className="p-2 rounded bg-[#050510] text-gray-400 hover:text-white border border-[#00D9FF]/20 hover:border-[#00FFFF] transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Database Status Banner */}
        <div className="px-6 py-3 bg-[#00D9FF]/10 border-b border-[#00D9FF]/15 flex flex-wrap items-center justify-between text-xs font-mono text-gray-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FFFF] animate-ping" />
            <span className="text-[#00FFFF]">LIVE DB PERSISTENCE:</span>
            <span>{dbInfo?.provider || 'Active'}</span>
          </div>
          <div>
            TOTAL RECORDS STORED: <span className="text-[#00D9FF] font-bold">{submissions.length}</span>
          </div>
        </div>

        {/* Submissions List Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {loading && submissions.length === 0 ? (
            <div className="text-center py-16 text-gray-400 font-mono text-sm">
              <div className="w-8 h-8 border-2 border-[#00D9FF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <span>RETRIEVING ENCRYPTED DOCUMENTS...</span>
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-16 rounded-lg border border-dashed border-[#00D9FF]/30 p-8 space-y-3">
              <Database className="w-12 h-12 text-[#00D9FF]/40 mx-auto" />
              <h4 className="font-orbitron text-lg text-white">Vault is Currently Empty</h4>
              <p className="text-xs text-gray-400 font-poppins max-w-sm mx-auto">
                Submit a proposal via the Contact section to see it immediately stored in the database!
              </p>
            </div>
          ) : (
            submissions.map((item) => (
              <div
                key={item._id}
                className="p-5 rounded-lg bg-[#050510] border border-[#00D9FF]/25 hover:border-[#00FFFF] shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h4 className="font-orbitron font-bold text-base text-white">{item.name}</h4>
                    <div className="flex items-center gap-3 text-xs font-mono text-gray-400 mt-1">
                      <span className="flex items-center gap-1 text-[#00FFFF]">
                        <Mail className="w-3.5 h-3.5" />
                        {item.email}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-500" />
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/30">
                      {item.service}
                    </span>
                    <span className="font-mono text-[10px] px-2 py-1 rounded bg-green-950/40 text-emerald-400 border border-emerald-500/30">
                      {item.budget}
                    </span>
                    <button
                      onClick={() => handleDelete(item._id)}
                      title="Delete transmission"
                      className="p-1.5 rounded text-gray-500 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded bg-[#080C1C] border border-[#00D9FF]/15 text-sm text-gray-300 font-poppins leading-relaxed">
                  {item.message}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#00D9FF]/20 bg-[#050510] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded font-orbitron text-xs font-bold text-white bg-[#00D9FF]/20 border border-[#00D9FF] hover:bg-[#00D9FF] hover:text-[#050510] transition-all"
          >
            DISMISS VAULT
          </button>
        </div>
      </motion.div>
    </div>
  );
}
