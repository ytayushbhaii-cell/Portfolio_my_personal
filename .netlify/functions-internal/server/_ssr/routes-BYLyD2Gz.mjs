import { n as useSuspenseQuery, o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Palette, F as Globe, H as CodeXml, P as Heart, U as CircleCheck, X as ArrowRight, f as Sparkles, h as Shield, p as Smartphone, q as Bot, r as Wrench, t as Zap, x as Rocket } from "../_libs/lucide-react.mjs";
import { a as projectsQuery, n as categoriesQuery, o as settingsQuery } from "./queries-Bw20Kjcs.mjs";
import { t as ProjectCard } from "./ProjectCard-C6SKg2mB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BYLyD2Gz.js
var import_jsx_runtime = require_jsx_runtime();
var iconMap = {
	Smartphone,
	Globe,
	Bot,
	Zap,
	Wrench,
	Palette
};
var services = [
	{
		icon: Smartphone,
		title: "Android App Development",
		desc: "Native & hybrid Android apps built for speed, polish, and Play Store success."
	},
	{
		icon: Globe,
		title: "Website Development",
		desc: "Fast, responsive, SEO-ready websites — from landing pages to full SaaS dashboards."
	},
	{
		icon: Bot,
		title: "Telegram Bot Development",
		desc: "Powerful Telegram bots for automation, notifications, moderation & e-commerce."
	},
	{
		icon: CodeXml,
		title: "Custom Software",
		desc: "Tailor-made tools and scripts that solve your exact problem. No bloat."
	},
	{
		icon: Zap,
		title: "Automation",
		desc: "Save hours weekly with workflows, integrations and AI-powered automations."
	},
	{
		icon: Palette,
		title: "UI Design",
		desc: "Clean, premium interfaces designed to feel modern and convert users."
	}
];
var stats = [
	{
		value: "50+",
		label: "Projects Shipped"
	},
	{
		value: "30+",
		label: "Happy Clients"
	},
	{
		value: "5+",
		label: "Years Experience"
	},
	{
		value: "99%",
		label: "Client Satisfaction"
	}
];
function Home() {
	const projects = useSuspenseQuery(projectsQuery()).data;
	const categories = useSuspenseQuery(categoriesQuery()).data;
	const settings = useSuspenseQuery(settingsQuery()).data;
	const featured = projects.filter((p) => p.featured).slice(0, 6);
	const latest = (featured.length ? featured : projects).slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "relative overflow-hidden hero-bg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-28 lg:pb-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-primary" }), "Available for freelance projects"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "animate-fade-up-delay-1 mt-6 font-display text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl",
							children: [
								"Hi, I'm ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "gradient-text",
									children: settings?.site_name || "Ayush Dev"
								}),
								".",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { className: "hidden sm:block" }),
								" I build software that ships."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "animate-fade-up-delay-2 mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg",
							children: [settings?.tagline || "Building Modern Android Apps, Websites & Telegram Bots.", " Premium design, production-grade code, and delivery you can trust."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "animate-fade-up-delay-3 mt-8 flex flex-wrap items-center justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/projects",
								className: "btn-primary hover:[&]:btn-primary-hover inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold",
								children: ["View Projects ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:border-primary/40 transition-colors",
								children: "Contact Me"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto",
							children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "surface-card p-4 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-2xl font-bold font-display gradient-text",
									children: s.value
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-xs text-muted-foreground",
									children: s.label
								})]
							}, s.label))
						})
					]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "services",
			className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-label",
						children: "Services"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl",
						children: "Everything you need, under one roof."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted-foreground",
						children: "From native Android apps to sharp websites and automated Telegram bots — shipped end-to-end."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
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
						})
					]
				}, s.title))
			})]
		}),
		latest.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "section-label",
					children: "Work"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl",
					children: "Featured Projects"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/projects",
					className: "text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1",
					children: ["View all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3",
				children: latest.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectCard, { project: p }, p.id))
			})]
		}),
		latest.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-3xl px-4 py-10 text-center sm:px-6 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card p-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "mx-auto h-10 w-10 text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-4 font-display text-xl font-semibold",
						children: "Projects launching soon"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Amazing projects are being prepared — check back soon!"
					})
				]
			})
		}),
		categories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "section-label",
					children: "Explore"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl",
					children: "Browse by Category"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: categories.map((c) => {
					const Icon = iconMap[c.icon || ""] || Sparkles;
					const count = projects.filter((p) => p.category_slug === c.slug).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/projects",
						search: { category: c.slug },
						className: "surface-card hover:[&]:surface-card-hover flex items-center gap-4 p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate font-display font-semibold",
									children: c.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground",
									children: [
										count,
										" ",
										count === 1 ? "project" : "projects"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 text-muted-foreground" })
						]
					}, c.slug);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "surface-card overflow-hidden p-8 sm:p-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-10 lg:grid-cols-2 lg:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-label",
							children: "Why me"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl",
							children: "Craft. Speed. Reliability."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-muted-foreground",
							children: "I care about the details. From your first message to launch and beyond — you get clean code, thoughtful UX, and a partner who ships."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-6 space-y-3 text-sm",
							children: [
								"Modern, production-grade stack",
								"Clear communication & timelines",
								"Pixel-perfect responsive design",
								"Post-launch support & iteration"
							].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-primary" }),
									" ",
									f
								]
							}, f))
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [
							{
								icon: Shield,
								title: "Secure",
								desc: "Best-practice auth & data handling."
							},
							{
								icon: Rocket,
								title: "Fast",
								desc: "Optimized for Core Web Vitals."
							},
							{
								icon: Heart,
								title: "Care",
								desc: "Built like it's my own product."
							},
							{
								icon: Zap,
								title: "Iterative",
								desc: "Ship, learn, improve. Repeat."
							}
						].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-background p-5 border border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, { className: "h-5 w-5 text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 font-display font-semibold",
									children: c.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: c.desc
								})
							]
						}, c.title))
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-5xl px-4 pb-24 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-3xl btn-primary p-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-bold tracking-tight sm:text-4xl",
						children: "Have a project in mind?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-3 max-w-xl text-sm text-primary-foreground/80",
						children: "Let's turn your idea into a polished, production-ready product."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/contact",
						className: "mt-6 inline-flex items-center gap-2 rounded-2xl bg-background px-6 py-3 text-sm font-semibold text-primary hover:bg-background/90 transition-colors",
						children: ["Start a conversation ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				]
			})
		})
	] });
}
//#endregion
export { Home as component };
