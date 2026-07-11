import { Star } from "lucide-react";
import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { reviews } from "@/lib/content";

export function Reviews() {
  return (
    <SectionShell aria-labelledby="reviews-title">
      <SectionHeading
        id="reviews-title"
        title={reviews.heading}
        subtitle={reviews.subheading}
        align="center"
      />

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.items.map((r, i) => (
          <Reveal as="li" key={r.name} delay={(i % 3) * 0.06}>
            <figure className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              {/* Placeholder portrait — swap with a real learner photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={r.avatar}
                alt={r.name}
                width={64}
                height={64}
                loading="lazy"
                decoding="async"
                className="mx-auto size-16 rounded-full object-cover ring-2 ring-brand-100"
              />
              <figcaption className="mt-3 text-[15px] font-semibold text-brand-900">
                {r.name}
              </figcaption>
              <p className="text-[12px] text-muted-foreground">{r.city}</p>

              <div
                className="mt-2 flex items-center justify-center gap-0.5 text-warning"
                aria-label={`${r.rating} / 5`}
              >
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={s < r.rating ? "size-4 fill-current" : "size-4 opacity-30"}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className="mt-3 text-[14px] leading-7 text-brand-900">
                “{r.text}”
              </blockquote>
            </figure>
          </Reveal>
        ))}
      </ul>
    </SectionShell>
  );
}
