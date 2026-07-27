
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS project_type text NOT NULL DEFAULT 'android',
  ADD COLUMN IF NOT EXISTS bot_url text;

ALTER TABLE public.projects
  ADD CONSTRAINT projects_project_type_check
  CHECK (project_type IN ('android','website','telegram','automation','other'));
