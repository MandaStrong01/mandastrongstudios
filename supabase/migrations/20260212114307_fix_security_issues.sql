/*
  # Fix Security and Performance Issues

  1. RLS Policy Optimization
    - Update policies to use subqueries for auth.uid() to improve performance
    - Prevents re-evaluation of auth functions for each row
  
  2. Function Security
    - Add explicit search_path to all functions to prevent search path manipulation attacks
    - Set SECURITY DEFINER functions to use safe search paths
  
  3. Changes
    - Drop and recreate RLS policies with optimized queries
    - Recreate functions with proper search_path configuration
*/

-- Drop existing RLS policies
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create optimized RLS policies using subqueries
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

-- Recreate handle_new_user function with secure search_path
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, plan, subscription_status)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    'basic',
    'trialing'
  );
  RETURN new;
END;
$$;

-- Recreate handle_updated_at function with secure search_path
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate set_user_as_admin function with secure search_path
CREATE OR REPLACE FUNCTION set_user_as_admin(user_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  UPDATE public.profiles
  SET plan = 'admin',
      subscription_status = 'active',
      trial_ends_at = NULL
  WHERE email = user_email;
END;
$$;

-- Recreate upgrade_user_plan function with secure search_path
CREATE OR REPLACE FUNCTION upgrade_user_plan(user_id uuid, new_plan text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF new_plan NOT IN ('basic', 'pro', 'studio', 'admin') THEN
    RAISE EXCEPTION 'Invalid plan: %', new_plan;
  END IF;
  
  UPDATE public.profiles
  SET plan = new_plan,
      subscription_status = 'active',
      updated_at = now()
  WHERE id = user_id;
END;
$$;
