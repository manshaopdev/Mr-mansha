export type ProductCategory = 'all' | 'women' | 'men' | 'juniors' | 'fragrances' | 'festive' | 'sale';

export type ProductSubCategory = 
  | 'unstitched'
  | 'pret'
  | 'festive-pret'
  | 'kameez-shalwar'
  | 'kurta'
  | 'waistcoat'
  | 'juniors-boys'
  | 'juniors-girls'
  | 'eau-de-parfum'
  | 'oud'
  | 'western';

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: ProductCategory;
  subCategory: ProductSubCategory;
  price: number; // in PKR
  originalPrice?: number;
  discountPercentage?: number;
  images: string[];
  fabric?: string;
  color: string;
  colorHex: string;
  sizes: string[];
  description: string;
  details: string[];
  inStock: boolean;
  stockCount?: number;
  isNew?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviewsCount: number;
  sku: string;
}

export interface CartItem {
  id: string; // unique item id (productId + size + color)
  productId: string;
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export type CurrencyCode = 'PKR' | 'USD' | 'AED' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to PKR (1 PKR = rate in foreign currency)
}

export interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  orderNotes?: string;
  paymentMethod: 'cod' | 'jazzcash' | 'easypaisa' | 'card';
  jazzCashNumber?: string;
  jazzCashTid?: string;
}

export interface PlacedOrder {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  couponCode?: string;
  checkoutDetails: CheckoutForm;
  placedAt: string;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  courier: 'TCS Courier' | 'Leopards Express' | 'Trax Logistics';
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface FilterState {
  category: ProductCategory;
  subCategory: string;
  fabric: string;
  size: string;
  color: string;
  priceRange: [number, number];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount';
  searchQuery: string;
}
