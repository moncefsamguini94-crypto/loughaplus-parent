import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { programCard } from "@/lib/content";

export function ProgramCardSection() {
  return (
    <section className="section-shell bg-muted">
      <div className="container">
        <SectionHeading title={programCard.title} />

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 grid max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-lg lg:grid-cols-2">
            <div className="relative min-h-[260px] bg-brand-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/parent-secondary.webp"
                alt="تعلم الإنجليزية للأطفال مع معهد لوغة"
                width={1100}
                height={733}
                loading="lazy"
                decoding="async"
                className="h-full min-h-[260px] w-full object-cover opacity-90"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-brand-900/40 to-transparent"
              />
            </div>

            <ul className="grid gap-3 p-6 md:p-8">
              {programCard.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-muted px-4 py-3 text-start text-[15px] leading-7 text-brand-900"
                >
                  <CheckCircle2 className="mt-1 size-5 shrink-0 text-action-600" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
