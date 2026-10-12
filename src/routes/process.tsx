import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Layers,
  Rocket,
  Sparkles,
  Terminal,
} from "lucide-react";

import { PageIntro } from "@/components/page-intro";
import { QuoteBand } from "@/components/quote-band";
import { Button } from "@/components/ui/button";
import { processSteps } from "@/lib/site-config";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Our Process — NovaCraft Design Studio" },
      {
        name: "description",
        content:
          "Discover NovaCraft's transparent, 5-phase website design process from discovery and wireframing to high-performance launch.",
      },
      { property: "og:title", content: "Our Process — NovaCraft" },
      {
        property: "og:description",
        content: "A structured, disciplined path from idea to high-converting digital presence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProcessPage,
});

const phaseDetails = [
  {
    phase: "01",
    name: "Discovery & Blueprint",
    icon: Sparkles,
    duration: "Week 1",
    whatWeDo: [
      "Deep dive into your business model, positioning, and conversion goals",
      "Analysis of competitive landscape and user journey obstacles",
      "Information architecture mapping and sitemap definition",
      "Creation of the project requirements document (PRD)",
    ],
  },
  {
    phase: "02",
    name: "Wireframing & UX Architecture",
    icon: Layers,
    duration: "Week 1 – 2",
    whatWeDo: [
      "Clickable low-fidelity wireframes in Figma to validate content flow",
      "Strategic layout of call-to-actions, testimonials, and trust marks",
      "Copywriting structure and messaging hierarchy review",
      "Collaborative feedback review call to align before styling",
    ],
  },
  {
    phase: "03",
    name: "Bespoke Visual Design",
    icon: FileText,
    duration: "Week 2 – 3",
    whatWeDo: [
      "Art direction, typographic scale, and tailored color palette",
      "High-fidelity UI components and responsive layout mockups",
      "Interactive micro-interactions, hover states, and motion specs",
      "Full design approval milestone before code development begins",
    ],
  },
  {
    phase: "04",
    name: "Production Web Engineering",
    icon: Terminal,
    duration: "Week 3 – 5",
    whatWeDo: [
      "Pixel-perfect translation of designs into React / Vite / Tailwind code",
      "Full mobile responsiveness testing across iOS, Android, and tablets",
      "Sub-second speed optimization and Core Web Vitals audit",
      "SEO semantic tags, OpenGraph sharing cards, and analytics setup",
    ],
  },
  {
    phase: "05",
    name: "Quality Assurance & Launch",
    icon: Rocket,
    duration: "Week 5 – 6",
    whatWeDo: [
      "Cross-browser compatibility testing (Chrome, Safari, Firefox, Edge)",
      "DNS cutover, SSL configuration, and live domain deployment",
      "Client walkthrough video & CMS editing training",
      "30-day post-launch warranty and performance monitoring",
    ],
  },
];

function ProcessPage() {
  return (
    <>
      <PageIntro
        eyebrow="Proven Methodology"
        title="A disciplined path from blank canvas to category leader."
      >
        <p>
          We do not leave outcomes to chance. Every project follows a disciplined sequence designed
          to keep priorities transparent, deadlines firm, and quality uncompromising.
        </p>
      </PageIntro>

      {/* Main Roadmap */}
      <section className="px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="space-y-12">
            {phaseDetails.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.phase} className="luxury-card rounded-2xl p-8 sm:p-12">
                  <div className="grid gap-8 lg:grid-cols-[10rem_1.4fr_1.6fr] items-start">
                    {/* Phase Number & Timeline */}
                    <div className="flex flex-col">
                      <span className="font-mono text-3xl font-bold text-accent sm:text-4xl">
                        {step.phase}
                      </span>
                      <span className="mt-2 inline-block rounded bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground w-fit">
                        {step.duration}
                      </span>
                    </div>

                    {/* Phase Title & Summary */}
                    <div>
                      <div className="flex items-center gap-2.5 text-primary">
                        <Icon className="size-5" />
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                          Phase 0{idx + 1}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl">
                        {step.name}
                      </h3>
                      <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                        {processSteps[idx] ? processSteps[idx][2] : ""}
                      </p>
                    </div>

                    {/* What Happens / Checklist */}
                    <div className="rounded-xl border border-border/70 bg-muted/30 p-6">
                      <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                        Key Activities & Checkpoints:
                      </h4>
                      <div className="mt-4 space-y-3 text-sm">
                        {step.whatWeDo.map((item) => (
                          <div key={item} className="flex items-start gap-2.5">
                            <CheckCircle2 className="size-4.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-foreground/90 leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <Button asChild size="lg">
              <Link to="/contact">
                <span>Kick Off Your Project Today</span>
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <QuoteBand />
    </>
  );
}
