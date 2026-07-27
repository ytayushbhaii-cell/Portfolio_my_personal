import { t as supabase } from "./_ssr/client-7dIzM4xF.mjs";
import { j as redirect, m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authed-DPKXvhR_.js
var $$splitComponentImporter = () => import("./_authed-ngs_vCT2.mjs");
var Route = createFileRoute("/admin/_authed")({
	ssr: false,
	beforeLoad: async () => {
		const { data: userData, error } = await supabase.auth.getUser();
		if (error || !userData.user) throw redirect({ to: "/admin/login" });
		const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", userData.user.id);
		if (!(roles ?? []).some((r) => r.role === "admin")) throw redirect({
			to: "/admin/login",
			search: { denied: 1 }
		});
		return { userEmail: userData.user.email };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
