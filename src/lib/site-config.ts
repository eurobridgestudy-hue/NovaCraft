export const siteConfig = {
  name: "NovaCraft",
  tagline: "Bespoke Website Design & Digital Craft Studio",
  description:
    "NovaCraft designs high-performance, conversion-driven websites and brand identities for ambitious founders, startups, and established enterprises worldwide.",
  contactEmail: "novacraft.webdesign@gmail.com",
  contactPhone: "+370 69140144",
  phoneFormatted: "+370 691 40144",
  telLink: "tel:+37069140144",
  availabilityStatus: "Accepting projects for Q2 / Q3",
  stats: [
    { label: "Websites Crafted", value: "48+" },
    { label: "Client Satisfaction", value: "99.4%" },
    { label: "Average Conversion Lift", value: "+145%" },
    { label: "Lighthouse Performance", value: "98/100" },
  ],
  formSubmissionDestination: "Lovable Cloud → Database → quote_requests",
} as const;

export const clientLogos = [
  { name: "Aura Capital", category: "Venture & Finance" },
  { name: "Kinetix Bio", category: "Health Tech" },
  { name: "Luminary Home", category: "Architecture & Design" },
  { name: "Vanguard SaaS", category: "B2B Software" },
  { name: "Nordic Atelier", category: "E-Commerce Luxury" },
  { name: "Crestline Mobility", category: "Clean Tech" },
] as const;

export const services = [
  {
    number: "01",
    id: "bespoke-web-design",
    title: "Bespoke Website Design",
    summary:
      "Custom-crafted, high-converting digital storefronts and marketing websites tailored to your brand's unique identity.",
    detail:
      "We replace generic templates with custom design architecture. From typography scales and interactive micro-animations to clear narrative flow, every pixel is engineered to captivate and convert.",
    deliverables: [
      "Custom Figma UI/UX design systems",
      "Interactive high-fidelity prototypes",
      "Mobile-first responsive layouts",
      "Conversion rate optimization (CRO)",
      "Bespoke iconography & visual assets",
    ],
    timeline: "2 – 4 Weeks",
  },
  {
    number: "02",
    id: "web-engineering",
    title: "Modern Web Engineering",
    summary:
      "Lightning-fast, accessible, and SEO-engineered web applications built with modern frontend frameworks.",
    detail:
      "We turn high-end design into clean, scalable code. Sub-second load times, flawless responsiveness across all viewports, intuitive CMS editing, and strict Core Web Vitals compliance come standard.",
    deliverables: [
      "Modern React / Vite / TanStack engineering",
      "Blazing sub-second Core Web Vitals score",
      "Full On-Page SEO & semantic structure",
      "Headless CMS or Database integration",
      "Analytics & event tracking setup",
    ],
    timeline: "3 – 5 Weeks",
  },
  {
    number: "03",
    id: "brand-identity",
    title: "Brand Identity & Systems",
    summary:
      "Cohesive visual identities, typography guidelines, and design tokens that distinguish your company in a crowded market.",
    detail:
      "Your website is only as strong as the brand foundation beneath it. We build memorable logomarks, color palettes, and component guidelines that carry seamlessly across your web and digital touchpoints.",
    deliverables: [
      "Primary & secondary logo marks",
      "Color theory & semantic palette scales",
      "Typography pairing & editorial hierarchy",
      "Complete Brand Styleguide (PDF & Figma)",
      "Digital asset export kit (SVG, PNG, WebP)",
    ],
    timeline: "2 Weeks",
  },
  {
    number: "04",
    id: "social-digital-direction",
    title: "Social & Digital Strategy",
    summary:
      "Ongoing strategic creative direction to ensure your social channels and digital marketing seamlessly amplify your website.",
    detail:
      "A great website thrives when backed by consistent inbound engagement. We align your social media aesthetics and campaign content directly with your website's narrative for a unified customer journey.",
    deliverables: [
      "Social media visual template kit",
      "Profile rebranding & narrative alignment",
      "Campaign visual direction",
      "Monthly performance review & iterations",
    ],
    timeline: "Ongoing Partnership",
  },
] as const;

export const portfolioProjects = [
  {
    title: "Aura Capital Partners",
    client: "Aura Capital",
    category: "Finance & Venture",
    domain: "auracapital.vc",
    role: "Full Brand Identity & High-Performance Flagship",
    timeline: "4 Weeks Turnaround",
    summary:
      "An editorial, ultra-fast portfolio website for a European early-stage tech fund managing €120M in assets.",
    challenge:
      "Aura needed to project institutional authority to LP investors while demonstrating cutting-edge technical discernment to elite AI and software founders.",
    solution:
      "We engineered a dark-mode editorial flagship powered by TanStack Start, pairing tactile financial charts with sub-second page transitions.",
    stat: "+210% inbound pitch decks",
    metrics: [
      { label: "Inbound Deal Flow", value: "+210%" },
      { label: "Global Edge TTFB", value: "340ms" },
      { label: "Lighthouse Score", value: "99/100" },
    ],
    award: "Awwwards Nominee",
    palette: "from-stone-900 via-neutral-800 to-stone-950",
    accentColor: "#38bdf8",
    tags: ["Brand Identity", "TanStack Start", "Headless CMS", "Dark Editorial", "Edge Caching"],
    year: "2025",
  },
  {
    title: "Verve Athletic Apparel",
    client: "Verve",
    category: "E-Commerce & DTC",
    domain: "verveathletic.com",
    role: "Headless E-Commerce & Interactive Lookbooks",
    timeline: "5 Weeks Turnaround",
    summary:
      "High-velocity lifestyle e-commerce experience with sub-second product page transitions and sleek interactive lookbooks.",
    challenge:
      "Verve's previous template-based Shopify storefront suffered from high bounce rates and sluggish mobile load times, dampening limited streetwear drops.",
    solution:
      "We designed a minimalist, cinematic product narrative with instant variant switching, 60fps micro-interactions, and frictionless checkout routing.",
    stat: "+42% checkout conversion",
    metrics: [
      { label: "Checkout Conversion", value: "+42%" },
      { label: "Product Page Speed", value: "0.45s" },
      { label: "Mobile Bounce Rate", value: "-34%" },
    ],
    award: "Site of the Day",
    palette: "from-indigo-950 via-slate-900 to-blue-950",
    accentColor: "#818cf8",
    tags: [
      "E-Commerce UI",
      "Design System",
      "Micro-Interactions",
      "Motion Direction",
      "Shopify Headless",
    ],
    year: "2025",
  },
  {
    title: "Kinetix BioSciences",
    client: "Kinetix",
    category: "HealthTech & Biotech",
    domain: "kinetixbio.health",
    role: "Interactive Scrollytelling & 3D WebGL Platform",
    timeline: "6 Weeks Turnaround",
    summary:
      "Translating complex gene therapies into an accessible, visually breathtaking narrative for investors and scientific talent.",
    challenge:
      "Communicating patented molecular mechanics without overwhelming non-specialist venture investors or diluting rigorous scientific credibility.",
    solution:
      "We built an interactive scrollytelling canvas with custom WebGL particle simulations, interactive clinical phase trackers, and 100/100 Lighthouse speed.",
    stat: "100/100 Lighthouse Performance",
    metrics: [
      { label: "Lighthouse Performance", value: "100/100" },
      { label: "Investor Dwell Time", value: "+160%" },
      { label: "First Contentful Paint", value: "0.32s" },
    ],
    award: "FWA of the Day",
    palette: "from-teal-950 via-emerald-950 to-slate-950",
    accentColor: "#34d399",
    tags: [
      "3D WebGL Motion",
      "Interactive Scrollytelling",
      "Branding",
      "Accessibility AA",
      "React",
    ],
    year: "2024",
  },
  {
    title: "Luminary Residence",
    client: "Luminary Architects",
    category: "Luxury Architecture",
    domain: "luminaryresidence.com",
    role: "Monograph Architecture & Editorial CMS",
    timeline: "4 Weeks Turnaround",
    summary:
      "Minimalist, typography-first digital monograph showcasing modern Scandinavian architectural masterworks.",
    challenge:
      "High-net-worth private clients required an experience as refined and uncompromising as the physical architectural residences themselves.",
    solution:
      "We crafted an ultra-spacious Swiss editorial grid with full-bleed architectural photography, interactive blueprint drawers, and discreet inquiry flows.",
    stat: "+180% private client inquiries",
    metrics: [
      { label: "Private Client Inquiries", value: "+180%" },
      { label: "Avg Session Duration", value: "4m 12s" },
      { label: "Performance Rating", value: "98/100" },
    ],
    award: "CSSDA Special Kudos",
    palette: "from-amber-950/40 via-stone-900 to-neutral-950",
    accentColor: "#fbbf24",
    tags: [
      "Minimalist UX",
      "Editorial Grid",
      "Custom CMS",
      "Swiss Typography",
      "High-Res Photography",
    ],
    year: "2024",
  },
] as const;

export const processSteps = [
  [
    "01",
    "Discovery & Strategic Blueprint",
    "We dive into your business model, customer psychology, competitive landscape, and conversion bottlenecks to create a razor-sharp strategy.",
    "Deliverable: Site Architecture & Strategic Brief",
  ],
  [
    "02",
    "Wireframing & Information Flow",
    "We architect the user journey, storytelling hierarchy, and high-conversion wireframes before styling a single visual pixel.",
    "Deliverable: Clickable Low-Fidelity Wireframes",
  ],
  [
    "03",
    "High-Fidelity Visual Design",
    "We bring the website to life with bespoke typography, custom components, rich art direction, and micro-interactions in Figma.",
    "Deliverable: Comprehensive Figma Design System",
  ],
  [
    "04",
    "Production-Grade Web Engineering",
    "We code the website with clean, performant React/Vite/Tailwind code, ensuring sub-second speeds, smooth animations, and bulletproof SEO.",
    "Deliverable: Full Interactive Staging Build",
  ],
  [
    "05",
    "Launch & Performance Growth",
    "Thorough cross-device testing, Core Web Vitals validation, DNS migration, analytics verification, and continuous optimization support.",
    "Deliverable: Live Website & Handover Documentation",
  ],
] as const;

export const testimonials = [
  [
    "Working with NovaCraft transformed how our enterprise is perceived. We went from looking like a generic template to commanding industry authority. Our qualified lead volume doubled within 6 weeks of launch.",
    "Elena Vance",
    "Managing Partner, Vance & Co.",
    "B2B Advisory",
  ],
  [
    "The attention to typographic rhythm and speed is unmatched. Our bounce rate dropped by 38% immediately upon launch, and the team made the entire design process feel effortless.",
    "Marcus Lindqvist",
    "Founder & CEO, Verve Labs",
    "DTC Tech",
  ],
  [
    "NovaCraft doesn't just build pretty pages; they understand conversions, brand psychology, and high-performance engineering. Easily the best agency investment we have made.",
    "Sophia Patel",
    "Head of Brand, Kinetix AI",
    "HealthTech",
  ],
] as const;

export const faqs = [
  {
    q: "How long does a bespoke website design project take?",
    a: "Most custom website projects take between 3 to 6 weeks from initial kickoff to live deployment. Smaller high-impact landing sites can be delivered in 2 weeks, while comprehensive enterprise platforms with custom integrations typically take 6 to 8 weeks.",
  },
  {
    q: "Why choose NovaCraft over generic website builders or freelance templates?",
    a: "Templates are bloated, slow, and look identical to competitors. NovaCraft creates custom-crafted digital experiences engineered specifically for your brand narrative and conversion goals. Every line of code is optimized for sub-second performance and superior search rankings.",
  },
  {
    q: "What technologies and frameworks do you build with?",
    a: "We specialize in modern, high-performance web stacks: React, Vite, TanStack Router/Start, Tailwind CSS, TypeScript, and Supabase. This guarantees ultra-fast client-side navigation, first-class SEO, and zero technical bloat.",
  },
  {
    q: "Can I manage and update content on the website myself?",
    a: "Absolutely. We can integrate an intuitive headless CMS or build customized admin interfaces, allowing your team to update text, publish blog posts, and modify showcase items without writing a single line of code.",
  },
  {
    q: "How does the payment and project contract work?",
    a: "We work with clear, milestone-based deliverables (typically 50% deposit upon kickoff, and 50% upon final launch approval). We provide transparent scopes with zero hidden fees.",
  },
] as const;

export const comparisonPoints = [
  {
    feature: "Design Quality",
    novacraft: "100% Bespoke, crafted from blank canvas in Figma",
    others: "Off-the-shelf theme or modified cookie-cutter template",
  },
  {
    feature: "Performance & Speed",
    novacraft: "Sub-second load times (95+ Lighthouse Score)",
    others: "Heavy bloated plugins, slow 3-5s load speeds",
  },
  {
    feature: "Conversion Focus",
    novacraft: "Engineered specifically to turn visitors into booked clients",
    others: "Superficial graphics with zero buyer psychology",
  },
  {
    feature: "Code Cleanliness",
    novacraft: "Modern clean React / TypeScript architecture",
    others: "Cluttered builder code that breaks over time",
  },
  {
    feature: "Client Communication",
    novacraft: "Direct access to senior designer & engineer with dedicated Slack",
    others: "Account managers and frustrating delays",
  },
] as const;
