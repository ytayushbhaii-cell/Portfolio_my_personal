import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Download, X as ArrowRight, q as Bot, u as Star, z as ExternalLink } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProjectCard-C6SKg2mB.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectCard({ project }) {
	const type = project.project_type;
	const apkUrl = project.apk_url || project.apk_external_url;
	let cta = null;
	if (type === "android" && apkUrl) cta = {
		href: apkUrl,
		label: "Download APK",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" })
	};
	else if (type === "website" && project.website_url) cta = {
		href: project.website_url,
		label: "Visit Site",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5" })
	};
	else if (type === "telegram" && project.bot_url) cta = {
		href: project.bot_url,
		label: "Open Bot",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-3.5 w-3.5" })
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "surface-card hover:[&]:surface-card-hover group flex flex-col overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/projects/$slug",
			params: { slug: project.slug },
			className: "block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-[16/10] overflow-hidden bg-secondary",
				children: [
					project.thumbnail_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: project.thumbnail_url,
						alt: project.name,
						loading: "lazy",
						className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-full w-full place-items-center text-3xl font-bold font-display gradient-text",
						children: project.name.slice(0, 2).toUpperCase()
					}),
					project.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-primary" }), " Featured"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute top-3 right-3 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur",
						children: project.category_slug.replace(/-/g, " ")
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/projects/$slug",
					params: { slug: project.slug },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-semibold tracking-tight group-hover:text-primary transition-colors",
						children: project.name
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 line-clamp-2 text-sm text-muted-foreground",
					children: project.short_description
				}),
				project.tech_stack.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-wrap gap-1.5",
					children: project.tech_stack.slice(0, 4).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tag-badge",
						children: t
					}, t))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex items-center justify-between border-t border-border pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/projects/$slug",
						params: { slug: project.slug },
						className: "inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline",
						children: ["View details ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
					}), cta && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: cta.href,
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/15 transition-colors",
						children: [
							cta.icon,
							" ",
							cta.label
						]
					})]
				})
			]
		})]
	});
}
//#endregion
export { ProjectCard as t };
