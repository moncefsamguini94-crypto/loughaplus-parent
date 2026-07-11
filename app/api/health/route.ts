import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Lightweight liveness probe used by Docker/orchestrators. */
export function GET() {
  return NextResponse.json({ status: "ok", uptime: process.uptime() });
}
