import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/admin/reset-password")({
  ssr: false,
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const pw = String(fd.get("password") || "");
    if (pw.length < 6) { toast.error("Password too short"); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Password updated");
    navigate({ to: "/admin" });
  }

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md surface-card p-8">
        <h1 className="text-2xl font-bold">Set new password</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="password"
              name="password"
              required
              placeholder="New password"
              className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none focus:border-primary"
            />
          </div>
          <button disabled={loading} className="btn-primary hover:[&]:btn-primary-hover w-full rounded-xl py-3 text-sm font-semibold">
            {loading ? "Saving..." : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}
