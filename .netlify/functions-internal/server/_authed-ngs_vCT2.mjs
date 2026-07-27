import { r as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/client-7dIzM4xF.mjs";
import { o as require_jsx_runtime, s as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { f as Outlet, g as Link, l as useRouterState } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./_authed-DPKXvhR_.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { E as LogOut, G as ChartColumn, H as CodeXml, K as Boxes, N as House, _ as Settings, j as Inbox, l as Tag, n as X, w as Menu } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authed-ngs_vCT2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var nav = [
	{
		to: "/admin",
		label: "Dashboard",
		icon: House,
		exact: true
	},
	{
		to: "/admin/projects",
		label: "Projects",
		icon: Boxes
	},
	{
		to: "/admin/categories",
		label: "Categories",
		icon: Tag
	},
	{
		to: "/admin/messages",
		label: "Messages",
		icon: Inbox
	},
	{
		to: "/admin/analytics",
		label: "Analytics",
		icon: ChartColumn
	},
	{
		to: "/admin/settings",
		label: "Settings",
		icon: Settings
	}
];
function AdminLayout() {
	const { userEmail } = Route.useRouteContext();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	async function onLogout() {
		await supabase.auth.signOut();
		toast.success("Signed out");
		window.location.href = "/admin/login";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:hidden sticky top-0 z-40 glass-nav flex items-center justify-between px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/admin",
				className: "flex items-center gap-2 font-bold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-8 w-8 place-items-center rounded-lg btn-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { className: "h-4 w-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Admin" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setOpen((o) => !o),
				className: "grid h-10 w-10 place-items-center rounded-xl border border-border bg-card",
				children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:flex",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `${open ? "block" : "hidden"} lg:block lg:fixed lg:inset-y-0 lg:w-64 lg:border-r lg:border-border lg:bg-card`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden lg:flex h-16 items-center gap-2 border-b border-border px-6 font-bold",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-9 w-9 place-items-center rounded-xl btn-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Ayush", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gradient-text",
								children: "Dev"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary uppercase",
								children: "Admin"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "p-4 space-y-1",
						children: nav.map((n) => {
							const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: n.to,
								className: `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: "h-4 w-4" }),
									" ",
									n.label
								]
							}, n.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-auto border-t border-border p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 truncate text-xs text-muted-foreground",
							children: userEmail
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/",
								className: "flex-1 rounded-xl border border-border bg-background px-3 py-2 text-center text-xs font-medium hover:border-primary/40",
								children: "View Site"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: onLogout,
								className: "grid h-9 w-9 place-items-center rounded-xl border border-border bg-background hover:border-primary/40",
								"aria-label": "Sign out",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" })
							})]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 lg:pl-64",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})
			})]
		})]
	});
}
//#endregion
export { AdminLayout as component };
