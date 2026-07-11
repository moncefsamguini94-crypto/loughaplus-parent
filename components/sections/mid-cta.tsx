import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { midCta } from "@/lib/content";

export function MidCta() {
  return (
    <section aria-label="نداء للتسجيل" className="bg-brand-500">
      <div className="container py-7 md:py-9">
        <Reveal>
          <div className="flex flex-col items-center gap-5 text-center md:flex-row md:justify-between md:text-start">
            <div>
              <h2 className="text-[22px] font-bold text-white md:text-[26px]">
                {midCta.heading}
              </h2>
              <p className="mt-1.5 text-[15px] text-white/80">{midCta.subheading}</p>
            </div>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="w-full shrink-0 md:w-auto"
              data-track="cta_mid"
            >
              <a href="#lead-form">
                {midCta.cta}
                <ArrowLeft className="size-4" />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
