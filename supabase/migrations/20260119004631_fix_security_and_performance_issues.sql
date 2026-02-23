/*
  # Fix Security and Performance Issues

  ## Changes Made

  1. **Added Missing Indexes**
     - Added index on `comments.user_id` for foreign key performance
     - Added index on `reactions.user_id` for foreign key performance

  2. **Optimized RLS Policies**
     - Replaced `auth.uid()` with `(select auth.uid())` in all policies
     - This prevents re-evaluation of auth function for each row, improving performance at scale
     - Updated policies on: profiles, movies, comments, reactions

  3. **Removed Unused Indexes**
     - Dropped `idx_comments_movie_id` (not being used)
     - Dropped `idx_reactions_movie_id` (not being used)
     - Dropped `idx_project_assets_asset_id` (if exists)
     - Dropped `idx_project_assets_project_id` (if exists)
     - Dropped `idx_projects_user_id` (if exists)

  4. **Consolidated Duplicate Policies**
     - Combined two permissive SELECT policies on movies table into one optimized policy
     - New policy allows users to see their own movies OR public movies

  ## Note
  The following issues require manual configuration in Supabase Dashboard:
  - Auth DB Connection Strategy: Change to percentage-based allocation
  - Leaked Password Protection: Enable in Auth settings
*/

-- ============================================================================
-- 1. ADD MISSING INDEXES
-- ============================================================================

-- Add index on comments.user_id foreign key
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);

-- Add index on reactions.user_id foreign key
CREATE INDEX IF NOT EXISTS idx_reactions_user_id ON reactions(user_id);

-- ============================================================================
-- 2. REMOVE UNUSED INDEXES
-- ============================================================================

-- Drop unused indexes from comments and reactions
DROP INDEX IF EXISTS idx_comments_movie_id;
DROP INDEX IF EXISTS idx_reactions_movie_id;

-- Drop unused indexes from project-related tables (if they exist)
DROP INDEX IF EXISTS idx_project_assets_asset_id;
DROP INDEX IF EXISTS idx_project_assets_project_id;
DROP INDEX IF EXISTS idx_projects_user_id;

-- ============================================================================
-- 3. OPTIMIZE RLS POLICIES - PROFILES TABLE
-- ============================================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- Recreate with optimized auth.uid() calls
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = id);

-- ============================================================================
-- 4. OPTIMIZE RLS POLICIES - MOVIES TABLE
-- ============================================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own movies" ON movies;
DROP POLICY IF EXISTS "Anyone can view public movies" ON movies;
DROP POLICY IF EXISTS "Users can insert own movies" ON movies;
DROP POLICY IF EXISTS "Users can update own movies" ON movies;
DROP POLICY IF EXISTS "Users can delete own movies" ON movies;

-- Create consolidated SELECT policy (combines the two previous SELECT policies)
CREATE POLICY "Users can view own or public movies"
  ON movies FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id OR is_public = true);

-- Recreate other policies with optimized auth.uid() calls
CREATE POLICY "Users can insert own movies"
  ON movies FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own movies"
  ON movies FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own movies"
  ON movies FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- ============================================================================
-- 5. OPTIMIZE RLS POLICIES - COMMENTS TABLE
-- ============================================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert comments" ON comments;
DROP POLICY IF EXISTS "Users can delete own comments" ON comments;

-- Recreate with optimized auth.uid() calls
CREATE POLICY "Users can insert comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- ============================================================================
-- 6. OPTIMIZE RLS POLICIES - REACTIONS TABLE
-- ============================================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert own reactions" ON reactions;
DROP POLICY IF EXISTS "Users can delete own reactions" ON reactions;

-- Recreate with optimized auth.uid() calls
CREATE POLICY "Users can insert own reactions"
  ON reactions FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own reactions"
  ON reactions FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);