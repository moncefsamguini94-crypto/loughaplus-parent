import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/shared/badge";
import { ctas, program } from "@/lib/content";

export function Program() {
  return (
    <SectionShell tone="muted" aria-labelledby="program-title">
      <SectionHeading
        id="program-title"
        title={program.heading}
        subtitle={program.subheading}
        eyebrow={program.eyebrow}
        className="max-w-3xl"
      />

      {/* Stats strip */}
      <Reveal delay={0.1}>
        <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {program.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="ltr-token block text-[24px] font-bold text-brand-700">
                  {s.value}
                </span>
                <span className="mt-1 block text-[13px] text-muted-foreground">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* Timeline */}
      <ol className="relative mt-10 space-y-5 before:absolute before:bottom-2 before:top-2 before:end-[18px] before:w-px before:bg-border">
        {program.steps.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 0.06} className="relative">
            <div className="flex items-start gap-4">
              <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white shadow-sm">
                {i + 1}
              </span>
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h3 className="flex items-center gap-2 text-[17px] font-semibold text-brand-900">
                  <span>{step.title}</span>
                  {i === 0 ? <Badge variant="free">مجاني</Badge> : null}
                </h3>
                <p className="mt-1 text-[14px] leading-6 text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={0.2}>
        <div className="mt-8 flex justify-center">
          <Button asChild data-track="cta_program">
            <a href="#lead-form">{ctas.primary}</a>
          </Button>
        </div>
      </Reveal>
    </SectionShell>
  );
}
