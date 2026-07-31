-- =========================================================================
-- Run this in your Supabase project's SQL Editor to create the table that
-- stores contact-form submissions from the portfolio site.
-- See README.md, Step 2, for exactly where to paste this.
-- =========================================================================

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Turn on Row Level Security (RLS) so, by default, nobody can read or
-- write this table except through rules we explicitly allow below.
alter table public.inquiries enable row level security;

-- Allow anyone visiting the website (the "anon" role) to INSERT a new
-- row — this is what lets the contact form submit successfully.
create policy "Allow public insert" on public.inquiries
  for insert
  to anon
  with check (true);

-- Note: there is intentionally no "select" policy for the anon role, so
-- website visitors cannot read other people's messages. You can view all
-- submissions yourself by logging into Supabase and opening
-- Table Editor -> inquiries.
