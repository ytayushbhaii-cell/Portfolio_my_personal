import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { settingsQuery, type SiteSettings } from "@/lib/queries";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_authed/settings")({
  loader: ({ context }) => context.queryClient.ensureQueryData(settingsQuery()),
  component: Settings,
});

function Settings() {
  const settings = useSuspenseQuery(settingsQuery()).data;
  const qc = useQueryClient();
  const [form, setForm] = useState<Partial<SiteSettings>>(settings || {});
  const [saving, setSaving] = useState(false);

  function set<K extends keyof SiteSettings>(k: K, v: SiteSettings[K]) { setForm((f) => ({ ...f, [k]: v })); }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("site_settings").update({ ...form, updated_at: new Date().toISOString() }).eq("id", 1);
    setSaving(false);
    if (error) toast.error(error.message);
    else { toast.success("Settings saved"); qc.invalidateQueries({ queryKey: ["site_settings"] }); }
  }

  const inputCls = "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Site info, SEO and social links.</p>
        </div>
        <button disabled={saving} className="btn-primary hover:[&]:btn-primary-hover inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold disabled:opacity-70">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
        </button>
      </div>

      <div className="surface-card p-6 space-y-4">
        <h2 className="text-lg font-bold">Site</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="text-sm font-medium">Site name</label><input value={form.site_name || ""} onChange={(e) => set("site_name", e.target.value)} className={inputCls} /></div>
          <div><label className="text-sm font-medium">Primary color</label><input value={form.primary_color || ""} onChange={(e) => set("primary_color", e.target.value)} className={inputCls} placeholder="#2563EB" /></div>
        </div>
        <div><label className="text-sm font-medium">Tagline</label><input value={form.tagline || ""} onChange={(e) => set("tagline", e.target.value)} className={inputCls} /></div>
        <div><label className="text-sm font-medium">Bio</label><textarea rows={4} value={form.bio || ""} onChange={(e) => set("bio", e.target.value)} className={inputCls} /></div>
      </div>

      <div className="surface-card p-6 space-y-4">
        <h2 className="text-lg font-bold">Contact & Social</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="text-sm font-medium">Email</label><input value={form.email || ""} onChange={(e) => set("email", e.target.value)} className={inputCls} /></div>
          <div><label className="text-sm font-medium">Telegram (@handle)</label><input value={form.telegram || ""} onChange={(e) => set("telegram", e.target.value)} className={inputCls} /></div>
          <div><label className="text-sm font-medium">GitHub URL</label><input value={form.github || ""} onChange={(e) => set("github", e.target.value)} className={inputCls} /></div>
          <div><label className="text-sm font-medium">Twitter URL</label><input value={form.twitter || ""} onChange={(e) => set("twitter", e.target.value)} className={inputCls} /></div>
          <div><label className="text-sm font-medium">LinkedIn URL</label><input value={form.linkedin || ""} onChange={(e) => set("linkedin", e.target.value)} className={inputCls} /></div>
        </div>
      </div>

      <div className="surface-card p-6 space-y-4">
        <h2 className="text-lg font-bold">SEO</h2>
        <div><label className="text-sm font-medium">SEO title</label><input value={form.seo_title || ""} onChange={(e) => set("seo_title", e.target.value)} className={inputCls} /></div>
        <div><label className="text-sm font-medium">SEO description</label><textarea rows={2} value={form.seo_description || ""} onChange={(e) => set("seo_description", e.target.value)} className={inputCls} maxLength={200} /></div>
      </div>
    </form>
  );
}
