import { Check } from "lucide-react";
import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/ui/button";
import { Countdown } from "./countdown";
import { offer } from "@/lib/content";

export function Offer() {
  return (
    <SectionShell tone="dark" aria-labelledby="offer-title">
      <SectionHeading
        id="offer-title"
        title={offer.heading}
        subtitle={offer.subheading}
        eyebrow={offer.eyebrow}
        tone="dark"
        align="center"
      />

      <Reveal delay={0.08}>
        <Countdown variant="dark" className="mt-8" />
      </Reveal>

      <Reveal delay={0.12}>
        <div className="mx-auto mt-10 max-w-xl overflow-hidden rounded-3xl bg-card text-card-foreground shadow-lg">
          <div className="border-b border-border bg-muted px-6 py-6 text-center">
            <div className="flex justify-center">
              <Badge variant="urgency" withDot>
                {offer.price.badge}
              </Badge>
            </div>
            <div className="mt-3 flex flex-wrap items-end justify-center gap-x-3 gap-y-1">
              <span className="ltr-token text-[40px] font-extrabold leading-none text-action-600">
                {offer.price.current}
              </span>
              <span className="ltr-token text-[20px] font-semibold text-destructive line-through">
                {offer.price.original}
              </span>
            </div>
          </div>

          <ul className="grid gap-2.5 px-6 py-6">
            {offer.features.map((f) => (
              <li key={f.text} className="flex items-center gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-action-100 text-action-600">
                  <Check className="size-4" aria-hidden="true" />
                </span>
                <span className="text-[15px] text-brand-900">{f.text}</span>
                {f.free ? <Badge variant="free">مجاني</Badge> : null}
              </li>
            ))}
          </ul>

          <div className="px-6 pb-6">
            <div className="mb-4 space-y-1.5 rounded-xl bg-muted px-4 py-3 text-center text-[13px] text-muted-foreground">
              <p>{offer.price.reason}</p>
              <p className="font-medium text-brand-700">{offer.price.facilites}</p>
            </div>
            <Button asChild size="lg" className="w-full" data-track="cta_offer">
              <a href="#lead-form">{offer.cta}</a>
            </Button>
            <p className="mt-3 text-center text-[13px] text-muted-foreground">
              {offer.price.note}
            </p>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
