import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Mail, Phone, Send, Sparkles } from "lucide-react";
import { useState } from "react";

import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/site-config";
import { submitInquiry } from "@/lib/quote.functions";
import type { InquiryInput } from "@/lib/quote-schema";

type ContactSearch = {
  plan?: string | undefined;
  service?: string | undefined;
  project?: string | undefined;
};

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch => ({
    plan: typeof search["plan"] === "string" ? search["plan"] : undefined,
    service: typeof search["service"] === "string" ? search["service"] : undefined,
    project: typeof search["project"] === "string" ? search["project"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contact NovaCraft — Discuss Your Website" },
      {
        name: "description",
        content:
          "Get in touch with NovaCraft to discuss your business website or social media support. Direct, practical communication.",
      },
      { property: "og:title", content: "Contact NovaCraft" },
      {
        property: "og:description",
        content:
          "Tell us about your business and what you would like to build or improve. We serve businesses worldwide.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

type FormState = {
  name: string;
  email: string;
  businessName: string;
  currentWebsiteOrProfile: string;
  helpNeeded: string;
  website: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  helpNeeded?: string;
};

function ContactPage() {
  const search = Route.useSearch();

  const [formData, setFormData] = useState<FormState>(() => {
    let initialHelp = "";
    if (search.service) {
      initialHelp = `Inquiring about ${search.service}. `;
    } else if (search.plan) {
      initialHelp = `Inquiring about ${search.plan}. `;
    } else if (search.project) {
      initialHelp = `Inquiring about ${search.project}. `;
    }

    return {
      name: "",
      email: "",
      businessName: "",
      currentWebsiteOrProfile: "",
      helpNeeded: initialHelp,
      website: "",
    };
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.name.trim()) {
      errs.name = "Please enter your name.";
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.helpNeeded.trim()) {
      errs.helpNeeded = "Please tell us what you need help with.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    try {
      setSubmitting(true);
      const payload: InquiryInput = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        businessName: formData.businessName.trim(),
        currentWebsiteOrProfile: formData.currentWebsiteOrProfile.trim(),
        helpNeeded: formData.helpNeeded.trim(),
        website: formData.website,
        services: ["Website creation"],
      };

      await submitInquiry({
        data: payload,
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Inquiry submission error:", err);
      // Preserve entered values, inform user clearly
      setServerError(
        err instanceof Error
          ? err.message
          : "We encountered an issue submitting your inquiry. Please try again or email us directly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageIntro eyebrow="Contact" title="Let’s talk about your website.">
        <p>
          Tell us about your business and what you would like to improve. If you reached us from an
          introductory email, you can also reply directly to that email.
        </p>
      </PageIntro>

      <section className="px-5 py-12 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1fr_1.6fr]">
          {/* Left Column: Direct Info & Plain Next Steps */}
          <div className="flex flex-col gap-6">
            <div className="luxury-card rounded-2xl p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                <Sparkles className="size-4" />
                <span>What happens next</span>
              </div>

              <div className="mt-5 space-y-4 text-sm text-slate-300">
                <p>
                  1. <strong className="text-white">Direct review:</strong> We read your message and
                  review your current online presence if provided.
                </p>
                <p>
                  2. <strong className="text-white">Clear options:</strong> We reply with honest
                  feedback, what a tailored site would look like, and approximate scope.
                </p>
                <p>
                  3. <strong className="text-white">No obligation:</strong> We agree the scope and
                  next steps before any work begins.
                </p>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="luxury-card rounded-2xl p-6 sm:p-8">
              <h3 className="font-display text-xl text-white">Direct Channels</h3>
              <p className="mt-2 text-xs text-slate-400">You can reach us directly at any time:</p>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="mt-1 inline-flex items-center gap-2 font-mono text-sm font-semibold text-cyan-300 hover:underline"
                  >
                    <Mail className="size-4 text-cyan-400" />
                    <span>{siteConfig.contactEmail}</span>
                  </a>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                    Phone / Messaging
                  </span>
                  <a
                    href={siteConfig.telLink}
                    className="mt-1 inline-flex items-center gap-2 font-mono text-sm font-semibold text-emerald-400 hover:underline"
                  >
                    <Phone className="size-4 text-emerald-400" />
                    <span>{siteConfig.phoneFormatted}</span>
                  </a>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Available for WhatsApp & calls worldwide
                  </p>
                </div>
              </div>

              <p className="mt-6 text-xs text-slate-400 leading-relaxed">
                ✦ Privacy notice: We only use your information to evaluate and respond to your
                inquiry. We do not share your details or send unsolicited marketing.
              </p>
            </div>
          </div>

          {/* Right Column: Short Practical Inquiry Form */}
          <div>
            {submitted ? (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 sm:p-12 text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="size-8" />
                </div>
                <h3 className="mt-6 font-display text-3xl font-bold text-white">
                  Thank you! Your inquiry has been sent.
                </h3>
                <p className="mx-auto mt-4 max-w-md text-sm text-slate-300 leading-relaxed">
                  We have received your message and will review it promptly. We will reply to{" "}
                  <span className="font-semibold text-white">{formData.email}</span>.
                </p>
                <div className="mt-8">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        businessName: "",
                        currentWebsiteOrProfile: "",
                        helpNeeded: "",
                        website: "",
                      });
                    }}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Send another message
                  </Button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="luxury-card rounded-2xl p-6 sm:p-10 shadow-xl space-y-6"
              >
                {serverError && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-300">
                    {serverError}
                  </div>
                )}

                {/* Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="contact-name"
                    className="text-xs font-semibold uppercase tracking-wider text-slate-300"
                  >
                    Your Name <span className="text-cyan-400">*</span>
                  </Label>
                  <Input
                    id="contact-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className={errors.name ? "border-red-400" : "border-white/15 bg-white/5"}
                  />
                  {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="contact-email"
                    className="text-xs font-semibold uppercase tracking-wider text-slate-300"
                  >
                    Email Address <span className="text-cyan-400">*</span>
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className={errors.email ? "border-red-400" : "border-white/15 bg-white/5"}
                  />
                  {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                </div>

                {/* Business Name (Optional) */}
                <div className="space-y-2">
                  <Label
                    htmlFor="contact-businessName"
                    className="text-xs font-semibold uppercase tracking-wider text-slate-300"
                  >
                    Business Name <span className="text-slate-500 font-normal">(optional)</span>
                  </Label>
                  <Input
                    id="contact-businessName"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Morgan Craft Services"
                    className="border-white/15 bg-white/5"
                  />
                </div>

                {/* Current Website or Social Profile (Optional) */}
                <div className="space-y-2">
                  <Label
                    htmlFor="contact-profile"
                    className="text-xs font-semibold uppercase tracking-wider text-slate-300"
                  >
                    Current website or social profile{" "}
                    <span className="text-slate-500 font-normal">(optional)</span>
                  </Label>
                  <Input
                    id="contact-profile"
                    value={formData.currentWebsiteOrProfile}
                    onChange={(e) =>
                      setFormData({ ...formData, currentWebsiteOrProfile: e.target.value })
                    }
                    placeholder="e.g. instagram.com/mybusiness or yoursite.com"
                    className="border-white/15 bg-white/5"
                  />
                </div>

                {/* What do you need help with? */}
                <div className="space-y-2">
                  <Label
                    htmlFor="contact-help"
                    className="text-xs font-semibold uppercase tracking-wider text-slate-300"
                  >
                    What do you need help with? <span className="text-cyan-400">*</span>
                  </Label>
                  <Textarea
                    id="contact-help"
                    rows={4}
                    value={formData.helpNeeded}
                    onChange={(e) => setFormData({ ...formData, helpNeeded: e.target.value })}
                    placeholder="Tell us what you would like to create or improve..."
                    className={errors.helpNeeded ? "border-red-400" : "border-white/15 bg-white/5"}
                  />
                  {errors.helpNeeded && <p className="text-xs text-red-400">{errors.helpNeeded}</p>}
                </div>

                {/* Honeypot field (hidden from real users) */}
                <div className="hidden" aria-hidden="true">
                  <Label htmlFor="contact-honeypot">Leave empty</Label>
                  <Input
                    id="contact-honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 bg-cyan-500 text-black hover:bg-cyan-400 font-semibold text-base transition-all"
                >
                  {submitting ? (
                    "Sending inquiry..."
                  ) : (
                    <>
                      <span>Send inquiry</span>
                      <Send className="ml-2 size-4" />
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-slate-500">
                  We’ll agree the scope and next steps before work begins.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
