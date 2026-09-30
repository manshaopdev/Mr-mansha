import React from 'react';
import { Sparkles, Mic, FileText, Download, CheckCircle2, Volume2, Globe } from 'lucide-react';
import { SCRIPT_PRESETS } from '../../data/pakistaniVoices';
import { ScriptPreset } from '../../types/voiceStudio';

interface VoiceHeaderProps {
  activeScriptMode: 'urdu' | 'roman';
  onToggleScriptMode: (mode: 'urdu' | 'roman') => void;
  onSelectPreset: (preset: ScriptPreset) => void;
}

export const VoiceHeader: React.FC<VoiceHeaderProps> = ({
  activeScriptMode,
  onToggleScriptMode,
  onSelectPreset
}) => {
  return (
    <header className="relative border-b border-emerald-900/40 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
      {/* Top green accent strip */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-green-600" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-400/30">
            <Mic className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>Pakistan Ki Awaz</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">
                  AI اسٹوڈیو
                </span>
              </h1>
              <span className="text-base sm:text-lg font-urdu text-emerald-300 hidden sm:inline font-bold">
                (پاکستان کی آواز)
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <span>پاکستانی وائس جنریٹر</span>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <span>خودکار املا و الفاظ پیشگوئی</span>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <span className="text-teal-300 font-medium">لائیو سنیں</span>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <span className="text-emerald-400 font-semibold">MP3 ڈاؤن لوڈ</span>
            </p>
          </div>
        </div>

        {/* Feature badges & controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Quick Preset Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700 text-xs font-medium text-slate-200 hover:text-white hover:border-emerald-500/50 transition-all">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>نمونہ تحریریں (Scripts)</span>
            </button>
            <div className="absolute right-0 mt-1 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 hidden group-hover:block z-50">
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 border-b border-slate-800">
                1-Click لوڈ کریں:
              </div>
              {SCRIPT_PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onSelectPreset(p)}
                  className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-emerald-950/60 hover:text-emerald-300 flex items-center justify-between transition-colors"
                >
                  <span className="font-urdu font-medium text-right text-sm">{p.titleUrdu}</span>
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                    {p.categoryEn}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Script Mode Toggle */}
          <div className="flex items-center bg-slate-800/90 p-1 rounded-lg border border-slate-700">
            <button
              onClick={() => onToggleScriptMode('urdu')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeScriptMode === 'urdu'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              اردو نستعلیق
            </button>
            <button
              onClick={() => onToggleScriptMode('roman')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeScriptMode === 'roman'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Roman Urdu
            </button>
          </div>

          {/* Direct MP3 indicator badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-xs">
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-medium">100% MP3 آڈیو ڈاؤن لوڈ</span>
          </div>
        </div>
      </div>
    </header>
  );
};
