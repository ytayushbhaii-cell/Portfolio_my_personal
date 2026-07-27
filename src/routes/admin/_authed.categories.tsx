import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Edit, Loader2, Plus, Save, Trash2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { categoriesQuery, projectsQuery, type Category } from "@/lib/queries";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_authed/categories")({
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(categoriesQuery()),
      context.queryClient.ensureQueryData(projectsQuery()),
    ]),
  component: AdminCategories,
});

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
}

const iconChoices = ["Smartphone", "Globe", "Bot", "Zap", "Wrench", "Palette"];

function AdminCategories() {
  const categories = useSuspenseQuery(categoriesQuery()).data;
  const projects = useSuspenseQuery(projectsQuery()).data;
  const qc = useQueryClient();

  const [editing, setEditing] = useState<Category | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [icon, setIcon] = useState("Sparkles");
  const [busy, setBusy] = useState(false);

  function open(c?: Category) {
    if (c) { setEditing(c); setName(c.name); setSlug(c.slug); setIcon(c.icon || "Sparkles"); }
    else { setEditing(null); setName(""); setSlug(""); setIcon("Sparkles"); }
    setShowForm(true);
  }

  function refresh() {
    qc.invalidateQueries({ queryKey: ["categories"] });
    qc.invalidateQueries({ queryKey: ["projects"] });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) { toast.error("Name and slug are required"); return; }
    setBusy(true);
    const payload = { name: name.trim(), slug: slug.trim(), icon };
    const q = editing
      ? supabase.from("categories").update(payload).eq("id", editing.id)
      : supabase.from("categories").insert({ ...payload, sort_order: categories.length });
    const { error } = await q;
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success(editing ? "Category updated" : "Category added");
    setShowForm(false);
    refresh();
  }

  async function remove(c: Category) {
    const inUse = projects.some((p) => p.category_slug === c.slug);
    if (inUse) { toast.error("This category has projects. Reassign them first."); return; }
    if (!confirm(`Delete category "${c.name}"?`)) return;
    const { error } = await supabase.from("categories").delete().eq("id", c.id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); refresh(); }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="mt-1 text-sm text-muted-foreground">Categories automatically appear as filters on your portfolio.</p>
        </div>
        <button onClick={() => open()} className="btn-primary hover:[&]:btn-primary-hover inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold">
          <Plus className="h-4 w-4" /> New Category
        </button>
      </div>

      {showForm && (
        <form onSubmit={save} className="surface-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">{editing ? "Edit category" : "New category"}</h2>
            <button type="button" onClick={() => setShowForm(false)} className="grid h-8 w-8 place-items-center rounded-lg border border-border">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                value={name}
                onChange={(e) => { setName(e.target.value); if (!editing) setSlug(slugify(e.target.value)); }}
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                placeholder="Android Apps"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Slug</label>
              <input
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                placeholder="android-apps"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium">Icon</label>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {iconChoices.map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIcon(i)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${icon === i ? "border-primary bg-primary/10 text-primary" : "border-border bg-background"}`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={busy} className="btn-primary hover:[&]:btn-primary-hover inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold disabled:opacity-70">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {editing ? "Save" : "Create"}
            </button>
          </div>
        </form>
      )}

      <div className="surface-card overflow-hidden">
        <div className="divide-y divide-border">
          {categories.length === 0 && <div className="p-8 text-center text-sm text-muted-foreground">No categories yet.</div>}
          {categories.map((c) => {
            const count = projects.filter((p) => p.category_slug === c.slug).length;
            return (
              <div key={c.id} className="flex items-center justify-between gap-3 px-6 py-4">
                <div className="min-w-0">
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs text-muted-foreground">/{c.slug} · {count} {count === 1 ? "project" : "projects"}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => open(c)} className="grid h-8 w-8 place-items-center rounded-lg border border-border hover:border-primary/40" title="Edit">
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => remove(c)} className="grid h-8 w-8 place-items-center rounded-lg border border-border text-destructive hover:border-destructive" title="Delete">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
