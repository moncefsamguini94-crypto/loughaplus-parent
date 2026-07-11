import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "lougha_admin";

function adminPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

export function adminConfigured() {
  return adminPassword().length > 0;
}

/** Stable session token derived from the admin password. */
export function sessionToken(): string {
  return createHmac("sha256", adminPassword()).update("lougha-admin-v1").digest("hex");
}

export function verifyToken(token: string | undefined): boolean {
  if (!adminConfigured() || !token) return false;
  const expected = sessionToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Constant-time password check used at login. */
export function checkPassword(input: string): boolean {
  if (!adminConfigured()) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(adminPassword());
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Read the session cookie and validate it (server components / route handlers). */
export function isAdminAuthed(): boolean {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  return verifyToken(token);
}
