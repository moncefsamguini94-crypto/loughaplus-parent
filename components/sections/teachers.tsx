import { BadgeCheck, ShieldCheck } from "lucide-react";
import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { teachers } from "@/lib/content";

export function Teachers() {
  return (
    <SectionShell tone="muted" aria-labelledby="teachers-title">
      <SectionHeading
        id="teachers-title"
        title={teachers.heading}
        subtitle={teachers.subheading}
        eyebrow={teachers.eyebrow}
        className="max-w-3xl"
      />

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {teachers.items.map((t, i) => (
          <Reveal as="li" key={t.name} delay={i * 0.06}>
            <article className="flex h-full flex-col items-center rounded-3xl border border-border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <span
                className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-900 text-xl font-bold text-white"
                aria-hidden="true"
              >
                {t.initials}
              </span>
              <h3 className="mt-3 text-[17px] font-semibold text-brand-900">
                <span className="ltr-token">{t.name}</span>
              </h3>
              <p className="mt-1 text-[13px] text-muted-foreground">{t.country}</p>
              <p className="mt-2 text-[13px] font-medium text-brand-700">
                <span className="ltr-token">{t.specialty}</span>
              </p>
              <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-brand-100 px-2.5 py-1 text-[11px] font-semibold text-brand-700">
                <BadgeCheck className="size-3.5" aria-hidden="true" />
                <span className="ltr-token">{t.cert}</span>
              </span>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={0.24}>
        <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-action-100 px-4 py-2.5 text-[14px] font-medium text-action-600">
          <ShieldCheck className="size-5" aria-hidden="true" />
          {teachers.reassurance}
        </p>
      </Reveal>
    </SectionShell>
  );
}
