import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as projectsQuery, n as categoriesQuery } from "./queries-Bw20Kjcs.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-vRQFbtBF.js
var $$splitComponentImporter = () => import("./projects-DKBI8uo-.mjs");
var searchSchema = objectType({
	category: stringType().optional(),
	q: stringType().optional()
});
var Route = createFileRoute("/projects")({
	validateSearch: (s) => searchSchema.parse(s),
	loaderDeps: ({ search }) => ({
		category: search.category,
		q: search.q
	}),
	loader: ({ context }) => Promise.all([context.queryClient.ensureQueryData(projectsQuery()), context.queryClient.ensureQueryData(categoriesQuery())]),
	head: () => ({ meta: [{ title: "Projects — Ayush Dev" }, {
		name: "description",
		content: "Explore Android apps, websites and Telegram bots built by Ayush Dev."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
