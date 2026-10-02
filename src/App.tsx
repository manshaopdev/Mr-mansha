import React, { useState, useEffect } from 'react';
import { VoiceHeader } from './components/voice/VoiceHeader';
import { UrduTextEditor } from './components/voice/UrduTextEditor';
import { VoicePersonaSelector } from './components/voice/VoicePersonaSelector';
import { VoiceControls } from './components/voice/VoiceControls';
import { AudioPlayerSection } from './components/voice/AudioPlayerSection';
import { VoiceHistoryList } from './components/voice/VoiceHistoryList';
import { UrduKeyboardHelper } from './components/voice/UrduKeyboardHelper';
import { PAKISTANI_VOICES } from './data/pakistaniVoices';
import { VoicePersona, VoiceEmotion, GeneratedVoiceItem, ScriptPreset } from './types/voiceStudio';
import { downloadMp3File } from './utils/audioEncoder';
import { generateClientSpeechAudio } from './utils/clientTtsFallback';
import { Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, Heart } from 'lucide-react';

const STORAGE_KEY_HISTORY = 'awaz_pakistan_voice_history_v1';
const STORAGE_KEY_TEXT = 'awaz_pakistan_saved_draft_v1';

export function App() {
  // Script text state with localStorage draft
  const [text, setText] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TEXT);
      return saved || PAKISTANI_VOICES[0].sampleTextUrdu;
    } catch {
      return PAKISTANI_VOICES[0].sampleTextUrdu;
    }
  });

  // Voice Persona selection
  const [selectedPersona, setSelectedPersona] = useState<VoicePersona>(PAKISTANI_VOICES[0]);
  const [emotion, setEmotion] = useState<VoiceEmotion>('professional');
  const [speed, setSpeed] = useState<number>(1.0);
  const [pitch, setPitch] = useState<number>(1.0);
  const [scriptMode, setScriptMode] = useState<'urdu' | 'roman'>('urdu');
  const [isVirtualKeyboardOpen, setIsVirtualKeyboardOpen] = useState<boolean>(false);

  // Audio generation state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentAudio, setCurrentAudio] = useState<GeneratedVoiceItem | null>(null);

  // Persona sample preview state
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState<boolean>(false);

  // Notification toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // History state
  const [history, setHistory] = useState<GeneratedVoiceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (saved) return JSON.parse(saved);
      return [];
    } catch {
      return [];
    }
  });

  // Save text draft on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TEXT, text);
    } catch (e) {
      console.warn('Failed to save draft:', e);
    }
  }, [text]);

  // Save history on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history.slice(0, 20)));
    } catch (e) {
      console.warn('Failed to save history:', e);
    }
  }, [history]);

  // Show Toast Helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Switch Voice Persona
  const handleSelectVoice = (voice: VoicePersona) => {
    setSelectedPersona(voice);
    setSpeed(voice.defaultSpeed);
    setPitch(voice.defaultPitch);
    showToast(`صداکار تبدیل: ${voice.nameUrdu} (${voice.badge})`, 'info');
  };

  // Preview Voice Sample (Play & Listen immediately)
  const handlePreviewSample = async (voice: VoicePersona) => {
    if (isPreviewPlaying && playingVoiceId === voice.id) {
      setIsPreviewPlaying(false);
      setPlayingVoiceId(null);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      return;
    }

    setPlayingVoiceId(voice.id);
    setIsPreviewPlaying(true);

    try {
      // If user typed custom text, preview their first sentence, else preview persona sample
      const customTextSnippet = text.trim() ? text.trim().slice(0, 150) : '';
      const sampleText = customTextSnippet || (scriptMode === 'urdu' ? voice.sampleTextUrdu : voice.sampleTextRoman);
      
      showToast(`آواز چلائی جا رہی ہے: ${voice.nameUrdu}`, 'info');
      // Use client audio synthesizer for immediate instant playback
      await generateClientSpeechAudio(
        sampleText,
        voice,
        emotion,
        speed,
        pitch
      );
    } catch (err) {
      console.error('Preview error:', err);
    } finally {
      setTimeout(() => {
        setIsPreviewPlaying(false);
        setPlayingVoiceId(null);
      }, 5000);
    }
  };

  // Load Script Preset
  const handleSelectPreset = (preset: ScriptPreset) => {
    const textToLoad = scriptMode === 'urdu' ? preset.textUrdu : preset.textRoman;
    setText(textToLoad);
    const recVoice = PAKISTANI_VOICES.find(v => v.id === preset.recommendedVoiceId);
    if (recVoice) {
      setSelectedPersona(recVoice);
    }
    setEmotion(preset.recommendedEmotion);
    showToast(`اسکرپٹ لوڈ ہو گیا: ${preset.titleUrdu}`, 'success');
  };

  // Insert character from Virtual Keyboard
  const handleInsertChar = (char: string) => {
    setText(prev => prev + char);
  };

  // Generate Audio & MP3
  const handleGenerateVoice = async () => {
    if (!text.trim()) {
      showToast('برائے مہربانی پہلے تحریر یا اسکرپٹ درج کریں!', 'error');
      return;
    }

    setIsGenerating(true);

    // Unlock browser audio context & speech engine on direct user interaction
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.resume();
      } catch {}
    }

    try {
      let audioResult: {
        audioUrl: string;
        mp3DataUrl: string;
        wavDataUrl?: string;
        durationSec: number;
        isAiGemini: boolean;
      };

      // Try server-side Gemini 3.8 TTS first
      let serverSuccess = false;
      try {
        const res = await fetch('/api/tts/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: text.trim(),
            voiceId: selectedPersona.id,
            style: `${selectedPersona.speechStyleDescription}. Emotion: ${emotion}. Rate: ${speed}x. Pitch: ${pitch}.`,
            speed,
            pitch
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.audioBase64 && data.isAiGemini) {
            const mp3DataUrl = `data:audio/mp3;base64,${data.audioBase64}`;
            const wavDataUrl = data.wavBase64 ? `data:audio/wav;base64,${data.wavBase64}` : undefined;
            
            audioResult = {
              audioUrl: mp3DataUrl,
              mp3DataUrl,
              wavDataUrl,
              durationSec: Math.max(2, (text.trim().split(/\s+/).length / 2.6)),
              isAiGemini: true
            };
            serverSuccess = true;
          }
        }
      } catch (serverErr) {
        console.warn('Server TTS not reachable, switching to client speech engine:', serverErr);
      }

      // If server TTS was unavailable or in fallback mode (e.g. GitHub Pages or quota)
      if (!serverSuccess) {
        const clientAudio = await generateClientSpeechAudio(
          text.trim(),
          selectedPersona,
          emotion,
          speed,
          pitch
        );

        audioResult = {
          audioUrl: clientAudio.audioUrl,
          mp3DataUrl: clientAudio.mp3DataUrl,
          durationSec: clientAudio.durationSec,
          isAiGemini: false
        };
      }

      // Create generated voice item
      const newItem: GeneratedVoiceItem = {
        id: 'voice_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        timestamp: Date.now(),
        text: text.trim(),
        voicePersona: selectedPersona,
        emotion,
        speed,
        pitch,
        audioUrl: audioResult.audioUrl,
        mp3DataUrl: audioResult.mp3DataUrl,
        wavDataUrl: audioResult.wavDataUrl,
        durationSec: audioResult.durationSec,
        isAiGemini: audioResult.isAiGemini,
        charCount: text.length,
        wordCount: text.trim().split(/\s+/).length
      };

      setCurrentAudio(newItem);
      setHistory(prev => [newItem, ...prev.slice(0, 19)]);
      showToast('ماشاء اللہ! پاکستانی آواز تیار ہو گئی اور MP3 ریڈی ہے۔', 'success');

      // Scroll smoothly to player
      window.scrollTo({ top: 380, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Generation Error:', err);
      showToast('آواز جنریٹ کرنے میں خرابی پیش آئی، دوبارہ کوشش کریں۔', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  // Download MP3
  const handleDownloadMp3 = (item: GeneratedVoiceItem) => {
    const filename = `pakistani_voice_${item.voicePersona.nameEn.replace(/\s+/g, '_')}_${Date.now()}.mp3`;
    downloadMp3File(item.mp3DataUrl || item.audioUrl, filename);
    showToast(`MP3 فائل "${filename}" ڈاؤن لوڈ ہو رہی ہے...`, 'success');
  };

  // Play item from history
  const handlePlayHistoryItem = (item: GeneratedVoiceItem) => {
    setCurrentAudio(item);
    showToast(`ہسٹری سے لوڈ کیا گیا: ${item.voicePersona.nameUrdu}`, 'info');
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-4 duration-300 max-w-md">
          <div className={`p-4 rounded-xl shadow-2xl border flex items-center gap-3 ${
            toast.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
              : toast.type === 'error'
              ? 'bg-rose-950/90 border-rose-500 text-rose-200'
              : 'bg-slate-900/90 border-slate-700 text-slate-200'
          }`}>
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {toast.type === 'error' && <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />}
            {toast.type === 'info' && <Sparkles className="w-5 h-5 text-teal-400 shrink-0" />}
            <span className="text-sm font-medium font-urdu">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Main Header */}
      <VoiceHeader
        activeScriptMode={scriptMode}
        onToggleScriptMode={(mode) => setScriptMode(mode)}
        onSelectPreset={handleSelectPreset}
      />

      {/* Hero Banner Strip */}
      <section className="relative border-b border-slate-800/80 bg-gradient-to-b from-slate-900/60 to-transparent py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
            <p className="text-xs sm:text-sm text-slate-300 font-urdu">
              <strong className="text-emerald-400">پاکستان کی آواز (Pakistan Ki Awaz):</strong> لکھتے جائیں، غلط الفاظ خودکار ٹھیک ہوں گے، الفاظ گیس ہوں گے، لائیو سنیں اور 100% MP3 فائل ڈاؤن لوڈ کریں!
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>مستند پاکستانی لہجات</span>
            </span>
            <span>•</span>
            <span className="text-emerald-300 font-medium">لائیو آواز سنیں</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">MP3 ڈاؤن لوڈ</span>
          </div>
        </div>
      </section>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top: Text Editor with Realtime Spell Checking & Word Guessing */}
        <UrduTextEditor
          text={text}
          onChangeText={setText}
          scriptMode={scriptMode}
          onToggleVirtualKeyboard={() => setIsVirtualKeyboardOpen(true)}
        />

        {/* Middle: Pakistani Voice Personas Selector */}
        <VoicePersonaSelector
          selectedVoice={selectedPersona}
          onSelectVoice={handleSelectVoice}
          onPreviewSample={handlePreviewSample}
          isPreviewPlaying={isPreviewPlaying}
          playingVoiceId={playingVoiceId}
        />

        {/* Emotion, Speed, Pitch & Generate Button */}
        <VoiceControls
          selectedPersona={selectedPersona}
          emotion={emotion}
          onChangeEmotion={setEmotion}
          speed={speed}
          onChangeSpeed={setSpeed}
          pitch={pitch}
          onChangePitch={setPitch}
          onGenerate={handleGenerateVoice}
          isGenerating={isGenerating}
          canGenerate={text.trim().length > 0}
          onListenPreview={() => handlePreviewSample(selectedPersona)}
          isListeningPreview={isPreviewPlaying && playingVoiceId === selectedPersona.id}
        />

        {/* Audio Player & MP3 Download Section */}
        <AudioPlayerSection
          currentAudio={currentAudio}
          onDownloadMp3={handleDownloadMp3}
          selectedPersona={selectedPersona}
          onPreviewSample={handlePreviewSample}
          isPreviewPlaying={isPreviewPlaying}
        />

        {/* Saved Audio History */}
        <VoiceHistoryList
          history={history}
          currentAudioId={currentAudio?.id || null}
          onPlayItem={handlePlayHistoryItem}
          onDownloadItem={handleDownloadMp3}
          onLoadIntoEditor={(str) => {
            setText(str);
            showToast('تحریر ایڈیٹر میں منتقل ہو گئی!', 'success');
          }}
          onClearHistory={() => {
            setHistory([]);
            showToast('ہسٹری صاف کر دی گئی۔', 'info');
          }}
        />
      </main>

      {/* Urdu Virtual Keyboard Modal */}
      <UrduKeyboardHelper
        isOpen={isVirtualKeyboardOpen}
        onClose={() => setIsVirtualKeyboardOpen(false)}
        onInsertChar={handleInsertChar}
      />

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-800 bg-slate-950 py-6 px-4 sm:px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200 font-urdu text-sm">پاکستان کی آواز (Pakistan Ki Awaz)</span>
            <span>—</span>
            <span>پاکستانی اے آئی وائس اسٹوڈیو، لائیو املا درستگی و MP3 ڈاؤن لوڈر</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>تیار کردہ برائے پاکستان</span>
            <Heart className="w-3.5 h-3.5 text-emerald-500 fill-current" />
            <span>• مکمل MP3 ڈاؤن لوڈ و لائیو پلے بیک</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
