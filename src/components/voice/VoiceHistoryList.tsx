import React from 'react';
import { History, Play, Pause, Download, Trash2, ArrowUpRight, Clock } from 'lucide-react';
import { GeneratedVoiceItem } from '../../types/voiceStudio';

interface VoiceHistoryListProps {
  history: GeneratedVoiceItem[];
  currentAudioId: string | null;
  onPlayItem: (item: GeneratedVoiceItem) => void;
  onDownloadItem: (item: GeneratedVoiceItem) => void;
  onLoadIntoEditor: (text: string) => void;
  onClearHistory: () => void;
}

export const VoiceHistoryList: React.FC<VoiceHistoryListProps> = ({
  history,
  currentAudioId,
  onPlayItem,
  onDownloadItem,
  onLoadIntoEditor,
  onClearHistory
}) => {
  if (history.length === 0) return null;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-md mt-6">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">
            تیار شدہ آوازیں (Saved Voice History)
          </h3>
          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
            {history.length} کلپس
          </span>
        </div>

        <button
          type="button"
          onClick={onClearHistory}
          className="text-xs text-slate-500 hover:text-rose-400 transition-colors flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>ہسٹری صاف کریں</span>
        </button>
      </div>

      <div className="divide-y divide-slate-800/80 max-h-72 overflow-y-auto pr-1">
        {history.map((item) => {
          const isSelected = currentAudioId === item.id;
          const dateStr = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return (
            <div
              key={item.id}
              className={`py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-2 rounded-xl transition-colors ${
                isSelected ? 'bg-emerald-950/40 border border-emerald-500/30' : 'hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item.voicePersona.avatar}
                  alt={item.voicePersona.nameEn}
                  className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-700 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-urdu">
                      {item.voicePersona.nameUrdu}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                      {item.emotion}
                    </span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                      <Clock className="w-2.5 h-2.5" />
                      {dateStr}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-urdu line-clamp-1 mt-0.5">
                    {item.text}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => onPlayItem(item)}
                  className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    isSelected
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>سنیں</span>
                </button>

                <button
                  type="button"
                  onClick={() => onDownloadItem(item)}
                  title="MP3 فائل ڈاؤن لوڈ کریں"
                  className="p-2 px-3 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>MP3</span>
                </button>

                <button
                  type="button"
                  onClick={() => onLoadIntoEditor(item.text)}
                  title="یہ تحریر ایڈیٹر میں لائیں"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs transition-colors"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
