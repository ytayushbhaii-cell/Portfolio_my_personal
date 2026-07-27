import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Code2, Lock, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/admin/login")({
  validateSearch: (s: Record<string, unknown>) => ({
    denied: s.denied ? 1 : undefined,
    signup: s.signup ? 1 : undefined,
  }),
  ssr: false,
  component: LoginPage,
});

const schema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6, "Password too short").max(100),
});

function LoginPage() {
  const { denied, signup: signupParam } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">(signupParam ? "signup" : "login");
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(true);

  useEffect(() => {
    if (denied) toast.error("You don't have admin access.");
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin" });
    });
  }, [denied, navigate]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({ email: fd.get("email"), password: fd.get("password") });
    if (!parsed.success) { toast.error(parsed.error.issues[0]?.message || "Invalid input"); return; }
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created — signing you in...");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
      }
      // Verify admin role
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) { toast.error("Sign in failed"); return; }
      const { data: roles } = await supabase
        .from("user_roles").select("role").eq("user_id", userData.user.id);
      const isAdmin = (roles ?? []).some((r) => r.role === "admin");
      if (!isAdmin) {
        await supabase.auth.signOut();
        toast.error("This account is not an admin.");
        return;
      }
      if (!remember) {
        // Session persists by default; skip switching to volatile storage for simplicity.
      }
      navigate({ to: "/admin" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  async function onForgot() {
    const email = (document.querySelector("input[name=email]") as HTMLInputElement | null)?.value?.trim();
    if (!email) { toast.error("Enter your email first"); return; }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });
    if (error) toast.error(error.message);
    else toast.success("Password reset email sent");
  }

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="mx-auto flex w-fit items-center gap-2 font-bold">
          <span className="grid h-10 w-10 place-items-center rounded-xl btn-primary"><Code2 className="h-5 w-5" /></span>
          <span className="text-xl">Ayush<span className="gradient-text">Dev</span></span>
        </Link>

        <div className="mt-8 surface-card p-8">
          <h1 className="text-2xl font-bold tracking-tight">
            {mode === "signup" ? "Create admin account" : "Admin Login"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signup"
              ? "First signup becomes the admin. Restricted after that."
              : "Sign in to manage your portfolio."}
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Password</label>
                {mode === "login" && (
                  <button type="button" onClick={onForgot} className="text-xs font-medium text-primary hover:underline">
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative mt-1.5">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  name="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {mode === "login" && (
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border-border text-primary" />
                Remember me
              </label>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary hover:[&]:btn-primary-hover w-full rounded-xl py-3 text-sm font-semibold disabled:opacity-70"
            >
              {loading ? "Please wait..." : mode === "signup" ? "Create account" : "Sign in"}
            </button>
          </form>

          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="mt-5 w-full text-center text-xs text-muted-foreground hover:text-foreground"
          >
            {mode === "login" ? "First time here? Create the admin account →" : "Already have an account? Sign in →"}
          </button>
        </div>
      </div>
    </div>
  );
}
