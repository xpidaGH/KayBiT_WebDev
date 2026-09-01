import { UserGuideContent } from '../userGuideTypes';

export const enGuide: UserGuideContent = {
  title: 'Web Development Archetypes Reference & User Guide',
  subtitle: 'Mastering the 11 Foundational Architecture Patterns of Modern Web Systems',
  badge: 'Interactive Curriculum Reference',
  tableOfContents: {
    overview: '1. Pedagogical Overview',
    navigation: '2. Interface & Navigation',
    archetypes: '3. The 11 Archetypes Catalog',
    modes: '4. Exploration Modes',
    studentGuide: '5. Student Learning Pathway',
    faq: '6. Frequently Asked Questions',
  },
  sections: {
    overview: {
      title: '1. Pedagogical Overview & Purpose',
      desc: 'Modern web engineering bridges content-centric static delivery and distributed real-time transactional web applications. This laboratory provides complete, production-grade implementations of the 11 foundational web archetypes to help learners master rendering patterns, state synchronization, data tiering, and security threat modeling.',
      highlights: [
        '11 Interactive Archetypes with live state, realistic UX, and zero placeholder stubs.',
        '5-Layer Architecture Breakdown: Presentation, Client State, API, Database, and Caching.',
        'OWASP Top 10 Security Threat Modeling and verified remediation patterns.',
        'Tiered Student Challenges: Warmup, Core Engineering, and Advanced Capstone assignments.',
      ],
    },
    navigation: {
      title: '2. Interface & Navigation Guide',
      desc: 'Navigate smoothly between templates, viewports, and deep-dive technical modes using the workspace controls.',
      steps: [
        {
          title: 'Sidebar Curriculum Navigator',
          detail: 'Filter templates by category (Websites vs. Web Apps) or use the search bar to find patterns (e.g. SSG, SSR, RBAC, Realtime).',
        },
        {
          title: 'Top Bar Mode Switcher',
          detail: 'Switch between Interactive Preview, Architecture & Stack, Security & Threats, Student Challenges, and Source Scaffold.',
        },
        {
          title: 'Viewport Breakpoint Simulator',
          detail: 'Test responsive fluidity across Desktop (100%), Tablet (768px), and Mobile (375px) device screens in real-time.',
        },
        {
          title: 'Blueprint Copying',
          detail: 'Click "Copy Blueprint" to extract production-grade TypeScript components and types directly into your local editor.',
        },
      ],
    },
    archetypes: {
      title: '3. The 11 Archetypes Catalog',
      desc: 'Explore the two primary classes of web systems: Content Websites and Transactional Web Applications.',
      websites: [
        {
          name: 'Blog / Content Site',
          pattern: 'SSG + ISR',
          desc: 'Reading progress tracker, markdown AST parser, category indexing, and SEO structured schemas.',
        },
        {
          name: 'E-commerce Store',
          pattern: 'Hybrid (SSG + CSR)',
          desc: 'Faceted multi-attribute filters, slide-over cart drawer, promo discounts, and checkout state machine.',
        },
        {
          name: 'Portfolio',
          pattern: 'Jamstack / SSG',
          desc: 'Case study modal deep-dives, Core Web Vitals optimization, and contact form validation.',
        },
        {
          name: 'Corporate Business Site',
          pattern: 'SSR + Headless CMS',
          desc: 'Interactive ROI business value calculator, service matrix, testimonials, and consultation booking.',
        },
        {
          name: 'Landing Page',
          pattern: 'Edge Cached SSG',
          desc: 'Product launch countdown ticker, Annual vs. Monthly pricing toggle with 20% discount engine, and lead capture.',
        },
        {
          name: 'Educational Wiki & Docs',
          pattern: 'Search-Indexed SSG',
          desc: 'Multi-level collapsible hierarchy, instant algorithmic search, code blocks, and feedback telemetry.',
        },
      ],
      webapps: [
        {
          name: 'SaaS Telemetry Dashboard',
          pattern: 'CSR + Realtime Stream',
          desc: 'Latency histograms, API key lifecycle generation with one-time reveal, and RBAC team member management.',
        },
        {
          name: 'Social Media Feed',
          pattern: 'Optimistic CSR + Events',
          desc: 'Story rings, rich code-snippet post composer, optimistic like counters, and threaded comments.',
        },
        {
          name: 'Role-Gated Portal',
          pattern: 'SSO / RBAC Enterprise',
          desc: 'Persona switching (Student, Faculty, Admin), presigned document downloads, and QR verification badges.',
        },
        {
          name: 'Project Management Kanban',
          pattern: 'Kanban State Machine',
          desc: '4-stage sprint board, story point velocity tracking, priority indicators, and stage transition mechanics.',
        },
        {
          name: 'E-learning LMS Platform',
          pattern: 'Interactive Course Engine',
          desc: 'Interactive video player simulation, lesson completion checklists, quizzes with scoring, and certificates.',
        },
      ],
    },
    modes: {
      title: '4. Laboratory Exploration Modes',
      desc: 'Each archetype contains five specialized analytical perspectives for comprehensive learning.',
      items: [
        {
          name: 'Interactive Preview',
          desc: 'Test the live functional user experience, click interactive elements, and examine touch target responsive states.',
        },
        {
          name: 'Architecture & Stack',
          desc: 'Examine the multi-tier engineering breakdown across Presentation, State, API, Database, and Caching.',
        },
        {
          name: 'Security & Threats',
          desc: 'Study OWASP Top 10 vulnerabilities relevant to the archetype, attack vectors, and defensive remediation code.',
        },
        {
          name: 'Student Challenges',
          desc: 'Tackle progressive coding exercises categorized into Warmup, Core Challenge, and Advanced Capstone tiers.',
        },
        {
          name: 'Source Scaffold',
          desc: 'Inspect and copy clean, modular TypeScript starter blueprints ready for your own projects.',
        },
      ],
    },
    studentGuide: {
      title: '5. Student Learning Pathway & Best Practices',
      desc: 'Follow these pedagogical recommendations to maximize your software engineering growth.',
      tips: [
        'Compare Paradigms: Contrast why an E-commerce site uses Hybrid SSG+CSR while an Educational Wiki uses search-indexed SSG.',
        'Audit Security Early: Review the Security & Threats tab before writing any database queries or API endpoints.',
        'Test Viewport Breakpoints: Switch between Desktop, Tablet, and Mobile to check responsive layout integrity.',
        'Complete Hands-on Exercises: Fork the code and solve the Warmup and Core challenges on your local development machine.',
      ],
    },
    faq: {
      title: '6. Frequently Asked Questions (FAQ)',
      items: [
        {
          q: 'What is the core difference between a Website and a Web Application in this lab?',
          a: 'Websites focus primarily on content delivery, SEO, and low-latency edge caching. Web Applications focus on dynamic client state mutation, multi-user transactions, and role-based permissions.',
        },
        {
          q: 'Can I reuse the starter blueprints for my university projects or hackathons?',
          a: 'Yes. All starter blueprints and architecture models are distributed under open educational standards for student learning and project bootstrapping.',
        },
        {
          q: 'How do I test my own solutions to the Student Challenges?',
          a: 'Copy the blueprint code into your local workspace, implement the requested feature branch, and verify against the security and state synchronization guidelines.',
        },
      ],
    },
  },
};
