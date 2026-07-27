import { r as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/client-7dIzM4xF.mjs";
import { a as useQueryClient, n as useSuspenseQuery, o as require_jsx_runtime, s as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { O as LoaderCircle, b as Save } from "./_libs/lucide-react.mjs";
import { o as settingsQuery } from "./_ssr/queries-Bw20Kjcs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authed.settings-BRhVo4D4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Settings() {
	const settings = useSuspenseQuery(settingsQuery()).data;
	const qc = useQueryClient();
	const [form, setForm] = (0, import_react.useState)(settings || {});
	const [saving, setSaving] = (0, import_react.useState)(false);
	function set(k, v) {
		setForm((f) => ({
			...f,
			[k]: v
		}));
	}
	async function onSubmit(e) {
		e.preventDefault();
		setSaving(true);
		const { error } = await supabase.from("site_settings").update({
			...form,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", 1);
		setSaving(false);
		if (error) toast.error(error.message);
		else {
			toast.success("Settings saved");
			qc.invalidateQueries({ queryKey: ["site_settings"] });
		}
	}
	const inputCls = "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold tracking-tight",
					children: "Settings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Site info, SEO and social links."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					disabled: saving,
					className: "btn-primary hover:[&]:btn-primary-hover inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold disabled:opacity-70",
					children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold",
						children: "Site"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Site name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.site_name || "",
							onChange: (e) => set("site_name", e.target.value),
							className: inputCls
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Primary color"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.primary_color || "",
							onChange: (e) => set("primary_color", e.target.value),
							className: inputCls,
							placeholder: "#2563EB"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm font-medium",
						children: "Tagline"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: form.tagline || "",
						onChange: (e) => set("tagline", e.target.value),
						className: inputCls
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm font-medium",
						children: "Bio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 4,
						value: form.bio || "",
						onChange: (e) => set("bio", e.target.value),
						className: inputCls
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card p-6 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-bold",
					children: "Contact & Social"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.email || "",
							onChange: (e) => set("email", e.target.value),
							className: inputCls
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Telegram (@handle)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.telegram || "",
							onChange: (e) => set("telegram", e.target.value),
							className: inputCls
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "GitHub URL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.github || "",
							onChange: (e) => set("github", e.target.value),
							className: inputCls
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Twitter URL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.twitter || "",
							onChange: (e) => set("twitter", e.target.value),
							className: inputCls
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "LinkedIn URL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.linkedin || "",
							onChange: (e) => set("linkedin", e.target.value),
							className: inputCls
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold",
						children: "SEO"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm font-medium",
						children: "SEO title"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: form.seo_title || "",
						onChange: (e) => set("seo_title", e.target.value),
						className: inputCls
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm font-medium",
						children: "SEO description"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 2,
						value: form.seo_description || "",
						onChange: (e) => set("seo_description", e.target.value),
						className: inputCls,
						maxLength: 200
					})] })
				]
			})
		]
	});
}
//#endregion
export { Settings as component };
