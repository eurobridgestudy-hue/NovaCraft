import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function QuoteBand() {
  return (
    <section className="relative overflow-hidden bg-primary px-5 py-20 text-primary-foreground lg:px-10 lg:py-28">
      {/* Background ambient accents */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 size-96 rounded-full bg-white blur-3xl" />
        <div className="absolute -bottom-20 -right-20 size-96 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-12 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-medium tracking-wide uppercase">
            <Sparkles className="size-3 text-accent" />
            <span>Ready for your new website?</span>
          </div>

          <h2 className="mt-6 font-display text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">
            Let’s build a website that transforms how the world sees your brand.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
            Tell us about your project, goals, and timeline. We’ll review your requirements and
            provide a transparent proposal and architecture plan within 24 hours.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-primary-foreground/90">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-300" />
              <span>Transparent fixed-fee scopes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-300" />
              <span>Dedicated senior designer & lead engineer</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-300" />
              <span>Guaranteed on-time launch</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-end">
          <Button asChild variant="accent" size="lg" className="h-14 px-8 text-base shadow-xl">
            <Link to="/contact">
              <span>Start Your Project Quote</span>
              <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>

          <span className="text-xs text-primary-foreground/70 lg:text-right">
            Zero commitment • Free 30-min strategy review included
          </span>
        </div>
      </div>
    </section>
  );
}
