import { cn } from "@/lib/utils";

export function Logo({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const heights = { sm: 36, md: 44, lg: 52 } as const;
  const h = heights[size];

  return (
    <span className={cn("inline-flex shrink-0 items-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/lougha-plus-logo.png"
        alt="LOUGHA PLUS"
        width={h * 2.2}
        height={h}
        className="w-auto object-contain"
        style={{ height: h }}
        loading="eager"
        decoding="async"
      />
    </span>
  );
}
