-- Vigyan Parishad J&K Database Schema
-- Supabase / PostgreSQL Schema Definition

-- Enable UUID extension if not enabled
create extension if not exists "pgcrypto";

-- 1. Announcements Ticker
create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date text,
  link text,
  is_active boolean default true,
  display_order int default 0,
  created_at timestamptz default now()
);

-- 2. Events
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null,
  event_date date not null,
  date_display text not null,
  day_month text not null,
  year text not null,
  time text not null,
  venue text not null,
  subtitle text,
  description text not null,
  highlights jsonb default '[]'::jsonb,
  image_url text not null,
  participants text default '100+ Participants',
  organized_by text default 'Vigyan Parishad J&K',
  is_featured boolean default false,
  created_at timestamptz default now()
);

-- 3. Publications
create table if not exists publications (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null,
  author text not null,
  publication_date date not null,
  date_display text not null,
  file_size text not null default '2.4 MB',
  views int default 120,
  pages int default 24,
  doi text default '10.1234/vpjk.2024.01',
  abstract text not null,
  keywords jsonb default '[]'::jsonb,
  cover_image text not null,
  pdf_url text default '#',
  created_at timestamptz default now()
);

-- 4. Gallery Albums
create table if not exists gallery_albums (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null,
  date_display text not null,
  event_date date not null,
  venue text not null,
  participant_count text default '100+ Participants',
  description text not null,
  cover_image text not null,
  created_at timestamptz default now()
);

-- 5. Gallery Photos
create table if not exists gallery_photos (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references gallery_albums(id) on delete cascade,
  photo_url text not null,
  caption text,
  display_order int default 0,
  created_at timestamptz default now()
);

-- 6. Members
create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  institution text,
  photo_url text not null,
  display_order int default 0,
  created_at timestamptz default now()
);

-- 7. Membership Applications
create table if not exists membership_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  contact_number text not null,
  profession text not null,
  area_of_interest text,
  short_motivation text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- 8. Contact Messages
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  contact_number text,
  subject text not null,
  message text not null,
  status text default 'unread',
  created_at timestamptz default now()
);

-- Indexes for performance & query filtering
create index if not exists idx_announcements_active_order on announcements(is_active, display_order);
create index if not exists idx_events_slug on events(slug);
create index if not exists idx_events_date on events(event_date desc);
create index if not exists idx_events_category on events(category);
create index if not exists idx_publications_slug on publications(slug);
create index if not exists idx_publications_date on publications(publication_date desc);
create index if not exists idx_publications_category on publications(category);
create index if not exists idx_gallery_albums_slug on gallery_albums(slug);
create index if not exists idx_gallery_albums_date on gallery_albums(event_date desc);
create index if not exists idx_gallery_photos_album on gallery_photos(album_id, display_order);
create index if not exists idx_members_display_order on members(display_order);
create index if not exists idx_membership_apps_created on membership_applications(created_at desc);
create index if not exists idx_contact_messages_created on contact_messages(created_at desc);

-- Enable Row Level Security (RLS) on all tables
alter table announcements enable row level security;
alter table events enable row level security;
alter table publications enable row level security;
alter table gallery_albums enable row level security;
alter table gallery_photos enable row level security;
alter table members enable row level security;
alter table membership_applications enable row level security;
alter table contact_messages enable row level security;

-- Public Read Policies (for showcase data)
drop policy if exists "Allow public read on announcements" on announcements;
create policy "Allow public read on announcements" on announcements for select using (true);

drop policy if exists "Allow public read on events" on events;
create policy "Allow public read on events" on events for select using (true);

drop policy if exists "Allow public read on publications" on publications;
create policy "Allow public read on publications" on publications for select using (true);

drop policy if exists "Allow public read on gallery_albums" on gallery_albums;
create policy "Allow public read on gallery_albums" on gallery_albums for select using (true);

drop policy if exists "Allow public read on gallery_photos" on gallery_photos;
create policy "Allow public read on gallery_photos" on gallery_photos for select using (true);

drop policy if exists "Allow public read on members" on members;
create policy "Allow public read on members" on members for select using (true);

-- Public Insert Policies (for submissions)
drop policy if exists "Allow public insert on membership_applications" on membership_applications;
create policy "Allow public insert on membership_applications" on membership_applications for insert with check (true);

drop policy if exists "Allow public insert on contact_messages" on contact_messages;
create policy "Allow public insert on contact_messages" on contact_messages for insert with check (true);
