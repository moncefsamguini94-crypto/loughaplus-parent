import { Percent } from "lucide-react";
import { Badge } from "@/components/shared/badge";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { offer } from "@/lib/content";

export function PricingSection({
  id,
  tone = "default",
}: {
  id: string;
  tone?: "default" | "muted";
}) {
  return (
    <section
      id={id}
      className={`section-shell scroll-mt-20 ${tone === "muted" ? "bg-muted" : "bg-background"}`}
    >
      <div className="container">
        <Reveal className="mx-auto max-w-xl text-center">
          <Badge variant="urgency" withDot>
            {offer.price.badge}
          </Badge>
          <div className="mt-5 rounded-3xl border border-border bg-card p-6 shadow-lg">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-action-100 text-action-600">
              <Percent className="size-7" aria-hidden="true" />
            </span>
            <div className="mt-4 flex flex-wrap items-end justify-center gap-x-3 gap-y-1">
              <span className="ltr-token text-[44px] font-extrabold leading-none text-action-600">
                {offer.price.current}
              </span>
              <span className="ltr-token text-[20px] font-bold text-destructive line-through">
                {offer.price.original}
              </span>
            </div>
            <p className="mt-3 text-[13px] text-muted-foreground">{offer.price.note}</p>
            <Button asChild className="mt-6 w-full" size="lg" data-track="cta_pricing_checkout">
              <a href="#checkout">{offer.cta}</a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
