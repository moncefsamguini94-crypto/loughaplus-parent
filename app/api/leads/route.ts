import { NextResponse } from "next/server";
import { ENGLISH_LEVELS } from "@/lib/content";
import { hasDatabase, insertLead } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface IncomingLead {
  fullName?: unknown;
  phone?: unknown;
  level?: unknown;
  submittedAt?: unknown;
  attribution?: Record<string, unknown>;
}

function badRequest(error: string) {
  return NextResponse.json({ ok: false, error }, { status: 400 });
}

export async function POST(request: Request) {
  let body: IncomingLead;
  try {
    body = (await request.json()) as IncomingLead;
  } catch {
    return badRequest("INVALID_JSON");
  }

  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const level = typeof body.level === "string" ? body.level : "";

  // Server-side validation (never trust the client).
  if (fullName.length < 2) return badRequest("INVALID_NAME");
  if (phone.replace(/\D/g, "").length < 9) return badRequest("INVALID_PHONE");
  if (!ENGLISH_LEVELS.includes(level as (typeof ENGLISH_LEVELS)[number])) {
    return badRequest("INVALID_LEVEL");
  }

  const lead = {
    fullName,
    phone,
    level,
    submittedAt:
      typeof body.submittedAt === "string"
        ? body.submittedAt
        : new Date().toISOString(),
    attribution: body.attribution ?? {},
    // Server-side metadata
    receivedAt: new Date().toISOString(),
    ip:
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
    userAgent: request.headers.get("user-agent") ?? null,
  };

  // --- Persistence ----------------------------------------------------------
  // 1) Store in Postgres when DATABASE_URL is set (powers the /admin panel).
  try {
    if (hasDatabase()) {
      await insertLead({
        fullName,
        phone,
        level,
        submittedAt: lead.submittedAt,
        attribution: lead.attribution as Record<string, unknown>,
        ip: lead.ip,
        userAgent: lead.userAgent,
      });
    }
  } catch (err) {
    console.error("[leads] db insert error", err);
    return NextResponse.json({ ok: false, error: "DB_ERROR" }, { status: 500 });
  }

  // 2) Optionally forward to a CRM/webhook (Make/Zapier/n8n, or your API).
  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    try {
      const forward = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!forward.ok) console.error("[leads] webhook failed", forward.status);
    } catch (err) {
      console.error("[leads] webhook error", err);
    }
  }

  // 3) Fallback log when nothing is configured (keeps the flow testable).
  if (!hasDatabase() && !webhook) {
    console.log("[leads] received", lead);
  }

  return NextResponse.json({ ok: true });
}
