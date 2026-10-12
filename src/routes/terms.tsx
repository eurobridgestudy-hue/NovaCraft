import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, FileText, Globe, Mail, Phone, Scale } from "lucide-react";

import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Engagement — NovaCraft" },
      {
        name: "description",
        content:
          "NovaCraft Terms of Engagement. Clear, fair commercial terms for website creation and social media services worldwide.",
      },
      { property: "og:title", content: "Terms of Engagement — NovaCraft" },
      {
        property: "og:description",
        content:
          "NovaCraft Terms of Engagement. Clear, fair commercial terms for website creation and social media services worldwide.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TermsPage,
});

export function TermsPage() {
  return (
    <>
      <PageIntro eyebrow="Commercial Standards" title="Terms of Engagement">
        <p>
          NovaCraft provides website creation, responsive interface design, and supporting social
          media services. These terms describe how we structure client engagements clearly and
          fairly.
        </p>
      </PageIntro>

      <section className="px-5 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Key Principles Strip */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-[#060c18]/80 p-5 backdrop-blur-md">
              <Scale className="size-5 text-cyan-400 mb-2" />
              <h3 className="font-semibold text-white text-sm">Agreed Scope First</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                We agree deliverables, timelines, and fees in writing before work begins. No
                unexpected charges.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#060c18]/80 p-5 backdrop-blur-md">
              <FileText className="size-5 text-emerald-400 mb-2" />
              <h3 className="font-semibold text-white text-sm">Full Client IP</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Upon final project settlement, all custom designs, copy, and code for your website
                belong to you.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#060c18]/80 p-5 backdrop-blur-md">
              <Globe className="size-5 text-cyan-400 mb-2" />
              <h3 className="font-semibold text-white text-sm">Worldwide Coverage</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Serving local businesses and companies worldwide in plain, transparent English.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="font-display text-2xl text-white">1. Service Offerings</h2>
            <p className="text-sm leading-relaxed text-slate-300">
              NovaCraft provides digital services categorized into:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-300">
              <li>
                <strong className="text-white">Website Creation (Primary Offer):</strong>{" "}
                Information architecture, responsive interface design, cross-device testing, copy
                structuring, and deployment of business websites.
              </li>
              <li>
                <strong className="text-white">Social Media Advice:</strong> Practical evaluation of
                current profiles, content formatting, and audience positioning.
              </li>
              <li>
                <strong className="text-white">Social Media Management:</strong> Ongoing scheduling,
                cadence planning, and brand message alignment.
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="font-display text-2xl text-white">2. Scope Agreement & Revisions</h2>
            <p className="text-sm leading-relaxed text-slate-300">
              We never perform billable work without mutual written agreement. Following an initial
              inquiry, we deliver a proposal outlining:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-300">
              <li>The exact pages, features, or profiles included.</li>
              <li>The target delivery schedule.</li>
              <li>The review and revision rounds included prior to final launch.</li>
            </ul>
            <p className="text-sm leading-relaxed text-slate-300">
              Any changes requested beyond the agreed scope are quoted separately in advance before
              implementation.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="font-display text-2xl text-white">3. Intellectual Property Rights</h2>
            <p className="text-sm leading-relaxed text-slate-300">
              NovaCraft guarantees clear, unencumbered ownership of delivered work:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-300">
              <li>
                <strong className="text-white">Your Deliverables:</strong> Upon receipt of full
                payment, all custom design files, markup, scripts, and media generated for your
                project transfer entirely to you.
              </li>
              <li>
                <strong className="text-white">Your Assets:</strong> You retain 100% ownership of
                your trademarks, brand names, product photography, and supplied materials.
              </li>
              <li>
                <strong className="text-white">Open Source & Standards:</strong> Underpinning
                open-source libraries and web standards remain under their respective licenses.
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="font-display text-2xl text-white">4. Client Responsibilities</h2>
            <p className="text-sm leading-relaxed text-slate-300">
              To ensure on-time delivery, clients agree to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-300">
              <li>
                Provide accurate business information, service descriptions, and contact
                credentials.
              </li>
              <li>
                Ensure all supplied media, logos, and trademarks are owned or properly licensed.
              </li>
              <li>Provide timely feedback during agreed review checkpoints.</li>
            </ul>
          </div>

          {/* Direct Contact Box */}
          <div className="rounded-2xl border border-cyan-500/30 bg-[#040812] p-6 sm:p-8">
            <h2 className="font-display text-2xl text-white">5. Direct Inquiries & Engagements</h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              If you have any questions about project terms, licensing, or commercial arrangements,
              reach out directly:
            </p>
            <div className="mt-4 flex flex-wrap gap-6 font-mono text-sm text-slate-200">
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="inline-flex items-center gap-2 hover:text-cyan-400 transition-colors"
              >
                <Mail className="size-4 text-cyan-400" />
                <span>{siteConfig.contactEmail}</span>
              </a>
              <a
                href={siteConfig.telLink}
                className="inline-flex items-center gap-2 hover:text-cyan-400 transition-colors"
              >
                <Phone className="size-4 text-emerald-400" />
                <span>{siteConfig.phoneFormatted}</span>
              </a>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <Button
              asChild
              variant="outline"
              className="border-white/20 text-slate-200 hover:text-white"
            >
              <Link to="/">
                <ArrowLeft className="mr-2 size-4" />
                <span>Back to Homepage</span>
              </Link>
            </Button>
            <span className="font-mono text-xs text-slate-500">
              Terms Version: 2026.1 • NovaCraft
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
