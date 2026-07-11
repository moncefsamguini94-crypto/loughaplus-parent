import { CheckCircle2, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/shared/badge";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { LeadFormPanel } from "./lead-form";
import { checkout, offer, site } from "@/lib/content";

export function CheckoutSection() {
  return (
    <section
      id="checkout"
      className="section-shell relative scroll-mt-20 overflow-hidden bg-brand-900"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          backgroundImage:
            "radial-gradient(55% 50% at 50% 0%, rgba(28,170,252,.35) 0%, transparent 62%), radial-gradient(40% 40% at 10% 80%, rgba(131,214,63,.22) 0%, transparent 60%), radial-gradient(35% 35% at 95% 70%, rgba(0,224,155,.18) 0%, transparent 65%)",
        }}
      />

      <div className="container relative">
        <Reveal className="mx-auto flex max-w-xl justify-center">
          <Badge variant="free">{checkout.badge}</Badge>
        </Reveal>

        <SectionHeading
          title={checkout.heading}
          subtitle={checkout.subheading}
          tone="dark"
          className="mt-4"
        />

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-5 lg:items-start">
          <Reveal className="lg:col-span-2">
            <OrderSummary />
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-3">
            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-1 rounded-[28px] bg-gradient-to-br from-action-500/35 via-brand-500/25 to-transparent blur-xl"
              />
              <LeadFormPanel className="relative" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function OrderSummary() {
  return (
    <div className="space-y-4 lg:sticky lg:top-24">
      <div className="rounded-[28px] border border-white/15 bg-white/10 p-6 backdrop-blur-md md:p-7">
        <div className="flex items-center gap-2 text-white/80">
          <Sparkles className="size-4 text-action-500" aria-hidden="true" />
          <p className="text-[13px] font-semibold uppercase tracking-wide">
            {checkout.summary.title}
          </p>
        </div>

        <h3 className="mt-3 text-[20px] font-bold leading-8 text-white">
          {checkout.summary.program}
        </h3>
        <p className="mt-1 text-[14px] text-white/65">{checkout.summary.duration}</p>

        <ul className="mt-5 space-y-2.5">
          {checkout.summary.highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-[14px] leading-6 text-white/85"
            >
              <CheckCircle2
                className="mt-0.5 size-4 shrink-0 text-action-500"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-2xl border border-white/10 bg-brand-900/40 p-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[12px] font-medium text-white/55">
                {offer.price.badge}
              </p>
              <div className="mt-1 flex items-end gap-2">
                <span className="ltr-token text-[32px] font-extrabold leading-none text-action-500">
                  {offer.price.current}
                </span>
                <span className="ltr-token text-[15px] font-bold text-white/45 line-through">
                  {offer.price.original}
                </span>
              </div>
            </div>
            <span className="rounded-full bg-action-500/15 px-3 py-1 text-[12px] font-semibold text-action-500">
              {checkout.summary.installment}
            </span>
          </div>
          <p className="mt-3 text-[13px] leading-6 text-white/70">
            {checkout.summary.paymentNote}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[12px] text-white/70">
        <span className="inline-flex items-center gap-1.5">
          <Lock className="size-3.5 text-action-500" aria-hidden="true" />
          {checkout.secureNote}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="size-3.5 text-action-500" aria-hidden="true" />
          {site.privacyNote}
        </span>
      </div>
    </div>
  );
}
