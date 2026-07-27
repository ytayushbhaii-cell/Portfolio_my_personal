import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-7dIzM4xF.mjs";
import { a as useQueryClient, o as require_jsx_runtime, r as useQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { F as Globe, M as ImagePlus, O as LoaderCircle, Z as ArrowLeft, a as Upload, b as Save, c as Trash2, f as Sparkles, n as X, p as Smartphone, q as Bot, r as Wrench } from "../_libs/lucide-react.mjs";
import { n as categoriesQuery } from "./queries-Bw20Kjcs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProjectEditor-F7Tf6qNN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BUCKET = "project-media";
var LONG_EXPIRY = 3600 * 24 * 365 * 10;
async function uploadProjectMedia(file, folder) {
	const ext = file.name.split(".").pop() || "bin";
	const path = `${folder}/${crypto.randomUUID()}.${ext}`;
	const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
		cacheControl: "31536000",
		upsert: false,
		contentType: file.type || void 0
	});
	if (error) throw error;
	const { data, error: signErr } = await supabase.storage.from(BUCKET).createSignedUrl(path, LONG_EXPIRY);
	if (signErr || !data) throw signErr || /* @__PURE__ */ new Error("Failed to sign URL");
	return data.signedUrl;
}
var initial = {
	project_type: "android",
	name: "",
	slug: "",
	category_slug: "",
	short_description: "",
	long_description: "",
	features: "",
	tags: "",
	featured: false,
	hidden: false,
	thumbnail_url: "",
	screenshots: [],
	apk_url: "",
	apk_external_url: "",
	website_url: "",
	bot_url: ""
};
var typeOptions = [
	{
		value: "android",
		label: "Android App",
		icon: Smartphone,
		desc: "APK download or external link"
	},
	{
		value: "website",
		label: "Website",
		icon: Globe,
		desc: "Live website URL"
	},
	{
		value: "telegram",
		label: "Telegram Bot",
		icon: Bot,
		desc: "t.me/... bot link"
	},
	{
		value: "automation",
		label: "Automation",
		icon: Wrench,
		desc: "Scripts, workflows, integrations"
	},
	{
		value: "other",
		label: "Other",
		icon: Sparkles,
		desc: "Anything else"
	}
];
function slugify(s) {
	return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}
function ProjectEditor({ existing }) {
	const navigate = useNavigate();
	const qc = useQueryClient();
	const { data: categories = [] } = useQuery(categoriesQuery());
	const [step, setStep] = (0, import_react.useState)(existing ? "form" : "type");
	const [form, setForm] = (0, import_react.useState)(() => existing ? {
		project_type: existing.project_type,
		name: existing.name,
		slug: existing.slug,
		category_slug: existing.category_slug,
		short_description: existing.short_description,
		long_description: existing.long_description,
		features: existing.features.join("\n"),
		tags: existing.tags.join(", "),
		featured: existing.featured,
		hidden: existing.hidden,
		thumbnail_url: existing.thumbnail_url || "",
		screenshots: existing.screenshots,
		apk_url: existing.apk_url || "",
		apk_external_url: existing.apk_external_url || "",
		website_url: existing.website_url || "",
		bot_url: existing.bot_url || ""
	} : initial);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [uploading, setUploading] = (0, import_react.useState)(null);
	const [slugTouched, setSlugTouched] = (0, import_react.useState)(!!existing);
	(0, import_react.useEffect)(() => {
		if (!slugTouched) setForm((f) => ({
			...f,
			slug: slugify(f.name)
		}));
	}, [form.name, slugTouched]);
	(0, import_react.useEffect)(() => {
		if (!existing && !form.category_slug && categories.length > 0) setForm((f) => ({
			...f,
			category_slug: categories[0].slug
		}));
	}, [
		categories,
		existing,
		form.category_slug
	]);
	function set(k, v) {
		setForm((f) => ({
			...f,
			[k]: v
		}));
	}
	async function onUploadFile(file, kind) {
		setUploading(kind);
		try {
			const url = await uploadProjectMedia(file, kind === "apk" ? "apks" : "images");
			if (kind === "thumb") set("thumbnail_url", url);
			else if (kind === "screenshot") set("screenshots", [...form.screenshots, url]);
			else set("apk_url", url);
			toast.success("Uploaded");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Upload failed");
		} finally {
			setUploading(null);
		}
	}
	async function onUploadScreenshots(files) {
		setUploading("screenshot");
		try {
			const urls = [];
			for (const file of files) {
				const url = await uploadProjectMedia(file, "images");
				urls.push(url);
			}
			setForm((f) => ({
				...f,
				screenshots: [...f.screenshots, ...urls]
			}));
			toast.success(`Uploaded ${urls.length} screenshot${urls.length === 1 ? "" : "s"}`);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Upload failed");
		} finally {
			setUploading(null);
		}
	}
	async function onSubmit(e) {
		e.preventDefault();
		if (!form.name || !form.slug || !form.category_slug) {
			toast.error("Name, slug and category are required");
			return;
		}
		setSaving(true);
		const t = form.project_type;
		const payload = {
			project_type: t,
			name: form.name,
			slug: form.slug,
			category_slug: form.category_slug,
			short_description: form.short_description,
			long_description: form.long_description,
			features: form.features.split("\n").map((s) => s.trim()).filter(Boolean),
			tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
			featured: form.featured,
			hidden: form.hidden,
			thumbnail_url: form.thumbnail_url || null,
			screenshots: form.screenshots,
			apk_url: t === "android" ? form.apk_url || null : null,
			apk_external_url: t === "android" ? form.apk_external_url || null : null,
			website_url: t === "website" ? form.website_url || null : null,
			bot_url: t === "telegram" ? form.bot_url || null : null
		};
		const { error } = await (existing ? supabase.from("projects").update(payload).eq("id", existing.id) : supabase.from("projects").insert(payload));
		setSaving(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success(existing ? "Project updated" : "Project created");
		qc.invalidateQueries();
		navigate({ to: "/admin/projects" });
	}
	if (step === "type") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => navigate({ to: "/admin/projects" }),
				className: "inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "New project"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "Choose the project type — we'll only ask for what's relevant."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: typeOptions.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						set("project_type", opt.value);
						setStep("form");
					},
					className: "surface-card hover:[&]:surface-card-hover text-left p-6 transition",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-12 w-12 place-items-center rounded-2xl btn-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(opt.icon, { className: "h-6 w-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-semibold",
							children: opt.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: opt.desc
						})
					]
				}, opt.value))
			})
		]
	});
	const t = form.project_type;
	const typeLabel = typeOptions.find((o) => o.value === t)?.label || "Project";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => existing ? navigate({ to: "/admin/projects" }) : setStep("type"),
					className: "inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }),
						" ",
						existing ? "Back" : "Change type"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "submit",
					disabled: saving,
					className: "btn-primary hover:[&]:btn-primary-hover inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold disabled:opacity-70",
					children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), existing ? "Save changes" : "Create project"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-widest text-primary",
				children: typeLabel
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-3xl font-bold tracking-tight",
				children: existing ? "Edit project" : `New ${typeLabel}`
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[1.4fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
							title: "Basics",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: t === "telegram" ? "Bot name" : "Project name",
											required: true,
											value: form.name,
											onChange: (v) => set("name", v)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Slug (URL)",
											required: true,
											value: form.slug,
											onChange: (v) => {
												set("slug", slugify(v));
												setSlugTouched(true);
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Category" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: form.category_slug,
												onChange: (e) => set("category_slug", e.target.value),
												className: inputCls,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "",
													disabled: true,
													children: categories.length ? "Select a category" : "No categories yet"
												}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: c.slug,
													children: c.name
												}, c.slug))]
											}),
											categories.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1.5 text-xs text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => navigate({ to: "/admin/categories" }),
													className: "text-primary font-medium hover:underline",
													children: "Create a category"
												}), " first, then come back."]
											})
										] }),
										existing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Project type" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											value: form.project_type,
											onChange: (e) => set("project_type", e.target.value),
											className: inputCls,
											children: typeOptions.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: o.value,
												children: o.label
											}, o.value))
										})] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Short description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 2,
										value: form.short_description,
										onChange: (e) => set("short_description", e.target.value),
										className: inputCls,
										maxLength: 300
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Full description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 6,
										value: form.long_description,
										onChange: (e) => set("long_description", e.target.value),
										className: inputCls
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
							title: "Features & Tags",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Features (one per line)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 5,
								value: form.features,
								onChange: (e) => set("features", e.target.value),
								className: inputCls,
								placeholder: "Dark mode\nOffline support\nPush notifications"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Tags (comma separated)",
									value: form.tags,
									onChange: (v) => set("tags", v),
									placeholder: "finance, mobile, productivity"
								})
							})]
						}),
						t === "android" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "APK",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "External APK link",
									value: form.apk_external_url,
									onChange: (v) => set("apk_external_url", v),
									placeholder: "https://drive.google.com/..."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Or upload APK" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileInput, {
										accept: ".apk,application/vnd.android.package-archive",
										onFile: (f) => onUploadFile(f, "apk"),
										loading: uploading === "apk",
										label: form.apk_url ? "Replace APK" : "Upload APK"
									}),
									form.apk_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex items-center justify-between rounded-lg bg-secondary p-2 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: form.apk_url,
											target: "_blank",
											rel: "noreferrer",
											className: "truncate text-primary hover:underline",
											children: "Uploaded APK"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => set("apk_url", ""),
											className: "text-destructive",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
										})]
									})
								] })]
							})
						}),
						t === "website" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Website",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Website link",
								value: form.website_url,
								onChange: (v) => set("website_url", v),
								placeholder: "https://example.com"
							})
						}),
						t === "telegram" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Bot",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Bot link",
								value: form.bot_url,
								onChange: (v) => set("bot_url", v),
								placeholder: "https://t.me/yourbot"
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
							title: "Visibility",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-semibold",
									children: "Featured"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: "Show on the homepage."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: form.featured,
									onChange: (e) => set("featured", e.target.checked),
									className: "h-5 w-5 rounded"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-3 flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-semibold",
									children: "Hidden"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: "Hide from the public site."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: form.hidden,
									onChange: (e) => set("hidden", e.target.checked),
									className: "h-5 w-5 rounded"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Thumbnail",
							children: form.thumbnail_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative overflow-hidden rounded-xl border border-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: form.thumbnail_url,
									alt: "",
									className: "aspect-video w-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => set("thumbnail_url", ""),
									className: "absolute top-2 right-2 grid h-8 w-8 place-items-center rounded-lg bg-background/90 text-destructive",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileInput, {
								accept: "image/*",
								onFile: (f) => onUploadFile(f, "thumb"),
								loading: uploading === "thumb",
								label: "Upload thumbnail",
								big: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
							title: "Screenshots",
							children: [form.screenshots.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-3 gap-2",
								children: form.screenshots.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative aspect-square overflow-hidden rounded-lg border border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: s,
										alt: "",
										className: "h-full w-full object-cover"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => set("screenshots", form.screenshots.filter((_, j) => j !== i)),
										className: "absolute top-1 right-1 grid h-6 w-6 place-items-center rounded-md bg-background/90 text-destructive",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
									})]
								}, i))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileInput, {
									accept: "image/*",
									multiple: true,
									onFiles: (files) => onUploadScreenshots(files),
									loading: uploading === "screenshot",
									label: "Add screenshots (select multiple)",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "h-4 w-4" })
								})
							})]
						})
					]
				})]
			})
		]
	});
}
var inputCls = "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";
function Label({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "text-sm font-medium",
		children
	});
}
function Field({ label, value, onChange, required, type = "text", placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [label, required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-destructive",
		children: " *"
	})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		value,
		onChange: (e) => onChange(e.target.value),
		required,
		placeholder,
		className: inputCls
	})] });
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-card p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-lg font-bold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children
		})]
	});
}
function FileInput({ accept, onFile, onFiles, multiple, loading, label, big, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: `flex ${big ? "aspect-video flex-col" : ""} cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-background px-4 py-3 text-sm font-medium hover:border-primary/50 ${loading ? "opacity-70" : ""}`,
		children: [
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : icon || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: loading ? "Uploading..." : label }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "file",
				accept,
				multiple,
				className: "hidden",
				onChange: (e) => {
					const files = Array.from(e.target.files ?? []);
					if (files.length) {
						if (multiple && onFiles) onFiles(files);
						else if (onFile) onFile(files[0]);
					}
					e.target.value = "";
				}
			})
		]
	});
}
//#endregion
export { ProjectEditor as t };
