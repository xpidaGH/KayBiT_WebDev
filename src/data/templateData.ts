import { TeachingMetadata, TemplateId } from '../types/templates';

export const TEMPLATE_METADATA: Record<TemplateId, TeachingMetadata> = {
  'blog-content': {
    id: 'blog-content',
    title: 'Blog / Content Site',
    category: 'website',
    tagline: 'Articles, news, or personal thoughts published in reverse chronological order',
    summary: 'A content-focused publishing platform prioritizing reading experience, SEO metadata, RSS/Atom feeds, static generation (SSG/ISR), and dynamic search and categorization.',
    difficulty: 'Intermediate',
    renderPattern: 'SSR / SSG',
    stateArchitecture: 'Primarily URL-driven state (query params for ?tag= & ?search=) + Static content hydration',
    keyConcepts: [
      'SSG / ISR for fast TTFB and Search Engine Indexing',
      'OpenGraph & Twitter Card dynamic meta generation',
      'RSS/Atom XML feed aggregation',
      'Markdown / MDX parsing & syntax highlighting AST pipeline',
      'Reading time heuristics and table of contents scroll-spy'
    ],
    techStack: ['Next.js / Astro / Remix', 'Tailwind CSS / Typography Plugin', 'MDX / Contentlayer / Gray-matter', 'Algolia / Fuse.js for Client Search', 'Vercel / Cloudflare Pages'],
    coreEngineeringChallenges: [
      'Incremental Static Regeneration (ISR) at high article volume',
      'Image optimization with responsive srcset and LQIP (Low Quality Image Placeholders)',
      'Comment spam mitigation with honeypots or serverless moderation',
      'Sitemap.xml automation on build or deploy hooks'
    ],
    securityConsiderations: [
      { threat: 'Stored XSS in Markdown/Comments', mitigation: 'Sanitize HTML with DOMPurify / sanitize-html and use rehype-sanitize in AST transform.' },
      { threat: 'Comment spam / bot flooding', mitigation: 'Implement reCAPTCHA v3 or Cloudflare Turnstile plus rate-limiting on comment API.' }
    ],
    architectureLayers: [
      { layer: 'Presentation', technology: 'React / Next.js Pages + Tailwind Typography', responsibility: 'Article layout, reading progress bar, responsive code blocks' },
      { layer: 'Content Engine', technology: 'Markdown / Headless CMS (Strapi/Sanity/MDX)', responsibility: 'Draft/Published states, frontmatter schema validation' },
      { layer: 'Search & Taxonomy', technology: 'Fuse.js client index / Algolia serverless', responsibility: 'Instant multi-tag indexing and relevance scoring' },
      { layer: 'CDN & Cache', technology: 'Edge CDN (Cloudflare / CloudFront)', responsibility: 'Stale-While-Revalidate caching headers & edge compression' }
    ],
    studentExercises: [
      { level: 'Warmup', title: 'Reading Progress Bar', prompt: 'Implement a scroll-depth percentage progress bar anchored to the top of the article reader window.' },
      { level: 'Core Challenge', title: 'Live Client-Side Tag Filter', prompt: 'Sync active categories with browser URL search parameters without triggering a full page re-render.' },
      { level: 'Advanced / Capstone', title: 'MDX Custom Component Embedder', prompt: 'Build a dynamic MDX renderer that replaces specific markdown code blocks with interactive React mini-widgets.' }
    ],
    codeSnippet: `// Next.js / React Example: Content Blog Engine with Tag Filter & Reading Time
import React, { useState, useMemo } from 'react';

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  author: { name: string; avatar: string };
}

export function BlogSite({ articles }: { articles: Article[] }) {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return articles.filter(a => {
      const matchTag = selectedTag === 'All' || a.category === selectedTag;
      const matchQuery = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTag && matchQuery;
    });
  }, [articles, selectedTag, searchQuery]);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {/* Search and Category Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-lg flex-1"
        />
        <div className="flex gap-2 overflow-x-auto">
          {['All', 'Frontend', 'Backend', 'DevOps'].map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={\`px-3 py-1.5 rounded-full text-sm \${selectedTag === tag ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}\`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Reverse Chronological Article Feed */}
      <div className="space-y-6">
        {filtered.map(article => (
          <article key={article.slug} className="p-6 border rounded-xl hover:shadow-md transition">
            <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 font-medium rounded">{article.category}</span>
              <span>•</span>
              <time>{article.publishedAt}</time>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">{article.title}</h2>
            <p className="text-slate-600 mb-4">{article.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}`
  },

  'ecommerce': {
    id: 'ecommerce',
    title: 'E-commerce Site',
    category: 'website',
    tagline: 'Allows users to buy and sell physical or digital goods online',
    summary: 'A transactional digital storefront featuring product catalogs, faceted multi-attribute filtering, shopping cart state synchronization, discount code engines, and secure payment checkout handoffs.',
    difficulty: 'Intermediate-Advanced',
    renderPattern: 'Hybrid (ISR / RSC)',
    stateArchitecture: 'Client Cart Persistence (LocalStorage / Redux Toolkit / Zustand) + Server-Validated Inventory API',
    keyConcepts: [
      'Client Cart vs Server-Authoritative Price Calculation',
      'Inventory concurrency and optimistic inventory reserving',
      'Payment Gateway Webhooks (Stripe/PayPal) idempotency',
      'Faceted navigation (Price, Rating, Brand, Specs) with URL synchronization',
      'Schema.org Product microdata for Rich Google Search snippets'
    ],
    techStack: ['Next.js / Nuxt', 'Zustand / Redux Toolkit', 'Stripe API / Shopify Storefront API', 'PostgreSQL / Supabase / Redis', 'Tailwind CSS'],
    coreEngineeringChallenges: [
      'Preventing cart tampering (client-side modified prices must be re-calculated server-side)',
      'Handling flash-sale inventory race conditions with Redis mutex/locks',
      'Faceted query optimization across thousands of SKU variants',
      'Checkout session abandonment recovery workflows'
    ],
    securityConsiderations: [
      { threat: 'Price Manipulation in Request Payload', mitigation: 'Never trust client prices. Calculate checkout total strictly from database SKU lookup on the server.' },
      { threat: 'Carding Attacks / Automated testing', mitigation: 'Enforce 3D Secure 2.0 and Stripe Radar fraud detection with rate limiting on checkout endpoints.' }
    ],
    architectureLayers: [
      { layer: 'Catalog & Storefront', technology: 'React + Server Components + ISR', responsibility: 'High-speed product browsing, image zoom, reviews display' },
      { layer: 'Cart & Session State', technology: 'Zustand + LocalStorage Sync', responsibility: 'Cart additions, quantity updates, promotional discounts' },
      { layer: 'Checkout & Orders', technology: 'Stripe Checkout / Payment Intents API', responsibility: 'PCI-compliant card tokenization & order creation' },
      { layer: 'Inventory & DB', technology: 'PostgreSQL + Prisma / Drizzle ORM', responsibility: 'Stock management, SKU tracking, atomic purchase transactions' }
    ],
    studentExercises: [
      { level: 'Warmup', title: 'Coupon Code Validator', prompt: 'Implement a promotional code parser that calculates either percentage-off or fixed-discount and updates totals.' },
      { level: 'Core Challenge', title: 'Faceted Multi-Filter System', prompt: 'Build category and price range filters that apply combined boolean filtering to product cards in real time.' },
      { level: 'Advanced / Capstone', title: 'Atomic Cart Lock Simulation', prompt: 'Design a mock API endpoint with optimistic locking that decrements stock and throws an out-of-stock error on race conditions.' }
    ],
    codeSnippet: `// Zustand Cart Store with Server Price Validation Pattern
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...product, quantity: 1 }] };
        });
      },
      removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, delta) => set((s) => ({
        items: s.items
          .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i))
          .filter((i) => i.quantity > 0)
      })),
      clearCart: () => set({ items: [] }),
      getSubtotal: () => get().items.reduce((acc, i) => acc + i.price * i.quantity, 0)
    }),
    { name: 'ecommerce-cart-storage' }
  )
);`
  },

  'portfolio': {
    id: 'portfolio',
    title: 'Portfolio',
    category: 'website',
    tagline: 'Displays a collection of past work, creative projects, or professional achievements',
    summary: 'A high-impact digital presence showcasing case studies, technical proficiencies, live demos, and direct conversion touchpoints for freelancers, engineers, and digital creatives.',
    difficulty: 'Intermediate',
    renderPattern: 'SSR / SSG',
    stateArchitecture: 'Lightweight client UI state (filter by stack, project detail modals, contact submission)',
    keyConcepts: [
      'Visual hierarchy and scannable case-study narrative (Problem -> Approach -> Outcome)',
      'Responsive media galleries with lightbox and interactive iframe live previews',
      'Accessible contact forms with client validation and Serverless email triggers (Resend/SendGrid)',
      'Micro-interactions, staggered entrance animations, and scroll triggers',
      'Lighthouse 100/100 performance budgeting and asset compression'
    ],
    techStack: ['React / Vite / Next.js', 'Tailwind CSS', 'Motion (Framer Motion)', 'Resend API / Formspree', 'Vercel / GitHub Pages'],
    coreEngineeringChallenges: [
      'Maintaining 60fps animations without causing layout thrashing (use transform/opacity)',
      'Mobile-first responsive presentation of complex engineering diagrams and screenshots',
      'Accessible keyboard navigation for interactive modal showcases (focus trapping)'
    ],
    securityConsiderations: [
      { threat: 'Contact Form Bot Spam', mitigation: 'Invisible honeypot input fields, CORS restrictions, and IP rate-limiting.' },
      { threat: 'Email Header Injection', mitigation: 'Validate email format rigorously and use structured template payloads rather than raw concatenations.' }
    ],
    architectureLayers: [
      { layer: 'Hero & Identity', technology: 'React + Motion layout animations', responsibility: 'Elevator pitch, social proofs, availability badge' },
      { layer: 'Project Showcase', technology: 'Categorized Grid + Modal Case Study', responsibility: 'Tech stack pills, architectural diagrams, metric outcomes' },
      { layer: 'Skills Radar', technology: 'Tailwind Grid + Visual proficiency meters', responsibility: 'Categorized frontend/backend/cloud proficiencies' },
      { layer: 'Contact Pipeline', technology: 'React Hook Form + Serverless handler', responsibility: 'Lead capture, input sanitation, feedback toasts' }
    ],
    studentExercises: [
      { level: 'Warmup', title: 'Interactive Tag Filter', prompt: 'Create interactive technology stack filter pills that toggle project visibility with fade transitions.' },
      { level: 'Core Challenge', title: 'Case Study Modal with Focus Trap', prompt: 'Build an accessible modal dialog that traps focus, handles Escape key, and locks background scroll.' },
      { level: 'Advanced / Capstone', title: 'Dynamic GitHub Activity Graph', prompt: 'Fetch and visualize live GitHub contribution statistics and pinned repositories using the GitHub GraphQL API.' }
    ],
    codeSnippet: `// Portfolio Project Showcase Grid with Case Study Modal
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Project {
  id: string;
  title: string;
  category: 'Full-Stack' | 'AI / Systems' | 'Mobile';
  summary: string;
  metrics: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export function PortfolioGallery({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = projects.filter(
    p => activeCategory === 'All' || p.category === activeCategory
  );

  return (
    <section className="py-16 max-w-6xl mx-auto px-4">
      {/* Category Pills */}
      <div className="flex gap-3 mb-8 justify-center">
        {['All', 'Full-Stack', 'AI / Systems', 'Mobile'].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={\`px-4 py-2 rounded-full text-sm font-medium transition \${
              activeCategory === cat ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }\`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(project => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-indigo-500 transition cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <span className="text-xs text-indigo-400 font-mono font-medium">{project.category}</span>
            <h3 className="text-xl font-bold text-white mt-1 mb-2">{project.title}</h3>
            <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.summary}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.stack.map(s => (
                <span key={s} className="px-2 py-0.5 bg-slate-800 text-slate-300 text-xs rounded">{s}</span>
              ))}
            </div>
            <div className="text-xs font-semibold text-emerald-400">{project.metrics}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}`
  },

  'corporate-business': {
    id: 'corporate-business',
    title: 'Corporate / Business Site',
    category: 'website',
    tagline: 'Represents a company, shares its services or products, and provides contact details',
    summary: 'An authoritative commercial website presenting enterprise value propositions, service breakdown grids, executive leadership, client case studies, compliance certifications, and consultation scheduling.',
    difficulty: 'Intermediate',
    renderPattern: 'SSR / SSG',
    stateArchitecture: 'Content-driven hierarchy + Interactive quote calculators & contact modals',
    keyConcepts: [
      'Information Architecture & Navigation Hierarchies for B2B buyer journeys',
      'Trust Signals: SOC2, ISO, Customer Logos, Executive Team cards, Press Mentions',
      'Multi-step consultation / enterprise proposal request forms',
      'Localization (i18n) and accessibility (WCAG 2.1 AA compliance)',
      'Enterprise SEO: Organization Schema, Local Business Schema, BreadcrumbList Schema'
    ],
    techStack: ['Next.js / Astro', 'Tailwind CSS', 'Radix UI (Accordions / Modals)', 'HubSpot / Salesforce Webhooks', 'Cloudflare DNS / CDN'],
    coreEngineeringChallenges: [
      'Multi-language routing (e.g. /en, /de, /ja) and automatic hreflang tagging',
      'Enterprise form pipeline integration with CRM (HubSpot/Salesforce) with retry logic',
      'Rigorous accessibility compliance across complex multi-tier mega menus'
    ],
    securityConsiderations: [
      { threat: 'Data Leakage in Public Assets', mitigation: 'Strict asset auditing to avoid exposing staging URLs, internal API docs, or test client names.' },
      { threat: 'Clickjacking', mitigation: 'Enforce X-Frame-Options: SAMEORIGIN and Content-Security-Policy frame-ancestors headers.' }
    ],
    architectureLayers: [
      { layer: 'Global Navigation', technology: 'Mega-menu / Mobile Drawer', responsibility: 'Solutions, Industries, Company, Resources taxonomy' },
      { layer: 'Value Engine', technology: 'Solutions Matrix + Interactive ROI Calculator', responsibility: 'Quantifying enterprise business outcomes' },
      { layer: 'Trust & Governance', technology: 'Certifications + Case Study Sliders', responsibility: 'Security compliance, customer logos, testimonials' },
      { layer: 'Lead Capture', technology: 'Multi-step RFP / Schedule Demo Form', responsibility: 'Data validation and direct CRM API ingest' }
    ],
    studentExercises: [
      { level: 'Warmup', title: 'Accessible FAQ Accordion', prompt: 'Build an accordion using WAI-ARIA aria-expanded and aria-controls attributes with smooth height transitions.' },
      { level: 'Core Challenge', title: 'Enterprise ROI Calculator', prompt: 'Create an interactive calculator where users slide team size and compute estimated annual cost savings.' },
      { level: 'Advanced / Capstone', title: 'CRM Webhook Form Handler', prompt: 'Build an Express/Next.js API route that validates corporate email domains (blocking @gmail/@yahoo) and pushes leads to a mock CRM.' }
    ],
    codeSnippet: `// Corporate Enterprise ROI Estimator & Consultation Request
import React, { useState } from 'react';

export function EnterpriseCalculator() {
  const [teamSize, setTeamSize] = useState(50);
  const [hourlyRate, setHourlyRate] = useState(75);
  const hoursSavedPerWeek = 4.5;

  const annualSavings = Math.round(teamSize * hourlyRate * hoursSavedPerWeek * 50);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-2xl mx-auto text-white">
      <h3 className="text-2xl font-bold mb-2">Estimate Your Enterprise ROI</h3>
      <p className="text-slate-400 text-sm mb-6">See how much engineering capacity ApexCloud unlocks for your team.</p>

      <div className="space-y-6 mb-8">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-300">Engineering Team Size:</span>
            <span className="font-bold text-indigo-400 font-mono">{teamSize} engineers</span>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            value={teamSize}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            className="w-full accent-indigo-500"
          />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-300">Avg Hourly Blended Rate:</span>
            <span className="font-bold text-indigo-400 font-mono">\${hourlyRate}/hr</span>
          </div>
          <input
            type="range"
            min="40"
            max="180"
            step="5"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            className="w-full accent-indigo-500"
          />
        </div>
      </div>

      <div className="bg-indigo-950/50 border border-indigo-500/30 rounded-xl p-6 text-center">
        <div className="text-xs text-indigo-300 uppercase tracking-widest font-semibold">Estimated Annual Value</div>
        <div className="text-4xl font-extrabold text-emerald-400 font-mono my-2">
          \${annualSavings.toLocaleString()}
        </div>
        <div className="text-xs text-slate-400">Based on 4.5 hours saved per developer per week</div>
      </div>
    </div>
  );
}`
  },

  'landing-page': {
    id: 'landing-page',
    title: 'Landing Page',
    category: 'website',
    tagline: 'A single web page designed for a specific marketing campaign or product launch to capture leads',
    summary: 'A laser-focused, high-conversion single-page destination built to maximize click-throughs, newsletter signups, or product waitlists through strategic visual hierarchy and persuasive social proof.',
    difficulty: 'Intermediate',
    renderPattern: 'SSR / SSG',
    stateArchitecture: 'Single page scroll state + Lead capture form validation + A/B test variant flags',
    keyConcepts: [
      'Conversion Rate Optimization (CRO) & Hero above-the-fold visual gravity',
      'The "AIDA" Funnel: Attention (Hero), Interest (Features), Desire (Proof), Action (CTA)',
      'Urgency mechanisms (Early bird discounts, Countdown timers, Seat limits)',
      'Feature comparison matrices and interactive pricing tier toggles (Monthly vs Annual)',
      'UTM parameter tracking and analytics attribution event firing'
    ],
    techStack: ['React / Vite / Astro', 'Tailwind CSS', 'Motion for micro-animations', 'PostHog / Google Analytics 4', 'Formspree / ConvertKit API'],
    coreEngineeringChallenges: [
      'Zero Cumulative Layout Shift (CLS) on dynamic countdowns or fonts',
      'Sub-second First Contentful Paint (FCP) to prevent bounce rates',
      'Preserving UTM campaign parameters across form submits and redirects'
    ],
    securityConsiderations: [
      { threat: 'Form Abuse / Fake Leads', mitigation: 'Email domain MX record verification API check, disposable email blockers, rate-limiting.' },
      { threat: 'Supply Chain Attacks in 3rd-party Marketing Scripts', mitigation: 'Subresource Integrity (SRI) hashes and strict CSP directives on external trackers.' }
    ],
    architectureLayers: [
      { layer: 'Above-the-Fold Hero', technology: 'Display Typography + Direct CTA', responsibility: 'Value proposition, live product preview, instant signup' },
      { layer: 'Social Proof Stream', technology: 'Logo Marquee + Verified Badges', responsibility: 'Customer quotes, tier-1 media mentions, user count' },
      { layer: 'Value Engine', technology: 'Feature Bento-Grid + Comparison Table', responsibility: 'Before vs After comparison, capability breakdown' },
      { layer: 'Conversion Lock', technology: 'Sticky Bottom Bar / Modal CTA', responsibility: 'Lead capture with instant feedback & analytics push' }
    ],
    studentExercises: [
      { level: 'Warmup', title: 'Monthly vs Annual Pricing Toggle', prompt: 'Implement an interactive billing switcher that applies a 20% discount badge and smoothly animates price changes.' },
      { level: 'Core Challenge', title: 'Live Countdown Timer with Expiry State', prompt: 'Build a countdown timer hook that handles time zones accurately and renders an "Offer Expired" banner when zero is reached.' },
      { level: 'Advanced / Capstone', title: 'UTM Attribution Pipeline', prompt: 'Write a hook that reads ?utm_source, ?utm_campaign from URL, stores them in sessionStorage, and appends them to lead submissions.' }
    ],
    codeSnippet: `// High-Converting Pricing Tier Switcher with Annual Discount
import React, { useState } from 'react';

export function PricingSwitcher() {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    { name: 'Starter', monthly: 19, annual: 15, features: ['5 Team Members', '10GB Cloud Storage', 'Community Support'] },
    { name: 'Pro', monthly: 49, annual: 39, featured: true, features: ['Unlimited Members', '500GB Storage', 'Priority 24/7 Support', 'Custom Domains'] },
    { name: 'Enterprise', monthly: 129, annual: 99, features: ['SSO & SAML', 'Dedicated Slack Channel', 'Custom SLA 99.99%', 'Unlimited Storage'] },
  ];

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 text-center">
      {/* Billing Switcher */}
      <div className="inline-flex items-center gap-3 bg-slate-800 p-1.5 rounded-full mb-12 border border-slate-700">
        <button
          onClick={() => setIsAnnual(false)}
          className={\`px-4 py-1.5 rounded-full text-sm font-medium transition \${!isAnnual ? 'bg-indigo-600 text-white' : 'text-slate-400'}\`}
        >
          Monthly
        </button>
        <button
          onClick={() => setIsAnnual(true)}
          className={\`px-4 py-1.5 rounded-full text-sm font-medium transition flex items-center gap-2 \${isAnnual ? 'bg-indigo-600 text-white' : 'text-slate-400'}\`}
        >
          Annual <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">Save 20%</span>
        </button>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 text-left">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={\`rounded-2xl p-8 transition relative \${
              tier.featured ? 'bg-slate-900 border-2 border-indigo-500 shadow-xl shadow-indigo-500/10' : 'bg-slate-900/60 border border-slate-800'
            }\`}
          >
            {tier.featured && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs uppercase tracking-wider font-bold py-1 px-3 rounded-full">
                Most Popular
              </span>
            )}
            <h4 className="text-xl font-bold text-white mb-2">{tier.name}</h4>
            <div className="flex items-baseline gap-1 my-4">
              <span className="text-4xl font-extrabold text-white font-mono">\${isAnnual ? tier.annual : tier.monthly}</span>
              <span className="text-slate-400 text-sm">/user/mo</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm text-slate-300">
              {tier.features.map(f => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> {f}
                </li>
              ))}
            </ul>
            <button className={\`w-full py-3 rounded-xl font-semibold transition \${
              tier.featured ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }\`}>
              Start Free 14-Day Trial
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}`
  },

  'educational-wiki': {
    id: 'educational-wiki',
    title: 'Educational / Wiki Site',
    category: 'website',
    tagline: 'Offers instructional materials, courses, or collaborative knowledge bases (like an online encyclopedia)',
    summary: 'A deep information repository featuring multi-tier nested table of contents, fast full-text client indexing, code syntax highlighting, callout alerts, version history, and interactive knowledge checks.',
    difficulty: 'Intermediate-Advanced',
    renderPattern: 'SSR / SSG',
    stateArchitecture: 'Sidebar expansion state + Active heading scroll-spy + Search query highlight index',
    keyConcepts: [
      'Hierarchical Taxonomy & Tree Data Structures for document routing',
      'IntersectionObserver Scroll-Spy for auto-updating On-This-Page navigation',
      'Accessible Code Blocks with Copy-to-Clipboard, line highlighting, and language pills',
      'Versioned Documentation (e.g. v1.0 vs v2.0 vs next)',
      'Article feedback loop ("Was this helpful?" thumbs up/down analytics)'
    ],
    techStack: ['Docusaurus / Nextra / Starlight (Astro)', 'Tailwind CSS', 'Shiki / Prism.js for syntax tokens', 'Fuse.js for in-browser search', 'Algolia DocSearch'],
    coreEngineeringChallenges: [
      'Generating hierarchical JSON navigation trees from flat filesystem directories on build',
      'Performant client-side full-text search across hundreds of documentation pages',
      'Smooth scroll-to-anchor positioning accounting for sticky header offsets'
    ],
    securityConsiderations: [
      { threat: 'Arbitrary HTML Injection in Wiki edits', mitigation: 'Parse content strictly through Markdown AST with whitelist transformers.' },
      { threat: 'Denial of Service via Heavy Search Queries', mitigation: 'Debounce search inputs (300ms) and cap search results limit.' }
    ],
    architectureLayers: [
      { layer: 'Navigation Tree', technology: 'Collapsible Sidebar + Breadcrumbs', responsibility: 'Multi-level folder and file routing hierarchy' },
      { layer: 'Article Body', technology: 'Markdown Parser + Shiki Syntax Tokens', responsibility: 'Formatted prose, callout banners, code snippets' },
      { layer: 'Table of Contents', technology: 'IntersectionObserver Scroll-Spy', responsibility: 'Real-time scroll position tracking on right sidebar' },
      { layer: 'Search Engine', technology: 'Precomputed Fuse.js / Pagefind Index', responsibility: 'Instant multi-page search with query highlighting' }
    ],
    studentExercises: [
      { level: 'Warmup', title: 'Copy-to-Clipboard Code Snippet', prompt: 'Create a reusable CodeBlock component with language badge and animated "Copied!" checkmark feedback.' },
      { level: 'Core Challenge', title: 'Scroll-Spy Table of Contents', prompt: 'Use IntersectionObserver to track visible H2 and H3 elements and highlight the corresponding link in the TOC.' },
      { level: 'Advanced / Capstone', title: 'Client-Side Pagefind Search Indexer', prompt: 'Implement an in-memory search bar that indexes markdown headers and excerpts, returning matching snippets with highlight tags.' }
    ],
    codeSnippet: `// Reusable Interactive Wiki Callout / Admonition Component
import React, { useState } from 'react';

type CalloutType = 'note' | 'tip' | 'warning' | 'danger';

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const STYLES: Record<CalloutType, { bg: string; border: string; text: string; icon: string; defaultTitle: string }> = {
  note: { bg: 'bg-blue-950/40', border: 'border-blue-500/40', text: 'text-blue-300', icon: 'ℹ️', defaultTitle: 'Note' },
  tip: { bg: 'bg-emerald-950/40', border: 'border-emerald-500/40', text: 'text-emerald-300', icon: '💡', defaultTitle: 'Tip' },
  warning: { bg: 'bg-amber-950/40', border: 'border-amber-500/40', text: 'text-amber-300', icon: '⚠️', defaultTitle: 'Warning' },
  danger: { bg: 'bg-rose-950/40', border: 'border-rose-500/40', text: 'text-rose-300', icon: '🚨', defaultTitle: 'Danger' }
};

export function WikiCallout({ type, title, children }: CalloutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const cfg = STYLES[type];

  return (
    <aside className={\`my-6 border-l-4 rounded-r-xl p-4 \${cfg.bg} \${cfg.border}\`}>
      <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => setCollapsed(!collapsed)}>
        <div className="flex items-center gap-2 font-semibold text-sm">
          <span>{cfg.icon}</span>
          <span className={cfg.text}>{title || cfg.defaultTitle}</span>
        </div>
        <button className="text-xs text-slate-400 hover:text-white">
          {collapsed ? 'Expand ▼' : 'Collapse ▲'}
        </button>
      </div>
      {!collapsed && <div className="mt-3 text-sm text-slate-300 leading-relaxed pl-6">{children}</div>}
    </aside>
  );
}`
  },

  'saas': {
    id: 'saas',
    title: 'SaaS (Software as a Service)',
    category: 'webapp',
    tagline: 'Cloud-based software tools accessed via a browser for tasks like word processing or project management',
    summary: 'A multi-tenant cloud application featuring real-time telemetry metrics, automated API key lifecycle management, team seat invitations, role-based usage quotas, and interactive billing controls.',
    difficulty: 'Advanced',
    renderPattern: 'CSR (SPA)',
    stateArchitecture: 'Server State (TanStack React Query / SWR) + Session Token Auth + WebSocket live events',
    keyConcepts: [
      'Multi-Tenancy Architecture (Tenant ID isolation across database queries)',
      'API Key generation, hashed storage (bcrypt/SHA-256), and scoped revocation',
      'Usage Metering, rate limiting (Token Bucket / Leaky Bucket), and tiered quotas',
      'RBAC (Owner, Admin, Member, Viewer) permission guards',
      'Real-Time Telemetry and Chart visualizations with time-range aggregations'
    ],
    techStack: ['React / Next.js', 'TanStack Query (React Query)', 'Recharts / D3.js', 'PostgreSQL + Redis (Rate Limiting)', 'Tailwind CSS + Lucide'],
    coreEngineeringChallenges: [
      'Strict multi-tenant row-level security (RLS) ensuring Tenant A cannot query Tenant B records',
      'Handling live data streaming without memory leaks or UI frame drops',
      'Stripe Metered Billing integration synchronizing webhook usage records'
    ],
    securityConsiderations: [
      { threat: 'Broken Object Level Authorization (BOLA/IDOR)', mitigation: 'Always enforce tenant_id check in the SQL WHERE clause or use Postgres RLS.' },
      { threat: 'API Key Exposure', mitigation: 'Show full API key ONCE at creation. Store only SHA-256 hash in database.' }
    ],
    architectureLayers: [
      { layer: 'Workspace Dashboard', technology: 'React + Recharts + React Query', responsibility: 'Live metrics, latency histograms, error rate charts' },
      { layer: 'Security & Access', technology: 'API Key Hash Manager + RBAC Guard', responsibility: 'Key generation, token rotation, role permissions' },
      { layer: 'Team Management', technology: 'Invite Flow + Seat Allocation Table', responsibility: 'Member provisioning, email invitations, seat billing' },
      { layer: 'Rate Limiter & DB', technology: 'Redis Token Bucket + Postgres DB', responsibility: 'API quota enforcement, audit logs, data persistence' }
    ],
    studentExercises: [
      { level: 'Warmup', title: 'API Key Masking & Copy Component', prompt: 'Build a component that shows "sk_live_...4a89" with a Reveal/Hide toggle and a 1-click Copy button.' },
      { level: 'Core Challenge', title: 'Time-Range Telemetry Switcher', prompt: 'Create a live metric chart that queries and renders aggregated data across 24h, 7d, and 30d timeframes.' },
      { level: 'Advanced / Capstone', title: 'Token Bucket Rate Limiter Simulation', prompt: 'Implement a client/server simulation of the Token Bucket algorithm displaying allowed vs 429 Too Many Requests.' }
    ],
    codeSnippet: `// API Key Lifecycle Manager with Safe One-Time Secret Disclosure
import React, { useState } from 'react';

interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsed: string;
  role: 'read-only' | 'full-access';
}

export function ApiKeyManager() {
  const [keys, setKeys] = useState<ApiKey[]>([
    { id: '1', name: 'Production Backend', prefix: 'sk_live_9f82...', createdAt: '2026-07-10', lastUsed: '2 mins ago', role: 'full-access' },
    { id: '2', name: 'Staging Worker', prefix: 'sk_test_41a0...', createdAt: '2026-08-01', lastUsed: '3 hours ago', role: 'read-only' }
  ]);
  const [newKeyName, setNewKeyName] = useState('');
  const [createdSecret, setCreatedSecret] = useState<string | null>(null);

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;
    const rawSecret = \`sk_live_\${Math.random().toString(36).substring(2, 15)}\${Math.random().toString(36).substring(2, 15)}\`;
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      prefix: \`\${rawSecret.substring(0, 10)}...\`,
      createdAt: 'Just now',
      lastUsed: 'Never',
      role: 'full-access'
    };
    setKeys([newKey, ...keys]);
    setCreatedSecret(rawSecret);
    setNewKeyName('');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white">
      <h3 className="text-xl font-bold mb-1">API Key Governance</h3>
      <p className="text-slate-400 text-sm mb-6">Manage secret credentials for programmatic Cloud API access.</p>

      {/* Creation Modal Banner */}
      {createdSecret && (
        <div className="bg-amber-950/60 border border-amber-500/50 rounded-xl p-4 mb-6">
          <div className="text-amber-300 font-semibold text-sm mb-1">⚠️ Save your key now!</div>
          <p className="text-xs text-amber-200/80 mb-2">You won't be able to see this key again for security reasons.</p>
          <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-lg border border-amber-500/30">
            <code className="text-emerald-400 font-mono text-sm flex-1 break-all">{createdSecret}</code>
            <button
              onClick={() => { navigator.clipboard.writeText(createdSecret); alert('Copied!'); }}
              className="bg-amber-600 hover:bg-amber-500 text-white text-xs px-3 py-1.5 rounded font-medium"
            >
              Copy
            </button>
            <button onClick={() => setCreatedSecret(null)} className="text-slate-400 text-xs hover:text-white px-2">
              Done
            </button>
          </div>
        </div>
      )}

      {/* Key Creation Input */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="New Key Name (e.g. CI/CD Deployer)"
          value={newKeyName}
          onChange={(e) => setNewKeyName(e.target.value)}
          className="bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm flex-1 text-white"
        />
        <button onClick={handleCreateKey} className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg font-medium">
          Generate Key
        </button>
      </div>

      {/* Table */}
      <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden">
        {keys.map((k) => (
          <div key={k.id} className="p-4 flex items-center justify-between bg-slate-950/50">
            <div>
              <div className="font-semibold text-sm text-slate-200">{k.name}</div>
              <div className="font-mono text-xs text-slate-400 mt-0.5">{k.prefix}</div>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span>Last used: {k.lastUsed}</span>
              <button
                onClick={() => setKeys(keys.filter((item) => item.id !== k.id))}
                className="text-rose-400 hover:text-rose-300 font-medium"
              >
                Revoke
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`
  },

  'social-media': {
    id: 'social-media',
    title: 'Social Media Platform',
    category: 'webapp',
    tagline: 'Connects people to share media, chat, and build online communities',
    summary: 'An engagement-driven social network featuring reactive algorithmic feeds, post composers with image/code attachments, optimistic like/repost toggles, live comment threads, and trending topic trackers.',
    difficulty: 'Advanced',
    renderPattern: 'CSR (SPA)',
    stateArchitecture: 'Optimistic UI Updates + Cursor-based Pagination (Infinite Scroll) + WebSocket notifications',
    keyConcepts: [
      'Optimistic UI Updates (Instant like counter increment before server ACK with rollback on failure)',
      'Cursor-based infinite scroll (keyset pagination preventing duplicate items on feed insertions)',
      'Rich text & code snippet post parsing (mentions @user, hashtags #tech, markdown)',
      'Fan-out on write vs Fan-out on read feed architectures',
      'Real-time notification badges via WebSockets / Server-Sent Events (SSE)'
    ],
    techStack: ['React / Vite', 'Zustand / Jotai', 'Socket.io / Supabase Realtime', 'Redis (Sorted Sets for feeds)', 'Tailwind CSS'],
    coreEngineeringChallenges: [
      'Optimistic state rollback on network dropouts without jarring the user scroll position',
      'Efficient virtualization (react-window / tanstack-virtual) for thousands of feed items',
      'Media compression & CDN upload pipeline with image aspect-ratio preservation'
    ],
    securityConsiderations: [
      { threat: 'XSS through User-Submitted Post Content', mitigation: 'Strict markdown sanitizer with banned raw HTML tags and escaped character entities.' },
      { threat: 'Automated Bot Spam / Sybil Attacks', mitigation: 'Proof-of-work challenges, account age gating, and sentiment anomaly detection.' }
    ],
    architectureLayers: [
      { layer: 'Feed Stream', technology: 'Virtual List + Optimistic State Store', responsibility: 'Infinite scroll, likes, reposts, live comment dialogs' },
      { layer: 'Composer Engine', technology: 'Rich Text / Tag Selector / Image Previews', responsibility: 'Drafting, validation, media attachment uploads' },
      { layer: 'Community Sidebar', technology: 'Trending Hashtags + Follow Suggestions', responsibility: 'Topic aggregation and social discovery' },
      { layer: 'Feed Ingest Service', technology: 'Redis Fan-Out Worker + Postgres DB', responsibility: 'Delivering post IDs to followers activity timelines' }
    ],
    studentExercises: [
      { level: 'Warmup', title: 'Optimistic Like Button', prompt: 'Build a heart button that immediately toggles active state and increments count, rolling back if an async error occurs.' },
      { level: 'Core Challenge', title: 'Live Comment Thread Adder', prompt: 'Create an expandable comment drawer that appends new user comments to the active post without reloading the feed.' },
      { level: 'Advanced / Capstone', title: 'Cursor-Based Pagination Hook', prompt: 'Implement a useInfiniteScroll hook that requests the next page based on next_cursor when the bottom sentinel intersects.' }
    ],
    codeSnippet: `// Optimistic Like & Repost Feed Item Pattern
import React, { useState } from 'react';

interface Post {
  id: string;
  author: { name: string; handle: string; avatar: string };
  content: string;
  timestamp: string;
  likesCount: number;
  isLiked: boolean;
  repostsCount: number;
  isReposted: boolean;
}

export function SocialFeedItem({ initialPost }: { initialPost: Post }) {
  const [post, setPost] = useState(initialPost);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleLike = async () => {
    // 1. Optimistic Update (Instant feedback)
    const previousState = { ...post };
    const nextIsLiked = !post.isLiked;
    const nextCount = post.likesCount + (nextIsLiked ? 1 : -1);

    setPost(prev => ({ ...prev, isLiked: nextIsLiked, likesCount: nextCount }));

    // 2. Async Server Sync
    try {
      setIsUpdating(true);
      // Simulating API call: await fetch(\`/api/posts/\${post.id}/like\`, { method: 'POST' });
      await new Promise((res) => setTimeout(res, 400));
    } catch (err) {
      // 3. Rollback on failure
      setPost(previousState);
      alert('Failed to update like. Rolling back.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-4 max-w-xl text-white">
      <div className="flex gap-3">
        <img src={post.author.avatar} alt="" className="w-10 h-10 rounded-full bg-slate-800" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-slate-100">{post.author.name}</span>
            <span className="text-xs text-slate-500">@{post.author.handle}</span>
            <span className="text-xs text-slate-600">• {post.timestamp}</span>
          </div>
          <p className="text-slate-300 text-sm mt-2 leading-relaxed">{post.content}</p>

          <div className="flex items-center gap-6 mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
            <button
              onClick={toggleLike}
              className={\`flex items-center gap-1.5 transition \${post.isLiked ? 'text-rose-500 font-bold' : 'hover:text-rose-400'}\`}
            >
              <span>{post.isLiked ? '❤️' : '🤍'}</span>
              <span>{post.likesCount}</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-indigo-400">
              <span>💬</span> <span>Comments</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-emerald-400">
              <span>🔁</span> <span>{post.repostsCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}`
  },

  'portal': {
    id: 'portal',
    title: 'Portal',
    category: 'webapp',
    tagline: 'A secure, password-protected gateway that aggregates specific information for employees, students, or bank customers',
    summary: 'A consolidated authenticated workspace aggregating role-specific information dashboards, encrypted document repositories, institutional announcements, credential badges, and compliance records.',
    difficulty: 'Intermediate-Advanced',
    renderPattern: 'CSR (SPA)',
    stateArchitecture: 'JWT / Session Cookie Auth + Role-Based Access Control (RBAC) Switcher + Document Vault state',
    keyConcepts: [
      'Multi-Role Personas (Student vs Faculty vs System Admin view state gating)',
      'Secure Document Vault with download verification and audit access logs',
      'Authenticated session lifecycle management (Inactivity timeout warnings & token refresh)',
      'Institutional announcements with priority badges (Emergency, Urgent, General)',
      'Compliance and Verification Credential cards with dynamic QR verification code'
    ],
    techStack: ['React / Next.js', 'NextAuth / Auth0 / Supabase Auth', 'PostgreSQL / Prisma', 'Tailwind CSS', 'Lucide Icons'],
    coreEngineeringChallenges: [
      'Handling secure inactivity logout countdown timers gracefully without losing unsaved forms',
      'Enforcing strict permission hierarchies preventing privilege escalation across portal roles',
      'Generating digitally signed, time-limited presigned URLs (S3/Cloud Storage) for secure document downloads'
    ],
    securityConsiderations: [
      { threat: 'Privilege Escalation (Changing role in LocalStorage)', mitigation: 'Client role switches must ONLY be simulated in dev. In production, roles MUST be verified server-side via cryptographic JWT claims.' },
      { threat: 'Sensitive Document Data Scrapes', mitigation: 'Serve files exclusively through short-lived presigned URLs with IP bound access logs.' }
    ],
    architectureLayers: [
      { layer: 'Authentication Guard', technology: 'Session Context + Inactivity Timer', responsibility: 'Session validation, auto-logout, role permissions' },
      { layer: 'Role-Gated Dashboard', technology: 'Persona Switcher (Student / Faculty / Admin)', responsibility: 'Contextual widgets, GPA / Schedule / Payroll views' },
      { layer: 'Document Vault', technology: 'Encrypted File Directory + Download Simulator', responsibility: 'Transcripts, tax forms, compliance clearances' },
      { layer: 'Secure Inbox', technology: 'End-to-End Encrypted Message Inbox', responsibility: 'Institutional notifications and direct advisor messaging' }
    ],
    studentExercises: [
      { level: 'Warmup', title: 'Role-Based Component Gating', prompt: 'Create a wrapper component <RequireRole role="admin"> that displays an "Access Denied" badge when unauthorized.' },
      { level: 'Core Challenge', title: 'Inactivity Auto-Logout Modal', prompt: 'Build a hook that tracks user clicks and mouse moves, popping up a 60-second warning modal before logging the user out.' },
      { level: 'Advanced / Capstone', title: 'Presigned Document Download Vault', prompt: 'Implement a simulated download center that generates a secure, 30-second expiring download token for confidential PDFs.' }
    ],
    codeSnippet: `// Role-Gated Portal Gateway with Persona Switcher
import React, { createContext, useContext, useState } from 'react';

type UserRole = 'student' | 'faculty' | 'admin';

interface PortalUser {
  id: string;
  name: string;
  role: UserRole;
  department: string;
}

const AuthContext = createContext<{
  user: PortalUser;
  switchRole: (role: UserRole) => void;
}>({
  user: { id: 'STU-9481', name: 'Alex Rivera', role: 'student', department: 'Computer Science' },
  switchRole: () => {},
});

export function PortalGate({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<PortalUser>({
    id: 'STU-9481',
    name: 'Alex Rivera',
    role: 'student',
    department: 'Computer Science',
  });

  const switchRole = (newRole: UserRole) => {
    setUser({
      id: newRole === 'student' ? 'STU-9481' : newRole === 'faculty' ? 'FAC-3012' : 'ADM-001',
      name: newRole === 'student' ? 'Alex Rivera' : newRole === 'faculty' ? 'Dr. Sarah Chen' : 'Admin Operations',
      role: newRole,
      department: 'Computer Science'
    });
  };

  return (
    <AuthContext.Provider value={{ user, switchRole }}>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        {/* Top Portal Banner with Persona Switcher for Students */}
        <header className="border-b border-slate-800 bg-slate-900 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-indigo-600 text-white font-bold px-2.5 py-1 rounded text-sm">PORTAL</span>
            <span className="text-sm font-semibold">{user.name} ({user.id})</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Persona:</span>
            {(['student', 'faculty', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => switchRole(r)}
                className={\`px-2.5 py-1 rounded capitalize font-medium transition \${
                  user.role === r ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }\`}
              >
                {r}
              </button>
            ))}
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </AuthContext.Provider>
  );
}`
  },

  'project-management': {
    id: 'project-management',
    title: 'Project Management Tool',
    category: 'webapp',
    tagline: 'Helps teams collaborate, assign tasks, and track work progress in real time',
    summary: 'A real-time productivity workspace featuring an interactive Agile Kanban board, drag/move task state transitions, priority indicators, sprint progress velocity metrics, and dynamic task creation modals.',
    difficulty: 'Advanced',
    renderPattern: 'CSR (SPA)',
    stateArchitecture: 'Complex Normalized State (Tasks by ID + Column Array IDs) + Optimistic Drag Transitions',
    keyConcepts: [
      'Normalized State Management (Separating entities from order arrays to avoid redundant re-renders)',
      'Drag-and-Drop state transitions across multi-lane Kanban boards (HTML5 Drag and Drop / @dnd-kit)',
      'Sprint Velocity and Progress Calculation (Done / Total tasks percentage)',
      'Task filtering by Assignee, Priority (Urgent/High/Medium), and Tag',
      'Real-time collaborative locks (displaying "User X is currently editing this card")'
    ],
    techStack: ['React / Vite', '@dnd-kit/core / pragmatic-drag-and-drop', 'Zustand / Redux Toolkit', 'Socket.io', 'Tailwind CSS'],
    coreEngineeringChallenges: [
      'Avoiding quadratic re-renders when dragging tasks across dense boards',
      'Managing concurrent edits where two teammates drag or reassign the same task simultaneously',
      'Keyboard accessibility for drag-and-drop (WAI-ARIA live region announcements)'
    ],
    securityConsiderations: [
      { threat: 'Unauthorized Task Modification', mitigation: 'Validate project workspace membership and task edit permissions before accepting mutations.' },
      { threat: 'Stored XSS in Task Descriptions & Comments', mitigation: 'Sanitize markdown/rich text input with strict whitelist filters.' }
    ],
    architectureLayers: [
      { layer: 'Kanban Stage Lanes', technology: 'React + Dnd-Kit Column Containers', responsibility: 'Backlog, In Progress, Review, and Done columns' },
      { layer: 'Task Entity Store', technology: 'Zustand Normalized State', responsibility: 'Task CRUD, status transitions, assignee updates' },
      { layer: 'Sprint Metrics', technology: 'Calculated Velocity & Progress Bars', responsibility: 'Completion percentage, remaining story points' },
      { layer: 'Task Detail Drawer', technology: 'Modal Dialog + Comment Sub-Thread', responsibility: 'Rich descriptions, attachments, activity history' }
    ],
    studentExercises: [
      { level: 'Warmup', title: 'Task Priority Badge & Status Move', prompt: 'Add status advance buttons (e.g. Move to In Progress -> Move to Done) that update task state directly.' },
      { level: 'Core Challenge', title: 'Sprint Progress Bar Engine', prompt: 'Calculate the dynamic percentage of completed story points and update the sprint velocity banner in real time.' },
      { level: 'Advanced / Capstone', title: 'Accessible Drag-and-Drop Kanban', prompt: 'Implement HTML5 drag-and-drop with dragover visual highlights and reorder support within columns.' }
    ],
    codeSnippet: `// Normalized Kanban Board State Transition Engine
import React, { useState } from 'react';

export type TaskStatus = 'backlog' | 'in_progress' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  assignee: string;
  storyPoints: number;
}

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 'T-1', title: 'Setup OAuth2 Token Refresh Handlers', status: 'backlog', priority: 'high', assignee: 'Alex', storyPoints: 5 },
    { id: 'T-2', title: 'Refactor Stripe Webhook Idempotency', status: 'in_progress', priority: 'urgent', assignee: 'Sarah', storyPoints: 8 },
    { id: 'T-3', title: 'Design System Typography Audit', status: 'review', priority: 'medium', assignee: 'Jordan', storyPoints: 3 },
    { id: 'T-4', title: 'Configure CDN Cache Invalidation Hooks', status: 'done', priority: 'low', assignee: 'Alex', storyPoints: 2 },
  ]);

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const columns: { key: TaskStatus; label: string; color: string }[] = [
    { key: 'backlog', label: 'Backlog', color: 'border-slate-700' },
    { key: 'in_progress', label: 'In Progress', color: 'border-amber-500' },
    { key: 'review', label: 'Code Review', color: 'border-indigo-500' },
    { key: 'done', label: 'Done', color: 'border-emerald-500' }
  ];

  const totalPoints = tasks.reduce((acc, t) => acc + t.storyPoints, 0);
  const donePoints = tasks.filter(t => t.status === 'done').reduce((acc, t) => acc + t.storyPoints, 0);
  const progressPct = Math.round((donePoints / totalPoints) * 100);

  return (
    <div className="p-6 bg-slate-950 text-white min-h-screen">
      {/* Sprint Progress Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">Sprint 14: Core Infrastructure</h2>
          <div className="text-xs text-slate-400">Velocity: {donePoints} of {totalPoints} story points completed</div>
        </div>
        <div className="w-48 bg-slate-800 rounded-full h-3 overflow-hidden">
          <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: \`\${progressPct}%\` }} />
        </div>
      </div>

      {/* 4 Column Kanban Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        {columns.map(col => {
          const colTasks = tasks.filter(t => t.status === col.key);
          return (
            <div key={col.key} className={\`bg-slate-900/70 border-t-4 \${col.color} border-slate-800 rounded-xl p-4\`}>
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-sm text-slate-200">{col.label}</span>
                <span className="bg-slate-800 text-slate-400 text-xs px-2 py-0.5 rounded-full">{colTasks.length}</span>
              </div>
              <div className="space-y-3">
                {colTasks.map(task => (
                  <div key={task.id} className="bg-slate-950 border border-slate-800 rounded-lg p-3 hover:border-slate-600 transition">
                    <div className="text-xs font-mono text-slate-500 mb-1">{task.id} • {task.storyPoints} pts</div>
                    <div className="text-sm font-medium text-slate-200 mb-3">{task.title}</div>
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-900">
                      <span className="text-slate-400">👤 {task.assignee}</span>
                      <select
                        value={task.status}
                        onChange={(e) => moveTask(task.id, e.target.value as TaskStatus)}
                        className="bg-slate-900 border border-slate-700 text-xs text-slate-300 rounded px-1.5 py-0.5"
                      >
                        <option value="backlog">Backlog</option>
                        <option value="in_progress">In Progress</option>
                        <option value="review">Review</option>
                        <option value="done">Done</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}`
  },

  'elearning': {
    id: 'elearning',
    title: 'E-learning Platform',
    category: 'webapp',
    tagline: 'Delivers interactive online courses, quizzes, and video lectures',
    summary: 'A comprehensive pedagogical learning hub featuring curriculum module trees, video lecture simulations with timeline bookmarks, interactive coding quizzes with immediate evaluation, course completion tracking, and verifiable certificate generation.',
    difficulty: 'Advanced',
    renderPattern: 'CSR (SPA)',
    stateArchitecture: 'Course Progress Hierarchy (Lessons completed set + Quiz score states + Video timestamp sync)',
    keyConcepts: [
      'Curriculum State Tree (Courses -> Modules -> Lessons with completion checkmarks)',
      'Video Player State Integration (Timestamp bookmarking, playback speed, auto-advance on finish)',
      'Interactive Multiple-Choice & Code Quiz Engine with immediate feedback and explanation pills',
      'Course Completion Calculation & Dynamic SVG Certificate of Completion generator',
      'SCORM / xAPI telemetry standards for learning record tracking'
    ],
    techStack: ['React / Vite', 'Video.js / Plyr / HTML5 Video', 'Zustand / LocalStorage', 'Canvas API / jspdf (Certificates)', 'Tailwind CSS'],
    coreEngineeringChallenges: [
      'Persisting video playback position across page navigation and resuming seamlessly',
      'Preventing quiz answer inspection via client DevTools (evaluating on backend in production)',
      'Dynamic SVG/Canvas generation of high-resolution certificates with verifiable IDs'
    ],
    securityConsiderations: [
      { threat: 'Client-side Quiz Cheating', mitigation: 'Never send correct answers in the initial quiz payload. Send user responses to server for evaluation.' },
      { threat: 'Pirated Course Video Scraping', mitigation: 'Use HLS/DASH streaming with encrypted media extensions (EME) or signed cookie video streams.' }
    ],
    architectureLayers: [
      { layer: 'Curriculum Sidebar', technology: 'Collapsible Module Accordions', responsibility: 'Lesson navigation, completion checkboxes, locked states' },
      { layer: 'Lecture Stage', technology: 'Video Player + Note Taker', responsibility: 'Video playback, timestamp bookmarks, transcript sync' },
      { layer: 'Interactive Quiz Engine', technology: 'Multi-Step Question Form + Grading logic', responsibility: 'Knowledge verification, explanation modals' },
      { layer: 'Certificate Generator', technology: 'SVG / Canvas Render Engine', responsibility: 'Dynamic name, completion date, and QR credential stamp' }
    ],
    studentExercises: [
      { level: 'Warmup', title: 'Interactive Lesson Checkbox', prompt: 'Create a lesson item that toggles completed state and recalculates the overall course progress bar.' },
      { level: 'Core Challenge', title: 'Self-Grading Quiz Engine', prompt: 'Build a multi-question interactive quiz that disables submitted answers, calculates score, and explains mistakes.' },
      { level: 'Advanced / Capstone', title: 'Dynamic Certificate Modal Generator', prompt: 'Render a printable SVG certificate featuring the student name, course title, and unique verification hash.' }
    ],
    codeSnippet: `// Interactive Quiz Evaluation Engine with Explanations
import React, { useState } from 'react';

interface Question {
  id: number;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export function CourseQuiz({ questions }: { questions: Question[] }) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (qId: number, optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) score += 1;
    });
    return score;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-3xl mx-auto text-white">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-bold">Module Knowledge Check</h3>
          <p className="text-xs text-slate-400">Test your mastery of the concepts covered in this module.</p>
        </div>
        {isSubmitted && (
          <div className="text-right">
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">
              {calculateScore()} / {questions.length}
            </span>
            <div className="text-xs text-slate-400">Score ({Math.round((calculateScore() / questions.length) * 100)}%)</div>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {questions.map((q, qIndex) => {
          const userAnswer = selectedAnswers[q.id];
          return (
            <div key={q.id} className="space-y-3">
              <div className="font-semibold text-sm text-slate-200">
                <span className="text-indigo-400 font-mono mr-2">Q{qIndex + 1}.</span>
                {q.prompt}
              </div>

              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userAnswer === optIdx;
                  let btnStyle = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300';

                  if (isSubmitted) {
                    if (optIdx === q.correctIndex) {
                      btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-semibold';
                    } else if (isSelected && optIdx !== q.correctIndex) {
                      btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-300';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-indigo-950/80 border-indigo-500 text-indigo-200';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isSubmitted}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={\`w-full text-left p-3 rounded-xl border text-sm transition flex items-center justify-between \${btnStyle}\`}
                    >
                      <span>{opt}</span>
                      {isSubmitted && optIdx === q.correctIndex && <span>✓ Correct</span>}
                      {isSubmitted && isSelected && optIdx !== q.correctIndex && <span>✗ Incorrect</span>}
                    </button>
                  );
                })}
              </div>

              {isSubmitted && (
                <div className="text-xs bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-400 mt-2">
                  <strong className="text-slate-300">Explanation:</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-4 border-t border-slate-800 flex justify-between items-center">
        {!isSubmitted ? (
          <button
            onClick={() => setIsSubmitted(true)}
            disabled={Object.keys(selectedAnswers).length < questions.length}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-xl text-sm"
          >
            Submit Answers
          </button>
        ) : (
          <button
            onClick={() => { setIsSubmitted(false); setSelectedAnswers({}); }}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium px-4 py-2 rounded-xl text-sm"
          >
            Retake Quiz
          </button>
        )}
      </div>
    </div>
  );
}`
  }
};

export const TEMPLATES_DATA: TeachingMetadata[] = Object.values(TEMPLATE_METADATA);

