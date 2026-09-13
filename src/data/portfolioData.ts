import { Project, ServiceItem, SkillCategory } from '../types';

export const DEV_INFO = {
  name: 'ALEX VANCE',
  handle: 'CYBER_ARCHITECT',
  role: 'Freelance Full-Stack Web Developer',
  tagline: 'Websites that convert visitors into clients',
  location: 'Global / Remote // Sector 07',
  availability: 'ONLINE // OPEN FOR NEW CONTRACTS',
  experienceYears: '5+',
  projectsCompleted: '48+',
  clientSatisfaction: '100%',
  avgLighthouseScore: '99/100',
  whatsappNumber: '923326032893',
  whatsappDisplay: '03326032893',
  whatsappChannelUrl: 'https://chat.whatsapp.com/LM5oXwuMcjfBksaWdChBeG',
  whatsappMessage: 'Hello! I saw your cyber portfolio and I want to discuss a new web project with you.',
  email: 'alex.vance.dev@cyberfuture.io',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://x.com',
  discord: 'https://discord.com',
  avatarImage: '/src/assets/images/cyber_developer_portrait_1789294881931.jpg'
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Web Dev',
    tagline: 'Full-Stack Performance & Scale',
    description: 'Ultra-fast, responsive web applications built with React, Next.js, Node.js, and TypeScript. Engineered for sub-second latency, flawless SEO, and scalable cloud architecture.',
    iconName: 'Code2',
    features: [
      'Modern React 19 & TypeScript Core',
      'Node.js & Express / Serverless Backends',
      'Sub-Second TTFB & 99+ Core Web Vitals',
      'Database Modeling (MongoDB, PostgreSQL)',
      'Bulletproof Security & Restful/GraphQL APIs'
    ],
    timeline: '2 - 4 Weeks',
    badge: 'CORE EXPERTISE'
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    tagline: 'Immersive Futuristic Cyber Experiences',
    description: 'Award-winning visual identities and high-conversion interfaces. Interactive micro-interactions, smooth Framer Motion choreographies, and glassmorphic cyber aesthetics that keep clients hooked.',
    iconName: 'Layout',
    features: [
      'High-Fidelity Figma Wireframes & Prototypes',
      'Futuristic Cyber & Dark Neomorphic Themes',
      'Complex Framer Motion / WebGL Choreography',
      'Design Systems & Accessible Component Kits',
      'Conversion Rate Optimization (CRO) UX Audits'
    ],
    timeline: '1 - 3 Weeks',
    badge: 'HIGH CONVERSION'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    tagline: 'Revenue-Generating Digital Flagships',
    description: 'Custom e-commerce platforms engineered to turn casual traffic into loyal high-ticket buyers. Seamless checkout funnels, instant search, dynamic cart workflows, and custom payment integrations.',
    iconName: 'ShoppingBag',
    features: [
      'Custom Shopify & Headless React Storefronts',
      'Stripe / Apple Pay / Crypto Gateways',
      'Dynamic Inventory & Order Fulfillment Systems',
      'Instant Cart Drawer & 1-Click Fast Checkout',
      'Real-Time Analytics & Abandoned Cart Recovery'
    ],
    timeline: '3 - 6 Weeks',
    badge: 'REVENUE FOCUSED'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'neon-fintech',
    title: 'AETHER DEX // Quantum Financial Hub',
    subtitle: 'Institutional Crypto Asset & Derivatives Terminal',
    category: 'Web Dev',
    image: '/src/assets/images/cyber_fintech_dashboard_1789294898511.jpg',
    description: 'Next-generation decentralized finance dashboard featuring real-time WebSockets market streaming, sub-50ms chart recalculations with custom canvas engines, and biometric transaction verification.',
    tags: ['React 19', 'TypeScript', 'Tailwind', 'Node.js', 'WebSockets', 'TradingView Engine'],
    metrics: [
      { label: 'Latency', value: '42ms' },
      { label: 'Transactions Processed', value: '$120M+' },
      { label: 'Lighthouse Score', value: '100/100' }
    ],
    liveUrl: '#',
    githubUrl: '#',
    featured: true
  },
  {
    id: 'cyber-store',
    title: 'KINESIS // Cybernetic Apparel & Gear',
    subtitle: 'Luxury Techwear 3D Interactive Storefront',
    category: 'E-Commerce',
    image: '/src/assets/images/cyber_ecommerce_store_1789294912907.jpg',
    description: 'High-conversion headless e-commerce store with real-time inventory synchronization, instant cart slideout, dynamic currency localization, and an interactive 360-degree product inspection matrix.',
    tags: ['Next.js', 'Stripe API', 'Framer Motion', 'MongoDB', 'Tailwind CSS', 'Redux Toolkit'],
    metrics: [
      { label: 'Conversion Lift', value: '+340%' },
      { label: 'Avg Order Value', value: '$285' },
      { label: 'Page Load Speed', value: '0.4s' }
    ],
    liveUrl: '#',
    githubUrl: '#',
    featured: true
  },
  {
    id: 'neural-ai',
    title: 'NEURA-PULSE // AI Cognitive Command',
    subtitle: 'Enterprise AI Telemetry & LLM Orchestrator',
    category: 'AI & WebGL',
    image: '/src/assets/images/cyber_ai_interface_1789294993906.jpg',
    description: 'Futuristic AI cognitive platform dashboard that visualizes multi-agent swarm activity, vector database embedding densities, and model inference tokens with real-time neon node graphs.',
    tags: ['React', 'D3.js', 'Gemini API', 'Express', 'Tailwind CSS', 'Web Audio API'],
    metrics: [
      { label: 'Active Agents', value: '25,000+' },
      { label: 'Inference Speed', value: '14ms' },
      { label: 'Uptime', value: '99.99%' }
    ],
    liveUrl: '#',
    githubUrl: '#',
    featured: true
  },
  {
    id: 'cyber-iot',
    title: 'CYBER-GRID // Autonomous Robotics Telemetry',
    subtitle: 'Mission Critical Industrial IoT Monitoring',
    category: 'UI/UX',
    image: '/src/assets/images/cyber_cyberpunk_app_1789295008798.jpg',
    description: 'Industrial cyber HUD interface designed for real-time monitoring of automated warehouse drone fleets and robotic assembly arms with audio-reactive telemetry alerts.',
    tags: ['React', 'TypeScript', 'Node.js', 'Socket.io', 'Tailwind CSS', 'Framer Motion'],
    metrics: [
      { label: 'Robots Tracked', value: '1,420' },
      { label: 'Alert Response', value: '< 1s' },
      { label: 'Client Feedback', value: '5/5 Stars' }
    ],
    liveUrl: '#',
    githubUrl: '#'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Frontend Synthesis',
    skills: [
      { name: 'React 19 / Next.js', level: 98, tag: 'EXPERT' },
      { name: 'TypeScript', level: 95, tag: 'EXPERT' },
      { name: 'Tailwind CSS / Styling', level: 99, tag: 'MASTER' },
      { name: 'Framer Motion / Animations', level: 94, tag: 'EXPERT' },
      { name: 'Three.js / WebGL / Canvas', level: 86, tag: 'ADVANCED' }
    ]
  },
  {
    name: 'Backend & Infrastructure',
    skills: [
      { name: 'Node.js & Express', level: 96, tag: 'EXPERT' },
      { name: 'MongoDB / Mongoose / SQL', level: 92, tag: 'EXPERT' },
      { name: 'REST & GraphQL APIs', level: 94, tag: 'EXPERT' },
      { name: 'Docker / Cloud Run / CI/CD', level: 88, tag: 'ADVANCED' },
      { name: 'WebSockets & Real-Time Data', level: 90, tag: 'EXPERT' }
    ]
  }
];
