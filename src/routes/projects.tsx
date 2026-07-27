import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Layers } from "lucide-react";
import { z } from "zod";
import { projectsQuery, categoriesQuery } from "@/lib/queries";
import { ProjectCard } from "@/components/site/ProjectCard";

const searchSchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/projects")({
  validateSearch: (s) => searchSchema.parse(s),
  loaderDeps: ({ search }) => ({ category: search.category, q: search.q }),
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(projectsQuery()),
      context.queryClient.ensureQueryData(categoriesQuery()),
    ]),
  head: () => ({
    meta: [
      { title: "Projects — Ayush Dev" },
      { name: "description", content: "Explore Android apps, websites and Telegram bots built by Ayush Dev." },
    ],
  }),
  component: ProjectsPage,
});

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "downloads", label: "Most Downloaded" },
  { value: "views", label: "Most Viewed" },
  { value: "featured", label: "Featured" },
] as const;

function ProjectsPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const projects = useSuspenseQuery(projectsQuery()).data;
  const categories = useSuspenseQuery(categoriesQuery()).data;

  const [sort, setSort] = useState<(typeof sortOptions)[number]["value"]>("newest");
  const q = search.q || "";
  const category = search.category || "all";

  const filtered = useMemo(() => {
    const query = q.toLowerCase().trim();
    let list = projects.filter((p) => {
      if (category !== "all" && p.category_slug !== category) return false;
      if (!query) return true;
      return (
        p.name.toLowerCase().includes(query) ||
        p.short_description.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query)) ||
        p.tech_stack.some((t) => t.toLowerCase().includes(query)) ||
        p.category_slug.toLowerCase().includes(query)
      );
    });
    switch (sort) {
      case "oldest": list = [...list].sort((a, b) => a.created_at.localeCompare(b.created_at)); break;
      case "downloads": list = [...list].sort((a, b) => b.download_count - a.download_count); break;
      case "views": list = [...list].sort((a, b) => b.view_count - a.view_count); break;
      case "featured": list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured)); break;
      default: list = [...list].sort((a, b) => b.created_at.localeCompare(a.created_at));
    }
    return list;
  }, [projects, q, category, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-2xl mb-10">
        <p className="section-label">Portfolio</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          All <span className="gradient-text">Projects</span>
        </h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Browse everything I've built — apps, websites, bots and automation tools.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-8">
        {/* Search */}
        <div className="relative w-full lg:max-w-sm">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            value={q}
            onChange={(e) => navigate({ search: (s: Record<string, unknown>) => ({ ...s, q: e.target.value || undefined }), replace: true })}
            placeholder="Search projects, tech, tags..."
            className="w-full rounded-2xl border border-border/60 bg-card/60 py-3 pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all backdrop-blur-sm placeholder:text-muted-foreground/60"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Desktop category pills */}
          <div className="hidden items-center gap-1 rounded-2xl border border-border/60 bg-card/60 p-1 backdrop-blur-sm md:flex">
            <button
              onClick={() => navigate({ search: (s: Record<string, unknown>) => ({ ...s, category: undefined }), replace: true })}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${category === "all" ? "btn-primary" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                onClick={() => navigate({ search: (s: Record<string, unknown>) => ({ ...s, category: c.slug }), replace: true })}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${category === c.slug ? "btn-primary" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative">
            <SlidersHorizontal className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="appearance-none rounded-2xl border border-border/60 bg-card/60 py-2.5 pl-9 pr-8 text-sm font-medium outline-none focus:border-primary backdrop-blur-sm cursor-pointer"
            >
              {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Mobile category chips */}
      <div className="flex gap-2 overflow-x-auto pb-3 md:hidden mb-4 scrollbar-hide">
        <button
          onClick={() => navigate({ search: (s: Record<string, unknown>) => ({ ...s, category: undefined }), replace: true })}
          className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${category === "all" ? "btn-primary" : "border border-border/60 bg-card/60 text-muted-foreground backdrop-blur-sm"}`}
        >All</button>
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => navigate({ search: (s: Record<string, unknown>) => ({ ...s, category: c.slug }), replace: true })}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${category === c.slug ? "btn-primary" : "border border-border/60 bg-card/60 text-muted-foreground backdrop-blur-sm"}`}
          >{c.name}</button>
        ))}
      </div>

      {/* Results count */}
      {(q || category !== "all") && (
        <p className="text-sm text-muted-foreground mb-6">
          {filtered.length} {filtered.length === 1 ? "project" : "projects"} found
        </p>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="mt-8 glass-card p-16 text-center">
          <div className="mx-auto h-12 w-12 grid place-items-center rounded-2xl bg-muted border border-border/60 mb-4">
            <Layers className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-display font-semibold">No projects found</h3>
          <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      )}
    </div>
  );
}
