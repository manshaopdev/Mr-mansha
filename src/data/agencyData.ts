import {
  ServiceDetail,
  CaseStudy,
  PackageOption,
  Testimonial,
  TeamMember,
  EstimatorItem
} from '../types/agency';

export const AGENCY_INFO = {
  name: 'Prime Plus Team',
  tagline: 'Your End-to-End Digital Engineering & Growth Partner',
  shortBio: 'Prime Plus Team brings together elite graphic designers, full-stack engineers, and performance marketers under one unified powerhouse. We transform ideas into iconic brands, scalable web software, and high-converting marketing machines.',
  establishedYear: '2021',
  stats: [
    { value: '180+', label: 'Successful Deployments', sub: 'Brands, Web Apps & Funnels' },
    { value: '99.4%', label: 'Client Satisfaction', sub: '5-Star Verified Ratings' },
    { value: '$4.2M+', label: 'Ad Spend Managed', sub: 'Delivering 4.2x Avg ROAS' },
    { value: '24/7', label: 'Dedicated Support', sub: 'Direct Senior Team Access' },
  ],
  contacts: {
    whatsapp: '+923326032893',
    whatsappFormatted: '+92 332 6032893',
    email: 'contact@primeplusteam.com',
    supportEmail: 'support@primeplusteam.com',
    location: 'Lahore & Islamabad, Pakistan (Serving Global Clients)',
    availability: 'Accepting New Projects (Q3/Q4 2026)',
    phone: '+92 332 6032893',
  }
};

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'graphic-design',
    title: 'Graphic & Visual Brand Designing',
    titleUrdu: 'گرافک اور برانڈ ڈیزائننگ',
    tagline: 'Distinctive visual identities that command attention, build trust, and win customers.',
    heroPitch: 'Great design is not just aesthetics—it is psychological architecture. Our creative studio crafts cohesive brand narratives, high-impact marketing visuals, tactile packaging, and intuitive digital interfaces designed to elevate your company above competitors.',
    badge: 'Creative Studio',
    themeColor: {
      primary: 'from-pink-500 to-rose-500',
      border: 'border-pink-500/30',
      bg: 'bg-pink-500/10',
      glow: 'shadow-[0_0_30px_rgba(244,63,94,0.15)]',
      text: 'text-pink-400',
    },
    keyHighlights: [
      '100% Vector & High-Res Source Deliverables (AI, EPS, SVG, Figma, PDF)',
      'Strategic Brand Systems: Typography, Color Psychology & Visual Archetypes',
      'Pixel-Perfect Human-Centered UI/UX Wireframes & Prototypes',
      'Print-Ready Packaging with Die-Cut Standards & 3D Renderings',
      'Rapid Turnaround with Iterative Review Cycles'
    ],
    subServices: [
      {
        id: 'brand-identity',
        title: 'Brand Identity & Logo Architecture',
        titleUrdu: 'برانڈ آئیڈینٹیٹی اور لوگو ڈیزائن',
        shortDesc: 'Iconic logos, comprehensive brand guideline manuals, color palettes, and typography pairings.',
        fullDesc: 'We develop memorable corporate identities from root strategy to final vector assets. Includes primary & secondary logo variations, responsive marks for app icons/favicons, bespoke color palettes with contrast testing, typography hierarchies, and an exhaustive 30+ page Brand Identity Manual for internal and external consistency.',
        deliverables: [
          'Primary & Alternate Vector Logos (AI, SVG, EPS, PDF, PNG)',
          'Favicon & App Icon Suite',
          '30+ Page Brand Identity Guidelines Book',
          'Color Palette (HEX, RGB, CMYK, Pantone)',
          'Typography Pairing & Licensed Font Guide',
          'Stationery Kit (Letterhead, Business Cards, Envelopes)'
        ],
        tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma'],
        iconName: 'Palette',
        estimatedTimeline: '7 - 12 Days'
      },
      {
        id: 'ui-ux-design',
        title: 'UI/UX & Interactive Product Design',
        titleUrdu: 'یو آئی / یو ایکس ڈیزائن (ویب اور موبائل)',
        shortDesc: 'Intuitive user experiences, clickable Figma prototypes, and modular design systems.',
        fullDesc: 'From mobile applications (iOS/Android) to enterprise SaaS dashboards and customer portals, our UI/UX engineers construct seamless user journeys. We start with user persona research and low-fidelity wireframes, progressing into high-fidelity design systems with auto-layout components, WCAG AA accessible contrast, and clickable micro-interaction prototypes ready for developer handoff.',
        deliverables: [
          'User Journey Maps & Wireframe Flowcharts',
          'High-Fidelity Component-Driven Figma File',
          'Interactive Clickable Click-Through Prototype',
          'Full Design Tokens (Spacing, Radii, Shadows, Colors)',
          'Developer Handoff Inspection Specs & Asset Export'
        ],
        tools: ['Figma', 'FigJam', 'Protopie', 'Adobe XD'],
        iconName: 'Layout',
        estimatedTimeline: '10 - 20 Days'
      },
      {
        id: 'social-media-creatives',
        title: 'Social Media & Ad Creative Packs',
        titleUrdu: 'سوشل میڈیا پوسٹس اور اشتہارات کے ڈیزائن',
        shortDesc: 'High-converting static banners, carousels, reels templates, and promotional display ads.',
        fullDesc: 'Stand out in high-speed social feeds. We craft attention-grabbing visual assets engineered for click-through rate (CTR). Perfect for Instagram grid curation, Facebook carousels, LinkedIn thought-leadership infographics, YouTube high-CTR thumbnails, and display ad banners formatted across all standard aspect ratios (1:1, 9:16, 16:9).',
        deliverables: [
          'Monthly Social Post Visual Sets (Static & Carousel)',
          'Performance Ad Creatives (1:1, 9:16 Story/Reels formats)',
          'Editable Canva or PSD Master Templates',
          'YouTube Thumbnails with Click-Optimized Composition',
          'Platform-Compliant Cover Banners (LinkedIn, FB, X)'
        ],
        tools: ['Photoshop', 'Illustrator', 'After Effects', 'Canva Pro'],
        iconName: 'Sparkles',
        estimatedTimeline: '3 - 7 Days'
      },
      {
        id: 'packaging-print',
        title: 'Packaging, Merchandise & Print Media',
        titleUrdu: 'پیکیجنگ اور پرنٹ میڈیا ڈیزائن',
        shortDesc: 'Retail-ready product boxes, bottle labels, pouches, roll-up banners, and corporate brochures.',
        fullDesc: 'Tangible brand presence requires precision die-lines, bleed margins, and material finish understanding (foil stamping, spot UV, matte embossing). We build production-ready packaging artwork that stands out on retail shelves and unboxing videos, complete with 3D mockups for pitch decks and e-commerce listings.',
        deliverables: [
          'Precision Vector Die-Line Artwork Ready for Print Factory',
          'Product Label, Carton Box & Pouch Designs',
          'Photorealistic 3D Product Mockups for E-Commerce',
          'Corporate Tri-Fold Brochures & Catalogs',
          'Exhibition Roll-Up Banners & Event Signage'
        ],
        tools: ['Adobe InDesign', 'Illustrator', 'Photoshop', 'Blender'],
        iconName: 'Box',
        estimatedTimeline: '7 - 14 Days'
      },
      {
        id: 'motion-3d',
        title: 'Motion Graphics & 3D Visuals',
        titleUrdu: 'موشن گرافکس اور تھری ڈی ویژولز',
        shortDesc: 'Animated logo stings, 2D explainer animations, product 3D renders, and web Lottie files.',
        fullDesc: 'Bring static graphics to dynamic life. We produce smooth logo animation reveals, 2D vector explainer videos, web-optimized JSON/Lottie animations for ultra-fast site loading, and photorealistic 3D product modeling with cinematic lighting.',
        deliverables: [
          '4K / Full HD Animated Logo Stings (MP4, MOV Alpha)',
          'Lightweight Web Lottie JSON Animations',
          '2D Explainer Video Snippets & Product Demos',
          '3D Isometric Product Renders & Turntables'
        ],
        tools: ['After Effects', 'Blender', 'Cinema 4D', 'LottieFiles'],
        iconName: 'Video',
        estimatedTimeline: '8 - 16 Days'
      }
    ],
    industryTools: [
      { name: 'Adobe Photoshop', category: 'Raster Graphics & Retouching' },
      { name: 'Adobe Illustrator', category: 'Vector Precision & Logos' },
      { name: 'Figma', category: 'UI/UX & Collaborative Systems', badge: 'Primary' },
      { name: 'Adobe InDesign', category: 'Editorial & Print Layout' },
      { name: 'After Effects', category: 'Motion Design & Kinetic Type' },
      { name: 'Blender', category: '3D Modeling & Photoreal Renders' }
    ],
    processSteps: [
      { step: '01', title: 'Creative Discovery & Moodboard', desc: 'Understanding brand soul, audience psychology, visual competitors, and aesthetic direction.', duration: '1-2 Days' },
      { step: '02', title: 'Conceptualization & Sketching', desc: 'Exploring dozens of rough geometry paths, grid explorations, and typography directions.', duration: '2-3 Days' },
      { step: '03', title: 'Vector Refinement & Context Mockups', desc: 'Transferring best concepts into pixel-perfect vectors and previewing on real-life mockups.', duration: '3-5 Days' },
      { step: '04', title: 'Client Feedback & Revisions', desc: 'Polishing typography, micro-spacing, and color palettes according to your input.', duration: '2-3 Days' },
      { step: '05', title: 'Master Production Delivery', desc: 'Packaging all formats (AI, EPS, SVG, PNG, PDF, Figma, CMYK, RGB) with full copyrights.', duration: '1 Day' }
    ],
    faqs: [
      {
        q: 'Do I get full intellectual property and source files?',
        a: 'Yes, 100%. Once final payment is completed, you own all commercial copyrights and receive master vector source files (AI, Figma, EPS, PDF) with organized layers.'
      },
      {
        q: 'How many revisions are included in design projects?',
        a: 'We provide 3 to 5 comprehensive revision rounds on chosen concepts to guarantee you are 100% satisfied before final sign-off.'
      },
      {
        q: 'Can you work with our existing brand guidelines?',
        a: 'Absolutely. If you already have brand rules, our designers adhere strictly to your hex codes, font rules, and tone while refreshing your collateral.'
      }
    ]
  },
  {
    id: 'web-development',
    title: 'Modern Web & Full-Stack Development',
    titleUrdu: 'جدید ویب اور فل اسٹیک ڈویلپمنٹ',
    tagline: 'Lightning-fast, highly secure, scalable web platforms engineered for maximum conversion.',
    heroPitch: 'Your website is your 24/7 sales engine. Prime Plus Team builds enterprise-grade, clean-coded web solutions utilizing modern frameworks like React, Next.js, TypeScript, Node.js, and headless CMS architecture. We focus on 100/100 Core Web Vitals, bulletproof cybersecurity, and fluid mobile responsiveness.',
    badge: 'Engineering Lab',
    themeColor: {
      primary: 'from-sky-500 to-indigo-600',
      border: 'border-sky-500/30',
      bg: 'bg-sky-500/10',
      glow: 'shadow-[0_0_30px_rgba(14,165,233,0.15)]',
      text: 'text-sky-400',
    },
    keyHighlights: [
      'Sub-Second Page Loads & 95+ Google Lighthouse Scores',
      'Modern Stack: React 19, Next.js, Node.js, TypeScript, Tailwind CSS',
      'Custom Headless & E-Commerce (Shopify, WooCommerce, Custom Portals)',
      'Multi-Currency & Regional Payment Integrations (Stripe, PayPal, JazzCash, EasyPaisa, COD)',
      'SEO-Structured Semantic HTML, JSON-LD Schema & Dynamic OpenGraph Meta'
    ],
    subServices: [
      {
        id: 'custom-web-apps',
        title: 'Custom Web Applications & SaaS Platforms',
        titleUrdu: 'کسٹم ویب ایپس اور ساس (SaaS) پورٹلز',
        shortDesc: 'Bespoke dashboards, customer portals, membership platforms, and complex database apps.',
        fullDesc: 'When off-the-shelf templates cannot fulfill your business logic, our engineering team architects bespoke full-stack applications. Featuring responsive React/Next.js frontends, resilient Node.js/Express backends, relational (PostgreSQL) or document (MongoDB) databases, role-based access control (RBAC), and enterprise-grade data security.',
        deliverables: [
          'Production-Ready Full-Stack Repository (Clean TypeScript)',
          'Role-Based Authentication & Permissions (JWT, OAuth, Session)',
          'Real-Time WebSockets or Server-Sent Events',
          'Responsive Cross-Browser Interface for Mobile, Tablet & Desktop',
          'Automated CI/CD Pipeline & Vercel/AWS Cloud Deployment'
        ],
        tools: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB'],
        iconName: 'Code',
        estimatedTimeline: '20 - 45 Days'
      },
      {
        id: 'ecommerce-stores',
        title: 'High-Converting E-Commerce Solutions',
        titleUrdu: 'ای کامرس ویب سائٹس (Shopify & Custom)',
        shortDesc: 'Custom Shopify themes, WooCommerce stores, and high-speed headless storefronts.',
        fullDesc: 'Engineered specifically for maximum Average Order Value (AOV) and minimal checkout drop-offs. We implement one-click upsells, live inventory tracking, abandoned cart recovery scripts, smart search filtering, and seamless multi-channel payment gateway setups (Stripe, PayPal, Cash on Delivery, JazzCash, EasyPaisa).',
        deliverables: [
          'Bespoke Shopify / WooCommerce Custom Coded Theme',
          'Seamless Payment Gateway & Tax/Shipping Calculator Setup',
          'One-Page High-Conversion Checkout Funnel',
          'Mobile-First Touch Architecture & Speed Tuning',
          'Product Catalog Migration & Inventory Sync'
        ],
        tools: ['Shopify Liquid', 'WooCommerce', 'Next.js Commerce', 'Stripe', 'JazzCash'],
        iconName: 'ShoppingBag',
        estimatedTimeline: '12 - 25 Days'
      },
      {
        id: 'corporate-websites',
        title: 'Corporate & Lead Generation Websites',
        titleUrdu: 'کارپوریٹ اور بزنس ویب سائٹس',
        shortDesc: 'Professional corporate presence with dynamic CMS, interactive calculators, and lead capture.',
        fullDesc: 'Elevate your enterprise with an authoritative digital flagship. We combine striking visual aesthetics with rapid loading times, integrated appointment booking, interactive ROI calculators, client case study carousels, and seamless headless CMS (WordPress, Sanity, Strapi) so non-technical staff can publish blog posts and updates effortlessly.',
        deliverables: [
          'Full 5-15 Page Corporate Web Experience',
          'User-Friendly CMS Backend for Easy Content Editing',
          'Interactive Contact & Quotation Forms with Instant Alerts',
          'Lead Capture Integration with CRM (HubSpot, Mailchimp)',
          'Full On-Page SEO Architecture & Sitemap XML Submission'
        ],
        tools: ['Next.js', 'WordPress', 'Tailwind CSS', 'Sanity CMS'],
        iconName: 'Globe',
        estimatedTimeline: '10 - 18 Days'
      },
      {
        id: 'api-integrations',
        title: 'API Engineering & Backend Architecture',
        titleUrdu: 'اے پی آئی ڈیولپمنٹ اور سسٹم انٹیگریشنز',
        shortDesc: 'RESTful/GraphQL APIs, third-party webhook integrations, and database optimization.',
        fullDesc: 'Connect your business tools into a unified nervous system. We design secure RESTful and GraphQL APIs, integrate third-party webhooks (WhatsApp Cloud API, CRM sync, ERP logistics, payment processors), and optimize complex database queries for sub-100ms response times under high concurrency.',
        deliverables: [
          'Documented REST / GraphQL APIs (Swagger / Postman Collection)',
          'Secure Authentication & Rate Limiting Middleware',
          'Automated Webhook Receivers & Event Handlers',
          'Database Indexing, Backup Strategies & Redis Caching'
        ],
        tools: ['Node.js', 'Express', 'GraphQL', 'Redis', 'PostgreSQL', 'Docker'],
        iconName: 'Cpu',
        estimatedTimeline: '8 - 18 Days'
      },
      {
        id: 'maintenance-speed',
        title: 'Speed Optimization & Security Hardening',
        titleUrdu: 'ویب سائٹ اسپیڈ اور سیکیورٹی اپ گریڈ',
        shortDesc: 'Core Web Vitals tuning, malware removal, SSL encryption, and 99.9% uptime maintenance.',
        fullDesc: 'Slow sites lose customers and rank poorly on Google. We diagnose performance bottlenecks, compress assets into modern WebP/AVIF formats, implement server-side edge caching, eliminate render-blocking scripts, and install SSL, firewall, and DDoS mitigation.',
        deliverables: [
          '90+ Google PageSpeed & Lighthouse Optimization Report',
          'Image & Script Compression Pipeline',
          'SSL Certificate, Cloudflare CDN & Firewall Setup',
          'Automated Daily Cloud Backups & Vulnerability Patching'
        ],
        tools: ['Cloudflare', 'Google Lighthouse', 'Redis Cache', 'Nginx'],
        iconName: 'ShieldCheck',
        estimatedTimeline: '3 - 6 Days'
      }
    ],
    industryTools: [
      { name: 'React 19 & Next.js', category: 'Frontend Architecture', badge: 'Core' },
      { name: 'TypeScript', category: 'Type-Safe Engineering', badge: 'Standard' },
      { name: 'Node.js & Express', category: 'Scalable Backend Services' },
      { name: 'Tailwind CSS', category: 'Modern Utility Styling' },
      { name: 'PostgreSQL & MongoDB', category: 'Persistent Cloud Databases' },
      { name: 'Shopify Liquid', category: 'E-Commerce Engine' },
      { name: 'Docker & AWS / Vercel', category: 'Cloud Infrastructure & CI/CD' }
    ],
    processSteps: [
      { step: '01', title: 'System Architecture & Scope Matrix', desc: 'Defining data models, user flows, API schemas, and technical prerequisites.', duration: '2-3 Days' },
      { step: '02', title: 'Frontend UI Implementation', desc: 'Converting designs into semantic, responsive, accessible React/Tailwind components.', duration: '5-12 Days' },
      { step: '03', title: 'Backend & Database Integration', desc: 'Wiring authentication, business logic, payment gateways, and custom database APIs.', duration: '5-14 Days' },
      { step: '04', title: 'Rigorous QA & Speed Audit', desc: 'Cross-device mobile testing, edge-case validation, security scans, and Lighthouse audits.', duration: '3-4 Days' },
      { step: '05', title: 'Live Deployment & Handover', desc: 'Production launch with domain pointing, SSL configuration, and comprehensive admin training.', duration: '1-2 Days' }
    ],
    faqs: [
      {
        q: 'Will my website work smoothly on all mobile devices and browsers?',
        a: 'Yes. Every project is built mobile-first and tested extensively on modern iPhones, Android devices, Safari, Chrome, Firefox, and Edge.'
      },
      {
        q: 'Can I easily update text, images, and products myself without coding?',
        a: 'Absolutely! We connect intuitive Content Management Systems (like WordPress, Sanity, or Shopify admin) and provide custom video tutorials showing you how to update content in minutes.'
      },
      {
        q: 'Do you provide maintenance and bug-fixing after the website goes live?',
        a: 'Yes. Every web project includes complimentary 30 to 60 days of bug-fixing warranty and ongoing maintenance retainers for continuous peace of mind.'
      }
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Data-Driven Digital Marketing & Growth',
    titleUrdu: 'ڈیٹا ڈریون ڈیجیٹل مارکیٹنگ اور گروتھ',
    tagline: 'High-ROI performance campaigns, search dominance, and predictable customer acquisition.',
    heroPitch: 'Having a great product is only half the battle—the world needs to discover it. Prime Plus Team builds precision marketing funnels that turn strangers into loyal paying clients. Utilizing advanced Meta Ads (FB & IG), Google Search/Shopping PPC, Technical SEO, and automated retargeting, we focus relentlessly on ROAS (Return on Ad Spend) and scalable business revenue.',
    badge: 'Growth Engine',
    themeColor: {
      primary: 'from-amber-500 to-orange-500',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
      glow: 'shadow-[0_0_30px_rgba(245,158,11,0.15)]',
      text: 'text-amber-400',
    },
    keyHighlights: [
      'Proven Multi-Million Dollar Ad Spend Management with 3.8x - 5.5x ROAS',
      'Meta (Facebook & Instagram) Pixel Tracking & CAPI Server-Side Events',
      'Google Ads Mastery: High-Intent Search, Shopping PMax & YouTube Funnels',
      'Dominant SEO: Technical Site Audits, Keyword Clustering & Quality Link Building',
      'Transparent Weekly Reporting Dashboards with Real CAC, LTV & Revenue Figures'
    ],
    subServices: [
      {
        id: 'meta-ads',
        title: 'Meta Ads (Facebook & Instagram Advertising)',
        titleUrdu: 'فیس بک اور انسٹاگرام پیڈ اشتہارات',
        shortDesc: 'Hyper-targeted lead generation and e-commerce sales funnels with high return on ad spend.',
        fullDesc: 'Stop wasting budget on broad boosting. We engineer multi-tier ad funnels: Top of Funnel (cold audience awareness with hook-driven video and carousel creatives), Middle of Funnel (engagers & product viewers), and Bottom of Funnel (dynamic product retargeting & abandoned cart incentives). Includes Meta Conversions API (CAPI) setup for 100% accurate post-iOS 14 tracking.',
        deliverables: [
          'Complete Business Manager & Conversions API (CAPI) Setup',
          'Audience Persona Research & Competitor Creative Audits',
          'High-CTR Ad Copywriting & Dynamic Creative Testing',
          'Weekly Bid Optimization, Budget Scaling & Negative Targeting',
          'Custom Live Data Studio Dashboard for Tracking Sales'
        ],
        tools: ['Meta Business Suite', 'Conversions API', 'Canva', 'AdEspresso'],
        iconName: 'TrendingUp',
        estimatedTimeline: 'Ongoing / 30-Day Sprints'
      },
      {
        id: 'google-ads-ppc',
        title: 'Google Ads & Performance Max (PPC)',
        titleUrdu: 'گوگل اشتہارات اور سرچ مارکیٹنگ (PPC)',
        shortDesc: 'Capture high-intent buyers searching directly for your products and services.',
        fullDesc: 'When users search on Google, they are ready to purchase. We build high-converting Search Campaigns with high Quality Scores (lowering your cost-per-click), Google Merchant Center Shopping feeds, Performance Max (PMax) multi-channel campaigns, and YouTube pre-roll video ads.',
        deliverables: [
          'High-Intent Keyword Research with Negative Keyword Lists',
          'Compelling Responsive Search Ad (RSA) Copy & Extensions',
          'Google Merchant Center Feed Approval & Optimization',
          'Google Tag Manager (GTM) Conversion Tracking',
          'Bid Strategy Tuning (Target CPA, Target ROAS, Max Conversions)'
        ],
        tools: ['Google Ads', 'Google Tag Manager', 'GA4', 'Google Merchant Center'],
        iconName: 'Search',
        estimatedTimeline: 'Ongoing / 30-Day Sprints'
      },
      {
        id: 'seo-organic',
        title: 'Search Engine Optimization (SEO)',
        titleUrdu: 'سرچ انجن آپٹیمائزیشن (آرگینک رینکنگ)',
        shortDesc: 'Rank on Page 1 of Google for competitive keywords to gain free, compounding traffic.',
        fullDesc: 'SEO is the highest-margin acquisition channel in digital business. We execute an end-to-end strategy: Technical SEO (crawlability, sitemaps, canonical tags, schema markup), On-Page SEO (keyword-optimized titles, headers, internal linking, entity optimization), and Off-Page SEO (editorial backlink acquisition and digital PR).',
        deliverables: [
          'Exhaustive 100+ Point Technical SEO Health Audit',
          'Keyword Opportunity Matrix with Search Intent Mapping',
          'On-Page Optimization of Core Pages & Metadata',
          'Rich Schema Markup (Organization, FAQ, Product, LocalBusiness)',
          'Monthly High-Authority White-Hat Backlink Outreach'
        ],
        tools: ['SEMrush', 'Ahrefs', 'Google Search Console', 'Screaming Frog'],
        iconName: 'LineChart',
        estimatedTimeline: '3 to 6 Month Cycles'
      },
      {
        id: 'social-media-management',
        title: 'Full Social Media Management (SMM)',
        titleUrdu: 'مکمل سوشل میڈیا مینجمنٹ اور گروتھ',
        shortDesc: 'Consistent visual storytelling, engaging copywriting, community management, and brand authority.',
        fullDesc: 'Turn your social channels into active client communities. We plan, design, write, schedule, and monitor your brand profiles across Instagram, LinkedIn, Facebook, and TikTok. Featuring a structured 30-day content calendar, engaging captions with research-backed hashtags, and active follower engagement.',
        deliverables: [
          'Monthly Content Calendar (12 to 24 Posts + Stories + Reels)',
          'Custom Designed Graphics & Video Reels Editing',
          'Persuasive Caption Writing & Strategic Hashtag Bundles',
          'Community Direct Message & Comment Moderation Guidelines',
          'Monthly Growth & Engagement Analytics Report'
        ],
        tools: ['Buffer', 'Meta Business Suite', 'Hootsuite', 'CapCut'],
        iconName: 'Share2',
        estimatedTimeline: 'Monthly Retainer'
      },
      {
        id: 'cro-email-marketing',
        title: 'Conversion Optimization & Email Automation',
        titleUrdu: 'کنورژن آپٹیمائزیشن اور ای میل فنلز',
        shortDesc: 'Automated email sequences, abandoned cart triggers, and landing page split-testing.',
        fullDesc: 'Traffic without conversion is wasted money. We analyze heatmaps to remove checkout friction and install automated email flows: Welcome Series, Abandoned Cart Reminders, Post-Purchase Cross-Sells, and Customer Win-Back campaigns that routinely add 15% - 30% to monthly revenue on autopilot.',
        deliverables: [
          'Heatmap & User Session Recording Analysis (Hotjar)',
          'A/B Landing Page Headline & CTA Optimization',
          'Klaviyo / Mailchimp Automation Workflows (Welcome, Cart, VIP)',
          'Custom Responsive Branded Email Templates',
          'Deliverability Audit & Spam Score Minimization'
        ],
        tools: ['Klaviyo', 'Hotjar', 'Mailchimp', 'Google Optimize / VWO'],
        iconName: 'Mail',
        estimatedTimeline: '10 - 20 Days'
      }
    ],
    industryTools: [
      { name: 'Meta Business Suite & CAPI', category: 'Paid Social Advertising', badge: 'Primary' },
      { name: 'Google Ads & PMax', category: 'High-Intent Search Ads', badge: 'Primary' },
      { name: 'Google Analytics 4 (GA4)', category: 'Attribution & Traffic Telemetry' },
      { name: 'SEMrush & Ahrefs', category: 'SEO Intelligence & Link Building' },
      { name: 'Google Tag Manager', category: 'Server-Side Event Tracking' },
      { name: 'Klaviyo', category: 'E-Commerce Email Automation' },
      { name: 'Hotjar', category: 'User Heatmaps & Behavior' }
    ],
    processSteps: [
      { step: '01', title: 'Market Audit & Competitor Teardown', desc: 'Analyzing what ads your top competitors are running, keyword gaps, and unit economics.', duration: '2-3 Days' },
      { step: '02', title: 'Tracking Infrastructure & Pixel CAPI', desc: 'Setting up Google Tag Manager, GA4, and Meta CAPI to eliminate tracking blindspots.', duration: '2-3 Days' },
      { step: '03', title: 'Creative Hook & Copy Sprint', desc: 'Designing high-impact video reels, carousel creatives, and persuasive ad angles.', duration: '3-5 Days' },
      { step: '04', title: 'Controlled Launch & A/B Testing', desc: 'Deploying controlled ad budgets to validate winning combinations of audience and creative.', duration: '5-7 Days' },
      { step: '05', title: 'Aggressive Scaling & ROI Optimization', desc: 'Pouring budget into verified winners while cutting losing variants to expand net margins.', duration: 'Ongoing' }
    ],
    faqs: [
      {
        q: 'What kind of ROAS (Return on Ad Spend) can we realistically expect?',
        a: 'While results vary depending on product offer and brand maturity, our e-commerce campaigns routinely achieve between 3.2x to 5.5x ROAS within the first 60 days of optimized scaling.'
      },
      {
        q: 'Is ad spend budget included in your agency management fee?',
        a: 'No. You pay the ad platforms (Meta, Google) directly from your credit card, ensuring complete transparency. Our fee covers strategy, creative production, tracking setup, daily optimization, and reporting.'
      },
      {
        q: 'How quickly will we see results from SEO vs Paid Ads?',
        a: 'Paid Ads (Meta & Google) deliver traffic and leads within 24 to 48 hours of launch. Organic SEO is a compounding long-term asset that begins generating measurable rank improvements within 60 to 90 days.'
      }
    ]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-apex-apparel',
    title: 'Apex Luxury Apparel - Complete Brand & E-Commerce Overhaul',
    client: 'Apex Fashion Collective',
    category: 'graphic-design',
    categoryLabel: 'Graphic Design + E-Commerce',
    summary: 'A premium apparel brand needed a complete identity redesign, luxury packaging, and a custom high-speed Shopify store.',
    challenge: 'The brand had an outdated logo, slow page speeds (4.2 seconds), and high cart abandonment rate of 78%.',
    solution: 'Prime Plus Team designed a minimalist luxury vector logo, bespoke gold-accented garment boxes, and engineered a custom Shopify Liquid theme loading in 0.9s.',
    results: [
      { metric: '+340%', label: 'Online Sales in 90 Days' },
      { metric: '0.9s', label: 'Average Page Load Time' },
      { metric: '-42%', label: 'Cart Drop-Off Reduction' }
    ],
    deliverables: ['Brand Manual', 'Garment Packaging', 'Custom Shopify Theme', 'Product Renders'],
    techStack: ['Adobe Illustrator', 'Figma', 'Shopify Liquid', 'Tailwind CSS'],
    year: '2025',
    imageAccent: 'from-pink-600 to-rose-700'
  },
  {
    id: 'case-finpulse-saas',
    title: 'FinPulse Enterprise - SaaS Dashboard & Full-Stack Platform',
    client: 'FinPulse Financial Ltd',
    category: 'web-development',
    categoryLabel: 'Full-Stack Web Development',
    summary: 'Built a real-time financial tracking and multi-currency billing portal handling thousands of active user sessions.',
    challenge: 'Client required institutional-grade security, instant data updates, and role-based permissions without lag.',
    solution: 'Developed a React 19 / Next.js enterprise web app with Node.js backend, PostgreSQL database, and real-time WebSocket telemetry.',
    results: [
      { metric: '100/100', label: 'Google Lighthouse Score' },
      { metric: '15,000+', label: 'Daily Active Users' },
      { metric: '99.99%', label: 'Verified System Uptime' }
    ],
    deliverables: ['Design System', 'Full-Stack Application', 'REST API Suite', 'Docker Cloud Infra'],
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    year: '2025',
    imageAccent: 'from-sky-600 to-indigo-700'
  },
  {
    id: 'case-zenith-marketing',
    title: 'Zenith Health & Skincare - Meta Ads Scaling to $140k/Month',
    client: 'Zenith Health Labs',
    category: 'digital-marketing',
    categoryLabel: 'Digital Marketing & ROAS',
    summary: 'Scaled a direct-to-consumer organic skincare brand from $15k to $140k in monthly revenue using Meta Ads and Klaviyo funnels.',
    challenge: 'High customer acquisition costs on Facebook and lack of email retargeting led to stagnant growth.',
    solution: 'Implemented Meta Conversions API (CAPI), produced 40+ high-hook video creatives, and designed automated 6-step Klaviyo email funnels.',
    results: [
      { metric: '4.8x', label: 'Verified Blended ROAS' },
      { metric: '$140k+', label: 'Monthly Revenue Reached' },
      { metric: '+28%', label: 'Revenue from Email Funnels' }
    ],
    deliverables: ['Meta Ads Funnels', 'Creative Ad Packs', 'Klaviyo Email Flows', 'GA4 Dashboard'],
    techStack: ['Meta Business Suite', 'Google Ads', 'Klaviyo', 'Canva', 'CapCut'],
    year: '2026',
    imageAccent: 'from-amber-600 to-orange-700'
  },
  {
    id: 'case-urban-kitchen',
    title: 'UrbanBite Gourmet - Viral Local Social & Online Ordering Portal',
    client: 'UrbanBite Hospitality',
    category: 'web-development',
    categoryLabel: 'Web Dev + Graphic Design + Marketing',
    summary: 'All-in-one digital transformation: brand packaging, QR-code table ordering web app, and localized Meta/TikTok ad campaigns.',
    challenge: 'Reliance on food delivery aggregators taking 30% commission per order.',
    solution: 'Built a proprietary direct ordering web app with WhatsApp checkout and launched geo-fenced Instagram reels promotions within a 10km radius.',
    results: [
      { metric: '65%', label: 'Orders Shifted to Direct Channel' },
      { metric: '₨1.8M+', label: 'Monthly Direct Revenue Saved' },
      { metric: '45,000+', label: 'Local Foodie Reach' }
    ],
    deliverables: ['Menu Packaging', 'Next.js Ordering Web App', 'WhatsApp Cloud API', 'Local Ad Campaigns'],
    techStack: ['Next.js', 'Figma', 'Meta Ads', 'WhatsApp Cloud API'],
    year: '2026',
    imageAccent: 'from-emerald-600 to-teal-700'
  }
];

export const PRICING_PACKAGES: PackageOption[] = [
  {
    id: 'pkg-design-starter',
    category: 'graphic-design',
    name: 'Brand Identity Essential',
    tagline: 'Ideal for startups & new ventures needing a cohesive visual foundation.',
    pricePKR: 45000,
    priceUSD: 249,
    duration: '5 - 7 Days',
    idealFor: 'Startups, Solo Founders & Rebranding Businesses',
    features: [
      '3 Distinct Primary Logo Concepts',
      'Vector Master Files (AI, SVG, EPS, PDF, PNG)',
      'Brand Color Palette & Typography Hierarchy',
      'Social Media Profile Avatar & Cover Pack',
      'Double-Sided Business Card & Letterhead Design',
      '3 Rounds of Dedicated Revisions',
      'Full Commercial Copyright Transfer'
    ]
  },
  {
    id: 'pkg-design-pro',
    category: 'graphic-design',
    name: 'Complete Brand & UI/UX Suite',
    tagline: 'Comprehensive visual architecture for scaling businesses & digital products.',
    pricePKR: 110000,
    priceUSD: 599,
    duration: '10 - 14 Days',
    popular: true,
    idealFor: 'Established Companies & Digital Product Launches',
    features: [
      'Everything in Brand Identity Essential',
      '30+ Page Master Brand Identity Guidelines Manual',
      'Complete Web or Mobile App UI/UX (Up to 8 Key Screens in Figma)',
      'Clickable Interactive Prototype for User Testing',
      '15 Custom Social Media / Ad Creative Templates',
      'Product Packaging or Merchandise Die-Line Artwork',
      'Priority Design Support & Unlimited Minor Revisions'
    ]
  },
  {
    id: 'pkg-web-business',
    category: 'web-development',
    name: 'High-Impact Business Website',
    tagline: 'Modern, ultra-fast corporate website engineered to capture qualified client leads.',
    pricePKR: 85000,
    priceUSD: 499,
    duration: '8 - 12 Days',
    idealFor: 'Agencies, Professional Services & Corporate Entities',
    features: [
      'Up to 7 Custom Coded Pages (React / Next.js / WordPress)',
      '100% Mobile & Tablet Responsive Architecture',
      '90+ Google PageSpeed & Core Web Vitals Optimization',
      'Interactive Contact Forms & Direct WhatsApp Click-to-Chat',
      'Full On-Page SEO Setup, XML Sitemap & Google Search Console',
      'SSL Encryption & Security Firewall Configuration',
      '30 Days Post-Launch Warranty & Support'
    ]
  },
  {
    id: 'pkg-web-ecommerce',
    category: 'web-development',
    name: 'E-Commerce Growth Store',
    tagline: 'Engineered for seamless sales, high conversion rates, and multi-gateway checkout.',
    pricePKR: 160000,
    priceUSD: 899,
    duration: '14 - 21 Days',
    popular: true,
    idealFor: 'Brands Selling Physical or Digital Products Online',
    features: [
      'Bespoke Shopify / WooCommerce / Next.js Storefront',
      'Unlimited Product Catalog Architecture & Inventory Sync',
      'Payment Gateway Integration (Stripe, PayPal, JazzCash, COD)',
      'High-Conversion 1-Page Checkout with Abandoned Cart Reminders',
      'Product Reviews, Wishlist & Smart Search Filtering',
      'Speed Tuning with Sub-1s Loading Times',
      '60 Days Free Technical Support & Admin Training'
    ]
  },
  {
    id: 'pkg-mkt-growth',
    category: 'digital-marketing',
    name: 'Performance Growth Sprint',
    tagline: 'Precision paid advertising across Meta & Google to generate immediate sales.',
    pricePKR: 95000,
    priceUSD: 549,
    duration: '30-Day Managed Sprint',
    idealFor: 'E-Commerce Brands & Lead Generation Businesses',
    features: [
      'Meta (Facebook & Instagram) OR Google Ads Campaign Management',
      'Full Meta Pixel & Conversions API (CAPI) Server-Side Setup',
      '12 Bespoke High-CTR Ad Creatives & Copywriting Variations',
      'Audience Persona Research & Competitor Creative Audit',
      'Daily Budget, Bid Strategy & Negative Keyword Optimization',
      'Live Google Data Studio Real-Time Analytics Dashboard',
      'Weekly Strategy Review & Growth Consultation Calls'
    ]
  },
  {
    id: 'pkg-all-in-one',
    category: 'all-in-one',
    name: 'Prime Plus Agency Transformation',
    tagline: 'Complete digital dominance: Full Brand Design + Custom Web App + Full Marketing Funnel.',
    pricePKR: 320000,
    priceUSD: 1799,
    duration: '3 - 4 Weeks',
    popular: true,
    idealFor: 'Enterprises & Ambitious Brands Seeking Rapid Scale',
    features: [
      '🎨 Full Brand Architecture: Logo, Manual, Social Packs & Packaging',
      '💻 Custom Next.js / Shopify E-Commerce or Corporate Web Platform',
      '📈 30 Days Full Performance Marketing (Meta Ads + Google Ads + SEO)',
      '⚡ Sub-Second Load Speeds & 100/100 Lighthouse Optimization',
      '📧 Complete Automated Klaviyo / Mailchimp Email Sequence Setup',
      '🏆 Dedicated Senior Project Manager & Daily WhatsApp Group Access',
      '🛡️ 90 Days Comprehensive Post-Launch Maintenance & Growth Advisory'
    ]
  }
];

export const ESTIMATOR_OPTIONS: EstimatorItem[] = [
  // Graphic Design
  { id: 'est-logo', category: 'graphic-design', title: 'Brand Identity & Vector Logo Suite', basePKR: 45000, baseUSD: 249, days: 6 },
  { id: 'est-uiux', category: 'graphic-design', title: 'Full UI/UX Design System in Figma (8+ screens)', basePKR: 65000, baseUSD: 360, days: 9 },
  { id: 'est-social', category: 'graphic-design', title: 'Social Media 20-Creative Ad Banner Pack', basePKR: 30000, baseUSD: 160, days: 4 },
  { id: 'est-packaging', category: 'graphic-design', title: 'Product Packaging & 3D Photoreal Mockups', basePKR: 40000, baseUSD: 220, days: 6 },

  // Web Development
  { id: 'est-landing', category: 'web-development', title: 'High-Converting Single Page Landing Page', basePKR: 45000, baseUSD: 249, days: 5 },
  { id: 'est-corpweb', category: 'web-development', title: 'Corporate Multi-Page Website with CMS', basePKR: 85000, baseUSD: 499, days: 10 },
  { id: 'est-ecom', category: 'web-development', title: 'Full Shopify / WooCommerce E-Commerce Store', basePKR: 150000, baseUSD: 850, days: 16 },
  { id: 'est-customapp', category: 'web-development', title: 'Custom Full-Stack Web App (React / Next.js / Node)', basePKR: 220000, baseUSD: 1250, days: 25 },

  // Digital Marketing
  { id: 'est-metaads', category: 'digital-marketing', title: 'Meta Ads (Facebook & Instagram) 30-Day Campaign', basePKR: 60000, baseUSD: 340, days: 30 },
  { id: 'est-googleads', category: 'digital-marketing', title: 'Google Ads (Search & Shopping PMax) Setup & Scaling', basePKR: 60000, baseUSD: 340, days: 30 },
  { id: 'est-seo', category: 'digital-marketing', title: 'Complete Technical & On-Page SEO Campaign', basePKR: 70000, baseUSD: 390, days: 30 },
  { id: 'est-emailfunnel', category: 'digital-marketing', title: 'Automated Klaviyo Email Marketing Flow Setup', basePKR: 35000, baseUSD: 190, days: 7 }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    clientName: 'Hamza Tariq',
    role: 'Managing Director',
    company: 'Apex Apparel Group',
    country: 'Pakistan & UAE',
    serviceCategory: 'Graphic Design & E-Commerce',
    rating: 5,
    review: 'Working with Prime Plus Team was a game changer for our fashion brand. They redesigned our entire luxury packaging and developed a lightning fast Shopify store that tripled our online conversions in under 90 days. Their communication is flawless.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    projectImpact: '+340% Sales & 0.9s Page Load'
  },
  {
    id: 't-2',
    clientName: 'Sarah Jenkins',
    role: 'Chief Marketing Officer',
    company: 'FinPulse UK Ltd',
    country: 'United Kingdom',
    serviceCategory: 'Web Development & UI/UX',
    rating: 5,
    review: 'The technical depth of the Prime Plus engineering team is truly impressive. They turned complex financial dashboard requirements into an intuitive React/Next.js application that scored 100 on Lighthouse. Cannot recommend them enough for custom software development.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    projectImpact: '100/100 Lighthouse & 15k+ Daily Users'
  },
  {
    id: 't-3',
    clientName: 'Dr. Zeeshan Malik',
    role: 'Founder & CEO',
    company: 'Zenith Health Labs',
    country: 'Pakistan',
    serviceCategory: 'Digital Marketing & Meta Ads',
    rating: 5,
    review: 'Before hiring Prime Plus Team, our Facebook ads were barely breaking even. Within the second week of their new ad creatives and CAPI tracking, our ROAS climbed to 4.8x! They handle everything with total accountability and daily transparency.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    projectImpact: '4.8x Verified ROAS on $30k Spend'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Muhammad Farhan',
    role: 'Principal Creative Director',
    roleUrdu: 'پرنسپل کریٹیو ڈائریکٹر',
    experience: '8+ Years Experience',
    specialties: ['Brand Identity Systems', 'Typography Architecture', '3D Packaging', 'Figma Systems'],
    bio: 'Oversees visual design and creative strategy for all Prime Plus client projects. Specializes in luxury branding and conversion-driven UI/UX design systems.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'tm-2',
    name: 'Ali Raza Khan',
    role: 'Lead Full-Stack Architect',
    roleUrdu: 'لیڈ فل اسٹیک آرکیٹیکٹ',
    experience: '9+ Years Experience',
    specialties: ['React 19 & Next.js', 'Node.js & TypeScript', 'PostgreSQL & Docker', 'Cloud Architecture'],
    bio: 'Heads web engineering and technical infrastructure. Obsessed with sub-second page performance, microservice scalability, and clean modular code.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'tm-3',
    name: 'Ayesha Noor',
    role: 'Director of Performance Marketing',
    roleUrdu: 'ڈائریکٹر پرفارمنس مارکیٹنگ',
    experience: '7+ Years Experience',
    specialties: ['Meta CAPI & Pixel Setup', 'Google Ads PMax', 'Attribution & GA4', 'Klaviyo Funnels'],
    bio: 'Has managed over $4M in cumulative digital ad spend across e-commerce, healthcare, and B2B SaaS, consistently generating 3.5x to 5.5x verified return on ad spend.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'tm-4',
    name: 'Bilal Ahmed',
    role: 'Senior UI/UX & Motion Designer',
    roleUrdu: 'سینئر یو آئی / یو ایکس ڈیزائنر',
    experience: '6+ Years Experience',
    specialties: ['Figma Prototyping', 'User Research & Wireframing', 'After Effects', 'Design Systems'],
    bio: 'Crafts frictionless human-centered digital experiences and kinetic motion graphics that bring brand narratives to life across web and mobile platforms.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80'
  }
];
