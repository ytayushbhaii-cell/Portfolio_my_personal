import { n as useSuspenseQuery, o as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { B as Download, L as Eye } from "./_libs/lucide-react.mjs";
import { t as adminProjectsQuery } from "./_ssr/queries-Bw20Kjcs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authed.analytics-D5na8W3c.js
var import_jsx_runtime = require_jsx_runtime();
function Analytics() {
	const projects = useSuspenseQuery(adminProjectsQuery()).data;
	const topViews = [...projects].sort((a, b) => b.view_count - a.view_count).slice(0, 10);
	const topDownloads = [...projects].sort((a, b) => b.download_count - a.download_count).slice(0, 10);
	const totalV = projects.reduce((a, p) => a + p.view_count, 0);
	const totalD = projects.reduce((a, p) => a + p.download_count, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Analytics"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Views, downloads, and popular projects."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" }), " Total Views"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-3xl font-bold gradient-text",
						children: totalV
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), " Total Downloads"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-3xl font-bold gradient-text",
						children: totalD
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					title: "Most viewed",
					items: topViews,
					field: "view_count"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					title: "Most downloaded",
					items: topDownloads,
					field: "download_count"
				})]
			})
		]
	});
}
function Card({ title, items, field }) {
	const max = Math.max(1, ...items.map((i) => i[field]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-card p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-lg font-bold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 space-y-3",
			children: [items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "No data yet."
			}), items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate font-medium",
					children: p.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: p[field]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 h-1.5 rounded-full bg-secondary overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full btn-primary",
					style: { width: `${p[field] / max * 100}%` }
				})
			})] }, p.id))]
		})]
	});
}
//#endregion
export { Analytics as component };
