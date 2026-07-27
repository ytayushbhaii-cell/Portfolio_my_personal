import { n as useSuspenseQuery, o as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { B as Download, F as Globe, K as Boxes, L as Eye, f as Sparkles, j as Inbox, p as Smartphone, s as TrendingUp } from "./_libs/lucide-react.mjs";
import { r as contactMessagesQuery, t as adminProjectsQuery } from "./_ssr/queries-Bw20Kjcs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authed.index-BI7gDghZ.js
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const projects = useSuspenseQuery(adminProjectsQuery()).data;
	const messages = useSuspenseQuery(contactMessagesQuery()).data;
	const apps = projects.filter((p) => p.category_slug === "apps").length;
	const sites = projects.filter((p) => p.category_slug === "websites").length;
	const totalViews = projects.reduce((a, p) => a + p.view_count, 0);
	const totalDownloads = projects.reduce((a, p) => a + p.download_count, 0);
	const featured = projects.filter((p) => p.featured);
	const unread = messages.filter((m) => !m.read).length;
	const stats = [
		{
			label: "Total Projects",
			value: projects.length,
			icon: Boxes,
			color: "text-primary"
		},
		{
			label: "Android Apps",
			value: apps,
			icon: Smartphone,
			color: "text-primary"
		},
		{
			label: "Websites",
			value: sites,
			icon: Globe,
			color: "text-accent"
		},
		{
			label: "Featured",
			value: featured.length,
			icon: Sparkles,
			color: "text-primary"
		},
		{
			label: "Total Views",
			value: totalViews,
			icon: Eye,
			color: "text-primary"
		},
		{
			label: "APK Downloads",
			value: totalDownloads,
			icon: Download,
			color: "text-primary"
		},
		{
			label: "Unread Messages",
			value: unread,
			icon: Inbox,
			color: "text-primary"
		},
		{
			label: "Growth",
			value: "↗",
			icon: TrendingUp,
			color: "text-primary"
		}
	];
	const recent = projects.slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Dashboard"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Overview of your portfolio."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
							children: s.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: `h-4 w-4 ${s.color}` })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-2xl font-bold",
						children: s.value
					})]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[1.4fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-bold",
							children: "Recent Projects"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/projects",
							className: "text-xs font-semibold text-primary hover:underline",
							children: "View all"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 divide-y divide-border",
						children: [recent.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-6 text-sm text-muted-foreground",
							children: "No projects yet."
						}), recent.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-secondary",
									children: p.thumbnail_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: p.thumbnail_url,
										alt: "",
										className: "h-full w-full object-cover"
									}) : null
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-sm font-medium",
										children: p.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground",
										children: [
											p.category_slug,
											" · ",
											p.view_count,
											" views"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/admin/projects/$id",
									params: { id: p.id },
									className: "rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary",
									children: "Edit"
								})
							]
						}, p.id))]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-bold",
							children: "Latest Messages"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-3",
							children: [messages.slice(0, 5).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "py-6 text-sm text-muted-foreground",
								children: "Inbox empty."
							}), messages.slice(0, 5).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-background p-3 border border-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: m.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: new Date(m.created_at).toLocaleDateString() })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 line-clamp-2 text-xs text-muted-foreground",
									children: m.message
								})]
							}, m.id))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/messages",
							className: "mt-4 block text-center text-xs font-semibold text-primary hover:underline",
							children: "Open inbox →"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-bold",
					children: "Quick Actions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/projects/new",
							className: "btn-primary hover:[&]:btn-primary-hover rounded-xl px-4 py-2 text-sm font-semibold",
							children: "+ Add Project"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/settings",
							className: "rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:border-primary/40",
							children: "Site Settings"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/analytics",
							className: "rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold hover:border-primary/40",
							children: "View Analytics"
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { Dashboard as component };
