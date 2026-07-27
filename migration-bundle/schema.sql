-- =========================================================================
-- Ayush Dev Portfolio — Full Schema Migration
-- Run this in a fresh Supabase project's SQL editor to recreate everything.
-- =========================================================================

-- ---------- ENUMS ----------
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- ---------- HELPER FUNCTIONS ----------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ---------- USER ROLES ----------
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

-- Auto-promote the very first signup to admin
CREATE OR REPLACE FUNCTION public.bootstrap_first_admin()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END; $$;

CREATE TRIGGER bootstrap_first_admin_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.bootstrap_first_admin();

-- ---------- CATEGORIES ----------
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  icon TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.categories TO authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins manage categories" ON public.categories FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

-- ---------- PROJECTS ----------
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  project_type TEXT NOT NULL DEFAULT 'android'
    CHECK (project_type IN ('android','website','telegram','automation','other')),
  category_slug TEXT NOT NULL REFERENCES public.categories(slug) ON UPDATE CASCADE,
  short_description TEXT NOT NULL DEFAULT '',
  long_description TEXT NOT NULL DEFAULT '',
  features TEXT[] NOT NULL DEFAULT '{}',
  tags TEXT[] NOT NULL DEFAULT '{}',
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  thumbnail_url TEXT,
  screenshots TEXT[] NOT NULL DEFAULT '{}',
  version TEXT,
  release_date DATE,
  status TEXT NOT NULL DEFAULT 'published',
  featured BOOLEAN NOT NULL DEFAULT false,
  hidden BOOLEAN NOT NULL DEFAULT false,
  apk_url TEXT,
  apk_external_url TEXT,
  website_url TEXT,
  bot_url TEXT,
  github_url TEXT,
  seo_title TEXT,
  seo_description TEXT,
  view_count INTEGER NOT NULL DEFAULT 0,
  download_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX projects_category_idx ON public.projects(category_slug);
CREATE INDEX projects_created_idx ON public.projects(created_at DESC);
CREATE INDEX projects_featured_idx ON public.projects(featured);

GRANT SELECT ON public.projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read visible projects" ON public.projects FOR SELECT
  USING (hidden = false);
CREATE POLICY "Admins read all projects" ON public.projects FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage projects" ON public.projects FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE TRIGGER projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------- SITE SETTINGS (single row) ----------
CREATE TABLE public.site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  site_name TEXT NOT NULL DEFAULT 'Ayush Dev',
  tagline TEXT NOT NULL DEFAULT 'Building Modern Android Apps, Websites & Telegram Bots.',
  bio TEXT NOT NULL DEFAULT '',
  email TEXT, telegram TEXT, github TEXT, twitter TEXT, linkedin TEXT,
  logo_url TEXT, favicon_url TEXT,
  primary_color TEXT DEFAULT '#2563EB',
  seo_title TEXT, seo_description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins update settings" ON public.site_settings FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

INSERT INTO public.site_settings (id) VALUES (1) ON CONFLICT DO NOTHING;

CREATE TRIGGER site_settings_updated_at BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ---------- CONTACT MESSAGES ----------
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read messages" ON public.contact_messages FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage messages" ON public.contact_messages FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete messages" ON public.contact_messages FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- ---------- RPC FUNCTIONS ----------
CREATE OR REPLACE FUNCTION public.increment_project_view(_slug text)
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.projects SET view_count = view_count + 1 WHERE slug = _slug AND hidden = false;
$$;

CREATE OR REPLACE FUNCTION public.increment_project_download(_slug text)
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.projects SET download_count = download_count + 1 WHERE slug = _slug AND hidden = false;
$$;

-- ---------- STORAGE BUCKET ----------
INSERT INTO storage.buckets (id, name, public) VALUES ('project-media', 'project-media', false)
  ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Admins upload media" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'project-media' AND has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update media" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'project-media' AND has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete media" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'project-media' AND has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins read media" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'project-media' AND has_role(auth.uid(), 'admin'));
