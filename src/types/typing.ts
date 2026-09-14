export type TypingMode = 'timed' | 'words' | 'lessons' | 'quote' | 'code' | 'custom' | 'game';

export type TypingTheme = 'midnight' | 'emerald' | 'amber' | 'chalk' | 'lavender';

export type SoundEffectType = 'mechanical' | 'thock' | 'typewriter' | 'beep' | 'off';

export interface TestResult {
  id: string;
  wpm: number;
  rawWpm: number;
  accuracy: number;
  consistency: number;
  totalChars: number;
  correctChars: number;
  incorrectChars: number;
  timeTakenSeconds: number;
  mode: string;
  subMode: string;
  date: string;
  keyErrors: Record<string, number>;
  wpmOverTime: { second: number; wpm: number; rawWpm: number; errors: number }[];
}

export interface Lesson {
  id: string;
  title: string;
  category: 'home-row' | 'top-row' | 'bottom-row' | 'numbers' | 'symbols' | 'code';
  keysIntroduced: string[];
  targetWpm: number;
  text: string;
  instruction: string;
  fingerFocus: string;
}

export interface FallingWord {
  id: string;
  word: string;
  x: number; // percentage 5-90%
  y: number; // percentage 0-100%
  speed: number;
}
