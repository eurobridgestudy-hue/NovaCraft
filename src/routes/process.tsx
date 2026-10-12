import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { PageIntro } from "@/components/page-intro";
import { QuoteBand } from "@/components/quote-band";
import { Button } from "@/components/ui/button";
import { approachSteps } from "@/lib/site-config";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Our Approach — NovaCraft" },
      {
        name: "description",
        content:
          "Start with your business and what you need. NovaCraft's clear three-step approach to website creation.",
      },
      { property: "og:title", content: "Our Approach — NovaCraft" },
      {
        property: "og:description",
        content: "A straightforward, collaborative path to a clear website.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProcessPage,
});

export function ProcessPage() {
  return (
    <>
      <PageIntro eyebrow="Our Approach" title="Start with your business and what you need.">
        <p>
          We keep the process transparent, direct, and straightforward. Here is how we work together
          from initial conversation to finished website.
        </p>
      </PageIntro>

      <section className="px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-8 md:grid-cols-3">
            {approachSteps.map((step) => (
              <div
                key={step.step}
                className="luxury-card rounded-2xl p-8 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-base font-bold text-cyan-400">{step.step}</span>
                  <h3 className="mt-4 font-display text-2xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Customer-facing agreement note */}
          <div className="mt-12 rounded-2xl border border-border/80 bg-muted/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="size-5 text-cyan-400 shrink-0" />
              <p className="text-sm font-medium text-foreground">
                We’ll agree the scope and next steps before work begins.
              </p>
            </div>

            <Button
              asChild
              className="bg-cyan-500 text-black hover:bg-cyan-400 font-semibold text-sm shrink-0"
            >
              <a href="/#contact">
                <span>Discuss your website</span>
                <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <QuoteBand />
    </>
  );
}
