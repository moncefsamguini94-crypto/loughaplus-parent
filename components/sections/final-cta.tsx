import { CheckCircle2 } from "lucide-react";
import { SectionShell } from "@/components/shared/section-shell";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { finalCta } from "@/lib/content";

export function FinalCta() {
  return (
    <SectionShell tone="dark" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(60% 60% at 50% 0%, rgba(32,121,135,.48) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="text-balance text-[28px] font-bold leading-tight text-white md:text-[40px]">
            {finalCta.heading}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
            {finalCta.recap.map((r) => (
              <li
                key={r}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-[14px] font-medium text-white"
              >
                <CheckCircle2 className="size-4 text-action-500" aria-hidden="true" />
                {r}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" className="animate-float" data-track="cta_final">
              <a href="#lead-form">{finalCta.cta}</a>
            </Button>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
