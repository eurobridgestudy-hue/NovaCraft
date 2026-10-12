import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUp, ArrowRight, Mail, Phone } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const routerState = useRouterState();
  const isHome = routerState.location.pathname === "/";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Services", to: isHome ? "#services" : "/#services" },
    { label: "Approach", to: isHome ? "#approach" : "/#approach" },
    { label: "About", to: isHome ? "#about" : "/#about" },
    { label: "Contact", to: isHome ? "#contact" : "/#contact" },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#020509] text-slate-300">
      <div className="mx-auto max-w-[1440px] px-5 py-16 lg:px-10 lg:py-20">
        {/* Top Grid */}
        <div className="grid gap-12 border-b border-white/10 pb-16 lg:grid-cols-[1.6fr_1fr_1.4fr]">
          {/* Brand Col */}
          <div className="flex flex-col justify-between">
            <div>
              <Link to="/" className="inline-block" aria-label="NovaCraft Home">
                <BrandLogo size="md" />
              </Link>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
                NovaCraft creates clear, professional websites that explain your services and make
                it easy for customers to contact you. We also provide social media advice and
                management for businesses worldwide.
              </p>
            </div>

            <p className="mt-6 text-xs text-slate-500">{siteConfig.audience}</p>
          </div>

          {/* Navigation Col: Services · Approach · About · Contact */}
          <div className="flex flex-col gap-3 text-sm">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-500">
              Navigation
            </p>
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.to}
                className="text-slate-300 transition-colors hover:text-cyan-400"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Direct Contact Box */}
          <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xs">
            <div>
              <h4 className="font-display text-2xl text-white">Let’s talk about your website.</h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Tell us about your business and what you would like to improve.
              </p>

              <div className="mt-4 flex flex-col gap-2.5">
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="inline-flex items-center gap-2 font-mono text-sm text-slate-200 transition-colors hover:text-cyan-400"
                >
                  <Mail className="size-3.5 text-cyan-400" />
                  <span>{siteConfig.contactEmail}</span>
                </a>
                <a
                  href={siteConfig.telLink}
                  className="inline-flex items-center gap-2 font-mono text-sm text-slate-200 transition-colors hover:text-cyan-400"
                >
                  <Phone className="size-3.5 text-emerald-400" />
                  <span>{siteConfig.phoneFormatted}</span>
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
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

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NovaCraft. All rights reserved.</p>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Websites for Businesses</span>
            <span>•</span>
            <span>Social Media Support</span>
            <span>•</span>
            <Link
              to="/admin"
              className="text-slate-500 hover:text-cyan-400 transition-colors"
              title="Admin Portal"
            >
              Admin
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-slate-400 transition-all hover:border-white/40 hover:text-white"
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
