import React from 'react';
import { Volume2, Check, Sparkles, User, MapPin } from 'lucide-react';
import { PAKISTANI_VOICES } from '../../data/pakistaniVoices';
import { VoicePersona } from '../../types/voiceStudio';

interface VoicePersonaSelectorProps {
  selectedVoice: VoicePersona;
  onSelectVoice: (voice: VoicePersona) => void;
  onPreviewSample: (voice: VoicePersona) => void;
  isPreviewPlaying: boolean;
  playingVoiceId: string | null;
}

export const VoicePersonaSelector: React.FC<VoicePersonaSelectorProps> = ({
  selectedVoice,
  onSelectVoice,
  onPreviewSample,
  isPreviewPlaying,
  playingVoiceId
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-400" />
            <span>پاکستانی صداکار منتخب کریں (Pakistani Voices)</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
              8 مستند آوازیں
            </span>
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            مختلف لہجات اور انداز: نیوز اینکر، کہانی، ریڈیو آر جے، ولاگر اور ادبی مشاعرہ
          </p>
        </div>

        {/* Selected Voice indicator */}
        <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
          <img
            src={selectedVoice.avatar}
            alt={selectedVoice.nameEn}
            className="w-6 h-6 rounded-full object-cover ring-1 ring-emerald-400"
          />
          <div className="text-right">
            <span className="text-xs font-bold text-white font-urdu">{selectedVoice.nameUrdu}</span>
            <span className="text-[10px] text-emerald-400 block font-sans">({selectedVoice.badge})</span>
          </div>
        </div>
      </div>

      {/* Grid of Voices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PAKISTANI_VOICES.map((v) => {
          const isSelected = selectedVoice.id === v.id;
          const isThisPlaying = isPreviewPlaying && playingVoiceId === v.id;

          return (
            <div
              key={v.id}
              onClick={() => onSelectVoice(v)}
              className={`group relative p-3 rounded-xl border transition-all cursor-pointer text-left flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-emerald-950/70 to-slate-900 border-emerald-500/70 ring-1 ring-emerald-400/50 shadow-lg shadow-emerald-950/50'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              {/* Top Row: Avatar & Badges */}
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img
                    src={v.avatar}
                    alt={v.nameEn}
                    className={`w-12 h-12 rounded-xl object-cover ring-2 transition-all ${
                      isSelected ? 'ring-emerald-400 scale-105' : 'ring-slate-700 group-hover:ring-slate-500'
                    }`}
                  />
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white font-urdu tracking-wide">
                      {v.nameUrdu}
                    </h3>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      v.gender === 'male' ? 'bg-blue-500/20 text-blue-300' : 'bg-pink-500/20 text-pink-300'
                    }`}>
                      {v.gender === 'male' ? 'مردانہ' : 'زنانی'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium truncate">
                    {v.nameEn}
                  </div>
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-2.5 h-2.5" />
                    <span className="truncate">{v.region}</span>
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <div className="mt-2.5 pt-2 border-t border-slate-800/60">
                <div className="text-[11px] text-slate-300 line-clamp-1 font-urdu">
                  {v.taglineUrdu}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] bg-slate-800/90 text-slate-400 px-2 py-0.5 rounded-full">
                    {v.badge}
                  </span>

                  {/* Sample Listen button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPreviewSample(v);
                    }}
                    title="مختصر نمونہ سنیں"
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isThisPlaying
                        ? 'bg-rose-600 text-white animate-pulse shadow-md shadow-rose-950'
                        : 'bg-emerald-950/80 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40'
                    }`}
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isThisPlaying ? 'text-white' : 'text-emerald-400'}`} />
                    <span className="font-urdu text-[11px] font-bold">
                      {isThisPlaying ? 'روکیں' : '▶ سنیں'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
