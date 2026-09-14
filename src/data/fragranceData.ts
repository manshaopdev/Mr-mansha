import { FragranceItem } from '../types/fragrance';

export const FRAGRANCES_DATA: FragranceItem[] = [
  {
    id: 'perfume-royal-oud',
    nameUrdu: 'عود اسحاق رائل',
    nameEnglish: 'Ishaq Royal Oud',
    taglineUrdu: 'شاہانہ کمبوڈین عود، اطالوی بربرس اور خالص عنبر کا پرتعیش امتزاج',
    taglineEnglish: 'Regal Cambodian Oud, Italian Bergamot & Aged Ambergris',
    category: 'royal-oud',
    categoryLabelUrdu: 'شاہی عود و عربین',
    categoryLabelEnglish: 'Royal Oud & Oriental',
    pricePkr: 6500,
    originalPricePkr: 8500,
    bottleImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80',
    lifestyleImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&auto=format&fit=crop&q=80',
    concentration: 'Extrait de Parfum (35% Oil Concentration)',
    longevity: '16 - 24 گھنٹے (پورا دن دیرپا)',
    projection: 'طاقتور اور شاہانہ سلیج (Huge Projection)',
    availableSizes: [
      { sizeMl: 50, label: '50ml ریگولر باٹل', pricePkr: 4800, originalPricePkr: 6000 },
      { sizeMl: 100, label: '100ml پرتعیش شاہی باٹل', pricePkr: 6500, originalPricePkr: 8500 },
      { sizeMl: 10, label: '10ml پاکٹ پرفیوم اٹومائزر', pricePkr: 1450, originalPricePkr: 1950 }
    ],
    scentPyramid: {
      topNotes: ['بربرس اورنج', 'خام الائچی', 'پنک پیپر'],
      heartNotes: ['کمبوڈین اگر ووڈ (عود)', 'دھواں دار پچولی', 'دیودار (سیڈار)'],
      baseNotes: ['خالص عنبر', 'میٹھا ونیلا بوڑبون', 'مسک']
    },
    descriptionUrdu: 'اسحاق رائل عود ہمارا فلیگ شپ ماسٹر پیس ہے۔ یہ خاص تقاریب، شادیوں اور شاہانہ محافل کے لیے تیار کیا گیا ہے۔ کپڑوں پر اس کی خوشبو اگلے دن تک تروتازہ رہتی ہے۔',
    descriptionEnglish: 'Our flagship prestige extrait de parfum. Blended with authentic aged Cambodian Oud, rare wild spices, and opulent bourbon amber for an unforgettable royal presence.',
    idealFor: ['شادی بیاہ اور خصوصی محافل', 'سردیوں کی شامیں', 'رائل پرسنالٹی'],
    rating: 4.95,
    reviewCount: 148,
    isBestSeller: true,
    isNewArrival: false,
    inStock: true
  },
  {
    id: 'perfume-amber-nuit',
    nameUrdu: 'امبر نائٹ',
    nameEnglish: 'Amber Nuit',
    taglineUrdu: 'گرم عنبر، کشمیری زعفران اور فرینچ ٹونکا بین کا طلسماتی جادو',
    taglineEnglish: 'Warm Golden Amber, Kashmiri Saffron & French Tonka Bean',
    category: 'woody-amber',
    categoryLabelUrdu: 'ووڈی و گولڈن امبر',
    categoryLabelEnglish: 'Woody & Amber',
    pricePkr: 4800,
    originalPricePkr: 6200,
    bottleImage: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&auto=format&fit=crop&q=80',
    lifestyleImage: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=800&auto=format&fit=crop&q=80',
    concentration: 'Eau de Parfum (25% Oil Concentration)',
    longevity: '14 - 16 گھنٹے',
    projection: 'محسوس کن اور مسحور کن کشش',
    availableSizes: [
      { sizeMl: 50, label: '50ml ریگولر باٹل', pricePkr: 3600, originalPricePkr: 4500 },
      { sizeMl: 100, label: '100ml بڑی باٹل', pricePkr: 4800, originalPricePkr: 6200 },
      { sizeMl: 10, label: '10ml ٹریول سپرے', pricePkr: 1200, originalPricePkr: 1600 }
    ],
    scentPyramid: {
      topNotes: ['کشمیری زعفران', 'دارچینی', 'لیموں چھلکا'],
      heartNotes: ['گولڈن امبر', 'صندل ووڈ', 'کاکاو پھول'],
      baseNotes: ['وینلا کا بیج', 'مسک ابلق', 'اوکموس']
    },
    descriptionUrdu: 'ایک مسحور کن اور پُروقار خوشبو جو ہر گزرتے لمحے کے ساتھ کھلتی ہے۔ اس کی میٹھی اور گہری عنبر کی مہک اردگرد کے لوگوں کو داد دینے پر مجبور کر دیتی ہے۔',
    descriptionEnglish: 'A hypnotic, warm resinous fragrance anchored by deep golden amber and velvety saffron that leaves an exquisite and intoxicating scent trail.',
    idealFor: ['نائٹ آؤٹ اور ڈنر', 'رومانٹک مواقع', 'سرد موسم'],
    rating: 4.88,
    reviewCount: 112,
    isBestSeller: true,
    isNewArrival: false,
    inStock: true
  },
  {
    id: 'perfume-velvet-rose',
    nameUrdu: 'ویلویٹ روز اینڈ دمشق',
    nameEnglish: 'Velvet Rose & Damascus',
    taglineUrdu: 'دمشقی گلاب، میٹھی پرالین اور دھواں دار عود کا رومانوی گلدستہ',
    taglineEnglish: 'Damascene Rose Petals, Sweet Praline & Smoky Agarwood',
    category: 'french-floral',
    categoryLabelUrdu: 'فرینچ فلورل',
    categoryLabelEnglish: 'French Floral',
    pricePkr: 4200,
    originalPricePkr: 5500,
    bottleImage: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&auto=format&fit=crop&q=80',
    lifestyleImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop&q=80',
    concentration: 'Eau de Parfum',
    longevity: '12 - 15 گھنٹے',
    projection: 'خوبصورت اور دلکش سلیج',
    availableSizes: [
      { sizeMl: 50, label: '50ml باٹل', pricePkr: 3200, originalPricePkr: 4000 },
      { sizeMl: 100, label: '100ml باٹل', pricePkr: 4200, originalPricePkr: 5500 },
      { sizeMl: 10, label: '10ml ٹریول سائز', pricePkr: 1100, originalPricePkr: 1500 }
    ],
    scentPyramid: {
      topNotes: ['دمشقی تازہ گلاب', 'سرخ لونگ', 'برگاموٹ'],
      heartNotes: ['ترک گلاب کی پنکھڑیاں', 'پرالین چاکلیٹ', 'میگنوولیا'],
      baseNotes: ['عود عراقی', 'سفید کستوری', 'صندل']
    },
    descriptionUrdu: 'نازک گلابوں کی رانی خوشبو۔ اس میں عام گلاب کی تیزی نہیں بلکہ ایک نرم، ملائم اور شاہانہ مٹھاس ہے جو ہر مرد و زن کے ذوق کے مطابق ہے۔',
    descriptionEnglish: 'A masterwork of velvety crimson roses blended with smoky oriental oud and decadent praline. Elegant, sensual, and universally adored.',
    idealFor: ['شادی و تقریبات', 'خواتین اور سلیقہ مند حضرات', 'سارا سال'],
    rating: 4.92,
    reviewCount: 94,
    isBestSeller: false,
    isNewArrival: true,
    inStock: true
  },
  {
    id: 'perfume-citrus-vert',
    nameUrdu: 'سیٹرس ویرٹ اینڈ برگاموٹ',
    nameEnglish: 'Citrus Vert & Bergamot',
    taglineUrdu: 'اطالوی لیمن، مینڈارن اور سمندری ہوا کا تروتازہ اور توانائی بخش جھونکا',
    taglineEnglish: 'Calabrian Bergamot, Crisp Mandarin & Ocean Breeze',
    category: 'fresh-citrus',
    categoryLabelUrdu: 'فریش و سمر لائم',
    categoryLabelEnglish: 'Fresh Citrus',
    pricePkr: 3850,
    originalPricePkr: 4950,
    bottleImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop&q=80',
    lifestyleImage: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&auto=format&fit=crop&q=80',
    concentration: 'Eau de Parfum (High Freshness Grade)',
    longevity: '10 - 12 گھنٹے (گرمیوں کے لحاظ سے شاندار)',
    projection: 'تازہ اور سرور بخش',
    availableSizes: [
      { sizeMl: 50, label: '50ml باٹل', pricePkr: 2900, originalPricePkr: 3800 },
      { sizeMl: 100, label: '100ml باٹل', pricePkr: 3850, originalPricePkr: 4950 },
      { sizeMl: 10, label: '10ml منی سپرے', pricePkr: 950, originalPricePkr: 1300 }
    ],
    scentPyramid: {
      topNotes: ['اطالوی برگاموٹ', 'سسلیئن لیموں', 'ہرا سیب'],
      heartNotes: ['پودینہ کے پتے', 'نیوی میرین سیلٹ', 'جیسمین'],
      baseNotes: ['سفید عنبر', 'سیڈار ووڈ', 'کستوری']
    },
    descriptionUrdu: 'گرمیوں کے تپتے موسم میں ٹھنڈک اور تازگی کا احساس۔ یہ دفتر، جم اور روزمرہ کے استعمال کے لیے پاکستان کی سب سے پسندیدہ تازہ خوشبو ہے۔',
    descriptionEnglish: 'An invigorating blast of sparkling Calabrian citrus and marine aquatic notes engineered specifically for intense warm climates. Ultra-refreshing and crisp.',
    idealFor: ['گرمیوں کا موسم', 'دفتر اور دفتری میٹنگز', 'روزمرہ فریشنس'],
    rating: 4.82,
    reviewCount: 86,
    isBestSeller: true,
    isNewArrival: false,
    inStock: true
  },
  {
    id: 'perfume-white-musk',
    nameUrdu: 'وائٹ مسک ایمپیرئیل',
    nameEnglish: 'White Musk Imperial',
    taglineUrdu: 'خالص پاکیزہ سفید کستوری، صندل اور سفید پھولوں کی پرسکون مہک',
    taglineEnglish: 'Pure Heavenly White Musk, Powdery Orris & Sandalwood',
    category: 'pure-attar',
    categoryLabelUrdu: 'خالص مسک و کستوری',
    categoryLabelEnglish: 'White Musk & Attar',
    pricePkr: 3950,
    originalPricePkr: 5200,
    bottleImage: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80',
    lifestyleImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80',
    concentration: 'Extrait de Parfum',
    longevity: '14 - 18 گھنٹے',
    projection: 'نرم، دل کو چھو لینے والی اور پرسکون',
    availableSizes: [
      { sizeMl: 50, label: '50ml باٹل', pricePkr: 3100, originalPricePkr: 4100 },
      { sizeMl: 100, label: '100ml باٹل', pricePkr: 3950, originalPricePkr: 5200 },
      { sizeMl: 10, label: '10ml پاکٹ پرفیوم', pricePkr: 1050, originalPricePkr: 1400 }
    ],
    scentPyramid: {
      topNotes: ['سفید یاسمین', 'پاؤڈری اورس', 'نرگس'],
      heartNotes: ['رائل وائٹ مسک', 'بادام کا شیرہ', 'موتیا'],
      baseNotes: ['سفید صندل', 'امبرکسان', 'کشمیرن']
    },
    descriptionUrdu: 'ایک پاکیزہ اور انتہائی صوفیانہ خوشبو جو ذہن کو سکون بخشتی ہے۔ نماز، جمعہ مبارک اور روزانہ کے معمولات کے لیے بے مثال انتخاب۔',
    descriptionEnglish: 'A pristine, ethereal white musk wrapped in silky powdery orris and creamy Mysore sandalwood. Soothing, clean, and intimately luxurious.',
    idealFor: ['نماز و عبادات', 'روزانہ آفس', 'پرسکون ماحول'],
    rating: 4.96,
    reviewCount: 165,
    isBestSeller: true,
    isNewArrival: false,
    inStock: true
  },
  {
    id: 'perfume-tobacco-vanille',
    nameUrdu: 'تمباکو ونیلا لکس',
    nameEnglish: 'Tobacco Vanille Luxe',
    taglineUrdu: 'کیوبا کا پریمیم تمباکو لیف، میٹھی ونیلا اور ڈرائی فروٹس کا شاہکار',
    taglineEnglish: 'Cuban Tobacco Leaf, Rich Madagascar Vanilla & Dry Fruits',
    category: 'woody-amber',
    categoryLabelUrdu: 'ووڈی و گولڈن امبر',
    categoryLabelEnglish: 'Woody & Amber',
    pricePkr: 5400,
    originalPricePkr: 7000,
    bottleImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80',
    lifestyleImage: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=800&auto=format&fit=crop&q=80',
    concentration: 'Extrait de Parfum',
    longevity: '18 - 24 گھنٹے',
    projection: 'طاقتور اور جاذبِ نظر',
    availableSizes: [
      { sizeMl: 50, label: '50ml باٹل', pricePkr: 4100, originalPricePkr: 5200 },
      { sizeMl: 100, label: '100ml باٹل', pricePkr: 5400, originalPricePkr: 7000 },
      { sizeMl: 10, label: '10ml ٹریول اٹومائزر', pricePkr: 1350, originalPricePkr: 1800 }
    ],
    scentPyramid: {
      topNotes: ['تمباکو کا تازہ پتہ', 'مسالے دار دارچینی', 'ادرک'],
      heartNotes: ['میڈاگاسکر ونیلا', 'کاکاو بین', 'ٹونکا'],
      baseNotes: ['ڈرائی فروٹس نوٹ', 'امبر ووڈ', 'صندل']
    },
    descriptionUrdu: 'امارت اور وقار کی پہچان۔ اس کی گہری اور میٹھی گرم مہک محفل میں آپ کی موجودگی کو الگ اور ممتاز بنا دیتی ہے۔',
    descriptionEnglish: 'A warm, decadent, aristocratic blend of rich pipe tobacco, creamy vanilla bean, and honeyed dry fruit accords. Unabashedly opulent.',
    idealFor: ['سردیوں کی راتیں', 'بزنس میٹنگز اور ایونٹس', 'طاقتور تاثر'],
    rating: 4.91,
    reviewCount: 78,
    isBestSeller: false,
    isNewArrival: true,
    inStock: true
  },
  {
    id: 'perfume-sultan-oud-attar',
    nameUrdu: 'سلطان العود (خالص عطر)',
    nameEnglish: 'Sultan Al Oud Pure Attar',
    taglineUrdu: '100% الکحل سے پاک خالص عربی عود اور دیودار کا نایاب آئل',
    taglineEnglish: '100% Alcohol-Free Pure Arabian Concentrated Perfume Oil',
    category: 'pure-attar',
    categoryLabelUrdu: 'خالص مسک و کستوری',
    categoryLabelEnglish: 'Attar & Pure Oils',
    pricePkr: 5800,
    originalPricePkr: 7500,
    bottleImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&auto=format&fit=crop&q=80',
    lifestyleImage: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80',
    concentration: 'Pure Concentrated Perfume Oil (Attar)',
    longevity: '24+ گھنٹے (نہانے کے بعد بھی قائم)',
    projection: 'غیر معمولی روایتی خوشبو',
    availableSizes: [
      { sizeMl: 12, label: '1 تولہ (12ml) کرسٹل باٹل', pricePkr: 5800, originalPricePkr: 7500 },
      { sizeMl: 6, label: 'آدھا تولہ (6ml) رول آن', pricePkr: 3200, originalPricePkr: 4200 }
    ],
    scentPyramid: {
      topNotes: ['ہندی اگر ووڈ', 'کستوری', 'زعفران'],
      heartNotes: ['اسحاق اسپیشل عود بلینڈ', 'میور صندل', 'عنبر شمس'],
      baseNotes: ['بوڑھی لکڑی کا تیل', 'تیرگی عود', 'صوفیانہ مسک']
    },
    descriptionUrdu: 'خالص روایتی شائقین کے لیے بغیر کسی کیمیکل یا الکحل کے تیار کردہ خاص عطر۔ نبض پر لگاتے ہی روح کو معطر کر دینے والی خوشبو۔',
    descriptionEnglish: 'For the true connoisseur. A 100% alcohol-free concentrated perfume oil with unmatched staying power, delivered in a luxurious cut-crystal bottle.',
    idealFor: ['روایتی محافل', 'جمعہ و دینی تقریبات', 'تحفہ و سوغات'],
    rating: 4.98,
    reviewCount: 130,
    isBestSeller: true,
    isNewArrival: false,
    inStock: true
  },
  {
    id: 'perfume-saffron-noir',
    nameUrdu: 'زعفران نوئر',
    nameEnglish: 'Saffron Noir',
    taglineUrdu: 'کشمیری خالص زعفران، کالی بیری اور تپتی لکڑی کا جادوئی رچ بلینڈ',
    taglineEnglish: 'Kashmiri Black Saffron, Wild Juniper Berry & Smoked Leather',
    category: 'royal-oud',
    categoryLabelUrdu: 'شاہی عود و عربین',
    categoryLabelEnglish: 'Royal Oud & Oriental',
    pricePkr: 5200,
    originalPricePkr: 6800,
    bottleImage: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&auto=format&fit=crop&q=80',
    lifestyleImage: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&auto=format&fit=crop&q=80',
    concentration: 'Extrait de Parfum',
    longevity: '14 - 18 گھنٹے',
    projection: 'دلچسپ اور پُراسرار',
    availableSizes: [
      { sizeMl: 50, label: '50ml باٹل', pricePkr: 3900, originalPricePkr: 4900 },
      { sizeMl: 100, label: '100ml باٹل', pricePkr: 5200, originalPricePkr: 6800 },
      { sizeMl: 10, label: '10ml ٹریول سپرے', pricePkr: 1300, originalPricePkr: 1750 }
    ],
    scentPyramid: {
      topNotes: ['بلیک سیفرون', 'جونیپر بیری', 'چکوترہ'],
      heartNotes: ['سیاہ چمڑا (بلیک لیدر)', 'کرسٹل وائلٹ', 'گلاب'],
      baseNotes: ['راسپ بیری', 'کشمیرن ووڈ', 'ویٹیور']
    },
    descriptionUrdu: 'ایک جدید اور پُراسرار خوشبو جو زعفران کی خوبصورتی کو کالی لیدر اور راسپ بیری کے ساتھ یکجا کرتی ہے۔ یہ آپ کی شخصیت کو ایک جادوئی دبدبہ بخشتی ہے۔',
    descriptionEnglish: 'A dark, brooding interpretation of Kashmiri saffron layered with soft leather, bittersweet juniper, and wild dark berries. Unforgettable character.',
    idealFor: ['خاص تقریبات', 'موسمِ سرما', 'پُراعتماد تاثر'],
    rating: 4.87,
    reviewCount: 65,
    isBestSeller: false,
    isNewArrival: true,
    inStock: true
  }
];

export const DISCOVERY_BOX_PRESETS = [
  {
    id: 'box-royal-trio',
    titleUrdu: 'رائل ٹریو کلیکشن (3 پیکس باکس)',
    titleEnglish: 'Royal Trio Discovery Box (3 x 20ml)',
    descriptionUrdu: 'عود اسحاق رائل + امبر نائٹ + وائٹ مسک ایمپیرئیل ایک لگژری گفٹ باکس میں',
    descriptionEnglish: 'Our top 3 best-selling fragrances in 20ml luxury travel atomizers packed in royal gold box.',
    pricePkr: 4900,
    originalPricePkr: 6800,
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&auto=format&fit=crop&q=80',
    includedFragranceIds: ['perfume-royal-oud', 'perfume-amber-nuit', 'perfume-white-musk']
  }
];
