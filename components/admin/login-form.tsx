"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.refresh();
    } else {
      setLoading(false);
      setError(res.status === 401 ? "كلمة السر غلط." : "وقع مشكل، عاود حاول.");
    }
  };

  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-muted px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-[24px] border border-border bg-card p-7 shadow-md"
      >
        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
          <Lock className="size-6" aria-hidden="true" />
        </span>
        <h1 className="mt-4 text-center text-[22px] font-bold text-brand-900">
          إدارة لوغة
        </h1>
        <p className="mt-1 text-center text-[14px] text-muted-foreground">
          هاد البلاصة خاصة بالإدارة — خاصك تدخل.
        </p>

        <div className="mt-6 space-y-2 text-start" dir="rtl">
          <Label htmlFor="password">كلمة السر</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            hasError={!!error}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          {error ? (
            <p className="flex items-center gap-1.5 text-[13px] font-medium text-destructive">
              <AlertCircle className="size-3.5" aria-hidden="true" />
              {error}
            </p>
          ) : null}
        </div>

        <Button type="submit" size="lg" className="mt-6 w-full" disabled={loading}>
          {loading ? <Loader2 className="size-5 animate-spin" /> : "دخول"}
        </Button>
      </form>
    </div>
  );
}
