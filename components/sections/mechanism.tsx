import { Plus, X } from "lucide-react";
import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Icon } from "@/components/shared/icon";
import { mechanism } from "@/lib/content";

export function Mechanism() {
  return (
    <SectionShell aria-labelledby="mechanism-title">
      <SectionHeading
        id="mechanism-title"
        title={mechanism.heading}
        subtitle={mechanism.subheading}
        eyebrow={mechanism.eyebrow}
        className="max-w-3xl"
      />

      <div className="mt-8 flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
        <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {mechanism.inputs.map((node, i) => (
            <Reveal key={node.label} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-card p-5 text-center shadow-sm">
                <span className="mx-auto flex size-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                  <Icon name={node.icon} className="size-6" />
                </span>
                <h3 className="mt-3 text-[16px] font-semibold text-brand-900">
                  {node.label}
                </h3>
                <p className="mt-1 text-[13px] leading-5 text-muted-foreground">
                  {node.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.28} className="flex items-center justify-center">
          <span className="flex size-9 items-center justify-center rounded-full bg-brand-100 text-brand-700">
            <Plus className="size-5" aria-hidden="true" />
          </span>
        </Reveal>

        <Reveal delay={0.34} className="lg:w-64">
          <div className="h-full rounded-2xl border-2 border-action-600 bg-action-100 p-5 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-action-600 text-white">
              <Icon name={mechanism.result.icon} className="size-6" />
            </span>
            <h3 className="mt-3 text-[20px] font-bold text-action-600">
              {mechanism.result.label}
            </h3>
            <p className="mt-1 text-[14px] leading-6 text-brand-900">
              {mechanism.result.desc}
            </p>
          </div>
        </Reveal>
      </div>

      {/* apps/YouTube vs Lougha — addresses "I already tried and failed" */}
      <Reveal delay={0.15}>
        <div className="mt-12 overflow-hidden rounded-[16px] border border-border">
          <h3 className="bg-muted px-5 py-4 text-[17px] font-semibold text-brand-900">
            {mechanism.comparison.heading}
          </h3>
          <div className="grid grid-cols-2 text-[14px]">
            <div className="border-t border-border bg-card px-5 py-3 font-semibold text-muted-foreground">
              {mechanism.comparison.aTitle}
            </div>
            <div className="border-t border-s border-border bg-action-100/40 px-5 py-3 font-semibold text-action-600">
              {mechanism.comparison.bTitle}
            </div>
            {mechanism.comparison.rows.map((row) => (
              <Row key={row.b} a={row.a} b={row.b} />
            ))}
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}

function Row({ a, b }: { a: string; b: string }) {
  return (
    <>
      <div className="flex items-start gap-2 border-t border-border bg-card px-5 py-3 text-muted-foreground">
        <X className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
        <span>{a}</span>
      </div>
      <div className="flex items-start gap-2 border-t border-s border-border bg-action-100/40 px-5 py-3 text-brand-900">
        <Icon name="CheckCircle2" className="mt-0.5 size-4 shrink-0 text-action-600" />
        <span>{b}</span>
      </div>
    </>
  );
}
