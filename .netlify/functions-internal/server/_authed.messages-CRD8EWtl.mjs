import { t as supabase } from "./_ssr/client-7dIzM4xF.mjs";
import { a as useQueryClient, n as useSuspenseQuery, o as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { T as Mail, c as Trash2 } from "./_libs/lucide-react.mjs";
import { r as contactMessagesQuery } from "./_ssr/queries-Bw20Kjcs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authed.messages-CRD8EWtl.js
var import_jsx_runtime = require_jsx_runtime();
function Messages() {
	const messages = useSuspenseQuery(contactMessagesQuery()).data;
	const qc = useQueryClient();
	async function toggleRead(id, current) {
		const { error } = await supabase.from("contact_messages").update({ read: !current }).eq("id", id);
		if (error) toast.error(error.message);
		else qc.invalidateQueries({ queryKey: ["admin", "messages"] });
	}
	async function remove(id) {
		if (!confirm("Delete this message?")) return;
		const { error } = await supabase.from("contact_messages").delete().eq("id", id);
		if (error) toast.error(error.message);
		else {
			toast.success("Deleted");
			qc.invalidateQueries({ queryKey: ["admin", "messages"] });
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-bold tracking-tight",
			children: "Messages"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Contact form submissions."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "surface-card p-10 text-center text-sm text-muted-foreground",
				children: "Inbox is empty."
			}), messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `surface-card p-5 ${m.read ? "opacity-70" : ""}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: m.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: `mailto:${m.email}`,
										className: "text-xs text-primary hover:underline inline-flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3 w-3" }),
											" ",
											m.email
										]
									}),
									!m.read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary",
										children: "NEW"
									})
								]
							}),
							m.subject && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-sm font-medium",
								children: m.subject
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 whitespace-pre-wrap text-sm text-muted-foreground",
								children: m.message
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-xs text-muted-foreground",
								children: new Date(m.created_at).toLocaleString()
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => toggleRead(m.id, m.read),
							className: "rounded-lg border border-border bg-background px-3 py-1 text-xs font-semibold hover:border-primary/40",
							children: m.read ? "Mark unread" : "Mark read"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => remove(m.id),
							className: "rounded-lg border border-border bg-background px-3 py-1 text-xs font-semibold text-destructive hover:border-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3 inline" }), " Delete"]
						})]
					})]
				})
			}, m.id))]
		})]
	});
}
//#endregion
export { Messages as component };
