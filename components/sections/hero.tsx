import { Suspense } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/shared/badge";
import { Reveal } from "@/components/shared/reveal";
import { HeroCopy } from "./hero-copy";
import { ctas, hero, heroAngles } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-100/80 via-background to-background">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(32,121,135,.24),transparent_66%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -start-20 top-44 size-52 rounded-full bg-action-500/20 blur-3xl"
      />
      <div className="container relative flex flex-col items-center pb-8 pt-8 text-center md:pb-14 md:pt-12">
        <div className="max-w-3xl">
          <Suspense fallback={<HeroCopyFallback />}>
            <HeroCopy />
          </Suspense>

          <Reveal delay={0.32}>
            <div className="mt-8 flex justify-center">
              <Button
                asChild
                size="lg"
                className="h-16 w-full max-w-xs text-[18px] font-extrabold sm:w-auto sm:px-12"
                data-track="cta_hero_primary"
              >
                <a href="#checkout">{ctas.primary}</a>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.18} className="mt-7 w-full">
          <HeroMedia />
        </Reveal>
      </div>
    </section>
  );
}

function HeroCopyFallback() {
  const copy = heroAngles.default;
  return (
    <>
      <Badge variant="urgency" withDot>
        {copy.badge}
      </Badge>
      <h1 className="mt-5 text-balance text-[34px] font-extrabold leading-[1.15] tracking-tight text-brand-900 md:text-[48px] md:leading-[1.1]">
        {copy.headline}
      </h1>
      <p className="mt-4 text-[17px] leading-7 text-muted-foreground md:text-[19px] md:leading-8">
        {copy.subheadline}
      </p>
    </>
  );
}

function HeroMedia() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="relative overflow-hidden rounded-[2rem] bg-white p-2 shadow-2xl shadow-brand-900/15 ring-1 ring-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/parent-hero.webp"
          alt="عائلة كتفكر فمستقبل ولدها"
          width={1100}
          height={733}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="aspect-[4/3] w-full object-cover md:aspect-[3/2]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-900/25 via-transparent to-transparent"
        />
      </div>

      <figure className="absolute -bottom-4 start-2 max-w-[72%] rounded-2xl border border-border bg-card p-3 text-start shadow-lg md:start-4">
        <blockquote className="text-[13px] leading-5 text-brand-900">
          “{hero.miniTestimonial.quote}”
        </blockquote>
        <figcaption className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
          <ShieldCheck className="size-3 text-action-600" aria-hidden="true" />
          {hero.miniTestimonial.name}
        </figcaption>
      </figure>
    </div>
  );
}
