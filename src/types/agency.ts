export type ServiceCategory = 'all' | 'graphic-design' | 'web-development' | 'digital-marketing';

export type Currency = 'PKR' | 'USD';

export interface SubService {
  id: string;
  title: string;
  titleUrdu: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  tools: string[];
  iconName: string;
  estimatedTimeline: string;
}

export interface ServiceDetail {
  id: 'graphic-design' | 'web-development' | 'digital-marketing';
  title: string;
  titleUrdu: string;
  tagline: string;
  heroPitch: string;
  badge: string;
  themeColor: {
    primary: string;
    border: string;
    bg: string;
    glow: string;
    text: string;
  };
  subServices: SubService[];
  industryTools: { name: string; category: string; badge?: string }[];
  processSteps: { step: string; title: string; desc: string; duration: string }[];
  keyHighlights: string[];
  faqs: { q: string; a: string }[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: 'graphic-design' | 'web-development' | 'digital-marketing';
  categoryLabel: string;
  summary: string;
  challenge: string;
  solution: string;
  results: { metric: string; label: string }[];
  deliverables: string[];
  techStack: string[];
  year: string;
  imageAccent: string;
}

export interface PackageOption {
  id: string;
  category: 'graphic-design' | 'web-development' | 'digital-marketing' | 'all-in-one';
  name: string;
  tagline: string;
  pricePKR: number;
  priceUSD: number;
  duration: string;
  popular?: boolean;
  features: string[];
  notIncluded?: string[];
  idealFor: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  country: string;
  serviceCategory: string;
  rating: number;
  review: string;
  avatar: string;
  projectImpact: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleUrdu: string;
  experience: string;
  specialties: string[];
  bio: string;
  avatar: string;
}

export interface EstimatorItem {
  id: string;
  category: 'graphic-design' | 'web-development' | 'digital-marketing';
  title: string;
  basePKR: number;
  baseUSD: number;
  days: number;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  selectedServices: string[];
  budgetTier: string;
  timeline: string;
  projectBrief: string;
  currency: Currency;
}
