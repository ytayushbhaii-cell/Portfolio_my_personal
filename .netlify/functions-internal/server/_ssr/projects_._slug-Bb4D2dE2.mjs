import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects_._slug-Bb4D2dE2.js
var import_jsx_runtime = require_jsx_runtime();
var SplitNotFoundComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "mx-auto max-w-2xl px-4 py-24 text-center",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "text-3xl font-bold",
		children: "Project not found"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/projects",
		className: "mt-6 inline-flex btn-primary hover:[&]:btn-primary-hover rounded-xl px-4 py-2 text-sm font-semibold",
		children: "Back to projects"
	})]
});
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
