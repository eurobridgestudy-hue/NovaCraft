import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  Cookie,
  FileText,
  Globe2,
  Lock,
  Mail,
  Phone,
  Scale,
  Shield,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { siteConfig } from "@/lib/site-config";

type PolicyType = "privacy" | "terms" | "cookies" | "data-rights" | null;

export function SiteFooter() {
  const routerState = useRouterState();
  const isHome = routerState.location.pathname === "/";
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Website Creation", to: isHome ? "#services" : "/#services" },
    { label: "Social Media Services", to: isHome ? "#services" : "/#services" },
    { label: "Our Approach", to: isHome ? "#approach" : "/#approach" },
    { label: "About NovaCraft", to: "/about" },
    { label: "Direct Inquiries", to: isHome ? "#contact" : "/#contact" },
  ];

  return (
    <>
      <footer className="relative border-t border-white/10 bg-[#020509] text-slate-300 overflow-hidden">
        {/* Subtle Ambient Radial Lighting in Footer */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[800px] rounded-full bg-gradient-to-b from-cyan-500/10 via-cyan-500/3 to-transparent blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1440px] px-5 py-16 lg:px-12 lg:py-20">
          {/* Main 4-Column Grid */}
          <div className="grid gap-12 border-b border-white/10 pb-16 lg:grid-cols-[1.5fr_1fr_1.1fr_1.4fr]">
            {/* Column 1: Studio Identity & Global Scope */}
            <div className="flex flex-col justify-between">
              <div>
                <Link to="/" className="inline-block" aria-label="NovaCraft Home">
                  <BrandLogo size="md" />
                </Link>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
                  NovaCraft builds clear, high-impact websites that explain your services and make
                  it effortless for prospective customers to contact you. Backed by strategic social
                  media advice and management for businesses worldwide.
                </p>

                {/* Worldwide Scope Badge */}
                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-cyan-300 backdrop-blur-xs">
                  <span className="size-2 rounded-full bg-emerald-400" />
                  <span>Digital Services • Worldwide</span>
                </div>
              </div>

              {/* Direct Reach */}
              <div className="mt-8 flex flex-col gap-2.5 text-xs font-mono text-slate-400">
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-cyan-400"
                >
                  <Mail className="size-3.5 text-cyan-400" />
                  <span>{siteConfig.contactEmail}</span>
                </a>
                <a
                  href={siteConfig.telLink}
                  className="inline-flex items-center gap-2 transition-colors hover:text-cyan-400"
                >
                  <Phone className="size-3.5 text-emerald-400" />
                  <span>Call NovaCraft: {siteConfig.phoneFormatted}</span>
                </a>
              </div>
            </div>

            {/* Column 2: Navigation & Services */}
            <div className="flex flex-col gap-3 text-sm">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
                Navigation
              </p>
              <div className="flex flex-col gap-2.5 pt-1">
                {navLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.to}
                    className="text-slate-300 transition-colors hover:text-cyan-400 text-sm"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3: Legal & Governance */}
            <div className="flex flex-col gap-3 text-sm">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
                Policies & Legal
              </p>
              <div className="flex flex-col gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setActivePolicy("privacy")}
                  className="text-left text-slate-300 transition-colors hover:text-cyan-400 text-sm flex items-center justify-between group"
                >
                  <span>Privacy Policy</span>
                  <span className="text-[11px] font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">
                    Data Handling
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActivePolicy("terms")}
                  className="text-left text-slate-300 transition-colors hover:text-cyan-400 text-sm flex items-center justify-between group"
                >
                  <span>Terms of Engagement</span>
                  <span className="text-[11px] font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">
                    Scope & Terms
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActivePolicy("cookies")}
                  className="text-left text-slate-300 transition-colors hover:text-cyan-400 text-sm flex items-center justify-between group"
                >
                  <span>Cookie Notice</span>
                  <span className="text-[11px] font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">
                    Essential Storage
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActivePolicy("data-rights")}
                  className="text-left text-slate-300 transition-colors hover:text-cyan-400 text-sm flex items-center justify-between group"
                >
                  <span>Data Protection</span>
                  <span className="text-[11px] font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">
                    Inquiry Handling
                  </span>
                </button>

                <div className="pt-2">
                  <Link
                    to="/privacy"
                    className="text-xs text-slate-500 hover:text-slate-300 transition-colors inline-block"
                  >
                    View full policy page →
                  </Link>
                </div>
              </div>
            </div>

            {/* Column 4: Direct Project Inquiries */}
            <div className="flex flex-col justify-between rounded-2xl border border-cyan-500/25 bg-[#050a14]/80 p-6 backdrop-blur-md shadow-xl shadow-cyan-950/20">
              <div>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                  Direct Inquiries
                </span>
                <h4 className="mt-2 font-display text-2xl text-white">
                  Let’s talk about your website.
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Tell us about your business and what you would like to improve. We agree scope in
                  writing before any work begins.
                </p>

                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="inline-flex items-center gap-2 font-mono text-xs text-slate-200 transition-colors hover:text-cyan-400"
                  >
                    <Mail className="size-3.5 text-cyan-400" />
                    <span>{siteConfig.contactEmail}</span>
                  </a>
                  <a
                    href={siteConfig.telLink}
                    className="inline-flex items-center gap-2 font-mono text-xs text-slate-200 transition-colors hover:text-cyan-400"
                  >
                    <Phone className="size-3.5 text-emerald-400" />
                    <span>Call NovaCraft: {siteConfig.phoneFormatted}</span>
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <a
                  href={isHome ? "#contact" : "/#contact"}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Discuss your website</span>
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Legal Rights & Prominent Admin Panel Button */}
          <div className="mt-10 flex flex-col items-center justify-between gap-6 sm:flex-row text-xs text-slate-400">
            {/* Left: Copyright & Rights */}
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-slate-300 font-medium">
                © {new Date().getFullYear()} NovaCraft. All rights reserved.
              </p>
              <p className="text-[11px] text-slate-500 max-w-xl leading-relaxed">
                All proprietary website designs, code architectures, visual trademarks, and media
                assets are protected under intellectual property law.
              </p>
            </div>

            {/* Right: Dedicated Admin Portal & Back to Top */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Located clearly in bottom of site footer as requested */}
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1.5 text-xs font-mono font-medium text-cyan-300 shadow-sm transition-all hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white"
                title="Studio Admin Portal"
              >
                <Shield className="size-3.5 text-cyan-400" />
                <span>Admin Panel</span>
              </Link>

              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition-all hover:border-white/40 hover:text-white"
                aria-label="Back to top"
              >
                <span>Back to top</span>
                <ArrowUp className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          INTERACTIVE LEGAL POLICY DIALOGS (Zero page jump, instant reading)
      ========================================================================= */}
      <Dialog open={activePolicy !== null} onOpenChange={(open) => !open && setActivePolicy(null)}>
        <DialogContent className="max-w-2xl border-white/15 bg-[#040813] text-slate-100 shadow-2xl shadow-cyan-950/50 max-h-[85vh] overflow-y-auto">
          {activePolicy === "privacy" && (
            <div>
              <DialogHeader>
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                  <ShieldCheck className="size-4" />
                  <span>DATA & PRIVACY</span>
                </div>
                <DialogTitle className="font-display text-2xl text-white mt-1">
                  NovaCraft Privacy Policy
                </DialogTitle>
                <DialogDescription className="text-slate-400 text-xs">
                  Applicable to all visitors and client inquiries.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/10 pt-4">
                <div>
                  <h4 className="font-semibold text-white">1. Voluntary Information Gathering</h4>
                  <p className="mt-1">
                    We collect only information submitted voluntarily via our website inquiry form,
                    direct email ({siteConfig.contactEmail}), or telephone (
                    {siteConfig.phoneFormatted}). This includes your name, contact email, business
                    name, project requirements, and any optional website URLs.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-white">2. Business Purpose</h4>
                  <p className="mt-1">
                    Your details are used solely to assess your website scope, discuss project
                    requirements, and communicate directly regarding web design or social media
                    services. We do not sell or share your contact details.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-white">3. Storage & Access</h4>
                  <p className="mt-1">
                    Inquiry submissions are received by our server and accessed by NovaCraft to
                    review and reply. Submissions are private and accessible only through our
                    authenticated dashboard.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-white">4. Your Right to Erasure</h4>
                  <p className="mt-1">
                    You may request a copy or permanent deletion of your inquiry messages at any
                    time by emailing{" "}
                    <a
                      href={`mailto:${siteConfig.contactEmail}`}
                      className="text-cyan-400 underline"
                    >
                      {siteConfig.contactEmail}
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          )}

          {activePolicy === "terms" && (
            <div>
              <DialogHeader>
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                  <Scale className="size-4" />
                  <span>COMMERCIAL TERMS</span>
                </div>
                <DialogTitle className="font-display text-2xl text-white mt-1">
                  Terms of Engagement
                </DialogTitle>
                <DialogDescription className="text-slate-400 text-xs">
                  Guidelines for website and social media projects.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/10 pt-4">
                <div>
                  <h4 className="font-semibold text-white">1. Scope Agreed Before Work Begins</h4>
                  <p className="mt-1">
                    NovaCraft operates on written scope agreements. Deliverables, page counts,
                    milestones, and financial terms are documented and confirmed in writing prior to
                    commencing production.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-white">2. Intellectual Property & Scope</h4>
                  <p className="mt-1">
                    Ownership of deliverables, custom designs, and website code is confirmed in
                    writing as part of the project agreement upon completion.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-white">3. Review Checkpoints & Testing</h4>
                  <p className="mt-1">
                    All website projects include structured revision checkpoints and testing across
                    modern devices before final deployment.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-white">4. Client Materials</h4>
                  <p className="mt-1">
                    Clients are responsible for ensuring that all logos, trademarks, and photography
                    provided for incorporation are owned or properly licensed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activePolicy === "cookies" && (
            <div>
              <DialogHeader>
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                  <Cookie className="size-4" />
                  <span>COOKIES & STORAGE</span>
                </div>
                <DialogTitle className="font-display text-2xl text-white mt-1">
                  Cookie & Tracking Notice
                </DialogTitle>
                <DialogDescription className="text-slate-400 text-xs">
                  Technical disclosure of browser storage usage.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/10 pt-4">
                <div>
                  <h4 className="font-semibold text-white">1. No Advertising Trackers</h4>
                  <p className="mt-1">
                    NovaCraft does not use third-party advertising cookies, behavioural tracking
                    pixels, or cross-site profiling scripts.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-white">2. Visual Rendering</h4>
                  <p className="mt-1">
                    Our 3D visual background runs directly in your browser using Three.js and
                    hardware acceleration. No visitor telemetry or personal data is collected from
                    this visual.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-white">3. Essential Functional Storage</h4>
                  <p className="mt-1">
                    Standard browser storage is used solely for necessary operational functions,
                    such as admin login session authentication.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activePolicy === "data-rights" && (
            <div>
              <DialogHeader>
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                  <Shield className="size-4" />
                  <span>INQUIRY HANDLING</span>
                </div>
                <DialogTitle className="font-display text-2xl text-white mt-1">
                  Data Protection & Inquiries
                </DialogTitle>
                <DialogDescription className="text-slate-400 text-xs">
                  How we process and protect client communications.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/10 pt-4">
                <div>
                  <h4 className="font-semibold text-white">1. Submission Processing</h4>
                  <p className="mt-1">
                    Inquiry submissions are delivered through server functions and stored for
                    customer communication. Submissions are accessible only through our
                    password-protected admin dashboard.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-white">2. Spam Filtering</h4>
                  <p className="mt-1">
                    We use an invisible honeypot field to filter automated spam without interrupting
                    genuine business visitors.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-white">3. Direct Contact</h4>
                  <p className="mt-1">
                    For any questions regarding stored inquiries, contact our studio directly at{" "}
                    <a
                      href={`mailto:${siteConfig.contactEmail}`}
                      className="text-cyan-400 underline"
                    >
                      {siteConfig.contactEmail}
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
