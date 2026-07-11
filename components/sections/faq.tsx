import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buildWhatsAppLink } from "@/lib/utils";
import { faq, site } from "@/lib/content";

export function Faq() {
  const waLink = buildWhatsAppLink(
    site.whatsappPhone,
    "السلام، عندي سؤال على البرنامج.",
  );

  return (
    <SectionShell aria-labelledby="faq-title">
      <div className="mx-auto max-w-2xl">
        <SectionHeading id="faq-title" title={faq.heading} align="center" />

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="mt-8">
            {faq.items.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-8 flex justify-center">
            <Button asChild variant="whatsapp" data-track="cta_faq_whatsapp">
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-5" />
                {faq.contactCta}
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
