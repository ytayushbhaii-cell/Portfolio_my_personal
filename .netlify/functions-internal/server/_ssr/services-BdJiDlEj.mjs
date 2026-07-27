import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Palette, F as Globe, H as CodeXml, U as CircleCheck, X as ArrowRight, p as Smartphone, q as Bot, t as Zap } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services-BdJiDlEj.js
var import_jsx_runtime = require_jsx_runtime();
var services = [
	{
		icon: Smartphone,
		title: "Android App Development",
		desc: "Native Kotlin/Java or hybrid Android apps built for performance and polish. Play Store ready, Material Design compliant.",
		features: [
			"Native Kotlin & Java",
			"Material Design 3",
			"Play Store publishing",
			"Backend integration"
		]
	},
	{
		icon: Globe,
		title: "Website Development",
		desc: "Fast, responsive, SEO-optimized websites. From landing pages to complex SaaS dashboards.",
		features: [
			"React & Next.js",
			"Fully responsive",
			"SEO optimized",
			"Blazing fast"
		]
	},
	{
		icon: Bot,
		title: "Telegram Bot Development",
		desc: "Feature-rich Telegram bots for automation, moderation, e-commerce, notifications and more.",
		features: [
			"Custom commands",
			"Payment integration",
			"Multi-language",
			"Admin panels"
		]
	},
	{
		icon: CodeXml,
		title: "Custom Software",
		desc: "Tailor-made scripts, tools and apps built exactly for your workflow.",
		features: [
			"Clean architecture",
			"Well-documented",
			"Maintainable code",
			"Long-term support"
		]
	},
	{
		icon: Zap,
		title: "Automation",
		desc: "Save hours weekly with automated workflows, integrations and AI-powered solutions.",
		features: [
			"API integrations",
			"Cron & scheduling",
			"AI workflows",
			"Data pipelines"
		]
	},
	{
		icon: Palette,
		title: "UI/UX Design",
		desc: "Modern, premium interfaces designed to feel great and convert users.",
		features: [
			"Figma prototyping",
			"Design systems",
			"User flows",
			"Interactive prototypes"
		]
	}
];
function Services() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl mb-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-label",
						children: "Services"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl",
						children: "What I can build for you."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted-foreground",
						children: "End-to-end delivery — from idea to launch. Pick a service or combine them into a full product."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: services.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card hover:[&]:surface-card-hover p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-12 w-12 place-items-center rounded-2xl btn-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-6 w-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-5 font-display text-lg font-semibold",
							children: s.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: s.desc
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-1.5 text-xs text-muted-foreground",
							children: s.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 shrink-0 text-primary" }),
									" ",
									f
								]
							}, f))
						})
					]
				}, s.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 surface-card p-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-bold tracking-tight",
						children: "Ready to build something great?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Let's discuss your project — I usually reply within a few hours."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/contact",
						className: "mt-6 inline-flex btn-primary hover:[&]:btn-primary-hover items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold",
						children: ["Contact me ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				]
			})
		]
	});
}
//#endregion
export { Services as component };
