/*
  # Create Movies and Admin Uploads Schema

  ## Purpose
  Create database tables to store user-generated movies and administrator-featured content.

  ## New Tables
  
  ### `movies`
  Stores all user-created movies with metadata
  - `id` (uuid, primary key) - Unique movie identifier
  - `user_id` (uuid, foreign key) - Reference to profiles.id
  - `title` (text) - Movie title
  - `description` (text, nullable) - Movie description
  - `video_url` (text) - URL to the video file
  - `thumbnail_url` (text, nullable) - URL to thumbnail image
  - `duration` (integer) - Video duration in seconds
  - `is_public` (boolean) - Whether movie is public
  - `view_count` (integer) - Number of views
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `admin_featured_movies`
  Administrator's choice movies featured on the platform
  - `id` (uuid, primary key) - Unique identifier
  - `movie_id` (uuid, foreign key, nullable) - Reference to movies.id
  - `admin_id` (uuid, foreign key) - Reference to profiles.id (admin who featured it)
  - `featured_video_url` (text, nullable) - Direct upload URL if not from movies table
  - `title` (text) - Featured movie title
  - `description` (text, nullable) - Featured movie description
  - `display_order` (integer) - Order for display
  - `is_active` (boolean) - Whether currently featured
  - `created_at` (timestamptz) - When featured
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on both tables
  - Users can view all public movies
  - Users can CRUD their own movies
  - Only admins with 'studio' plan can manage featured movies
  - Public can view active featured movies
*/

-- Create movies table if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'movies') THEN
    CREATE TABLE movies (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
      title text NOT NULL,
      description text,
      video_url text NOT NULL,
      thumbnail_url text,
      duration integer DEFAULT 0,
      is_public boolean DEFAULT true,
      view_count integer DEFAULT 0,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );
  END IF;
END $$;

-- Create admin featured movies table
CREATE TABLE IF NOT EXISTS admin_featured_movies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  movie_id uuid REFERENCES movies(id) ON DELETE SET NULL,
  admin_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  featured_video_url text,
  title text NOT NULL,
  description text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_movies_user_id_v2 ON movies(user_id);
CREATE INDEX IF NOT EXISTS idx_movies_is_public_v2 ON movies(is_public);
CREATE INDEX IF NOT EXISTS idx_movies_created_at ON movies(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_featured_display_order ON admin_featured_movies(display_order);
CREATE INDEX IF NOT EXISTS idx_admin_featured_is_active ON admin_featured_movies(is_active);

-- Enable RLS
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_featured_movies ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view public movies" ON movies;
DROP POLICY IF EXISTS "Users can insert own movies" ON movies;
DROP POLICY IF EXISTS "Users can update own movies" ON movies;
DROP POLICY IF EXISTS "Users can delete own movies" ON movies;
DROP POLICY IF EXISTS "Users can view own movies" ON movies;
DROP POLICY IF EXISTS "Anyone can view public movies" ON movies;

-- Movies policies
CREATE POLICY "Users can view public movies"
  ON movies FOR SELECT
  TO authenticated
  USING (is_public = true OR user_id = auth.uid());

CREATE POLICY "Users can insert own movies"
  ON movies FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own movies"
  ON movies FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own movies"
  ON movies FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Admin featured movies policies (users with studio plan can manage)
CREATE POLICY "Anyone can view active featured movies"
  ON admin_featured_movies FOR SELECT
  TO authenticated
  USING (is_active = true OR admin_id = auth.uid());

CREATE POLICY "Only admins can insert featured movies"
  ON admin_featured_movies FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND subscription_plan = 'studio'
    )
  );

CREATE POLICY "Only admins can update featured movies"
  ON admin_featured_movies FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND subscription_plan = 'studio'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND subscription_plan = 'studio'
    )
  );

CREATE POLICY "Only admins can delete featured movies"
  ON admin_featured_movies FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND subscription_plan = 'studio'
    )
  );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_movies_updated_at ON movies;
CREATE TRIGGER update_movies_updated_at
  BEFORE UPDATE ON movies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_admin_featured_updated_at ON admin_featured_movies;
CREATE TRIGGER update_admin_featured_updated_at
  BEFORE UPDATE ON admin_featured_movies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
