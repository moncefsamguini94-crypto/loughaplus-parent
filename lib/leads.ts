import type { EnglishLevel } from "@/lib/content";

/** UTM / attribution captured automatically (hidden fields). */
export interface LeadAttribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  angle?: string;
}

/** The lead payload sent to the API. */
export interface LeadInput {
  fullName: string;
  /** Phone in international format, e.g. +2126XXXXXXXX */
  phone: string;
  level: EnglishLevel;
  /** ISO 8601 client submission datetime. */
  submittedAt: string;
  attribution: LeadAttribution;
}

export interface LeadResponse {
  ok: boolean;
  error?: string;
}

export const LEADS_ENDPOINT = "/api/leads";

/**
 * Single connection point between the UI and the backend.
 * Swap the endpoint or transport here without touching the form component.
 */
export async function submitLead(input: LeadInput): Promise<LeadResponse> {
  const res = await fetch(LEADS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  let data: LeadResponse = { ok: res.ok };
  try {
    data = (await res.json()) as LeadResponse;
  } catch {
    /* non-JSON response — fall back to status */
  }

  if (!res.ok || !data.ok) {
    return { ok: false, error: data.error ?? `HTTP ${res.status}` };
  }
  return { ok: true };
}

/** Normalize a Moroccan phone to +212 international format. */
export function normalizeMoroccanPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").replace(/^0+/, "");
  return `+212${digits}`;
}
