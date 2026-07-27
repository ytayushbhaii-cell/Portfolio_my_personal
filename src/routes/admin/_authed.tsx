import { createFileRoute, Link, Outlet, redirect, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BarChart3, Boxes, Home, Inbox, LogOut, Menu, Settings, Tag, X, Code2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_authed")({
  ssr: false,
  beforeLoad: async () => {
    const { data: userData, error } = await supabase.auth.getUser();
    if (error || !userData.user) throw redirect({ to: "/admin/login" });
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", userData.user.id);
    const isAdmin = (roles ?? []).some((r) => r.role === "admin");
    if (!isAdmin) throw redirect({ to: "/admin/login", search: { denied: 1 } as never });
    return { userEmail: userData.user.email };
  },
  component: AdminLayout,
});

const nav = [
  { to: "/admin", label: "Dashboard", icon: Home, exact: true },
  { to: "/admin/projects", label: "Projects", icon: Boxes },
  { to: "/admin/categories", label: "Categories", icon: Tag },
  { to: "/admin/messages", label: "Messages", icon: Inbox },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

function AdminLayout() {
  const { userEmail } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [pathname]);

  async function onLogout() {
    await supabase.auth.signOut();
    toast.success("Signed out");
    window.location.href = "/admin/login";
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar (mobile) */}
      <div className="lg:hidden sticky top-0 z-40 glass-nav flex items-center justify-between px-4 py-3">
        <Link to="/admin" className="flex items-center gap-2 font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg btn-primary"><Code2 className="h-4 w-4" /></span>
          <span>Admin</span>
        </Link>
        <button onClick={() => setOpen((o) => !o)} className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="lg:flex">
        {/* Sidebar */}
        <aside className={`${open ? "block" : "hidden"} lg:block lg:fixed lg:inset-y-0 lg:w-64 lg:border-r lg:border-border lg:bg-card`}>
          <div className="hidden lg:flex h-16 items-center gap-2 border-b border-border px-6 font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl btn-primary"><Code2 className="h-4 w-4" /></span>
            <span>Ayush<span className="gradient-text">Dev</span></span>
            <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary uppercase">Admin</span>
          </div>
          <nav className="p-4 space-y-1">
            {nav.map((n) => {
              const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <n.icon className="h-4 w-4" /> {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto border-t border-border p-4">
            <div className="mb-3 truncate text-xs text-muted-foreground">{userEmail}</div>
            <div className="flex gap-2">
              <a href="/" className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-center text-xs font-medium hover:border-primary/40">View Site</a>
              <button onClick={onLogout} className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-background hover:border-primary/40" aria-label="Sign out">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 lg:pl-64">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
