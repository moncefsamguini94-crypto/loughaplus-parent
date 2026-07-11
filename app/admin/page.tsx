import type { Metadata } from "next";
import { adminConfigured, isAdminAuthed } from "@/lib/admin-auth";
import { getLeadStats, hasDatabase, listLeads } from "@/lib/db";
import { AdminLogin } from "@/components/admin/login-form";
import { LeadsTable } from "@/components/admin/leads-table";
import { LogoutButton } from "@/components/admin/logout-button";

export const metadata: Metadata = {
  title: "الإدارة",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!adminConfigured()) {
    return (
      <Notice
        title="كلمة السر ديال الإدارة ما مضبوطةش"
        body="خاصك تضبط كلمة السر فالبيئة باش تخدم لوحة الإدارة."
      />
    );
  }

  if (!isAdminAuthed()) {
    return <AdminLogin />;
  }

  if (!hasDatabase()) {
    return (
      <Notice
        title="رابط قاعدة البيانات ما مضبوطش"
        body="خاصك تضبط رابط قاعدة البيانات باش تخزن وتعرض الطلبات."
      />
    );
  }

  const [leads, stats] = await Promise.all([listLeads(500), getLeadStats()]);

  return (
    <main dir="rtl" className="min-h-[100svh] bg-muted">
      <header className="border-b border-border bg-card">
        <div className="container flex items-center justify-between py-4">
          <div>
            <h1 className="text-[20px] font-bold text-brand-900">لوغة — الطلبات</h1>
            <p className="text-[13px] text-muted-foreground">
              لوحة الإدارة
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/api/admin/export"
              className="rounded-full border border-border bg-card px-4 py-2 text-[13px] font-semibold text-brand-700 hover:bg-muted"
            >
              تحميل الملف
            </a>
            <LogoutButton />
          </div>
        </div>
      </header>

      <section className="container py-6">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="مجموع الطلبات" value={stats.total} />
          <StatCard label="طلبات اليوم" value={stats.today} />
          <StatCard label="تم التواصل" value={stats.byStatus.contacted ?? 0} />
          <StatCard label="تحولو لزبناء" value={stats.byStatus.converted ?? 0} />
        </dl>

        <div className="mt-6">
          <LeadsTable initialLeads={leads} />
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
      <span className="block text-[26px] font-bold text-brand-700">{value}</span>
      <span className="mt-0.5 block text-[12px] text-muted-foreground">{label}</span>
    </div>
  );
}

function Notice({ title, body }: { title: string; body: string }) {
  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-muted px-5">
      <div className="max-w-md rounded-[24px] border border-border bg-card p-7 text-center shadow-md">
        <h1 className="text-[20px] font-bold text-brand-900">{title}</h1>
        <p className="mt-2 text-[14px] leading-6 text-muted-foreground">{body}</p>
      </div>
    </main>
  );
}
