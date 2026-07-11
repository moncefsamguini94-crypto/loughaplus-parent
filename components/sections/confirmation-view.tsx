"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { buildWhatsAppLink, cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { confirmation, site } from "@/lib/content";

export function ConfirmationView({ name, goal }: { name?: string; goal?: string }) {
  const reduce = useReducedMotion();
  const [selectedGoal, setSelectedGoal] = useState<string | undefined>(goal);

  useEffect(() => {
    track("lead_confirmed", { goal });
  }, [goal]);

  const greetingName = name ? ` ${name}` : "";
  const waMessage = selectedGoal
    ? `${confirmation.whatsappPrefill} الهدف ديالي: ${selectedGoal}.`
    : confirmation.whatsappPrefill;
  const waLink = buildWhatsAppLink(site.whatsappPhone, waMessage);

  return (
    <div className="mx-auto w-full max-w-lg rounded-[24px] border border-border bg-card p-6 text-center shadow-md md:p-9">
      <motion.span
        initial={{ scale: reduce ? 1 : 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex size-16 items-center justify-center rounded-full bg-action-100 text-action-600"
      >
        <Check className="size-8" aria-hidden="true" />
      </motion.span>

      <h1 className="mt-5 text-[26px] font-bold text-brand-900">
        {confirmation.successTitle}
        {greetingName}
      </h1>
      <p className="mt-3 text-[16px] leading-7 text-muted-foreground">
        {confirmation.successSubtitle}
      </p>
      <p className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-medium text-action-600">
        <WhatsAppIcon className="size-4" />
        {confirmation.responseNote}
      </p>

      <ol className="mt-6 space-y-3 text-start">
        {confirmation.steps.map((s, i) => (
          <li key={s} className="flex items-start gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
              {i + 1}
            </span>
            <span className="text-[15px] leading-7 text-brand-900">{s}</span>
          </li>
        ))}
      </ol>

      <div className="mt-7">
        <Button
          asChild
          variant="whatsapp"
          size="lg"
          className="w-full"
          data-track="confirmation_whatsapp"
        >
          <a href={waLink} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="size-5" />
            {confirmation.cta}
          </a>
        </Button>
      </div>

      <div className="mt-7 border-t border-border pt-6 text-start">
        <p className="text-[14px] font-semibold text-brand-900">
          {confirmation.microQuestionTitle}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {confirmation.microQuestionOptions.map((opt) => {
            const active = selectedGoal === opt;
            return (
              <button
                key={opt}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedGoal(opt)}
                className={cn(
                  "rounded-full border px-4 py-2 text-[14px] font-medium transition-all active:scale-[0.98]",
                  active
                    ? "border-brand-500 bg-brand-100 text-brand-700"
                    : "border-input bg-card text-brand-900 hover:border-brand-300",
                )}
              >
                <span className="ltr-token">{opt}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
