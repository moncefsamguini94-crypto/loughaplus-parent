import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeVariant = "free" | "urgency" | "proof" | "soft";

const variants: Record<BadgeVariant, string> = {
  free: "bg-action-100 text-action-600",
  urgency: "bg-[#FFF4E0] text-warning",
  proof: "bg-brand-100 text-brand-700",
  soft: "bg-white/15 text-white",
};

export function Badge({
  children,
  variant = "soft",
  withDot = false,
  className,
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  withDot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-xs font-semibold",
        variants[variant],
        className,
      )}
    >
      {withDot ? (
        <span className="size-1.5 animate-pulse-dot rounded-full bg-current" />
      ) : null}
      {children}
    </span>
  );
}
