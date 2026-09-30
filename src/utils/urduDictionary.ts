import { SpellCheckResult, WordSuggestion } from '../types/voiceStudio';

// Comprehensive dictionary of common Urdu spelling mistakes and their correct forms
export const URDU_TYPO_MAP: Record<string, string> = {
  // Common religious & greeting phrases
  'الائکم': 'علیکم',
  'الیکوم': 'علیکم',
  'الائکوم': 'علیکم',
  'سلامالیکم': 'السلام علیکم',
  'سلاملیکم': 'السلام علیکم',
  'سلامو علیکم': 'السلام علیکم',
  'اسلام علیکم': 'السلام علیکم',
  'انشاءاللہ': 'ان شاء اللہ',
  'انشااللہ': 'ان شاء اللہ',
  'انشاللہ': 'ان شاء اللہ',
  'الحمدللہ': 'الحمد للہ',
  'ماشاءاللہ': 'ما شاء اللہ',
  'ماشاللہ': 'ما شاء اللہ',
  'سبحاناللہ': 'سبحان اللہ',
  'جزاكاللہ': 'جزاک اللہ',
  'جزاکاللہ': 'جزاک اللہ',

  // Common vocabulary typos
  'بلکل': 'بالکل',
  'خوبسورت': 'خوبصورت',
  'خوبسروتی': 'خوبصورتی',
  'شکریہہ': 'شکریہ',
  'شکرییہ': 'شکریہ',
  'شکریہا': 'شکریہ',
  'معلوات': 'معلومات',
  'معلوماتیں': 'معلومات',
  'جروری': 'ضروری',
  'ضرری': 'ضروری',
  'ضرروری': 'ضروری',
  'پکستان': 'پاکستان',
  'پاکسستان': 'پاکستان',
  'پاکستن': 'پاکستان',
  'زنداباد': 'زندہ باد',
  'زندہباد': 'زندہ باد',
  'حوصلھ': 'حوصلہ',
  'حوصلا': 'حوصلہ',
  'فائیدہ': 'فائدہ',
  'فایدہ': 'فائدہ',
  'زمداری': 'ذمہ داری',
  'ذمیداری': 'ذمہ داری',
  'تبیت': 'طبیعت',
  'طبیت': 'طبیعت',
  'خاہش': 'خواہش',
  'خاہشات': 'خواہشات',
  'مہبت': 'محبت',
  'محبتت': 'محبت',
  'مھبت': 'محبت',
  'نوجواں': 'نوجوان',
  'نوجوانو': 'نوجوانوں',
  'اوام': 'عوام',
  'اکل': 'عقل',
  'گلت': 'غلط',
  'غلت': 'غلط',
  'سحیح': 'صحیح',
  'سہی': 'صحیح',
  'کربانی': 'قربانی',
  'کوششس': 'کوشش',
  'مبارکک': 'مبارک',
  'خوشآمدید': 'خوش آمدید',
  'خوشامدید': 'خوش آمدید',
  'خوشامدئید': 'خوش آمدید',
  'دھوکا': 'دھوکہ',
  'ناظرینکرام': 'ناظرین کرام',
  'حکومتت': 'حکومت',
  'مئوقف': 'موقف',
  'مئورخہ': 'مؤرخہ',
  'متاثرہ': 'متاثرہ',
  'حوصلہافزائی': 'حوصلہ افزائی',
  'کامیابیی': 'کامیابی',
  'ذریعا': 'ذریعہ',
  'مواقعہ': 'مواقع',
  'تفصیلاتت': 'تفصیلات',
  'معیشتت': 'معیشت',
  'نوٹفکیشن': 'نوٹیفکیشن',
  'بھرپورر': 'بھرپور',
  'محنتت': 'محنت'
};

// Common Roman Urdu spelling mistakes and standardizations
export const ROMAN_URDU_TYPO_MAP: Record<string, string> = {
  'shukria': 'shukriya',
  'sukriya': 'shukriya',
  'shukriyaa': 'shukriya',
  'thx': 'shukriya',
  'kese': 'kaisay',
  'kesy': 'kaisay',
  'kysa': 'kaisa',
  'kysi': 'kaisi',
  'khusamdeed': 'khushamdeed',
  'khushamdid': 'khushamdeed',
  'pkistan': 'pakistan',
  'pakstan': 'pakistan',
  'pakisatan': 'pakistan',
  'inshallah': 'in sha Allah',
  'inshaallah': 'in sha Allah',
  'inshAllah': 'in sha Allah',
  'mashallah': 'masha Allah',
  'mashaallah': 'masha Allah',
  'alhamdulillah': 'alhamdulillah',
  'alhamdullilah': 'alhamdulillah',
  'alhumdulillah': 'alhamdulillah',
  'zindgi': 'zindagi',
  'jindagi': 'zindagi',
  'khoobsurat': 'khubsurat',
  'khobsurat': 'khubsurat',
  'zaroori': 'zaroori',
  'zarori': 'zaroori',
  'zaruri': 'zaroori',
  'mohabbat': 'mohabbat',
  'muhabat': 'mohabbat',
  'muhabbat': 'mohabbat',
  'kamyabi': 'kamyabi',
  'kamybi': 'kamyabi',
  'dostoon': 'dosto',
  'dostoo': 'dosto',
  'theek': 'theek',
  'thik': 'theek',
  'thk': 'theek',
  'bhot': 'bohot',
  'boht': 'bohot',
  'bht': 'bohot',
  'vloger': 'vlogger',
  'vedio': 'video',
  'vedios': 'videos',
  'subcribe': 'subscribe',
  'chanel': 'channel',
  'apko': 'aap ko',
  'humko': 'humein',
  'mujko': 'mujhe',
  'islye': 'is liye',
  'isliye': 'is liye',
  'zindabad': 'zindabad',
  'jindabad': 'zindabad'
};

// Rich vocabulary list for autocomplete prefix completion (Urdu Script)
export const URDU_VOCABULARY = [
  'پاکستان', 'پاکستانی', 'پاکستان زندہ باد', 'پاکیزہ',
  'السلام علیکم', 'السلام علیکم ورحمۃ اللہ', 'علیکم',
  'شکریہ', 'شکریہ ادا', 'شکر الحمد للہ',
  'خوبصورت', 'خوبصورتی', 'خوبی', 'خوش آمدید', 'خوشخبری', 'خوشحال', 'خوشی',
  'معلومات', 'معلوماتی', 'معلوم', 'معیار', 'معیشت',
  'پروفیشنل', 'پروگرام', 'پروڈکٹ', 'پریزنٹیشن',
  'محبت', 'محنت', 'محفل', 'محترم', 'محسوس', 'محفوظ',
  'زندگی', 'زندہ باد', 'زندہ', 'زبردست', 'زیادہ',
  'کامیابی', 'کامیاب', 'کوشش', 'کارکردگی', 'کردار',
  'حکومت', 'حکمت عملی', 'حوصلہ', 'حقیقت', 'حقوق',
  'نوجوان', 'نوجوانوں', 'ترقی', 'تعلیم', 'تاریخ',
  'دوستو', 'دوستی', 'درست', 'دنیا', 'دعا',
  'رہنمائی', 'روایات', 'روشنی', 'روحانی',
  'شاندار', 'شاعری', 'شخصیت', 'شہری',
  'صحت', 'صحیح', 'صداقت', 'صبر',
  'ضروری', 'ضرورت',
  'طریقہ', 'طبیعت', 'طاقت',
  'ظاہر', 'ظرافت',
  'عوام', 'عوامی', 'عقل', 'عزت', 'عظیم',
  'غریب', 'غزل', 'غیر معمولی',
  'فائدہ', 'فطرت', 'فیصلہ',
  'قومی', 'قربانی', 'قدرت', 'قابل',
  'کتاب', 'کمال', 'کاروبار', 'کہانی',
  'لاہور', 'کراچی', 'اسلام آباد', 'پشاور', 'کوئٹہ',
  'ملک', 'ملت', 'مستقبل', 'مشہور', 'منصوبہ',
  'نئے', 'نصیحت', 'نظام',
  'واضح', 'وقت', 'وطن',
  'ہماری', 'ہمیشہ', 'ہمت', 'ہزاروں',
  'یقین', 'یادگار', 'یوٹیوب'
];

// Rich vocabulary list for Roman Urdu autocomplete
export const ROMAN_URDU_VOCABULARY = [
  'pakistan', 'pakistani', 'pakistan zindabad',
  'salam', 'salam dosto', 'assalam o alaikum',
  'shukriya', 'shukriya ada karta hoon',
  'kaisay', 'kese hain aap', 'kaisi lagi video',
  'khubsurat', 'khubsurati', 'khushamdeed', 'khushkhabri',
  'bohot', 'bohot acha', 'bohot shukriya', 'bohot pyara',
  'zindagi', 'zindabad', 'zabardast',
  'mohabbat', 'mehnat', 'muhtaram',
  'kamyabi', 'kamyab', 'koshish',
  'dosto', 'dostoon', 'dosti',
  'video', 'subscribe', 'channel', 'share', 'like',
  'in sha Allah', 'masha Allah', 'alhamdulillah',
  'lahore', 'karachi', 'islamabad', 'peshawar', 'quetta',
  'humein', 'aap ko', 'is liye', 'lazmi', 'zaroori',
  'theek', 'theek hai', 'shandar', 'tareef'
];

// Contextual next-word bigram predictions
export const URDU_NEXT_WORD_PREDICTIONS: Record<string, string[]> = {
  'السلام': ['علیکم', 'علیکم ورحمۃ اللہ', 'علیکم دوستو!'],
  'علیکم': ['کیسے ہیں آپ', 'امید ہے آپ خیریت سے ہوں گے', 'دوستو!'],
  'پاکستان': ['زندہ باد', 'کی ترقی', 'کی آواز', 'کے نوجوان', 'کا مستقبل'],
  'شکریہ': ['بہت بہت شکریہ', 'ادا کرتا ہوں', 'آپ کا'],
  'کیسے': ['ہیں آپ سب؟', 'ہیں آپ؟', 'ہو بھائی؟'],
  'خوش': ['آمدید', 'آمدید ہمارے چینل پر', 'قسمت', 'خبری'],
  'ان شاء': ['اللہ تعالیٰ', 'اللہ عزوجل', 'اللہ سب ٹھیک ہوگا'],
  'ما شاء': ['اللہ کمال ہے', 'اللہ'],
  'الحمد': ['للہ رب العالمین', 'للہ سب خیریت ہے'],
  'آپ': ['کیسے ہیں؟', 'کا شکریہ', 'کو مبارک ہو', 'کا کیا خیال ہے؟'],
  'بہت': ['بہت شکریہ', 'اچھا', 'عمدہ اور زبردست', 'خوبصورت'],
  'آج': ['کی اس ویڈیو میں', 'کا دن', 'کی اہم خبریں', 'کا موسم'],
  'ناظرین': ['کرام! السلام علیکم', 'کرام! اس وقت کی اہم خبر'],
  'محنت': ['ہی کامیابی کی کنجی ہے', 'رنگ لاتی ہے'],
  'تمام': ['دوستوں کو سلام', 'ناظرین کا شکریہ'],
  'ویڈیو': ['کو لائک اور شیئر کریں', 'کو آخر تک لازمی دیکھیں']
};

export const ROMAN_NEXT_WORD_PREDICTIONS: Record<string, string[]> = {
  'salam': ['dosto!', 'aap sab ko', 'bhai kaisay ho'],
  'kaisay': ['hain aap sab?', 'ho aap?', 'hain bhai?'],
  'kese': ['hain aap?', 'ho sab?'],
  'shukriya': ['bohot bohot', 'aap sab ka', 'ada karta hoon'],
  'pakistan': ['zindabad!', 'meri jaan', 'ke log'],
  'bohot': ['bohot shukriya', 'acha laga', 'zabardast video', 'pyara'],
  'aap': ['sab ka shukriya', 'kaisay hain?', 'ka kya khayal hai?'],
  'aaj': ['ki is video mein', 'hum baat karenge', 'ka din'],
  'channel': ['ko subscribe karein', 'par khushamdeed'],
  'video': ['ko like aur share karein', 'ko end tak dekhein'],
  'in': ['sha Allah', 'sha Allah sab theek hoga'],
  'masha': ['Allah', 'Allah bohot khoob'],
  'alhamdulillah': ['sab theek hai', 'har haal mein']
};

// Simple Roman Urdu to Nastaliq phonetic conversion map
const ROMAN_TO_URDU_WORDS: Record<string, string> = {
  'salam': 'سلام',
  'assalam': 'السلام',
  'alaikum': 'علیکم',
  'dosto': 'دوستو',
  'bhai': 'بھائی',
  'shukriya': 'شکریہ',
  'shukria': 'شکریہ',
  'pakistan': 'پاکستان',
  'zindabad': 'زندہ باد',
  'kaisay': 'کیسے',
  'kese': 'کیسے',
  'hain': 'ہیں',
  'aap': 'آپ',
  'ap': 'آپ',
  'sab': 'سب',
  'ko': 'کو',
  'ka': 'کا',
  'ki': 'کی',
  'ke': 'کے',
  'main': 'میں',
  'hum': 'ہم',
  'humein': 'ہمیں',
  'mujhe': 'مجھے',
  'aur': 'اور',
  'bohot': 'بہت',
  'acha': 'اچھا',
  'theek': 'ٹھیک',
  'hai': 'ہے',
  'khushamdeed': 'خوش آمدید',
  'umeed': 'امید',
  'khairiyat': 'خیریت',
  'se': 'سے',
  'honge': 'ہوں گے',
  'aaj': 'آج',
  'video': 'ویڈیو',
  'channel': 'چینل',
  'subscribe': 'سبسکرائب',
  'karein': 'کریں',
  'mat': 'مت',
  'bhooliye': 'بھولیے',
  'khubsurat': 'خوبصورت',
  'zaroori': 'ضروری',
  'lazmi': 'لازمی',
  'mehnat': 'محنت',
  'kamyabi': 'کامیابی',
  'mohabbat': 'محبت',
  'zindagi': 'زندگی',
  'duniya': 'دنیا',
  'watan': 'وطن',
  'dil': 'دل',
  'baat': 'بات',
  'karenge': 'کریں گے'
};

/**
 * Checks Urdu and Roman Urdu text for spelling mistakes,
 * returns identified errors and suggestions.
 */
export function checkUrduSpelling(text: string): SpellCheckResult {
  if (!text || text.trim().length === 0) {
    return { hasErrors: false, correctedText: text, errors: [] };
  }

  const errors: SpellCheckResult['errors'] = [];
  let correctedText = text;

  // 1. Check multi-word phrase typos first (e.g. "السلام علیکم" variants)
  const phrasesToCheck = [
    { typo: 'سلامالیکم', correct: 'السلام علیکم' },
    { typo: 'سلاملیکم', correct: 'السلام علیکم' },
    { typo: 'سلامو علیکم', correct: 'السلام علیکم' },
    { typo: 'انشاءاللہ', correct: 'ان شاء اللہ' },
    { typo: 'انشااللہ', correct: 'ان شاء اللہ' },
    { typo: 'الحمدللہ', correct: 'الحمد للہ' },
    { typo: 'ماشاءاللہ', correct: 'ما شاء اللہ' },
    { typo: 'سبحاناللہ', correct: 'سبحان اللہ' },
    { typo: 'جزاکاللہ', correct: 'جزاک اللہ' },
    { typo: 'زنداباد', correct: 'زندہ باد' },
    { typo: 'زندہباد', correct: 'زندہ باد' },
    { typo: 'خوشآمدید', correct: 'خوش آمدید' },
    { typo: 'خوشامدید', correct: 'خوش آمدید' },
    { typo: 'ناظرینکرام', correct: 'ناظرین کرام' },
    { typo: 'inshallah', correct: 'in sha Allah' },
    { typo: 'inshaallah', correct: 'in sha Allah' },
    { typo: 'mashallah', correct: 'masha Allah' },
    { typo: 'mashaallah', correct: 'masha Allah' }
  ];

  for (const item of phrasesToCheck) {
    const regex = new RegExp(`\\b${item.typo}\\b`, 'gi');
    let match;
    while ((match = regex.exec(text)) !== null) {
      errors.push({
        word: match[0],
        suggestion: item.correct,
        start: match.index,
        end: match.index + match[0].length,
        explanation: `درست املا: "${item.correct}"`
      });
    }
  }

  // 2. Tokenize words for single-word typo lookup
  const words = text.split(/([\s,.!؟،؛:\n]+)/);
  let currentIndex = 0;

  for (const token of words) {
    if (!token.trim()) {
      currentIndex += token.length;
      continue;
    }

    const cleanWord = token.replace(/[.,!؟،؛:()]/g, '').trim();
    const cleanLower = cleanWord.toLowerCase();

    // Check Urdu dictionary
    if (URDU_TYPO_MAP[cleanWord]) {
      const suggestion = URDU_TYPO_MAP[cleanWord];
      if (!errors.some(e => e.start === currentIndex)) {
        errors.push({
          word: cleanWord,
          suggestion,
          start: currentIndex,
          end: currentIndex + cleanWord.length,
          explanation: `درست املا: "${suggestion}"`
        });
      }
    } 
    // Check Roman Urdu dictionary
    else if (ROMAN_URDU_TYPO_MAP[cleanLower]) {
      const suggestion = ROMAN_URDU_TYPO_MAP[cleanLower];
      if (!errors.some(e => e.start === currentIndex)) {
        errors.push({
          word: cleanWord,
          suggestion,
          start: currentIndex,
          end: currentIndex + cleanWord.length,
          explanation: `Standard Roman: "${suggestion}"`
        });
      }
    }

    currentIndex += token.length;
  }

  // Generate automatically corrected text
  for (const err of errors.sort((a, b) => b.start - a.start)) {
    correctedText = 
      correctedText.substring(0, err.start) + 
      err.suggestion + 
      correctedText.substring(err.end);
  }

  return {
    hasErrors: errors.length > 0,
    correctedText,
    errors
  };
}

/**
 * Intelligent Real-time Word Guessing & Predictive Autocomplete
 * Generates 4-6 smart next-word suggestions or prefix completions
 */
export function getUrduPredictions(text: string, _cursorPos?: number): WordSuggestion[] {
  if (!text) {
    return [
      { word: 'السلام علیکم', display: 'السلام علیکم', type: 'prediction' },
      { word: 'پاکستان زندہ باد', display: 'پاکستان زندہ باد', type: 'prediction' },
      { word: 'شکریہ', display: 'شکریہ', type: 'prediction' },
      { word: 'ناظرین کرام', display: 'ناظرین کرام', type: 'prediction' },
      { word: 'Salam dosto', display: 'Salam dosto', type: 'prediction' }
    ];
  }

  const suggestions: WordSuggestion[] = [];
  const trimmed = text.trim();
  const endsWithSpace = /\s$/.test(text);

  // Extract tokens
  const tokens = trimmed.split(/\s+/);
  const lastWord = tokens[tokens.length - 1] || '';
  const secondLastWord = tokens.length > 1 ? tokens[tokens.length - 2] : '';

  // Case 1: User is currently typing a word (no trailing space)
  if (!endsWithSpace && lastWord.length > 0) {
    const cleanPrefix = lastWord.replace(/[.,!؟،؛:]/g, '');
    const cleanLower = cleanPrefix.toLowerCase();

    // Check if the current word has an instant typo correction
    if (URDU_TYPO_MAP[cleanPrefix]) {
      suggestions.push({
        word: URDU_TYPO_MAP[cleanPrefix],
        display: `درست: ${URDU_TYPO_MAP[cleanPrefix]}`,
        type: 'correction'
      });
    } else if (ROMAN_URDU_TYPO_MAP[cleanLower]) {
      suggestions.push({
        word: ROMAN_URDU_TYPO_MAP[cleanLower],
        display: `Fix: ${ROMAN_URDU_TYPO_MAP[cleanLower]}`,
        type: 'correction'
      });
    }

    // Urdu prefix matches
    for (const vocab of URDU_VOCABULARY) {
      if (vocab.startsWith(cleanPrefix) && vocab !== cleanPrefix) {
        suggestions.push({
          word: vocab,
          display: vocab,
          type: 'completion'
        });
      }
      if (suggestions.length >= 5) break;
    }

    // Roman Urdu prefix matches
    if (suggestions.length < 5) {
      for (const vocab of ROMAN_URDU_VOCABULARY) {
        if (vocab.toLowerCase().startsWith(cleanLower) && vocab.toLowerCase() !== cleanLower) {
          suggestions.push({
            word: vocab,
            display: vocab,
            type: 'completion'
          });
        }
        if (suggestions.length >= 5) break;
      }
    }
  }

  // Case 2: User just finished a word (trailing space), provide next-word anticipation
  if (endsWithSpace || suggestions.length < 3) {
    const targetWord = endsWithSpace ? lastWord : secondLastWord;
    const cleanTarget = targetWord.replace(/[.,!؟،؛:]/g, '');
    const cleanLower = cleanTarget.toLowerCase();

    // Check Urdu bigrams
    if (URDU_NEXT_WORD_PREDICTIONS[cleanTarget]) {
      for (const nextW of URDU_NEXT_WORD_PREDICTIONS[cleanTarget]) {
        suggestions.push({
          word: nextW,
          display: nextW,
          type: 'prediction'
        });
      }
    }

    // Check Roman Urdu bigrams
    if (ROMAN_NEXT_WORD_PREDICTIONS[cleanLower]) {
      for (const nextW of ROMAN_NEXT_WORD_PREDICTIONS[cleanLower]) {
        suggestions.push({
          word: nextW,
          display: nextW,
          type: 'prediction'
        });
      }
    }
  }

  // Case 3: If still sparse, add popular contextual Pakistani phrases
  if (suggestions.length < 3) {
    const fallbackList: WordSuggestion[] = [
      { word: 'بہت شکریہ', display: 'بہت شکریہ', type: 'prediction' },
      { word: 'کیسے ہیں آپ', display: 'کیسے ہیں آپ', type: 'prediction' },
      { word: 'ان شاء اللہ', display: 'ان شاء اللہ', type: 'prediction' },
      { word: 'پاکستان زندہ باد', display: 'پاکستان زندہ باد', type: 'prediction' },
      { word: 'subhan Allah', display: 'subhan Allah', type: 'prediction' }
    ];

    for (const item of fallbackList) {
      if (!suggestions.some(s => s.word === item.word)) {
        suggestions.push(item);
      }
      if (suggestions.length >= 5) break;
    }
  }

  return suggestions.slice(0, 6);
}

/**
 * Roman Urdu to Urdu Nastaliq word converter
 */
export function convertRomanUrduToNastaliq(text: string): string {
  if (!text) return '';
  
  const tokens = text.split(/(\s+|[.,!؟،؛:\n]+)/);
  return tokens.map(token => {
    const clean = token.toLowerCase().trim();
    if (ROMAN_TO_URDU_WORDS[clean]) {
      return ROMAN_TO_URDU_WORDS[clean];
    }
    return token;
  }).join('');
}

/**
 * Adds authentic diacritics/aerab for enhanced speech pronunciation
 */
export function addDiacriticsToUrdu(text: string): string {
  let res = text;
  const aerabReplacements: Record<string, string> = {
    'پاکستان': 'پَاکِسْتَان',
    'السلام علیکم': 'اَلسَّلَامُ عَلَیْکُمْ',
    'شکریہ': 'شُکْرِیَہ',
    'محبت': 'مَحَبَّت',
    'خوبصورت': 'خُوبْصُورَت',
    'محنت': 'مِحْنَت',
    'کامیابی': 'کَامْیَابِی',
    'زندہ باد': 'زِنْدَہ بَاد',
    'عوام': 'عَوَام',
    'حکومت': 'حُکُومَت'
  };

  for (const [key, val] of Object.entries(aerabReplacements)) {
    res = res.split(key).join(val);
  }
  return res;
}
