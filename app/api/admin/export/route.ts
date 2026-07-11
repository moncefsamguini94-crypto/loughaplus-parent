import { isAdminAuthed } from "@/lib/admin-auth";
import { listLeads } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function csvCell(value: unknown): string {
  const s = value === null || value === undefined ? "" : String(value);
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET() {
  if (!isAdminAuthed()) {
    return new Response("Unauthorized", { status: 401 });
  }

  const leads = await listLeads(5000);
  const header = [
    "id",
    "full_name",
    "phone",
    "level",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "status",
    "submitted_at",
    "created_at",
  ];
  const rows = leads.map((l) =>
    [
      l.id,
      l.full_name,
      l.phone,
      l.level,
      l.utm_source,
      l.utm_medium,
      l.utm_campaign,
      l.status,
      l.submitted_at,
      l.created_at,
    ]
      .map(csvCell)
      .join(","),
  );
  const csv = [header.join(","), ...rows].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
    },
  });
}
