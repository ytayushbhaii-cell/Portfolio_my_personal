import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
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
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Portfolio</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">All Projects</h1>
        <p className="mt-3 text-muted-foreground">
          Browse everything I've built — apps, websites, bots and automation tools.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => navigate({ search: (s: Record<string, unknown>) => ({ ...s, q: e.target.value || undefined }), replace: true })}
            placeholder="Search projects, tech, tags..."
            className="w-full rounded-2xl border border-border bg-card py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-2xl border border-border bg-card p-1 md:flex">
            <button
              onClick={() => navigate({ search: (s: Record<string, unknown>) => ({ ...s, category: undefined }), replace: true })}
              className={`rounded-xl px-3 py-1.5 text-xs font-medium ${category === "all" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                onClick={() => navigate({ search: (s: Record<string, unknown>) => ({ ...s, category: c.slug }), replace: true })}
                className={`rounded-xl px-3 py-1.5 text-xs font-medium ${category === c.slug ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="relative">
            <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="appearance-none rounded-2xl border border-border bg-card py-2.5 pl-9 pr-8 text-sm font-medium outline-none focus:border-primary"
            >
              {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* mobile category chips */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 md:hidden">
        <button
          onClick={() => navigate({ search: (s: Record<string, unknown>) => ({ ...s, category: undefined }), replace: true })}
          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${category === "all" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground"}`}
        >All</button>
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => navigate({ search: (s: Record<string, unknown>) => ({ ...s, category: c.slug }), replace: true })}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${category === c.slug ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground"}`}
          >{c.name}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 surface-card p-10 text-center">
          <p className="text-muted-foreground">No projects match your filters.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      )}
    </div>
  );
}
