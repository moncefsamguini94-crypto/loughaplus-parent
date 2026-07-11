import { Reveal } from "@/components/shared/reveal";
import { trustBar } from "@/lib/content";

export function TrustBar() {
  return (
    <section aria-label="أرقام معهد لوغة" className="border-y border-border bg-card">
      <div className="container py-6">
        <Reveal>
          <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {trustBar.items.map((item) => (
              <div key={item.label} className="text-center">
                <dt className="sr-only">{item.label}</dt>
                <dd>
                  <span className="ltr-token block text-[22px] font-bold text-brand-700 md:text-[26px]">
                    {item.value}
                  </span>
                  <span className="mt-0.5 block text-[12px] text-muted-foreground md:text-[13px]">
                    {item.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
