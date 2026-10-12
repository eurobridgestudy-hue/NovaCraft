import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Lock, Mail, Phone, ShieldCheck } from "lucide-react";

import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — NovaCraft" },
      {
        name: "description",
        content:
          "NovaCraft Privacy Policy. Transparent, zero-spam data practices for business inquiries and client communications worldwide.",
      },
      { property: "og:title", content: "Privacy Policy — NovaCraft" },
      {
        property: "og:description",
        content:
          "NovaCraft Privacy Policy. Transparent, zero-spam data practices for business inquiries and client communications worldwide.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PrivacyPage,
});

export function PrivacyPage() {
  return (
    <>
      <PageIntro eyebrow="Legal & Data Governance" title="Privacy Policy">
        <p>
          At NovaCraft, we respect your privacy. This policy outlines how we handle the information
          you provide when evaluating our services or discussing a website project.
        </p>
      </PageIntro>

      <section className="px-5 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Quick Summary Pill Strip */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-[#060c18]/80 p-5 backdrop-blur-md">
              <ShieldCheck className="size-5 text-cyan-400 mb-2" />
              <h3 className="font-semibold text-white text-sm">Zero Third-Party Sales</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                We never sell, rent, or trade your contact information with advertisers or brokers.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#060c18]/80 p-5 backdrop-blur-md">
              <Lock className="size-5 text-emerald-400 mb-2" />
              <h3 className="font-semibold text-white text-sm">Encrypted Storage</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Inquiries are encrypted in transit and stored in private cloud databases with no
                anonymous grants.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#060c18]/80 p-5 backdrop-blur-md">
              <CheckCircle2 className="size-5 text-cyan-400 mb-2" />
              <h3 className="font-semibold text-white text-sm">Full Data Rights</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Request export or permanent erasure of your inquiry records at any time with one
                email.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="font-display text-2xl text-white">1. Information We Collect</h2>
            <p className="text-sm leading-relaxed text-slate-300">
              We collect only the details you voluntarily submit when reaching out to discuss a
              potential website project or social media engagement:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-300">
              <li>
                <strong className="text-white">Contact Information:</strong> Your name and email
                address.
              </li>
              <li>
                <strong className="text-white">Business Context:</strong> Your business or
                organization name, and optional website or social profile links.
              </li>
              <li>
                <strong className="text-white">Project Notes:</strong> Descriptions of your website
                needs, preferred goals, and questions.
              </li>
            </ul>
            <p className="text-xs text-slate-400 pt-2">
              We do not collect sensitive personal data, financial payment details through this
              inquiry form, or cross-site browsing histories.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="font-display text-2xl text-white">2. How We Use Your Information</h2>
            <p className="text-sm leading-relaxed text-slate-300">
              Information submitted is used strictly for legitimate business communications:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-300">
              <li>Reviewing your current online presence and website goals.</li>
              <li>
                Responding directly to your inquiry with practical recommendations and tailored
                scope proposals.
              </li>
              <li>Communicating regarding agreed milestones, deliverables, and project updates.</li>
            </ul>
            <p className="text-sm leading-relaxed text-slate-300">
              We do not add your email to automated promotional marketing lists or send unsolicited
              bulk mailings.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="font-display text-2xl text-white">3. Cookies & Local Storage</h2>
            <p className="text-sm leading-relaxed text-slate-300">
              Our public website does not employ third-party advertising cookies, ad beacons, or
              cross-site tracking scripts.
            </p>
            <p className="text-sm leading-relaxed text-slate-300">
              We use only essential browser memory for functional navigation and temporary form
              recovery so you do not lose your draft if a network drop occurs.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="font-display text-2xl text-white">4. Data Retention & Your Rights</h2>
            <p className="text-sm leading-relaxed text-slate-300">
              We retain inquiry correspondence for the period necessary to deliver agreed services
              or fulfill standard commercial record-keeping obligations.
            </p>
            <p className="text-sm leading-relaxed text-slate-300">You maintain full rights to:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-300">
              <li>Request a copy of the personal details stored about you.</li>
              <li>Request immediate correction of inaccurate contact information.</li>
              <li>
                Request the permanent deletion of your inquiry record from our active databases.
              </li>
            </ul>
          </div>

          {/* Contact Box */}
          <div className="rounded-2xl border border-cyan-500/30 bg-[#040812] p-6 sm:p-8">
            <h2 className="font-display text-2xl text-white">5. Direct Privacy Inquiries</h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              To exercise any of your data rights or ask questions regarding this policy, reach out
              directly:
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
              Effective Date: October 2026 • NovaCraft
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
