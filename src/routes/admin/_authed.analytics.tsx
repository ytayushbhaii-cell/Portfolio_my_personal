import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { adminProjectsQuery } from "@/lib/queries";
import { Download, Eye } from "lucide-react";

export const Route = createFileRoute("/admin/_authed/analytics")({
  loader: ({ context }) => context.queryClient.ensureQueryData(adminProjectsQuery()),
  component: Analytics,
});

function Analytics() {
  const projects = useSuspenseQuery(adminProjectsQuery()).data;
  const topViews = [...projects].sort((a, b) => b.view_count - a.view_count).slice(0, 10);
  const topDownloads = [...projects].sort((a, b) => b.download_count - a.download_count).slice(0, 10);
  const totalV = projects.reduce((a, p) => a + p.view_count, 0);
  const totalD = projects.reduce((a, p) => a + p.download_count, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">Views, downloads, and popular projects.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="surface-card p-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground"><Eye className="h-3.5 w-3.5" /> Total Views</div>
          <div className="mt-2 text-3xl font-bold gradient-text">{totalV}</div>
        </div>
        <div className="surface-card p-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground"><Download className="h-3.5 w-3.5" /> Total Downloads</div>
          <div className="mt-2 text-3xl font-bold gradient-text">{totalD}</div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Most viewed" items={topViews} field="view_count" />
        <Card title="Most downloaded" items={topDownloads} field="download_count" />
      </div>
    </div>
  );
}

function Card({ title, items, field }: { title: string; items: { id: string; name: string; view_count: number; download_count: number }[]; field: "view_count" | "download_count" }) {
  const max = Math.max(1, ...items.map((i) => i[field]));
  return (
    <div className="surface-card p-6">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="mt-4 space-y-3">
        {items.length === 0 && <p className="text-sm text-muted-foreground">No data yet.</p>}
        {items.map((p) => (
          <div key={p.id}>
            <div className="flex items-center justify-between text-sm">
              <span className="truncate font-medium">{p.name}</span>
              <span className="text-muted-foreground">{p[field]}</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-secondary overflow-hidden">
              <div className="h-full rounded-full btn-primary" style={{ width: `${(p[field] / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
