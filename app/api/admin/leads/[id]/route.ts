import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { isValidStatus, updateLeadStatus } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  let status = "";
  try {
    const body = (await request.json()) as { status?: unknown };
    status = typeof body.status === "string" ? body.status : "";
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
  }

  if (!isValidStatus(status)) {
    return NextResponse.json({ ok: false, error: "INVALID_STATUS" }, { status: 400 });
  }

  try {
    await updateLeadStatus(params.id, status);
  } catch (err) {
    console.error("[admin] update status error", err);
    return NextResponse.json({ ok: false, error: "DB_ERROR" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
