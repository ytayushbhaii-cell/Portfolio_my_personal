import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ProjectType = "android" | "website" | "telegram" | "automation" | "other";

export type Project = {
  id: string;
  slug: string;
  name: string;
  project_type: ProjectType;
  category_slug: string;
  short_description: string;
  long_description: string;
  features: string[];
  tags: string[];
  tech_stack: string[];
  thumbnail_url: string | null;
  screenshots: string[];
  version: string | null;
  release_date: string | null;
  status: string;
  featured: boolean;
  hidden: boolean;
  apk_url: string | null;
  apk_external_url: string | null;
  website_url: string | null;
  bot_url: string | null;
  github_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  view_count: number;
  download_count: number;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  icon: string | null;
  sort_order: number;
};

export type SiteSettings = {
  id: number;
  site_name: string;
  tagline: string;
  bio: string;
  email: string | null;
  telegram: string | null;
  github: string | null;
  twitter: string | null;
  linkedin: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  primary_color: string | null;
  seo_title: string | null;
  seo_description: string | null;
};

export const projectsQuery = () =>
  queryOptions({
    queryKey: ["projects"],
    queryFn: async (): Promise<Project[]> => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Project[];
    },
  });

export const projectBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["project", slug],
    queryFn: async (): Promise<Project | null> => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return (data as Project | null) ?? null;
    },
  });

export const categoriesQuery = () =>
  queryOptions({
    queryKey: ["categories"],
    queryFn: async (): Promise<Category[]> => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as Category[];
    },
  });

export const settingsQuery = () =>
  queryOptions({
    queryKey: ["site_settings"],
    queryFn: async (): Promise<SiteSettings | null> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", 1)
        .maybeSingle();
      if (error) throw error;
      return (data as SiteSettings | null) ?? null;
    },
  });

export const adminProjectsQuery = () =>
  queryOptions({
    queryKey: ["admin", "projects"],
    queryFn: async (): Promise<Project[]> => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Project[];
    },
  });

export const contactMessagesQuery = () =>
  queryOptions({
    queryKey: ["admin", "messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
