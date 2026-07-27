import { r as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/client-7dIzM4xF.mjs";
import { a as useQueryClient, n as useSuspenseQuery, o as require_jsx_runtime, s as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { O as LoaderCircle, S as Plus, b as Save, c as Trash2, d as SquarePen, n as X } from "./_libs/lucide-react.mjs";
import { a as projectsQuery, n as categoriesQuery } from "./_ssr/queries-Bw20Kjcs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authed.categories-CtDanR3f.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function slugify(s) {
	return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
}
var iconChoices = [
	"Smartphone",
	"Globe",
	"Bot",
	"Zap",
	"Wrench",
	"Palette"
];
function AdminCategories() {
	const categories = useSuspenseQuery(categoriesQuery()).data;
	const projects = useSuspenseQuery(projectsQuery()).data;
	const qc = useQueryClient();
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [showForm, setShowForm] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [slug, setSlug] = (0, import_react.useState)("");
	const [icon, setIcon] = (0, import_react.useState)("Sparkles");
	const [busy, setBusy] = (0, import_react.useState)(false);
	function open(c) {
		if (c) {
			setEditing(c);
			setName(c.name);
			setSlug(c.slug);
			setIcon(c.icon || "Sparkles");
		} else {
			setEditing(null);
			setName("");
			setSlug("");
			setIcon("Sparkles");
		}
		setShowForm(true);
	}
	function refresh() {
		qc.invalidateQueries({ queryKey: ["categories"] });
		qc.invalidateQueries({ queryKey: ["projects"] });
	}
	async function save(e) {
		e.preventDefault();
		if (!name.trim() || !slug.trim()) {
			toast.error("Name and slug are required");
			return;
		}
		setBusy(true);
		const payload = {
			name: name.trim(),
			slug: slug.trim(),
			icon
		};
		const { error } = await (editing ? supabase.from("categories").update(payload).eq("id", editing.id) : supabase.from("categories").insert({
			...payload,
			sort_order: categories.length
		}));
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success(editing ? "Category updated" : "Category added");
		setShowForm(false);
		refresh();
	}
	async function remove(c) {
		if (projects.some((p) => p.category_slug === c.slug)) {
			toast.error("This category has projects. Reassign them first.");
			return;
		}
		if (!confirm(`Delete category "${c.name}"?`)) return;
		const { error } = await supabase.from("categories").delete().eq("id", c.id);
		if (error) toast.error(error.message);
		else {
			toast.success("Deleted");
			refresh();
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold tracking-tight",
					children: "Categories"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Categories automatically appear as filters on your portfolio."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => open(),
					className: "btn-primary hover:[&]:btn-primary-hover inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New Category"]
				})]
			}),
			showForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: save,
				className: "surface-card p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-bold",
							children: editing ? "Edit category" : "New category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowForm(false),
							className: "grid h-8 w-8 place-items-center rounded-lg border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium",
								children: "Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: name,
								onChange: (e) => {
									setName(e.target.value);
									if (!editing) setSlug(slugify(e.target.value));
								},
								className: "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary",
								placeholder: "Android Apps",
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium",
								children: "Slug"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: slug,
								onChange: (e) => setSlug(slugify(e.target.value)),
								className: "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary",
								placeholder: "android-apps",
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									children: "Icon"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1.5 flex flex-wrap gap-2",
									children: iconChoices.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setIcon(i),
										className: `rounded-lg border px-3 py-1.5 text-xs font-medium ${icon === i ? "border-primary bg-primary/10 text-primary" : "border-border bg-background"}`,
										children: i
									}, i))
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: busy,
							className: "btn-primary hover:[&]:btn-primary-hover inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold disabled:opacity-70",
							children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), editing ? "Save" : "Create"]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "surface-card overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "divide-y divide-border",
					children: [categories.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-8 text-center text-sm text-muted-foreground",
						children: "No categories yet."
					}), categories.map((c) => {
						const count = projects.filter((p) => p.category_slug === c.slug).length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3 px-6 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold",
									children: c.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground",
									children: [
										"/",
										c.slug,
										" · ",
										count,
										" ",
										count === 1 ? "project" : "projects"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => open(c),
									className: "grid h-8 w-8 place-items-center rounded-lg border border-border hover:border-primary/40",
									title: "Edit",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-3.5 w-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => remove(c),
									className: "grid h-8 w-8 place-items-center rounded-lg border border-border text-destructive hover:border-destructive",
									title: "Delete",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
								})]
							})]
						}, c.id);
					})]
				})
			})
		]
	});
}
//#endregion
export { AdminCategories as component };
