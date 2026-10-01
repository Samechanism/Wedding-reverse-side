create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 1 and 100),
  attendance text not null check (attendance in ('attending', 'not_attending')),
  companion_name text check (companion_name is null or char_length(trim(companion_name)) between 1 and 100),
  message text check (message is null or char_length(message) <= 500),
  created_at timestamptz not null default now()
);

alter table public.rsvps enable row level security;

revoke all on table public.rsvps from anon, authenticated;
grant insert (name, attendance, companion_name, message)
  on table public.rsvps
  to anon, authenticated;

drop policy if exists "Allow public RSVP inserts" on public.rsvps;
create policy "Allow public RSVP inserts"
  on public.rsvps
  for insert
  to anon, authenticated
  with check (true);
