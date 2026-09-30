import React from 'react';
import { X } from 'lucide-react';

interface UrduKeyboardHelperProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertChar: (char: string) => void;
}

const URDU_KEYS = [
  'ا', 'ب', 'پ', 'ت', 'ٹ', 'ث', 'ج', 'چ', 'ح', 'خ',
  'د', 'ڈ', 'ذ', 'ر', 'ڑ', 'ز', 'ژ', 'س', 'ش', 'ص',
  'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل',
  'م', 'ن', 'ں', 'و', 'ہ', 'ھ', 'ء', 'ی', 'ے',
  // Diacritics & Punctuation
  'َ', 'ِ', 'ُ', 'ّ', 'ْ', 'ً', '؟', '،', '۔', '!'
];

export const UrduKeyboardHelper: React.FC<UrduKeyboardHelperProps> = ({
  isOpen,
  onClose,
  onInsertChar
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-2xl p-4 shadow-2xl animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div>
            <h4 className="text-sm font-semibold text-white font-urdu">
              اردو حروف و اعراب کی پیڈ (Urdu Virtual Keys)
            </h4>
            <p className="text-[11px] text-slate-400">
              کسی بھی حرف پر کلک کریں تاکہ وہ آپ کے اسکرپٹ میں شامل ہو جائے
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-8 sm:grid-cols-10 gap-1.5 max-h-60 overflow-y-auto p-1" dir="rtl">
          {URDU_KEYS.map((k, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onInsertChar(k)}
              className="h-10 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-200 border border-slate-700/80 font-urdu text-lg flex items-center justify-center transition-all transform active:scale-95 shadow-sm"
            >
              {k}
            </button>
          ))}
        </div>

        <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>ٹپ: خصوصی حروف جیسے ٹ، ڈ، ڑ، ں، ے باآسانی ٹائپ کریں</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-medium"
          >
            بند کریں
          </button>
        </div>
      </div>
    </div>
  );
};
