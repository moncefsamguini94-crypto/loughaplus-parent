import { HelpCircle } from "lucide-react";
import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { pain } from "@/lib/content";

export function Pain() {
  return (
    <SectionShell tone="muted" aria-labelledby="pain-title">
      <SectionHeading id="pain-title" title={pain.heading} className="max-w-3xl" />

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {pain.items.map((item, i) => (
          <Reveal as="li" key={item} delay={i * 0.06}>
            <div className="flex h-full flex-col items-center gap-3 rounded-3xl border border-border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                <HelpCircle className="size-5" aria-hidden="true" />
              </span>
              <p className="text-[16px] leading-7 text-brand-900">{item}</p>
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={0.2}>
        <div className="mt-6 flex flex-col items-center gap-4 rounded-[16px] bg-brand-100 px-5 py-5 text-center">
          <p className="text-[17px] font-semibold text-brand-700">{pain.callout}</p>
          <Button asChild data-track="cta_pain">
            <a href="#lead-form">{pain.cta}</a>
          </Button>
        </div>
      </Reveal>
    </SectionShell>
  );
}
