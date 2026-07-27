import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Copy, Edit, Eye, EyeOff, Plus, Search, Star, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { adminProjectsQuery, type Project } from "@/lib/queries";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_authed/projects/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(adminProjectsQuery()),
  component: AdminProjects,
});

function AdminProjects() {
  const projects = useSuspenseQuery(adminProjectsQuery()).data;
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const filtered = projects.filter((p) =>
    !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.category_slug.includes(q.toLowerCase())
  );

  async function toggleFeatured(p: Project) {
    const { error } = await supabase.from("projects").update({ featured: !p.featured }).eq("id", p.id);
    if (error) toast.error(error.message);
    else { toast.success(p.featured ? "Unfeatured" : "Featured"); refresh(); }
  }
  async function toggleHidden(p: Project) {
    const { error } = await supabase.from("projects").update({ hidden: !p.hidden }).eq("id", p.id);
    if (error) toast.error(error.message);
    else { toast.success(p.hidden ? "Now visible" : "Hidden"); refresh(); }
  }
  async function remove(p: Project) {
    if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("projects").delete().eq("id", p.id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); refresh(); }
  }
  async function duplicate(p: Project) {
    const { id: _id, created_at: _c, updated_at: _u, view_count: _v, download_count: _d, ...rest } = p;
    const copy = { ...rest, name: `${p.name} (Copy)`, slug: `${p.slug}-${crypto.randomUUID().slice(0, 6)}`, featured: false };
    const { data, error } = await supabase.from("projects").insert(copy).select().single();
    if (error) toast.error(error.message);
    else { toast.success("Duplicated"); qc.invalidateQueries(); navigate({ to: "/admin/projects/$id", params: { id: (data as { id: string }).id } }); }
  }
  function refresh() { qc.invalidateQueries({ queryKey: ["admin", "projects"] }); qc.invalidateQueries({ queryKey: ["projects"] }); }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage everything visible on your portfolio.</p>
        </div>
        <Link to="/admin/projects/new" className="btn-primary hover:[&]:btn-primary-hover inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold">
          <Plus className="h-4 w-4" /> New Project
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search projects..."
          className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary"
        />
      </div>

      <div className="surface-card overflow-hidden">
        <div className="hidden md:grid grid-cols-[minmax(0,2fr)_1fr_auto_auto_auto] gap-4 border-b border-border px-6 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <div>Project</div><div>Category</div><div>Views</div><div>Downloads</div><div>Actions</div>
        </div>
        <div className="divide-y divide-border">
          {filtered.length === 0 && <div className="p-8 text-center text-sm text-muted-foreground">No projects yet.</div>}
          {filtered.map((p) => (
            <div key={p.id} className="grid gap-3 px-4 py-4 sm:px-6 md:grid-cols-[minmax(0,2fr)_1fr_auto_auto_auto] md:items-center md:gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-secondary">
                  {p.thumbnail_url ? <img src={p.thumbnail_url} alt="" className="h-full w-full object-cover" /> : null}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 truncate font-semibold">
                    {p.name}
                    {p.featured && <Star className="h-3.5 w-3.5 fill-primary text-primary" />}
                    {p.hidden && <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">HIDDEN</span>}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">/{p.slug}</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">{p.category_slug}</div>
              <div className="text-sm">{p.view_count}</div>
              <div className="text-sm">{p.download_count}</div>
              <div className="flex flex-wrap items-center gap-1">
                <button onClick={() => toggleFeatured(p)} className="grid h-8 w-8 place-items-center rounded-lg border border-border hover:border-primary/40" title="Toggle featured">
                  <Star className={`h-3.5 w-3.5 ${p.featured ? "fill-primary text-primary" : ""}`} />
                </button>
                <button onClick={() => toggleHidden(p)} className="grid h-8 w-8 place-items-center rounded-lg border border-border hover:border-primary/40" title="Show/Hide">
                  {p.hidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
                <button onClick={() => duplicate(p)} className="grid h-8 w-8 place-items-center rounded-lg border border-border hover:border-primary/40" title="Duplicate">
                  <Copy className="h-3.5 w-3.5" />
                </button>
                <Link to="/admin/projects/$id" params={{ id: p.id }} className="grid h-8 w-8 place-items-center rounded-lg border border-border hover:border-primary/40" title="Edit">
                  <Edit className="h-3.5 w-3.5" />
                </Link>
                <button onClick={() => remove(p)} className="grid h-8 w-8 place-items-center rounded-lg border border-border text-destructive hover:border-destructive" title="Delete">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
