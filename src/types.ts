export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Web Dev' | 'E-Commerce' | 'UI/UX' | 'AI & WebGL';
  image: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  liveUrl: string;
  githubUrl: string;
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  features: string[];
  timeline: string;
  badge: string;
}

export interface SkillCategory {
  name: string;
  skills: { name: string; level: number; tag: string }[];
}

export interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read';
}
