/*
  # Fix RLS Performance and Security Issues

  ## Purpose
  Optimize RLS policies by wrapping auth.uid() calls in SELECT statements
  and fix function search paths for security

  ## Changes Made

  ### 1. Optimize RLS Policies for Projects Table
  - Wrap all auth.uid() calls with (SELECT auth.uid())
  - Prevents re-evaluation for each row
  - Improves query performance at scale

  ### 2. Optimize RLS Policies for Media Assets Table
  - Wrap all auth.uid() calls with (SELECT auth.uid())
  - Improves performance for large asset libraries

  ### 3. Optimize RLS Policies for Render Jobs Table
  - Wrap all auth.uid() calls with (SELECT auth.uid())
  - Improves performance for render queue processing

  ### 4. Fix Function Search Paths
  - Add explicit search_path to all functions
  - Prevents security vulnerabilities from role-mutable search paths

  ## Security Impact
  - Optimizes RLS policy evaluation
  - Hardens function security against search_path attacks
  - Maintains data isolation between users

  ## Performance Impact
  - Reduced CPU usage for RLS policy evaluation
  - Better scalability for large datasets
  - Faster query execution times
*/

-- PROJECTS TABLE - Optimize RLS Policies
DROP POLICY IF EXISTS "Users can view own projects" ON projects;
CREATE POLICY "Users can view own projects"
  ON projects FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can create own projects" ON projects;
CREATE POLICY "Users can create own projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update own projects" ON projects;
CREATE POLICY "Users can update own projects"
  ON projects FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete own projects" ON projects;
CREATE POLICY "Users can delete own projects"
  ON projects FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- MEDIA ASSETS TABLE - Optimize RLS Policies
DROP POLICY IF EXISTS "Users can view own media assets" ON media_assets;
CREATE POLICY "Users can view own media assets"
  ON media_assets FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can create own media assets" ON media_assets;
CREATE POLICY "Users can create own media assets"
  ON media_assets FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update own media assets" ON media_assets;
CREATE POLICY "Users can update own media assets"
  ON media_assets FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete own media assets" ON media_assets;
CREATE POLICY "Users can delete own media assets"
  ON media_assets FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- RENDER JOBS TABLE - Optimize RLS Policies
DROP POLICY IF EXISTS "Users can view own render jobs" ON render_jobs;
CREATE POLICY "Users can view own render jobs"
  ON render_jobs FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can create own render jobs" ON render_jobs;
CREATE POLICY "Users can create own render jobs"
  ON render_jobs FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update own render jobs" ON render_jobs;
CREATE POLICY "Users can update own render jobs"
  ON render_jobs FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete own render jobs" ON render_jobs;
CREATE POLICY "Users can delete own render jobs"
  ON render_jobs FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

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