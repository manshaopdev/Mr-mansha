export type ServiceCategory = 'all' | 'graphic-design' | 'web-development' | 'digital-marketing';

export type Currency = 'PKR' | 'USD';

export interface SubService {
  id: string;
  title: string;
  subtitle: string;
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
  categorySubtitle: string;
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
  specialtyHighlight: string;
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

export interface ClientMilestone {
  step: string;
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
  date: string;
  description: string;
}

export interface ClientDeliverable {
  name: string;
  category: string;
  format: string;
  status: 'ready' | 'working' | 'queued';
  downloadLabel?: string;
  url?: string;
}

export interface ClientProject {
  id: string; // e.g. PPT-2024-8841
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientPhone: string;
  projectTitle: string;
  category: 'Graphic Design' | 'Web Development' | 'Digital Marketing' | 'All-in-One Suite';
  currentPhase: 'Discovery & Brief' | 'Creative Prototyping' | 'Development Sprint' | 'QA & Staging' | 'Live & Handover';
  progressPercent: number;
  startDate: string;
  targetLaunch: string;
  leadArchitect: {
    name: string;
    role: string;
    phone: string;
  };
  stagingUrl?: string;
  milestones: ClientMilestone[];
  deliverables: ClientDeliverable[];
  financials: {
    totalPkr: number;
    totalUsd: number;
    status: 'Paid in Full' | 'Deposit Cleared (50%)' | 'Awaiting Milestone 2' | 'Inquiry Pending Confirmation';
    invoiceNumber: string;
  };
  recentUpdate: string;
}
