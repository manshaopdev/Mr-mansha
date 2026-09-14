import { Dimension, OracleInsight } from '../types';

export const DIMENSIONS: Dimension[] = [
  {
    id: 'lahoot',
    nameUrdu: 'عالمِ لاہوت',
    nameEn: 'The Primal Void',
    subUrdu: 'نقطہ آغاز اور خالص نور',
    subEn: 'Zero-Point Singularity & Golden Radiance',
    baseColor: '#0a0802',
    accentColor: '#fbbf24',
    frequency: 432,
    solfeggioName: 'Universal Harmonic Tuning (432 Hz)',
    loreUrdu: 'یہ وہ مقام ہے جہاں کائنات ابھی وجود میں نہیں آئی تھی۔ ایک نقطہ جس میں تمام زمان و مکان سمایا ہوا ہے۔',
    loreEn: 'The pre-temporal realm where all multiverses are condensed into a single quantum dot before inflation.',
    palette: ['#fbbf24', '#f59e0b', '#d97706', '#ffffff', '#fef3c7']
  },
  {
    id: 'noor',
    nameUrdu: 'عالمِ نور',
    nameEn: 'Bioluminescent Abyss',
    subUrdu: 'حیاتِ نو اور بحرِ شعور',
    subEn: 'Living Light & Oceanic Consciousness',
    baseColor: '#021014',
    accentColor: '#06b6d4',
    frequency: 528,
    solfeggioName: 'Miracle & DNA Transformation (528 Hz)',
    loreUrdu: 'روشنی کی لہروں میں سانس لیتی مخلوقات کا جہان، جہاں ہر حرکت سے موسیقی اور نور جنم لیتے ہیں۔',
    loreEn: 'An ethereal deep-light ecology where consciousness manifests as bioluminescent organisms swimming through cosmic fluid.',
    palette: ['#06b6d4', '#10b981', '#34d399', '#67e8f9', '#a7f3d0']
  },
  {
    id: 'jabaroot',
    nameUrdu: 'عالمِ جبروت',
    nameEn: 'Supernova Forge',
    subUrdu: 'آتشیں کہکشائیں اور توانائی',
    subEn: 'Stellar Fusion & Cosmic Fire',
    baseColor: '#120305',
    accentColor: '#f43f5e',
    frequency: 639,
    solfeggioName: 'Relational Resonance & Gravity (639 Hz)',
    loreUrdu: 'ستاروں کی تخلیق کی بھٹی، جہاں کشش ثقل ایٹموں کو جوڑ کر روشنی کے سمندر ابلتی ہے۔',
    loreEn: 'The violent cosmic furnace where stars are forged from gravity, solar flares erupt, and stellar winds sculpt galaxies.',
    palette: ['#f43f5e', '#fb7185', '#e11d48', '#ffedd5', '#ea580c']
  },
  {
    id: 'misal',
    nameUrdu: 'عالمِ مثال',
    nameEn: 'Quantum Dreamscape',
    subUrdu: 'خیال کی حقیقت اور ابعاد',
    subEn: 'Non-Euclidean Thought Geometry',
    baseColor: '#0c0414',
    accentColor: '#a855f7',
    frequency: 741,
    solfeggioName: 'Awakening & Pure Intuition (741 Hz)',
    loreUrdu: 'خواب اور حقیقت کے درمیان کا پردہ، جہاں وقت مڑ جاتا ہے اور مادہ محض ایک ارتعاش ہے۔',
    loreEn: 'The liminal realm where thoughts take geometric form, quantum strings vibrate, and dimensions fold upon themselves.',
    palette: ['#a855f7', '#c084fc', '#e879f9', '#818cf8', '#fbcfe8']
  },
  {
    id: 'nasoot',
    nameUrdu: 'عالمِ ناسوت',
    nameEn: 'The Deep Stellar Web',
    subUrdu: 'کہکشاؤں کا رقص اور لامتناہی وسعت',
    subEn: 'Infinite Galaxies & Spacetime Tapestry',
    baseColor: '#020617',
    accentColor: '#38bdf8',
    frequency: 852,
    solfeggioName: 'Spiritual Order & Cosmic Geometry (852 Hz)',
    loreUrdu: 'نظر آنے والی کائنات کے اربوں چراغ، جہاں ہر کہکشاں ایک بڑے وجود کا ننھا سا جھروکا ہے۔',
    loreEn: 'The grand observable macrocosm: billions of spiral galaxies woven into cosmic webs across the fabric of spacetime.',
    palette: ['#38bdf8', '#60a5fa', '#93c5fd', '#ffffff', '#c7d2fe']
  }
];

export const ORACLE_INSIGHTS: OracleInsight[] = [
  {
    id: 'nuqta_1',
    category: 'nuqta',
    titleUrdu: 'نقطہ کی حقیقت',
    titleEn: 'The Single Point',
    urduVerse: 'اک نقطے وچ گل مکدی اے، پھر چھڈ کھہڑے ہن حسابی!',
    urduPoet: 'بابا بلھے شاہ (Bulleh Shah)',
    englishInterpretation: 'All universal equations and cosmic mysteries dissolve into a single luminous point. Once you comprehend the singularity, the math of existence becomes quiet.',
    philosophicalCore: 'Everything you observe—galaxies, stars, and human thoughts—is merely the expansion of the primal point.',
    targetFrequency: 432,
    dimension: 'lahoot'
  },
  {
    id: 'ishq_1',
    category: 'ishq',
    titleUrdu: 'محبت اور کششِ ثقل',
    titleEn: 'Gravitational Love',
    urduVerse: 'عشق سے پیدا نوائے زندگی میں زیر و بم، عشق سے مٹی کی تصویروں میں سوزِ دم بدم',
    urduPoet: 'علامہ محمد اقبال (Allama Iqbal)',
    englishInterpretation: 'Love is the quantum gravity that weaves music into existence and breathes relentless fire into earthly silhouettes.',
    philosophicalCore: 'Gravity is not mere curvature of geometry; it is the yearning of separated matter to return to the primal unity.',
    targetFrequency: 639,
    dimension: 'jabaroot'
  },
  {
    id: 'sukoon_1',
    category: 'sukoon',
    titleUrdu: 'خاموشی کا راگ',
    titleEn: 'Primal Stillness',
    urduVerse: 'خاموشی وہ زبان ہے جس میں خدا بات کرتا ہے، باقی سب محض ناقص ترجمہ ہے۔',
    urduPoet: 'مولانا جلال الدین رومی (Rumi)',
    englishInterpretation: 'Silence is the mother tongue of the multiverse; all spoken words are but fractured reflections of this deep quietude.',
    philosophicalCore: 'When you quiet the internal chatter, the background frequency of the cosmos vibrates in your bones.',
    targetFrequency: 528,
    dimension: 'noor'
  },
  {
    id: 'fana_1',
    category: 'fana',
    titleUrdu: 'فنا اور لامتناہی بقا',
    titleEn: 'Quantum Dissolution',
    urduVerse: 'عشرتِ قطرہ ہے دریا میں فنا ہو جانا، درد کا حد سے گزرنا ہے دوا ہو جانا',
    urduPoet: 'مرزا اسد اللہ خان غالب (Mirza Ghalib)',
    englishInterpretation: 'The absolute bliss of a water droplet is to dissolve in the immense ocean; when pain transcends its boundary, it becomes the cure.',
    philosophicalCore: 'Nothing is truly lost in entropy; energy simply shifts its mask into another dimension.',
    targetFrequency: 741,
    dimension: 'misal'
  },
  {
    id: 'hikmat_1',
    category: 'hikmat',
    titleUrdu: 'انسان اور کائنات',
    titleEn: 'The Microcosm and Macrocosm',
    urduVerse: 'تو خود ہی کائنات ہے، تجھ میں سمٹا ہے یہ سارا نظام۔ ذرا آنکھ کھول اور اپنی وسعت دیکھ!',
    urduPoet: 'حضرت علی بن ابی طالبؑ (Imam Ali)',
    englishInterpretation: 'Do you reckon you are merely a small body, while the entire cosmos is folded within you?',
    philosophicalCore: 'The observer and the universe are entangled in an indivisible holographic dance.',
    targetFrequency: 852,
    dimension: 'nasoot'
  },
  {
    id: 'junoon_1',
    category: 'junoon',
    titleUrdu: 'شعلۂ بیداری',
    titleEn: 'Stellar Ignition',
    urduVerse: 'ستاروں سے آگے جہاں اور بھی ہیں، ابھی عشق کے امتحان اور بھی ہیں',
    urduPoet: 'علامہ محمد اقبال (Allama Iqbal)',
    englishInterpretation: 'Beyond the stars lie countless other realms; the odyssey of consciousness has only just ignited its first spark.',
    philosophicalCore: 'Keep expanding your awareness; every boundary is an invitation to cross into the unknown.',
    targetFrequency: 639,
    dimension: 'jabaroot'
  }
];

export const SACRED_CYMATIC_PRESETS = [
  { id: 'flower', nameUrdu: 'پھولِ حیات', nameEn: 'Flower of Life', n: 3, m: 3, speed: 1.0 },
  { id: 'sriyantra', nameUrdu: 'مقدس مثلثات', nameEn: 'Sacred Triangles', n: 4, m: 2, speed: 0.8 },
  { id: 'arabesque', nameUrdu: 'اسلامی جیومیٹری', nameEn: 'Celestial Arabesque', n: 5, m: 5, speed: 1.2 },
  { id: 'chladni', nameUrdu: 'صوتی موجیں', nameEn: 'Chladni Wave Matrix', n: 6, m: 4, speed: 1.4 },
  { id: 'golden', nameUrdu: 'سنہری تناسب', nameEn: 'Golden Spiral', n: 2, m: 5, speed: 0.9 }
];
