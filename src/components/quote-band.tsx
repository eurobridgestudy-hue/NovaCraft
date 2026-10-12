import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function QuoteBand() {
  return (
    <section className="relative overflow-hidden bg-[#070d18] border-y border-white/10 px-5 py-20 text-white lg:px-10 lg:py-24">
      {/* Background ambient accents */}
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <div className="absolute -left-20 -top-20 size-96 rounded-full bg-cyan-500 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 size-96 rounded-full bg-indigo-500 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Next Steps
          </span>

          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl text-white">
            Ready to discuss your website?
          </h2>

          <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-slate-300">
            Tell us about your business and what you would like to improve. We’ll discuss the scope
            and agree the next steps before work begins.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-cyan-400" />
              <span>Clear service explanation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-cyan-400" />
              <span>Agreed scope before work</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-cyan-400" />
              <span>Direct communication</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
          <Button
            asChild
            size="lg"
            className="h-14 px-8 text-base bg-cyan-500 text-black font-semibold hover:bg-cyan-400 shadow-lg shadow-cyan-500/20"
          >
            <a href="/#contact">
              <span>Discuss your website</span>
              <ArrowRight className="ml-2 size-5" />
            </a>
          </Button>
          <span className="text-xs text-slate-400">
            Or reply directly to the email that brought you here
          </span>
        </div>
      </div>
    </section>
  );
}
