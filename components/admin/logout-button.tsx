"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const onClick = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  };
  return (
    <Button variant="secondary" size="sm" onClick={onClick}>
      <LogOut className="size-4" />
      خروج
    </Button>
  );
}
