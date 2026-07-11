import { Hero } from "@/components/sections/hero";
import { SiteHeader } from "@/components/sections/site-header";
import { StickyCta } from "@/components/sections/sticky-cta";
import { LimitedOfferSection } from "@/components/sections/limited-offer-section";
import { ProgramCardSection } from "@/components/sections/program-card-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { CheckoutSection } from "@/components/sections/checkout-section";
import { SiteFooter } from "@/components/sections/site-footer";

export default function HomePage() {
  return (
    <>
      <a
        href="#checkout"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-900 focus:px-4 focus:py-2 focus:text-white"
      >
        تجاوز إلى التسجيل
      </a>

      <SiteHeader />

      <main>
        <Hero />
        <LimitedOfferSection />
        <ProgramCardSection />
        <PricingSection id="pricing" tone="default" />
        <CheckoutSection />
      </main>

      <SiteFooter />
      <StickyCta />
    </>
  );
}
