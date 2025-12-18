/*
  # Update Media Assets for Public Uploads

  1. Changes
    - Make user_id nullable in media_assets table to allow anonymous uploads
    - Add new columns for anonymous upload tracking
      - `file_name` (text) - original file name
      - `file_path` (text) - storage path
      - `file_type` (text) - MIME type
      - `public_url` (text) - public access URL
    - Remove the NOT NULL constraint from user_id
    - Add policies for public read and anonymous insert
    
  2. Security
    - Allow authenticated users to manage their own media
    - Allow anonymous users to upload media
    - Allow public read access to all media (for viewing uploaded content)
*/

-- Add new columns if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'media_assets' AND column_name = 'file_name'
  ) THEN
    ALTER TABLE media_assets ADD COLUMN file_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'media_assets' AND column_name = 'file_path'
  ) THEN
    ALTER TABLE media_assets ADD COLUMN file_path text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'media_assets' AND column_name = 'file_type'
  ) THEN
    ALTER TABLE media_assets ADD COLUMN file_type text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'media_assets' AND column_name = 'public_url'
  ) THEN
    ALTER TABLE media_assets ADD COLUMN public_url text;
  END IF;
END $$;

-- Drop the NOT NULL constraint on user_id
ALTER TABLE media_assets ALTER COLUMN user_id DROP NOT NULL;

-- Drop existing title NOT NULL constraint and make it optional
ALTER TABLE media_assets ALTER COLUMN title DROP NOT NULL;

-- Add public read policy
DROP POLICY IF EXISTS "Public can view all media" ON media_assets;
CREATE POLICY "Public can view all media"
  ON media_assets
  FOR SELECT
  TO public
  USING (true);

-- Add anonymous insert policy
DROP POLICY IF EXISTS "Anonymous can upload media" ON media_assets;
CREATE POLICY "Anonymous can upload media"
  ON media_assets
  FOR INSERT
  TO public
  WITH CHECK (true);
