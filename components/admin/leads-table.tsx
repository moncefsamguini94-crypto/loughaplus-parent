"use client";

import { useState } from "react";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { buildWhatsAppLink } from "@/lib/utils";
import { site } from "@/lib/content";
import type { LeadRow } from "@/lib/db";

const STATUSES = ["new", "contacted", "converted", "lost"] as const;

const statusStyles: Record<string, string> = {
  new: "bg-brand-100 text-brand-700",
  contacted: "bg-[#FFF4E0] text-warning",
  converted: "bg-action-100 text-action-600",
  lost: "bg-destructive/10 text-destructive",
};

function formatDate(value: string | null) {
  if (!value) return "—";
  const d = new Date(value);
  return d.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function LeadsTable({ initialLeads }: { initialLeads: LeadRow[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [pending, setPending] = useState<string | null>(null);

  const updateStatus = async (id: string, status: string) => {
    setPending(id);
    const prev = leads;
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) setLeads(prev); // revert on failure
    setPending(null);
  };

  if (leads.length === 0) {
    return (
      <p className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
        ماكاين حتى طلب دابا.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full min-w-[760px] text-start text-[14px]">
        <thead className="bg-muted text-[12px] uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3 text-start font-semibold">الاسم</th>
            <th className="px-4 py-3 text-start font-semibold">الهاتف</th>
            <th className="px-4 py-3 text-start font-semibold">المستوى</th>
            <th className="px-4 py-3 text-start font-semibold">المصدر</th>
            <th className="px-4 py-3 text-start font-semibold">الحملة</th>
            <th className="px-4 py-3 text-start font-semibold">التاريخ</th>
            <th className="px-4 py-3 text-start font-semibold">الحالة</th>
            <th className="px-4 py-3 text-start font-semibold">الإجراء</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {leads.map((l) => (
            <tr key={l.id} className="hover:bg-muted/50">
              <td className="px-4 py-3 font-medium text-brand-900">{l.full_name}</td>
              <td className="px-4 py-3" dir="ltr">{l.phone}</td>
              <td className="px-4 py-3">{l.level}</td>
              <td className="px-4 py-3 text-muted-foreground">{l.utm_source ?? "—"}</td>
              <td className="px-4 py-3 text-muted-foreground">{l.utm_campaign ?? "—"}</td>
              <td className="px-4 py-3 text-muted-foreground" dir="ltr">
                {formatDate(l.created_at)}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                    statusStyles[l.status] ?? "bg-muted text-muted-foreground"
                  }`}
                >
                  {l.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <select
                    aria-label="بدل الحالة"
                    value={l.status}
                    disabled={pending === l.id}
                    onChange={(e) => updateStatus(l.id, e.target.value)}
                    className="h-9 rounded-lg border border-input bg-card px-2 text-[13px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <a
                    href={buildWhatsAppLink(
                      site.whatsappPhone,
                      `السلام ${l.full_name}، من Lougha Institute بخصوص الـ test niveau.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-whatsapp px-3 py-2 text-[13px] font-medium text-white"
                  >
                    <WhatsAppIcon className="size-4" />
                    واتساب
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
