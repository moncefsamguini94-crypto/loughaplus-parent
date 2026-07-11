import { cn } from "@/lib/utils";

export function Logo({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const heights = { sm: 40, md: 48, lg: 56 } as const;
  const h = heights[size];

  return (
    <span className={cn("inline-flex shrink-0 items-center justify-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/lougha-plus-logo.png"
        alt="LOUGHA PLUS — language courses"
        width={Math.round(h * 3.2)}
        height={h}
        className="w-auto max-w-[220px] object-contain object-center md:max-w-[260px]"
        style={{ height: h }}
        loading="eager"
        decoding="async"
      />
    </span>
  );
}
