import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  MessageSquare,
  MonitorCheck,
  Phone,
  Smartphone,
} from "lucide-react";

import { PageIntro } from "@/components/page-intro";
import { QuoteBand } from "@/components/quote-band";
import { Button } from "@/components/ui/button";
import { siteConfig, socialMediaServices, websiteCreationGoals } from "@/lib/site-config";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — NovaCraft" },
      {
        name: "description",
        content:
          "NovaCraft creates clear, professional websites for businesses worldwide, with supporting social media advice and management.",
      },
      { property: "og:title", content: "Services — NovaCraft" },
      {
        property: "og:description",
        content:
          "Bespoke website creation and supporting social media services for businesses worldwide.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

export function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our Services"
        title="Help customers understand what you do—and how to reach you."
      >
        <p>
          NovaCraft focuses on website creation as our primary service, supported by social media
          advice and management to keep your online message consistent.
        </p>
      </PageIntro>

      {/* Primary Offer: Website Creation */}
      <section className="px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="border-b border-border pb-8">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Primary Offer
            </span>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl">Website Creation</h2>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
              We design and build websites designed to make your business easier to choose. We
              structure every project around four core practical goals:
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {websiteCreationGoals.map((goal, idx) => (
              <div
                key={goal.id}
                className="luxury-card rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="size-10 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 mb-4">
                    {idx === 0 && <Globe2 className="size-5" />}
                    {idx === 1 && <MonitorCheck className="size-5" />}
                    {idx === 2 && <Phone className="size-5" />}
                    {idx === 3 && <Smartphone className="size-5" />}
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">{goal.title}</h3>
                  <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {goal.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/80 text-xs text-cyan-400 font-mono">
                  ✦ Core Focus
                </div>
              </div>
            ))}
          </div>

          {/* Social Media Support */}
          <div className="mt-20 pt-16 border-t border-border">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Additional Support
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">
              Social Media Advice & Management
            </h2>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
              For businesses that also want assistance with their broader presence, we provide two
              supporting services tailored to what you need:
            </p>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {socialMediaServices.map((svc) => (
                <div
                  key={svc.id}
                  className="luxury-card rounded-2xl p-8 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs text-cyan-400">Supporting Service</span>
                    <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
                      {svc.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {svc.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <Button
                      asChild
                      className="bg-cyan-500 text-black hover:bg-cyan-400 font-semibold text-sm"
                    >
                      <a href="/#contact">
                        <span>Discuss your website & social support</span>
                        <ArrowRight className="ml-2 size-4" />
                      </a>
                    </Button>
                  </div>
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
