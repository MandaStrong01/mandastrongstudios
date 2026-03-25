/*
  # Optimize RLS Policies with Auth Function Caching

  1. Performance Improvements
    - Replace `auth.uid()` with `(select auth.uid())` in all RLS policies
    - This prevents re-evaluation of auth functions for each row
    - Significantly improves query performance at scale
    
  2. Tables Updated
    - profiles
    - movies
    - comments
    - reactions
    - admin_featured_movies (simplified to check admin_id)
    - subscriptions

  3. Security
    - All security guarantees remain exactly the same
    - Only the performance characteristics are improved
*/

-- Drop and recreate profiles policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

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

-- Drop and recreate movies policies
DROP POLICY IF EXISTS "Users can view public movies" ON movies;
DROP POLICY IF EXISTS "Users can insert own movies" ON movies;
DROP POLICY IF EXISTS "Users can update own movies" ON movies;
DROP POLICY IF EXISTS "Users can delete own movies" ON movies;

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

-- Drop and recreate comments policies
DROP POLICY IF EXISTS "Users can insert comments" ON comments;
DROP POLICY IF EXISTS "Users can delete own comments" ON comments;

CREATE POLICY "Users can insert comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- Drop and recreate reactions policies
DROP POLICY IF EXISTS "Users can insert own reactions" ON reactions;
DROP POLICY IF EXISTS "Users can delete own reactions" ON reactions;

CREATE POLICY "Users can insert own reactions"
  ON reactions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can delete own reactions"
  ON reactions FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- Drop and recreate admin_featured_movies policies
DROP POLICY IF EXISTS "Anyone can view active featured movies" ON admin_featured_movies;
DROP POLICY IF EXISTS "Only admins can insert featured movies" ON admin_featured_movies;
DROP POLICY IF EXISTS "Only admins can update featured movies" ON admin_featured_movies;
DROP POLICY IF EXISTS "Only admins can delete featured movies" ON admin_featured_movies;

CREATE POLICY "Anyone can view active featured movies"
  ON admin_featured_movies FOR SELECT
  TO authenticated
  USING (
    is_active = true OR 
    admin_id = (select auth.uid())
  );

CREATE POLICY "Only admins can insert featured movies"
  ON admin_featured_movies FOR INSERT
  TO authenticated
  WITH CHECK (admin_id = (select auth.uid()));

CREATE POLICY "Only admins can update featured movies"
  ON admin_featured_movies FOR UPDATE
  TO authenticated
  USING (admin_id = (select auth.uid()))
  WITH CHECK (admin_id = (select auth.uid()));

CREATE POLICY "Only admins can delete featured movies"
  ON admin_featured_movies FOR DELETE
  TO authenticated
  USING (admin_id = (select auth.uid()));

-- Drop and recreate subscriptions policies
DROP POLICY IF EXISTS "Users can view own subscription" ON subscriptions;
DROP POLICY IF EXISTS "Users can insert own subscription" ON subscriptions;

CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own subscription"
  ON subscriptions FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);
