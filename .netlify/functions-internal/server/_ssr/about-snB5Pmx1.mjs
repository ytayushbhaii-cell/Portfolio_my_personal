import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { H as CodeXml, J as Award, X as ArrowRight, i as Users, x as Rocket } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-snB5Pmx1.js
var import_jsx_runtime = require_jsx_runtime();
var skills = [
	{
		name: "Android (Kotlin / Java)",
		level: 95
	},
	{
		name: "React / Next.js / TanStack",
		level: 92
	},
	{
		name: "TypeScript",
		level: 90
	},
	{
		name: "Node.js & Telegram Bots",
		level: 88
	},
	{
		name: "Supabase / PostgreSQL",
		level: 85
	},
	{
		name: "UI/UX Design",
		level: 82
	}
];
var experience = [
	{
		year: "2022 — Now",
		title: "Freelance Developer",
		desc: "Delivering apps, websites and automation for clients worldwide."
	},
	{
		year: "2021",
		title: "Started with Android",
		desc: "Shipped first Play Store apps and started open-sourcing tools."
	},
	{
		year: "2020",
		title: "First lines of code",
		desc: "Fell in love with building things that people actually use."
	}
];
var techStack = [
	"Kotlin",
	"Java",
	"React",
	"TypeScript",
	"Node.js",
	"Supabase",
	"TanStack",
	"Tailwind CSS",
	"Figma",
	"PostgreSQL",
	"Firebase",
	"Python"
];
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl mb-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-label",
						children: "About"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl",
						children: [
							"Hey, I'm ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gradient-text",
								children: "Ayush"
							}),
							" — a developer who ships."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted-foreground leading-relaxed",
						children: "I'm a freelance developer focused on Android, the modern web, and Telegram automation. I love turning rough ideas into premium, production-ready products — with a strong emphasis on design, performance, and clean architecture."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/contact",
						className: "mt-6 inline-flex btn-primary hover:[&]:btn-primary-hover items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold",
						children: ["Hire me ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-14",
				children: [
					{
						icon: Rocket,
						label: "Projects Shipped",
						value: "50+"
					},
					{
						icon: Users,
						label: "Happy Clients",
						value: "30+"
					},
					{
						icon: CodeXml,
						label: "Lines of Code",
						value: "1M+"
					},
					{
						icon: Award,
						label: "Years Coding",
						value: "5+"
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card p-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "mx-auto h-6 w-6 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 font-display text-3xl font-bold gradient-text",
							children: s.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-xs font-medium text-muted-foreground",
							children: s.label
						})
					]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-2 mb-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card p-6 sm:p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-bold tracking-tight mb-6",
						children: "Skills"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-5",
						children: skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-sm font-medium mb-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground text-xs font-mono",
								children: [s.level, "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 rounded-full bg-secondary overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full btn-primary",
								style: { width: `${s.level}%` }
							})
						})] }, s.name))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card p-6 sm:p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-bold tracking-tight mb-6",
						children: "Journey"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "space-y-7 border-l border-border pl-6",
						children: experience.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -left-[31px] mt-1 grid h-4 w-4 place-items-center rounded-full btn-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-background" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-semibold uppercase tracking-widest text-primary",
									children: e.year
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 font-display font-semibold",
									children: e.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: e.desc
								})
							]
						}, e.year))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card p-6 sm:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-bold tracking-tight mb-6",
					children: "Tech Stack"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: techStack.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-xl border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:border-primary/30 hover:text-primary transition-colors cursor-default",
						children: t
					}, t))
				})]
			})
		]
	});
}
//#endregion
export { About as component };
