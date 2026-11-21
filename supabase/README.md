\# Supabase setup



1\. Create a Supabase project.

2\. Authentication → Providers → Email: disable "Confirm email" (development).

3\. SQL Editor: run the files in `supabase/migrations/` in order:

&#x20;  - `20261108000000\_roles\_and\_profiles.sql`

&#x20;  - `20261108000100\_profile\_data.sql`

4\. Copy `.env.example` to `.env` and set `VITE\_SUPABASE\_URL` and `VITE\_SUPABASE\_PUBLISHABLE\_KEY`.

&#x20;  Never put a secret / service\_role key in the frontend.

