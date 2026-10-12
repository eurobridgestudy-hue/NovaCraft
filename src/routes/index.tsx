import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Code2,
  Compass,
  ExternalLink,
  Eye,
  Globe2,
  Info,
  Layers,
  Layout,
  Lock,
  MessageSquareShare,
  MonitorCheck,
  Share2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users2,
  Zap,
} from "lucide-react";
import { useState } from "react";

import auraShowcase from "@/assets/aura-showcase.jpg";
import verveShowcase from "@/assets/verve-showcase.jpg";
import kinetixShowcase from "@/assets/kinetix-showcase.jpg";
import luminaryShowcase from "@/assets/luminary-showcase.jpg";
import studioWorkspace from "@/assets/studio-workspace.jpg";
import editorialImage from "@/assets/novacraft-editorial.jpg";
import { Button } from "@/components/ui/button";
import { QuoteBand } from "@/components/quote-band";
import { CinematicCanvas } from "@/components/cinematic-canvas";
import { CinematicCursor } from "@/components/cinematic-cursor";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  clientLogos,
  comparisonPoints,
  faqs,
  portfolioProjects,
  processSteps,
  services,
  siteConfig,
  testimonials,
} from "@/lib/site-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "NovaCraft — Cinematic Web Design & Worldwide Digital Studio",
      },
      {
        name: "description",
        content:
          "NovaCraft creates high-performance bespoke websites, strategic social media advisory, and global social media management for ambitious founders worldwide.",
      },
      {
        property: "og:title",
        content: "NovaCraft — Cinematic Web Design & Worldwide Digital Studio",
      },
      {
        property: "og:description",
        content:
          "Cinematic 3D WebGL experiences, bespoke web development, and global social media execution.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const projectImages = [auraShowcase, verveShowcase, kinetixShowcase, luminaryShowcase];

// 3 Core Investment Packages offered by NovaCraft
const engagementPlans = [
  {
    tier: "Launchpad MVP",
    tagline: "Rapid Market Entry",
    timeline: "2 – 3 Weeks",
    popular: false,
    highlight: "Early Stage & Founders",
    description:
      "Bespoke 3–5 page digital flagship engineered for startups needing immediate authority and lightning conversion.",
    features: [
      "Custom responsive design in Figma",
      "Next-gen React/TypeScript frontend",
      "Sub-400ms global TTFB caching",
      "On-page technical SEO & Schema markup",
      "14-day post-launch warranty",
    ],
  },
  {
    tier: "Growth Studio",
    tagline: "Complete Brand & Digital Presence",
    timeline: "4 – 5 Weeks",
    popular: true,
    highlight: "Most Popular Engagement",
    description:
      "Full digital flagship paired with headless CMS and narrative motion for scaleups commanding market leadership.",
    features: [
      "8–12 bespoke modular page templates",
      "Complete design system & component tokens",
      "Headless CMS integration with rich media",
      "Interactive 3D / WebGL micro-motion",
      "Social media narrative & visual launch kit",
      "30-day dedicated post-launch support",
    ],
  },
  {
    tier: "Bespoke Enterprise",
    tagline: "Custom Platform Architecture",
    timeline: "6 – 8 Weeks",
    popular: false,
    highlight: "Maximum Custom Scale",
    description:
      "Scalable multi-page platform with custom database modeling, authenticated client portals, and multi-region SLA.",
    features: [
      "Custom application architecture & Supabase DB",
      "Multi-theme enterprise component library",
      "Interactive data calculators & visualizers",
      "Global edge CDN with 99.99% uptime guarantee",
      "Worldwide social media strategy alignment",
      "60-day priority SLA & executive advisory",
    ],
  },
];

const chapterNav = [
  { id: "hero", label: "00 Monolith", title: "Overview" },
  { id: "web-creation", label: "01 Web Creation", title: "Websites" },
  { id: "social-advisory", label: "02 Social Advice", title: "Advisory" },
  { id: "social-management", label: "03 Global Social", title: "Management" },
  { id: "showcase", label: "04 Selected Works", title: "Commissions" },
  { id: "services-plans", label: "05 Plans & Quote", title: "Initiate" },
];

function HomePage() {
  const [activeProjectTab, setActiveProjectTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(1);
  const [activeCaseStudy, setActiveCaseStudy] = useState<(typeof portfolioProjects)[number] | null>(
    null,
  );

  const currentProject = portfolioProjects[activeProjectTab] ?? portfolioProjects[0]!;

  const getProjectImage = (title: string) => {
    const idx = portfolioProjects.findIndex((p) => p.title === title);
    return idx >= 0 && projectImages[idx] ? projectImages[idx]! : auraShowcase;
  };

  const categories = [
    { id: "all", label: "All Commissions", count: portfolioProjects.length },
    { id: "Finance & Venture", label: "Finance & Venture", count: 1 },
    { id: "E-Commerce & DTC", label: "E-Commerce & DTC", count: 1 },
    { id: "HealthTech & Biotech", label: "HealthTech & Bio", count: 1 },
    { id: "Luxury Architecture", label: "Luxury Architecture", count: 1 },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === selectedCategory);

  return (
    <div className="relative min-h-screen text-foreground selection:bg-cyan-500 selection:text-black">
      {/* =========================================================================
          CINEMATIC THREE.JS WEBGL BACKGROUND & ATMOSPHERIC OVERLAYS
      ========================================================================= */}
      <CinematicCanvas />
      <div className="cinematic-vignette" aria-hidden="true" />
      <div className="cinematic-grain" aria-hidden="true" />
      <CinematicCursor />

      {/* Main Page Scroll Content Layer (Z-Index 10 above 3D WebGL Canvas) */}
      <div className="relative z-10">
        {/* =========================================================================
            CHAPTER 00: HERO / THE DIGITAL MONOLITH
        ========================================================================= */}
        <section
          id="hero"
          data-cam="0"
          className="relative min-h-screen flex flex-col justify-between px-5 pt-20 pb-16 lg:px-12 lg:pt-28 lg:pb-24"
        >
          {/* Hero Header Area with Large Readable Typography */}
          <div className="mx-auto max-w-[1440px] w-full">
            {/* Chapter Indicator Ribbon */}
            <div className="flex items-center gap-3 animate-fade-in">
              <span className="size-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300 font-semibold">
                Chapter 00 — The Digital Monolith
              </span>
            </div>

            {/* Oversized Headline with Balanced Contrast */}
            <h1 className="mt-8 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[0.94] text-slate-100 max-w-6xl">
              Where digital craft reveals the{" "}
              <span className="text-gradient-shimmer italic font-normal">unseen.</span>
            </h1>

            {/* Subtitle & Core Agency Offerings */}
            <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-8 text-base bg-cyan-500 text-black font-semibold hover:bg-cyan-400 shadow-xl shadow-cyan-500/20 transition-all hover:scale-[1.03] active:scale-[0.98]"
                >
                  <Link to="/contact">
                    <span>Initiate Project Quote</span>
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 px-7 text-base border-white/15 bg-white/5 backdrop-blur-md hover:border-cyan-400/60 transition-all hover:bg-white/10 text-slate-200"
                >
                  <a href="#web-creation">
                    <span>Explore Chapters</span>
                    <ArrowDownRight className="ml-2 size-4 text-cyan-400" />
                  </a>
                </Button>
              </div>

              <p className="max-w-xl text-base sm:text-lg leading-relaxed text-slate-400">
                NovaCraft is an international digital production studio. We architect{" "}
                <strong className="text-slate-200 font-medium">bespoke websites</strong>, provide{" "}
                <strong className="text-slate-200 font-medium">social media advisory</strong>, and
                orchestrate{" "}
                <strong className="text-slate-200 font-medium">
                  worldwide social media management
                </strong>{" "}
                for ambitious category leaders.
              </p>
            </div>
          </div>

          {/* Chapter Navigation Chips (Kage-style chapter progression) */}
          <div className="mx-auto max-w-[1440px] w-full mt-16 pt-8 border-t border-white/10">
            {/* Scroll Cue Track */}
            <div className="flex items-center justify-end gap-3 mb-6 text-[10px] font-mono uppercase tracking-[0.26em] text-slate-400">
              <span>Scroll to enter the world</span>
              <div className="w-16 h-[1px] bg-white/15 relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-400 animate-cue-drift" />
              </div>
            </div>

            {/* Chapter Chips Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {chapterNav.map((chap) => (
                <a
                  key={chap.id}
                  href={`#${chap.id}`}
                  data-cursor
                  className="group flex flex-col p-3.5 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md transition-all hover:border-cyan-400/60 hover:bg-white/5 hover:-translate-y-1"
                >
                  <span className="font-mono text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
                    {chap.label.split(" ")[0]}
                  </span>
                  <span className="mt-1 font-semibold text-xs text-slate-200 group-hover:text-white">
                    {chap.title}
                  </span>
                  <span className="mt-0.5 text-[11px] text-slate-500 line-clamp-1">
                    {chap.label.split(" ").slice(1).join(" ")}
                  </span>
                </a>
              ))}
            </div>

            {/* Live Metrics Ribbon */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {siteConfig.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl border border-white/10 bg-black/50 backdrop-blur-md"
                >
                  <span className="font-display text-3xl font-bold tracking-tight text-white block">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            CHAPTER 01: BESPOKE WEBSITE CREATION
        ========================================================================= */}
        <section
          id="web-creation"
          data-cam="1"
          className="chapter-scrim px-5 py-24 lg:px-12 lg:py-36 border-t border-white/10"
        >
          <div className="mx-auto max-w-[1440px]">
            {/* Chapter Header */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-[0.25em]">
                  01 — Bespoke Website Creation
                </span>
                <span className="hairline-rule flex-1 max-w-xs" />
                <span className="font-mono text-xs text-slate-500 uppercase">
                  Architecture & Code
                </span>
              </div>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl text-white max-w-4xl leading-tight">
                Digital flagships engineered from zero. No templates. No compromises.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
                Off-the-shelf page builders and generic templates create fragile, slow websites that
                blend into the background. We craft bespoke web systems in React 19 and TanStack
                Start that turn visitors into high-value relationships.
              </p>
            </div>

            {/* Core Capabilities 4-Pillar Grid */}
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="luxury-card p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="size-10 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 mb-4">
                    <Layout className="size-5" />
                  </div>
                  <span className="font-mono text-xs text-cyan-400">01 / Modular Tokens</span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white">
                    Custom Design Systems
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Designed in Figma from typography fundamentals to bespoke responsive tokens.
                    Every interaction reflects your exact brand character.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[11px] text-slate-500">
                  Figma Kits • Design Tokens • WCAG AA
                </div>
              </div>

              <div className="luxury-card p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="size-10 rounded-lg bg-indigo-500/10 border border-indigo-400/30 flex items-center justify-center text-indigo-300 mb-4">
                    <Code2 className="size-5" />
                  </div>
                  <span className="font-mono text-xs text-indigo-400">02 / Edge Engineering</span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white">
                    Modern Full-Stack Code
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Engineered with TanStack Start, React 19, and TypeScript. Zero WordPress plugins
                    or bloated JavaScript dependencies.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[11px] text-slate-500">
                  React 19 • TypeScript • Headless CMS
                </div>
              </div>

              <div className="luxury-card p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="size-10 rounded-lg bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-300 mb-4">
                    <Zap className="size-5" />
                  </div>
                  <span className="font-mono text-xs text-emerald-400">03 / Sub-Second Speed</span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white">
                    Lighthouse 95+ Guarantee
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Optimized for sub-400ms global TTFB, near-instant LCP, and zero cumulative
                    layout shift. Performance is a fundamental feature, not an afterthought.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[11px] text-slate-500">
                  Sub-400ms TTFB • 0.00 CLS • Core Web Vitals
                </div>
              </div>

              <div className="luxury-card p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="size-10 rounded-lg bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-4">
                    <TrendingUp className="size-5" />
                  </div>
                  <span className="font-mono text-xs text-amber-400">04 / High Conversion</span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white">
                    Conversion Architecture
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Strategic narrative sequencing, tactile micro-interactions, and frictionless
                    form touchpoints engineered to multiply customer inquiries.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[11px] text-slate-500">
                  Inbound Funnels • CTA Sequencing • Analytics
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <span className="text-sm text-slate-300">
                Ready to elevate your flagship digital presence?
              </span>
              <Button
                asChild
                className="bg-cyan-500 text-black hover:bg-cyan-400 font-semibold text-xs"
              >
                <Link to="/contact">
                  <span>Commission a Website Project</span>
                  <ArrowRight className="ml-1.5 size-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CHAPTER 02: STRATEGIC SOCIAL MEDIA ADVISORY
        ========================================================================= */}
        <section
          id="social-advisory"
          data-cam="2"
          className="chapter-scrim px-5 py-24 lg:px-12 lg:py-36 border-t border-white/10"
        >
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-indigo-400 uppercase tracking-[0.25em]">
                    02 — Social Media Advisory
                  </span>
                  <span className="hairline-rule flex-1 max-w-xs" />
                </div>
                <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                  Inbound narrative strategy that turns attention into commercial power.
                </h2>
                <p className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed">
                  A high-performing website requires consistent, high-value inbound attention to
                  thrive. Our advisory partners with executive teams to clarify positioning, design
                  distinct visual storytelling frameworks, and command authority across key digital
                  channels.
                </p>

                <div className="mt-10 space-y-4">
                  <div className="p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md flex items-start gap-3">
                    <Sparkles className="size-4.5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white text-sm">
                        Executive Voice & Founder Positioning
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        We articulate your leadership perspective into compelling editorial essays,
                        breakdowns, and industry commentary that attract institutional trust.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md flex items-start gap-3">
                    <Share2 className="size-4.5 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white text-sm">
                        Channel Architecture & Content Pillars
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Tailored content frameworks designed for LinkedIn, X/Twitter, and Instagram
                        that reinforce your website narrative seamlessly.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md flex items-start gap-3">
                    <Compass className="size-4.5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white text-sm">
                        Conversion Alignment & Attribution
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Connecting social discovery directly to high-intent website landing pages
                        and inbound deal flow.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/20 hover:border-cyan-400"
                  >
                    <Link to="/contact">
                      <span>Schedule a Strategic Advisory Session</span>
                      <ArrowUpRight className="ml-1.5 size-3.5 text-cyan-400" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Studio Visual Monograph Plate */}
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/50 shadow-2xl group">
                <img
                  src={studioWorkspace}
                  alt="NovaCraft strategic creative direction lab"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-1">
                    Advisory Discipline
                  </span>
                  <h3 className="font-display text-2xl font-bold">
                    Strategic alignment between your narrative and digital flagship.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CHAPTER 03: WORLDWIDE SOCIAL MEDIA MANAGEMENT
        ========================================================================= */}
        <section
          id="social-management"
          data-cam="3"
          className="chapter-scrim px-5 py-24 lg:px-12 lg:py-36 border-t border-white/10"
        >
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col gap-3 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-[0.25em]">
                  03 — Worldwide Social Media Management
                </span>
                <span className="hairline-rule flex-1 max-w-xs" />
              </div>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                End-to-end execution across global time zones. Flawless daily rhythm.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
                Strategy without consistent, high-fidelity execution falls flat. We handle daily
                content creation, editorial motion design, copy crafting, community orchestration,
                and performance analytics worldwide.
              </p>
            </div>

            {/* Global Capabilities 3-Col Showcase */}
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              <div className="luxury-card p-8 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="size-10 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 mb-4">
                    <Globe2 className="size-5" />
                  </div>
                  <span className="font-mono text-xs text-cyan-400">Global Pulse</span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white">
                    24/7 Distributed Publishing
                  </h3>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                    Timed to coincide with peak attention windows across North American, European,
                    and Asia-Pacific financial markets and audience clusters.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/10 font-mono text-xs text-cyan-300">
                  ✦ Multi-region synchronization
                </div>
              </div>

              <div className="luxury-card p-8 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="size-10 rounded-lg bg-indigo-500/10 border border-indigo-400/30 flex items-center justify-center text-indigo-300 mb-4">
                    <Layers className="size-5" />
                  </div>
                  <span className="font-mono text-xs text-indigo-400">Creative Craft</span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white">
                    Editorial Motion & Visual Assets
                  </h3>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                    Custom motion graphics, multi-slide visual lookbooks, and high-impact
                    typographic cards that reflect luxury aesthetic standards.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/10 font-mono text-xs text-indigo-300">
                  ✦ 100% Bespoke creative assets
                </div>
              </div>

              <div className="luxury-card p-8 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="size-10 rounded-lg bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-300 mb-4">
                    <MessageSquareShare className="size-5" />
                  </div>
                  <span className="font-mono text-xs text-emerald-400">Executive Rhythm</span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white">
                    Weekly Growth & Intelligence
                  </h3>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                    Rigorous attribution tracking, weekly executive reporting syncs, and iterative
                    adjustments based on real commercial inquiries.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/10 font-mono text-xs text-emerald-300">
                  ✦ Direct Slack/dashboard access
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CHAPTER 04: SELECTED WORKS & COMMISSION ARCHIVE
        ========================================================================= */}
        <section
          id="showcase"
          data-cam="4"
          className="chapter-scrim px-5 py-24 lg:px-12 lg:py-36 border-t border-white/10"
        >
          <div className="mx-auto max-w-[1440px]">
            {/* Section Header with Category Filter */}
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-[0.25em]">
                    04 — Selected Commissions Archive
                  </span>
                  <span className="hairline-rule flex-1 max-w-xs" />
                </div>
                <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl text-white">
                  Recent website design commissions.
                </h2>
                <p className="mt-4 text-base text-slate-400 leading-relaxed">
                  Every project is bespoke — custom-designed from zero in Figma, engineered with
                  sub-second performance, and built to establish category leadership.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      data-cursor
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                        isActive
                          ? "bg-cyan-500 text-black font-semibold shadow-md shadow-cyan-500/25"
                          : "border border-white/10 bg-black/40 text-slate-400 hover:bg-white/5 hover:text-white hover:border-cyan-400/40"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`font-mono text-[10px] rounded-full px-1.5 py-0.5 ${
                          isActive
                            ? "bg-black/20 text-black font-bold"
                            : "bg-white/10 text-slate-400"
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cards Grid: Titanium Browser Canvas & Editorial Details */}
            <div className="mt-14 grid gap-8 lg:grid-cols-2">
              {filteredProjects.map((project) => (
                <article
                  key={project.title}
                  onClick={() => setActiveCaseStudy(project)}
                  data-cursor
                  className="luxury-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-black/60 p-6 sm:p-8 transition-all duration-500 hover:border-cyan-400/60 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer"
                >
                  <div>
                    {/* Dark Titanium Browser Viewport Bezel */}
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#070b12] shadow-xl">
                      {/* Browser Chrome Header */}
                      <div className="flex items-center justify-between border-b border-white/5 bg-[#0d131f] px-4 py-2.5">
                        {/* Window Controls */}
                        <div className="flex items-center gap-1.5">
                          <span className="size-2.5 rounded-full bg-white/20 transition-colors group-hover:bg-red-400/80" />
                          <span className="size-2.5 rounded-full bg-white/20 transition-colors group-hover:bg-amber-400/80" />
                          <span className="size-2.5 rounded-full bg-white/20 transition-colors group-hover:bg-emerald-400/80" />
                        </div>

                        {/* URL Capsule */}
                        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3.5 py-0.5 font-mono text-[11px] text-white/60">
                          <Lock className="size-2.5 text-emerald-400" />
                          <span>{project.domain}</span>
                        </div>

                        {/* Award / Recognition Badge */}
                        <div className="flex items-center gap-1">
                          <span className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                            ✦ {project.award}
                          </span>
                        </div>
                      </div>

                      {/* Viewport Image Area: Pure, Unobscured High-Res UI */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-black/50">
                        <img
                          src={getProjectImage(project.title)}
                          alt={`${project.title} website design mockup by NovaCraft`}
                          className="size-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />

                        {/* Hover Overlay with Inspect Pill */}
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40 flex items-center justify-center">
                          <div className="pointer-events-none translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/90 px-4 py-2 text-xs font-semibold text-white shadow-2xl backdrop-blur-md">
                              <Eye className="size-3.5 text-cyan-400" />
                              <span>Inspect Case Study & Metrics</span>
                              <ArrowUpRight className="size-3.5 text-cyan-300" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Editorial Content Below Artwork */}
                    <div className="mt-7">
                      {/* Metadata Ribbon */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          <span className="font-mono font-semibold uppercase tracking-wider text-cyan-300">
                            {project.category}
                          </span>
                        </div>
                        <span className="font-mono text-slate-400">
                          {project.timeline} • {project.year}
                        </span>
                      </div>

                      {/* Project Title and Tilt Arrow */}
                      <div className="mt-4 flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white transition-colors group-hover:text-cyan-300">
                            {project.title}
                          </h3>
                          <p className="mt-1 font-mono text-xs font-medium text-slate-400">
                            {project.role}
                          </p>
                        </div>

                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-400 transition-all duration-300 group-hover:border-cyan-400 group-hover:bg-cyan-500/15 group-hover:text-cyan-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                          <ArrowUpRight className="size-4" />
                        </div>
                      </div>

                      {/* Narrative Summary */}
                      <p className="mt-3 text-sm leading-relaxed text-slate-400">
                        {project.summary}
                      </p>

                      {/* Verified Commercial Impact Banner */}
                      <div className="mt-5 flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-xs">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="size-4 text-emerald-400 shrink-0" />
                          <span className="font-mono text-slate-300">Verified Outcome:</span>
                        </div>
                        <span className="font-mono font-bold text-emerald-400">{project.stat}</span>
                      </div>

                      {/* Deliverable Craft Tags */}
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-3 border-t border-white/10 pt-5">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCaseStudy(project);
                      }}
                      className="flex-1 border-white/15 hover:border-cyan-400 text-xs text-slate-300"
                    >
                      <Info className="mr-1.5 size-3.5 text-cyan-400" />
                      <span>View Case Study Specs</span>
                    </Button>

                    <Button
                      asChild
                      size="sm"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 text-xs font-semibold bg-cyan-500 text-black hover:bg-cyan-400"
                    >
                      <Link to="/contact" search={{ project: project.title }}>
                        <span>Inquire for {project.client} Scope</span>
                        <ArrowRight className="ml-1.5 size-3.5" />
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            CHAPTER 05: SERVICES, WORKING PROCESS & PROJECT INITIATION
        ========================================================================= */}
        <section
          id="services-plans"
          data-cam="5"
          className="chapter-scrim px-5 py-24 lg:px-12 lg:py-36 border-t border-white/10"
        >
          <div className="mx-auto max-w-[1440px]">
            {/* Section Header */}
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-[0.25em]">
                  05 — Investment Plans & Project Blueprint
                </span>
                <span className="hairline-rule flex-1 max-w-xs" />
              </div>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl text-white">
                Predictable excellence. Transparent engagement tiers.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
                Choose the scope that matches your stage. Every partnership includes partner-level
                attention, unlimited design iterations before code, and guaranteed speed.
              </p>
            </div>

            {/* 3-Card Engagement Plans Grid */}
            <div className="mt-14 grid gap-8 lg:grid-cols-3">
              {engagementPlans.map((plan, idx) => {
                const isSelected = selectedPlanIdx === idx;
                return (
                  <div
                    key={plan.tier}
                    onClick={() => setSelectedPlanIdx(idx)}
                    data-cursor
                    className={`luxury-card relative flex flex-col justify-between p-8 rounded-3xl cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "border-2 border-cyan-400 bg-black/80 electric-glow shadow-[0_0_45px_-5px_rgba(56,189,248,0.35)] -translate-y-2 ring-1 ring-cyan-400"
                        : "border border-white/10 bg-black/50 hover:border-cyan-400/60 hover:-translate-y-2"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3.5 right-6 rounded-full bg-cyan-400 text-black px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider shadow-md">
                        ✦ {plan.highlight}
                      </span>
                    )}

                    <div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <span className="font-mono text-xs font-semibold text-cyan-300">
                          {isSelected ? "Selected Plan" : "Engagement Model"}
                        </span>
                        <span className="font-mono text-xs text-slate-400">{plan.timeline}</span>
                      </div>

                      <div className="mt-6">
                        <h3 className="font-display text-3xl font-bold text-white">{plan.tier}</h3>
                        <p className="mt-1 font-mono text-xs text-cyan-400">{plan.tagline}</p>
                        <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
                          {plan.description}
                        </p>
                      </div>

                      <div className="mt-8 space-y-3 border-t border-white/10 pt-6 text-sm">
                        <span className="font-mono text-xs uppercase tracking-wider text-slate-300 block mb-2">
                          Scope Deliverables:
                        </span>
                        {plan.features.map((feat) => (
                          <div key={feat} className="flex items-start gap-2.5">
                            <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm text-slate-300">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-white/10">
                      <Button
                        asChild
                        className={`w-full h-12 text-sm font-semibold ${
                          isSelected
                            ? "bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/20"
                            : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
                        }`}
                      >
                        <Link to="/contact" search={{ plan: plan.tier }}>
                          <span>Request Proposal for {plan.tier}</span>
                          <ArrowRight className="ml-2 size-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 5-Step Disciplined Process Roadmap */}
            <div className="mt-20 pt-16 border-t border-white/10">
              <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
                <div>
                  <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest">
                    Process Roadmap
                  </span>
                  <h3 className="mt-3 font-display text-3xl sm:text-4xl text-white">
                    Five disciplined phases.
                  </h3>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                    Clear checkpoints and recorded progress reviews at every stage of the
                    engagement.
                  </p>
                </div>

                <div className="divide-y divide-white/10 border-y border-white/10">
                  {processSteps.map(([num, title, desc, del]) => (
                    <article
                      key={num}
                      className="py-6 grid sm:grid-cols-[3.5rem_1fr_1.5fr] gap-4 items-start"
                    >
                      <span className="font-mono text-sm font-bold text-cyan-400">{num}</span>
                      <div>
                        <h4 className="font-semibold text-white text-base">{title}</h4>
                        <span className="mt-1 inline-block text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-400/20">
                          {del}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{desc}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="mt-20 pt-16 border-t border-white/10">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest">
                  Leader Endorsements
                </span>
                <h3 className="mt-3 font-display text-3xl sm:text-4xl text-white">
                  Validated by founders worldwide.
                </h3>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {testimonials.map(([quote, author, title, industry]) => (
                  <div
                    key={author}
                    className="luxury-card p-6 rounded-2xl flex flex-col justify-between"
                  >
                    <p className="text-sm text-slate-300 italic leading-relaxed">"{quote}"</p>
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <h4 className="font-semibold text-white text-sm">{author}</h4>
                      <p className="text-xs text-slate-400">{title}</p>
                      <span className="mt-2 inline-block text-[10px] font-mono text-cyan-400">
                        {industry}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="mt-20 pt-16 border-t border-white/10 max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest">
                  Frequently Asked Questions
                </span>
                <h3 className="mt-3 font-display text-3xl sm:text-4xl text-white">
                  Everything you need to know.
                </h3>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={faq.q} value={`faq-${i}`} className="border-white/10">
                    <AccordionTrigger className="text-left font-display text-xl text-white hover:text-cyan-300">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-slate-400 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Global Closing Quote Band */}
        <QuoteBand />
      </div>

      {/* =========================================================================
          CASE STUDY SPECIFICATIONS MODAL DIALOG
      ========================================================================= */}
      <Dialog
        open={activeCaseStudy !== null}
        onOpenChange={(open) => !open && setActiveCaseStudy(null)}
      >
        {activeCaseStudy && (
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-[#070b12] border-white/15 p-6 sm:p-8 text-white shadow-2xl">
            <DialogHeader>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                <Sparkles className="size-3.5" />
                <span>Executive Case Study Deep Dive</span>
              </div>
              <DialogTitle className="font-display text-3xl sm:text-4xl mt-1 text-white">
                {activeCaseStudy.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-400">
                {activeCaseStudy.role} • Client:{" "}
                <strong className="text-white">{activeCaseStudy.client}</strong> (
                {activeCaseStudy.year})
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-6 text-sm">
              {/* Full-bleed Screenshot Preview in Browser Mockup */}
              <div className="overflow-hidden rounded-xl border border-white/15 bg-[#03060a] shadow-lg">
                <div className="flex items-center justify-between border-b border-white/5 bg-[#0b101a] px-4 py-2 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-red-400" />
                    <span className="size-2 rounded-full bg-amber-400" />
                    <span className="size-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Lock className="size-3 text-emerald-400" />
                    <span>{activeCaseStudy.domain}</span>
                  </div>
                  <span className="text-cyan-300 text-[11px] font-bold">
                    {activeCaseStudy.award}
                  </span>
                </div>
                <div className="aspect-[16/9] overflow-hidden bg-black/40">
                  <img
                    src={getProjectImage(activeCaseStudy.title)}
                    alt={activeCaseStudy.title}
                    className="size-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Challenge & Solution Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-semibold block">
                    The Commercial Challenge:
                  </span>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {activeCaseStudy.challenge}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-indigo-400 font-semibold block">
                    NovaCraft's Craft Solution:
                  </span>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {activeCaseStudy.solution}
                  </p>
                </div>
              </div>

              {/* Verified Metrics 3-Col Bar */}
              <div>
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                  <TrendingUp className="size-4 text-emerald-400" />
                  <span>Verified 90-Day Performance & Commercial Metrics:</span>
                </h4>
                <div className="grid gap-3 sm:grid-cols-3">
                  {activeCaseStudy.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3.5 text-center"
                    >
                      <span className="font-display text-2xl font-bold text-emerald-400 block">
                        {m.value}
                      </span>
                      <span className="mt-1 font-mono text-[11px] text-slate-400 block">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack & Disciplines */}
              <div>
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-white mb-2">
                  Disciplines & Engineering Stack:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeCaseStudy.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setActiveCaseStudy(null)}
                  className="border-white/20 text-slate-300"
                >
                  Close Case Study
                </Button>
                <Button asChild className="bg-cyan-500 text-black hover:bg-cyan-400 font-semibold">
                  <Link
                    to="/contact"
                    search={{ project: activeCaseStudy.title }}
                    onClick={() => setActiveCaseStudy(null)}
                  >
                    <span>Request Proposal for {activeCaseStudy.client} Scope</span>
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
