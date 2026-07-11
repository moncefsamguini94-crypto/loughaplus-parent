"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  Check,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/shared/badge";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { cn, buildWhatsAppLink } from "@/lib/utils";
import { getAttribution, track } from "@/lib/analytics";
import {
  submitLead,
  normalizeMoroccanPhone,
  type LeadAttribution,
} from "@/lib/leads";
import { confirmation, leadForm, site } from "@/lib/content";

type FieldName = "fullName" | "phone" | "level";
type Status = "idle" | "loading" | "success" | "error";
type Errors = Partial<Record<FieldName, string>>;

export function LeadForm({
  sectionId = "lead-form",
  showIntro = true,
  tone = "muted",
}: {
  sectionId?: string;
  showIntro?: boolean;
  tone?: "muted" | "default";
}) {
  return (
    <section
      id={sectionId}
      className={cn(
        "section-shell scroll-mt-20",
        tone === "muted" ? "bg-muted" : "bg-background",
      )}
    >
      <div className="container">
        {showIntro ? <LeadFormIntro /> : null}
        <LeadFormPanel className={showIntro ? "mt-8" : ""} />
      </div>
    </section>
  );
}

export function LeadFormIntro() {
  return (
    <div className="mx-auto max-w-xl text-center lg:max-w-3xl">
      <Badge variant="free">{leadForm.badge}</Badge>
      <h2 className="mt-3 text-[26px] font-bold text-brand-900 md:text-[32px]">
        {leadForm.heading}
      </h2>
      <p className="mt-3 text-[16px] text-muted-foreground">{leadForm.subheading}</p>
    </div>
  );
}

export function LeadFormPanel({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto max-w-xl", className)}>
      <LeadFormCard />
    </div>
  );
}

function LeadFormCard() {
  const started = useRef(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [level, setLevel] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState<string>("");
  const [attribution, setAttribution] = useState<LeadAttribution>({});
  const [submittedAt, setSubmittedAt] = useState("");

  useEffect(() => {
    setAttribution(getAttribution());
    track("form_view");
  }, []);

  const markStarted = () => {
    if (!started.current) {
      started.current = true;
      track("form_start");
    }
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (fullName.trim().length < 2) next.fullName = leadForm.errors.name;
    if (phone.replace(/\D/g, "").length < 9) next.phone = leadForm.errors.phone;
    if (!level) next.level = leadForm.errors.level;
    return next;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      track("form_error", { fields: Object.keys(found) });
      return;
    }

    const now = new Date().toISOString();
    setSubmittedAt(now);
    setStatus("loading");
    setSubmitError("");

    const res = await submitLead({
      fullName: fullName.trim(),
      phone: normalizeMoroccanPhone(phone),
      level: level as (typeof leadForm.fields.level.options)[number],
      submittedAt: now,
      attribution,
    });

    if (res.ok) {
      track("lead_submit", { level });
      setStatus("success");
    } else {
      track("lead_error", { error: res.error });
      setStatus("error");
      setSubmitError(leadForm.errors.submit);
    }
  };

  if (status === "success") {
    return <SuccessPanel name={fullName.trim()} />;
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-md md:p-8">
      <form onSubmit={onSubmit} noValidate>
        {/* Hidden fields: auto-captured attribution + submission datetime */}
        <input type="hidden" name="utm_source" value={attribution.utm_source ?? ""} readOnly />
        <input type="hidden" name="utm_campaign" value={attribution.utm_campaign ?? ""} readOnly />
        <input type="hidden" name="utm_medium" value={attribution.utm_medium ?? ""} readOnly />
        <input type="hidden" name="submitted_at" value={submittedAt} readOnly />

        <div className="space-y-5">
          {/* Nom et prénom */}
          <Field
            label={leadForm.fields.fullName.label}
            htmlFor="fullName"
            error={errors.fullName}
          >
            <Input
              id="fullName"
              name="fullName"
              autoComplete="name"
              placeholder={leadForm.fields.fullName.placeholder}
              value={fullName}
              hasError={!!errors.fullName}
              onChange={(e) => {
                markStarted();
                setFullName(e.target.value);
                setErrors((p) => ({ ...p, fullName: undefined }));
              }}
            />
          </Field>

          {/* Numéro de téléphone */}
          <Field
            label={leadForm.fields.phone.label}
            htmlFor="phone"
            error={errors.phone}
            hint={leadForm.fields.phone.hint}
          >
            <div className="flex items-stretch gap-2" dir="ltr">
              <span className="flex items-center gap-1 rounded-[12px] border border-input bg-muted px-3 text-[15px] font-medium text-muted-foreground">
                <span aria-hidden="true">🇲🇦</span> +212
              </span>
              <Input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder={leadForm.fields.phone.placeholder}
                value={phone}
                hasError={!!errors.phone}
                onChange={(e) => {
                  markStarted();
                  setPhone(e.target.value);
                  setErrors((p) => ({ ...p, phone: undefined }));
                }}
                className="text-start"
              />
            </div>
          </Field>

          {/* Niveau d'anglais */}
          <ChipGroup
            label={leadForm.fields.level.label}
            hint={leadForm.fields.level.hint}
            options={leadForm.fields.level.options}
            value={level}
            error={errors.level}
            onSelect={(v) => {
              markStarted();
              setLevel(v);
              setErrors((p) => ({ ...p, level: undefined }));
            }}
          />
        </div>

        {submitError ? (
          <p
            className="mt-4 flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-[14px] font-medium text-destructive"
            role="alert"
          >
            <AlertCircle className="size-4" aria-hidden="true" />
            {submitError}
          </p>
        ) : null}

        <Button
          type="submit"
          size="lg"
          className="mt-7 w-full"
          disabled={status === "loading"}
          data-track="lead_submit_click"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              {leadForm.submitting}
            </>
          ) : (
            leadForm.submit
          )}
        </Button>
      </form>

      <p className="mt-4 text-center text-[13px] text-muted-foreground">
        {leadForm.microcopy}
      </p>
      <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[12px] text-muted-foreground">
        {leadForm.reassurances.map((r) => (
          <li key={r} className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-action-600" aria-hidden="true" />
            {r}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-center text-[12px] text-muted-foreground">
        {site.privacyNote}
      </p>

      <span className="sr-only" aria-live="polite">
        {status === "loading" ? leadForm.submitting : ""}
      </span>
    </div>
  );
}

function SuccessPanel({ name }: { name: string }) {
  const reduce = useReducedMotion();
  const waLink = buildWhatsAppLink(site.whatsappPhone, confirmation.whatsappPrefill);

  return (
    <div
      className="rounded-[24px] border border-border bg-card p-6 text-center shadow-md md:p-9"
      role="status"
      aria-live="polite"
    >
      <motion.span
        initial={{ scale: reduce ? 1 : 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex size-16 items-center justify-center rounded-full bg-action-100 text-action-600"
      >
        <Check className="size-8" aria-hidden="true" />
      </motion.span>

      <h3 className="mt-5 text-[24px] font-bold text-brand-900">
        {leadForm.success.title}
        {name ? ` ${name}` : ""}
      </h3>
      <p className="mt-3 text-[16px] leading-7 text-muted-foreground">
        {leadForm.success.subtitle}
      </p>
      <p className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-medium text-action-600">
        <WhatsAppIcon className="size-4" />
        {confirmation.responseNote}
      </p>

      <div className="mt-6">
        <Button
          asChild
          variant="whatsapp"
          size="lg"
          className="w-full"
          data-track="lead_success_whatsapp"
        >
          <a href={waLink} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="size-5" />
            {leadForm.success.whatsappCta}
          </a>
        </Button>
      </div>
    </div>
  );
}

/* ---------- Primitives (shared look with the design system) ---------- */

function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && !error ? (
        <p className="text-[12px] text-muted-foreground">{hint}</p>
      ) : null}
      {error ? (
        <p
          className="flex items-center gap-1.5 text-[13px] font-medium text-destructive"
          role="alert"
        >
          <AlertCircle className="size-3.5" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ChipGroup({
  label,
  hint,
  options,
  value,
  error,
  onSelect,
}: {
  label: string;
  hint?: string;
  options: readonly string[];
  value: string;
  error?: string;
  onSelect: (v: string) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-[13px] font-semibold text-foreground">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(opt)}
              className={cn(
                "rounded-full border px-4 py-2.5 text-[14px] font-medium transition-all active:scale-[0.98]",
                active
                  ? "border-brand-500 bg-brand-100 text-brand-700 shadow-sm"
                  : "border-input bg-card text-brand-900 hover:border-brand-300",
              )}
            >
              <span className="ltr-token">{opt}</span>
            </button>
          );
        })}
      </div>
      {hint && !error ? (
        <p className="text-[12px] text-muted-foreground">{hint}</p>
      ) : null}
      {error ? (
        <p className="text-[13px] font-medium text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
