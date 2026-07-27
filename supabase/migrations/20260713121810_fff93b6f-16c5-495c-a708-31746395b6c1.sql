
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

-- Auto-promote the FIRST signup to admin (single-admin portfolio)
CREATE OR REPLACE FUNCTION public.bootstrap_first_admin()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created_bootstrap_admin
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.bootstrap_first_admin();

-- updated_at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Categories
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  icon text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read categories" ON public.categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage categories" ON public.categories FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.categories (slug, name, icon, sort_order) VALUES
  ('apps', 'Android Apps', 'Smartphone', 1),
  ('websites', 'Websites', 'Globe', 2),
  ('telegram-bots', 'Telegram Bots', 'Bot', 3),
  ('automation', 'Automation', 'Zap', 4),
  ('tools', 'Tools', 'Wrench', 5),
  ('others', 'Others', 'Package', 6);

-- Projects
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  category_slug text NOT NULL REFERENCES public.categories(slug) ON UPDATE CASCADE,
  short_description text NOT NULL DEFAULT '',
  long_description text NOT NULL DEFAULT '',
  features text[] NOT NULL DEFAULT '{}',
  tags text[] NOT NULL DEFAULT '{}',
  tech_stack text[] NOT NULL DEFAULT '{}',
  thumbnail_url text,
  screenshots text[] NOT NULL DEFAULT '{}',
  version text,
  release_date date,
  status text NOT NULL DEFAULT 'published',
  featured boolean NOT NULL DEFAULT false,
  hidden boolean NOT NULL DEFAULT false,
  apk_url text,
  apk_external_url text,
  website_url text,
  github_url text,
  seo_title text,
  seo_description text,
  view_count int NOT NULL DEFAULT 0,
  download_count int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon, authenticated;
GRANT ALL ON public.projects TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.projects TO authenticated;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read visible projects" ON public.projects FOR SELECT TO anon, authenticated
  USING (hidden = false AND status = 'published');
CREATE POLICY "Admins read all projects" ON public.projects FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage projects" ON public.projects FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER projects_set_updated_at BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX projects_category_idx ON public.projects(category_slug);
CREATE INDEX projects_featured_idx ON public.projects(featured);
CREATE INDEX projects_created_idx ON public.projects(created_at DESC);

-- Increment counters (public, safe RPC)
CREATE OR REPLACE FUNCTION public.increment_project_view(_slug text)
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.projects SET view_count = view_count + 1 WHERE slug = _slug AND hidden = false;
$$;
GRANT EXECUTE ON FUNCTION public.increment_project_view(text) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.increment_project_download(_slug text)
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.projects SET download_count = download_count + 1 WHERE slug = _slug AND hidden = false;
$$;
GRANT EXECUTE ON FUNCTION public.increment_project_download(text) TO anon, authenticated;

-- Site settings (single-row)
CREATE TABLE public.site_settings (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  site_name text NOT NULL DEFAULT 'Ayush Dev',
  tagline text NOT NULL DEFAULT 'Building Modern Android Apps, Websites & Telegram Bots.',
  bio text NOT NULL DEFAULT '',
  email text,
  telegram text,
  github text,
  twitter text,
  linkedin text,
  logo_url text,
  favicon_url text,
  primary_color text DEFAULT '#2563EB',
  seo_title text,
  seo_description text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT ALL ON public.site_settings TO service_role;
GRANT UPDATE, INSERT ON public.site_settings TO authenticated;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins update settings" ON public.site_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.site_settings (id) VALUES (1);

-- Contact messages
CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins read messages" ON public.contact_messages FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage messages" ON public.contact_messages FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete messages" ON public.contact_messages FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
