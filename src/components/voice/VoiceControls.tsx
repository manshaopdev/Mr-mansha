import React from 'react';
import { Sliders, Zap, Sparkles, Mic, Gauge, Music } from 'lucide-react';
import { VOICE_EMOTIONS } from '../../data/pakistaniVoices';
import { VoiceEmotion, VoicePersona } from '../../types/voiceStudio';

interface VoiceControlsProps {
  selectedPersona: VoicePersona;
  emotion: VoiceEmotion;
  onChangeEmotion: (e: VoiceEmotion) => void;
  speed: number;
  onChangeSpeed: (s: number) => void;
  pitch: number;
  onChangePitch: (p: number) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  canGenerate: boolean;
  onListenPreview?: () => void;
  isListeningPreview?: boolean;
}

export const VoiceControls: React.FC<VoiceControlsProps> = ({
  selectedPersona,
  emotion,
  onChangeEmotion,
  speed,
  onChangeSpeed,
  pitch,
  onChangePitch,
  onGenerate,
  isGenerating,
  canGenerate,
  onListenPreview,
  isListeningPreview
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-md">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-semibold text-white">
            آواز کی ٹیوننگ و تاثرات (Voice Emotion & Tuning)
          </h2>
        </div>
        <span className="text-[11px] text-slate-400">
          سرعت اور جذبات منتخب کریں
        </span>
      </div>

      {/* Emotion / Style Grid */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-slate-300 mb-2">
          انداز و جذبات (Emotion & Style):
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {VOICE_EMOTIONS.map((emo) => {
            const isSelected = emotion === emo.id;
            return (
              <button
                key={emo.id}
                type="button"
                onClick={() => onChangeEmotion(emo.id)}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/40 shadow-md'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <i className={`fa-solid ${emo.icon} text-base mb-1 block ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                <div className="text-xs font-bold font-urdu truncate">{emo.labelUrdu}</div>
                <div className="text-[9px] opacity-75 truncate">{emo.labelEn}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sliders: Speed and Pitch */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-800/80 mb-5">
        {/* Speed Slider */}
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
              <Gauge className="w-3.5 h-3.5 text-emerald-400" />
              <span>رفتار (Speaking Speed):</span>
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {speed.toFixed(2)}x
            </span>
          </div>
          <input
            type="range"
            min="0.6"
            max="1.8"
            step="0.05"
            value={speed}
            onChange={(e) => onChangeSpeed(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <button type="button" onClick={() => onChangeSpeed(0.8)} className="hover:text-slate-300">
              0.8x دھیمی
            </button>
            <button type="button" onClick={() => onChangeSpeed(1.0)} className="hover:text-slate-300 font-semibold text-slate-400">
              1.0x عام
            </button>
            <button type="button" onClick={() => onChangeSpeed(1.25)} className="hover:text-slate-300">
              1.25x تیز
            </button>
          </div>
        </div>

        {/* Pitch Slider */}
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
              <Music className="w-3.5 h-3.5 text-teal-400" />
              <span>لہجے کا اتار چڑھاؤ (Tone / Pitch):</span>
            </span>
            <span className="text-xs font-mono font-bold text-teal-400">
              {pitch < 0.95 ? 'گہری / بھاری' : pitch > 1.05 ? 'باریک / بلند' : 'متوازن'}
            </span>
          </div>
          <input
            type="range"
            min="0.8"
            max="1.2"
            step="0.05"
            value={pitch}
            onChange={(e) => onChangePitch(parseFloat(e.target.value))}
            className="w-full accent-teal-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <button type="button" onClick={() => onChangePitch(0.85)} className="hover:text-slate-300">
              بھاری آواز
            </button>
            <button type="button" onClick={() => onChangePitch(1.0)} className="hover:text-slate-300 font-semibold text-slate-400">
              نارمل
            </button>
            <button type="button" onClick={() => onChangePitch(1.15)} className="hover:text-slate-300">
              باریک آواز
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons: Generate & Listen */}
      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        {/* Listen / Test Voice Button */}
        {onListenPreview && (
          <button
            type="button"
            disabled={!canGenerate || isGenerating}
            onClick={onListenPreview}
            className={`px-5 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border transition-all cursor-pointer ${
              isListeningPreview
                ? 'bg-rose-600 border-rose-500 text-white animate-pulse'
                : 'bg-slate-850 hover:bg-slate-800 border-emerald-500/40 text-emerald-300 hover:text-white hover:border-emerald-400'
            }`}
          >
            <i className="fa-solid fa-volume-high text-emerald-400" />
            <span className="font-urdu text-base font-bold">
              {isListeningPreview ? 'آواز بند کریں' : '▶ پہلے سنیں (Listen)'}
            </span>
          </button>
        )}

        {/* Main Generate Button */}
        <button
          type="button"
          disabled={!canGenerate || isGenerating}
          onClick={onGenerate}
          className={`flex-1 py-4 px-6 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all shadow-xl cursor-pointer ${
            canGenerate && !isGenerating
              ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-500 hover:via-teal-500 hover:to-green-500 text-white shadow-emerald-950/60 transform hover:-translate-y-0.5 active:translate-y-0'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span className="font-urdu text-lg">
                پاکستانی آواز اور MP3 تیار ہو رہی ہے...
              </span>
            </>
          ) : (
            <>
              <Mic className="w-5 h-5 text-emerald-200 animate-bounce" />
              <span className="font-urdu text-lg">
                پاکستانی آواز جنریٹ کریں اور MP3 ڈاؤن لوڈ کریں
              </span>
              <span className="text-xs bg-black/25 px-2.5 py-1 rounded-full font-sans tracking-wide">
                Generate MP3
              </span>
            </>
          )}
        </button>
      </div>

      {/* Trust micro-copy */}
      <div className="text-center mt-2 text-[11px] text-slate-500">
        مکمل 24kHz ہائی ڈیفینیشن آڈیو • براہ راست ڈاؤن لوڈ کے قابل MP3 فارمیٹ
      </div>
    </div>
  );
};
