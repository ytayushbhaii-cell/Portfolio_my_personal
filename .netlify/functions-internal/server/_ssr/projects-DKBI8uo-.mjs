import { r as __toESM } from "../_runtime.mjs";
import { n as useSuspenseQuery, o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { A as Layers, m as SlidersHorizontal, y as Search } from "../_libs/lucide-react.mjs";
import { a as projectsQuery, n as categoriesQuery } from "./queries-Bw20Kjcs.mjs";
import { t as Route } from "./projects-vRQFbtBF.mjs";
import { t as ProjectCard } from "./ProjectCard-C6SKg2mB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-DKBI8uo-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var sortOptions = [
	{
		value: "newest",
		label: "Newest"
	},
	{
		value: "oldest",
		label: "Oldest"
	},
	{
		value: "downloads",
		label: "Most Downloaded"
	},
	{
		value: "views",
		label: "Most Viewed"
	},
	{
		value: "featured",
		label: "Featured"
	}
];
function ProjectsPage() {
	const search = Route.useSearch();
	const navigate = Route.useNavigate();
	const projects = useSuspenseQuery(projectsQuery()).data;
	const categories = useSuspenseQuery(categoriesQuery()).data;
	const [sort, setSort] = (0, import_react.useState)("newest");
	const q = search.q || "";
	const category = search.category || "all";
	const filtered = (0, import_react.useMemo)(() => {
		const query = q.toLowerCase().trim();
		let list = projects.filter((p) => {
			if (category !== "all" && p.category_slug !== category) return false;
			if (!query) return true;
			return p.name.toLowerCase().includes(query) || p.short_description.toLowerCase().includes(query) || p.tags.some((t) => t.toLowerCase().includes(query)) || p.tech_stack.some((t) => t.toLowerCase().includes(query)) || p.category_slug.toLowerCase().includes(query);
		});
		switch (sort) {
			case "oldest":
				list = [...list].sort((a, b) => a.created_at.localeCompare(b.created_at));
				break;
			case "downloads":
				list = [...list].sort((a, b) => b.download_count - a.download_count);
				break;
			case "views":
				list = [...list].sort((a, b) => b.view_count - a.view_count);
				break;
			case "featured":
				list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
				break;
			default: list = [...list].sort((a, b) => b.created_at.localeCompare(a.created_at));
		}
		return list;
	}, [
		projects,
		q,
		category,
		sort
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl mb-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-label",
						children: "Portfolio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl",
						children: ["All ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "gradient-text",
							children: "Projects"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted-foreground leading-relaxed",
						children: "Browse everything I've built — apps, websites, bots and automation tools."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full lg:max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => navigate({
							search: (s) => ({
								...s,
								q: e.target.value || void 0
							}),
							replace: true
						}),
						placeholder: "Search projects, tech, tags...",
						className: "w-full rounded-2xl border border-border/60 bg-card/60 py-3 pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all backdrop-blur-sm placeholder:text-muted-foreground/60"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 flex-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden items-center gap-1 rounded-2xl border border-border/60 bg-card/60 p-1 backdrop-blur-sm md:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => navigate({
								search: (s) => ({
									...s,
									category: void 0
								}),
								replace: true
							}),
							className: `rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${category === "all" ? "btn-primary" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`,
							children: "All"
						}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => navigate({
								search: (s) => ({
									...s,
									category: c.slug
								}),
								replace: true
							}),
							className: `rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${category === c.slug ? "btn-primary" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`,
							children: c.name
						}, c.slug))]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: sort,
							onChange: (e) => setSort(e.target.value),
							className: "appearance-none rounded-2xl border border-border/60 bg-card/60 py-2.5 pl-9 pr-8 text-sm font-medium outline-none focus:border-primary backdrop-blur-sm cursor-pointer",
							children: sortOptions.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: o.value,
								children: o.label
							}, o.value))
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 overflow-x-auto pb-3 md:hidden mb-4 scrollbar-hide",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => navigate({
						search: (s) => ({
							...s,
							category: void 0
						}),
						replace: true
					}),
					className: `shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${category === "all" ? "btn-primary" : "border border-border/60 bg-card/60 text-muted-foreground backdrop-blur-sm"}`,
					children: "All"
				}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => navigate({
						search: (s) => ({
							...s,
							category: c.slug
						}),
						replace: true
					}),
					className: `shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${category === c.slug ? "btn-primary" : "border border-border/60 bg-card/60 text-muted-foreground backdrop-blur-sm"}`,
					children: c.name
				}, c.slug))]
			}),
			(q || category !== "all") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground mb-6",
				children: [
					filtered.length,
					" ",
					filtered.length === 1 ? "project" : "projects",
					" found"
				]
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 glass-card p-16 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto h-12 w-12 grid place-items-center rounded-2xl bg-muted border border-border/60 mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-6 w-6 text-muted-foreground" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display font-semibold",
						children: "No projects found"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Try adjusting your search or filters."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectCard, { project: p }, p.id))
			})
		]
	});
}
//#endregion
export { ProjectsPage as component };
