import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/shared/badge";
import { clubs } from "@/lib/content";

export function Clubs() {
  return (
    <SectionShell aria-labelledby="clubs-title">
      <SectionHeading
        id="clubs-title"
        title={clubs.heading}
        subtitle={clubs.subheading}
        className="max-w-3xl"
      />

      <Reveal delay={0.1}>
        <div className="mt-5 flex justify-center">
          <Badge variant="proof">{clubs.badge}</Badge>
        </div>
      </Reveal>

      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {clubs.steps.map((step, i) => {
          const isLast = i === clubs.steps.length - 1;
          return (
            <Reveal as="li" key={step.title} delay={i * 0.06}>
              <div
                className={`flex h-full flex-col items-center rounded-[16px] border p-4 text-center shadow-sm ${
                  isLast
                    ? "border-action-600 bg-action-100"
                    : "border-border bg-card"
                }`}
              >
                <span
                  className={`flex size-8 items-center justify-center rounded-full text-sm font-bold text-white ${
                    isLast ? "bg-action-600" : "bg-brand-500"
                  }`}
                >
                  {i + 1}
                </span>
                <h3 className="mt-3 text-[16px] font-semibold text-brand-900">
                  {step.title}
                </h3>
                <p className="mt-1 text-[13px] leading-5 text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </SectionShell>
  );
}
