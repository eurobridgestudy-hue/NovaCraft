import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withTagline?: boolean;
  inverted?: boolean;
}

export function BrandLogo({
  className,
  size = "md",
  withTagline = false,
  inverted = false,
}: BrandLogoProps) {
  const iconSizeClasses = {
    sm: "size-8",
    md: "size-10",
    lg: "size-12",
  };

  const textClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <div className={cn("inline-flex items-center gap-3 select-none", className)}>
      {/* Geometric Modern Craft Emblem */}
      <div
        className={cn(
          "relative flex items-center justify-center rounded-xl p-1.5 transition-all duration-300",
          iconSizeClasses[size],
          inverted
            ? "border border-background/20 bg-background/10 text-background backdrop-blur-md"
            : "border border-border/80 bg-card/90 text-foreground shadow-sm shadow-black/30 group-hover:border-primary/60 group-hover:shadow-[0_0_25px_-5px_rgba(99,102,241,0.4)]",
        )}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-full"
          aria-hidden="true"
        >
          {/* Subtle background glow */}
          <circle cx="20" cy="20" r="16" fill="currentColor" fillOpacity="0.08" />

          {/* Stylized 'N' combined with geometric craft prism */}
          <path
            d="M12 28V12L21 28V12"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Luminous Nova star accent */}
          <path
            d="M27 15L28.2 18.8L32 20L28.2 21.2L27 25L25.8 21.2L22 20L25.8 18.8L27 15Z"
            className="fill-accent filter drop-shadow-[0_0_8px_rgba(255,100,50,0.6)]"
          />
          <circle cx="12" cy="12" r="1.75" className="fill-primary" />
          <circle cx="21" cy="28" r="1.75" className="fill-primary" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <span
          className={cn(
            "font-display tracking-tight leading-none",
            textClasses[size],
            inverted ? "text-background" : "text-foreground",
          )}
        >
          Nova<span className="text-primary font-sans font-semibold tracking-normal">Craft</span>
          <span className="text-accent font-serif">.</span>
        </span>
        {withTagline && (
          <span
            className={cn(
              "text-[0.625rem] font-semibold tracking-[0.18em] uppercase mt-0.5",
              inverted ? "text-background/60" : "text-muted-foreground",
            )}
          >
            Website Design Studio
          </span>
        )}
      </div>
    </div>
  );
}
