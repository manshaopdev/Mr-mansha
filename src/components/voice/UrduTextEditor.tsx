import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  CheckCheck, 
  Wand2, 
  RotateCcw, 
  Copy, 
  Check, 
  Languages, 
  AlertCircle, 
  Lightbulb,
  Keyboard,
  ArrowRightLeft
} from 'lucide-react';
import { 
  checkUrduSpelling, 
  getUrduPredictions, 
  convertRomanUrduToNastaliq, 
  addDiacriticsToUrdu 
} from '../../utils/urduDictionary';
import { SpellCheckResult, WordSuggestion } from '../../types/voiceStudio';

interface UrduTextEditorProps {
  text: string;
  onChangeText: (newText: string) => void;
  scriptMode: 'urdu' | 'roman';
  onToggleVirtualKeyboard?: () => void;
}

export const UrduTextEditor: React.FC<UrduTextEditorProps> = ({
  text,
  onChangeText,
  scriptMode,
  onToggleVirtualKeyboard
}) => {
  const [spellCheck, setSpellCheck] = useState<SpellCheckResult>({
    hasErrors: false,
    correctedText: '',
    errors: []
  });
  const [predictions, setPredictions] = useState<WordSuggestion[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [direction, setDirection] = useState<'rtl' | 'ltr'>(scriptMode === 'urdu' ? 'rtl' : 'ltr');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync direction on script mode change
  useEffect(() => {
    setDirection(scriptMode === 'urdu' ? 'rtl' : 'ltr');
  }, [scriptMode]);

  // Real-time analysis on text change: Instant spell-check & word guessing
  useEffect(() => {
    const spell = checkUrduSpelling(text);
    setSpellCheck(spell);

    const guesses = getUrduPredictions(text);
    setPredictions(guesses);
  }, [text]);

  // 1-Click Auto-Fix all detected spelling mistakes
  const handleAutoFixAll = () => {
    if (spellCheck.hasErrors && spellCheck.correctedText) {
      onChangeText(spellCheck.correctedText);
    }
  };

  // Click individual typo to fix only that error
  const handleFixSingleError = (error: SpellCheckResult['errors'][0]) => {
    const updated = 
      text.substring(0, error.start) + 
      error.suggestion + 
      text.substring(error.end);
    onChangeText(updated);
  };

  // Insert guessed / predicted word
  const handleInsertPrediction = (word: string) => {
    if (!text || text.trim().length === 0) {
      onChangeText(word + ' ');
      return;
    }

    const endsWithSpace = /\s$/.test(text);
    if (endsWithSpace) {
      onChangeText(text + word + ' ');
    } else {
      // Replace the current active partial word
      const tokens = text.split(/\s+/);
      tokens.pop(); // remove partial
      const prefix = tokens.length > 0 ? tokens.join(' ') + ' ' : '';
      onChangeText(prefix + word + ' ');
    }

    // Keep focus
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  };

  // AI-powered deep sentence polishing via backend
  const handleAiPolish = async () => {
    if (!text.trim()) return;
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/urdu/ai-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, action: 'polish' })
      });
      const data = await res.json();
      if (data.success && data.resultText) {
        onChangeText(data.resultText);
      }
    } catch (err) {
      console.error('AI polish error:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Add diacritics / aerab
  const handleAddAerab = async () => {
    if (!text.trim()) return;
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/urdu/ai-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, action: 'diacritics' })
      });
      const data = await res.json();
      if (data.success && data.resultText) {
        onChangeText(data.resultText);
      } else {
        // Fallback local diacritics
        onChangeText(addDiacriticsToUrdu(text));
      }
    } catch {
      onChangeText(addDiacriticsToUrdu(text));
    } finally {
      setIsAiLoading(false);
    }
  };

  // Convert Roman Urdu to Nastaliq Urdu
  const handleConvertToNastaliq = () => {
    if (!text.trim()) return;
    const converted = convertRomanUrduToNastaliq(text);
    onChangeText(converted);
    setDirection('rtl');
  };

  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Metrics
  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  // Average speaking rate: ~2.5 to 3 words per second in Pakistani Urdu
  const estimatedSeconds = Math.max(1, (wordCount / 2.7)).toFixed(1);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl relative backdrop-blur-md">
      {/* Top Bar: Title & Assist Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white flex items-center gap-1.5">
              <span>تحریر کا اسکرپٹ (Voice Script)</span>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700">
                {direction === 'rtl' ? 'اردو دائیں سے بائیں' : 'English / Roman LTR'}
              </span>
            </h2>
            <p className="text-[11px] text-slate-400">
              لکھتے ہوئے املا خودکار درست ہوگی اور اگلے الفاظ تجویز ہوں گے
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Virtual Keyboard Toggle */}
          {onToggleVirtualKeyboard && (
            <button
              onClick={onToggleVirtualKeyboard}
              title="اردو کی بورڈ کی پیڈ کھولیں"
              className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-emerald-500/40 text-xs flex items-center gap-1 transition-colors"
            >
              <Keyboard className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">کی بورڈ</span>
            </button>
          )}

          {/* Roman to Urdu button */}
          <button
            onClick={handleConvertToNastaliq}
            title="رومن اردو کو اردو نستعلیق میں تبدیل کریں"
            className="p-1.5 px-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-emerald-300 hover:border-emerald-500/40 text-xs flex items-center gap-1.5 transition-colors"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden md:inline">رومن ➔ اردو</span>
          </button>

          {/* Diacritics / Aerab */}
          <button
            onClick={handleAddAerab}
            disabled={isAiLoading || !text.trim()}
            title="اعراب (زبر، زیر، پیش) لگائیں تاکہ آواز 100% درست بولے"
            className="p-1.5 px-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-emerald-300 hover:border-emerald-500/40 disabled:opacity-40 text-xs flex items-center gap-1.5 transition-colors"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
            <span>اعراب لگائیں</span>
          </button>

          {/* AI Polish */}
          <button
            onClick={handleAiPolish}
            disabled={isAiLoading || !text.trim()}
            title="AI کی مدد سے اسکرپٹ کو خوبصورت اور درست بنائیں"
            className="p-1.5 px-2.5 rounded-lg bg-gradient-to-r from-emerald-600/80 to-teal-600/80 hover:from-emerald-600 hover:to-teal-600 text-white text-xs flex items-center gap-1.5 font-medium shadow-md shadow-emerald-950 disabled:opacity-40 transition-all"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isAiLoading ? 'animate-spin' : ''}`} />
            <span>{isAiLoading ? 'AI کام کر رہا ہے...' : 'AI نکھار'}</span>
          </button>
        </div>
      </div>

      {/* Real-time Predictive Guessing Bar ("الفاظ گیس / پیشگوئی") */}
      <div className="my-2.5 p-2 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-wrap items-center gap-1.5">
        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 pl-1 pr-2">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>الفاظ گیس (Suggestions):</span>
        </div>
        
        {predictions.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleInsertPrediction(p.word)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all transform active:scale-95 flex items-center gap-1 shadow-sm ${
              p.type === 'correction'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 hover:bg-emerald-900/40 hover:text-emerald-300 hover:border-emerald-500/40'
            }`}
          >
            <span className="font-urdu text-sm">{p.display}</span>
            <span className="text-[9px] opacity-60 font-mono">↵</span>
          </button>
        ))}
      </div>

      {/* Main Textarea */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => onChangeText(e.target.value)}
          dir={direction}
          rows={5}
          placeholder={
            direction === 'rtl'
              ? 'یہاں اپنا اسکرپٹ یا جملہ لکھیں... (مثلاً: السلام علیکم دوستو! کیسی ہے آپ سب کی تیاری؟)'
              : 'Write in Roman Urdu or English here... (e.g. Salam dosto! Aaj hum baat karenge...)'
          }
          className={`w-full bg-slate-950/90 text-white rounded-xl p-4 border border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-base leading-relaxed transition-all resize-y ${
            direction === 'rtl' ? 'font-urdu text-lg leading-[2.2]' : 'font-sans'
          }`}
        />

        {/* Quick Clear & Direction buttons */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setDirection(d => d === 'rtl' ? 'ltr' : 'rtl')}
            title="تبدیل کریں دائیں/بائیں (Direction)"
            className="text-[11px] text-slate-400 hover:text-slate-200 px-1 font-mono"
          >
            {direction.toUpperCase()}
          </button>
          <span className="w-px h-3 bg-slate-700" />
          <button
            onClick={() => onChangeText('')}
            title="صاف کریں (Clear)"
            className="text-[11px] text-slate-400 hover:text-rose-400 px-1"
          >
            Clear
          </button>
          <span className="w-px h-3 bg-slate-700" />
          <button
            onClick={handleCopy}
            title="تحریر کاپی کریں"
            className="text-[11px] text-slate-400 hover:text-emerald-400 px-1 flex items-center gap-1"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'کاپی ہو گیا' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Real-time Spelling Errors Bar (غلط الفاظ کی درستگی) */}
      {spellCheck.hasErrors && (
        <div className="mt-3 p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-amber-300">
                غلط الفاظ کی نشاندہی ({spellCheck.errors.length}):
              </span>
              {spellCheck.errors.slice(0, 4).map((err, i) => (
                <button
                  key={i}
                  onClick={() => handleFixSingleError(err)}
                  className="px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/40 text-amber-200 text-xs font-medium border border-amber-500/30 flex items-center gap-1 transition-colors"
                >
                  <span className="line-through opacity-70">{err.word}</span>
                  <span>➔</span>
                  <span className="text-white font-semibold">{err.suggestion}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAutoFixAll}
            className="shrink-0 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>سب الفاظ خودکار سیٹ کریں (Auto-Fix All)</span>
          </button>
        </div>
      )}

      {/* Bottom Counter Bar */}
      <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2 px-1">
        <div className="flex items-center gap-3">
          <span>
            الفاظ: <strong className="text-white font-mono">{wordCount}</strong>
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-700" />
          <span>
            حروف: <strong className="text-white font-mono">{charCount}</strong>
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-700" />
          <span className="text-emerald-400 font-medium">
            آواز کا اندازاً وقت: ~{estimatedSeconds} سیکنڈ
          </span>
        </div>
        <div className="text-[11px] text-slate-500 flex items-center gap-1">
          <Check className="w-3 h-3 text-emerald-500" />
          <span>لائیو آٹو املا چیک فعال ہے</span>
        </div>
      </div>
    </div>
  );
};
