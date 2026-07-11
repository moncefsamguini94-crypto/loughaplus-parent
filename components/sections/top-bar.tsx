import { topBar } from "@/lib/content";

export function TopBar() {
  return (
    <div className="bg-gradient-to-l from-action-600 to-action-500 text-white">
      <p className="container py-2.5 text-center text-[13px] font-semibold leading-5 md:text-[14px]">
        {topBar.message}
      </p>
    </div>
  );
}
