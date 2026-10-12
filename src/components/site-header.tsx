import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, Menu, Phone, Sparkles, X } from "lucide-react";
import { useState } from "react";

import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 lg:px-10">
        {/* Brand Logo */}
        <Link
          to="/"
          className="group flex items-center transition-opacity hover:opacity-95"
          aria-label="NovaCraft Studio Home"
        >
          <BrandLogo size="md" withTagline />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          <Link
            to="/services"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            activeProps={{ className: "text-primary font-semibold" }}
          >
            Services
          </Link>
          <Link
            to="/"
            hash="showcase"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
          >
            Selected Works
          </Link>
          <Link
            to="/process"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            activeProps={{ className: "text-primary font-semibold" }}
          >
            Process
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            activeProps={{ className: "text-primary font-semibold" }}
          >
            About Studio
          </Link>
        </nav>

        {/* Availability Badge, Phone Link & CTA Button */}
        <div className="hidden items-center gap-4 sm:flex">
          <a
            href={siteConfig.telLink}
            className="hidden items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-cyan-400 transition-colors xl:flex"
            title="Call NovaCraft Studio"
          >
            <Phone className="size-3 text-cyan-400" />
            <span>{siteConfig.phoneFormatted}</span>
          </a>

          <div className="hidden items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-xs lg:flex">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
            </span>
            <span>{siteConfig.availabilityStatus}</span>
          </div>

          <Button
            asChild
            size="default"
            className="shadow-sm bg-cyan-500 text-black hover:bg-cyan-400 font-semibold"
          >
            <Link to="/contact">
              <span>Start Project</span>
              <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </Button>
      </div>

      {/* Mobile Navigation Drawer */}
      {open && (
        <nav
          className="border-t border-border bg-background/98 px-6 py-8 backdrop-blur-xl lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="size-3.5 text-accent" />
              <span>{siteConfig.availabilityStatus}</span>
            </div>

            <div className="flex flex-col divide-y divide-border/60">
              <Link
                to="/services"
                onClick={() => setOpen(false)}
                className="py-3.5 font-display text-3xl font-medium tracking-tight text-foreground transition-colors hover:text-primary"
              >
                Services
              </Link>
              <Link
                to="/"
                hash="showcase"
                onClick={() => setOpen(false)}
                className="py-3.5 font-display text-3xl font-medium tracking-tight text-foreground transition-colors hover:text-primary"
              >
                Selected Works
              </Link>
              <Link
                to="/process"
                onClick={() => setOpen(false)}
                className="py-3.5 font-display text-3xl font-medium tracking-tight text-foreground transition-colors hover:text-primary"
              >
                Process
              </Link>
              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className="py-3.5 font-display text-3xl font-medium tracking-tight text-foreground transition-colors hover:text-primary"
              >
                About Studio
              </Link>
            </div>

            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="w-full bg-cyan-500 text-black hover:bg-cyan-400 font-semibold"
              >
                <Link to="/contact" onClick={() => setOpen(false)}>
                  Request a Quote <ArrowUpRight className="ml-1.5 size-4" />
                </Link>
              </Button>
            </div>

            <div className="border-t border-border pt-4 space-y-2 text-xs text-muted-foreground">
              <p className="flex items-center gap-2">
                <Mail className="size-3.5 text-cyan-400 shrink-0" />
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="font-mono text-foreground hover:text-cyan-400 transition-colors"
                >
                  {siteConfig.contactEmail}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-3.5 text-emerald-400 shrink-0" />
                <a
                  href={siteConfig.telLink}
                  className="font-mono text-foreground hover:text-cyan-400 transition-colors"
                >
                  {siteConfig.phoneFormatted}
                </a>
              </p>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
