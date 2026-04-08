create extension if not exists pgcrypto;

create table if not exists public.study_attempts (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  question_id integer not null,
  subject text not null,
  topic text not null,
  selected_option integer not null,
  is_correct boolean not null,
  attempted_at timestamptz not null default now()
);

create table if not exists public.study_progress_summaries (
  id text primary key,
  session_id text not null unique,
  total_attempts integer not null default 0,
  total_correct integer not null default 0,
  accuracy integer not null default 0,
  pending_reviews integer not null default 0,
  completed_today integer not null default 0,
  current_streak integer not null default 0,
  last_attempt_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.study_question_sessions (
  session_id text primary key,
  current_question_id integer,
  queue_question_ids jsonb not null default '[]'::jsonb,
  answered_question_ids jsonb not null default '[]'::jsonb,
  review_question_ids jsonb not null default '[]'::jsonb,
  completed_cycles integer not null default 0,
  last_answered_question_id integer,
  mode text not null default 'continuacao',
  updated_at timestamptz not null default now()
);

alter table public.study_attempts add column if not exists session_id text;
alter table public.study_progress_summaries add column if not exists session_id text;
alter table public.study_question_sessions add column if not exists session_id text;
update public.study_attempts set session_id = 'public-demo' where session_id is null;
update public.study_progress_summaries set session_id = coalesce(session_id, id, 'public-demo') where session_id is null;
update public.study_question_sessions set session_id = coalesce(session_id, 'public-demo') where session_id is null;
alter table public.study_attempts alter column session_id set not null;
alter table public.study_progress_summaries alter column session_id set not null;
alter table public.study_question_sessions alter column session_id set not null;

create index if not exists idx_study_attempts_session_id on public.study_attempts(session_id);
create unique index if not exists idx_study_progress_summaries_session_id on public.study_progress_summaries(session_id);
create unique index if not exists idx_study_question_sessions_session_id on public.study_question_sessions(session_id);

alter table public.study_attempts enable row level security;
alter table public.study_progress_summaries enable row level security;
alter table public.study_question_sessions enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert, update on public.study_attempts to anon, authenticated;
grant select, insert, update on public.study_progress_summaries to anon, authenticated;
grant select, insert, update on public.study_question_sessions to anon, authenticated;

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

drop policy if exists "public read study question sessions" on public.study_question_sessions;
create policy "public read study question sessions"
  on public.study_question_sessions for select
  to anon, authenticated
  using (true);

drop policy if exists "public insert study question sessions" on public.study_question_sessions;
create policy "public insert study question sessions"
  on public.study_question_sessions for insert
  to anon, authenticated
  with check (true);

drop policy if exists "public update study question sessions" on public.study_question_sessions;
create policy "public update study question sessions"
  on public.study_question_sessions for update
  to anon, authenticated
  using (true)
  with check (true);
