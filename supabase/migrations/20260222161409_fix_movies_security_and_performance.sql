/*
  # Fix Security and Performance Issues for Movies Tables

  ## Purpose
  Resolve security warnings and optimize query performance for movies and admin_featured_movies tables.

  ## Changes Made

  ### 1. Foreign Key Indexes
  - Add index for `admin_featured_movies.admin_id` foreign key
  - Add index for `admin_featured_movies.movie_id` foreign key

  ### 2. RLS Policy Optimization
  Optimize all RLS policies to use `(select auth.uid())` pattern instead of `auth.uid()` to prevent re-evaluation for each row:
  
  #### Movies Table Policies
  - `Users can view public movies` - Optimized auth check
  - `Users can insert own movies` - Optimized auth check
  - `Users can update own movies` - Optimized auth check
  - `Users can delete own movies` - Optimized auth check

  #### Admin Featured Movies Table Policies
  - `Anyone can view active featured movies` - Optimized auth check
  - `Only admins can insert featured movies` - Optimized auth check with subquery
  - `Only admins can update featured movies` - Optimized auth check with subquery
  - `Only admins can delete featured movies` - Optimized auth check with subquery

  ### 3. Function Security
  - Add SECURITY DEFINER and stable search_path to `update_updated_at_column` function

  ## Security Notes
  All policies maintain strict security while improving performance at scale.
*/

-- Add missing foreign key indexes
CREATE INDEX IF NOT EXISTS idx_admin_featured_admin_id ON admin_featured_movies(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_featured_movie_id ON admin_featured_movies(movie_id);

-- Drop existing policies for movies table
DROP POLICY IF EXISTS "Users can view public movies" ON movies;
DROP POLICY IF EXISTS "Users can insert own movies" ON movies;
DROP POLICY IF EXISTS "Users can update own movies" ON movies;
DROP POLICY IF EXISTS "Users can delete own movies" ON movies;

-- Recreate movies policies with optimized auth checks
CREATE POLICY "Users can view public movies"
  ON movies FOR SELECT
  TO authenticated
  USING (is_public = true OR user_id = (select auth.uid()));

CREATE POLICY "Users can insert own movies"
  ON movies FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update own movies"
  ON movies FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can delete own movies"
  ON movies FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- Drop existing policies for admin_featured_movies table
DROP POLICY IF EXISTS "Anyone can view active featured movies" ON admin_featured_movies;
DROP POLICY IF EXISTS "Only admins can insert featured movies" ON admin_featured_movies;
DROP POLICY IF EXISTS "Only admins can update featured movies" ON admin_featured_movies;
DROP POLICY IF EXISTS "Only admins can delete featured movies" ON admin_featured_movies;

-- Recreate admin_featured_movies policies with optimized auth checks
CREATE POLICY "Anyone can view active featured movies"
  ON admin_featured_movies FOR SELECT
  TO authenticated
  USING (is_active = true OR admin_id = (select auth.uid()));

CREATE POLICY "Only admins can insert featured movies"
  ON admin_featured_movies FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = (select auth.uid())
      AND plan = 'admin'
    )
  );

CREATE POLICY "Only admins can update featured movies"
  ON admin_featured_movies FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = (select auth.uid())
      AND plan = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = (select auth.uid())
      AND plan = 'admin'
    )
  );

CREATE POLICY "Only admins can delete featured movies"
  ON admin_featured_movies FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = (select auth.uid())
      AND plan = 'admin'
    )
  );

-- Fix function security and search path
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
