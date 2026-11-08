create function public.is_admin()
returns boolean
language sql stable security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'Admin'
  );
$$;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

create table public.individual_profiles (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  full_name text not null check (char_length(full_name) between 1 and 100),
  height_cm numeric not null check (height_cm between 50 and 250),
  weight_kg numeric not null check (weight_kg between 20 and 400),
  updated_at timestamptz not null default now()
);

create table public.company_profiles (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  company_name text not null check (char_length(company_name) between 1 and 100),
  address text not null check (char_length(address) between 1 and 200),
  updated_at timestamptz not null default now()
);

alter table public.individual_profiles enable row level security;
alter table public.company_profiles enable row level security;

revoke all on public.individual_profiles, public.company_profiles from anon, authenticated;
grant select, insert, update on public.individual_profiles to authenticated;
grant select, insert, update on public.company_profiles to authenticated;

create policy individual_select_own on public.individual_profiles
  for select to authenticated using (user_id = (select auth.uid()));
create policy individual_insert_own on public.individual_profiles
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy individual_update_own on public.individual_profiles
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy company_select_admin on public.company_profiles
  for select to authenticated
  using (user_id = (select auth.uid()) and (select public.is_admin()));
create policy company_insert_admin on public.company_profiles
  for insert to authenticated
  with check (user_id = (select auth.uid()) and (select public.is_admin()));
create policy company_update_admin on public.company_profiles
  for update to authenticated
  using (user_id = (select auth.uid()) and (select public.is_admin()))
  with check (user_id = (select auth.uid()) and (select public.is_admin()));
