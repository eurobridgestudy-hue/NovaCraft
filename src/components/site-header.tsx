import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Mail, Menu, Phone, X } from "lucide-react";
import { useState } from "react";

import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const routerState = useRouterState();
  const isHome = routerState.location.pathname === "/";

  // Section links work seamlessly from home (in-page hash) and subpages (/#section)
  const navItems = [
    { label: "Services", to: isHome ? "#services" : "/#services" },
    { label: "Approach", to: isHome ? "#approach" : "/#approach" },
    { label: "About", to: isHome ? "#about" : "/#about" },
    { label: "Contact", to: isHome ? "#contact" : "/#contact" },
  ];

  const contactTarget = isHome ? "#contact" : "/#contact";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    if (isHome && target.startsWith("#")) {
      const id = target.slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        const y = el.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top: y, behavior: "smooth" });
        window.history.pushState(null, "", target);
        setOpen(false);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#03060a]/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 lg:px-10">
        {/* NovaCraft Wordmark */}
        <Link
          to="/"
          className="group flex items-center transition-opacity hover:opacity-95"
          aria-label="NovaCraft Home"
        >
          <BrandLogo size="md" />
        </Link>

        {/* Desktop Navigation: Services · Approach · About · Contact */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.to}
              onClick={(e) => handleNavClick(e, item.to)}
              className="text-sm font-medium text-slate-200 transition-colors hover:text-cyan-400"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Phone Contact & Primary CTA Button */}
        <div className="hidden items-center gap-5 sm:flex">
          <a
            href={siteConfig.telLink}
            className="hidden items-center gap-2 font-mono text-xs font-medium text-slate-300 hover:text-cyan-300 transition-colors xl:flex"
            title="Call NovaCraft direct"
          >
            <Phone className="size-3.5 text-cyan-400" />
            <span>{siteConfig.phoneFormatted}</span>
          </a>

          <Button
            asChild
            size="default"
            className="bg-cyan-500 text-black hover:bg-cyan-400 font-semibold shadow-sm transition-all"
          >
            <a href={contactTarget} onClick={(e) => handleNavClick(e, contactTarget)}>
              <span>Discuss your website</span>
              <ArrowRight className="ml-1.5 size-4" />
            </a>
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-slate-300 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </Button>
      </div>

      {/* Accessible Mobile Drawer */}
      {open && (
        <nav
          className="border-t border-white/10 bg-[#050a12]/98 px-6 py-8 backdrop-blur-2xl lg:hidden"
          aria-label="Mobile navigation menu"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col divide-y divide-white/10">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.to}
                  onClick={(e) => handleNavClick(e, item.to)}
                  className="py-3.5 font-display text-2xl font-medium tracking-tight text-slate-100 hover:text-cyan-400 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="w-full bg-cyan-500 text-black hover:bg-cyan-400 font-semibold text-base"
              >
                <a
                  href={contactTarget}
                  onClick={(e) => {
                    handleNavClick(e, contactTarget);
                    setOpen(false);
                  }}
                >
                  <span>Discuss your website</span>
                  <ArrowRight className="ml-2 size-4" />
                </a>
              </Button>
            </div>

            {/* Direct Contact Links */}
            <div className="border-t border-white/10 pt-4 space-y-2.5 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <Mail className="size-3.5 text-cyan-400 shrink-0" />
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="font-mono hover:text-white transition-colors"
                >
                  {siteConfig.contactEmail}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-3.5 text-emerald-400 shrink-0" />
                <a
                  href={siteConfig.telLink}
                  className="font-mono hover:text-white transition-colors"
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
