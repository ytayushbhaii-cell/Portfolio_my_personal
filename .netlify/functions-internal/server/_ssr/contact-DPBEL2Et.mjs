import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-7dIzM4xF.mjs";
import { n as useSuspenseQuery, o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { I as Github, T as Mail, k as Linkedin, o as Twitter, v as Send } from "../_libs/lucide-react.mjs";
import { o as settingsQuery } from "./queries-Bw20Kjcs.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-DPBEL2Et.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	name: stringType().trim().min(2, "Name is too short").max(80),
	email: stringType().trim().email("Invalid email"),
	subject: stringType().trim().max(120).optional(),
	message: stringType().trim().min(10, "Message too short").max(2e3)
});
function Contact() {
	const settings = useSuspenseQuery(settingsQuery()).data;
	const [loading, setLoading] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const parsed = schema.safeParse({
			name: fd.get("name"),
			email: fd.get("email"),
			subject: fd.get("subject") || void 0,
			message: fd.get("message")
		});
		if (!parsed.success) {
			toast.error(parsed.error.issues[0]?.message || "Invalid form");
			return;
		}
		setLoading(true);
		const { error } = await supabase.from("contact_messages").insert(parsed.data);
		setLoading(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Message sent — I'll get back to you soon!");
		e.currentTarget.reset();
	}
	const channels = [
		{
			icon: Mail,
			label: "Email",
			value: settings?.email || "hello@example.com",
			href: `mailto:${settings?.email || "hello@example.com"}`
		},
		{
			icon: Send,
			label: "Telegram",
			value: settings?.telegram || "@ayushdev",
			href: settings?.telegram ? `https://t.me/${settings.telegram.replace(/^@/, "")}` : "https://t.me/"
		},
		{
			icon: Github,
			label: "GitHub",
			value: "github.com",
			href: settings?.github || "https://github.com/"
		},
		{
			icon: Twitter,
			label: "Twitter",
			value: "twitter.com",
			href: settings?.twitter || "https://twitter.com/"
		},
		{
			icon: Linkedin,
			label: "LinkedIn",
			value: "linkedin.com",
			href: settings?.linkedin || "https://linkedin.com/"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl mb-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "section-label",
					children: "Contact"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl",
					children: "Let's build something together."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted-foreground",
					children: "Tell me about your project — I'll reply within a few hours."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 lg:grid-cols-[1.4fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "surface-card p-6 sm:p-8 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Your name",
							name: "name",
							placeholder: "John Doe",
							required: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email",
							name: "email",
							type: "email",
							placeholder: "john@example.com",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Subject",
						name: "subject",
						placeholder: "Project inquiry"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm font-medium",
						children: "Message"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						name: "message",
						required: true,
						minLength: 10,
						maxLength: 2e3,
						rows: 6,
						placeholder: "Tell me about your project...",
						className: "mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						disabled: loading,
						className: "btn-primary hover:[&]:btn-primary-hover inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold disabled:opacity-70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" }),
							" ",
							loading ? "Sending..." : "Send message"
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: channels.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: c.href,
					target: "_blank",
					rel: "noreferrer",
					className: "surface-card hover:[&]:surface-card-hover flex items-center gap-4 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
							children: c.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate font-medium",
							children: c.value
						})]
					})]
				}, c.label))
			})]
		})]
	});
}
function Field({ label, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "text-sm font-medium",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		...props,
		className: "mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
	})] });
}
//#endregion
export { Contact as component };
