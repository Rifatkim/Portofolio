-- ============================================================
-- AWARDS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.awards (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  placement     TEXT NOT NULL,
  title         TEXT NOT NULL,
  award_month   VARCHAR(7) NOT NULL, -- Format: YYYY-MM
  image_url     TEXT NOT NULL,
  is_published  BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order    INT NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY FOR AWARDS
-- ============================================================
ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;

-- Public can read published awards
DROP POLICY IF EXISTS "Public can read published awards" ON public.awards;
CREATE POLICY "Public can read published awards" 
  ON public.awards 
  FOR SELECT 
  USING (is_published = true);

-- Admin full access policy (authenticated users)
DROP POLICY IF EXISTS "Admin full access awards" ON public.awards;
CREATE POLICY "Admin full access awards" 
  ON public.awards 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);
