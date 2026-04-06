create extension if not exists pgcrypto;

alter table if exists public.study_progress_summaries
  add column if not exists due_reviews integer not null default 0,
  add column if not exists weak_subjects text[] not null default '{}',
  add column if not exists questions_answered_today integer not null default 0,
  add column if not exists streak_days integer not null default 0;

create table if not exists public.study_essay_entries (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  prompt_id text not null,
  title text not null,
  subject text not null,
  topic text not null,
  answer text not null,
  word_count integer not null default 0,
  status text not null default 'finished' check (status in ('draft', 'finished')),
  score integer,
  feedback jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.study_essay_entries
  add column if not exists word_count integer not null default 0,
  add column if not exists status text not null default 'finished',
  add column if not exists score integer,
  add column if not exists feedback jsonb,
  add column if not exists updated_at timestamptz not null default now();

create table if not exists public.study_essay_drafts (
  id uuid primary key default gen_random_uuid(),
  session_id text not null unique,
  prompt_id text not null,
  answer text not null,
  word_count integer not null default 0,
  updated_at timestamptz not null default now()
);

create index if not exists idx_study_essay_entries_session_id on public.study_essay_entries(session_id, created_at desc);
create index if not exists idx_study_essay_drafts_session_id on public.study_essay_drafts(session_id);

alter table public.study_essay_entries enable row level security;
alter table public.study_essay_drafts enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert, update on public.study_essay_entries to anon, authenticated;
grant select, insert, update on public.study_essay_drafts to anon, authenticated;

drop policy if exists "public read essay entries" on public.study_essay_entries;
create policy "public read essay entries" on public.study_essay_entries
  for select to anon, authenticated using (true);

drop policy if exists "public insert essay entries" on public.study_essay_entries;
create policy "public insert essay entries" on public.study_essay_entries
  for insert to anon, authenticated with check (true);

drop policy if exists "public update essay entries" on public.study_essay_entries;
create policy "public update essay entries" on public.study_essay_entries
  for update to anon, authenticated using (true) with check (true);

drop policy if exists "public read essay drafts" on public.study_essay_drafts;
create policy "public read essay drafts" on public.study_essay_drafts
  for select to anon, authenticated using (true);

drop policy if exists "public insert essay drafts" on public.study_essay_drafts;
create policy "public insert essay drafts" on public.study_essay_drafts
  for insert to anon, authenticated with check (true);

drop policy if exists "public update essay drafts" on public.study_essay_drafts;
create policy "public update essay drafts" on public.study_essay_drafts
  for update to anon, authenticated using (true) with check (true);
