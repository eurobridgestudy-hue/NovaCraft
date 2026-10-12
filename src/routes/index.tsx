import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowRight,
  CheckCircle2,
  Globe2,
  Mail,
  MessageSquare,
  MonitorCheck,
  Phone,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

import { CinematicCanvas } from "@/components/cinematic-canvas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitInquiry } from "@/lib/quote.functions";
import {
  approachSteps,
  businessNeeds,
  conceptDemonstration,
  siteConfig,
  socialMediaServices,
  websiteCreationGoals,
} from "@/lib/site-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: siteConfig.title },
      { name: "description", content: siteConfig.description },
      { property: "og:title", content: siteConfig.title },
      { property: "og:description", content: siteConfig.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

type FormState = {
  name: string;
  email: string;
  businessName: string;
  currentWebsiteOrProfile: string;
  helpNeeded: string;
  website: string; // Honeypot
};

type FormErrors = {
  name?: string;
  email?: string;
  helpNeeded?: string;
};

function HomePage() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    businessName: "",
    currentWebsiteOrProfile: "",
    helpNeeded: "",
    website: "",
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

    const emailTrimmed = formData.email.trim();
    if (!emailTrimmed) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      errs.email = "Please enter a valid email address.";
    }

    if (!formData.helpNeeded.trim()) {
      errs.helpNeeded = "Please tell us what you would like help with.";
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
      await submitInquiry({
        data: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          businessName: formData.businessName.trim(),
          currentWebsiteOrProfile: formData.currentWebsiteOrProfile.trim(),
          helpNeeded: formData.helpNeeded.trim(),
          website: formData.website,
        },
      });

      // Show success only after confirmed server persistence
      setSubmitted(true);
    } catch (err) {
      console.error("Inquiry submission error:", err);
      // Preserve entered data so user does not lose their message
      setServerError(
        err instanceof Error
          ? err.message
          : "We encountered an issue submitting your inquiry. Please try again or reach out directly via email.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (typeof window === "undefined") return;
    const element = document.getElementById(targetId);
    if (element) {
      e.preventDefault();
      const y = element.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: y, behavior: "smooth" });
      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* 3D WebGL Atmospheric Canvas with Polished Static Fallback */}
      <CinematicCanvas />
      <div className="cinematic-vignette" aria-hidden="true" />
      <div className="cinematic-grain" aria-hidden="true" />

      {/* Main Content Layer (Z-10 above background canvas) */}
      <div className="relative z-10">
        {/* =========================================================================
            1. HERO SECTION
        ========================================================================= */}
        <section
          id="hero"
          className="relative min-h-[85vh] flex flex-col justify-between px-5 pt-20 pb-16 lg:px-12 lg:pt-28 lg:pb-24"
        >
          <div className="mx-auto max-w-[1440px] w-full">
            {/* Core Outreach Headline & Action */}
            <div className="max-w-4xl">
              {/* Small Factual Audience Line */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3.5 py-1 text-xs font-mono text-cyan-300 backdrop-blur-md">
                <span className="size-2 rounded-full bg-cyan-400" />
                <span>{siteConfig.audience}</span>
              </div>

              {/* Main Headline */}
              <h1 className="mt-8 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-slate-100">
                A website that makes your business easier to choose.
              </h1>

              {/* Supporting Copy */}
              <p className="mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-300">
                NovaCraft builds clear, professional websites that explain your services and make it
                easy for customers to contact you. Need help with social media too? We offer advice
                and management.
              </p>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-wrap items-center gap-4 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-8 text-base bg-cyan-500 text-black font-semibold hover:bg-cyan-400 shadow-xl shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <a href="#contact" onClick={(e) => scrollToSection(e, "contact")}>
                    <span>Discuss your website</span>
                    <ArrowRight className="ml-2 size-4" />
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 px-7 text-base border-white/15 bg-white/5 backdrop-blur-md hover:border-cyan-400/60 transition-all hover:bg-white/10 text-slate-200"
                >
                  <a href="#services" onClick={(e) => scrollToSection(e, "services")}>
                    <span>Explore services</span>
                    <ArrowDownRight className="ml-2 size-4 text-cyan-400" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Indicator Strip - High contrast, Worldwide wording */}
          <div className="mx-auto max-w-[1440px] w-full mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6 text-sm text-slate-200">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-wider text-cyan-300 font-semibold">
                Primary:
              </span>
              <span className="font-medium">Website Creation</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-wider text-cyan-300 font-semibold">
                Additional Support:
              </span>
              <span className="font-medium">Social Media Advice & Management</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-wider text-cyan-300 font-semibold">
                Coverage:
              </span>
              <span className="font-medium">Worldwide</span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. RECOGNIZABLE BUSINESS NEEDS
        ========================================================================= */}
        <section
          id="needs"
          className="chapter-scrim px-5 py-20 lg:px-12 lg:py-28 border-t border-white/10"
        >
          <div className="mx-auto max-w-[1440px]">
            <div className="max-w-2xl">
              <span className="font-mono text-xs font-semibold text-cyan-400 uppercase tracking-widest">
                Common Scenarios
              </span>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl text-white">
                Does your online presence reflect your business?
              </h2>
              <p className="mt-4 text-base text-slate-300 leading-relaxed">
                You might be at one of these three stages:
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {businessNeeds.map((need, index) => (
                <div
                  key={need.id}
                  className="rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur-sm transition-all hover:border-cyan-400/50 hover:bg-white/5"
                >
                  <span className="font-mono text-xs font-bold text-cyan-400">0{index + 1}</span>
                  <h3 className="mt-4 font-display text-2xl font-bold text-white leading-snug">
                    {need.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">{need.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. PRIMARY SERVICE: WEBSITE CREATION
        ========================================================================= */}
        <section
          id="services"
          className="chapter-scrim px-5 py-20 lg:px-12 lg:py-28 border-t border-white/10 scroll-mt-20"
        >
          <div className="mx-auto max-w-[1440px]">
            <div className="max-w-3xl">
              <span className="font-mono text-xs font-semibold text-cyan-400 uppercase tracking-widest">
                Primary Offer
              </span>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl text-white">
                Help customers understand what you do—and how to reach you.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                We design and build websites around real customer behavior. Rather than cluttering
                the page with unnecessary complexity, we focus on four practical goals for the work:
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {websiteCreationGoals.map((goal, idx) => (
                <div
                  key={goal.id}
                  className="rounded-2xl border border-white/10 bg-black/50 p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="size-10 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 mb-4">
                      {idx === 0 && <Globe2 className="size-5" />}
                      {idx === 1 && <MonitorCheck className="size-5" />}
                      {idx === 2 && <Phone className="size-5" />}
                      {idx === 3 && <Smartphone className="size-5" />}
                    </div>
                    <h3 className="font-display text-xl font-bold text-white">{goal.title}</h3>
                    <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {goal.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* =========================================================================
                4. SOCIAL MEDIA SUPPORT (Supporting Services)
            ========================================================================= */}
            <div className="mt-16 pt-16 border-t border-white/10">
              <div className="max-w-2xl">
                <span className="font-mono text-xs font-semibold text-cyan-400 uppercase tracking-widest">
                  Additional Support
                </span>
                <h3 className="mt-2 font-display text-3xl sm:text-4xl text-white">
                  Social media advice & management
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  If you need assistance beyond website creation, we offer two concise supporting
                  services to keep your broader online presence consistent:
                </p>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {socialMediaServices.map((svc) => (
                  <div
                    key={svc.id}
                    className="rounded-2xl border border-white/10 bg-black/60 p-8 flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono text-xs text-cyan-400">Supporting Service</span>
                      <h4 className="mt-2 font-display text-2xl font-bold text-white">
                        {svc.title}
                      </h4>
                      <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                        {svc.description}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                      >
                        <span>Ask about {svc.title.toLowerCase()}</span>
                        <ArrowRight className="size-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. DEMONSTRATE THE DESIGN APPROACH (Honest Concept Demonstration)
        ========================================================================= */}
        <section
          id="approach-demo"
          className="chapter-scrim px-5 py-20 lg:px-12 lg:py-28 border-t border-white/10"
        >
          <div className="mx-auto max-w-[1440px]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-300">
                <Sparkles className="size-3 text-cyan-400" />
                <span>{conceptDemonstration.badge}</span>
              </div>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl text-white">
                How we structure a business website layout.
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-400 italic">
                {conceptDemonstration.notice}
              </p>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr] items-center">
              {/* Concept Wireframe / Layout Preview */}
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#070d18] p-5 sm:p-7 shadow-2xl">
                {/* Browser Top Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-red-400/70" />
                    <span className="size-2.5 rounded-full bg-amber-400/70" />
                    <span className="size-2.5 rounded-full bg-emerald-400/70" />
                  </div>
                  <span className="text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-none">
                    preview.novacraft.studio/commercial-contractor
                  </span>
                  <span className="text-cyan-300 font-medium text-[11px] rounded bg-cyan-400/10 px-2 py-0.5 border border-cyan-400/20">
                    Concept Preview
                  </span>
                </div>

                {/* Mockup Website Content */}
                <div className="mt-5 space-y-4 text-left">
                  {/* Mockup Header Navigation */}
                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded bg-cyan-500 flex items-center justify-center font-bold text-black text-xs">
                        A
                      </div>
                      <span className="font-semibold text-xs text-white">
                        Apex Electrical & Fitouts
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-slate-300 hidden sm:inline">Services</span>
                      <span className="text-[11px] text-slate-300 hidden sm:inline">
                        Compliance
                      </span>
                      <span className="rounded bg-cyan-400/20 px-2.5 py-1 text-[11px] font-mono text-cyan-300 border border-cyan-400/30">
                        Call (020) 8123 4567
                      </span>
                    </div>
                  </div>

                  {/* Mockup Hero Banner */}
                  <div className="rounded-xl border border-white/10 bg-gradient-to-r from-cyan-950/40 via-white/5 to-transparent p-5 space-y-2.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400 block font-semibold">
                      Commercial & Industrial Electrical Contractors
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
                      Electrical installations, fitouts & fast compliance certifications.
                    </h3>
                    <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                      Serving retail, commercial offices, and industrial properties with agreed
                      scopes and rapid turnaround.
                    </p>
                    <div className="flex flex-wrap gap-2.5 pt-1.5">
                      <span className="rounded bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-black">
                        Request Site Inspection
                      </span>
                      <span className="rounded border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-slate-200">
                        View Accreditations
                      </span>
                    </div>
                  </div>

                  {/* Mockup 3 Services Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div className="rounded-lg border border-white/10 bg-white/5 p-3.5 space-y-1">
                      <span className="font-semibold text-xs text-white block">
                        Commercial Fitouts
                      </span>
                      <p className="text-[11px] text-slate-300 leading-normal">
                        Full electrical design, power distribution & cabling.
                      </p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/5 p-3.5 space-y-1">
                      <span className="font-semibold text-xs text-white block">
                        24/7 Diagnostics
                      </span>
                      <p className="text-[11px] text-slate-300 leading-normal">
                        Rapid fault finding and emergency circuit rectifications.
                      </p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/5 p-3.5 space-y-1">
                      <span className="font-semibold text-xs text-white block">
                        Compliance & EICR
                      </span>
                      <p className="text-[11px] text-slate-300 leading-normal">
                        Statutory electrical inspections and safety reporting.
                      </p>
                    </div>
                  </div>

                  {/* Mockup Footer Trust Strip */}
                  <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/40 px-3.5 py-2 text-[11px] font-mono text-slate-300">
                    <span className="text-emerald-400">✓ Fixed-scope quote</span>
                    <span className="text-slate-400 hidden sm:inline">·</span>
                    <span className="text-cyan-300">✓ Direct engineer contact</span>
                    <span className="text-slate-400 hidden sm:inline">·</span>
                    <span className="text-slate-300">✓ Fully insured</span>
                  </div>
                </div>
              </div>

              {/* Explanations of Layout Choices */}
              <div className="space-y-6">
                <p className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                  Why this layout works for business prospects:
                </p>
                {conceptDemonstration.layoutPrinciples.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-white/10 bg-black/40 p-5"
                  >
                    <h4 className="font-semibold text-white text-base flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-cyan-400" />
                      <span>{item.title}</span>
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. SIMPLE APPROACH (3-Step Practical Process)
        ========================================================================= */}
        <section
          id="approach"
          className="chapter-scrim px-5 py-20 lg:px-12 lg:py-28 border-t border-white/10 scroll-mt-20"
        >
          <div className="mx-auto max-w-[1440px]">
            <div className="max-w-2xl">
              <span className="font-mono text-xs font-semibold text-cyan-400 uppercase tracking-widest">
                Our Approach
              </span>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl text-white">
                Start with your business and what you need.
              </h2>
              <p className="mt-3 text-base text-slate-300 leading-relaxed">
                We keep the collaboration simple, transparent, and direct:
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {approachSteps.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl border border-white/10 bg-black/60 p-8 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-sm font-bold text-cyan-400">{step.step}</span>
                    <h3 className="mt-4 font-display text-2xl font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Customer-facing agreement note */}
            <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-5 text-center sm:text-left">
              <p className="text-sm text-slate-300 font-medium">
                ✦ We’ll agree the scope and next steps before work begins.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. SHORT ABOUT SECTION
        ========================================================================= */}
        <section
          id="about"
          className="chapter-scrim px-5 py-20 lg:px-12 lg:py-28 border-t border-white/10 scroll-mt-20"
        >
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] items-center">
              <div>
                <span className="font-mono text-xs font-semibold text-cyan-400 uppercase tracking-widest">
                  About NovaCraft
                </span>
                <h2 className="mt-3 font-display text-4xl sm:text-5xl text-white">
                  Focused on clear digital presentation.
                </h2>
              </div>

              <div className="space-y-4 text-base text-slate-300 leading-relaxed">
                <p>
                  NovaCraft offers website creation and social media support for businesses
                  worldwide.
                </p>
                <p>
                  We believe a good website doesn’t need gimmickry or convoluted explanations. Its
                  primary job is to help potential clients understand your services, establish
                  confidence in your work, and make taking the next step effortless.
                </p>
                <p>
                  Whether you are launching your first website or modernizing an existing one, we
                  work directly with you to craft an online presence you are proud to share.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. CONTACT SECTION & INQUIRY FORM
        ========================================================================= */}
        <section
          id="contact"
          className="chapter-scrim px-5 py-20 lg:px-12 lg:py-28 border-t border-white/10 scroll-mt-20"
        >
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
              {/* Left Column: Direct Info & Explanation */}
              <div>
                <span className="font-mono text-xs font-semibold text-cyan-400 uppercase tracking-widest">
                  Get in Touch
                </span>
                <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl text-white">
                  Let’s talk about your website.
                </h2>
                <p className="mt-4 text-base text-slate-300 leading-relaxed">
                  Tell us about your business and what you would like to improve. You can also reply
                  to the email that brought you here.
                </p>

                {/* Direct Contact Channels */}
                <div className="mt-8 space-y-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5">
                    <span className="font-mono text-xs uppercase tracking-wider text-slate-300 block font-semibold">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${siteConfig.contactEmail}`}
                      className="mt-1 inline-flex items-center gap-2 font-mono text-base font-semibold text-cyan-300 hover:text-cyan-200 hover:underline"
                    >
                      <Mail className="size-4" />
                      <span>{siteConfig.contactEmail}</span>
                    </a>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5">
                    <span className="font-mono text-xs uppercase tracking-wider text-slate-300 block font-semibold">
                      Phone & Messaging
                    </span>
                    <a
                      href={siteConfig.telLink}
                      className="mt-1 inline-flex items-center gap-2 font-mono text-base font-semibold text-emerald-400 hover:text-emerald-300 hover:underline"
                    >
                      <Phone className="size-4" />
                      <span>{siteConfig.phoneFormatted}</span>
                    </a>
                    <p className="mt-1 text-xs text-slate-300">
                      Available for WhatsApp & calls worldwide
                    </p>
                  </div>
                </div>

                {/* Privacy Notice with Clear Contrast */}
                <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <span className="text-cyan-300 font-semibold">✦ Privacy notice:</span> We only use
                  your details to review and reply to your inquiry. We do not share your information
                  or send unsolicited marketing.
                </div>
              </div>

              {/* Right Column: Practical Short Form */}
              <div>
                {submitted ? (
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 sm:p-12 text-center">
                    <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                      <CheckCircle2 className="size-8" />
                    </div>
                    <h3 className="mt-6 font-display text-3xl font-bold text-white">
                      Thank you! Your inquiry has been sent.
                    </h3>
                    <p className="mt-4 text-sm text-slate-200 max-w-md mx-auto leading-relaxed">
                      We have received your details and will review your inquiry. You can also reply
                      directly to the email that brought you to NovaCraft.
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
                    className="rounded-2xl border border-white/15 bg-black/80 p-6 sm:p-10 shadow-xl space-y-6"
                  >
                    {serverError && (
                      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                        {serverError}
                      </div>
                    )}

                    {/* Name: required */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-200"
                      >
                        Your Name <span className="text-cyan-400">*</span>
                      </Label>
                      <Input
                        id="name"
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
                        <p className="text-xs text-red-400 font-medium">{errors.name}</p>
                      )}
                    </div>

                    {/* Email: required */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-200"
                      >
                        Email Address <span className="text-cyan-400">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
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
                        <p className="text-xs text-red-400 font-medium">{errors.email}</p>
                      )}
                    </div>

                    {/* Business Name: optional */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="businessName"
                        className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-200"
                      >
                        Business Name{" "}
                        <span className="text-slate-400 font-normal normal-case">(optional)</span>
                      </Label>
                      <Input
                        id="businessName"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g. Morgan Craft Services"
                        className="border-white/20 bg-white/5 text-white placeholder:text-slate-400"
                      />
                    </div>

                    {/* Current website or social profile: optional */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="currentWebsiteOrProfile"
                        className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-200"
                      >
                        Current website or social profile{" "}
                        <span className="text-slate-400 font-normal normal-case">(optional)</span>
                      </Label>
                      <Input
                        id="currentWebsiteOrProfile"
                        value={formData.currentWebsiteOrProfile}
                        onChange={(e) =>
                          setFormData({ ...formData, currentWebsiteOrProfile: e.target.value })
                        }
                        placeholder="e.g. instagram.com/mybusiness or yoursite.com"
                        className="border-white/20 bg-white/5 text-white placeholder:text-slate-400"
                      />
                    </div>

                    {/* What do you need help with?: required */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="helpNeeded"
                        className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-200"
                      >
                        What do you need help with? <span className="text-cyan-400">*</span>
                      </Label>
                      <Textarea
                        id="helpNeeded"
                        rows={4}
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
                        <p className="text-xs text-red-400 font-medium">{errors.helpNeeded}</p>
                      )}
                    </div>

                    {/* Honeypot field (hidden from real users) */}
                    <div className="hidden" aria-hidden="true">
                      <Label htmlFor="website">Leave empty</Label>
                      <Input
                        id="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full h-12 bg-cyan-500 text-black hover:bg-cyan-400 font-semibold text-base transition-all"
                    >
                      {submitting ? "Sending inquiry..." : "Send inquiry"}
                    </Button>

                    <p className="text-center text-xs sm:text-sm text-slate-300 font-medium">
                      We’ll agree the scope and next steps before work begins.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
