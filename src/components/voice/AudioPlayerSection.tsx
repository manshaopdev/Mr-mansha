import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Download, 
  Volume2, 
  VolumeX, 
  Share2, 
  Sparkles, 
  Check, 
  Music2, 
  FileAudio,
  Radio
} from 'lucide-react';
import { GeneratedVoiceItem } from '../../types/voiceStudio';
import { downloadMp3File } from '../../utils/audioEncoder';

interface AudioPlayerSectionProps {
  currentAudio: GeneratedVoiceItem | null;
  onDownloadMp3: (item: GeneratedVoiceItem) => void;
  selectedPersona?: any;
  onPreviewSample?: (voice: any) => void;
  isPreviewPlaying?: boolean;
}

export const AudioPlayerSection: React.FC<AudioPlayerSectionProps> = ({
  currentAudio,
  onDownloadMp3,
  selectedPersona,
  onPreviewSample,
  isPreviewPlaying
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [volume, setVolume] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showDeployGuide, setShowDeployGuide] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Helper to speak via native browser Web Speech API for fallback voice
  const speakNative = (textToSpeak: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = Math.max(0.6, Math.min(1.8, currentAudio?.speed || 1.0));
      utterance.pitch = Math.max(0.6, Math.min(1.4, currentAudio?.pitch || 1.0));

      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const urduVoice = voices.find(v => 
          v.lang.toLowerCase().includes('ur') || 
          v.lang.includes('PK') || 
          v.name.toLowerCase().includes('pakistan') || 
          v.name.toLowerCase().includes('urdu')
        ) || voices.find(v => v.lang.toLowerCase().includes('hi') || v.lang.includes('IN')) || voices.find(v => v.lang.startsWith('en')) || voices[0];

        if (urduVoice) {
          utterance.voice = urduVoice;
        }
      }

      utterance.onend = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };

      utterance.onerror = (e) => {
        console.warn('Native speech synthesis error:', e);
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis call failed:', e);
    }
  };

  // Stop native speech
  const stopNativeSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        console.warn(e);
      }
    }
  };

  // Initialize audio when currentAudio changes
  useEffect(() => {
    if (!currentAudio) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }
    stopNativeSpeech();

    const audio = new Audio(currentAudio.audioUrl);
    audioRef.current = audio;
    audio.playbackRate = playbackRate;
    audio.volume = isMuted ? 0 : volume;

    audio.onloadedmetadata = () => {
      setDuration(audio.duration || currentAudio.durationSec || 5);
    };

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.onended = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    // Auto-play newly generated audio
    audio.play().then(() => {
      setIsPlaying(true);
      if (!currentAudio.isAiGemini) {
        speakNative(currentAudio.text);
      }
    }).catch(err => {
      console.warn('Auto-play prevented by browser policy (user interaction needed):', err);
      // Even if background audio autoplay is blocked, try native speech on first gesture
    });

    return () => {
      audio.pause();
      stopNativeSpeech();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentAudio]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (!audioRef.current || !currentAudio) return;
    if (isPlaying) {
      audioRef.current.pause();
      stopNativeSpeech();
      setIsPlaying(false);
    } else {
      if (!currentAudio.isAiGemini) {
        speakNative(currentAudio.text);
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Audio play error, using speech:', err);
        setIsPlaying(true);
      });
    }
  };

  // Replay
  const handleReplay = () => {
    if (!audioRef.current || !currentAudio) return;
    stopNativeSpeech();
    audioRef.current.currentTime = 0;
    if (!currentAudio.isAiGemini) {
      speakNative(currentAudio.text);
    }
    audioRef.current.play().catch(console.warn);
    setIsPlaying(true);
  };

  // Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  // Playback Rate
  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  // Volume
  const handleVolumeChange = (v: number) => {
    setVolume(v);
    setIsMuted(v === 0);
    if (audioRef.current) {
      audioRef.current.volume = v;
    }
  };

  // Trigger MP3 download
  const handleDownloadClick = () => {
    if (!currentAudio) return;
    onDownloadMp3(currentAudio);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  // Animated Waveform Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const barCount = 42;
      const barWidth = 4;
      const gap = (width - barCount * barWidth) / (barCount - 1);

      for (let i = 0; i < barCount; i++) {
        const x = i * (barWidth + gap);
        let barHeight = 6;
        if (isPlaying) {
          const sine = Math.sin(phase + i * 0.25);
          const cosine = Math.cos(phase * 1.5 + i * 0.15);
          barHeight = Math.max(6, Math.abs(sine * cosine) * (height - 12));
        } else {
          barHeight = 6 + Math.sin(i * 0.4) * 4;
        }

        const y = (height - barHeight) / 2;
        const progressRatio = duration > 0 ? currentTime / duration : 0;
        const isPast = i / barCount <= progressRatio;

        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        if (isPast) {
          gradient.addColorStop(0, '#34D399'); // emerald-400
          gradient.addColorStop(1, '#059669'); // emerald-600
        } else {
          gradient.addColorStop(0, '#475569'); // slate-600
          gradient.addColorStop(1, '#1E293B'); // slate-800
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 2);
        ctx.fill();
      }

      if (isPlaying) {
        phase += 0.12;
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, currentTime, duration]);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // If no audio is generated yet, show an inviting player ready state with instant sample listening option
  if (!currentAudio) {
    return (
      <div className="bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center backdrop-blur-md shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 mx-auto flex items-center justify-center text-emerald-400 mb-3 shadow-lg shadow-emerald-950">
          <Volume2 className="w-8 h-8 animate-pulse text-emerald-400" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-white font-urdu">
          پاکستان کی آواز آڈیو پلیئر (Voice Player & Downloader)
        </h3>
        <p className="text-xs text-slate-400 mt-1 max-w-lg mx-auto leading-relaxed">
          اوپر اسکرپٹ لکھیں، آواز منتخب کریں اور بٹن دبائیں۔ تیار ہونے والی آواز کو یہاں براہ راست سن سکتے ہیں اور ایک کلک پر <strong>MP3 ڈاؤن لوڈ</strong> کر سکتے ہیں۔
        </p>

        {selectedPersona && onPreviewSample && (
          <div className="mt-5 inline-flex items-center gap-3 bg-slate-900/90 p-2 sm:p-2.5 rounded-2xl border border-slate-700/80 shadow-inner">
            <img
              src={selectedPersona.avatar}
              alt={selectedPersona.nameEn}
              className="w-10 h-10 rounded-xl object-cover ring-1 ring-emerald-400"
            />
            <div className="text-right">
              <span className="text-xs font-bold text-white font-urdu block">
                {selectedPersona.nameUrdu}
              </span>
              <span className="text-[10px] text-emerald-400">
                {selectedPersona.badge}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onPreviewSample(selectedPersona)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
                isPreviewPlaying
                  ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white hover:scale-105 active:scale-95'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span className="font-urdu text-sm">
                {isPreviewPlaying ? 'آواز بند کریں' : '▶ منتخب آواز کا نمونہ سنیں'}
              </span>
            </button>
          </div>
        )}
      </div>
    );
  }

  const { voicePersona, emotion, text } = currentAudio;

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500/50 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-md relative overflow-hidden ring-1 ring-emerald-400/20">
      {/* Background glow accent */}
      <div className="absolute top-0 right-1/4 w-80 h-32 bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Top Banner Notice */}
      <div className="mb-4 pb-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-emerald-300 text-xs font-medium">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="font-urdu text-sm font-semibold">
            آواز کامیابی سے تیار ہو گئی ہے! نیچے چلائیں، سنیں اور MP3 ڈاؤن لوڈ کریں:
          </span>
        </div>
        <div className="flex items-center gap-2">
          {currentAudio.isAiGemini ? (
            <span className="text-[11px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-mono flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3 text-emerald-400" /> Gemini 3.8 AI Flagship
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setShowDeployGuide(true)}
              className="text-[11px] bg-amber-950/90 hover:bg-amber-900 text-amber-300 border border-amber-500/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 transition-all cursor-pointer shadow-sm"
              title="گٹ ہب یا ورسل پر اصلی AI آواز سیٹ کرنے کا طریقہ دیکھیں"
            >
              <span>لوکل نیٹیو وائس</span>
              <span className="underline ml-1 font-urdu">گٹ ہب لائیو گائیڈ ℹ️</span>
            </button>
          )}
          <span className="text-[11px] bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-mono">
            24kHz MP3 HD
          </span>
        </div>
      </div>

      {/* Voice info row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3.5">
          <img
            src={voicePersona.avatar}
            alt={voicePersona.nameEn}
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-400 shadow-lg shadow-emerald-950"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white font-urdu">
                {voicePersona.nameUrdu}
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {voicePersona.badge}
              </span>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
              <span>{voicePersona.nameEn}</span>
              <span>•</span>
              <span className="text-emerald-400 font-medium capitalize">
                انداز: {emotion}
              </span>
            </div>
          </div>
        </div>

        {/* Primary MP3 Download Button */}
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadClick}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 hover:from-emerald-400 hover:via-teal-400 hover:to-green-500 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-950/80 transform hover:scale-[1.02] active:scale-[0.98] transition-all ring-2 ring-emerald-300/30 cursor-pointer"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-5 h-5 text-white" />
                <span className="font-urdu text-base">MP3 فائل ڈاؤن لوڈ ہو گئی!</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5 text-white animate-bounce" />
                <span className="font-urdu text-base font-bold">MP3 آواز ڈاؤن لوڈ کریں</span>
                <span className="text-[11px] bg-black/30 px-2 py-0.5 rounded-full font-mono">
                  .mp3
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Script snippet preview */}
      <div className="my-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300 text-sm font-urdu leading-relaxed line-clamp-2">
        "{text}"
      </div>

      {/* Waveform Canvas */}
      <div className="my-4 bg-slate-950/80 rounded-xl p-3 border border-slate-800/80">
        <canvas
          ref={canvasRef}
          width={600}
          height={60}
          className="w-full h-14 block"
        />
      </div>

      {/* Timeline Scrubber */}
      <div className="space-y-1 mb-4">
        <input
          type="range"
          min="0"
          max={duration || 1}
          step="0.01"
          value={currentTime}
          onChange={handleSeek}
          aria-label="آواز کا ٹائم لائن اسکربر"
          className="w-full accent-emerald-500 cursor-pointer"
        />
        <div className="flex justify-between text-xs font-mono text-slate-400">
          <span>{formatTime(currentTime)}</span>
          <span className="text-emerald-400 font-semibold">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Prominent Play / Listen Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/70">
        {/* Big Play / Listen & Replay Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            className={`px-5 py-3 rounded-xl font-bold flex items-center gap-2.5 shadow-lg transition-all transform active:scale-95 cursor-pointer ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-950/50'
                : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/30'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span className="font-urdu text-base font-bold">⏸ آواز روکیں (Pause)</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current ml-0.5" />
                <span className="font-urdu text-base font-bold">▶ آواز سنیں (Play Voice)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReplay}
            title="دوبارہ شروع سے سنیں"
            className="px-3.5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-emerald-400" />
            <span className="font-urdu text-xs">دوبارہ سنیں</span>
          </button>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 px-1 font-urdu">اسپیڈ:</span>
          {[0.75, 1.0, 1.25, 1.5].map((rate) => (
            <button
              key={rate}
              type="button"
              onClick={() => handleSpeedChange(rate)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium font-mono transition-all cursor-pointer ${
                playbackRate === rate
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {rate}x
            </button>
          ))}
        </div>

        {/* Volume slider */}
        <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-2 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => handleVolumeChange(isMuted ? 1.0 : 0)}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            aria-label="آواز کا والیوم"
            className="w-20 accent-emerald-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Standard HTML5 Native Player fallback bar for guaranteed playback */}
      <div className="mt-4 pt-3 border-t border-slate-800/60">
        <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
          <span className="font-urdu">براہ راست پلیئر (Standard Audio Player):</span>
          <span className="text-[10px] text-slate-500">اگر ویوفارم نہ چلے تو یہاں سے پلے کریں</span>
        </div>
        <audio
          controls
          src={currentAudio.audioUrl}
          className="w-full h-10 rounded-lg opacity-85 hover:opacity-100 transition-opacity"
        >
          آپ کا براؤزر آڈیو پلیئر سپورٹ نہیں کرتا۔
        </audio>
      </div>

      {/* GitHub / Vercel Live Deployment Guide Modal */}
      {showDeployGuide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl max-w-lg w-full p-6 text-slate-200 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowDeployGuide(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 text-sm cursor-pointer"
            >
              ✕ بند کریں
            </button>

            <div className="flex items-center gap-2 mb-4 text-emerald-400">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-bold text-lg text-white font-urdu">
                گٹ ہب یا ورسل پر اصلی AI آواز لائیو کرنے کا طریقہ
              </h3>
            </div>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-urdu">
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl">
                <p className="font-semibold text-emerald-300 mb-1">
                  1. ورسل (Vercel) پر لائیو کرنا (سب سے آسان):
                </p>
                <p className="text-xs text-slate-300">
                  اگر آپ نے گٹ ہب ریپوزٹری ورسل سے منسلک کی ہے، تو ورسل ڈیش بورڈ میں <strong>Project Settings → Environment Variables</strong> پر جائیں اور یہ ویری ایبل شامل کریں:
                </p>
                <div className="mt-2 bg-slate-950 p-2 rounded-lg font-mono text-xs text-emerald-400 flex items-center justify-between border border-slate-800">
                  <span>Key: GEMINI_API_KEY</span>
                  <span className="text-slate-500 text-[10px]">Google AI Studio Key</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
                <p className="font-semibold text-white mb-1">
                  2. رینڈر یا سرور (Render / Railway / VPS):
                </p>
                <p className="text-xs text-slate-400">
                  سرور ڈیش بورڈ پر Environment Variables میں <code>GEMINI_API_KEY</code> سیٹ کریں اور Start Command <code>npm start</code> رکھیں۔
                </p>
              </div>

              <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
                <p className="font-semibold text-white mb-1">
                  3. گٹ ہب پیجز (GitHub Pages):
                </p>
                <p className="text-xs text-slate-400">
                  گٹ ہب پیجز بغیر سرور کے صرف اسٹیٹک پیج چلاتا ہے۔ اب آپ کے براؤزر کا نیٹیو وائس انجن آٹو سنک کر کے آواز پلے کرتا ہے تاکہ لائیو پر آواز ہمیشہ بولے۔
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setShowDeployGuide(false)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold font-urdu cursor-pointer transition-colors"
              >
                سمجھ گیا، شکریہ!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
