import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import studioWorkspace from "@/assets/studio-workspace.jpg";
import { PageIntro } from "@/components/page-intro";
import { QuoteBand } from "@/components/quote-band";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — NovaCraft" },
      {
        name: "description",
        content:
          "NovaCraft offers website creation and social media support for businesses worldwide.",
      },
      { property: "og:title", content: "About — NovaCraft" },
      {
        property: "og:description",
        content:
          "Straightforward website creation and social media support for businesses worldwide.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

export function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About NovaCraft"
        title="Clear websites that make your business easier to choose."
      >
        <p>NovaCraft offers website creation and social media support for businesses worldwide.</p>
      </PageIntro>

      {/* Main Philosophy Section */}
      <section className="px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-2 lg:items-center">
          <div className="group relative overflow-hidden rounded-2xl border border-border/80 shadow-xl">
            <img
              src={studioWorkspace}
              alt="NovaCraft digital workspace"
              width={1600}
              height={1000}
              className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-102"
              loading="lazy"
            />
          </div>

          <div className="space-y-6">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Our Focus
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground">
              A straightforward creative partner for your business.
            </h2>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>
                We believe websites exist to solve real business communication challenges. When a
                prospective customer visits your site, they want to know who you are, what services
                you provide, and how to contact you without difficulty.
              </p>
              <p>
                We focus on making that experience as clear and credible as possible. We cut out
                superficial clutter and prioritize readable presentation, clean mobile layouts, and
                prominent contact actions.
              </p>
              <p>
                For businesses looking to align their wider online presence, we also provide
                supporting social media advice and management tailored to your specific scope.
              </p>
            </div>

            <div className="pt-4">
              <Button
                asChild
                className="bg-cyan-500 text-black hover:bg-cyan-400 font-semibold text-sm"
              >
                <a href="/#contact">
                  <span>Discuss your website</span>
                  <ArrowRight className="ml-2 size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <QuoteBand />
    </>
  );
}
