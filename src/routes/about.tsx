import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Code2,
  Compass,
  Cpu,
  Globe2,
  HeartHandshake,
  Layers,
  Palette,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import editorialImage from "@/assets/novacraft-editorial.jpg";
import studioWorkspace from "@/assets/studio-workspace.jpg";
import { PageIntro } from "@/components/page-intro";
import { QuoteBand } from "@/components/quote-band";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Studio — NovaCraft Design" },
      {
        name: "description",
        content:
          "Learn about NovaCraft, our design philosophy, craftsmanship standards, and why we build custom websites for ambitious clients worldwide.",
      },
      { property: "og:title", content: "About Studio — NovaCraft" },
      {
        property: "og:description",
        content: "A practical creative partner for bespoke websites and digital brand systems.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: Compass,
    title: "Clarity Over Clutter",
    description:
      "We believe high-converting websites communicate with profound clarity. We ruthlessly edit excess copy and visual distraction to let your core value proposition shine.",
  },
  {
    icon: Zap,
    title: "Sub-Second Performance",
    description:
      "Every millisecond of load delay costs conversions. We build with modern zero-bloat codebases that load instantly on all connections and mobile devices.",
  },
  {
    icon: Palette,
    title: "Uncompromising Aesthetics",
    description:
      "We design bespoke design systems in Figma from scratch. Your digital presence will look like a category leader, never a repurposed cookie-cutter template.",
  },
  {
    icon: HeartHandshake,
    title: "Radical Transparency",
    description:
      "No hidden fees, no opaque agency markups, and no juniors learning on your dime. You work directly with senior designers and engineers.",
  },
];

const techStack = [
  { name: "Figma", role: "UI/UX & Design Systems" },
  { name: "React 19 & Vite", role: "Next-gen Frontend Speed" },
  { name: "TypeScript", role: "Type-Safe Robust Engineering" },
  { name: "Tailwind CSS v4", role: "Design Token Architecture" },
  { name: "TanStack Router", role: "Fluid Navigation & SSR" },
  { name: "Supabase & Cloud", role: "Scalable Data & Edge Storage" },
];

function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About NovaCraft"
        title="We build digital flagships for businesses destined to lead."
      >
        <p>
          Founded on the conviction that high-performance web engineering and award-winning design
          belong together under one roof.
        </p>
      </PageIntro>

      {/* Main Philosophy Section */}
      <section className="px-5 py-16 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-2 lg:items-center">
          <div className="group relative overflow-hidden rounded-2xl border border-border/80 shadow-2xl">
            <img
              src={studioWorkspace}
              alt="NovaCraft creative design hub and digital laboratory"
              width={1600}
              height={1000}
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="absolute top-6 left-6 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3.5 py-1 text-xs text-white backdrop-blur-md animate-float">
              <Globe2 className="size-3.5 text-accent" />
              <span>Distributed Team • Global Reach</span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="font-display text-3xl sm:text-4xl text-white font-bold leading-tight drop-shadow-md">
                Built to partner with ambitious teams worldwide.
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed max-w-md">
                We operate as a focused, agile studio with direct creative access and an obsession
                with real business results.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="eyebrow text-primary">The Origin</p>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-tight">
                A creative partner, not a layer of agency bureaucracy.
              </h2>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                <p>
                  Most companies face a frustrating dilemma: hire an overpriced legacy agency with
                  slow turnarounds, or settle for cheap templates that look amateur and fail to
                  convert.
                </p>
                <p>
                  NovaCraft was created to solve this. We bring high-end art direction, meticulous
                  typography, and modern frontend development into a cohesive, fast-moving studio
                  model.
                </p>
                <p>
                  Whether you are launching a groundbreaking new brand or replacing an outdated
                  website that no longer represents your caliber, we deliver an end product you will
                  be proud to show the world.
                </p>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-border">
              <Button asChild size="lg">
                <Link to="/contact">
                  <span>Start a Conversation</span>
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="border-t border-border bg-card/60 px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="max-w-2xl">
            <p className="eyebrow text-primary">Studio Principles</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">
              What drives our craft every day.
            </h2>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="luxury-card rounded-2xl p-6 sm:p-8">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modern Tech Stack & Standards */}
      <section className="px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-center">
            <div>
              <p className="eyebrow text-primary">Modern Web Standards</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl leading-tight">
                Built on the world's most performant technologies.
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                We believe great websites are founded on robust engineering. We avoid slow, brittle
                drag-and-drop website builders in favor of pure, modern code that scores 95+ on
                Google PageSpeed Insights.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {techStack.map((tech) => (
                <div key={tech.name} className="luxury-card rounded-xl p-5">
                  <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider block">
                    {tech.role}
                  </span>
                  <h4 className="mt-1 font-display text-2xl text-foreground">{tech.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <QuoteBand />
    </>
  );
}
