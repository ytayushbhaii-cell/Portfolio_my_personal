# Migration Bundle — Move to your own Supabase

Aapke portfolio ka poora backend recreate karne ke liye ye bundle use karo.

## Kya milega
- `schema.sql` — saari tables, RLS policies, functions, triggers, storage bucket

## Steps

### 1. Naya Lovable project banao (Cloud disable karke)
- Connectors → Lovable Cloud → **Disable Cloud** (future projects ke liye)
- New project start karo

### 2. Apna Supabase project banao
- https://supabase.com pe naya project banao
- Naya project ki **Project URL** aur **anon key** copy karo

### 3. Schema import karo
- Supabase dashboard → **SQL Editor** → New query
- `schema.sql` ka poora content paste karke run karo
- Verify: Tables tab me `categories`, `projects`, `site_settings`, `contact_messages`, `user_roles` dikhna chahiye

### 4. Data import karo
Iss project se data export karne ke liye:
- Yahaan (current project) → **Cloud tab → Advanced settings → Export data**
- Export ready hone par download karo (CSV/dump milega)
- Naye Supabase project → SQL Editor / Table Editor me rows import karo
  - Order: `categories` → `projects` → `site_settings` → `contact_messages`
  - `user_roles` mat import karo — naye project me first signup automatically admin ban jayega

### 5. Storage files migrate karo
- Current project ke `project-media` bucket se files download karo (APKs, screenshots, thumbnails)
- Naye Supabase project → Storage → `project-media` bucket me upload karo
- **Zaroori:** Purane URLs (jo DB me store hain — thumbnail_url, screenshots, apk_url) naye bucket ke URLs se match nahi karenge. Aapko ya to:
  - (a) Same file paths use karke upload karna (URLs same rahenge), ya
  - (b) DB me URLs update karke naye signed URLs daalna

### 6. Naye project me Supabase connect karo
- Naye Lovable project me Supabase native integration use karo (Connectors → Supabase)
- Wahan aapke project ka URL + anon key set ho jayega
- Same frontend code copy kar dijiye — ye same `supabase-js` client ke saath kaam karega

### 7. Admin account setup
- Naye project me `/admin/login` khol ke signup karo — first user automatically admin ban jayega (`bootstrap_first_admin` trigger)

## Notes
- Schema ekdum identical hai, isliye frontend code me koi change nahi chahiye — bas `VITE_SUPABASE_URL` aur `VITE_SUPABASE_PUBLISHABLE_KEY` naye project ke honge
- Storage bucket private hai; app 10-year signed URLs banata hai (`src/lib/storage.ts`)
