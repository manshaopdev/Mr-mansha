import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';

interface FloatingChatButtonProps {
  onClick: () => void;
  unreadCount: number;
  isOpen: boolean;
  isConnected: boolean;
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({
  onClick,
  unreadCount,
  isOpen,
  isConnected,
}) => {
  if (isOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={onClick}
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-2xl border-2 border-slate-700/60 hover:border-emerald-500/80 transition-all duration-200 cursor-pointer font-['Plus_Jakarta_Sans',sans-serif] active:scale-95"
        title="Open Figer Free In-App Chat"
      >
        {/* Pulsing Status Dot */}
        <div className="relative flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
          <span
            className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-slate-900 ${
              isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'
            }`}
          />
        </div>

        <div className="text-left hidden sm:block">
          <div className="text-xs font-bold leading-none flex items-center gap-1">
            <span>Direct Chat</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <div className="text-[10px] text-slate-400 leading-tight">
            Talk with sellers online
          </div>
        </div>

        {/* Unread Counter Badge */}
        {unreadCount > 0 ? (
          <span className="ml-0.5 px-2 py-0.5 rounded-full bg-red-600 text-white text-xs font-extrabold shadow-sm animate-bounce">
            {unreadCount}
          </span>
        ) : (
          <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full bg-slate-800 text-[10px] font-bold text-slate-300 border border-slate-700">
            Live
          </span>
        )}
      </button>
    </div>
  );
};
