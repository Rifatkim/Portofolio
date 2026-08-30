-- ============================================================
-- 001_initial_schema.sql
-- Portfolio CMS — Initial Database Schema
-- Run this in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- PROFILE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profile (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name       TEXT,
  headline        TEXT,
  university      TEXT,
  major           TEXT,
  student_status  TEXT DEFAULT 'active',
  location        TEXT,
  gpa             NUMERIC(4,2),
  gpa_scale       NUMERIC(4,2) DEFAULT 4.0,
  show_gpa        BOOLEAN DEFAULT FALSE,
  short_bio       TEXT,
  detailed_bio    TEXT,
  availability_status TEXT DEFAULT 'available',
  profile_photo_url   TEXT,
  hero_photo_url      TEXT,
  cv_url              TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SKILL CATEGORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.skill_categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  description TEXT,
  sort_order  INT DEFAULT 0,
  is_visible  BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SKILLS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.skills (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  category_id UUID REFERENCES public.skill_categories(id) ON DELETE SET NULL,
  icon        TEXT,
  description TEXT,
  level       TEXT CHECK (level IN ('beginner', 'elementary', 'intermediate', 'advanced', 'expert')),
  sort_order  INT DEFAULT 0,
  status      TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'hidden', 'archived')),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PROJECTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  short_summary   TEXT,
  full_description TEXT,
  background      TEXT,
  problem         TEXT,
  solution        TEXT,
  my_role         TEXT,
  category        TEXT,
  project_status  TEXT,
  start_date      DATE,
  end_date        DATE,
  key_features    TEXT[] DEFAULT '{}',
  challenges      TEXT,
  outcome         TEXT,
  demo_url        TEXT,
  repo_url        TEXT,
  thumbnail_url   TEXT,
  is_featured     BOOLEAN DEFAULT FALSE,
  status          TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'hidden', 'archived')),
  sort_order      INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.project_technologies (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id  UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  sort_order  INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.project_images (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id  UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url   TEXT NOT NULL,
  alt_text    TEXT,
  caption     TEXT,
  sort_order  INT DEFAULT 0
);

-- ============================================================
-- EXPERIENCES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.experiences (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  position          TEXT NOT NULL,
  organization      TEXT NOT NULL,
  type              TEXT DEFAULT 'work' CHECK (type IN ('work','internship','organization','volunteer','education','freelance','other')),
  location          TEXT,
  start_date        DATE,
  end_date          DATE,
  is_current        BOOLEAN DEFAULT FALSE,
  short_description TEXT,
  achievements      TEXT[] DEFAULT '{}',
  related_tech      TEXT[] DEFAULT '{}',
  logo_url          TEXT,
  main_photo_url    TEXT,
  org_url           TEXT,
  status            TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'hidden', 'archived')),
  sort_order        INT DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.experience_responsibilities (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id   UUID NOT NULL REFERENCES public.experiences(id) ON DELETE CASCADE,
  text            TEXT NOT NULL,
  sort_order      INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.experience_images (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id   UUID NOT NULL REFERENCES public.experiences(id) ON DELETE CASCADE,
  image_url       TEXT NOT NULL,
  alt_text        TEXT,
  caption         TEXT,
  sort_order      INT DEFAULT 0
);

-- ============================================================
-- CERTIFICATES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.certificates (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name              TEXT NOT NULL,
  issuer            TEXT NOT NULL,
  credential_id     TEXT,
  show_credential_id BOOLEAN DEFAULT FALSE,
  issue_date        DATE,
  expiration_date   DATE,
  does_not_expire   BOOLEAN DEFAULT FALSE,
  description       TEXT,
  related_skills    TEXT[] DEFAULT '{}',
  credential_url    TEXT,
  thumbnail_url     TEXT,
  image_url         TEXT,
  pdf_url           TEXT,
  allow_download    BOOLEAN DEFAULT FALSE,
  status            TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'hidden', 'archived')),
  sort_order        INT DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CONTACTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.contacts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform      TEXT NOT NULL,
  display_label TEXT NOT NULL,
  value         TEXT NOT NULL,
  url           TEXT,
  icon          TEXT,
  is_visible    BOOLEAN DEFAULT TRUE,
  sort_order    INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- MEDIA LIBRARY
-- ============================================================
CREATE TABLE IF NOT EXISTS public.media (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename          TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  storage_path      TEXT NOT NULL,
  public_url        TEXT,
  mime_type         TEXT NOT NULL,
  file_size         BIGINT NOT NULL DEFAULT 0,
  alt_text          TEXT,
  caption           TEXT,
  width             INT,
  height            INT,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SITE SETTINGS (key-value store)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key         TEXT NOT NULL UNIQUE,
  value       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- DEFAULT SITE SETTINGS
-- ============================================================
INSERT INTO public.site_settings (key, value) VALUES
  ('site_title', 'Muhammad Rifat Hakim'),
  ('site_description', 'Personal Portfolio'),
  ('seo_description', ''),
  ('copyright_text', '© 2026 Muhammad Rifat Hakim'),
  ('show_cv_button', 'true'),
  ('contact_section_enabled', 'true'),
  ('maintenance_mode', 'false'),
  ('social_preview_url', '')
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_responsibilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies (only published/visible)
CREATE POLICY "Public can read profile" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Public can read visible categories" ON public.skill_categories FOR SELECT USING (is_visible = true);
CREATE POLICY "Public can read published skills" ON public.skills FOR SELECT USING (status = 'published');
CREATE POLICY "Public can read published projects" ON public.projects FOR SELECT USING (status = 'published');
CREATE POLICY "Public can read project technologies" ON public.project_technologies FOR SELECT USING (true);
CREATE POLICY "Public can read project images" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Public can read published experiences" ON public.experiences FOR SELECT USING (status = 'published');
CREATE POLICY "Public can read experience responsibilities" ON public.experience_responsibilities FOR SELECT USING (true);
CREATE POLICY "Public can read experience images" ON public.experience_images FOR SELECT USING (true);
CREATE POLICY "Public can read published certificates" ON public.certificates FOR SELECT USING (status = 'published');
CREATE POLICY "Public can read visible contacts" ON public.contacts FOR SELECT USING (is_visible = true);
CREATE POLICY "Public can read site settings" ON public.site_settings FOR SELECT USING (true);

-- Admin full access policies (authenticated users)
CREATE POLICY "Admin full access profile" ON public.profile FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access skill_categories" ON public.skill_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access skills" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access project_technologies" ON public.project_technologies FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access project_images" ON public.project_images FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access experiences" ON public.experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access experience_responsibilities" ON public.experience_responsibilities FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access experience_images" ON public.experience_images FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access certificates" ON public.certificates FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access contacts" ON public.contacts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access media" ON public.media FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access site_settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Media table: public can read
CREATE POLICY "Public can read media" ON public.media FOR SELECT USING (true);
