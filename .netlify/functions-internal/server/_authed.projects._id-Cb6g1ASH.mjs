import { t as supabase } from "./_ssr/client-7dIzM4xF.mjs";
import { t as queryOptions } from "./_libs/react+tanstack__react-query.mjs";
import { P as notFound, m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authed.projects._id-Cb6g1ASH.js
var projectByIdQuery = (id) => queryOptions({
	queryKey: [
		"admin",
		"project",
		id
	],
	queryFn: async () => {
		const { data, error } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
		if (error) throw error;
		return data ?? null;
	}
});
var $$splitComponentImporter = () => import("./_authed.projects._id-Cj-VEYJV.mjs");
var Route = createFileRoute("/admin/_authed/projects/$id")({
	loader: async ({ context, params }) => {
		const p = await context.queryClient.ensureQueryData(projectByIdQuery(params.id));
		if (!p) throw notFound();
		return { project: p };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { projectByIdQuery as n, Route as t };
