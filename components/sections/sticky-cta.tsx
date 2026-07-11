"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { buildWhatsAppLink } from "@/lib/utils";
import { ctas, site } from "@/lib/content";

export function StickyCta() {
  const reduce = useReducedMotion();

  const waLink = buildWhatsAppLink(
    site.whatsappPhone,
    "السلام، بغيت نعرف التفاصيل ديال اختبار المستوى بالمجان.",
  );

  return (
    <motion.div
      initial={{ y: reduce ? 0 : 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/90 backdrop-blur-lg md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="container flex items-center gap-3 py-3">
        <Button
          asChild
          size="lg"
          className="btn-no-motion h-14 flex-1"
          data-track="cta_sticky_primary"
        >
          <a href="#checkout" className="flex-col !gap-0 leading-tight">
            <span>{ctas.primary}</span>
            <span className="text-[11px] font-normal opacity-90">
              {ctas.stickyShort} · بلا أداء
            </span>
          </a>
        </Button>
        <Button
          asChild
          variant="whatsapp"
          size="icon"
          aria-label="تواصل معنا فـ واتساب"
          data-track="cta_sticky_whatsapp"
          className="btn-no-motion size-14"
        >
          <a href={waLink} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="size-6" />
          </a>
        </Button>
      </div>
    </motion.div>
  );
}
