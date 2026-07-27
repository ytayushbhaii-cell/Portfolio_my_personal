import { P as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as projectsQuery, i as projectBySlugQuery } from "./queries-Bw20Kjcs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects_._slug-DGQjt7zR.js
var $$splitComponentImporter = () => import("./projects_._slug-DCj8B5Vw.mjs");
var $$splitErrorComponentImporter = () => import("./projects_._slug-DFxhVPf7.mjs");
var $$splitNotFoundComponentImporter = () => import("./projects_._slug-Bb4D2dE2.mjs");
var Route = createFileRoute("/projects_/$slug")({
	loader: async ({ context, params }) => {
		const project = await context.queryClient.ensureQueryData(projectBySlugQuery(params.slug));
		if (!project || project.hidden) throw notFound();
		await context.queryClient.ensureQueryData(projectsQuery());
		return { project };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Project — Ayush Dev" }, {
			name: "robots",
			content: "noindex"
		}] };
		const p = loaderData.project;
		const title = p.seo_title || `${p.name} — Ayush Dev`;
		const desc = p.seo_description || p.short_description;
		return { meta: [
			{ title },
			{
				name: "description",
				content: desc
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: desc
			},
			...p.thumbnail_url ? [{
				property: "og:image",
				content: p.thumbnail_url
			}] : []
		] };
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
