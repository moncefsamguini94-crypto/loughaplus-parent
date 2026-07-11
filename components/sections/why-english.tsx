import { Briefcase, MessageSquareText } from "lucide-react";
import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";
import { whyEnglish } from "@/lib/content";

export function WhyEnglish() {
  return (
    <SectionShell aria-labelledby="why-title">
      <SectionHeading
        id="why-title"
        title={whyEnglish.heading}
        subtitle={whyEnglish.subheading}
        className="max-w-3xl"
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {whyEnglish.sectors.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <article className="group flex h-full flex-col items-center rounded-3xl border border-border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                <Icon name={s.icon} className="size-6" />
              </span>
              <h3 className="mt-4 text-[18px] font-semibold text-brand-900">
                <span className="ltr-token">{s.label}</span>
              </h3>
              <p className="mt-1.5 text-[14px] leading-6 text-muted-foreground">
                {s.note}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Tangible proof: real job listings require English */}
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-[16px] border border-border bg-muted p-5">
            <h3 className="flex items-center gap-2 text-[17px] font-semibold text-brand-900">
              <Briefcase className="size-5 text-brand-500" aria-hidden="true" />
              {whyEnglish.jobProof.heading}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {whyEnglish.jobProof.clips.map((clip) => (
                <li
                  key={clip}
                  className="flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-[14px] text-brand-900"
                >
                  <span className="rounded-md bg-[#FFF4E0] px-1.5 py-0.5 text-[11px] font-semibold text-warning">
                    English
                  </span>
                  <span className="ltr-token">{clip}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Concrete interview scenarios the visitor will master */}
        <Reveal delay={0.1}>
          <div className="h-full rounded-[16px] border border-border bg-muted p-5">
            <h3 className="flex items-center gap-2 text-[17px] font-semibold text-brand-900">
              <MessageSquareText className="size-5 text-brand-500" aria-hidden="true" />
              {whyEnglish.interview.heading}
            </h3>
            <p className="mt-1 text-[13px] text-muted-foreground">
              {whyEnglish.interview.subheading}
            </p>
            <ul className="mt-4 space-y-2.5">
              {whyEnglish.interview.questions.map((q) => (
                <li
                  key={q}
                  dir="ltr"
                  className="rounded-xl border border-border bg-card px-3.5 py-2.5 text-start text-[14px] font-medium text-brand-900"
                >
                  “{q}”
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <div className="mt-8 flex justify-center">
          <Button asChild data-track="cta_why_english">
            <a href="#lead-form">{whyEnglish.cta}</a>
          </Button>
        </div>
      </Reveal>
    </SectionShell>
  );
}
