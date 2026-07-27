import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-7dIzM4xF.mjs";
import { i as QueryClientProvider, o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$13 } from "../_authed-DPKXvhR_.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { H as CodeXml, I as Github, T as Mail, Y as ArrowUp, k as Linkedin, n as X, o as Twitter, v as Send, w as Menu } from "../_libs/lucide-react.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { a as projectsQuery, n as categoriesQuery, o as settingsQuery, r as contactMessagesQuery, t as adminProjectsQuery } from "./queries-Bw20Kjcs.mjs";
import { t as Route$14 } from "../_authed.projects._id-Cb6g1ASH.mjs";
import { t as Route$15 } from "./login-DyHeqTEX.mjs";
import { t as Route$16 } from "./projects-vRQFbtBF.mjs";
import { t as Route$17 } from "./projects_._slug-DGQjt7zR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-7FLNCAPi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DzIhwpwM.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var links = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/projects",
		label: "Projects"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/services",
		label: "Services"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function SiteHeader() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 16);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `sticky top-0 z-40 transition-all duration-300 ${scrolled ? "glass-nav shadow-[0_1px_0_0_var(--border)]" : "bg-transparent"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2.5 font-bold tracking-tight group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-9 w-9 place-items-center rounded-xl btn-primary animate-pulse-glow group-hover:scale-105 transition-transform",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { className: "h-4.5 w-4.5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-lg font-display",
						children: ["Ayush", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "gradient-text",
							children: "Dev"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden md:flex items-center gap-1 rounded-2xl border border-border/50 bg-card/40 px-2 py-1.5 backdrop-blur",
					children: links.map((l) => {
						const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: l.to,
							className: `relative rounded-xl px-4 py-1.5 text-sm font-medium transition-all ${active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`,
							children: [active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-xl ring-1 ring-primary/30 pointer-events-none" }), l.label]
						}, l.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "hidden sm:inline-flex btn-primary hover:[&]:btn-primary-hover items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold",
						children: "Hire Me →"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setOpen((o) => !o),
						className: "md:hidden grid h-10 w-10 place-items-center rounded-xl border border-border bg-card/60 backdrop-blur text-foreground transition hover:border-primary/40",
						"aria-label": "Menu",
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4.5 w-4.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-4.5 w-4.5" })
					})]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl animate-fade-up",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4",
				children: [links.map((l) => {
					const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: `rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"}`,
						children: l.label
					}, l.to);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/contact",
					className: "mt-2 btn-primary rounded-xl px-4 py-2.5 text-center text-sm font-semibold",
					children: "Hire Me →"
				})]
			})
		})]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-28 relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-primary/40 to-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative border-t border-border/40 bg-card/30 backdrop-blur-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "glow-violet absolute bottom-0 left-0 h-48 w-48 opacity-20 -translate-x-1/2 translate-y-1/2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "glow-cyan absolute top-0 right-0 h-48 w-48 opacity-15 translate-x-1/2 -translate-y-1/2" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-10 md:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/",
									className: "inline-flex items-center gap-2.5 font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-8 w-8 place-items-center rounded-lg btn-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-lg font-display",
										children: ["Ayush", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "gradient-text",
											children: "Dev"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 max-w-sm text-sm text-muted-foreground leading-relaxed",
									children: "Building modern Android Apps, Websites & Telegram Bots. Available for freelance work worldwide."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-5 flex items-center gap-2",
									children: [
										{
											icon: Send,
											href: "https://t.me/",
											label: "Telegram"
										},
										{
											icon: Mail,
											href: "mailto:hello@example.com",
											label: "Email"
										},
										{
											icon: Github,
											href: "https://github.com/",
											label: "GitHub"
										},
										{
											icon: Twitter,
											href: "https://twitter.com/",
											label: "Twitter"
										},
										{
											icon: Linkedin,
											href: "https://linkedin.com/",
											label: "LinkedIn"
										}
									].map(({ icon: Icon, href, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href,
										target: "_blank",
										rel: "noreferrer",
										"aria-label": label,
										className: "grid h-9 w-9 place-items-center rounded-xl border border-border/60 bg-card text-muted-foreground transition-all hover:border-primary/40 hover:text-primary hover:bg-primary/10 hover:shadow-[0_0_12px_oklch(0.62_0.24_280/0.3)]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
									}, label))
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold text-foreground/80 font-display",
							children: "Explore"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-2.5 text-sm text-muted-foreground",
							children: [
								{
									to: "/projects",
									label: "Projects"
								},
								{
									to: "/services",
									label: "Services"
								},
								{
									to: "/about",
									label: "About"
								},
								{
									to: "/contact",
									label: "Contact"
								}
							].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: l.to,
								className: "hover:text-primary transition-colors",
								children: l.label
							}) }, l.to))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold text-foreground/80 font-display",
							children: "Categories"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-2.5 text-sm text-muted-foreground",
							children: [
								{
									slug: "apps",
									label: "Android Apps"
								},
								{
									slug: "websites",
									label: "Websites"
								},
								{
									slug: "telegram-bots",
									label: "Telegram Bots"
								},
								{
									slug: "automation",
									label: "Automation"
								}
							].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/projects",
								search: { category: c.slug },
								className: "hover:text-primary transition-colors",
								children: c.label
							}) }, c.slug))
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/40 pt-6 sm:flex-row sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" Ayush Dev. Crafted with ❤️"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => window.scrollTo({
							top: 0,
							behavior: "smooth"
						}),
						className: "inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:text-primary hover:border-primary/40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-3 w-3" }), " Back to top"]
					})]
				})]
			})]
		})]
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold gradient-text",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/",
					className: "mt-6 inline-flex btn-primary hover:[&]:btn-primary-hover items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium",
					children: "Back home"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "You can try again or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "btn-primary hover:[&]:btn-primary-hover inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$12 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Ayush Dev — Android Apps, Websites & Telegram Bots" },
			{
				name: "description",
				content: "Freelance developer building modern Android apps, websites and Telegram bots. Browse featured projects, download APKs, and get in touch."
			},
			{
				name: "author",
				content: "Ayush Dev"
			},
			{
				property: "og:title",
				content: "Ayush Dev — Android Apps, Websites & Telegram Bots"
			},
			{
				property: "og:description",
				content: "Freelance developer building modern Android apps, websites and Telegram bots. Browse featured projects, download APKs, and get in touch."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "Ayush Dev — Android Apps, Websites & Telegram Bots"
			},
			{
				name: "twitter:description",
				content: "Freelance developer building modern Android apps, websites and Telegram bots. Browse featured projects, download APKs, and get in touch."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b61a7e17-8242-42cb-af90-e655d415899c/id-preview-b539c3c4--8e29f80c-10ad-4ef8-a910-fa4ec53fb8f4.lovable.app-1783945719545.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b61a7e17-8242-42cb-af90-e655d415899c/id-preview-b539c3c4--8e29f80c-10ad-4ef8-a910-fa4ec53fb8f4.lovable.app-1783945719545.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function AuthSubscriber() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const { data } = supabase.auth.onAuthStateChange((event) => {
			if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") router.invalidate();
		});
		return () => {
			data.subscription.unsubscribe();
		};
	}, [router]);
	return null;
}
function RootComponent() {
	const { queryClient } = Route$12.useRouteContext();
	const isAdmin = useRouterState({ select: (s) => s.location.pathname }).startsWith("/admin");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSubscriber, {}),
			isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-screen flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-right",
				richColors: true,
				closeButton: true
			})
		]
	});
}
var $$splitComponentImporter$11 = () => import("./services-BdJiDlEj.mjs");
var Route$11 = createFileRoute("/services")({
	head: () => ({ meta: [
		{ title: "Services — Ayush Dev" },
		{
			name: "description",
			content: "Android apps, websites, Telegram bots, custom software, automation and UI design services."
		},
		{
			property: "og:title",
			content: "Services — Ayush Dev"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./contact-DPBEL2Et.mjs");
var Route$10 = createFileRoute("/contact")({
	loader: ({ context }) => context.queryClient.ensureQueryData(settingsQuery()),
	head: () => ({ meta: [
		{ title: "Contact — Ayush Dev" },
		{
			name: "description",
			content: "Get in touch with Ayush Dev for freelance projects."
		},
		{
			property: "og:title",
			content: "Contact — Ayush Dev"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./about-snB5Pmx1.mjs");
var Route$9 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About — Ayush Dev" },
		{
			name: "description",
			content: "Freelance developer specializing in Android apps, websites and Telegram bots."
		},
		{
			property: "og:title",
			content: "About — Ayush Dev"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./routes-BYLyD2Gz.mjs");
var Route$8 = createFileRoute("/")({
	loader: ({ context }) => Promise.all([
		context.queryClient.ensureQueryData(projectsQuery()),
		context.queryClient.ensureQueryData(categoriesQuery()),
		context.queryClient.ensureQueryData(settingsQuery())
	]),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./reset-password-Bi_BEUua.mjs");
var Route$7 = createFileRoute("/admin/reset-password")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("../_authed.index-BI7gDghZ.mjs");
var Route$6 = createFileRoute("/admin/_authed/")({
	loader: ({ context }) => Promise.all([context.queryClient.ensureQueryData(adminProjectsQuery()), context.queryClient.ensureQueryData(contactMessagesQuery())]),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("../_authed.settings-BRhVo4D4.mjs");
var Route$5 = createFileRoute("/admin/_authed/settings")({
	loader: ({ context }) => context.queryClient.ensureQueryData(settingsQuery()),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("../_authed.messages-CRD8EWtl.mjs");
var Route$4 = createFileRoute("/admin/_authed/messages")({
	loader: ({ context }) => context.queryClient.ensureQueryData(contactMessagesQuery()),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("../_authed.categories-CtDanR3f.mjs");
var Route$3 = createFileRoute("/admin/_authed/categories")({
	loader: ({ context }) => Promise.all([context.queryClient.ensureQueryData(categoriesQuery()), context.queryClient.ensureQueryData(projectsQuery())]),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_authed.analytics-D5na8W3c.mjs");
var Route$2 = createFileRoute("/admin/_authed/analytics")({
	loader: ({ context }) => context.queryClient.ensureQueryData(adminProjectsQuery()),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_authed.projects.index-CiftiyXp.mjs");
var Route$1 = createFileRoute("/admin/_authed/projects/")({
	loader: ({ context }) => context.queryClient.ensureQueryData(adminProjectsQuery()),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_authed.projects.new-c9D0KdOG.mjs");
var Route = createFileRoute("/admin/_authed/projects/new")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var ServicesRoute = Route$11.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => Route$12
});
var ProjectsRoute = Route$16.update({
	id: "/projects",
	path: "/projects",
	getParentRoute: () => Route$12
});
var ContactRoute = Route$10.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$12
});
var AboutRoute = Route$9.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$12
});
var IndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$12
});
var ProjectsSlugRoute = Route$17.update({
	id: "/projects_/$slug",
	path: "/projects/$slug",
	getParentRoute: () => Route$12
});
var AdminResetPasswordRoute = Route$7.update({
	id: "/admin/reset-password",
	path: "/admin/reset-password",
	getParentRoute: () => Route$12
});
var AdminLoginRoute = Route$15.update({
	id: "/admin/login",
	path: "/admin/login",
	getParentRoute: () => Route$12
});
var AdminAuthedRoute = Route$13.update({
	id: "/admin/_authed",
	path: "/admin",
	getParentRoute: () => Route$12
});
var AdminAuthedIndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminAuthedRoute
});
var AdminAuthedSettingsRoute = Route$5.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AdminAuthedRoute
});
var AdminAuthedMessagesRoute = Route$4.update({
	id: "/messages",
	path: "/messages",
	getParentRoute: () => AdminAuthedRoute
});
var AdminAuthedCategoriesRoute = Route$3.update({
	id: "/categories",
	path: "/categories",
	getParentRoute: () => AdminAuthedRoute
});
var AdminAuthedAnalyticsRoute = Route$2.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => AdminAuthedRoute
});
var AdminAuthedProjectsIndexRoute = Route$1.update({
	id: "/projects/",
	path: "/projects/",
	getParentRoute: () => AdminAuthedRoute
});
var AdminAuthedProjectsNewRoute = Route.update({
	id: "/projects/new",
	path: "/projects/new",
	getParentRoute: () => AdminAuthedRoute
});
var AdminAuthedRouteChildren = {
	AdminAuthedAnalyticsRoute,
	AdminAuthedCategoriesRoute,
	AdminAuthedMessagesRoute,
	AdminAuthedSettingsRoute,
	AdminAuthedIndexRoute,
	AdminAuthedProjectsIdRoute: Route$14.update({
		id: "/projects/$id",
		path: "/projects/$id",
		getParentRoute: () => AdminAuthedRoute
	}),
	AdminAuthedProjectsNewRoute,
	AdminAuthedProjectsIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	ContactRoute,
	ProjectsRoute,
	ServicesRoute,
	AdminAuthedRoute: AdminAuthedRoute._addFileChildren(AdminAuthedRouteChildren),
	AdminLoginRoute,
	AdminResetPasswordRoute,
	ProjectsSlugRoute
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
