export type Gender = 'male' | 'female';

export type VoicePersonaId = 
  | 'hamza_news'
  | 'ayesha_story'
  | 'bilal_rj'
  | 'fatima_doc'
  | 'zain_vlog'
  | 'sobia_poetry'
  | 'chaudhry_elder'
  | 'mariam_calm';

export interface VoicePersona {
  id: VoicePersonaId;
  nameUrdu: string;
  nameEn: string;
  gender: Gender;
  region: string;
  avatar: string;
  badge: string;
  taglineUrdu: string;
  taglineEn: string;
  bestFor: string[];
  geminiVoice: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr' | 'Aoede';
  speechStyleDescription: string;
  defaultSpeed: number;
  defaultPitch: number;
  sampleTextUrdu: string;
  sampleTextRoman: string;
}

export type VoiceEmotion = 
  | 'professional'
  | 'storyteller'
  | 'energetic'
  | 'poetic'
  | 'cheerful'
  | 'calm'
  | 'dramatic';

export interface VoiceEmotionOption {
  id: VoiceEmotion;
  labelUrdu: string;
  labelEn: string;
  icon: string;
  description: string;
}

export interface ScriptPreset {
  id: string;
  categoryUrdu: string;
  categoryEn: string;
  titleUrdu: string;
  titleEn: string;
  textUrdu: string;
  textRoman: string;
  recommendedVoiceId: VoicePersonaId;
  recommendedEmotion: VoiceEmotion;
}

export interface SpellCheckResult {
  hasErrors: boolean;
  correctedText: string;
  errors: {
    word: string;
    suggestion: string;
    start: number;
    end: number;
    explanation?: string;
  }[];
}

export interface WordSuggestion {
  word: string;
  display: string;
  type: 'prediction' | 'completion' | 'correction';
}

export interface GeneratedVoiceItem {
  id: string;
  timestamp: number;
  text: string;
  voicePersona: VoicePersona;
  emotion: VoiceEmotion;
  speed: number;
  pitch: number;
  audioUrl: string;       // Object URL or data URL
  mp3DataUrl: string;     // Explicit base64 data:audio/mp3
  wavDataUrl?: string;    // Explicit base64 data:audio/wav
  durationSec: number;
  isAiGemini: boolean;
  charCount: number;
  wordCount: number;
}
