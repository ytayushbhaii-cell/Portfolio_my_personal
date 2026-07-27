import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Bot, ImagePlus, Loader2, Save, Smartphone, Sparkles, Trash2, Upload, Wrench, X, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { uploadProjectMedia } from "@/lib/storage";
import { categoriesQuery, type Project, type ProjectType } from "@/lib/queries";
import { toast } from "sonner";

type FormState = {
  project_type: ProjectType;
  name: string;
  slug: string;
  category_slug: string;
  short_description: string;
  long_description: string;
  features: string;
  tags: string;
  featured: boolean;
  hidden: boolean;
  thumbnail_url: string;
  screenshots: string[];
  apk_url: string;
  apk_external_url: string;
  website_url: string;
  bot_url: string;
};

const initial: FormState = {
  project_type: "android",
  name: "", slug: "", category_slug: "", short_description: "", long_description: "",
  features: "", tags: "",
  featured: false, hidden: false, thumbnail_url: "", screenshots: [],
  apk_url: "", apk_external_url: "", website_url: "", bot_url: "",
};

const typeOptions: { value: ProjectType; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
  { value: "android", label: "Android App", icon: Smartphone, desc: "APK download or external link" },
  { value: "website", label: "Website", icon: Globe, desc: "Live website URL" },
  { value: "telegram", label: "Telegram Bot", icon: Bot, desc: "t.me/... bot link" },
  { value: "automation", label: "Automation", icon: Wrench, desc: "Scripts, workflows, integrations" },
  { value: "other", label: "Other", icon: Sparkles, desc: "Anything else" },
];

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

export function ProjectEditor({ existing }: { existing?: Project }) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: categories = [] } = useQuery(categoriesQuery());

  const [step, setStep] = useState<"type" | "form">(existing ? "form" : "type");
  const [form, setForm] = useState<FormState>(() => existing ? {
    project_type: existing.project_type,
    name: existing.name,
    slug: existing.slug,
    category_slug: existing.category_slug,
    short_description: existing.short_description,
    long_description: existing.long_description,
    features: existing.features.join("\n"),
    tags: existing.tags.join(", "),
    featured: existing.featured,
    hidden: existing.hidden,
    thumbnail_url: existing.thumbnail_url || "",
    screenshots: existing.screenshots,
    apk_url: existing.apk_url || "",
    apk_external_url: existing.apk_external_url || "",
    website_url: existing.website_url || "",
    bot_url: existing.bot_url || "",
  } : initial);

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<"thumb" | "screenshot" | "apk" | null>(null);
  const [slugTouched, setSlugTouched] = useState(!!existing);

  useEffect(() => {
    if (!slugTouched) setForm((f) => ({ ...f, slug: slugify(f.name) }));
  }, [form.name, slugTouched]);

  // Set default category once categories load
  useEffect(() => {
    if (!existing && !form.category_slug && categories.length > 0) {
      setForm((f) => ({ ...f, category_slug: categories[0].slug }));
    }
  }, [categories, existing, form.category_slug]);

  function set<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onUploadFile(file: File, kind: "thumb" | "screenshot" | "apk") {
    setUploading(kind);
    try {
      const folder = kind === "apk" ? "apks" : "images";
      const url = await uploadProjectMedia(file, folder);
      if (kind === "thumb") set("thumbnail_url", url);
      else if (kind === "screenshot") set("screenshots", [...form.screenshots, url]);
      else set("apk_url", url);
      toast.success("Uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(null);
    }
  }

  async function onUploadScreenshots(files: File[]) {
    setUploading("screenshot");
    try {
      const urls: string[] = [];
      for (const file of files) {
        const url = await uploadProjectMedia(file, "images");
        urls.push(url);
      }
      setForm((f) => ({ ...f, screenshots: [...f.screenshots, ...urls] }));
      toast.success(`Uploaded ${urls.length} screenshot${urls.length === 1 ? "" : "s"}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(null);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.slug || !form.category_slug) { toast.error("Name, slug and category are required"); return; }
    setSaving(true);

    const t = form.project_type;
    const payload = {
      project_type: t,
      name: form.name,
      slug: form.slug,
      category_slug: form.category_slug,
      short_description: form.short_description,
      long_description: form.long_description,
      features: form.features.split("\n").map((s) => s.trim()).filter(Boolean),
      tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
      featured: form.featured,
      hidden: form.hidden,
      thumbnail_url: form.thumbnail_url || null,
      screenshots: form.screenshots,
      apk_url: t === "android" ? (form.apk_url || null) : null,
      apk_external_url: t === "android" ? (form.apk_external_url || null) : null,
      website_url: t === "website" ? (form.website_url || null) : null,
      bot_url: t === "telegram" ? (form.bot_url || null) : null,
    };

    const q = existing
      ? supabase.from("projects").update(payload).eq("id", existing.id)
      : supabase.from("projects").insert(payload);

    const { error } = await q;
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(existing ? "Project updated" : "Project created");
    qc.invalidateQueries();
    navigate({ to: "/admin/projects" });
  }

  if (step === "type") {
    return (
      <div className="space-y-6">
        <button type="button" onClick={() => navigate({ to: "/admin/projects" })} className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New project</h1>
          <p className="mt-2 text-muted-foreground">Choose the project type — we'll only ask for what's relevant.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {typeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { set("project_type", opt.value); setStep("form"); }}
              className="surface-card hover:[&]:surface-card-hover text-left p-6 transition"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl btn-primary">
                <opt.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold">{opt.label}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const t = form.project_type;
  const typeLabel = typeOptions.find((o) => o.value === t)?.label || "Project";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={() => existing ? navigate({ to: "/admin/projects" }) : setStep("type")} className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> {existing ? "Back" : "Change type"}
        </button>
        <button type="submit" disabled={saving} className="btn-primary hover:[&]:btn-primary-hover inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold disabled:opacity-70">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {existing ? "Save changes" : "Create project"}
        </button>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">{typeLabel}</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          {existing ? "Edit project" : `New ${typeLabel}`}
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <Section title="Basics">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t === "telegram" ? "Bot name" : "Project name"} required value={form.name} onChange={(v) => set("name", v)} />
              <Field label="Slug (URL)" required value={form.slug} onChange={(v) => { set("slug", slugify(v)); setSlugTouched(true); }} />
              <div>
                <Label>Category</Label>
                <select value={form.category_slug} onChange={(e) => set("category_slug", e.target.value)} className={inputCls}>
                  <option value="" disabled>{categories.length ? "Select a category" : "No categories yet"}</option>
                  {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                </select>
                {categories.length === 0 && (
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    <button type="button" onClick={() => navigate({ to: "/admin/categories" })} className="text-primary font-medium hover:underline">Create a category</button> first, then come back.
                  </p>
                )}
              </div>
              {existing && (
                <div>
                  <Label>Project type</Label>
                  <select value={form.project_type} onChange={(e) => set("project_type", e.target.value as ProjectType)} className={inputCls}>
                    {typeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              )}
            </div>
            <div className="mt-4">
              <Label>Short description</Label>
              <textarea rows={2} value={form.short_description} onChange={(e) => set("short_description", e.target.value)} className={inputCls} maxLength={300} />
            </div>
            <div className="mt-4">
              <Label>Full description</Label>
              <textarea rows={6} value={form.long_description} onChange={(e) => set("long_description", e.target.value)} className={inputCls} />
            </div>
          </Section>

          <Section title="Features & Tags">
            <div>
              <Label>Features (one per line)</Label>
              <textarea rows={5} value={form.features} onChange={(e) => set("features", e.target.value)} className={inputCls} placeholder={"Dark mode\nOffline support\nPush notifications"} />
            </div>
            <div className="mt-4">
              <Field label="Tags (comma separated)" value={form.tags} onChange={(v) => set("tags", v)} placeholder="finance, mobile, productivity" />
            </div>
          </Section>

          {t === "android" && (
            <Section title="APK">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="External APK link" value={form.apk_external_url} onChange={(v) => set("apk_external_url", v)} placeholder="https://drive.google.com/..." />
                <div>
                  <Label>Or upload APK</Label>
                  <FileInput
                    accept=".apk,application/vnd.android.package-archive"
                    onFile={(f) => onUploadFile(f, "apk")}
                    loading={uploading === "apk"}
                    label={form.apk_url ? "Replace APK" : "Upload APK"}
                  />
                  {form.apk_url && (
                    <div className="mt-2 flex items-center justify-between rounded-lg bg-secondary p-2 text-xs">
                      <a href={form.apk_url} target="_blank" rel="noreferrer" className="truncate text-primary hover:underline">Uploaded APK</a>
                      <button type="button" onClick={() => set("apk_url", "")} className="text-destructive"><X className="h-3.5 w-3.5" /></button>
                    </div>
                  )}
                </div>
              </div>
            </Section>
          )}

          {t === "website" && (
            <Section title="Website">
              <Field label="Website link" value={form.website_url} onChange={(v) => set("website_url", v)} placeholder="https://example.com" />
            </Section>
          )}

          {t === "telegram" && (
            <Section title="Bot">
              <Field label="Bot link" value={form.bot_url} onChange={(v) => set("bot_url", v)} placeholder="https://t.me/yourbot" />
            </Section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Section title="Visibility">
            <label className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
              <div>
                <div className="text-sm font-semibold">Featured</div>
                <div className="text-xs text-muted-foreground">Show on the homepage.</div>
              </div>
              <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="h-5 w-5 rounded" />
            </label>
            <label className="mt-3 flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
              <div>
                <div className="text-sm font-semibold">Hidden</div>
                <div className="text-xs text-muted-foreground">Hide from the public site.</div>
              </div>
              <input type="checkbox" checked={form.hidden} onChange={(e) => set("hidden", e.target.checked)} className="h-5 w-5 rounded" />
            </label>
          </Section>

          <Section title="Thumbnail">
            {form.thumbnail_url ? (
              <div className="relative overflow-hidden rounded-xl border border-border">
                <img src={form.thumbnail_url} alt="" className="aspect-video w-full object-cover" />
                <button type="button" onClick={() => set("thumbnail_url", "")} className="absolute top-2 right-2 grid h-8 w-8 place-items-center rounded-lg bg-background/90 text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <FileInput accept="image/*" onFile={(f) => onUploadFile(f, "thumb")} loading={uploading === "thumb"} label="Upload thumbnail" big />
            )}
          </Section>

          <Section title="Screenshots">
            {form.screenshots.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {form.screenshots.map((s, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-lg border border-border">
                    <img src={s} alt="" className="h-full w-full object-cover" />
                    <button type="button" onClick={() => set("screenshots", form.screenshots.filter((_, j) => j !== i))} className="absolute top-1 right-1 grid h-6 w-6 place-items-center rounded-md bg-background/90 text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-3">
              <FileInput accept="image/*" multiple onFiles={(files) => onUploadScreenshots(files)} loading={uploading === "screenshot"} label="Add screenshots (select multiple)" icon={<ImagePlus className="h-4 w-4" />} />
            </div>
          </Section>
        </div>
      </div>
    </form>
  );
}

const inputCls = "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-medium">{children}</label>;
}
function Field({ label, value, onChange, required, type = "text", placeholder }: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <Label>{label}{required && <span className="text-destructive"> *</span>}</Label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} placeholder={placeholder} className={inputCls} />
    </div>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="surface-card p-6">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
function FileInput({ accept, onFile, onFiles, multiple, loading, label, big, icon }: {
  accept: string; onFile?: (f: File) => void; onFiles?: (files: File[]) => void; multiple?: boolean; loading: boolean; label: string; big?: boolean; icon?: React.ReactNode;
}) {
  return (
    <label className={`flex ${big ? "aspect-video flex-col" : ""} cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-background px-4 py-3 text-sm font-medium hover:border-primary/50 ${loading ? "opacity-70" : ""}`}>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (icon || <Upload className="h-4 w-4" />)}
      <span>{loading ? "Uploading..." : label}</span>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length) {
            if (multiple && onFiles) onFiles(files);
            else if (onFile) onFile(files[0]);
          }
          e.target.value = "";
        }}
      />
    </label>
  );
}
