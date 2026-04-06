create extension if not exists pgcrypto;

create table if not exists public.study_attempts (
  id uuid primary key default gen_random_uuid(),
  question_id integer not null,
  subject text not null,
  topic text not null,
  selected_option integer not null,
  is_correct boolean not null,
  attempted_at timestamptz not null default now()
);

create table if not exists public.study_progress_summaries (
  id text primary key,
  total_attempts integer not null default 0,
  total_correct integer not null default 0,
  accuracy integer not null default 0,
  pending_reviews integer not null default 0,
  completed_today integer not null default 0,
  current_streak integer not null default 0,
  last_attempt_at timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.study_attempts enable row level security;
alter table public.study_progress_summaries enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert, update on public.study_attempts to anon, authenticated;
grant select, insert, update on public.study_progress_summaries to anon, authenticated;

drop policy if exists "public read study attempts" on public.study_attempts;
create policy "public read study attempts"
  on public.study_attempts for select
  to anon, authenticated
  using (true);

drop policy if exists "public insert study attempts" on public.study_attempts;
create policy "public insert study attempts"
  on public.study_attempts for insert
  to anon, authenticated
  with check (true);

drop policy if exists "public update study attempts" on public.study_attempts;
create policy "public update study attempts"
  on public.study_attempts for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "public read study summaries" on public.study_progress_summaries;
create policy "public read study summaries"
  on public.study_progress_summaries for select
  to anon, authenticated
  using (true);

drop policy if exists "public insert study summaries" on public.study_progress_summaries;
create policy "public insert study summaries"
  on public.study_progress_summaries for insert
  to anon, authenticated
  with check (true);

drop policy if exists "public update study summaries" on public.study_progress_summaries;
create policy "public update study summaries"
  on public.study_progress_summaries for update
  to anon, authenticated
  using (true)
  with check (true);
