/*
  # MandaStrong Studio Complete Schema Restoration

  ## Purpose
  Restore the complete MandaStrong Studio database schema with all tables and security policies

  ## New Tables
  
  ### `profiles`
  User profile and subscription data
  - `id` (uuid, primary key) - Links to auth.users
  - `email` (text) - User email address
  - `full_name` (text, nullable) - User's full name
  - `subscription_plan` (text) - Plan type: free, basic, pro, studio
  - `subscription_status` (text) - Status: active, inactive
  - `created_at` (timestamptz) - Account creation date
  - `updated_at` (timestamptz) - Last profile update

  ### `movies`
  User-created video content
  - `id` (uuid, primary key) - Unique movie identifier
  - `user_id` (uuid, foreign key) - Reference to profiles.id
  - `title` (text) - Movie title
  - `description` (text, nullable) - Movie description
  - `video_url` (text, nullable) - URL to the video file
  - `thumbnail_url` (text, nullable) - URL to thumbnail image
  - `duration` (integer) - Video duration in seconds
  - `is_public` (boolean) - Whether movie is publicly visible
  - `view_count` (integer) - Number of views
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `comments`
  User comments on movies
  - `id` (uuid, primary key) - Unique comment identifier
  - `movie_id` (uuid, foreign key) - Reference to movies.id
  - `user_id` (uuid, foreign key) - Reference to profiles.id
  - `content` (text) - Comment text
  - `created_at` (timestamptz) - Comment creation time

  ### `reactions`
  User reactions (hearts/likes) on movies
  - `id` (uuid, primary key) - Unique reaction identifier
  - `movie_id` (uuid, foreign key) - Reference to movies.id
  - `user_id` (uuid, foreign key) - Reference to profiles.id
  - `reaction_type` (text) - Type: 'heart' or 'like'
  - `created_at` (timestamptz) - Reaction timestamp
  - Unique constraint on (movie_id, user_id, reaction_type)

  ### `admin_featured_movies`
  Administrator-curated featured content
  - `id` (uuid, primary key) - Unique identifier
  - `movie_id` (uuid, foreign key, nullable) - Reference to movies.id
  - `admin_id` (uuid, foreign key) - Reference to profiles.id
  - `featured_video_url` (text, nullable) - Direct upload URL
  - `title` (text) - Featured movie title
  - `description` (text, nullable) - Featured movie description
  - `display_order` (integer) - Display ordering
  - `is_active` (boolean) - Whether currently active
  - `created_at` (timestamptz) - When featured
  - `updated_at` (timestamptz) - Last update

  ## Security
  - RLS enabled on all tables
  - Users can view and manage their own content
  - Public movies viewable by all authenticated users
  - Comments/reactions tied to public movie visibility
  - Admin features restricted to studio plan users
  - Automatic admin elevation for woolleya129@gmail.com

  ## Performance
  - Indexes on foreign keys and frequently queried columns
  - Triggers for automatic timestamp updates
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  subscription_plan text DEFAULT 'free',
  subscription_status text DEFAULT 'inactive',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Movies table
CREATE TABLE IF NOT EXISTS movies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text DEFAULT '',
  video_url text,
  thumbnail_url text,
  duration integer DEFAULT 0,
  is_public boolean DEFAULT false,
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE movies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own movies" ON movies;
DROP POLICY IF EXISTS "Anyone can view public movies" ON movies;
DROP POLICY IF EXISTS "Users can view public movies" ON movies;
DROP POLICY IF EXISTS "Users can insert own movies" ON movies;
DROP POLICY IF EXISTS "Users can update own movies" ON movies;
DROP POLICY IF EXISTS "Users can delete own movies" ON movies;

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

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  movie_id uuid REFERENCES movies(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view comments on public movies" ON comments;
DROP POLICY IF EXISTS "Users can insert comments" ON comments;
DROP POLICY IF EXISTS "Users can delete own comments" ON comments;

CREATE POLICY "Anyone can view comments on public movies"
  ON comments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM movies
      WHERE movies.id = comments.movie_id
      AND movies.is_public = true
    )
  );

CREATE POLICY "Users can insert comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Reactions table
CREATE TABLE IF NOT EXISTS reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  movie_id uuid REFERENCES movies(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  reaction_type text NOT NULL CHECK (reaction_type IN ('heart', 'like')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(movie_id, user_id, reaction_type)
);

ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view reactions" ON reactions;
DROP POLICY IF EXISTS "Users can insert own reactions" ON reactions;
DROP POLICY IF EXISTS "Users can delete own reactions" ON reactions;

CREATE POLICY "Anyone can view reactions"
  ON reactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own reactions"
  ON reactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reactions"
  ON reactions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Admin featured movies table
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

ALTER TABLE admin_featured_movies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active featured movies" ON admin_featured_movies;
DROP POLICY IF EXISTS "Only admins can insert featured movies" ON admin_featured_movies;
DROP POLICY IF EXISTS "Only admins can update featured movies" ON admin_featured_movies;
DROP POLICY IF EXISTS "Only admins can delete featured movies" ON admin_featured_movies;

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

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_movies_user_id ON movies(user_id);
CREATE INDEX IF NOT EXISTS idx_movies_is_public ON movies(is_public);
CREATE INDEX IF NOT EXISTS idx_movies_created_at ON movies(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_movie_id ON comments(movie_id);
CREATE INDEX IF NOT EXISTS idx_reactions_movie_id ON reactions(movie_id);
CREATE INDEX IF NOT EXISTS idx_admin_featured_display_order ON admin_featured_movies(display_order);
CREATE INDEX IF NOT EXISTS idx_admin_featured_is_active ON admin_featured_movies(is_active);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

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

-- Function to auto-assign studio plan to admin email
CREATE OR REPLACE FUNCTION assign_admin_plan()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email = 'woolleya129@gmail.com' THEN
    NEW.subscription_plan := 'studio';
    NEW.subscription_status := 'active';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to run on profile insert or update
DROP TRIGGER IF EXISTS set_admin_plan_trigger ON profiles;
CREATE TRIGGER set_admin_plan_trigger
  BEFORE INSERT OR UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION assign_admin_plan();

-- Update existing profile if it exists
UPDATE profiles 
SET 
  subscription_plan = 'studio',
  subscription_status = 'active',
  updated_at = now()
WHERE email = 'woolleya129@gmail.com';
