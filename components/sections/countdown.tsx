"use client";

import { useEffect, useState } from "react";
import { countdown } from "@/lib/content";
import { cn } from "@/lib/utils";

/** End of the current week (Sunday 23:59:59 local) → rolling "this week only". */
function endOfWeek(): number {
  const now = new Date();
  const end = new Date(now);
  const daysUntilSunday = (7 - now.getDay()) % 7; // 0 = Sunday
  end.setDate(now.getDate() + daysUntilSunday);
  end.setHours(23, 59, 59, 999);
  if (end.getTime() <= now.getTime()) end.setDate(end.getDate() + 7);
  return end.getTime();
}

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export function Countdown({
  variant = "light",
  className,
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  // Avoid hydration mismatch: compute on the client after mount.
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const target = endOfWeek();
    const tick = () => setRemaining(target - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const p = parts(remaining ?? 0);
  const items = [
    { value: p.days, label: countdown.labels.days },
    { value: p.hours, label: countdown.labels.hours },
    { value: p.minutes, label: countdown.labels.minutes },
    { value: p.seconds, label: countdown.labels.seconds },
  ];

  const box =
    variant === "dark"
      ? "bg-white/10 text-white"
      : "bg-brand-900 text-white";
  const labelColor = variant === "dark" ? "text-white/70" : "text-muted-foreground";

  return (
    <div className={cn("text-center", className)}>
      <p
        className={cn(
          "text-[13px] font-semibold",
          variant === "dark" ? "text-white/80" : "text-brand-700",
        )}
      >
        {countdown.heading}
      </p>
      <div className="mt-2 flex items-center justify-center gap-2" dir="ltr">
        {items.map((it) => (
          <div key={it.label} className="flex flex-col items-center">
            <span
              className={cn(
                "flex min-w-[52px] items-center justify-center rounded-xl px-2 py-2 text-[22px] font-extrabold tabular-nums",
                box,
              )}
              suppressHydrationWarning
            >
              {String(it.value).padStart(2, "0")}
            </span>
            <span className={cn("mt-1 text-[11px] font-medium", labelColor)}>
              {it.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
