import { Award, Check } from "lucide-react";
import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { certificate, ctas } from "@/lib/content";

export function Certificate() {
  return (
    <SectionShell tone="muted" aria-labelledby="certificate-title">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <SectionHeading
          id="certificate-title"
          title={certificate.heading}
          subtitle={certificate.subheading}
          align="center"
        />

        <Reveal delay={0.15}>
          <CertificateMockup />
        </Reveal>

        <ul className="mt-6 flex flex-wrap justify-center gap-3">
          {certificate.benefits.map((b, i) => (
            <Reveal as="li" key={b} delay={i * 0.06}>
              <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-[14px] text-brand-900 shadow-sm">
                <span className="flex size-5 items-center justify-center rounded-full bg-action-100 text-action-600">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {b}
              </span>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.2}>
          <p className="mt-5 text-[13px] text-muted-foreground">{certificate.note}</p>
          <div className="mt-6">
            <Button asChild data-track="cta_certificate">
              <a href="#lead-form">{ctas.primary}</a>
            </Button>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

function CertificateMockup() {
  return (
    <div className="mx-auto mt-2 aspect-[1.4/1] w-full max-w-md rounded-[16px] border border-border bg-card p-6 shadow-lg">
      <div className="flex h-full flex-col items-center justify-center rounded-[12px] border-2 border-dashed border-brand-300 p-6 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-brand-100 text-brand-700">
          <Award className="size-7" aria-hidden="true" />
        </span>
        <p className="mt-4 text-[13px] font-semibold tracking-widest text-muted-foreground">
          شهادة إتمام
        </p>
        <p className="mt-2 text-[20px] font-bold text-brand-900">معهد لوغة</p>
        <p className="mt-1 text-[13px] text-muted-foreground">برنامج الإنجليزية · 180 يوم</p>
      </div>
    </div>
  );
}
