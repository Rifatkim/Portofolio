-- ============================================================
-- 002_storage_buckets.sql
-- Create Supabase Storage Buckets
-- Run this in Supabase SQL Editor after 001_initial_schema.sql
-- ============================================================

-- Create public portfolio bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-public',
  'portfolio-public',
  true,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- Create private documents bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-private',
  'portfolio-private',
  false,
  20971520, -- 20MB
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: public bucket — anyone can read
CREATE POLICY "Public can read portfolio-public files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-public');

-- Storage RLS: authenticated users can upload to portfolio-public
CREATE POLICY "Authenticated can upload to portfolio-public"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'portfolio-public');

-- Storage RLS: authenticated users can delete from portfolio-public
CREATE POLICY "Authenticated can delete from portfolio-public"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'portfolio-public');

-- Storage RLS: authenticated can manage portfolio-private
CREATE POLICY "Authenticated can manage portfolio-private"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'portfolio-private')
  WITH CHECK (bucket_id = 'portfolio-private');
