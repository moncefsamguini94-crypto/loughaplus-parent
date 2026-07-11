"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/shared/badge";
import { Reveal } from "@/components/shared/reveal";
import { hero, heroAngles, type HeroAngle } from "@/lib/content";

const ANGLE_KEYS: HeroAngle[] = [
  "entretien",
  "callcenter",
  "multinationale",
  "confidence",
];

function resolveAngle(angle: string | null, term: string | null): HeroAngle {
  const candidate = (angle || term || "").toLowerCase();
  return (ANGLE_KEYS.find((k) => candidate.includes(k)) as HeroAngle) ?? "default";
}

/**
 * Renders the hero badge/headline/subheadline, personalized to the ad angle.
 * SSR shows the default angle; the matching angle is applied after hydration.
 */
export function HeroCopy() {
  const params = useSearchParams();
  const angle = resolveAngle(params.get("angle"), params.get("utm_term"));
  const copy = heroAngles[angle];

  return (
    <>
      <Reveal>
        <Badge variant="urgency" withDot>
          {copy.badge}
        </Badge>
      </Reveal>

      <Reveal delay={0.08}>
        <h1 className="mt-5 text-balance text-[34px] font-extrabold leading-[1.15] tracking-tight text-brand-900 md:text-[48px] md:leading-[1.1]">
          {copy.headline}
        </h1>
      </Reveal>

      <Reveal delay={0.16}>
        <p className="mt-4 text-[17px] leading-7 text-muted-foreground md:text-[19px] md:leading-8">
          {copy.subheadline}
        </p>
      </Reveal>

      <Reveal delay={0.24}>
        <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
          {hero.bullets.map((b) => (
            <li
              key={b}
              className="inline-flex items-center gap-2 rounded-full bg-muted px-3.5 py-2 text-[14px] font-medium text-brand-900"
            >
              <CheckCircle2 className="size-4 text-action-600" aria-hidden="true" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </>
  );
}
