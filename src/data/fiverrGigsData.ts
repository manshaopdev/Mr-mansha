import { Gig, GigCategory } from '../types/fiverr';

export const POPULAR_CATEGORIES = [
  {
    name: 'Website Development',
    category: 'Programming & Tech' as GigCategory,
    subTitle: 'Build your digital presence',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=600&q=80',
    color: 'from-red-600 to-rose-700',
  },
  {
    name: 'Logo & Brand Identity',
    category: 'Graphics & Design' as GigCategory,
    subTitle: 'Establish your iconic brand',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80',
    color: 'from-amber-500 to-yellow-600',
  },
  {
    name: 'Meta & Google Ads',
    category: 'Digital Marketing' as GigCategory,
    subTitle: 'Scale customers & revenue',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    color: 'from-red-500 to-orange-600',
  },
  {
    name: 'Shopify & E-Commerce',
    category: 'Programming & Tech' as GigCategory,
    subTitle: 'Sell products seamlessly',
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80',
    color: 'from-emerald-600 to-teal-700',
  },
  {
    name: 'AI Services & Bots',
    category: 'AI Services' as GigCategory,
    subTitle: 'Automate with next-gen intelligence',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80',
    color: 'from-yellow-500 to-red-600',
  },
  {
    name: 'Video & Short-form Reels',
    category: 'Video & Animation' as GigCategory,
    subTitle: 'Capture viral attention',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80',
    color: 'from-rose-600 to-purple-700',
  },
];

export const TRUSTED_COMPANIES = [
  { name: 'Meta', label: 'Meta' },
  { name: 'Google', label: 'Google' },
  { name: 'Netflix', label: 'NETFLIX' },
  { name: 'P&G', label: 'P&G' },
  { name: 'PayPal', label: 'PayPal' },
  { name: 'Payoneer', label: 'Payoneer' },
];

export const GIGS_DATA: Gig[] = [
  {
    id: 'gig-1',
    title: 'I will design and develop a responsive modern website in React, Next.js or Tailwind',
    slug: 'react-nextjs-responsive-website-design',
    category: 'Programming & Tech',
    subCategory: 'Web Development',
    seller: {
      id: 'seller-1',
      name: 'Farhan Malik',
      username: 'farhan_dev_pro',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      level: 'Top Rated Seller',
      country: 'Pakistan',
      memberSince: 'March 2020',
      avgResponseTime: '1 Hour',
      lastDelivery: '3 hours ago',
      rating: 5.0,
      reviewsCount: 384,
      bio: 'Full-stack lead engineer at Figer Free with 7+ years of experience delivering robust web platforms for international clients.',
      languages: ['English (Fluent)', 'Urdu (Native)'],
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'REST APIs'],
      isPro: true,
    },
    rating: 5.0,
    reviewsCount: 384,
    ordersInQueue: 7,
    startingPricePkr: 25000,
    startingPriceUsd: 90,
    badge: 'Prime Choice',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    ],
    description: `Welcome to Figer Free's premier Web Engineering Gig! 
We build pixel-perfect, hyper-fast, mobile-friendly websites engineered with React 19, Next.js, and clean Tailwind CSS.

What you get with this Gig:
✔ Custom-crafted responsive design matching modern 2026 aesthetics
✔ 100% clean, modular, and maintainable TypeScript codebase
✔ Ultra-fast loading speed (Google PageSpeed 95+ guarantee)
✔ Cross-browser compatibility (Chrome, Safari, Firefox, Edge)
✔ Free deployment setup on Vercel, Netlify, or Cloud Run
✔ 30 days post-launch technical warranty & direct in-app chat support`,
    packages: {
      basic: {
        name: 'Basic',
        title: 'Starter Landing Page',
        description: 'Single-page responsive high-converting landing page with modern layout, hero banner, features, and contact form.',
        deliveryDays: 2,
        revisions: '3 Revisions',
        pricePkr: 25000,
        priceUsd: 90,
        features: [
          { name: '1 Page Responsive Design', included: true },
          { name: 'Mobile Optimized UI', included: true },
          { name: 'Contact Form Integration', included: true },
          { name: 'Source Code Handover', included: true },
          { name: 'Speed Optimization', included: false },
          { name: 'Multi-language Support', included: false },
          { name: 'Database / API Integration', included: false },
        ],
      },
      standard: {
        name: 'Standard',
        title: 'Complete Corporate Multi-Page',
        description: 'Up to 5 custom pages (Home, About, Services, Portfolio, Contact) with clean animations and CMS ready.',
        deliveryDays: 5,
        revisions: 'Unlimited Revisions',
        pricePkr: 65000,
        priceUsd: 230,
        features: [
          { name: 'Up to 5 Responsive Pages', included: true },
          { name: 'Mobile Optimized UI', included: true },
          { name: 'Contact Form Integration', included: true },
          { name: 'Source Code Handover', included: true },
          { name: 'Speed Optimization (90+)', included: true },
          { name: 'Interactive Animations', included: true },
          { name: 'Database / API Integration', included: false },
        ],
      },
      premium: {
        name: 'Premium',
        title: 'Full-Stack Web App Suite',
        description: 'Custom full-stack web application with authentication, API integration, database, admin panel, and 14 days VIP support.',
        deliveryDays: 10,
        revisions: 'Unlimited Revisions',
        pricePkr: 140000,
        priceUsd: 495,
        features: [
          { name: 'Up to 10 Pages / Views', included: true },
          { name: 'Mobile Optimized UI', included: true },
          { name: 'Contact Form Integration', included: true },
          { name: 'Source Code Handover', included: true },
          { name: 'Speed Optimization (95+)', included: true },
          { name: 'Full Stack & Database Integration', included: true },
          { name: 'Payment Gateway Setup', included: true },
        ],
      },
    },
    faqs: [
      {
        question: 'Will my website be mobile-friendly and work on all phones?',
        answer: 'Yes, 100%. We test every website rigorously across iOS and Android devices, ensuring flawless responsive behavior.',
      },
      {
        question: 'Do I get the complete source code and full copyright?',
        answer: 'Yes! You receive full ownership and clean GitHub repository transfer as soon as the project is completed.',
      },
      {
        question: 'Can I pay in PKR via JazzCash, EasyPaisa or Pakistani Bank Transfer?',
        answer: 'Absolutely. Figer Free supports direct PKR bank transfers, Raast, JazzCash, EasyPaisa, and international cards.',
      },
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Saad Rafiq',
        country: 'Pakistan',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2 days ago',
        comment: 'Outstanding delivery! Farhan from Figer Free built our corporate website in record time. Pixel perfect in PKR pricing.',
      },
      {
        id: 'rev-2',
        author: 'Michael Vance',
        country: 'United States',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '1 week ago',
        comment: 'Incredible code quality and communication. Highly recommended for any serious React or Next.js project.',
      },
    ],
    tags: ['react', 'nextjs', 'tailwind', 'website design', 'web development'],
  },
  {
    id: 'gig-2',
    title: 'I will create a luxury minimalist logo and complete corporate brand identity',
    slug: 'luxury-minimalist-logo-brand-identity',
    category: 'Graphics & Design',
    subCategory: 'Logo Design & Branding',
    seller: {
      id: 'seller-2',
      name: 'Ayesha Tariq',
      username: 'ayesha_brand_art',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      level: 'Prime Pro',
      country: 'Pakistan',
      memberSince: 'January 2021',
      avgResponseTime: '30 Mins',
      lastDelivery: '1 hour ago',
      rating: 5.0,
      reviewsCount: 512,
      bio: 'Head of Creative Design at Figer Free. Specialized in timeless corporate branding, brand guidelines, and vector visual identity.',
      languages: ['English (Fluent)', 'Urdu (Native)'],
      skills: ['Adobe Illustrator', 'Logo Design', 'Brand Identity', 'Figma', 'Vector Art'],
      isPro: true,
    },
    rating: 5.0,
    reviewsCount: 512,
    ordersInQueue: 11,
    startingPricePkr: 14000,
    startingPriceUsd: 50,
    badge: 'Pro Verified',
    images: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1000&q=80',
    ],
    description: `A memorable brand starts with an unforgettable visual mark!
I craft bespoke, modern, luxury minimalist logos that elevate your business above competitors.

Why choose Figer Free Creative Studio:
✔ 100% Original custom vector concepts crafted from scratch (no clip art)
✔ High-resolution printable files (AI, EPS, SVG, PDF, PNG, JPG)
✔ Transparent background files for web, merch, and physical signage
✔ Comprehensive Brand Style Guidelines (Color codes, Typography pairing, Usage rules)
✔ 100% commercial copyright transfer`,
    packages: {
      basic: {
        name: 'Basic',
        title: 'Essential Logo Mark',
        description: '2 Original minimalist logo concepts + High-res JPG & transparent PNG + Vector Source file.',
        deliveryDays: 2,
        revisions: '3 Revisions',
        pricePkr: 14000,
        priceUsd: 50,
        features: [
          { name: '2 Initial Logo Concepts', included: true },
          { name: 'High-Res Print Files (PNG, JPG)', included: true },
          { name: 'Vector Source File (AI, SVG)', included: true },
          { name: 'Social Media Kit', included: false },
          { name: 'Stationery Designs', included: false },
          { name: 'Brand Style Guide PDF', included: false },
        ],
      },
      standard: {
        name: 'Standard',
        title: 'Brand Builder Pack',
        description: '3 Unique concepts + All Vector Files + Social Media Profile & Banner Kit + 3D Realistic Mockups.',
        deliveryDays: 3,
        revisions: 'Unlimited Revisions',
        pricePkr: 28000,
        priceUsd: 100,
        features: [
          { name: '3 Initial Logo Concepts', included: true },
          { name: 'High-Res Print Files (PNG, JPG)', included: true },
          { name: 'Vector Source File (AI, SVG)', included: true },
          { name: 'Social Media Kit', included: true },
          { name: 'Stationery Designs (Business Card)', included: true },
          { name: 'Brand Style Guide PDF', included: false },
        ],
      },
      premium: {
        name: 'Premium',
        title: 'Complete Corporate Brand Identity',
        description: '5 Premium concepts + Complete Brand Guidelines Manual + Stationery + Social Media Suite + Copyright Agreement.',
        deliveryDays: 5,
        revisions: 'Unlimited Revisions',
        pricePkr: 60000,
        priceUsd: 215,
        features: [
          { name: '5 Initial Logo Concepts', included: true },
          { name: 'High-Res Print Files (PNG, JPG)', included: true },
          { name: 'Vector Source File (AI, SVG, PDF)', included: true },
          { name: 'Complete Social Media Kit', included: true },
          { name: 'Full Stationery Suite', included: true },
          { name: '25-Page Brand Style Guide PDF', included: true },
        ],
      },
    },
    faqs: [
      {
        question: 'What formats will I receive?',
        answer: 'You receive all industry standard master files: AI, EPS, PDF, SVG, high-res PNG (transparent), and JPG.',
      },
    ],
    reviews: [
      {
        id: 'rev-3',
        author: 'Khurram Shehzad',
        country: 'Pakistan',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '3 days ago',
        comment: 'Ayesha delivered a world-class luxury logo for our real estate firm. Incredible taste and super quick iterations!',
      },
    ],
    tags: ['logo design', 'branding', 'minimalist logo', 'brand identity', 'vector'],
  },
  {
    id: 'gig-3',
    title: 'I will setup and manage high ROI Facebook, Instagram and Meta ad campaigns with CAPI',
    slug: 'meta-facebook-instagram-ads-management',
    category: 'Digital Marketing',
    subCategory: 'Social Media Advertising',
    seller: {
      id: 'seller-3',
      name: 'Bilal Khan',
      username: 'bilal_growth_ads',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      level: 'Top Rated Seller',
      country: 'Pakistan',
      memberSince: 'May 2019',
      avgResponseTime: '45 Mins',
      lastDelivery: '5 hours ago',
      rating: 4.9,
      reviewsCount: 290,
      bio: 'Performance Marketer at Figer Free. Managed over $2M+ in profitable ad spend across Shopify stores, B2B lead gen, and local brands.',
      languages: ['English', 'Urdu'],
      skills: ['Facebook Ads', 'Instagram Ads', 'Meta Pixel', 'CAPI', 'ROAS Optimization', 'Copywriting'],
      isPro: true,
    },
    rating: 4.9,
    reviewsCount: 290,
    ordersInQueue: 5,
    startingPricePkr: 20000,
    startingPriceUsd: 70,
    badge: 'Best Seller',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=1000&q=80',
    ],
    description: `Stop burning money on random ad boosts! 
Figer Free builds high-converting Meta advertising systems backed by deep audience segmentation, server-side Conversion API (CAPI), and ruthless ROAS scaling.

What is included:
✔ Meta Pixel & Server-Side Conversions API (iOS 14+ tracking setup)
✔ Competitor Ad Research & Angle Validation
✔ Custom Ad Creative Design & High-converting copy
✔ Retargeting & Lookalike Audience funnel architecture
✔ Weekly transparent analytics & live WhatsApp updates`,
    packages: {
      basic: {
        name: 'Basic',
        title: 'Audit & Setup',
        description: 'Complete Meta Pixel + CAPI setup, custom events tracking, and 1 conversion campaign launch.',
        deliveryDays: 3,
        revisions: '2 Revisions',
        pricePkr: 20000,
        priceUsd: 70,
        features: [
          { name: 'Pixel & CAPI Setup', included: true },
          { name: '1 Campaign + 2 Ad Sets', included: true },
          { name: 'Target Audience Research', included: true },
          { name: 'Ad Copywriting', included: true },
          { name: '7 Days Ongoing Management', included: false },
          { name: 'Weekly Live Reporting', included: false },
        ],
      },
      standard: {
        name: 'Standard',
        title: '14-Day Growth Engine',
        description: 'Full funnel campaign setup (Cold audience + Retargeting) with 14 days of live daily ROAS management & split testing.',
        deliveryDays: 5,
        revisions: 'Unlimited Revisions',
        pricePkr: 50000,
        priceUsd: 180,
        features: [
          { name: 'Pixel & CAPI Setup', included: true },
          { name: 'Up to 3 Campaigns (Full Funnel)', included: true },
          { name: 'Target Audience Research', included: true },
          { name: 'Custom Ad Creatives (Images)', included: true },
          { name: '14 Days Ongoing Management', included: true },
          { name: 'Weekly Live Reporting', included: true },
        ],
      },
      premium: {
        name: 'Premium',
        title: '30-Day Scale Machine',
        description: 'Comprehensive 30 days scale management with unlimited campaigns, A/B video ads testing, ROAS scaling, and weekly strategy call.',
        deliveryDays: 7,
        revisions: 'Unlimited Revisions',
        pricePkr: 95000,
        priceUsd: 340,
        features: [
          { name: 'Pixel & CAPI Setup', included: true },
          { name: 'Unlimited Campaigns', included: true },
          { name: 'Target Audience Research', included: true },
          { name: 'Ad Creatives + Video Angles', included: true },
          { name: '30 Days Full Management', included: true },
          { name: 'Weekly Strategy Calls & Report', included: true },
        ],
      },
    },
    faqs: [
      {
        question: 'Does the package price include ad spend?',
        answer: 'No, ad spend is paid directly to Meta via your business debit/credit card. Our fee is for campaign architecture, creative strategy, and management.',
      },
    ],
    reviews: [
      {
        id: 'rev-4',
        author: 'Zainab Qureshi',
        country: 'Pakistan',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '5 days ago',
        comment: 'We got 4.2x ROAS on our clothing store within the first 10 days of Bilal taking over our Meta ads. Figer Free is legit!',
      },
    ],
    tags: ['facebook ads', 'instagram ads', 'digital marketing', 'meta ads', 'roas'],
  },
  {
    id: 'gig-4',
    title: 'I will build a high converting Shopify dropshipping store or branded ecommerce site',
    slug: 'high-converting-shopify-store-ecommerce',
    category: 'Programming & Tech',
    subCategory: 'E-Commerce Development',
    seller: {
      id: 'seller-4',
      name: 'Hamza Nadeem',
      username: 'hamza_shopify_guru',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      level: 'Level 2 Seller',
      country: 'Pakistan',
      memberSince: 'August 2021',
      avgResponseTime: '1 Hour',
      lastDelivery: '2 hours ago',
      rating: 4.9,
      reviewsCount: 215,
      bio: 'Shopify Expert at Figer Free. Built 120+ branded dropshipping and private label stores with seamless checkout.',
      languages: ['English', 'Urdu'],
      skills: ['Shopify', 'Liquid', 'Dropshipping', 'CRO', 'Payment Gateways'],
      isPro: false,
    },
    rating: 4.9,
    reviewsCount: 215,
    ordersInQueue: 4,
    startingPricePkr: 30000,
    startingPriceUsd: 110,
    badge: 'Top Rated',
    images: [
      'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
    ],
    description: `Want to launch a successful e-commerce store that actually makes sales?
Figer Free creates branded Shopify stores designed specifically to convert cold visitors into paying buyers.

Store features include:
✔ Premium licensed Shopify theme setup
✔ High-converting product page layout (Sticky add-to-cart, Trust badges)
✔ Automatic local & international payment gateway integration (Stripe, COD, JazzCash)
✔ Mobile responsive 1-click checkout flow
✔ Free dropshipping automation app setup (DSers / CJ Dropshipping / Zendrop)`,
    packages: {
      basic: {
        name: 'Basic',
        title: 'Single Product Branded Store',
        description: 'Complete 1-Product branded store with high converting landing page, reviews, and payment setup.',
        deliveryDays: 3,
        revisions: '3 Revisions',
        pricePkr: 30000,
        priceUsd: 110,
        features: [
          { name: '1 Winning Product Setup', included: true },
          { name: 'Premium Theme Customization', included: true },
          { name: 'Payment Gateway Integration', included: true },
          { name: 'Apps Setup', included: true },
          { name: 'Up to 20 Products', included: false },
          { name: 'SEO Optimization', included: false },
        ],
      },
      standard: {
        name: 'Standard',
        title: 'Niche Store (Up to 25 Products)',
        description: 'Full branded niche store with 25 winning products, collection pages, policy pages, and upsells.',
        deliveryDays: 5,
        revisions: 'Unlimited Revisions',
        pricePkr: 60000,
        priceUsd: 215,
        features: [
          { name: 'Up to 25 Winning Products', included: true },
          { name: 'Premium Theme Customization', included: true },
          { name: 'Payment Gateway Integration', included: true },
          { name: 'Conversion Boosting Apps', included: true },
          { name: 'Order Tracking & Policies', included: true },
          { name: 'SEO Optimization', included: true },
        ],
      },
      premium: {
        name: 'Premium',
        title: 'Ultimate 7-Figure Store Suite',
        description: 'Complete turnkey e-commerce store with 50+ products, automated email marketing, multi-currency, and VIP guidance.',
        deliveryDays: 8,
        revisions: 'Unlimited Revisions',
        pricePkr: 115000,
        priceUsd: 410,
        features: [
          { name: '50+ Products Setup', included: true },
          { name: 'Complete Custom Liquid Design', included: true },
          { name: 'Automated Email Abandoned Cart', included: true },
          { name: 'Multi-Currency & Language', included: true },
          { name: 'Speed Tuning (90+)', included: true },
          { name: '1-on-1 Strategy Consultation', included: true },
        ],
      },
    },
    faqs: [
      {
        question: 'Can I sell in Pakistan with Cash on Delivery (COD)?',
        answer: 'Yes! We configure Cash on Delivery (COD), Trax, PostEx, and courier API sync seamlessly for Pakistani merchants.',
      },
    ],
    reviews: [
      {
        id: 'rev-5',
        author: 'Adeel Murtaza',
        country: 'Pakistan',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '1 week ago',
        comment: 'Hamza made our Shopify store look like a $10M brand. The speed and checkout flow are buttery smooth!',
      },
    ],
    tags: ['shopify', 'ecommerce', 'dropshipping', 'shopify store', 'online store'],
  },
  {
    id: 'gig-5',
    title: 'I will develop custom AI chatbot and automated AI agents using Gemini and OpenAI',
    slug: 'custom-ai-chatbot-gemini-openai-agent',
    category: 'AI Services',
    subCategory: 'AI Web Apps & Agents',
    seller: {
      id: 'seller-5',
      name: 'Dr. Daniyal Riaz',
      username: 'daniyal_ai_labs',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      level: 'Top Rated Seller',
      country: 'Pakistan',
      memberSince: 'February 2022',
      avgResponseTime: '1 Hour',
      lastDelivery: '4 hours ago',
      rating: 5.0,
      reviewsCount: 160,
      bio: 'AI Systems Architect at Figer Free. Building production-grade conversational AI, RAG knowledge bases, and multi-agent workflows.',
      languages: ['English', 'Urdu'],
      skills: ['Python', 'Gemini API', 'LangChain', 'Node.js', 'Vector DB', 'OpenAI'],
      isPro: true,
    },
    rating: 5.0,
    reviewsCount: 160,
    ordersInQueue: 3,
    startingPricePkr: 35000,
    startingPriceUsd: 125,
    badge: 'Pro Verified',
    images: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1000&q=80',
    ],
    description: `Supercharge your business productivity with custom AI agents and chatbots!
Figer Free crafts conversational AI assistants trained directly on your business documents, FAQs, or customer catalogs.

What we build:
✔ Website Customer Support Chatbot with automated human escalation
✔ WhatsApp Business AI Bot for orders and bookings
✔ RAG (Retrieval Augmented Generation) on custom PDF manuals
✔ Lead Qualification & CRM Sync (HubSpot, Google Sheets)
✔ Production-grade security with token limit guards`,
    packages: {
      basic: {
        name: 'Basic',
        title: 'Website AI Chatbot',
        description: 'Interactive AI Chat widget embedded on your website with custom prompt instructions and branding.',
        deliveryDays: 3,
        revisions: '2 Revisions',
        pricePkr: 35000,
        priceUsd: 125,
        features: [
          { name: 'Custom AI Chat Widget', included: true },
          { name: 'Trained on up to 10 FAQs', included: true },
          { name: 'Website Embed Code', included: true },
          { name: 'Source Code Handover', included: true },
          { name: 'WhatsApp Integration', included: false },
          { name: 'Document Vector Search (RAG)', included: false },
        ],
      },
      standard: {
        name: 'Standard',
        title: 'Smart Business AI Agent',
        description: 'Trained on your company documents (PDFs/URLs), handles complex inquiries, and captures client leads.',
        deliveryDays: 6,
        revisions: 'Unlimited Revisions',
        pricePkr: 75000,
        priceUsd: 265,
        features: [
          { name: 'Full Custom AI Assistant', included: true },
          { name: 'Trained on Custom Company PDFs', included: true },
          { name: 'Lead Capture & Email / Sheet Sync', included: true },
          { name: 'Conversation History Memory', included: true },
          { name: 'WhatsApp Bot Integration', included: false },
          { name: 'Multi-model routing', included: true },
        ],
      },
      premium: {
        name: 'Premium',
        title: 'Enterprise Multi-Channel AI Suite',
        description: 'Multi-channel bot (Website + WhatsApp + CRM) with autonomous actions, tool calling, and live dashboard.',
        deliveryDays: 12,
        revisions: 'Unlimited Revisions',
        pricePkr: 160000,
        priceUsd: 565,
        features: [
          { name: 'Website + WhatsApp AI Bot', included: true },
          { name: 'Full Vector Knowledge Base', included: true },
          { name: 'CRM & Database Live Read/Write', included: true },
          { name: 'Autonomous Action Execution', included: true },
          { name: 'Custom Admin Analytics Dashboard', included: true },
          { name: '30 Days Dedicated AI Tuning', included: true },
        ],
      },
    },
    faqs: [
      {
        question: 'Which AI model is used?',
        answer: 'We deploy Google Gemini 2.5/Flash or OpenAI GPT models based on your speed, accuracy, and cost requirements.',
      },
    ],
    reviews: [
      {
        id: 'rev-6',
        author: 'Faisal Mehmood',
        country: 'Pakistan',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '4 days ago',
        comment: 'The WhatsApp AI bot Daniyal built handles 80% of our customer inquiries automatically. Truly phenomenal work.',
      },
    ],
    tags: ['ai chatbot', 'gemini', 'openai', 'ai agent', 'chatgpt'],
  },
  {
    id: 'gig-6',
    title: 'I will edit viral TikTok, Instagram Reels and YouTube Shorts with captions like Alex Hormozi',
    slug: 'viral-tiktok-reels-youtube-shorts-video-editing',
    category: 'Video & Animation',
    subCategory: 'Short-Form Video',
    seller: {
      id: 'seller-6',
      name: 'Waqas Ali',
      username: 'waqas_motion_lab',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
      level: 'Level 2 Seller',
      country: 'Pakistan',
      memberSince: 'September 2021',
      avgResponseTime: '1 Hour',
      lastDelivery: '1 hour ago',
      rating: 4.9,
      reviewsCount: 195,
      bio: 'Lead Video Editor at Figer Free. Edited 1,000+ short-form videos for influencers, podcasts, and digital coaches.',
      languages: ['English', 'Urdu'],
      skills: ['Premiere Pro', 'After Effects', 'Sound Design', 'Shorts', 'Subtitles'],
      isPro: false,
    },
    rating: 4.9,
    reviewsCount: 195,
    ordersInQueue: 8,
    startingPricePkr: 8500,
    startingPriceUsd: 30,
    badge: 'Prime Choice',
    images: [
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=80',
    ],
    description: `Turn raw video footage into attention-grabbing viral short-form clips!
Figer Free applies psychological pacing, animated kinetic captions, sound design, and b-roll to retain viewer attention.

What is included in every reel:
✔ Eye-catching animated subtitles & emojis (Alex Hormozi / Iman Gadzhi style)
✔ Engaging zoom cuts, panning, and visual hooks in the first 3 seconds
✔ Dynamic sound effects (whooshes, pops, cash registers, cinematic risers)
✔ Relevant background music & copyright-free B-roll
✔ Exported in crisp 4K 9:16 vertical format ready to post`,
    packages: {
      basic: {
        name: 'Basic',
        title: '1 Viral Short / Reel',
        description: '1 Edited Short/Reel up to 60 seconds with engaging dynamic subtitles, sound effects, and color grade.',
        deliveryDays: 1,
        revisions: '2 Revisions',
        pricePkr: 8500,
        priceUsd: 30,
        features: [
          { name: '1 Video (Up to 60s)', included: true },
          { name: 'Kinetic Subtitles & Emojis', included: true },
          { name: 'Sound FX & Music', included: true },
          { name: '1080p / 4K Vertical Export', included: true },
          { name: 'B-Roll & Stock Footage', included: false },
          { name: 'Thumbnail Image', included: false },
        ],
      },
      standard: {
        name: 'Standard',
        title: '5 Reels Content Pack',
        description: '5 Edited viral Reels/Shorts with premium stock b-roll, motion graphics, custom hooks, and thumbnails.',
        deliveryDays: 3,
        revisions: 'Unlimited Revisions',
        pricePkr: 35000,
        priceUsd: 125,
        features: [
          { name: '5 Videos (Up to 60s each)', included: true },
          { name: 'Kinetic Subtitles & Emojis', included: true },
          { name: 'Sound FX & Music', included: true },
          { name: 'Premium B-Roll & Visuals', included: true },
          { name: '5 Custom Cover Thumbnails', included: true },
          { name: 'Source Project File', included: false },
        ],
      },
      premium: {
        name: 'Premium',
        title: '15 Reels Monthly Retainer',
        description: '15 High-engagement Reels for your personal brand or business with priority turnaround and strategy consultation.',
        deliveryDays: 7,
        revisions: 'Unlimited Revisions',
        pricePkr: 95000,
        priceUsd: 340,
        features: [
          { name: '15 Videos (Up to 60s each)', included: true },
          { name: 'Kinetic Subtitles & Emojis', included: true },
          { name: 'Sound FX & Music', included: true },
          { name: 'Premium B-Roll & Visuals', included: true },
          { name: '15 Custom Cover Thumbnails', included: true },
          { name: 'Full Premiere Pro Source Files', included: true },
        ],
      },
    },
    faqs: [
      {
        question: 'How do I send my raw video files?',
        answer: 'You can upload your files via Google Drive, Dropbox, WeTransfer, or directly on WhatsApp.',
      },
    ],
    reviews: [
      {
        id: 'rev-7',
        author: 'Omer Farooq',
        country: 'Pakistan',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '2 days ago',
        comment: 'Waqas is a master of short-form video. Our first reel gained 140K views on Instagram within 48 hours!',
      },
    ],
    tags: ['video editing', 'reels', 'tiktok', 'youtube shorts', 'captions'],
  },
  {
    id: 'gig-7',
    title: 'I will rank your website #1 on Google with monthly white-hat technical and local SEO',
    slug: 'monthly-technical-local-seo-ranking',
    category: 'Digital Marketing',
    subCategory: 'Search Engine Optimization',
    seller: {
      id: 'seller-7',
      name: 'Rehan Siddiqui',
      username: 'rehan_seo_master',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      level: 'Top Rated Seller',
      country: 'Pakistan',
      memberSince: 'October 2019',
      avgResponseTime: '1 Hour',
      lastDelivery: '6 hours ago',
      rating: 4.9,
      reviewsCount: 310,
      bio: 'SEO Director at Figer Free. 8+ years helping local and e-commerce businesses dominate search rankings organically.',
      languages: ['English', 'Urdu'],
      skills: ['On-Page SEO', 'Technical SEO', 'Keyword Research', 'Backlinks', 'Google Search Console'],
      isPro: true,
    },
    rating: 4.9,
    reviewsCount: 310,
    ordersInQueue: 6,
    startingPricePkr: 28000,
    startingPriceUsd: 100,
    badge: 'Top Rated',
    images: [
      'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    ],
    description: `Generate passive organic customers every day without relying on expensive ad budgets!
Figer Free conducts in-depth technical audits, high-intent keyword research, on-page optimization, and authoritative backlink building.

What is included:
✔ In-depth Keyword Research (High search volume, low competition)
✔ Technical SEO fixes (Sitemap, Robots.txt, Schema markup, Core Web Vitals)
✔ On-page optimization (Meta titles, Descriptions, H1-H3 tags, Alt tags)
✔ High-authority manual backlinks (DA 50+)
✔ Google Search Console & Analytics health verification`,
    packages: {
      basic: {
        name: 'Basic',
        title: 'SEO Audit & On-Page Fix',
        description: 'Complete technical audit report + On-page SEO optimization for up to 5 main website pages.',
        deliveryDays: 4,
        revisions: '2 Revisions',
        pricePkr: 28000,
        priceUsd: 100,
        features: [
          { name: 'Audit for 5 Pages', included: true },
          { name: 'Keyword Research (15 Keywords)', included: true },
          { name: 'Meta Tag Optimization', included: true },
          { name: 'Schema Markup Setup', included: true },
          { name: 'Monthly Backlinks', included: false },
          { name: 'Competitor Gap Analysis', included: false },
        ],
      },
      standard: {
        name: 'Standard',
        title: 'Complete Monthly Growth SEO',
        description: 'Full technical SEO for 15 pages + 30 High DA Backlinks + Google My Business (GMB) optimization.',
        deliveryDays: 14,
        revisions: 'Unlimited Revisions',
        pricePkr: 65000,
        priceUsd: 230,
        features: [
          { name: 'Optimization for 15 Pages', included: true },
          { name: 'Keyword Research (35 Keywords)', included: true },
          { name: '30 High DA White-hat Backlinks', included: true },
          { name: 'Google Business Profile Setup', included: true },
          { name: 'Core Web Vitals Optimization', included: true },
          { name: 'Bi-weekly Ranking Reports', included: true },
        ],
      },
      premium: {
        name: 'Premium',
        title: 'Total Search Domination',
        description: 'Complete aggressive 30-day SEO campaign with 80+ tier-1 backlinks, content optimization, and guaranteed ranking improvements.',
        deliveryDays: 30,
        revisions: 'Unlimited Revisions',
        pricePkr: 130000,
        priceUsd: 460,
        features: [
          { name: 'Entire Website Audit & Fixes', included: true },
          { name: 'Keyword Research (75+ Keywords)', included: true },
          { name: '80+ High Authority Backlinks', included: true },
          { name: 'Competitor Steal Strategy', included: true },
          { name: 'Blog Content Strategy (4 Articles)', included: true },
          { name: 'Weekly Live Search Analytics Call', included: true },
        ],
      },
    },
    faqs: [
      {
        question: 'Are all backlinks safe and white-hat?',
        answer: 'Yes, 100% white-hat. We never use automated link bots or PBNs that could risk Google penalties.',
      },
    ],
    reviews: [
      {
        id: 'rev-8',
        author: 'Shahbaz Ahmed',
        country: 'Pakistan',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '1 week ago',
        comment: 'Our clinic is now ranking on the first page in Lahore for all our target dental services. Rehan is an SEO genius!',
      },
    ],
    tags: ['seo', 'search engine optimization', 'backlinks', 'google ranking', 'local seo'],
  },
  {
    id: 'gig-8',
    title: 'I will design modern UI UX website and mobile app in Figma with prototype',
    slug: 'ui-ux-design-website-mobile-app-figma',
    category: 'Graphics & Design',
    subCategory: 'UI/UX Design',
    seller: {
      id: 'seller-8',
      name: 'Maria Noor',
      username: 'maria_uiux_craft',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      level: 'Prime Pro',
      country: 'Pakistan',
      memberSince: 'March 2021',
      avgResponseTime: '30 Mins',
      lastDelivery: '3 hours ago',
      rating: 5.0,
      reviewsCount: 220,
      bio: 'Principal UI/UX Designer at Figer Free. Certified designer crafting modern, intuitive web and mobile application interfaces.',
      languages: ['English', 'Urdu'],
      skills: ['Figma', 'UI/UX', 'Design System', 'Wireframing', 'Prototyping'],
      isPro: true,
    },
    rating: 5.0,
    reviewsCount: 220,
    ordersInQueue: 5,
    startingPricePkr: 22000,
    startingPriceUsd: 80,
    badge: 'Pro Verified',
    images: [
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1000&q=80',
    ],
    description: `Need a stunning, user-friendly interface that keeps users coming back?
Figer Free designs sleek Figma UI/UX wireframes, visual mockups, and clickable interactive prototypes for websites and mobile applications.

Deliverables:
✔ Organized Figma master file with components and auto-layout
✔ Interactive clickable prototype for user testing and developer handoff
✔ Design system tokens (typography, color palettes, spacing variables)
✔ 100% vector SVG icons and high-resolution visual assets
✔ Developer-friendly specs ready for React or Flutter implementation`,
    packages: {
      basic: {
        name: 'Basic',
        title: 'Single Page UI Concept',
        description: '1 High-fidelity desktop or mobile page designed in Figma with modern layout and assets.',
        deliveryDays: 2,
        revisions: '3 Revisions',
        pricePkr: 22000,
        priceUsd: 80,
        features: [
          { name: '1 Page UI/UX in Figma', included: true },
          { name: 'Responsive Desktop & Mobile', included: true },
          { name: 'Figma Source File', included: true },
          { name: 'Assets & Icons Included', included: true },
          { name: 'Clickable Prototype', included: false },
          { name: 'Design System Tokens', included: false },
        ],
      },
      standard: {
        name: 'Standard',
        title: '5 Pages Prototype Suite',
        description: 'Up to 5 pages / app screens with clickable prototype, responsive layouts, and full components library.',
        deliveryDays: 5,
        revisions: 'Unlimited Revisions',
        pricePkr: 55000,
        priceUsd: 195,
        features: [
          { name: 'Up to 5 Pages / Screens', included: true },
          { name: 'Responsive Desktop & Mobile', included: true },
          { name: 'Figma Master Source File', included: true },
          { name: 'Clickable Interactive Prototype', included: true },
          { name: 'Style Guide & Assets', included: true },
          { name: 'Developer Handoff Support', included: true },
        ],
      },
      premium: {
        name: 'Premium',
        title: 'Complete SaaS / App Design System',
        description: 'Complete multi-page web platform or full mobile app (up to 12 screens) with atomic design system and prototype.',
        deliveryDays: 10,
        revisions: 'Unlimited Revisions',
        pricePkr: 110000,
        priceUsd: 390,
        features: [
          { name: 'Up to 12 Screens / Views', included: true },
          { name: 'Complete Atomic Design System', included: true },
          { name: 'Full Interactive Figma Prototype', included: true },
          { name: 'Developer Inspection Ready', included: true },
          { name: 'Micro-Interactions Specs', included: true },
          { name: '1-on-1 Zoom Walkthrough', included: true },
        ],
      },
    },
    faqs: [
      {
        question: 'Does this include frontend coding?',
        answer: 'This gig is for Figma design and prototyping. However, our development team at Figer Free can also code it in React/Next.js if requested!',
      },
    ],
    reviews: [
      {
        id: 'rev-9',
        author: 'Usman Ghani',
        country: 'Pakistan',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        date: '4 days ago',
        comment: 'Maria designed our fintech dashboard in Figma. The design system and auto-layout are world class. Our developers loved it!',
      },
    ],
    tags: ['ui ux', 'figma', 'website design', 'mobile app design', 'ui design'],
  },
];

export const CATEGORIES_NAV: { name: GigCategory; subcategories: string[] }[] = [
  {
    name: 'Graphics & Design',
    subcategories: ['Logo Design & Branding', 'UI/UX Design', 'Social Media Design', 'Packaging & Merch', 'Illustration & Vector'],
  },
  {
    name: 'Programming & Tech',
    subcategories: ['Web Development', 'E-Commerce Development', 'WordPress & CMS', 'Mobile Apps', 'Custom Scripts & APIs'],
  },
  {
    name: 'Digital Marketing',
    subcategories: ['Social Media Advertising', 'Search Engine Optimization', 'Google Ads & PPC', 'Email Marketing', 'Content Strategy'],
  },
  {
    name: 'Video & Animation',
    subcategories: ['Short-Form Video', 'Video Editing', 'Animated Explainers', '3D Product Animation', 'Visual Effects'],
  },
  {
    name: 'AI Services',
    subcategories: ['AI Web Apps & Agents', 'Custom AI Chatbots', 'AI Automation', 'Prompt Engineering', 'AI Art & Media'],
  },
  {
    name: 'Writing & Translation',
    subcategories: ['Website Content', 'Ad Copywriting', 'Technical Writing', 'Translation', 'SEO Articles'],
  },
  {
    name: 'Business',
    subcategories: ['Business Plans', 'Market Research', 'Lead Generation', 'Virtual Assistance', 'Consulting'],
  },
];
