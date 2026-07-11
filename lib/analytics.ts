/**
 * Lightweight, dependency-free analytics.
 * Pushes events to window.dataLayer (GTM / GA4 ready) — no vendor lock-in.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "angle",
] as const;

const STORAGE_KEY = "lougha_attribution";

export function track(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...getAttribution(), ...payload });
}

/** Read UTM/angle from the URL, persist them for the whole session. */
export function captureAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) fromUrl[key] = value;
  }
  const existing = getAttribution();
  const merged = { ...existing, ...fromUrl };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    /* storage unavailable — non-blocking */
  }
  return merged;
}

export function getAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

/** Append stored attribution to an URLSearchParams (e.g. confirmation redirect). */
export function withAttribution(params: URLSearchParams): URLSearchParams {
  const attr = getAttribution();
  for (const [k, v] of Object.entries(attr)) params.set(k, v);
  return params;
}
