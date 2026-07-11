"use client";

import { useEffect } from "react";
import { captureAttribution, track } from "@/lib/analytics";

/**
 * Mount once (in layout). Captures UTM/angle attribution and tracks clicks
 * on any element carrying a `data-track` attribute via event delegation,
 * so server components can stay server components.
 *
 * Usage in markup:  <a data-track="cta_hero_primary" ...>
 */
export function Analytics() {
  useEffect(() => {
    captureAttribution();
    track("page_view", { path: window.location.pathname });

    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-track]",
      );
      if (!target) return;
      track(target.dataset.track || "click", {
        label: target.dataset.trackLabel,
        href: target.getAttribute("href") || undefined,
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
