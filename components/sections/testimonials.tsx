import { BadgeCheck, Play, Quote, Star } from "lucide-react";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/shared/badge";
import { testimonials } from "@/lib/content";

const sourceLabel: Record<string, string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  facebook: "Facebook",
};

type Item = (typeof testimonials.items)[number];

export function Testimonials() {
  return (
    <SectionShell aria-labelledby="testimonials-title">
      <div className="flex flex-col items-center gap-4">
        <SectionHeading
          id="testimonials-title"
          title={testimonials.heading}
          subtitle={testimonials.subheading}
          align="center"
          className="max-w-2xl"
        />
        <Reveal delay={0.1}>
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2">
            <span className="flex items-center gap-0.5 text-warning" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </span>
            <span className="ltr-token text-[15px] font-bold text-brand-900">
              {testimonials.rating.score}
            </span>
            <span className="text-[13px] text-muted-foreground">
              {testimonials.rating.label}
            </span>
          </div>
        </Reveal>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.items.map((t, i) => (
          <Reveal as="li" key={t.name} delay={i * 0.06}>
            <TestimonialCard item={t} />
          </Reveal>
        ))}
      </ul>
    </SectionShell>
  );
}

function TestimonialCard({ item }: { item: Item }) {
  return (
    <figure className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      {item.type === "video" ? <VideoTop item={item} /> : null}
      {item.type === "whatsapp" ? <WhatsAppTop item={item} /> : null}
      {item.type === "text" ? <TextTop item={item} /> : null}

      <figcaption className="mt-auto flex items-center gap-3 border-t border-border p-4">
        <span
          className="flex size-10 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white"
          aria-hidden="true"
        >
          {item.initials}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1 text-[14px] font-semibold text-brand-900">
            {item.name}
            {item.verified ? (
              <BadgeCheck className="size-4 text-action-600" aria-label="موثّق" />
            ) : null}
          </span>
          <span className="block text-[12px] text-muted-foreground">{item.meta}</span>
        </span>
        <Badge variant="proof">{item.goal}</Badge>
      </figcaption>
    </figure>
  );
}

function SourceTag({ source }: { source: string }) {
  return (
    <span className="absolute end-3 top-3 z-10 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
      {sourceLabel[source] ?? source}
    </span>
  );
}

function VideoTop({ item }: { item: Item }) {
  return (
    <div className="relative aspect-[4/5] bg-gradient-to-br from-brand-500 to-brand-900">
      <SourceTag source={item.source} />
      <button
        type="button"
        aria-label={`شاهد شهادة ${item.name}`}
        data-track="testimonial_play"
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-white/20 backdrop-blur">
          <Play className="size-6 translate-x-px" aria-hidden="true" />
        </span>
        <span className="text-[13px] font-medium">شاهد الفيديو</span>
      </button>
      <blockquote className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-[13px] leading-5 text-white">
        “{item.quote}”
      </blockquote>
    </div>
  );
}

function WhatsAppTop({ item }: { item: Item }) {
  return (
    <div className="relative bg-[#E5F3EC] p-4">
      <SourceTag source={item.source} />
      <div className="mt-6 inline-flex items-center gap-1.5 text-[11px] font-semibold text-action-600">
        <WhatsAppIcon className="size-3.5" />
        WhatsApp
      </div>
      <blockquote className="mt-2 rounded-2xl rounded-ss-sm bg-white p-3 text-[14px] leading-6 text-brand-900 shadow-sm">
        {item.quote}
      </blockquote>
    </div>
  );
}

function TextTop({ item }: { item: Item }) {
  return (
    <div className="relative p-5">
      <SourceTag source={item.source} />
      <Quote className="size-6 text-brand-300" aria-hidden="true" />
      <blockquote className="mt-3 text-[15px] leading-7 text-brand-900">
        {item.quote}
      </blockquote>
    </div>
  );
}
