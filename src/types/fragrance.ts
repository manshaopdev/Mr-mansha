export type ScentCategory =
  | 'all'
  | 'royal-oud'
  | 'french-floral'
  | 'fresh-citrus'
  | 'woody-amber'
  | 'pure-attar';

export interface ScentSizeOption {
  sizeMl: number;
  label: string;
  pricePkr: number;
  originalPricePkr?: number;
}

export interface FragranceItem {
  id: string;
  nameUrdu: string;
  nameEnglish: string;
  taglineUrdu: string;
  taglineEnglish: string;
  category: 'royal-oud' | 'french-floral' | 'fresh-citrus' | 'woody-amber' | 'pure-attar';
  categoryLabelUrdu: string;
  categoryLabelEnglish: string;
  pricePkr: number;
  originalPricePkr: number;
  bottleImage: string;
  lifestyleImage: string;
  concentration: string;
  longevity: string;
  projection: string;
  availableSizes: ScentSizeOption[];
  scentPyramid: {
    topNotes: string[];
    heartNotes: string[];
    baseNotes: string[];
  };
  descriptionUrdu: string;
  descriptionEnglish: string;
  idealFor: string[];
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  inStock: boolean;
}

export interface CartItem {
  fragrance: FragranceItem;
  selectedSize: number;
  selectedPricePkr: number;
  quantity: number;
}

export interface CustomerOrder {
  customerName: string;
  phone: string;
  city: string;
  deliveryAddress: string;
  notes?: string;
  paymentMethod: 'cod' | 'jazzcash' | 'easypaisa' | 'bank';
  items: CartItem[];
  subtotalPkr: number;
  deliveryFeePkr: number;
  discountPkr: number;
  totalPkr: number;
}
