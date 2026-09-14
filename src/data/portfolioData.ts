import { SkillItem, ProjectItem, ServiceItem, TestimonialItem } from '../types/portfolio';

export const SKILLS_DATA: SkillItem[] = [
  // Web Development
  {
    id: 'skill-react-next',
    name: 'React.js & Next.js 15',
    category: 'web-development',
    proficiency: 96,
    experience: '5+ Years',
    iconName: 'Code2',
    tags: ['App Router', 'Server Components', 'SSR / SSG', 'Turbopack'],
    description: 'Enterprise frontend development, blazing fast rendering, dynamic state management and scalable component systems.',
    highlightWork: 'Built 18+ high-speed web apps with 99+ Google Lighthouse scores.'
  },
  {
    id: 'skill-typescript',
    name: 'TypeScript & JavaScript (ESNext)',
    category: 'web-development',
    proficiency: 95,
    experience: '5+ Years',
    iconName: 'FileCode',
    tags: ['Strict Typing', 'Generics', 'Async Architecture', 'Clean Code'],
    description: 'Rock-solid type safety, complex architectural interfaces, zero runtime type errors and maintainable codebases.',
    highlightWork: 'Architected end-to-end type-safe client & server layers for fintech & SaaS.'
  },
  {
    id: 'skill-backend-node',
    name: 'Node.js & Express / REST APIs',
    category: 'web-development',
    proficiency: 92,
    experience: '4+ Years',
    iconName: 'Server',
    tags: ['Microservices', 'Express', 'JWT / OAuth', 'Rate Limiting'],
    description: 'High-throughput backend servers, secure RESTful endpoints, background workers, and webhooks processing.',
    highlightWork: 'Developed APIs handling 100k+ monthly requests with <50ms response latency.'
  },
  {
    id: 'skill-database',
    name: 'MongoDB, PostgreSQL & Cloud DBs',
    category: 'web-development',
    proficiency: 89,
    experience: '4+ Years',
    iconName: 'Database',
    tags: ['Mongoose', 'Prisma ORM', 'Indexing', 'Data Modeling'],
    description: 'Relational & NoSQL database architecture, query optimization, automated backups, and schema migrations.',
    highlightWork: 'Optimized complex ecommerce database queries cutting load times by 70%.'
  },
  {
    id: 'skill-ui-tailwind',
    name: 'Tailwind CSS & Cyber UI Animation',
    category: 'web-development',
    proficiency: 98,
    experience: '5+ Years',
    iconName: 'Palette',
    tags: ['Framer Motion', 'Responsive Grid', 'Glassmorphism', 'Neon FX'],
    description: 'Pixel-perfect, responsive mobile-first UI with modern micro-interactions, dark neon palettes, and fluid UX.',
    highlightWork: 'Crafted 40+ interactive client interfaces with fluid 60FPS motion.'
  },
  {
    id: 'skill-ecommerce-stripe',
    name: 'Full-Stack E-Commerce & Stripe / JazzCash',
    category: 'web-development',
    proficiency: 94,
    experience: '4+ Years',
    iconName: 'ShoppingCart',
    tags: ['Checkout Flow', 'Inventory Sync', 'Webhooks', 'Cart Recovery'],
    description: 'Custom e-commerce storefronts, frictionless payment gateways, order management, and customer portals.',
    highlightWork: 'Built high-conversion e-commerce stores processing over $300K in sales.'
  },

  // Digital Marketing
  {
    id: 'skill-meta-ads',
    name: 'Meta Ads (Facebook & Instagram)',
    category: 'digital-marketing',
    proficiency: 95,
    experience: '5+ Years',
    iconName: 'Megaphone',
    tags: ['CAPI Pixel', 'Lookalike Audiences', 'Retargeting Funnels', 'ROAS Scaling'],
    description: 'Full-funnel paid social campaigns targeting high-intent buyers, testing angles, and scaling profitable ad spend.',
    highlightWork: 'Managed over $150K in ad spend generating average 4.2x to 7.8x ROAS.'
  },
  {
    id: 'skill-tiktok-ads',
    name: 'TikTok Ads & Viral Creative Scaling',
    category: 'digital-marketing',
    proficiency: 94,
    experience: '3+ Years',
    iconName: 'Sparkles',
    tags: ['Spark Ads', 'UGC Scripting', 'Trend Hacking', 'Gen-Z Conversion'],
    description: 'High-energy short-form video hooks, TikTok Ads Manager scaling, viral engagement funnels, and brand takeover ads.',
    highlightWork: 'Scaled multiple brands from zero to 10k+ units sold using organic & paid TikTok.'
  },
  {
    id: 'skill-google-ads',
    name: 'Google Ads & Performance Max',
    category: 'digital-marketing',
    proficiency: 91,
    experience: '4+ Years',
    iconName: 'TrendingUp',
    tags: ['Search Campaigns', 'Shopping Ads', 'PMax', 'Negative Keywords'],
    description: 'Capturing bottom-of-funnel search intent, hyper-targeted local & global campaigns, and conversion tracking via GTM.',
    highlightWork: 'Delivered $3.80 cost-per-acquisition on high-ticket service lead generation.'
  },
  {
    id: 'skill-seo',
    name: 'Advanced SEO & Content Architecture',
    category: 'digital-marketing',
    proficiency: 90,
    experience: '4+ Years',
    iconName: 'Search',
    tags: ['Technical SEO', 'Schema Markup', 'Core Web Vitals', 'Backlink Outreach'],
    description: 'Dominating search engine results pages with semantic keyword clusters, internal linking, and speed optimization.',
    highlightWork: 'Ranked 45+ competitive keywords on Page 1 of Google within 90 days.'
  },
  {
    id: 'skill-cro-funnels',
    name: 'CRO & High-Conversion Sales Funnels',
    category: 'digital-marketing',
    proficiency: 93,
    experience: '4+ Years',
    iconName: 'Target',
    tags: ['A/B Testing', 'Heatmaps', 'Copywriting', 'Lead Magnets'],
    description: 'Turning cold traffic into loyal paying customers through psychological sales copy, offer stacking, and page speed.',
    highlightWork: 'Boosted average landing page conversion rate from 1.8% to 6.4%.'
  },
  {
    id: 'skill-analytics',
    name: 'Data Analytics & Attribution (GA4 / GTM)',
    category: 'digital-marketing',
    proficiency: 88,
    experience: '4+ Years',
    iconName: 'BarChart3',
    tags: ['Server-Side Tracking', 'Custom Events', 'UTM Architecture', 'Looker Studio'],
    description: 'Transparent real-time attribution modeling, custom dashboards, client reporting, and data-driven scaling decisions.',
    highlightWork: 'Set up bulletproof server-side tracking bypassing iOS14 privacy drop-offs.'
  },

  // Tools & Cloud
  {
    id: 'skill-git-docker',
    name: 'Git, GitHub, CI/CD & Docker',
    category: 'tools-cloud',
    proficiency: 90,
    experience: '4+ Years',
    iconName: 'Cpu',
    tags: ['Version Control', 'Automated Deployments', 'Containerization'],
    description: 'Modern deployment pipelines, automated test suites, and containerized cloud environments.',
    highlightWork: 'Automated CI/CD pipelines deploying to production in under 60 seconds.'
  },
  {
    id: 'skill-cloud-hosting',
    name: 'Cloud Infrastructure (Vercel, AWS, Cloud Run)',
    category: 'tools-cloud',
    proficiency: 92,
    experience: '4+ Years',
    iconName: 'Cloud',
    tags: ['Edge Network', 'Serverless', 'CDN Caching', 'SSL / DNS'],
    description: 'Zero-downtime serverless hosting, edge caching, custom domain routing, and DDoS mitigation.',
    highlightWork: 'Maintained 99.99% uptime across all live enterprise client websites.'
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-nexora-saas',
    title: 'Nexora AI - Full-Stack Analytics SaaS',
    client: 'Nexora Labs Inc.',
    category: 'web-dev',
    categoryLabel: 'Web Development',
    description: 'Next.js 15 enterprise SaaS dashboard with live telemetry, AI insights generation, Stripe billing, and dark neon interface.',
    fullOverview: 'Engineered a next-generation business intelligence dashboard featuring real-time WebSocket charts, AI-driven customer churn predictions, multi-tenant authentication, and instant automated PDF exports.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
    metrics: [
      { label: 'Lighthouse Performance', value: '99/100' },
      { label: 'Active Monthly Users', value: '45,000+' },
      { label: 'API Response Time', value: '38ms' }
    ],
    techStack: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Stripe API'],
    deliverables: ['Custom Design System', 'Serverless Backend', 'Stripe Billing System', 'Role-Based Access Control'],
    liveUrl: 'https://github.com',
    featured: true
  },
  {
    id: 'proj-veloce-marketing',
    title: 'Veloce Streetwear - 7.2x ROAS Meta & TikTok Scaling',
    client: 'Veloce Apparel UK',
    category: 'digital-marketing',
    categoryLabel: 'Digital Marketing',
    description: 'Complete digital marketing turnaround: TikTok viral UGC campaigns, Meta Ads Advantage+ scaling, and CRO landing page redesign.',
    fullOverview: 'Turned a struggling streetwear brand into a viral powerhouse. Crafted high-hook TikTok short-form UGC ads paired with hyper-targeted Meta retargeting funnels and an ultra-fast mobile checkout landing page.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    metrics: [
      { label: 'Return On Ad Spend (ROAS)', value: '7.2x' },
      { label: 'Total Revenue Generated', value: '$340,000+' },
      { label: 'Cost Per Acquisition Drop', value: '-62%' }
    ],
    techStack: ['Meta Ads Manager', 'TikTok Ads Spark', 'Shopify Plus', 'GA4 Server-Side', 'Klaviyo Email'],
    deliverables: ['Creative UGC Video Scripts', 'Custom High-Speed Funnel', 'Audience Segment Testing', 'Daily Ad Optimization'],
    liveUrl: 'https://tiktok.com',
    featured: true
  },
  {
    id: 'proj-pulse-store',
    title: 'Pulse Audio - High-Conversion E-Commerce Platform',
    client: 'Pulse Sound Technologies',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce / Full-Stack',
    description: 'Custom headless e-commerce store with 3D product previews, dynamic currency conversion, multi-step checkout, and speed optimization.',
    fullOverview: 'Developed an audio hardware showcase with interactive audio waveform demos, instant cart drawer, seamless local & international payment options, and automated inventory sync across warehouses.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80',
    metrics: [
      { label: 'Mobile Conversion Rate', value: '5.8%' },
      { label: 'Cart Abandonment Drop', value: '-35%' },
      { label: 'Avg Session Duration', value: '4m 12s' }
    ],
    techStack: ['React', 'Node.js', 'Tailwind CSS', 'Stripe', 'Framer Motion', 'MongoDB'],
    deliverables: ['Custom Product Builder', '1-Click Checkout Integration', 'Speed Optimization', 'SEO Architecture'],
    liveUrl: 'https://shopify.com',
    featured: true
  },
  {
    id: 'proj-apex-leadgen',
    title: 'Apex Dental Care - Local SEO & Google Search Dominance',
    client: 'Apex Medical Group',
    category: 'digital-marketing',
    categoryLabel: 'Digital Marketing',
    description: 'Local SEO overhaul, Google Business Profile ranking #1, targeted Google Search Ads, and automated WhatsApp appointment booking.',
    fullOverview: 'Helped a premier dental clinic capture all regional high-intent searches. Implemented schema markup, Google Maps citation building, and Google Search Ads targeting emergency and cosmetic dental procedures.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&auto=format&fit=crop&q=80',
    metrics: [
      { label: 'Monthly Patient Inquiries', value: '420+' },
      { label: 'Google Maps #1 Ranking', value: '14 Keywords' },
      { label: 'Customer Acquisition Cost', value: '$8.50' }
    ],
    techStack: ['Google Ads', 'Google Tag Manager', 'Local Schema Markup', 'WhatsApp API', 'Looker Studio'],
    deliverables: ['Lead Generation Landing Page', 'PMax Campaign Structure', 'Review Generation Engine', 'Monthly ROI Reports'],
    liveUrl: 'https://google.com',
    featured: false
  },
  {
    id: 'proj-cyber-portfolio',
    title: 'CyberMatrix 3D - WebGL Interactive Web Experience',
    client: 'Matrix Labs Digital',
    category: 'web-dev',
    categoryLabel: 'Web Development',
    description: 'Futuristic sci-fi tech showcase featuring interactive three.js canvas, neon shader effects, and dynamic audio feedback.',
    fullOverview: 'Pushed browser boundaries by building an interactive futuristic web platform. Features interactive particle networks, audio-reactive neon nodes, fluid kinetic typography, and flawless touch response.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    metrics: [
      { label: 'Interactive Frame Rate', value: '60 FPS' },
      { label: 'Global Design Awards', value: '2 Honors' },
      { label: 'Viral Social Shares', value: '28,000+' }
    ],
    techStack: ['React', 'WebGL / Canvas', 'Tailwind CSS', 'Framer Motion', 'Web Audio API'],
    deliverables: ['Custom Shader Shaders', 'Audio Synthesizer Engine', 'Responsive Viewport Scaler', 'Performance Budget'],
    liveUrl: 'https://threejs.org',
    featured: true
  },
  {
    id: 'proj-hypergrowth-funnel',
    title: 'HyperGrowth Real Estate - High-Ticket Paid Ads Funnel',
    client: 'Skyline Luxury Properties',
    category: 'full-stack',
    categoryLabel: 'Full-Stack & Marketing',
    description: 'End-to-end luxury property booking portal coupled with VIP Meta Lead Ads, instant CRM webhook routing, and SMS confirmations.',
    fullOverview: 'Created an integrated system uniting custom web development and precision marketing. Built an interactive property exploration portal integrated with Facebook Lead Ads webhook automation, delivering qualified buyers directly to realtors within 30 seconds.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80',
    metrics: [
      { label: 'Closed Deal Volume', value: '$4.2M' },
      { label: 'Average Lead Response', value: '25 Sec' },
      { label: 'Qualified Lead Rate', value: '42%' }
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'Meta Ads CAPI', 'Twilio SMS API', 'Zapier Automation'],
    deliverables: ['Custom Property Matcher', 'Instant Webhook Pipeline', 'Video Ad Creatives', 'CRM Synchronization'],
    liveUrl: 'https://vercel.com',
    featured: false
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'serv-web-dev',
    title: 'Custom Web Development',
    category: 'Web Development',
    tagline: 'Modern, high-performance web applications built with speed and precision.',
    description: 'We code bespoke web solutions from scratch using React, Next.js, and TypeScript. No sluggish templates, no bloat—just clean architecture, lightning-fast loading speeds, and robust security.',
    iconName: 'Code2',
    features: [
      'Next.js 15 & React 19 architecture',
      'Ultra-responsive neon & cyber aesthetic UI',
      'Full mobile & tablet optimization',
      'Blazing fast 95+ Google PageSpeed score',
      'Robust backend APIs & database integration',
      'Modern security standards and SSL protection'
    ],
    deliverables: [
      'Production-ready code repository',
      'Live cloud deployment (Vercel / Cloud Run)',
      'CMS / Admin Dashboard for easy updates',
      '30 days post-launch warranty & support'
    ],
    priceStarting: '$499 / PKR 85,000'
  },
  {
    id: 'serv-digital-marketing',
    title: 'Digital Marketing & Paid Ads',
    category: 'Digital Marketing',
    tagline: 'Scale sales and acquire high-intent customers profitably on Meta & TikTok.',
    description: 'Data-driven performance marketing focused solely on positive Return On Investment (ROAS). We craft winning creative hooks, build bulletproof tracking funnels, and scale daily budgets with precision.',
    iconName: 'Megaphone',
    features: [
      'Meta (Facebook & Instagram) ads management',
      'TikTok viral ad creative & Spark Ads scaling',
      'Google Search & Performance Max campaigns',
      'A/B tested copywriting & scroll-stopping angles',
      'Server-side tracking (CAPI & GA4)',
      'Audience segmentation & retargeting loops'
    ],
    deliverables: [
      'High-converting ad video & image creatives',
      'Complete campaign setup & live management',
      'Transparent weekly ROI & revenue reports',
      'Dedicated media buyer & strategy calls'
    ],
    priceStarting: '$399 / PKR 65,000'
  },
  {
    id: 'serv-hybrid-growth',
    title: 'All-In-One Growth Engine (Web + Ads)',
    category: 'Hybrid Growth',
    tagline: 'The ultimate powerhouse: Custom high-speed website + viral paid advertising.',
    description: 'The complete package for ambitious brands. We build your high-converting web storefront or landing page and immediately fuel it with targeted Meta, TikTok, and Google ad traffic for explosive scaling.',
    iconName: 'Zap',
    features: [
      'Everything in Custom Web Development',
      'Everything in Digital Marketing & Ads',
      'End-to-end sales funnel conversion optimization',
      'Automated email & SMS cart recovery triggers',
      'Search Engine Optimization (SEO) setup',
      'Continuous weekly speed & conversion testing'
    ],
    deliverables: [
      'Full-stack custom website + live domain',
      'Live ad campaigns on 2+ major ad networks',
      'Custom Looker Studio analytics dashboard',
      'Priority 24/7 direct communication'
    ],
    priceStarting: '$799 / PKR 140,000'
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    clientName: 'Marcus Vance',
    role: 'CEO & Founder',
    company: 'Nexora Labs (San Francisco)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    quote: 'FM HUB transformed our product launch. The web platform is unbelievably fast, and the neon aesthetic gave us an unmistakable market identity. Our user signups doubled in the first month.',
    projectType: 'Full-Stack Web Development',
    rating: 5,
    results: '+135% User Signups'
  },
  {
    id: 'test-2',
    clientName: 'Hamza Tariq',
    role: 'Managing Director',
    company: 'Veloce Retail UK',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    quote: 'Before working with FM HUB, our ads were barely breaking even. Within 3 weeks, their TikTok creative scripts and Meta funnels scaled our e-commerce store to 7.2x ROAS consistently.',
    projectType: 'Digital Marketing & Ads Scaling',
    rating: 5,
    results: '7.2x Return on Ad Spend'
  },
  {
    id: 'test-3',
    clientName: 'Dr. Sarah Jenkins',
    role: 'Clinical Director',
    company: 'Apex Medical Group',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    quote: 'The combination of our new booking web application and their targeted Google Ads took us from 40 monthly inquiries to over 420. They are masters of both code and marketing.',
    projectType: 'Web Development & Local SEO',
    rating: 5,
    results: '420+ Monthly Leads'
  }
];
