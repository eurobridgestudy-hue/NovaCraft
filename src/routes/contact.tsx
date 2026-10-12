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
import {
  type InquiryInput,
  isValidEmailFormat,
  isValidInquiryMessage,
  isValidNameFormat,
  isValidOnlinePresence,
} from "@/lib/quote-schema";

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
  businessName?: string;
  currentWebsiteOrProfile?: string;
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

    const nameTrimmed = formData.name.trim();
    if (!nameTrimmed) {
      errs.name = "Please enter your name.";
    } else if (!isValidNameFormat(nameTrimmed)) {
      errs.name = "Please enter a valid contact or business name containing letters.";
    }

    const emailTrimmed = formData.email.trim();
    if (!emailTrimmed) {
      errs.email = "Please enter your email address.";
    } else if (!isValidEmailFormat(emailTrimmed)) {
      errs.email = "Please enter a complete, valid email address (e.g. alex@company.com).";
    }

    const presenceTrimmed = formData.currentWebsiteOrProfile.trim();
    if (presenceTrimmed && !isValidOnlinePresence(presenceTrimmed)) {
      errs.currentWebsiteOrProfile =
        "Please enter a valid website (e.g. yoursite.com) or social profile (e.g. @yourbusiness).";
    }

    const helpTrimmed = formData.helpNeeded.trim();
    if (!helpTrimmed) {
      errs.helpNeeded = "Please tell us what you need help with.";
    } else if (helpTrimmed.length < 5) {
      errs.helpNeeded =
        "Please provide a bit more detail about your project (at least 5 characters).";
    } else if (!isValidInquiryMessage(helpTrimmed)) {
      errs.helpNeeded = "Please enter a clear project inquiry describing your requirements.";
    }

    setErrors(errs);
    const isValid = Object.keys(errs).length === 0;
    if (!isValid) {
      const fieldIdMap: Record<string, string> = {
        name: "contact-name",
        email: "contact-email",
        currentWebsiteOrProfile: "contact-profile",
        helpNeeded: "contact-help",
      };
      const firstErrorKey = Object.keys(errs)[0];
      const targetId = firstErrorKey ? fieldIdMap[firstErrorKey] : undefined;
      if (targetId) {
        setTimeout(() => {
          document.getElementById(targetId)?.focus();
        }, 0);
      }
    }
    return isValid;
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
              <p className="mt-2 text-xs text-slate-300">You can reach us directly at any time:</p>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300 block">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="mt-1 inline-flex items-center gap-2 font-mono text-base font-semibold text-cyan-300 hover:text-cyan-200 hover:underline"
                  >
                    <Mail className="size-4 text-cyan-400" />
                    <span>{siteConfig.contactEmail}</span>
                  </a>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300 block">
                    Phone
                  </span>
                  <a
                    href={siteConfig.telLink}
                    className="mt-1 inline-flex items-center gap-2 font-mono text-base font-semibold text-emerald-400 hover:text-emerald-300 hover:underline"
                  >
                    <Phone className="size-4 text-emerald-400" />
                    <span>{siteConfig.phoneFormatted}</span>
                  </a>
                  <p className="mt-1 text-xs text-slate-300">Call NovaCraft</p>
                </div>
              </div>

              {/* Privacy Notice with Clear Contrast */}
              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="text-cyan-300 font-semibold">✦ Privacy notice:</span> We only use
                your details to evaluate and respond to your inquiry. We do not share your details
                or send unsolicited marketing.
              </div>
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
                <p className="mx-auto mt-4 max-w-md text-sm text-slate-200 leading-relaxed">
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
                    className="border-white/20 text-white hover:bg-white/10 font-medium"
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
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                    {serverError}
                  </div>
                )}

                {/* Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="contact-name"
                    className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-200"
                  >
                    Your Name <span className="text-cyan-400">*</span>
                  </Label>
                  <Input
                    id="contact-name"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className={
                      errors.name
                        ? "border-red-400"
                        : "border-white/20 bg-white/5 text-white placeholder:text-slate-400"
                    }
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      role="alert"
                      className="text-xs text-red-400 font-medium"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="contact-email"
                    className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-200"
                  >
                    Email Address <span className="text-cyan-400">*</span>
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className={
                      errors.email
                        ? "border-red-400"
                        : "border-white/20 bg-white/5 text-white placeholder:text-slate-400"
                    }
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      role="alert"
                      className="text-xs text-red-400 font-medium"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Business Name (Optional) */}
                <div className="space-y-2">
                  <Label
                    htmlFor="contact-businessName"
                    className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-200"
                  >
                    Business Name{" "}
                    <span className="text-slate-400 font-normal normal-case">(optional)</span>
                  </Label>
                  <Input
                    id="contact-businessName"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Morgan Craft Services"
                    className="border-white/20 bg-white/5 text-white placeholder:text-slate-400"
                  />
                </div>

                {/* Current Website or Social Profile (Optional) */}
                <div className="space-y-2">
                  <Label
                    htmlFor="contact-profile"
                    className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-200"
                  >
                    Current website or social profile{" "}
                    <span className="text-slate-400 font-normal normal-case">(optional)</span>
                  </Label>
                  <Input
                    id="contact-profile"
                    aria-invalid={Boolean(errors.currentWebsiteOrProfile)}
                    aria-describedby={
                      errors.currentWebsiteOrProfile ? "contact-profile-error" : undefined
                    }
                    value={formData.currentWebsiteOrProfile}
                    onChange={(e) =>
                      setFormData({ ...formData, currentWebsiteOrProfile: e.target.value })
                    }
                    placeholder="e.g. instagram.com/mybusiness or yoursite.com"
                    className={
                      errors.currentWebsiteOrProfile
                        ? "border-red-400"
                        : "border-white/20 bg-white/5 text-white placeholder:text-slate-400"
                    }
                  />
                  {errors.currentWebsiteOrProfile && (
                    <p
                      id="contact-profile-error"
                      role="alert"
                      className="text-xs text-red-400 font-medium"
                    >
                      {errors.currentWebsiteOrProfile}
                    </p>
                  )}
                </div>

                {/* What do you need help with? */}
                <div className="space-y-2">
                  <Label
                    htmlFor="contact-help"
                    className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-200"
                  >
                    What do you need help with? <span className="text-cyan-400">*</span>
                  </Label>
                  <Textarea
                    id="contact-help"
                    rows={4}
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.helpNeeded)}
                    aria-describedby={errors.helpNeeded ? "contact-help-error" : undefined}
                    value={formData.helpNeeded}
                    onChange={(e) => setFormData({ ...formData, helpNeeded: e.target.value })}
                    placeholder="Tell us what you would like to create or improve..."
                    className={
                      errors.helpNeeded
                        ? "border-red-400"
                        : "border-white/20 bg-white/5 text-white placeholder:text-slate-400"
                    }
                  />
                  {errors.helpNeeded && (
                    <p
                      id="contact-help-error"
                      role="alert"
                      className="text-xs text-red-400 font-medium"
                    >
                      {errors.helpNeeded}
                    </p>
                  )}
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

                <p className="text-center text-xs sm:text-sm text-slate-300 font-medium">
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
