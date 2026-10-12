import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-border px-5 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1fr_2fr]">
        <p className="eyebrow">{eyebrow}</p>
        <div>
          <h1 className="max-w-5xl font-display text-6xl leading-[0.92] sm:text-7xl lg:text-8xl">
            {title}
          </h1>
          <div className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">{children}</div>
        </div>
      </div>
    </section>
  );
}
