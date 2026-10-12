import { Link } from "@tanstack/react-router";
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-[1440px] px-5 py-16 lg:px-10 lg:py-24">
        {/* Top Grid */}
        <div className="grid gap-12 border-b border-background/15 pb-16 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          {/* Brand Col */}
          <div className="flex flex-col justify-between">
            <div>
              <Link to="/" className="inline-block" aria-label="NovaCraft Studio Home">
                <BrandLogo size="lg" inverted withTagline />
              </Link>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-background/70">
                A boutique website design and digital craft studio. We partner with ambitious
                founders and teams worldwide to build bespoke, high-converting digital flagships.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs text-background/50">
              <MapPin className="size-3.5 text-accent" />
              <span>Global Studio & Remote Operations</span>
            </div>
          </div>

          {/* Services Col */}
          <div className="flex flex-col gap-3.5 text-sm">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-background/40">
              Expertise
            </p>
            <Link
              to="/services"
              className="text-background/80 transition-colors hover:text-background hover:translate-x-1"
            >
              Bespoke Web Design
            </Link>
            <Link
              to="/services"
              className="text-background/80 transition-colors hover:text-background hover:translate-x-1"
            >
              Web Engineering & React
            </Link>
            <Link
              to="/services"
              className="text-background/80 transition-colors hover:text-background hover:translate-x-1"
            >
              Brand Identity Systems
            </Link>
            <Link
              to="/services"
              className="text-background/80 transition-colors hover:text-background hover:translate-x-1"
            >
              Social Media Strategy
            </Link>
            <Link
              to="/services"
              className="text-background/80 transition-colors hover:text-background hover:translate-x-1"
            >
              Performance & SEO Audits
            </Link>
          </div>

          {/* Navigation Col */}
          <div className="flex flex-col gap-3.5 text-sm">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-background/40">
              Studio
            </p>
            <Link
              to="/about"
              className="text-background/80 transition-colors hover:text-background hover:translate-x-1"
            >
              About NovaCraft
            </Link>
            <Link
              to="/process"
              className="text-background/80 transition-colors hover:text-background hover:translate-x-1"
            >
              Our 5-Step Process
            </Link>
            <Link
              to="/"
              hash="showcase"
              className="text-background/80 transition-colors hover:text-background hover:translate-x-1"
            >
              Selected Works
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-accent transition-colors hover:underline"
            >
              Request a Quote <ArrowUpRight className="size-3.5" />
            </Link>
          </div>

          {/* Contact Box */}
          <div className="flex flex-col justify-between rounded-xl border border-background/15 bg-background/5 p-6 backdrop-blur-xs">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-medium text-accent">
                <Sparkles className="size-3.5" />
                <span>Ready to elevate your digital presence?</span>
              </div>
              <h4 className="mt-3 font-display text-2xl text-background">
                Let’s talk about your next project.
              </h4>
              <p className="mt-2 text-xs text-background/70">Direct studio contacts:</p>
              <div className="mt-2.5 flex flex-col gap-2">
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="inline-flex items-center gap-2 font-mono text-sm text-background transition-colors hover:text-accent"
                >
                  <Mail className="size-3.5 text-primary" />
                  {siteConfig.contactEmail}
                </a>
                <a
                  href={siteConfig.telLink}
                  className="inline-flex items-center gap-2 font-mono text-sm text-background transition-colors hover:text-accent"
                >
                  <Phone className="size-3.5 text-emerald-400" />
                  {siteConfig.phoneFormatted}
                </a>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-[0.7rem] text-background/50">
              <ShieldCheck className="size-3.5 text-emerald-400" />
              <span>Direct studio response within 24 hours</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-6 sm:flex-row text-xs text-background/50">
          <p>
            © {new Date().getFullYear()} {siteConfig.name} Studio. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span>Precision UI & Performance</span>
            <span>•</span>
            <span>Zero Bloat Guarantee</span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 rounded-full border border-background/20 px-3 py-1.5 text-background/70 transition-all hover:border-background hover:text-background"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="size-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
