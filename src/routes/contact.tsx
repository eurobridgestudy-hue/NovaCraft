import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

import { PageIntro } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { siteConfig } from "@/lib/site-config";
import { submitQuoteRequest } from "@/lib/quote.functions";
import { serviceValues, type QuoteRequestInput } from "@/lib/quote-schema";

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
      { title: "Request a Quote — NovaCraft Design Studio" },
      {
        name: "description",
        content:
          "Start your website design or digital branding project with NovaCraft. Get a transparent scope and quote within 24 hours.",
      },
      { property: "og:title", content: "Request a Quote — NovaCraft" },
      {
        property: "og:description",
        content:
          "Tell us about your brand and vision. We will craft a tailored proposal and project blueprint.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

type FormState = {
  contactName: string;
  businessName: string;
  email: string;
  services: Array<(typeof serviceValues)[number]>;
  businessContext: string;
  projectDetails: string;
  consent: boolean;
  website: string;
};

type FormErrors = {
  contactName?: string;
  businessName?: string;
  email?: string;
  services?: string;
  businessContext?: string;
  projectDetails?: string;
  consent?: string;
};

function ContactPage() {
  const search = Route.useSearch();

  const [formData, setFormData] = useState<FormState>(() => {
    let initialDetails = "";
    if (search.plan) {
      initialDetails = `Inquiring about the ${search.plan} engagement tier. `;
    } else if (search.project) {
      initialDetails = `Inquiring about a project inspired by the ${search.project} showcase. `;
    }

    const initialServices: Array<(typeof serviceValues)[number]> = ["Website creation"];
    if (
      search.service &&
      serviceValues.includes(search.service as (typeof serviceValues)[number])
    ) {
      const typedSvc = search.service as (typeof serviceValues)[number];
      if (!initialServices.includes(typedSvc)) {
        initialServices.push(typedSvc);
      }
    }

    return {
      contactName: "",
      businessName: "",
      email: "",
      services: initialServices,
      businessContext: "",
      projectDetails: initialDetails,
      consent: true,
      website: "",
    };
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const toggleService = (service: (typeof serviceValues)[number]) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      if (exists) {
        if (prev.services.length === 1) return prev; // At least one
        return { ...prev, services: prev.services.filter((s) => s !== service) };
      } else {
        return { ...prev, services: [...prev.services, service] };
      }
    });
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.contactName || formData.contactName.trim().length < 2) {
      errs.contactName = "Please enter your name.";
    }
    if (!formData.businessName || formData.businessName.trim().length < 2) {
      errs.businessName = "Please enter your business or project name.";
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.services || formData.services.length === 0) {
      errs.services = "Please select at least one service.";
    }
    if (!formData.businessContext || formData.businessContext.trim().length < 10) {
      errs.businessContext =
        "Please share a few sentences about your business (minimum 10 characters).";
    }
    if (!formData.projectDetails || formData.projectDetails.trim().length < 20) {
      errs.projectDetails =
        "Please describe your website design requirements in more detail (minimum 20 characters).";
    }
    if (!formData.consent) {
      errs.consent = "Please agree to have us review your submission.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;
    if (!formData.consent) return;

    try {
      setSubmitting(true);
      const payload: QuoteRequestInput = {
        contactName: formData.contactName,
        businessName: formData.businessName,
        email: formData.email,
        services: formData.services,
        businessContext: formData.businessContext,
        projectDetails: formData.projectDetails,
        consent: true,
        website: formData.website,
      };

      await submitQuoteRequest({
        data: payload,
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Quote submission error:", err);
      setServerError(
        err instanceof Error
          ? err.message
          : "We encountered an issue submitting your request. Please try again or reach out directly via email.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageIntro eyebrow="Start a Project" title="Let's build something exceptional together.">
        <p>
          Whether you need a bespoke website from scratch, a comprehensive redesign, or strategic
          digital creative support, tell us about your goals below.
        </p>
      </PageIntro>

      <section className="px-5 py-12 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1fr_2fr]">
          {/* Left Column: Direct Info & Guarantees */}
          <div className="flex flex-col gap-8">
            <div className="luxury-card rounded-2xl p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <Sparkles className="size-4 text-accent" />
                <span>What to Expect</span>
              </div>

              <div className="mt-6 space-y-6 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Clock className="size-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">24-Hour Review</h4>
                    <p className="mt-1 text-muted-foreground">
                      We evaluate your requirements and send a customized proposal outline with
                      scope and pricing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MessageSquare className="size-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Initial Strategy Call</h4>
                    <p className="mt-1 text-muted-foreground">
                      An optional 30-minute discovery session with our lead designer to refine goals
                      and narrative flow.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ShieldCheck className="size-4 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Confidential & Private</h4>
                    <p className="mt-1 text-muted-foreground">
                      Your business plans and materials are strictly confidential under studio
                      policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="luxury-card rounded-2xl p-6 sm:p-8">
              <h4 className="font-display text-xl text-foreground">Direct Studio Channels</h4>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Prefer to speak directly with our studio directors? Reach out anytime via email or
                phone:
              </p>

              <div className="mt-5 space-y-4">
                <div className="rounded-xl border border-border/80 bg-background/60 p-4">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="mt-1.5 inline-flex items-center gap-2 font-mono text-sm font-semibold text-primary hover:underline"
                  >
                    <Mail className="size-4 text-cyan-400" />
                    {siteConfig.contactEmail}
                  </a>
                </div>

                <div className="rounded-xl border border-border/80 bg-background/60 p-4">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">
                    International Studio Hotline
                  </span>
                  <a
                    href={siteConfig.telLink}
                    className="mt-1.5 inline-flex items-center gap-2 font-mono text-sm font-semibold text-primary hover:underline"
                  >
                    <Phone className="size-4 text-emerald-400" />
                    {siteConfig.phoneFormatted}
                  </a>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Available for inquiries worldwide & WhatsApp calls
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="size-4 text-emerald-400" />
                <span>NDA & Confidentiality guaranteed</span>
              </div>
            </div>
          </div>

          {/* Right Column: Quote Form or Confirmation */}
          <div>
            {search.plan && (
              <div className="mb-6 flex items-center justify-between rounded-2xl border border-cyan-400/40 bg-cyan-500/10 p-4 text-xs shadow-sm">
                <div className="flex items-center gap-2.5 text-cyan-300">
                  <Sparkles className="size-4 text-cyan-400" />
                  <span>
                    Initiating proposal for:{" "}
                    <strong className="text-white font-semibold">{search.plan}</strong>
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400/80 rounded-full border border-cyan-400/30 px-2.5 py-0.5">
                  Pre-configured
                </span>
              </div>
            )}

            {search.project && (
              <div className="mb-6 flex items-center justify-between rounded-2xl border border-indigo-400/40 bg-indigo-500/10 p-4 text-xs shadow-sm">
                <div className="flex items-center gap-2.5 text-indigo-300">
                  <Sparkles className="size-4 text-indigo-400" />
                  <span>
                    Inquiring for project style:{" "}
                    <strong className="text-white font-semibold">{search.project}</strong>
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-indigo-400/80 rounded-full border border-indigo-400/30 px-2.5 py-0.5">
                  Showcase Ref
                </span>
              </div>
            )}

            {submitted ? (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center sm:p-12">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                  <CheckCircle2 className="size-10" />
                </div>
                <h3 className="mt-6 font-display text-4xl text-foreground">
                  Thank you! Your quote request has been received.
                </h3>
                <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
                  Our team has received your project details. We are reviewing your requirements and
                  will reach out to{" "}
                  <span className="font-semibold text-foreground">{formData.email}</span> within 24
                  business hours with an initial project estimate and next steps.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        contactName: "",
                        businessName: "",
                        email: "",
                        services: ["Website creation"],
                        businessContext: "",
                        projectDetails: "",
                        consent: true,
                        website: "",
                      });
                    }}
                  >
                    Submit another request
                  </Button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="luxury-card rounded-2xl p-6 sm:p-10 shadow-xl"
                noValidate
              >
                <div className="space-y-8">
                  {/* Service Multi-Select */}
                  <div>
                    <Label className="text-sm font-semibold text-foreground">
                      Services required <span className="text-accent">*</span>
                    </Label>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Select one or multiple areas of focus for your project:
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2.5">
                      {serviceValues.map((svc) => {
                        const active = formData.services.includes(svc);
                        return (
                          <button
                            key={svc}
                            type="button"
                            onClick={() => toggleService(svc)}
                            className={`rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                              active
                                ? "border-primary bg-primary text-primary-foreground shadow-xs"
                                : "border-border bg-background text-foreground hover:border-primary/50"
                            }`}
                          >
                            {active ? "✓ " : "+ "} {svc}
                          </button>
                        );
                      })}
                    </div>
                    {errors.services && (
                      <p className="mt-2 text-xs text-destructive">{errors.services}</p>
                    )}
                  </div>

                  {/* Name & Company */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="contactName"
                        className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Your Name <span className="text-accent">*</span>
                      </Label>
                      <Input
                        id="contactName"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className={errors.contactName ? "border-destructive" : ""}
                      />
                      {errors.contactName && (
                        <p className="text-xs text-destructive">{errors.contactName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="businessName"
                        className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        Business / Project Name <span className="text-accent">*</span>
                      </Label>
                      <Input
                        id="businessName"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g. Acme Studio"
                        className={errors.businessName ? "border-destructive" : ""}
                      />
                      {errors.businessName && (
                        <p className="text-xs text-destructive">{errors.businessName}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Work Email <span className="text-accent">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>

                  {/* Business Context */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="businessContext"
                      className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      About Your Business <span className="text-accent">*</span>
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      What does your company do, who are your primary customers, and what is your
                      current market presence?
                    </p>
                    <Textarea
                      id="businessContext"
                      rows={3}
                      value={formData.businessContext}
                      onChange={(e) =>
                        setFormData({ ...formData, businessContext: e.target.value })
                      }
                      placeholder="Briefly introduce what you offer and what sets you apart..."
                      className={errors.businessContext ? "border-destructive" : ""}
                    />
                    {errors.businessContext && (
                      <p className="text-xs text-destructive">{errors.businessContext}</p>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="projectDetails"
                      className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Website Project Scope & Vision <span className="text-accent">*</span>
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Tell us what you want to achieve with the new website (e.g., redesign, higher
                      conversion, new branding, desired timeline, target budget range).
                    </p>
                    <Textarea
                      id="projectDetails"
                      rows={4}
                      value={formData.projectDetails}
                      onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                      placeholder="We need a modern 5-page marketing website with custom interactive demos to launch our new product by next month..."
                      className={errors.projectDetails ? "border-destructive" : ""}
                    />
                    {errors.projectDetails && (
                      <p className="text-xs text-destructive">{errors.projectDetails}</p>
                    )}
                  </div>

                  {/* Honeypot field (hidden from real users) */}
                  <div className="hidden" aria-hidden="true">
                    <Label htmlFor="website">Website (Leave empty)</Label>
                    <Input
                      id="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start space-x-3 pt-2">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, consent: checked === true })
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="consent"
                        className="text-xs leading-normal text-muted-foreground cursor-pointer select-none"
                      >
                        I agree to submit this project brief to NovaCraft Studio for evaluation and
                        receiving a project proposal.
                      </label>
                      {errors.consent && (
                        <p className="text-xs text-destructive">{errors.consent}</p>
                      )}
                    </div>
                  </div>

                  {serverError && (
                    <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-xs text-destructive">
                      {serverError}
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="w-full text-base font-semibold shadow-md sm:w-auto"
                  >
                    {submitting ? (
                      <span>Sending proposal request...</span>
                    ) : (
                      <>
                        <span>Submit Project Request</span>
                        <ArrowRight className="ml-2 size-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
