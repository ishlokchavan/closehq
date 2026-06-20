-- Portal dashboard CRM — additive tables for the role-aware dashboards
-- (Buyer/Seller, Agent/Freelancer, Agency). Everything here is ADDITIVE and
-- guarded with IF NOT EXISTS so it is safe to run against the shared
-- iclose-academy-db without touching existing data.
--
-- Persona itself lives in auth user_metadata.account_type (set by the dashboard
-- switcher / signup). We mirror it onto profiles for server-side querying.
--
-- These tables back the demo accessors in lib/portal/dashboard/demo.ts — once
-- provisioned + seeded, those accessors swap to live, auth-scoped reads with no
-- UI change.

-- Mirror of the dashboard persona for server-side filtering (nullable; the
-- source of truth remains user_metadata.account_type).
alter table public.profiles
  add column if not exists account_type text
  check (account_type is null or account_type in ('buyer_seller', 'agent', 'agency'));

-- Link an auth user to their agent directory row + agency.
create table if not exists public.agent_profiles (
  id         uuid primary key references public.profiles(id) on delete cascade,
  agent_id   uuid references public.agents(id) on delete set null,
  agency_id  uuid references public.agencies(id) on delete set null,
  team_role  text not null default 'agent',          -- agent | senior | lead | admin
  rera_no    text,
  status     text not null default 'active',          -- active | invited | suspended
  created_at timestamptz not null default now()
);

-- Property-CRM leads (distinct from the academy waitlist `leads` table).
create table if not exists public.crm_leads (
  id           uuid primary key default gen_random_uuid(),
  owner_id     uuid not null references public.profiles(id) on delete cascade,
  agency_id    uuid references public.agencies(id) on delete set null,
  name         text not null,
  email        text,
  phone        text,
  interest     text,
  budget_aed   numeric(14,2),
  source       text,
  stage        text not null default 'New',           -- New|Contacted|Qualified|Viewing|Negotiating|Won|Lost
  score        int not null default 0,
  last_touch_at timestamptz not null default now(),
  created_at   timestamptz not null default now()
);
create index if not exists crm_leads_owner_idx  on public.crm_leads (owner_id);
create index if not exists crm_leads_agency_idx on public.crm_leads (agency_id);

create table if not exists public.crm_clients (
  id            uuid primary key default gen_random_uuid(),
  owner_id      uuid not null references public.profiles(id) on delete cascade,
  agency_id     uuid references public.agencies(id) on delete set null,
  name          text not null,
  email         text,
  phone         text,
  client_type   text not null default 'Buyer',        -- Buyer|Seller|Investor|Tenant|Landlord
  status        text not null default 'Active',        -- Active|Nurturing|Closed
  value_aed     numeric(14,2) not null default 0,
  deals_count   int not null default 0,
  last_contact_at timestamptz not null default now(),
  created_at    timestamptz not null default now()
);
create index if not exists crm_clients_owner_idx on public.crm_clients (owner_id);

create table if not exists public.deals (
  id            uuid primary key default gen_random_uuid(),
  reference     text not null,
  owner_id      uuid not null references public.profiles(id) on delete cascade,
  agency_id     uuid references public.agencies(id) on delete set null,
  listing_id    uuid references public.listings(id) on delete set null,
  client_id     uuid references public.crm_clients(id) on delete set null,
  property      text,
  community     text,
  stage         text not null default 'Qualified',     -- Qualified|Viewing|Offer|Form F / MOU|DLD Transfer|Closed
  value_aed     numeric(14,2) not null default 0,
  commission_aed numeric(14,2) not null default 0,
  status        text not null default 'active',         -- active|won|lost
  close_on      date,
  client_name   text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists deals_owner_idx  on public.deals (owner_id);
create index if not exists deals_agency_idx on public.deals (agency_id);
create index if not exists deals_stage_idx  on public.deals (stage);

create table if not exists public.viewings (
  id            uuid primary key default gen_random_uuid(),
  owner_id      uuid not null references public.profiles(id) on delete cascade,
  agency_id     uuid references public.agencies(id) on delete set null,
  listing_id    uuid references public.listings(id) on delete set null,
  client_id     uuid references public.crm_clients(id) on delete set null,
  property      text,
  community     text,
  client_name   text,
  scheduled_at  timestamptz not null,
  status        text not null default 'scheduled',      -- scheduled|completed|cancelled|no_show
  created_at    timestamptz not null default now()
);
create index if not exists viewings_owner_idx on public.viewings (owner_id);

create table if not exists public.portal_documents (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null references public.profiles(id) on delete cascade,
  kind        text not null,                            -- Form A | Form F / MOU | Title Deed | …
  name        text not null,
  related     text,
  file_url    text,
  status      text not null default 'pending',          -- verified|pending|expired|missing
  updated_at  timestamptz not null default now(),
  created_at  timestamptz not null default now()
);
create index if not exists portal_documents_owner_idx on public.portal_documents (owner_id);

-- ---------------------------------------------------------------------------
-- Row level security — owner-scoped CRUD. Agency-wide aggregation is done in
-- the app/service layer for now (a SECURITY DEFINER helper can widen reads to
-- agency members in a follow-up).
-- ---------------------------------------------------------------------------
alter table public.agent_profiles   enable row level security;
alter table public.crm_leads        enable row level security;
alter table public.crm_clients      enable row level security;
alter table public.deals            enable row level security;
alter table public.viewings         enable row level security;
alter table public.portal_documents enable row level security;

do $$
declare t text;
begin
  foreach t in array array['agent_profiles','crm_leads','crm_clients','deals','viewings','portal_documents'] loop
    -- own rows: full access
    execute format($f$
      do $i$ begin
        create policy "owner all" on public.%I
          for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
      exception when duplicate_object then null; end $i$;
    $f$, t);
  end loop;
end$$;

-- agent_profiles keys on id (= profile id), not owner_id — fix its policy.
do $$ begin
  drop policy if exists "owner all" on public.agent_profiles;
  create policy "self all" on public.agent_profiles
    for all using (id = auth.uid()) with check (id = auth.uid());
exception when duplicate_object then null; end $$;
