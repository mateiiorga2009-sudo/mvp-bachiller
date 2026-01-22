-- Viralify schema
create extension if not exists "pgcrypto";

create table if not exists public.clips (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  source_url text,
  title text,
  duration_seconds integer,
  source_duration_seconds integer,
  impressions integer default 0,
  clicks integer default 0,
  retention_avg numeric,
  created_at timestamp with time zone default now()
);

create index if not exists clips_user_email_idx on public.clips (user_email);
