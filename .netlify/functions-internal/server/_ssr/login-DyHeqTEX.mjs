import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DyHeqTEX.js
var $$splitComponentImporter = () => import("./login-DWXTFQBJ.mjs");
var Route = createFileRoute("/admin/login")({
	validateSearch: (s) => ({
		denied: s.denied ? 1 : void 0,
		signup: s.signup ? 1 : void 0
	}),
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
