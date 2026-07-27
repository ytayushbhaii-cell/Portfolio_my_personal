import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ArrowLeft, Bot, Check, Copy, Download, ExternalLink, Share2, Star } from "lucide-react";
import { projectBySlugQuery, projectsQuery } from "@/lib/queries";
import { supabase } from "@/integrations/supabase/client";
import { ProjectCard } from "@/components/site/ProjectCard";
import { toast } from "sonner";

export const Route = createFileRoute("/projects_/$slug")({
  loader: async ({ context, params }) => {
    const project = await context.queryClient.ensureQueryData(projectBySlugQuery(params.slug));
    if (!project || project.hidden) throw notFound();
    await context.queryClient.ensureQueryData(projectsQuery());
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project — Ayush Dev" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.project;
    const title = p.seo_title || `${p.name} — Ayush Dev`;
    const desc = p.seo_description || p.short_description;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(p.thumbnail_url ? [{ property: "og:image", content: p.thumbnail_url }] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Project not found</h1>
      <Link to="/projects" className="mt-6 inline-flex btn-primary hover:[&]:btn-primary-hover rounded-xl px-4 py-2 text-sm font-semibold">Back to projects</Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <Link to="/projects" className="mt-6 inline-flex btn-primary rounded-xl px-4 py-2 text-sm font-semibold">Back to projects</Link>
    </div>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { slug } = Route.useParams();
  const project = useSuspenseQuery(projectBySlugQuery(slug)).data!;
  const all = useSuspenseQuery(projectsQuery()).data;
  const [activeShot, setActiveShot] = useState(0);

  useEffect(() => {
    void supabase.rpc("increment_project_view", { _slug: slug }).then(() => {});
  }, [slug]);

  const related = all.filter((p) => p.id !== project.id && p.category_slug === project.category_slug).slice(0, 3);
  const shots = project.screenshots.length ? project.screenshots : project.thumbnail_url ? [project.thumbnail_url] : [];
  const type = project.project_type;
  const apkUrl = project.apk_url || project.apk_external_url;

  const primary =
    type === "android" && apkUrl
      ? { href: apkUrl, label: "Download APK", icon: <Download className="h-4 w-4" />, count: true }
      : type === "website" && project.website_url
        ? { href: project.website_url, label: "Visit Website", icon: <ExternalLink className="h-4 w-4" />, count: false }
        : type === "telegram" && project.bot_url
          ? { href: project.bot_url, label: "Open Bot", icon: <Bot className="h-4 w-4" />, count: false }
          : null;

  const onPrimary = () => {
    if (!primary) return;
    if (primary.count) {
      void supabase.rpc("increment_project_download", { _slug: slug }).then(() => {});
    }
    window.open(primary.href, "_blank", "noopener,noreferrer");
  };

  const onShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try { await (navigator as Navigator & { share: (d: ShareData) => Promise<void> }).share({ title: project.name, url }); return; } catch { /* fall through */ }
    }
    await navigator.clipboard.writeText(url);
    toast.success("Link copied!");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/projects" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to projects
      </Link>

      {/* Banner */}
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="surface-card overflow-hidden">
          {shots.length > 0 ? (
            <>
              <div className="relative aspect-[16/10] bg-secondary flex items-center justify-center">
                <img src={shots[activeShot]} alt={project.name} className="max-h-full max-w-full object-contain" />
              </div>
              {shots.length > 1 && (
                <div className="flex gap-2 overflow-x-auto p-3">
                  {shots.map((s, i) => (
                    <button key={i} onClick={() => setActiveShot(i)} className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 bg-secondary flex items-center justify-center ${i === activeShot ? "border-primary" : "border-transparent opacity-70"}`}>
                      <img src={s} alt="" className="max-h-full max-w-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="grid aspect-[16/10] place-items-center bg-secondary text-4xl font-black gradient-text">
              {project.name.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/projects"
              search={{ category: project.category_slug } as never}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wide hover:bg-primary/15"
            >
              {project.category_slug.replace(/-/g, " ")}
            </Link>
            {project.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
                <Star className="h-3 w-3 fill-primary text-primary" /> Featured
              </span>
            )}
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{project.name}</h1>
          <p className="mt-3 text-muted-foreground">{project.short_description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {primary && (
              <button onClick={onPrimary} className="btn-primary hover:[&]:btn-primary-hover inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold">
                {primary.icon} {primary.label}
              </button>
            )}
            <button onClick={onShare} className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:border-primary/40">
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>

          {project.tags.length > 0 && (
            <div className="mt-8">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Tags</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          {project.long_description && (
            <section className="surface-card p-6 sm:p-8">
              <h2 className="text-xl font-bold">About this project</h2>
              <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                {project.long_description}
              </div>
            </section>
          )}

          {project.features.length > 0 && (
            <section className="surface-card p-6 sm:p-8">
              <h2 className="text-xl font-bold">Features</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="surface-card p-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Share this project</div>
            <button
              onClick={onShare}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:border-primary/40"
            >
              <Copy className="h-4 w-4" /> Copy link
            </button>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight">Related projects</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
