import { Percent } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { Countdown } from "./countdown";
import { limitedOffer, offer } from "@/lib/content";

export function LimitedOfferSection() {
  return (
    <section className="section-shell relative overflow-hidden bg-brand-900 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          backgroundImage:
            "radial-gradient(60% 58% at 50% -5%, rgba(32,121,135,.40) 0%, transparent 62%), radial-gradient(42% 42% at 8% 70%, rgba(242,164,64,.34) 0%, transparent 60%), radial-gradient(38% 38% at 92% 75%, rgba(36,150,138,.22) 0%, transparent 65%)",
        }}
      />
      <div className="container relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="ref-badge bg-red-900 text-white shadow-md shadow-red-950/20">
            {limitedOffer.eyebrow}
          </span>
          <h2 className="mt-4 text-balance text-[30px] font-extrabold leading-tight md:text-[44px]">
            {limitedOffer.title}
          </h2>
          <p className="mt-3 text-[17px] leading-8 text-white/75">
            {limitedOffer.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Countdown variant="dark" className="mt-8" />
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mx-auto mt-8 max-w-sm rounded-[2rem] border border-white/80 bg-white p-6 text-center text-brand-900 shadow-2xl shadow-black/15">
            <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-action-100 text-action-600">
              <Percent className="size-8" aria-hidden="true" />
            </span>
            <p className="mt-4 inline-flex rounded-full bg-[#FFF4E0] px-4 py-1.5 text-[14px] font-bold text-warning">
              {limitedOffer.discount}
            </p>
            <p className="mt-4 text-[18px] font-semibold">{limitedOffer.duration}</p>
            <div className="mt-2 flex items-end justify-center gap-3">
              <span className="ltr-token text-[44px] font-extrabold leading-none text-action-600">
                {offer.price.current}
              </span>
              <span className="ltr-token text-[20px] font-bold text-destructive line-through">
                {offer.price.original}
              </span>
            </div>
            <p className="mt-3 text-[13px] text-muted-foreground">{offer.price.note}</p>
            <Button asChild className="mt-6 w-full" data-track="cta_limited_offer">
              <a href="#checkout">{offer.cta}</a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
