import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-7dIzM4xF.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as Lock, H as CodeXml, T as Mail } from "../_libs/lucide-react.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { t as Route } from "./login-DyHeqTEX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DWXTFQBJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	email: stringType().trim().email(),
	password: stringType().min(6, "Password too short").max(100)
});
function LoginPage() {
	const { denied, signup: signupParam } = Route.useSearch();
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)(signupParam ? "signup" : "login");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [remember, setRemember] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (denied) toast.error("You don't have admin access.");
		supabase.auth.getUser().then(({ data }) => {
			if (data.user) navigate({ to: "/admin" });
		});
	}, [denied, navigate]);
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const parsed = schema.safeParse({
			email: fd.get("email"),
			password: fd.get("password")
		});
		if (!parsed.success) {
			toast.error(parsed.error.issues[0]?.message || "Invalid input");
			return;
		}
		setLoading(true);
		try {
			if (mode === "signup") {
				const { error } = await supabase.auth.signUp({
					email: parsed.data.email,
					password: parsed.data.password,
					options: { emailRedirectTo: `${window.location.origin}/admin` }
				});
				if (error) throw error;
				toast.success("Account created — signing you in...");
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email: parsed.data.email,
					password: parsed.data.password
				});
				if (error) throw error;
			}
			const { data: userData } = await supabase.auth.getUser();
			if (!userData.user) {
				toast.error("Sign in failed");
				return;
			}
			const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", userData.user.id);
			if (!(roles ?? []).some((r) => r.role === "admin")) {
				await supabase.auth.signOut();
				toast.error("This account is not an admin.");
				return;
			}
			if (!remember) {}
			navigate({ to: "/admin" });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Sign in failed");
		} finally {
			setLoading(false);
		}
	}
	async function onForgot() {
		const email = document.querySelector("input[name=email]")?.value?.trim();
		if (!email) {
			toast.error("Enter your email first");
			return;
		}
		const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/admin/reset-password` });
		if (error) toast.error(error.message);
		else toast.success("Password reset email sent");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen hero-bg flex items-center justify-center px-4 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "mx-auto flex w-fit items-center gap-2 font-bold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-10 w-10 place-items-center rounded-xl btn-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xl",
					children: ["Ayush", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "gradient-text",
						children: "Dev"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 surface-card p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold tracking-tight",
						children: mode === "signup" ? "Create admin account" : "Admin Login"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: mode === "signup" ? "First signup becomes the admin. Restricted after that." : "Sign in to manage your portfolio."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit,
						className: "mt-6 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mt-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									name: "email",
									required: true,
									placeholder: "you@example.com",
									className: "w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									children: "Password"
								}), mode === "login" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: onForgot,
									className: "text-xs font-medium text-primary hover:underline",
									children: "Forgot?"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mt-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									name: "password",
									required: true,
									minLength: 6,
									placeholder: "••••••••",
									className: "w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
								})]
							})] }),
							mode === "login" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: remember,
									onChange: (e) => setRemember(e.target.checked),
									className: "h-4 w-4 rounded border-border text-primary"
								}), "Remember me"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: loading,
								className: "btn-primary hover:[&]:btn-primary-hover w-full rounded-xl py-3 text-sm font-semibold disabled:opacity-70",
								children: loading ? "Please wait..." : mode === "signup" ? "Create account" : "Sign in"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setMode(mode === "login" ? "signup" : "login"),
						className: "mt-5 w-full text-center text-xs text-muted-foreground hover:text-foreground",
						children: mode === "login" ? "First time here? Create the admin account →" : "Already have an account? Sign in →"
					})
				]
			})]
		})
	});
}
//#endregion
export { LoginPage as component };
