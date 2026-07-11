import type { Metadata } from "next";
import Link from "next/link";
import { ConfirmationView } from "@/components/sections/confirmation-view";

export const metadata: Metadata = {
  title: "تأكيد الطلب",
  robots: { index: false, follow: false },
};

export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: { name?: string; goal?: string };
}) {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center gradient-mesh px-5 py-12">
      <ConfirmationView name={searchParams.name} goal={searchParams.goal} />
      <Link
        href="/"
        className="mt-6 text-[14px] font-medium text-brand-700 underline-offset-4 hover:underline"
      >
        الرجوع للصفحة الرئيسية
      </Link>
    </main>
  );
}
