import { r as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/client-7dIzM4xF.mjs";
import { a as useQueryClient, n as useSuspenseQuery, o as require_jsx_runtime, s as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { g as Link, v as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { L as Eye, R as EyeOff, S as Plus, V as Copy, c as Trash2, d as SquarePen, u as Star, y as Search } from "./_libs/lucide-react.mjs";
import { t as adminProjectsQuery } from "./_ssr/queries-Bw20Kjcs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authed.projects.index-CiftiyXp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminProjects() {
	const projects = useSuspenseQuery(adminProjectsQuery()).data;
	const qc = useQueryClient();
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)("");
	const filtered = projects.filter((p) => !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.category_slug.includes(q.toLowerCase()));
	async function toggleFeatured(p) {
		const { error } = await supabase.from("projects").update({ featured: !p.featured }).eq("id", p.id);
		if (error) toast.error(error.message);
		else {
			toast.success(p.featured ? "Unfeatured" : "Featured");
			refresh();
		}
	}
	async function toggleHidden(p) {
		const { error } = await supabase.from("projects").update({ hidden: !p.hidden }).eq("id", p.id);
		if (error) toast.error(error.message);
		else {
			toast.success(p.hidden ? "Now visible" : "Hidden");
			refresh();
		}
	}
	async function remove(p) {
		if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
		const { error } = await supabase.from("projects").delete().eq("id", p.id);
		if (error) toast.error(error.message);
		else {
			toast.success("Deleted");
			refresh();
		}
	}
	async function duplicate(p) {
		const { id: _id, created_at: _c, updated_at: _u, view_count: _v, download_count: _d, ...rest } = p;
		const copy = {
			...rest,
			name: `${p.name} (Copy)`,
			slug: `${p.slug}-${crypto.randomUUID().slice(0, 6)}`,
			featured: false
		};
		const { data, error } = await supabase.from("projects").insert(copy).select().single();
		if (error) toast.error(error.message);
		else {
			toast.success("Duplicated");
			qc.invalidateQueries();
			navigate({
				to: "/admin/projects/$id",
				params: { id: data.id }
			});
		}
	}
	function refresh() {
		qc.invalidateQueries({ queryKey: ["admin", "projects"] });
		qc.invalidateQueries({ queryKey: ["projects"] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold tracking-tight",
					children: "Projects"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Manage everything visible on your portfolio."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/projects/new",
					className: "btn-primary hover:[&]:btn-primary-hover inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New Project"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Search projects...",
					className: "w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden md:grid grid-cols-[minmax(0,2fr)_1fr_auto_auto_auto] gap-4 border-b border-border px-6 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Project" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Category" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Views" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Downloads" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Actions" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "divide-y divide-border",
					children: [filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-8 text-center text-sm text-muted-foreground",
						children: "No projects yet."
					}), filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 px-4 py-4 sm:px-6 md:grid-cols-[minmax(0,2fr)_1fr_auto_auto_auto] md:items-center md:gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-secondary",
									children: p.thumbnail_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: p.thumbnail_url,
										alt: "",
										className: "h-full w-full object-cover"
									}) : null
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 truncate font-semibold",
										children: [
											p.name,
											p.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-primary text-primary" }),
											p.hidden && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground",
												children: "HIDDEN"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "truncate text-xs text-muted-foreground",
										children: ["/", p.slug]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground",
								children: p.category_slug
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm",
								children: p.view_count
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm",
								children: p.download_count
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => toggleFeatured(p),
										className: "grid h-8 w-8 place-items-center rounded-lg border border-border hover:border-primary/40",
										title: "Toggle featured",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-3.5 w-3.5 ${p.featured ? "fill-primary text-primary" : ""}` })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => toggleHidden(p),
										className: "grid h-8 w-8 place-items-center rounded-lg border border-border hover:border-primary/40",
										title: "Show/Hide",
										children: p.hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => duplicate(p),
										className: "grid h-8 w-8 place-items-center rounded-lg border border-border hover:border-primary/40",
										title: "Duplicate",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/admin/projects/$id",
										params: { id: p.id },
										className: "grid h-8 w-8 place-items-center rounded-lg border border-border hover:border-primary/40",
										title: "Edit",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-3.5 w-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => remove(p),
										className: "grid h-8 w-8 place-items-center rounded-lg border border-border text-destructive hover:border-destructive",
										title: "Delete",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
									})
								]
							})
						]
					}, p.id))]
				})]
			})
		]
	});
}
//#endregion
export { AdminProjects as component };
