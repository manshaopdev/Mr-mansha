export type Currency = 'PKR' | 'USD';

export type SellerLevel = 'Top Rated Seller' | 'Level 2 Seller' | 'Level 1 Seller' | 'Prime Pro' | 'Fiverr Choice';

export type GigCategory = 
  | 'All Categories'
  | 'Graphics & Design'
  | 'Programming & Tech'
  | 'Digital Marketing'
  | 'Video & Animation'
  | 'AI Services'
  | 'Writing & Translation'
  | 'Business';

export interface PackageFeature {
  name: string;
  included: boolean;
}

export interface GigPackageTier {
  name: 'Basic' | 'Standard' | 'Premium';
  title: string;
  description: string;
  deliveryDays: number;
  revisions: string;
  pricePkr: number;
  priceUsd: number;
  features: PackageFeature[];
}

export interface GigReview {
  id: string;
  author: string;
  country: string;
  countryFlag?: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface GigFaq {
  question: string;
  answer: string;
}

export interface Seller {
  id: string;
  name: string;
  username: string;
  avatar: string;
  level: SellerLevel;
  country: string;
  memberSince: string;
  avgResponseTime: string;
  lastDelivery: string;
  rating: number;
  reviewsCount: number;
  bio: string;
  languages: string[];
  skills: string[];
  isPro?: boolean;
}

export interface Gig {
  id: string;
  title: string;
  slug: string;
  category: GigCategory;
  subCategory: string;
  seller: Seller;
  rating: number;
  reviewsCount: number;
  ordersInQueue: number;
  startingPricePkr: number;
  startingPriceUsd: number;
  badge?: 'Prime Choice' | 'Pro Verified' | 'Top Rated' | 'Best Seller' | null;
  images: string[];
  description: string;
  packages: {
    basic: GigPackageTier;
    standard: GigPackageTier;
    premium: GigPackageTier;
  };
  faqs: GigFaq[];
  reviews: GigReview[];
  tags: string[];
}

export interface OrderDetails {
  gigId: string;
  gigTitle: string;
  sellerName: string;
  packageTier: 'Basic' | 'Standard' | 'Premium';
  price: number;
  currency: Currency;
  deliveryDays: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  requirements: string;
}

export interface AuthUser {
  id: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  role: 'buyer' | 'seller';
  avatar: string;
  bio?: string;
  skills?: string[];
  country?: string;
  rating?: number;
  level?: SellerLevel;
  ordersCompleted?: number;
  createdAt?: string;
}

export interface MarketplaceOrder {
  id: string;
  gigId: string;
  gigTitle: string;
  gigImage?: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar?: string;
  buyerId: string;
  buyerName: string;
  buyerEmail?: string;
  packageTier: 'Basic' | 'Standard' | 'Premium';
  pricePkr: number;
  priceUsd: number;
  deliveryDays: number;
  requirements: string;
  paymentMethod: string;
  status: 'pending' | 'in_progress' | 'delivered' | 'completed' | 'cancelled';
  deliveryNotes?: string;
  createdAt: string;
  updatedAt: string;
}

