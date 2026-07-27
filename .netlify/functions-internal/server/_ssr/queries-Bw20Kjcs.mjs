import { t as supabase } from "./client-7dIzM4xF.mjs";
import { t as queryOptions } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-Bw20Kjcs.js
var projectsQuery = () => queryOptions({
	queryKey: ["projects"],
	queryFn: async () => {
		const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
		if (error) throw error;
		return data ?? [];
	}
});
var projectBySlugQuery = (slug) => queryOptions({
	queryKey: ["project", slug],
	queryFn: async () => {
		const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).maybeSingle();
		if (error) throw error;
		return data ?? null;
	}
});
var categoriesQuery = () => queryOptions({
	queryKey: ["categories"],
	queryFn: async () => {
		const { data, error } = await supabase.from("categories").select("*").order("sort_order");
		if (error) throw error;
		return data ?? [];
	}
});
var settingsQuery = () => queryOptions({
	queryKey: ["site_settings"],
	queryFn: async () => {
		const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
		if (error) throw error;
		return data ?? null;
	}
});
var adminProjectsQuery = () => queryOptions({
	queryKey: ["admin", "projects"],
	queryFn: async () => {
		const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
		if (error) throw error;
		return data ?? [];
	}
});
var contactMessagesQuery = () => queryOptions({
	queryKey: ["admin", "messages"],
	queryFn: async () => {
		const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
		if (error) throw error;
		return data ?? [];
	}
});
//#endregion
export { projectsQuery as a, projectBySlugQuery as i, categoriesQuery as n, settingsQuery as o, contactMessagesQuery as r, adminProjectsQuery as t };
