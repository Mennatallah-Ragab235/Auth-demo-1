create type public.app_role as enum ('Admin', 'Client');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  role public.app_role not null,
  created_at timestamptz not null default now()
);

create unique index profiles_single_admin
  on public.profiles (role) where role = 'Admin';

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select to authenticated
  using (id = (select auth.uid()));

revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  assigned_role public.app_role;
begin
  perform pg_advisory_xact_lock(hashtext('profiles_first_admin'));

  if exists (select 1 from public.profiles) then
    assigned_role := 'Client';
  else
    assigned_role := 'Admin';
  end if;

  insert into public.profiles (id, email, role)
  values (new.id, new.email, assigned_role);

  return new;
end;
$$;

revoke all on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();