/*
  # Fix Function Search Paths

  1. Security Improvements
    - Set explicit search_path for all SECURITY DEFINER functions
    - Prevents search_path manipulation attacks
    - Uses 'pg_catalog, public' as the safe search path
    
  2. Functions Updated
    - get_user_subscription
    - create_default_subscription
    - assign_admin_plan

  3. Notes
    - All functions maintain their existing logic
    - Only the search_path security is improved
*/

-- Recreate get_user_subscription with fixed search_path
CREATE OR REPLACE FUNCTION get_user_subscription(user_uuid uuid)
RETURNS TABLE (
  subscription_id uuid,
  plan_id text,
  plan_name text,
  status text,
  current_period_end timestamptz,
  cancel_at_period_end boolean,
  max_projects integer,
  max_storage_gb integer,
  features jsonb
)
SECURITY DEFINER
SET search_path = pg_catalog, public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    s.plan_id,
    p.name,
    s.status,
    s.current_period_end,
    s.cancel_at_period_end,
    p.max_projects,
    p.max_storage_gb,
    p.features
  FROM subscriptions s
  LEFT JOIN subscription_plans p ON s.plan_id = p.id
  WHERE s.user_id = user_uuid;
END;
$$;

-- Recreate create_default_subscription with fixed search_path
CREATE OR REPLACE FUNCTION create_default_subscription()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = pg_catalog, public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO subscriptions (user_id, plan_id, status)
  VALUES (NEW.id, 'free', 'active');
  RETURN NEW;
END;
$$;

-- Recreate assign_admin_plan with fixed search_path (if it exists)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc 
    WHERE proname = 'assign_admin_plan'
  ) THEN
    CREATE OR REPLACE FUNCTION assign_admin_plan()
    RETURNS TRIGGER
    SECURITY DEFINER
    SET search_path = pg_catalog, public
    LANGUAGE plpgsql
    AS $func$
    BEGIN
      IF NEW.email = 'mandastrong@gmail.com' THEN
        UPDATE subscriptions
        SET plan_id = 'studio', status = 'active'
        WHERE user_id = NEW.id;
      END IF;
      RETURN NEW;
    END;
    $func$;
  END IF;
END $$;
