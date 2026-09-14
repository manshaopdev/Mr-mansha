import { Product, CurrencyConfig, CurrencyCode } from '../types/edenrobe';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  PKR: { code: 'PKR', symbol: 'Rs.', rate: 1 },
  USD: { code: 'USD', symbol: '$', rate: 0.0036 },
  AED: { code: 'AED', symbol: 'AED', rate: 0.0132 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.0028 },
};

export const PAKISTAN_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Bahawalpur',
  'Sargodha',
  'Abbottabad',
  'Mirpur (AJK)',
  'Sukkur',
  'Mardan',
];

export const EDENROBE_PRODUCTS: Product[] = [
  // --- WOMEN FESTIVE & LUXURY PRET ---
  {
    id: 'edn-w-01',
    title: 'Zafirah — Embroidered 3-Piece Raw Silk Suit',
    subtitle: 'Luxury Festive Pret Edition 2025',
    category: 'festive',
    subCategory: 'festive-pret',
    price: 8990,
    originalPrice: 14990,
    discountPercentage: 40,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=900&auto=format&fit=crop&q=85'
    ],
    fabric: 'Pure Raw Silk with Organza Dupatta',
    color: 'Royal Ochre Gold',
    colorHex: '#D4AF37',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'An ode to Mughal grandeur, featuring intricate tilla and resham thread embroidery on fine raw silk fabric. Paired with a delicate embroidered scalloped organza dupatta and tailored straight trousers with gold bead embellishments.',
    details: [
      'Embroidered Raw Silk Shirt (Front, Back & Sleeves)',
      'Handcrafted Cutwork Organza Border with Zari Detailing',
      'Digital Printed Foil Scalloped Dupatta (2.5 Meters)',
      'Dyed Silk Slim-fit Trousers with Embellished Hem',
      'Dry Clean Recommended'
    ],
    inStock: true,
    stockCount: 8,
    isNew: true,
    isBestseller: true,
    rating: 4.9,
    reviewsCount: 142,
    sku: 'EDN-W-25-ZAF01'
  },
  {
    id: 'edn-w-02',
    title: 'Mehrunisa — Embroidered Chiffon 3-Piece Suit',
    subtitle: 'Velvet Plum Evening Formal',
    category: 'women',
    subCategory: 'festive-pret',
    price: 9490,
    originalPrice: 15990,
    discountPercentage: 40,
    images: [
      'https://images.unsplash.com/photo-1583391733975-0210f1ce896d?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=900&auto=format&fit=crop&q=85'
    ],
    fabric: 'Fine Pure Crinkle Chiffon with Silk Slip',
    color: 'Velvet Plum',
    colorHex: '#581845',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Sophisticated deep jewel tones draped in crinkle chiffon. Adorned with delicate sequins, lustrous pearl tassels, and zari floral motifs around the neckline and daaman.',
    details: [
      'Sequined Chiffon Embroidered Front & Sleeves',
      'Dyed Grip Slip included',
      'Embroidered Chiffon Dupatta with 4-side lace border',
      'Raw Silk Classic Cigarette Pants',
      'Dry Clean Only'
    ],
    inStock: true,
    stockCount: 5,
    isNew: true,
    isBestseller: true,
    rating: 4.8,
    reviewsCount: 96,
    sku: 'EDN-W-25-MEH02'
  },
  {
    id: 'edn-w-03',
    title: 'Gul-e-Daudi — Summer Luxury Digital Lawn 3-Piece',
    subtitle: 'Signature Unstitched Lawn Collection',
    category: 'women',
    subCategory: 'unstitched',
    price: 4490,
    originalPrice: 6990,
    discountPercentage: 35,
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=85'
    ],
    fabric: '100% Superfine Combed Lawn with Chiffon Dupatta',
    color: 'Emerald & Ivory',
    colorHex: '#0B6623',
    sizes: ['Unstitched (3-Piece)'],
    description: 'Breathable and luxurious 80/80 luxury combed lawn with artisanal Persian floral prints. Comes with an embroidered organza neckline patch and matching printed voile chiffon dupatta.',
    details: [
      'Digital Printed Superfine Lawn Shirt (3.0 Meters)',
      'Organza Embroidered Neckline & Hem Patches',
      'Digital Printed Voile Chiffon Dupatta (2.5 Meters)',
      'Dyed Cambric Cotton Trousers (2.5 Meters)',
      'Fade-resistant reactive colors'
    ],
    inStock: true,
    stockCount: 22,
    isNew: false,
    isBestseller: true,
    rating: 4.7,
    reviewsCount: 184,
    sku: 'EDN-W-25-GUL03'
  },
  {
    id: 'edn-w-04',
    title: 'Samaa — Contemporary Printed Co-ord Set',
    subtitle: 'Modern Ready-to-Wear Daily Pret',
    category: 'women',
    subCategory: 'pret',
    price: 3690,
    originalPrice: 5290,
    discountPercentage: 30,
    images: [
      'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900&auto=format&fit=crop&q=85'
    ],
    fabric: 'Soft Viscose Poplin',
    color: 'Sapphire & Ecru',
    colorHex: '#1D2951',
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Effortless everyday elegance. A modern silhouette boxy collared tunic with side slits, matched seamlessly with wide-leg culotte trousers.',
    details: [
      'Relaxed Fit Button-Down Tunic Shirt',
      'Matching High-Waist Elasticated Culottes',
      'Wrinkle-resistant fabric with soft fall',
      'Machine Wash Cold'
    ],
    inStock: true,
    stockCount: 14,
    isNew: true,
    isBestseller: false,
    rating: 4.6,
    reviewsCount: 52,
    sku: 'EDN-W-25-SAM04'
  },
  {
    id: 'edn-w-05',
    title: 'Noor — Chikankari Pastel Embroidered Kurti',
    subtitle: 'Classic Heritage Stitched Kurti',
    category: 'sale',
    subCategory: 'pret',
    price: 2790,
    originalPrice: 5590,
    discountPercentage: 50,
    images: [
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&auto=format&fit=crop&q=85'
    ],
    fabric: 'Pure Cotton Chikankari with Cotton Lining',
    color: 'Powder Sky Blue',
    colorHex: '#87CEEB',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Breezy summer silhouette featuring traditional Lucknowi-style chikankari needlework with pearl buttons and bell sleeves.',
    details: [
      'Full Front Shadow Chikankari Threadwork',
      'Mother-of-Pearl Button Closure',
      'Soft Breathable Cambric Lining attached',
      'Side Slits with Embroidered Lace Trim'
    ],
    inStock: true,
    stockCount: 7,
    isNew: false,
    isBestseller: true,
    rating: 4.9,
    reviewsCount: 215,
    sku: 'EDN-W-25-NOO05'
  },

  // --- MEN'S EASTERN, KURTA & WAISTCOAT ---
  {
    id: 'edn-m-01',
    title: 'Sultan — Premium Egyptian Cotton Kameez Shalwar',
    subtitle: 'Royal Black Eastern Classic',
    category: 'men',
    subCategory: 'kameez-shalwar',
    price: 6490,
    originalPrice: 9990,
    discountPercentage: 35,
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop&q=85'
    ],
    fabric: '100% Extra Long Staple Giza Egyptian Cotton',
    color: 'Midnight Jet Black',
    colorHex: '#111111',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'The epitome of refined masculine poise. Crafted from genuine Giza Egyptian Cotton with liquid-ammonia finish for a permanent silky sheen. Tailored with a stiff band collar and subtle tonal embroidery on placket.',
    details: [
      'Pre-shrunk Extra Long Staple Egyptian Cotton',
      'Hard Interlining Stiff Mandarin Band Collar',
      'Signature edenrobe Engraved Metal Collar Studs',
      'Traditional Pakistani Pleated Shalwar with Drawstring',
      'Single Chest Pocket with Pen Slot'
    ],
    inStock: true,
    stockCount: 19,
    isNew: true,
    isBestseller: true,
    rating: 4.95,
    reviewsCount: 310,
    sku: 'EDN-M-25-SUL01'
  },
  {
    id: 'edn-m-02',
    title: 'Viceroy — Jacquard Banori Festive Waistcoat',
    subtitle: 'Imperial Navy & Gold Metal Buttons',
    category: 'festive',
    subCategory: 'waistcoat',
    price: 5290,
    originalPrice: 8990,
    discountPercentage: 41,
    images: [
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&auto=format&fit=crop&q=85'
    ],
    fabric: 'Banori Brocade Jacquard with Satin Lining',
    color: 'Imperial Navy Blue',
    colorHex: '#00205B',
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)'],
    description: 'Elevate your festive attire with this bespoke Banori jacquard waistcoat. Features an ornate woven damask motif, rounded mandarin collar, and gold-crested buttons.',
    details: [
      'Textured Self-Jacquard Weave',
      'Antiqued Brass Crested Buttons',
      'Chest Welt Pocket for Pocket Square',
      'Adjustable Back Belt for Custom Tailored Fit',
      'Internal Hidden Pocket'
    ],
    inStock: true,
    stockCount: 11,
    isNew: true,
    isBestseller: true,
    rating: 4.88,
    reviewsCount: 147,
    sku: 'EDN-M-25-VIC02'
  },
  {
    id: 'edn-m-03',
    title: 'Shehenshah — Textured Raw Silk Kurta Pajama',
    subtitle: 'Pearl Ivory Wedding Edition',
    category: 'men',
    subCategory: 'kurta',
    price: 5990,
    originalPrice: 9490,
    discountPercentage: 36,
    images: [
      'https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=900&auto=format&fit=crop&q=85'
    ],
    fabric: 'Subtle Slub Textured Raw Silk',
    color: 'Pearl Ivory White',
    colorHex: '#F5F5F0',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A timeless silhouette designed for Nikkah, Eid, and formal gatherings. Finished with delicate self-colored geometric threadwork along the neckline and cuffs.',
    details: [
      'Raw Silk Fabric with Natural Slub Texture',
      'Straight Fit Silhouette with Side Pockets',
      'Includes Matching Cotton Silk Churidar Pajama',
      'Cuff Sleeves with Matching Buttons'
    ],
    inStock: true,
    stockCount: 15,
    isNew: true,
    isBestseller: false,
    rating: 4.75,
    reviewsCount: 88,
    sku: 'EDN-M-25-SHE03'
  },
  {
    id: 'edn-m-04',
    title: 'Signature Easy-Care Wash & Wear Suit',
    subtitle: 'Wrinkle-Free Daily Eastern Wear',
    category: 'sale',
    subCategory: 'kameez-shalwar',
    price: 3890,
    originalPrice: 6490,
    discountPercentage: 40,
    images: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=900&auto=format&fit=crop&q=85'
    ],
    fabric: 'High-Twist Wash & Wear Micro-Poly Blend',
    color: 'Slate Charcoal Grey',
    colorHex: '#36454F',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Engineered for the modern Pakistani gentleman. Resists wrinkles, stays crisp through hot humid days, and requires zero starching.',
    details: [
      'Lightweight All-Weather Breathable Weave',
      'Wrinkle-Resistant Finish',
      'Standard Band Collar with Button Placket',
      'Spacious Classic Shalwar Cut'
    ],
    inStock: true,
    stockCount: 28,
    isNew: false,
    isBestseller: true,
    rating: 4.82,
    reviewsCount: 420,
    sku: 'EDN-M-25-WNW04'
  },

  // --- FRAGRANCES (edenrobe SCENTS) ---
  {
    id: 'edn-f-01',
    title: 'Oud Royale — Eau De Parfum 100ml',
    subtitle: 'Signature Luxury Arabic Oriental Scent',
    category: 'fragrances',
    subCategory: 'oud',
    price: 4990,
    originalPrice: 7990,
    discountPercentage: 38,
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=900&auto=format&fit=crop&q=85'
    ],
    fabric: 'Eau De Parfum (25% Oil Concentration)',
    color: 'Smoky Amber Gold',
    colorHex: '#C68642',
    sizes: ['100ml / 3.4 fl oz'],
    description: 'An intoxicating fusion of aged Cambodian Agarwood, Bulgarian Damascus Rose, and warm Cashmeran. Long-lasting sillage that commands presence in formal gatherings.',
    details: [
      'Top Notes: Taif Rose, Cardamom, Bergamot',
      'Heart Notes: Cambodian Oud, Saffron, Smoky Cedarwood',
      'Base Notes: Ambergris, Tonka Bean, Leather, Musk',
      'Longevity: 14+ Hours on Fabric',
      'Luxury Magnetic Cap with Velvet Box Packaging'
    ],
    inStock: true,
    stockCount: 34,
    isNew: true,
    isBestseller: true,
    rating: 4.96,
    reviewsCount: 380,
    sku: 'EDN-SC-OUD01'
  },
  {
    id: 'edn-f-02',
    title: 'Sultan Black — Intense Pour Homme 100ml',
    subtitle: 'Aromatic Woody & Spicy Eau De Parfum',
    category: 'fragrances',
    subCategory: 'eau-de-parfum',
    price: 4290,
    originalPrice: 6990,
    discountPercentage: 38,
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=900&auto=format&fit=crop&q=85'
    ],
    fabric: 'Eau De Parfum Pour Homme',
    color: 'Matte Obsidian Black',
    colorHex: '#1B1B1B',
    sizes: ['100ml / 3.4 fl oz'],
    description: 'Bold, charismatic, and magnetic. Sultan Black opens with crisp grapefruit and black pepper, diving into rich roasted coffee and Haitian vetiver.',
    details: [
      'Top Notes: Black Pepper, Grapefruit, Cardamom',
      'Heart Notes: Lavender, Coffee Bean, Cinnamon',
      'Base Notes: Vetiver, Patchouli, Dark Amber',
      'Projection: Strong 6-8 Feet',
      'Cruelty-free formulation'
    ],
    inStock: true,
    stockCount: 20,
    isNew: true,
    isBestseller: true,
    rating: 4.9,
    reviewsCount: 275,
    sku: 'EDN-SC-SUL02'
  },
  {
    id: 'edn-f-03',
    title: 'Velvet Mystique — Pour Femme 85ml',
    subtitle: 'Floral Gourmand with Sweet Vanilla',
    category: 'fragrances',
    subCategory: 'eau-de-parfum',
    price: 3990,
    originalPrice: 6290,
    discountPercentage: 36,
    images: [
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=900&auto=format&fit=crop&q=85'
    ],
    fabric: 'Eau De Parfum Pour Femme',
    color: 'Blush Rose Gold',
    colorHex: '#B76E79',
    sizes: ['85ml / 2.9 fl oz'],
    description: 'Enchanting and seductive. A lush blend of night-blooming jasmine, juicy red berries, and creamy bourbon vanilla resting on soft sandalwood.',
    details: [
      'Top Notes: Wild Berries, Italian Mandarin',
      'Heart Notes: Jasmine Sambac, Honeyed Orange Blossom',
      'Base Notes: Bourbon Vanilla, Caramel, White Musk',
      'Hypoallergenic mist pump'
    ],
    inStock: true,
    stockCount: 16,
    isNew: false,
    isBestseller: true,
    rating: 4.85,
    reviewsCount: 190,
    sku: 'EDN-SC-VEL03'
  },

  // --- JUNIORS (BOYS & GIRLS) ---
  {
    id: 'edn-j-01',
    title: 'Junior Prince — Boys Festive Kurta Shalwar & Waistcoat Set',
    subtitle: 'edenrobe Juniors Eid Collection',
    category: 'juniors',
    subCategory: 'juniors-boys',
    price: 4690,
    originalPrice: 7290,
    discountPercentage: 35,
    images: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1471286174890-9c112ffca56a?w=900&auto=format&fit=crop&q=85'
    ],
    fabric: 'Soft Cotton Kurta Shalwar with Brocade Waistcoat',
    color: 'Golden Camel & Maroon',
    colorHex: '#C19A6B',
    sizes: ['4-5 Yrs', '6-7 Yrs', '8-9 Yrs', '10-11 Yrs', '12-13 Yrs'],
    description: 'Dress your young prince in regal tradition. Includes a soft, non-itchy cotton kurta and shalwar, paired with a miniature gold-buttoned jacquard waistcoat.',
    details: [
      '3-Piece Complete Set (Kurta + Shalwar + Waistcoat)',
      '100% Skin-friendly Cotton base for maximum comfort',
      'Embroidered band collar and button placket',
      'Dry Clean or Gentle Hand Wash'
    ],
    inStock: true,
    stockCount: 12,
    isNew: true,
    isBestseller: true,
    rating: 4.9,
    reviewsCount: 112,
    sku: 'EDN-J-BOY01'
  },
  {
    id: 'edn-j-02',
    title: 'Princess Aara — Girls Layered Peplum & Sharara',
    subtitle: 'edenrobe Juniors Girls Festive Pret',
    category: 'juniors',
    subCategory: 'juniors-girls',
    price: 4990,
    originalPrice: 7990,
    discountPercentage: 37,
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=900&auto=format&fit=crop&q=85'
    ],
    fabric: 'Soft Net with Organza Flairs & Malai Crepe Lining',
    color: 'Coral Peony Pink',
    colorHex: '#FF7F7F',
    sizes: ['3-4 Yrs', '5-6 Yrs', '7-8 Yrs', '9-10 Yrs', '11-12 Yrs'],
    description: 'A fairy-tale festive ensemble for your little girl. Delicate gold sitara embroidery on the peplum bodice with ruffled net sharara and matching net dupatta.',
    details: [
      '3-Piece Girls Formal Outfit',
      'Fully lined with ultra-soft Malai Crepe (No itching)',
      'Gold Gota Patti Borders on Sharara flairs',
      'Back concealed zipper for easy dressing'
    ],
    inStock: true,
    stockCount: 9,
    isNew: true,
    isBestseller: true,
    rating: 4.88,
    reviewsCount: 94,
    sku: 'EDN-J-GIR02'
  }
];

export const PROMO_CODES: Record<string, { discountPercent: number; minSpend: number; description: string }> = {
  EDEN10: { discountPercent: 10, minSpend: 2000, description: '10% OFF on all items' },
  FESTIVE20: { discountPercent: 20, minSpend: 8000, description: '20% OFF on Festive Pret orders above Rs. 8,000' },
  FREESHIP: { discountPercent: 0, minSpend: 0, description: 'Free Standard Delivery' }
};

export const EDEN_STORES = [
  { city: 'Karachi', mall: 'Dolmen Mall Clifton', address: '1st Floor, Marine Drive Block 4 Clifton', phone: '021-35293841' },
  { city: 'Karachi', mall: 'Lucky One Mall', address: 'Ground Floor, Main Rashid Minhas Rd', phone: '021-37181023' },
  { city: 'Lahore', mall: 'Packages Mall', address: 'Level 1, Walton Road, Lahore', phone: '042-38302190' },
  { city: 'Lahore', mall: 'Emporium Mall', address: 'Ground Floor, Johar Town Lahore', phone: '042-32592000' },
  { city: 'Islamabad', mall: 'Centaurus Mall', address: '2nd Floor, Jinnah Avenue F-8', phone: '051-2601789' },
  { city: 'Faisalabad', mall: 'Lyallpur Galleria', address: 'East Canal Road, Faisalabad', phone: '041-8501234' },
  { city: 'Peshawar', mall: 'Deans Trade Center', address: 'Cantonment Area, Peshawar', phone: '091-5278100' }
];
