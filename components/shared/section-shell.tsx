import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionShellProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Visual tone of the section background */
  tone?: "default" | "muted" | "dark";
  /** Remove default vertical padding when composing custom layouts */
  flush?: boolean;
  "aria-labelledby"?: string;
}

const toneClasses: Record<NonNullable<SectionShellProps["tone"]>, string> = {
  default: "bg-background text-foreground",
  muted: "bg-muted text-foreground",
  dark: "bg-brand-900 text-white",
};

export function SectionShell({
  id,
  children,
  className,
  tone = "default",
  flush = false,
  ...rest
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(toneClasses[tone], !flush && "section-shell", className)}
      {...rest}
    >
      <div className="container">{children}</div>
    </section>
  );
}
