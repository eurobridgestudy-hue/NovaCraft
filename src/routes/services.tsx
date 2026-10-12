import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  Info,
  Layers,
  MonitorCheck,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";

import { PageIntro } from "@/components/page-intro";
import { QuoteBand } from "@/components/quote-band";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { services } from "@/lib/site-config";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Plans — NovaCraft Design Studio" },
      {
        name: "description",
        content:
          "Explore NovaCraft's tailored website design plans, bespoke development, brand identity systems, and digital strategy packages.",
      },
      { property: "og:title", content: "Services & Plans — NovaCraft" },
      {
        property: "og:description",
        content:
          "Tailored website design plans and digital brand architecture for forward-thinking businesses.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

const engagementTiers = [
  {
    id: "launchpad",
    tier: "Launchpad Plan",
    tagline: "Bespoke Starter Flagship",
    highlight: "Fast-to-Market",
    popular: false,
    investment: "Fixed Milestone Scope",
    target:
      "Early-stage startups, product launches & boutique consultancies needing immediate commercial credibility",
    timeline: "2 – 3 Weeks",
    features: [
      "Bespoke 3–5 page marketing website",
      "Custom responsive Figma UI/UX design from scratch",
      "Ultra-fast React 19 / Vite engineering (95+ Lighthouse)",
      "Core Web Vitals & on-page technical SEO setup",
      "Contact form with instant lead routing & validation",
      "Mobile-first validation across iOS, Android & tablet",
      "14-day post-launch warranty & handover video",
    ],
    detailedDeliverables: [
      "Complete Figma source files & typography tokens",
      "Handcrafted responsive UI (Desktop, Tablet, Mobile)",
      "Semantic HTML5, OpenGraph social sharing meta tags",
      "Favicon suite & web manifest configuration",
      "Production deployment to custom domain & SSL",
      "Zero-builder pure TypeScript code architecture",
    ],
    milestones: [
      {
        week: "Week 1",
        title: "Strategy Brief & Wireframes",
        desc: "Information flow, messaging hierarchy, and low-fidelity click-through approval.",
      },
      {
        week: "Week 2",
        title: "High-Fidelity Visual Design",
        desc: "Bespoke art direction, component creation, and typography in Figma.",
      },
      {
        week: "Week 3",
        title: "Production Code & Launch",
        desc: "React/Vite development, cross-device testing, SEO validation, and live deployment.",
      },
    ],
    guarantees: [
      "Sub-second page load times on standard mobile networks",
      "Unlimited revisions during the visual Figma design phase",
      "14-day post-launch technical warranty with zero bug-fix fees",
    ],
  },
  {
    id: "growth-studio",
    tier: "Growth Studio Plan",
    tagline: "Full Brand & Digital Hub",
    highlight: "Most Popular Choice",
    popular: true,
    investment: "Comprehensive Digital Sprint",
    target:
      "Growing businesses, funded scaleups & DTC brands looking to multiply conversions and outpace competitors",
    timeline: "4 – 5 Weeks",
    features: [
      "Bespoke 8–12 page digital flagship & marketing hub",
      "Complete Brand Styleguide & typography design tokens",
      "Interactive micro-animations & storytelling scrollytelling",
      "Headless CMS integration for effortless blogging & case studies",
      "Advanced conversion rate optimization (CRO) architecture",
      "Google Tag Manager & analytics event tracking setup",
      "30-day post-launch optimization warranty & dedicated Slack",
    ],
    detailedDeliverables: [
      "Comprehensive multi-page custom design system in Figma",
      "Brand Identity Kit (Logomark usage, color tokens, type rules)",
      "Tailored micro-interactions and smooth page transitions",
      "Headless CMS or Database integration with editing permissions",
      "Automated XML sitemap, schema markup & Core Web Vitals audit",
      "Dedicated client Slack channel for real-time sync with senior lead",
    ],
    milestones: [
      {
        week: "Week 1",
        title: "Commercial Positioning & Architecture",
        desc: "Customer psychology review, competitor audit, and sitemap structuring.",
      },
      {
        week: "Week 2",
        title: "Brand Identity & Visual System",
        desc: "Color theory, type scale, and core page visual design in Figma.",
      },
      {
        week: "Week 3",
        title: "Secondary Pages & Motion Specs",
        desc: "Interactive states, hover animations, and CMS schema modeling.",
      },
      {
        week: "Week 4",
        title: "Production Frontend & CMS Hookup",
        desc: "Next-gen React engineering, headless CMS connection, and data pipelines.",
      },
      {
        week: "Week 5",
        title: "Staging Review & Worldwide Launch",
        desc: "Cross-browser QA, Core Web Vitals certification, DNS cutover, and team training.",
      },
    ],
    guarantees: [
      "95+ Google PageSpeed Insights performance guarantee",
      "Headless CMS custom tailored to non-technical team members",
      "30-day post-launch warranty with dedicated Slack support",
    ],
  },
  {
    id: "bespoke-enterprise",
    tier: "Bespoke Enterprise Plan",
    tagline: "Custom Platform Architecture",
    highlight: "Maximum Custom Scale",
    popular: false,
    investment: "Enterprise Architecture & Scale",
    target:
      "Established brands, institutions & high-growth scaleups requiring complex web apps or custom database infrastructure",
    timeline: "6 – 8 Weeks",
    features: [
      "Scalable multi-page digital platform & bespoke component system",
      "Complete multi-theme design system & enterprise component kit",
      "Complex interactive calculators, custom demos & data visualizers",
      "Supabase / PostgreSQL database & authenticated portal options",
      "Multi-region edge CDN caching for sub-400ms global TTFB",
      "Dedicated senior designer & full-stack lead engineer",
      "60-day post-launch priority SLA & ongoing creative advisory",
    ],
    detailedDeliverables: [
      "Modular, reusable enterprise design system with documentation",
      "Interactive data visualizations, dashboards, or complex client tools",
      "Database schema modeling, row-level security & server functions",
      "Enterprise caching, asset CDN pipeline, and sub-400ms server response",
      "Accessibility audit (WCAG AA compliant contrast & screen-readers)",
      "Priority SLA agreement and weekly executive steering sync",
    ],
    milestones: [
      {
        week: "Week 1–2",
        title: "System Blueprint & Discovery",
        desc: "Deep technical PRD, database schema mapping, and UX flow architecture.",
      },
      {
        week: "Week 3–4",
        title: "Design System & High-Fi Prototyping",
        desc: "Interactive component library, state machines, and prototype signoff.",
      },
      {
        week: "Week 5–6",
        title: "Full-Stack Development & DB Hooks",
        desc: "React/TypeScript frontend, edge server functions, and database logic.",
      },
      {
        week: "Week 7",
        title: "Security & Load Stress Testing",
        desc: "Penetration sanity checks, mobile responsiveness & accessibility QA.",
      },
      {
        week: "Week 8",
        title: "Live Migration & Executive Handover",
        desc: "Zero-downtime DNS migration, recorded team training, and SLA kickoff.",
      },
    ],
    guarantees: [
      "Enterprise-grade security and zero third-party plugin vulnerability",
      "Guaranteed WCAG AA accessibility compliance",
      "60-day post-launch warranty and priority emergency SLA",
    ],
  },
];

const matrixComparison = [
  {
    feature: "Bespoke Pages Included",
    launchpad: "3 – 5 Pages",
    growth: "8 – 12 Pages",
    enterprise: "15+ Pages / Custom App",
  },
  {
    feature: "Figma Design System",
    launchpad: "Core Styleguide",
    growth: "Full Component System",
    enterprise: "Enterprise Token Library",
  },
  {
    feature: "Brand Identity Direction",
    launchpad: "Typography & Palette",
    growth: "Complete Brand Kit",
    enterprise: "Multi-touchpoint System",
  },
  {
    feature: "Headless CMS Integration",
    launchpad: "Optional Add-on",
    growth: "Included",
    enterprise: "Advanced Custom CMS",
  },
  {
    feature: "Micro-animations & Motion",
    launchpad: "Standard UI Motion",
    growth: "Bespoke Narrative Motion",
    enterprise: "Complex Interactive Visuals",
  },
  {
    feature: "Lighthouse Performance Guarantee",
    launchpad: "95+ Score",
    growth: "95+ Score",
    enterprise: "Sub-400ms Global TTFB",
  },
  {
    feature: "Technical SEO & Schema",
    launchpad: "On-page Essentials",
    growth: "Advanced Schema & Sitemaps",
    enterprise: "Enterprise Multi-Region SEO",
  },
  {
    feature: "Delivery Turnaround",
    launchpad: "2 – 3 Weeks",
    growth: "4 – 5 Weeks",
    enterprise: "6 – 8 Weeks",
  },
  {
    feature: "Post-Launch Warranty",
    launchpad: "14 Days",
    growth: "30 Days + Slack Sync",
    enterprise: "60 Days + Priority SLA",
  },
];

function ServicesPage() {
  const [selectedPlanIdx, setSelectedPlanIdx] = useState<number>(1); // Default to Growth Studio
  const [inspectPlan, setInspectPlan] = useState<(typeof engagementTiers)[number] | null>(null);
  const [showMatrix, setShowMatrix] = useState<boolean>(false);

  return (
    <>
      <PageIntro
        eyebrow="Capabilities & Solutions"
        title="Bespoke website design and digital craft, engineered for growth."
      >
        <p>
          We do not believe in one-size-fits-all themes. Every engagement is tailored to your
          commercial objectives, customer psychology, and aesthetic ambition.
        </p>
      </PageIntro>

      {/* Deep-Dive Services Breakdown */}
      <section className="px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="border-b border-border pb-8">
            <p className="eyebrow text-primary">Core Practice Areas</p>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl">What we build for you</h2>
          </div>

          <div className="mt-12 divide-y divide-border border-b border-border">
            {services.map((s) => (
              <article
                key={s.id}
                className="grid gap-8 py-12 lg:grid-cols-[6rem_1.4fr_1.6fr] lg:py-16 items-start"
              >
                <span className="font-mono text-base font-bold text-accent">{s.number}</span>

                <div>
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl">{s.title}</h3>
                  <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">
                    {s.summary}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-md bg-muted px-3 py-1 font-mono text-xs text-primary">
                    <Clock className="size-3.5" />
                    <span>Typical turnaround: {s.timeline}</span>
                  </div>
                </div>

                <div className="luxury-card flex flex-col justify-between gap-8 rounded-2xl p-6 sm:p-8">
                  <p className="text-base leading-relaxed text-muted-foreground">{s.detail}</p>

                  <div>
                    <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                      Included Deliverables:
                    </h4>
                    <div className="mt-4 grid gap-2.5 sm:grid-cols-2 text-sm">
                      {s.deliverables.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-foreground/80">
                          <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Button asChild variant="outline">
                      <Link to="/contact">
                        <span>Request a quote for {s.title}</span>
                        <ArrowRight className="ml-2 size-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE PLANS SECTION: Clickable, Animated & Detailed Info
      ========================================================================= */}
      <section className="border-t border-border bg-card/40 px-5 py-20 lg:px-10 lg:py-32 relative overflow-hidden">
        {/* Ambient Dark Atmospheric Lights */}
        <div className="pointer-events-none absolute -top-32 left-1/3 size-96 rounded-full bg-primary/15 blur-[130px] animate-pulse-glow" />
        <div
          className="pointer-events-none absolute bottom-0 right-10 size-80 rounded-full bg-accent/15 blur-[120px] animate-pulse-glow"
          style={{ animationDelay: "2.5s" }}
        />

        <div className="relative mx-auto max-w-[1440px]">
          {/* Section Header with Comparison Matrix Action */}
          <div className="flex flex-col justify-between gap-6 pb-12 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <div className="animate-border-glow inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                <Sparkles className="size-3 text-accent" />
                <span>Investment Plans & Packages Offered By Us</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground">
                Website Design Plans Offered By NovaCraft
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Choose the plan that fits your growth stage. Every plan includes fixed milestone
                pricing, unlimited visual revisions during design, and sub-second performance.
                <strong className="text-foreground block sm:inline sm:ml-1">
                  Click any card to select it, or tap "Inspect Details" to view complete
                  specifications.
                </strong>
              </p>
            </div>

            {/* Side-by-Side Matrix Button */}
            <div className="shrink-0">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowMatrix(true)}
                className="h-12 border-border/80 hover:border-primary/60 transition-all hover:bg-card shadow-sm flex items-center gap-2"
              >
                <Layers className="size-4 text-primary" />
                <span>Compare All 3 Plans Matrix</span>
              </Button>
            </div>
          </div>

          {/* Interactive Clickable 3-Card Grid with Rich Animations */}
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {engagementTiers.map((tier, idx) => {
              const isSelected = selectedPlanIdx === idx;
              return (
                <div
                  key={tier.tier}
                  onClick={() => setSelectedPlanIdx(idx)}
                  className={`group relative flex flex-col justify-between rounded-2xl p-8 cursor-pointer transition-all duration-300 ease-out ${
                    isSelected
                      ? "border-2 border-primary bg-card/95 electric-glow shadow-[0_0_50px_-5px_rgba(99,102,241,0.35)] -translate-y-2 ring-1 ring-primary"
                      : "luxury-card hover:-translate-y-3 hover:scale-[1.015] hover:border-primary/80 hover:shadow-2xl hover:shadow-primary/20"
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedPlanIdx(idx);
                    }
                  }}
                  aria-pressed={isSelected}
                >
                  {/* Popular Tag or Highlight Badge */}
                  {tier.popular ? (
                    <span className="absolute -top-3.5 right-6 rounded-full bg-accent px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-foreground shadow-md animate-pulse">
                      ✦ {tier.highlight}
                    </span>
                  ) : (
                    <span className="absolute -top-3 right-6 rounded-full border border-border/80 bg-muted/80 px-3 py-0.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      {tier.highlight}
                    </span>
                  )}

                  <div>
                    {/* Active Plan Selector Pill */}
                    <div className="flex items-center justify-between border-b border-border/70 pb-4">
                      {isSelected ? (
                        <div className="flex items-center gap-1.5 rounded-full bg-primary/20 border border-primary/40 px-3 py-1 text-xs font-semibold text-primary">
                          <CheckCircle2 className="size-3.5 text-emerald-400" />
                          <span>Selected Plan</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                          <span className="size-2 rounded-full border border-muted-foreground group-hover:border-primary" />
                          <span>Click to Select</span>
                        </div>
                      )}

                      <span className="font-mono text-xs text-accent font-semibold">
                        {tier.timeline}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div className="mt-6">
                      <h3 className="font-display text-3xl sm:text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {tier.tier}
                      </h3>
                      <p className="mt-1 font-mono text-xs text-primary font-medium">
                        {tier.tagline}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {tier.target}
                      </p>
                    </div>

                    {/* Features List with Interactive Checkmark Hover Animation */}
                    <div className="mt-8 space-y-3 border-t border-border/70 pt-6 text-sm">
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground block">
                        Included In This Plan:
                      </span>
                      {tier.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2.5">
                          <CheckCircle2 className="size-4.5 text-primary shrink-0 mt-0.5 transition-transform group-hover:scale-110 group-hover:text-emerald-400" />
                          <span className="text-foreground/90 text-xs sm:text-sm leading-snug">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions: Inspect Specs Modal & Primary Request CTA */}
                  <div className="mt-10 space-y-3 border-t border-border/80 pt-6">
                    {/* View Full Specs Trigger Button */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectPlan(tier);
                      }}
                      className="w-full text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-border/50"
                    >
                      <Info className="mr-1.5 size-3.5 text-accent" />
                      <span>Inspect Plan Specs & Milestones</span>
                    </Button>

                    {/* Choose Plan CTA linking to /contact with pre-filled plan */}
                    <Button
                      asChild
                      className="w-full h-12 text-sm font-semibold shadow-md"
                      variant={isSelected ? "default" : "outline"}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link to="/contact" search={{ plan: tier.tier }}>
                        <span>Select {tier.tier} & Request Quote</span>
                        <ArrowRight className="ml-2 size-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Support Banner below Plans */}
          <div className="mt-14 rounded-2xl border border-border/80 bg-muted/30 p-6 sm:p-8 flex flex-col items-center justify-between gap-6 sm:flex-row text-sm">
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <Compass className="size-6 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Need a custom enterprise scope?</h4>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  We also craft bespoke consulting agreements, migration blueprints, and dedicated
                  retainers.
                </p>
              </div>
            </div>

            <Button asChild variant="outline" size="sm" className="shrink-0">
              <Link to="/contact" search={{ plan: "Bespoke Enterprise" }}>
                <span>Book a 30-min Strategy Call</span>
                <ArrowUpRight className="ml-1.5 size-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MODAL 1: In-Depth Plan Specifications Dialog
      ========================================================================= */}
      <Dialog open={inspectPlan !== null} onOpenChange={(open) => !open && setInspectPlan(null)}>
        {inspectPlan && (
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border p-6 sm:p-8 text-foreground shadow-2xl">
            <DialogHeader>
              <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider">
                <Sparkles className="size-3.5" />
                <span>Detailed Plan Specifications</span>
              </div>
              <DialogTitle className="font-display text-3xl sm:text-4xl mt-1">
                {inspectPlan.tier}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {inspectPlan.tagline} • Turnaround:{" "}
                <strong className="text-foreground">{inspectPlan.timeline}</strong>
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-6 text-sm">
              {/* Target Audience */}
              <div className="rounded-xl border border-border/70 bg-muted/40 p-4">
                <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold block">
                  Best Suited For:
                </span>
                <p className="mt-1 text-sm text-foreground/90">{inspectPlan.target}</p>
              </div>

              {/* Exact Technical Deliverables */}
              <div>
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
                  <FileText className="size-4 text-primary" />
                  <span>Technical Deliverables Handed to You:</span>
                </h4>
                <div className="grid gap-2 sm:grid-cols-2 text-xs sm:text-sm">
                  {inspectPlan.detailedDeliverables.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-foreground/80">
                      <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Milestones */}
              <div>
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
                  <Calendar className="size-4 text-primary" />
                  <span>Week-by-Week Project Milestones:</span>
                </h4>
                <div className="space-y-3 border-y border-border/80 py-4">
                  {inspectPlan.milestones.map((ms) => (
                    <div key={ms.week} className="flex items-start gap-3">
                      <span className="font-mono text-xs font-bold text-accent px-2 py-0.5 rounded bg-muted">
                        {ms.week}
                      </span>
                      <div>
                        <span className="font-semibold text-foreground text-sm">{ms.title}</span>
                        <p className="text-xs text-muted-foreground mt-0.5">{ms.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantees */}
              <div>
                <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground mb-2 flex items-center gap-2">
                  <ShieldCheck className="size-4 text-emerald-400" />
                  <span>Guarantees & Standards:</span>
                </h4>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  {inspectPlan.guarantees.map((g) => (
                    <div key={g} className="flex items-center gap-2">
                      <span className="text-accent">✦</span>
                      <span>{g}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button inside modal */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row gap-3 justify-end">
                <Button variant="outline" onClick={() => setInspectPlan(null)}>
                  Close Specs
                </Button>
                <Button asChild size="default">
                  <Link
                    to="/contact"
                    search={{ plan: inspectPlan.tier }}
                    onClick={() => setInspectPlan(null)}
                  >
                    <span>Proceed with {inspectPlan.tier}</span>
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* =========================================================================
          MODAL 2: Side-by-Side Comparison Matrix Dialog
      ========================================================================= */}
      <Dialog open={showMatrix} onOpenChange={setShowMatrix}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-card border-border p-6 sm:p-8 text-foreground shadow-2xl">
          <DialogHeader>
            <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider">
              <Layers className="size-3.5" />
              <span>Side-by-Side Evaluation</span>
            </div>
            <DialogTitle className="font-display text-3xl sm:text-4xl mt-1">
              Compare All Three Website Design Plans
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Review deliverables, technical scopes, and post-launch support at a glance.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/60 text-foreground font-semibold">
                  <th className="py-3 px-3">Deliverable Scope</th>
                  <th className="py-3 px-3 text-muted-foreground">Launchpad</th>
                  <th className="py-3 px-3 text-primary font-bold">Growth Studio (★)</th>
                  <th className="py-3 px-3 text-accent font-semibold">Bespoke Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/70">
                {matrixComparison.map((row) => (
                  <tr key={row.feature} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-3 font-medium text-foreground">{row.feature}</td>
                    <td className="py-3 px-3 text-muted-foreground">{row.launchpad}</td>
                    <td className="py-3 px-3 text-foreground font-semibold">{row.growth}</td>
                    <td className="py-3 px-3 text-muted-foreground">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 pt-4 border-t border-border flex justify-end">
            <Button asChild>
              <Link to="/contact" onClick={() => setShowMatrix(false)}>
                <span>Start Your Quote Now</span>
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <QuoteBand />
    </>
  );
}
