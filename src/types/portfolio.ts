export type SkillCategory = 'all' | 'web-development' | 'digital-marketing' | 'tools-cloud';

export interface SkillItem {
  id: string;
  name: string;
  category: 'web-development' | 'digital-marketing' | 'tools-cloud';
  proficiency: number; // 0 - 100
  experience: string;
  iconName: string;
  tags: string[];
  description: string;
  highlightWork: string;
}

export type ProjectCategory = 'all' | 'web-dev' | 'digital-marketing' | 'full-stack' | 'ecommerce';

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: 'web-dev' | 'digital-marketing' | 'full-stack' | 'ecommerce';
  categoryLabel: string;
  description: string;
  fullOverview: string;
  image: string;
  metrics: {
    label: string;
    value: string;
  }[];
  techStack: string[];
  deliverables: string[];
  liveUrl?: string;
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'Web Development' | 'Digital Marketing' | 'Hybrid Growth';
  tagline: string;
  description: string;
  iconName: string;
  features: string[];
  deliverables: string[];
  priceStarting: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  projectType: string;
  rating: number;
  results: string;
}
