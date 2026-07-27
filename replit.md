# AyushDev Portfolio

A personal portfolio web app showcasing Android apps, websites, Telegram bots, and freelance services.

## Stack

- **Framework**: TanStack Start (React 19 + Vite 8, SSR)
- **Router**: TanStack Router (file-based routes under `src/routes/`)
- **Data fetching**: TanStack Query
- **Backend**: Supabase (PostgreSQL + auth + storage)
- **Styling**: Tailwind CSS v4 + shadcn/ui (Radix primitives)
- **Runtime**: Bun

## Running the app

```bash
bun run dev   # starts dev server on port 5000
```

The "Start application" workflow runs `bun run dev` and opens the preview on port 5000.

## Environment variables (required)

| Secret | Description |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL (e.g. `https://xxxx.supabase.co`) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/publishable key |

Both are set as Replit Secrets. The SSR client resolves them from `process.env.VITE_SUPABASE_*`.

## Project structure

```
src/
  routes/         # File-based pages (index, projects, about, services, contact, admin/)
  components/
    site/         # Public-facing UI components
    admin/        # Admin panel components
    ui/           # shadcn/ui primitives
  integrations/
    supabase/     # Supabase client + generated types
  lib/
    queries.ts    # TanStack Query query definitions
migration-bundle/
  schema.sql      # Full Supabase schema (tables, RLS, storage)
```

## Database

Supabase tables: `projects`, `categories`, `site_settings`, `contact_messages`, `user_roles`.
Schema is in `migration-bundle/schema.sql`.

## Netlify deployment

The app uses SSR (Nitro). The `netlify.toml` is configured to:
- Set `NITRO_PRESET=netlify` so Nitro outputs a Netlify serverless function
- Publish static assets from `.output/public`
- Catch-all redirect routes all requests to `/.netlify/functions/server`

**Required env vars in Netlify dashboard** (Site → Environment variables):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

## User preferences

- Keep the existing TanStack Start + Supabase + Tailwind stack.
- Do not restructure or migrate to a different framework.
