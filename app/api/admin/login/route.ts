import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminConfigured,
  checkPassword,
  sessionToken,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!adminConfigured()) {
    return NextResponse.json({ ok: false, error: "ADMIN_NOT_CONFIGURED" }, { status: 500 });
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
  }

  if (!checkPassword(password)) {
    return NextResponse.json({ ok: false, error: "INVALID_PASSWORD" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12, // 12h
  });
  return res;
}
