import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "start" | "center";
  tone?: "light" | "dark";
  id?: string;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = "center",
  tone = "light",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-[0.12em]",
            tone === "dark" ? "text-brand-300" : "text-brand-500",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={cn(
          "text-balance text-[28px] font-bold leading-[1.2] tracking-tight md:text-[40px] md:leading-[1.15]",
          tone === "dark" ? "text-white" : "text-brand-900",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-[17px] leading-8 md:text-[18px]",
            tone === "dark" ? "text-white/70" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
