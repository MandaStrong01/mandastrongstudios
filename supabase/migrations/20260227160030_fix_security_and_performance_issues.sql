/*
  # Fix Security and Performance Issues

  ## Purpose
  Address all security warnings and performance optimizations identified by Supabase

  ## Changes Made

  ### 1. Add Missing Foreign Key Indexes
  - Add index on admin_featured_movies(admin_id)
  - Add index on admin_featured_movies(movie_id)
  - Add index on comments(user_id)
  - Add index on reactions(user_id)

  ### 2. Optimize RLS Policies with SELECT Wrapper
  Replace `auth.uid()` with `(SELECT auth.uid())` in all RLS policies to prevent
  re-evaluation for each row, significantly improving query performance at scale.

  ### 3. Fix Function Search Paths
  Add explicit search_path to security definer functions to prevent potential
  security vulnerabilities from role-mutable search paths.

  ## Security Impact
  - Improves query performance for foreign key lookups
  - Optimizes RLS policy evaluation
  - Hardens function security against search_path attacks

  ## Performance Impact
  - Faster foreign key constraint checks
  - Reduced CPU usage for RLS policy evaluation
  - Better scalability for large datasets
*/

-- Add missing foreign key indexes for performance
CREATE INDEX IF NOT EXISTS idx_admin_featured_admin_id ON admin_featured_movies(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_featured_movie_id ON admin_featured_movies(movie_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_reactions_user_id ON reactions(user_id);

-- Recreate all RLS policies with optimized auth.uid() calls
-- PROFILES TABLE
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = id)
  WITH CHECK ((SELECT auth.uid()) = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = id);

-- MOVIES TABLE
DROP POLICY IF EXISTS "Users can view public movies" ON movies;
CREATE POLICY "Users can view public movies"
  ON movies FOR SELECT
  TO authenticated
  USING (is_public = true OR user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can insert own movies" ON movies;
CREATE POLICY "Users can insert own movies"
  ON movies FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can update own movies" ON movies;
CREATE POLICY "Users can update own movies"
  ON movies FOR UPDATE
  TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can delete own movies" ON movies;
CREATE POLICY "Users can delete own movies"
  ON movies FOR DELETE
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- COMMENTS TABLE
DROP POLICY IF EXISTS "Users can insert comments" ON comments;
CREATE POLICY "Users can insert comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete own comments" ON comments;
CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- REACTIONS TABLE
DROP POLICY IF EXISTS "Users can insert own reactions" ON reactions;
CREATE POLICY "Users can insert own reactions"
  ON reactions FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete own reactions" ON reactions;
CREATE POLICY "Users can delete own reactions"
  ON reactions FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- ADMIN FEATURED MOVIES TABLE
DROP POLICY IF EXISTS "Anyone can view active featured movies" ON admin_featured_movies;
CREATE POLICY "Anyone can view active featured movies"
  ON admin_featured_movies FOR SELECT
  TO authenticated
  USING (is_active = true OR admin_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Only admins can insert featured movies" ON admin_featured_movies;
CREATE POLICY "Only admins can insert featured movies"
  ON admin_featured_movies FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = (SELECT auth.uid())
      AND subscription_plan = 'studio'
    )
  );

DROP POLICY IF EXISTS "Only admins can update featured movies" ON admin_featured_movies;
CREATE POLICY "Only admins can update featured movies"
  ON admin_featured_movies FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = (SELECT auth.uid())
      AND subscription_plan = 'studio'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = (SELECT auth.uid())
      AND subscription_plan = 'studio'
    )
  );

DROP POLICY IF EXISTS "Only admins can delete featured movies" ON admin_featured_movies;
CREATE POLICY "Only admins can delete featured movies"
  ON admin_featured_movies FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = (SELECT auth.uid())
      AND subscription_plan = 'studio'
    )
  );

-- Fix function search paths for security
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public, pg_temp;

CREATE OR REPLACE FUNCTION assign_admin_plan()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email = 'woolleya129@gmail.com' THEN
    NEW.subscription_plan := 'studio';
    NEW.subscription_status := 'active';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public, pg_temp;
