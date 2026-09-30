import { VoicePersona, VoiceEmotionOption, ScriptPreset } from '../types/voiceStudio';

export const PAKISTANI_VOICES: VoicePersona[] = [
  {
    id: 'hamza_news',
    nameUrdu: 'ہمزہ ملک',
    nameEn: 'Hamza Malik',
    gender: 'male',
    region: 'اسلام آباد / لاہور (قومی لہجہ)',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    badge: 'نیوز اینکر / ہیڈلائنز',
    taglineUrdu: 'مستند، پراعتماد اور سنجیدہ نیوز اینکر آواز',
    taglineEn: 'Authoritative, crisp Pakistani TV news anchor & official spokesperson',
    bestFor: ['خبریں اور ہیڈلائنز', 'کارپوریٹ پریزنٹیشن', 'دستاویزی فلمیں (Documentaries)'],
    geminiVoice: 'Fenrir',
    speechStyleDescription: 'Authentic Pakistani male TV news anchor. Confident, crisp enunciation in national standard Pakistani Urdu, authoritative yet engaging cadence.',
    defaultSpeed: 1.0,
    defaultPitch: 1.0,
    sampleTextUrdu: 'ناظرین کرام! اس وقت کی اہم ترین خبر۔ قومی معیشت میں مثبت پیش رفت کے بعد روپے کی قدر میں نمایاں بہتری ریکارڈ کی گئی ہے۔',
    sampleTextRoman: 'Nazreen-e-karam! Is waqt ki ahem tareen khabar. Qaumi maeeshat mein numayan behtari record ki gayi hai.'
  },
  {
    id: 'ayesha_story',
    nameUrdu: 'عائشہ رحمان',
    nameEn: 'Ayesha Rehman',
    gender: 'female',
    region: 'کراچی / لاہور (شیریں وائس)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    badge: 'یوٹیوب و داستان گو',
    taglineUrdu: 'شیریں، پرکشش اور جاندار کہانی نویس آواز',
    taglineEn: 'Melodious, warm & expressive voice for YouTube videos, stories & audiobooks',
    bestFor: ['یوٹیوب ویڈیوز', 'کہانیاں اور ناول', 'پوڈکاسٹ'],
    geminiVoice: 'Kore',
    speechStyleDescription: 'Warm, melodious Pakistani female narrator with clear Urdu diction, engaging cadence and natural vocal expressions.',
    defaultSpeed: 1.0,
    defaultPitch: 1.0,
    sampleTextUrdu: 'السلام علیکم دوستو! امید ہے آپ سب خیریت سے ہوں گے۔ آج کی اس دلچسپ ویڈیو میں ہم ایک ایسے راز سے پردہ اٹھائیں گے جس نے سب کو حیران کر دیا ہے۔',
    sampleTextRoman: 'Salam dosto! Umeed hai aap sab khairiyat se honge. Aaj ki is dilchasp video mein hum aik ahem raaz janenge.'
  },
  {
    id: 'bilal_rj',
    nameUrdu: 'بلال چوہان',
    nameEn: 'Bilal Chouhan',
    gender: 'male',
    region: 'لاہور (ریڈیو آر جے و کمرشل)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    badge: 'ریڈیو آر جے و اشتہارات',
    taglineUrdu: 'پرجوش، تیز رفتار اور دلکش کمرشل وائس',
    taglineEn: 'Energetic, modern Pakistani Radio RJ & dynamic commercial advertisements voice',
    bestFor: ['ریڈیو اشتہارات', 'ٹک ٹاک اور ریلز', 'سیلز اور پروموشنل آڈیو'],
    geminiVoice: 'Puck',
    speechStyleDescription: 'High-energy, charismatic Pakistani commercial voice. Enthusiastic Radio RJ style, fast-paced, vibrant, modern Pakistani youth cadence.',
    defaultSpeed: 1.05,
    defaultPitch: 1.05,
    sampleTextUrdu: 'ارے رکیں! کیا آپ بھی پاکستان کا بہترین ڈیل تلاش کر رہے ہیں؟ تو دیر کس بات کی! ابھی آرڈر کریں اور پائیں پچاس فیصد تک شاندار رعایت!',
    sampleTextRoman: 'Arrey ruken! Kya aap bhi zabardast discount dhoond rahe hain? Tou abhi order karein aur paen bumper discount!'
  },
  {
    id: 'fatima_doc',
    nameUrdu: 'ڈاکٹر فاطمہ نور',
    nameEn: 'Dr. Fatima Noor',
    gender: 'female',
    region: 'راولپنڈی / اسلام آباد',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    badge: 'تعلیمی و پروفیشنل',
    taglineUrdu: 'مہذب، متوازن اور علمی اندازِ بیان',
    taglineEn: 'Crisp, articulate educational voice for e-learning, health awareness & documentaries',
    bestFor: ['آن لائن کورسز', 'صحت اور آگاہی پیغامات', 'انفارمیشن ویڈیوز'],
    geminiVoice: 'Aoede',
    speechStyleDescription: 'Educated, articulate Pakistani female narrator. Calm, sophisticated, clear pacing suitable for university lectures and public service announcements.',
    defaultSpeed: 0.98,
    defaultPitch: 1.0,
    sampleTextUrdu: 'صحت مند زندگی کے اصولوں میں متوازن غذا اور روزانہ کی بنیاد پر جسمانی ورزش بنیادی اہمیت رکھتے ہیں۔ آئیے اس پر تفصیل سے بات کرتے ہیں۔',
    sampleTextRoman: 'Sehatmand zindagi ke asoolon mein mutawazan ghiza aur rozana warzish bunyadi ahmiyat rakhti hai.'
  },
  {
    id: 'zain_vlog',
    nameUrdu: 'زین خان',
    nameEn: 'Zain Khan',
    gender: 'male',
    region: 'فیصل آباد / کراچی (روزمرہ گپ شپ)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    badge: 'کاجوئل ولاگر و پوڈکاسٹ',
    taglineUrdu: 'دوستانہ، روزمرہ بول چال اور ریلیکس وائس',
    taglineEn: 'Casual, friendly young Pakistani vlogger style for social media & tech reviews',
    bestFor: ['ولاگز (Vlogs)', 'ٹیک ریویوز (Tech)', 'دوستانہ چیٹ'],
    geminiVoice: 'Charon',
    speechStyleDescription: 'Casual, friendly everyday Pakistani young adult speaking natural Urdu/Roman Urdu. Relaxed, conversational, relatable Pakistani street tone.',
    defaultSpeed: 1.02,
    defaultPitch: 0.98,
    sampleTextUrdu: 'یار سچ بتاؤں تو یہ فون واقعی کمال کا ہے! اس کی کیمرہ کوالٹی اور بیٹری ٹائمنگ نے مجھے بے حد متاثر کیا ہے۔ آپ کا کیا خیال ہے؟',
    sampleTextRoman: 'Yaar sach bataun tou yeh phone waqai kamal ka hai! Iski camera quality aur battery ne dil jeet liya.'
  },
  {
    id: 'sobia_poetry',
    nameUrdu: 'ثوبیہ کاظمی',
    nameEn: 'Sobia Kazmi',
    gender: 'female',
    region: 'پشاور / ایبٹ آباد (ادبی و ڈرامہ)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    badge: 'شاعری و ڈرامہ',
    taglineUrdu: 'جذباتی، پردرد اور ادبی مشاعرہ آواز',
    taglineEn: 'Soulful, poetic and deeply emotional voice for Urdu poetry, ghazals and audio dramas',
    bestFor: ['اردو شاعری و غزل', 'ڈرامہ وائس اوور', 'جذباتی کہانیاں'],
    geminiVoice: 'Kore',
    speechStyleDescription: 'Poetic, soulful Pakistani female orator. Deep emotional resonance, measured pauses, classical Urdu mushaira recitation style with expressive intonation.',
    defaultSpeed: 0.92,
    defaultPitch: 0.95,
    sampleTextUrdu: 'ستاروں سے آگے جہاں اور بھی ہیں، ابھی عشق کے امتحاں اور بھی ہیں۔ تہی زندگی سے نہیں یہ فضائیں، یہاں سینکڑوں کارواں اور بھی ہیں۔',
    sampleTextRoman: 'Sitaron se aagay jahan aur bhi hain, abhi ishq ke imtehan aur bhi hain.'
  },
  {
    id: 'chaudhry_elder',
    nameUrdu: 'چودھری صاحب',
    nameEn: 'Chaudhry Sahab',
    gender: 'male',
    region: 'پنجاب (روایتی باوقار بزرگ)',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    badge: 'بزرگانہ و روایتی',
    taglineUrdu: 'بھاری بھرکم، باوقار اور نصیحت آموز آواز',
    taglineEn: 'Deep baritone, authoritative & warm Pakistani elder voice with Punjabi-Urdu charm',
    bestFor: ['نصیحت و تاریخی کہانیاں', 'روایتی برانڈز', 'دیہی و علاقائی بیانیہ'],
    geminiVoice: 'Fenrir',
    speechStyleDescription: 'Deep, rich baritone of a respected Pakistani elder. Authoritative, dignified, grandfatherly warmth with subtle Punjabi warmth and deliberate wisdom.',
    defaultSpeed: 0.90,
    defaultPitch: 0.85,
    sampleTextUrdu: 'پتر! یاد رکھنا، محنت اور سچائی ہی انسان کی اصل کمائی ہے۔ جب نیت صاف ہو تو اللہ تعالیٰ خود راستے آسان فرما دیتا ہے۔',
    sampleTextRoman: 'Puttar! Yaad rakhna, mehnat aur sachai hi insaan ki asal kamai hai. Jab niyat saaf ho tou Allah raste banata hai.'
  },
  {
    id: 'mariam_calm',
    nameUrdu: 'مریم بلوچ',
    nameEn: 'Mariam Baloch',
    gender: 'female',
    region: 'کوئٹہ / سوات (دھیمی و پرسکون)',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    badge: 'دھیمی و مراقبہ',
    taglineUrdu: 'انتہائی پرسکون، دھیمی اور آرام دہ آواز',
    taglineEn: 'Whisper-soft, soothing & gentle voice for relaxation, sleep stories & bedtime',
    bestFor: ['پرسکون آڈیو بکس', 'نیند کی کہانیاں', 'ذہنی سکون و مراقبہ'],
    geminiVoice: 'Zephyr',
    speechStyleDescription: 'Ultra-gentle, soothing Pakistani female voice. Soft-spoken, relaxing cadence, calm breaths, perfect for bedtime stories and mindfulness.',
    defaultSpeed: 0.92,
    defaultPitch: 1.0,
    sampleTextUrdu: 'اپنی آنکھیں بند کر لیجیے اور ایک گہرا سانس لیں۔ سارا دن کی تھکاوٹ کو بھول کر سکون کی ایک پرامن دنیا میں داخل ہو جائیں۔',
    sampleTextRoman: 'Apni aankhein band kar lein aur aik gehra saans lein. Saare din ki thakawat bhula kar sukoon mehsoos karein.'
  }
];

export const VOICE_EMOTIONS: VoiceEmotionOption[] = [
  {
    id: 'professional',
    labelUrdu: 'پیشہ ورانہ / سنجیدہ',
    labelEn: 'Professional & Clear',
    icon: 'fa-briefcase',
    description: 'نیوز اینکر، دفتری پریزنٹیشن اور سرکاری اعلانات کے لیے'
  },
  {
    id: 'storyteller',
    labelUrdu: 'داستان گو / کہانی',
    labelEn: 'Storyteller / Narrative',
    icon: 'fa-book-open',
    description: 'دلچسپ کہانیاں، واقعات اور تاریخی قصوں کے لیے'
  },
  {
    id: 'energetic',
    labelUrdu: 'پرجوش / کمرشل',
    labelEn: 'Energetic / Commercial',
    icon: 'fa-bolt',
    description: 'اشتہارات، یوٹیوب انٹرو اور پرجوش گفتگو کے لیے'
  },
  {
    id: 'poetic',
    labelUrdu: 'شاعری / ادبی',
    labelEn: 'Poetic / Mushaira',
    icon: 'fa-feather',
    description: 'غزلیں، نظمیں، مشاعرہ اور جذباتی مکالمے'
  },
  {
    id: 'cheerful',
    labelUrdu: 'خوشگوار / دوستانہ',
    labelEn: 'Cheerful & Friendly',
    icon: 'fa-face-smile',
    description: 'دوستانہ ولاگز، سوشل میڈیا اور عام چیٹ'
  },
  {
    id: 'calm',
    labelUrdu: 'پرسکون / دھیمی',
    labelEn: 'Calm & Soothing',
    icon: 'fa-spa',
    description: 'نیند کی کہانیاں، مراقبہ اور آرام دہ بیانیہ'
  },
  {
    id: 'dramatic',
    labelUrdu: 'ڈرامائی / سسپنس',
    labelEn: 'Dramatic / Mystery',
    icon: 'fa-masks-theater',
    description: 'پراسرار کہانیاں، سسپنس اور ڈرامہ سین'
  }
];

export const SCRIPT_PRESETS: ScriptPreset[] = [
  {
    id: 'preset_news_1',
    categoryUrdu: 'خبریں',
    categoryEn: 'Breaking News',
    titleUrdu: 'تازہ ترین ہیڈلائنز',
    titleEn: 'National News Bulletin',
    textUrdu: 'ناظرین کرام! اسلام آباد سے موصول ہونے والی تازہ ترین اطلاعات کے مطابق، وفاقی حکومت نے عوامی سہولت کے لیے نئے ترقیاتی منصوبوں کی منظوری دے دی ہے۔ تفصیلات کے مطابق اس منصوبے سے ہزاروں نوجوانوں کو روزگار کے نئے مواقع میسر آئیں گے۔',
    textRoman: 'Nazreen-e-karam! Islamabad se mausool hone wali taaza tareen ittilaat ke mutabiq, hakoomat ne awami sahulat ke naye mansoobay manzoor kar liye hain.',
    recommendedVoiceId: 'hamza_news',
    recommendedEmotion: 'professional'
  },
  {
    id: 'preset_poetry_1',
    categoryUrdu: 'شاعری',
    categoryEn: 'Urdu Poetry',
    titleUrdu: 'علامہ اقبال کی فکر انگیز شاعری',
    titleEn: 'Allama Iqbal Kalam',
    textUrdu: 'ستاروں سے آگے جہاں اور بھی ہیں\nابھی عشق کے امتحاں اور بھی ہیں\nقناعت نہ کر عالم رنگ و بو پر\nچمن اور بھی آشیاں اور بھی ہیں\nاگر کھو گیا اک نشیمن تو کیا غم\nمقاماتِ آہ و فغاں اور بھی ہیں!',
    textRoman: 'Sitaron se aagay jahan aur bhi hain, abhi ishq ke imtehan aur bhi hain. Qanaat na kar aalam-e-rang-o-boo par, chaman aur bhi aashiyan aur bhi hain.',
    recommendedVoiceId: 'sobia_poetry',
    recommendedEmotion: 'poetic'
  },
  {
    id: 'preset_youtube_1',
    categoryUrdu: 'یوٹیوب',
    categoryEn: 'YouTube Intro',
    titleUrdu: 'یوٹیوب ویڈیو انٹرو و سبسکرائب',
    titleEn: 'YouTube Channel Intro',
    textUrdu: 'السلام علیکم دوستو! خوش آمدید ہمارے چینل پر۔ اگر آپ پہلی بار آئے ہیں تو چینل کو سبسکرائب کرنا اور بیل آئیکن کو دبانا بالکل مت بھولیے گا۔ آج کی اس ویڈیو میں ہم آپ کو بتائیں گے کچھ ایسے زبردست حقائق جو آپ کے ہوش اڑا دیں گے۔ ویڈیو کو آخر تک لازمی دیکھیے گا!',
    textRoman: 'Salam dosto! Welcome hamare channel par. Agar aap pehli baar aye hain tou channel ko zaroor subscribe karein aur bell icon dabana mat bhooliye ga!',
    recommendedVoiceId: 'ayesha_story',
    recommendedEmotion: 'cheerful'
  },
  {
    id: 'preset_ad_1',
    categoryUrdu: 'اشتہار',
    categoryEn: 'Commercial Ad',
    titleUrdu: 'زبردست سیل اور ڈسکاؤنٹ',
    titleEn: 'Super Discount Sale',
    textUrdu: 'دھماکہ خیز آفر! پاکستان کی سب سے بڑی سیل کا آغاز ہو چکا ہے۔ تمام ورائٹی پر پچاس فیصد تک کی زبردست چھوٹ! یہ موقع بار بار نہیں آتا، اپنے قریبی اسٹور کا رخ کریں یا ابھی آن لائن شاپنگ کریں، کیش آن ڈیلیوری کی سہولت کے ساتھ!',
    textRoman: 'Dhamaka offer! Pakistan ki sab se bari sale ka aaghaz ho chuka hai. Tamam items par 50% discount! Abhi order karein aur Cash on Delivery ki sahulat paen!',
    recommendedVoiceId: 'bilal_rj',
    recommendedEmotion: 'energetic'
  },
  {
    id: 'preset_story_1',
    categoryUrdu: 'داستان',
    categoryEn: 'Classic Story',
    titleUrdu: 'پرانی یادیں اور بزرگوں کی بات',
    titleEn: 'Wisdom of Elders',
    textUrdu: 'ایک دفعہ کا ذکر ہے، دریائے چناب کے کنارے ایک خوبصورت چھوٹا سا گاؤں آباد تھا۔ شام ڈھلتے ہی جب سورج کی سنہری کرنیں پانی پر پڑتیں تو سارا منظر سونے جیسا جگمگا اٹھتا تھا۔ وہاں کے بزرگ اکثر نوجوانوں کو نصیحت کیا کرتے تھے کہ سچائی اور صبر کا دامن کبھی نہ چھوڑنا۔',
    textRoman: 'Aik dafa ka zikr hai, daryae Chenab ke kinare aik khubsurat gaon aabad tha. Sham dhalte hi sunheri kirnein paani par partin tou sara manzar chamak uthta tha.',
    recommendedVoiceId: 'chaudhry_elder',
    recommendedEmotion: 'storyteller'
  },
  {
    id: 'preset_roman_1',
    categoryUrdu: 'رومن اردو',
    categoryEn: 'Roman Urdu Vlog',
    titleUrdu: 'ڈیلی ولاگ اور فوڈ اسٹریٹ',
    titleEn: 'Daily Vlog & Food Street',
    textUrdu: 'سلام دوستو! آج ہم موجود ہیں لاہور کی مشہور و معروف فوڈ اسٹریٹ پر۔ یہاں کی گرم گرم کڑاہی اور تازہ نان کی خوشبو نے دل جیت لیا ہے۔ اگر آپ بھی کھانے کے شوقین ہیں تو کمنٹ سیکشن میں مجھے اپنا پسندیدہ کھانا ضرور بتائیے گا!',
    textRoman: 'Salam dosto! Aaj hum mojood hain Lahore ki mashhoor food street par. Yahan ki garma garam karahi aur taaza naan ka maza hi alag hai. Aap sab ko kaisa laga comments mein lazmi batayein!',
    recommendedVoiceId: 'zain_vlog',
    recommendedEmotion: 'cheerful'
  }
];
