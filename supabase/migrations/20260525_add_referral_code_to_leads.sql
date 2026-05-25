-- Adds GoAffPro affiliate referral tracking to the leads table.
-- Nullable, no default — existing rows remain untouched.
-- Run this in the Supabase SQL editor (Project → SQL → New query),
-- or via the Supabase CLI: `supabase db push`.

alter table public.leads
  add column if not exists referral_code text;

create index if not exists leads_referral_code_idx
  on public.leads (referral_code)
  where referral_code is not null;
