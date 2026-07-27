import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Boxes, Download, Eye, Globe, Inbox, Smartphone, Sparkles, TrendingUp } from "lucide-react";
import { adminProjectsQuery, contactMessagesQuery } from "@/lib/queries";

export const Route = createFileRoute("/admin/_authed/")({
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(adminProjectsQuery()),
      context.queryClient.ensureQueryData(contactMessagesQuery()),
    ]),
  component: Dashboard,
});

function Dashboard() {
  const projects = useSuspenseQuery(adminProjectsQuery()).data;
  const messages = useSuspenseQuery(contactMessagesQuery()).data;

  const apps = projects.filter((p) => p.category_slug === "apps").length;
  const sites = projects.filter((p) => p.category_slug === "websites").length;
  const totalViews = projects.reduce((a, p) => a + p.view_count, 0);
  const totalDownloads = projects.reduce((a, p) => a + p.download_count, 0);
  const featured = projects.filter((p) => p.featured);
  const unread = messages.filter((m) => !m.read).length;

  const stats = [
    { label: "Total Projects", value: projects.length, icon: Boxes, color: "text-primary" },
    { label: "Android Apps", value: apps, icon: Smartphone, color: "text-primary" },
    { label: "Websites", value: sites, icon: Globe, color: "text-accent" },
    { label: "Featured", value: featured.length, icon: Sparkles, color: "text-primary" },
    { label: "Total Views", value: totalViews, icon: Eye, color: "text-primary" },
    { label: "APK Downloads", value: totalDownloads, icon: Download, color: "text-primary" },
    { label: "Unread Messages", value: unread, icon: Inbox, color: "text-primary" },
    { label: "Growth", value: "↗", icon: TrendingUp, color: "text-primary" },
  ];

  const recent = projects.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Overview of your portfolio.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="surface-card p-5">
            <div className="flex items-center justify-between">
              <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{s.label}</div>
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </div>
            <div className="mt-2 text-2xl font-bold">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="surface-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent Projects</h2>
            <Link to="/admin/projects" className="text-xs font-semibold text-primary hover:underline">View all</Link>
          </div>
          <div className="mt-4 divide-y divide-border">
            {recent.length === 0 && <p className="py-6 text-sm text-muted-foreground">No projects yet.</p>}
            {recent.map((p) => (
              <div key={p.id} className="flex items-center gap-3 py-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-secondary">
                  {p.thumbnail_url ? <img src={p.thumbnail_url} alt="" className="h-full w-full object-cover" /> : null}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.category_slug} · {p.view_count} views</div>
                </div>
                <Link to="/admin/projects/$id" params={{ id: p.id }} className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">Edit</Link>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card p-6">
          <h2 className="text-lg font-bold">Latest Messages</h2>
          <div className="mt-4 space-y-3">
            {messages.slice(0, 5).length === 0 && <p className="py-6 text-sm text-muted-foreground">Inbox empty.</p>}
            {messages.slice(0, 5).map((m) => (
              <div key={m.id} className="rounded-xl bg-background p-3 border border-border">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{m.name}</span>
                  <span>{new Date(m.created_at).toLocaleDateString()}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{m.message}</p>
              </div>
            ))}
          </div>
          <Link to="/admin/messages" className="mt-4 block text-center text-xs font-semibold text-primary hover:underline">Open inbox →</Link>
        </div>
      </div>

      <div className="surface-card p-6">
        <h2 className="text-lg font-bold">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/admin/projects/new" className="btn-primary hover:[&]:btn-primary-hover rounded-xl px-4 py-2 text-sm font-semibold">+ Add Project</Link>
          <Link to="/admin/settings" className="rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:border-primary/40">Site Settings</Link>
          <Link to="/admin/analytics" className="rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:border-primary/40">View Analytics</Link>
        </div>
      </div>
    </div>
  );
}
