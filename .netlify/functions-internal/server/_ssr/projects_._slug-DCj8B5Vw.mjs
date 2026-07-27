import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-7dIzM4xF.mjs";
import { n as useSuspenseQuery, o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as Download, V as Copy, W as Check, Z as ArrowLeft, g as Share2, q as Bot, u as Star, z as ExternalLink } from "../_libs/lucide-react.mjs";
import { a as projectsQuery, i as projectBySlugQuery } from "./queries-Bw20Kjcs.mjs";
import { t as ProjectCard } from "./ProjectCard-C6SKg2mB.mjs";
import { t as Route } from "./projects_._slug-DGQjt7zR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects_._slug-DCj8B5Vw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProjectDetail() {
	const { slug } = Route.useParams();
	const project = useSuspenseQuery(projectBySlugQuery(slug)).data;
	const all = useSuspenseQuery(projectsQuery()).data;
	const [activeShot, setActiveShot] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		supabase.rpc("increment_project_view", { _slug: slug }).then(() => {});
	}, [slug]);
	const related = all.filter((p) => p.id !== project.id && p.category_slug === project.category_slug).slice(0, 3);
	const shots = project.screenshots.length ? project.screenshots : project.thumbnail_url ? [project.thumbnail_url] : [];
	const type = project.project_type;
	const apkUrl = project.apk_url || project.apk_external_url;
	const primary = type === "android" && apkUrl ? {
		href: apkUrl,
		label: "Download APK",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }),
		count: true
	} : type === "website" && project.website_url ? {
		href: project.website_url,
		label: "Visit Website",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-4 w-4" }),
		count: false
	} : type === "telegram" && project.bot_url ? {
		href: project.bot_url,
		label: "Open Bot",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-4 w-4" }),
		count: false
	} : null;
	const onPrimary = () => {
		if (!primary) return;
		if (primary.count) supabase.rpc("increment_project_download", { _slug: slug }).then(() => {});
		window.open(primary.href, "_blank", "noopener,noreferrer");
	};
	const onShare = async () => {
		const url = typeof window !== "undefined" ? window.location.href : "";
		if (typeof navigator !== "undefined" && "share" in navigator) try {
			await navigator.share({
				title: project.name,
				url
			});
			return;
		} catch {}
		await navigator.clipboard.writeText(url);
		toast.success("Link copied!");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/projects",
				className: "inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to projects"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "surface-card overflow-hidden",
					children: shots.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative aspect-[16/10] bg-secondary flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: shots[activeShot],
							alt: project.name,
							className: "max-h-full max-w-full object-contain"
						})
					}), shots.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2 overflow-x-auto p-3",
						children: shots.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveShot(i),
							className: `h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 bg-secondary flex items-center justify-center ${i === activeShot ? "border-primary" : "border-transparent opacity-70"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: s,
								alt: "",
								className: "max-h-full max-w-full object-contain"
							})
						}, i))
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid aspect-[16/10] place-items-center bg-secondary text-4xl font-black gradient-text",
						children: project.name.slice(0, 2).toUpperCase()
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/projects",
							search: { category: project.category_slug },
							className: "rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wide hover:bg-primary/15",
							children: project.category_slug.replace(/-/g, " ")
						}), project.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-primary text-primary" }), " Featured"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 text-3xl font-bold tracking-tight sm:text-4xl",
						children: project.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted-foreground",
						children: project.short_description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-2",
						children: [primary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: onPrimary,
							className: "btn-primary hover:[&]:btn-primary-hover inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold",
							children: [
								primary.icon,
								" ",
								primary.label
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: onShare,
							className: "inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:border-primary/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-4 w-4" }), " Share"]
						})]
					}),
					project.tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
							children: "Tags"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: project.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-secondary px-3 py-1 text-xs font-medium",
								children: t
							}, t))
						})]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-8",
					children: [project.long_description && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "surface-card p-6 sm:p-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-bold",
							children: "About this project"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground",
							children: project.long_description
						})]
					}), project.features.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "surface-card p-6 sm:p-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-bold",
							children: "Features"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 grid gap-3 sm:grid-cols-2",
							children: project.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f })
								]
							}, f))
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
							children: "Share this project"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: onShare,
							className: "mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:border-primary/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" }), " Copy link"]
						})]
					})
				})]
			}),
			related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold tracking-tight",
					children: "Related projects"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: related.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectCard, { project: p }, p.id))
				})]
			})
		]
	});
}
//#endregion
export { ProjectDetail as component };
